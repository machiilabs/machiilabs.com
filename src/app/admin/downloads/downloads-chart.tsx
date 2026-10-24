"use client";

import { useMemo, useState } from "react";
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
  const [active, setActive] = useState<number | null>(null);

  const layout = useMemo(() => {
    const max = Math.max(
      1,
      ...buckets.flatMap((bucket) =>
        DOWNLOAD_PRODUCTS.map((product) => bucket.counts[product]),
      ),
    );
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const groupW = buckets.length > 0 ? innerW / buckets.length : innerW;
    const inset = groupW * 0.22;
    const barW = (groupW - inset) / DOWNLOAD_PRODUCTS.length;

    const groups = buckets.map((bucket, i) => {
      const groupX = PAD.left + i * groupW;
      const bars = DOWNLOAD_PRODUCTS.map((product, j) => {
        const value = bucket.counts[product];
        const raw = (value / max) * innerH;
        const barH = value > 0 ? Math.max(raw, 1.5) : 0;
        return {
          product,
          x: groupX + inset / 2 + j * barW,
          y: PAD.top + innerH - barH,
          height: barH,
          width: Math.max(barW - 1.5, 1),
        };
      });
      return {
        groupX,
        centerX: groupX + groupW / 2,
        bars,
      };
    });

    return { max, groupW, groups };
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

  const yTicks = [...new Set([0, Math.round(layout.max / 2), layout.max])];
  const labelEvery = Math.max(1, Math.ceil(buckets.length / 8));
  const hover = active != null ? buckets[active] : null;
  const hoverX = active != null ? layout.groups[active]?.centerX : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="Downloads by product as vertical bars"
        onMouseLeave={() => setActive(null)}
      >
        {yTicks.map((tick) => {
          const y =
            PAD.top +
            (HEIGHT - PAD.top - PAD.bottom) * (1 - tick / layout.max);
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

        {layout.groups.map((group, i) =>
          i % labelEvery === 0 || i === buckets.length - 1 ? (
            <text
              key={buckets[i].start}
              x={group.centerX}
              y={HEIGHT - 10}
              textAnchor="middle"
              className="fill-fog"
              fontSize="10"
            >
              {buckets[i].label}
            </text>
          ) : null,
        )}

        {layout.groups.map((group) =>
          group.bars.map((bar) =>
            bar.height > 0 ? (
              <rect
                key={`${bar.product}-${bar.x}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                rx={1}
                fill={SERIES[bar.product].color}
              />
            ) : null,
          ),
        )}

        {layout.groups.map((group, i) => (
          <rect
            key={`${buckets[i].start}-hit`}
            x={group.groupX}
            y={PAD.top}
            width={layout.groupW}
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
              className="inline-block size-2.5 rounded-sm"
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
