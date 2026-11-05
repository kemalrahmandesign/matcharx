// Brand-level settings. Changing the name here updates the header, footer
// wordmark, page titles and checkout.
export const site = {
  name: "BAGUM", // wordmark in the header and footer
  fullName: "Bagum Matcha", // page titles and search results
  tagline: "Matcha, nothing else.",
  description:
    "Ceremonial grade matcha in a silver tin. Nothing added.",
  email: "hello@bagum.com", // TODO: real inbox
  // Footer icons show only for accounts that have a URL.
  social: { instagram: "", tiktok: "" }, // TODO: add profile URLs
  currency: "USD",
  locale: "en-US",
  // Countries Stripe Checkout will ship to.
  shipTo: ["US", "CA"] as const, // TODO: confirm shipping regions
  freeShippingOver: 7500, // cents — TODO: confirm threshold
  // While false, no prices show anywhere and every product reads "Coming soon".
  salesOpen: false,
};

// The basic ratio, used on the home page, the prepare page and matcha pages.
export const ratio = [
  { value: "2 g", label: "Matcha" },
  { value: "70 ml", label: "Water" },
  { value: "80 °C", label: "Temperature" },
  { value: "15 s", label: "Whisk" },
];

// Non-product images. Drop a file with this name (any of .jpg .jpeg .png
// .webp .avif) into /public/images and it replaces the placeholder.
export const pageImages = ["hero", "about"] as const;
