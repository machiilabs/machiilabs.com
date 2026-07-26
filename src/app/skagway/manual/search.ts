import type { ManualSearchDocument } from "./search-documents";

export type ManualSearchHit = {
  document: ManualSearchDocument;
  score: number;
  /** Body excerpt with match context */
  snippet: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 0);
}

/** Build a short snippet around the first match of any token. */
export function buildSnippet(body: string, tokens: string[], maxLen = 160): string {
  if (!body) return "";
  const lower = normalize(body);
  let best = -1;
  for (const token of tokens) {
    const idx = lower.indexOf(token);
    if (idx >= 0 && (best < 0 || idx < best)) best = idx;
  }
  if (best < 0) {
    const trimmed = body.replace(/\s+/g, " ").trim();
    return trimmed.length > maxLen ? `${trimmed.slice(0, maxLen - 1)}…` : trimmed;
  }
  const start = Math.max(0, best - 40);
  const end = Math.min(body.length, start + maxLen);
  let slice = body.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) slice = `…${slice}`;
  if (end < body.length) slice = `${slice}…`;
  return slice;
}

/**
 * Rank documents for a query. All tokens must appear somewhere in title or body
 * (AND). Title / section matches score higher than body-only matches.
 */
export function searchManualIndex(
  documents: ManualSearchDocument[],
  query: string,
  limit = 40,
): ManualSearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const hits: ManualSearchHit[] = [];

  for (const document of documents) {
    const title = normalize(document.title);
    const pageTitle = normalize(document.pageTitle);
    const section = normalize(document.sectionTitle ?? "");
    const body = normalize(document.body);
    const haystack = `${title}\n${body}`;

    if (!tokens.every((t) => haystack.includes(t))) continue;

    let score = 0;
    for (const token of tokens) {
      if (pageTitle === token) score += 50;
      else if (pageTitle.includes(token)) score += 30;
      if (section === token) score += 40;
      else if (section.includes(token)) score += 24;
      if (title.includes(token)) score += 12;
      // Prefer denser body matches lightly
      let from = 0;
      let count = 0;
      while (count < 8) {
        const idx = body.indexOf(token, from);
        if (idx < 0) break;
        count += 1;
        from = idx + token.length;
      }
      score += count * 2;
    }

    hits.push({
      document,
      score,
      snippet: buildSnippet(document.body, tokens),
    });
  }

  hits.sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title));
  return hits.slice(0, limit);
}

/** Split text into segments for bolding query tokens (case-insensitive). */
export function highlightSegments(
  text: string,
  query: string,
): { text: string; match: boolean }[] {
  const tokens = tokenize(query).filter((t) => t.length > 1 || /^\d+$/.test(t));
  if (!text || tokens.length === 0) return [{ text, match: false }];

  const pattern = new RegExp(
    `(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.filter(Boolean).map((part) => ({
    text: part,
    match: tokens.some((t) => normalize(part) === t),
  }));
}
