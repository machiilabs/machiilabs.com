/**
 * The newsletter's lifecycle tool. The process that drives it is
 * .claude/skills/newsletter/SKILL.md; the design is docs/newsletter-process-plan.md.
 *
 *   npm run newsletter status                    every issue, correction, and this month's slot
 *   npm run newsletter new                       start the next issue (one in progress at a time)
 *   npm run newsletter check [SLUG] [--build]    the rules; --build is what prebuild runs
 *   npm run newsletter approve SLUG [--month YYYY-MM] [--correction]
 *   npm run newsletter reopen SLUG [--correction]   back to draft after an approved change
 *   npm run newsletter snap SLUG [--correction]  desktop and phone screenshots (dev server on :3000)
 *   npm run newsletter correction-new SLUG       start an emergency correction to a sent issue
 *
 * Called by scripts/send-mailing.py, not by hand:
 *   send-check SLUG [--correction] [--test]   gates a send; prints what the live site must serve
 *   freeze SLUG                      after an issue's send finishes
 *   correction-sent SLUG             after a correction's send finishes
 */

import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { NEWSLETTER_CORRECTIONS, NEWSLETTER_ISSUES } from "../src/lib/newsletter/issues";
import { NEWSLETTER_PRODUCTS } from "../src/lib/newsletter/products";
import { dateline, entryMonth, type Approval, type Registry } from "../src/lib/newsletter/registry";
import {
  POSTAL_ADDRESS,
  UNSUBSCRIBE_PLACEHOLDER,
  renderCorrectionHtml,
  renderCorrectionText,
  renderNewsletterHtml,
  renderNewsletterText,
} from "../src/lib/newsletter/render";
import { CANONICAL_ORIGIN } from "../src/lib/newsletter/serve";
import type { NewsletterCorrection, NewsletterImage, NewsletterIssue } from "../src/lib/newsletter/types";
import { SKAGWAY_RELEASES } from "../src/lib/skagway-releases";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "src/lib/newsletter");
const PUBLIC = path.join(ROOT, "public/newsletter");
const REGISTRY_FILE = path.join(LIB, "registry.json");
const ISSUES_FILE = path.join(LIB, "issues.ts");
const FROZEN_DIR = path.join(LIB, "frozen");
const DESIGN_FILES = [path.join(LIB, "render.ts"), path.join(LIB, "products.ts")];

const MAX_EMAIL_BYTES = 90 * 1024; // Gmail clips at 102 KB
const CORRECTION_WINDOW_DAYS = 30;

// ---------- small helpers ----------

function fail(message: string): never {
  console.error(`newsletter: ${message}`);
  process.exit(1);
}

function readRegistry(): Registry {
  return JSON.parse(fs.readFileSync(REGISTRY_FILE, "utf8")) as Registry;
}

function writeRegistry(registry: Registry): void {
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2) + "\n");
}

/** The sender's local calendar, which is what the monthly rule counts. */
function localDate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function currentMonth(): string {
  return localDate().slice(0, 7);
}

function sha256(...parts: (string | Buffer)[]): string {
  const hash = crypto.createHash("sha256");
  for (const part of parts) hash.update(part);
  return hash.digest("hex");
}

function issueBySlug(slug: string): NewsletterIssue {
  return NEWSLETTER_ISSUES.find((i) => i.slug === slug) ?? fail(`no issue ${slug} in issues.ts`);
}

function correctionBySlug(slug: string): NewsletterCorrection {
  return NEWSLETTER_CORRECTIONS.find((c) => c.issue === slug) ?? fail(`no correction for ${slug} in issues.ts`);
}

function issueImages(issue: NewsletterIssue): NewsletterImage[] {
  return issue.products.map((card) => card.image);
}

function fileBytes(file: string): Buffer {
  return fs.existsSync(file) ? fs.readFileSync(file) : Buffer.from(`missing:${file}`);
}

/** Changes to the copy or the issue's own images. */
function contentHash(item: NewsletterIssue | NewsletterCorrection): string {
  const images = "products" in item ? issueImages(item).map((img) => fileBytes(path.join(PUBLIC, img.path))) : [];
  return sha256(JSON.stringify(item), ...images);
}

/** Changes to the look: the renderer, the product catalog, and the shared images. */
function designHash(): string {
  const shared = fs.readdirSync(path.join(PUBLIC, "shared")).sort().map((f) => fileBytes(path.join(PUBLIC, "shared", f)));
  return sha256(...DESIGN_FILES.map((f) => fs.readFileSync(f)), ...shared);
}

function approval(item: NewsletterIssue | NewsletterCorrection): Approval {
  return { hash: contentHash(item), design: designHash(), on: localDate() };
}

/** Width and height from a PNG or JPEG header. */
function imageSize(file: string): { width: number; height: number; type: "png" | "jpeg" } | null {
  const b = fs.readFileSync(file);
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), type: "png" };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) return null;
      const marker = b[i + 1];
      const length = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5), type: "jpeg" };
      }
      i += 2 + length;
    }
  }
  return null;
}

/** "1.4" and "1.4.1" for each version a product currently ships. */
function currentVersions(): Set<string> {
  const flasherPage = fs.readFileSync(path.join(ROOT, "src/app/flasher/page.tsx"), "utf8");
  const versions = [
    SKAGWAY_RELEASES[0].version,
    ...[...flasherPage.matchAll(/const (?:MAC|WIN)_VERSION = "([\d.]+)"/g)].map((m) => m[1]),
  ];
  const set = new Set<string>();
  for (const v of versions) {
    set.add(v);
    set.add(v.split(".").slice(0, 2).join("."));
  }
  return set;
}

// ---------- the rules ----------

type Findings = { errors: string[]; warnings: string[] };

const BRITISH =
  /\b(colour|favour|honour|behaviour|centre|theatre|licence|cancelled|cancelling|travelled|travelling|labelled|labelling|modelling|catalogue|grey|programme|whilst|amongst|defence|offence|aluminium)\w*\b|\b\w*(organis|recognis|realis|optimis|customis|prioritis|summaris|minimis|maximis|categoris|apologis)(e|ed|es|ing|ation)\b/i;

function textRules(where: string, text: string, out: string[]): void {
  if (/['"]/.test(text)) out.push(`${where}: use curly quotes and apostrophes (’ “ ”), not straight ones`);
  if (/<|>|\*\*|\]\(/.test(text)) out.push(`${where}: plain text only (no HTML or Markdown)`);
  if (/\b(TODO|TK|lorem)\b/i.test(text)) out.push(`${where}: template text left in`);
  if (/kleimeyer/i.test(text)) out.push(`${where}: the owner’s full name never appears; sign with “Paul”`);
  const british = text.match(BRITISH);
  if (british) out.push(`${where}: US spelling (“${british[0]}”)`);
}

function length(where: string, text: string, max: number, out: string[], min = 1): void {
  const n = [...text].length;
  if (n < min || n > max) out.push(`${where}: ${n} characters; must be ${min === 1 ? `at most ${max}` : `${min}–${max}`}`);
}

function count(where: string, items: readonly unknown[], min: number, max: number, out: string[]): void {
  if (items.length < min || items.length > max) out.push(`${where}: ${items.length} items; must be ${min}–${max}`);
}

function issueContentRules(issue: NewsletterIssue): Findings {
  const errors: string[] = [];
  const warnings: string[] = [];
  const s = issue.slug;

  length(`${s} subject`, issue.subject, 70, errors);
  length(`${s} preheader`, issue.preheader, 110, errors, 40);
  length(`${s} headline`, issue.headline, 45, errors);
  length(`${s} subhead`, issue.subhead, 80, errors);
  length(`${s} greeting`, issue.greeting, 40, errors);
  count(`${s} intro`, issue.intro, 1, 3, errors);
  issue.intro.forEach((p, i) => length(`${s} intro ${i + 1}`, p, 320, errors));
  count(`${s} closing`, issue.closing, 1, 2, errors);
  issue.closing.forEach((p, i) => length(`${s} closing ${i + 1}`, p, 200, errors));
  count(`${s} signature`, issue.signature, 1, 4, errors);

  count(`${s} product cards`, issue.products, 1, 3, errors);
  const ids = issue.products.map((c) => c.product);
  if (new Set(ids).size !== ids.length) errors.push(`${s}: a product appears twice`);

  for (const card of issue.products) {
    const w = `${s} ${card.product}`;
    if (!(card.product in NEWSLETTER_PRODUCTS)) errors.push(`${w}: unknown product`);
    length(`${w} tagline`, card.tagline, 80, errors);
    length(`${w} intro`, card.intro, 400, errors, 120);
    for (const link of card.introLinks ?? []) {
      if (!card.intro.includes(link.text)) errors.push(`${w} intro link: “${link.text}” doesn’t appear in the intro`);
      if (!/^https:\/\/[^\s"<>]+$/.test(link.url)) errors.push(`${w} intro link: “${link.url}” must be an https:// address`);
    }
    count(`${w} highlights`, card.highlights, 3, 4, errors);
    card.highlights.forEach((h, i) => {
      length(`${w} highlight ${i + 1} title`, h.title, 40, errors);
      length(`${w} highlight ${i + 1} body`, h.body, 140, errors);
    });
    length(`${w} what’s-new title`, card.whatsNewTitle, 50, errors);
    count(`${w} what’s new`, card.whatsNew, 2, 4, errors);
    card.whatsNew.forEach((h, i) => {
      length(`${w} what’s new ${i + 1} title`, h.title, 40, errors);
      length(`${w} what’s new ${i + 1} body`, h.body, 180, errors);
    });
    length(`${w} button`, card.ctaLabel, 30, errors);

    const img = card.image;
    if (!img.path.startsWith(`${s}/`)) errors.push(`${w} image: must be in public/newsletter/${s}/`);
    imageRules(`${w} image`, img, { width: 1200, type: "jpeg", maxBytes: 250 * 1024 }, errors);
  }

  // Every string in the issue, for the language rules.
  const strings: [string, string][] = [
    ["subject", issue.subject], ["preheader", issue.preheader], ["headline", issue.headline],
    ["subhead", issue.subhead], ["greeting", issue.greeting],
    ...issue.intro.map((p, i): [string, string] => [`intro ${i + 1}`, p]),
    ...issue.closing.map((p, i): [string, string] => [`closing ${i + 1}`, p]),
    ...issue.signature.map((p, i): [string, string] => [`signature ${i + 1}`, p]),
    ...issue.products.flatMap((c): [string, string][] => [
      [`${c.product} tagline`, c.tagline], [`${c.product} intro`, c.intro],
      [`${c.product} what’s-new title`, c.whatsNewTitle], [`${c.product} button`, c.ctaLabel],
      [`${c.product} image alt`, c.image.alt],
      ...(c.introLinks ?? []).map((l): [string, string] => [`${c.product} intro link`, l.text]),
      ...[...c.highlights, ...c.whatsNew].flatMap((h): [string, string][] => [
        [`${c.product} “${h.title}”`, h.title], [`${c.product} “${h.title}” body`, h.body],
      ]),
    ]),
  ];
  for (const [where, text] of strings) textRules(`${s} ${where}`, text, errors);

  // Facts: version numbers must be what the site ships today.
  const versions = currentVersions();
  const versioned = [issue.subject, issue.preheader, issue.subhead, ...issue.products.flatMap((c) => [c.whatsNewTitle, c.ctaLabel])];
  for (const text of versioned) {
    for (const m of text.matchAll(/\b\d+\.\d+(?:\.\d+)?\b/g)) {
      if (!versions.has(m[0])) warnings.push(`${s}: version ${m[0]} in “${text}” isn’t a current release (${[...versions].join(", ")})`);
    }
  }

  // The rendered email.
  const line = dateline(s, undefined);
  const html = renderNewsletterHtml(issue, { mode: "email", origin: CANONICAL_ORIGIN, dateline: line });
  const text = renderNewsletterText(issue, { origin: CANONICAL_ORIGIN, dateline: line });
  renderedRules(s, html, text, errors);

  return { errors, warnings };
}

function imageRules(
  where: string,
  img: NewsletterImage,
  spec: { width: number; type: "png" | "jpeg"; maxBytes: number },
  errors: string[],
): void {
  const file = path.join(PUBLIC, img.path);
  if (!fs.existsSync(file)) {
    errors.push(`${where}: public/newsletter/${img.path} is missing`);
    return;
  }
  const size = imageSize(file);
  if (!size) errors.push(`${where}: can’t read ${img.path} as PNG or JPEG`);
  else {
    if (size.width !== img.width || size.height !== img.height) {
      errors.push(`${where}: file is ${size.width}×${size.height}, issue says ${img.width}×${img.height}`);
    }
    if (size.width !== spec.width) errors.push(`${where}: must be ${spec.width} px wide (is ${size.width})`);
    if (size.type !== spec.type) errors.push(`${where}: must be a ${spec.type.toUpperCase()}`);
  }
  const bytes = fs.statSync(file).size;
  if (bytes > spec.maxBytes) errors.push(`${where}: ${Math.round(bytes / 1024)} KB; at most ${spec.maxBytes / 1024} KB`);
  if ([...img.alt].length < 10 || /\.(png|jpe?g)$/i.test(img.alt)) errors.push(`${where}: needs a real alt text`);
}

function renderedRules(where: string, html: string, text: string, errors: string[]): void {
  const bytes = Buffer.byteLength(html);
  if (bytes > MAX_EMAIL_BYTES) errors.push(`${where}: email HTML is ${Math.round(bytes / 1024)} KB; at most 90 KB`);
  for (const [name, body] of [["HTML", html], ["text", text]] as const) {
    const n = body.split(UNSUBSCRIBE_PLACEHOLDER).length - 1;
    if (n !== 1) errors.push(`${where}: ${name} has ${n} unsubscribe links; must be exactly 1`);
    if (!body.includes(POSTAL_ADDRESS)) errors.push(`${where}: ${name} is missing the postal address`);
  }
  if (!html.includes("View in browser")) errors.push(`${where}: email is missing “View in browser”`);
}

function correctionContentRules(c: NewsletterCorrection): Findings {
  const errors: string[] = [];
  const w = `${c.issue} correction`;
  length(`${w} subject`, c.subject, 70, errors);
  length(`${w} heading`, c.heading, 60, errors);
  count(`${w} body`, c.body, 1, 2, errors);
  length(`${w} body`, c.body.join(""), 600, errors);
  if (c.link) {
    length(`${w} link`, c.link.label, 40, errors);
    if (!c.link.path.startsWith("/")) errors.push(`${w} link: must be a site path starting with /`);
  }
  for (const [where, text] of [
    ["subject", c.subject], ["heading", c.heading], ...c.body.map((p, i) => [`body ${i + 1}`, p]),
    ...(c.link ? [["link", c.link.label]] : []),
  ]) textRules(`${w} ${where}`, text, errors);

  const html = renderCorrectionHtml(c, { mode: "email", origin: CANONICAL_ORIGIN, dateline: "x" });
  const text = renderCorrectionText(c, { origin: CANONICAL_ORIGIN, dateline: "x" });
  renderedRules(w, html, text, errors);
  return { errors, warnings: [] };
}

/** Everything. `build` makes stale-ness and unsent drafts warnings, so a release never blocks on a newsletter. */
function checkAll(mode: "build" | "full", only?: string): Findings {
  const registry = readRegistry();
  const errors: string[] = [];
  const warnings: string[] = [];
  const design = designHash();
  const month = currentMonth();

  // Identity and numbering.
  const slugs = NEWSLETTER_ISSUES.map((i) => i.slug);
  for (const issue of NEWSLETTER_ISSUES) {
    if (!/^\d{4}-\d{2}$/.test(issue.slug)) errors.push(`${issue.slug}: slug must be YYYY-NN`);
    if (!fs.existsSync(path.join(LIB, "issues", `${issue.slug}.ts`))) errors.push(`${issue.slug}: must live in issues/${issue.slug}.ts`);
    if (!registry.issues[issue.slug]) errors.push(`${issue.slug}: missing from registry.json`);
  }
  for (const slug of Object.keys(registry.issues)) {
    if (!slugs.includes(slug)) errors.push(`${slug}: in registry.json but not in issues.ts`);
  }
  const byYear = new Map<string, number[]>();
  for (const slug of slugs) byYear.set(slug.slice(0, 4), [...(byYear.get(slug.slice(0, 4)) ?? []), Number(slug.slice(5))]);
  for (const [year, numbers] of byYear) {
    const sorted = [...numbers].sort((a, b) => a - b);
    if (sorted.some((n, i) => n !== i + 1)) errors.push(`${year}: issue numbers must run 01, 02, … with no gaps (have ${sorted.join(", ")})`);
  }
  const unsent = slugs.filter((s) => registry.issues[s]?.status !== "sent");
  if (unsent.length > 1) errors.push(`only one issue may be in progress; found ${unsent.join(", ")}`);

  // Lifecycle.
  for (const issue of NEWSLETTER_ISSUES) {
    const s = issue.slug;
    const state = registry.issues[s];
    if (!state || (only && only !== s)) continue;
    const approved = state.approved;

    if (state.status === "sent") {
      if (!state.sentOn) errors.push(`${s}: sent, but has no sentOn`);
      if (!fs.existsSync(path.join(FROZEN_DIR, `${s}.json`))) errors.push(`${s}: sent, but has no frozen copy`);
      if (approved && approved.hash !== contentHash(issue)) {
        errors.push(`${s}: the issue file or its images changed after sending. Sent issues are frozen; restore it.`);
      }
      continue;
    }

    const content = issueContentRules(issue);
    if (state.status === "ready") {
      errors.push(...content.errors);
      if (!state.month || !/^\d{4}-\d{2}$/.test(state.month)) errors.push(`${s}: ready, but has no month`);
      else {
        if (state.month.slice(0, 4) !== s.slice(0, 4)) errors.push(`${s}: goes out in ${state.month}, so its number must start ${state.month.slice(0, 4)}-`);
        if (state.month < month) {
          const message = `${s}: approved for ${state.month}, which has passed. Reopen it, update it, and approve it again.`;
          (mode === "full" ? errors : warnings).push(message);
        }
      }
      if (!approved) errors.push(`${s}: ready, but not approved`);
      else {
        if (approved.hash !== contentHash(issue)) errors.push(`${s}: changed since it was approved. Reopen it and approve it again.`);
        if (approved.design !== design) errors.push(`${s}: the design changed since it was approved. Review it and approve it again.`);
      }
      (mode === "full" ? errors : warnings).push(...content.warnings);
    } else {
      // Drafts are work in progress: in a build their problems are warnings.
      (mode === "full" ? errors : warnings).push(...content.errors, ...content.warnings);
    }
  }

  // The monthly rule, from the ledger.
  const issueSends = registry.sends.filter((e) => e.kind === "issue");
  const perMonth = new Map<string, Set<string>>();
  for (const e of issueSends) {
    const m = entryMonth(e.startedAt);
    perMonth.set(m, new Set([...(perMonth.get(m) ?? []), e.issue]));
    const state = registry.issues[e.issue];
    if (state?.month && state.month !== m) errors.push(`${e.issue}: approved for ${state.month} but its send started in ${m}`);
  }
  for (const [m, issues] of perMonth) {
    if (issues.size > 1) errors.push(`${m}: more than one newsletter went out (${[...issues].join(", ")}); the limit is one a month`);
  }

  // Corrections.
  for (const c of NEWSLETTER_CORRECTIONS) {
    const state = registry.corrections[c.issue];
    if (only && only !== c.issue) continue;
    if (!state) {
      errors.push(`${c.issue} correction: missing from registry.json`);
      continue;
    }
    if (registry.issues[c.issue]?.status !== "sent") errors.push(`${c.issue} correction: corrects an issue that hasn’t been sent`);
    const approved = state.approved;
    if (state.status === "sent") {
      if (approved && approved.hash !== contentHash(c)) errors.push(`${c.issue} correction: changed after sending; restore it`);
      continue;
    }
    const content = correctionContentRules(c);
    if (state.status === "ready") {
      errors.push(...content.errors);
      if (!approved || approved.hash !== contentHash(c)) errors.push(`${c.issue} correction: changed since it was approved. Reopen it and approve it again.`);
      else if (approved.design !== design) errors.push(`${c.issue} correction: the design changed since it was approved. Approve it again.`);
    } else {
      (mode === "full" ? errors : warnings).push(...content.errors);
    }
  }
  const correctionSends = registry.sends.filter((e) => e.kind === "correction");
  const corrected = correctionSends.map((e) => e.issue);
  if (new Set(corrected).size !== corrected.length) errors.push(`an issue was corrected more than once; the limit is one correction per issue`);

  return { errors, warnings };
}

// ---------- commands ----------

function cmdStatus(): void {
  const registry = readRegistry();
  const month = currentMonth();
  console.log("Issues");
  for (const issue of NEWSLETTER_ISSUES) {
    const st = registry.issues[issue.slug];
    const detail =
      st?.status === "sent" ? `sent ${st.sentOn}` : st?.status === "ready" ? `approved for ${st.month}` : "in progress";
    console.log(`  ${issue.slug}  ${(st?.status ?? "?").padEnd(5)}  ${detail}  “${issue.subject}”`);
  }
  if (NEWSLETTER_CORRECTIONS.length) {
    console.log("Corrections");
    for (const c of NEWSLETTER_CORRECTIONS) {
      const st = registry.corrections[c.issue];
      console.log(`  ${c.issue}  ${st?.status ?? "?"}${st?.sentOn ? ` (sent ${st.sentOn})` : ""}  “${c.subject}”`);
    }
  }
  const used = registry.sends.find((e) => e.kind === "issue" && entryMonth(e.startedAt) === month);
  console.log(
    used
      ? `This month (${month}): used by ${used.issue}, started ${used.startedAt.slice(0, 10)}${used.finishedAt ? "" : ", not finished"}.`
      : `This month (${month}): free.`,
  );
  const unfinished = registry.sends.filter((e) => !e.finishedAt);
  for (const e of unfinished) console.log(`Unfinished send: ${e.issue} (${e.kind}), started ${e.startedAt}. Rerun the same send to finish it.`);
}

function serializeTs(value: unknown, indent = ""): string {
  const next = indent + "  ";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((v) => next + serializeTs(v, next)).join(",\n")},\n${indent}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return `{\n${entries.map(([k, v]) => `${next}${k}: ${serializeTs(v, next)}`).join(",\n")},\n${indent}}`;
  }
  return JSON.stringify(value);
}

function addToIssuesFile(importLine: string, arrayName: string, entry: string): void {
  let source = fs.readFileSync(ISSUES_FILE, "utf8");
  const lastImport = source.lastIndexOf("\nimport ");
  const lineEnd = source.indexOf("\n", lastImport + 1);
  source = source.slice(0, lineEnd + 1) + importLine + "\n" + source.slice(lineEnd + 1);
  const open = source.indexOf(`${arrayName}: readonly`);
  const close = source.indexOf("];", open);
  source = source.slice(0, close) + `  ${entry},\n` + source.slice(close);
  fs.writeFileSync(ISSUES_FILE, source);
}

function cmdNew(): void {
  const registry = readRegistry();
  const unsent = NEWSLETTER_ISSUES.filter((i) => registry.issues[i.slug]?.status !== "sent");
  if (unsent.length) fail(`${unsent[0].slug} is still in progress. Finish or delete it first; one issue at a time.`);

  const year = currentMonth().slice(0, 4);
  const numbers = NEWSLETTER_ISSUES.filter((i) => i.slug.startsWith(year)).map((i) => Number(i.slug.slice(5)));
  const slug = `${year}-${String(Math.max(0, ...numbers) + 1).padStart(2, "0")}`;
  const previous = NEWSLETTER_ISSUES[NEWSLETTER_ISSUES.length - 1];

  // Carry over what's stable (product taglines, intros, highlights); blank what each issue must say anew.
  const draft: NewsletterIssue = previous
    ? {
        ...previous,
        slug,
        subject: "TODO",
        preheader: "TODO",
        headline: previous.headline,
        subhead: "TODO",
        intro: ["TODO"],
        products: previous.products.map((card) => ({
          ...card,
          image: { ...card.image, path: `${slug}/${path.basename(card.image.path)}` },
          whatsNewTitle: "TODO",
          whatsNew: [{ title: "TODO", body: "TODO" }, { title: "TODO", body: "TODO" }],
          ctaLabel: card.ctaLabel.replace(/\s*\d+(\.\d+)+$/, ""),
        })),
      }
    : fail("no previous issue to start from");

  const file = path.join(LIB, "issues", `${slug}.ts`);
  fs.writeFileSync(
    file,
    `import type { NewsletterIssue } from "../types";\n\nconst issue: NewsletterIssue = ${serializeTs(draft)};\n\nexport default issue;\n`,
  );
  fs.mkdirSync(path.join(PUBLIC, slug), { recursive: true });
  const name = `issue_${slug.replace("-", "_")}`;
  addToIssuesFile(`import ${name} from "./issues/${slug}";`, "NEWSLETTER_ISSUES", name);
  registry.issues[slug] = { status: "draft" };
  writeRegistry(registry);
  console.log(`Started ${slug}: src/lib/newsletter/issues/${slug}.ts, images in public/newsletter/${slug}/.`);
}

function cmdApprove(slug: string, correction: boolean, monthArg?: string): void {
  const registry = readRegistry();
  if (correction) {
    const c = correctionBySlug(slug);
    const state = registry.corrections[slug] ?? fail(`no correction for ${slug} in registry.json`);
    if (state.status === "sent") fail(`the correction to ${slug} has been sent`);
    const found = correctionContentRules(c);
    if (found.errors.length) fail(`can’t approve:\n  ${found.errors.join("\n  ")}`);
    registry.corrections[slug] = { status: "ready", approved: approval(c) };
    writeRegistry(registry);
    console.log(`Approved the correction to ${slug}.`);
    return;
  }

  const issue = issueBySlug(slug);
  const state = registry.issues[slug] ?? fail(`${slug} is missing from registry.json`);
  if (state.status === "sent") fail(`${slug} has been sent; sent issues are frozen`);
  const month = monthArg ?? currentMonth();
  if (!/^\d{4}-\d{2}$/.test(month)) fail(`--month must look like 2026-12`);
  if (month < currentMonth()) fail(`${month} has passed`);
  if (month.slice(0, 4) !== slug.slice(0, 4)) {
    fail(`${slug} would go out in ${month}, so it must be renumbered to ${month.slice(0, 4)}-NN first (see the skill)`);
  }
  const found = issueContentRules(issue);
  const problems = [...found.errors, ...found.warnings];
  if (problems.length) fail(`can’t approve ${slug}:\n  ${problems.join("\n  ")}`);
  registry.issues[slug] = { status: "ready", month, approved: approval(issue) };
  writeRegistry(registry);
  console.log(`Approved ${slug} for ${month} (${dateline(slug, month)}).`);
}

function cmdReopen(slug: string, correction: boolean): void {
  const registry = readRegistry();
  const table = correction ? registry.corrections : registry.issues;
  const state = table[slug] ?? fail(`nothing to reopen for ${slug}`);
  if (state.status === "sent") fail(`${slug}${correction ? "’s correction" : ""} has been sent; it’s frozen`);
  // Mid-send, some people already have this version; the rest must get the same one.
  if (registry.sends.some((e) => e.issue === slug && e.kind === (correction ? "correction" : "issue"))) {
    fail(`a send of ${slug}${correction ? "’s correction" : ""} has started, so it can’t be unapproved. Rerun the send to finish it.`);
  }
  table[slug] = { status: "draft" };
  writeRegistry(registry);
  console.log(`${slug}${correction ? " correction" : ""} is a draft again. It needs the check and approval before it can go out.`);
}

function finishedSend(registry: Registry, slug: string, kind: "issue" | "correction") {
  return registry.sends.find((e) => e.issue === slug && e.kind === kind && e.finishedAt);
}

function cmdFreeze(slug: string): void {
  const registry = readRegistry();
  const issue = issueBySlug(slug);
  const state = registry.issues[slug];
  if (state?.status !== "ready" || !state.month) fail(`${slug} isn’t ready, so it can’t have been sent`);
  const send = finishedSend(registry, slug, "issue") ?? fail(`the ledger has no finished send of ${slug}`);

  const line = dateline(slug, state.month);
  const frozen = {
    web: renderNewsletterHtml(issue, { mode: "web", origin: CANONICAL_ORIGIN, dateline: line }),
    email: renderNewsletterHtml(issue, { mode: "email", origin: CANONICAL_ORIGIN, dateline: line }),
    text: renderNewsletterText(issue, { origin: CANONICAL_ORIGIN, dateline: line }),
  };
  fs.writeFileSync(path.join(FROZEN_DIR, `${slug}.json`), JSON.stringify(frozen, null, 2) + "\n");

  const files = fs.readdirSync(FROZEN_DIR).filter((f) => /^\d{4}-\d{2}\.json$/.test(f)).sort();
  const imports = files.map((f) => `import frozen_${f.slice(0, 7).replace("-", "_")} from "./${f}";`).join("\n");
  const entries = files.map((f) => `  "${f.slice(0, 7)}": frozen_${f.slice(0, 7).replace("-", "_")},`).join("\n");
  fs.writeFileSync(
    path.join(FROZEN_DIR, "index.ts"),
    `/**
 * Exactly what each sent issue looked like when it went out, written by
 * \`npm run newsletter freeze\`. The routes serve these instead of re-rendering,
 * so a later design change can't rewrite the archive. Generated; don't edit.
 */

${imports}

export type FrozenIssue = { web: string; email: string; text: string };

export const FROZEN_ISSUES: Record<string, FrozenIssue> = {
${entries}
};
`,
  );

  registry.issues[slug] = { ...state, status: "sent", sentOn: send.finishedAt!.slice(0, 10) };
  writeRegistry(registry);
  console.log(`Froze ${slug} as sent on ${send.finishedAt!.slice(0, 10)}.`);
}

function cmdCorrectionNew(slug: string): void {
  const registry = readRegistry();
  const state = registry.issues[slug];
  if (state?.status !== "sent" || !state.sentOn) fail(`${slug} hasn’t been sent; only sent issues get corrections`);
  if (registry.corrections[slug] || NEWSLETTER_CORRECTIONS.some((c) => c.issue === slug)) {
    fail(`${slug} already has a correction; the limit is one per issue`);
  }
  const age = (Date.parse(localDate()) - Date.parse(state.sentOn)) / 86_400_000;
  if (age > CORRECTION_WINDOW_DAYS) fail(`${slug} went out ${Math.round(age)} days ago; corrections are for the last ${CORRECTION_WINDOW_DAYS} days`);

  const correction: NewsletterCorrection = { issue: slug, subject: "TODO", heading: "TODO", body: ["TODO"] };
  const file = path.join(LIB, "corrections", `${slug}.ts`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `import type { NewsletterCorrection } from "../types";\n\nconst correction: NewsletterCorrection = ${serializeTs(correction)};\n\nexport default correction;\n`,
  );
  const name = `correction_${slug.replace("-", "_")}`;
  addToIssuesFile(`import ${name} from "./corrections/${slug}";`, "NEWSLETTER_CORRECTIONS", name);
  registry.corrections[slug] = { status: "draft" };
  writeRegistry(registry);
  console.log(`Started the correction to ${slug}: src/lib/newsletter/corrections/${slug}.ts`);
}

function cmdCorrectionSent(slug: string): void {
  const registry = readRegistry();
  const state = registry.corrections[slug];
  if (state?.status !== "ready") fail(`the correction to ${slug} isn’t ready`);
  const send = finishedSend(registry, slug, "correction") ?? fail(`the ledger has no finished correction send for ${slug}`);
  registry.corrections[slug] = { ...state, status: "sent", sentOn: send.finishedAt!.slice(0, 10) };
  writeRegistry(registry);
  console.log(`Marked the correction to ${slug} as sent on ${send.finishedAt!.slice(0, 10)}.`);
}

/** The gate send-mailing.py runs before any real or test send. Prints what the live site must serve. */
function cmdSendCheck(slug: string, correction: boolean, test: boolean): void {
  const registry = readRegistry();
  const month = currentMonth();
  const problems: string[] = [];
  // A test goes only to the owner, so it skips the calendar rules but nothing else.
  const calendar = (message: string) => {
    if (!test) problems.push(message);
  };

  const found = checkAll("full", slug);
  for (const p of [...found.errors, ...found.warnings]) {
    // "approved for a month that has passed" is a calendar rule too.
    if (test && /which has passed/.test(p)) continue;
    problems.push(p);
  }

  let html: string;
  let text: string;
  let subject: string;
  const unfinished = registry.sends.find((e) => e.issue === slug && e.kind === (correction ? "correction" : "issue") && !e.finishedAt);

  if (correction) {
    const c = correctionBySlug(slug);
    const state = registry.corrections[slug];
    const issueState = registry.issues[slug];
    if (state?.status !== "ready") problems.push(`the correction to ${slug} isn’t approved (status ${state?.status ?? "missing"})`);
    if (finishedSend(registry, slug, "correction")) problems.push(`the correction to ${slug} has already gone out`);
    if (issueState?.sentOn && !unfinished) {
      const age = (Date.parse(localDate()) - Date.parse(issueState.sentOn)) / 86_400_000;
      if (age > CORRECTION_WINDOW_DAYS) calendar(`${slug} went out ${Math.round(age)} days ago; corrections are for the last ${CORRECTION_WINDOW_DAYS} days`);
    }
    const line = dateline(slug, issueState?.month);
    html = renderCorrectionHtml(c, { mode: "email", origin: CANONICAL_ORIGIN, dateline: line });
    text = renderCorrectionText(c, { origin: CANONICAL_ORIGIN, dateline: line });
    subject = c.subject;
  } else {
    const issue = issueBySlug(slug);
    const state = registry.issues[slug];
    if (state?.status === "sent" || finishedSend(registry, slug, "issue")) problems.push(`${slug} has already gone out`);
    else if (state?.status !== "ready") problems.push(`${slug} isn’t approved (status ${state?.status ?? "missing"})`);
    else if (!unfinished && state.month !== month) {
      calendar(`${slug} is approved for ${state.month}, but this is ${month}. Reopen it, update it, and approve it again.`);
    }
    const other = registry.sends.find((e) => e.kind === "issue" && e.issue !== slug && entryMonth(e.startedAt) === month);
    if (other && !unfinished) calendar(`this month’s newsletter has already gone out (${other.issue}, ${other.startedAt.slice(0, 10)}); the limit is one a month`);
    const line = dateline(slug, state?.month);
    html = renderNewsletterHtml(issue, { mode: "email", origin: CANONICAL_ORIGIN, dateline: line });
    text = renderNewsletterText(issue, { origin: CANONICAL_ORIGIN, dateline: line });
    subject = issue.subject;
  }

  console.log(JSON.stringify({ ok: problems.length === 0, problems, subject, htmlSha256: sha256(html), textSha256: sha256(text), resuming: Boolean(unfinished) }));
  process.exit(problems.length ? 1 : 0);
}

function cmdSnap(slug: string, correction: boolean): void {
  const out = path.join(ROOT, ".newsletter-review", correction ? `${slug}-correction` : slug);
  const binary = path.join(ROOT, ".newsletter-review", "snap");
  fs.mkdirSync(out, { recursive: true });
  const source = path.join(ROOT, "scripts/newsletter-snap.swift");
  if (!fs.existsSync(binary) || fs.statSync(binary).mtimeMs < fs.statSync(source).mtimeMs) {
    execFileSync("swiftc", ["-O", source, "-o", binary], { stdio: "inherit" });
  }
  const url = `http://localhost:3000/newsletter/${slug}/${correction ? "correction/" : ""}email`;
  for (const [name, width] of [["desktop", 760], ["phone", 390]] as const) {
    execFileSync(binary, [url, path.join(out, `${name}.png`), String(width)], { stdio: "inherit" });
  }
  console.log(`Screenshots in ${path.relative(ROOT, out)}/`);
}

// ---------- main ----------

const [command, ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const positional = rest.filter((a, i) => !a.startsWith("--") && rest[i - 1] !== "--month");
const monthIndex = rest.indexOf("--month");
const slugArg = positional[0];
const needSlug = () => slugArg ?? fail(`${command} needs an issue, e.g. ${command} 2026-01`);

switch (command) {
  case "status":
    cmdStatus();
    break;
  case "new":
    cmdNew();
    break;
  case "check": {
    const { errors, warnings } = checkAll(flags.has("--build") ? "build" : "full", slugArg);
    for (const w of warnings) console.warn(`newsletter: warning: ${w}`);
    if (errors.length) fail(`${errors.length} problem${errors.length === 1 ? "" : "s"}:\n  ${errors.join("\n  ")}`);
    console.log(`newsletter: check passed${warnings.length ? ` with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : ""}`);
    break;
  }
  case "approve":
    cmdApprove(needSlug(), flags.has("--correction"), monthIndex >= 0 ? rest[monthIndex + 1] : undefined);
    break;
  case "reopen":
    cmdReopen(needSlug(), flags.has("--correction"));
    break;
  case "snap":
    cmdSnap(needSlug(), flags.has("--correction"));
    break;
  case "correction-new":
    cmdCorrectionNew(needSlug());
    break;
  case "send-check":
    cmdSendCheck(needSlug(), flags.has("--correction"), flags.has("--test"));
    break;
  case "freeze":
    cmdFreeze(needSlug());
    break;
  case "correction-sent":
    cmdCorrectionSent(needSlug());
    break;
  default:
    fail("usage: npm run newsletter status | new | check [SLUG] [--build] | approve SLUG [--month YYYY-MM] [--correction] | reopen SLUG [--correction] | snap SLUG [--correction] | correction-new SLUG");
}
