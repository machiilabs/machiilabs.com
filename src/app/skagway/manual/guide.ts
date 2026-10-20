import type { ManualPage } from "./manual";

/**
 * How do I…? — situations, then the few controls that finish them.
 * The reference pages still hold every command.
 */
export const GUIDE_PAGES: ManualPage[] = [
  {
    slug: "how-do-i",
    title: "Overview",
    part: "tasks",
    blurb: "Common jobs, starting from the situation you are actually in.",
    summary:
      "Before you dive into the Reference, these pages highlight some of the more interesting and powerful things you can do with Skagway. They should give you a good idea of where to go from here.",
    sections: [],
  },
  {
    slug: "find-a-clip",
    question: "…find a clip I only remember by sight?",
    taskGroup: "Find and organize",
    title: "Find a clip",
    part: "tasks",
    blurb: "You remember the picture, not the filename.",
    summary:
      "A filename like CAM_4401.mov does not tell you which take has the shot. Skagway can show several frames of each video at once, and it can jump through a long list by the way you sorted it.",
    screenshot: "storyboard.png",
    screenshotCaption: "The Storyboard layout: six frames from each clip",
    screenshotAlt: "Skagway Storyboard layout with six-frame collages",
    screenshotHint:
      "Storyboard layout (⌘3) of a populated library. Several six-frame collages visible. One collage focused. Playback not started.",
    sections: [
      {
        title: "Look at frames, then search",
        intro:
          "Start with the picture when the name is useless. Search is for when you do remember a word: a title, a tag, or part of the filename.",
        steps: [
          "Press ⌘3, or click Storyboard in the toolbar. Each clip becomes a six-frame collage, so two similar files stop looking identical.",
          "The arrow on the Storyboard button chooses Normal or Compact. Compact fits more collages when you are scanning a large folder.",
          "Scroll. A chip beside the scrollbar shows where you are in the current sort — titles if you sorted by Title, dates if you sorted by Date Added.",
          "Click a frame once to focus that clip. Click the same collage again to play from that frame.",
          "If you know a word, press ⌘F and type it. Every word has to appear in the title, filename, tags, or a custom field. More words make the list shorter.",
        ],
        note: "Storyboard, the scroll index, and search are spelled out on the Browse page.",
        noteHref: "/skagway/manual/browse",
        noteLinkLabel: "Browse",
      },
    ],
  },
  {
    slug: "tag-and-rate",
    question: "…describe clips so I can find them later?",
    taskGroup: "Find and organize",
    title: "Tagging, Rating and Custom Fields",
    part: "tasks",
    blurb: "Describe your clips now, so you can find them later.",
    summary:
      "Filters, search, and smart collections can only work with what Skagway knows about a clip, and a filename tells it very little. Every star, tag, and custom value you add in the Inspector is something you can filter, search, and sort by later. A few minutes of tagging now saves scrolling through the whole library next time.",
    screenshot: "organize.png",
    screenshotCaption: "Rating, tags, and custom fields in the Inspector",
    screenshotAlt: "Skagway Inspector with rating, tags, and the display title",
    sections: [
      {
        title: "Rate and tag in the Inspector",
        intro:
          "Press ⌘I if the Inspector is hidden. Whatever you set applies to the focused clip, or to every clip in the batch selection. To make one, see Build a selection (work on videos together).",
        steps: [
          "Focus a clip. Under RATING, click a star. Click the same star again to clear it.",
          "Under TAGS, click Add tags and choose a tag from the list. To make a new tag, type its name in the field under TAGS and press Return.",
          "Click a tag chip to remove that tag from the clip.",
          "To rate or tag many clips at once, select them first with ⌘-click, or press ⌘A for everything in the view. The bar turns orange, and whatever you set goes onto every selected clip.",
        ],
        note: "Ratings, tags, and batch edits are covered in full on the Organize page.",
        noteHref: "/skagway/manual/organize",
        noteLinkLabel: "Organize",
      },
      {
        title: "Add your own fields",
        intro:
          "Tags and stars cover most needs. Add a custom field when you want to record something specific, such as a location, a shoot date, or whether a clip has been delivered.",
        steps: [
          "Open Settings → Custom Metadata and create a field. Give it a name and a type: String, Text, Number, Date, Date & Time, or Boolean.",
          "Focus a clip and fill in the value under CUSTOM in the Inspector. The control matches the field’s type.",
          "The field shows up in search, the Sort menu, List columns, and the filters, so you can find clips by it later.",
        ],
        note: "Custom fields are set up in Settings.",
        noteHref: "/skagway/manual/settings#custom-metadata",
        noteLinkLabel: "Custom Metadata",
      },
    ],
  },
  {
    slug: "narrow-the-library",
    question: "…show only the clips I need?",
    taskGroup: "Find and organize",
    title: "Narrow the library (filtering)",
    part: "tasks",
    blurb: "Show only the clips you want to work with.",
    summary:
      "Once you have tagged, rated, or added custom fields to your videos, filters can narrow the view to just the clips you want: everything rated four stars or higher, say, or every clip with a certain tag. Filtering also protects bulk actions. They work on whatever is in front of you, so if the window still shows the whole library, you could rename or tag the wrong files. Filter first, until the list is the set you mean.",
    screenshot: "quick-filter.png",
    screenshotCaption: "The filter drawer, Quick tab",
    screenshotAlt: "Skagway Quick Filter drawer over the library",
    sections: [
      {
        title: "Leave only the files you want to work with",
        intro:
          "A common pass is “the long clips I have not rated yet,” or “everything with this tag from the folder I added yesterday.” Quick Filter covers the usual cuts. Advanced Filter is for a rule you could not build from those cards.",
        steps: [
          "Press ⇧⌘F, or click the filter button in the toolbar, to open the filter drawer above your videos. It has two tabs: Quick, a set of cards for the common filters, and Advanced, for building your own rules. Start with Quick.",
          "Pick a smart library if you want a saved slice of the catalog, such as Missing or Duplicates. Then filter by rating, duration, quality, or tags. Filters on different cards combine, so a video has to match all of them to stay in the view.",
          "On Tags, Match Any keeps a video that has one of the tags. Match All keeps a video only when it has every tag you selected.",
          "Press ⌘F if you also know a word. Search narrows whatever the filter already left.",
          "When the cards are not specific enough, switch to the Advanced tab (⌘⌥A) and add rules. ALL means every rule in the group must match. ANY means one is enough.",
          "The videos still on screen are the ones later commands will see, including File → Bulk Rename… when you have not selected a smaller set.",
        ],
        note: "The filter cards, smart libraries, and rule tree are on the Filter page.",
        noteHref: "/skagway/manual/filter",
        noteLinkLabel: "Filter",
      },
    ],
  },
  {
    slug: "build-a-selection",
    question: "…work on several videos at once?",
    taskGroup: "Find and organize",
    title: "Build a selection (work on videos together)",
    part: "tasks",
    blurb: "Mark the files you want to change together.",
    summary:
      "Focus and the batch selection are different. Focus is the one clip the Inspector is looking at. The batch selection is the group you build with checkmarks, and it stays put while you move through the list. Clicking a clip focuses it. It does not select it.",
    screenshot: "collection-set.png",
    screenshotCaption: "A batch selection: checkmarked clips and the orange Inspector bar",
    screenshotAlt:
      "Skagway grid with checkmarked clips and the orange batch Inspector header",
    sections: [
      {
        title: "Select, then act",
        intro:
          "Select first when the next step is a rating, a tag, a rename, or a move that should hit several files and leave the rest alone. ⌘A is the fast path when the filtered view is already exactly the set.",
        steps: [
          "Click a clip once to focus it. That does not select it.",
          "⌘-click a clip to add it to the selection or remove it. ⇧-click selects everything from the last click through this one. Press A to add or remove the focused clip.",
          "Press ⌘A to select every video in the current view. Filter or search first if “everything on screen” is larger than the job.",
          "With two or more clips selected, a pill reads “N videos selected.” The Inspector title bar turns orange and reads N Videos Selected. A rating or tag you set there is written onto every selected clip.",
          "Right-click any selected clip to act on the whole selection. Commands that can work on several videos, such as Move Files…, Add to Album, Export Metadata…, and Bulk Rename…, apply to every selected clip. Commands that only make sense for one video, such as Edit Title… and Rename File…, do not apply to the whole selection.",
          "Arrow keys move focus and leave the checkmarks where they are. That is how you walk the list and press A on the keepers.",
          "Click Clear on the orange bar, click the pill’s ✕, or press ⇧⌘A, when the job is done.",
        ],
        note: "Checkmarks, the orange bar, and the light blue single-clip bar are on the Browse page.",
        noteHref: "/skagway/manual/browse#grid-and-list",
        noteLinkLabel: "Grid and List",
      },
    ],
  },
  {
    slug: "inspector",
    question: "…see and edit one clip’s details?",
    taskGroup: "Find and organize",
    title: "The Inspector",
    part: "tasks",
    blurb: "The pane that rates, tags, and names the clip you are looking at.",
    summary:
      "The Inspector is where a video stops being only a file. Title, stars, tags, bookmarks, and custom fields live here, on the clip, not in the filename. Hide the pane when you want the wall of videos. Show it when you are deciding what a clip is.",
    screenshot: "organize.png",
    screenshotCaption: "The Inspector, showing the focused clip",
    screenshotAlt: "Skagway Inspector with rating, tags, and the display title",
    sections: [
      {
        title: "Read one clip, or edit the set",
        intro:
          "Use it on one clip when you are logging a take. Use it on the orange bar when the same tag or rating belongs on a whole group. Title is the name Skagway sorts and searches. It can differ from the file name on disk.",
        steps: [
          "Press ⌘I, or click the Inspector button in the toolbar, to show or hide the pane.",
          "Focus one clip. Under RATING, click a star. Click that same star again to clear it. Under TAGS, click a chip to remove it, or click Add tags and choose one. Type a new name and press Return to create a tag and assign it.",
          "Press Return, or right-click → Edit Title…, to change the display name. The file on disk keeps its name. Rename File… is the command that changes the name on disk.",
          "Select two or more clips first if the edit should hit all of them. The bar turns orange and reads N Videos Selected. The value you set replaces that field on every clip in the selection.",
          "Click one selected clip when you want to look at it alone. The bar turns light blue and shows that clip’s name. Click it again, or click N Videos, to go back to editing the set.",
        ],
        note: "Titles, tags, ratings, and batch edits are on the Organize page.",
        noteHref: "/skagway/manual/organize",
        noteLinkLabel: "Organize",
      },
    ],
  },
  {
    slug: "keep-a-group",
    question: "…save a group to come back to?",
    taskGroup: "Find and organize",
    title: "Keep a group (Albums & Smart Collections)",
    part: "tasks",
    blurb: "Today’s selection should still be there tomorrow.",
    summary:
      "Checkmarks disappear when you clear them. A group you will come back to needs a saved place. An album is the hand-picked list, such as a shoot or a reel. A smart collection is a rule, such as “4 stars and longer than 10 minutes,” that refills itself as you tag and rate.",
    screenshot: "collections.png",
    screenshotCaption: "An album open, sorted by Album Order",
    screenshotAlt: "Skagway album open with Album Order",
    sections: [
      {
        title: "A list you built, or a rule that refills",
        intro:
          "Pick an album when membership is a decision you make clip by clip. Pick a smart collection when membership should follow from ratings, tags, or other fields you already keep.",
        steps: [
          "For a rule: set it up in Advanced Filter (⌘⌥A), then click Save as Collection… in the drawer header. The smart collection updates as the library changes.",
          "For a hand-picked list: create an album, then add the clips you want. Open it from the Collections card in Quick Filter.",
          "While the album is open, choose Album Order in the Sort menu. Drag clips to arrange them. That order is the one Play All uses when Album Order is selected.",
          "Both kinds live in the Collections card of the Quick Filter drawer, so you can return to the same set without rebuilding the checkmarks.",
        ],
        note: "Albums, Album Order, and smart collections are on the Smart Collections & Albums page.",
        noteHref: "/skagway/manual/collections",
        noteLinkLabel: "Smart Collections & Albums",
      },
    ],
  },
  {
    slug: "review-by-watching",
    question: "…watch a batch of clips in order?",
    taskGroup: "Watch",
    title: "Review by watching",
    part: "tasks",
    blurb: "Play the batch in order instead of opening files one by one.",
    summary:
      "Logging and renaming can wait. Sometimes the job is to watch what is on screen: a day’s footage, an album, or whatever the filter left. Play All walks that list. Resume puts you back where you stopped.",
    screenshot: "playback.png",
    screenshotCaption: "The player and its transport controls",
    screenshotAlt: "Skagway player with transport controls and bookmark marks",
    sections: [
      {
        title: "Play the current view",
        intro:
          "Play All uses the videos you can see right now, in the current sort. Filter or open an album first if you do not want the whole library.",
        steps: [
          "Click Play All in the toolbar, or press ⇧⌘P. Playback starts at the first video that can play. When one finishes, the next starts.",
          "Turn on Loop Play All if you want the first video to start again after the last one.",
          "Press Esc, or click the red Stop control, to stop. Skagway saves the position. The next time you play that video, it resumes there. Press ⌥Space to ignore the saved position and start at the beginning.",
          "In an album, choose Album Order in the Sort menu if the sequence should be the order you arranged, not Title or Date Added.",
          "Stop playback, or play a single video on its own, and the Play All session ends.",
        ],
        note: "Play All, resume, and the player sizes are on the Playback page.",
        noteHref: "/skagway/manual/playback",
        noteLinkLabel: "Playback",
      },
    ],
  },
  {
    slug: "mark-a-moment",
    question: "…mark a moment in a long video?",
    taskGroup: "Watch",
    title: "Mark a moment",
    part: "tasks",
    blurb: "The useful part of a long file is somewhere in the middle.",
    summary:
      "A two-hour file is a poor unit of work when you care about one minute of it. A bookmark gets you back to that time. A poster frame does the same job for the grid: the thumbnail should be the frame you mean, not the first black frame.",
    screenshot: "player-filmstrip.png",
    screenshotCaption: "The filmstrip above the scrubber, and bookmarks on the timeline",
    screenshotAlt: "Skagway player with a row of frames above the scrubber",
    screenshotHint:
      "Windowed player with the filmstrip row visible above the scrubber. At least one bookmark diamond on the timeline. Transport controls visible.",
    sections: [
      {
        title: "Bookmark the time, or keep the frame",
        intro:
          "Bookmark while you are watching, at the moment you would otherwise have to scrub for later. Change the poster when the grid is how you will find this clip next time.",
        steps: [
          "While the video is playing, press ⌥⌘B, or double-click the scrubber, to bookmark the current time. Diamonds appear on the timeline.",
          "The same marks are listed under BOOKMARKS in the Inspector. Click one to jump there. Delete a bookmark from its row.",
          "The row of frames above the scrubber is for seeking. Click a frame to move to that time, then bookmark it if that is the moment.",
          "For the grid thumbnail, play to the frame you want and press ⌥⌘M. That sets the poster from the current frame. Regenerate Thumbnail is the coarser tool when the poster landed on a title card and any better frame will do.",
        ],
        note: "Bookmarks, the player filmstrip, and poster frames are on the Playback page.",
        noteHref: "/skagway/manual/playback#bookmarks",
        noteLinkLabel: "Bookmarks",
      },
    ],
  },
  {
    slug: "rename-files",
    question: "…rename files on disk?",
    taskGroup: "Fix and tidy files",
    title: "Rename files",
    part: "tasks",
    blurb: "The names on disk are the problem.",
    summary:
      "Cameras name files for themselves. You can give each file a display Title inside Skagway and leave the disk alone, or you can rename the files. Bulk rename is for a pattern — a date, a counter, the old name — applied to many files after you have checked the preview.",
    screenshot: "bulk-rename.png",
    screenshotCaption: "The Bulk Rename… sheet: name pattern and preview",
    screenshotAlt: "Skagway Bulk Rename sheet with a pattern and a preview",
    screenshotHint:
      "Bulk Rename sheet. Name pattern field with at least two tokens, such as {Stem} and {Inc 1}. Preview table with several rows, including one skipped row whose reason is readable. Rename N Files visible.",
    sections: [
      {
        title: "Title in the catalog, or the name on disk",
        intro:
          "Change Title when you only need a name you can sort and search inside Skagway. Rename the file when Finder, another app, or a delivery folder needs the new name.",
        steps: [
          "For one clip’s display name, focus it and press Return, or right-click → Edit Title…. The file name on disk stays as it is.",
          "For one file on disk, right-click → Rename File…. Skagway keeps the previous name as Original File Name, so search can still find it.",
          "For many files, filter or select first. File → Bulk Rename… renames every video in the current view. Right-click → Bulk Rename… renames only the selection.",
          "Build a Name pattern. {Stem} is the current name without the extension. {Inc 1} is a counter. The sheet previews every resulting name before anything is written.",
          "Read the preview. A skipped row includes the reason it will not be renamed. Click Rename N Files only after that list looks right.",
        ],
        note: "Tokens, the preview, and Rename File… are on the File operations page.",
        noteHref: "/skagway/manual/file-operations#bulk-rename",
        noteLinkLabel: "Bulk Rename…",
      },
    ],
  },
  {
    slug: "re-encode",
    question: "…play a file Skagway won’t open?",
    taskGroup: "Fix and tidy files",
    title: "Re-encode",
    part: "tasks",
    blurb: "A file will not play in Skagway.",
    summary:
      "Most files play with no conversion. Re-encode is the exception: the built-in player cannot open this one, and you want a copy it can. If another app already plays it, you can hand the file off and skip conversion.",
    screenshot: "queue-activity-strip.png",
    screenshotCaption: "The activity strip showing a re-encode in progress",
    screenshotAlt: "Skagway activity strip showing a re-encode in progress",
    sections: [
      {
        title: "Convert, or open it somewhere else",
        intro:
          "Fix for Built-in Player… makes an MP4 with H.264 video and AAC audio. The original is kept, with _backup in the name, until you delete that backup.",
        steps: [
          "If you just need to watch it, right-click → Play in External Player and choose an app that already opens the file. Nothing is converted.",
          "To make a file Skagway can play, right-click → Fix for Built-in Player…. The command needs ffmpeg. Point Skagway at it once under Settings → Tools.",
          "Jobs run one at a time. The activity strip at the bottom of the window shows progress. Click the strip to open the queue.",
          "After a conversion finishes, the circular-arrows pill in the header opens the re-encode queue. Restore a backup from that queue if the new file is wrong, or delete the backup when you are sure.",
          "Finished conversions show up in the Recently Converted smart library.",
        ],
        note: "The queue, backups, and ffmpeg are on the File operations page.",
        noteHref: "/skagway/manual/file-operations#fix-for-built-in-player-re-encode",
        noteLinkLabel: "Fix for Built-in Player…",
      },
    ],
  },
  {
    slug: "move-files",
    question: "…move files without breaking the library?",
    taskGroup: "Fix and tidy files",
    title: "Move files",
    part: "tasks",
    blurb: "You are reorganizing the drive, and the catalog should follow.",
    summary:
      "Moving a file in Finder leaves Skagway pointing at a path that no longer exists. Move Files… does the move and updates the catalog together. Use it when you are choosing the new folder. [[Re-link]] is the other case: the files are already somewhere else.",
    screenshot: "file-operations.png",
    screenshotCaption: "Move Files… in the right-click menu",
    screenshotAlt:
      "Skagway context menu with Move Files… and the other file commands",
    screenshotNeedsUpdate: false,
    sections: [
      {
        title: "Move from inside Skagway",
        intro:
          "Select the clips that should leave, then pick the destination. A move on the same volume is immediate. A move onto another volume copies, checks the copy, and only then removes the original.",
        steps: [
          "Select the videos. Right-click and choose Move Files….",
          "Choose the destination folder and click Move Here.",
          "On the same volume, the files move and the library paths update. That job does not sit in a queue.",
          "Onto another volume, watch the activity strip. It shows progress, for example Moving 18% · +2. The +N is further work still queued. Click the strip, or choose View → Move Queue…, to abort or retry.",
          "Ratings, tags, and bookmarks stay on the video, because the catalog entry moved with the file.",
        ],
        note: "Same-volume moves, cross-volume copies, and the queue are on the File operations page.",
        noteHref: "/skagway/manual/file-operations#move-files",
        noteLinkLabel: "Move files",
      },
    ],
  },
  {
    slug: "re-link",
    question: "…fix videos that moved or went missing?",
    taskGroup: "Fix and tidy files",
    title: "Re-link",
    part: "tasks",
    blurb: "The files already moved, and Skagway still has the old paths.",
    summary:
      "A video is marked Missing when its path no longer exists: the drive was unplugged, or the file was moved in Finder. Reconnect points the catalog at the folders where those files live now. Ratings, tags, bookmarks, and album memberships stay on the video. Plug an unplugged drive back in before you reconnect. It may not be missing at all.",
    screenshot: "reconnect.png",
    screenshotCaption: "The Reconnect sheet: destination folders and the match preview",
    screenshotAlt: "Skagway Reconnect sheet with a match preview",
    screenshotHint:
      "Reconnect sheet with at least one folder added with Add destination…, labeled as an Evidence Destination. Preview groups Ready, Needs attention, and Unmatched visible. Confirm reconnect readable.",
    sections: [
      {
        title: "Point the catalog at the new folders",
        intro:
          "Skagway never changes paths on its own. When you try to play a missing file, it suggests running Reconnect, and you can also open it yourself at any time. Tell it which folders to search. It matches by filename, and by size, only inside those folders.",
        steps: [
          "A banner appears when clips cannot be found. You can also focus a clip in the Missing smart library. Click Reconnect… on the banner, or choose File → Reconnect….",
          "Click Add destination… once for each folder that now holds the missing clips.",
          "Read the preview. Matches are grouped into Ready, Needs attention, and Unmatched. The Ready summary turns green when every missing clip in this session has a match.",
          "Click Confirm reconnect. Skagway updates paths for the Ready matches. Unmatched clips stay Missing.",
          "Choose Edit → Undo Reconnect if the last session pointed files at the wrong place.",
        ],
        note: "The banner, Evidence Destinations, and the preview groups are on the Library page.",
        noteHref: "/skagway/manual/library#reconnect-missing-files",
        noteLinkLabel: "Reconnect missing files",
      },
    ],
  },
  {
    slug: "match-the-disk",
    question: "…clean up new files and duplicates?",
    taskGroup: "Fix and tidy files",
    title: "Match the disk",
    part: "tasks",
    blurb: "The catalog and the folders have drifted apart.",
    summary:
      "New files landed in a watched folder. The same video showed up twice under two names. Or a clip should leave the library and stay on disk. These are housekeeping jobs. Re-link is the separate case, for files whose paths are already wrong.",
    screenshot: "duplicates.png",
    screenshotCaption: "The Duplicates smart library: a group of matching files",
    screenshotAlt: "Skagway Duplicates smart library with a group of matching files",
    screenshotHint:
      "Quick Filter open on the Duplicates smart library. At least one group of videos whose content matches, with different filenames if that is what the library shows. The group is readable enough to see they belong together.",
    sections: [
      {
        title: "Scan, duplicates, and leaving the catalog",
        intro:
          "Scan looks for files added since last time. Duplicates groups files whose content matches, even when the names differ. Remove and Delete are different endings: one forgets the catalog entry, the other throws the file away.",
        steps: [
          "Choose File → Scan for New Videos, or click Scan for New Videos in the toolbar. Skagway looks through your Data Source folders for files added since the last scan.",
          "Open the Duplicates smart library from Quick Filter. Keep the copy you want. On the others, choose Remove from Library or Delete Video….",
          "If a group is not really the same video, right-click → Not a Duplicate. Skagway leaves those files out of the group next time.",
          "Remove from Library (⌥⌘R) drops the video from the catalog. The file stays on disk. A later scan of that folder can bring it back.",
          "Delete Video… (⌘⌫) asks for confirmation, then moves the file to the Trash.",
        ],
        note: "Scan, duplicates, and Remove versus Delete are on the Library and File operations pages.",
        noteHref: "/skagway/manual/file-operations#duplicates",
        noteLinkLabel: "Duplicates",
      },
    ],
  },
  {
    slug: "take-your-notes",
    question: "…take my ratings and tags to another library?",
    taskGroup: "Share and back up",
    title: "Take your notes with you",
    part: "tasks",
    blurb: "Ratings, tags, and titles are the part worth carrying.",
    summary:
      "The video files can stay where they are. What you do not want to redo by hand is the catalog work: titles, stars, tags, resume positions. Export writes that metadata to a file. Import applies it to another library, or back to this one after you have edited the spreadsheet. Save Copy is the whole .machii catalog as a backup.",
    screenshot: "export-import.png",
    screenshotCaption: "The Export Metadata… sheet",
    screenshotAlt: "Skagway Export Metadata sheet",
    sections: [
      {
        title: "A metadata file, or a copy of the catalog",
        intro:
          "Export does not copy video files. Use it when another library should receive the notes, or when you want to edit a column in a spreadsheet and bring it back. Use Save Copy when you want a duplicate of the catalog file itself.",
        steps: [
          "Choose File → Save Copy… first if you want a way back. Skagway writes a timestamped duplicate of the .machii file. The library you had open stays open.",
          "Choose File → Export Metadata… (⌥⌘E) to export every video currently shown. Filter first if you do not want the whole library in the file. Right-click → Export Metadata… exports only the selection.",
          "Choose CSV for a spreadsheet, or JSON Lines for another tool. Check the fields you want. Content Fingerprint and Path are how a later import finds each video.",
          "On the other library, choose File → Import Metadata… (⌥⌘I) and open that file. Each row matches by Path first, then by Content Fingerprint, so a file that moved can still match.",
          "Tags in the file are added to the tags already on the video. When the import finishes, the summary reports Matched, Updated, and Unmatched.",
        ],
        note: "Fields, match keys, and Save Copy are on the Export / Import page.",
        noteHref: "/skagway/manual/export-import",
        noteLinkLabel: "Export / Import",
      },
    ],
  },
];
