# Apogee — Glassmorphic Data-Intelligence Landing

![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-121013?logo=github)

A **React + Vite + Tailwind CSS + TypeScript** landing page for "Apogee", a fictional
data-intelligence platform — *advanced reasoning systems and predictive models built for the
unknown*. The hero section is a **value-for-value recreation** of an exacting pixel spec (32-bar
glassmorphic revenue chart, precise `cubic-bezier(0.16, 1, 0.3, 1)` entrance timeline,
visibility-toggled mobile menu); the sections below extend that design language into a full
product story. GitHub Pages ready (`base: './'`).

> **Live Demo:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/apogee/](https://knarayanareddy.github.io/WebsitedesignandPrompts/apogee/)

---

## ✨ The page — hero, then the story

| # | Section | What it does |
|---|---------|--------------|
| 0 | **Hero** | Full-viewport nebula video, glass nav pills, headline *“Elevate your essential data to new heights”*, and the **Revenue Growth** card — 32 bars (last 4 dimmed as “projected”), 5 gridlines, and a `1100ms + i×30ms` bar-grow stagger |
| 1 | **Trust strip** | Hairline band of fictional customer wordmarks, **marqueeing** continuously (wraps static for reduced motion) |
| 2 | **The numbers** | Four rAF count-up stats (`$4.2B`, `99.98%`, `12ms`, `340+`) on a full-bleed **“field” video band** of flowing network nodes, each stat cell cursor-tilting at the pointer |
| 3 | **Platform** | Six glass capability cards (Predictive Models → Real-time Signals) with a **cursor spotlight** sweeping the section and per-card tilt/glow |
| 4 | **Forecast console** | The card language, expanded: range tabs (Today/30D/YTD), live badge, SVG line-draw chart, the card's axis styling — **plus two assumption sliders (Market growth, Volatility) that recompute the curve, projected amount and delta instantly** |
| 5 | **Quote** | Editorial customer testimonial (monogram attribution) over a full-bleed **“terrain” video band** (wireframe horizon) |
| 6 | **CTA** | “Reach your apogee.” over the **“ascent” video loop** (rising light streaks), hero button pair with pointer-tilt |
| 7 | **Footer** | **“Built for the unknown” marquee strip** + brand block + Product/Company/Resources/Legal columns |

Design system: `#080A19` canvas · white/`white/80` type · glass surfaces at
`rgba(17,16,15,0.35)` with `backdrop-blur-[20px]` · `#E9E9E9` buttons · `font-[450]` everywhere
except the `font-normal` h1 · radius scale `6 → 11 → 12 → 13 → 20 → 24 → 33px`.

---

## 🎯 Exactness contract (hero)

The hero follows its source spec literally — exact hex values, pixel numbers, arbitrary Tailwind
values (`text-[15.5px]`, `px-[27px]`, `gap-[1.5px]`…), animation delays and copy. Highlights:

- `BAR_HEIGHTS` — all 32 values in order; `maxHeight` from `Math.max(...)`, never hardcoded.
- Bars 28–31 render `rgba(255,255,255,0.1)`, bars 0–27 solid `white`.
- Axis labels are `10:00 · 12:00 · 14:00 · 16:00 · 16:00` (the duplicated `16:00` is intentional);
  labels at index ≥ 3 render at `opacity: 0.4`.
- The `.00` cents is a separate `white/20` span.
- Mobile menu is **visibility-toggled, never unmounted**, so close transitions animate;
  Menu/X icons cross-fade with rotate+scale and are never swapped by unmounting.
- Every animated element starts `opacity-0` and is revealed only by CSS keyframes with
  `forwards` fill — no JS animation state in the hero.
- Full spacing table in [`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md) §5 (the source of truth for
  every padding/margin value).

**Two documented robustness additions** (invisible in the pixel output):
1. The hero video has an `onError` fallback plate — the same deep-blue/red nebula mood painted
   in CSS — so a dead CDN never blanks the hero (repo media standard).
2. `prefers-reduced-motion: reduce` pauses the ambient video and resolves all entrance
   animations instantly (the markup/classes stay as specified).

---

## 🚀 Quickstart

```bash
npm install && npm run dev   # live server on :5173
npm run build                # typecheck + vite build → dist/ (GitHub Pages ready)
npm run lint                 # oxlint
npm run typecheck            # tsc --noEmit -p tsconfig.app.json
```

Deploy `dist/` anywhere — `base: './'` keeps every asset path relative, so the build works from
any `/<repo>/` prefix.

## 📁 Docs & structure

- `ADAPTED_PROMPT.md` — the full build spec: the hero, value-for-value, plus the expansion.
- `BUILD_LOG.md` — architecture, animation timeline, tooling deviations, provenance notes.
- `src/components/Hero.tsx` — `BAR_HEIGHTS` · `Animate` · `RevenueCard` · `Hero` · `Nav`.
- `src/components/` — `Reveal`, `Logos`, `Metrics`, `Features`, `Console`, `Quote`,
  `CallToAction`, `SiteFooter`.
- `src/index.css` — the spec's global CSS + keyframes verbatim, then a marked additions block.

**Media note:** the hero clip is hot-linked from a third-party CDN and the Suisse Intl webfont
loads from `db.onlinewebfonts.com` — both are **undocumented third-party assets**; read
[`../ASSETS.md`](../ASSETS.md) before publishing this as your own site. A failed clip falls
back to the CSS nebula plate; the font falls back to the system sans stack.

**Band media (replaceable):** the sections below the hero carry ambient loops from
`public/videos/` (`field`, `terrain`, `ascent` — 15 s H.264 loops, posters in `public/posters/`).
These were generated procedurally for the template (`tools/generate-bands.py`, see
`BUILD_LOG.md` §8), so nothing is license-encumbered. Each has a CSS-gradient fallback and a
reduced-motion still; swap in stock loops of matching mood without touching markup. Interactive
layers (marquee, pointer-tilt/glow cards, cursor spotlight, console sliders) are plain CSS +
small hooks in `src/lib/pointer.ts` / `src/lib/AmbientVideo.tsx`; all opt out under
`prefers-reduced-motion` and for non-fine pointers.
