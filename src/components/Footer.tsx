import Link from "next/link";

import { site } from "@/lib/site";
import { SignUp } from "./SignUp";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/prepare", label: "Prepare" },
  { href: "/help", label: "Help" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <SignUp />
        <nav className="footer__links" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="navlink">
              {link.label}
            </Link>
          ))}
        </nav>
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
