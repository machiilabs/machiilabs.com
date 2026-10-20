/**
 * Skagway Manual — source of truth for all how-to pages.
 *
 * After changing content here, regenerate the search index:
 *   npm run manual:index
 * (Also runs automatically on `npm run dev` / `npm run build` via predev/prebuild.)
 * Commit `search-index.generated.ts` alongside this file.
 *
 * See ./README.md for the full update workflow.
 */

import { GUIDE_PAGES } from "./guide";

export type ManualTable = {
  columns: string[];
  rows: string[][];
};

/** Screenshot under public/skagway/manual/ — page-level or inlined on a step/section. */
export type ManualScreenshot = {
  filename: string;
  /** Visible title under the image: what the image highlights. */
  caption: string;
  alt?: string;
  hint?: string;
  /** Display width as a fraction of the content column (e.g. 0.75). Default 1. */
  scale?: number;
  /** File is missing or predates 0.80 — show an on-page capture brief. */
  needsUpdate?: boolean;
};

/** A top-level step, optionally with lettered substeps, a table, and/or a figure. */
export type ManualStep =
  | string
  | {
      text: string;
      substeps?: string[];
      table?: ManualTable;
      screenshot?: ManualScreenshot;
    };

export function flattenManualSteps(steps: ManualStep[]): string[] {
  return steps.flatMap((step) => {
    if (typeof step === "string") return [step];
    const parts = [step.text];
    if (step.substeps?.length) parts.push(...step.substeps);
    if (step.table) {
      parts.push(...step.table.columns);
      for (const row of step.table.rows) parts.push(...row);
    }
    return parts;
  });
}

export type ManualSection = {
  title: string;
  /** Optional lead under the heading, before the numbered steps. */
  intro?: string;
  steps: ManualStep[];
  note?: string;
  noteHref?: string;
  noteLinkLabel?: string;
  /** Optional small icon shown with the note (file under public/skagway/manual/) */
  noteIcon?: string;
  noteIconAlt?: string;
  /** Optional figures shown after the steps (placeholders until PNGs exist) */
  screenshots?: ManualScreenshot[];
};

/** Top-level topics, in sidebar order. */
export const MANUAL_PARTS = ["guide", "tasks", "reference"] as const;
export type ManualPart = (typeof MANUAL_PARTS)[number];

export const MANUAL_PART_LABELS: Record<ManualPart, string> = {
  guide: "Getting Started",
  tasks: "How do I…?",
  reference: "Reference",
};

/** Groups on the How do I…? Overview, in display order. */
export const MANUAL_TASK_GROUPS = [
  "Find and organize",
  "Watch",
  "Fix and tidy files",
  "Share and back up",
] as const;
export type ManualTaskGroup = (typeof MANUAL_TASK_GROUPS)[number];

/** The How do I…? page that shows every task as a card. */
export const MANUAL_TASKS_OVERVIEW_SLUG = "how-do-i";

export type ManualPage = {
  slug: string;
  title: string;
  /** Overview card title. Finishes the sentence “How do I…?”, e.g. “…find a clip I only remember by sight?” */
  question?: string;
  /** Overview card group. A task page without one does not get a card. */
  taskGroup?: ManualTaskGroup;
  /** Getting Started is first launch. How do I…? walks through situations. Reference is the control-by-control manual. */
  part?: ManualPart;
  blurb: string;
  summary: string;
  /** Expected file under public/skagway/manual/ — omit for pages that don't need one */
  screenshot?: string;
  /** Visible title under the hero image. Required when screenshot is set. */
  screenshotCaption?: string;
  screenshotAlt?: string;
  screenshotHint?: string;
  /** Display width as a fraction of the content column (e.g. 0.75). Default 1. */
  screenshotScale?: number;
  /** Hero figure is missing or predates 0.80 — show an on-page capture brief. */
  screenshotNeedsUpdate?: boolean;
  sections: ManualSection[];
};

/** Manual home, and the first page under Getting Started. */
export const MANUAL_HOME: ManualPage = {
  slug: "first-launch",
  title: "First launch",
  part: "guide",
  blurb: "Point Skagway at your videos and start browsing.",
  summary:
    "Skagway opens to the Welcome to Skagway window. Click Add Videos, pick the folder that holds your videos, and Skagway builds your library from them. Your video files stay where they are.",
  screenshot: "welcome.png",
  screenshotCaption: "The Welcome to Skagway window",
  screenshotAlt:
    "Welcome to Skagway, with Add Videos and Advanced Options…",
  screenshotHint:
    "Welcome to Skagway. Subtitle “Browse, rate, and play your videos. Your files stay right where they are.” Blue Add Videos button. Under it: “Pick the folder with your videos. Skagway keeps its library in that same folder.” Advanced Options… below that.",
  sections: [
    {
      title: "Add your videos",
      intro:
        "Add Videos is all most people need. Skagway saves its library — your titles, ratings, and tags — in the same folder as the videos, so the two stay together.",
      steps: [
        "Click Add Videos.",
        "Choose the folder that holds your videos.",
        "Skagway indexes the videos in that folder and shows them in the main window. Thumbnails fill in while it builds them in the background.",
        "Start browsing. To find a clip, rename files, and more, see How do I…?",
      ],
      note: "Videos in more than one folder? Add the other folders, and manage the whole list, under Settings → Data Sources. After adding a folder there, choose File → Scan for New Videos to index it.",
      noteHref: "/skagway/manual/settings#data-sources",
      noteLinkLabel: "Data Sources",
    },
    {
      title: "Keep the library somewhere else",
      intro:
        "Click Advanced Options… instead when you want the library stored apart from your videos: in the standard place on this Mac, or in a folder you choose, such as one on another drive.",
      steps: [
        "Click Advanced Options….",
        "Click Use standard location on this Mac, or click Choose Folder… and pick a folder.",
        "Skagway creates the library there and opens it. It starts out empty.",
        "Drop your video folders on Drag videos here, or choose File → Add Folder… (⇧⌘O) and click Scan.",
      ],
      note: "Advanced Options… opens the same window as File → Change Library Location….",
      noteHref: "/skagway/manual/library#change-library-location",
      noteLinkLabel: "Change Library Location…",
    },
  ],
};

export const MANUAL_PAGES: ManualPage[] = [
  {
    slug: "library",
    title: "Library",
    blurb: "Add folders, keep the catalog current, and manage .machii files.",
    summary:
      "The File menu is where you add folders, scan for new files, reconnect videos that moved, and create, open, copy, or delete a .machii library.",
    screenshot: "library-file-menu.png",
    screenshotCaption: "The File menu",
    screenshotAlt: "Skagway with the File menu open",
    screenshotHint:
      "Open File on a library with a video selected so shortcuts are readable. Show Reconnect…, Add Folder… (⇧⌘O), Scan for New Videos, Scan for Subtitles, Open Home Library, New Library…, Open Library…, Open Recent, Save Copy…, Export Metadata…, Bulk Rename…, Import Metadata…, Change Library Location…, Change Thumbnail Cache Location…, Close Library…, and Delete This Library….",
    screenshotScale: 0.75,
    sections: [
      {
        title: "Add your video folders",
        intro:
          "Skagway indexes the folders you point it at. The video files stay in those folders. A folder you add becomes a Data Source, which is the list Scan for New Videos checks later.",
        steps: [
          "In an empty library, drop files or folders on Drag videos here, or click Add Files…, select them, and click Add.",
          "To add a watched folder from anywhere in the library, choose File → Add Folder… (⇧⌘O), select one or more folders, and click Scan.",
          "Scan indexes recognized videos in those folders and their subfolders, then builds thumbnails in the background. The folders are registered as Data Sources as part of that scan.",
          "On Settings → Data Sources, Add Folder… only puts the folder on the list. Index it with File → Scan for New Videos.",
        ],
        note: "Manage the folder list under Settings → Data Sources. Removing a source there leaves videos that are already indexed in the library.",
      },
      {
        title: "Keep the library current",
        intro:
          "Scans are manual. Skagway checks a folder when you tell it to, including after you copy new files into a Data Source.",
        steps: [
          "Choose File → Scan for New Videos, or click Scan for New Videos in the toolbar. Skagway looks through watched folders for files added since the last scan. Videos it finds show up in the Last Added smart library.",
          "After you add .srt files beside videos that are already in the library, choose File → Scan for Subtitles. Skagway re-checks the current view and updates the subtitle badges.",
        ],
        note: "The toolbar button for Scan for New Videos sits with the other library controls.",
        noteIcon: "scan-for-new-videos-icon.png",
        noteIconAlt: "Scan for New Videos toolbar button",
      },
      {
        title: "Create, open, and switch libraries",
        intro:
          "Each library is a .machii file: one catalog, with its own cache. Switching libraries leaves the previous file on disk. Skagway restarts briefly to open the one you chose.",
        steps: [
          "Open Home Library opens the home library you created. Before that library exists, the same command reads Create Home Library.",
          "New Library… creates another .machii catalog. Open Library… opens a .machii file you already have. Open Recent lists libraries you have used lately.",
          "Change Library Location… moves this library’s catalog. The window is in the next section. On the welcome screen, Advanced Options… opens that same chooser before a library exists.",
          "Change Thumbnail Cache Location… points this library at a different cache folder. Other libraries are left alone. The command retargets the pointer; existing cache files stay in the old folder.",
          "Close (⌘W) closes the window. Close Library… closes the catalog. Open it again with Open Home Library, Open Library…, or Open Recent.",
        ],
        note: "Play in External Player and Show in Finder stay dimmed in the File menu until a video is selected. Both are also on the video’s right-click menu.",
      },
      {
        title: "Change Library Location…",
        intro:
          "Add Videos on the welcome screen keeps the new library in the video folder. Choose File → Change Library Location… when a library already exists and you want its catalog somewhere else — an external drive, or an encrypted volume. Skagway quits and opens a window titled “Choose where Skagway stores its data.” Advanced Options… on the welcome screen opens that same window before any library exists. Your video files stay where they are. Each library keeps its own thumbnail cache, so this choice does not affect any other library.",
        steps: [
          {
            text: "The line under the title says Skagway is not a vault: it does not modify or protect your video files. Four notes on that window are the rules.",
            substeps: [
              "Nothing leaves your Mac. There is no account, no cloud sync, and no usage analytics. Optional update checks stay off until you turn them on. A check only asks whether a newer Skagway build exists.",
              "You control the catalog and cache. The catalog holds paths, titles, tags, ratings, albums, smart collections, bookmarks, and play history. Each library remembers its own cache location.",
              "Media on an encrypted volume is how you protect the files themselves. Choose Folder… can put the catalog on that volume with the videos. While the volume is locked or offline, that library’s catalog and previews are unavailable. Other libraries keep working with their own caches.",
              "Use defaults on this Mac is the standard placement: the library in Application Support, and the cache in ~/Library/Caches/Skagway/. Add Videos does not use this placement.",
            ],
          },
          "Click Use standard location on this Mac to store this library under Application Support, with the cache under ~/Library/Caches/Skagway/. Click Choose Folder… when you want a folder of your own, and choose it in the system open panel. Either button finishes the chooser. Skagway does not ask where the cache should live, and it does not ask how to find the library the next time you open the app.",
          "Skagway relaunches once when the chooser finishes. That quit and reopen are expected. If the .machii catalog is not at the place you picked yet, Skagway creates an empty one.",
        ],
        screenshots: [
          {
            filename: "first-launch.png",
            caption: "The “Choose where Skagway stores its data” window",
            alt: "Skagway “Choose where Skagway stores its data” window, opened from Change Library Location…",
            hint: "The window File → Change Library Location… opens: title “Choose where Skagway stores its data”; the four notes readable; both buttons — Use standard location on this Mac and Choose Folder….",
          },
        ],
      },
      {
        title: "Reconnect missing files",
        intro:
          "When a video’s path no longer exists, Skagway marks it Missing. That happens if the file moved, or if its volume is unplugged. Reconnect points the catalog at the new folders. Ratings, tags, bookmarks, and album memberships stay on the video.",
        steps: [
          "A banner appears when clips cannot be found. Focusing a clip in the Missing smart library brings the banner up as well. Click Reconnect… on the banner, or choose File → Reconnect…. Both open the same sheet.",
          "Click Add destination… once for each folder that now holds the missing clips. Those folders are Evidence Destinations. Skagway matches by filename, and by soft size, only inside the folders you add.",
          "Read the preview before you apply it. Matches are grouped into Ready, Needs attention, and Unmatched. The Ready summary turns green when every missing clip in this session has a match.",
          "Click Confirm reconnect. Skagway updates library paths for the Ready matches. Unmatched clips stay Missing.",
          "Choose Edit → Undo Reconnect. That reverses the last reconnect session.",
        ],
        note: "An unplugged drive shows as Missing. Plug the volume back in before you reconnect. Skagway never changes paths on its own. When you try to play a missing file, it suggests running Reconnect.",
        noteHref: "/skagway/manual/filter#smart-libraries",
        noteLinkLabel: "Smart Libraries",
        screenshots: [
          {
            filename: "reconnect.png",
            caption: "The Reconnect sheet: destination folders and the match preview",
            alt: "Skagway Reconnect sheet with evidence destinations and a match preview",
            hint: "Reconnect sheet (from the missing-file banner or File → Reconnect…). At least one folder added with Add destination…, labeled as an Evidence Destination. Preview groups Ready, Needs attention, and Unmatched all visible, with the Ready summary showing. Confirm reconnect readable.",
          },
        ],
      },
      {
        title: "Copy or delete the library file",
        steps: [
          "Choose File → Save Copy… and pick a destination. Skagway writes a timestamped duplicate of the .machii file. The library you had open stays open. Open the copy later with File → Open Library….",
          "Choose File → Delete This Library… and confirm. Skagway deletes that .machii catalog. Your video files stay on disk.",
        ],
        note: "Save Copy keeps the original cache pointer. Export and import are how you move ratings and tags, or edit metadata in a spreadsheet and bring it back.",
        noteHref: "/skagway/manual/export-import",
        noteLinkLabel: "Export / Import",
      },
      {
        title: "Which files count as video",
        steps: [
          "A scan picks up these extensions: mp4, mov, m4v, avi, mkv, wmv, flv, webm, mpg, mpeg, 3gp, ts, mts, vob, ogv, divx, dv, m2ts, and mxf.",
          "To treat another extension as video, or to ignore one of these, open Settings → Extensions. Check or uncheck the list, or add an extension that is not there yet.",
        ],
      },
    ],
  },
  {
    slug: "browse",
    title: "Browse",
    blurb:
      "Grid, List, and Storyboard, plus selection, sorting, Play All, search, and the scroll index.",
    summary:
      "Browse as a thumbnail Grid, a column List, or a six-frame Storyboard. Focus one clip, select others with the usual multi-select gestures, sort or shuffle, Play All through what is on screen, and search titles, filenames, tags, and custom fields.",
    screenshot: "browse.png",
    screenshotCaption: "The Grid layout and the main toolbar",
    screenshotAlt:
      "Skagway Grid layout with the toolbar: layout buttons, sort menu, Play All, and Search videos field",
    screenshotHint:
      "Populated Grid. Toolbar must show Grid, List, and Storyboard, the Sort menu and its direction arrow, Play All, Loop Play All, Search videos, and the video count. Include a “N videos selected” pill if two or more cards are checkmarked.",
    sections: [
      {
        title: "Grid and List",
        intro:
          "The view is the set of videos currently shown: whatever search, filters, a smart library, or an album leave on screen. Grid (⌘1), List (⌘2), and Storyboard (⌘3) are layouts. Each one shows the same view in a different way. Focus is the one clip the Inspector follows. The batch selection is a separate group you build while you browse, and it stays put when focus moves. Clicking a clip focuses it. It does not select it.",
        steps: [
          "Switch layouts with the Grid, List, and Storyboard buttons in the toolbar. ⌘1 is Grid. ⌘2 is List. Storyboard (⌘3) is covered in the next section.",
          "A Grid card shows the thumbnail, duration, Title, date, and rating. A captions badge appears when the video is marked as having subtitles. A thin bar along the card shows watch progress after you have started it.",
          "Click a card or row once to focus it. Grid draws a dashed ring. List highlights the row. That clip is what the Inspector shows, unless the orange batch bar is up.",
          "⌘-click a clip to add it to the selection or remove it. ⇧-click selects every clip from the last click through this one. Press A to add or remove the focused clip. ⌘A selects every video in the current view. Selected clips show a blue checkmark.",
          "With two or more clips selected, a pill above the grid or list reads “N videos selected.” The Inspector title bar turns orange and reads N Videos Selected. Ratings, tags, and custom fields you change apply to every selected clip. TAGS notes that you are tagging the selection.",
          "Click one selected clip to inspect that clip alone. The title bar turns light blue and shows the clip’s name. Click that same focused clip again to return to the selection. On the light blue bar, click N Videos, or click the “N videos selected” pill, to return to the selection as well.",
          "Clear the set with the pill’s ✕, with Clear on the orange bar, or with ⇧⌘A. Arrow keys move focus and leave the checkmarks where they are.",
          "Rest the pointer on a Grid card or a List thumbnail for a silent Live Preview. Double-click a card or row to play that video in Skagway.",
        ],
        note: "Tags and ratings apply to the Inspector’s current target: the focused clip, or every selected clip while the orange bar is showing.",
        noteHref: "/skagway/manual/organize",
        noteLinkLabel: "Organize",
        screenshots: [
          {
            filename: "collection-set.png",
            caption: "A batch selection: checkmarked clips, the selection pill, and the orange Inspector bar",
            alt: "Skagway Grid with checkmarked selected cards and the orange batch Inspector header",
            hint: "Batch inspect: two or more checkmarked cards, “N videos selected” pill, Inspector orange “N Videos Selected” bar.",
          },
          {
            filename: "collection-set-single.png",
            caption: "One selected clip inspected on its own: the light blue Inspector bar",
            alt: "Skagway Grid with a selected clip focused and the light blue single-clip Inspector header",
            hint: "Single-clip inspect: one selected card focused (dashed ring), Inspector light blue title bar with that clip’s name.",
          },
        ],
      },
      {
        title: "Storyboard layout",
        intro:
          "Storyboard (⌘3) gives every clip a six-frame collage, which helps when one poster frame is not enough to tell two videos apart. It is a layout for the whole view. The Inspector filmstrip and the strip inside the player are separate.",
        steps: [
          "Press ⌘3, or click Storyboard in the toolbar. The arrow on that button chooses the density: Normal or Compact.",
          "Normal is the default and uses at most three columns. Compact fits more columns, up to four. At some window widths both densities land on three columns, so they look the same.",
          "Collages appear as you scroll. Prepare previews while idle (Settings → Video) is on by default. While nothing is playing, scanning, or scrolling, Skagway also builds the missing collages for the current view, starting near what is on screen.",
          "Click a frame once to focus that clip, even if the clip is already selected. Click the same focused collage again to play from that frame’s sample time. Playback leaves the selection as it is.",
          "Click the title or the footer under a collage to focus or to toggle batch inspect, without starting playback. Clicks on the frames themselves never toggle batch inspect.",
          "⌘-click, ⇧-click, and A select clips the same way they do in Grid. Hover preview is off here; use the collage frames.",
        ],
        note: "Inspector Filmstrip (⌥⌘T) is a preview of one focused clip. It is not the Storyboard layout.",
        noteHref: "/skagway/manual/playback#play-from-the-filmstrip",
        noteLinkLabel: "Play from the filmstrip",
        screenshots: [
          {
            filename: "storyboard.png",
            caption: "The Storyboard layout: six frames from each clip",
            alt: "Skagway Storyboard layout with six-frame collages",
            hint: "Storyboard layout (⌘3) of a populated library. Several six-frame collages visible. The Storyboard toolbar control shows Normal or Compact; open the density menu if it fits. One collage focused (dashed ring or equivalent). Playback not started.",
          },
        ],
      },
      {
        title: "List columns",
        intro:
          "List is a table. Title is always there. The other columns are optional, and you can resize or reorder the ones that are showing by dragging their headers.",
        steps: [
          "Optional columns are Duration, Resolution, File size, Rating, Date added, Plays, Created, and Last played. Custom metadata fields become columns too. Up to 16 custom columns can be shown at once, in alphabetical order.",
          "Turn columns on or off under Settings → Library → List view columns, or right-click a column header in the table.",
          "When the Rating column is visible, click the stars in the row to rate that video.",
        ],
      },
      {
        title: "Sort, shuffle, and Surprise Me!",
        steps: [
          "Open the Sort menu in the toolbar. Sort by Title, Date Added, Duration, File Size, Rating, Resolution, or Plays, or by a custom field you have defined.",
          "Click the arrow beside the Sort menu to flip between ascending and descending.",
          "While an album is open, Album Order appears at the top of the Sort menu. That order is the one you arranged by dragging.",
          "Choose Shuffle, or press ⇧⌘R, to put the whole current view in a random order. Choosing any other sort leaves shuffle. Click Shuffle again for a new order.",
          "Choose Surprise Me!, or press ⇧⌘S, to jump to one random video in the view. To play that video as well, turn on Surprise Me! auto-plays selected video under Settings → Video.",
        ],
      },
      {
        title: "Scroll index",
        intro:
          "On a long view, a rolodex-style chip sits beside the scrollbar while you scroll. Its label is the sort value you are passing, so a Title sort shows titles and a Date Added sort shows dates.",
        steps: [
          "Set the order with the Sort menu. The chip uses that field.",
          "Scroll the Grid, List, or Storyboard. The chip stays beside the scrollbar and updates as the videos go by.",
          "Read the chip to see where you are in the sort without stopping on every card.",
        ],
        screenshots: [
          {
            filename: "scroll-index.png",
            caption: "The scroll index chip beside the scrollbar",
            alt: "Skagway scroll index chip beside the scrollbar",
            hint: "Grid or List scrolled partway through a large library. Sort is Title or Date Added, and the Sort menu shows that choice. The rolodex-style chip beside the scrollbar is readable and matches the current sort field. Capture during a scroll so the chip is on screen.",
          },
        ],
      },
      {
        title: "Play All",
        intro:
          "Play All walks the videos in the current view: whatever search, filters, and sort are showing right now. In an album with Album Order selected, that saved order is the sequence.",
        steps: [
          "Click Play All in the toolbar, or press ⇧⌘P. Playback starts at the first video that can play. When a video finishes, the next one starts.",
          "Click Loop Play All to repeat the list after the last video. That option also appears under Settings → Video.",
          "Stop playback, or start a single video on its own, and the Play All session ends.",
        ],
      },
      {
        title: "Search",
        steps: [
          "Press ⌘F, or click the Search videos field, and type part of a title, filename, tag, or custom-field value.",
          "Every word must appear somewhere in those fields. The words do not have to sit in the same field. More words narrow the list.",
          "Click the × in the field, or delete the text, to show the full library again. Filters you set stay in effect until you clear them.",
        ],
        note: "Search is text. Ratings, duration, quality, and other structured tests belong in the filters.",
        noteHref: "/skagway/manual/filter",
        noteLinkLabel: "Filter",
      },
      {
        title: "Getting around quickly",
        intro:
          "These shortcuts work in Grid, List, and Storyboard. If the cursor is in a text field, press Esc once so the keys move through the library instead of typing.",
        steps: [
          "Arrow keys move focus one clip at a time. They leave selection checkmarks alone. Home jumps to the first video. End jumps to the last.",
          "Press ⌘J to scroll the focused clip back into view.",
          "⌘-click toggles one clip in the selection. ⇧-click selects the range from the last click. ⌘A selects every video in the current view. ⇧⌘A clears the selection.",
        ],
      },
    ],
  },
  {
    slug: "filter",
    title: "Filter",
    blurb: "Quick Filter chips and Advanced Filter rules.",
    summary:
      "Narrow the library from the filter drawer. Quick Filter is a set of cards you combine. Advanced Filter is a rule tree. Search and sort keep working on whatever the active tab leaves in the view.",
    screenshot: "quick-filter.png",
    screenshotCaption: "The filter drawer, Quick tab",
    screenshotNeedsUpdate: true,
    screenshotAlt:
      "Skagway Quick Filter drawer showing Smart Libraries, Collections, Rating, Duration, Quality, and Tags cards",
    screenshotHint:
      "Quick Filter drawer (⇧⌘F) over a populated library. Rating row: No Stars, 1–5 stars, Or Higher. Smart Libraries, Collections, Duration, Quality, and Tags visible.",
    sections: [
      {
        title: "Quick Filter (⇧⌘F)",
        intro:
          "Click the filter button in the toolbar, or press ⇧⌘F. The drawer opens above the videos. Quick and Advanced are tabs in that one drawer. Only the tab you are on filters the library. Switching tabs keeps the other tab’s choices. Clear (⌘⌥C) resets both.",
        steps: [
          "On the Quick tab, choose a smart library. Optionally choose a smart collection or an album in the Collections card. Then filter by rating, duration, quality, and tags. Filters on different cards combine, so a video has to match all of them to stay in the view.",
          "Rating: click No Stars, or click a star. Click Or Higher to include that rating and every rating above it.",
          "Duration: type Min and Max in minutes, or click a range. The ranges are Any, < 1 min, 1–5 min, 5–30 min, and > 30 min.",
          "Quality: click a chip. The chips are SD, 480p, 720p, 1080p, 1440p, 4K, and 8K+.",
          "Tags: set Match to Any or All, then select tags. Any keeps a video that has one of the tags. All keeps a video only when it has every tag you selected. Search tags narrows the list of tag names. Clear filter on the Tags card, or on Collections, drops that card only.",
          "Press ⌘⌥Q for the Quick tab and ⌘⌥A for the Advanced tab. The drawer opens if it was closed. Search videos still narrows the filtered list.",
        ],
      },
      {
        title: "Smart Libraries",
        intro:
          "Smart libraries are built-in groups drawn from the whole catalog. Each row in the drawer shows how many videos match. Choose which rows appear under Settings → Library → Smart Libraries. Recently Added and Recently Played have a day count there. Top Rated has a star threshold.",
        steps: [
          "All Videos shows the whole library.",
          "Recently Added and Recently Played show videos from the last N days. N is the day count in Settings → Library.",
          "Top Rated shows videos at or above the star threshold you set in that same Settings pane.",
          "Duplicates groups videos whose file content matches, even when the names differ.",
          "Corrupt lists files Skagway could not read metadata or a thumbnail from.",
          "Missing lists files whose path no longer exists, including an unmounted drive or a moved file. Click the refresh arrow on that row to look again. Reconnect…, from the banner or File → Reconnect…, points the catalog at the new folders.",
          "Last Added lists videos found by the most recent Scan for New Videos.",
          "Recently Converted appears in the smart-library list used for re-encoded videos. Last Metadata Import appears after you import metadata. Both are the places those jobs leave their results.",
        ],
      },
      {
        title: "Advanced Filter (⌘⌥A)",
        intro:
          "Advanced Filter is the rule tree. Use it when the Quick cards are not specific enough, and when you want to save the rules as a smart collection.",
        steps: [
          "Press ⌘⌥A, or open the drawer with ⇧⌘F and choose the Advanced tab.",
          "Add a rule on any video attribute or custom field. The operators change to fit the attribute. For smart libraries and albums, the operators include is member of and is not member of.",
          "Group rules with ALL or ANY. ALL means every rule in the group must match. ANY means one match is enough. A group can sit inside another group. For example: (Tag is Vacation AND Rating ≥ 4) OR Tag is Favorite.",
          "Click Save as Collection… in the drawer header to keep the rule set as a smart collection. It updates as you tag, rate, and import.",
        ],
        note: "Only the active tab filters the library. The other tab’s rules stay in memory until you click Clear or choose View → Clear Filters (⌘⌥C), which resets both tabs.",
        screenshots: [
          {
            filename: "advanced-filter.png",
            caption: "The filter drawer, Advanced tab: a rule tree",
            alt: "Skagway Advanced Filter tab with a rule tree",
            hint: "Filter drawer open on the Advanced tab (⌘⌥A). A small rule tree using ALL or ANY, with at least two rules — for example a tag rule and a rating rule. Save as Collection… visible in the drawer header. The library behind the drawer can be dim.",
          },
        ],
      },
      {
        title: "Clearing filters",
        steps: [
          "Close the drawer. The active tab’s filters appear as pills above the grid. Click the × on a pill to drop that one condition. Pills follow the active tab only.",
          "Click Clear all in the pill row, or Clear all in the drawer header, to reset every filter.",
          "Choose View → Clear Filters, or press ⌘⌥C, to reset both tabs from the keyboard.",
        ],
      },
    ],
  },
  {
    slug: "collections",
    title: "Smart Collections & Albums",
    blurb: "Saved rule-based groups and hand-picked playlists.",
    summary:
      "Smart collections are saved rule sets. They update as the library changes. Albums are lists you build video by video, with a saved Album Order. Both live in the Collections card of the Quick Filter drawer.",
    screenshot: "collections.png",
    screenshotCaption: "An album open, sorted by Album Order",
    screenshotNeedsUpdate: true,
    screenshotAlt:
      "Skagway album open with Sort set to Album Order and smart collections listed in Quick Filter",
    screenshotHint:
      "An album open with Sort → Album Order and grip badges on cards, or the Collections card listing smart collections and albums.",
    sections: [
      {
        title: "Create a smart collection",
        intro:
          "A smart collection is the Advanced Filter rule tree, saved under a name. Open it from the Collections card whenever you want to see the videos that match.",
        steps: [
          "Open the Quick Filter drawer with ⇧⌘F, or with the filter button in the toolbar.",
          "In the Collections card, click New Collection.",
          "Name the smart collection, then add rules. The attributes, operators, and ALL / ANY groups are the same ones on the Advanced tab. Membership rules can use is member of and is not member of for smart libraries and albums.",
          "Click Create. The smart collection then shows whatever currently matches. Tagging, rating, or importing can move a video in or out.",
        ],
      },
      {
        title: "Smart collections and the Advanced Filter work together",
        steps: [
          "If the rules are already on the Advanced tab, click Save as Collection… in the drawer header. You do not have to rebuild them with New Collection.",
          "Right-click a smart collection in the Collections card. Edit as Advanced Filter… opens those rules on the Advanced tab. Edit Collection… changes the name and the rules in place. Delete Collection removes the saved rules and leaves the videos in the library.",
        ],
      },
      {
        title: "Albums — hand-picked playlists",
        intro:
          "An album changes only when you add, remove, or reorder videos. While it is open, Sort can use Album Order, and Play All follows that order.",
        steps: [
          "Select the videos you want, right-click, and choose New Album from Selection…. To start with nothing in it, click New Album in the Collections card.",
          "Select more videos, right-click, and choose Add to Album, then the album’s name.",
          "Open the album and set Sort to Album Order. A grip appears on each card or row. Drag a grip to move that video in the album.",
          "Right-click a video in the album to remove it from the album. The file stays on disk, and the video stays in the library.",
          "Right-click the album’s name in the Collections card to rename the album or delete it. Deleting the album leaves the videos in the library.",
        ],
        note: "Play All uses Album Order when that sort is the one selected.",
      },
    ],
  },
  {
    slug: "organize",
    title: "Organize",
    blurb: "Ratings, tags, and custom metadata in the Inspector.",
    summary:
      "The Inspector is the pane on the right. It shows the focused clip’s preview, facts, Title, rating, tags, bookmarks, and custom fields. With two or more clips selected, the same pane edits the whole selection.",
    screenshot: "organize.png",
    screenshotCaption: "The Inspector: title, rating, tags, and custom fields",
    screenshotAlt:
      "Skagway Inspector with rating stars, assigned tags, the Add tags list, and custom fields",
    screenshotHint:
      "Selected video with the Inspector open: display Title, Subtitles picker, filled rating stars, at least one assigned tag, and a custom field if defined.",
    sections: [
      {
        title: "Hide / Show Inspector",
        intro:
          "Hide the Inspector when you want the library wall to use the full window. Show it when you want to read or edit the focused clip.",
        steps: [
          "Press ⌘I, choose View → Inspector, or click the Inspector button in the toolbar. The same command hides the pane and shows it again.",
          "Showing the pane restores the width you last dragged. The focused clip stays in the same place on screen. The wall does not jump.",
          "Compact playback docks into the Inspector preview, so it needs the pane visible. While the Inspector is hidden, Compact is unavailable and the player stays Windowed. Show the Inspector and Compact is available again.",
          "With two or more clips selected, click the “N videos selected” pill to show the Inspector on the orange batch bar.",
        ],
      },
      {
        title: "Title (display name)",
        steps: [
          "Title is the name used for sorting, the List layout, and search. It can differ from the file name on disk. The file name and the path are listed under the Title.",
          "Focus one video and press Return, or right-click → Edit Title…, and edit the name. Press Esc to cancel.",
          "Rename File… is the command that changes the name on disk. Editing Title leaves the file name as it is. Renaming the file leaves Title as it is.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "In the Inspector, open the Subtitles menu and choose the value that matches this video. The badge on the card, and subtitle filters, follow that setting.",
          "None means the video is not marked as captioned.",
          "A sidecar .srt beside the file can be picked up from the file name. For the names that match, see Playback. After you add subtitle files, choose File → Scan for Subtitles.",
        ],
      },
      {
        title: "Rate videos",
        steps: [
          "Focus a clip, or select several. In the Inspector, under RATING, click the star you want.",
          "Click that same star again to clear the rating.",
          "In the List layout, with the Rating column on, click the stars in the row. That rates the video on that row.",
        ],
      },
      {
        title: "Tag videos",
        intro:
          "TAGS shows the tags on the Inspector’s current target. On the orange bar, that target is every selected clip. On the light blue bar, or with a single focus, it is one clip.",
        steps: [
          "Assigned tags are the chips at the top of TAGS. Click a chip to unassign it from the current target.",
          "Click Add tags to open the rest of your tags. The row includes a count, such as Add tags (8). Click a tag in that list to assign it.",
          "Type a name in the field under TAGS and press Return to create the tag and assign it. New Tag does the same.",
          "To rename a tag, or to delete it from the whole library, right-click the tag in the Quick Filter drawer’s Tags card. Delete removes it from every video.",
        ],
      },
      {
        title: "Custom metadata",
        steps: [
          "Open Settings → Custom Metadata. Create a field with a name and a type: String, Text, Number, Date, Date & Time, or Boolean.",
          "Edit the value in the Inspector under CUSTOM. The control follows the field’s type.",
          "The field is then available in search, the Sort menu, List columns, Quick Filter and Advanced Filter, smart collections, and Export Metadata….",
        ],
      },
      {
        title: "Edit many at once",
        intro:
          "Select the clips first, then edit once. The orange bar means the edit hits every selected clip. The light blue bar means you are looking at one of them.",
        steps: [
          "Select two or more clips with ⌘-click, ⇧-click, A, or ⌘A. The Inspector shows an orange bar labeled N Videos Selected.",
          "Arrow through the view and press A on keepers. Earlier checkmarks stay. Focus moves; the set does not.",
          "Click one selected clip to inspect it alone. The bar turns light blue and shows that clip’s name. Click the same focused clip again, click N Videos on the light blue bar, or click the “N videos selected” pill, to edit the selection again.",
          "Set a rating, a tag, or a custom value while the orange bar is up. Skagway writes that value onto every selected video.",
          "When the selected videos disagree, the field shows Multiple values. Setting a value replaces Multiple values on every clip in the selection.",
          "Click Clear on the orange bar, click the pill’s ✕, or press ⇧⌘A, to clear the selection.",
        ],
        note: "In Storyboard, clicks on the collage frames focus or play. Use the title or footer under the collage, or N Videos in the Inspector, to switch batch inspect.",
        noteHref: "/skagway/manual/browse#grid-and-list",
        noteLinkLabel: "Browse",
      },
    ],
  },
  {
    slug: "playback",
    title: "Playback",
    blurb: "The floating player, in-player filmstrip, bookmarks, resume, and subtitles.",
    summary:
      "Skagway plays in one player, at three sizes: Compact, Windowed, or Full screen. The player has a filmstrip above the scrubber, bookmarks, and resume. Play All walks the current view. Sidecar subtitles play with the video.",
    screenshot: "playback.png",
    screenshotCaption: "The player: transport controls and bookmarks on the timeline",
    screenshotAlt:
      "Skagway floating player with custom transport controls and bookmark ticks on the timeline",
    screenshotHint:
      "Windowed floating player over the grid: traffic lights, transport (scrubber, skip, play/pause, speed, volume), and at least two diamond bookmark ticks on the timeline.",
    sections: [
      {
        title: "Start and stop",
        steps: [
          "Focus a video, then press Space, double-click its Grid card or List row, or click Play in the Inspector.",
          "While the player is open, Space pauses and resumes.",
          "Press ⌥Space to play from the start of the file. That ignores any saved resume position.",
          "Press Esc, or click the red traffic-light Stop, to stop. Skagway saves the position you left.",
        ],
        note: "If the cursor is in Search videos or an Inspector field, press Esc once so the next Space plays instead of typing.",
      },
      {
        title: "Play All (⇧⌘P)",
        steps: [
          "Click Play All in the toolbar, or press ⇧⌘P. Skagway plays the current view from the first video that can play, and starts the next when one finishes.",
          "Turn on Loop Play All in the toolbar, or Loop Play All under Settings → Video, so the first video starts again after the last one finishes.",
          "Stop playback, or play a single video on its own, and the Play All session ends. In an album, the sequence is Album Order when that sort is selected.",
        ],
      },
      {
        title: "Transport controls",
        steps: [
          "Hover the scrubber for a frame preview. Click the scrubber to seek. The tooltip reads “Click to seek · Double-click to bookmark at pointer.”",
          "Skip back or forward 15 seconds with ⌥← and ⌥→.",
          "Playback speed cycles from 0.5× to 2×.",
        ],
      },
      {
        title: "Filmstrip in the player",
        intro:
          "This strip is part of the player, just above the scrubber. It is not the Inspector filmstrip (⌥⌘T), and it is not the Storyboard layout (⌘3).",
        steps: [
          "In Compact, Windowed, and Full screen, a horizontal row of frames sits above the scrubber. It fades in and out with the transport controls.",
          "Click a frame to seek to that time. The playhead highlight follows the current playback time.",
          "Show filmstrip in player, under Settings → Video, is on by default. Turn it off to hide the row. Compact uses a thinner strip than Windowed and Full screen.",
        ],
        note: "The Inspector filmstrip is a grid preview of the focused clip, before or beside playback.",
        noteHref: "/skagway/manual/playback#play-from-the-filmstrip",
        noteLinkLabel: "Play from the filmstrip",
        screenshots: [
          {
            filename: "player-filmstrip.png",
            caption: "The filmstrip above the player’s scrubber",
            alt: "Skagway player with a row of frames above the scrubber",
            hint: "Windowed player with the filmstrip row visible above the scrubber — a series of frames, not only the single hover thumbnail. Playhead highlight on the frame for the current time. Transport (play, scrubber, skip) visible. Capture while the controls are showing, before they fade.",
          },
        ],
      },
      {
        title: "Bookmarks",
        steps: [
          "While a video is playing, press ⌥⌘B, or double-click the scrubber, to bookmark the current time. The scrubber tooltip is “Click to seek · Double-click to bookmark at pointer.”",
          "Bookmarks show as diamonds on the timeline. The same marks are listed under BOOKMARKS in the Inspector. Before you have any, that section reads “Bookmark a moment while playing (⌥⌘B).”",
          "Click a bookmark in the Inspector list to jump there. Delete a bookmark from its row.",
        ],
        note: "Bookmarks are stored in the library file. Their still frames are rebuilt if you move the library.",
      },
      {
        title: "Play from the filmstrip",
        intro:
          "The Inspector preview has two modes, Still and Filmstrip, toggled with ⌥⌘T. Filmstrip here is frames sampled across one focused clip. It is not the row above the player scrubber, and it is not Storyboard (⌘3).",
        steps: [
          "Focus one clip. Press ⌥⌘T, or click Filmstrip on the preview, to replace the poster with frames from across the video.",
          "Click a frame. Playback starts at that frame.",
          "Click Still, or press ⌥⌘T again, to return to the poster. Clicking the Still preview starts playback from the beginning, or from the saved resume position if there is one.",
        ],
        note: "Storyboard is the library-wide collage. This filmstrip stays on the focused clip.",
        noteHref: "/skagway/manual/playback#filmstrip-in-the-player",
        noteLinkLabel: "Filmstrip in the player",
      },
      {
        title: "Three sizes, one player",
        intro:
          "There is one player. Changing size does not restart the video. The size it opens at is Settings → Video → Player opens at: Compact, Full screen, or Last used size.",
        steps: [
          "Compact (⌃⌘C) docks the player into the Inspector preview. The Inspector has to be visible. If it is hidden, show it with ⌘I, then choose Compact again.",
          "Windowed (⌃⌘W) is a floating panel. Skagway remembers its size and position.",
          "Full screen (⌃⌘F) fills the display. Press Esc to stop playback. Press ⌃⌘F again, or use the traffic lights, to leave full screen and keep playing.",
        ],
      },
      {
        title: "Resume where you left off",
        steps: [
          "Open a video you have already started. Playback begins at the saved position.",
          "A banner offers Start at beginning. Click it to jump to the start of the file.",
          "Grid cards show a thin progress bar for videos you have started.",
          "The banner can fade. Fade resume banner after delay, under Settings → Video, controls whether it fades and when.",
        ],
      },
      {
        title: "Live Preview",
        steps: [
          "Rest the pointer on a Grid card or a List thumbnail. A silent preview plays through the video. In List, the enlarged preview opens beside the row.",
          "The preview pauses while the player is open.",
          "Turn it on or off under Settings → Video → Hover preview on Grid and List. Storyboard has no hover preview; use the collage frames there.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "Put an .srt file in the same folder as the video. Name it to match: movie.mp4 uses movie.srt. A language suffix works too, as in movie.en.srt.",
          "Set the Subtitles menu in the Inspector so the card badge and the filters agree with that file.",
          "If the .srt arrives after the video is already in the library, choose File → Scan for Subtitles. Skagway re-checks the current view and updates the badges.",
        ],
      },
      {
        title: "External players",
        intro:
          "Some files play more happily in another app. You can hand the file off without leaving the library’s play history behind.",
        steps: [
          "Press ⌘↩, or right-click → Play in External Player, to open the video in the default macOS app for that file.",
          "Right-click → Open With, and choose an app. The submenu lists every installed app that can play the file.",
          "Either command counts as a play. The count shows in the video’s play history and in the Plays column.",
        ],
      },
      {
        title: "Capture the perfect thumbnail",
        steps: [
          "Start playback and pause, or scrub, on the frame you want as the poster.",
          "Press ⌥⌘M, Make Thumbnail from Current Frame. That frame becomes the thumbnail everywhere Skagway shows this video.",
          "For a still you already have, right-click → Set Poster from Image… and choose the image, or drag the image onto the video’s Grid card.",
        ],
      },
    ],
  },
  {
    slug: "file-operations",
    title: "File operations",
    blurb: "Rename, bulk rename, move, re-encode, and delete, with queues.",
    summary:
      "Right-click a video, or a batch selection, for file commands. Long jobs report in the activity strip at the bottom of the window and in queues that survive a restart.",
    screenshot: "file-operations.png",
    screenshotCaption: "The right-click menu’s file commands",
    screenshotAlt:
      "Skagway grid context menu with Bulk Rename…, Move Files…, and Fix for Built-in Player…",
    screenshotHint:
      "Right-click a grid card so the full context menu is readable, including Bulk Rename…, Move Files…, Fix for Built-in Player…, and Set Poster from Image….",
    screenshotScale: 0.75,
    sections: [
      {
        title: "Everyday actions",
        intro:
          "These commands are on the right-click menu. Show in Finder is also File → Show in Finder (⌥⌘F) once a video is selected.",
        steps: [
          "Show in Finder (⌥⌘F) reveals the file in Finder.",
          "Edit Title…, or Return on a single focused video, changes the catalog Title. The file name on disk stays as it is. Press Esc to cancel the edit.",
          "Rename File… changes the file name on disk. The catalog keeps the previous name as Original File Name, and search and export can still use that historical name.",
          "Open With lists installed apps that can open the file. Choose one to hand the file to that app.",
        ],
      },
      {
        title: "Bulk Rename…",
        intro:
          "Bulk rename changes file names on disk for many videos at once. Original File Name in the catalog is kept for search and export. Title, the display name, is left as it is.",
        steps: [
          "Choose File → Bulk Rename… to rename every video in the current view, including the effect of search and filters. Or select videos, right-click, and choose Bulk Rename… to rename only that selection.",
          {
            text: "Build a Name pattern from the field groups Identity, Media, Library, and Custom, and from these Special tokens. The sheet previews every resulting name before anything is renamed.",
            table: {
              columns: [
                "Token",
                "Optional arguments",
                "What it inserts",
                "Examples",
              ],
              rows: [
                [
                  "{Inc …}",
                  "Starting number. The number of digits sets zero-padding.",
                  "A counter that steps once per file in the batch.",
                  "{Inc 1}, {Inc 015}",
                ],
                [
                  "{Conflict …}",
                  "A prefix, then a starting number.",
                  "Nothing when the new name is unique. On a collision, a disambiguator so the name can still be written.",
                  "{Conflict -1}, {Conflict -01}",
                ],
                [
                  "{Stem}",
                  "Case: lower or L, upper or U, title or T, Name or N.",
                  "The current file name without its extension.",
                  "{Stem}, {Stem lower}",
                ],
                [
                  "{Date …}",
                  "A date format string.",
                  "Today’s date in the format you write.",
                  "{Date yyyy-MM-dd}, {Date MMM-yyyy}",
                ],
                [
                  "{UUID8}",
                  "—",
                  "Eight random hex characters, different for each file.",
                  "{UUID8}",
                ],
              ],
            },
          },
          "Read the Preview columns. A skipped row includes the reason it will not be renamed.",
          "Click Rename N Files. If any names fail, the results sheet offers Retry Failed for another pass at those files.",
        ],
        screenshots: [
          {
            filename: "bulk-rename.png",
            caption: "The Bulk Rename… sheet: name pattern and preview",
            alt: "Skagway Bulk Rename sheet with a name pattern and preview",
            hint: "Bulk Rename sheet. Name pattern field showing at least two tokens, for example {Stem} and {Inc 1}. Field groups Identity, Media, Library, Custom, and Special visible if they fit. Preview table with several rows, including one skipped row whose reason is readable. Rename N Files button visible.",
          },
        ],
      },
      {
        title: "Move files",
        steps: [
          "Select the videos, right-click, and choose Move Files…. Choose the destination folder and click Move Here.",
          "A move on the same volume finishes immediately. It does not appear in the Move Queue.",
          "A move onto another volume copies first, verifies the copy, and only then removes the original. The activity strip at the bottom of the window shows progress, for example Moving 18% · +2.",
          "Click the activity strip, or choose View → Move Queue…, to abort a cross-volume move, retry a failed one, or reorder the queue.",
        ],
      },
      {
        title: "Fix for Built-in Player… (re-encode)",
        intro:
          "Most files play with no conversion. Use this when a file will not play in Skagway’s player. You can also hand that file to another app with Play in External Player, and skip ffmpeg entirely.",
        steps: [
          "Right-click the video and choose Fix for Built-in Player…. Skagway re-encodes it to an MP4 with H.264 video and AAC audio. The command needs ffmpeg. Point Skagway at it once under Settings → Tools.",
          "The original file is kept, with _backup in the name, until you delete that backup. A failed encode, or a change of mind, still has the original.",
          "Jobs run one at a time. While one is running, open the queue from the activity strip. After it finishes, click the circular-arrows pill in the header — the tooltip reads “Re-encode queue — click to manage” — or choose View → Re-encode Queue…. Restore a backup, or delete it, from that queue.",
          "Finished conversions appear in the Recently Converted smart library.",
        ],
      },
      {
        title: "Queue pills and the activity strip",
        intro:
          "The activity strip is the progress line along the bottom of the library window. The header pill is only for re-encode, and only so you can get back to backups after the strip has cleared.",
        steps: [
          {
            text: "While a move or a re-encode is running, the strip shows the job and a percent, for example Re-encode 42% or Moving 18% · +2. The +N is further work still queued. Click the strip to open that queue.",
            screenshot: {
              filename: "queue-activity-strip.png",
              caption: "The activity strip at the bottom of the window",
              alt: "Skagway bottom activity strip showing move or re-encode progress",
              hint: "Tight crop of the bottom activity strip while a move or re-encode is running — text and percent readable (for example Re-encode 42% or Moving 18% · +2).",
            },
          },
          {
            text: "When a re-encode finishes, the strip clears and a circular-arrows pill remains in the header, to the right of the video count. Click it to open the re-encode queue. A successful move uses the strip only, and clears itself when it is done.",
            screenshot: {
              filename: "queue-header-pills.png",
              caption: "The re-encode pill in the header, beside the video count",
              alt: "Skagway header re-encode pill next to the video count",
              hint: "Tight crop of the header to the right of the video count after a re-encode has finished (backup still kept): one circular-arrows pill. Tooltip “Re-encode queue — click to manage” if it fits.",
            },
          },
          "A re-encode row stays in the queue while its _backup file is still there. Restore the original from that row, or delete the backup, and the row can leave.",
        ],
      },
      {
        title: "Remove vs. Delete",
        intro:
          "Remove forgets a video. Delete throws the file away. Both are on the right-click menu. Pick the one that matches what you want left on disk.",
        steps: [
          "Remove from Library (⌥⌘R) drops the video from the catalog. The file stays on disk. A later scan of that folder brings the video back.",
          "Delete Video… (⌘⌫) asks for confirmation, then moves the file to the Trash.",
          "To skip that confirmation, turn off Confirm deletions under Settings → Library.",
        ],
      },
      {
        title: "Duplicates",
        steps: [
          "Open the Duplicates smart library from Quick Filter. Skagway groups videos whose file content matches, even when the file names differ.",
          "Keep the copy you want. On the others, choose Remove from Library or Delete Video….",
          "If a group is not really the same video, right-click → Not a Duplicate. Skagway remembers that exception and leaves those files out of the group.",
        ],
      },
      {
        title: "Fix thumbnails and filmstrips",
        steps: [
          "Choose Regenerate Thumbnail when a poster landed on a black frame or a title card. Skagway picks a new frame. The command works on a batch selection.",
          "Right-click → Set Poster from Image… to choose an image file as the poster. Dragging an image onto a Grid card does the same.",
          "Right-click → Modify Filmstrip… to change the rows and columns of that video’s filmstrip preview. The library-wide default for the Inspector filmstrip is Settings → Video → Default Filmstrip Size.",
          "For a thumbnail taken from the exact frame on screen, play the video and press ⌥⌘M instead of regenerating.",
        ],
      },
    ],
  },
  {
    slug: "export-import",
    title: "Export / Import",
    blurb: "Metadata as CSV or JSON Lines, plus library copies.",
    summary:
      "Export titles, ratings, tags, and other metadata as CSV or JSON Lines, import that file into a library, or save a timestamped copy of the .machii catalog. Export writes metadata. It does not copy video files.",
    screenshot: "export-import.png",
    screenshotCaption: "The Export Metadata… sheet",
    screenshotAlt:
      "Skagway Export Metadata sheet with CSV / JSON Lines and the Match keys, Importable, and Export only field sections",
    screenshotHint:
      "Export Metadata sheet: title Export Metadata, a line such as “Exporting N filtered videos,” format switch CSV / JSON Lines, Fields grouped into Match keys (Content Fingerprint, Path), Importable (Title, Rating, Notes, Tags, Resume Position (seconds), Plays, Subtitles), and Export only if it is in view (Original File Name). Export… and Cancel readable.",
    sections: [
      {
        title: "Export Metadata… (⌥⌘E)",
        intro:
          "The sheet is titled Export Metadata. The line under the title says how many videos will be written, for example when a filter is on.",
        steps: [
          "Choose File → Export Metadata… (⌥⌘E) to export every video currently shown. Search and filters are included. Right-click → Export Metadata… exports only the videos you have selected.",
          "Under Format, choose CSV for a spreadsheet, or JSON Lines for scripts and other tools.",
          "Under Fields, check the columns you want. Match keys are how a later import finds each video: Content Fingerprint and Path. The note under that heading says they are used to find videos when applying the file.",
          "Importable fields are written back by Import Metadata…. That group includes Title, Rating, Notes, Tags, Resume Position (seconds), Plays, and Subtitles, plus custom fields you have defined. Export only fields are read-only facts, including Original File Name.",
          "Checked fields stay at the top of their section. Drag a row to reorder it within its section. Click Export…. Skagway remembers the format and the field checks for the next export.",
        ],
      },
      {
        title: "Import Metadata… (⌥⌘I)",
        intro:
          "Import reads a file you previously exported, or a file in that same shape. It updates the open library. Have a Save Copy… of the catalog first if you want a way back.",
        steps: [
          "Choose File → Import Metadata… (⌥⌘I) and open a CSV or JSON Lines file. Skagway detects which format it is.",
          "Each row is matched by Path first, then by Content Fingerprint. A file that has moved can still match when the fingerprint is the same.",
          "Importable values change when the file disagrees with the library. Tags in the file are added to the tags already on the video. Tags you leave out of the file stay on the video.",
          "An unknown column can be skipped, or imported as a new custom field. When the import finishes, a summary reports Matched, Updated, and Unmatched.",
          "Videos the import changed appear in the Last Metadata Import smart library.",
        ],
      },
      {
        title: "Save Copy… — back up the catalog",
        steps: [
          "Choose File → Save Copy… and pick a folder. Skagway writes a timestamped duplicate of the .machii file.",
          "The library you had open stays open. The copy keeps the original cache pointer. It does not create a second thumbnail cache.",
          "Open that copy later with File → Open Library….",
        ],
      },
      {
        title: "When to use which",
        steps: [
          "Use Save Copy… before a large rename, reconnect, or import, when you want the whole catalog file set aside.",
          "Use Export Metadata… and then Import Metadata… to move ratings and tags between libraries or Macs, or to edit metadata in a spreadsheet and bring it back.",
          "Use Export Metadata… on its own when another tool needs the library’s metadata.",
        ],
      },
    ],
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    blurb: "Shortcuts for the library, playback, and file commands.",
    summary:
      "⌥ is an alternate action, ⇧ reveals or adds, and ⌃ sizes the player. If the cursor is in a text field, press Esc once so the next key hits the library.",
    sections: [
      {
        title: "Layouts and navigation",
        intro:
          "Arrow keys move focus in Grid, List, and Storyboard. They leave selection checkmarks where they are.",
        steps: [
          {
            text: "Layout, focus, and the Inspector.",
            table: {
              columns: ["Shortcut", "Action"],
              rows: [
                ["⌘1", "Grid layout."],
                ["⌘2", "List layout."],
                ["⌘3", "Storyboard layout."],
                ["← → ↑ ↓", "Move focus one clip."],
                ["Home", "Jump to the first video."],
                ["End", "Jump to the last video."],
                ["⌘J", "Scroll the focused clip back into view."],
                ["⌘I", "Show or hide the Inspector."],
                ["⌥⌘T", "Switch the Inspector preview between Still and Filmstrip."],
                ["Return", "Edit the focused video’s Title."],
                ["Esc", "Cancel Title editing, or stop playback."],
              ],
            },
          },
          {
            text: "The batch selection. Focus and the checkmarks stay independent.",
            table: {
              columns: ["Shortcut", "Action"],
              rows: [
                ["⌘-click", "Add that clip to the selection, or remove it."],
                ["⇧-click", "Select the range from the last click through this clip."],
                ["A", "Add or remove the focused clip."],
                ["⌘A", "Select every video in the current view."],
                ["⇧⌘A", "Clear the selection."],
              ],
            },
          },
        ],
      },
      {
        title: "Search, filters, and Play All",
        steps: [
          {
            text: "Search and the filter drawer. Quick and Advanced are tabs in the same drawer.",
            table: {
              columns: ["Shortcut", "Action"],
              rows: [
                ["⌘F", "Put the cursor in Search videos."],
                ["⇧⌘F", "Open or close the filter drawer."],
                ["⌘⌥Q", "Switch to the Quick tab. Opens the drawer if it is closed."],
                ["⌘⌥A", "Switch to the Advanced tab. Opens the drawer if it is closed."],
                ["⌘⌥C", "Clear all filters, on both tabs."],
                ["⇧⌘P", "Play All through the current view."],
                ["⇧⌘S", "Surprise Me! Jumps to one random video."],
                ["⇧⌘R", "Shuffle the current view. Choose it again to reshuffle."],
              ],
            },
          },
        ],
      },
      {
        title: "Playback",
        steps: [
          {
            text: "The player. Esc stops and saves the position. ⌃⌘F leaves full screen without stopping.",
            table: {
              columns: ["Shortcut", "Action"],
              rows: [
                ["Space", "Play or pause the focused video."],
                ["⌥Space", "Play from the beginning, ignoring the resume position."],
                ["⌥←", "Skip back 15 seconds."],
                ["⌥→", "Skip forward 15 seconds."],
                ["⌥⌘B", "Bookmark the current position while playing."],
                ["⌃⌘C", "Compact player, docked in the Inspector."],
                ["⌃⌘W", "Windowed player."],
                ["⌃⌘F", "Enter or leave full screen."],
                ["Esc", "Stop playback. The position is saved."],
                ["⌥⌘M", "Make Thumbnail from Current Frame."],
                ["⌘↩", "Play in External Player."],
              ],
            },
          },
        ],
      },
      {
        title: "Files and metadata",
        steps: [
          {
            text: "Library and file commands. ⌘⌫ is Delete Video…, which moves the file to the Trash. Remove from Library leaves the file on disk.",
            table: {
              columns: ["Shortcut", "Action"],
              rows: [
                ["⇧⌘O", "Add Folder…"],
                ["⌘W", "Close the window."],
                ["⌥⌘F", "Show in Finder."],
                ["⌥⌘E", "Export Metadata…"],
                ["⌥⌘I", "Import Metadata…"],
                ["⌥⌘R", "Remove from Library."],
                ["⌘⌫", "Delete Video…"],
                ["⌘,", "Settings…"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    blurb: "Every tab in Skagway → Settings…",
    summary:
      "Open Settings with ⌘, or from Skagway → Settings…. A library has to be open for the library-specific tabs. The sidebar is Library, Video, Data Sources, Extensions, Tools, and Custom Metadata, with a search field above the list.",
    screenshot: "settings.png",
    screenshotCaption: "Settings, on the Library tab",
    screenshotAlt: "Skagway Settings window on the Library tab",
    screenshotHint:
      "Settings window on the Library tab: Smart Libraries toggles, Change Library Location… / Change Thumbnail Cache Location…, and List view columns.",
    sections: [
      {
        title: "Library",
        intro:
          "This tab is about the open library: where its files live, which smart libraries you see, and which List columns are on.",
        steps: [
          "Exclude corrupt files from filters leaves corrupt files out of ordinary filters. They stay in the Corrupt smart library, and search can still find them.",
          "Confirm deletions asks before Delete Video… moves a file to the Trash. Turn it off to skip that question.",
          "Change Library Location… quits Skagway and opens the catalog chooser. Files on disk are not deleted. The choices on that screen are described on the Library page.",
          "Change Thumbnail Cache Location… points this library at a different cache folder. Other libraries are unaffected. The command retargets the pointer. Existing cache files are left in place.",
          "Automatically check for updates is off by default. When you turn it on, Skagway occasionally checks downloads.machiilabs.com for a newer build. The check does not send usage analytics.",
          "Smart Libraries is the list of toggles for the Quick Filter drawer. Recently Added and Recently Played each have a day count. Top Rated has a star threshold. Turn a row off to hide that smart library.",
          "List view columns chooses what List shows. Title stays on. You can also right-click a column header in the table. Drag a header to reorder it, or its edge to resize it. Up to 16 custom columns can be shown at once, alphabetically.",
        ],
      },
      {
        title: "Video",
        intro:
          "Playback, previews, and the player.",
        steps: [
          "Default Filmstrip Size sets the rows and columns of Inspector filmstrip previews. Click Regenerate filmstrips after you change it, to rebuild previews that were made at the old size.",
          "Surprise Me! auto-plays selected video: on means ⇧⌘S jumps to a random video and plays it. Off means the jump only.",
          "Loop Play All makes Play All start again at the first video after the last one finishes. The toolbar also has a Loop Play All control.",
          "Hover preview on Grid and List turns the silent moving preview on or off. Storyboard does not use it.",
          "Prepare previews while idle is on by default. When nothing is playing, scanning, or scrolling, Skagway builds missing Grid, List, and Storyboard images for the current view, then for the rest of the library.",
          "Tag blind default state remembers whether the Inspector’s Add tags list starts open. Filter drawer height remembers how tall you left the Quick Filter drawer.",
          "Player opens at chooses the size for the next playback: Compact, Full screen, or Last used size.",
          "Show filmstrip in player is on by default. It is the row of frames above the scrubber. Compact draws that row thinner.",
          "Fade resume banner after delay controls whether the “Resumed at…” banner fades, and when. That banner offers Start at beginning.",
        ],
      },
      {
        title: "Data Sources",
        intro:
          "Data Sources are the folders Scan for New Videos checks. The video files stay in those folders. This tab edits the list. File → Add Folder… also adds to it, and that command scans immediately.",
        steps: [
          "Click Add Folder… to register another folder. Registration alone does not index it. Then choose File → Scan for New Videos.",
          "Show in Finder opens the selected source folder in Finder.",
          "Exclude… skips a nested subfolder on later scans. To stop watching the source folder, select it and click Remove.",
          "Remove takes the folder off the list. Videos already indexed from that folder stay in the library.",
        ],
      },
      {
        title: "Extensions",
        steps: [
          "Checked extensions are the ones a scan treats as video. Uncheck an extension to ignore new files of that type.",
          "Use the Add extension field for an extension that is not in the list.",
          "Click Reset to defaults to restore the standard list.",
        ],
      },
      {
        title: "Tools",
        intro:
          "FFmpeg is used only by Fix for Built-in Player…, the optional re-encode to MP4. Browse, tag, filter, and playback do not need it. For a file the built-in player cannot open, Play in External Player is the other route.",
        steps: [
          "Skagway looks for a Homebrew ffmpeg, and for an install under /usr/local.",
          "If the binary lives somewhere else, click Choose… and select the ffmpeg file.",
        ],
      },
      {
        title: "Custom Metadata",
        steps: [
          "Create a field for this library: a name, and a type. The types are String, Text, Number, Date, Date & Time, and Boolean.",
          "Values are edited in the Inspector under CUSTOM. The field also appears in search, the Sort menu, List columns, filters, smart collections, and Export Metadata….",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    blurb: "Your library stays on your Mac.",
    summary:
      "Skagway keeps the catalog and the thumbnail cache on this Mac. There is no account and no cloud sync. It does not send usage analytics or library data anywhere. Optional update checks are off until you turn them on, and a check only asks whether a newer build exists.",
    sections: [
      {
        title: "Where your data lives",
        intro:
          "Four things stay on disk, and only the first three are Skagway’s. Your videos are the fourth, and they stay in the folders you chose.",
        steps: [
          "The catalog is the .machii file. Add Videos on the welcome screen puts it in the video folder you picked. Use standard location on this Mac, from Advanced Options… or File → Change Library Location…, puts it under ~/Library/Application Support/Skagway/. Choose Folder… puts it in a folder you pick.",
          "Thumbnails, filmstrips, and storyboard collages live in that library’s cache. The cache is under ~/Library/Caches/Skagway, in a Skagway-cache folder next to the library, or in a folder you picked. Opening one library never reads another library’s cache.",
          "Settings are ordinary macOS preferences on this Mac.",
          "Video files stay at the paths you gave Skagway. A move you start with Move Files… is the way a file changes folders. Nothing in playback, tagging, or export uploads them.",
        ],
      },
      {
        title: "Network and updates",
        steps: [
          "Skagway does not send telemetry, analytics, library paths, play history, or browsing behavior.",
          "Automatically check for updates, under Settings → Library, is off by default. When it is on, Skagway occasionally asks downloads.machiilabs.com whether a newer build exists. Check for Updates… does that same check when you choose it. Neither one uploads the library or your videos.",
          "Choose Help → Skagway Help. That opens this manual. Contact Support… opens an email to support@machiilabs.com. You send that mail yourself.",
        ],
      },
      {
        title: "Getting help",
        steps: [
          "Email support@machiilabs.com. A person reads it.",
          "If a bug report would help, you write it and you attach what you choose to attach. Skagway does not assemble a report or send one on its own.",
        ],
      },
    ],
  },
];

/** Manual text may link a page inline as [[Page Title]]. Strip that for search and meta tags. */
export function manualPlainText(text: string): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, "$1");
}

export function manualPart(page: ManualPage): ManualPart {
  return page.part ?? "reference";
}

export function manualPartLabel(page: ManualPage): string {
  return MANUAL_PART_LABELS[manualPart(page)];
}

export function getManualPage(slug: string): ManualPage | undefined {
  if (slug === MANUAL_HOME.slug) return MANUAL_HOME;
  return getManualNavPages().find((page) => page.slug === slug);
}

/** Topic URLs. First launch stays at /skagway/manual, so it is not a slug. */
export function getManualTopicPages(): ManualPage[] {
  return getManualNavPages().filter((page) => page.slug !== MANUAL_HOME.slug);
}

/** Stable HTML id for a section heading (used by sidebar topic links). */
export function manualSectionId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function manualPageHref(slug: string): string {
  return slug === MANUAL_HOME.slug
    ? "/skagway/manual"
    : `/skagway/manual/${slug}`;
}

/** First launch, then How do I…?, then the reference. */
export function getManualNavPages(): ManualPage[] {
  return [MANUAL_HOME, ...GUIDE_PAGES, ...MANUAL_PAGES];
}

export function getManualNeighbors(slug: string): {
  prev?: ManualPage;
  next?: ManualPage;
} {
  const pages = getManualNavPages();
  const index = pages.findIndex((page) => page.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? pages[index - 1] : undefined,
    next: index < pages.length - 1 ? pages[index + 1] : undefined,
  };
}
