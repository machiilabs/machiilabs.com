# Newsletter plan

Written 2026-11-03. Owner decisions are binding; everything else is a proposal.

## Owner decisions

- Each issue is a web page at `/newsletter/YYYY-NN`. Only subscribers know about it, through the email.
- The email's images load from the site.
- The email has a "View in browser" link to the issue's page.
- The first issue covers the latest Skagway and the latest 15 CE Flasher: what's new, plus the main highlights of each, because we don't know which product brought a subscriber in.

## Owner answers (2026-11-03)

1. `NN` is the issue's number within the year: the first issue is `2026-01`.
2. Postal address: P.O. Box 72004, Phoenix, AZ 85050.
3. 15CE Flasher gets one section covering Mac and Windows.
4. New images can be made for each issue: photos or generated images that tell the story, with no people in them. Issue 2026-01 starts from the existing screenshots.

## Design

### Quality bar

The owner's reference is The Calculator Store's anniversary email (October 31, 2026). Match its polish, not its look. What makes it work:

- A solid header band with a small letter-spaced name ("THE CALCULATOR STORE") over one bold headline and one supporting line.
- A white 600 px column on a light gray canvas, with generous padding.
- One unmistakable call-to-action button, high in the email.
- A short, warm opening paragraph before any product detail.
- Each item in its own bordered card with a tinted background, a bold heading and a full-width photo.
- Real typographic hierarchy: eyebrow, headline, subhead and body, at comfortable line lengths.

The Mach II Labs version uses the site's brand:

- **Header band:** ink `#070b12`, with the wordmark or "MACH II LABS" eyebrow in fog `#9aa8bd` and the headline in snow `#eef2f7`.
- **Buttons and accents:** afterburn `#e8a045` with ink text (the admin page's button style); horizon `#3d6f9a` for links.
- **One card per product:** a light tint per product, product icon, bold heading, screenshot, a "what it is" line for newcomers, then what's new, then a Download button.
- **Body:** a white column on a light canvas, because ink-on-white survives every mail app's dark-mode recoloring better than an all-dark email.

### One source for each issue

Each issue is one typed data file, `src/lib/newsletter/issues/2026-01.ts`. It holds the subject, the preview line, and a section per product: intro, what's new, image, and download link. The web page and the email are both rendered from that file, so they can never disagree.

The issue keeps its own copy and version numbers rather than reading `skagway-releases.ts`. An issue is a snapshot: after a later release it must still say what it said when it went out.

### Web page: `/newsletter/[issue]`

- Serves the same layout as the email (one renderer, `src/lib/newsletter/render.ts`), so "View in browser" shows exactly what the email looks like. It drops the "View in browser" link and the personal unsubscribe link.
- Unlisted. Sets `robots: noindex`, isn't in `sitemap.ts`, and isn't linked from the nav. It is deliberately **not** added to `robots.ts`, because a disallow line there would publish the path to anyone who reads robots.txt.
- Unknown issues return 404. The routes render per request (`force-dynamic`), so links and images use the origin the reader came from: localhost in dev, machiilabs.com in production.
- Unlisted isn't private: a forwarded link opens the page. That's normal for a newsletter, and the page carries no personal data.

### Email: `/newsletter/[issue]/email` (HTML) and `/newsletter/[issue]/email/text` (plain text)

- Route handlers that render the same issue data as email HTML: a 600 px column built from tables, styles written inline, and buttons that survive Outlook.
- Top: a hidden preview line, then "View in browser" linking to the issue page.
- Images are absolute `https://machiilabs.com/newsletter/2026-01/…` URLs. They're PNG or JPEG at 2× (1200 px wide, shown at 600), because Gmail doesn't show SVG. Every image has a real `alt` text, and the email reads fully without images, since many mail apps block remote images until the reader allows them.
- Fonts: the system font stack only (San Francisco on Apple devices). Loading the site's web fonts would mean a third-party fetch from the reader's mail app, which breaks the privacy promise.
- Dark mode: logo and images checked on dark backgrounds, and colors chosen so automatic dark-mode recoloring stays readable.
- Footer: the postal address and the unsubscribe link with `~unsubscribe_token`.
- HTML kept under 102 KB, the size where Gmail clips a message.

### Privacy

- Every recipient's image URLs and "View in browser" link are identical. No per-person tokens appear anywhere except the unsubscribe link, so a page view or an image load can't be tied to a person. No open or click tracking.
- `/privacy` gains a line saying newsletter images load from machiilabs.com and nothing tracks who opened what.

### Sending: `scripts/send-mailing.py` (superseded by `docs/newsletter-process-plan.md`)

- The draft file shrinks to `From:` and `Issue: 2026-01`.
- The script fetches `/newsletter/2026-01/email` and `/email/text` from the site, takes the subject from the issue, and refuses to send unless the issue page itself answers 200. That guarantees "View in browser" works before anyone receives the email.
- `--site http://localhost:3000` points it at a local dev server for `--dry-run` and early tests.
- Everything else stays as it is: one message per subscriber, the unsubscribe headers, the 900-a-day cap and the resume log.

## Per-issue workflow

1. Branch from `origin/main`, for example `newsletter-2026-01`.
2. Write the issue file and add its images to `public/newsletter/2026-01/`.
3. Review the page and the email locally (`bash scripts/dev.sh`, then `send-mailing.py … --site http://localhost:3000 --dry-run`).
4. The owner merges the pull request. The page and images go live, unlisted.
5. Send `--test` to the owner. Check Apple Mail, Gmail on the web and on iOS, and dark mode.
6. Send to the list.

## Build order

1. **Owner:** merge #27, which has the one-click unsubscribe fix and the script.
2. Newsletter page, email route handlers, and the shared issue renderer. Read the Next.js docs in `node_modules/next/dist/docs/` first, as AGENTS.md requires.
3. Issue 2026-01: copy drafted from the Skagway and Flasher changelogs for owner review, plus images.
4. Update the script to fetch the issue from the site.
5. Privacy page line.
6. Steps 3–6 of the per-issue workflow.

The Mac sending app is on hold until the first issue has gone out.

## Status

- 2026-11-03: Built the issue data, the shared renderer, the three routes, and issue 2026-01's draft copy and images on `newsletter-2026-01`. Checked in WebKit at 760 px and 390 px. The email HTML is 19.6 KB (Gmail clips at 102 KB). The production build lists all three routes as dynamic.
- Before sending: the 15CE Flasher screenshot shows version 1.1.0 and its old "will not flash other calculators" warning, which contradicts the issue's 16c and 12c news. It needs a current image.
- 2026-11-03: Design addition, at the owner’s request. A product card can link phrases in its intro (`introLinks`), and the check confirms each phrase appears and the address is https. First use: 15CE Flasher’s intro links “The Calculator Store” to its pogo cable page, the same link the Flasher page uses.
