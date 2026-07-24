export type ManualPage = {
  slug: string;
  title: string;
  blurb: string;
  summary: string;
  /** Expected file under public/skagway/manual/ — omit for pages that don't need one */
  screenshot?: string;
  screenshotAlt?: string;
  screenshotHint?: string;
  sections: {
    title: string;
    steps: string[];
    note?: string;
    noteHref?: string;
    noteLinkLabel?: string;
    /** Optional small icon shown with the note (file under public/skagway/manual/) */
    noteIcon?: string;
    noteIconAlt?: string;
  }[];
};

/** Home page of the manual — the screen everyone sees before a library is open. */
export const MANUAL_HOME: ManualPage = {
  slug: "first-launch",
  title: "First launch",
  blurb: "Create or open a library to get started.",
  summary:
    "When Skagway opens with no library loaded, this screen asks you to create or open a library before you can browse videos.",
  screenshot: "first-launch.png",
  screenshotAlt:
    "Skagway first-launch screen with Create library in default location, Create library…, and Open library…",
  screenshotHint:
    "Full Skagway window with no library open. The three buttons under “Create or open a library to get started” should be readable.",
  sections: [
    {
      title: "What this screen means",
      steps: [
        "Skagway is running, but no library file (.machii) is open yet.",
        "A library is Skagway’s catalog — thumbnails, ratings, tags, and collections. Your video files themselves are never moved into it.",
        "Pick one of the three buttons, or choose a library under Open recent if you have used one before.",
      ],
    },
    {
      title: "Create library in default location",
      steps: [
        "This is the recommended choice for most people.",
        "Click the blue Create library in default location button.",
        "Skagway creates the library at the standard location and opens it.",
      ],
      note: "Default path: ~/Library/Application Support/Skagway/Skagway.machii",
    },
    {
      title: "Create library…",
      steps: [
        "Use this when you want the .machii file somewhere else — an external drive, a synced folder, or a project directory.",
        "Click Create library…",
        "Choose a folder and filename in the save dialog, then confirm.",
      ],
    },
    {
      title: "Open library…",
      steps: [
        "Use this if you already have a Skagway library file.",
        "Click Open library… and select the .machii file.",
        "Recently used libraries also appear directly on this screen — click one to reopen it.",
      ],
    },
    {
      title: "After the library opens",
      steps: [
        "Add the folders that contain your videos: File → Add Folder… (⇧⌘O).",
        "Skagway scans those folders and builds thumbnails in the background.",
        "On later launches Skagway reopens your last library automatically — you only see this screen again if you close the library.",
      ],
      note: "Skagway restarts itself briefly whenever you create, open, or switch libraries. That is normal.",
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
      "Open Skagway’s File menu and capture the full dropdown with every command and keyboard shortcut readable. Keep enough of the app window visible for context.",
    sections: [
      {
        title: "Add your video folders",
        steps: [
          "Choose File → Add Folder… (⇧⌘O).",
          "Select one or more folders that contain videos and click Scan.",
          "Skagway indexes every recognized video inside (subfolders included) and generates thumbnails in the background.",
          "You can also drag video files or folders straight onto the Skagway window — their folders are registered automatically.",
        ],
        note: "Added folders are listed under Settings → Data Sources. Your files stay exactly where they are on disk.",
      },
      {
        title: "Keep the library current",
        steps: [
          "Scan for New Videos — checks every watched folder for files added since the last scan. The header shows progress, then “Found N new files” or “No new files found”.",
          "Scan for Subtitles — re-checks the videos currently shown for matching .srt subtitle files and updates their subtitle badge.",
        ],
        note: "Scan for New Videos is also available as a button on the toolbar.",
        noteIcon: "scan-for-new-videos-icon.png",
        noteIconAlt: "Scan for New Videos toolbar button",
      },
      {
        title: "Create, open, and switch libraries",
        steps: [
          "Open Default Library — return to the library at the standard location.",
          "New Library… — create a separate .machii catalog at a location you choose.",
          "Open Library… — open any existing .machii file.",
          "Open Recent — the last ten libraries you used, with Clear Menu at the bottom.",
          "Close Library… — close the catalog and return to the first-launch screen.",
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
          "Add or disable extensions under Settings → File Ext.",
        ],
      },
    ],
  },
  {
    slug: "browse",
    title: "Browse",
    blurb: "Grid and List views, sorting, search, and fast navigation.",
    summary:
      "Browse the library as a thumbnail Grid or a column-based List, sort by any field, and search filenames — built to stay fast at thousands of videos.",
    screenshot: "browse.png",
    screenshotAlt:
      "Skagway grid view with the toolbar: view switcher, sort menu, and search field",
    screenshotHint:
      "Main window in Grid view with a populated library. The toolbar should show the Grid/List switcher, Sort menu, search field, and video count.",
    sections: [
      {
        title: "Grid and List",
        steps: [
          "Switch views with the Grid / List control in the toolbar, or press ⌘1 for Grid and ⌘2 for List.",
          "Grid cards show the thumbnail, filename, duration, date added, and rating stars. A captions badge appears when subtitles are available, and a thin progress bar marks partially watched videos.",
          "Hold the pointer over a grid card for a moment and Live Preview plays a short, silent tour through the video — see the Playback page for details.",
          "Double-click a grid card to play it inside Skagway. Double-click a List row to open it in your external player.",
        ],
      },
      {
        title: "List columns",
        steps: [
          "The Name column is always visible. Optional columns: Duration, Resolution, Size, Rating, Date Added, Plays, Created, and Last Played.",
          "Choose which columns appear under Settings → Library → List view columns, or right-click a column header.",
          "The Rating column is editable — click the stars directly in the row.",
          "Custom metadata fields you define also become available as columns.",
        ],
      },
      {
        title: "Sort and shuffle",
        steps: [
          "Open the Sort menu to order by Name, Date Added, Duration, File Size, Rating, Resolution, or Plays — plus any custom fields you’ve defined.",
          "Click the arrow beside the Sort menu to flip between ascending and descending.",
          "Shuffle (⇧⌘R) puts the whole view in a random order; picking any sort exits it. Click Shuffle again to reshuffle.",
          "Surprise Me! (⇧⌘S) jumps to one random video — and can auto-play it (Settings → Video).",
        ],
      },
      {
        title: "Search",
        steps: [
          "Press ⌘F or click the search field, then type part of a filename.",
          "Multiple words narrow the results — every word must appear in the filename.",
          "Click the × in the field (or clear it) to show the full library again.",
        ],
        note: "Search matches filenames only. To find videos by tag, rating, or other properties, use the filters.",
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
      "Open the Quick Filter drawer (⇧⌘F) over a populated library so the Smart Libraries, Collections, Rating, Duration, Quality, and Tags cards are visible.",
    sections: [
      {
        title: "Quick Filter (⇧⌘F)",
        steps: [
          "Click the filter button in the toolbar or press ⇧⌘F to open the Quick Filter drawer above the grid.",
          "Combine anything: a Smart Library or Collection, an exact star rating, a duration range (with presets like < 1 min or > 30 min), quality buckets (SD through 8K+), and tags.",
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
          "Recently Converted and Last Metadata Import appear after you use re-encoding or metadata import.",
        ],
        note: "Choose which Smart Libraries are listed under Settings → Library → Sidebar Filters.",
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
    blurb: "Saved smart views and hand-picked sets.",
    summary:
      "Collections are saved rule sets that update themselves as the library changes. Albums are hand-picked lists you control video by video. Both live in the Quick Filter drawer.",
    screenshot: "collections.png",
    screenshotAlt:
      "Skagway collection editor with match groups and rules",
    screenshotHint:
      "The New Collection editor sheet, showing the Match ALL/ANY controls and at least two rules — or the Collections card in the Quick Filter drawer with a few collections and albums listed.",
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
        title: "Albums — hand-picked sets",
        steps: [
          "Select some videos, right-click, and choose New Album from Selection… (or click New Album in the drawer for an empty one).",
          "Add more videos anytime with right-click → Add to Album.",
          "While viewing an album, right-click a video and choose Remove from “album name” to take it out.",
          "Rename or delete an album by right-clicking it in the Collections card.",
        ],
        note: "Albums use a stacked-rectangles icon; smart collections use a folder icon. Removing a video from an album never touches the file.",
      },
    ],
  },
  {
    slug: "organize",
    title: "Organize",
    blurb: "Ratings, tags, and custom metadata in the Inspector.",
    summary:
      "Select a video and the Inspector on the right shows its preview, facts, and editable metadata: rating stars, tags, and any custom fields you define.",
    screenshot: "organize.png",
    screenshotAlt:
      "Skagway Inspector with rating stars, assigned tags, the Add tags list, and custom fields",
    screenshotHint:
      "A selected video with the Inspector visible: filled rating stars, at least one assigned tag, the “Add tags” area expanded, and a custom field if defined.",
    sections: [
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
          "Define your own fields under Settings → Custom Metadata — for example “Featuring”, “Project”, or “Shoot Date”.",
          "Field types: String, Text, Number, Date, and Date & Time.",
          "Edit values in the Inspector’s CUSTOM section for any selection.",
          "Custom fields show up everywhere: the Sort menu, List view columns, Advanced Filter rules, collection rules, and metadata export.",
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
      "Skagway plays videos in a single floating player with custom transport controls — compact, windowed, or full screen — plus video bookmarks, saved resume positions, and automatic sidecar subtitles.",
    screenshot: "playback.png",
    screenshotAlt:
      "Skagway floating player with custom transport controls and bookmark ticks on the timeline",
    screenshotHint:
      "Floating player (windowed) over the grid with the custom transport bar fully visible (scrubber, ±15s, play/pause, speed, volume) and at least two diamond bookmark ticks on the timeline.",
    sections: [
      {
        title: "Start and stop",
        steps: [
          "Select a video and press Space, double-click its grid card, or click Play in the Inspector.",
          "Space toggles play/pause while the player is open.",
          "Press ⌥Space to play from the very beginning, ignoring any saved position.",
          "Press Esc (or the × button) to stop — Skagway saves where you left off.",
        ],
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
          "Full screen (⌃⌘F) — edge to edge, without restarting playback. Esc returns to the library.",
          "Choose which size the player opens at under Settings → Video → Player opens at.",
        ],
      },
      {
        title: "Resume where you left off",
        steps: [
          "Reopening a partially watched video resumes automatically; a banner shows “Resumed at …” with a Start at beginning button.",
          "Grid cards show a thin progress bar for partially watched videos.",
          "Resume is separate from bookmarks — resume is “where I stopped,” bookmarks are moments you chose to keep.",
          "The banner can fade out on its own — see Settings → Video → Playback.",
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
          "Put an .srt file next to the video with the same name (movie.mp4 → movie.srt; movie.en.srt also works) and Skagway shows it during playback automatically.",
          "Videos with subtitles get a captions badge in the grid and a Subtitle: Yes row in the Inspector.",
          "Added subtitle files later? Run File → Scan for Subtitles to refresh the badges.",
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
        ],
      },
    ],
  },
  {
    slug: "file-operations",
    title: "File operations",
    blurb: "Rename, move, re-encode, delete — with safety nets.",
    summary:
      "Right-click any video (or selection) for file operations. Destructive actions confirm first, and long operations run in managed queues that survive restarts.",
    screenshot: "file-operations.png",
    screenshotAlt: "Skagway grid context menu with file operations",
    screenshotHint:
      "Right-click a grid card so the full context menu is visible: Play in External Player, Show in Finder, Rename, Open With, Re-encode to MP4…, Move Files…, and the album and delete items.",
    sections: [
      {
        title: "Everyday actions",
        steps: [
          "Show in Finder (⌥⌘F) — reveal the file on disk.",
          "Rename — press Return on a selected video or use the context menu; the file on disk is renamed too.",
          "Open With — open the file in any capable installed app.",
        ],
      },
      {
        title: "Move files",
        steps: [
          "Right-click → Move Files… and choose a destination folder.",
          "Moves on the same drive are instant. Moves to another drive copy first, verify the copy, and only then remove the original — a crash can never lose the file.",
          "Cross-drive moves run in a queue; a status pill appears in the header. Click it to reorder, abort, or retry moves.",
        ],
      },
      {
        title: "Re-encode to MP4",
        steps: [
          "Right-click → Re-encode to MP4… converts a video to a widely compatible MP4 (H.264/AAC). This requires ffmpeg — set it up once under Settings → Tools.",
          "The original file is kept as a _backup file until you decide to delete it, so nothing is lost if an encode fails or you change your mind.",
          "Conversions run one at a time in the Re-encode Queue — click the header pill to abort, reorder, retry, restore a backup, or clean up backups. The queue survives quitting the app.",
          "Finished conversions appear in the Recently Converted smart library.",
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
          "Modify Filmstrip… — change the rows and columns of a video’s filmstrip preview.",
          "For frame-perfect thumbnails, use ⌥⌘M during playback instead.",
        ],
      },
    ],
  },
  {
    slug: "export-import",
    title: "Export / Import",
    blurb: "Metadata as CSV or JSON Lines, plus library copies.",
    summary:
      "Your ratings, tags, and custom fields are yours to take: export them to CSV or JSON Lines, import them into another library, and copy the whole catalog file for backup.",
    screenshot: "export-import.png",
    screenshotAlt:
      "Skagway Export Metadata sheet with format selector and field list",
    screenshotHint:
      "The Export Metadata… sheet, showing the CSV / JSON Lines format choice and the reorderable field checklist.",
    sections: [
      {
        title: "Export Metadata… (⌥⌘E)",
        steps: [
          "File → Export Metadata… exports every video currently shown — filters and search included. Right-click → Export Metadata… exports just the selection.",
          "Pick CSV (for spreadsheets) or JSON Lines (for scripts and tools).",
          "Check exactly the fields you want and drag to reorder them. Defaults cover Path, Name, File Size, Duration, Width, Height, Quality, Date Imported, Rating, Tags, Plays, and your custom fields; two dozen more are available.",
          "Your format and field choices are remembered for next time.",
        ],
      },
      {
        title: "Import Metadata… (⌥⌘I)",
        steps: [
          "File → Import Metadata… opens a previously exported CSV or JSON Lines file — the format is detected automatically.",
          "Rows are matched to videos by file path first, then by content fingerprint — so a file that moved can still be matched.",
          "Ratings and custom fields are updated when they differ; tags are merged in (importing never removes a tag).",
          "Fields in the file that don’t exist in the library yet are created automatically as Custom Metadata fields — import into the same library, a different one, or a fresh library on another Mac.",
          "A summary shows how many rows matched, updated, and missed — with Review unmatched… to inspect the leftovers.",
          "Everything the import touched is collected in the Last Metadata Import smart library so you can review the result.",
        ],
      },
      {
        title: "Save Copy… — back up the catalog",
        steps: [
          "File → Save Copy… writes a timestamped duplicate of the library file (for example Skagway-20260716-224500.machii).",
          "The current library stays open; the copy is completely independent.",
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
          "Return — rename the selected video. Esc — cancel editing (or stop playback).",
          "⌥⌘T — toggle the Inspector between Still and Filmstrip.",
        ],
      },
      {
        title: "Search and filters",
        steps: [
          "⌘F — focus the search field.",
          "⇧⌘F — open / close Quick Filter.",
          "⇧⌘V — open / close Advanced Filter.",
          "⌥⌘C — clear filters.",
          "⇧⌘S — Surprise Me! (jump to a random video).",
          "⇧⌘R — Shuffle the view order.",
        ],
      },
      {
        title: "Playback",
        steps: [
          "Space — play / pause the selected video.",
          "⌥Space — play from the beginning (ignore the resume position).",
          "⌥← / ⌥→ — skip back / forward 15 seconds.",
          "⌥⌘B — bookmark the current position (while playing).",
          "⌃⌘C / ⌃⌘W / ⌃⌘F — Compact / Windowed / Full screen player.",
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
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    blurb: "Every tab in Skagway → Settings…",
    summary:
      "Open Settings with ⌘, (a library must be open for library-specific tabs). Six tabs: Library, Video, Data Sources, File Ext, Tools, and Custom Metadata.",
    screenshot: "settings.png",
    screenshotAlt: "Skagway Settings window on the Library tab",
    screenshotHint:
      "The Settings window on the Library tab, tall enough to show the Sidebar Filters section and the List view columns list.",
    sections: [
      {
        title: "Library",
        steps: [
          "Exclude corrupt files from filters — hides unreadable files from normal browsing; they stay visible in the Corrupt smart library and in name search.",
          "Confirm deletions — ask before moving files to the Trash.",
          "Sidebar Filters — choose which Smart Libraries appear, and tune Recently Added / Recently Played day windows and the Top Rated star threshold.",
          "List view columns — pick the columns List view shows.",
        ],
      },
      {
        title: "Video",
        steps: [
          "Default Filmstrip Size — rows and columns for filmstrip previews, with a Regenerate filmstrips button.",
          "Surprise Me! auto-plays selected video — jump and play, or just jump.",
          "Hover preview on Grid cards — the silent moving preview on hover.",
          "Player opens at — Compact, Full screen, or Last used size.",
          "Resume banner fade — whether and when the “Resumed at…” banner fades out.",
        ],
      },
      {
        title: "Data Sources",
        steps: [
          "The folders Skagway scans, in one list — add, remove, or reveal them in Finder.",
          "Adding a folder here just registers it; run File → Scan for New Videos to index its contents.",
          "Removing a folder doesn’t remove already-indexed videos from the library.",
        ],
      },
      {
        title: "File Ext",
        steps: [
          "Check or uncheck which file extensions count as video during scans.",
          "Add unusual extensions with the Add extension field.",
          "Reset to defaults restores the standard list.",
        ],
      },
      {
        title: "Tools",
        steps: [
          "FFmpeg — required only for Re-encode to MP4. Skagway auto-detects Homebrew and /usr/local installs.",
          "Installed somewhere unusual? Use Choose… to point at the ffmpeg binary directly.",
        ],
      },
      {
        title: "Custom Metadata",
        steps: [
          "Define your own fields: a name plus a type (String, Text, Number, Date, or Date & Time).",
          "Values are edited per video in the Inspector, and fields flow through to sorting, List columns, filters, collections, and export.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    blurb: "Everything stays on your Mac.",
    summary:
      "Skagway makes no network connections. There is no telemetry, no analytics, and no account — your library, your play history, and your browsing behavior never leave your Mac.",
    sections: [
      {
        title: "Where your data lives",
        steps: [
          "The library catalog: the .machii file you created (by default in ~/Library/Application Support/Skagway/).",
          "Thumbnails and filmstrips: a local cache in ~/Library/Caches/Skagway/.",
          "Settings: standard macOS preferences on your Mac.",
          "Your video files: exactly where you put them. Skagway never relocates, re-wraps, or uploads them.",
        ],
      },
      {
        title: "Getting help",
        steps: [
          "Email support@machiilabs.com — a human reads it.",
          "Nothing is ever sent automatically. If a bug report would help, you write it and you send it.",
        ],
      },
    ],
  },
];

export function getManualPage(slug: string): ManualPage | undefined {
  return MANUAL_PAGES.find((page) => page.slug === slug);
}

export function getManualNeighbors(slug: string): {
  prev?: ManualPage;
  next?: ManualPage;
} {
  const index = MANUAL_PAGES.findIndex((page) => page.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? MANUAL_PAGES[index - 1] : undefined,
    next: index < MANUAL_PAGES.length - 1 ? MANUAL_PAGES[index + 1] : undefined,
  };
}
