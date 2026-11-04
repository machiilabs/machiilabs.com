# Newsletter process plan

Written 2026-11-03. Proposal for owner review. Builds on `docs/newsletter-plan.md`.

## Goal

Every issue looks and reads like issue 2026-01, and goes out through the same checked steps, whoever (or whichever agent) prepares it. Consistency comes from three layers, each harder to get around than the last:

1. **Structure.** An issue is data only. The look lives in one renderer.
2. **Checks.** A script rejects an issue that breaks the rules, and the site build runs it, so a broken issue can't deploy.
3. **Process.** One invocable procedure, `/newsletter`, walks every issue through the same gates, with owner sign-off at the points that matter.

## 1. Structure: the look can't drift by accident

- Issue files (`src/lib/newsletter/issues/YYYY-NN.ts`) hold text, image file names, and links. No HTML, no styles, no Markdown. Plain strings only.
- `src/lib/newsletter/render.ts` is the only place colors, fonts, spacing, and layout live. Its tokens (`COLOR`, `FONT`, sizes) sit at the top of the file.
- An issue can only use the block types the renderer knows. Today that's the header, the intro, product cards, the closing, and the footer. If an issue needs something new, such as a "coming soon" block or a single-product issue, that's a **design change**:
  - The owner approves it first.
  - It's added to the renderer and to this document as a named block.
  - The latest issue is re-rendered and reviewed, to confirm nothing else moved.
- **Sent issues are frozen.** When an issue has gone out, `npm run newsletter:freeze YYYY-NN` writes the exact HTML and text that were sent to `public/newsletter/YYYY-NN/sent/`. From then on the web page serves that frozen copy, so a later design change can't rewrite the archive or make it differ from what subscribers received.

## 2. Checks: `npm run newsletter:check`

These run on every issue that isn't frozen. They also run in `prebuild`, the same way `manual:index` does, so Vercel refuses to deploy a broken issue.

**Identity**
- The slug is `YYYY-NN`, numbered in sequence within the year with no gaps, and matches its file name. It's registered in `issues.ts`.
- `status` is `draft`, `ready`, or `sent`. `sent` requires a `sentOn` date and a frozen copy.

**Length limits** (so every issue fits the same layout)
- Subject 70 characters or fewer. Preview line 40–110. Headline 45 or fewer, which fits two lines on a phone. Subhead 80 or fewer.
- One to three product cards. In each card:
  - Tagline 80 characters or fewer, and intro 120–400.
  - Three or four highlights, each with a title of 40 or fewer and a body of 140 or fewer.
  - Two to four "New in" items.
- The call-to-action path is a real site route. Requirements are present.

**Facts**
- Version numbers in the subject, subhead, and "New in" titles match the current release data: `skagway-releases.ts` and the Flasher page's constants. Frozen issues are exempt.

**Images**
- Every file exists, and its real pixel size matches the size the issue declares.
- Screenshots and photos are 1200 px wide JPEGs of 250 KB or less. Icons are 112 px PNGs.
- Every `alt` text is at least 10 characters and isn't a file name.

**Language**
- US English. The check fails on common British spellings (colour, organise, behaviour, centre, cancelled, and so on).
- Curly apostrophes and quotes only.
- No leftover template text (`TODO`, `TK`, `Lorem`).

**Rendered output**
- The email HTML is under 90 KB, which leaves headroom under Gmail's 102 KB clipping point.
- `~unsubscribe_token` appears exactly once in the HTML and once in the text.
- The postal address and "View in browser" are present.

## 3. Process: `/newsletter`

A Claude Code skill at `.claude/skills/newsletter/SKILL.md`, invoked as `/newsletter`, with a short `.cursor/rules/newsletter.mdc` that points Cursor at the same file. The skill holds the steps, the voice guide, and the image spec, and stops at each owner gate.

| Step | What happens | Gate |
|---|---|---|
| 1. Start | Branch `newsletter-YYYY-NN` from `origin/main`. `npm run newsletter:new` creates the next slug's file from the previous issue, with status `draft`, plus its image folder. | — |
| 2. Facts | Read what's new from the sources: `skagway-releases.ts`, the Flasher page, and each product repo's tags and release commits. List the versions and features in the chat. | Owner confirms what to feature. |
| 3. Draft | Write the copy using the voice guide. Every product card keeps its intro and highlights, because readers may not know that product. | — |
| 4. Images | Follow the image spec: screenshots of the current version, or photos and generated images with no people. | Owner supplies or approves the images. |
| 5. Check | `npm run newsletter:check` must pass. | Automatic. |
| 6. Review | Render the email at desktop and phone widths with `scripts/newsletter-snap.swift` (WebKit, as in Apple Mail), and show both. | Owner approves the copy and look. Status becomes `ready`, and the issue's sending month (its dateline) is set. |
| 7. Publish | Open a pull request into `main`. | Owner merges. The page goes live, unlisted. |
| 8. Test | `send-mailing.py … --test` sends a copy to the owner, who works through the test checklist below. | Owner says go. |
| 9. Send | The full send. The script refuses issues that aren't `ready`, and resumes across days if the daily cap is hit. | — |
| 10. Close | `newsletter:freeze`, status `sent` with `sentOn`, and a line in `docs/newsletter-log.md` (date, recipients, failures). Pull request. | Owner merges. |

### How `/newsletter` knows what you want

The skill never guesses from the conversation. It reads the state from the repo every time it starts:

- **Issue files and their `status`:** `draft`, `ready`, or `sent`.
- **The send ledger,** described under the gatekeeper below.
- **Git:** the issue's branch and pull request, and whether it's merged.

From that it works out which step each issue is on, and acts like this:

| You type | No unsent issue | An issue is unsent (the WIP) |
|---|---|---|
| `/newsletter` | Says nothing is in progress and offers to start the next issue. | Shows the WIP, the step it's on, and what's next, then continues. |
| `/newsletter new` | Starts the next issue. | Refuses: one issue in progress at a time. Finish or delete the WIP first. |
| `/newsletter edit` (plus what to change) | Refuses: sent issues are frozen. Points to `correction`. | Edits the WIP. |
| `/newsletter status` | Lists every issue, its status, and the month's sending slot. | Same. |
| `/newsletter correction 2026-01` | Starts an emergency correction for a sent issue. | Same. |

**The issue's number and date are set at approval, and checked again at send.** If it slips into a later month, the send is refused until it's reopened and approved again, which updates the dateline. If it slips into a new year, it's renumbered first (`2026-02` becomes `2027-01`).

**The skill says what an edit will cost before making it.** For a draft, nothing. For an approved issue, it needs the check and approval again. For a live one, it also needs a new pull request.

**Editing after approval drops the issue back to `draft`.** If the WIP was already `ready` or merged, any change to its copy or images sets it to `draft` again. It then has to pass the check and get your approval again. If it was already live on the site, it also needs a new pull request. So a late edit can never slip out unreviewed.

## 4. Monthly gatekeeper

**Rule: at most one newsletter per calendar month.** The only exception is an emergency correction to an issue that has already gone out.

### Where it's enforced

The gate is enforced in three places, so it holds even if one is bypassed:

1. **`send-mailing.py`, the thing that actually sends.** Before a full send, it reads the ledger. If any issue's send started this calendar month, it refuses and names that issue and its date. There's no override flag. Sending two issues in one month means changing the rule in code, on purpose, through a pull request.
2. **`newsletter:check`.** The build fails if the ledger or the issue files show two issue sends in the same month. This catches hand edits.
3. **`/newsletter`.** It shows the month's slot ("May's slot is used by 2026-04, sent May 6") at the start, before you spend time on an issue that can't go out yet. Drafting next month's issue early is fine.

### The send ledger

The ledger is `src/lib/newsletter/sends.json`, committed in the repo.
- The script adds an entry when a full send **starts**: the issue, the kind (`issue` or `correction`), the time, and the recipient count. It adds the finish time when the send completes.
- Recording the start, not the finish, means a send that stops partway (daily cap, network) still holds the month's slot.
- After the send, the close step (step 10) commits the ledger along with the freeze.

### Emergency corrections

An emergency correction is a short correction notice about an issue that's already been sent, such as a broken download link or a wrong fact. It's not a second newsletter. To keep "emergency" from becoming a loophole:

- **It uses one block type, `correction`.** It has a heading, at most 600 characters of text, and an optional link. It has no product cards or images, so it can't be used to promote anything. The check enforces this.
- **It's only for a recent issue.** The issue it corrects must already be in the ledger as sent, within the last 30 days.
- **It goes only to people who got the original** and are still subscribed. The recipients come from the original send log, matched against the current list.
- **The original issue's web page gets a dated correction note at the top.** The frozen copy stays as sent, and the note is added above it, so the archive is honest about what changed.
- **There's at most one correction per issue.** A second problem means the first correction should have been better reviewed.
- **The same gates still apply:** the check, your approval of the text, a test send, then the full send.

**Test checklist (step 8)**
- Apple Mail on Mac and on iPhone, and Gmail on the web and in the iOS app.
- Light and dark mode.
- Every link and both buttons work.
- The footer's unsubscribe link carries the right token.
- Gmail's own Unsubscribe button appears.
- "Show original" shows SPF, DKIM, and DMARC passing.

**Voice guide** (part of the skill)
- Warm, plain, and brief. No hype words ("revolutionary," "game-changing"), no exclamation marks, no emoji.
- Benefits first: what the reader can now do, then how.
- Sentence case for headings. US English. Product names exactly as on the site (Skagway, 15CE Flasher).
- Signed "Paul, Mach II Labs." The owner's full name never appears.

**Image spec** (part of the skill)
- Screenshots come from the version the issue announces. Light or dark to suit the app, consistent within an issue.
- 1200 px wide, a 16:9 to 4:3 shape, JPEG of 250 KB or less.
- No people. Generated images must look like the real product, never like a feature that doesn't exist.

## Build order

1. Add `status` and `sentOn` to the issue type, and frozen-copy serving to the web and email routes.
2. The send ledger (`sends.json`) and the `correction` block.
3. `newsletter:check`, including the monthly rule, and wire it into `prebuild`.
4. `newsletter:new` and `newsletter:freeze`.
5. Commit the WebKit snapshot tool as `scripts/newsletter-snap.swift`.
6. `send-mailing.py`: refuse issues that aren't `ready`, enforce the monthly gate, write the ledger, and send corrections to the original recipients only.
7. Write the skill and the Cursor rule pointer.
8. Run issue 2026-01 through the skill from step 5 on, as its first real use.

## Owner decisions (2026-11-03)

1. Freeze sent issues: **yes**.
2. Invoke as `/newsletter`, with Cursor pointed at the same file. The owner asked how the skill knows whether to start a new issue or change the WIP; answered under "How `/newsletter` knows what you want."
3. The length limits: **yes**.
4. Gatekeeper: no more than one newsletter a month, except an emergency update to an existing newsletter. Designed under "Monthly gatekeeper."

## Status

- 2026-11-03: Built on branch `newsletter` (stacked on #27 until it merges):
  - **Lifecycle:** issue status and approval in `registry.json`, with content and design hashes. A fixed product catalog (`products.ts`). Frozen copies for sent issues.
  - **Send ledger and gates:** the ledger with the monthly rule, and corrections (one block type, original recipients only, a notice on the issue's web page).
  - **Tools:** `npm run newsletter` (status, new, check, approve, reopen, snap, correction-new, send-check, freeze, correction-sent). `prebuild` runs `check --build`.
  - **Send script:** `send-mailing.py issue|correction SLUG --list FILE`. It refuses anything `send-check` rejects, or content the live site serves differently from what was approved. The plain-announcement mode was removed, because it bypassed the monthly rule.
  - **The skill and pointers:** `.claude/skills/newsletter/SKILL.md` (`/newsletter`), plus the pointer in `.cursor/rules/newsletter.mdc` and `AGENTS.md`.
- **Verified:**
  - Eight deliberate content errors were all caught.
  - In a scratch copy, the full lifecycle ran: approve, an edit after approval (caught), send-check, a second issue in the same month (refused), freeze, an edit after sending (caught), a resend (refused), new, a second new (refused), and a correction.
  - Production hides drafts. The sent web page serves the frozen copy with the correction notice.
  - Against the dev server, the send script dry-runs, and it refuses a draft's test, a draft's real send, and a real send from localhost.
- **Next:** issue 2026-01 through the skill, from step 4 (a current 15CE Flasher screenshot).
