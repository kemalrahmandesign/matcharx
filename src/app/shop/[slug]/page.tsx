import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/AddToCart";
import { ImageSlot } from "@/components/ImageSlot";
import { ProductCard } from "@/components/ProductCard";
import { averageRating, Reviews, Stars } from "@/components/Reviews";
import { categories, formatPrice, getProduct, isAvailable, productTitle, products, rangeOf } from "@/lib/products";
import { ratio, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: productTitle(product), description: product.description } : {};
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const title = productTitle(product);
  const range = rangeOf(product);
  const category = categories.find((c) => c.id === product.category)!;
  const related =
    product.category === "matcha"
      ? products.filter((p) => p.category === "accessories")
      : products.filter((p) => p.slug !== product.slug && p.category !== "merch").slice(0, 3);

  return (
    <div className="container">
      <nav className="crumbs label muted" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/shop?category=${category.id}`}>{category.label}</Link>
      </nav>

      <div className="grid pdp">
        <div className="pdp__media">
          <ImageSlot
            name={product.image}
            alt={title}
            label={product.comingSoon ? "Coming soon" : `No. ${product.index} — ${title}`}
            hidePath={product.comingSoon}
            sizes="(min-width: 900px) 58vw, 100vw"
            priority
          />
        </div>

        <div className="pdp__info">
          <div className="pdp__heading">
            <span className="label muted tabular">No. {product.index}</span>
            <h1 className="pdp__title">{title}</h1>
            {isAvailable(product) && <span className="pdp__price tabular">{formatPrice(product.price)}</span>}
            {!!product.reviews?.length && (
              <a href="#reviews" className="label">
                <Stars rating={averageRating(product.reviews)} /> {product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"}
              </a>
            )}
          </div>

          <p className="pdp__desc">{product.description}</p>

          {range.length > 1 && (
            <div className="range" role="group" aria-label="Size">
              {range.map((r) => (
                <Link
                  key={r.slug}
                  href={`/shop/${r.slug}`}
                  aria-current={r.slug === product.slug ? "page" : undefined}
                  scroll={false}
                >
                  {r.range!.label}
                </Link>
              ))}
            </div>
          )}

          <AddToCart key={product.slug} product={product} />

          <div>
            <dl className="specs">
              {product.specs.map((s) => (
                <div key={s.label}>
                  <dt className="label">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            {product.category === "matcha" && (
              <details className="disclosure">
                <summary className="label">Preparation</summary>
                <div className="disclosure__body small">
                  <p>{ratio.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(" · ")}</p>
                  <p>
                    Sift the matcha into a bowl, add water just off the boil, and whisk briskly until a fine foam forms.{" "}
                    <Link href="/prepare" className="link-arrow">
                      Full guide
                    </Link>
                  </p>
                </div>
              </details>
            )}

            <details className="disclosure">
              <summary className="label">Shipping &amp; returns</summary>
              <div className="disclosure__body small">
                <p>Orders ship within two working days.</p>
                <p>
                  Unopened items can be returned within 30 days.{" "}
                  <Link href="/help#returns" className="link-arrow">
                    Details
                  </Link>
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {!product.comingSoon && <Reviews reviews={product.reviews} />}

      <section className="section">
        <div className="grid section__head">
          <span className="label section__label">Complete the set</span>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
