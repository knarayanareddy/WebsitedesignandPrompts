#!/usr/bin/env bash
# Publish only the static GetLayers deliverable, never npm or test tooling.
set -euo pipefail
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
site_dir="${1:-_site}"
python3 getlayersai/tools/verify.py
destination="$(python3 -c 'import pathlib,sys; print(pathlib.Path(sys.argv[1]).resolve())' "$site_dir/getlayersai")"
if [ "$destination" = "$repo_root/getlayersai" ]; then
  echo "Refusing to replace the source collection" >&2
  exit 1
fi
rm -rf "$destination"
mkdir -p "$destination"
for dir in sites shared previews templates; do
  cp -a "getlayersai/$dir" "$site_dir/getlayersai/$dir"
done
cp getlayersai/index.html getlayersai/sites.json getlayersai/*.md "$site_dir/getlayersai/"
python3 getlayersai/tools/verify.py "$site_dir/getlayersai"
