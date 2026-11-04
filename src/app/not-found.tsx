import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <header className="grid page-head" style={{ paddingBottom: "clamp(96px, 14vw, 200px)" }}>
        <h1 className="display page-head__title">Not found.</h1>
        <div className="page-head__aside closing">
          <p className="lede">This page doesn&rsquo;t exist, or it has moved.</p>
          <Link href="/shop" className="link-arrow">
            Go to the shop
          </Link>
        </div>
      </header>
    </div>
  );
}
