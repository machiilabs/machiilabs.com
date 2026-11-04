# Releasing a Mach II Labs newsletter

The owner's guide. Claude follows the full process in `.claude/skills/newsletter/SKILL.md` and keeps this guide current whenever the process changes.

## At a glance

A newsletter takes twelve steps, half of them yours. Claude never sends anything until you've approved the issue, merged it, and said "send" after your own test.

| # | Step | Who | Gate |
| --- | --- | --- | --- |
| 1 | Start the issue (from the last issue; checks the month's slot) | Claude | |
| 2 | Pick what to feature (from the release notes Claude lists) | You | |
| 3 | Draft the copy together (preview at localhost:3000) | Claude, with you | |
| 4 | Supply the screenshots (from the version the issue announces) | You | |
| 5 | Run the check, show desktop and phone screenshots | Claude | |
| 6 | **Approve** (locks the words; sets the month) | You | ● |
| 7 | Open the pull request into `main` | Claude | |
| 8 | **Merge it** (the page goes live, unlisted) | You | ● |
| 9 | Send a test to you, from machiilabs.com | Claude | |
| 10 | **Check it, then say "send"** | You | ● |
| 11 | Send to the list (over 900, the rest the next day; then it freezes) | Claude | |
| 12 | Merge the closing pull request (records the send) | You | |

## Before your first send

Do these once. After that, every issue follows the same steps.

- [x] **iCloud sign-in in your Keychain**, under the name `machii-mailer`. If you ever revoke that app-specific password, make a new one at account.apple.com and store it again with `security add-generic-password -U -s machii-mailer -a <your @icloud.com address> -w`.
- [ ] **DMARC record** for machiilabs.com: a TXT record at `_dmarc` with `v=DMARC1; p=none; rua=mailto:support@machiilabs.com`. It keeps newsletters out of spam folders.
- [ ] **Merge pull request #27**, which adds one-click unsubscribe and the send script.
- [ ] **Merge the newsletter pull request**, which Claude opens once #27 is in. It holds the process, the checks and issue 2026-01.

Two places to know:

- **Previews** run on your Mac at `http://localhost:3000`. If nothing loads, run `bash scripts/dev.sh` in the machii-labs folder.
- **Mailing files** live in `~/Documents/Mailings/<issue>/`: the pasted list, and the send log Claude needs for resuming and corrections.

## Step by step

You start every step by talking to Claude in the machii-labs folder. Claude runs the commands; you make the calls marked **You**.

1. **Start.** Say `/newsletter new` and give the gist of what you want. Claude checks that no issue is in progress, creates the next issue (for example `2026-02`) from the last one, and tells you whether this month's slot is free.
2. **Pick what to feature. You.** Claude lists the latest versions and features from the release notes. You say what goes in, and whether a product with nothing new stays in with just its introduction.
3. **Write it together.** Claude drafts; you react ("shorter", "lead with X", "drop that line"). Watch it at `localhost:3000/newsletter/<issue>/email` and reload after each change.
4. **Images. You.** Claude tells you exactly which screenshots it needs. Take them from the version the issue announces (⌘⇧4, Space, Option-click the window) and drop them in the issue's image folder. Claude converts and places them.
5. **Check.** Claude runs the check (lengths, spelling, versions, images, links) and shows you desktop and phone screenshots.
6. **Approve. You.** Say "approve". That locks in the text, the images and the design, and puts the month on the dateline ("No. 2 · December 2026").
7. **Publish.** Claude opens a pull request into `main`.
8. **Merge. You.** Merge it on GitHub. The issue's page goes live on machiilabs.com, unlisted.
9. **Test.** Click **Generate mailing list** on machiilabs.com/admin and paste it where Claude says (`~/Documents/Mailings/<issue>/subscribers.txt`). Claude sends a `[Test]` copy to you.
10. **Check the test, then say "send". You.** Look at it in Apple Mail and Gmail, on Mac and iPhone, in light and dark mode. Click every link. Make sure Gmail shows its own Unsubscribe button, and that "Show original" says SPF, DKIM and DMARC pass.
11. **Send.** Claude runs the send in a terminal you can see; it asks "Send to N recipients? [y/N]". Over 900 people, the rest goes out the next day with the same command.
12. **Close. You.** When the send finishes, the issue freezes itself. Claude opens a small pull request recording the send. Merge it.

## Changing your mind

You can change anything until the send starts. The later the change, the more steps it repeats. Say `/newsletter edit` and what to change, and Claude tells you the cost before touching anything.

| Where the issue is | To edit or unapprove | Steps it repeats |
| --- | --- | --- |
| Draft | Just say what to change | None |
| Approved, not merged | Claude reopens it, then edits | 5–6: check and approve again |
| Approved and live | Claude reopens it, then edits | 5–8: check, approve, new pull request, merge |
| Send started | Not possible. Everyone gets the same version | Finish the send instead |
| Sent | Not possible. It's frozen | A correction, if it's an error (below) |

To withdraw an approval without editing, say "unapprove 2026-02". A live page stays up until that change is merged; then the site hides it.

## When something goes wrong

- **A send stops partway** (the 900-a-day cap, the network, iCloud refusing). Run the same send again; it skips everyone already sent. Say `/newsletter` and Claude picks it up.
- **"This month's newsletter has already gone out."** One newsletter per calendar month, with no override. Draft the next one now; approve it for next month.
- **The issue slipped into a new month.** The send is refused until it's approved again, which updates the dateline. Into a new year, it's renumbered first (`2026-02` becomes `2027-01`). Claude does both.
- **"machiilabs.com isn't serving the approved version."** The approved pull request isn't merged, or Vercel hasn't finished deploying. Merge, wait a minute, retry.
- **A mistake in a sent issue** (a broken link, a wrong fact). Say `/newsletter correction 2026-01`. A correction is a short notice of at most 600 characters, with no products or images. It's allowed once per issue, within 30 days of sending, and goes only to people who got the issue. The issue's web page shows it at the top. It isn't a way to send a second newsletter.

## Quick reference

| Say to Claude | What happens |
| --- | --- |
| `/newsletter` | Where things stand and the next step, then carries on |
| `/newsletter new` | Starts the next issue (refused if one is in progress) |
| `/newsletter edit` + the change | Edits the issue in progress; says the cost first |
| `/newsletter status` | Every issue, its status, and this month's slot. Changes nothing |
| "approve" | Locks the issue for this month |
| "unapprove" | Back to draft, before the send starts |
| "send" | The only word that sends to the list, after your test |
| `/newsletter correction <issue>` | Starts an emergency correction |

| Where | What |
| --- | --- |
| `src/lib/newsletter/issues/<issue>.ts` | The issue's words |
| `public/newsletter/<issue>/` | Its screenshots (1200 px wide) |
| `~/Documents/Mailings/<issue>/` | The pasted list and the send log |
| machiilabs.com/newsletter/<issue> | The web copy that "View in browser" opens |
| `.claude/skills/newsletter/SKILL.md` | The full process Claude follows |
