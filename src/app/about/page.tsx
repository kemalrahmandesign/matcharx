import type { Metadata } from "next";
import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

// TODO: add the founder's own story here when it's ready.
export default function AboutPage() {
  return (
    <div className="container">
      <header className="grid page-head">
        <h1 className="display page-head__title">About Bagum.</h1>
      </header>

      <ImageSlot name="about" alt="Rows of tea bushes on a misty hillside" label="About image" ratio="hero" sizes="100vw" className="about__image" />

      <div className="grid about">
        <div className="prose about__body">
          <p>
            Bagum sells ceremonial grade matcha. It comes in two sizes, a 30 g tin and a 100 g tin, both sealed in
            silver.
          </p>
          <p>
            Alongside the matcha we sell the three tools you need to make it at home: a bamboo scooper, a bamboo whisk
            and a whisk holder.
          </p>
          <p>
            Questions about an order or wholesale? Write to{" "}
            <a href={`mailto:${site.email}`} className="link-arrow">
              {site.email}
            </a>
            .
          </p>
        </div>
        <div className="about__links">
          <Link href="/shop?category=matcha" className="button">
            Shop matcha
          </Link>
          <Link href="/prepare" className="link-arrow">
            How to prepare
          </Link>
        </div>
      </div>
    </div>
  );
}
