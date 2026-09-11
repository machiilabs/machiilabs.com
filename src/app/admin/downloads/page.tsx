import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/auth";
import { signOutAdmin } from "../actions";
import {
  DOWNLOAD_PERIODS,
  DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCT_LABELS,
  parseDownloadPeriod,
} from "@/lib/download-stats";
import { loadDownloadDashboard } from "@/lib/load-download-dashboard";
import { DownloadsChart } from "./downloads-chart";

export const metadata: Metadata = {
  title: "Download counts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatRange(since: string | null, until: string): string {
  const end = new Date(until).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  if (!since) return `Through ${end} PT`;
  const start = new Date(since).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return `${start} – ${end} PT`;
}

export default async function AdminDownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const user = await requireAdmin();
  const { period: periodParam } = await searchParams;
  const period = parseDownloadPeriod(periodParam);

  let data;
  let loadError: string | null = null;
  try {
    data = await loadDownloadDashboard(period);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Could not load events";
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-afterburn uppercase">
            Mach II Labs
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-snow">
            Download counts
          </h1>
          <p className="mt-2 text-sm text-fog">
            Signed in as {user.email}
          </p>
        </div>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-fog transition hover:border-white/30 hover:text-snow"
          >
            Sign out
          </button>
        </form>
      </header>

      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label="Time period"
      >
        {DOWNLOAD_PERIODS.map((option) => {
          const href =
            option.id === "7d"
              ? "/admin/downloads"
              : `/admin/downloads?period=${option.id}`;
          const selected = option.id === period;
          return (
            <Link
              key={option.id}
              href={href}
              scroll={false}
              className={
                selected
                  ? "rounded-md bg-afterburn px-3 py-1.5 text-sm font-semibold text-ink"
                  : "rounded-md border border-white/15 px-3 py-1.5 text-sm text-fog transition hover:border-white/30 hover:text-snow"
              }
              aria-current={selected ? "page" : undefined}
            >
              {option.label}
            </Link>
          );
        })}
      </nav>

      {loadError || !data ? (
        <p className="mt-10 text-sm text-red-300" role="alert">
          {loadError ?? "Could not load download events."}
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-fog">
            {formatRange(data.since, data.until)} · one row per download-button
            click
          </p>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-xs tracking-wide text-fog uppercase">Total</p>
              <p className="mt-2 font-display text-3xl font-bold text-snow">
                {data.total}
              </p>
            </article>
            {DOWNLOAD_PRODUCTS.map((product) => (
              <article
                key={product}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-xs tracking-wide text-fog uppercase">
                  {DOWNLOAD_PRODUCT_LABELS[product]}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-snow">
                  {data.totals[product]}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-5 sm:px-6">
            <h2 className="font-display text-lg font-semibold text-snow">
              Downloads over time
            </h2>
            <p className="mt-1 text-sm text-fog">
              {
                DOWNLOAD_PERIODS.find((option) => option.id === period)
                  ?.label
              }
            </p>
            <div className="mt-4">
              <DownloadsChart buckets={data.buckets} />
            </div>
          </section>
        </>
      )}

      <p className="mt-12 text-sm text-fog">
        <Link
          href="/admin"
          className="text-snow underline-offset-4 hover:underline"
        >
          ← Admin
        </Link>
      </p>
    </main>
  );
}
