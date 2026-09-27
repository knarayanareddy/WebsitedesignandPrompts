# Review fix checklist

Tracking document for the end-to-end review remediation. Each item lists **what** is wrong,
**how** it is being fixed, and its status. Status legend: `[x]` done · `[~]` partially done /
mitigated · `[ ]` deferred (needs a decision or an asset that cannot be produced from code).

---

## A. Repository-level

| # | What | How | Status |
|---|------|-----|--------|
| A1 | No `LICENSE` file although README claims MIT | Add root `LICENSE` (MIT) | [x] |
| A2 | README asset/licence claims inaccurate (says "all Pexels") | Rewrite "License & Attribution"; add `ASSETS.md` with per-template provenance, licence and replacement steps | [x] |
| A3 | README badge points to a non-existent `deploy.yml` | Add `.github/workflows/deploy.yml`: builds all six templates on every push/PR, assembles the Pages tree and publishes `gh-pages` on pushes to `main` (same branch the site already deploys from, so no settings change needed) | [x] |
| A4 | `gh-pages` contains stale duplicate trees (`ethan-vale-archive/`, `videoembeddeddesign/`) | Workflow publishes with `force_orphan`, so every deploy is a clean tree with exactly the six documented paths (takes effect on the first deploy from `main`; the `_site` assembly was dry-run locally) | [x] |
| A5 | `videoembeddeddesign/video_search/` scratch research (failed probe output, 2 MB frames) committed | Delete folder; update the template README tree | [x] |
| A6 | No root `.gitignore`; `aetherascrollstory/` has none at all | Add both | [x] |
| A7 | 25 MB of MP4 committed in `aetherascrollstory/public/videos/` | **Deferred (decision needed).** Moving to Git LFS requires a history rewrite (force-push, re-clones) and CI/LFS bandwidth changes. `ASSETS.md` §2 documents the three options (keep / LFS / external host); recommendation is to keep as-is at the current size | [ ] |
| A8 | Tooling drift (TS 5.6/5.9/6.0, Vite 5/6/7/8, Tailwind 3/4) | **Deferred.** Not a defect; upgrading five apps in one review pass is out of scope. CI now builds every app on Node 22 so drift is at least continuously verified | [ ] |

## B. Securify (`videoembeddeddesign/securify`)

| # | What | How | Status |
|---|------|-----|--------|
| B1 | Hero `<video autoPlay>` ignores `prefers-reduced-motion` | `autoPlay` only when not reduced; reduced users see the poster | [x] |
| B2 | `usePrefersReducedMotion` never updates | Listen to `matchMedia('change')` | [x] |
| B3 | Hero video is a hotlinked third-party CloudFront file with no failure path | `onError` → fall back to poster (no broken black band); `HERO_VIDEO` hoisted to a documented constant; provenance in `ASSETS.md` | [~] (asset cannot be re-hosted from the sandbox; see ASSETS.md) |
| B4 | Nav links hidden below `md` with no alternative | Add accessible hamburger + full-screen drawer (Escape, focus management, scroll lock) | [x] |
| B5 | `h-screen` jumps with mobile browser chrome | `h-svh` | [x] |
| B6 | Dead `v` parameter on `onActive` | Remove | [x] |
| B7 | Docs: BUILD_LOG says React 18 / "included `.github` workflow"; ADAPTED_PROMPT says every word is an `<h1>` | Fix all three statements | [x] |
| B8 | 55.8 MB 1440p finale clip streamed raw | **Deferred.** Needs `ffmpeg` on the source file (not available in the sandbox, and Pexels is not reachable from it); recipe in BUILD_LOG §5/§9 and `ASSETS.md` §1 | [ ] |
| B9 | `oxlint` warning: drawer cleanup read `openBtnRef.current` after unmount | Capture the opener element inside the effect; `npx oxlint` → 0 warnings | [x] |

## C. Aethera (`aetherascrollstory`)

| # | What | How | Status |
|---|------|-----|--------|
| C1 | `VideoLoop` wrapper stays at `opacity:0` when autoplay is blocked → blank chapter | On `play()` rejection or media `error`, reveal wrapper (poster) at full opacity; also reveal on `pause` when not yet played | [x] |
| C2 | Navbar "Home" hard-coded as active | Derive active item from the current chapter | [x] |
| C3 | `h-screen` | `h-svh` / `min-h-svh` | [x] |
| C4 | Missing `.gitignore` | Added (A6) | [x] |
| C5 | Magic layout numbers (`300px`, `calc(8rem - 75px)`) | Named constants with comments | [x] |

## D. Measured (`measured`)

| # | What | How | Status |
|---|------|-----|--------|
| D1 | Mobile drawer `role=dialog` without focus management | Move focus to close button on open, trap Tab inside, restore focus on close | [x] |
| D2 | `RevealVideo` autoplays regardless of reduced-motion | Respect `prefers-reduced-motion` (show fallback art instead) | [x] |
| D3 | No `vite/client` types (`vite-env.d.ts` missing) | Add `src/vite-env.d.ts` | [x] |

## E. Ethan Vale (`ethan-vale-archive`)

| # | What | How | Status |
|---|------|-----|--------|
| E1 | Sphere cards and grid figures are click-only `div`s (no keyboard access) | `role=button`, `tabindex=0`, `aria-label`, Enter/Space handlers; lightbox focuses its close button and restores focus | [x] |
| E2 | Every asset hotlinked from a third-party CloudFront bucket, no failure path | Single `ASSET_BASE` constant; per-image `onerror` renders a titled placeholder card instead of a broken image; film failure already handled | [~] (see ASSETS.md for re-hosting) |
| E3 | `tick()` does full work every frame even when idle; `getComputedStyle` per frame | Cache perspective in `computeLayout`; snap camera lerp; skip DOM writes when the scene is static | [x] |
| E4 | Startup re-encodes 22 `_min.webp` through canvas (CPU, memory, needs CORS) | Replace with `Image.decode()` preloading; a rejected decode still counts toward splash progress | [x] |
| E5 | Hidden views stay in the tab order (grid tiles while the sphere is shown, sphere cards while the grid is shown, lightbox Close while closed) | `inert` + `aria-hidden` toggled on `#stage` / `#grid` / `#lit`; `#lit` is now `role=dialog aria-modal aria-labelledby`; grid button exposes `aria-expanded` | [x] |
| E6 | Docs described the removed canvas pipeline / claimed "WCAG AAA" | README controls table + asset note, BUILD_LOG §8 rewritten, ADAPTED_PROMPT loading/keyboard/render-loop paragraphs updated | [x] |

## F. SynapseX (`synapsex`)

| # | What | How | Status |
|---|------|-----|--------|
| F1 | Five `<video autoPlay loop>` all play for the whole session, offscreen included | New `BackgroundVideo` component: IntersectionObserver-gated play/pause, `preload=metadata`, `onError` fallback | [x] |
| F2 | No `prefers-reduced-motion` handling (Lenis, framer, videos, rAF) | Skip Lenis when reduced; `MotionConfig reducedMotion="user"`; videos stay paused | [x] |
| F3 | Hero rAF loop writes `playbackRate` every frame forever | Loop only runs while rate ≠ 1, restarted by pointer movement | [x] |
| F4 | Google Fonts via render-blocking CSS `@import` | `<link rel=preconnect>` + stylesheet link in `index.html` | [x] |
| F5 | Scramble text, counters, CSS keyframe loops and the native scroll fallback ignored reduced motion | `prefersReducedMotion()` short-circuits `ScrambleIn` / `ScrambleText` / `AnimatedCounter`; `@media (prefers-reduced-motion)` disables the flicker / scanline / icon-spin loops; `scroll.ts` uses `behavior: 'auto'` | [x] |
| F6 | Docs | README tree, BUILD_LOG §2.1 + new §2.1.1 + checklist rows, ADAPTED_PROMPT hero/reduced-motion/fonts lines | [x] |

## G. Portfolio (`portfolio`)

| # | What | How | Status |
|---|------|-----|--------|
| G1 | Same Mux stream attached twice from page load | `useHlsVideo` attaches lazily when the element nears the viewport and pauses when out of view | [x] |
| G2 | `useHlsVideo` prefers hls.js over native HLS on Safari | Check `canPlayType('application/vnd.apple.mpegurl')` first | [x] |
| G3 | No reduced-motion handling anywhere | Native scroll instead of Lenis; `MotionConfig reducedMotion="user"`; static parallax columns; static marquee; no role cycling | [x] |
| G4 | Works cards / Journal rows are `cursor-pointer` with no link | `Project` / `Article` take an optional `href`. With one, the card/row renders as a real `<a>` (focus-visible ring, hover *and* focus pill/arrow); without one it is a plain tile with no pointer cursor and no fake affordance. Demo data leaves `href` unset (nothing to link to) — documented in the interface comments, README and prompt | [x] |
| G5 | Nav links hidden below `md` with no alternative | Accessible mobile menu | [x] |
| G6 | Lightbox: no focus management | Focus close button on open, trap Tab, restore focus on close | [x] |
| G7 | `mailto:` link wrapped in a redundant `onClick` | Removed | [x] |
| G8 | 2.7 s fixed fake preloader | Progress now completes as soon as fonts + hero poster are ready (min 1 s, max 2.7 s) | [x] |
| G9 | `h-screen` | `h-svh` (hero, Explorations stage, app shell) | [x] |
| G10 | Stream + poster URLs duplicated in Hero and Footer | Centralised in `src/lib/media.ts` with a provenance comment; `hls.js` fatal errors tear down and keep the poster | [x] |
| G11 | Docs | README features/tree, BUILD_LOG §4 + new §4.1, ADAPTED_PROMPT component specs | [x] |

---

## Verification (run in the review sandbox, Node 22.22)

| Check | Result |
|---|---|
| `npm ci && npm run build` — Securify (`tsc -b && vite build`) | ✅ 236.7 kB JS / 22.9 kB CSS |
| `npm run build` — Aethera (`tsc --noEmit && vite build`) | ✅ 155.1 kB JS |
| `npm run build` — Measured (`tsc --noEmit && vite build`) | ✅ 257.1 kB JS |
| `npm run build` — SynapseX (`tsc && vite build`) | ✅ 330.7 kB JS |
| `npm run build` — Portfolio (`tsc --noEmit && vite build`) | ✅ chunks react / motion / gsap / lenis / hls |
| `npx oxlint` — Securify, Measured | ✅ 0 warnings, 0 errors |
| Ethan Vale inline script | ✅ `node --check` on the extracted script; happy-dom smoke test: 21 cards + 21 grid tiles built, keyboard open/close, focus restore, `inert` toggling, placeholder on `img error`, splash progress completes with rejected decodes, render loop running, no runtime errors |
| Workflow | ✅ `deploy.yml` parses (js-yaml); the "Assemble Pages tree" step was executed locally against the fresh `dist/` folders → 29 MB `_site` with the six documented paths, no root-relative asset URLs in any `index.html` |

Not verifiable from the sandbox (no browser, no egress to the CDNs): real playback of the hot-linked media, and the visual result of the reduced-motion layouts — please spot-check those in the Pages preview after merging.

## Deferred items needing a decision

- **A7** Aethera MP4s in Git (keep / LFS / external host).
- **A8** Tooling version unification across the five apps.
- **B8** Re-encode + self-host the Securify finale clip.
- **Media re-hosting** for every `hf_` CloudFront asset and the Portfolio Mux stream (ownership undocumented; see `ASSETS.md`).
