#!/usr/bin/env bash
# Checks that moving production (main) from BASE to HEAD ships no unapproved release.
# Usage: check-production-release.sh <base-commit> <head-commit>
#
# Run by scripts/git-hooks/pre-push (local pushes to main) and by
# .github/workflows/production-release-check.yml (every pull request into main).
# Both run the copy on main, so a branch cannot weaken its own check.
#
# Approval: MACHII_SHIP="<product>-<version> ..." (the workflow fills it from PR
# labels named ship:<product>-<version>). Products: skagway, flasher-mac, flasher-win.
#
# Fails when HEAD, relative to BASE:
#   - carries commits from an unapproved release branch (<product>-X.Y.Z)
#   - changes a product's public download (version, build, SHA-256, filename, URL)
#     or the Skagway coming-soon promo without approval for that release
#   - has a download whose build, SHA-256, filename, and URL disagree
set -euo pipefail

base="$1"
head="$2"
products="skagway flasher-mac flasher-win"

skagway_download=src/lib/skagway-download.ts
skagway_releases=src/lib/skagway-releases.ts
downloads=src/lib/downloads.ts
flasher_page=src/app/flasher/page.tsx
flasher_guide=src/app/flasher/guide/page.tsx

block() {
  {
    printf '\nBLOCKED: this would change production (main) without approval.\n'
    printf '%s\n' "$@"
    printf '\nApprove a release only after the user explicitly ships it:\n'
    printf '  local push:    MACHII_SHIP="<product>-<version>"\n'
    printf '  pull request:  add the label ship:<product>-<version>\n'
    printf 'See .cursor/rules/production-main.mdc.\n\n'
  } >&2
  exit 1
}

approved() {
  local token
  for token in ${MACHII_SHIP:-}; do
    [ "$token" = "$1" ] && return 0
  done
  return 1
}

approved_any() {
  local token
  for token in ${MACHII_SHIP:-}; do
    case "$token" in "$1"-[0-9]*) return 0 ;; esac
  done
  return 1
}

# const_value <commit> <file> <NAME>: string value of `const NAME = "..."` (may wrap a line).
const_value() {
  git show "$1:$2" 2>/dev/null | tr '\n' ' ' \
    | grep -Eo "const $3 = *\"[^\"]*\"" | head -n 1 | sed -E 's/.*"([^"]*)"$/\1/' || true
}

# download_url <commit> <key>: PRODUCT_DOWNLOADS entry for that key.
download_url() {
  git show "$1:$downloads" 2>/dev/null | tr '\n' ' ' \
    | grep -Eo "[[:space:]]$2: *\"[^\"]*\"" | head -n 1 | sed -E 's/.*"([^"]*)"$/\1/' || true
}

skagway_upcoming() {
  git show "$1:$skagway_releases" 2>/dev/null \
    | grep -Eo 'SKAGWAY_UPCOMING: SkagwayUpcoming \| null = (null|\{)' | head -n 1 || true
}

# product_state <commit> <product>: one line with everything the public sees for that download.
product_state() {
  local c="$1"
  case "$2" in
    skagway)
      printf '%s|%s|%s|%s|%s' \
        "$(const_value "$c" "$skagway_download" SKAGWAY_DOWNLOAD_VERSION)" \
        "$(const_value "$c" "$skagway_download" SKAGWAY_DOWNLOAD_BUILD)" \
        "$(const_value "$c" "$skagway_download" SKAGWAY_DOWNLOAD_SHA256)" \
        "$(download_url "$c" skagway)" \
        "$(skagway_upcoming "$c")" ;;
    flasher-mac)
      printf '%s|%s|%s|%s|%s|%s|%s' \
        "$(const_value "$c" "$flasher_page" MAC_VERSION)" \
        "$(const_value "$c" "$flasher_page" MAC_BUILD)" \
        "$(const_value "$c" "$flasher_page" MAC_SHA256)" \
        "$(const_value "$c" "$flasher_page" MAC_FILENAME)" \
        "$(const_value "$c" "$flasher_guide" MAC_SHA256)" \
        "$(const_value "$c" "$flasher_guide" MAC_FILENAME)" \
        "$(download_url "$c" flasher)" ;;
    flasher-win)
      printf '%s|%s|%s|%s|%s|%s|%s' \
        "$(const_value "$c" "$flasher_page" WIN_VERSION)" \
        "$(const_value "$c" "$flasher_page" WIN_BUILD)" \
        "$(const_value "$c" "$flasher_page" WIN_SHA256)" \
        "$(const_value "$c" "$flasher_page" WIN_FILENAME)" \
        "$(const_value "$c" "$flasher_guide" WIN_SHA256)" \
        "$(const_value "$c" "$flasher_guide" WIN_FILENAME)" \
        "$(download_url "$c" winflasher)" ;;
  esac
}

# check_consistent <product> <state>: build, SHA-256, filename, and URL must agree.
check_consistent() {
  local product="$1" v b sha fn gsha gfn url upcoming expected
  case "$product" in
    skagway)
      IFS='|' read -r v b sha url upcoming <<<"$2"
      [[ "$b" =~ ^[0-9]+$ ]] || block "Skagway download build is not a build number: \"$b\"."
      [[ "$sha" =~ ^[0-9a-f]{64}$ ]] || block "Skagway download SHA-256 is not a SHA-256: \"$sha\"."
      [[ "$url" == *"?v=$v-$b" ]] || block "Skagway download URL ($url) does not end in ?v=$v-$b." ;;
    flasher-mac | flasher-win)
      IFS='|' read -r v b sha fn gsha gfn url <<<"$2"
      expected="15CEFlasher-$v-$b.dmg"
      [ "$product" = flasher-win ] && expected="15CEFlasher-Win-$v-$b.exe"
      [[ "$b" =~ ^[0-9]+$ ]] || block "$product build is not a build number: \"$b\"."
      [[ "$sha" =~ ^[0-9a-f]{64}$ ]] || block "$product SHA-256 is not a SHA-256: \"$sha\"."
      [ "$fn" = "$expected" ] || block "$product filename \"$fn\" should be \"$expected\"."
      [ "$gfn" = "$fn" ] && [ "$gsha" = "$sha" ] || block \
        "$product: the Flasher guide's filename or SHA-256 differs from the Flasher page."
      [ "$url" = "https://downloads.machiilabs.com/$fn" ] || block \
        "$product download URL ($url) does not point at $fn." ;;
  esac
}

# Commits from an unreleased release branch (the pond-guide incident: a branch cut
# from skagway-1.3.0 reached main and shipped the 1.3.0 site early).
for product in $products; do
  for ref in $(git for-each-ref --format='%(refname)' \
      "refs/heads/$product-[0-9]*" "refs/remotes/*/$product-[0-9]*"); do
    release="${ref##*/}"
    approved "$release" && continue
    for mb in $(git merge-base --all "$head" "$ref" 2>/dev/null); do
      count="$(git rev-list --count "$mb" "^$base")"
      [ "$count" = "0" ] || block \
        "It carries $count commit(s) from the unreleased branch ${ref#refs/}." \
        "Unrelated work must start from origin/main:  git switch -c <name> origin/main" \
        "Ship that release only with approval for \"$release\"."
    done
  done
done

for product in $products; do
  old_state="$(product_state "$base" "$product")"
  new_state="$(product_state "$head" "$product")"
  check_consistent "$product" "$new_state"
  [ "$old_state" != "$new_state" ] || continue

  new_version="${new_state%%|*}"
  if [ "${old_state%%|*}" != "$new_version" ] || [ "$product" != skagway ]; then
    approved "$product-$new_version" || block \
      "It changes the public $product download (now version ${new_version:-none})." \
      "Needs approval for \"$product-$new_version\"."
  else
    approved_any "$product" || block \
      "It changes the public $product download or coming-soon promo." \
      "Needs approval for \"$product-<version>\"."
  fi
done

echo "Production release check passed."
