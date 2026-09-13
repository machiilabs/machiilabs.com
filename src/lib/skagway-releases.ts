/**
 * Public Skagway release notes for machii-labs.com.
 *
 * On each release:
 * 1. Add a new entry at the top with `highlights` (paragraph blocks).
 * 2. Move the previous top entry to `items` (Feature / Bug / Polish bullets).
 * 3. Bump home page + /skagway via `latestSkagwayRelease()`.
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
    version: "1.1.0",
    highlights: [
      {
        title: "Review mode",
        body:
          "Play through clips and mark keepers as you go. The row or card you're watching and the set you've collected are separate — moving on doesn't clear picks you already made.",
        homeLine: "Review mode — collect a set while you watch clips.",
        learnMoreHref: "/skagway/manual/browse#review",
      },
      {
        title: "List hover preview",
        body:
          "List thumbnails get the same silent hover scrub Grid cards have. Handy when the still frame isn't enough to recognize a clip.",
        homeLine: "List hover preview — hover scrub on List thumbnails, like Grid.",
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
