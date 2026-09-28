# Media assets — provenance, licences and hosting

The **code and prompts** in this repository are MIT-licensed (see [`LICENSE`](./LICENSE)).
The **media** the templates display is not: every template loads third-party images and
video, and most of it is *hot-linked* from servers this repository does not control.

This file records, per template, where each asset comes from, under what terms, whether it is
committed here, and what the code does when the asset is unavailable. It is accurate for the
code currently on `main` — where a fallback is missing, that is stated as a gap rather than
assumed (the outstanding work is tracked in [`REVIEW_CHECKLIST.md`](./REVIEW_CHECKLIST.md)).

> **Before shipping a template as your own site, replace every asset marked
> "third-party / not in repo".** They may disappear or change without notice, and you must hold
> the rights to whatever you publish.

## Summary

| Template | Committed in repo | Hot-linked (third-party) | Behaviour when a hot-link fails |
|---|---|---|---|
| Securify | `poster-hero.jpg` (150 KB) | 1 CloudFront `hf_` clip (hero) + 10 Pexels clips + 10 Pexels posters | Browser keeps showing the chapter's `poster` (no explicit `onError` handler) |
| Aethera | 8 MP4 loops (~24.5 MB) + 8 posters | 1 CloudFront `hf_` clip (used only as the source reference for `01-silence.mp4`) | Poster is shown under `prefers-reduced-motion`; a failed clip leaves the fade wrapper at `opacity: 0` (**gap**) |
| Measured | 5 JPGs in `public/img/` | 1 CloudFront `hf_` clip + 1 `images.higgs.ai` still (hero) | `onError` → local `hero-base.jpg` / static reveal art (implemented) |
| Ethan Vale | nothing (single HTML file) | 21 stills (`_min.webp` + `.png`), 1 film, 1 avatar — all CloudFront `hf_` | Film failure is handled; a failed still renders an empty plate (**gap**) |
| SynapseX | nothing | 5 CloudFront `hf_` clips | No handler — the video area stays empty (**gap**) |
| Portfolio | nothing | 1 Mux HLS stream + 11 Unsplash photos (18 URLs with size variants) | `poster` frame stays behind the HLS element if the stream fails |

`hf_…` files on `d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/` are
AI-generated reference clips/stills (the `hf_YYYYMMDD_HHMMSS_<uuid>` naming is the
generator's). They were used as design references when the templates were built; their
ownership and licence are **undocumented**, so treat them as placeholders only.

---

## 1. Securify — `videoembeddeddesign/securify`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero clip (chapter 0, `REF_VIDEO` in `src/App.tsx`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260418_063509_….mp4` | Undocumented (AI-generated reference) | No |
| Hero poster `public/poster-hero.jpg` | Frame extracted from the hero clip | Same as above | Yes |
| Chapters 1–10 video + poster | Pexels (`videos.pexels.com`, `images.pexels.com`) — IDs and pages listed in `securify/BUILD_LOG.md` §4 and `videoembeddeddesign/video_picks.md` | [Pexels License](https://www.pexels.com/license/) (free for commercial use, no attribution required) | No — streamed from Pexels' CDN |

Notes

- The chapter-11 finale is a 1440p/30 fps upstream file (URL contains `2560_1440`), far heavier
  than the rest of the set. `BUILD_LOG.md` §5 carries the ffmpeg recipe to trim/re-encode it to
  1080p and self-host; that work is still outstanding.
- Fallback today: each `<video>` has a `poster`, so a failed CDN request shows a still frame.
  There is no explicit `onError` path (tracked in `REVIEW_CHECKLIST.md`).

## 2. Aethera — `aetherascrollstory`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero reference clip (`HERO.sourceUrl` in `src/data/chapters.ts`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260328_083109_….mp4` | Undocumented (AI-generated reference) | No |
| `public/videos/01-silence.mp4` … `08-begin.mp4` | Pexels clips re-encoded to 1080p/24 fps H.264 (source IDs + pages in `VIDEO_PICKS.md`); `01-silence.mp4` is a local copy of the hero clip | Pexels License (clip 01: undocumented, see above) | Yes (~24.5 MB total) |
| `public/posters/*.jpg` | Frames extracted from the clips above | Same as the clip | Yes |

Notes

- The eight MP4s are committed as plain Git blobs. This is deliberate: a one-off ~25 MB clone
  cost buys zero operational overhead and works with the Pages workflow unchanged. If the
  catalogue grows, the options are Git LFS (history rewrite + CI `lfs: true`) or external
  hosting with the `video` paths in `chapters.ts` pointed at a CDN.
- Fallback today: `prefers-reduced-motion` shows posters and never autoplays. A clip that fails
  to load leaves the rAF fade wrapper at `opacity: 0`, so the chapter can appear blank
  (tracked in `REVIEW_CHECKLIST.md`).

## 3. Measured — `measured`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero still (`base` in `src/data/surfaces.ts`) | `https://images.higgs.ai/?…url=d8j0ntlcm91z4.cloudfront.net/…hf_20260713_140344_….png` (image proxy in front of the CloudFront still) | Undocumented (AI-generated reference) | No |
| Hero loop (`video` in `surfaces.ts`) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260713_162101_….mp4` | Undocumented | No |
| `public/img/{hero-base,science,stories,hardware,reserve}.jpg` | Generated for this template (1408×768, dark low-key, emerald accents) | Generated for this repo — reuse freely with the code | Yes |

Notes

- This is the template with real fallbacks: `SurfaceSection` swaps the hero still for
  `baseFallback: 'img/hero-base.jpg'` on `onError`, and `RevealVideo` falls back to its static
  art.

## 4. Ethan Vale — `ethan-vale-archive`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| 21 stills — `<id>_min.webp` (thumb) + `<id>.png` (full) | `CDN` constant in `index.html` = `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/` (ids in the `SHOTS` array) | Undocumented (AI-generated reference set) | No |
| Intro film `FILM_URL` | Same CDN, `hf_20260922_195107_….mp4` | Undocumented | No |
| Avatar `AVATAR_ID` | Same CDN, `hf_20260922_194417_…_min.webp` | Undocumented | No |
| Fonts | Google Fonts (`fonts.googleapis.com`) | SIL OFL | No |

Notes

- Every URL derives from the single `CDN` constant at the top of the inline script, so
  re-hosting is a one-line change. To mirror the set locally:

  ```bash
  mkdir -p ethan-vale-archive/images && cd ethan-vale-archive/images
  # ids live in the SHOTS array of index.html
  for id in $(grep -oE "id:'[^']+'" ../index.html | cut -d"'" -f2); do
    curl -fSLO "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${id}_min.webp"
    curl -fSLO "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${id}.png"
  done
  # then set: const CDN = './images/';
  ```

- Fallback today: film errors are handled; a still that fails to load renders an empty plate
  (tracked in `REVIEW_CHECKLIST.md`).
- `scripts/check-assets.mjs` HEAD-checks every remote URL this repo depends on.

## 5. SynapseX — `synapsex`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero, cinematic-text, metrics, technology and footer clips (`*_VIDEO` constants in `src/components/*.tsx`, 5 files) | `https://d8j0ntlcm91z4.cloudfront.net/…/hf_20260622_*.mp4` | Undocumented (AI-generated reference) | No |
| Fonts (Anton SC, Space Mono) | Google Fonts | SIL OFL | No |

Notes

- Fallback today: none — a failed clip leaves an empty area behind the content (tracked in
  `REVIEW_CHECKLIST.md`).

## 6. Editorial Portfolio — `portfolio`

| Asset | Source | Licence | In repo? |
|---|---|---|---|
| Hero / footer stream (`VIDEO_SRC` in `Hero.tsx` and `Footer.tsx`) | `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8` — a public Mux playback ID | **Ownership undocumented** — replace with your own stream before publishing | No |
| 11 photos across `Works.tsx`, `Explorations.tsx`, `Hero.tsx`, `Footer.tsx` (18 URLs incl. `w=800`/`w=1600` variants) | `images.unsplash.com/photo-…` | [Unsplash License](https://unsplash.com/license) (free to use; hot-linking through Unsplash's CDN is permitted, attribution appreciated) | No |
| Fonts (Inter, Instrument Serif) | Google Fonts | SIL OFL | No |

Notes

- The Mux stream is attached lazily through `useHlsVideo` (hls.js with a native-HLS fallback
  for Safari); the `poster` frame stays visible if the stream fails. `prefers-reduced-motion`
  is **not** consulted on this template yet (tracked in `REVIEW_CHECKLIST.md`).
- Social links in the footer point at the networks' home pages — placeholders to be replaced.

---

## Hosting policy for this repository

- **Small, owned or generated assets** (posters, favicons, generated stills ≤ ~250 KB) are
  committed under each template's `public/`.
- **Large video** is either streamed from the original CDN (Pexels, Mux) or committed only when
  already web-optimised (Aethera, ~24.5 MB total). Keep the original download links and the
  ffmpeg recipe in the template's docs instead of adding raw sources.
- **Reference (`hf_`) media is a placeholder.** Nothing in the deploy pipeline depends on it
  being present, but a published site should not rely on it.
- Run `node scripts/check-assets.mjs` before a release to see which hot-links are still live;
  add `--strict` in CI if you want a dead link to fail the build.
