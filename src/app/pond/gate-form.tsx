"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { unlockPond } from "@/app/pond/actions";

export function GateForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await unlockPond(value);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-4 py-10">
      <p className="font-display text-xs font-semibold tracking-[0.18em] text-afterburn uppercase">
        Phoenix
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Pond</h1>
      <p className="mt-3 text-sm leading-6 text-fog">
        Private log for the backyard pond. The water stays on this card.
      </p>
      <form onSubmit={onSubmit} className="mt-8">
        <label htmlFor="pond-passphrase" className="text-sm text-fog">
          Passphrase
        </label>
        <input
          id="pond-passphrase"
          type="password"
          autoComplete="current-password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-ink-elevated px-3 py-3 text-base text-snow"
        />
        {error ? (
          <p className="mt-3 text-sm text-afterburn-soft" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending || value.length === 0}
          className="mt-4 min-h-11 w-full rounded-md bg-afterburn px-4 py-3 text-base font-semibold text-ink disabled:opacity-50"
        >
          {pending ? "Checking…" : "Unlock"}
        </button>
      </form>
    </main>
  );
}
