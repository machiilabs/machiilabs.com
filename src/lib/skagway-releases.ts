/**
 * Public Skagway release notes for machii-labs.com.
 *
 * On each release:
 * 1. Add a new entry at the top with `highlights` (paragraph blocks).
 * 2. Move the previous top entry to `items` (Feature / Bug / Polish bullets).
 * 3. Bump home page + /skagway via `latestSkagwayRelease()`.
 * 4. Update `src/lib/skagway-download.ts` (version, build, SHA-256).
 * 5. If a coming-soon promo was live, set `SKAGWAY_UPCOMING` to `null`.
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
    version: "1.2.0",
    highlights: [
      {
        title: "Always-on collection",
        body:
          "Collect clips with ordinary ⌘-click, ⇧-click, and A while you browse. Focus and collection stay separate, so moving on does not clear checkmarks you already made.",
        homeLine:
          "Always-on collection with Finder-style multi-select while you browse.",
        learnMoreHref: "/skagway/manual/browse#grid-and-list",
      },
      {
        title: "Batch and single inspect",
        body:
          "Orange Inspector bar when you are batch-editing the collected set; light blue when you drill into one clip. Click a collected clip to toggle between the two modes.",
        homeLine:
          "Batch or single file Inspector modes.",
      }
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

export type SkagwayUpcoming = {
  version: string;
  eyebrow: string;
  lede: string;
  closer: string;
  highlights: readonly {
    title: string;
    body: string;
    homeLine: string;
  }[];
};

/**
 * Pre-release promo. Set to `null` when the version ships — move the
 * highlights into `SKAGWAY_RELEASES[0]` and follow the usual release steps.
 */
export const SKAGWAY_UPCOMING: SkagwayUpcoming | null = {
  version: "1.3.0",
  eyebrow: "Coming soon",
  lede: "Release 1.3.0 is packed with useful new features.",
  closer:
    "Check back in the next few days. Already using Skagway? Turn on Automatically check for updates in Settings → Library — the release will arrive on its own.",
  highlights: [
    {
      title: "Storyboard view",
      body: "A six-frame collage for every video (⌘3). Scan the library by eye; click a frame to play from there.",
      homeLine: "Storyboard view — six frames per video (⌘3).",
    },
    {
      title: "Hide and show the Inspector",
      body: "⌘I hides the Inspector so the library can fill the window. Show it again at the width you left it.",
      homeLine: "Hide and show the Inspector (⌘I).",
    },
    {
      title: "Collected set",
      body: "Gather videos as you browse — ⌘-click, Shift-click, or A — then rate, tag, and inspect them as a batch. Replaces Review mode.",
      homeLine: "Collected set — gather videos as you go, then act on them together.",
    },
    {
      title: "Scroll index",
      body: "A rolodex-style chip beside the scrollbar as you scroll, labeled by whatever you sorted by.",
      homeLine: "Rolodex-style scroll index beside the scrollbar.",
    },
    {
      title: "Reconnect",
      body: "When a folder moves, point Skagway at the new location. Preview the matches, apply, undo if you need to.",
      homeLine: "Reconnect when files have moved.",
    },
    {
      title: "Filmstrip in the player",
      body: "A strip of frames above the scrubber — seek by picture.",
      homeLine: "Filmstrip above the player scrubber.",
    },
  ],
};

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
