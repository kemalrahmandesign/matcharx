import Link from "next/link";

import { site } from "@/lib/site";
import { SignUp } from "./SignUp";

const icons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.4 2.3 1.8 3.8 4.1 4v3.1c-1.5.1-2.9-.3-4.1-1.1v6.4c0 3.3-2.6 5.6-5.7 5.6-3.2 0-5.6-2.5-5.6-5.6 0-3.5 3.1-6 6.6-5.5v3.2c-1.7-.4-3.4.7-3.4 2.4 0 1.4 1.1 2.4 2.4 2.4 1.5 0 2.5-1 2.5-2.7V3h3.2Z" />
    </svg>
  ),
};

export function Footer() {
  const social = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand">
          <p className="footer__wordmark">{site.name}</p>
          <p className="footer__tagline">{site.tagline}</p>
        </div>

        <SignUp />

        <div className="footer__base">
          <span>
            © {new Date().getFullYear()} {site.fullName}
          </span>
          <Link href="/help">Terms and Policies</Link>
          <div className="footer__social">
            {social.map(([name, url]) => (
              <a key={name} href={url} aria-label={name === "tiktok" ? "TikTok" : "Instagram"} target="_blank" rel="noreferrer">
                {icons[name]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
