/**
 * Regenerates src/app/skagway/manual/search-index.generated.ts from manual.ts.
 *
 * Run via: npm run manual:index
 * Also runs automatically before `npm run dev` and `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildManualSearchDocuments } from "../src/app/skagway/manual/search-documents";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(
  root,
  "src/app/skagway/manual/search-index.generated.ts",
);

const documents = buildManualSearchDocuments();
const payload = JSON.stringify(documents, null, 2);

const contents = `/* eslint-disable */
/**
 * AUTO-GENERATED FILE — do not edit by hand.
 *
 * Source of truth: ./manual.ts (via ./search-documents.ts)
 * Regenerate: npm run manual:index
 * (also runs on predev / prebuild)
 *
 * Generated: ${new Date().toISOString()}
 * Documents: ${documents.length}
 */
import type { ManualSearchDocument } from "./search-documents";

export const MANUAL_SEARCH_INDEX: ManualSearchDocument[] = ${payload};
`;

const prev = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : null;
// Ignore the timestamp line when checking staleness for --check
function stripTimestamp(s: string): string {
  return s.replace(/ \* Generated: .*?\n/, " * Generated: <timestamp>\n");
}

const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  if (!prev) {
    console.error("error: search index missing — run npm run manual:index");
    process.exit(1);
  }
  if (stripTimestamp(prev) !== stripTimestamp(contents)) {
    console.error(
      "error: search index is stale. Run: npm run manual:index\n" +
        "  (edit manual.ts? the generated index must be regenerated and committed.)",
    );
    process.exit(1);
  }
  console.log(`ok: search index up to date (${documents.length} documents)`);
  process.exit(0);
}

fs.writeFileSync(outFile, contents, "utf8");
console.log(
  `Wrote ${path.relative(root, outFile)} (${documents.length} documents)`,
);
