"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { useCart } from "./Providers";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/prepare", label: "Prepare" },
];

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="wordmark" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav className="header__nav" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navlink"
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="navlink header__menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <button type="button" className="navlink" onClick={open} aria-label={`Open cart, ${count} items`}>
            Cart <span className="tabular">({count})</span>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="mobile-menu" data-open={menuOpen} aria-label="Mobile" hidden={!menuOpen}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="mobile-menu__link">
            {item.label}
          </Link>
        ))}
        <Link href="/help" className="mobile-menu__link">
          Help
        </Link>
      </nav>
    </header>
  );
}
