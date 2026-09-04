import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { MachiiLogo } from "@/components/machii-logo";

export const metadata: Metadata = {
  title: "Mac Video Organizer & Library — Skagway",
  description:
    "Skagway is a fast Mac video organizer and library for the files already on your drives — built for large collections. Free forever from Mach II Labs.",
  openGraph: {
    title: "Mac Video Organizer & Library — Skagway",
    description:
      "Organize and play the video files already on your Mac. Fast with large libraries. Free forever.",
    url: "https://machiilabs.com/skagway",
  },
  twitter: {
    title: "Mac Video Organizer & Library — Skagway",
    description:
      "Organize and play the video files already on your Mac. Fast with large libraries. Free forever.",
  },
  alternates: {
    canonical: "https://machiilabs.com/skagway",
  },
};

const DOWNLOAD_URL = "https://downloads.machiilabs.com/Skagway.dmg";
const VERSION = "1.0.0";

type Feature = {
  title: string;
  body: string;
  screenshot: string;
  screenshotAlt: string;
  screenshotHint: string;
};

const features: Feature[] = [
  {
    title: "Your folders, indexed — your files untouched",
    body: "Point Skagway at the folders you already keep. It builds a fast catalog and thumbnails in the background — nothing moves into a proprietary container.",
    screenshot: "explore-grid.png",
    screenshotAlt:
      "Skagway grid view showing a large video library with thumbnails, durations, and ratings",
    screenshotHint:
      "Full window in Grid view with a well-populated library — rich thumbnails, a few rated videos, toolbar with Grid/List, Sort, Play All, and Search videos.",
  },
  {
    title: "See inside without opening",
    body: "Hover for Live Preview, or open the filmstrip and jump to any frame. Scrub the collection without committing to a full play.",
    screenshot: "explore-filmstrip.png",
    screenshotAlt:
      "Skagway Inspector showing a filmstrip grid of frames for the selected video",
    screenshotHint:
      "Inspector with the Filmstrip view selected — a clear grid of frames for one video.",
  },
  {
    title: "Find anything in seconds",
    body: "Search titles, names, tags, and custom fields. Quick Filter and Advanced Filter narrow by rating, duration, quality, and rules you can save as smart collections.",
    screenshot: "explore-filter.png",
    screenshotAlt:
      "Skagway Quick Filter drawer with Smart Libraries, Rating, Duration, Quality, and Tags",
    screenshotHint:
      "Quick Filter drawer open over the grid, showing Smart Libraries, Rating, Duration, Quality, and Tags.",
  },
  {
    title: "Rate, tag, collect",
    body: "Inspector metadata for one video or fifty. Smart collections stay current on their own; albums are hand-picked playlists with Album Order and Play All.",
    screenshot: "explore-inspector.png",
    screenshotAlt:
      "Skagway Inspector with rating stars, tag chips, subtitles picker, and custom metadata fields",
    screenshotHint:
      "Inspector for a selected video: rating stars, tag chips, and at least one custom field.",
  },
  {
    title: "A player that stays out of the way",
    body: "Floating player in three sizes, including full screen — resume where you left off, Play All through the current view, and bookmarks with stills for any moment worth returning to.",
    screenshot: "explore-player.png",
    screenshotAlt:
      "Skagway floating player with traffic lights and custom transport controls over the library grid",
    screenshotHint:
      "Floating player over the grid with scrubber, transport controls, and bookmark ticks visible.",
  },
  {
    title: "Real file tools, portable data",
    body: "Bulk rename, cross-volume moves, Fix for Built-in Player…, and metadata export/import. Queues survive quitting. Your library is one file you can copy anytime.",
    screenshot: "explore-file-ops.png",
    screenshotAlt:
      "Skagway context menu with Bulk Rename…, Move Files…, Fix for Built-in Player…, and Set Poster from Image…",
    screenshotHint:
      "Right-click context menu showing Bulk Rename…, Move Files…, Fix for Built-in Player…, and related file tools.",
  },
];

const quickPoints = [
  {
    title: "Tuned for scale",
    body: "Built to stay smooth with thousands of videos — long, short, tiny, and enormous files alike.",
  },
  {
    title: "Keyboard-driven",
    body: "Arrows, Space, Play All, and one consistent modifier scheme — triage without reaching for the mouse.",
  },
  {
    title: "Private by default",
    body: "No telemetry, no analytics, no account. Optional update checks stay off until you turn them on. None of your data ever leaves your computer.",
  },
];

function exploreScreenshotExists(filename: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public", "skagway", "explore", filename),
  );
}

function exploreScreenshotSrc(filename: string): string {
  const filePath = path.join(
    process.cwd(),
    "public",
    "skagway",
    "explore",
    filename,
  );
  const version = fs.statSync(filePath).mtimeMs;
  return `/skagway/explore/${filename}?v=${Math.floor(version)}`;
}

function FeatureFigure({ feature }: { feature: Feature }) {
  if (!exploreScreenshotExists(feature.screenshot)) {
    return (
      <figure className="mt-6 border border-dashed border-white/20 bg-black/40 px-6 py-12 text-center">
        <p className="font-display text-sm font-semibold tracking-wide text-snow">
          Screenshot needed
        </p>
        <p className="mt-3 font-mono text-sm text-afterburn-soft">
          public/skagway/explore/{feature.screenshot}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fog">
          {feature.screenshotHint}
        </p>
      </figure>
    );
  }

  return (
    <figure className="mt-6 bg-black p-3 sm:p-4">
      <Image
        src={exploreScreenshotSrc(feature.screenshot)}
        alt={feature.screenshotAlt}
        width={2400}
        height={1500}
        className="h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 42rem"
        unoptimized
      />
    </figure>
  );
}

export default function SkagwayPage() {
  return (
    <div className="relative min-h-dvh bg-ink text-snow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 sky-drift"
          style={{
            background: `
              radial-gradient(110% 70% at 80% 0%, rgba(61, 111, 154, 0.35) 0%, transparent 55%),
              radial-gradient(80% 50% at 10% 90%, rgba(232, 160, 69, 0.14) 0%, transparent 50%),
              linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
            `,
          }}
        />
        <div
          className="horizon-glow absolute inset-x-0 bottom-0 h-[36vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(232, 160, 69, 0.18) 0%, rgba(61, 111, 154, 0.14) 40%, transparent 100%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <MachiiLogo />
        <div className="flex items-center gap-6">
          <Link
            href="/skagway/manual"
            className="text-sm text-fog/80 transition-colors hover:text-snow"
          >
            Manual
          </Link>
          <a
            href="mailto:support@machiilabs.com"
            className="text-sm text-fog/80 transition-colors hover:text-snow"
          >
            Support
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-6 sm:px-10 sm:pt-8">
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
          <div className="relative z-20 max-w-xl lg:pt-2">
            <p className="anim-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
              Free forever · v{VERSION}
            </p>

            <h1 className="anim-rise anim-rise-delay-1 mt-5 font-display text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.1] font-extrabold tracking-[-0.04em] text-snow">
              Skagway
            </h1>

            <p className="anim-rise anim-rise-delay-2 mt-6 font-display text-2xl leading-snug font-semibold tracking-tight text-snow sm:text-3xl">
              A Mac video organizer for the files already on your drives.
            </p>

            <p className="anim-rise anim-rise-delay-3 mt-5 text-lg leading-relaxed text-fog sm:text-xl">
              Browse, tag, filter, and play large collections — without locking
              media into a proprietary container. Built to stay fast with
              thousands of videos.
            </p>

            <div className="anim-rise anim-rise-delay-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <DownloadButton
                href={DOWNLOAD_URL}
                meta={`v${VERSION} · macOS 26+`}
              />
              <Link
                href="/skagway/manual"
                className="font-display text-base font-semibold tracking-wide text-fog transition-colors hover:text-snow"
              >
                Manual
              </Link>
              <span className="w-full text-sm text-fog/80 sm:w-auto">
                macOS 26+ · notarized DMG
              </span>
            </div>
          </div>

          <div className="relative z-0 mt-[1in] ml-[1in] min-w-0 w-full">
            <div className="product-stage">
              <div className="product-frame bg-black p-[30px]">
                <Image
                  src="/skagway/product.png"
                  alt="Skagway personal library — video grid with detail panel"
                  width={4704}
                  height={2504}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:pt-14">
          {quickPoints.map((point) => (
            <section key={point.title}>
              <h2 className="font-display text-lg font-bold tracking-tight text-snow">
                {point.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fog sm:text-base">
                {point.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 max-w-3xl space-y-16 border-t border-white/10 pt-14 sm:mt-20 sm:space-y-20 sm:pt-16">
          {features.map((feature) => (
            <section key={feature.title}>
              <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
                {feature.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-fog sm:text-lg">
                {feature.body}
              </p>
              <FeatureFigure feature={feature} />
            </section>
          ))}
        </div>

        <section className="mt-20 border-t border-white/10 pt-14 sm:mt-24">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-snow sm:text-3xl">
            Free forever. Really.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            The full app — every feature above. No trial, no paywall, no limits.
            No phone-home telemetry by default. Serious software, yours forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <DownloadButton
              href={DOWNLOAD_URL}
              meta={`v${VERSION} · macOS 26+`}
            />
            <Link
              href="/skagway/manual"
              className="font-display text-base font-semibold tracking-wide text-fog transition-colors hover:text-snow"
            >
              Read the manual
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs · Skagway</span>
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
