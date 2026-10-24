"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function AnnouncementSignup({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget as HTMLFormElement;
    const honeypot = (
      form.elements.namedItem("company") as HTMLInputElement | null
    )?.value;

    try {
      const res = await fetch("/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company: honeypot ?? "" }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="product-announcements"
      className={`w-full max-w-xl border-t pt-10 ${light ? "border-[#e5e7eb]" : "border-white/10"}`}
    >
      <p
        className={`text-sm font-semibold tracking-[0.18em] uppercase ${light ? "text-[#8a5a20]" : "text-afterburn-soft"}`}
      >
        Product announcements
      </p>
      <p
        className={`mt-3 text-base leading-relaxed sm:text-lg ${light ? "text-[#4b5563]" : "text-fog"}`}
      >
        Occasional notes when Mach II Labs ships something new. Unsubscribe
        anytime.
      </p>
      {status === "done" ? (
        <p
          className={`mt-5 text-sm ${light ? "text-[#1a1a1a]" : "text-snow"}`}
          role="status"
        >
          You’re on the list. We’ll only write when there’s a product update.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <label className="sr-only" htmlFor="announce-email">
            Email
          </label>
          <input
            id="announce-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={
              light
                ? "min-w-0 flex-1 rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] outline-none placeholder:text-[#9ca3af] focus:border-[#8a5a20]"
                : "min-w-0 flex-1 rounded-md border border-white/15 bg-ink-elevated px-3 py-2.5 text-sm text-snow outline-none placeholder:text-fog/50 focus:border-afterburn/60"
            }
          />
          {/* Honeypot — leave empty */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-md bg-afterburn px-4 py-2.5 text-sm font-semibold text-ink transition enabled:hover:bg-afterburn-soft disabled:opacity-60"
          >
            {status === "loading" ? "Joining…" : "Notify me"}
          </button>
        </form>
      )}
      {status === "error" ? (
        <p
          className={`mt-3 text-sm ${light ? "text-red-700" : "text-red-300"}`}
          role="alert"
        >
          Couldn’t save that address. Check the email and try again.
        </p>
      ) : null}
      <p className={`mt-3 text-xs ${light ? "text-[#6b7280]" : "text-fog/70"}`}>
        See how we use this in our{" "}
        <Link
          href="/privacy"
          className={
            light
              ? "text-[#4b5563] underline-offset-2 hover:text-[#1a1a1a] hover:underline"
              : "text-fog underline-offset-2 hover:text-snow hover:underline"
          }
        >
          privacy note
        </Link>
        .
      </p>
    </div>
  );
}
