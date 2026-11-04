import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { origin, ratio } from "@/lib/site";

export default function Home() {
  const matcha = products.filter((p) => p.category === "matcha");
  const rest = products.filter((p) => p.category !== "matcha");

  return (
    <>
      <section className="hero container">
        <div className="grid hero__top">
          <h1 className="display hero__title">
            Matcha,
            <br />
            nothing else.
          </h1>
          <div className="hero__aside">
            <p className="lede">
              The finest matcha from China. First-harvest leaf, shaded before picking and milled to a fine, bright
              powder.
            </p>
            <Link href="/shop?category=matcha" className="button">
              Shop matcha
            </Link>
          </div>
        </div>
        <ImageSlot name="hero" alt="Matcha" label="Hero image" ratio="hero" sizes="100vw" priority />
        <dl className="facts">
          {origin.map((f) => (
            <div key={f.label}>
              <dt className="label">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section container">
        <div className="grid">
          <span className="label section__label">(01) Philosophy</span>
          <p className="statement section__body">
            We took away everything that wasn&rsquo;t the tea. What remains is white paper, brushed aluminum, and the
            green of the leaf.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="grid section__head">
          <span className="label section__label">(02) Matcha</span>
          <div className="section__body split">
            <h2 className="title">Two sizes. One matcha.</h2>
            <Link href="/shop?category=matcha" className="link-arrow">
              Shop matcha
            </Link>
          </div>
        </div>
        <div className="product-grid product-grid--two">
          {matcha.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(min-width: 760px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="grid section__head">
          <span className="label section__label">(03) Tools &amp; Goods</span>
          <div className="section__body split">
            <h2 className="title">Everything for the bowl.</h2>
            <Link href="/shop" className="link-arrow">
              Shop all
            </Link>
          </div>
        </div>
        <div className="product-grid product-grid--five">
          {rest.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(min-width: 1100px) 20vw, (min-width: 760px) 33vw, 50vw" />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="grid section__head">
          <span className="label section__label">(04) Prepare</span>
          <div className="section__body split">
            <h2 className="title">The ratio.</h2>
            <Link href="/prepare" className="link-arrow">
              Full guide
            </Link>
          </div>
        </div>
        <dl className="ratio">
          {ratio.map((r) => (
            <div key={r.label}>
              <dt className="label muted">{r.label}</dt>
              <dd className="tabular">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section container">
        <div className="grid">
          <span className="label section__label">(05) About</span>
          <div className="section__body closing">
            <p className="statement">Grown in China. Refined without compromise.</p>
            <Link href="/about" className="link-arrow">
              Our story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
