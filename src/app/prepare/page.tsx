import type { Metadata } from "next";
import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import { ratio } from "@/lib/site";

export const metadata: Metadata = { title: "Prepare" };

export default function PreparePage() {
  return (
    <div className="container">
      <header className="grid page-head">
        <h1 className="display page-head__title">How to prepare.</h1>
        <p className="lede page-head__aside">Four numbers and a whisk. It takes about a minute.</p>
      </header>

      <dl className="ratio">
        {ratio.map((r) => (
          <div key={r.label}>
            <dt className="label muted">{r.label}</dt>
            <dd className="tabular">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="chapters" style={{ marginTop: "clamp(64px, 8vw, 128px)" }}>
        <section className="grid chapter">
          <span className="label muted chapter__label">A bowl</span>
          <h2 className="title chapter__title">Straight, the way to taste it first.</h2>
          <ol className="steps chapter__body">
            <li>
              <span>
                <strong>Warm the bowl.</strong>
                Pour in hot water, swirl, and tip it out. Soak the whisk at the same time so the tines soften.
              </span>
            </li>
            <li>
              <span>
                <strong>Sift 2 g of matcha.</strong>
                Two level scoops. Sifting breaks up clumps so it whisks smooth.
              </span>
            </li>
            <li>
              <span>
                <strong>Add 70 ml of water at 80 °C.</strong>
                Boiling water scorches the tea and makes it bitter. Let the kettle rest for a few minutes.
              </span>
            </li>
            <li>
              <span>
                <strong>Whisk for 15 seconds.</strong>
                Fast, from the wrist, in a zigzag rather than a circle, until a fine, even foam covers the surface.
              </span>
            </li>
            <li>
              <span>
                <strong>Drink it straight away.</strong>
                Matcha settles as it sits. Rinse the whisk in water and stand it on its holder to dry.
              </span>
            </li>
          </ol>
        </section>

        <section className="grid chapter">
          <span className="label muted chapter__label">A latte</span>
          <h2 className="title chapter__title">With milk, hot or iced.</h2>
          <ol className="steps chapter__body">
            <li>
              <span>
                <strong>Whisk 2 g of matcha with 30 ml of water at 80 °C</strong>
                until smooth, with no clumps left.
              </span>
            </li>
            <li>
              <span>
                <strong>Add 150 ml of milk.</strong>
                Steamed for a hot latte, or cold over ice. Any milk works; oat is the closest to neutral.
              </span>
            </li>
          </ol>
        </section>

        <section className="grid chapter">
          <span className="label muted chapter__label">Storage</span>
          <h2 className="title chapter__title">Cool, dark, sealed.</h2>
          <div className="prose chapter__body">
            <p>
              Light, heat and air dull matcha&rsquo;s colour and flavour. Keep the tin closed and in the fridge once
              opened, and let it come to room temperature before you open it so no moisture gets in.
            </p>
            <p>An opened tin is at its best within four to six weeks.</p>
          </div>
        </section>

        <section className="grid chapter">
          <span className="label muted chapter__label">Tools</span>
          <div className="chapter__title">
            <ImageSlot name="prepare" alt="Bamboo whisk and scooper" label="Prepare image" ratio="portrait" sizes="(min-width: 900px) 33vw, 100vw" />
          </div>
          <div className="chapter__body closing">
            <p className="prose">
              You need three things: a bamboo scooper to measure, a bamboo whisk to foam, and a holder to keep the whisk
              in shape.
            </p>
            <Link href="/shop?category=accessories" className="button">
              Shop accessories
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
