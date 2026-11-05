# Liszt Mail announcement page — plan

**Why:** the owner chose **Liszt Mail** as the name for the email app built today as PostMach (2026-11-05), after another developer launched "Halyard Mail" under a name we had considered. A public page dates our use of the name. It is not a trademark filing, which the owner will make separately.

## What

- A new page at **`/lisztmail`** on machiilabs.com: "Liszt Mail — coming soon".
- `lisztmail.com` (the owner is registering it) will later point here through Vercel's domain settings.

## Content (claims limited to what the app does today)

- **Eyebrow:** Coming soon · Mac, iPhone and iPad
- **Title:** Liszt Mail
- **Line:** Make your inbox a short list.
- **Lead:** a native email app that separates the mail that matters from the mail that doesn't, and keeps it all on your devices.
- **Six points:**
  1. Decide once (Clear, Keep, Pin; the screen changes at once; undo anything).
  2. Sections that explain themselves (Priority, People, Newsletters, Notifications; New Senders to accept or block; every placement has a reason).
  3. Private by design (no tracking, analytics or ads; remote images blocked until allowed; passwords in your Keychain; mail on your devices).
  4. Every account in one app (Gmail with Sign in with Google, iCloud, Yahoo, Fastmail, any IMAP).
  5. Fast with years of mail (opening, clearing and search without waiting on the network).
  6. **$29.99 once, every update included** (owner, 2026-11-05): one price for Mac, iPhone and iPad; every future version free; no subscription, no upgrade fees, no account with us. A public, permanent promise: no paid major upgrades, ever.
- **Sign-up:** the existing company-wide `AnnouncementSignup` ("Product announcements"). No database change.
- **Header:** `SiteHeader` in its lab form (no product nav), so the site's navigation is unchanged.

## Not in this change

- The site header's navigation is unchanged. **Home page (owner, 2026-11-05):** a full-width "Coming soon" Liszt Mail card under the two product cards (text only, no icon yet), and "Liszt Mail" in the jump links when they show.
- No screenshots yet (the app's look may still change before launch).
- No release branch: there is nothing to download.

## Steps

1. Branch `liszt-mail-announcement` from `origin/main`.
2. Add `src/app/lisztmail/page.tsx` in Skagway's visual language (ink background, display type, the same eyebrow, heading and copy scale).
3. Type-check and lint.
4. Commit; the owner reviews; on the owner's word, push the branch and open a pull request (Vercel builds a preview). The owner merges to `main`.
5. After `lisztmail.com` is registered: add it as a domain in Vercel, redirecting to `/lisztmail`.
