# Skagway Manual

How-to docs for Skagway. Content lives in TypeScript so the site and the search index stay in sync.

## Inline UI formatting

[`manual-inline.tsx`](./manual-inline.tsx) auto-styles action chrome as **bold monospace**:

- Menu paths (`File → Add Folder…`, `right-click → …`)
- Labels ending in `…` (sheets / menu items)
- Known buttons and commands (`Add Files…` is covered by `…`; also `Scan for New Videos`, `Move Here`, …)
- Short dialog actions after “click” / “then” (`Add`, `Scan`, `Create`)
- Brace tokens (`{Inc 1}`) and keystrokes (`⌘F`, `Space`)

Write UI labels with the same capitalization as the app so they match. Section headings stay in the normal heading font (not mono).

## Update workflow

1. **Edit content** in [`manual.ts`](./manual.ts) (pages, sections, steps).
2. **Regenerate the search index** — required whenever `manual.ts` changes:

   ```bash
   npm run manual:index
   ```

3. **Commit both** `manual.ts` and `search-index.generated.ts`.

## Screenshots

PNG files live in `public/skagway/manual/`. Each page (and some inline steps) names a file plus a **capture brief** (`screenshotHint`).

- If the PNG is **missing**, the page shows a dashed “Screenshot needed” box with the filename and brief.
- If the PNG exists but is **stale**, set `screenshotNeedsUpdate: true` (or `needsUpdate: true` on an inline shot). The page shows a “Screenshot needs update” brief **above** the current capture, labeled outdated.

Clear the flag after you drop in a current PNG. Do not leave a stale shot unmarked — readers will treat it as current.

`npm run manual:index` also runs automatically on **`predev`** and **`prebuild`**, so a normal `npm run dev` / `npm run build` refreshes the index before the app starts. Do not treat the index as a separate optional step.

### Verify the index is current

```bash
npm run manual:index:check
```

Fails if `search-index.generated.ts` does not match `manual.ts` (useful in CI).

## Search architecture

| Piece | Role |
|---|---|
| `manual.ts` | Source of truth — all pages and topics |
| `search-documents.ts` | Flattens pages → search documents |
| `search-index.generated.ts` | Generated corpus the search UI loads |
| `search.ts` | Client-side match / rank / highlight |
| `manual-search.tsx` | Zed-style search dialog (`/` or header button) |

Do not hand-edit `search-index.generated.ts`. Change `manual.ts`, then regenerate.
