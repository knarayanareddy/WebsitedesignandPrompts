# Build log — Apogee glassmorphic data-intelligence landing

## 1. What was built

A full landing page for **Apogee** (fictional data-intelligence platform), in two layers:

1. **The hero** — a value-for-value recreation of an exacting pixel spec: every hex, px value,
   arbitrary Tailwind class, animation delay and copy string is literal. One file
   (`src/components/Hero.tsx`) holds `BAR_HEIGHTS` → `Animate` → `RevenueCard` → `Hero` → `Nav`.
2. **The expansion** — six sections that continue the design language into a product story
   (trust strip → numbers → platform cards → forecast console → quote → CTA → footer).

Tech: **React 18.3 + TypeScript + Vite 6.4 + Tailwind CSS 3.4** (`lucide-react` for icons).

## 2. The hero mechanics (the part the spec cares about)

- **Entrance timeline is pure CSS.** Elements start at `opacity-0` and are revealed by keyframe
  animations with `forwards` fill + `animationDelay` (`0 → 100 → 200 → 300 → 500 → 700 → 900ms`,
  bars at `1100 + i×30ms`), all on `cubic-bezier(0.16, 1, 0.3, 1)`. No JS animation state, no
  IntersectionObserver in the hero.
- **`RevenueCard`** renders 32 bars from `BAR_HEIGHTS` (max derived via `Math.max(...)`); bars
  28–31 are "projected" (`rgba(255,255,255,0.1)`), the rest solid white. The 5 gridlines sit at
  20/40/60/80/100% (the `((i+1)/5)*100%` formula lands the last line exactly on the right edge).
  The axis intentionally repeats `16:00` and dims labels at index ≥ 3 — quirks of the source
  design, reproduced deliberately.
- **`Nav`** keeps the mobile overlay mounted and toggles `visible`/`invisible` + opacity +
  transform so open *and close* transitions animate; the Menu/X icons cross-fade with
  rotate+scale (both always mounted). Body scroll locks while open, with unmount cleanup.
- **Asymmetric card padding** (`p-5 sm:p-8 pb-5 sm:pb-6`) is intentional — the bottom edge is
  shallower than the other three sides.

## 3. The expansion (Part B) — same language, more story

Every section reuses the card's glass grammar (`rgba(17,16,15,0.35)` + `backdrop-blur-[20px]`,
radius scale, `font-[450]`, `white/80`-family text) and the hero's easing. Additions:

- **`Reveal.tsx`** — IntersectionObserver scroll-reveal (24px rise, 0.8s, per-element delay).
  The hero is deliberately exempt: its timeline is the spec's.
- **`Metrics`** — rAF count-ups (1.4s cubic ease-out) triggered on first visibility.
- **`Console`** — the RevenueCard, grown up: range tabs (`Today/30D/YTD` with `aria-pressed`),
  the card's badge + axis classes, and an SVG forecast curve that line-draws via
  `pathLength="1"` + `stroke-dashoffset` (`key={range}` remounts the path so each tab replays
  the draw).
- Copy is fictional-but-coherent: the sections tell one story (promise → trust → proof numbers →
  capabilities → product surface → customer voice → CTA).

## 4. Documented deviations from the source spec

The hero spec is reproduced literally; these repo-level standards were added around it. None of
them change a single rendered pixel of the hero:

| Spec said | Shipped | Why |
|---|---|---|
| Vite 5 | Vite **6.4.3** | No patched 5.x exists (esbuild advisory chain); repo standardizes on the audit-clean line |
| `lint: eslint .` | `lint: oxlint` | Zero-config lint used by the repo's other templates |
| `build: vite build` | `tsc --noEmit -p tsconfig.app.json && vite build` | Repo standard: type errors fail the build |
| plain `vite.config.ts` | + `base: './'`, `server.host/allowedHosts` | GitHub Pages subpath deploys + sandbox preview proxy |
| video has no failure path | `onError` → CSS nebula plate | Repo media standard (a dead CDN must not blank a page) |
| hero always autoplays | pauses under `prefers-reduced-motion` | Repo a11y standard (attributes stay as specified) |
| hero-only CSS | + marked additions block in `index.css` (reveal/chart/reduced-motion) | Part B needs them; the spec's CSS is preserved verbatim above the line |

The reduced-motion CSS guard resolves all entrance animations instantly
(`animation-duration: 1ms`) so `opacity-0` elements never get stuck hidden.

## 5. Media & provenance

- **Hero clip** (`hf_20260813_092641_….mp4` on `d8j0ntlcm91z4.cloudfront.net`) — an
  AI-generated reference clip from the same undocumented user bucket as other templates in this
  repo. Treat as a placeholder; licence undocumented (`../ASSETS.md`). Fallback: the CSS
  deep-blue/red nebula plate on `onError`.
- **Suisse Intl webfont** (`db.onlinewebfonts.com`) — hot-linked per spec. Suisse Intl is a
  commercial typeface; this CDN copy's licensing is undocumented. The stack falls back to
  `-apple-system, BlinkMacSystemFont, sans-serif`. Replace with a licensed webfont or an open
  alternative (e.g. Inter) before publishing commercially.
- Everything else is CSS/SVG — no other external assets. The favicon is generated from the
  logo mark.

## 6. Architecture (for the agent touching the code)

```
index.html                  — Suisse Intl <link>, #root, /src/main.tsx
vite.config.ts              — react plugin, @/ alias, base './'
tailwind.config.js          — stock (all arbitrary values)
src/index.css               — spec CSS verbatim + marked additions (reveal, chart, reduced-motion)
src/App.tsx                 — section composition
src/components/Hero.tsx     — BAR_HEIGHTS · Animate · RevenueCard · Hero · Nav (the spec)
src/components/Reveal.tsx   — IO scroll-reveal wrapper (Part B only)
src/components/Logos.tsx    — trust strip
src/components/Metrics.tsx  — rAF count-up stats
src/components/Features.tsx — six glass capability cards
src/components/Console.tsx  — forecast console (tabs + SVG line-draw chart)
src/components/Quote.tsx    — customer testimonial
src/components/CallToAction.tsx — closing CTA + nebula glow
src/components/SiteFooter.tsx   — footer
```

## 7. Verification

- `npm run build` — typecheck + Vite build, green (strict TS, `noUnused*`).
- `npx oxlint` — 0 warnings / 0 errors.
- Published at `/apogee/` by `scripts/build-site.sh` (slug `apogee`), verified by
  `scripts/verify-site.mjs` like every other template.
- Hero checklist spot-verified against the built CSS/JSX: 32 bars, dimmed bars 28–31,
  duplicated `16:00`, `.00` span, `font-[450]`, visibility-toggled menu, cross-faded icons,
  CTA paddings `px-5 sm:px-[27px]`, card padding asymmetry.

## 8. Band media & interactive layer (second pass)

The first full-page pass shipped the hero's fidelity but the sections below read as quiet
static type. This pass (working-tree, then committed separately) adds two device families
without touching the hero:

- **Ambient band video** — `public/videos/{field,terrain,ascent}.mp4` (1920×1080, 30 fps,
  seamless 15 s H.264 loops) with `public/posters/poster-*.jpg` stills. These are **generated
  procedurally** — `tools/generate-bands.py` renders per-frame with PIL/numpy and pipes into
  ffmpeg — so they are original, license-clean, and on-palette (`#080A19` field, cyan
  `#48E6E0`/blue `#29388C` accents). Motion is built from integer cycle counts so every loop
  is seamless. `src/lib/AmbientVideo.tsx` layers them: poster → video (`object-fit: cover`),
  scroll parallax (rAF, transform only), reduced-motion pause + no parallax, `onError` → CSS
  gradient fallback (matches the hero clip's fallback pattern).
- **Pointer interactivity** — `src/lib/pointer.ts` exposes `useTilt(ref, maxDeg)` and
  `useSpotlight(ref)`; both write CSS custom properties (`--rx/--ry/--mx/--my`) and are gated
  on `(hover:hover) and (pointer:fine)` + no reduced motion. CSS additions in
  `src/index.css` (marked block): `.tilt`/`.tilt-glow`, `.marquee`, `.apogee-range`, and the
  reduced-motion fallbacks (marquee wraps static, tilt transforms off).
- **Assumption sliders** — the forecast console's sliders recompute the SVG path from 41
  points per input event (deterministic growth/volatility math in `Console.tsx`); the
  line-draw animation replays only on tab change (key remount), so dragging a slider updates
  `d` in place.

Band loop sizes: `field` 1.4 MB, `ascent` 658 KB, `terrain` 2.6 MB (~4.5 MB total) — deliberate
CRF 25/26; regenerate at a lower CRF for production if needed.

## 9. Licensing

Code: MIT (repository licence). **Media and fonts are not covered** — see `../ASSETS.md`.
