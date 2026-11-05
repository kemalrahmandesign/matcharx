"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { categories, products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

// Filtering runs in the browser so /shop stays a static page.
export function ShopGridFromUrl() {
  return <ShopGrid category={useSearchParams().get("category")} />;
}

export function ShopGrid({ category }: { category: string | null }) {
  const active = categories.find((c) => c.id === category)?.id;
  const list = active ? products.filter((p) => p.category === active) : products;

  return (
    <>
      <header className="grid page-head">
        <h1 className="display page-head__title">
          Shop<sup className="label tabular">({list.length})</sup>
        </h1>
        <nav className="filters page-head__aside" aria-label="Filter products">
          <Link href="/shop" className="navlink" aria-current={!active ? "page" : undefined}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className="navlink"
              aria-current={active === c.id ? "page" : undefined}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="product-grid shop-list">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
