import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";

import type { Metadata, Viewport } from "next";

import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { resolveImages } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers images={resolveImages()}>
          <a href="#main" className="skip">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
