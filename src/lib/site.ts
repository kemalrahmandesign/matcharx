// Brand-level settings. The name is a working title — change it here and it
// updates the header, footer, page titles and checkout.
export const site = {
  name: "MATCHARX",
  tagline: "Matcha, nothing else.",
  description:
    "Single-origin matcha from China, presented with nothing added. White paper, brushed aluminum, and the green of the leaf.",
  email: "hello@matcharx.com", // TODO: real inbox
  currency: "USD",
  locale: "en-US",
  // Countries Stripe Checkout will ship to.
  shipTo: ["US", "CA"] as const, // TODO: confirm shipping regions
  freeShippingOver: 7500, // cents — TODO: confirm threshold
};

// Headline facts shown on the home and about pages.
// TODO: every value here is a placeholder until confirmed by the farm.
export const origin = [
  { label: "Origin", value: "China" },
  { label: "Harvest", value: "First flush, spring" },
  { label: "Grade", value: "Ceremonial" },
  { label: "Ingredients", value: "100% green tea" },
];

// The basic ratio, used on the home page, the prepare page and matcha pages.
export const ratio = [
  { value: "2 g", label: "Matcha" },
  { value: "70 ml", label: "Water" },
  { value: "80 °C", label: "Temperature" },
  { value: "15 s", label: "Whisk" },
];

// Non-product images. Drop a file with this name (any of .jpg .jpeg .png
// .webp .avif) into /public/images and it replaces the placeholder.
export const pageImages = ["hero", "about", "prepare"] as const;
