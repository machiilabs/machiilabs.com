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

/** Newest first. The product page shows every entry that still has `highlights`. Older entries use `items`. */
export const SKAGWAY_RELEASES: SkagwayRelease[] = [
  {
    version: "1.4.0",
    highlights: [
      {
        title: "Rate and tag from the card",
        body: "Stars, keys 1–5, and tags, without opening the Inspector. Option-click filters. A selected clip changes every selected video.",
        homeLine: "Rate and tag from the card, including a whole selection.",
      },
      {
        title: "Rename or delete a tag",
        body: "Right-click a tag in the Inspector.",
        homeLine: "Rename or delete a tag from the Inspector.",
      },
    ],
  },
  {
    version: "1.3.1",
    items: [
      {
        kind: "feature",
        text: "Delete Video is ⌘⌫, with a keyboard-friendly confirmation that names the files.",
      },
      {
        kind: "feature",
        text: "In Duplicates, a video that’s no longer a duplicate stays in view, marked Resolved.",
      },
    ],
  },
  {
    version: "1.3.0",
    highlights: [
      {
        title: "Storyboard view",
        body: "Six frames per video (⌘3). Click a frame to play from there.",
        homeLine: "Storyboard view — six frames per video (⌘3).",
        learnMoreHref: "/skagway/manual/browse#storyboard-layout",
      },
      {
        title: "Hide and show the Inspector",
        body: "⌘I hides it, and shows it again at the width you left it.",
        homeLine: "Hide and show the Inspector (⌘I).",
        learnMoreHref: "/skagway/manual/organize#hide-show-inspector",
      },
      {
        title: "Scroll index",
        body: "A label beside the scrollbar as you scroll.",
        homeLine: "Rolodex-style scroll index beside the scrollbar.",
      },
      {
        title: "Reconnect",
        body: "Point Skagway at a folder that moved. Preview, apply, undo.",
        homeLine: "Reconnect when files have moved.",
        learnMoreHref: "/skagway/manual/library#reconnect-missing-files",
      },
      {
        title: "Filmstrip in the player",
        body: "Frames above the scrubber. Seek by picture.",
        homeLine: "Scrubber now includes a filmstrip.",
        learnMoreHref: "/skagway/manual/playback#filmstrip-in-the-player",
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

export type SkagwayUpcoming = {
  version: string;
  eyebrow: string;
  lede: string;
  closer: string;
  signupLine?: string;
  highlights: readonly {
    title: string;
    body: string;
    homeLine: string;
  }[];
};

/**
 * Pre-release promo. Null on this branch so localhost previews the shipped
 * 1.3.0 site. Production `main` still has the coming-soon object until 1.3 ships.
 */
export const SKAGWAY_UPCOMING: SkagwayUpcoming | null = null;

export function latestSkagwayRelease(): SkagwayRelease {
  return SKAGWAY_RELEASES[0];
}

export function skagwayVersionLabel(version: string): string {
  return `v${version}`;
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
