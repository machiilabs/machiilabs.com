/**
 * The newsletter's one design. Renders an issue three ways from one source:
 * - `email`: table layout with inline styles, a "View in browser" link, and
 *   the unsubscribe placeholder that scripts/send-mailing.py fills per person.
 * - `web`: the same layout served at /newsletter/<slug>, unlisted.
 * - plain text: the email's text/plain part.
 * Corrections use the same shell with a single correction block.
 *
 * Every recipient gets identical image and page URLs. Only the unsubscribe
 * link carries a per-person token, so nothing here can tell who opened what.
 *
 * Changing anything in this file is a design change: see the newsletter skill.
 */

import { NEWSLETTER_PRODUCTS } from "./products";
import type {
  NewsletterCorrection,
  NewsletterImage,
  NewsletterIssue,
  NewsletterPoint,
  NewsletterProductCard,
} from "./types";

export const UNSUBSCRIBE_PLACEHOLDER = "~unsubscribe_token";
export const POSTAL_ADDRESS = "Mach II Labs · P.O. Box 72004 · Phoenix, AZ 85050";
/** Where a web copy shows its correction notes. The web route replaces it. */
export const CORRECTIONS_MARKER = "<!--newsletter:corrections-->";

export type RenderMode = "email" | "web";
type Context = { mode: RenderMode; origin: string; dateline: string };

const COLOR = {
  canvas: "#eceef1",
  paper: "#ffffff",
  ink: "#070b12",
  text: "#1f2937",
  muted: "#5b6472",
  border: "#e2e5ea",
  fog: "#9aa8bd",
  snow: "#eef2f7",
  afterburn: "#e8a045",
  horizon: "#3d6f9a",
  newBox: "#fdf5e9",
  correctionBox: "#fff4d6",
};

// System fonts only: loading web fonts would mean a third-party fetch from the reader's mail app.
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COLUMN = 600;
const CARD = COLUMN - 64; // column minus 32px side padding
const CARD_IMAGE = CARD - 2; // inside the 1px card border
const LOGO: NewsletterImage = { path: "shared/logo-mark.png", width: 96, height: 96, alt: "Mach II Labs" };

const BODY_TEXT = `font-family:${FONT};font-size:17px;line-height:26px;color:${COLOR.text};`;
const FOOTER_TEXT = `margin:0 0 8px;font-family:${FONT};font-size:13px;line-height:19px;color:${COLOR.muted};`;
const LINK = `color:${COLOR.horizon};text-decoration:underline;`;

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function issueUrl(origin: string, slug: string): string {
  return `${origin}/newsletter/${slug}`;
}

function imageUrl(origin: string, image: NewsletterImage): string {
  return `${origin}/newsletter/${image.path.split("/").map(encodeURIComponent).join("/")}`;
}

function unsubscribeUrl(origin: string): string {
  return `${origin}/mailing-list/unsubscribe?token=${UNSUBSCRIBE_PLACEHOLDER}`;
}

function img(origin: string, image: NewsletterImage, width: number, style = ""): string {
  const height = Math.round((width * image.height) / image.width);
  return (
    `<img src="${esc(imageUrl(origin, image))}" width="${width}" height="${height}" alt="${esc(image.alt)}" ` +
    `style="display:block;border:0;outline:none;text-decoration:none;width:100%;max-width:${width}px;height:auto;${style}">`
  );
}

function spacer(px: number): string {
  return `<div style="height:${px}px;line-height:${px}px;font-size:0;">&nbsp;</div>`;
}

function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${COLOR.afterburn}" style="border-radius:6px;">
<a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:700;color:${COLOR.ink};text-decoration:none;border-radius:6px;">${esc(label)}</a>
</td></tr></table>`;
}

function eyebrow(text: string, color: string): string {
  return `<p style="margin:0;font-family:${FONT};font-size:12px;line-height:16px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${color};">${esc(text)}</p>`;
}

function paragraphs(items: readonly string[]): string {
  return items.map((p) => `<p style="margin:0 0 16px;${BODY_TEXT}">${esc(p)}</p>`).join("\n");
}

function points(items: readonly NewsletterPoint[]): string {
  return items
    .map(
      (item, index) =>
        `<p style="margin:${index === 0 ? 0 : 14}px 0 0;font-family:${FONT};font-size:15px;line-height:22px;color:${COLOR.text};">` +
        `<strong style="color:${COLOR.ink};">${esc(item.title)}</strong><br>${esc(item.body)}</p>`,
    )
    .join("\n");
}

function productCard(origin: string, card: NewsletterProductCard): string {
  const product = NEWSLETTER_PRODUCTS[card.product];
  return `<tr><td class="px" style="padding:12px 32px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLOR.border};border-radius:10px;border-collapse:separate;overflow:hidden;">
<tr><td bgcolor="${product.tint}" class="card-pad" style="padding:22px 24px;border-radius:10px 10px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="56" style="width:56px;padding-right:16px;">${img(origin, product.icon, 56, "border-radius:12px;")}</td>
<td valign="middle">
${eyebrow(product.eyebrow, COLOR.muted)}
<h2 style="margin:4px 0 0;font-family:${FONT};font-size:24px;line-height:30px;font-weight:800;color:${COLOR.ink};">${esc(product.name)}</h2>
</td></tr></table>
<p style="margin:14px 0 0;font-family:${FONT};font-size:17px;line-height:24px;font-weight:600;color:${COLOR.ink};">${esc(card.tagline)}</p>
</td></tr>
<tr><td style="padding:0;border-top:1px solid ${COLOR.border};border-bottom:1px solid ${COLOR.border};">${img(origin, card.image, CARD_IMAGE)}</td></tr>
<tr><td class="card-pad" style="padding:22px 24px 26px;">
<p style="margin:0;font-family:${FONT};font-size:16px;line-height:25px;color:${COLOR.text};">${esc(card.intro)}</p>
${spacer(22)}
${eyebrow("Highlights", COLOR.muted)}
${spacer(10)}
${points(card.highlights)}
${spacer(24)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${COLOR.newBox}" style="padding:18px 20px;border-left:4px solid ${COLOR.afterburn};">
<p style="margin:0 0 12px;font-family:${FONT};font-size:17px;line-height:22px;font-weight:800;color:${COLOR.ink};">${esc(card.whatsNewTitle)}</p>
${points(card.whatsNew)}
</td></tr></table>
${spacer(24)}
${button(card.ctaLabel, `${origin}${product.ctaPath}`)}
<p style="margin:10px 0 0;font-family:${FONT};font-size:13px;line-height:18px;color:${COLOR.muted};">${esc(product.requirements)}</p>
</td></tr>
</table>
</td></tr>`;
}

/** The page every issue and correction shares: canvas, header band, paper, footer. */
function shell(
  ctx: Context,
  parts: { title: string; preheader: string; viewUrl: string; eyebrowText: string; headline: string; subhead?: string; body: string },
): string {
  const { mode, origin } = ctx;

  const topBar =
    mode === "email"
      ? `<tr><td align="right" class="px" style="padding:14px 32px 10px;font-family:${FONT};font-size:12px;line-height:16px;color:${COLOR.muted};">
<a href="${esc(parts.viewUrl)}" style="${LINK}">View in browser</a></td></tr>`
      : `<tr><td style="padding:14px 0 10px;font-size:0;line-height:0;">&nbsp;</td></tr>
${CORRECTIONS_MARKER}`;

  const preheader =
    mode === "email"
      ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${COLOR.canvas};">${esc(parts.preheader)}${"&#8199;&#65279;&#847; ".repeat(40)}</div>`
      : "";

  const footer =
    mode === "email"
      ? `<p style="${FOOTER_TEXT}">You’re receiving this because you signed up for Mach II Labs product news at machiilabs.com.</p>
<p style="${FOOTER_TEXT}">If you don’t want to receive this type of email in the future, please <a href="${esc(unsubscribeUrl(origin))}" style="${LINK}">unsubscribe</a>.</p>`
      : `<p style="${FOOTER_TEXT}">This is the web copy of a Mach II Labs newsletter. Subscribers can leave the list with the unsubscribe link at the bottom of the email.</p>`;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
${mode === "web" ? '<meta name="robots" content="noindex, nofollow">\n' : ""}<title>${esc(parts.title)}</title>
<style>
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
  a { color: ${COLOR.horizon}; }
  @media (max-width: 620px) {
    .px { padding-left: 16px !important; padding-right: 16px !important; }
    .card-pad { padding-left: 18px !important; padding-right: 18px !important; }
    .headline { font-size: 26px !important; line-height: 32px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.canvas};">
${preheader}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.canvas}" style="background:${COLOR.canvas};">
<tr><td align="center" style="padding:0 0 32px;">
<table role="presentation" width="${COLUMN}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${COLUMN}px;">
${topBar}
<tr><td bgcolor="${COLOR.ink}" align="center" class="px" style="padding:36px 32px 34px;">
<a href="${esc(origin)}" style="text-decoration:none;">${img(origin, LOGO, 48, "margin:0 auto;")}</a>
${spacer(16)}
${eyebrow(parts.eyebrowText, COLOR.fog)}
<h1 class="headline" style="margin:12px 0 0;font-family:${FONT};font-size:32px;line-height:38px;font-weight:800;color:${COLOR.snow};">${esc(parts.headline)}</h1>
${parts.subhead ? `<p style="margin:10px 0 0;font-family:${FONT};font-size:16px;line-height:22px;color:${COLOR.fog};">${esc(parts.subhead)}</p>` : ""}
</td></tr>
<tr><td bgcolor="${COLOR.paper}" style="background:${COLOR.paper};padding:0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${parts.body}
</table>
</td></tr>
<tr><td class="px" style="padding:24px 32px 0;">
${footer}
<p style="${FOOTER_TEXT}">${esc(POSTAL_ADDRESS)}</p>
<p style="${FOOTER_TEXT}"><a href="${esc(origin)}" style="${LINK}">machiilabs.com</a> · <a href="${esc(origin)}/privacy" style="${LINK}">Privacy</a> · <a href="mailto:support@machiilabs.com" style="${LINK}">support@machiilabs.com</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}

export function renderNewsletterHtml(issue: NewsletterIssue, ctx: Context): string {
  const body = `<tr><td class="px" style="padding:32px 32px 12px;">
<p style="margin:0 0 16px;${BODY_TEXT}">${esc(issue.greeting)}</p>
${paragraphs(issue.intro)}
</td></tr>
${issue.products.map((card) => productCard(ctx.origin, card)).join("\n")}
<tr><td class="px" style="padding:8px 32px 36px;">
${paragraphs(issue.closing)}
<p style="margin:0;${BODY_TEXT}">${issue.signature.map(esc).join("<br>")}</p>
</td></tr>`;

  return shell(ctx, {
    title: issue.subject,
    preheader: issue.preheader,
    viewUrl: issueUrl(ctx.origin, issue.slug),
    eyebrowText: `Mach II Labs · ${ctx.dateline}`,
    headline: issue.headline,
    subhead: issue.subhead,
    body,
  });
}

function correctionBlock(origin: string, correction: NewsletterCorrection): string {
  const link = correction.link
    ? `<p style="margin:14px 0 0;font-family:${FONT};font-size:16px;line-height:24px;"><a href="${esc(origin + correction.link.path)}" style="${LINK}font-weight:700;">${esc(correction.link.label)}</a></p>`
    : "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${COLOR.correctionBox}" style="padding:18px 20px;border-left:4px solid ${COLOR.afterburn};">
<p style="margin:0 0 10px;font-family:${FONT};font-size:17px;line-height:22px;font-weight:800;color:${COLOR.ink};">${esc(correction.heading)}</p>
${correction.body.map((p, i) => `<p style="margin:${i === 0 ? 0 : 12}px 0 0;font-family:${FONT};font-size:15px;line-height:22px;color:${COLOR.text};">${esc(p)}</p>`).join("\n")}
${link}
</td></tr></table>`;
}

/** The note a sent issue's web copy shows at the top once its correction has gone out. */
export function renderCorrectionNotice(origin: string, correction: NewsletterCorrection, sentOn: string): string {
  return `<tr><td class="px" style="padding:0 32px 16px;">
${eyebrow(`Correction · ${sentOn}`, COLOR.muted)}
${spacer(8)}
${correctionBlock(origin, correction)}
</td></tr>`;
}

export function renderCorrectionHtml(correction: NewsletterCorrection, ctx: Context): string {
  const body = `<tr><td class="px" style="padding:32px 32px 12px;">
<p style="margin:0 0 16px;${BODY_TEXT}">Hello,</p>
<p style="margin:0 0 20px;${BODY_TEXT}">We need to correct something in our last newsletter.</p>
${correctionBlock(ctx.origin, correction)}
${spacer(20)}
<p style="margin:0 0 16px;${BODY_TEXT}">The <a href="${esc(issueUrl(ctx.origin, correction.issue))}" style="${LINK}">web copy of the newsletter</a> shows this correction too. Sorry for the trouble.</p>
<p style="margin:0 0 24px;${BODY_TEXT}">Mach II Labs</p>
</td></tr>`;

  return shell(ctx, {
    title: correction.subject,
    preheader: correction.heading,
    viewUrl: issueUrl(ctx.origin, correction.issue),
    eyebrowText: `Mach II Labs · Correction to ${ctx.dateline}`,
    headline: correction.heading,
    body,
  });
}

function textPoints(items: readonly NewsletterPoint[]): string {
  return items.map((item) => `- ${item.title}: ${item.body}`).join("\n");
}

function textFooter(origin: string): string[] {
  return [
    "--",
    "You’re receiving this because you signed up for Mach II Labs product news at machiilabs.com.",
    `If you don’t want to receive this type of email in the future, unsubscribe here: ${unsubscribeUrl(origin)}`,
    POSTAL_ADDRESS,
    "",
  ];
}

export function renderNewsletterText(issue: NewsletterIssue, { origin, dateline }: { origin: string; dateline: string }): string {
  const rule = "=".repeat(48);
  const products = issue.products.map((card) => {
    const product = NEWSLETTER_PRODUCTS[card.product];
    return [
      rule,
      product.name.toUpperCase(),
      product.eyebrow,
      "",
      card.tagline,
      "",
      card.intro,
      "",
      "Highlights",
      textPoints(card.highlights),
      "",
      card.whatsNewTitle,
      textPoints(card.whatsNew),
      "",
      `${card.ctaLabel}: ${origin}${product.ctaPath}`,
      product.requirements,
    ].join("\n");
  });

  return [
    `MACH II LABS · ${dateline}`,
    issue.headline,
    issue.subhead,
    "",
    `View in your browser: ${issueUrl(origin, issue.slug)}`,
    "",
    issue.greeting,
    "",
    ...issue.intro.flatMap((p) => [p, ""]),
    ...products.flatMap((p) => [p, ""]),
    rule,
    "",
    ...issue.closing.flatMap((p) => [p, ""]),
    ...issue.signature,
    "",
    ...textFooter(origin),
  ].join("\n");
}

export function renderCorrectionText(
  correction: NewsletterCorrection,
  { origin, dateline }: { origin: string; dateline: string },
): string {
  return [
    `MACH II LABS · Correction to ${dateline}`,
    "",
    "Hello,",
    "",
    "We need to correct something in our last newsletter.",
    "",
    correction.heading,
    "",
    ...correction.body.flatMap((p) => [p, ""]),
    ...(correction.link ? [`${correction.link.label}: ${origin}${correction.link.path}`, ""] : []),
    `The web copy of the newsletter shows this correction too: ${issueUrl(origin, correction.issue)}`,
    "Sorry for the trouble.",
    "",
    "Mach II Labs",
    "",
    ...textFooter(origin),
  ].join("\n");
}
