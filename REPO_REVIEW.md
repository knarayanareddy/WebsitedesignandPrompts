# End-to-End Repo Review — how this repository is built

**Reviewed:** 2026-09-30 · **Base:** `baf9266` + Jack portfolio integration pass
**Method:** full source read of every template, the hub, the CI pipeline and all scripts; a
fresh local run of the complete build/verify pipeline; route, audit and secret checks.
This is the *current-state* review. The historical analysis of the pre-fix state is kept in
[`DEEP_DIVE.md`](./DEEP_DIVE.md); work tracking lives in [`REVIEW_CHECKLIST.md`](./REVIEW_CHECKLIST.md) (now fully closed).

---

## 1. What this repository is

A **public template catalogue**: eight production-quality demo websites, each shipped with the
prompt specification used to generate it (`ADAPTED_PROMPT.md`), an architecture write-up
(`BUILD_LOG.md`), and media provenance notes — so a design can be reproduced or re-skinned by
pointing a coding assistant at the prompt. Everything is published as a live GitHub Pages
showcase behind a hand-written hub (`index.html`).

```
WebsitedesignandPrompts/
├── index.html                  # 850-line showcase hub: cards, category filter, search, noscript note
├── README.md                   # catalogue table + local-dev + deploy docs
├── DEEP_DIVE.md / REVIEW_CHECKLIST.md / ASSETS.md / LICENSE / favicon.svg
├── .github/workflows/deploy.yml  # build → assemble → verify → publish to gh-pages
├── scripts/                    # build-site.sh · verify-site.mjs · check-assets.mjs
├── videoembeddeddesign/        # 01 Securify  — React 19 · Vite 8 · Tailwind 4 (app in securify/)
├── aetherascrollstory/         # 02 Aethera   — React 18 · Vite 6 · Tailwind 3 (26 MB self-hosted video)
├── measured/                   # 03 Measured  — React 19 · Vite 7 · Tailwind 4 · oxlint
├── ethan-vale-archive/         # 04 Ethan Vale — 1,993-line single-file vanilla JS, zero deps
├── synapsex/                   # 05 SynapseX  — React 18 · Vite 6 · Tailwind 3 · Motion · Lenis
├── portfolio/                  # 06 Portfolio — React 18 · Vite 6 · GSAP · Lenis · hls.js
├── apogee/                     # 07 Apogee   — React 18 · Vite 6 · Tailwind 3
└── jack/                      # 08 Jack — React 18 · Vite 6 · Tailwind 3 · Framer Motion
```

The checkout is intentionally self-contained by template: the React/Vite apps build independently, while Ethan Vale is a standalone static page. Media is partly vendored and partly streamed; provenance is centralized in `ASSETS.md`.

## 2. The shared architecture pattern

Despite the stack spread (React 18→19, Vite 5→8, Tailwind 3→4, one vanilla app), every template
is built the same way:

1. **Content is typed data, not JSX.** Securify's 11 chapters live in one `CHAPTERS: Chapter[]`
   array (`App.tsx`); Aethera mirrors it in `src/data/chapters.ts`; Measured in
   `src/data/surfaces.ts` (with a `reveal: RevealKind` union that plugs into five bespoke reveal
   components). Copy, media URLs, layout classes and stat blocks are all data fields — which is
   exactly what makes the `ADAPTED_PROMPT.md` files honest: swap the data, keep the engine.
2. **Scroll is observed, never polled.** `IntersectionObserver` (threshold 0.35) decides which
   chapter is "active"; only the active `<video>` plays, everything else `pause()`s — one decoder
   busy at a time. Active state also drives progress dots and reveal animations.
3. **Animation loops write styles directly, not React state.** Aethera's `VideoLoop` runs a rAF
   fade-envelope (0.5 s in/out, `ended` → reset → replay, zero re-renders); Measured's
   `useSurfaceEngine` LERPs pointer/touch into CSS custom properties (`--mx/--my/--r`) for a
   GPU-composited spotlight mask (no canvas), with a figure-8 idle drift on touch devices;
   Ethan Vale runs its own inertia/damping physics loop over CSS 3D transforms.
4. **Relative asset bases everywhere.** Every `vite.config.ts` sets `base: './'`, so any build
   works from any subpath (a fork's Pages URL included). Dev servers set `host: true` +
   `allowedHosts: true` so sandbox/preview proxies work.
5. **Strict TypeScript in all seven React/Vite apps** (`strict`, with unused locals/parameters checked in the new Jack app); the exact compiler settings remain template-local.
6. **Per-template docs trio** (`README.md`, `ADAPTED_PROMPT.md`, `BUILD_LOG.md`) plus root-level
   `ASSETS.md` recording every hot-linked media URL, its licence, and the fallback behaviour.

### Notable per-template engineering

| Template | Standout mechanism |
|---|---|
| **Securify** | Giant absolutely-positioned lowercase words per chapter, diagonal-divider `StatBlock`, monochrome palette discipline; hero clip + 10 Pexels loops gated by visibility |
| **Aethera** | Seamless manual video looping via rAF opacity envelope (no native `loop`); white→night→white narrative with one dark pivot chapter; `mix-blend-difference` progress rail |
| **Measured** | `useSurfaceEngine` spotlight-mask engine + five reveal modules (video, PPG optics sim, sleep, schematic, iridescent finish customizer); the only template with real image `onError` fallbacks |
| **Ethan Vale** | Fibonacci-sphere (golden-angle) lattice of 21 photo cards in pure CSS 3D, drag momentum with 0.94 friction + ±32° pitch clamp, counter-rotated headline lock, FLIP lightbox, 3D⇄2D view toggle, client-side canvas downscaling of CDN images |
| **SynapseX** | Cursor-parallax 3D tilt hero, multi-stage scroll camera, scramble-in text, rolling telemetry counters, Lenis smooth scroll |
| **Portfolio** | Lenis inertia scroll synced to GSAP ScrollTrigger (incl. pinned dual-speed parallax gallery), Mux HLS hero via `useHlsVideo`, preloader with scroll lock, `manualChunks` split (react/motion/gsap/hls/lenis) |

## 3. How the site is built and published

`deploy.yml` (push/PR/dispatch on `main`, Node 22, npm cache over seven app lockfiles):

1. **`scripts/build-site.sh`** — installs (`npm ci`) and builds each of the 7 apps, then assembles
   `_site/` using an explicit **slug map** (this is the fix for the old `find -maxdepth 2` bugs):
   | source | published at |
   |---|---|
   | `videoembeddeddesign/securify/` → `dist/` | `/videoembeddeddesign/` |
   | `aetherascrollstory/`, `measured/`, `portfolio/`, `synapsex/`, `apogee/`, `jack/` → `dist/` | `/<name>/` |
   | `ethan-vale-archive/` (static, copied verbatim) | `/ethanvale/` |
   Each published directory is **replaced wholesale** (`rm -rf` + `cp -a`) — no stale bundles can
   survive a deploy — and the hub + `favicon.svg` + `.nojekyll` are copied in.
2. **`scripts/verify-site.mjs`** — fails the build if any published page still references a dev
   entry (`/src/main.tsx`), if any local asset ref doesn't resolve, or if a hub link has no
   published `index.html`. Root-absolute paths are flagged (they 404 under `/<repo>/`).
3. **`scripts/check-assets.mjs`** (report-only, `continue-on-error`) — HEAD/GET-checks every
   hot-linked media URL scraped from the sources; has a "this sandbox has no network" heuristic
   so a blocked runner never fails a deploy.
4. **Publish** — a single fresh `gh-pages` commit built from `_site`, force-pushed; skipped when
   the tree hash is unchanged. PRs run build+verify only, so a regression fails review instead
   of the live site.

Because of step 2, the class of bug that used to blank 4 of 6 demos (publishing source folders)
is now mechanically impossible.

## 4. Verification performed today (all reproducible)

| Check | Result |
|---|---|
| `SKIP_INSTALL=1 bash scripts/build-site.sh` (build ×7 + assemble + verify) | ✅ clean — 107 files / 36 MB in `_site`, all 8 published pages passed `verify-site` |
| All 9 published routes over HTTP (hub + 8 templates) | ✅ 200, hashed `./assets/*.js` entries, relative paths |
| Type strictness | ✅ strict in all 7 React/Vite apps |
| `npm audit` during builds | ✅ 0 vulnerabilities in all 7 apps (was: 2 advisories in `synapsex`/`portfolio` via `esbuild ≤0.24.2` / `vite ≤6.4.2`) |
| Secrets scan of sources | ✅ clean (only `secrets.GITHUB_TOKEN` in the workflow) |
| `git status` after build | ✅ clean — `dist/`, `_site/` properly ignored |
| `prefers-reduced-motion` coverage | ✅ the seven existing templates handle it (portfolio/synapsex ported in the close-out pass); Jack provides reduced-motion-aware reveal and scroll behavior |
| `npm audit` (all 7 apps) | ✅ 0 vulnerabilities at the reviewed base revision |

**Post-review close-out pass (2026-09-30):** every gap in `REVIEW_CHECKLIST.md` §C has been
implemented and re-verified — reviewed fixes ported from commit `9061482` (reduced-motion,
video fallbacks, accessible menus, Ethan Vale keyboard path), Securify compiles `strict`, the
finale is a self-hosted 1.2 MB loop, `video_search/` is gone, and all audit advisories are
fixed. The built showcase is running as a live preview (port 8080).

## 5. Current health & remaining gaps

**Healthy:** the deploy pipeline is genuinely hardened (build → replace → verify → idempotent
publish, with PR gating); repo hygiene is fixed (root + template `.gitignore`s, `LICENSE`,
`ASSETS.md`, root favicon); every template builds deterministically from its lockfile; the docs
trio per template is accurate and unusually good; **the accessibility, fallback and tooling
backlog (checklist §C) is fully closed**.

**What's left is deliberately minor:**

1. **Some media is still hot-linked** — the hero clips and 10 Securify chapter clips (CloudFront
   `hf_*` references + Pexels) plus Portfolio's Unsplash/Mux assets. Every one of them now has
   a real failure path (poster/plate/placeholder), so a dead link degrades gracefully instead
   of blanking a page. Vendoring the rest (per `ASSETS.md`) is the next tier of hardening.
2. **`noscript` messaging** exists only on the hub and Measured.
3. Cosmetic: the hub hero badge still says "Zero Intervention Autonomous Daily Curation", a
   leftover of the reverted bot-curation era.

## 6. How to work with this repo

```bash
# per-template dev (each folder is self-contained)
cd <template> && npm install && npm run dev        # vite on :5173
cd ethan-vale-archive && npx serve .               # zero-dep: any static server

# reproduce the deployed site locally
bash scripts/build-site.sh                          # install + build + verify into _site/
python3 -m http.server 8080 --directory _site
node scripts/check-assets.mjs                       # HEAD-check hot-linked media
```

To adapt a template: edit its `src/data/*` (content), `index.css`/`tailwind.config.js` (design
tokens), and the media URLs documented in [`ASSETS.md`](./ASSETS.md). The `ADAPTED_PROMPT.md`
next to each app is the full spec to regenerate or re-skin the design with a coding assistant.

---

## Addendum — Jack portfolio template (2026-09-30)

The eighth catalogue entry at `jack/` is a 3D creator portfolio built with React 18, TypeScript, Vite, Tailwind CSS v3, Framer Motion, and Lucide React. It includes the supplied Kanit typography, magnetic portrait, scroll-driven GIF marquee, animated biography, service list, and sticky-stack project gallery. The app uses a relative `base: './'` and includes its own package lock and prompt/build documentation.

The integration points are the root showcase card, README catalog and live route, explicit Pages slug map, workflow npm cache path, and remote-media checker source. The design-brief media URLs are hot-linked and have not been independently availability-tested. The deploy script publishes the Vite output at `/<repo>/jack/`; `verify-site.mjs` checks the assembled route.
