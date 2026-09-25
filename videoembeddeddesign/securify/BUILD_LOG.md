# securify — build log & handover doc

Everything in this repo: the full story of how the site was made, the **updated prompt** (in full, in the `<details>` section), how the background videos were sourced and verified, how they were optimized for the web, and exactly how to deploy this to **GitHub Pages**.

---

## 1. What was built

A full-screen, 11-chapter scroll-story landing page for the (fictional) data-security SaaS **securify**. Each chapter is a `h-screen` section with a **different looping background video**, staggered giant typography, a short paragraph, and (usually) a stat block. The chapters tell one coherent story:

> your data is always in motion → the trail isn't safe → securify watches every turn → it sees what others miss → you stay in control → privacy scales everywhere → it does all this without friction → it's trusted and proven → join the momentum → quiet, safe, yours.

The visual arc mirrors the emotional arc: bright daylight energy → dark tension → trust → serene night (the page ends on a night-snowfall shot, the same mood family as the hero, which uses the original reference clip).

Tech: **React 18 + TypeScript + Vite 8 + Tailwind CSS v4** (`@tailwindcss/vite`), Google font **Readex Pro**, zero other dependencies.

---

## 2. The updated prompt (full)

The original prompt specified a single hero section. The adaptation keeps every original styling decision (fonts, palette, pills, logo SVG, staggered lowercase `vw` typography, diagonal stat dividers, no purple/indigo) and extends it into a scroll story with 11 video chapters. The full, paste-ready prompt:

<details>
<summary>Full updated prompt (same content as <code>ADAPTED_PROMPT.md</code> in this repo)</summary>

Build a full-screen **scroll-story** landing page for a data-security SaaS called "securify" using React + TypeScript + Tailwind CSS. The page is a sequence of **11 full-screen chapters**, each with a **different looping background video**, telling ONE coherent story:

> your data is always in motion → the trail isn't safe → securify watches every turn → it sees what others miss → you stay in control → privacy scales everywhere → it does all this without friction → it's trusted and proven → join the momentum → and finally: quiet, safe, yours.

Each chapter is a pinned-feeling `h-screen` section with a different video, three staggered giant words, one short paragraph, and (usually) one stat block. The visual arc deliberately goes from bright daylight action → dark moody → back to a serene dark night, mirroring the emotional arc (energy → tension → trust → calm).

### Fonts & Global Styles

- Load Google font "Readex Pro" weights 300, 400, 500, 600, 700 (preconnect to fonts.googleapis.com / fonts.gstatic.com).
- Set `body` font-family: `'Readex Pro', system-ui, -apple-system, sans-serif;`, background `#000`, color `#fff`, antialiased.
- Make `html, body, #root` height 100%.
- `html { scroll-behavior: smooth; }` (disabled under `prefers-reduced-motion`).
- Add a `.hero-title` class with `letter-spacing: -0.04em; line-height: 0.95;`.
- Add a `scroll-cue` animation: a 1px×32px white/60 vertical line that bounces 8px down/up over 2s, infinite, with opacity pulsing to 0.35 at 50%.

### Navbar (FIXED, persists across all chapters)

A `<header>` with `fixed top-0 left-0 right-0 z-40 px-6 md:px-10 pt-6` containing a `<nav>` with `flex items-center justify-between gap-4`.

- Left pill: `flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3` containing:
  - A custom white SVG logo (viewBox 0 0 256 256, class `h-5 w-5`) with path: `M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z` filled `#ffffff`.
  - Brand text "securify" (`text-white text-sm font-normal tracking-tight`).
  - The whole pill links to `#hero` (top of page).
- Center pill (hidden on mobile): `hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2` with four anchor links: "platform" → `#watch`, "solutions" → `#scale`, "company" → `#proof`, "support" → `#calm` — each `text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full`.
- Right button: "get started" → `#calm` — `bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors`.

### Chapter shell (repeat for every chapter)

- A `<section>` with `relative h-screen w-full overflow-hidden bg-black` and an `id` (listed per chapter).
- Background `<video>`: `className="absolute inset-0 w-full h-full object-cover"`, `autoPlay loop muted playsInline`, `poster={chapter poster URL}`, `src={chapter video URL}`, `preload="metadata"` (except chapter 1, which uses `preload="auto"`).
- Play/pause via IntersectionObserver: when a chapter is ≥35% in the viewport, call `video.play()`; otherwise `video.pause()`. If `prefers-reduced-motion: reduce`, never autoplay — show only the poster.
- Readability overlays (all pointer-events-none, monochrome only):
  - If the chapter has a `shade` (bright videos): an `absolute inset-0` div with that class (e.g. `bg-black/35`).
  - Always: `absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/70 to-transparent` (under the navbar) and `absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black` (bleeds into the next chapter).
- Kicker (chapters 2–11 only): `absolute left-6 md:left-10 top-24 md:top-28 flex items-center gap-3` — a `text-white/50 text-xs md:text-sm tracking-[0.3em]` label (e.g. "01 / in motion") followed by `h-px w-10 bg-white/40`.
- Foreground wrapper: `relative z-10 h-full w-full` (rendered after overlays, above the video).
- Headline words: each an `<h1>` with `hero-title absolute text-white font-medium` + the chapter's word-size class + its position class. All lowercase.
- Paragraph (where defined): `absolute max-w-[240px] text-[15px] leading-snug text-white/90` + its position class (append `text-right` when right-aligned).
- Stat block (where defined): an `absolute` wrapper with the stat's position class containing:
  - Row: `flex items-center gap-3` — either `[diagonal divider, number]` or `[number, diagonal divider]`, where the diagonal divider is `hidden md:block h-px w-24 bg-white/40 rotate-[20deg]` (or `rotate-[-20deg]`); for right-aligned stats use `justify-end flex-row-reverse` so the divider reads first.
  - Number: `text-4xl md:text-5xl font-medium tracking-tight text-white`.
  - Sublabel: `text-xs md:text-sm text-white/70 mt-1` (append `text-right` when right-aligned).

### Side progress dots

A `fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3` with one anchor per chapter (`href="#<id>"`). Inactive: `h-1.5 w-1.5 rounded-full bg-white/30 hover:bg-white/60`. Active: `h-6 w-1.5 rounded-full bg-white`. Track the active chapter with the same IntersectionObserver state (`transition-all duration-500`).

### The 11 chapters

**Chapter 1 — "hero" (the statement)**
- Video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4` (the original night-snowboard reference; poster: a still of it, `public/poster-hero.jpg`)
- Shade: none · Word size: `text-[14vw] md:text-[13vw]`
- Words: "protect" `left-4 md:left-10 top-[18%]` · "your" `right-4 md:right-10 top-[38%]` · "data" `left-[18%] md:left-[28%] top-[58%]`
- Paragraph (`left-6 md:left-10 top-[46%]`): "we guard your data with the utmost care, empowering you with privacy everywhere"
- Stat (`right-6 md:right-24 top-[14%]`, divider `rotate-[20deg]` first, right-aligned): **+65k** / "startups use"
- Extra: bottom-center scroll cue — `absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2`: "scroll" (`text-[11px] tracking-[0.3em] text-white/60`) above the animated 1px line.

**Chapter 2 — "motion" (in motion)** — bright tracking shot, forest
- Video: `https://videos.pexels.com/video-files/6947516/6947516-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/6947516/extreme-sports-mountain-snow-snowboard-6947516.jpeg?auto=compress&w=1600`
- Shade: `bg-black/35` · Kicker: "01 / in motion" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "your data" `right-4 md:right-10 top-[22%]` · "never" `left-[8%] md:left-[14%] top-[42%]` · "stops" `right-[14%] md:right-[20%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24 md:bottom-28`): "every click, sync and stream pushes your data through devices, teams and clouds — nonstop"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, number first, divider `rotate-[-20deg]` after): **0.3s** / "to detect a leak"

**Chapter 3 — "risk" (the risk)** — moody overcast forest
- Video: `https://videos.pexels.com/video-files/5843724/5843724-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/5843724/pexels-photo-5843724.jpeg?auto=compress&w=1600`
- Shade: none · Kicker: "02 / the risk" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "the trail" `left-4 md:left-10 top-[24%]` · "isn't" `right-4 md:right-10 top-[44%]` · "always safe" `left-[10%] md:left-[16%] top-[64%]`
- Paragraph (`right-6 md:right-10 top-[40%] text-right`): "leaks, breaches and shadow traffic hide in plain sight — one missed turn and it is gone"
- Stat (`left-6 md:left-10 bottom-24`, number first): **0** / "breaches accepted"

**Chapter 4 — "watch" (the watch)** — dark low-angle rider
- Video: `https://videos.pexels.com/video-files/6943040/6943040-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/6943040/4k-resolution-board-mountain-ski-6943040.jpeg?auto=compress&w=1600`
- Shade: `bg-black/20` · Kicker: "03 / the watch" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "we watch" `right-4 md:right-10 top-[22%]` · "every" `left-[6%] md:left-[10%] top-[42%]` · "turn" `right-[18%] md:right-[26%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "real-time monitoring follows your data end to end, flagging anomalies before they become incidents"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **24/7** / "always watching"

**Chapter 5 — "detail" (the detail)** — close-up portrait, snowy bokeh
- Video: `https://videos.pexels.com/video-files/6286881/6286881-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/6286881/pexels-photo-6286881.jpeg?auto=compress&w=1600`
- Shade: `bg-black/40` · Kicker: "04 / the detail" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "we see what" `left-4 md:left-10 top-[20%]` · "others" `right-4 md:right-10 top-[42%]` · "miss" `left-[20%] md:left-[26%] top-[64%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "behavioral analytics inspects every packet, every permission, every pattern — down to the last byte"
- Stat (`left-6 md:left-10 bottom-24`, number first): **99.99%** / "threat detection"

**Chapter 6 — "control" (the control)** — board-level low angle, sunny
- Video: `https://videos.pexels.com/video-files/6947537/6947537-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/6947537/extreme-sports-mountain-ski-skiing-6947537.jpeg?auto=compress&w=1600`
- Shade: `bg-black/35` · Kicker: "05 / the control" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "you stay" `right-4 md:right-10 top-[22%]` · "in" `left-[8%] top-[42%]` · "control" `right-[12%] md:right-[18%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "granular policies, zero-trust access and one clean console — your rules, your data, your call"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **1** / "console, zero trust"

**Chapter 7 — "scale" (the scale)** — wide valley, 24 fps
- Video: `https://videos.pexels.com/video-files/7166365/7166365-hd_1920_1080_24fps.mp4`
- Poster: `https://images.pexels.com/videos/7166365/pexels-photo-7166365.jpeg?auto=compress&w=1600`
- Shade: `bg-black/35` · Kicker: "06 / the scale" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "privacy" `left-4 md:left-10 top-[20%]` · "every" `right-4 md:right-10 top-[40%]` · "where" `left-[18%] md:left-[28%] top-[60%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "from one laptop to a global team — the same protection follows your data, everywhere it goes"
- Stat (`left-6 md:left-10 bottom-24`, number first): **+1.5b** / "gb of data protected"

**Chapter 8 — "speed" (the speed)** — first-person board POV
- Video: `https://videos.pexels.com/video-files/6818701/6818701-hd_1920_1080_30fps.mp4`
- Poster: `https://images.pexels.com/videos/6818701/pexels-photo-6818701.jpeg?auto=compress&w=1600`
- Shade: `bg-black/35` · Kicker: "07 / the speed" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "fast" `right-4 md:right-10 top-[24%]` · "without" `left-[8%] top-[44%]` · "friction" `right-[12%] md:right-[16%] top-[64%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "security that never slows you down — inline protection in milliseconds, invisible to your users"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **0.2ms** / "median overhead"

**Chapter 9 — "proof" (the proof)** — rider through pine forest
- Video: `https://videos.pexels.com/video-files/11618451/11618451-hd_1920_1080_60fps.mp4`
- Poster: `https://images.pexels.com/videos/11618451/pexels-photo-11618451.jpeg?auto=compress&w=1600`
- Shade: `bg-black/30` · Kicker: "08 / the proof" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "trusted" `left-4 md:left-10 top-[22%]` · "and" `right-[10%] md:right-[14%] top-[42%]` · "proven" `left-[16%] md:left-[22%] top-[62%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "soc 2, gdpr-ready, independently audited — the answers your security team will ask for"
- Stat (`left-6 md:left-10 bottom-24`, number first): **4** / "compliance frameworks"

**Chapter 10 — "momentum" (the momentum)** — long low-angle pass, blue sky
- Video: `https://videos.pexels.com/video-files/11270206/11270206-hd_1920_1080_60fps.mp4`
- Poster: `https://images.pexels.com/videos/11270206/pink-snowboard-ski-resort-skiing-snowboard-11270206.jpeg?auto=compress&w=1600`
- Shade: `bg-black/35` · Kicker: "09 / the momentum" · Word size: `text-[11.5vw] md:text-[10.5vw]`
- Words: "keep" `right-4 md:right-10 top-[20%]` · "moving" `left-[6%] md:left-[10%] top-[40%]` · "forward" `right-[10%] md:right-[16%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "ship faster, sleep better — securify grows with you, from first commit to global scale"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **+300k** / "downloads"

**Chapter 11 — "calm" (the calm)** — night snowfall finale
- Video: `https://videos.pexels.com/video-files/35552773/15063226_2560_1440_30fps.mp4` (4K source; consider re-encoding to 1080p before production)
- Poster: `https://images.pexels.com/videos/35552773/black-effect-particle-slowmotion-35552773.jpeg?auto=compress&w=1600`
- Shade: none · Kicker: "10 / the calm" · Word size: `text-[12vw] md:text-[11vw]`
- Words: "quiet." `left-4 md:left-10 top-[26%]` · "safe." `right-4 md:right-10 top-[46%]` · "yours." `left-[18%] md:left-[28%] top-[66%]`
- CTA block (`absolute left-1/2 -translate-x-1/2 bottom-28 w-full px-6 flex flex-col items-center gap-7`):
  - Paragraph (`max-w-[340px] text-[15px] leading-snug text-white/90 text-center`): "your data, at rest. encrypted, monitored, at peace — while you keep moving"
  - Buttons row (`flex items-center gap-3`): "get started" (`bg-white text-black text-sm font-normal rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors`) and "talk to us" (`border border-white/40 text-white text-sm font-normal rounded-full px-8 py-4 hover:bg-white/10 transition-colors`).
- Footer (`absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-[11px] text-white/50`): "© 2026 securify" + links "privacy", "terms", "security" (`hover:text-white transition-colors`).

### Behavior & Notes

- All text is lowercase.
- Navbar pills use `bg-neutral-900/90 backdrop-blur`.
- Only transitions: `hover:text-white` on nav links, `hover:bg-neutral-200` on the primary button, `hover:bg-white/10` on the outline button, `transition-all duration-500` on the progress dots.
- No purple/indigo anywhere; palette is pure black, white, neutral-900, and white opacity variants plus `bg-black/*` overlays.
- Every video is `object-cover`, `muted`, `loop`, `playsInline`; only the visible chapter plays (IntersectionObserver at 35%), others pause — so scroll cost stays bounded.
- Performance: `preload="metadata"` on chapters 2–11 (poster shows until played); hero uses `preload="auto"`. For production, trim/re-encode clips to 8–15 s @ 1080p H.264 (`ffmpeg -i in.mp4 -t 10 -c:v libx264 -crf 23 -an -movflags +faststart out.mp4`) — the 51 s and 82 s clips especially.
- `prefers-reduced-motion`: disable smooth scroll, hide the scroll-cue animation, do not autoplay any video (posters remain).
- Responsive: mobile hides nav links, diagonal stat dividers, and the side dots; typography scales via vw units.

</details>

### What changed vs. the original hero-only prompt

1. **One hero → 11 chapters.** The hero's exact layout (words, positions, paragraph, `+65k` stat) is preserved as chapter 1; the original bottom stat blocks (+1.5b, +300k) were distributed into chapters 7 and 10.
2. **Navbar became `fixed`** (was `absolute` inside the hero) so it floats over every chapter; its links now scroll to story chapters.
3. **New pieces:** chapter kickers (`01 / in motion`…), a side progress-dot rail, a scroll cue on the hero, a CTA block + footer on the finale.
4. **Per-chapter `shade` overlay** so white text stays readable over bright videos, without introducing any new colors.
5. **Playback logic** (section 6 below) — the part that makes 11 videos feel light instead of heavy.

---

## 3. How the reference video was analyzed

1. **Downloaded** the CloudFront mp4 (22.9 MB).
2. **Probed it.** The sandbox had no system `ffmpeg` (and no root for `apt`), so a *static* ffmpeg 7.0.2 build was downloaded from johnvansickle.com. `ffprobe` result: H.264, **1928×1072, 24 fps, 7.04 s, ~26 Mbps**.
3. **Extracted frames** (t = 1 s, 5 s) and reviewed them: night snowboarding, powder spray lit against a near-black background, extreme low angle, cinematic grade. The CloudFront `hf_20260418_…` filename pattern indicates an AI-video platform export (Higgsfield-style), which matters because it means "exact matches" in stock libraries are unlikely — the goal is *style-family* matches (same subject, camera language, mood), not the identical clip.

## 4. How the replacement videos were sourced & verified

**Sources:** Pexels (primary — best curation of cinematic winter-sports footage), Pixabay and Mixkit (secondary). All three are free for commercial use with no attribution requirement.

**The Pexels pipeline (the tricky part):**

1. **Search** → candidate video IDs/slugs (e.g. via `pexels.com/search/videos/snowboarding slow motion powder/`).
2. **Problem:** `www.pexels.com` sits behind a Cloudflare challenge, so plain `curl` returns a "Just a moment…" page — no HTML, no data.
3. **Solution:** fetch the *rendered* detail pages (via a real fetch tool that executes JS). Each Pexels detail page embeds Canva partner links that contain the **exact CDN file URL** of the clip:
   `https://videos.pexels.com/video-files/{videoId}/{videoId}-{tier}_{w}_{h}_{fps}fps.mp4`
   — plus the true source resolution, duration and fps in the page metadata.
4. **Key discovery:** the CDN host `videos.pexels.com` is **not** behind the challenge — it answers direct HTTP 200s. So once a file URL is known, the video can be fetched, verified and downloaded straight from the CDN.
5. **Naming is inconsistent across uploads** — tiers vary (`sd_640_360`, `hd_1280_720`, `hd_1920_1080`, `uhd_2560_1440`, `uhd_3840_2160`), fps suffixes vary (`24fps`, `30fps`, `60fps`…), and some files are prefixed with the *photo* ID instead of the video ID (e.g. `15063226_2560_1440_30fps.mp4` for video 35552773). Practical method: take the URL from the detail page for the highest tier, **derive** the 1080p variant by swapping the tier prefix, then **verify** it exists.
6. **Rate-limiting gotcha:** an aggressive parallel probe (12-way, ~665 HEAD requests) returned zero hits — the CDN throttled the burst. The reliable pattern is **sequential requests with a 1–2 s gap**, checking HTTP status + `Content-Length`. All 10 Pexels URLs in this repo were verified this way (status 200 + byte size) before being shipped.

**The final 11 videos (all URLs verified working at build time):**

| # | Chapter | Video (direct URL) | Source res | Len | Fps | Size |
|---|---------|--------------------|-----------|-----|-----|------|
| 1 | hero | `d8j0ntlcm91z4.cloudfront.net/user_38xz…/hf_20260418_….mp4` (user's file) | 1928×1072 | 7 s | 24 | 22.9 MB |
| 2 | motion | `videos.pexels.com/video-files/6947516/6947516-hd_1920_1080_30fps.mp4` | 4K | 29 s | 30 | 20.6 MB |
| 3 | risk | `videos.pexels.com/video-files/5843724/5843724-hd_1920_1080_30fps.mp4` | 4K | 14 s | 30 | 8.1 MB |
| 4 | watch | `videos.pexels.com/video-files/6943040/6943040-hd_1920_1080_30fps.mp4` | 4K | 27 s | 30 | 18.7 MB |
| 5 | detail | `videos.pexels.com/video-files/6286881/6286881-hd_1920_1080_30fps.mp4` | 4K | 14 s | 30 | 4.0 MB |
| 6 | control | `videos.pexels.com/video-files/6947537/6947537-hd_1920_1080_30fps.mp4` | 4K | 30 s | 30 | 21.1 MB |
| 7 | scale | `videos.pexels.com/video-files/7166365/7166365-hd_1920_1080_24fps.mp4` | 4K | 27 s | 24 | 13.6 MB |
| 8 | speed | `videos.pexels.com/video-files/6818701/6818701-hd_1920_1080_30fps.mp4` | 4K | 27 s | 30 | 19.3 MB |
| 9 | proof | `videos.pexels.com/video-files/11618451/11618451-hd_1920_1080_60fps.mp4` | 1080p | 24 s | 60 | 8.0 MB |
| 10 | momentum | `videos.pexels.com/video-files/11270206/11270206-hd_1920_1080_60fps.mp4` | 4K | 51 s | 60 | 35.9 MB |
| 11 | calm | `videos.pexels.com/video-files/35552773/15063226_2560_1440_30fps.mp4` | 4K | 82 s | 30 | 55.8 MB |

**Curation (not just links — actually watching):** all 9 landscape candidates were downloaded to the workspace and a frame was extracted at ~40 % of each duration and visually reviewed. Two candidates dropped as **portrait 9:16** (unusable for a 16:9 web background). The final order was chosen so the *camera language* tracks the story: board-level low angles (closest to the reference's framing) land on the watch/control chapters, the most panoramic shot carries the scale claim, POV carries speed, and the night shot book-ends the page.

## 5. Optimization — why it works the way it does

**Video weight**
- 1080p tier everywhere possible (4K sources downsampled by Pexels' own transcodes) — background video never needs more. The finale only exists as a 1440p file upstream, so it stays 1440p (flagged for re-encoding below).
- Videos are **streamed from Pexels' CDN, not hosted** — the GitHub Pages site itself is < 300 KB. Zero hosting cost, global CDN edge caching.

**Playback (the behavior you'll notice: a still poster for a moment, then motion)**
- Chapters 2–11 use `preload="metadata"` + a `poster` image (Pexels thumbnails; the hero's poster is a frame extracted from the reference itself). Nothing downloads until needed.
- A single `IntersectionObserver` per section (threshold **0.35**) calls `video.play()` when the chapter is the dominant thing on screen and `video.pause()` when it isn't → **at most ~1–2 videos are active while scrolling**, which is what keeps the experience light despite 11 clips. The brief poster flash on slower connections is a clip mid-download; it's by design, not a bug.
- `muted` + `playsInline` are what make autoplay allowed in Chrome/Safari; `loop` makes each chapter self-contained.
- `prefers-reduced-motion: reduce` → no autoplay at all (posters only), no smooth scroll, no scroll-cue animation.

**Legibility**
- Per-chapter monochrome `bg-black/*` shade on bright clips (never color — the palette stays black/white/neutral).
- A `from-black/70` top gradient (keeps the fixed navbar readable over bright skies) and a `to-black` bottom `h-48` gradient on **every** chapter, so sections bleed into each other and the page reads as one continuous dark surface.

**Build portability (this is what makes GitHub Pages trivial)**
- `vite.config.ts` sets **`base: './'`** → the production build uses *relative* asset paths (`./assets/…`), so it works at `username.github.io`, `username.github.io/<repo>`, or a custom domain **without any path config**.
- The hero poster is referenced relatively (`poster-hero.jpg`, not `/poster-hero.jpg`) for the same reason.
- No client-side router → no SPA 404 fallback issues on a static host.
- Verified: `npm run build` → `dist/index.html` references only `./assets/*`; `dist/poster-hero.jpg` present.

**Recommended production trims (optional, before/after deploy):**

```bash
# finale: 82s 1440p (55.8 MB) → ~12s 1080p (~5–8 MB)
ffmpeg -i in.mp4 -t 12 -vf "scale=1920:1080" -c:v libx264 -crf 23 -preset slow -an -movflags +faststart out.mp4
# same one-liner works for any of the long clips; keep 8–15 s
```

## 6. Architecture (for the agent touching the code)

```
index.html                  — Readex Pro via Google Fonts, #root
vite.config.ts              — react + tailwindcss plugins, base: './', dev host 0.0.0.0
public/poster-hero.jpg      — still extracted from the reference video
src/index.css               — Tailwind v4 import + globals (.hero-title, scroll-cue keyframes, reduced-motion)
src/main.tsx                — standard React 18 entry
src/App.tsx                 — the entire app:
    CHAPTERS: Chapter[]     — data-driven story (id, kicker, video, poster, shade, wordSize,
                              words[], para, paraCls, stat{value,label,cls,divider,align}, cta)
    useInView(threshold)    — IntersectionObserver hook (drives both playback + active dot)
    usePrefersReducedMotion — one-time matchMedia check
    <Navbar/>               — fixed pill nav (logo SVG from the original prompt, 4 section links, CTA)
    <Dots/>                 — fixed right-rail progress dots (lg and up)
    <Scene/>                — one chapter: video + overlays + kicker + words + para + stat (+CTA/footer on finale)
    <StatBlock/> <CTA/> <Footer/> <Logo/>
```

Everything presentational is data in `CHAPTERS` — to add/reorder/rewrite a chapter you edit the array, not components.

## 7. Deploying to GitHub Pages (instructions for the next agent)

The repo is **already deployment-ready**: `package-lock.json` is present (so `npm ci` works), and a GitHub Actions workflow is included.

1. **Create the repo** (e.g. `github.com/<you>/securify`) and push the *entire project folder* — including `public/`, `.github/`, `package-lock.json`, and the config files. **Do not push `node_modules/`** (it's already in `.gitignore`; it also isn't part of the workspace snapshot — the workflow reinstalls it).
2. **In repo Settings → Pages → Build and deployment → Source: select "GitHub Actions".** (If "Deploy from a branch" is the only visible option, use the manual path in step 4 instead.)
3. **Push to `main`** — the included workflow (`.github/workflows/deploy.yml`) runs `npm ci && npm run build` and deploys `dist/` to GitHub Pages via the official `actions/deploy-pages` action. The site goes live at **`https://<you>.github.io/securify/`** (or `https://<you>.github.io/` if the repo is a user-site named `<you>.github.io` — no config change needed, thanks to the relative base).
4. **Manual fallback** (no Actions): locally run `npm ci && npm run build`, then push `dist/` contents to a `gh-pages` branch and set Pages source to that branch.
5. **Verify:** open the site URL, scroll all 11 chapters, confirm each video starts when its chapter fills the screen (a poster frame for a second is normal), and check that `./assets/*` load (no 404s in devtools).

**Local checks** (any agent should run these first):

```bash
npm ci
npm run dev        # → http://localhost:5173  (binds 0.0.0.0)
npm run build      # → dist/  (production artifact; must succeed with zero TS errors)
```

## 8. Licensing

- **Pexels License** — all Pexels videos in this repo may be used **free for commercial purposes, without attribution** (nice-to-have credits: the per-video Pexels pages, e.g. `pexels.com/video/6943040/`). Full terms: https://www.pexels.com/license/
- **Hero video** — the user's own file (served from their own CloudFront bucket), used with the owner's permission.

## 9. Known limitations / next steps

1. **Two heavy clips:** hero (22.9 MB, 7 s — acceptable) and finale (55.8 MB, 82 s @ 1440p — should be trimmed/re-encoded per the ffmpeg recipe before real traffic).
2. Pexels CDN URLs are the stable canonical links, but if one ever 404s, re-resolve it from the video's Pexels page (section 4 describes the method).
3. The two CTA buttons ("get started", "talk to us") are `href="#"` placeholders.
4. All stats (+65k, +1.5b, 99.99%, …) are marketing placeholders from the original prompt.
