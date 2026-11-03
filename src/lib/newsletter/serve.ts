/**
 * What the newsletter routes return. Sent issues come from their frozen copy;
 * everything else is rendered from the issue file. In production only ready
 * and sent issues exist; drafts are visible in dev and previews only.
 */

import { FROZEN_ISSUES } from "./frozen";
import { findCorrection, findIssue } from "./issues";
import { REGISTRY, dateline, type NewsletterStatus } from "./registry";
import {
  CORRECTIONS_MARKER,
  renderCorrectionHtml,
  renderCorrectionNotice,
  renderCorrectionText,
  renderNewsletterHtml,
  renderNewsletterText,
} from "./render";

/** The origin frozen copies and real sends use. */
export const CANONICAL_ORIGIN = "https://machiilabs.com";

function visible(status: NewsletterStatus | undefined): boolean {
  if (!status) return false;
  return process.env.VERCEL_ENV !== "production" || status !== "draft";
}

export function issuePayload(slug: string, kind: "web" | "email" | "text", origin: string): string | null {
  const issue = findIssue(slug);
  const state = REGISTRY.issues[slug];
  if (!issue || !visible(state?.status)) return null;

  const frozen = FROZEN_ISSUES[slug];
  const base = frozen ? CANONICAL_ORIGIN : origin;
  const line = dateline(slug, state.month);
  const body = frozen
    ? frozen[kind]
    : kind === "text"
      ? renderNewsletterText(issue, { origin, dateline: line })
      : renderNewsletterHtml(issue, { mode: kind, origin, dateline: line });
  if (kind !== "web") return body;

  const correction = findCorrection(slug);
  const sentOn = REGISTRY.corrections[slug]?.sentOn;
  const notice = correction && sentOn ? renderCorrectionNotice(base, correction, sentOn) : "";
  return body.replace(CORRECTIONS_MARKER, notice);
}

export function correctionPayload(slug: string, kind: "email" | "text", origin: string): string | null {
  const correction = findCorrection(slug);
  const state = REGISTRY.corrections[slug];
  const issueState = REGISTRY.issues[slug];
  if (!correction || !issueState || !visible(state?.status)) return null;

  const line = dateline(slug, issueState.month);
  return kind === "text"
    ? renderCorrectionText(correction, { origin, dateline: line })
    : renderCorrectionHtml(correction, { mode: "email", origin, dateline: line });
}

export function issueSubject(slug: string): string | undefined {
  return findIssue(slug)?.subject;
}

export function correctionSubject(slug: string): string | undefined {
  return findCorrection(slug)?.subject;
}
