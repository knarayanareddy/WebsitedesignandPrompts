# Aethera® — Cinematic Hero + Scroll-Story Landing

![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-121013?logo=github)
![Footage](https://img.shields.io/badge/footage-Pexels%20license-05A88C)

A fullscreen single-page scroll story in **React + Vite + Tailwind CSS + TypeScript**.
Eight looping background videos narrate one coherent story — *beyond silence, we build the
eternal* — in the original prompt's white / `#000` / `#6F6F6F` system: Instrument Serif display
type with italic muted accents, Inter body, glassmorphic nav, and a seamless manual fade-loop
on every video (0.5s fade-in, 0.5s fade-out, 100ms reset). GitHub Pages ready (`base: './'`,
fully relative asset paths).

## The story — 8 chapters, 8 videos

| # | Chapter | Anchor | Video | Line |
|---|---------|--------|-------|------|
| 0 | silence (hero) | `#silence` | `01-silence` | Beyond *silence,* we build *the eternal.* |
| 1 | the still | `#still` | `02-still` | Where the *noise* ends, we *begin.* |
| 2 | the flow | `#flow` | `03-flow` | Pure *flows,* *unhurried.* |
| 3 | the bloom | `#bloom` | `04-bloom` | For brilliant *minds,* thoughtful *souls.* |
| 4 | the light | `#light` | `05-light` | We build in the warm *hours.* |
| 5 | the ascent | `#ascent` | `06-ascent` | Fearless *makers* climb *further.* |
| 6 | the eternal (night) | `#eternal` | `07-eternal` | What is built in *silence,* *endures.* |
| 7 | begin | `#begin` | `08-begin` | Your *haven* is *waiting.* |

Visual arc: luminous white-sky valley → mist → emerald stream → daisy meadow → golden light →
clouded ridgelines → **one dark night chapter** → white cosmos dissolving back into white.

## Quickstart

```bash
npm install && npm run dev   # live server on :5173
npm run build                # tsc --noEmit + vite build → dist/ (GitHub Pages ready)
```

Deploy `dist/` to GitHub Pages — `base: './'` and relative `./videos/…` / `./posters/…` paths
mean it works from any `/<repo>/` prefix with no extra config.

## Docs & structure

- `ADAPTED_PROMPT.md` — chapter-by-chapter build spec (adapted from the original hero prompt).
- `VIDEO_PICKS.md` — frame-verified sources, direct URLs, rejected alternates, optimize line.
- `BUILD_LOG.md` — narrative/tonal logic, VideoLoop mechanics, encoding specs, license notes.
- `src/components/VideoLoop.tsx` — rAF-driven fade loop + visibility-gated playback.
- `src/data/chapters.ts` — the whole story as data (copy, accents, tone, video/poster paths).
- `public/videos/` (~24.5 MB total, H.264 1080p CRF 26–27, no audio) + `public/posters/`.

Footage: Pexels-licensed (free commercial use) except the hero reference clip — see
`VIDEO_PICKS.md`. Fonts bundled via `@fontsource` (SIL OFL).
