import type { Metadata } from "next";

import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Help" };

// TODO: confirm shipping times, regions and the returns policy.
const sections = [
  {
    id: "shipping",
    label: "Shipping",
    items: [
      {
        q: "When will my order ship?",
        a: `Orders placed before noon ship the same working day; everything else ships within two working days. Shipping is free on orders over ${formatPrice(site.freeShippingOver)}.`,
      },
      {
        q: "Where do you ship?",
        a: "We currently ship to the United States and Canada. Duties and taxes are shown at checkout.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    items: [
      {
        q: "Can I return something?",
        a: "Unopened tins, tools and goods can be returned within 30 days of delivery. For hygiene reasons we can't take back opened matcha.",
      },
      {
        q: "Something arrived damaged.",
        a: `Send a photo to ${site.email} within seven days and we will replace it.`,
      },
    ],
  },
  {
    id: "matcha",
    label: "Matcha",
    items: [
      {
        q: "How long does it keep?",
        a: "Sealed, it keeps for twelve months from milling. Once opened, keep it in the fridge and use it within four to six weeks.",
      },
      {
        q: "Small or large?",
        a: "The small tin holds about 15 bowls at 2 g each. If you drink matcha every day, the large tin is better value and lasts about seven weeks.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="container">
      <header className="grid page-head">
        <h1 className="display page-head__title">Help.</h1>
        <p className="lede page-head__aside">
          Shipping, returns and storage. Anything else, write to{" "}
          <a href={`mailto:${site.email}`} className="link-arrow">
            {site.email}
          </a>
        </p>
      </header>

      <div className="chapters">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="grid chapter">
            <span className="label muted chapter__label">{s.label}</span>
            <div className="faq chapter__wide">
              {s.items.map((item) => (
                <details key={item.q} className="disclosure">
                  <summary>{item.q}</summary>
                  <div className="disclosure__body">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section id="contact" className="grid chapter">
          <span className="label muted chapter__label">Contact</span>
          <div className="prose chapter__wide">
            <p>
              For orders, wholesale and press:{" "}
              <a href={`mailto:${site.email}`} className="link-arrow">
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
