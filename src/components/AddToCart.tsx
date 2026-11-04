"use client";

import { useState } from "react";

import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "./Providers";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [prompt, setPrompt] = useState(false);

  function submit() {
    if (product.sizes && !size) {
      setPrompt(true);
      return;
    }
    add(product.slug, size, qty);
    setQty(1);
  }

  return (
    <div className="buy">
      {product.sizes && (
        <fieldset className="options">
          <legend className="label">
            Size {prompt && !size && <span className="error"> — choose one</span>}
          </legend>
          <div className="options__row">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className="option"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setPrompt(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="buy__row">
        <div className="stepper stepper--large" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            −
          </button>
          <span className="tabular" aria-live="polite">
            {qty}
          </span>
          <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button type="button" className="button button--grow" onClick={submit}>
          Add to cart — <span className="tabular">{formatPrice(product.price * qty)}</span>
        </button>
      </div>
    </div>
  );
}
