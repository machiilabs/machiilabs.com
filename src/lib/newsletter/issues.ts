import { issue202601 } from "./issues/2026-01";
import type { NewsletterIssue } from "./types";

/** Every published issue. Add new issues here. */
export const NEWSLETTER_ISSUES: readonly NewsletterIssue[] = [issue202601];

export function findIssue(slug: string): NewsletterIssue | undefined {
  return NEWSLETTER_ISSUES.find((issue) => issue.slug === slug);
}
