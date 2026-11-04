import type { Metadata } from "next";
import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";

export const metadata: Metadata = { title: "About" };

// TODO: replace with the real story — region, farm, people, founding year.
const chapters = [
  {
    label: "01 — Origin",
    title: "Grown in China.",
    body: [
      "Our matcha comes from a single growing region in China, from a small number of gardens we know by name. We buy one harvest a year and nothing else.",
      "China has grown green tea for longer than anywhere on earth. We think its best matcha deserves to be presented on its own terms.",
    ],
  },
  {
    label: "02 — The leaf",
    title: "Shaded, picked, milled.",
    body: [
      "For the weeks before the spring harvest the bushes are covered, which slows growth and deepens colour and sweetness. Only the youngest leaves are picked.",
      "The leaves are steamed, dried, stripped of stem and vein, then milled slowly into a powder fine enough to suspend in water.",
    ],
  },
  {
    label: "03 — Nothing added",
    title: "One ingredient.",
    body: [
      "No sweeteners, no blends, no flavourings. Every tin holds 100% green tea from the same harvest, and the label tells you which one.",
    ],
  },
  {
    label: "04 — The design",
    title: "White, silver, green.",
    body: [
      "We keep the world around the tea quiet: paper, brushed aluminum, plain type. The only colour you will see is the matcha itself.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container">
      <header className="grid page-head">
        <h1 className="display page-head__title">A new standard for Chinese matcha.</h1>
        <p className="lede page-head__aside">
          We started with one question: what would matcha look like if nothing distracted from the tea?
        </p>
      </header>

      <ImageSlot name="about" alt="Tea garden" label="About image" ratio="hero" sizes="100vw" />

      <div className="chapters">
        {chapters.map((c, i) => (
          <section key={c.label} className="grid chapter" style={i === 0 ? { marginTop: "clamp(48px, 6vw, 96px)" } : undefined}>
            <span className="label muted chapter__label">{c.label}</span>
            <h2 className="title chapter__title">{c.title}</h2>
            <div className="prose chapter__body">
              {c.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="grid chapter">
          <span className="label muted chapter__label">05 — Taste it</span>
          <div className="chapter__title closing">
            <p className="title">Start with the small tin.</p>
            <Link href="/shop/matcha-small" className="button">
              Shop matcha
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
