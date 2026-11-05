import { site } from "@/lib/site";
import type { Review } from "@/lib/products";

export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {"★".repeat(full)}
      <span className="muted">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export function averageRating(reviews: Review[]) {
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function Reviews({ reviews = [] }: { reviews?: Review[] }) {
  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__head">
        <h2 id="reviews-title" className="title">
          Reviews
        </h2>
        {reviews.length > 0 && (
          <span className="label">
            <Stars rating={averageRating(reviews)} /> {averageRating(reviews).toFixed(1)} · {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="reviews__empty">
          <p>No reviews yet.</p>
          <p className="small muted">
            Bought this? Tell us how you found it at{" "}
            <a href={`mailto:${site.email}`} className="link-arrow">
              {site.email}
            </a>
          </p>
        </div>
      ) : (
        <ul className="reviews__list">
          {reviews.map((r) => (
            <li key={`${r.name}-${r.date}`} className="review">
              <div className="review__who">
                <Stars rating={r.rating} />
                <span className="label">{r.name}</span>
                <span className="label muted">{r.date}</span>
              </div>
              <div className="review__text">
                {r.title && <strong>{r.title}</strong>}
                <p>{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
