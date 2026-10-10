# GitHub Pages Rendition

The follow-up request explicitly changes this folder from documentation-only to an actual live rendition. The deployable front end is now in [`site/`](site/); the guides remain alongside it. The original page's photography, shadows, content, attribution and front-end bytes are retained—no caricatures, replacement artwork or inserted page banners.

## Preview URL

Target: https://knarayanareddy.github.io/WebsitedesignandPrompts/designbyxam/#about

This is a static reference rendition, not the original author's domain or an independently authored portfolio. The original author is Samuel Idowu / designbyxam: https://samuelidowu.com/. The repository's MIT license does not grant ownership or redistribution rights to his photographs, artwork or original front end. Retain this provenance and resolve rights for further commercial reuse.

## Structure and hosting

- `site/`: the actual page and original linked assets, separate from the documentation.
- `evidence/pages-assets.json`: complete asset paths, byte lengths and SHA-256 hashes.
- `tools/build-site.mjs`: copies exactly that manifest into `dist/`, without rewriting the front end.
- `tools/serve-site.mjs`: loopback preview at the same repository/subpage prefix used by Pages.
- `tests/pages.spec.mjs`: browser/content/range/navigation/viewer checks against local or public URL.
- The repository's existing `scripts/build-site.sh` maps `designbyxam/site` to the published `/designbyxam/` slug.

The original relative asset paths work under the Pages prefix, so no `<base>` injection or URL rewriting is required. Four original icon files referenced by the head were added to the earlier 182-file acquisition. The new deployment inventory is 186 files; the older 182-file/18-test report remains the historical private-copy evidence, not a count to silently rewrite.

## Local commands

```bash
cd designbyxam
npm ci --include=dev
npx --no-install playwright install chromium
npm run build
npm test
npm run dev
```

Default local URL: http://127.0.0.1:4174/WebsitedesignandPrompts/designbyxam/#about

To test the actual published site without starting a local server:

```bash
PUBLIC_SITE_URL=https://knarayanareddy.github.io/WebsitedesignandPrompts/designbyxam/ npm test
```

The dedicated static server rejects HTTP writes and supports MP4 byte ranges. Pages likewise hosts static files, not the original editing backend. External Google Fonts and Vimeo dependencies remain original external integrations. Automated checks do not activate contact links or send messages.

## Deployment blocker repaired

The existing Pages build was failing on BBDO's `DB_POETRY_LÄRMSCHUTZ_4-5-1` image reference: the HTML contained decomposed `A` + combining diaeresis, while Git tracked composed `Ä`. Linux/GitHub did not resolve that spelling even though macOS's normalized filesystem could conceal it. Both JPEG and WebP references were changed to the exact tracked spelling; no BBDO layout or assets were redesigned.

## Verification policy

Before reporting live success: verify source/site/dist hashes and path sets, check the repository build, observe the workflow's actual success, read back the published Pages branch, request the public URL/assets and exercise its real browser controls. A pushed commit or HTTP 200 alone is not delivery. Screenshots/test reports must be labeled with their environment and scope; do not generalize stationary matched-state results to every video frame or browser.

Earlier statements in the process guides that the package was documentation-only describe the first documentation publication. This follow-up is the separately requested rendition/deployment; it does not retroactively imply that the author granted a new asset license.
