import Stripe from "stripe";

import { getProduct, isAvailable, productTitle } from "@/lib/products";
import { site } from "@/lib/site";

type IncomingLine = { slug?: unknown; size?: unknown; qty?: unknown };

// Creates a Stripe Checkout session from the cart. Prices always come from the
// catalogue on the server, never from the browser.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { message: "Payments aren't connected yet. Add STRIPE_SECRET_KEY to enable checkout." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const lines: IncomingLine[] = Array.isArray(body?.lines) ? body.lines : [];

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const line of lines) {
    const product = typeof line.slug === "string" ? getProduct(line.slug) : undefined;
    const qty = Number(line.qty);
    const size = typeof line.size === "string" ? line.size : undefined;
    const sizeValid = product?.sizes ? !!size && product.sizes.includes(size) : size === undefined;
    if (!product || !isAvailable(product) || !Number.isInteger(qty) || qty < 1 || qty > 20 || !sizeValid) {
      return Response.json({ message: "Your cart has an item we couldn't find. Please refresh." }, { status: 400 });
    }
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: site.currency.toLowerCase(),
        unit_amount: product.price,
        product_data: {
          name: size ? `${productTitle(product)} — ${size}` : productTitle(product),
          metadata: { slug: product.slug, ...(size ? { size } : {}) },
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return Response.json({ message: "Your cart is empty." }, { status: 400 });
  }

  const subtotal = lineItems.reduce((sum, l) => sum + l.price_data!.unit_amount! * l.quantity!, 0);
  const origin = process.env.SITE_URL || new URL(request.url).origin;

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: [...site.shipTo] },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: subtotal >= site.freeShippingOver ? "Free shipping" : "Standard shipping",
            type: "fixed_amount",
            fixed_amount: { amount: subtotal >= site.freeShippingOver ? 0 : 800, currency: site.currency.toLowerCase() }, // TODO: confirm rate
          },
        },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return Response.json({ message: "Checkout is unavailable right now. Please try again." }, { status: 502 });
  }
}
