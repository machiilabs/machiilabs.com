import { createServiceClient } from "@/lib/supabase/admin";
import {
  DOWNLOAD_PRODUCTS,
  buildBuckets,
  periodWindow,
  type DownloadDashboardData,
  type DownloadPeriodId,
  type DownloadSummary,
} from "@/lib/download-stats";

const PAGE_SIZE = 1000;

async function fetchDownloadEvents(since: Date | null): Promise<
  { product: string; created_at: string }[]
> {
  const supabase = createServiceClient();
  const rows: { product: string; created_at: string }[] = [];
  let from = 0;

  while (true) {
    let query = supabase
      .from("site_download_events")
      .select("product, created_at")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (since) {
      query = query.gte("created_at", since.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

export type { DownloadSummary };

export async function loadDownloadSummary(): Promise<DownloadSummary> {
  const events = await fetchDownloadEvents(null);
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const dayAgo = now - 24 * 60 * 60 * 1000;
  let lastHour = 0;
  let last24Hours = 0;

  for (const event of events) {
    const ts = new Date(event.created_at).getTime();
    if (ts >= dayAgo) last24Hours += 1;
    if (ts >= hourAgo) lastHour += 1;
  }

  return {
    lastHour,
    last24Hours,
    allTime: events.length,
    lastDownloadedAt: events.at(-1)?.created_at ?? null,
  };
}

export async function loadDownloadDashboard(
  period: DownloadPeriodId,
): Promise<DownloadDashboardData> {
  const now = new Date();
  const fetchSince =
    period === "all" ? null : periodWindow(period, now, null).start;
  const events = await fetchDownloadEvents(fetchSince);
  const earliest =
    period === "all" && events[0]
      ? new Date(events[0].created_at)
      : fetchSince;
  const { start, stepMs } = periodWindow(period, now, earliest);
  const { buckets, totals } = buildBuckets(events, start, now, stepMs);

  return {
    period,
    since: period === "all" ? (earliest?.toISOString() ?? null) : start.toISOString(),
    until: now.toISOString(),
    totals,
    total: DOWNLOAD_PRODUCTS.reduce((sum, product) => sum + totals[product], 0),
    buckets,
  };
}
