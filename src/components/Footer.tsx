import Link from "next/link";

import { site } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop?category=matcha", label: "Matcha" },
      { href: "/shop?category=tools", label: "Tools" },
      { href: "/shop?category=goods", label: "Goods" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/about", label: "About" },
      { href: "/prepare", label: "Prepare" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help#shipping", label: "Shipping" },
      { href: "/help#returns", label: "Returns" },
      { href: "/help#contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <p className="footer__note">{site.tagline}</p>
        {columns.map((col) => (
          <div key={col.title} className="footer__col">
            <span className="label muted">{col.title}</span>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container">
        <p className="footer__wordmark" aria-hidden="true" style={{ "--chars": site.name.length } as React.CSSProperties}>
          {site.name}
        </p>
        <div className="footer__base">
          <span>
            © {new Date().getFullYear()} {site.fullName}
          </span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </footer>
  );
}
