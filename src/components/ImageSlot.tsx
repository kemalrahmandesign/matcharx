"use client";

import Image from "next/image";

import { useImages } from "./Providers";

type Props = {
  name: string; // base name under /public/images
  alt: string;
  label?: string; // shown on the placeholder until a real image exists
  ratio?: "hero" | "wide" | "portrait" | "square";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function ImageSlot({ name, alt, label, ratio = "portrait", sizes = "50vw", priority, className = "" }: Props) {
  const src = useImages()[name];

  return (
    <div className={`slot slot--${ratio} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="slot__img" />
      ) : (
        <div className="slot__placeholder" role="img" aria-label={alt}>
          <span className="label">{label ?? alt}</span>
          <span className="slot__path">public/images/{name}.jpg</span>
        </div>
      )}
    </div>
  );
}
