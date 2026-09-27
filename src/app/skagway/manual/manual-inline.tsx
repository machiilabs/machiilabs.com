import Link from "next/link";
import type { ReactNode } from "react";
import {
  getManualNavPages,
  manualPageHref,
  manualSectionId,
} from "./manual";

const KEY_CLASS = "font-mono font-bold text-[#1a1a1a]";
const SEE_LINK_CLASS =
  "font-medium text-[#1d4ed8] underline-offset-2 hover:underline";

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
  "Evidence Destinations",
  "Needs attention",
  "Confirm reconnect",
  "Undo Reconnect",
  "Full screen",
  "Windowed",
  "Normal",
  "Compact",
  "Extensions",
  "Settings",
  "Play All",
  "Shuffle",
  "Unmatched",
  "Dismiss",
  "Abort",
  "Retry",
  "Restore",
  "Cancel",
  "Ready",
  "Done",
  "Play",
].sort((a, b) => b.length - a.length);

const SETTINGS_SECTIONS = [
  "Library",
  "Video",
  "Data Sources",
  "Extensions",
  "Tools",
  "Custom Metadata",
] as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSeeTargets(): string[] {
  const pageTitles = getManualNavPages().map((page) => page.title);
  const settingsPaths = SETTINGS_SECTIONS.map(
    (section) => `Settings → ${section}`,
  );
  return [...new Set([...pageTitles, ...settingsPaths])].sort(
    (a, b) => b.length - a.length,
  );
}

function resolveSeeHref(label: string): string | null {
  const trimmed = label.trim();
  const settingsMatch = trimmed.match(/^Settings → (.+)$/);
  if (settingsMatch) {
    return `${manualPageHref("settings")}#${manualSectionId(settingsMatch[1])}`;
  }

  const page = getManualNavPages().find((entry) => entry.title === trimmed);
  if (page) return manualPageHref(page.slug);

  return null;
}

function buildSeeLinkPattern(): RegExp {
  const targets = buildSeeTargets().map(escapeRegExp).join("|");
  return new RegExp(
    String.raw`\bsee (?:the )?(?<label>${targets})(?: page)?(?=[.,;]|$| — )`,
    "g",
  );
}

/**
 * Matches menu paths, ellipsis UI labels, known action labels, brace tokens,
 * and keystrokes so those render as bold monospace.
 */
const MANUAL_UI_PATTERN = new RegExp(
  [
    String.raw`${MENU_ROOT}(?:\s*→\s*${MENU_ITEM})+`,
    ELLIPSIS_LABEL,
    String.raw`Rename (?:N|\d+) Files?`,
    ACTION_LABELS.map(escapeRegExp).join("|"),
    String.raw`(?:(?<=\bclick )|(?<=\bClick )|(?<=\bthen )|(?<=\bThen ))(?:Add|Scan|Create)\b`,
    String.raw`\{[^{}]+\}`,
    String.raw`[⌘⌥⇧⌃]-click`,
    String.raw`[⌘⌥⇧⌃]+(?:Space|[A-Za-z0-9]|⌫|↩|←|→|↑|↓|,)`,
    String.raw`\b(?:Space|Esc|Return|Home|End)\b`,
  ].join("|"),
  "g",
);

type InlineSegment =
  | { kind: "text"; value: string }
  | { kind: "see-link"; label: string; href: string };

function splitSeeLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = buildSeeLinkPattern();
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const label = match.groups?.label;
    if (!label) continue;
    const href = resolveSeeHref(label);
    if (!href) continue;

    if (match.index > last) {
      segments.push({ kind: "text", value: text.slice(last, match.index) });
    }
    segments.push({ kind: "see-link", label, href });
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    segments.push({ kind: "text", value: text.slice(last) });
  }

  return segments.length > 0 ? segments : [{ kind: "text", value: text }];
}

function formatUiText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(MANUAL_UI_PATTERN.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(
      <kbd key={`${keyPrefix}-${match.index}-${match[0]}`} className={KEY_CLASS}>
        {match[0]}
      </kbd>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function ManualInline({ text }: { text: string }): ReactNode {
  if (!text) return text;

  const segments = splitSeeLinks(text);
  const nodes: ReactNode[] = [];

  segments.forEach((segment, index) => {
    if (segment.kind === "text") {
      nodes.push(...formatUiText(segment.value, `text-${index}`));
      return;
    }

    nodes.push("see ");
    nodes.push(
      <Link
        key={`see-${index}-${segment.href}`}
        href={segment.href}
        className={SEE_LINK_CLASS}
      >
        {segment.label}
      </Link>,
    );
  });

  return nodes.length === 1 ? nodes[0] : nodes;
}
