# End-to-End Deep Dive — `knarayanareddy/WebsitedesignandPrompts`

**Analysed:** 2026-09-28 · **Commit:** `864611e` (`main`, via branch `arena/01a0e9bd-websitedesignandprompts`)
**Scope:** repo anatomy → each template's code → build & deploy pipeline → verification → findings/risk register.

---

## 1. TL;DR

| | |
|---|---|
| **What it is** | A public "democratise award-winning web design" showcase: 6 self-contained, production-quality website templates, each with an AI *adaptation prompt* (`ADAPTED_PROMPT.md`), a *build log* (`BUILD_LOG.md`), and a live GitHub Pages demo behind a hand-built showcase hub (`index.html`). |
| **Size** | 169 tracked files, **29 MB in git** (60 MB working tree), **~5,930 lines of app code**, **~2,841 lines of documentation**. |
| **Stack spread** | React 18/19 + Vite 5/6/7/8 + Tailwind 3/4, GSAP/Lenis/Framer Motion/hls.js, plus one zero-dependency vanilla-JS 3D piece. |
| **Build health** | ✅ **5/5 buildable apps compile clean** (`npm ci` + `npm run build` from lockfiles), `oxlint` clean where configured, strict TS in 5/6. |
| **Deploy health** | ❌ **4 of the 6 promoted "Live Demo" links currently render a blank page.** The Pages workflow copies *source folders* (Vite dev `index.html` → `/src/main.tsx`) over previously-deployed *builds*. |
| **Biggest structural gap** | The pipeline has **no build step**; it publishes sources and relies on stale artifacts already sitting in `gh-pages`. |
| **Biggest content risk** | 5 of 6 templates hotlink third-party media from one CloudFront "user bucket" and Unsplash/Pexels/Mux — single point of failure, and the claimed MIT licence is not backed by a `LICENSE` file or asset provenance doc (both were deleted in the revert). |
| **Biggest opportunity** | ~1,047 lines of real quality fixes (a11y, reduced-motion, video fallbacks, error handling) exist on an orphan branch (`arena/01a0e42a…`, commit `9061482`) and were never merged. `main` is byte-for-byte the *pre-fix* state plus a workflow + hub. |

---

## 2. Anatomy

```
WebsitedesignandPrompts/
├── index.html                     # 831-line showcase hub (cards, filter, search) — hand-written, no build
├── README.md                      # catalogue + "how to use" + local dev instructions
├── .github/workflows/deploy.yml   # Pages publisher (no build step — see §5)
├── videoembeddeddesign/           # Template 01 — Securify (11-chapter video scroll story)
│   ├── securify/                  #   React 19 · Vite 8 · Tailwind 4 · TS (non-strict)
│   ├── video_picks.md             #   curated Pexels footage with frame verification
│   └── video_search/              #   ⚠️ 2.1 MB of scratch: probe scripts, candidate frames, logs
├── aetherascrollstory/            # Template 02 — Aethera (8-chapter white→night scroll story)
│   ├── public/videos/*.mp4        #   8 self-hosted 1080p clips = 24.5 MB (the repo's bulk)
│   ├── src/data/chapters.ts       #   entire story as typed data
│   └── src/components/VideoLoop.tsx  # rAF fade-envelope loop
├── measured/                      # Template 03 — Measured (5 interactive wearable surfaces)
│   ├── src/hooks/useSurfaceEngine.ts # cursor/touch spotlight engine
│   └── src/components/revelations/   # 5 bespoke reveal modules
├── ethan-vale-archive/            # Template 04 — Ethan Vale (3D Fibonacci sphere archive)
│   └── index.html                 #   1,993-line single-file vanilla engine, zero deps
├── synapsex/                      # Template 05 — SynapseX (neural-AI interface)
└── portfolio/                     # Template 06 — Editorial portfolio (Lenis + GSAP + HLS)
```

### Template matrix

| # | Template | Folder | Stack (installed) | App code | Docs | Local media | Live status |
|---|---|---|---|---|---|---|---|
| 01 | **Securify** | `videoembeddeddesign/securify` | React 19.3, Vite 8.3, Tailwind 4.3, TS 6.0 (**no `strict`**) | `App.tsx` 566 L (data-driven chapters) | 172 + 306 + 32 + 105 L | 153 KB poster; **10 hotlinked videos** | ✅ works (stale-but-matching build) |
| 02 | **Aethera®** | `aetherascrollstory` | React 18.3, Vite 6.4, Tailwind 3.4, `@fontsource` | `chapters.ts` 146, `VideoLoop` 110, `Chapter` 116, `Navbar` 45, CSS 84 | 145 + 88 + 47 + 53 L | **24.5 MB videos + 1 MB posters (self-hosted)** | ❌ blank |
| 03 | **Measured** | `measured` | React 19.3, Vite 7.3, Tailwind 4.3, oxlint | `useSurfaceEngine` 176, `SurfaceSection` 236, revelations 251/217/203/80/75, data 130 | 165 + 114 + 71 L | 536 KB (hero/base/stories JPEGs) | ❌ blank |
| 04 | **Ethan Vale** | `ethan-vale-archive` | **Vanilla** HTML/CSS/ES6+ (0 deps) | 1,993 L single file (~52 KB) | 441 + 172 + 94 L | none (21 hotlinked CDN photos + film) | ✅ works (at `/ethanvale/`) |
| 05 | **SynapseX** | `synapsex` | React 18.3, Vite 5.4, Tailwind 3.4, Framer Motion 12.4, Lenis 1.3, lucide | 12 components, ~85 KB src | 117 + 117 + 117 L | none (5 hotlinked CDN videos) | ❌ blank |
| 06 | **Editorial Portfolio** | `portfolio` | React 18.3, Vite 5.4, Tailwind 3.4, GSAP 3.15, Lenis, FM 11.18, hls.js 1.7 | ~81 KB src, 11 components | 127 + 98 + 98 L | none (Unsplash + Mux HLS) | ❌ blank |

### Git history (the useful part)

```
17c0756 Initial commit
42f0411 Add videoembeddeddesign (Securify 11-chapter scroll story)
e2b943a Add Aethera 8-chapter white-to-night scroll story
381be04 Add Measured 5-surface interactive wearable landing page
c769090 Add Template 04: ethan-vale-archive (3D Fibonacci sphere)
f48671e Add Template 05: synapsex (neural-AI interface)
3465163 Add Template 06: portfolio (editorial, Lenis/GSAP/HLS)
b8cdf3a chore: daily curation (2026-09-28)        ← bot commit
22cc3c7 Merge pull request #1 …                   ← merged
502c09b feat(ci): add automated GitHub Pages deployment workflow
864611e revert: remove low-quality cookie-cutter templates … ← HEAD (main)
```

Two **orphan branches** hold everything main no longer has:

| Branch | Contains | Status |
|---|---|---|
| `origin/arena/01a0e42a-websitedesignandprompts` (`arena-old`) | `9061482` *"Implement review fixes across all templates, add CI/Pages workflow, licence and asset provenance"* — **+1,047 / −292 lines across 35 files**, plus `LICENSE`, `ASSETS.md`, `REVIEW_CHECKLIST.md`, root `.gitignore`, and 5 source files missing from main | **never merged** |
| `origin/chore/daily-curation-2026-09-28` | 5 bot-generated templates (`brutalist-ledger`, `gallery-of-ordinary`, `harbour-logistics`, `kinetic-type-lab`, `quiet-museum`) — each exactly 251 lines / ~12 KB, plus a README that mislabels every React app as "Vanilla HTML5, CSS3, ES6+" | merged then **reverted** |

`git diff 9061482^ main` returns **only three additions** (`.github/workflows/deploy.yml`, the new `index.html`, a 2-line README edit). In other words: *the revert restored the pre-review-fix code exactly*, and the review fixes are the cheapest quality win available in this repo.

---

## 3. How each template actually works

### 01 · Securify — 11-chapter video scroll story
- All content is one typed `CHAPTERS: Chapter[]` array (`App.tsx:39-350`): per chapter `video`, `poster`, `shade`, `wordSize`, three absolutely-positioned giant lowercase words, paragraph, and a diagonal-divided `StatBlock`.
- `useInView(0.35)` per `Scene` gates playback: only the ≥35%-visible chapter plays; others `pause()`. Hero uses `preload="auto"`, chapters 2–11 `preload="metadata"`.
- Fixed pill navbar (SVG logo, `#watch/#scale/#proof/#calm` anchors), right-rail progress dots driven by the same observer state, and a scroll-cue animation on the hero.
- Palette discipline is enforced (black / white / neutral-900 / white-opacity only; no purple, no indigo) and copy is all lowercase — matching its `ADAPTED_PROMPT.md` verbatim.
- ⚠️ Media is 100% remote: hero clip from a third-party CloudFront bucket, chapters 2–11 from `videos.pexels.com` (two of them 60 fps, one 2560×1440 "4K source" the prompt itself flags for re-encode).

### 02 · Aethera — white → night → white
- Story-as-data in `src/data/chapters.ts`, mirrored by a `HERO` export. Each chapter carries `tone: 'light' | 'dark'`, `align`, and accent-segmented headline words (italic serif + `#6F6F6F`).
- `VideoLoop.tsx` is the technical standout: **no native `loop`**. A rAF loop reads `currentTime/duration` and writes wrapper opacity — fade-in 0.5 s, fade-out 0.5 s, `ended` → opacity 0 → 100 ms → `currentTime = 0` → `play()`. Zero React re-renders; the seam is invisible.
- `prefers-reduced-motion` short-circuits to poster-only; IntersectionObserver at 0.35 keeps exactly one decoder busy.
- Chapter 06 flips to black (type inverts, gradients flip) as the single dark pivot; the progress rail uses `mix-blend-difference` to stay legible across all three tonal states.
- Only self-hosted media in the repo: 8×1080p H.264 CRF 26–27, no audio, `+faststart`.

### 03 · Measured — five interactive surfaces
- `useSurfaceEngine.ts` is the core: pointer + touch tracking, LERP 0.10 spotlight, writes only CSS custom properties (`--mx/--my/--r`) so the radial mask stays GPU-composited (**no canvas**); grid parallax LERP 0.06; scroll-driven base-image drift; on coarse pointers with no recent touch it runs a slow **figure-8 breathing loop** and any `touchstart` snaps it to the finger. The rAF loop is started/stopped by an IntersectionObserver via an imperative `control` ref.
- Five reveal modules (`RevealVideo`, `RevealOptics`, `RevealSleep`, `RevealSchematic`, `RevealIridescent`) plug into a `reveal: RevealKind` union, so adding a surface is data-only (`data/surfaces.ts`, incl. a `Finish[]` material customizer with per-finish tint triples).
- Only app with a `<noscript>` fallback and a live tick readout (`live?: (tick) => string`).

### 04 · Ethan Vale — 3D archive in one file
- 21 photos on a **Fibonacci sphere** (`GA = π(3−√5)`, `index.html:1186`), positioned with pure CSS 3D `translate3d(...) rotateY(lat) rotateX(lon)` inside a perspective container.
- Custom physics in `tick()`: velocity memory, `0.94` friction damping, ±32° pitch clamp, scroll-driven camera dolly (`camZ`), and per-frame Z-depth → opacity/black-wash shading.
- The headline is counter-rotated every frame (`rotateX(-sx) rotateY(-sy) translateZ(R*0.62)`) so it stays locked to camera while cards fly past — a genuinely clever optical trick.
- FLIP lightbox (`openLit`), dual-mode 3D↔2D grid, responsive decode pipeline (`decodeImage` → blob URLs at device-appropriate max widths), splash/film intro, `prefers-reduced-motion` block in CSS.
- ⚠️ All 21 photos are hotlinked from one CDN bucket; drag-to-rotate has no keyboard equivalent (only `Escape` is bound).

### 05 · SynapseX — neural interface
- Lenis is instantiated in `main.tsx` and published through a tiny module singleton (`lib/scroll.ts`) so any component can `scrollToId`; the rAF loop is plain (not GSAP-driven).
- Hero does three things at once: normalised cursor → `useSpring` (stiffness 150 / damping 20) → watermark parallax (−30/−20 px) and headline tilt (±8°), **plus** a cursor-speed→`playbackRate` time-warp (1.0→1.6, decaying at 0.03/0.06 per frame).
- Supporting primitives: `ScrambleText`/`ScrambleIn` glyph decoding, `AnimatedCounter` telemetry, `SquashHamburger`, magnetic layer stack, scroll camera tilt.

### 06 · Editorial Portfolio — Awwwards-style
- Lenis↔GSAP bridge done correctly: `gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`, `document.fonts.ready → ScrollTrigger.refresh()`, and `lenis.stop()` while the preloader runs.
- HLS via `hls.js` with MSE check and native-`src` fallback (`useHlsVideo.ts`), dependency split into manual chunks — the 594 KB hls chunk is isolated from the 134 KB react chunk.
- Sections: LoadingScreen (preloader), Hero (Mux HLS + cursor spotlight), Works, Journal, Explorations (dual-resolution Unsplash), Stats, Footer.

---

## 4. The hub (`index.html`)

A deliberately zero-dependency landing page: dark tokens, Google Fonts (Outfit / JetBrains Mono / Syne), 6 gradient "poster" cards with inline SVG art, `data-filter` chips (`all/cinematic/editorial/interactive`), instant search over card titles + text, and "Launch Live Demo" / "Prompt Spec" CTAs.

Nitpicks: comment numbering is left over from the deleted templates (`<!-- 1. -->`, then `7.`, `8.`, `9.`, `10.`, `11.`); the Securify card links `./videoembeddeddesign/` while its repo folder root is `videoembeddeddesign/securify/`; the Ethan Vale card says `ethanvale/` while the repo folder is `ethan-vale-archive/`; and `href="./favicon.svg"` points at a file that **does not exist in `main`** (it survives only because it was left in `gh-pages`).

---

## 5. Build & deploy pipeline — where it breaks

### The workflow as written (`.github/workflows/deploy.yml`, 61 lines)
1. Checkout `main` (fetch-depth 0), fetch/attach `gh-pages` worktree.
2. `find . -maxdepth 2 -name index.html` → for each hit, `cp -r "$dir"/* "../gh-pages-site/$dir/"`.
3. Copy root `index.html`; `touch .nojekyll`; commit + push if anything changed.

**There is no `npm install`, no `npm run build`, and `cp -r … /*` merges into existing directories instead of replacing them.** For a Vite app this copies the *dev* entry point:

```html
<!-- measured/index.html, portfolio/index.html, synapsex/index.html, aetherascrollstory/index.html -->
<script type="module" src="/src/main.tsx"></script>
```

### What that did to the live site
`gh-pages` history shows the exact moment:

| gh-pages commit | Date | Effect |
|---|---|---|
| `1a3c043`, `7719687`, `620c7b1`, `fc3b429`, `de3926d`, `3ef69fd` | Sep 25 | Manual deploys of **built** `dist/` output — live demos worked |
| `0e2952e` | Sep 28 | "publish 5 new daily curation templates and master showcase hub" |
| `53434aa` | Sep 28 | **First workflow run** — overwrites each built `index.html` with the source `index.html`, leaving the built `assets/*` orphaned behind it |
| `0e33ee6` | Sep 28 | "clean gh-pages" reverts the curation templates but **does not restore the built `index.html` files** |

**Net result today:** `/aetherascrollstory/`, `/measured/`, `/portfolio/`, `/synapsex/` load `…github.io/src/main.tsx`, which does not exist → module 404 → blank page. Only Securify (a stale-but-intact build at `/videoembeddeddesign/`) and Ethan Vale (vanilla, `/ethanvale/`) actually render.

### Verified: the deployed bundles are still correct
I rebuilt all five apps from `main` and md5-compared every asset on `gh-pages`:

```
38 assets  aetherascrollstory  MATCH
 7 assets  portfolio           MATCH
 2 assets  measured            MATCH
 2 assets  synapsex            MATCH
 2 assets  videoembeddeddesign MATCH      → 51/51 byte-identical
```

So the breakage is **purely the four `index.html` files** — a 4-file hotfix, not a re-platform.

### Two further publishing gaps
1. **Securify is no longer publishable from `main`.** `videoembeddeddesign/` has no `index.html` (it is inside `securify/`), so the workflow's `maxdepth 2` copy produces `gh-pages/videoembeddeddesign/securify/` — a path nothing links to. The root card's `./videoembeddeddesign/` link only works because the Sep-25 build still sits in `gh-pages`.
2. **Ethan Vale path drift.** The hub and both READMEs advertise `/ethanvale/`; the workflow publishes `ethan-vale-archive/`. The old copy at `ethanvale/` will silently freeze at the Sep-25 revision while its successor drifts.

---

## 6. Verification performed (reproducible)

| Check | Command | Result |
|---|---|---|
| Install from lockfiles | `npm ci` ×5 | ✅ deterministic, all succeed |
| Production build | `npm run build` ×5 | ✅ all pass — securify 234 KB js/22 KB css; aethera 155 KB js + 38 font files; measured 256 KB js; portfolio 406 modules (hls 594 KB / react 134 KB / motion 122 KB / gsap 70 KB, split chunks); synapsex 1,886 modules → 329 KB js |
| Lint | `npx oxlint` (securify, measured) | ✅ 0 warnings / 0 errors |
| Type strictness | grep `tsconfig` | ✅ strict + `noUnused*` in 5/6; ❌ securify sets neither |
| Serve the real bundles | `python3 -m http.server` over a staged tree of the 5 `dist/` builds + the vanilla template | ✅ hub + all 7 routes HTTP 200 with hashed assets resolving |
| Deployed-asset integrity | `git show origin/gh-pages:<asset> \| md5sum` vs local build | ✅ 51/51 match |
| Deploy simulation | replayed the workflow's `find … cp -r` loop against `main` | ⚠️ syncs 5 **source** dirs; never creates `videoembeddeddesign/` |
| Secrets scan | regex for keys/tokens/passwords | ✅ clean (only `secrets.GITHUB_TOKEN` reference) |

A corrected build of the whole showcase is running as a live preview (port 8080) so you can see what the deployed site *should* look like.

---

## 7. Findings & risk register

### P0 — Live showcase is broken
- **4/6 demos blank** (evidence in §5). Fixes, in order of preference:
  1. **Build in CI**: matrix over the 5 apps, `npm ci && npm run build`, then `rsync -a --delete <app>/dist/ gh-pages/<slug>/`. Deletes the stale-orphan class of bug permanently.
  2. **Or publish to a Pages artifact** (`actions/upload-pages-artifact` + `actions/deploy-pages`) instead of a `gh-pages` worktree — same-commit deploys, no branch churn.
  3. **Immediate hotfix** (unblocks the live site today, no code change): for each of the four apps, copy `dist/index.html` (or `git show` it from the Sep-25 trees) over the source `index.html` in `gh-pages`, and delete the stray `*/src`, `*/package.json`, `*/tsconfig.json`… sources that were published by accident (`rsync --delete` semantics).

### P1 — Pipeline can never produce a correct site
- No build step; sources published; `cp -r` merges instead of replacing; `maxdepth 2` misses Securify; `find`-based syncing has no mapping for the `ethan-vale-archive` → `ethanvale` URL the docs promise.

### P1 — Missing legal/provenance files that the docs still reference
- `README.md` and the hub link `blob/main/LICENSE` → **404**; `gh repo view` reports `licenseInfo: null`, yet both READMEs say "MIT License".
- `ASSETS.md` and `REVIEW_CHECKLIST.md` existed in `9061482` and were dropped by the revert — along with the asset-provenance note that pairs with the hotlinked-media situation below.

### P1 — Hotlinked third-party media, concentrated on one host
- `d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/…` serves **hero video + 21 ethan-vale photos + measured's hero+sleep video + 5 synapsex videos + securify's hero clip + aethera's reference clip**.
- Plus `images.higgs.ai` (a proxy wrapper around that same bucket) for Measured, `images.unsplash.com` for Portfolio, `stream.mux.com` for HLS, `videos.pexels.com` for 10 Securify chapters.
- Consequences: rights/attribution for the CloudFront bucket are undocumented (the repo's own `aethera/BUILD_LOG.md` calls clip 01 "the project's own reference asset"), a single bucket change blanks 5 templates, offline/CI rendering fails, and Securify streams multi-MB 60 fps/1440p files with no local fallback though its own prompt recommends re-encoding to 8–15 s 1080p.

### P2 — Repo hygiene
- **`aetherascrollstory` has no `.gitignore`, and neither does the repo root** (both existed in `9061482`). `git add --dry-run aetherascrollstory` would stage **4,161 paths** — `node_modules/` plus a 27 MB `dist/`.
- `videoembeddeddesign/video_search/` commits 2.1 MB of scratch tooling (`probe.sh`, `probe2.sh`, `extract.sh`, `t.sh`, `candidates.txt`, `probe_results.txt`, 10 candidate JPEGs) — useful historically, noisy in a "template catalogue".
- 24.5 MB of video in Git is acceptable for Pages (25 MB file / 1 GB repo limits) but makes every clone heavy; consider Git LFS or a release asset if the catalogue grows.

### P2 — Accessibility & UX debt (exactly what the unmerged review commit addressed)
- **No `prefers-reduced-motion` handling at all** in `portfolio/src` and `synapsex/src`; partial in the others (`aethera` 3 hits, `measured`/`securify` 2, `ethan-vale` 1 CSS block).
- `ethan-vale`: the sphere is drag-only — no arrow-key rotation, no focusable cards, no roving tabindex; only `Escape` is bound.
- `noscript` only in `measured`; `<noscript>` + static fallback messaging absent elsewhere.
- Alt text is thin where images carry meaning (portfolio `alt=3` for 3 `<img>`; measured bridges 1 `<img>` with `baseAlt` present — good pattern to extend).
- Securify compiles without `strict`, so `noImplicitAny`/null-safety are off in the flagship template while everything else is strict.

### P3 — Docs/metadata drift
- Root README's Securify "Live Demo" points at the Pages **root** (the hub), not `/videoembeddeddesign/`.
- Hub card metadata says `ethanvale/`, repo folder says `ethan-vale-archive/`; `./favicon.svg` referenced but not present in `main`.
- Hub comment numbering starts at `1.` then jumps to `7.–11.` (ghosts of the reverted pack).
- No `engines` field / Node version pin; no CI job runs install+build+lint; no tests anywhere; `oxlint` configured in only 2 of 6 apps.

### P3 — Governance signals
- The daily-curation bot merged 5 ~identical templates and mislabelled every React project as "Vanilla HTML5, CSS3, ES6+" before being reverted by a single manual commit — worth a review gate (and the bot deleted `deploy.yml` and the hub in its branch).
- The genuinely valuable review commit (`9061482`) is stranded on an unmerged branch; `main` is its direct ancestor modulo 3 files.

---

## 8. Recommended roadmap

**Now (minutes)**
1. Hotfix the four `gh-pages` `index.html` files → live site fully restored.
2. Add root `.gitignore` + `aetherascrollstory/.gitignore` (`node_modules`, `dist`, `*.local`, `.DS_Store`).
3. Restore `LICENSE` (MIT) and `ASSETS.md` from `9061482`; fix the README/hub licence link.

**Next (hours)**
4. Rewrite `deploy.yml` to build each app and publish `dist/` with `rsync --delete` (or move to `upload-pages-artifact`/`deploy-pages`); add an explicit slug map (`videoembeddeddesign/securify` → `videoembeddeddesign`, `ethan-vale-archive` → `ethanvale`) and a `main`-level `favicon.svg`; add a `build`/`lint` CI job so a broken app can't deploy.
5. Port the review fixes from `9061482` (reduced-motion for portfolio/synapsex, video fallbacks, a11y labels, error handling) — either cherry-pick selectively or diff-review file by file, since the revert removed `portfolio/src/lib/{media,motion}.ts` and `synapsex/src/components/BackgroundVideo.tsx` that those fixes depend on.

**Then (days)**
6. Vendor or mirror the CloudFront assets (posters at minimum, ideally re-encoded 1080p clips) and document provenance/licence per template; keep remote URLs as progressive-enhancement fallbacks.
7. A11y pass: keyboard rotation + focus management in `ethan-vale`, `strict: true` in Securify, `noscript` everywhere, run axe/Lighthouse per template.
8. Add a Pages smoke test (curl each route, assert the entry script is a hashed `./assets/*.js` and returns 200) — that single check would have caught this outage.
9. Refresh the hub: correct slugs, restore sequential numbering, add a "self-hosted media" badge, and consider folding the 5 curated templates back in only after they meet the bar (real code + docs, not 251-line clones).

---

## 9. Evidence appendix

```bash
# 1. Why the live demos are blank
git show origin/gh-pages:measured/index.html | grep -o 'src="[^"]*"'   # → src="/src/main.tsx"
git log --format='%h %ad %s' --date=iso origin/gh-pages | head          # → 53434aa = first workflow run

# 2. Deployed bundles are still correct
git show origin/gh-pages:synapsex/assets/index-LcieJ-PB.js | md5sum
md5sum synapsex/dist/assets/index-LcieJ-PB.js                            # → identical

# 3. The workflow publishes sources, not builds
find . -maxdepth 2 -name index.html -not -path "*/.*/*" | while read i; do echo "$(dirname $i)"; done
#   → aetherascrollstory, ethan-vale-archive, measured, portfolio, synapsex  (never videoembeddeddesign/)

# 4. The stranded quality commit
git diff --name-status 9061482^ main   # → only deploy.yml + index.html + 2 README lines
git show --stat --oneline 9061482 | tail -3   # → 35 files changed, 1047 insertions(+), 292 deletions(-)

# 5. Hygiene exposure
git add --dry-run aetherascrollstory | wc -l   # → 4161 (node_modules + dist, unignored)
```

*Report generated from a full local build + deploy simulation; the corrected showcase is running as a live preview on port 8080.*
