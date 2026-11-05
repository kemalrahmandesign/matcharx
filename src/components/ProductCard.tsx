import Link from "next/link";

import { formatPrice, productTitle, type Product } from "@/lib/products";
import { ImageSlot } from "./ImageSlot";

export function ProductCard({ product, sizes = "(min-width: 900px) 33vw, 50vw" }: { product: Product; sizes?: string }) {
  const title = productTitle(product);
  return (
    <Link href={`/shop/${product.slug}`} className="card">
      <div className="card__media">
        <ImageSlot
          name={product.image}
          alt={title}
          label={product.comingSoon ? "Coming soon" : `No. ${product.index} — ${title}`}
          sizes={sizes}
          hidePath={product.comingSoon}
        />
        {product.hoverImage && (
          <ImageSlot name={product.hoverImage} alt="" sizes={sizes} optional className="card__hover" />
        )}
      </div>
      <div className="card__meta">
        <span className="label muted tabular">No. {product.index}</span>
        <div className="card__row">
          <span className="card__name">{title}</span>
          <span className="tabular">{product.comingSoon ? "Coming soon" : formatPrice(product.price)}</span>
        </div>
        <span className="muted small">{product.summary}</span>
      </div>
    </Link>
  );
}
