# Measured — Multi-Surface Scroll Experience

> **Live Demo:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/)

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-121013?logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/)

A full-screen, 5-surface immersive landing page for **Measured**, a luxury health & wellness
wearable. Dark luxury aesthetic, parallax grid, liquid-glass UI, and a cursor/touch-following
spotlight that reveals an underlying dynamic layer on every surface.

## Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Google Fonts: Inter (300–700) + Instrument Serif (regular + italic)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint     # run oxlint
```

## The 5 surfaces

| # | id         | spotlight reveal                                  |
|---|------------|---------------------------------------------------|
| 1 | `#hero`     | looping product video (with animated fallback)    |
| 2 | `#science`  | sub-dermal PPG optics — sensor rays, waveforms    |
| 3 | `#stories`  | hypnogram + HRV recovery curve                    |
| 4 | `#hardware` | exploded schematic — flex, cells, custom silicon  |
| 5 | `#reserve`  | iridescent mirror-finish reflection + finish selector |

## Architecture

- **`src/data/surfaces.ts`** — single `SURFACES` config array: all copy, assets, stats,
  reveal kind, spotlight zone boundary (`insetTop`), layout, and finishes live here.
- **`src/components/SurfaceSection.tsx`** — generic 100vh surface with the 5-layer stack:
  L0 parallax grid (z-0), L1 base atmosphere + vignette (z-10), L2 editorial content (z-20),
  L3 spotlight reveal (z-30), L4 readability bleeds (z-40).
- **`src/hooks/useSurfaceEngine.ts`** — pointer/touch tracking with LERP (0.1) in a
  `requestAnimationFrame` loop; spotlight radius/position written as CSS custom properties
  driving a hardware-accelerated radial mask. Grid parallax (LERP 0.06, ±12px) and base
  image scroll drift. Touch devices get a slow figure-8 idle drift that snaps to touch.
- **`src/hooks/useInView.ts`** — IntersectionObserver (threshold 0.25): only the visible
  surface runs its rAF loop and plays media; inactive surfaces pause video and set
  `--play: paused` to freeze reveal animations.
- **`src/components/revelations/`** — the five underlying dynamic layers (SVG/CSS,
  memoized).
- **`src/components/Navbar.tsx`** — fixed z-50 header, liquid-glass center pill, CTA pill,
  mobile hamburger → z-55 fullscreen drawer with staggered slide-up items + body scroll lock.

## Docs

- [`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md) — complete prompt specification used to create this multi-surface experience.
- [`BUILD_LOG.md`](./BUILD_LOG.md) — technical notes on the pointer engine, LERP math, and layer hierarchy.

## Design notes

- Single semantic `<h1>` (hero "Measured"); surfaces 2–5 use `<h2>` (WCAG/SEO).
- `html { scroll-behavior: smooth; scroll-snap-type: y proximity; }`, both disabled under
  `prefers-reduced-motion: reduce` (decorative animations freeze, spotlight stays usable).
- The hero base image/video are external URLs per the brief, with local generated fallbacks
  in `public/img/` (hero image falls back via `onError`; video falls back to an animated
  scene if it fails to load).
