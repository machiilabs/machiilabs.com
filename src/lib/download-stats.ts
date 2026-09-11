import {
  PRODUCT_DOWNLOADS,
  type DownloadProduct,
} from "@/lib/downloads";

export type { DownloadProduct };

export const DOWNLOAD_PERIODS = [
  { id: "1h", label: "Last hour" },
  { id: "24h", label: "Last 24 hours" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "all", label: "All time" },
] as const;

export type DownloadPeriodId = (typeof DOWNLOAD_PERIODS)[number]["id"];

export const DOWNLOAD_PRODUCTS = [
  "flasher",
  "winflasher",
  "skagway",
] as const satisfies readonly DownloadProduct[];

export const DOWNLOAD_PRODUCT_LABELS: Record<DownloadProduct, string> = {
  flasher: "15CE Flasher (Mac)",
  winflasher: "15CE Flasher (Windows)",
  skagway: "Skagway",
};

export type DownloadCounts = Record<DownloadProduct, number>;

export type DownloadBucket = {
  start: string;
  label: string;
  counts: DownloadCounts;
};

export type DownloadDashboardData = {
  period: DownloadPeriodId;
  since: string | null;
  until: string;
  totals: DownloadCounts;
  total: number;
  buckets: DownloadBucket[];
};

const EMPTY_COUNTS = (): DownloadCounts => ({
  flasher: 0,
  winflasher: 0,
  skagway: 0,
});

const LABEL_TZ = "America/Los_Angeles";

export function parseDownloadPeriod(
  value: string | undefined,
): DownloadPeriodId {
  return DOWNLOAD_PERIODS.some((period) => period.id === value)
    ? (value as DownloadPeriodId)
    : "7d";
}

function isProduct(value: string): value is DownloadProduct {
  return value in PRODUCT_DOWNLOADS;
}

export function periodWindow(
  period: DownloadPeriodId,
  now: Date,
  earliest: Date | null,
): { start: Date; stepMs: number } {
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;

  switch (period) {
    case "1h":
      return { start: new Date(now.getTime() - hour), stepMs: 5 * 60 * 1000 };
    case "24h":
      return { start: new Date(now.getTime() - day), stepMs: hour };
    case "7d":
      return { start: new Date(now.getTime() - 7 * day), stepMs: day };
    case "30d":
      return { start: new Date(now.getTime() - 30 * day), stepMs: day };
    case "all": {
      const start = earliest ?? new Date(now.getTime() - day);
      const span = Math.max(now.getTime() - start.getTime(), hour);
      let stepMs = day;
      if (span <= 2 * day) stepMs = hour;
      else if (span > 90 * day) stepMs = 7 * day;
      return { start, stepMs };
    }
  }
}

function formatBucketLabel(start: Date, stepMs: number): string {
  const hour = 60 * 60 * 1000;
  if (stepMs < hour) {
    return start.toLocaleString("en-US", {
      timeZone: LABEL_TZ,
      hour: "numeric",
      minute: "2-digit",
    });
  }
  if (stepMs < 24 * hour) {
    return start.toLocaleString("en-US", {
      timeZone: LABEL_TZ,
      month: "short",
      day: "numeric",
      hour: "numeric",
    });
  }
  return start.toLocaleDateString("en-US", {
    timeZone: LABEL_TZ,
    month: "short",
    day: "numeric",
  });
}

export function buildBuckets(
  events: { product: string; created_at: string }[],
  start: Date,
  end: Date,
  stepMs: number,
): { buckets: DownloadBucket[]; totals: DownloadCounts } {
  const totals = EMPTY_COUNTS();
  const bucketCount = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / stepMs));
  const buckets: DownloadBucket[] = Array.from({ length: bucketCount }, (_, i) => {
    const bucketStart = new Date(start.getTime() + i * stepMs);
    return {
      start: bucketStart.toISOString(),
      label: formatBucketLabel(bucketStart, stepMs),
      counts: EMPTY_COUNTS(),
    };
  });

  for (const event of events) {
    if (!isProduct(event.product)) continue;
    const ts = new Date(event.created_at).getTime();
    if (ts < start.getTime() || ts > end.getTime()) continue;
    let index = Math.floor((ts - start.getTime()) / stepMs);
    if (index >= buckets.length) index = buckets.length - 1;
    if (index < 0) continue;
    buckets[index].counts[event.product] += 1;
    totals[event.product] += 1;
  }

  return { buckets, totals };
}
