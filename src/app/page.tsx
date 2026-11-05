import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <ImageSlot name="hero" alt="Bagum ceremonial grade matcha" label="Hero image" ratio="hero" sizes="100vw" priority />

      {categories.map((c) => {
        const items = products.filter((p) => p.category === c.id);
        return (
          <section key={c.id} className="shelf container" aria-labelledby={`shelf-${c.id}`}>
            <div className="shelf__head">
              <h2 id={`shelf-${c.id}`} className="label">
                {c.label}
              </h2>
              <Link href={`/shop?category=${c.id}`} className="label muted shelf__more">
                View all
              </Link>
            </div>
            <div className={`product-grid product-grid--${items.length}`}>
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} sizes={items.length === 2 ? "(min-width: 760px) 50vw, 100vw" : "(min-width: 760px) 33vw, 50vw"} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="container shop-all">
        <Link href="/shop" className="button">
          Shop all
        </Link>
      </div>
    </>
  );
}
