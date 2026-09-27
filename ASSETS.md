# Media assets — provenance, licences and hosting

The **code and prompts** in this repository are MIT-licensed (see [`LICENSE`](./LICENSE)).
The **media** the templates display is not: every template loads third-party images and
video, and most of it is *hot-linked* from servers this repository does not control.
This file records, per template, where each asset comes from, under what terms, whether
it is committed here, and what happens when it is unavailable.

> **Before shipping a template as your own site, replace every asset marked
> "third-party / not in repo". They may disappear or change without notice, and you must
> hold the rights to whatever you publish.**

## Summary

| Template | Committed in repo | Hot-linked (third-party) | Fallback when hot-link fails |
|---|---|---|---|
| Securify | `poster-hero.jpg` (154 KB) | 1 CloudFront `hf_` clip (hero), 10 Pexels clips + posters | Poster image per chapter (`onError`) |
| Aethera | 8 MP4 loops (~25 MB) + 8 posters | 1 CloudFront `hf_` clip (hero) | Poster (`onError` / reduced motion) |
| Measured | 5 JPGs in `public/img/` (1408×768) | 1 CloudFront `hf_` clip, 1 `images.higgs.ai` still (hero) | Local `hero-base.jpg`, CSS/SVG scene |
| Ethan Vale | nothing (single HTML file) | 21 stills (`_min.webp` + `.png`), 1 film, 1 avatar — all CloudFront `hf_` | Titled placeholder plate per still |
| SynapseX | nothing | 5 CloudFront `hf_` clips | Gradient plate (`onError`) |
| Portfolio | nothing | 1 Mux HLS stream, 17 Unsplash images | Unsplash poster frame |

`hf_…` files on `d8j0ntlcm91z4.cloudfront.net` are AI-generated reference clips/stills
(the `hf_YYYYMMDD_HHMMSS_<uuid>` naming is the generator's). They were used as design
references when the templates were built; their ownership and licence are **undocumented**,
so treat them as placeholders only.

---

## 1. Securify — `videoembeddeddesign/securify`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero clip (chapter 0, `HERO_VIDEO` in `src/App.tsx`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260418_063509_….mp4` | Undocumented (AI-generated reference) | No |
| Hero poster `public/poster-hero.jpg` | Frame extracted from the hero clip | Same as above | Yes |
| Chapters 1–11 video + poster | Pexels (`videos.pexels.com`, `images.pexels.com`) — IDs and pages listed in `securify/BUILD_LOG.md` §4 and `videoembeddeddesign/video_picks.md` | [Pexels License](https://www.pexels.com/license/) (free for commercial use, no attribution required) | No — streamed from Pexels' CDN |

Notes
- The chapter-11 finale is a 1440p, 82 s, **55.8 MB** upstream file. It should be trimmed to ~10–12 s at 1080p and self-hosted (ffmpeg recipe in `BUILD_LOG.md` §5). This could not be done from the review sandbox (no ffmpeg, no egress to Pexels) and is left as a follow-up.
- Fallback: each `<video>` has `onError` → the chapter's poster `<img>` is shown instead.

## 2. Aethera — `aetherascrollstory`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero clip (chapter 0) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260328_083109_….mp4` | Undocumented (AI-generated reference) | No |
| `public/videos/01-silence.mp4` … `08-begin.mp4` | Pexels clips re-encoded to 1080p/24 fps H.264 (source IDs + pages in `VIDEO_PICKS.md`); `01-silence.mp4` is a local copy of the hero clip | Pexels License (01: undocumented, see above) | Yes (~25 MB total) |
| `public/posters/*.jpg` | Frames extracted from the clips above | Same as the clip | Yes |

Notes
- The eight MP4s (~25 MB) are committed as plain Git blobs. This was reviewed and left as-is; the options, should the repo grow, are:
  1. **Keep plain blobs** (current). One-off clone cost of ~25 MB, zero operational overhead, works with the Pages workflow unchanged.
  2. **Git LFS** — `git lfs migrate import --include="aetherascrollstory/public/videos/*.mp4"` rewrites history (force-push, every clone must be re-created), and the deploy workflow's checkout would need `lfs: true` so real bytes, not pointers, land on `gh-pages`. LFS bandwidth (1 GB/month on the free tier) is then consumed by every CI run.
  3. **External hosting** — upload the clips to a bucket/CDN and change the `video` paths in `src/data/chapters.ts`; the repo shrinks to posters only.
  Keep total committed media well under GitHub's 1 GB soft repository limit when adding chapters.
- Fallback: `VideoLoop` shows the poster on `error`, on rejected `play()`, and under `prefers-reduced-motion`.

## 3. Measured — `measured`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero still (`base` in `src/data/surfaces.ts`) | `https://images.higgs.ai/?…url=d8j0ntlcm91z4.cloudfront.net/…hf_20260713_140344_….png` (image proxy in front of the CloudFront still) | Undocumented (AI-generated reference) | No |
| Hero loop (`video` in `surfaces.ts`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260713_162101_….mp4` | Undocumented | No |
| `public/img/hero-base.jpg`, `science.jpg`, `stories.jpg`, `hardware.jpg`, `reserve.jpg` | AI-generated for this template (1408×768, dark low-key, emerald accents) | Generated for this repo — reuse freely with the code | Yes |

Notes
- Fallback: hero still → `hero-base.jpg` (`onError`); hero video → animated CSS/SVG scene, and `RevealVideo` renders its static fallback under `prefers-reduced-motion`.

## 4. Ethan Vale — `ethan-vale-archive`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| 21 stills — `<id>_min.webp` (thumb) + `<id>.png` (full) | `ASSET_BASE` = `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/` (ids in the `SHOTS` array) | Undocumented (AI-generated reference set) | No |
| Intro film `FILM_URL` | Same CDN, `hf_20260922_195107_….mp4` | Undocumented | No |
| Avatar `AVATAR_ID` | Same CDN, `hf_20260922_194417_…_min.webp` | Undocumented | No |
| Fonts | Google Fonts (`fonts.googleapis.com`) | SIL OFL | No |

Notes
- Every URL derives from the single `ASSET_BASE` constant at the top of the inline script. To self-host, copy the files to `ethan-vale-archive/images/` and set `ASSET_BASE = './images/'`.
- Fallback: a still that fails to load shows a titled placeholder plate (`figure.missing`) in both the sphere and the grid; a failed still still counts toward splash progress, so the intro never hangs.

## 5. SynapseX — `synapsex`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero, cinematic-text, metrics, technology and footer clips (`*_VIDEO` constants in `src/components/*.tsx`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260622_*.mp4` (5 files) | Undocumented (AI-generated reference) | No |
| Fonts (Anton SC, Space Mono) | Google Fonts | SIL OFL | No |

Notes
- Fallback: `BackgroundVideo` replaces a failed `<video>` with a radial-gradient plate; clips only play while on screen and stay paused under `prefers-reduced-motion`.

## 6. Portfolio — `portfolio`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero / footer stream (`VIDEO_SRC` in `src/lib/media.ts`) | `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8` — a public Mux playback ID | **Ownership undocumented** — replace with your own stream before publishing | No |
| Poster (`POSTER_SRC`) and 16 further images in `Works.tsx` / `Explorations.tsx` | `images.unsplash.com/photo-…` | [Unsplash License](https://unsplash.com/license) (free to use; hot-linking through Unsplash's CDN is permitted, attribution appreciated) | No |
| Fonts (Inter, Instrument Serif) | Google Fonts | SIL OFL | No |

Notes
- The Mux stream is attached lazily (`useHlsVideo`) and the poster remains if the stream fails or reduced motion is set.
- Social links in the footer point at the networks' home pages — placeholders to be replaced.

---

## Hosting policy for this repository

- **Small, owned or generated assets** (posters, favicons, generated stills ≤ ~250 KB) are committed under each template's `public/`.
- **Large video** is either streamed from the original CDN (Pexels, Mux) or committed only when already web-optimised (Aethera, ~25 MB total). Do not add multi-hundred-MB sources; keep the original download links + ffmpeg recipe in the template's docs instead.
- **Reference (`hf_`) media** is a placeholder. Nothing in the deploy pipeline depends on it, and every template degrades gracefully when it is unavailable — but a published site should not rely on it.
- If a hot-linked asset breaks the *demo*, the fix is to swap the URL in the single constant / data file listed above; the fallbacks keep the layout intact in the meantime.
