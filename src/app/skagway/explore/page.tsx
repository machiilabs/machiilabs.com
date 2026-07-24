import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features — Skagway",
  description:
    "A closer look at Skagway: on-disk libraries, live previews, video bookmarks, powerful filters, smart collections, a floating player, and privacy-first Mac video organization.",
  openGraph: {
    title: "Features — Skagway",
    description:
      "Explore how Skagway organizes the video files already on your Mac — without a proprietary library container.",
    url: "https://machiilabs.com/skagway/explore",
  },
  twitter: {
    title: "Features — Skagway",
    description:
      "Explore how Skagway organizes the video files already on your Mac — without a proprietary library container.",
  },
  alternates: {
    canonical: "https://machiilabs.com/skagway/explore",
  },
};

const DOWNLOAD_URL = "https://downloads.machiilabs.com/Skagway.dmg";
const VERSION = "0.63.0";

type Feature = {
  title: string;
  body: string[];
  /** Expected file under public/skagway/explore/ */
  screenshot?: string;
  screenshotAlt?: string;
  screenshotHint?: string;
};

const features: Feature[] = [
  {
    title: "Your folders, indexed — your files untouched",
    body: [
      "Point Skagway at the folders you already keep on disk — internal drives, externals, wherever your collection lives. It builds a fast catalog over those paths and generates thumbnails in the background.",
      "Nothing is moved, renamed, re-wrapped, or locked into a proprietary container. Unplug Skagway tomorrow and your files are exactly where you left them.",
    ],
    screenshot: "explore-grid.png",
    screenshotAlt:
      "Skagway grid view showing a large video library with thumbnails, durations, and ratings",
    screenshotHint:
      "Full window in Grid view with a well-populated library — rich thumbnails, a few rated videos, the toolbar visible.",
  },
  {
    title: "See inside a video without opening it",
    body: [
      "Rest the pointer on any card and Live Preview plays a silent tour through the video — short clips sampled from start to finish. No clicking, no scrubbing.",
      "Prefer frames to motion? Every video also gets a filmstrip: a grid of stills across the whole timeline. Click any frame and playback starts at exactly that moment.",
    ],
    screenshot: "explore-filmstrip.png",
    screenshotAlt:
      "Skagway Inspector showing a filmstrip grid of frames for the selected video",
    screenshotHint:
      "Inspector with the Filmstrip view selected — a clear grid of frames for one video. Bonus if the pointer is mid-hover on a grid card.",
  },
  {
    title: "Find anything in seconds",
    body: [
      "Quick Filter narrows thousands of videos with a click: star ratings, duration ranges, quality from SD to 8K+, tags, and built-in smart libraries like Recently Added, Top Rated, and Duplicates.",
      "Need surgical precision? Advanced Filter builds rule sets — “tagged Vacation AND rated 4+ stars, OR tagged Favorite” — with the same attributes available to saved collections.",
    ],
    screenshot: "explore-filter.png",
    screenshotAlt:
      "Skagway Quick Filter drawer with Smart Libraries, Rating, Duration, Quality, and Tags",
    screenshotHint:
      "Quick Filter drawer open (⇧⌘F) over the grid, showing the Smart Libraries, Rating, Duration, Quality, and Tags cards.",
  },
  {
    title: "Collections that curate themselves",
    body: [
      "Save any set of rules as a smart collection and it stays current on its own — rate or tag a new video and it joins every collection it matches. No re-filing, ever.",
      "Want hand-picked sets too? Albums hold exactly the videos you choose. Both live one click away in the filter drawer.",
    ],
    screenshot: "explore-collections.png",
    screenshotAlt:
      "Skagway collection editor with match rules, next to a list of collections and albums",
    screenshotHint:
      "The New Collection editor with two or three rules visible — or the Collections card showing a few smart collections and albums.",
  },
  {
    title: "Rate, tag, and define your own metadata",
    body: [
      "Select a video — or fifty — and the Inspector puts ratings, tags, and technical details one click away. Multi-select editing applies changes to everything at once.",
      "Go beyond the built-ins with custom fields: text, numbers, dates — whatever your library needs. Custom fields flow through sorting, columns, filters, collections, and export.",
    ],
    screenshot: "explore-inspector.png",
    screenshotAlt:
      "Skagway Inspector with rating stars, tag chips, and custom metadata fields",
    screenshotHint:
      "Inspector for a selected video: filled rating stars, several tag chips, and at least one custom field with a value.",
  },
  {
    title: "A player that stays out of your way",
    body: [
      "One floating player, three sizes: compact in the corner, a draggable window, or edge-to-edge full screen — switch on the fly without restarting playback.",
      "Custom transport controls give you scrubbing with a live frame preview, ±15 second skips, playback speed, and volume — all without leaving the library. Skagway remembers where you stopped and resumes automatically. Sidecar .srt subtitles show up on their own.",
    ],
    screenshot: "explore-player.png",
    screenshotAlt:
      "Skagway floating player with custom transport controls over the library grid",
    screenshotHint:
      "Floating player (windowed) over the grid with the custom transport bar fully visible: scrubber, ±15s skips, play/pause, speed, and volume. Bookmark diamond ticks on the scrubber are a plus.",
  },
  {
    title: "Bookmark any moment",
    body: [
      "Hit a scene worth returning to? Bookmark it — ⌥⌘B, a double-click on the scrubber, or the bookmark button in the Inspector. Each bookmark saves the exact frame, a name you can edit, and a still for quick recognition.",
      "Bookmarks appear as diamond ticks on the timeline and as a list in the Inspector. Click any one to jump straight there. After a jump while watching, a return chip takes you back to where you were — so exploring never costs you your place.",
    ],
    screenshot: "explore-bookmarks.png",
    screenshotAlt:
      "Skagway Inspector Bookmarks section with named bookmarks and stills, and diamond ticks on the player timeline",
    screenshotHint:
      "Player open with at least three bookmarks: diamond ticks on the scrubber, and the Inspector BOOKMARKS list showing stills, names, and timecodes.",
  },
  {
    title: "Real file tools, with safety nets",
    body: [
      "Rename, move between drives, re-encode stubborn formats to MP4, or send files to the Trash — right from the library. Long jobs run in queues that survive quitting the app.",
      "Cross-drive moves copy and verify before removing the original. Re-encodes keep a backup until you delete it. Skagway is careful with your files because they’re yours, not its.",
    ],
    screenshot: "explore-file-ops.png",
    screenshotAlt:
      "Skagway context menu with file operations like Move Files and Re-encode to MP4",
    screenshotHint:
      "Right-click context menu on a grid card showing Move Files…, Re-encode to MP4…, Show in Finder, and the delete options.",
  },
  {
    title: "Your data is portable",
    body: [
      "Export ratings, tags, and every field — built-in or custom — to CSV or JSON Lines. Import them into the same or different library, another Mac, or your own scripts. New fields will be automatically added as Custom fields in the database.",
      "The library itself is a single file you can copy for backup in one menu command. No export maze, no lock-in.",
    ],
    screenshot: "explore-export.png",
    screenshotAlt:
      "Skagway Export Metadata sheet with format selection and field checklist",
    screenshotHint:
      "The Export Metadata… sheet showing the CSV / JSON Lines choice and the field list.",
  },
];

const quickPoints = [
  {
    title: "Keyboard-driven",
    body: "Arrows, Space, and one consistent modifier scheme. Triage hundreds of clips without touching the mouse.",
  },
  {
    title: "Tuned for scale",
    body: "Built and tested against libraries of thousands of videos — long, short, tiny, and enormous files alike.",
  },
  {
    title: "Private by default",
    body: "Skagway makes no network connections. No telemetry, no analytics, no account. Everything stays on your Mac.",
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

function ExploreFigure({ feature }: { feature: Feature }) {
  if (!feature.screenshot) return null;

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
        alt={feature.screenshotAlt ?? feature.title}
        width={2400}
        height={1500}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 48rem"
        unoptimized
      />
      <figcaption className="sr-only">{feature.screenshotAlt}</figcaption>
    </figure>
  );
}

function DownloadButton() {
  return (
    <a
      href={DOWNLOAD_URL}
      className="inline-flex items-center gap-3 bg-afterburn px-7 py-3.5 font-display text-base font-bold tracking-wide text-ink transition-colors hover:bg-afterburn-soft"
    >
      Download free
      <span className="text-sm font-semibold opacity-70">
        v{VERSION} · macOS 26+
      </span>
    </a>
  );
}

export default function SkagwayExplorePage() {
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
              radial-gradient(100% 60% at 20% 0%, rgba(61, 111, 154, 0.28) 0%, transparent 55%),
              radial-gradient(70% 45% at 90% 80%, rgba(232, 160, 69, 0.1) 0%, transparent 50%),
              linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
            `,
          }}
        />
        <div
          className="horizon-glow absolute inset-x-0 bottom-0 h-[28vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(232, 160, 69, 0.14) 0%, rgba(61, 111, 154, 0.1) 40%, transparent 100%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <Link
          href="/skagway"
          className="font-display text-sm font-semibold tracking-[0.18em] text-fog uppercase transition-colors hover:text-snow"
        >
          ← Skagway
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/skagway/manual"
            className="text-sm text-fog/80 transition-colors hover:text-snow"
          >
            Manual
          </Link>
          <a
            href={DOWNLOAD_URL}
            className="text-sm font-semibold text-afterburn-soft transition-colors hover:text-snow"
          >
            Download
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
        <p className="anim-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
          Features
        </p>

        <h1 className="anim-rise anim-rise-delay-1 mt-5 font-display text-[clamp(2.5rem,7vw,4rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-snow">
          Explore Skagway
        </h1>

        <p className="anim-rise anim-rise-delay-2 mt-6 text-lg leading-relaxed text-fog sm:text-xl">
          You already have the videos. Skagway gives you the library — fast
          browsing, live previews, powerful filters, and real file tools for
          the collection on your drives. Free forever, and your files never
          move.
        </p>

        <div className="anim-rise anim-rise-delay-3 mt-10">
          <DownloadButton />
        </div>

        <div className="anim-rise anim-rise-delay-3 mt-16 space-y-16 border-t border-white/10 pt-14 sm:mt-20 sm:space-y-20 sm:pt-16">
          {features.map((feature) => (
            <section key={feature.title}>
              <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
                {feature.title}
              </h2>
              {feature.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-base leading-relaxed text-fog sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
              <ExploreFigure feature={feature} />
            </section>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-14 sm:grid-cols-3 sm:gap-8">
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

        <section className="mt-20 border-t border-white/10 pt-14 sm:mt-24">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-snow sm:text-3xl">
            Free forever. Really.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            The full app — every feature on this page. No trial clock, no
            paywall, no paid tier, no limits. Skagway is Mach II Labs&apos;
            free Mac app: serious software, yours forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <DownloadButton />
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
