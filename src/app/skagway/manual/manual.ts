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

export type ManualTable = {
  columns: string[];
  rows: string[][];
};

/** Screenshot under public/skagway/manual/ — page-level or inlined on a step/section. */
export type ManualScreenshot = {
  filename: string;
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

export type ManualPage = {
  slug: string;
  title: string;
  blurb: string;
  summary: string;
  /** Expected file under public/skagway/manual/ — omit for pages that don't need one */
  screenshot?: string;
  screenshotAlt?: string;
  screenshotHint?: string;
  /** Display width as a fraction of the content column (e.g. 0.75). Default 1. */
  screenshotScale?: number;
  /** Hero figure is missing or predates 0.80 — show an on-page capture brief. */
  screenshotNeedsUpdate?: boolean;
  sections: ManualSection[];
};

/** Home page of the manual — library home setup, then empty-library add-videos. */
export const MANUAL_HOME: ManualPage = {
  slug: "first-launch",
  title: "First launch",
  blurb: "Choose where Skagway stores its data, then add your first videos.",
  summary:
    "The first time you run Skagway, you choose where the catalog and thumbnail cache live. Then an empty home library opens so you can add videos.",
  screenshot: "first-launch.png",
  screenshotAlt:
    "Skagway “Choose where Skagway stores its data” setup screen with privacy bullets and Use standard location / Choose Folder… buttons",
  screenshotHint:
    "Home-setup screen: title “Choose where Skagway stores its data”; privacy copy readable; both buttons — Use standard location on this Mac and Choose Folder….",
  sections: [
    {
      title: "What Skagway stores",
      steps: [
        "A library is Skagway’s catalog — titles, thumbnails, ratings, tags, bookmarks, and collections. Your video files stay where they are.",
        "Skagway does not modify or protect source media. Put sensitive files on an encrypted volume if you need that at the disk level.",
        "Each library keeps its own thumbnail cache. Opening one library never depends on another volume’s cache.",
      ],
    },
    {
      title: "Choose where Skagway stores its data",
      steps: [
        "Use standard location on this Mac — library under Application Support; cache under ~/Library/Caches/Skagway/.",
        "Choose Folder… — pick a folder yourself (for example on an encrypted or external volume).",
        {
          text: "If you chose a custom folder, Skagway asks Where should this library’s cache live?",
          substeps: [
            "Co-locate with library — a Skagway-cache folder next to the library.",
            "System default — this library’s cache under ~/Library/Caches/Skagway.",
            "Choose Folder… — pick any folder for this library’s thumbnails.",
          ],
        },
        {
          text: "Then Skagway asks How should Skagway find this library?",
          substeps: [
            "Remember this location — Skagway can reopen it next time.",
            "Ask every time I open Skagway — you open the library file each launch.",
          ],
        },
      ],
      note: "Nothing leaves your Mac by default — no account, no cloud sync, no usage analytics. Optional update checks stay off unless you turn them on later; they only ask whether a newer Skagway build exists.",
    },
    {
      title: "Your library opens",
      steps: [
        "After setup, Skagway relaunches briefly — that is normal.",
        "With Use standard location or Remember this location, Skagway opens your home library automatically (and creates an empty .machii catalog if needed).",
        "If you chose Ask every time I open Skagway, no library is remembered — use File → Open Library…, New Library…, or Open Recent.",
      ],
    },
    {
      title: "Add your first videos",
      steps: [
        "An empty library shows Drag videos here — drop video files or folders onto that area.",
        "Or click Add Files… and select video files or folders, then Add.",
        "You can also choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.",
        "Skagway indexes recognized videos and builds thumbnails in the background.",
      ],
        note: "Folders you add are saved as Data Sources so Skagway can scan them later. Change their locations later from the File menu.",
    },
  ],
};

export const MANUAL_PAGES: ManualPage[] = [
  {
    slug: "library",
    title: "Library",
    blurb: "Add folders, keep the catalog current, manage .machii files.",
    summary:
      "The File menu holds everything about the library itself: which folders Skagway watches, scanning for new files, and creating, opening, copying, or deleting .machii library files.",
    screenshot: "library-file-menu.png",
    screenshotAlt: "Skagway with the File menu open",
    screenshotHint:
      "Full File menu with shortcuts readable: Bulk Rename…, Change Library Location…, Change Thumbnail Cache Location…, Add Folder…, Scan for New Videos, Scan for Subtitles, and create/open/recent library items.",
    screenshotScale: 0.75,
    sections: [
      {
        title: "Add your video folders",
        steps: [
          "In an empty library, drag files or folders onto Drag videos here, or click Add Files….",
          "Or choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.",
          "Skagway indexes recognized videos (subfolders included) and builds thumbnails in the background.",
          "Added folders are registered as Data Sources automatically.",
        ],
        note: "Manage those folders under Settings → Data Sources. Your files stay where they are on disk.",
      },
      {
        title: "Keep the library current",
        steps: [
          "Scan for New Videos — checks watched folders for files added since the last scan. New ones appear in Last Added.",
          "Scan for Subtitles — re-checks the current view for matching .srt files and updates subtitle badges.",
        ],
        note: "Scan for New Videos is also available as a button on the toolbar.",
        noteIcon: "scan-for-new-videos-icon.png",
        noteIconAlt: "Scan for New Videos toolbar button",
      },
      {
        title: "Create, open, and switch libraries",
        steps: [
          "Open Home Library / Create Home Library — the library at your chosen home location.",
          "New Library… — create a separate .machii catalog.",
          "Open Library… — open any existing .machii file.",
          "Open Recent — recently used libraries.",
          "Change Library Location… — run the first-launch location setup again for the catalog.",
          "Change Thumbnail Cache Location… — move this library’s thumbnail cache.",
          "Close Library… — close the catalog. Reopen it from the File menu.",
        ],
        note: "Switching libraries does not delete the one you left. Skagway restarts briefly.",
      },
      {
        title: "Copy or delete the library file",
        steps: [
          "Save Copy… — writes a timestamped duplicate wherever you choose. The original stays open; open the copy later with Open Library….",
          "Delete This Library… — deletes the .machii catalog after a confirmation. Your video files are not touched.",
        ],
        note: "Backups and moving metadata between libraries are covered in more detail.",
        noteHref: "/skagway/manual/export-import",
        noteLinkLabel: "Export / Import",
      },
      {
        title: "Which files count as video",
        steps: [
          "Out of the box Skagway recognizes mp4, mov, m4v, avi, mkv, wmv, flv, webm, mpg, mpeg, 3gp, ts, mts, vob, ogv, divx, dv, m2ts, and mxf.",
          "Add or disable extensions under Settings → Extensions.",
        ],
      },
    ],
  },
  {
    slug: "browse",
    title: "Browse",
    blurb: "Grid and List views, sorting, Play All, search, and fast navigation.",
    summary:
      "Browse the library as a thumbnail Grid or a column-based List, sort by any field, Play All through the current view, and search across titles, filenames, tags, and custom fields — built to stay fast at thousands of videos.",
    screenshot: "browse.png",
    screenshotAlt:
      "Skagway grid view with the toolbar: view switcher, sort menu, Play All, and Search videos field",
    screenshotHint:
      "Populated Grid. Toolbar: Grid/List, Sort, Play All and Loop Play All, Search videos, and the video count. Optional: a search that matches a title or tag.",
    sections: [
      {
        title: "Grid and List",
        steps: [
          "Switch views with the Grid / List control in the toolbar, or press ⌘1 for Grid and ⌘2 for List.",
          "Grid cards show the thumbnail, Title, duration, date, and rating. A captions badge and a watch-progress bar appear when relevant.",
          "Hold the pointer over a grid card for Live Preview — see the Playback page.",
          "Double-click a grid card to play it inside Skagway. Double-click a List row to open it in your external player.",
        ],
      },
      {
        title: "List columns",
        steps: [
          "The Title column is always visible. Optional columns: Duration, Resolution, File size, Rating, Date added, Plays, Created, and Last played.",
          "Choose which columns appear under Settings → Library → List view columns, or right-click a column header.",
          "The Rating column is editable — click the stars directly in the row.",
          "Custom metadata fields you define also become available as columns.",
        ],
      },
      {
        title: "Sort, shuffle, and Surprise Me!",
        steps: [
          "Open the Sort menu to order by Title, Date Added, Duration, File Size, Rating, Resolution, or Plays — plus any custom fields you’ve defined.",
          "While viewing an album, Album Order appears at the top of the Sort menu.",
          "Click the arrow beside the Sort menu to flip between ascending and descending.",
          "Shuffle (⇧⌘R) puts the whole view in a random order; picking any sort exits it. Click Shuffle again to reshuffle.",
          "Surprise Me! (⇧⌘S) jumps to one random video — and can auto-play it (Settings → Video).",
        ],
      },
      {
        title: "Play All",
        steps: [
          "Play All (⇧⌘P) plays the current view from the first playable video and advances when each one finishes.",
          "Loop Play All repeats the list. Stopping or playing a single video ends the session.",
        ],
      },
      {
        title: "Search",
        steps: [
          "Press ⌘F or click the Search videos field, then type part of what you’re looking for.",
          "Search matches Title, file names, tags, and custom fields.",
          "Multiple words narrow the results — every word must appear somewhere, not necessarily in the same field.",
          "Click the × in the field (or clear it) to show the full library again.",
        ],
        note: "For ratings, duration, quality, and other structured criteria, use the filters.",
        noteHref: "/skagway/manual/filter",
        noteLinkLabel: "Filter",
      },
      {
        title: "Getting around quickly",
        steps: [
          "Arrow keys move the selection through the grid; Home and End jump to the first and last video.",
          "⌘J scrolls the current selection back into view.",
          "⌘-click adds or removes a single video from the selection; ⇧-click selects a range. ⌘A selects everything, ⇧⌘A deselects.",
        ],
      },
    ],
  },
  {
    slug: "filter",
    title: "Filter",
    blurb: "Quick Filter chips and Advanced Filter rules.",
    summary:
      "Narrow the library with a few clicks using Quick Filter, or build precise boolean rules with Advanced Filter. Both work on top of search and sorting.",
    screenshot: "quick-filter.png",
    screenshotAlt:
      "Skagway Quick Filter drawer showing Smart Libraries, Collections, Rating, Duration, Quality, and Tags cards",
    screenshotHint:
      "Quick Filter drawer (⇧⌘F) over a populated library. Rating row: No Stars, 1–5 stars, Or Higher. Smart Libraries, Collections, Duration, Quality, and Tags visible.",
    sections: [
      {
        title: "Quick Filter (⇧⌘F)",
        steps: [
          "Click the filter button in the toolbar or press ⇧⌘F to open the Quick Filter drawer above the grid.",
          "Combine a Smart Library, collection, or album with rating, duration, quality, and tags.",
          "Click No Stars or a star rating. Or Higher includes that rating and every higher one.",
          "Tags can match Any or All of the selected tags.",
          "Everything you pick applies together. Search still works on top.",
        ],
      },
      {
        title: "Smart Libraries",
        steps: [
          "All Videos — the whole library.",
          "Recently Added / Recently Played — videos from the last N days (N is set in Settings → Library).",
          "Top Rated — videos at or above your chosen star threshold.",
          "Duplicates — videos whose file content matches another video, grouped by fingerprint.",
          "Corrupt — files Skagway couldn’t read metadata or a thumbnail from.",
          "Missing — files whose path no longer exists (unmounted drive, moved file). Click the refresh arrow to rescan.",
          "Last Added — videos found by the most recent Scan for New Videos.",
          "Recently Converted and Last Metadata Import appear after you use re-encoding or metadata import.",
        ],
        note: "Choose which Smart Libraries appear under Settings → Library → Smart Libraries.",
      },
      {
        title: "Advanced Filter (⇧⌘V)",
        steps: [
          "Press ⇧⌘V to switch the drawer to the Advanced Filter rule editor.",
          "Build rules on any video attribute or custom field. Operators change to match the attribute.",
          "Group rules with ALL or ANY — for example (Tag is Vacation AND Rating ≥ 4) OR Tag is Favorite.",
          "Click Save as Collection… to keep the rule set permanently.",
        ],
        note: "Quick Filter and Advanced Filter are exclusive — opening one clears the other, so they never combine unexpectedly.",
      },
      {
        title: "Clearing filters",
        steps: [
          "With the drawer closed, active filters appear as removable pills above the grid — click a pill’s × to drop just that condition.",
          "Click Clear all in the pill row or the drawer header to reset everything.",
          "View → Clear Filters (⌥⌘C) does the same from the keyboard.",
        ],
      },
    ],
  },
  {
    slug: "collections",
    title: "Collections & Albums",
    blurb: "Saved smart views and hand-picked playlists.",
    summary:
      "Collections are saved rule sets that update themselves as the library changes. Albums are hand-picked playlists you control video by video — including a saved Album Order. Both live in the Quick Filter drawer.",
    screenshot: "collections.png",
    screenshotAlt:
      "Skagway album open with Sort set to Album Order and collections listed in Quick Filter",
    screenshotHint:
      "An album open with Sort → Album Order and grip badges on cards, or the Collections card listing smart collections and albums.",
    sections: [
      {
        title: "Create a smart collection",
        steps: [
          "Open the Quick Filter drawer (⇧⌘F) and click New Collection in the Collections card.",
          "Name it, then add rules — the same attributes and operators as Advanced Filter, with ALL/ANY groups.",
          "Click Create. The collection stays up to date as you tag and rate.",
        ],
      },
      {
        title: "Collections and the Advanced Filter work together",
        steps: [
          "To keep a live Advanced Filter, click Save as Collection… in the drawer header.",
          "Right-click a collection for Edit as Advanced Filter…, Edit Collection…, or Delete Collection.",
        ],
      },
      {
        title: "Albums — hand-picked playlists",
        steps: [
          "Select videos, right-click, and choose New Album from Selection… — or New Album in the drawer for an empty one.",
          "Add more with right-click → Add to Album.",
          "With Sort → Album Order, drag cards or rows to rearrange.",
          "Right-click a video to Remove it from the album, or right-click the album to rename or delete it.",
        ],
        note: "Removing a video from an album never touches the file. Play All uses Album Order when that sort is active.",
      },
    ],
  },
  {
    slug: "organize",
    title: "Organize",
    blurb: "Ratings, tags, and custom metadata in the Inspector.",
    summary:
      "Select a video and the Inspector on the right shows its preview, facts, and editable metadata: Title, rating stars, tags, and any custom fields you define.",
    screenshot: "organize.png",
    screenshotAlt:
      "Skagway Inspector with rating stars, assigned tags, the Add tags list, and custom fields",
    screenshotHint:
      "Selected video with the Inspector open: display Title, Subtitles picker, filled rating stars, at least one assigned tag, and a custom field if defined.",
    sections: [
      {
        title: "Title (display name)",
        steps: [
          "Title is the display name used for sorting, List view, and search. It can differ from the file name.",
          "Press Return (or right-click → Edit Title…) to edit it.",
          "Renaming the file does not change Title.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "Set Subtitles in the Inspector so the badge and filters match how the video is captioned.",
          "Sidecar .srt files next to the video are detected automatically — see the Playback page.",
        ],
      },
      {
        title: "Rate videos",
        steps: [
          "Select one or more videos and click a star in the RATING row.",
          "Click the same star again to clear the rating.",
        ],
      },
      {
        title: "Tag videos",
        steps: [
          "Assigned tags appear as chips at the top of the TAGS section — click a chip to unassign it.",
          "Open the Add tags blind to see your other tags; click one to assign it to the selection.",
          "Type a name in the New Tag field and press Return to create a tag and assign it in one step.",
          "Rename or delete a tag by right-clicking it in the Quick Filter drawer’s Tags card. Deleting removes it from every video.",
        ],
      },
      {
        title: "Custom metadata",
        steps: [
          "Define your own fields under Settings → Custom Metadata.",
          "Field types: String, Text, Number, Date, Date & Time, and Boolean.",
          "Edit values in the Inspector’s CUSTOM section for any selection.",
          "Custom fields show up in search, sort, List columns, filters, collections, and export.",
        ],
      },
      {
        title: "Edit many at once",
        steps: [
          "Select multiple videos (⌘-click, ⇧-click, or ⌘A) — the Inspector switches to “N Videos Selected”.",
          "Ratings, tags, and custom values you set apply to every selected video.",
          "When selected videos have different values for a field, the Inspector shows “Multiple values” until you overwrite it.",
        ],
      },
    ],
  },
  {
    slug: "playback",
    title: "Playback",
    blurb: "The floating player, bookmarks, resume, and subtitles.",
    summary:
      "Skagway plays videos in a single floating player — compact, windowed, or full screen — plus Play All through the current view, bookmarks, resume positions, and sidecar subtitles.",
    screenshot: "playback.png",
    screenshotAlt:
      "Skagway floating player with custom transport controls and bookmark ticks on the timeline",
    screenshotHint:
      "Windowed floating player over the grid: traffic lights, transport (scrubber, skip, play/pause, speed, volume), and at least two diamond bookmark ticks on the timeline.",
    sections: [
      {
        title: "Start and stop",
        steps: [
          "Select a video and press Space, double-click its grid card, or click Play in the Inspector.",
          "Space toggles play/pause while the player is open.",
          "Press ⌥Space to play from the very beginning, ignoring any saved position.",
          "Press Esc (or the red traffic-light Stop) to stop — Skagway saves where you left off.",
        ],
        note: "If focus is in a text field, press Esc once first so Space plays instead of typing.",
      },
      {
        title: "Play All (⇧⌘P)",
        steps: [
          "Play All (⇧⌘P) plays the current view and advances when each video finishes.",
          "Loop Play All repeats the list. Stopping or playing a single video ends the session.",
        ],
        note: "Album Order is the sequence Play All uses when you are in an album. Search and sort are on the Browse page.",
        noteHref: "/skagway/manual/browse",
        noteLinkLabel: "Browse",
      },
      {
        title: "Transport controls",
        steps: [
          "Hover the scrubber for a frame preview; click to seek.",
          "Skip back / forward 15 seconds with ⌥← / ⌥→.",
          "Playback speed cycles from 0.5× to 2×.",
        ],
      },
      {
        title: "Bookmarks",
        steps: [
          "While playing, press ⌥⌘B or double-click the scrubber.",
          "Bookmarks appear as diamonds on the timeline and as a list in the Inspector — click one to jump there, or delete it from its row.",
        ],
        note: "Bookmarks live in the library file. Still frames regenerate if you move the library.",
      },
      {
        title: "Play from the filmstrip",
        steps: [
          "Switch the Inspector preview to Filmstrip (⌥⌘T) to see frames sampled across the video.",
          "Click a frame to start playback there.",
        ],
        note: "Clicking the Still preview starts playback too, from the beginning or the saved resume position.",
      },
      {
        title: "Three sizes, one player",
        steps: [
          "Compact (⌃⌘C) — docks into the Inspector preview.",
          "Windowed (⌃⌘W) — a floating panel; size and position are remembered.",
          "Full screen (⌃⌘F) — edge to edge without restarting. Esc stops; ⌃⌘F or the traffic lights leave full screen without stopping.",
          "Choose the opening size under Settings → Video → Player opens at.",
        ],
      },
      {
        title: "Resume where you left off",
        steps: [
          "Reopening a partially watched video resumes automatically. A banner offers Start at beginning.",
          "Grid cards show a thin progress bar. The banner can fade — see Settings → Video.",
        ],
      },
      {
        title: "Live Preview",
        steps: [
          "Rest the pointer on a grid card for a silent preview through the video.",
          "It pauses while the player is open. Toggle it under Settings → Video → Hover preview on Grid cards.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "Put an .srt file next to the video with the same name (movie.mp4 → movie.srt; movie.en.srt also works).",
          "Set Subtitles in the Inspector so the badge and filters match. File → Scan for Subtitles if you add files later.",
        ],
      },
      {
        title: "External players",
        steps: [
          "Press ⌘↩ (or right-click → Play in External Player) to open the video in its default macOS app.",
          "Right-click → Open With lists every installed app that can play the file.",
          "Either way, Skagway counts the play in the video’s play history.",
        ],
      },
      {
        title: "Capture the perfect thumbnail",
        steps: [
          "While playing, pause or scrub to the exact frame you want.",
          "Press ⌥⌘M (Make Thumbnail from Current Frame) — that frame becomes the video’s thumbnail everywhere in Skagway.",
          "Or right-click → Set Poster from Image… (or drag an image onto a grid card) to use any still as the poster.",
        ],
      },
    ],
  },
  {
    slug: "file-operations",
    title: "File operations",
    blurb: "Rename, bulk rename, move, re-encode, delete — with queues and safety nets.",
    summary:
      "Right-click any video (or selection) for file operations. Long jobs show progress in the bottom activity strip and open queues that survive restarts.",
    screenshot: "file-operations.png",
    screenshotAlt:
      "Skagway grid context menu with Bulk Rename…, Move Files…, and Fix for Built-in Player…",
    screenshotHint:
      "Right-click a grid card so the full context menu is readable, including Bulk Rename…, Move Files…, Fix for Built-in Player…, and Set Poster from Image….",
    screenshotScale: 0.75,
    sections: [
      {
        title: "Everyday actions",
        steps: [
          "Show in Finder (⌥⌘F) — reveal the file on disk.",
          "Edit Title… — press Return on a single selected video, or use the context menu. Changes the library display name only; the file on disk stays the same.",
          "Rename File… — rename the file on disk from the context menu. Original File Name in the catalog is preserved for search and export.",
          "Open With — open the file in any capable installed app.",
        ],
      },
      {
        title: "Bulk Rename…",
        steps: [
          "File → Bulk Rename… renames every video in the current filtered view. Right-click → Bulk Rename… renames only the selection.",
          {
            text: "Build a Name pattern from fields (Identity, Media, Library, Custom) and these Special tokens:",
            table: {
              columns: [
                "Token",
                "Optional arguments",
                "Description",
                "Examples",
              ],
              rows: [
                [
                  "{Inc …}",
                  "Starting number; digit width sets zero-padding",
                  "Sequential counter for each file in the batch",
                  "{Inc 1}, {Inc 015}",
                ],
                [
                  "{Conflict …}",
                  "Prefix + starting number",
                  "Empty when the new name is unique; on collision, inserts a disambiguator",
                  "{Conflict -1}, {Conflict -01}",
                ],
                [
                  "{Stem}",
                  "Case: lower|L, upper|U, title|T, Name|N",
                  "Current file name without its extension",
                  "{Stem}, {Stem lower}",
                ],
                [
                  "{Date …}",
                  "Date format string",
                  "Today’s date in the format you specify",
                  "{Date yyyy-MM-dd}, {Date MMM-yyyy}",
                ],
                [
                  "{UUID8}",
                  "—",
                  "Eight random hex characters, unique per file",
                  "{UUID8}",
                ],
              ],
            },
          },
          "Watch the live Preview columns. Skipped rows show why.",
          "Click Rename N Files to apply. A results sheet offers Retry Failed if anything goes wrong.",
        ],
        note: "Original File Name is preserved in the catalog for search and export — bulk rename changes the file on disk, not that historical name.",
      },
      {
        title: "Move files",
        steps: [
          "Right-click → Move Files… and choose a destination folder (Move Here).",
          "Moves on the same volume are instant and do not appear in the Move Queue.",
          "Cross-volume moves copy first, verify, then remove the original — a crash cannot lose the only copy.",
          "Cross-volume progress shows in the bottom activity strip. Click the strip or View → Move Queue… to abort, retry, or reorder.",
        ],
      },
      {
        title: "Fix for Built-in Player… (re-encode)",
        steps: [
          "Right-click → Fix for Built-in Player… converts a video to a widely compatible MP4 (H.264/AAC). This requires ffmpeg — set it up once under Settings → Tools.",
          "The original file is kept as a _backup until you delete it, so nothing is lost if an encode fails or you change your mind.",
          "Jobs run one at a time. Open the queue from the activity strip, the header pill after it finishes, or View → Re-encode Queue… — restore or delete backups there.",
          "Finished conversions appear in Recently Converted.",
        ],
      },
      {
        title: "Queue pills and the activity strip",
        steps: [
          {
            text: "Busy work appears as text + percent in the bottom activity strip (for example Re-encode 42% or Moving 18% · +2).",
            screenshot: {
              filename: "queue-activity-strip.png",
              alt: "Skagway bottom activity strip showing move or re-encode progress",
              hint: "Tight crop of the bottom activity strip while a move or re-encode is running — text and percent readable (for example Re-encode 42% or Moving 18% · +2).",
            },
          },
          {
            text: "After a re-encode finishes, a circular-arrows pill stays in the header so you can still open the queue. Moves use the activity strip only; successful ones clear themselves.",
            screenshot: {
              filename: "queue-header-pills.png",
              alt: "Skagway header re-encode pill next to the video count",
              hint: "Tight crop of the header to the right of the video count after a re-encode has finished (backup still kept): one circular-arrows pill.",
            },
          },
          "Re-encode rows stay while a backup remains.",
        ],
      },
      {
        title: "Remove vs. Delete",
        steps: [
          "Remove from Library (⌥⌘R) — Skagway forgets the video but the file stays on disk. Rescanning the folder will bring it back.",
          "Delete Video… (⌘⌫) — moves the actual file to the Trash after a confirmation.",
          "You can turn delete confirmations off under Settings → Library → Confirm deletions.",
        ],
      },
      {
        title: "Duplicates",
        steps: [
          "The Duplicates smart library groups videos whose file content matches — even if names differ.",
          "Keep the copy you want, then delete or remove the rest.",
          "False positive? Right-click → Not a Duplicate and Skagway remembers the exception.",
        ],
      },
      {
        title: "Fix thumbnails and filmstrips",
        steps: [
          "Regenerate Thumbnail — picks a fresh frame for videos that landed on a black frame or title card. Works on multi-selections.",
          "Set Poster from Image… — choose any image file as the poster (also works by dragging an image onto a grid card).",
          "Modify Filmstrip… — change the rows and columns of a video’s filmstrip preview.",
          "For frame-perfect thumbnails from the current playback frame, use ⌥⌘M instead.",
        ],
      },
    ],
  },
  {
    slug: "export-import",
    title: "Export / Import",
    blurb: "Metadata as CSV or JSON Lines, plus library copies.",
    summary:
      "Export titles, ratings, tags, and other metadata as CSV or JSON Lines, import them into another library, or copy the catalog file for backup.",
    screenshot: "export-import.png",
    screenshotAlt:
      "Skagway Export Metadata sheet with CSV / JSON Lines and the Match keys, Importable, and Export only field sections",
    screenshotHint:
      "Export Metadata sheet: format (CSV / JSON Lines), field sections (Match keys, Importable, Export only) with Title, Plays, Resume Position, and Original File Name visible, plus Export… / Cancel.",
    sections: [
      {
        title: "Export Metadata… (⌥⌘E)",
        steps: [
          "File → Export Metadata… exports every video currently shown — filters and search included. Right-click → Export Metadata… exports just the selection.",
          "Pick CSV (for spreadsheets) or JSON Lines (for scripts and tools).",
          "Fields are grouped: Match keys (to find videos on import), Importable (written back), and Export only (read-only facts).",
          "Check the fields you want and drag to reorder within a section.",
          "Your format and field choices are remembered for next time.",
        ],
      },
      {
        title: "Import Metadata… (⌥⌘I)",
        steps: [
          "File → Import Metadata… opens a CSV or JSON Lines export — the format is detected automatically.",
          "Rows match by Path, then Content Fingerprint, so a file that moved can still be found.",
          "Importable values update when they differ; tags are merged in, never removed.",
          "Unknown columns can be skipped or imported as new custom fields. A summary shows Matched / Updated / Unmatched.",
          "Touched videos appear in Last Metadata Import.",
        ],
      },
      {
        title: "Save Copy… — back up the catalog",
        steps: [
          "File → Save Copy… writes a timestamped duplicate of the library file.",
          "The current library stays open. Save Copy keeps the original cache pointer — it does not create a second cache.",
          "Open a copy anytime with File → Open Library….",
        ],
      },
      {
        title: "When to use which",
        steps: [
          "Save Copy… — a full snapshot before a big reorganization.",
          "Export + Import — move ratings and tags between libraries or Macs, or bulk-edit metadata in a spreadsheet and bring it back.",
          "Export alone — feed your library data to any external tool.",
        ],
      },
    ],
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    blurb: "The complete shortcut map.",
    summary:
      "Skagway is built for the keyboard. ⌥ is an alternate action, ⇧ reveals or adds, and ⌃ sizes the player.",
    sections: [
      {
        title: "Views and navigation",
        steps: [
          "⌘1 / ⌘2 — Grid view / List view.",
          "← → ↑ ↓ — move the selection through the grid.",
          "Home / End — jump to the first / last video.",
          "⌘J — scroll the selection back into view.",
          "⌘A / ⇧⌘A — select all / deselect all.",
          "Return — edit the selected video’s Title (display name). Esc — cancel editing (or stop playback).",
          "⌥⌘T — toggle the Inspector between Still and Filmstrip.",
        ],
      },
      {
        title: "Search, filters, and Play All",
        steps: [
          "⌘F — focus Search videos.",
          "⇧⌘F — open / close Quick Filter.",
          "⇧⌘V — open / close Advanced Filter.",
          "⌥⌘C — clear filters.",
          "⇧⌘P — Play All (current filtered view).",
          "⇧⌘S — Surprise Me! (jump to a random video).",
          "⇧⌘R — Shuffle the view order (toolbar).",
        ],
      },
      {
        title: "Playback",
        steps: [
          "Space — play / pause the selected video.",
          "⌥Space — play from the beginning (ignore the resume position).",
          "⌥← / ⌥→ — skip back / forward 15 seconds.",
          "⌥⌘B — bookmark the current position (while playing).",
          "⌃⌘C / ⌃⌘W / ⌃⌘F — Compact / Windowed / Toggle Full Screen.",
          "Esc — stop playback (position is saved).",
          "⌥⌘M — make a thumbnail from the current frame.",
          "⌘↩ — play in the external player.",
        ],
      },
      {
        title: "Files and metadata",
        steps: [
          "⇧⌘O — Add Folder…",
          "⌥⌘F — Show in Finder.",
          "⌥⌘E / ⌥⌘I — Export / Import Metadata.",
          "⌥⌘R — Remove from Library (file stays on disk).",
          "⌘⌫ — Delete… (file moves to Trash).",
          "⌘, — Settings…",
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    blurb: "Every tab in Skagway → Settings…",
    summary:
      "Open Settings with ⌘, (a library must be open for library-specific tabs). Six tabs: Library, Video, Data Sources, Extensions, Tools, and Custom Metadata.",
    screenshot: "settings.png",
    screenshotAlt: "Skagway Settings window on the Library tab",
    screenshotHint:
      "Settings window on the Library tab: Smart Libraries toggles, Change Library Location… / Change Thumbnail Cache Location…, and List view columns.",
    sections: [
      {
        title: "Library",
        steps: [
          "Exclude corrupt files from filters — they stay in the Corrupt smart library and in search.",
          "Confirm deletions — ask before moving files to the Trash.",
          "Change Library Location… / Change Thumbnail Cache Location… — move this library’s catalog or its per-library thumbnail cache.",
          "Automatically check for updates — off by default; checks do not send usage analytics.",
          "Smart Libraries — choose which smart libraries appear, and tune Recently Added / Recently Played day windows and the Top Rated star threshold.",
          "List view columns — pick the columns List view shows (Title is always on).",
        ],
      },
      {
        title: "Video",
        steps: [
          "Default Filmstrip Size — rows and columns for filmstrip previews, with a Regenerate filmstrips button.",
          "Surprise Me! auto-plays selected video — jump and play, or just jump.",
          "Loop Play All — during Play All, finishing the last video starts the first again.",
          "Hover preview on Grid cards — the silent moving preview on hover.",
          "Tag blind default state / Filter drawer height — how the Inspector tags list and Quick Filter drawer remember size.",
          "Player opens at — Compact, Full screen, or Last used size.",
          "Fade resume banner after delay — whether and when the “Resumed at…” banner fades out.",
        ],
      },
      {
        title: "Data Sources",
        steps: [
          "The folders Skagway scans — Add Folder…, Show in Finder, Exclude… a nested subfolder, or Remove.",
          "Adding a folder only registers it; run File → Scan for New Videos to index it.",
          "Remove does not drop already-indexed videos. Exclude… skips a nested subfolder on future scans — not the source folder itself.",
        ],
      },
      {
        title: "Extensions",
        steps: [
          "Check or uncheck which file extensions count as video during scans.",
          "Add unusual extensions with the Add extension field.",
          "Reset to defaults restores the standard list.",
        ],
      },
      {
        title: "Tools",
        steps: [
          "FFmpeg — required only for Fix for Built-in Player… (re-encode to MP4). Skagway auto-detects Homebrew and /usr/local installs.",
          "Installed somewhere unusual? Use Choose… to point at the ffmpeg binary directly.",
        ],
      },
      {
        title: "Custom Metadata",
        steps: [
          "Define your own fields for this library: a name plus a type (String, Text, Number, Date, Date & Time, or Boolean).",
          "Edit values in the Inspector. Fields also appear in search, sort, List columns, filters, and export.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    blurb: "Your library stays on your Mac.",
    summary:
      "Skagway does not send usage analytics or library data anywhere. There is no account and no cloud sync. Optional update checks are off by default and only ask whether a newer build exists.",
    sections: [
      {
        title: "Where your data lives",
        steps: [
          "The library catalog: the .machii file you created (by default in ~/Library/Application Support/Skagway/).",
          "Thumbnails and filmstrips: each library’s own cache (system Caches, a Skagway-cache folder next to the library, or a folder you chose).",
          "Settings: standard macOS preferences on this Mac.",
          "Your video files: exactly where you put them. Skagway never relocates or uploads them.",
        ],
      },
      {
        title: "Network and updates",
        steps: [
          "No telemetry, no analytics, and no automatic upload of library paths, play history, or browsing behavior.",
          "Check for Updates… and automatic update checks only ask whether a newer build exists — and only when you ask, or when you turn them on.",
          "Help → Skagway Help opens this manual. Contact Support… opens email to support@machiilabs.com.",
        ],
      },
      {
        title: "Getting help",
        steps: [
          "Email support@machiilabs.com — a human reads it.",
          "Nothing about your library is ever sent automatically. If a bug report would help, you write it and you send it.",
        ],
      },
    ],
  },
];

export function getManualPage(slug: string): ManualPage | undefined {
  if (slug === MANUAL_HOME.slug) return MANUAL_HOME;
  return MANUAL_PAGES.find((page) => page.slug === slug);
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

/** Ordered list of every manual page, home first. */
export function getManualNavPages(): ManualPage[] {
  return [MANUAL_HOME, ...MANUAL_PAGES];
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
