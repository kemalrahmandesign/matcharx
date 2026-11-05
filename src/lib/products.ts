export type Category = "matcha" | "accessories" | "merch";

// Real customer reviews only. Add them here (or connect a reviews service)
// as they come in; the product page shows an empty state until then.
export type Review = { name: string; rating: 1 | 2 | 3 | 4 | 5; date: string; title?: string; body: string };

export type Product = {
  slug: string;
  index: string; // catalogue number shown on cards
  name: string;
  category: Category;
  price: number; // cents
  summary: string;
  description: string;
  // Base name under /public/images — the extension is detected automatically.
  image: string;
  hoverImage?: string; // shown when a card is hovered, if the file exists
  comingSoon?: boolean; // listed but not for sale yet
  reviews?: Review[];
  specs: { label: string; value: string }[];
  sizes?: string[]; // apparel sizes, chosen at add-to-cart
  // Products in the same range are shown as a size switch on each other's pages.
  range?: { group: string; label: string };
};

export const categories: { id: Category; label: string }[] = [
  { id: "matcha", label: "Matcha" },
  { id: "accessories", label: "Accessories" },
  { id: "merch", label: "Merch" },
];

// TODO: prices, weights and materials are placeholders until confirmed.
export const products: Product[] = [
  {
    slug: "matcha-small",
    index: "01",
    name: "Matcha",
    category: "matcha",
    price: 3800,
    summary: "30 g · about 15 servings",
    description:
      "Ceremonial grade matcha in the everyday size. Milled to a fine powder that whisks to a dense, even foam.",
    image: "products/matcha-small",
    hoverImage: "products/matcha-small-hover",
    range: { group: "matcha", label: "Small · 30 g" },
    specs: [
      { label: "Weight", value: "30 g" },
      { label: "Servings", value: "About 15 at 2 g" },
      { label: "Grade", value: "Ceremonial" },
      { label: "Ingredients", value: "100% green tea" },
    ],
  },
  {
    slug: "matcha-large",
    index: "02",
    name: "Matcha",
    category: "matcha",
    price: 9800,
    summary: "100 g · about 50 servings",
    description:
      "The same ceremonial grade matcha in a larger tin, for a daily bowl. Keep it sealed, cool and dark.",
    image: "products/matcha-large",
    hoverImage: "products/matcha-large-hover",
    range: { group: "matcha", label: "Large · 100 g" },
    specs: [
      { label: "Weight", value: "100 g" },
      { label: "Servings", value: "About 50 at 2 g" },
      { label: "Grade", value: "Ceremonial" },
      { label: "Ingredients", value: "100% green tea" },
    ],
  },
  {
    slug: "bamboo-scooper",
    index: "03",
    name: "Bamboo Scooper",
    category: "accessories",
    price: 1400,
    summary: "Carved bamboo",
    description:
      "A single length of bamboo, shaped by hand. One level scoop is roughly a gram, so two make a bowl.",
    image: "products/bamboo-scooper",
    specs: [
      { label: "Material", value: "Bamboo" },
      { label: "Length", value: "18 cm" },
      { label: "Measure", value: "About 1 g per scoop" },
    ],
  },
  {
    slug: "whisk",
    index: "04",
    name: "Bamboo Whisk",
    category: "accessories",
    price: 3400,
    summary: "Hand-split bamboo",
    description:
      "Split from one piece of bamboo into fine tines. The only tool that makes a proper foam. Soak it for a minute in warm water before you whisk.",
    image: "products/whisk",
    specs: [
      { label: "Material", value: "Bamboo" },
      { label: "Tines", value: "About 100" },
      { label: "Care", value: "Rinse in water only, dry on a holder" },
    ],
  },
  {
    slug: "whisk-holder",
    index: "05",
    name: "Whisk Holder",
    category: "accessories",
    price: 2800,
    summary: "Glazed ceramic",
    description:
      "Rest the whisk on it after rinsing. It dries evenly and the tines keep their shape for longer.",
    image: "products/whisk-holder",
    specs: [
      { label: "Material", value: "Glazed ceramic" },
      { label: "Height", value: "9 cm" },
      { label: "Fits", value: "Standard bamboo whisks" },
    ],
  },
  {
    slug: "shirt",
    index: "06",
    name: "Shirt",
    category: "merch",
    price: 4800,
    summary: "Heavyweight cotton, white",
    description:
      "A plain white shirt in heavyweight cotton with a small wordmark at the chest. Boxy fit, dropped shoulder.",
    image: "products/shirt",
    comingSoon: true,
    sizes: ["S", "M", "L", "XL"],
    specs: [
      { label: "Material", value: "100% cotton" },
      { label: "Colour", value: "White" },
      { label: "Fit", value: "Boxy — take your usual size" },
    ],
  },
  {
    slug: "tote-bag",
    index: "07",
    name: "Tote Bag",
    category: "merch",
    price: 3200,
    summary: "Natural canvas",
    description:
      "A heavy canvas tote, big enough for a tin, a whisk and everything else. Printed with the wordmark on one side.",
    image: "products/tote-bag",
    comingSoon: true,
    specs: [
      { label: "Material", value: "Cotton canvas" },
      { label: "Size", value: "38 × 42 cm" },
      { label: "Handles", value: "65 cm" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productTitle(p: Product) {
  return p.range ? `${p.name} — ${p.range.label.split(" · ")[0]}` : p.name;
}

export function rangeOf(p: Product) {
  if (!p.range) return [];
  return products.filter((q) => q.range?.group === p.range!.group);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
