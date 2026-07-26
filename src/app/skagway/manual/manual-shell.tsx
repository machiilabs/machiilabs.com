import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  manualPageHref,
  type ManualPage,
  type ManualStep,
  type ManualTable,
} from "./manual";
import { ManualInline } from "./manual-inline";
import { ManualSearch } from "./manual-search";
import { ManualSidebar } from "./manual-sidebar";

function ManualStepTable({ table }: { table: ManualTable }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-snug text-[#374151]">
        <thead>
          <tr className="border-b border-[#e5e7eb] text-[#1a1a1a]">
            {table.columns.map((column, index) => (
              <th
                key={column}
                className={
                  index === 0
                    ? "whitespace-nowrap px-2 py-2 font-semibold first:pl-0 last:pr-0"
                    : "px-2 py-2 font-semibold first:pl-0 last:pr-0"
                }
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.join("|")}
              className="border-b border-[#f3f4f6] align-top last:border-b-0"
            >
              {row.map((cell, index) => (
                <td
                  key={`${table.columns[index] ?? index}-${cell}`}
                  className={
                    index === 0
                      ? "whitespace-nowrap px-2 py-2.5 first:pl-0 last:pr-0"
                      : "px-2 py-2.5 first:pl-0 last:pr-0"
                  }
                >
                  <ManualInline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ManualSteps({ steps }: { steps: ManualStep[] }) {
  return (
    <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
      {steps.map((step) => {
        const text = typeof step === "string" ? step : step.text;
        const substeps = typeof step === "string" ? null : step.substeps;
        const table = typeof step === "string" ? null : step.table;

        return (
          <li key={text} className="pl-1">
            <ManualInline text={text} />
            {substeps && substeps.length > 0 ? (
              <ol className="mt-2 list-[lower-alpha] space-y-2 pl-6">
                {substeps.map((sub) => (
                  <li key={sub} className="pl-1">
                    <ManualInline text={sub} />
                  </li>
                ))}
              </ol>
            ) : null}
            {table ? <ManualStepTable table={table} /> : null}
          </li>
        );
      })}
    </ol>
  );
}

export function manualScreenshotExists(filename: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public", "skagway", "manual", filename),
  );
}

function manualScreenshotSrc(filename: string): string {
  const filePath = path.join(
    process.cwd(),
    "public",
    "skagway",
    "manual",
    filename,
  );
  const version = fs.statSync(filePath).mtimeMs;
  return `/skagway/manual/${filename}?v=${Math.floor(version)}`;
}

export function ManualShell({
  children,
  currentSlug,
}: {
  children: ReactNode;
  currentSlug?: string;
}) {
  return (
    <div className="manual-docs relative min-h-dvh bg-[#fafafa] text-[#1a1a1a]">
      <header className="relative z-20 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-3.5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/skagway"
              className="text-sm font-medium text-[#4b5563] hover:text-[#1a1a1a]"
            >
              Skagway
            </Link>
            <Link
              href="/skagway/manual"
              className="text-sm font-semibold text-[#1a1a1a]"
            >
              Manual
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <ManualSearch />
            <a
              href="mailto:support@machiilabs.com"
              className="text-sm text-[#4b5563] hover:text-[#1a1a1a]"
            >
              Support
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <details className="group w-full border-b border-[#e5e7eb] py-3 lg:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[#1a1a1a] marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              Contents
              <span className="text-[#6b7280] transition-transform group-open:rotate-90">
                ›
              </span>
            </span>
          </summary>
          <div
            data-manual-sidebar-scroll
            className="mt-4 max-h-[60vh] overflow-y-auto pb-2"
          >
            <ManualSidebar currentSlug={currentSlug} />
          </div>
        </details>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pb-24 pt-2 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:pt-8">
        <aside className="relative hidden lg:block">
          <div
            data-manual-sidebar-scroll
            className="sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pb-10 pr-2"
          >
            <ManualSidebar currentSlug={currentSlug} />
          </div>
        </aside>

        <main className="min-w-0 max-w-3xl pt-4 lg:pt-0">{children}</main>
      </div>

      <footer className="relative z-10 border-t border-[#e5e7eb] bg-white px-6 py-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs · Skagway Manual</span>
          <a
            href="mailto:support@machiilabs.com"
            className="hover:text-[#1a1a1a]"
          >
            support@machiilabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export function ManualIcon({
  filename,
  alt,
}: {
  filename: string;
  alt: string;
}) {
  if (!manualScreenshotExists(filename)) {
    return (
      <span className="inline-flex items-center gap-2 rounded border border-dashed border-[#d1d5db] px-2 py-1 font-mono text-xs text-[#6b7280]">
        {filename}
      </span>
    );
  }

  return (
    <Image
      src={manualScreenshotSrc(filename)}
      alt={alt}
      width={32}
      height={32}
      className="inline-block h-8 w-8 object-contain align-middle"
      unoptimized
    />
  );
}

export function ManualFigure({ page }: { page: ManualPage }) {
  if (!page.screenshot) return null;

  const ready = manualScreenshotExists(page.screenshot);
  const scale = page.screenshotScale ?? 1;
  const figureStyle =
    scale < 1 ? { width: `${Math.round(scale * 100)}%` } : undefined;

  if (!ready) {
    return (
      <figure
        className="mt-8 border border-dashed border-[#d1d5db] bg-white px-6 py-14 text-center"
        style={figureStyle}
      >
        <p className="text-sm font-semibold text-[#1a1a1a]">Screenshot needed</p>
        <p className="mt-2 font-mono text-sm text-[#6b7280]">
          public/skagway/manual/{page.screenshot}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4b5563]">
          {page.screenshotHint}
        </p>
      </figure>
    );
  }

  return (
    <figure
      className="mt-8 border border-[#e5e7eb] bg-white p-2 sm:p-3"
      style={figureStyle}
    >
      <Image
        src={manualScreenshotSrc(page.screenshot)}
        alt={page.screenshotAlt ?? page.title}
        width={2400}
        height={1500}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 48rem"
        unoptimized
      />
      <figcaption className="sr-only">{page.screenshotAlt}</figcaption>
    </figure>
  );
}

export function ManualPager({
  prev,
  next,
}: {
  prev?: ManualPage;
  next?: ManualPage;
}) {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5e7eb] pt-6 text-sm">
      {prev ? (
        <Link
          href={manualPageHref(prev.slug)}
          className="text-[#4b5563] hover:text-[#1a1a1a]"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={manualPageHref(next.slug)}
          className="text-[#4b5563] hover:text-[#1a1a1a]"
        >
          {next.title} →
        </Link>
      ) : (
        <Link href="/skagway" className="text-[#4b5563] hover:text-[#1a1a1a]">
          Back to Skagway →
        </Link>
      )}
    </div>
  );
}
