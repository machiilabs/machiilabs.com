"use client";

import { useId, useMemo, useState } from "react";
import {
  DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCT_LABELS,
  type DownloadBucket,
  type DownloadProduct,
} from "@/lib/download-stats";

const SERIES: Record<DownloadProduct, { color: string }> = {
  flasher: { color: "#e8a045" },
  winflasher: { color: "#6ea8d4" },
  skagway: { color: "#7eb89a" },
};

const WIDTH = 720;
const HEIGHT = 280;
const PAD = { top: 16, right: 16, bottom: 36, left: 36 };

export function DownloadsChart({ buckets }: { buckets: DownloadBucket[] }) {
  const clipId = useId();
  const [active, setActive] = useState<number | null>(null);

  const { max, points } = useMemo(() => {
    const peak = Math.max(
      1,
      ...buckets.flatMap((bucket) =>
        DOWNLOAD_PRODUCTS.map((product) => bucket.counts[product]),
      ),
    );
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const xFor = (i: number) =>
      PAD.left +
      (buckets.length <= 1 ? innerW / 2 : (i / (buckets.length - 1)) * innerW);
    const yFor = (value: number) =>
      PAD.top + innerH - (value / peak) * innerH;

    const seriesPoints = Object.fromEntries(
      DOWNLOAD_PRODUCTS.map((product) => [
        product,
        buckets.map((bucket, i) => ({
          x: xFor(i),
          y: yFor(bucket.counts[product]),
        })),
      ]),
    ) as Record<DownloadProduct, { x: number; y: number }[]>;

    return { max: peak, points: seriesPoints };
  }, [buckets]);

  const hasData = buckets.some((bucket) =>
    DOWNLOAD_PRODUCTS.some((product) => bucket.counts[product] > 0),
  );

  if (!hasData) {
    return (
      <p className="py-16 text-center text-sm text-fog">
        No download clicks in this period.
      </p>
    );
  }

  const yTicks = [...new Set([0, Math.round(max / 2), max])];
  const labelEvery = Math.max(1, Math.ceil(buckets.length / 8));
  const hover = active != null ? buckets[active] : null;
  const hoverX =
    active != null ? points.flasher[active]?.x : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="Downloads over time by product"
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <clipPath id={clipId}>
            <rect
              x={PAD.left}
              y={PAD.top}
              width={WIDTH - PAD.left - PAD.right}
              height={HEIGHT - PAD.top - PAD.bottom}
            />
          </clipPath>
        </defs>

        {yTicks.map((tick) => {
          const y =
            PAD.top +
            (HEIGHT - PAD.top - PAD.bottom) * (1 - tick / max);
          return (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x={PAD.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-fog"
                fontSize="10"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {buckets.map((bucket, i) =>
          i % labelEvery === 0 || i === buckets.length - 1 ? (
            <text
              key={bucket.start}
              x={points.flasher[i].x}
              y={HEIGHT - 10}
              textAnchor="middle"
              className="fill-fog"
              fontSize="10"
            >
              {bucket.label}
            </text>
          ) : null,
        )}

        <g clipPath={`url(#${clipId})`}>
          {DOWNLOAD_PRODUCTS.map((product) => {
            const series = points[product];
            const line = series
              .map((point, i) => `${i === 0 ? "M" : "L"}${point.x} ${point.y}`)
              .join(" ");
            return (
              <path
                key={product}
                d={line}
                fill="none"
                stroke={SERIES[product].color}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {hoverX != null ? (
          <line
            x1={hoverX}
            x2={hoverX}
            y1={PAD.top}
            y2={HEIGHT - PAD.bottom}
            stroke="rgba(255,255,255,0.2)"
          />
        ) : null}

        {buckets.map((bucket, i) => (
          <rect
            key={`${bucket.start}-hit`}
            x={
              i === 0
                ? PAD.left
                : (points.flasher[i].x + points.flasher[i - 1].x) / 2
            }
            y={PAD.top}
            width={
              i === 0
                ? (points.flasher[1]?.x ?? WIDTH - PAD.right) - PAD.left
                : i === buckets.length - 1
                  ? WIDTH - PAD.right - (points.flasher[i].x + points.flasher[i - 1].x) / 2
                  : (points.flasher[i + 1].x - points.flasher[i - 1].x) / 2
            }
            height={HEIGHT - PAD.top - PAD.bottom}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
          />
        ))}
      </svg>

      {hover && hoverX != null ? (
        <div
          className="pointer-events-none absolute top-2 rounded-md border border-white/10 bg-ink-elevated px-3 py-2 text-xs text-snow"
          style={{
            left: `clamp(0px, calc(${(hoverX / WIDTH) * 100}% - 70px), calc(100% - 160px))`,
          }}
        >
          <p className="mb-1 font-medium">{hover.label}</p>
          {DOWNLOAD_PRODUCTS.map((product) => (
            <p key={product} className="flex justify-between gap-4">
              <span style={{ color: SERIES[product].color }}>
                {DOWNLOAD_PRODUCT_LABELS[product]}
              </span>
              <span>{hover.counts[product]}</span>
            </p>
          ))}
        </div>
      ) : null}

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fog">
        {DOWNLOAD_PRODUCTS.map((product) => (
          <li key={product} className="flex items-center gap-2">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ background: SERIES[product].color }}
              aria-hidden
            />
            {DOWNLOAD_PRODUCT_LABELS[product]}
          </li>
        ))}
      </ul>
    </div>
  );
}
