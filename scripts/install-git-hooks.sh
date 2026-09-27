#!/usr/bin/env bash
# Copies the repo's git hooks into .git/hooks so they run no matter which
# branch is checked out. Re-run after pulling hook changes.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
hooks_dir="$(git rev-parse --git-path hooks)"
mkdir -p "$hooks_dir"
for hook in scripts/git-hooks/*; do
  install -m 0755 "$hook" "$hooks_dir/$(basename "$hook")"
  echo "Installed $(basename "$hook") -> $hooks_dir"
done
