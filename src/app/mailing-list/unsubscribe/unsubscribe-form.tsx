"use client";

import { useState, type FormEvent } from "react";

export function UnsubscribeForm({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/mailing-list/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-fog" role="status">
        You’re removed from the list. Your address has been deleted.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-fit rounded-md border border-white/15 bg-ink-elevated px-4 py-2.5 text-sm font-semibold text-snow transition hover:border-white/30 disabled:opacity-60"
      >
        {status === "loading" ? "Working…" : "Confirm unsubscribe"}
      </button>
      {status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          Something went wrong. Try again or email support@machiilabs.com.
        </p>
      ) : null}
    </form>
  );
}
