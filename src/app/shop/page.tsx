import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopGrid, ShopGridFromUrl } from "@/components/ShopGrid";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="container">
      <Suspense fallback={<ShopGrid category={null} />}>
        <ShopGridFromUrl />
      </Suspense>
    </div>
  );
}
