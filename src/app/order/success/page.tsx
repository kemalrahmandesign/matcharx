import type { Metadata } from "next";
import Link from "next/link";

import { ClearCart } from "./ClearCart";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function OrderSuccessPage() {
  return (
    <div className="container">
      <ClearCart />
      <header className="grid page-head" style={{ paddingBottom: "clamp(96px, 14vw, 200px)" }}>
        <h1 className="display page-head__title">Thank you.</h1>
        <div className="page-head__aside closing">
          <p className="lede">Your order is placed. A confirmation is on its way to your inbox.</p>
          <Link href="/prepare" className="link-arrow">
            How to prepare
          </Link>
        </div>
      </header>
    </div>
  );
}
