"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getProduct, isAvailable } from "@/lib/products";

export type CartLine = { slug: string; size?: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: string | undefined, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "cart.v1";
const MAX_QTY = 20;

export const lineKey = (l: Pick<CartLine, "slug" | "size">) => (l.size ? `${l.slug}:${l.size}` : l.slug);

const CartContext = createContext<CartContextValue | null>(null);
const ImageContext = createContext<Record<string, string>>({});

function readStoredCart(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    // Drop anything the catalogue no longer sells.
    return parsed.filter((l) => {
      const product = l && getProduct(l.slug);
      return product && isAvailable(product) && Number.isInteger(l.qty) && l.qty > 0;
    });
  } catch {
    return [];
  }
}

export function Providers({ images, children }: { images: Record<string, string>; children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private mode or storage full — the cart still works for this visit.
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, size: string | undefined, qty: number) => {
    setLines((prev) => {
      const key = lineKey({ slug, size });
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, { slug, size, qty: Math.min(MAX_QTY, qty) }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => lineKey(l) !== key)
        : prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove: (key) => setQty(key, 0),
      clear: () => setLines([]),
    };
  }, [lines, isOpen, add, setQty]);

  return (
    <ImageContext.Provider value={images}>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </ImageContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}

export function useImages() {
  return useContext(ImageContext);
}
