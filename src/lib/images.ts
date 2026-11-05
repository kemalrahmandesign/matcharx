import fs from "node:fs";
import path from "node:path";

import { products } from "./products";
import { pageImages } from "./site";

const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

// Server only. Maps each image name to the file that exists in /public/images,
// so a missing image renders a placeholder instead of a broken <img>.
export function resolveImages(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "images");
  const names = [...pageImages, ...products.map((p) => p.image)];
  const found: Record<string, string> = {};
  for (const name of names) {
    for (const ext of EXTENSIONS) {
      if (fs.existsSync(path.join(dir, name + ext))) {
        // next/image doesn't add basePath to string sources on its own.
        found[name] = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${name}${ext}`;
        break;
      }
    }
  }
  return found;
}
