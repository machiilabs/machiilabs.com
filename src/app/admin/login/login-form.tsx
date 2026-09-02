"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    const supabase = createClient();
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
        // Signup is disabled on the project; only existing users receive a link.
        shouldCreateUser: false,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage("Check your email for the magic link.");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm text-fog">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-white/15 bg-ink-elevated px-3 py-2.5 text-snow outline-none focus:border-afterburn/60"
          placeholder="you@example.com"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading" || status === "sent"}
        className="rounded-md bg-afterburn px-4 py-2.5 text-sm font-semibold text-ink transition enabled:hover:bg-afterburn-soft disabled:opacity-60"
      >
        {status === "loading"
          ? "Sending…"
          : status === "sent"
            ? "Link sent"
            : "Send magic link"}
      </button>
      {message ? (
        <p
          className={`text-sm ${status === "error" ? "text-red-300" : "text-fog"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
