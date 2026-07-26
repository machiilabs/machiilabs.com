import type { ReactNode } from "react";

const KEY_CLASS = "font-mono font-bold text-[#1a1a1a]";

/** Top-level menus / contexts that can start a “Foo → Bar” path. */
const MENU_ROOT = String.raw`(?:File|Edit|View|Window|Help|Settings|Skagway|right-click|Right-click)`;

/** A single menu item label after →, optional trailing ellipsis. */
const MENU_ITEM = String.raw`(?:[A-Z][\w+\-/']*(?:\s+[\w+\-/']+)*)…?`;

/**
 * Matches menu paths (File → …), keystrokes (⌘F, ⌥⌘B, ⌘-click, Space, Esc, …),
 * and brace tokens ({Inc 1}, {Title lower}, …) so those render as bold monospace.
 */
const MANUAL_UI_PATTERN = new RegExp(
  [
    // e.g. File → Add Folder…, Settings → Video → Playback, right-click → Add to Album
    String.raw`${MENU_ROOT}(?:\s*→\s*${MENU_ITEM})+`,
    // Bulk-rename / field tokens: {Inc 015}, {Date Created MMM-yyyy}, {Title lower}
    String.raw`\{[^{}]+\}`,
    // Modifier-click
    String.raw`[⌘⌥⇧⌃]-click`,
    // Chords: one or more modifiers + key
    String.raw`[⌘⌥⇧⌃]+(?:Space|[A-Za-z0-9]|⌫|↩|←|→|↑|↓)`,
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
