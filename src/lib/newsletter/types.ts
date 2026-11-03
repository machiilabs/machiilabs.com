/**
 * Newsletter data. The web page (`/newsletter/<slug>`), the HTML email, and
 * the plain-text email are all rendered from an issue, so they never disagree.
 *
 * Issues hold text, image names, and links only. The look lives in render.ts;
 * each product's identity (name, icon, colors, link) lives in products.ts.
 * Lifecycle (status, approval, sends) lives in registry.json.
 *
 * Process: .claude/skills/newsletter/SKILL.md. Plan: docs/newsletter-process-plan.md.
 */

import type { NewsletterProductId } from "./products";

export type NewsletterImage = {
  /** Path under `public/newsletter/`, e.g. "2026-01/skagway-library.jpg" or "shared/logo-mark.png". */
  path: string;
  width: number;
  height: number;
  alt: string;
};

/** A link on a phrase that already appears in the text. Text stays plain; the renderer adds the link. */
export type NewsletterLink = {
  text: string;
  /** An https:// address. */
  url: string;
};

export type NewsletterPoint = {
  title: string;
  body: string;
};

/** One product card. Everything that identifies the product comes from products.ts. */
export type NewsletterProductCard = {
  product: NewsletterProductId;
  /** One sentence on what the product is, for readers who don't know it yet. */
  tagline: string;
  /** Screenshot or photo, 1200 px wide, in this issue's folder. */
  image: NewsletterImage;
  /** A short introduction for newcomers. */
  intro: string;
  /** Phrases in `intro` to link, e.g. a store that sells a needed accessory. Each phrase must appear in `intro`. */
  introLinks?: NewsletterLink[];
  /** Three or four main highlights. */
  highlights: NewsletterPoint[];
  /** Heading for the what's-new box, e.g. "New in Skagway 1.5". */
  whatsNewTitle: string;
  /** Two to four items. */
  whatsNew: NewsletterPoint[];
  /** Button text, e.g. "Get Skagway 1.5". */
  ctaLabel: string;
};

export type NewsletterIssue = {
  /** `YYYY-NN`: the year it goes out and its number within that year. */
  slug: string;
  subject: string;
  /** Hidden line most inboxes show after the subject. */
  preheader: string;
  headline: string;
  subhead: string;
  greeting: string;
  intro: string[];
  products: NewsletterProductCard[];
  closing: string[];
  signature: string[];
};

/** An emergency correction to an issue that has already gone out. */
export type NewsletterCorrection = {
  /** The sent issue this corrects. */
  issue: string;
  /** Email subject. */
  subject: string;
  heading: string;
  /** At most 600 characters in all, in one or two paragraphs. */
  body: string[];
  link?: { label: string; path: string };
};
