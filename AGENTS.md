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
