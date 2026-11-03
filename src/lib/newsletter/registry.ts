/**
 * Typed access to registry.json: each issue's and correction's status and
 * approval, plus the send ledger. Written only by `npm run newsletter` and
 * scripts/send-mailing.py, never by hand.
 */

import registryJson from "./registry.json";

export type NewsletterStatus = "draft" | "ready" | "sent";

export type Approval = {
  /** SHA-256 of the approved copy and the issue's own images (scripts/newsletter.ts). */
  hash: string;
  /** SHA-256 of the design (render.ts, products.ts, shared images) when approved. */
  design: string;
  /** YYYY-MM-DD. */
  on: string;
};

export type IssueState = {
  status: NewsletterStatus;
  /** YYYY-MM: the month it goes out. Set at approval. */
  month?: string;
  approved?: Approval;
  /** YYYY-MM-DD, set when the issue is frozen. */
  sentOn?: string;
};

export type CorrectionState = {
  status: NewsletterStatus;
  approved?: Approval;
  sentOn?: string;
};

export type SendEntry = {
  issue: string;
  kind: "issue" | "correction";
  /** ISO 8601 with the sender's UTC offset, so its date and month read the same anywhere. */
  startedAt: string;
  finishedAt: string | null;
  recipients: number;
};

export type Registry = {
  issues: Record<string, IssueState>;
  corrections: Record<string, CorrectionState>;
  sends: SendEntry[];
};

export const REGISTRY = registryJson as Registry;

/** YYYY-MM of a ledger timestamp, as the sender's clock read it. */
export function entryMonth(isoWithOffset: string): string {
  return isoWithOffset.slice(0, 7);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "No. 1 · November 2026". Before approval, the month is unknown: "No. 1 · Draft". */
export function dateline(slug: string, month: string | undefined): string {
  const number = Number(slug.slice(5));
  if (!month) return `No. ${number} · Draft`;
  const [year, mm] = month.split("-");
  return `No. ${number} · ${MONTHS[Number(mm) - 1]} ${year}`;
}
