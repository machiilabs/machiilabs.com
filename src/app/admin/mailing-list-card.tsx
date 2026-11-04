"use client";

import { useState } from "react";
import { generateMailingList } from "./actions";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "copied"; count: number }
  | { kind: "empty" }
  | { kind: "copy-failed"; text: string }
  | { kind: "error" };

export function MailingListCard() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onGenerate() {
    setStatus({ kind: "loading" });

    const result = await generateMailingList();
    if (!result.ok) {
      setStatus({ kind: "error" });
      return;
    }

    if (result.count === 0 || result.text === "") {
      setStatus({ kind: "empty" });
      return;
    }

    try {
      await navigator.clipboard.writeText(result.text);
      setStatus({ kind: "copied", count: result.count });
    } catch {
      setStatus({ kind: "copy-failed", text: result.text });
    }
  }

  const message =
    status.kind === "loading"
      ? "Loading the list…"
      : status.kind === "copied"
        ? `Copied ${status.count} ${status.count === 1 ? "address" : "addresses"}.`
        : status.kind === "empty"
          ? "No subscribers."
          : status.kind === "copy-failed"
            ? "Select the list and copy it."
            : status.kind === "error"
              ? "Could not load the list."
              : null;

  return (
    <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-5">
      <h2 className="font-display text-lg font-semibold text-snow">
        Announcement list
      </h2>
      <p className="mt-1 text-sm text-fog">
        Copies the email and unsubscribe token for each subscriber, one line
        each. Paste it into scripts/send-mailing.py to send.
      </p>
      <button
        type="button"
        onClick={() => {
          void onGenerate();
        }}
        disabled={status.kind === "loading"}
        className="mt-4 rounded-md bg-afterburn px-4 py-2.5 text-sm font-semibold text-ink transition enabled:hover:bg-afterburn-soft disabled:opacity-60"
      >
        {status.kind === "loading" ? "Generating…" : "Generate mailing list"}
      </button>
      {message ? (
        <p className="mt-3 text-sm text-fog" role="status">
          {message}
        </p>
      ) : null}
      {status.kind === "copy-failed" ? (
        <textarea
          readOnly
          value={status.text}
          rows={Math.min(8, status.text.split("\n").length)}
          className="mt-3 w-full rounded-md border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-snow outline-none"
          aria-label="Mailing list"
        />
      ) : null}
    </section>
  );
}
