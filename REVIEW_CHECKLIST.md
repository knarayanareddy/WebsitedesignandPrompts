# Review checklist — where this repository stands

Status legend: `[x]` done on `main` · `[~]` mitigated / partially done · `[ ]` outstanding.
The full end-to-end analysis behind this list is in [`DEEP_DIVE.md`](./DEEP_DIVE.md); media
provenance lives in [`ASSETS.md`](./ASSETS.md).

## A. Deployment pipeline (fixed in this pass)

| # | Problem | Fix | Status |
|---|---|---|---|
| A1 | GitHub Pages was published from **source** folders, so `aetherascrollstory/`, `measured/`, `portfolio/` and `synapsex/` served Vite's dev entry point (`src="/src/main.tsx"`) and rendered blank | Workflow now builds every app and publishes `dist/` output | [x] |
| A2 | `cp -r` merged into the deployed tree instead of replacing it, leaving orphaned bundles and stale paths | `rsync -a --delete` publishes an exact mirror of the assembled site | [x] |
| A3 | Securify was never publishable from `main` (`videoembeddeddesign/` has no `index.html`, so the old `find -maxdepth 2` skip that path) | Explicit slug map in `scripts/build-site.sh` | [x] |
| A4 | The hub links `/ethanvale/`, the old workflow published `ethan-vale-archive/` — the advertised URL could never update again | `ethan-vale-archive/` is published at the documented `ethanvale` slug | [x] |
| A5 | No build verification: a broken app or a source-tree regression could deploy silently | `scripts/verify-site.mjs` runs after assembly (fails on dev-style entry points or missing assets) | [x] |
| A6 | Media hot-links could rot unnoticed | `scripts/check-assets.mjs` HEAD-checks every remote asset URL | [x] |

## B. Repository files (fixed in this pass)

| # | Problem | Fix | Status |
|---|---|---|---|
| B1 | `README.md` and the hub linked `blob/main/LICENSE`, which did not exist | MIT `LICENSE` restored | [x] |
| B2 | Asset provenance was undocumented while the README claimed "assets are Pexels" | `ASSETS.md` documents every template, licence and fallback | [x] |
| B3 | No root `.gitignore`, and `aetherascrollstory/` had none at all — `git add aetherascrollstory` would stage ~4,161 paths (node_modules + a 27 MB `dist/`) | Both restored | [x] |
| B4 | The hub referenced `./favicon.svg`, which was not in the repository (it only survived inside `gh-pages`) | `favicon.svg` committed at the root and copied into the published tree | [x] |
| B5 | `README.md` advertised Securify at the Pages root and Ethan Vale at `/ethanvale/` inconsistently | Live-demo table corrected and the slug map documented | [x] |

## C. Code quality / accessibility (outstanding)

These are real fixes that exist on the unmerged branch
`origin/arena/01a0e42a-websitedesignprompts` (commit `9061482`, *"Implement review fixes across
all templates…"*, +1,047 / −292 lines) and are **not** on `main` yet. `main` is that commit's
direct ancestor plus this pass, so the work is portable.

| # | Problem | Fix | Status |
|---|---|---|---|
| C1 | `portfolio/` and `synapsex/` ignore `prefers-reduced-motion` entirely | Port reduced-motion handling (`portfolio/src/lib/motion.ts`, synapsex video/motion guards) | [ ] |
| C2 | Aethera `VideoLoop` stays at `opacity: 0` when a clip fails or autoplay is blocked | Reveal the poster on `error` / rejected `play()` | [ ] |
| C3 | SynapseX has no video failure path | Port `BackgroundVideo` (gradient plate on `onError`) | [ ] |
| C4 | Securify hero autoplays regardless of reduced motion; `usePrefersReducedMotion` never reacts to changes; nav links unreachable below `md` | Port the hook fix + accessible drawer | [ ] |
| C5 | Ethan Vale sphere is drag-only (click-only cards, no keyboard path) | Port `role=button`, `tabindex`, Enter/Space + focus management | [ ] |
| C6 | Measured `RevealVideo` autoplays under reduced motion | Port the guard | [ ] |
| C7 | Securify compiles without `strict` | Add `"strict": true` to `tsconfig.app.json` and fix fallout | [ ] |
| C8 | The 1440p Securify finale is streamed raw from Pexels | Trim/re-encode to 1080p and self-host (`BUILD_LOG.md` §5 recipe) | [ ] |
| C9 | `videoembeddeddesign/video_search/` (2.1 MB of research scripts and frames) is committed | Move to the template docs or delete | [ ] |
| C10 | Tooling drift across templates (Vite 5/6/7/8, Tailwind 3/4, TS 5.6/5.9/6.0) | Upgrade deliberately, one template at a time; CI builds all of them meanwhile | [ ] |
