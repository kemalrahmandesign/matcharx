"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { formatPrice, getProduct, productTitle } from "@/lib/products";
import { site } from "@/lib/site";
import { ImageSlot } from "./ImageSlot";
import { lineKey, useCart } from "./Providers";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, close]);

  useEffect(() => setError(null), [lines]);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.message ?? "Checkout is unavailable right now. Please try again.");
    } catch {
      setError("Checkout is unavailable right now. Please try again.");
    }
    setPending(false);
  }

  const remaining = site.freeShippingOver - subtotal;

  return (
    <div className="drawer" data-open={isOpen} aria-hidden={!isOpen} inert={!isOpen}>
      <div className="drawer__scrim" onClick={close} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Cart">
        <div className="drawer__head">
          <span className="label">
            Cart <span className="tabular">({count})</span>
          </span>
          <button ref={closeRef} type="button" className="navlink" onClick={close}>
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="link-arrow" onClick={close}>
              Shop matcha
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                const key = lineKey(line);
                return (
                  <li key={key} className="line">
                    <Link href={`/shop/${product.slug}`} className="line__thumb" onClick={close}>
                      <ImageSlot name={product.image} alt={productTitle(product)} label={product.index} ratio="portrait" sizes="96px" />
                    </Link>
                    <div className="line__body">
                      <div className="line__top">
                        <Link href={`/shop/${product.slug}`} className="line__name" onClick={close}>
                          {productTitle(product)}
                        </Link>
                        <span className="tabular">{formatPrice(product.price * line.qty)}</span>
                      </div>
                      <span className="muted">{line.size ? `Size ${line.size}` : product.summary}</span>
                      <div className="line__controls">
                        <div className="stepper" aria-label="Quantity">
                          <button type="button" onClick={() => setQty(key, line.qty - 1)} aria-label="Decrease quantity">
                            −
                          </button>
                          <span className="tabular" aria-live="polite">
                            {line.qty}
                          </span>
                          <button type="button" onClick={() => setQty(key, line.qty + 1)} aria-label="Increase quantity">
                            +
                          </button>
                        </div>
                        <button type="button" className="text-button" onClick={() => remove(key)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="drawer__foot">
              <div className="row">
                <span className="label">Subtotal</span>
                <span className="tabular">{formatPrice(subtotal)}</span>
              </div>
              <p className="muted small">
                {remaining > 0
                  ? `${formatPrice(remaining)} away from free shipping. Taxes and shipping at checkout.`
                  : "Free shipping. Taxes calculated at checkout."}
              </p>
              <button type="button" className="button button--block" onClick={checkout} disabled={pending}>
                {pending ? "One moment…" : "Checkout"}
              </button>
              {error && (
                <p className="small error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
