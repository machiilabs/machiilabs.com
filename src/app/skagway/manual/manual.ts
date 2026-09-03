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
  sections: ManualSection[];
};

/** Home page of the manual — library home setup, then empty-library add-videos. */
export const MANUAL_HOME: ManualPage = {
  slug: "first-launch",
  title: "First launch",
  blurb: "Choose where Skagway stores its data, then add your first videos.",
  summary:
    "The first time you run Skagway, you choose where the catalog and each library’s thumbnail cache live — including options that keep locations off your boot disk. In most cases Skagway then opens an empty home library so you can start adding videos right away.",
  screenshot: "first-launch.png",
  screenshotAlt:
    "Skagway “Choose where Skagway stores its data” setup screen with privacy bullets and Use standard location / Choose Folder… buttons",
  screenshotHint:
    "Library home setup step 1: title “Choose where Skagway stores its data”, the privacy bullets (Nothing leaves your Mac, You control the catalog and cache, Media on an encrypted volume, Use defaults on this Mac), and both buttons — Use standard location on this Mac and Choose Folder… — fully readable. Bonus: cache placement step (“Where should this library’s cache live?”) or the empty-library “Drag videos here” invite.",
  sections: [
    {
      title: "What Skagway stores",
      steps: [
        "A library is Skagway’s catalog — titles, thumbnails, ratings, tags, bookmarks, and collections. Your video files themselves are never moved into it.",
        "Skagway is not a vault: it does not modify or protect your source media. Place sensitive media on an encrypted volume if you need that protection at the disk level.",
        "Each library keeps its own thumbnail cache location (stored in the library file). Opening one library never depends on another volume’s cache.",
      ],
    },
    {
      title: "Choose where Skagway stores its data",
      steps: [
        "Use standard location on this Mac — recommended when you are not putting the catalog on an encrypted volume. The library goes under Application Support; the cache under ~/Library/Caches/Skagway/.",
        "Choose Folder… — pick a folder yourself (for example on an encrypted or external volume).",
        {
          text: "If you chose a custom folder, Skagway asks Where should this library’s cache live?",
          substeps: [
            "Co-locate with library — creates a Skagway-cache folder next to the library (recommended when the library sits with your media).",
            "System default — this library’s cache under ~/Library/Caches/Skagway.",
            "Choose Folder… — pick any folder for this library’s thumbnails.",
          ],
        },
        {
          text: "Then Skagway asks How should Skagway find this library?",
          substeps: [
            "Remember this location — keeps a bookmark so Skagway can reopen it (no plain path stored in preferences).",
            "Ask every time I open Skagway — nothing is remembered on the boot disk; you open the library file each launch.",
          ],
        },
      ],
      note: "Nothing leaves your Mac by default — no account, no cloud sync, no usage analytics. Optional update checks stay off unless you turn them on later; they only ask whether a newer Skagway build exists.",
    },
    {
      title: "Your library opens",
      steps: [
        "After setup, Skagway relaunches briefly — that is normal.",
        "With Use standard location or Remember this location, Skagway opens your home library automatically, creating an empty .machii catalog if one doesn’t exist yet.",
        "If you chose Ask every time I open Skagway, you’ll see a simple screen with no library open. Use File → Open Library…, New Library…, or Open Recent — the location is not remembered on this Mac.",
        "Create Home Library / Open Home Library, New Library…, Open Library…, and Open Recent also stay available in the File menu whenever you need them.",
      ],
    },
    {
      title: "Add your first videos",
      steps: [
        "An empty library shows Drag videos here — drop video files or folders onto that area to import them (it becomes Drop to add to your library while you drag).",
        "Or click Add Files… and select video files or folders, then Add.",
        "You can also choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.",
        "Skagway indexes recognized videos and builds thumbnails in the background.",
      ],
      note: "Folders you add — or the parent folders of files you add — are saved as Data Sources in Settings so Skagway can scan and watch them later. File → Change Library Location… and File → Change Thumbnail Cache Location… let you move those later.",
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
      "Open Skagway’s File menu so Bulk Rename…, Change Library Location…, Change Thumbnail Cache Location…, Add Folder…, Scan commands, and library create/open items are readable. Keep enough of the app window visible for context.",
    screenshotScale: 0.75,
    sections: [
      {
        title: "Add your video folders",
        steps: [
          "In an empty library, drag video files or folders onto Drag videos here, or click Add Files… to pick them in a dialog.",
          "Or choose File → Add Folder… (⇧⌘O), select one or more folders, and click Scan.",
          "Skagway indexes every recognized video inside (subfolders included) and generates thumbnails in the background.",
          "Folders you add — or the parent folders of files you add — are registered as Data Sources automatically.",
        ],
        note: "Added folders are listed under Settings → Data Sources. You can Exclude… nested subfolders from scanning there. Your files stay exactly where they are on disk.",
      },
      {
        title: "Keep the library current",
        steps: [
          "Scan for New Videos — checks every watched folder for files added since the last scan. The header shows progress, then “Found N new files” or “No new files found”. Videos from that scan appear in the Last Added smart library.",
          "Scan for Subtitles — re-checks the videos currently shown for matching .srt subtitle files and updates their subtitle badges.",
        ],
        note: "Scan for New Videos is also available as a button on the toolbar.",
        noteIcon: "scan-for-new-videos-icon.png",
        noteIconAlt: "Scan for New Videos toolbar button",
      },
      {
        title: "Create, open, and switch libraries",
        steps: [
          "Open Home Library / Create Home Library — open or create the library at your chosen home location (wording depends on whether the file exists).",
          "New Library… — create a separate .machii catalog at a location you choose.",
          "Open Library… — open any existing .machii file.",
          "Open Recent — recently used libraries, with Clear Menu at the bottom.",
          "Change Library Location… — run the first-launch location setup again for the catalog.",
          "Change Thumbnail Cache Location… — move this library’s thumbnail cache (each library stores its own cache path).",
          "Close Library… — close the catalog. With a remembered home location Skagway can reopen it from File → Open Home Library; with Ask every time, open a library again from the File menu.",
        ],
        note: "Opening an existing library or creating a new one does not delete the library you were working with. It’s still on disk, ready to open again. Skagway restarts briefly when switching.",
      },
      {
        title: "Copy or delete the library file",
        steps: [
          "Save Copy… — writes a timestamped duplicate (Skagway-20260716-224500.machii, for example) wherever you choose. The original stays open; open the copy later with Open Library….",
          "Delete This Library… — permanently deletes the .machii catalog file after a confirmation. Your video files are not touched.",
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
      "Main window in Grid view with a populated library. The toolbar should show the Grid/List switcher, Sort menu, Play All / Loop Play All, the Search videos field, and the video count.",
    sections: [
      {
        title: "Grid and List",
        steps: [
          "Switch views with the Grid / List control in the toolbar, or press ⌘1 for Grid and ⌘2 for List.",
          "Grid cards show the thumbnail, Title, duration, date added, and rating stars. A captions badge appears when subtitles are available, and a thin progress bar marks partially watched videos.",
          "Hold the pointer over a grid card for a moment and Live Preview plays a short, silent tour through the video — see the Playback page for details.",
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
          "While viewing an album, Album Order appears at the top of the Sort menu so you can play and browse in the playlist order you arranged.",
          "Click the arrow beside the Sort menu to flip between ascending and descending.",
          "Shuffle (⇧⌘R) puts the whole view in a random order; picking any sort exits it. Click Shuffle again to reshuffle.",
          "Surprise Me! (⇧⌘S) jumps to one random video — and can auto-play it (Settings → Video).",
        ],
      },
      {
        title: "Play All",
        steps: [
          "Click Play All in the toolbar (or press ⇧⌘P) to play the current filtered view from the first playable video.",
          "Missing files are skipped. Auto-advance and Loop run only during this Play All session.",
          "Loop Play All (toolbar toggle, View menu, or Settings → Video) is off by default. When it is on, finishing the last playable video starts the first one again.",
          "Stopping playback or playing a single video (Space on one card) ends the session. Loop then has no effect until you Play All again.",
        ],
      },
      {
        title: "Search",
        steps: [
          "Press ⌘F or click the Search videos field, then type part of what you’re looking for.",
          "Search matches Title, File Name, Original File Name, Tags, and custom metadata values — case-insensitive, contains-style.",
          "Multiple words narrow the results (AND): every word must appear somewhere, but each word may hit a different field (for example one word in a tag and another in the title).",
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
      "Open the Quick Filter drawer (⇧⌘F) so Smart Libraries, Collections, Rating (No Stars / stars / Or Higher), Duration, Quality, and Tags are visible.",
    sections: [
      {
        title: "Quick Filter (⇧⌘F)",
        steps: [
          "Click the filter button in the toolbar or press ⇧⌘F to open the Quick Filter drawer above the grid.",
          "Combine anything: a Smart Library, Collection, or Album; a rating; a duration range (presets like < 1 min or > 30 min); quality buckets (SD through 8K+); and tags.",
          "Rating is one row: No Stars (unrated), then 1–5 stars, then Or Higher on the right. Click a star to match only that rating. Turn Or Higher on to match that rating and every higher one (4 → 4 and 5). Or Higher is off by default, session-only, and unavailable for No Stars and for 5 stars. The filter pill reads Rating 4, Rating 4+, or No stars.",
          "Tags can match Any (at least one) or All of the selected tags — use the toggle in the Tags card.",
          "Everything you pick applies together, and search still works on top.",
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
          "Last Added — videos found by the most recent Scan for New Videos (appears when that set is non-empty).",
          "Recently Converted and Last Metadata Import appear after you use re-encoding or metadata import.",
        ],
        note: "Choose which Smart Libraries appear under Settings → Library → Smart Libraries.",
      },
      {
        title: "Advanced Filter (⇧⌘V)",
        steps: [
          "Press ⇧⌘V to switch the drawer to the Advanced Filter rule editor.",
          "Build rules on any attribute: Name, Extension, Path, Parent Folder, Volume, File Size, Duration, Width, Height, Quality, Video Codec, Date Imported, Date Created, Plays, Rating, Tag, and your custom fields.",
          "Operators include equals, contains, starts with, is greater than, is between, and more — the editor adapts to each attribute (star picker for Rating, date picker for dates, tag menu for Tag).",
          "Rules cluster into groups. Within a group, match ALL or ANY; groups combine with an outer ALL/ANY — e.g. (Tag is Vacation AND Rating ≥ 4) OR Tag is Favorite.",
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
      "Skagway collection editor with match groups and rules",
    screenshotHint:
      "The New Collection editor sheet with Match ALL/ANY and at least two rules — or the Collections card listing smart collections and albums. Bonus: an album open with Album Order selected and grip handles visible.",
    sections: [
      {
        title: "Create a smart collection",
        steps: [
          "Open the Quick Filter drawer (⇧⌘F) and click New Collection in the Collections card.",
          "Name it, then add rules — the same attributes and operators as Advanced Filter, with ALL/ANY groups.",
          "Click Create. The collection appears in the Collections card and stays up to date automatically: tag or rate a new video and it joins matching collections on its own.",
        ],
      },
      {
        title: "Collections and the Advanced Filter work together",
        steps: [
          "Built a live Advanced Filter you want to keep? Click Save as Collection… in the drawer header.",
          "Want to tweak an existing collection interactively? Right-click it and choose Edit as Advanced Filter… — its rules load into the drawer.",
          "Right-click also offers Edit Collection… and Delete Collection.",
        ],
      },
      {
        title: "Albums — hand-picked playlists",
        steps: [
          "Select some videos, right-click, and choose New Album from Selection… (or click New Album in the drawer for an empty one).",
          "Add more videos anytime with right-click → Add to Album. New videos append to the end of the album order.",
          "While viewing an album, choose Sort → Album Order, then drag cards (or list rows) to rearrange. Multi-select moves as a block.",
          "While viewing an album, right-click a video and choose Remove from “album name” to take it out.",
          "Rename or delete an album by right-clicking it in the Collections card (Rename Album… / Delete Album).",
        ],
        note: "Albums use a stacked-rectangles icon; smart collections use a folder icon. Removing a video from an album never touches the file. Play All respects Album Order when that sort is active.",
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
      "A selected video with the Inspector visible: display Title at the top (ideally different from the file name), Subtitles picker, filled rating stars, at least one assigned tag, and a custom field if defined.",
    sections: [
      {
        title: "Title (display name)",
        steps: [
          "Every video has a Title used for sorting, List view, and search. It can differ from the file name on disk.",
          "Press Return on a selected video (or right-click → Edit Title…) to edit it inline.",
          "Import Metadata can write Title; renaming the file with Rename File… or Bulk Rename… does not clear a custom Title.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "In the Inspector, set Subtitles to None, Burned-in, Sidecar, or Burned-in + Sidecar so the badge and filters match how the video is captioned.",
          "Sidecar .srt files next to the video are detected automatically — see the Playback page.",
        ],
      },
      {
        title: "Rate videos",
        steps: [
          "Select one or more videos and click a star in the RATING row — the rating applies to the whole selection.",
          "Click the same star again to clear the rating.",
          "Ratings drive the Top Rated smart library, the Rating sort, and rating rules in filters and collections.",
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
          "Define your own fields under Settings → Custom Metadata — for example “Featuring”, “Project”, or “Shoot Date”. Fields are stored in this library’s catalog.",
          "Field types: String, Text, Number, Date, Date & Time, and Boolean.",
          "Edit values in the Inspector’s CUSTOM section for any selection.",
          "Custom fields show up everywhere: search, the Sort menu, List view columns, Advanced Filter rules, collection rules, and metadata export.",
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
      "Floating player (windowed) over the grid with traffic lights, the custom transport bar (scrubber, ±15s, play/pause, speed, volume), and at least two diamond bookmark ticks on the timeline.",
    sections: [
      {
        title: "Start and stop",
        steps: [
          "Select a video and press Space, double-click its grid card, or click Play in the Inspector.",
          "Space toggles play/pause while the player is open.",
          "Press ⌥Space to play from the very beginning, ignoring any saved position.",
          "Press Esc (or the red traffic-light Stop) to stop — Skagway saves where you left off.",
        ],
        note: "If focus is in a text field (Search, a custom metadata field, and so on), press Esc once first so Space plays the video instead of typing a space in the field.",
      },
      {
        title: "Play All (⇧⌘P)",
        steps: [
          "View → Play All, the toolbar control, or ⇧⌘P starts the first playable video in whatever you are looking at now (filtered grid, collection, search, or album) and advances when each one finishes.",
          "Missing files are skipped. Auto-advance and Loop run only during that Play All session.",
          "Loop Play All is off by default (toolbar, View menu, Settings → Video). When it is on, the last playable video is followed by the first.",
          "Esc / Stop, or playing a single video with Space, ends the session. Loop then does nothing until you Play All again.",
        ],
        note: "On the Browse page this is covered with search and sort. Album Order is the playlist sequence Play All uses when you are in an album.",
        noteHref: "/skagway/manual/browse",
        noteLinkLabel: "Browse",
      },
      {
        title: "Transport controls",
        steps: [
          "The scrubber shows elapsed time, a progress track, and total duration. Hover along it for a live frame preview at that point; click to seek.",
          "Skip back / Skip forward 15 seconds (⌥← / ⌥→) from the transport bar or View menu.",
          "Playback speed cycles through rates from 0.5× to 2×.",
          "Mute and volume live on the same row — the volume slider collapses to mute-only when the player is narrow.",
        ],
      },
      {
        title: "Bookmarks",
        steps: [
          "While a video is playing, press ⌥⌘B (View → Bookmark Current Position), click the bookmark button in the Inspector’s BOOKMARKS header, or double-click the scrubber at the moment you want.",
          "Each bookmark stores the exact time, a name (defaults to the timecode — click to rename), and a still frame.",
          "Bookmarks appear as diamond ticks on the timeline and as a list under BOOKMARKS in the Inspector (stills, names, and times, ordered from start to finish).",
          "Click a tick, a still, or the play button on a bookmark row to jump there. If you jump while already watching, a return chip (↩) appears so you can get back to where you were — it lasts for that session only.",
          "Delete a bookmark with the trash button on its row — it is removed immediately, with no confirmation.",
        ],
        note: "Bookmarks live in the library file. Their still frames are cached on this Mac — after Save Copy or moving the library elsewhere, the bookmarks still jump correctly; stills regenerate as you revisit them.",
      },
      {
        title: "Play from the filmstrip",
        steps: [
          "Switch the Inspector preview to Filmstrip (the Still / Filmstrip toggle, or ⌥⌘T) to see a grid of frames sampled across the whole video.",
          "Click any frame — playback starts right at that point in the video.",
          "It’s the quickest way to jump to a scene you can already see, without scrubbing.",
        ],
        note: "Clicking the Still preview starts playback too, from the beginning or the saved resume position.",
      },
      {
        title: "Three sizes, one player",
        steps: [
          "Compact (⌃⌘C) — docks into the Inspector’s preview area and follows its size.",
          "Windowed (⌃⌘W) — a floating panel you can drag by its title bar and resize from the corner; size and position are remembered.",
          "Full screen (⌃⌘F) — edge to edge, without restarting playback. Esc stops playback; use the traffic lights or ⌃⌘F to leave full screen without stopping.",
          "The player’s traffic lights also switch sizes: red stops; yellow and green jump between Compact, Windowed, and Full screen.",
          "Choose which size the player opens at under Settings → Video → Player opens at.",
        ],
      },
      {
        title: "Resume where you left off",
        steps: [
          "Reopening a partially watched video resumes automatically; a banner shows “Resumed at …” with a Start at beginning button.",
          "Grid cards show a thin progress bar for partially watched videos.",
          "Resume is separate from bookmarks — resume is “where I stopped,” bookmarks are moments you chose to keep.",
          "The banner can fade out on its own — see Settings → Video → Fade resume banner after delay.",
        ],
      },
      {
        title: "Live Preview",
        steps: [
          "Rest the pointer on a grid card for a moment and the thumbnail comes alive: a silent preview that skips through the video, playing short clips from start to finish.",
          "No clicking, no scrubbing — it’s the fastest way to see what’s inside a video without opening it.",
          "Only one card previews at a time, and Live Preview pauses automatically while the floating player is open.",
          "Turn it off or on under Settings → Video → Hover preview on Grid cards.",
        ],
      },
      {
        title: "Subtitles",
        steps: [
          "Put an .srt file next to the video with the same name (movie.mp4 → movie.srt; movie.en.srt also works) and Skagway can show it during playback.",
          "In the Inspector, set Subtitles to None, Burned-in, Sidecar, or Burned-in + Sidecar so the grid badge and filters match reality.",
          "Added subtitle files later? Run File → Scan for Subtitles to refresh detection.",
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
      "Right-click any video (or selection) for file operations. Long jobs — cross-volume moves and re-encodes — show as header pills and a bottom activity strip, and open managed queues that survive restarts.",
    screenshot: "file-operations.png",
    screenshotAlt:
      "Skagway grid context menu with Bulk Rename…, Move Files…, and Fix for Built-in Player…",
    screenshotHint:
      "Right-click a grid card so the context menu shows Bulk Rename…, Move Files…, Fix for Built-in Player…, and Set Poster from Image… (plus everyday items). Bonus: header queue pills or the bottom activity strip visible while a move or re-encode is running.",
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
          "Watch the live Preview columns (Current File Name / New File Name / Status). Skipped rows show why (empty name, too long, illegal characters, collision).",
          "Click Rename N Files to apply. Skagway uses a two-phase rename so a cancel or crash can restore; a results sheet offers Retry Failed when needed.",
        ],
        note: "Original File Name is preserved in the catalog for search and export — bulk rename changes the file on disk, not that historical name.",
      },
      {
        title: "Move files",
        steps: [
          "Right-click → Move Files… and choose a destination folder (Move Here).",
          "Moves on the same volume are instant and do not appear in the Move Queue.",
          "Cross-volume moves copy first, verify, then remove the original — a crash cannot lose the only copy.",
          "While work is running, the bottom activity strip and a header folder pill show progress (Moving N%). Click either, or choose View → Move Queue…, to open the queue.",
          "In Move Queue you can Move to Top, Abort, Abort All, Retry failed jobs, Clear completed rows, or Dismiss a row.",
        ],
      },
      {
        title: "Fix for Built-in Player… (re-encode)",
        steps: [
          "Right-click → Fix for Built-in Player… converts a video to a widely compatible MP4 (H.264/AAC). This requires ffmpeg — set it up once under Settings → Tools.",
          "The original file is kept as a _backup until you delete it, so nothing is lost if an encode fails or you change your mind.",
          "Jobs run one at a time. The activity strip and a header re-encode pill show progress; click either, or View → Re-encode Queue…, to manage the queue.",
          "In Re-encode Queue: Move to Top, Abort, Retry, Restore from backup, Delete Backup, Delete All Backups, Clear finished rows, or Dismiss. Rows can stay visible after success while a backup remains.",
          "Finished conversions appear in the Recently Converted smart library.",
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
              hint: "Crop of the bottom activity strip while a move or re-encode is running — text + percent readable (for example Re-encode 42% or Moving 18% · +2).",
            },
          },
          {
            text: "Icon-only capsules also appear in the header (to the right of the video count) when that job isn’t already featured in the strip — folder for moves, circular arrows for re-encode; failures use a warning style.",
            screenshot: {
              filename: "queue-header-pills.png",
              alt: "Skagway header queue pills next to the video count",
              hint: "Crop of the header to the right of the video count showing the icon-only queue pills (folder for moves and/or circular arrows for re-encode). A warning-style failed pill is a plus.",
            },
          },
          "Successful moves clear themselves from the queue when done. Re-encode rows often remain so you can still Restore or Delete Backup.",
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
      "Your titles, ratings, tags, plays, resume positions, and custom fields are yours to take: export them to CSV or JSON Lines (with clear match / importable / export-only field groups), import them into another library, and copy the whole catalog file for backup.",
    screenshot: "export-import.png",
    screenshotAlt:
      "Skagway Export Metadata sheet with CSV / JSON Lines and the Match keys, Importable, and Export only field sections",
    screenshotHint:
      "The Export Metadata sheet showing format (CSV / JSON Lines), the three field sections (Match keys, Importable, Export only) with Title, Plays, Resume Position, and Original File Name visible, and Export… / Cancel.",
    sections: [
      {
        title: "Export Metadata… (⌥⌘E)",
        steps: [
          "File → Export Metadata… exports every video currently shown — filters and search included. Right-click → Export Metadata… exports just the selection.",
          "Pick CSV (for spreadsheets) or JSON Lines (for scripts and tools).",
          "Fields are grouped: Match keys (Path, Content Fingerprint — used to find videos on import), Importable (Title, Rating, Tags, Subtitles, Plays, Resume Position, and custom fields — written back by Import Metadata), and Export only (File Name, Original File Name, Last Played, size, duration, codec, and other read-only facts).",
          "Check the fields you want; checked fields stay at the top of each section. Drag to reorder within a section.",
          "Your format and field choices are remembered for next time.",
        ],
      },
      {
        title: "Import Metadata… (⌥⌘I)",
        steps: [
          "File → Import Metadata… opens a previously exported CSV or JSON Lines file — the format is detected automatically.",
          "Rows are matched by Path first, then by Content Fingerprint — not by Database ID — so a file that moved can still be matched.",
          "Importable values are applied when they differ: Title, Rating, Subtitles, Plays, Resume Position, custom fields; tags are merged in (importing never removes a tag).",
          "Unknown columns can be skipped or imported as new Custom Metadata fields (you’ll see Column, Sample, and Type) — use Skip all or Import selected.",
          "A summary shows Matched / Updated / Unmatched — with Review unmatched… for leftovers — then Done.",
          "Everything the import touched is collected in the Last Metadata Import smart library so you can review the result.",
        ],
      },
      {
        title: "Save Copy… — back up the catalog",
        steps: [
          "File → Save Copy… writes a timestamped duplicate of the library file (for example Skagway-20260716-224500.machii).",
          "The current library stays open; the copy is completely independent. Save Copy keeps the original thumbnail-cache pointer — it does not create a second cache.",
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
      "Skagway is built for keyboard-driven triage. One modifier scheme throughout: ⌥ marks an alternate action, ⇧ reveals or adds something, and ⌃ is reserved for player sizing.",
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
      "The Settings window on the Library tab, tall enough to show Smart Libraries toggles, Change Library Location… / Change Thumbnail Cache Location…, and List view columns.",
    sections: [
      {
        title: "Library",
        steps: [
          "Exclude corrupt files from filters — hides unreadable files from normal browsing; they stay visible in the Corrupt smart library and in search.",
          "Confirm deletions — ask before moving files to the Trash.",
          "Change Library Location… / Change Thumbnail Cache Location… — move this library’s catalog or its per-library thumbnail cache.",
          "Automatically check for updates — off by default; optional Sparkle checks do not send usage analytics.",
          "Smart Libraries — choose which smart libraries appear, and tune Recently Added / Recently Played day windows and the Top Rated star threshold.",
          "List view columns — pick the columns List view shows (Title is always on).",
        ],
      },
      {
        title: "Video",
        steps: [
          "Default Filmstrip Size — rows and columns for filmstrip previews, with a Regenerate filmstrips button.",
          "Surprise Me! auto-plays selected video — jump and play, or just jump.",
          "Loop Play All — while a Play All session is running, finishing the last video starts the first again. Off by default; no effect when you play a single video.",
          "Hover preview on Grid cards — the silent moving preview on hover.",
          "Tag blind default state / Filter drawer height — how the Inspector tags list and Quick Filter drawer remember size.",
          "Player opens at — Compact, Full screen, or Last used size.",
          "Fade resume banner after delay — whether and when the “Resumed at…” banner fades out.",
        ],
      },
      {
        title: "Data Sources",
        steps: [
          "The folders Skagway scans, in one list — Add Folder…, Show in Finder, Exclude… a nested subfolder from scanning, or Remove.",
          "Adding a folder here just registers it; run File → Scan for New Videos to index its contents.",
          "Removing a folder doesn’t remove already-indexed videos from the library. Exclude… skips a nested subfolder on future scans (Add Folder, Scan for New Videos, and drops). You cannot exclude the source folder itself. Videos already in the library stay listed.",
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
          "Values are edited per video in the Inspector, and fields flow through to search, sorting, List columns, filters, collections, and export.",
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
          "Settings: standard macOS preferences on your Mac — library location bookmarks, not plain paths, when you use Remember this location.",
          "Your video files: exactly where you put them. Skagway never relocates, re-wraps, or uploads them.",
        ],
      },
      {
        title: "Network and updates",
        steps: [
          "No telemetry, no analytics, and no automatic upload of library paths, play history, or browsing behavior.",
          "Skagway → Check for Updates… and Settings → Automatically check for updates use Sparkle against downloads.machiilabs.com — only when you ask, or when you turn automatic checks on.",
          "Help → Skagway Help opens this manual in your browser. Contact Support… opens your email client to support@machiilabs.com.",
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
