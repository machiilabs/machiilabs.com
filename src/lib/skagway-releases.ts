/**
 * Public Skagway release notes for machii-labs.com.
 *
 * On each release:
 * 1. Add a new entry at the top with `highlights` (paragraph blocks).
 * 2. Move the previous top entry to `items` (Feature / Bug / Polish bullets).
 * 3. Bump home page + /skagway via `latestSkagwayRelease()`.
 * 4. Update `src/lib/skagway-download.ts` (version, build, SHA-256).
 *
 * See `.cursor/rules/skagway-site-versioning.mdc`.
 */

export type SkagwayReleaseHighlight = {
  title: string;
  /** Paragraph on /skagway (newest release only). */
  body: string;
  /** One line on the home page. Defaults to title when omitted. */
  homeLine?: string;
  /** Optional link to a manual section (shown on /skagway only). */
  learnMoreHref?: string;
};

export type SkagwayReleaseItemKind = "feature" | "bug" | "polish";

export type SkagwayReleaseItem = {
  kind: SkagwayReleaseItemKind;
  text: string;
};

export type SkagwayRelease = {
  version: string;
  /** Newest release — paragraph blocks on /skagway. */
  highlights?: SkagwayReleaseHighlight[];
  /** Older releases — bullet list on /skagway. */
  items?: SkagwayReleaseItem[];
};

/** Newest first. Only `[0]` uses `highlights`; older entries use `items`. */
export const SKAGWAY_RELEASES: SkagwayRelease[] = [
  {
    version: "1.3.0",
    highlights: [
      {
        title: "Storyboard view",
        body:
          "Press ⌘3 for a six-frame collage of each clip. Normal packing is the default; Compact fits more columns. Click a frame to seek and play from there.",
        homeLine: "Storyboard view (⌘3) — Normal or Compact packing.",
        learnMoreHref: "/skagway/manual/browse#storyboard-view",
      },
      {
        title: "Hide the Inspector",
        body:
          "Hide the Inspector (⌘I or the toolbar button) when you want the wall full-width. Show it again at your last width. Compact playback only applies while the Inspector is visible.",
        homeLine: "Hide/Show Inspector (⌘I) for a wider wall.",
        learnMoreHref: "/skagway/manual/organize#hide-show-inspector",
      },
      {
        title: "Reconnect missing files",
        body:
          "Point Skagway at new destination folders to rematch moved or remounted files. Ratings, tags, and collections stay put.",
        homeLine: "Reconnect for missing or moved files.",
        learnMoreHref: "/skagway/manual/library#reconnect-missing-files",
      },
    ],
  },
  {
    version: "1.2.0",
    items: [
      {
        kind: "feature",
        text: "Always-on collection — collect with ⌘-click, ⇧-click, and A while you browse; focus and collection stay separate.",
      },
      {
        kind: "feature",
        text: "Batch and single inspect — orange Inspector for the collected set; light blue for one clip.",
      },
      {
        kind: "feature",
        text: "Collected-set pill — count with ✕ to clear; ⇧⌘A clears the set.",
      },
    ],
  },
  {
    version: "1.1.1",
    items: [
      {
        kind: "bug",
        text: "Browser keyboard after text input — selecting a clip defocuses search and Inspector text fields so Space plays and arrow keys navigate again.",
      },
      {
        kind: "bug",
        text: "Review mode tag targets — tag add/remove snapshots the active target so focus changes cannot retarget onto the collected set.",
      },
      {
        kind: "feature",
        text: "Membership filter — Advanced Filter and Smart Collections support is member of / is not member of for smart libraries and albums.",
      },
      {
        kind: "feature",
        text: "Unified Filter drawer — Quick and Advanced are tabs in one drawer (⌘⇧F); collection rule synopsis in the header pill.",
      },
      {
        kind: "polish",
        text: "Sparkle publish checklist and DMG/appcast verify script to prevent stale CDN downloads.",
      },
    ],
  },
  {
    version: "1.1.0",
    items: [
      {
        kind: "feature",
        text: "Collect while browsing — ⌘/⇧ multi-select with separate focus and collected set.",
      },
      {
        kind: "feature",
        text: "List hover preview — silent scrub on List thumbnails, like Grid.",
      },
      {
        kind: "feature",
        text: "Review mode in Grid and List with collect circles and Inspector batch editing.",
      },
    ],
  },
  {
    version: "1.0.0",
    items: [
      {
        kind: "feature",
        text: "First public release — organize local video libraries in Grid or List without moving files into a proprietary container.",
      },
      {
        kind: "feature",
        text: "Search, Quick Filter, smart collections, albums, tags, ratings, and custom metadata.",
      },
      {
        kind: "feature",
        text: "Inline and floating playback, Play All, bookmarks, bulk rename, and metadata export/import.",
      },
      {
        kind: "feature",
        text: "Free forever; no telemetry by default.",
      },
    ],
  },
];

export function latestSkagwayRelease(): SkagwayRelease {
  return SKAGWAY_RELEASES[0];
}

export function skagwayVersionLabel(version: string): string {
  return `v${version}`;
}

export function skagwayHomeReleaseLines(release: SkagwayRelease): string[] {
  if (!release.highlights?.length) return [];
  return release.highlights.map(
    (h) => h.homeLine ?? h.title,
  );
}

export function skagwayReleaseItemLabel(kind: SkagwayReleaseItemKind): string {
  switch (kind) {
    case "feature":
      return "Feature";
    case "bug":
      return "Bug";
    case "polish":
      return "Polish";
  }
}
