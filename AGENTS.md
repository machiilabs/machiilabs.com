<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# main is the live site

Every push to `main` deploys machiilabs.com. Read `.cursor/rules/production-main.mdc` before any git work.

- `main` is protected: changes arrive only through pull requests the user merges.
- Start every branch from `origin/main` (`git switch -c <name> origin/main`), never from a release branch (`skagway-X.Y.Z`, `flasher-mac-X.Y.Z`, `flasher-win-X.Y.Z`).
- Add a `ship:<product>-X.Y.Z` label to a pull request only after the user explicitly says to ship that release.
- Run `bash scripts/install-git-hooks.sh` once per clone. Never bypass the pre-push hook with `--no-verify`.

# Plans

**ALWAYS write ALL plans to a markdown file. EVERY TIME. NEVER create a plan without writing it to a markdown file.**

A plan in the chat does not count. Before the reply that presents a plan, write the full plan, with its markdown formatting, to a `.md` file in the repo (`docs/` unless the user named a path). Subagents included: a subagent that creates a plan writes the file before it returns. See `.cursor/rules/write-plans-to-file.mdc`.

# Newsletter

All newsletter work (new issues, edits, sends, corrections) follows `.claude/skills/newsletter/SKILL.md`, invoked as `/newsletter`. The owner's guide is `docs/newsletter-guide.md`; keep it current with the skill. Start with `npm run newsletter status`. The rules are enforced in code: one newsletter per calendar month, approved issues can't change unnoticed, and sent issues are frozen.
