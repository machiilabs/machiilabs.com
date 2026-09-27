<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# main is the live site

Every push to `main` deploys machiilabs.com. Read `.cursor/rules/production-main.mdc` before any git work.

- Never push, merge, or fast-forward `main` unless the user explicitly says to for that branch.
- Start every branch from `origin/main` (`git switch -c <name> origin/main`), never from a `skagway-X.Y.Z` release branch.
- Run `bash scripts/install-git-hooks.sh` once per clone. Never bypass the pre-push hook with `--no-verify`.
