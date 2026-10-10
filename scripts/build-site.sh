#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Assemble the GitHub Pages site tree (_site/) from the templates on main.
#
#   bash scripts/build-site.sh            # install + build + assemble
#   SKIP_INSTALL=1 bash scripts/build-site.sh
#
# Design notes (these are the bugs the previous workflow had):
#   * Every React/Vite template is BUILT and its dist/ is published. Publishing a
#     source folder ships `index.html` -> `/src/main.tsx`, which 404s on Pages.
#   * Every published directory is replaced wholesale, never merged into,
#     so old bundles and stale index.html files cannot survive a deploy.
#   * Slugs are declared explicitly. `find -maxdepth 2 -name index.html` could
#     never publish `videoembeddeddesign/` (the app lives one level deeper, in
#     securify/) and published `ethan-vale-archive/` at a path the showcase hub
#     does not link to.
# ---------------------------------------------------------------------------
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# Replace a published directory wholesale. `rm -rf` + `cp -a` is the portable
# equivalent of `rsync -a --delete`: nothing from a previous revision survives.
replace_dir() {
  rm -rf "$2"
  mkdir -p "$2"
  cp -a "$1/." "$2/"
}

site_dir="${SITE_DIR:-_site}"
# template-folder : published-slug
apps=(
  "aetherascrollstory:aetherascrollstory"
  "apogee:apogee"
  "measured:measured"
  "portfolio:portfolio"
  "synapsex:synapsex"
  "jack:jack"
  "videoembeddeddesign/securify:videoembeddeddesign"
  "brunosimon:brunosimon"
  "senbuzy:senbuzy"
  "portfolio-console:portfolio-console"
)
# published-slug : source-folder   (already static, copied verbatim)
statics=(
  "ethanvale:ethan-vale-archive"
  "mariedrouvin:mariedrouvin"
  "bbdo:bbdo"
  "bizarro:bizarro"
  "designbyxam:designbyxam/site"
  "expa:expa"
)

echo "==> assembling $site_dir from $(git rev-parse --short HEAD 2>/dev/null || echo 'working tree')"
rm -rf "$site_dir"
mkdir -p "$site_dir"

for entry in "${apps[@]}"; do
  src="${entry%%:*}"
  slug="${entry##*:}"

  if [ ! -f "$src/package.json" ]; then
    echo "!!! $src has no package.json — cannot build" >&2
    exit 1
  fi

  if [ "${SKIP_INSTALL:-0}" = "1" ]; then
    echo "==> [$slug] build only  ($src)"
  else
    echo "==> [$slug] install + build  ($src)"
    if [ -f "$src/package-lock.json" ]; then
      ( cd "$src" && npm ci )
    else
      ( cd "$src" && npm install )
    fi
  fi
  ( cd "$src" && npm run build )

  if [ ! -f "$src/dist/index.html" ]; then
    echo "!!! $src/dist/index.html missing after build" >&2
    exit 1
  fi

  replace_dir "$src/dist" "$site_dir/$slug"
  echo "    -> $site_dir/$slug  ($(find "$site_dir/$slug" -type f | wc -l | tr -d ' ') files)"
done

for entry in "${statics[@]}"; do
  slug="${entry%%:*}"
  src="${entry##*:}"

  if [ ! -f "$src/index.html" ]; then
    echo "!!! $src/index.html missing" >&2
    exit 1
  fi

  replace_dir "$src" "$site_dir/$slug"
  find "$site_dir/$slug" -name '.DS_Store' -delete
  echo "==> [$slug] copied static  ($src)"
done

# Showcase hub + shared root assets.
cp index.html "$site_dir/index.html"
if [ -f favicon.svg ]; then
  cp favicon.svg "$site_dir/favicon.svg"
fi
touch "$site_dir/.nojekyll"

echo "==> verifying $site_dir"
node scripts/verify-site.mjs "$site_dir"
python3 scripts/verify-designbyxam-site.py "$site_dir/designbyxam"

echo "==> done: $(find "$site_dir" -type f | wc -l | tr -d ' ') files, $(du -sh "$site_dir" | cut -f1)"
