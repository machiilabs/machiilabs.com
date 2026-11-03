/**
 * Renders a newsletter issue three ways from one source:
 * - `email`: table layout with inline styles, a "View in browser" link, and
 *   the unsubscribe placeholder that scripts/send-mailing.py fills per person.
 * - `web`: the same layout served at /newsletter/<slug>, unlisted.
 * - plain text: the email's text/plain part.
 *
 * Every recipient gets identical image and page URLs. Only the unsubscribe
 * link carries a per-person token, so nothing here can tell who opened what.
 */

import type { NewsletterImage, NewsletterIssue, NewsletterPoint, NewsletterProduct } from "./types";

export const UNSUBSCRIBE_PLACEHOLDER = "~unsubscribe_token";
export const POSTAL_ADDRESS = "Mach II Labs · P.O. Box 72004 · Phoenix, AZ 85050";

export type RenderMode = "email" | "web";

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
};

// System fonts only: loading web fonts would mean a third-party fetch from the reader's mail app.
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COLUMN = 600;
const CARD = COLUMN - 64; // column minus 32px side padding
const CARD_IMAGE = CARD - 2; // inside the 1px card border

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function issueUrl(origin: string, issue: NewsletterIssue): string {
  return `${origin}/newsletter/${issue.slug}`;
}

function imageUrl(origin: string, issue: NewsletterIssue, image: NewsletterImage): string {
  return `${origin}/newsletter/${issue.slug}/${encodeURIComponent(image.file)}`;
}

function unsubscribeUrl(origin: string): string {
  return `${origin}/mailing-list/unsubscribe?token=${UNSUBSCRIBE_PLACEHOLDER}`;
}

function img(src: string, image: NewsletterImage, width: number, style = ""): string {
  const height = Math.round((width * image.height) / image.width);
  return (
    `<img src="${esc(src)}" width="${width}" height="${height}" alt="${esc(image.alt)}" ` +
    `style="display:block;border:0;outline:none;text-decoration:none;width:100%;max-width:${width}px;height:auto;${style}">`
  );
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

function points(items: NewsletterPoint[]): string {
  return items
    .map(
      (item, index) =>
        `<p style="margin:${index === 0 ? 0 : 14}px 0 0;font-family:${FONT};font-size:15px;line-height:22px;color:${COLOR.text};">` +
        `<strong style="color:${COLOR.ink};">${esc(item.title)}</strong><br>${esc(item.body)}</p>`,
    )
    .join("\n");
}

function productCard(origin: string, issue: NewsletterIssue, product: NewsletterProduct): string {
  const cta = `${origin}${product.cta.path}`;
  return `<tr><td class="px" style="padding:12px 32px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLOR.border};border-radius:10px;border-collapse:separate;overflow:hidden;">
<tr><td bgcolor="${product.tint}" class="card-pad" style="padding:22px 24px;border-radius:10px 10px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="56" style="width:56px;padding-right:16px;">${img(imageUrl(origin, issue, product.icon), product.icon, 56, "border-radius:12px;")}</td>
<td valign="middle">
${eyebrow(product.eyebrow, COLOR.muted)}
<h2 style="margin:4px 0 0;font-family:${FONT};font-size:24px;line-height:30px;font-weight:800;color:${COLOR.ink};">${esc(product.name)}</h2>
</td></tr></table>
<p style="margin:14px 0 0;font-family:${FONT};font-size:17px;line-height:24px;font-weight:600;color:${COLOR.ink};">${esc(product.tagline)}</p>
</td></tr>
<tr><td style="padding:0;border-top:1px solid ${COLOR.border};border-bottom:1px solid ${COLOR.border};">${img(imageUrl(origin, issue, product.image), product.image, CARD_IMAGE)}</td></tr>
<tr><td class="card-pad" style="padding:22px 24px 26px;">
<p style="margin:0;font-family:${FONT};font-size:16px;line-height:25px;color:${COLOR.text};">${esc(product.intro)}</p>
<div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
${eyebrow("Highlights", COLOR.muted)}
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
${points(product.highlights)}
<div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${COLOR.newBox}" style="padding:18px 20px;border-left:4px solid ${COLOR.afterburn};">
<p style="margin:0 0 12px;font-family:${FONT};font-size:17px;line-height:22px;font-weight:800;color:${COLOR.ink};">${esc(product.whatsNewTitle)}</p>
${points(product.whatsNew)}
</td></tr></table>
<div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
${button(product.cta.label, cta)}
<p style="margin:10px 0 0;font-family:${FONT};font-size:13px;line-height:18px;color:${COLOR.muted};">${esc(product.requirements)}</p>
</td></tr>
</table>
</td></tr>`;
}

export function renderNewsletterHtml(
  issue: NewsletterIssue,
  { mode, origin }: { mode: RenderMode; origin: string },
): string {
  const page = issueUrl(origin, issue);
  const link = `color:${COLOR.horizon};text-decoration:underline;`;
  const footerText = `margin:0 0 8px;font-family:${FONT};font-size:13px;line-height:19px;color:${COLOR.muted};`;
  const logo: NewsletterImage = { file: "logo-mark.png", width: 96, height: 96, alt: "Mach II Labs" };

  const topBar =
    mode === "email"
      ? `<tr><td align="right" class="px" style="padding:14px 32px 10px;font-family:${FONT};font-size:12px;line-height:16px;color:${COLOR.muted};">
<a href="${esc(page)}" style="${link}">View in browser</a></td></tr>`
      : `<tr><td style="padding:14px 0 10px;font-size:0;line-height:0;">&nbsp;</td></tr>`;

  const preheader =
    mode === "email"
      ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${COLOR.canvas};">${esc(issue.preheader)}${"&#8199;&#65279;&#847; ".repeat(40)}</div>`
      : "";

  const footer =
    mode === "email"
      ? `<p style="${footerText}">You’re receiving this because you signed up for Mach II Labs product news at machiilabs.com.</p>
<p style="${footerText}">If you don’t want to receive this type of email in the future, please <a href="${esc(unsubscribeUrl(origin))}" style="${link}">unsubscribe</a>.</p>`
      : `<p style="${footerText}">This is the web copy of a Mach II Labs newsletter. Subscribers can leave the list with the unsubscribe link at the bottom of the email.</p>`;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
${mode === "web" ? '<meta name="robots" content="noindex, nofollow">\n' : ""}<title>${esc(issue.subject)}</title>
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
<a href="${esc(origin)}" style="text-decoration:none;">${img(imageUrl(origin, issue, logo), logo, 48, "margin:0 auto;")}</a>
<div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
${eyebrow(`Mach II Labs · ${issue.dateline}`, COLOR.fog)}
<h1 class="headline" style="margin:12px 0 0;font-family:${FONT};font-size:32px;line-height:38px;font-weight:800;color:${COLOR.snow};">${esc(issue.headline)}</h1>
<p style="margin:10px 0 0;font-family:${FONT};font-size:16px;line-height:22px;color:${COLOR.fog};">${esc(issue.subhead)}</p>
</td></tr>
<tr><td bgcolor="${COLOR.paper}" style="background:${COLOR.paper};padding:0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="px" style="padding:32px 32px 12px;">
<p style="margin:0 0 16px;font-family:${FONT};font-size:17px;line-height:26px;color:${COLOR.text};">${esc(issue.greeting)}</p>
${issue.intro.map((p) => `<p style="margin:0 0 16px;font-family:${FONT};font-size:17px;line-height:26px;color:${COLOR.text};">${esc(p)}</p>`).join("\n")}
</td></tr>
${issue.products.map((product) => productCard(origin, issue, product)).join("\n")}
<tr><td class="px" style="padding:8px 32px 36px;">
${issue.closing.map((p) => `<p style="margin:0 0 16px;font-family:${FONT};font-size:17px;line-height:26px;color:${COLOR.text};">${esc(p)}</p>`).join("\n")}
<p style="margin:0;font-family:${FONT};font-size:17px;line-height:26px;color:${COLOR.text};">${issue.signature.map(esc).join("<br>")}</p>
</td></tr>
</table>
</td></tr>
<tr><td class="px" style="padding:24px 32px 0;">
${footer}
<p style="${footerText}">${esc(POSTAL_ADDRESS)}</p>
<p style="${footerText}"><a href="${esc(origin)}" style="${link}">machiilabs.com</a> · <a href="${esc(origin)}/privacy" style="${link}">Privacy</a> · <a href="mailto:support@machiilabs.com" style="${link}">support@machiilabs.com</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}

function textPoints(items: NewsletterPoint[]): string {
  return items.map((item) => `- ${item.title}: ${item.body}`).join("\n");
}

export function renderNewsletterText(issue: NewsletterIssue, { origin }: { origin: string }): string {
  const rule = "=".repeat(48);
  const products = issue.products.map((product) =>
    [
      rule,
      product.name.toUpperCase(),
      product.eyebrow,
      "",
      product.tagline,
      "",
      product.intro,
      "",
      "Highlights",
      textPoints(product.highlights),
      "",
      product.whatsNewTitle,
      textPoints(product.whatsNew),
      "",
      `${product.cta.label}: ${origin}${product.cta.path}`,
      product.requirements,
    ].join("\n"),
  );

  return [
    `MACH II LABS · ${issue.dateline}`,
    issue.headline,
    issue.subhead,
    "",
    `View in your browser: ${issueUrl(origin, issue)}`,
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
    "--",
    "You’re receiving this because you signed up for Mach II Labs product news at machiilabs.com.",
    `If you don’t want to receive this type of email in the future, unsubscribe here: ${unsubscribeUrl(origin)}`,
    POSTAL_ADDRESS,
    "",
  ].join("\n");
}
