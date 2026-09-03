/* eslint-disable */
/**
 * AUTO-GENERATED FILE — do not edit by hand.
 *
 * Source of truth: ./manual.ts (via ./search-documents.ts)
 * Regenerate: npm run manual:index
 * (also runs on predev / prebuild)
 *
 * Generated: 2026-09-03T21:23:23.473Z
 * Documents: 75
 */
import type { ManualSearchDocument } from "./search-documents";

export const MANUAL_SEARCH_INDEX: ManualSearchDocument[] = [
  {
    "id": "first-launch__page",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": null,
    "href": "/skagway/manual",
    "title": "First launch",
    "body": "Choose where Skagway stores its data, then add your first videos.\nThe first time you run Skagway, you choose where the catalog and each library’s thumbnail cache live — including options that keep locations off your boot disk. In most cases Skagway then opens an empty home library so you can start adding videos right away."
  },
  {
    "id": "first-launch__what-skagway-stores",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "What Skagway stores",
    "href": "/skagway/manual#what-skagway-stores",
    "title": "First launch » What Skagway stores",
    "body": "A library is Skagway’s catalog — titles, thumbnails, ratings, tags, bookmarks, and collections. Your video files themselves are never moved into it.\nSkagway is not a vault: it does not modify or protect your source media. Place sensitive media on an encrypted volume if you need that protection at the disk level.\nEach library keeps its own thumbnail cache location (stored in the library file). Opening one library never depends on another volume’s cache."
  },
  {
    "id": "first-launch__choose-where-skagway-stores-its-data",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Choose where Skagway stores its data",
    "href": "/skagway/manual#choose-where-skagway-stores-its-data",
    "title": "First launch » Choose where Skagway stores its data",
    "body": "Use standard location on this Mac — recommended when you are not putting the catalog on an encrypted volume. The library goes under Application Support; the cache under ~/Library/Caches/Skagway/.\nChoose Folder… — pick a folder yourself (for example on an encrypted or external volume).\nIf you chose a custom folder, Skagway asks Where should this library’s cache live?\nCo-locate with library — creates a Skagway-cache folder next to the library (recommended when the library sits with your media).\nSystem default — this library’s cache under ~/Library/Caches/Skagway.\nChoose Folder… — pick any folder for this library’s thumbnails.\nThen Skagway asks How should Skagway find this library?\nRemember this location — keeps a bookmark so Skagway can reopen it (no plain path stored in preferences).\nAsk every time I open Skagway — nothing is remembered on the boot disk; you open the library file each launch.\nNothing leaves your Mac by default — no account, no cloud sync, no usage analytics. Optional update checks stay off unless you turn them on later; they only ask whether a newer Skagway build exists."
  },
  {
    "id": "first-launch__your-library-opens",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Your library opens",
    "href": "/skagway/manual#your-library-opens",
    "title": "First launch » Your library opens",
    "body": "After setup, Skagway relaunches briefly — that is normal.\nWith Use standard location or Remember this location, Skagway opens your home library automatically, creating an empty .machii catalog if one doesn’t exist yet.\nIf you chose Ask every time I open Skagway, you’ll see a simple screen with no library open. Use File → Open Library…, New Library…, or Open Recent — the location is not remembered on this Mac.\nCreate Home Library / Open Home Library, New Library…, Open Library…, and Open Recent also stay available in the File menu whenever you need them."
  },
  {
    "id": "first-launch__add-your-first-videos",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Add your first videos",
    "href": "/skagway/manual#add-your-first-videos",
    "title": "First launch » Add your first videos",
    "body": "An empty library shows Drag videos here — drop video files or folders onto that area to import them (it becomes Drop to add to your library while you drag).\nOr click Add Files… and select video files or folders, then Add.\nYou can also choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.\nSkagway indexes recognized videos and builds thumbnails in the background.\nFolders you add — or the parent folders of files you add — are saved as Data Sources in Settings so Skagway can scan and watch them later. File → Change Library Location… and File → Change Thumbnail Cache Location… let you move those later."
  },
  {
    "id": "library__page",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": null,
    "href": "/skagway/manual/library",
    "title": "Library",
    "body": "Add folders, keep the catalog current, manage .machii files.\nThe File menu holds everything about the library itself: which folders Skagway watches, scanning for new files, and creating, opening, copying, or deleting .machii library files."
  },
  {
    "id": "library__add-your-video-folders",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Add your video folders",
    "href": "/skagway/manual/library#add-your-video-folders",
    "title": "Library » Add your video folders",
    "body": "In an empty library, drag video files or folders onto Drag videos here, or click Add Files… to pick them in a dialog.\nOr choose File → Add Folder… (⇧⌘O), select one or more folders, and click Scan.\nSkagway indexes every recognized video inside (subfolders included) and generates thumbnails in the background.\nFolders you add — or the parent folders of files you add — are registered as Data Sources automatically.\nAdded folders are listed under Settings → Data Sources. You can Exclude… nested subfolders from scanning there. Your files stay exactly where they are on disk."
  },
  {
    "id": "library__keep-the-library-current",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Keep the library current",
    "href": "/skagway/manual/library#keep-the-library-current",
    "title": "Library » Keep the library current",
    "body": "Scan for New Videos — checks every watched folder for files added since the last scan. The header shows progress, then “Found N new files” or “No new files found”. Videos from that scan appear in the Last Added smart library.\nScan for Subtitles — re-checks the videos currently shown for matching .srt subtitle files and updates their subtitle badges.\nScan for New Videos is also available as a button on the toolbar."
  },
  {
    "id": "library__create-open-and-switch-libraries",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Create, open, and switch libraries",
    "href": "/skagway/manual/library#create-open-and-switch-libraries",
    "title": "Library » Create, open, and switch libraries",
    "body": "Open Home Library / Create Home Library — open or create the library at your chosen home location (wording depends on whether the file exists).\nNew Library… — create a separate .machii catalog at a location you choose.\nOpen Library… — open any existing .machii file.\nOpen Recent — recently used libraries, with Clear Menu at the bottom.\nChange Library Location… — run the first-launch location setup again for the catalog.\nChange Thumbnail Cache Location… — move this library’s thumbnail cache (each library stores its own cache path).\nClose Library… — close the catalog. With a remembered home location Skagway can reopen it from File → Open Home Library; with Ask every time, open a library again from the File menu.\nOpening an existing library or creating a new one does not delete the library you were working with. It’s still on disk, ready to open again. Skagway restarts briefly when switching."
  },
  {
    "id": "library__copy-or-delete-the-library-file",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Copy or delete the library file",
    "href": "/skagway/manual/library#copy-or-delete-the-library-file",
    "title": "Library » Copy or delete the library file",
    "body": "Save Copy… — writes a timestamped duplicate (Skagway-20260716-224500.machii, for example) wherever you choose. The original stays open; open the copy later with Open Library….\nDelete This Library… — permanently deletes the .machii catalog file after a confirmation. Your video files are not touched.\nBackups and moving metadata between libraries are covered in more detail."
  },
  {
    "id": "library__which-files-count-as-video",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Which files count as video",
    "href": "/skagway/manual/library#which-files-count-as-video",
    "title": "Library » Which files count as video",
    "body": "Out of the box Skagway recognizes mp4, mov, m4v, avi, mkv, wmv, flv, webm, mpg, mpeg, 3gp, ts, mts, vob, ogv, divx, dv, m2ts, and mxf.\nAdd or disable extensions under Settings → Extensions."
  },
  {
    "id": "browse__page",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": null,
    "href": "/skagway/manual/browse",
    "title": "Browse",
    "body": "Grid and List views, sorting, Play All, search, and fast navigation.\nBrowse the library as a thumbnail Grid or a column-based List, sort by any field, Play All through the current view, and search across titles, filenames, tags, and custom fields — built to stay fast at thousands of videos."
  },
  {
    "id": "browse__grid-and-list",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Grid and List",
    "href": "/skagway/manual/browse#grid-and-list",
    "title": "Browse » Grid and List",
    "body": "Switch views with the Grid / List control in the toolbar, or press ⌘1 for Grid and ⌘2 for List.\nGrid cards show the thumbnail, Title, duration, date added, and rating stars. A captions badge appears when subtitles are available, and a thin progress bar marks partially watched videos.\nHold the pointer over a grid card for a moment and Live Preview plays a short, silent tour through the video — see the Playback page for details.\nDouble-click a grid card to play it inside Skagway. Double-click a List row to open it in your external player."
  },
  {
    "id": "browse__list-columns",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "List columns",
    "href": "/skagway/manual/browse#list-columns",
    "title": "Browse » List columns",
    "body": "The Title column is always visible. Optional columns: Duration, Resolution, File size, Rating, Date added, Plays, Created, and Last played.\nChoose which columns appear under Settings → Library → List view columns, or right-click a column header.\nThe Rating column is editable — click the stars directly in the row.\nCustom metadata fields you define also become available as columns."
  },
  {
    "id": "browse__sort-shuffle-and-surprise-me",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Sort, shuffle, and Surprise Me!",
    "href": "/skagway/manual/browse#sort-shuffle-and-surprise-me",
    "title": "Browse » Sort, shuffle, and Surprise Me!",
    "body": "Open the Sort menu to order by Title, Date Added, Duration, File Size, Rating, Resolution, or Plays — plus any custom fields you’ve defined.\nWhile viewing an album, Album Order appears at the top of the Sort menu so you can play and browse in the playlist order you arranged.\nClick the arrow beside the Sort menu to flip between ascending and descending.\nShuffle (⇧⌘R) puts the whole view in a random order; picking any sort exits it. Click Shuffle again to reshuffle.\nSurprise Me! (⇧⌘S) jumps to one random video — and can auto-play it (Settings → Video)."
  },
  {
    "id": "browse__play-all",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Play All",
    "href": "/skagway/manual/browse#play-all",
    "title": "Browse » Play All",
    "body": "Click Play All in the toolbar (or press ⇧⌘P) to play the current filtered view from the first playable video.\nMissing files are skipped. Auto-advance and Loop run only during this Play All session.\nLoop Play All (toolbar toggle, View menu, or Settings → Video) is off by default. When it is on, finishing the last playable video starts the first one again.\nStopping playback or playing a single video (Space on one card) ends the session. Loop then has no effect until you Play All again."
  },
  {
    "id": "browse__search",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Search",
    "href": "/skagway/manual/browse#search",
    "title": "Browse » Search",
    "body": "Press ⌘F or click the Search videos field, then type part of what you’re looking for.\nSearch matches Title, File Name, Original File Name, Tags, and custom metadata values — case-insensitive, contains-style.\nMultiple words narrow the results (AND): every word must appear somewhere, but each word may hit a different field (for example one word in a tag and another in the title).\nClick the × in the field (or clear it) to show the full library again.\nFor ratings, duration, quality, and other structured criteria, use the filters."
  },
  {
    "id": "browse__getting-around-quickly",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Getting around quickly",
    "href": "/skagway/manual/browse#getting-around-quickly",
    "title": "Browse » Getting around quickly",
    "body": "Arrow keys move the selection through the grid; Home and End jump to the first and last video.\n⌘J scrolls the current selection back into view.\n⌘-click adds or removes a single video from the selection; ⇧-click selects a range. ⌘A selects everything, ⇧⌘A deselects."
  },
  {
    "id": "filter__page",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": null,
    "href": "/skagway/manual/filter",
    "title": "Filter",
    "body": "Quick Filter chips and Advanced Filter rules.\nNarrow the library with a few clicks using Quick Filter, or build precise boolean rules with Advanced Filter. Both work on top of search and sorting."
  },
  {
    "id": "filter__quick-filter-f",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Quick Filter (⇧⌘F)",
    "href": "/skagway/manual/filter#quick-filter-f",
    "title": "Filter » Quick Filter (⇧⌘F)",
    "body": "Click the filter button in the toolbar or press ⇧⌘F to open the Quick Filter drawer above the grid.\nCombine anything: a Smart Library, Collection, or Album; a rating; a duration range (presets like < 1 min or > 30 min); quality buckets (SD through 8K+); and tags.\nRating is one row: No Stars (unrated), then 1–5 stars, then Or Higher on the right. Click a star to match only that rating. Turn Or Higher on to match that rating and every higher one (4 → 4 and 5). Or Higher is off by default, session-only, and unavailable for No Stars and for 5 stars. The filter pill reads Rating 4, Rating 4+, or No stars.\nTags can match Any (at least one) or All of the selected tags — use the toggle in the Tags card.\nEverything you pick applies together, and search still works on top."
  },
  {
    "id": "filter__smart-libraries",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Smart Libraries",
    "href": "/skagway/manual/filter#smart-libraries",
    "title": "Filter » Smart Libraries",
    "body": "All Videos — the whole library.\nRecently Added / Recently Played — videos from the last N days (N is set in Settings → Library).\nTop Rated — videos at or above your chosen star threshold.\nDuplicates — videos whose file content matches another video, grouped by fingerprint.\nCorrupt — files Skagway couldn’t read metadata or a thumbnail from.\nMissing — files whose path no longer exists (unmounted drive, moved file). Click the refresh arrow to rescan.\nLast Added — videos found by the most recent Scan for New Videos (appears when that set is non-empty).\nRecently Converted and Last Metadata Import appear after you use re-encoding or metadata import.\nChoose which Smart Libraries appear under Settings → Library → Smart Libraries."
  },
  {
    "id": "filter__advanced-filter-v",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Advanced Filter (⇧⌘V)",
    "href": "/skagway/manual/filter#advanced-filter-v",
    "title": "Filter » Advanced Filter (⇧⌘V)",
    "body": "Press ⇧⌘V to switch the drawer to the Advanced Filter rule editor.\nBuild rules on any attribute: Name, Extension, Path, Parent Folder, Volume, File Size, Duration, Width, Height, Quality, Video Codec, Date Imported, Date Created, Plays, Rating, Tag, and your custom fields.\nOperators include equals, contains, starts with, is greater than, is between, and more — the editor adapts to each attribute (star picker for Rating, date picker for dates, tag menu for Tag).\nRules cluster into groups. Within a group, match ALL or ANY; groups combine with an outer ALL/ANY — e.g. (Tag is Vacation AND Rating ≥ 4) OR Tag is Favorite.\nClick Save as Collection… to keep the rule set permanently.\nQuick Filter and Advanced Filter are exclusive — opening one clears the other, so they never combine unexpectedly."
  },
  {
    "id": "filter__clearing-filters",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Clearing filters",
    "href": "/skagway/manual/filter#clearing-filters",
    "title": "Filter » Clearing filters",
    "body": "With the drawer closed, active filters appear as removable pills above the grid — click a pill’s × to drop just that condition.\nClick Clear all in the pill row or the drawer header to reset everything.\nView → Clear Filters (⌥⌘C) does the same from the keyboard."
  },
  {
    "id": "collections__page",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": null,
    "href": "/skagway/manual/collections",
    "title": "Collections & Albums",
    "body": "Saved smart views and hand-picked playlists.\nCollections are saved rule sets that update themselves as the library changes. Albums are hand-picked playlists you control video by video — including a saved Album Order. Both live in the Quick Filter drawer."
  },
  {
    "id": "collections__create-a-smart-collection",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": "Create a smart collection",
    "href": "/skagway/manual/collections#create-a-smart-collection",
    "title": "Collections & Albums » Create a smart collection",
    "body": "Open the Quick Filter drawer (⇧⌘F) and click New Collection in the Collections card.\nName it, then add rules — the same attributes and operators as Advanced Filter, with ALL/ANY groups.\nClick Create. The collection appears in the Collections card and stays up to date automatically: tag or rate a new video and it joins matching collections on its own."
  },
  {
    "id": "collections__collections-and-the-advanced-filter-work-together",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": "Collections and the Advanced Filter work together",
    "href": "/skagway/manual/collections#collections-and-the-advanced-filter-work-together",
    "title": "Collections & Albums » Collections and the Advanced Filter work together",
    "body": "Built a live Advanced Filter you want to keep? Click Save as Collection… in the drawer header.\nWant to tweak an existing collection interactively? Right-click it and choose Edit as Advanced Filter… — its rules load into the drawer.\nRight-click also offers Edit Collection… and Delete Collection."
  },
  {
    "id": "collections__albums-hand-picked-playlists",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": "Albums — hand-picked playlists",
    "href": "/skagway/manual/collections#albums-hand-picked-playlists",
    "title": "Collections & Albums » Albums — hand-picked playlists",
    "body": "Select some videos, right-click, and choose New Album from Selection… (or click New Album in the drawer for an empty one).\nAdd more videos anytime with right-click → Add to Album. New videos append to the end of the album order.\nWhile viewing an album, choose Sort → Album Order, then drag cards (or list rows) to rearrange. Multi-select moves as a block.\nWhile viewing an album, right-click a video and choose Remove from “album name” to take it out.\nRename or delete an album by right-clicking it in the Collections card (Rename Album… / Delete Album).\nAlbums use a stacked-rectangles icon; smart collections use a folder icon. Removing a video from an album never touches the file. Play All respects Album Order when that sort is active."
  },
  {
    "id": "organize__page",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": null,
    "href": "/skagway/manual/organize",
    "title": "Organize",
    "body": "Ratings, tags, and custom metadata in the Inspector.\nSelect a video and the Inspector on the right shows its preview, facts, and editable metadata: Title, rating stars, tags, and any custom fields you define."
  },
  {
    "id": "organize__title-display-name",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Title (display name)",
    "href": "/skagway/manual/organize#title-display-name",
    "title": "Organize » Title (display name)",
    "body": "Every video has a Title used for sorting, List view, and search. It can differ from the file name on disk.\nPress Return on a selected video (or right-click → Edit Title…) to edit it inline.\nImport Metadata can write Title; renaming the file with Rename File… or Bulk Rename… does not clear a custom Title."
  },
  {
    "id": "organize__subtitles",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Subtitles",
    "href": "/skagway/manual/organize#subtitles",
    "title": "Organize » Subtitles",
    "body": "In the Inspector, set Subtitles to None, Burned-in, Sidecar, or Burned-in + Sidecar so the badge and filters match how the video is captioned.\nSidecar .srt files next to the video are detected automatically — see the Playback page."
  },
  {
    "id": "organize__rate-videos",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Rate videos",
    "href": "/skagway/manual/organize#rate-videos",
    "title": "Organize » Rate videos",
    "body": "Select one or more videos and click a star in the RATING row — the rating applies to the whole selection.\nClick the same star again to clear the rating.\nRatings drive the Top Rated smart library, the Rating sort, and rating rules in filters and collections."
  },
  {
    "id": "organize__tag-videos",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Tag videos",
    "href": "/skagway/manual/organize#tag-videos",
    "title": "Organize » Tag videos",
    "body": "Assigned tags appear as chips at the top of the TAGS section — click a chip to unassign it.\nOpen the Add tags blind to see your other tags; click one to assign it to the selection.\nType a name in the New Tag field and press Return to create a tag and assign it in one step.\nRename or delete a tag by right-clicking it in the Quick Filter drawer’s Tags card. Deleting removes it from every video."
  },
  {
    "id": "organize__custom-metadata",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Custom metadata",
    "href": "/skagway/manual/organize#custom-metadata",
    "title": "Organize » Custom metadata",
    "body": "Define your own fields under Settings → Custom Metadata — for example “Featuring”, “Project”, or “Shoot Date”. Fields are stored in this library’s catalog.\nField types: String, Text, Number, Date, Date & Time, and Boolean.\nEdit values in the Inspector’s CUSTOM section for any selection.\nCustom fields show up everywhere: the Sort menu, List view columns, Advanced Filter rules, collection rules, and metadata export."
  },
  {
    "id": "organize__edit-many-at-once",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Edit many at once",
    "href": "/skagway/manual/organize#edit-many-at-once",
    "title": "Organize » Edit many at once",
    "body": "Select multiple videos (⌘-click, ⇧-click, or ⌘A) — the Inspector switches to “N Videos Selected”.\nRatings, tags, and custom values you set apply to every selected video.\nWhen selected videos have different values for a field, the Inspector shows “Multiple values” until you overwrite it."
  },
  {
    "id": "playback__page",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": null,
    "href": "/skagway/manual/playback",
    "title": "Playback",
    "body": "The floating player, bookmarks, resume, and subtitles.\nSkagway plays videos in a single floating player with custom transport controls — compact, windowed, or full screen — plus video bookmarks, saved resume positions, and automatic sidecar subtitles."
  },
  {
    "id": "playback__start-and-stop",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Start and stop",
    "href": "/skagway/manual/playback#start-and-stop",
    "title": "Playback » Start and stop",
    "body": "Select a video and press Space, double-click its grid card, or click Play in the Inspector.\nSpace toggles play/pause while the player is open.\nPress ⌥Space to play from the very beginning, ignoring any saved position.\nPress Esc (or the red traffic-light Stop) to stop — Skagway saves where you left off.\nIf focus is in a text field (Search, a custom metadata field, and so on), press Esc once first so Space plays the video instead of typing a space in the field."
  },
  {
    "id": "playback__transport-controls",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Transport controls",
    "href": "/skagway/manual/playback#transport-controls",
    "title": "Playback » Transport controls",
    "body": "The scrubber shows elapsed time, a progress track, and total duration. Hover along it for a live frame preview at that point; click to seek.\nSkip back / Skip forward 15 seconds (⌥← / ⌥→) from the transport bar or View menu.\nPlayback speed cycles through rates from 0.5× to 2×.\nMute and volume live on the same row — the volume slider collapses to mute-only when the player is narrow."
  },
  {
    "id": "playback__bookmarks",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Bookmarks",
    "href": "/skagway/manual/playback#bookmarks",
    "title": "Playback » Bookmarks",
    "body": "While a video is playing, press ⌥⌘B (View → Bookmark Current Position), click the bookmark button in the Inspector’s BOOKMARKS header, or double-click the scrubber at the moment you want.\nEach bookmark stores the exact time, a name (defaults to the timecode — click to rename), and a still frame.\nBookmarks appear as diamond ticks on the timeline and as a list under BOOKMARKS in the Inspector (stills, names, and times, ordered from start to finish).\nClick a tick, a still, or the play button on a bookmark row to jump there. If you jump while already watching, a return chip (↩) appears so you can get back to where you were — it lasts for that session only.\nDelete a bookmark with the trash button on its row — it is removed immediately, with no confirmation.\nBookmarks live in the library file. Their still frames are cached on this Mac — after Save Copy or moving the library elsewhere, the bookmarks still jump correctly; stills regenerate as you revisit them."
  },
  {
    "id": "playback__play-from-the-filmstrip",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Play from the filmstrip",
    "href": "/skagway/manual/playback#play-from-the-filmstrip",
    "title": "Playback » Play from the filmstrip",
    "body": "Switch the Inspector preview to Filmstrip (the Still / Filmstrip toggle, or ⌥⌘T) to see a grid of frames sampled across the whole video.\nClick any frame — playback starts right at that point in the video.\nIt’s the quickest way to jump to a scene you can already see, without scrubbing.\nClicking the Still preview starts playback too, from the beginning or the saved resume position."
  },
  {
    "id": "playback__three-sizes-one-player",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Three sizes, one player",
    "href": "/skagway/manual/playback#three-sizes-one-player",
    "title": "Playback » Three sizes, one player",
    "body": "Compact (⌃⌘C) — docks into the Inspector’s preview area and follows its size.\nWindowed (⌃⌘W) — a floating panel you can drag by its title bar and resize from the corner; size and position are remembered.\nFull screen (⌃⌘F) — edge to edge, without restarting playback. Esc stops playback; use the traffic lights or ⌃⌘F to leave full screen without stopping.\nThe player’s traffic lights also switch sizes: red stops; yellow and green jump between Compact, Windowed, and Full screen.\nChoose which size the player opens at under Settings → Video → Player opens at."
  },
  {
    "id": "playback__resume-where-you-left-off",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Resume where you left off",
    "href": "/skagway/manual/playback#resume-where-you-left-off",
    "title": "Playback » Resume where you left off",
    "body": "Reopening a partially watched video resumes automatically; a banner shows “Resumed at …” with a Start at beginning button.\nGrid cards show a thin progress bar for partially watched videos.\nResume is separate from bookmarks — resume is “where I stopped,” bookmarks are moments you chose to keep.\nThe banner can fade out on its own — see Settings → Video → Fade resume banner after delay."
  },
  {
    "id": "playback__live-preview",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Live Preview",
    "href": "/skagway/manual/playback#live-preview",
    "title": "Playback » Live Preview",
    "body": "Rest the pointer on a grid card for a moment and the thumbnail comes alive: a silent preview that skips through the video, playing short clips from start to finish.\nNo clicking, no scrubbing — it’s the fastest way to see what’s inside a video without opening it.\nOnly one card previews at a time, and Live Preview pauses automatically while the floating player is open.\nTurn it off or on under Settings → Video → Hover preview on Grid cards."
  },
  {
    "id": "playback__subtitles",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Subtitles",
    "href": "/skagway/manual/playback#subtitles",
    "title": "Playback » Subtitles",
    "body": "Put an .srt file next to the video with the same name (movie.mp4 → movie.srt; movie.en.srt also works) and Skagway can show it during playback.\nIn the Inspector, set Subtitles to None, Burned-in, Sidecar, or Burned-in + Sidecar so the grid badge and filters match reality.\nAdded subtitle files later? Run File → Scan for Subtitles to refresh detection."
  },
  {
    "id": "playback__external-players",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "External players",
    "href": "/skagway/manual/playback#external-players",
    "title": "Playback » External players",
    "body": "Press ⌘↩ (or right-click → Play in External Player) to open the video in its default macOS app.\nRight-click → Open With lists every installed app that can play the file.\nEither way, Skagway counts the play in the video’s play history."
  },
  {
    "id": "playback__capture-the-perfect-thumbnail",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Capture the perfect thumbnail",
    "href": "/skagway/manual/playback#capture-the-perfect-thumbnail",
    "title": "Playback » Capture the perfect thumbnail",
    "body": "While playing, pause or scrub to the exact frame you want.\nPress ⌥⌘M (Make Thumbnail from Current Frame) — that frame becomes the video’s thumbnail everywhere in Skagway.\nOr right-click → Set Poster from Image… (or drag an image onto a grid card) to use any still as the poster."
  },
  {
    "id": "file-operations__page",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": null,
    "href": "/skagway/manual/file-operations",
    "title": "File operations",
    "body": "Rename, bulk rename, move, re-encode, delete — with queues and safety nets.\nRight-click any video (or selection) for file operations. Long jobs — cross-volume moves and re-encodes — show as header pills and a bottom activity strip, and open managed queues that survive restarts."
  },
  {
    "id": "file-operations__everyday-actions",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Everyday actions",
    "href": "/skagway/manual/file-operations#everyday-actions",
    "title": "File operations » Everyday actions",
    "body": "Show in Finder (⌥⌘F) — reveal the file on disk.\nEdit Title… — press Return on a single selected video, or use the context menu. Changes the library display name only; the file on disk stays the same.\nRename File… — rename the file on disk from the context menu. Original File Name in the catalog is preserved for search and export.\nOpen With — open the file in any capable installed app."
  },
  {
    "id": "file-operations__bulk-rename",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Bulk Rename…",
    "href": "/skagway/manual/file-operations#bulk-rename",
    "title": "File operations » Bulk Rename…",
    "body": "File → Bulk Rename… renames every video in the current filtered view. Right-click → Bulk Rename… renames only the selection.\nBuild a Name pattern from fields (Identity, Media, Library, Custom) and these Special tokens:\nToken\nOptional arguments\nDescription\nExamples\n{Inc …}\nStarting number; digit width sets zero-padding\nSequential counter for each file in the batch\n{Inc 1}, {Inc 015}\n{Conflict …}\nPrefix + starting number\nEmpty when the new name is unique; on collision, inserts a disambiguator\n{Conflict -1}, {Conflict -01}\n{Stem}\nCase: lower|L, upper|U, title|T, Name|N\nCurrent file name without its extension\n{Stem}, {Stem lower}\n{Date …}\nDate format string\nToday’s date in the format you specify\n{Date yyyy-MM-dd}, {Date MMM-yyyy}\n{UUID8}\n—\nEight random hex characters, unique per file\n{UUID8}\nWatch the live Preview columns (Current File Name / New File Name / Status). Skipped rows show why (empty name, too long, illegal characters, collision).\nClick Rename N Files to apply. Skagway uses a two-phase rename so a cancel or crash can restore; a results sheet offers Retry Failed when needed.\nOriginal File Name is preserved in the catalog for search and export — bulk rename changes the file on disk, not that historical name."
  },
  {
    "id": "file-operations__move-files",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Move files",
    "href": "/skagway/manual/file-operations#move-files",
    "title": "File operations » Move files",
    "body": "Right-click → Move Files… and choose a destination folder (Move Here).\nMoves on the same volume are instant and do not appear in the Move Queue.\nCross-volume moves copy first, verify, then remove the original — a crash cannot lose the only copy.\nWhile work is running, the bottom activity strip and a header folder pill show progress (Moving N%). Click either, or choose View → Move Queue…, to open the queue.\nIn Move Queue you can Move to Top, Abort, Abort All, Retry failed jobs, Clear completed rows, or Dismiss a row."
  },
  {
    "id": "file-operations__fix-for-built-in-player-re-encode",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Fix for Built-in Player… (re-encode)",
    "href": "/skagway/manual/file-operations#fix-for-built-in-player-re-encode",
    "title": "File operations » Fix for Built-in Player… (re-encode)",
    "body": "Right-click → Fix for Built-in Player… converts a video to a widely compatible MP4 (H.264/AAC). This requires ffmpeg — set it up once under Settings → Tools.\nThe original file is kept as a _backup until you delete it, so nothing is lost if an encode fails or you change your mind.\nJobs run one at a time. The activity strip and a header re-encode pill show progress; click either, or View → Re-encode Queue…, to manage the queue.\nIn Re-encode Queue: Move to Top, Abort, Retry, Restore from backup, Delete Backup, Delete All Backups, Clear finished rows, or Dismiss. Rows can stay visible after success while a backup remains.\nFinished conversions appear in the Recently Converted smart library."
  },
  {
    "id": "file-operations__queue-pills-and-the-activity-strip",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Queue pills and the activity strip",
    "href": "/skagway/manual/file-operations#queue-pills-and-the-activity-strip",
    "title": "File operations » Queue pills and the activity strip",
    "body": "Busy work appears as text + percent in the bottom activity strip (for example Re-encode 42% or Moving 18% · +2).\nIcon-only capsules also appear in the header (to the right of the video count) when that job isn’t already featured in the strip — folder for moves, circular arrows for re-encode; failures use a warning style.\nSuccessful moves clear themselves from the queue when done. Re-encode rows often remain so you can still Restore or Delete Backup."
  },
  {
    "id": "file-operations__remove-vs-delete",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Remove vs. Delete",
    "href": "/skagway/manual/file-operations#remove-vs-delete",
    "title": "File operations » Remove vs. Delete",
    "body": "Remove from Library (⌥⌘R) — Skagway forgets the video but the file stays on disk. Rescanning the folder will bring it back.\nDelete Video… (⌘⌫) — moves the actual file to the Trash after a confirmation.\nYou can turn delete confirmations off under Settings → Library → Confirm deletions."
  },
  {
    "id": "file-operations__duplicates",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Duplicates",
    "href": "/skagway/manual/file-operations#duplicates",
    "title": "File operations » Duplicates",
    "body": "The Duplicates smart library groups videos whose file content matches — even if names differ.\nKeep the copy you want, then delete or remove the rest.\nFalse positive? Right-click → Not a Duplicate and Skagway remembers the exception."
  },
  {
    "id": "file-operations__fix-thumbnails-and-filmstrips",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Fix thumbnails and filmstrips",
    "href": "/skagway/manual/file-operations#fix-thumbnails-and-filmstrips",
    "title": "File operations » Fix thumbnails and filmstrips",
    "body": "Regenerate Thumbnail — picks a fresh frame for videos that landed on a black frame or title card. Works on multi-selections.\nSet Poster from Image… — choose any image file as the poster (also works by dragging an image onto a grid card).\nModify Filmstrip… — change the rows and columns of a video’s filmstrip preview.\nFor frame-perfect thumbnails from the current playback frame, use ⌥⌘M instead."
  },
  {
    "id": "export-import__page",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": null,
    "href": "/skagway/manual/export-import",
    "title": "Export / Import",
    "body": "Metadata as CSV or JSON Lines, plus library copies.\nYour titles, ratings, tags, plays, resume positions, and custom fields are yours to take: export them to CSV or JSON Lines (with clear match / importable / export-only field groups), import them into another library, and copy the whole catalog file for backup."
  },
  {
    "id": "export-import__export-metadata-e",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Export Metadata… (⌥⌘E)",
    "href": "/skagway/manual/export-import#export-metadata-e",
    "title": "Export / Import » Export Metadata… (⌥⌘E)",
    "body": "File → Export Metadata… exports every video currently shown — filters and search included. Right-click → Export Metadata… exports just the selection.\nPick CSV (for spreadsheets) or JSON Lines (for scripts and tools).\nFields are grouped: Match keys (Path, Content Fingerprint — used to find videos on import), Importable (Title, Rating, Tags, Subtitles, Plays, Resume Position, and custom fields — written back by Import Metadata), and Export only (File Name, Original File Name, Last Played, size, duration, codec, and other read-only facts).\nCheck the fields you want; checked fields stay at the top of each section. Drag to reorder within a section.\nYour format and field choices are remembered for next time."
  },
  {
    "id": "export-import__import-metadata-i",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Import Metadata… (⌥⌘I)",
    "href": "/skagway/manual/export-import#import-metadata-i",
    "title": "Export / Import » Import Metadata… (⌥⌘I)",
    "body": "File → Import Metadata… opens a previously exported CSV or JSON Lines file — the format is detected automatically.\nRows are matched by Path first, then by Content Fingerprint — not by Database ID — so a file that moved can still be matched.\nImportable values are applied when they differ: Title, Rating, Subtitles, Plays, Resume Position, custom fields; tags are merged in (importing never removes a tag).\nUnknown columns can be skipped or imported as new Custom Metadata fields (you’ll see Column, Sample, and Type) — use Skip all or Import selected.\nA summary shows Matched / Updated / Unmatched — with Review unmatched… for leftovers — then Done.\nEverything the import touched is collected in the Last Metadata Import smart library so you can review the result."
  },
  {
    "id": "export-import__save-copy-back-up-the-catalog",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Save Copy… — back up the catalog",
    "href": "/skagway/manual/export-import#save-copy-back-up-the-catalog",
    "title": "Export / Import » Save Copy… — back up the catalog",
    "body": "File → Save Copy… writes a timestamped duplicate of the library file (for example Skagway-20260716-224500.machii).\nThe current library stays open; the copy is completely independent.\nOpen a copy anytime with File → Open Library…."
  },
  {
    "id": "export-import__when-to-use-which",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "When to use which",
    "href": "/skagway/manual/export-import#when-to-use-which",
    "title": "Export / Import » When to use which",
    "body": "Save Copy… — a full snapshot before a big reorganization.\nExport + Import — move ratings and tags between libraries or Macs, or bulk-edit metadata in a spreadsheet and bring it back.\nExport alone — feed your library data to any external tool."
  },
  {
    "id": "keyboard__page",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": null,
    "href": "/skagway/manual/keyboard",
    "title": "Keyboard",
    "body": "The complete shortcut map.\nSkagway is built for keyboard-driven triage. One modifier scheme throughout: ⌥ marks an alternate action, ⇧ reveals or adds something, and ⌃ is reserved for player sizing."
  },
  {
    "id": "keyboard__views-and-navigation",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": "Views and navigation",
    "href": "/skagway/manual/keyboard#views-and-navigation",
    "title": "Keyboard » Views and navigation",
    "body": "⌘1 / ⌘2 — Grid view / List view.\n← → ↑ ↓ — move the selection through the grid.\nHome / End — jump to the first / last video.\n⌘J — scroll the selection back into view.\n⌘A / ⇧⌘A — select all / deselect all.\nReturn — edit the selected video’s Title (display name). Esc — cancel editing (or stop playback).\n⌥⌘T — toggle the Inspector between Still and Filmstrip."
  },
  {
    "id": "keyboard__search-filters-and-play-all",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": "Search, filters, and Play All",
    "href": "/skagway/manual/keyboard#search-filters-and-play-all",
    "title": "Keyboard » Search, filters, and Play All",
    "body": "⌘F — focus Search videos.\n⇧⌘F — open / close Quick Filter.\n⇧⌘V — open / close Advanced Filter.\n⌥⌘C — clear filters.\n⇧⌘P — Play All (current filtered view).\n⇧⌘S — Surprise Me! (jump to a random video).\n⇧⌘R — Shuffle the view order (toolbar)."
  },
  {
    "id": "keyboard__playback",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": "Playback",
    "href": "/skagway/manual/keyboard#playback",
    "title": "Keyboard » Playback",
    "body": "Space — play / pause the selected video.\n⌥Space — play from the beginning (ignore the resume position).\n⌥← / ⌥→ — skip back / forward 15 seconds.\n⌥⌘B — bookmark the current position (while playing).\n⌃⌘C / ⌃⌘W / ⌃⌘F — Compact / Windowed / Toggle Full Screen.\nEsc — stop playback (position is saved).\n⌥⌘M — make a thumbnail from the current frame.\n⌘↩ — play in the external player."
  },
  {
    "id": "keyboard__files-and-metadata",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": "Files and metadata",
    "href": "/skagway/manual/keyboard#files-and-metadata",
    "title": "Keyboard » Files and metadata",
    "body": "⇧⌘O — Add Folder…\n⌥⌘F — Show in Finder.\n⌥⌘E / ⌥⌘I — Export / Import Metadata.\n⌥⌘R — Remove from Library (file stays on disk).\n⌘⌫ — Delete… (file moves to Trash).\n⌘, — Settings…"
  },
  {
    "id": "settings__page",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": null,
    "href": "/skagway/manual/settings",
    "title": "Settings",
    "body": "Every tab in Skagway → Settings…\nOpen Settings with ⌘, (a library must be open for library-specific tabs). Six tabs: Library, Video, Data Sources, Extensions, Tools, and Custom Metadata."
  },
  {
    "id": "settings__library",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Library",
    "href": "/skagway/manual/settings#library",
    "title": "Settings » Library",
    "body": "Exclude corrupt files from filters — hides unreadable files from normal browsing; they stay visible in the Corrupt smart library and in search.\nConfirm deletions — ask before moving files to the Trash.\nChange Library Location… / Change Thumbnail Cache Location… — move this library’s catalog or its per-library thumbnail cache.\nAutomatically check for updates — off by default; optional Sparkle checks do not send usage analytics.\nSmart Libraries — choose which smart libraries appear, and tune Recently Added / Recently Played day windows and the Top Rated star threshold.\nList view columns — pick the columns List view shows (Title is always on)."
  },
  {
    "id": "settings__video",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Video",
    "href": "/skagway/manual/settings#video",
    "title": "Settings » Video",
    "body": "Default Filmstrip Size — rows and columns for filmstrip previews, with a Regenerate filmstrips button.\nSurprise Me! auto-plays selected video — jump and play, or just jump.\nLoop Play All — whether Play All repeats the view when it reaches the end.\nHover preview on Grid cards — the silent moving preview on hover.\nTag blind default state / Filter drawer height — how the Inspector tags list and Quick Filter drawer remember size.\nPlayer opens at — Compact, Full screen, or Last used size.\nFade resume banner after delay — whether and when the “Resumed at…” banner fades out."
  },
  {
    "id": "settings__data-sources",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Data Sources",
    "href": "/skagway/manual/settings#data-sources",
    "title": "Settings » Data Sources",
    "body": "The folders Skagway scans, in one list — Add Folder…, Show in Finder, Exclude… a nested subfolder from scanning, or Remove.\nAdding a folder here just registers it; run File → Scan for New Videos to index its contents.\nRemoving a folder doesn’t remove already-indexed videos from the library. Exclude… skips a subfolder on future scans without removing the parent source."
  },
  {
    "id": "settings__extensions",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Extensions",
    "href": "/skagway/manual/settings#extensions",
    "title": "Settings » Extensions",
    "body": "Check or uncheck which file extensions count as video during scans.\nAdd unusual extensions with the Add extension field.\nReset to defaults restores the standard list."
  },
  {
    "id": "settings__tools",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Tools",
    "href": "/skagway/manual/settings#tools",
    "title": "Settings » Tools",
    "body": "FFmpeg — required only for Fix for Built-in Player… (re-encode to MP4). Skagway auto-detects Homebrew and /usr/local installs.\nInstalled somewhere unusual? Use Choose… to point at the ffmpeg binary directly."
  },
  {
    "id": "settings__custom-metadata",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Custom Metadata",
    "href": "/skagway/manual/settings#custom-metadata",
    "title": "Settings » Custom Metadata",
    "body": "Define your own fields for this library: a name plus a type (String, Text, Number, Date, Date & Time, or Boolean).\nValues are edited per video in the Inspector, and fields flow through to sorting, List columns, filters, collections, and export."
  },
  {
    "id": "privacy__page",
    "pageSlug": "privacy",
    "pageTitle": "Privacy",
    "sectionTitle": null,
    "href": "/skagway/manual/privacy",
    "title": "Privacy",
    "body": "Your library stays on your Mac.\nSkagway does not send usage analytics or library data anywhere. There is no account and no cloud sync. Optional update checks are off by default and only ask whether a newer build exists."
  },
  {
    "id": "privacy__where-your-data-lives",
    "pageSlug": "privacy",
    "pageTitle": "Privacy",
    "sectionTitle": "Where your data lives",
    "href": "/skagway/manual/privacy#where-your-data-lives",
    "title": "Privacy » Where your data lives",
    "body": "The library catalog: the .machii file you created (by default in ~/Library/Application Support/Skagway/).\nThumbnails and filmstrips: each library’s own cache (system Caches, a Skagway-cache folder next to the library, or a folder you chose).\nSettings: standard macOS preferences on your Mac — library location bookmarks, not plain paths, when you use Remember this location.\nYour video files: exactly where you put them. Skagway never relocates, re-wraps, or uploads them."
  },
  {
    "id": "privacy__network-and-updates",
    "pageSlug": "privacy",
    "pageTitle": "Privacy",
    "sectionTitle": "Network and updates",
    "href": "/skagway/manual/privacy#network-and-updates",
    "title": "Privacy » Network and updates",
    "body": "No telemetry, no analytics, and no automatic upload of library paths, play history, or browsing behavior.\nSkagway → Check for Updates… and Settings → Automatically check for updates use Sparkle against downloads.machiilabs.com — only when you ask, or when you turn automatic checks on.\nHelp → Skagway Help opens this manual in your browser. Contact Support… opens your email client to support@machiilabs.com."
  },
  {
    "id": "privacy__getting-help",
    "pageSlug": "privacy",
    "pageTitle": "Privacy",
    "sectionTitle": "Getting help",
    "href": "/skagway/manual/privacy#getting-help",
    "title": "Privacy » Getting help",
    "body": "Email support@machiilabs.com — a human reads it.\nNothing about your library is ever sent automatically. If a bug report would help, you write it and you send it."
  }
];
