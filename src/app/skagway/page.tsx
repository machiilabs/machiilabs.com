import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { MachiiLogo } from "@/components/machii-logo";
import { SKAGWAY_FAQ } from "@/lib/skagway-faq";
import {
  latestSkagwayRelease,
  SKAGWAY_RELEASES,
  skagwayReleaseItemLabel,
  skagwayVersionLabel,
} from "@/lib/skagway-releases";

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

const latestRelease = latestSkagwayRelease();
const VERSION_LABEL = skagwayVersionLabel(latestRelease.version);
const olderReleases = SKAGWAY_RELEASES.slice(1);

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
    body: "Hover grid cards or List thumbnails for Live Preview, or open the filmstrip and jump to any frame. Scrub the collection without committing to a full play.",
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
    body: "Floating player in three sizes: compact, full screen and custom — resume where you left off, Play All through the current view, and bookmarks with stills for any moment worth returning to.",
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

function AccordionChevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
              Free forever · {VERSION_LABEL}
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
                product="skagway"
                meta={`${VERSION_LABEL} · macOS 26+`}
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

        <section
          aria-labelledby="skagway-new-in-version"
          className="relative left-1/2 mt-16 w-screen max-w-[100vw] -translate-x-1/2 sm:mt-20"
        >
          <div className="border-y border-[#dccfb8] bg-[#f3efe6] px-6 py-12 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-6xl">
              <p
                id="skagway-new-in-version"
                className="text-xs font-semibold tracking-[0.16em] text-[#9a5b14] uppercase"
              >
                New in version {latestRelease.version}
              </p>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:gap-8">
                {latestRelease.highlights?.map((item) => (
                  <div key={item.title}>
                    <h2 className="font-display text-lg font-bold tracking-tight text-[#1a1a1a] sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                      {item.body}
                    </p>
                    {item.learnMoreHref ? (
                      <p className="mt-3 text-sm sm:text-base">
                        <Link
                          href={item.learnMoreHref}
                          className="font-semibold text-[#9a5b14] transition-colors hover:text-[#7a490f]"
                        >
                          Learn more
                        </Link>
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {olderReleases.length > 0 ? (
          <details className="group mt-8 border-y border-white/10 sm:mt-10">
            <summary className="cursor-pointer list-none py-3.5 font-display text-lg font-bold tracking-tight text-snow marker:content-none sm:py-4 sm:text-xl [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                Previous releases
                <AccordionChevron className="size-5 shrink-0 text-afterburn-soft transition-transform duration-200 group-open:rotate-180" />
              </span>
            </summary>
            <div className="space-y-10 border-t border-white/10 pb-8 pt-8">
              {olderReleases.map((release) => (
                <div key={release.version}>
                  <p className="font-mono text-sm font-semibold tracking-wide text-afterburn-soft">
                    {release.version}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fog sm:text-base">
                    {release.items?.map((item) => (
                      <li key={`${release.version}-${item.kind}-${item.text}`}>
                        <span className="font-semibold text-snow">
                          {skagwayReleaseItemLabel(item.kind)}:
                        </span>{" "}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ) : null}

        <div
          className={`mt-12 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8 ${
            olderReleases.length === 0
              ? "border-t border-white/10 pt-12 sm:pt-14"
              : ""
          }`}
        >
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
            FAQ
          </h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {SKAGWAY_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-white/10"
              >
                <summary className="cursor-pointer list-none px-4 py-3 text-base font-semibold text-snow marker:content-none sm:px-5 sm:py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.question}
                    <AccordionChevron className="size-5 shrink-0 text-afterburn-soft transition-transform duration-200 group-open:rotate-180" />
                  </span>
                </summary>
                <div className="border-t border-white/10 px-4 py-4 text-sm leading-relaxed text-fog sm:px-5 sm:text-base">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

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
              product="skagway"
              meta={`${VERSION_LABEL} · macOS 26+`}
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
