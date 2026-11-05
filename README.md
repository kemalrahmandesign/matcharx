# Bagum Matcha

Storefront for Bagum, a premium Chinese matcha brand. Next.js 16, no UI framework — one stylesheet in `src/app/globals.css`.

The look: white paper, brushed aluminum, mono type for structure and sans for reading. There is no green in the interface; the only colour comes from photographs of the tea.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Live site

Every push to `main` deploys a static copy to GitHub Pages at https://kemalrahmandesign.github.io/matcharx/ (`.github/workflows/pages.yml`). Pages can't run server code, so that copy has no Stripe checkout; the Checkout button asks people to email instead. To sell online, host the full site somewhere that runs Next.js (for example Vercel) and set `STRIPE_SECRET_KEY`.

To build the Pages copy locally: delete `src/app/api`, then run `GITHUB_PAGES=true npm run build` and serve `out/` under `/matcharx`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, philosophy, matcha sizes, tools & goods, the ratio, about teaser |
| `/shop` | All products, filter by `?category=matcha\|tools\|goods` |
| `/shop/[slug]` | Product page — size switch for matcha, size picker for the shirt |
| `/about` | Brand story |
| `/prepare` | How to make a bowl and a latte, storage |
| `/help` | Shipping, returns, FAQ, contact |
| `/order/success` | Shown after Stripe Checkout; clears the cart |

The cart lives top right, opens as a drawer, and is saved in the browser.

## Change the name

Edit `name` (the wordmark) and `fullName` (page titles) in `src/lib/site.ts` — the header, footer, page titles and checkout all follow.

## Add images

Drop files into `public/images` with these names. Any of `.jpg .jpeg .png .webp .avif` works; until a file exists the page shows a labelled placeholder.

| File | Used on |
| --- | --- |
| `hero` | Home hero (wide, 2:1 desktop / 4:5 mobile) |
| `about` | About page header |
| `prepare` | Prepare page, tools section |
| `products/matcha-small` | Matcha — Small |
| `products/matcha-large` | Matcha — Large |
| `products/bamboo-scooper` | Bamboo Scooper |
| `products/whisk` | Bamboo Whisk |
| `products/whisk-holder` | Whisk Holder |
| `products/shirt` | Shirt |
| `products/tote-bag` | Tote Bag |

Product images are shown at 4:5. Shoot on white or pale grey so they sit on the paper.

## Images from Higgsfield

List image URLs in `public/images/sources.json` (name → URL) and push to `main`. The Import images workflow downloads them, resizes them to WebP, commits them and redeploys. Matcha cards also show a `-hover` image on hover when one exists.

## Reviews

Add real customer reviews to a product's `reviews` list in `src/lib/products.ts`. Until a product has some, its page shows "No reviews yet".

## Products and prices

All in `src/lib/products.ts` — name, price (in cents), summary, description, specs, sizes.

## Payments

Checkout uses Stripe Checkout (hosted payment page). Copy `.env.example` to `.env.local` and set `STRIPE_SECRET_KEY`. Without it the Checkout button explains that payments aren't connected. Prices are always read from the catalogue on the server.

## Fonts

Currently Geist Sans + Geist Mono (free, self-hosted). The reference brand uses PP Fraktion Sans + Mono from Pangram Pangram, which needs a commercial licence. To switch: add its `@font-face` files and change `--font-sans` / `--font-mono` at the top of `globals.css`.

## Still placeholder

Search for `TODO` — prices, weights, materials, harvest and grade facts, the about story, shipping rates and regions, returns policy, contact email.
