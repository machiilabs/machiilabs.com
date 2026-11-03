/**
 * One newsletter issue. The web page (`/newsletter/<slug>`), the HTML email,
 * and the plain-text email are all rendered from this, so they never disagree.
 *
 * An issue is a snapshot: it keeps its own copy and version numbers instead of
 * reading the live release data, so it still says what it said when it went out.
 */

export type NewsletterImage = {
  /** File name in `public/newsletter/<slug>/`. */
  file: string;
  width: number;
  height: number;
  alt: string;
};

export type NewsletterPoint = {
  title: string;
  body: string;
};

export type NewsletterProduct = {
  /** Small caps line above the name, e.g. "Video organizer · Mac · Free". */
  eyebrow: string;
  name: string;
  /** One sentence on what the product is, for readers who don't know it yet. */
  tagline: string;
  icon: NewsletterImage;
  image: NewsletterImage;
  /** A short introduction for newcomers. */
  intro: string;
  /** The product's main highlights. */
  highlights: NewsletterPoint[];
  /** Heading for the what's-new box, e.g. "New in 1.5". */
  whatsNewTitle: string;
  whatsNew: NewsletterPoint[];
  /** Line under the button, e.g. "macOS 26 or later". */
  requirements: string;
  cta: { label: string; path: string };
  /** Card header tint. */
  tint: string;
};

export type NewsletterIssue = {
  /** `YYYY-NN`: the year and the issue's number within that year. */
  slug: string;
  /** Shown in the header, e.g. "No. 1 · November 2026". */
  dateline: string;
  subject: string;
  /** Hidden line most inboxes show after the subject. */
  preheader: string;
  headline: string;
  subhead: string;
  greeting: string;
  intro: string[];
  products: NewsletterProduct[];
  closing: string[];
  signature: string[];
};
