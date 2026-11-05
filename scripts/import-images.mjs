// Downloads the images listed in public/images/sources.json, resizes them and
// saves them as WebP next to it, replacing any older file with the same name.
// Run by .github/workflows/import-images.yml.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images");
const sources = JSON.parse(await fs.readFile(path.join(dir, "sources.json"), "utf8"));

for (const [name, url] of Object.entries(sources)) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status} ${url}`);
  const width = name === "hero" || name === "about" ? 2400 : 1600;
  const out = path.join(dir, `${name}.webp`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  for (const ext of [".avif", ".jpg", ".jpeg", ".png"]) await fs.rm(path.join(dir, name + ext), { force: true });
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${name}.webp`);
}
