import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MANUAL_PAGES, type ManualPage } from "./manual";

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
    <div className="relative min-h-dvh bg-ink text-snow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(90% 50% at 10% 0%, rgba(61, 111, 154, 0.22) 0%, transparent 55%),
              linear-gradient(165deg, #05080f 0%, #0a1220 45%, #081018 100%)
            `,
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 pt-8 sm:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/skagway"
            className="font-display text-sm font-semibold tracking-[0.18em] text-fog uppercase transition-colors hover:text-snow"
          >
            Skagway
          </Link>
          <Link
            href="/skagway/manual"
            className="text-sm text-fog/80 transition-colors hover:text-snow"
          >
            Manual
          </Link>
        </div>
        <a
          href="mailto:support@machiilabs.com"
          className="text-sm text-fog/80 transition-colors hover:text-snow"
        >
          Support
        </a>
      </header>

      <nav
        aria-label="Manual topics"
        className="relative z-10 mx-auto mt-8 hidden w-full max-w-6xl gap-x-5 gap-y-2 overflow-x-auto px-6 text-sm sm:flex sm:px-10"
      >
        <Link
          href="/skagway/manual"
          className={
            currentSlug === "first-launch"
              ? "shrink-0 font-display font-semibold text-afterburn-soft"
              : "shrink-0 text-fog/70 transition-colors hover:text-snow"
          }
        >
          First launch
        </Link>
        {MANUAL_PAGES.map((page) => {
          const active = page.slug === currentSlug;
          return (
            <Link
              key={page.slug}
              href={`/skagway/manual/${page.slug}`}
              className={
                active
                  ? "shrink-0 font-display font-semibold text-afterburn-soft"
                  : "shrink-0 text-fog/70 transition-colors hover:text-snow"
              }
            >
              {page.title}
            </Link>
          );
        })}
      </nav>

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs · Skagway Manual</span>
          <a
            href="mailto:support@machiilabs.com"
            className="transition-colors hover:text-snow"
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
      <span className="inline-flex items-center gap-2 rounded border border-dashed border-white/25 px-2 py-1 font-mono text-xs text-afterburn-soft">
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

  if (!ready) {
    return (
      <figure className="mt-10 border border-dashed border-white/20 bg-black/40 px-6 py-16 text-center">
        <p className="font-display text-sm font-semibold tracking-wide text-snow">
          Screenshot needed
        </p>
        <p className="mt-3 font-mono text-sm text-afterburn-soft">
          public/skagway/manual/{page.screenshot}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fog">
          {page.screenshotHint}
        </p>
      </figure>
    );
  }

  return (
    <figure className="mt-10 bg-black p-4 sm:p-5">
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
    <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm">
      {prev ? (
        <Link
          href={`/skagway/manual/${prev.slug}`}
          className="text-fog transition-colors hover:text-snow"
        >
          ← {prev.title}
        </Link>
      ) : (
        <Link
          href="/skagway/manual"
          className="text-fog transition-colors hover:text-snow"
        >
          ← First launch
        </Link>
      )}
      {next ? (
        <Link
          href={`/skagway/manual/${next.slug}`}
          className="text-fog transition-colors hover:text-snow"
        >
          {next.title} →
        </Link>
      ) : (
        <Link
          href="/skagway"
          className="text-fog transition-colors hover:text-snow"
        >
          Back to Skagway →
        </Link>
      )}
    </div>
  );
}
