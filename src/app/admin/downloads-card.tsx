"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DownloadSummary } from "@/lib/download-stats";
import { LocalDateTime } from "./local-date-time";

const REFRESH_MS = 60_000;

export function DownloadsCard({
  initial,
}: {
  initial: DownloadSummary | null;
}) {
  const [summary, setSummary] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch("/admin/download-summary", { cache: "no-store" });
      if (!res.ok || cancelled) return;
      const next = (await res.json()) as DownloadSummary;
      if (!cancelled) setSummary(next);
    }

    const id = window.setInterval(() => {
      void load();
    }, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <Link
      href="/admin/downloads"
      className="mt-10 flex items-start justify-between gap-6 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-5 transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div>
        <p className="text-xs tracking-wide text-fog uppercase">Downloads</p>
        <p className="mt-2 font-display text-3xl font-bold tracking-tight text-snow">
          {summary
            ? `${summary.lastHour} / ${summary.last24Hours} / ${summary.allTime}`
            : "— / — / —"}
        </p>
        <p className="mt-2 text-sm text-fog">
          Last hour / last 24 hours / all time
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs tracking-wide text-fog uppercase">
          Last downloaded date
        </p>
        <p className="mt-2 text-sm text-snow">
          {summary?.lastDownloadedAt ? (
            <LocalDateTime iso={summary.lastDownloadedAt} />
          ) : (
            "—"
          )}
        </p>
      </div>
    </Link>
  );
}
