# BUILD LOG — "Measured"

Technical build record for the 5-surface interactive landing page
(React 19 + Vite 7 + Tailwind v4 + TypeScript). Companion document to `ADAPTED_PROMPT.md`.

---

## 1. The 5-Layer Surface Architecture

Every surface is a `relative h-svh w-full overflow-hidden bg-black snap-start` section
(`src/components/SurfaceSection.tsx`) with a fixed z-index stack:

| Layer | z | Element | Behavior |
|-------|---|---------|----------|
| **L0 — Parallax Grid** | z-0 | `.grid-layer` div (oversized `-inset-20`) | 48px SVG grid pattern (`stroke #64748b @ 0.1 opacity`) as a data-URI `background-image`. Offset by cursor position, normalized to ±12px travel: `target = -(cursor/size − 0.5) × 24` per axis, LERP 0.06 per frame. Skipped under `prefers-reduced-motion`. |
| **L1 — Base Atmosphere** | z-10 | `<img>` inside a `will-change-transform` wrapper | Full-bleed base image (`object-cover`) at `scale(1.07)` with a scroll-driven vertical drift `target = (0.5 − scrollProgress) × 44px` (LERP 0.06), plus two vignette overlays: `bg-gradient-to-b from-black/80 via-transparent to-black` and a radial dark-edge gradient for depth. Hero image has an `onError` fallback to the local asset. |
| **L2 — Editorial Content** | z-20 | Kicker, heading, subtext, stat badge, (reserve: finish selector + CTA) | Instrument Serif display heading (single `<h1>` on hero, `<h2>` elsewhere), emerald mono kicker (`tracking-[0.3em] uppercase`), Inter body copy, and a `.liquid-glass` stat badge with a live 250ms-tick readout (sample counter / HRV jitter) that only runs while the surface is active. |
| **L3 — Spotlight Reveal** | z-30 | `.zone-fade` container → `.spotlight-mask` container → reveal component | Reveal zone is absolutely positioned from `insetTop`% of the section height (per-surface: 40/38/20/34/32) to the bottom. The inner container carries a radial CSS mask (see §2). The zone itself has a second, linear top-fade mask so the zone boundary never shows a hard edge. Pointer-events are disabled; the section listens. |
| **L4 — Readability Bleeds** | z-40 | Two gradient strips | `top-0 h-28 from-black/80 → transparent` and `bottom-0 h-36 transparent → to-black`, guaranteeing seamless continuity under the fixed nav and between adjacent surfaces. |

The reveal components (in `src/components/revelations/`) are all memoized and animation
states are driven purely by CSS keyframes, so React never re-renders them during the
pointer loop.

## 2. Spotlight Engine — `src/hooks/useSurfaceEngine.ts`

**Pointer tracking.** `pointermove`, `touchstart` and `touchmove` listeners on the section
store the pointer in *section-local* coordinates (via one `getBoundingClientRect()` per
event) plus a timestamp. `pointerleave` (mouse only) clears presence; touch presence is
retained so the idle drift can take over.

**LERP math (per rAF frame, one read-then-write pass):**

```
spot.x += (target.x − spot.x) × 0.10        // position smoothing (spec: LERP 0.1)
spot.y += (target.y − spot.y) × 0.10
spot.r += ((active ? 260 : 0) − spot.r) × (active ? 0.14 : 0.10)   // radius grow/shrink

grid.x += (gridTarget − grid.x) × 0.06      // L0 parallax (spec: LERP 0.06), ±12px max
grid.y += (gridTarget − grid.y) × 0.06
base.y += (baseTarget − base.y) × 0.06      // L1 scroll drift, ±22px max
```

**Hardware-accelerated mask.** The feathered 260px radial mask is a pure CSS custom-property
update — no canvas, no per-frame string allocation beyond the three `setProperty` calls:

```css
.spotlight-mask {
  --mx: -4000px;  --my: -4000px;  --r: 0px;
  mask-image: radial-gradient(
    circle var(--r) at var(--mx) var(--my),
    #000 0%, #000 42%, rgba(0,0,0,0.55) 66%, rgba(0,0,0,0) 100%
  );
}
```

`--mx/--my` are written relative to the reveal zone (section y minus `insetTop`%), `--r`
lerps 0 → 260px so the spotlight breathes open on first hover and collapses on exit.

**Touch figure-8 idle loop.** On coarse-pointer devices (or `ontouchstart`), when no touch
has occurred for 2.6s the target follows a parametric Lissajous figure-8 inside the reveal
zone with an 11s period:

```
φ      = (now / 11000) × 2π
target.x = width × 0.5  + sin(φ) × width × 0.30
target.y = zoneTop + (height − zoneTop) × 0.52 + sin(2φ) × (height − zoneTop) × 0.20
```

Any `touchstart`/`touchmove` snaps the LERP target back to the finger immediately (the 0.1
factor produces a short, organic catch-up). Disabled under reduced motion.

## 3. Performance Suspension — `src/hooks/useInView.ts`

A per-section `IntersectionObserver` (`threshold: [0, 0.25, 0.5, 1]`) flips the surface
`active` at ≥ 0.25 visibility. While inactive:

- the rAF loop is cancelled (`cancelAnimationFrame`) — zero per-frame cost off-screen;
- the hero `<video>` is `.pause()`d (and replayed on re-entry, with a black cover until
  `onPlaying`);
- the reveal zone sets `--play: paused`, freezing every decorative CSS animation
  (`.a-pulse/.a-flow/.a-dash/.a-float/.a-spin/.a-travel/…` all declare
  `animation-play-state: var(--play, running)`), so no compositor work happens either;
- stat-badge live counters stop their 250ms intervals.

With 100vh sections, at most one surface (briefly two at the snap boundary) runs a loop at
any moment. `prefers-reduced-motion: reduce` additionally removes smooth scrolling, scroll
snap, and all decorative animations (the user-driven spotlight remains functional).

## 4. Accessibility & SEO Compliance

- **Single semantic heading:** exactly one `<h1>` ("Measured", hero); surfaces 2–5 use
  `<h2>` — perfect WCAG 1.3.1/1.2.4 and clean SEO document outline.
- Every surface `<section>` carries `aria-labelledby` pointing at its heading id;
  the logo link, hamburger (`aria-expanded`), drawer (`role="dialog" aria-modal`),
  finish buttons (`aria-pressed`) and CTA are all labeled.
- Decorative layers (grid, vignettes, bleeds, reveal art) are `aria-hidden`;
  reveal SVGs are `aria-hidden` with the narrative in the visible text layer.
- `prefers-reduced-motion: reduce` — smooth scroll + snap disabled, parallax and
  decorative animation suspended (see §3).
- Body scroll is locked while the mobile drawer is open (restored on close);
  Escape and viewport resize close it.

## 5. Build & Deployment

- `npm run dev` — Vite dev server, `host: 0.0.0.0:5173`, `allowedHosts: true`.
- `npm run build` — `tsc --noEmit` type-check + `vite build`.
- `npm run lint` — oxlint (correctness category as errors, `.oxlintrc.json`).
- **GitHub Pages:** `base: './'` + relative `./img/…` asset paths make the `dist/`
  output path-agnostic — deploy `dist/` to `<repo>/measured/` (e.g. via a `docs/` branch
  or GitHub Pages "Deploy from a branch") and all assets, fonts (CDN) and anchors resolve
  from the subpath with no 404s. No router is used, so no `404.html` fallback is needed.
- External hero assets (higgs.ai image, cloudfront MP4) are referenced per spec and have
  local fallbacks, so the page degrades gracefully if either host is unreachable.
