---
name: newsletter
description: Create, edit, review, send, or correct a Mach II Labs newsletter issue. Use whenever the owner mentions the newsletter, an issue, an announcement email to subscribers, or types /newsletter (with or without new, edit, status, send, correction).
---

# Newsletter

The one process for every Mach II Labs newsletter, so each issue looks, reads, and ships the same way. Design: `docs/newsletter-plan.md` and `docs/newsletter-process-plan.md`.

## Always start here: read the state

Never work from memory or the conversation. Every time this skill starts:

1. Run `npm run newsletter status`. It lists each issue and correction and its status (`draft`, `ready`, `sent`), shows whether this month's slot is used, and flags any unfinished send.
2. Check git: which branch is checked out, whether a `newsletter-*` branch exists for the in-progress issue, and its pull request (`gh pr list --head <branch>`).
3. Tell the owner in one or two lines: what's in progress, the step it's on, this month's slot, and what's next.

Then act on what the owner asked:

| Owner says | Nothing in progress | An issue is in progress (the WIP) |
|---|---|---|
| `/newsletter` | Say so; offer to start the next issue. | Continue the WIP from its step. |
| `/newsletter new` | Start the next issue (step 1). | Refuse. One issue at a time; finish or delete the WIP first. |
| `/newsletter edit …` | Refuse: sent issues are frozen. Offer `correction` if it went out in the last 30 days. | Edit the WIP (see "Editing"). |
| `/newsletter status` | Report the state; change nothing. | Same. |
| `/newsletter send` | Nothing to send. | Go to step 8 if the WIP is ready and merged; otherwise say what's missing. |
| `/newsletter correction SLUG` | Start a correction (see "Corrections"). | Same. |

If an unfinished send is listed, finishing it comes first: rerun the same `send-mailing.py` command (step 9).

## Rules that never bend

- **Send only on the owner's word in this session.** Never run a real send, or a test send, without the owner saying so here. Approving the test isn't permission to send to the list; ask, and wait for "send."
- **One newsletter per calendar month.** The script refuses a second, with no override. Don't look for a way around it. Only an emergency correction can go out in the same month.
- **The look lives in the renderer.** Issue files hold plain text, image names, and links only. Never put HTML, styles, or Markdown in an issue. To link a phrase in a product card's intro (for example, the store that sells a needed accessory), list it in that card's `introLinks`. The phrase must appear in the intro, and the address must be https. Links anywhere else are a design change. If an issue needs something the design doesn't have (a new block type, a single-product layout, a different color), stop: that's a design change (see below).
- **Work happens on a branch from `origin/main`.** `main` is the live site and only takes pull requests the owner merges (`.cursor/rules/production-main.mdc`).
- **The owner's full name never appears.** Sign as in the previous issue ("Paul" / "Mach II Labs").
- **Never edit `registry.json` or `frozen/` by hand.** Only `npm run newsletter …` and `send-mailing.py` write them.
- **Keep the owner's guide current.** `docs/newsletter-guide.md` is the owner's version of this process. Any change to the steps, gates, commands, or rules updates it in the same commit.

## Starting a new issue

**Step 1. Start.** Then:

```
git fetch origin main && git switch -c newsletter-YYYY-NN origin/main
npm run newsletter new
```

This creates `src/lib/newsletter/issues/YYYY-NN.ts` from the previous issue. Product taglines, intros, and highlights carry over, and the parts every issue must say anew are `TODO`. It also creates an empty `public/newsletter/YYYY-NN/`. Use the slug it printed as the branch name; if they differ, rename the branch.

**Step 2. Facts.** Read what's actually new. Don't rely on memory:

- Skagway: `src/lib/skagway-releases.ts` (the newest entry), plus `../Skagway` git tags and `CHANGELOG.md`.
- 15CE Flasher: the version constants in `src/app/flasher/page.tsx`, plus `../HP15C-Flasher` and `../15CE-Flasher-Win` tags and release commits (`git log --oneline vX..vY`).

List the versions and features for the owner. **Gate: the owner confirms what to feature.** A product with nothing new can be left out, or kept with its introduction. Ask.

**Step 3. Draft, together.** Write the copy in the issue file using the voice guide below. Run `npm run newsletter check YYYY-NN` as you go. The owner can watch `http://localhost:3000/newsletter/YYYY-NN` (start the dev server with `npm run dev` if it isn't running). Revise until the owner is happy with the words.

**Step 4. Images.** Tell the owner exactly which images are needed, following the image spec below. Put them in `public/newsletter/YYYY-NN/` and set each image's `width` and `height` to the file's real size (`sips -g pixelWidth -g pixelHeight FILE`). To convert a screenshot:

```
sips -s format jpeg -s formatOptions 82 --resampleWidth 1200 IN.png --out public/newsletter/YYYY-NN/NAME.jpg
```

**Gate: the owner supplies or approves every image.**

**Step 5. Check.** `npm run newsletter check YYYY-NN` must pass with no problems and no warnings.

**Step 6. Review.** With the dev server running, `npm run newsletter snap YYYY-NN` writes desktop and phone screenshots to `.newsletter-review/YYYY-NN/`. Show both to the owner, using Read on the PNGs; crop tall images into parts. **Gate: the owner approves the copy and the look.**

Then set the sending month and approve:

```
npm run newsletter approve YYYY-NN            # this month
npm run newsletter approve YYYY-NN --month YYYY-MM   # a later month, if the owner plans one
```

The month becomes the dateline ("No. 2 · December 2026"). If it's in a different year than the slug, approval refuses; renumber first (see "Renumbering"). Commit.

**Step 7. Publish.** Push the branch and open a pull request into `main`: what the issue covers, the review screenshots described, and the check result. **Gate: the owner merges.** Once Vercel deploys, `https://machiilabs.com/newsletter/YYYY-NN` should answer 200. It's unlisted.

## Sending

**Step 8. Test.** The owner pastes the list from machiilabs.com/admin ("Generate mailing list") into `~/Documents/Mailings/YYYY-NN/subscribers.txt`. Then, with the owner's go-ahead:

```
python3 scripts/send-mailing.py issue YYYY-NN --list ~/Documents/Mailings/YYYY-NN/subscribers.txt --test <owner's address>
```

The owner works through the checklist:

- Apple Mail on Mac and iPhone; Gmail on the web and in the iOS app.
- Light and dark mode.
- Every link and both buttons.
- The footer's unsubscribe link has the owner's token.
- Gmail shows its own Unsubscribe button.
- "Show original" shows SPF, DKIM, and DMARC passing.

**Gate: the owner says "send."**

**Step 9. Send.** Run the same command without `--test`, in a terminal the owner can see (it asks for confirmation). Before anything goes out, the script:

- Runs `send-check`: approved, unchanged, this month, and this month's slot free.
- Confirms machiilabs.com serves exactly the approved version.
- Records the start in the ledger.

If the daily cap (900) stops it, tell the owner how many are left. The same command finishes the next day.

**Step 10. Close.** When the send finishes, the script runs `npm run newsletter freeze YYYY-NN` itself: it saves the exact sent copy and marks the issue `sent`. Commit `registry.json` and `src/lib/newsletter/frozen/` on a branch from `origin/main` (`newsletter-YYYY-NN-sent`), and open a pull request. **Gate: the owner merges.** Report the recipient count and any failures from `~/Documents/Mailings/YYYY-NN/issue.log`.

## Editing the WIP

1. Read the state. Say which step the issue is on, and what the edit will cost, **before** editing:
   - **draft:** nothing extra.
   - **ready, not merged:** it goes back to draft and needs steps 5–6 again.
   - **ready and merged (live):** steps 5–7 again, including a new pull request.
2. If it's `ready`, run `npm run newsletter reopen YYYY-NN` first, then make the edit.
3. Continue from step 5.

**Unapproving.** `npm run newsletter reopen YYYY-NN` withdraws approval at any time before the send starts, whether or not you're editing. If the issue is already live, the site keeps the approved version until a pull request with the reopened status merges; then production hides it. Once a send has started, reopening is refused: everyone must get the same version, so finish the send instead.

An approved issue that changes without being reopened fails the check and the build ("changed since it was approved"). That's the safety net, not the process.

## Corrections (emergencies only)

A correction is a short notice that fixes a mistake in an issue that went out: a broken link, or a wrong fact. It isn't a second newsletter. Never use one to announce or promote anything.

1. `npm run newsletter correction-new YYYY-NN`. This refuses if the issue isn't sent, is more than 30 days old, or already has a correction.
2. Write `src/lib/newsletter/corrections/YYYY-NN.ts`: a subject, a heading, at most 600 characters of body, and an optional site link. **Gate: the owner approves the text.**
3. Check, snap (`--correction`), approve (`npm run newsletter approve YYYY-NN --correction`), then a pull request. **Gate: the owner merges.**
4. Test and send with `send-mailing.py correction YYYY-NN …`. It goes only to people who got the issue (from `~/Documents/Mailings/YYYY-NN/issue.log`) and are still on the list. Once it's sent, the issue's web page shows the correction at the top.

## Design changes

Anything in `src/lib/newsletter/render.ts`, `products.ts`, or `public/newsletter/shared/` changes how every future issue looks.

1. Propose it to the owner with a before-and-after, from `snap` on the current WIP or the last issue. **Gate: explicit approval.**
2. Make it on its own branch, separate from any issue's copy.
3. Re-snap the WIP. Any `ready` issue now fails the check ("the design changed since it was approved") and must be approved again.
4. Sent issues aren't affected: their pages serve the frozen copy.
5. Record the change in `docs/newsletter-plan.md`.

## Renumbering (an issue slips into a new year)

The slug is the year it goes out and its number in that year. If the WIP `2026-02` will go out in January 2027, it becomes `2027-01`:

1. `npm run newsletter reopen 2026-02` (if it's ready).
2. Rename the issue file, the image folder, and the image paths inside the file. Change its `slug`.
3. Update the import in `issues.ts` and the key in `registry.json` (the one hand edit allowed, and only this one).
4. Rename the branch. Run the check, then continue from step 6.

## Voice guide

- Warm, plain, and brief. Write to one reader ("you"). No hype ("revolutionary," "game-changing," "exciting"), no exclamation marks, no emoji.
- Lead with what the reader can now do, then how.
- Every product card keeps its introduction and highlights, because a reader may have signed up for the other product.
- Sentence case for headings. US English. Curly quotes and apostrophes (’ “ ”).
- Product names exactly as on the site: Skagway, 15CE Flasher.
- Facts come from the release data, never from memory. No promises about future dates.

## Image spec

- **Screenshots** come from the version the issue announces. Never use an older build: its labels and warnings may contradict the issue.
- **Photos or generated images** are fine to tell the story, but show no people, and never show a feature that doesn't exist.
- 1200 px wide, between 16:9 and 4:3 in shape, JPEG, 250 KB or less. Alt text describes what's shown.
- Product icons and the logo live in `public/newsletter/shared/`, and changing them is a design change.

## What the check enforces

`npm run newsletter check` (and `--build`, which runs in `prebuild` on every site build):

- Slugs, sequence, and one issue in progress.
- Length limits for every field, and card and item counts.
- Images: present, real size, 1200 px JPEG, 250 KB or less, real alt text.
- US spelling, curly quotes, no HTML or Markdown, no `TODO`, no full name.
- Version numbers match current releases.
- Email size under 90 KB, exactly one unsubscribe link, and the postal address.
- Approved issues unchanged since approval, in content and in design.
- Sent issues unchanged.
- One newsletter per month in the ledger, and one correction per issue.

In a build, problems with drafts and stale approvals are warnings, so a newsletter never blocks a product release. Everything else is an error.
