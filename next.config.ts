import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a fully static copy for GitHub Pages, served from
// the repo's subpath (PAGES_BASE_PATH, set by the deploy workflow). Without it
// the site runs as a normal Next.js server with Stripe checkout.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? (process.env.PAGES_BASE_PATH ?? "/matcharx") : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  ...(pages && { output: "export", trailingSlash: true, basePath }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_SITE: pages ? "true" : "",
  },
  images: pages
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
