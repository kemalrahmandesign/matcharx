"use client";

import { useState } from "react";

// Posts the email to a newsletter provider's form endpoint (Buttondown,
// Mailchimp, Formspree, …) set in NEXT_PUBLIC_SIGNUP_URL. Until one is set the
// form says sign-ups aren't open, rather than pretending to save the address.
const endpoint = process.env.NEXT_PUBLIC_SIGNUP_URL;

type State = "idle" | "sending" | "done" | "error" | "closed";

export function SignUp() {
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      setState("closed");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: new FormData(e.currentTarget), headers: { Accept: "application/json" } });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="signup" onSubmit={submit}>
      <label htmlFor="signup-email" className="label">
        Sign up for new harvests and restocks
      </label>
      {state === "done" ? (
        <p className="signup__note">You&rsquo;re on the list.</p>
      ) : (
        <div className="signup__row">
          <input id="signup-email" name="email" type="email" required autoComplete="email" placeholder="Email address" className="signup__input" />
          <button type="submit" className="button" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Sign up"}
          </button>
        </div>
      )}
      {state === "closed" && <p className="signup__note muted small">Sign-ups open soon. Check back shortly.</p>}
      {state === "error" && (
        <p className="signup__note small error" role="alert">
          That didn&rsquo;t go through. Check the address and try again.
        </p>
      )}
    </form>
  );
}
