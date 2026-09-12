import type { ReactNode } from "react";

const KEY_CLASS = "font-mono font-bold text-[#1a1a1a]";

/** Top-level menus / contexts that can start a “Foo → Bar” path. */
const MENU_ROOT = String.raw`(?:File|Edit|View|Window|Help|Settings|Skagway|right-click|Right-click)`;

/** A single menu item label after →, optional trailing ellipsis. */
const MENU_ITEM = String.raw`(?:[A-Z][\w+\-/']*(?:\s+[\w+\-/']+)*)…?`;

/**
 * One word inside an ellipsis UI label: Capitalized tokens, &, or short
 * connectors (Fix for Built-in Player…, Save as Collection…).
 */
const ELLIPSIS_WORD = String.raw`(?:[A-Z][\w+\-/']*|&|for|to|in|of|a|an|the|and|or|on|from|with|as)`;

/** Menu / sheet labels that end with … — Title Case, not arbitrary prose. */
const ELLIPSIS_LABEL = String.raw`[A-Z][\w+\-/']*(?:\s+${ELLIPSIS_WORD})*…`;

/**
 * Standalone UI labels that don’t end in … (buttons, menu items, field names).
 * Longest first so the regex prefers the fullest match.
 */
const ACTION_LABELS = [
  "Use standard location on this Mac",
  "Ask every time I open Skagway",
  "Drop to add to your library",
  "Make Thumbnail from Current Frame",
  "Bookmark Current Position",
  "Play in External Player",
  "Co-locate with library",
  "Restore from backup",
  "Delete All Backups",
  "Clear completed rows",
  "Clear finished rows",
  "Retry failed jobs",
  "Start at beginning",
  "Regenerate filmstrips",
  "Remember this location",
  "Use standard location",
  "Create Home Library",
  "Open Home Library",
  "Scan for New Videos",
  "Scan for Subtitles",
  "Remove from Library",
  "Regenerate Thumbnail",
  "Not a Duplicate",
  "Import selected",
  "System default",
  "Toggle in Selection",
  "N Videos Selected",
  "N selected",
  "Loop Play All",
  "Album Order",
  "Last Added",
  "Move to Top",
  "Abort All",
  "Retry Failed",
  "Delete Backup",
  "Clear Menu",
  "Clear all",
  "Skip all",
  "New Collection",
  "New Album",
  "Open Recent",
  "Open With",
  "Show in Finder",
  "Search videos",
  "Drag videos here",
  "Move Here",
  "Surprise Me!",
  "Export / Import",
  "Reset to defaults",
  "Add extension",
  "Quick Filter",
  "Advanced Filter",
  "Full screen",
  "Windowed",
  "Compact",
  "Extensions",
  "Settings",
  "Play All",
  "Shuffle",
  "Dismiss",
  "Abort",
  "Retry",
  "Restore",
  "Cancel",
  "Done",
  "Play",
].sort((a, b) => b.length - a.length);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Matches menu paths, ellipsis UI labels, known action labels, brace tokens,
 * and keystrokes so those render as bold monospace.
 */
const MANUAL_UI_PATTERN = new RegExp(
  [
    // e.g. File → Add Folder…, Settings → Video → Playback, right-click → Add to Album
    String.raw`${MENU_ROOT}(?:\s*→\s*${MENU_ITEM})+`,
    // Title-ish labels that end with an ellipsis (menu items / sheets)
    ELLIPSIS_LABEL,
    // Bulk-rename apply button: Rename 3 Files / Rename N Files
    String.raw`Rename (?:N|\d+) Files?`,
    // Curated buttons / menu items / links (no ellipsis, or already listed)
    ACTION_LABELS.map(escapeRegExp).join("|"),
    // Short dialog buttons only when clearly clicked/chosen
    String.raw`(?:(?<=\bclick )|(?<=\bClick )|(?<=\bthen )|(?<=\bThen ))(?:Add|Scan|Create)\b`,
    // Bulk-rename / field tokens: {Inc 015}, {Date Created MMM-yyyy}, {Title lower}
    String.raw`\{[^{}]+\}`,
    // Modifier-click
    String.raw`[⌘⌥⇧⌃]-click`,
    // Chords: one or more modifiers + key
    String.raw`[⌘⌥⇧⌃]+(?:Space|[A-Za-z0-9]|⌫|↩|←|→|↑|↓|,)`,
    // Named keys
    String.raw`\b(?:Space|Esc|Return|Home|End)\b`,
  ].join("|"),
  "g",
);

export function ManualInline({ text }: { text: string }): ReactNode {
  if (!text) return text;

  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(MANUAL_UI_PATTERN.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(
      <kbd key={`${match.index}-${match[0]}`} className={KEY_CLASS}>
        {match[0]}
      </kbd>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}
