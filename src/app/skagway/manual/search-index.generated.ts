/* eslint-disable */
/**
 * AUTO-GENERATED FILE — do not edit by hand.
 *
 * Source of truth: ./manual.ts (via ./search-documents.ts)
 * Regenerate: npm run manual:index
 * (also runs on predev / prebuild)
 *
 * Generated: 2026-09-18T02:00:08.098Z
 * Documents: 79
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
    "body": "Choose where Skagway stores its data, then add your first videos.\nThe first time you run Skagway, you choose where the catalog and thumbnail cache live. Then an empty home library opens so you can add videos."
  },
  {
    "id": "first-launch__what-skagway-stores",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "What Skagway stores",
    "href": "/skagway/manual#what-skagway-stores",
    "title": "First launch » What Skagway stores",
    "body": "A library is Skagway’s catalog — titles, thumbnails, ratings, tags, bookmarks, and collections. Your video files stay where they are.\nSkagway does not modify or protect source media. Put sensitive files on an encrypted volume if you need that at the disk level.\nEach library keeps its own thumbnail cache. Opening one library never depends on another volume’s cache."
  },
  {
    "id": "first-launch__choose-where-skagway-stores-its-data",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Choose where Skagway stores its data",
    "href": "/skagway/manual#choose-where-skagway-stores-its-data",
    "title": "First launch » Choose where Skagway stores its data",
    "body": "Use standard location on this Mac — library under Application Support; cache under ~/Library/Caches/Skagway/.\nChoose Folder… — pick a folder yourself (for example on an encrypted or external volume).\nIf you chose a custom folder, Skagway asks Where should this library’s cache live?\nCo-locate with library — a Skagway-cache folder next to the library.\nSystem default — this library’s cache under ~/Library/Caches/Skagway.\nChoose Folder… — pick any folder for this library’s thumbnails.\nThen Skagway asks How should Skagway find this library?\nRemember this location — Skagway can reopen it next time.\nAsk every time I open Skagway — you open the library file each launch.\nNothing leaves your Mac by default — no account, no cloud sync, no usage analytics. Optional update checks stay off unless you turn them on later; they only ask whether a newer Skagway build exists."
  },
  {
    "id": "first-launch__your-library-opens",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Your library opens",
    "href": "/skagway/manual#your-library-opens",
    "title": "First launch » Your library opens",
    "body": "After setup, Skagway relaunches briefly — that is normal.\nWith Use standard location or Remember this location, Skagway opens your home library automatically (and creates an empty .machii catalog if needed).\nIf you chose Ask every time I open Skagway, no library is remembered — use File → Open Library…, New Library…, or Open Recent."
  },
  {
    "id": "first-launch__add-your-first-videos",
    "pageSlug": "first-launch",
    "pageTitle": "First launch",
    "sectionTitle": "Add your first videos",
    "href": "/skagway/manual#add-your-first-videos",
    "title": "First launch » Add your first videos",
    "body": "An empty library shows Drag videos here — drop video files or folders onto that area.\nOr click Add Files… and select video files or folders, then Add.\nYou can also choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.\nSkagway indexes recognized videos and builds thumbnails in the background.\nFolders you add are saved as Data Sources so Skagway can scan them later. Change their locations later from the File menu."
  },
  {
    "id": "library__page",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": null,
    "href": "/skagway/manual/library",
    "title": "Library",
    "body": "Add folders, keep the catalog current, manage .machii files.\nThe File menu holds everything about the library itself: which folders Skagway watches, scanning for new files, reconnecting missing paths, and creating, opening, copying, or deleting .machii library files."
  },
  {
    "id": "library__add-your-video-folders",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Add your video folders",
    "href": "/skagway/manual/library#add-your-video-folders",
    "title": "Library » Add your video folders",
    "body": "In an empty library, drag files or folders onto Drag videos here, or click Add Files….\nOr choose File → Add Folder… (⇧⌘O), pick folders, and click Scan.\nSkagway indexes recognized videos (subfolders included) and builds thumbnails in the background.\nAdded folders are registered as Data Sources automatically.\nManage those folders under Settings → Data Sources. Your files stay where they are on disk."
  },
  {
    "id": "library__keep-the-library-current",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Keep the library current",
    "href": "/skagway/manual/library#keep-the-library-current",
    "title": "Library » Keep the library current",
    "body": "Scan for New Videos — checks watched folders for files added since the last scan. New ones appear in Last Added.\nScan for Subtitles — re-checks the current view for matching .srt files and updates subtitle badges.\nScan for New Videos is also available as a button on the toolbar."
  },
  {
    "id": "library__create-open-and-switch-libraries",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Create, open, and switch libraries",
    "href": "/skagway/manual/library#create-open-and-switch-libraries",
    "title": "Library » Create, open, and switch libraries",
    "body": "Open Home Library / Create Home Library — the library at your chosen home location.\nNew Library… — create a separate .machii catalog.\nOpen Library… — open any existing .machii file.\nOpen Recent — recently used libraries.\nChange Library Location… — run the first-launch location setup again for the catalog.\nChange Thumbnail Cache Location… — move this library’s thumbnail cache.\nClose Library… — close the catalog. Reopen it from the File menu.\nSwitching libraries does not delete the one you left. Skagway restarts briefly."
  },
  {
    "id": "library__reconnect-missing-files",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Reconnect missing files",
    "href": "/skagway/manual/library#reconnect-missing-files",
    "title": "Library » Reconnect missing files",
    "body": "When clips can’t be found on disk, a banner appears (also when you focus a Missing clip). Click Reconnect… — same sheet as File → Reconnect….\nAdd destination… for each folder that now holds the missing clips. Those folders are Evidence Destinations — Skagway matches by filename (and soft size) only under folders you choose.\nThe preview groups Ready, Needs attention, and Unmatched. Confirm reconnect updates library paths only; ratings, tags, and collections stay put. Unmatched clips remain Missing.\nEdit → Undo Reconnect reverses the last reconnect session.\nAn unplugged drive shows as Missing without forcing reconnect — open Reconnect when the volume is back."
  },
  {
    "id": "library__copy-or-delete-the-library-file",
    "pageSlug": "library",
    "pageTitle": "Library",
    "sectionTitle": "Copy or delete the library file",
    "href": "/skagway/manual/library#copy-or-delete-the-library-file",
    "title": "Library » Copy or delete the library file",
    "body": "Save Copy… — writes a timestamped duplicate wherever you choose. The original stays open; open the copy later with Open Library….\nDelete This Library… — deletes the .machii catalog after a confirmation. Your video files are not touched.\nBackups and moving metadata between libraries are covered in more detail."
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
    "body": "Grid, List, and Storyboard views, selection, sorting, Play All, search, and fast navigation.\nBrowse the library as a thumbnail Grid, a column-based List, or a Storyboard collage wall, collect clips with ordinary multi-select gestures, sort by any field, Play All through the current view, and search across titles, filenames, tags, and custom fields — built to stay fast at thousands of videos."
  },
  {
    "id": "browse__grid-and-list",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Grid and List",
    "href": "/skagway/manual/browse#grid-and-list",
    "title": "Browse » Grid and List",
    "body": "Switch views with the Grid / List / Storyboard control in the toolbar, or press ⌘1 for Grid and ⌘2 for List.\nGrid cards show the thumbnail, Title, duration, date, and rating. A captions badge and a watch-progress bar appear when relevant.\nPlain click focuses a clip — a dashed ring on Grid, the table highlight in List. That is the clip the Inspector shows when you are not batch-editing a collected set.\n⌘-click and ⇧-click add clips to the collected set, the same Finder-style multi-select you already know. Collected clips show a blue checkmark. Press A to add or remove the focused clip.\nWith two or more collected, the Inspector edits the whole set (orange title bar). Click a collected clip once to batch-edit the set; click it again to inspect just that clip (light blue title bar). Repeat clicks toggle between the two.\nA pill above the grid or list shows how many clips are collected. Click ✕ or press ⇧⌘A to clear the set.\nHold the pointer over a grid card or List thumbnail for Live Preview — see Playback.\nDouble-click a grid card or List row to play it inside Skagway.\nTags and ratings apply to the Inspector’s current target — one focused clip, or every collected clip when the orange batch bar is showing."
  },
  {
    "id": "browse__storyboard-view",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Storyboard view",
    "href": "/skagway/manual/browse#storyboard-view",
    "title": "Browse » Storyboard view",
    "body": "Press ⌘3 (or choose Storyboard in the toolbar) for a six-frame collage of each clip — useful when a single poster isn’t enough to tell clips apart.\nCompact packs more columns; Normal (the default) uses fewer columns with more space. The density control appears in the toolbar while Storyboard is active.\nClick a frame once to focus the clip; click the same focused collage again to seek and play from that sample time. Click the title or footer chrome anytime to select without starting playback.\nCollection and focus work the same as Grid — ⌘-click, ⇧-click, and A. Hover preview is off in Storyboard; use the collage frames instead.\nInspector Filmstrip (⌥⌘T) is a separate single-clip preview — not Storyboard view."
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
    "body": "Open the Sort menu to order by Title, Date Added, Duration, File Size, Rating, Resolution, or Plays — plus any custom fields you’ve defined.\nWhile viewing an album, Album Order appears at the top of the Sort menu.\nClick the arrow beside the Sort menu to flip between ascending and descending.\nShuffle (⇧⌘R) puts the whole view in a random order; picking any sort exits it. Click Shuffle again to reshuffle.\nSurprise Me! (⇧⌘S) jumps to one random video — and can auto-play it (Settings → Video)."
  },
  {
    "id": "browse__play-all",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Play All",
    "href": "/skagway/manual/browse#play-all",
    "title": "Browse » Play All",
    "body": "Play All (⇧⌘P) plays the current view from the first playable video and advances when each one finishes.\nLoop Play All repeats the list. Stopping or playing a single video ends the session."
  },
  {
    "id": "browse__search",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Search",
    "href": "/skagway/manual/browse#search",
    "title": "Browse » Search",
    "body": "Press ⌘F or click the Search videos field, then type part of what you’re looking for.\nSearch matches Title, file names, tags, and custom fields.\nMultiple words narrow the results — every word must appear somewhere, not necessarily in the same field.\nClick the × in the field (or clear it) to show the full library again.\nFor ratings, duration, quality, and other structured criteria, use the filters."
  },
  {
    "id": "browse__getting-around-quickly",
    "pageSlug": "browse",
    "pageTitle": "Browse",
    "sectionTitle": "Getting around quickly",
    "href": "/skagway/manual/browse#getting-around-quickly",
    "title": "Browse » Getting around quickly",
    "body": "Arrow keys move focus through the grid, list, or storyboard without clearing collected checkmarks. Home and End jump to the first and last video.\n⌘J scrolls the focused clip back into view.\n⌘-click toggles a clip in the collected set; ⇧-click adds a range from the last click. ⌘A selects every video in the current view. ⇧⌘A clears the collected set."
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
    "body": "Click the filter button in the toolbar or press ⇧⌘F to open the Quick Filter drawer above the grid.\nCombine a Smart Library, collection, or album with rating, duration, quality, and tags.\nClick No Stars or a star rating. Or Higher includes that rating and every higher one.\nTags can match Any or All of the selected tags.\nEverything you pick applies together. Search still works on top."
  },
  {
    "id": "filter__smart-libraries",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Smart Libraries",
    "href": "/skagway/manual/filter#smart-libraries",
    "title": "Filter » Smart Libraries",
    "body": "All Videos — the whole library.\nRecently Added / Recently Played — videos from the last N days (N is set in Settings → Library).\nTop Rated — videos at or above your chosen star threshold.\nDuplicates — videos whose file content matches another video, grouped by fingerprint.\nCorrupt — files Skagway couldn’t read metadata or a thumbnail from.\nMissing — files whose path no longer exists (unmounted drive, moved file). Click the refresh arrow to rescan. Reconnect… (banner or File menu) points Skagway at new locations.\nLast Added — videos found by the most recent Scan for New Videos.\nRecently Converted and Last Metadata Import appear after you use re-encoding or metadata import.\nChoose which Smart Libraries appear under Settings → Library → Smart Libraries."
  },
  {
    "id": "filter__advanced-filter-v",
    "pageSlug": "filter",
    "pageTitle": "Filter",
    "sectionTitle": "Advanced Filter (⇧⌘V)",
    "href": "/skagway/manual/filter#advanced-filter-v",
    "title": "Filter » Advanced Filter (⇧⌘V)",
    "body": "Press ⇧⌘V to switch the drawer to the Advanced Filter rule editor.\nBuild rules on any video attribute or custom field. Operators change to match the attribute.\nGroup rules with ALL or ANY — for example (Tag is Vacation AND Rating ≥ 4) OR Tag is Favorite.\nClick Save as Collection… to keep the rule set permanently.\nQuick Filter and Advanced Filter are exclusive — opening one clears the other, so they never combine unexpectedly."
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
    "body": "Open the Quick Filter drawer (⇧⌘F) and click New Collection in the Collections card.\nName it, then add rules — the same attributes and operators as Advanced Filter, with ALL/ANY groups.\nClick Create. The collection stays up to date as you tag and rate."
  },
  {
    "id": "collections__collections-and-the-advanced-filter-work-together",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": "Collections and the Advanced Filter work together",
    "href": "/skagway/manual/collections#collections-and-the-advanced-filter-work-together",
    "title": "Collections & Albums » Collections and the Advanced Filter work together",
    "body": "To keep a live Advanced Filter, click Save as Collection… in the drawer header.\nRight-click a collection for Edit as Advanced Filter…, Edit Collection…, or Delete Collection."
  },
  {
    "id": "collections__albums-hand-picked-playlists",
    "pageSlug": "collections",
    "pageTitle": "Collections & Albums",
    "sectionTitle": "Albums — hand-picked playlists",
    "href": "/skagway/manual/collections#albums-hand-picked-playlists",
    "title": "Collections & Albums » Albums — hand-picked playlists",
    "body": "Select videos, right-click, and choose New Album from Selection… — or New Album in the drawer for an empty one.\nAdd more with right-click → Add to Album.\nWith Sort → Album Order, drag cards or rows to rearrange.\nRight-click a video to Remove it from the album, or right-click the album to rename or delete it.\nRemoving a video from an album never touches the file. Play All uses Album Order when that sort is active."
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
    "id": "organize__hide-show-inspector",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Hide / Show Inspector",
    "href": "/skagway/manual/organize#hide-show-inspector",
    "title": "Organize » Hide / Show Inspector",
    "body": "Press ⌘I, choose View → Inspector, or click the Inspector button in the toolbar to hide or show the right-hand pane.\nHiding gives the Grid, List, or Storyboard the full window width. Showing restores the Inspector at the last width you dragged.\nWhile the Inspector is hidden, Compact playback is unavailable — the player stays Windowed until you show the Inspector again.\nWith two or more clips collected, click the “N clips collected” pill to show the Inspector in batch-edit mode."
  },
  {
    "id": "organize__title-display-name",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Title (display name)",
    "href": "/skagway/manual/organize#title-display-name",
    "title": "Organize » Title (display name)",
    "body": "Title is the display name used for sorting, List view, and search. It can differ from the file name.\nPress Return (or right-click → Edit Title…) to edit it.\nRenaming the file does not change Title."
  },
  {
    "id": "organize__subtitles",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Subtitles",
    "href": "/skagway/manual/organize#subtitles",
    "title": "Organize » Subtitles",
    "body": "Set Subtitles in the Inspector so the badge and filters match how the video is captioned.\nSidecar .srt files next to the video are detected automatically — see Playback."
  },
  {
    "id": "organize__rate-videos",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Rate videos",
    "href": "/skagway/manual/organize#rate-videos",
    "title": "Organize » Rate videos",
    "body": "Select one or more videos and click a star in the RATING row.\nClick the same star again to clear the rating."
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
    "body": "Define your own fields under Settings → Custom Metadata.\nField types: String, Text, Number, Date, Date & Time, and Boolean.\nEdit values in the Inspector’s CUSTOM section for any selection.\nCustom fields show up in search, sort, List columns, filters, collections, and export."
  },
  {
    "id": "organize__edit-many-at-once",
    "pageSlug": "organize",
    "pageTitle": "Organize",
    "sectionTitle": "Edit many at once",
    "href": "/skagway/manual/organize#edit-many-at-once",
    "title": "Organize » Edit many at once",
    "body": "Collect two or more clips (⌘-click, ⇧-click, A, or ⌘A) — the Inspector shows an orange “N Videos Selected” bar and edits apply to the whole set.\nWhile scanning, arrow through clips and collect keepers without losing earlier picks — see Browse.\nRatings, tags, and custom values you set apply to every collected video in batch mode.\nWhen collected videos have different values for a field, the Inspector shows “Multiple values” until you overwrite it.\nClick a collected clip once for batch mode; click it again to edit that clip alone."
  },
  {
    "id": "playback__page",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": null,
    "href": "/skagway/manual/playback",
    "title": "Playback",
    "body": "The floating player, bookmarks, resume, and subtitles.\nSkagway plays videos in a single floating player — compact, windowed, or full screen — plus Play All through the current view, bookmarks, resume positions, and sidecar subtitles."
  },
  {
    "id": "playback__start-and-stop",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Start and stop",
    "href": "/skagway/manual/playback#start-and-stop",
    "title": "Playback » Start and stop",
    "body": "Select a video and press Space, double-click its grid card, or click Play in the Inspector.\nSpace toggles play/pause while the player is open.\nPress ⌥Space to play from the very beginning, ignoring any saved position.\nPress Esc (or the red traffic-light Stop) to stop — Skagway saves where you left off.\nIf focus is in a text field, press Esc once first so Space plays instead of typing."
  },
  {
    "id": "playback__play-all-p",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Play All (⇧⌘P)",
    "href": "/skagway/manual/playback#play-all-p",
    "title": "Playback » Play All (⇧⌘P)",
    "body": "Play All (⇧⌘P) plays the current view and advances when each video finishes.\nLoop Play All repeats the list. Stopping or playing a single video ends the session.\nAlbum Order is the sequence Play All uses when you are in an album. For search and sort, see Browse."
  },
  {
    "id": "playback__transport-controls",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Transport controls",
    "href": "/skagway/manual/playback#transport-controls",
    "title": "Playback » Transport controls",
    "body": "Hover the scrubber for a frame preview; click to seek.\nSkip back / forward 15 seconds with ⌥← / ⌥→.\nPlayback speed cycles from 0.5× to 2×."
  },
  {
    "id": "playback__bookmarks",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Bookmarks",
    "href": "/skagway/manual/playback#bookmarks",
    "title": "Playback » Bookmarks",
    "body": "While playing, press ⌥⌘B or double-click the scrubber.\nBookmarks appear as diamonds on the timeline and as a list in the Inspector — click one to jump there, or delete it from its row.\nBookmarks live in the library file. Still frames regenerate if you move the library."
  },
  {
    "id": "playback__play-from-the-filmstrip",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Play from the filmstrip",
    "href": "/skagway/manual/playback#play-from-the-filmstrip",
    "title": "Playback » Play from the filmstrip",
    "body": "Switch the Inspector preview to Filmstrip (⌥⌘T) to see frames sampled across the video.\nClick a frame to start playback there.\nClicking the Still preview starts playback too, from the beginning or the saved resume position. Filmstrip is the Inspector preview for one focused clip — Storyboard view (⌘3) is the library collage wall."
  },
  {
    "id": "playback__three-sizes-one-player",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Three sizes, one player",
    "href": "/skagway/manual/playback#three-sizes-one-player",
    "title": "Playback » Three sizes, one player",
    "body": "Compact (⌃⌘C) — docks into the Inspector preview. Requires the Inspector to be visible; if it is hidden, Compact is unavailable until you show it (⌘I).\nWindowed (⌃⌘W) — a floating panel; size and position are remembered.\nFull screen (⌃⌘F) — edge to edge without restarting. Esc stops; ⌃⌘F or the traffic lights leave full screen without stopping.\nChoose the opening size under Settings → Video → Player opens at."
  },
  {
    "id": "playback__resume-where-you-left-off",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Resume where you left off",
    "href": "/skagway/manual/playback#resume-where-you-left-off",
    "title": "Playback » Resume where you left off",
    "body": "Reopening a partially watched video resumes automatically. A banner offers Start at beginning.\nGrid cards show a thin progress bar. The banner can fade — see Settings → Video."
  },
  {
    "id": "playback__live-preview",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Live Preview",
    "href": "/skagway/manual/playback#live-preview",
    "title": "Playback » Live Preview",
    "body": "Rest the pointer on a grid card or List thumbnail for a silent preview through the video.\nIn List view, the enlarged preview opens beside the row. It pauses while the player is open.\nToggle it under Settings → Video → Hover preview on Grid and List."
  },
  {
    "id": "playback__subtitles",
    "pageSlug": "playback",
    "pageTitle": "Playback",
    "sectionTitle": "Subtitles",
    "href": "/skagway/manual/playback#subtitles",
    "title": "Playback » Subtitles",
    "body": "Put an .srt file next to the video with the same name (movie.mp4 → movie.srt; movie.en.srt also works).\nSet Subtitles in the Inspector so the badge and filters match. File → Scan for Subtitles if you add files later."
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
    "body": "Rename, bulk rename, move, re-encode, delete — with queues and safety nets.\nRight-click any video (or selection) for file operations. Long jobs show progress in the bottom activity strip and open queues that survive restarts."
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
    "body": "File → Bulk Rename… renames every video in the current filtered view. Right-click → Bulk Rename… renames only the selection.\nBuild a Name pattern from fields (Identity, Media, Library, Custom) and these Special tokens:\nToken\nOptional arguments\nDescription\nExamples\n{Inc …}\nStarting number; digit width sets zero-padding\nSequential counter for each file in the batch\n{Inc 1}, {Inc 015}\n{Conflict …}\nPrefix + starting number\nEmpty when the new name is unique; on collision, inserts a disambiguator\n{Conflict -1}, {Conflict -01}\n{Stem}\nCase: lower|L, upper|U, title|T, Name|N\nCurrent file name without its extension\n{Stem}, {Stem lower}\n{Date …}\nDate format string\nToday’s date in the format you specify\n{Date yyyy-MM-dd}, {Date MMM-yyyy}\n{UUID8}\n—\nEight random hex characters, unique per file\n{UUID8}\nWatch the live Preview columns. Skipped rows show why.\nClick Rename N Files to apply. A results sheet offers Retry Failed if anything goes wrong.\nOriginal File Name is preserved in the catalog for search and export — bulk rename changes the file on disk, not that historical name."
  },
  {
    "id": "file-operations__move-files",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Move files",
    "href": "/skagway/manual/file-operations#move-files",
    "title": "File operations » Move files",
    "body": "Right-click → Move Files… and choose a destination folder (Move Here).\nMoves on the same volume are instant and do not appear in the Move Queue.\nCross-volume moves copy first, verify, then remove the original — a crash cannot lose the only copy.\nCross-volume progress shows in the bottom activity strip. Click the strip or View → Move Queue… to abort, retry, or reorder."
  },
  {
    "id": "file-operations__fix-for-built-in-player-re-encode",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Fix for Built-in Player… (re-encode)",
    "href": "/skagway/manual/file-operations#fix-for-built-in-player-re-encode",
    "title": "File operations » Fix for Built-in Player… (re-encode)",
    "body": "Right-click → Fix for Built-in Player… converts a video to a widely compatible MP4 (H.264/AAC). This requires ffmpeg — set it up once under Settings → Tools.\nThe original file is kept as a _backup until you delete it, so nothing is lost if an encode fails or you change your mind.\nJobs run one at a time. Open the queue from the activity strip, the header pill after it finishes, or View → Re-encode Queue… — restore or delete backups there.\nFinished conversions appear in Recently Converted."
  },
  {
    "id": "file-operations__queue-pills-and-the-activity-strip",
    "pageSlug": "file-operations",
    "pageTitle": "File operations",
    "sectionTitle": "Queue pills and the activity strip",
    "href": "/skagway/manual/file-operations#queue-pills-and-the-activity-strip",
    "title": "File operations » Queue pills and the activity strip",
    "body": "Busy work appears as text + percent in the bottom activity strip (for example Re-encode 42% or Moving 18% · +2).\nAfter a re-encode finishes, a circular-arrows pill stays in the header so you can still open the queue. Moves use the activity strip only; successful ones clear themselves.\nRe-encode rows stay while a backup remains."
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
    "body": "Metadata as CSV or JSON Lines, plus library copies.\nExport titles, ratings, tags, and other metadata as CSV or JSON Lines, import them into another library, or copy the catalog file for backup."
  },
  {
    "id": "export-import__export-metadata-e",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Export Metadata… (⌥⌘E)",
    "href": "/skagway/manual/export-import#export-metadata-e",
    "title": "Export / Import » Export Metadata… (⌥⌘E)",
    "body": "File → Export Metadata… exports every video currently shown — filters and search included. Right-click → Export Metadata… exports just the selection.\nPick CSV (for spreadsheets) or JSON Lines (for scripts and tools).\nFields are grouped: Match keys (to find videos on import), Importable (written back), and Export only (read-only facts).\nCheck the fields you want and drag to reorder within a section.\nYour format and field choices are remembered for next time."
  },
  {
    "id": "export-import__import-metadata-i",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Import Metadata… (⌥⌘I)",
    "href": "/skagway/manual/export-import#import-metadata-i",
    "title": "Export / Import » Import Metadata… (⌥⌘I)",
    "body": "File → Import Metadata… opens a CSV or JSON Lines export — the format is detected automatically.\nRows match by Path, then Content Fingerprint, so a file that moved can still be found.\nImportable values update when they differ; tags are merged in, never removed.\nUnknown columns can be skipped or imported as new custom fields. A summary shows Matched / Updated / Unmatched.\nTouched videos appear in Last Metadata Import."
  },
  {
    "id": "export-import__save-copy-back-up-the-catalog",
    "pageSlug": "export-import",
    "pageTitle": "Export / Import",
    "sectionTitle": "Save Copy… — back up the catalog",
    "href": "/skagway/manual/export-import#save-copy-back-up-the-catalog",
    "title": "Export / Import » Save Copy… — back up the catalog",
    "body": "File → Save Copy… writes a timestamped duplicate of the library file.\nThe current library stays open. Save Copy keeps the original cache pointer — it does not create a second cache.\nOpen a copy anytime with File → Open Library…."
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
    "body": "The complete shortcut map.\nSkagway is built for the keyboard. ⌥ is an alternate action, ⇧ reveals or adds, and ⌃ sizes the player."
  },
  {
    "id": "keyboard__views-and-navigation",
    "pageSlug": "keyboard",
    "pageTitle": "Keyboard",
    "sectionTitle": "Views and navigation",
    "href": "/skagway/manual/keyboard#views-and-navigation",
    "title": "Keyboard » Views and navigation",
    "body": "⌘1 / ⌘2 / ⌘3 — Grid view / List view / Storyboard view.\n← → ↑ ↓ — move focus through the grid, list, or storyboard.\nHome / End — jump to the first / last video.\n⌘J — scroll the focused clip back into view.\n⌘-click / ⇧-click — add clips to the collected set (⇧-click ranges from the last click).\nA — add or remove the focused clip from the collected set.\n⌘A / ⇧⌘A — select all in the view / clear the collected set.\nReturn — edit the focused video’s Title (display name). Esc — cancel editing or stop playback.\n⌘I — show / hide the Inspector.\n⌥⌘T — toggle the Inspector between Still and Filmstrip."
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
    "body": "Exclude corrupt files from filters — they stay in the Corrupt smart library and in search.\nConfirm deletions — ask before moving files to the Trash.\nChange Library Location… / Change Thumbnail Cache Location… — move this library’s catalog or its per-library thumbnail cache.\nAutomatically check for updates — off by default; checks do not send usage analytics.\nSmart Libraries — choose which smart libraries appear, and tune Recently Added / Recently Played day windows and the Top Rated star threshold.\nList view columns — pick the columns List view shows (Title is always on)."
  },
  {
    "id": "settings__video",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Video",
    "href": "/skagway/manual/settings#video",
    "title": "Settings » Video",
    "body": "Default Filmstrip Size — rows and columns for filmstrip previews, with a Regenerate filmstrips button.\nSurprise Me! auto-plays selected video — jump and play, or just jump.\nLoop Play All — during Play All, finishing the last video starts the first again.\nHover preview on Grid and List — the silent moving preview on hover.\nTag blind default state / Filter drawer height — how the Inspector tags list and Quick Filter drawer remember size.\nPlayer opens at — Compact, Full screen, or Last used size.\nFade resume banner after delay — whether and when the “Resumed at…” banner fades out."
  },
  {
    "id": "settings__data-sources",
    "pageSlug": "settings",
    "pageTitle": "Settings",
    "sectionTitle": "Data Sources",
    "href": "/skagway/manual/settings#data-sources",
    "title": "Settings » Data Sources",
    "body": "The folders Skagway scans — Add Folder…, Show in Finder, Exclude… a nested subfolder, or Remove.\nAdding a folder only registers it; run File → Scan for New Videos to index it.\nRemove does not drop already-indexed videos. Exclude… skips a nested subfolder on future scans — not the source folder itself."
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
    "body": "Define your own fields for this library: a name plus a type (String, Text, Number, Date, Date & Time, or Boolean).\nEdit values in the Inspector. Fields also appear in search, sort, List columns, filters, and export."
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
    "body": "The library catalog: the .machii file you created (by default in ~/Library/Application Support/Skagway/).\nThumbnails, filmstrips, and storyboards: each library’s own cache (system Caches, a Skagway-cache folder next to the library, or a folder you chose).\nSettings: standard macOS preferences on this Mac.\nYour video files: exactly where you put them. Skagway never relocates or uploads them."
  },
  {
    "id": "privacy__network-and-updates",
    "pageSlug": "privacy",
    "pageTitle": "Privacy",
    "sectionTitle": "Network and updates",
    "href": "/skagway/manual/privacy#network-and-updates",
    "title": "Privacy » Network and updates",
    "body": "No telemetry, no analytics, and no automatic upload of library paths, play history, or browsing behavior.\nCheck for Updates… and automatic update checks only ask whether a newer build exists — and only when you ask, or when you turn them on.\nHelp → Skagway Help opens this manual. Contact Support… opens email to support@machiilabs.com."
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
