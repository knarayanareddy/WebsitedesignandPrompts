# Build log — Aethera® scroll-story landing

Recorded 2026-09-25. Everything below was verified on this machine (downloads, ffmpeg
frame inspection, transcodes, `tsc --noEmit && vite build`, dev-server smoke tests).

## 1. Narrative arc — white → night → white

The page opens in **white/light minimalism**: pure `#FFFFFF` background, `#000000` Instrument
Serif display type, `#6F6F6F` Inter body — the reference clip's near-white sky and soft green
valley sit inside that whiteness (hero video starts 300px down and is gradient-blended into the
page, top and bottom).

Chapters 01–05 stay in the light world while the palette slowly saturates: misty white-sky
valley (01 *the still*) → emerald moss stream (02 *the flow*) → white daisy meadow
(03 *the bloom*) → golden backlit coneflowers (04 *the light*) → deep-green ridgelines under
cloud (05 *the ascent*). Each chapter's section background is white and every video is blended
with `from-white via-transparent to-white` gradients, so the scroll reads as one continuous
luminous world.

**Chapter 06 (*the eternal*) is the single dark pivot**: section background flips to `#000000`,
overlays flip to `from-black … to-black`, and the type inverts to white (accents `white/60`)
over a milky-way timelapse. It is placed second-to-last so the night lands as the story's
proof-beat ("what is built in silence, endures"), not as an ending.

**Chapter 07 (*begin*) returns to white** both literally and thematically: the source clip is
white cosmos backlit against a blown-out sky, so its top gradient dissolves the night chapter
into pure white; the final CTA and footer sit on that whiteness, closing the loop back to the
hero's silence. The progress rail uses `mix-blend-difference` so it stays legible across all
three tonal states.

## 2. VideoLoop.tsx mechanics (seamless manual loop)

`src/components/VideoLoop.tsx` implements the original prompt's loop spec verbatim:

- `<video>` is `muted`, `playsInline`, **no native `loop`** — the loop is manual.
- A `requestAnimationFrame` callback continuously reads `currentTime` / `duration` and writes
  the wrapper's opacity (no React re-renders):
  - `t < 0.5s` → opacity `t / 0.5` (**fade in over 0.5s**, 0 → 1)
  - `t > duration − 0.5s` → opacity `(duration − t) / 0.5` (**fade out over 0.5s**, 1 → 0)
  - otherwise → 1.
- `ended` event → opacity 0 → `setTimeout(100ms)` → `currentTime = 0` → `play()` again.
  The 0.5s fades plus the 100ms black gap hide every loop seam and double as the chapter's
  "breathing" transition.
- An `IntersectionObserver` at **35% visibility** plays only the chapter on screen and pauses
  the rest, bounding scroll cost to one decoding video.
- Hero clip uses `preload="auto"`; chapters use `preload="metadata"` + poster frame.
- `prefers-reduced-motion: reduce` → never autoplay, poster shown at opacity 1, reveals forced
  visible, smooth scroll disabled.

## 3. Video encoding specs

All eight clips re-encoded with the static ffmpeg 7.0.2 build:
`-vf scale=1920:-2 -r 24 -an -c:v libx264 -crf 26|27 -preset veryfast -movflags +faststart`
(H.264 High, yuv420p, 24 fps, **no audio**, faststart for progressive playback).
03-flow was center-cropped 16:9 (`crop=iw:iw*9/16`) from its 2160×3840 source before scaling.

| file | seconds | CRF | bytes | MiB |
|------|--------:|----:|------:|----:|
| 01-silence.mp4 | 12.00 | 26 | 2,075,372 | 1.98 |
| 02-still.mp4   | 12.00 | 27 | 1,255,638 | 1.20 |
| 03-flow.mp4    |  9.00 | 27 | 5,036,087 | 4.80 |
| 04-bloom.mp4   |  9.00 | 27 | 8,626,815 | 8.23 |
| 05-light.mp4   | 10.00 | 27 | 2,361,066 | 2.25 |
| 06-ascent.mp4  | 12.00 | 27 |   945,840 | 0.90 |
| 07-eternal.mp4 |  6.46 | 26 | 1,228,709 | 1.17 |
| 08-begin.mp4   | 10.00 | 27 | 4,198,525 | 4.00 |
| **total** | **80.46** | 26–27 | **25,728,052** | **24.54** |

≈ **24.5 MB** of video + 8 poster JPEGs (1,006,282 B total, 1600px wide) — small enough for
GitHub Pages' soft 1 GB repo limit and fast enough for background playback.

## 4. License compliance

- Clips 02–08 are **Pexels** stock footage, used under the Pexels License
  (https://www.pexels.com/license/): free for commercial use, no attribution required, no
  redistribution of the raw files as-is (all are trimmed/re-encoded as part of a larger work).
  Source pages and direct file URLs are listed in `VIDEO_PICKS.md`.
- Clip 01 is the project's own reference asset (CloudFront URL in `VIDEO_PICKS.md`), used as
  the brand hero exactly as in the original prompt.
- Fonts (Instrument Serif, Inter) are bundled from `@fontsource` (SIL Open Font License).

## 5. GitHub Pages hardening (this pass)

- `vite.config.ts`: `base: './'` so built asset URLs resolve under any `/<repo>/` prefix.
- `src/data/chapters.ts`: all 16 runtime paths now relative (`./videos/…`, `./posters/…`).
- `index.html`: `./favicon.svg` icon link; `public/favicon.svg` added (horizon-and-light mark).
- Verified after the change: `tsc --noEmit && vite build` clean; `dist/index.html` references
  `./assets/…`; dev server still serves page (200), videos (206 range), posters (200).
