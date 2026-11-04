/**
 * Every issue and correction, in order. `npm run newsletter new` and
 * `npm run newsletter correction-new` add lines here.
 */

import type { NewsletterCorrection, NewsletterIssue } from "./types";
import issue_2026_01 from "./issues/2026-01";

export const NEWSLETTER_ISSUES: readonly NewsletterIssue[] = [
  issue_2026_01,
];

export const NEWSLETTER_CORRECTIONS: readonly NewsletterCorrection[] = [
];

export function findIssue(slug: string): NewsletterIssue | undefined {
  return NEWSLETTER_ISSUES.find((issue) => issue.slug === slug);
}

export function findCorrection(slug: string): NewsletterCorrection | undefined {
  return NEWSLETTER_CORRECTIONS.find((correction) => correction.issue === slug);
}
