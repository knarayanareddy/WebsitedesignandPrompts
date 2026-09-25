# Adapted prompt — securify scroll-story landing page (11 videos, one coherent story)

Build a full-screen **scroll-story** landing page for a data-security SaaS called "securify" using React + TypeScript + Tailwind CSS. The page is a sequence of **11 full-screen chapters**, each with a **different looping background video**, telling ONE coherent story:

> your data is always in motion → the trail isn't safe → securify watches every turn → it sees what others miss → you stay in control → privacy scales everywhere → it does all this without friction → it's trusted and proven → join the momentum → and finally: quiet, safe, yours.

Each chapter is a pinned-feeling `h-screen` section with a different video, three staggered giant words, one short paragraph, and (usually) one stat block. The visual arc deliberately goes from bright daylight action → dark moody → back to a serene dark night, mirroring the emotional arc (energy → tension → trust → calm).

---

## Fonts & Global Styles

- Load Google font "Readex Pro" weights 300, 400, 500, 600, 700 (preconnect to fonts.googleapis.com / fonts.gstatic.com).
- Set `body` font-family: `'Readex Pro', system-ui, -apple-system, sans-serif;`, background `#000`, color `#fff`, antialiased.
- Make `html, body, #root` height 100%.
- `html { scroll-behavior: smooth; }` (disabled under `prefers-reduced-motion`).
- Add a `.hero-title` class with `letter-spacing: -0.04em; line-height: 0.95;`.
- Add a `scroll-cue` animation: a 1px×32px white/60 vertical line that bounces 8px down/up over 2s, infinite, with opacity pulsing to 0.35 at 50%.

## Navbar (FIXED, persists across all chapters)

A `<header>` with `fixed top-0 left-0 right-0 z-40 px-6 md:px-10 pt-6` containing a `<nav>` with `flex items-center justify-between gap-4`.

- Left pill: `flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3` containing:
  - A custom white SVG logo (viewBox 0 0 256 256, class `h-5 w-5`) with path: `M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z` filled `#ffffff`.
  - Brand text "securify" (`text-white text-sm font-normal tracking-tight`).
  - The whole pill links to `#hero` (top of page).
- Center pill (hidden on mobile): `hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2` with four anchor links: "platform" → `#watch`, "solutions" → `#scale`, "company" → `#proof`, "support" → `#calm` — each `text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full`.
- Right button: "get started" → `#calm` — `bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors`.

## Chapter shell (repeat for every chapter)

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

## Side progress dots

A `fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3` with one anchor per chapter (`href="#<id>"`). Inactive: `h-1.5 w-1.5 rounded-full bg-white/30 hover:bg-white/60`. Active: `h-6 w-1.5 rounded-full bg-white`. Track the active chapter with the same IntersectionObserver state (`transition-all duration-500`).

---

## The 11 chapters

### Chapter 1 — "hero" (the statement)
- **Video:** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4` (your night-snowboard reference; poster: a still of it, e.g. `public/poster-hero.jpg`)
- **Shade:** none (already dark)
- **Word size:** `text-[14vw] md:text-[13vw]`
- Words: "protect" — `left-4 md:left-10 top-[18%]` · "your" — `right-4 md:right-10 top-[38%]` · "data" — `left-[18%] md:left-[28%] top-[58%]`
- Paragraph (`left-6 md:left-10 top-[46%]`): "we guard your data with the utmost care, empowering you with privacy everywhere"
- Stat (`right-6 md:right-24 top-[14%]`, divider `rotate-[20deg]` first, right-aligned): **+65k** / "startups use"
- Extra: bottom-center scroll cue — `absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2`: label "scroll" (`text-[11px] tracking-[0.3em] text-white/60`) above the animated 1px line.

### Chapter 2 — "motion" (in motion) — bright tracking shot, forest
- **Video:** `https://videos.pexels.com/video-files/6947516/6947516-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/6947516/extreme-sports-mountain-snow-snowboard-6947516.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/35` · **Kicker:** "01 / in motion" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "your data" — `right-4 md:right-10 top-[22%]` · "never" — `left-[8%] md:left-[14%] top-[42%]` · "stops" — `right-[14%] md:right-[20%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24 md:bottom-28`): "every click, sync and stream pushes your data through devices, teams and clouds — nonstop"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, number first, divider `rotate-[-20deg]` after, left-aligned): **0.3s** / "to detect a leak"

### Chapter 3 — "risk" (the risk) — moody overcast forest
- **Video:** `https://videos.pexels.com/video-files/5843724/5843724-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/5843724/pexels-photo-5843724.jpeg?auto=compress&w=1600`
- **Shade:** none (dark) · **Kicker:** "02 / the risk" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "the trail" — `left-4 md:left-10 top-[24%]` · "isn't" — `right-4 md:right-10 top-[44%]` · "always safe" — `left-[10%] md:left-[16%] top-[64%]`
- Paragraph (`right-6 md:right-10 top-[40%] text-right`): "leaks, breaches and shadow traffic hide in plain sight — one missed turn and it is gone"
- Stat (`left-6 md:left-10 bottom-24`, number first, divider after, left-aligned): **0** / "breaches accepted"

### Chapter 4 — "watch" (the watch) — dark low-angle rider
- **Video:** `https://videos.pexels.com/video-files/6943040/6943040-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/6943040/4k-resolution-board-mountain-ski-6943040.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/20` · **Kicker:** "03 / the watch" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "we watch" — `right-4 md:right-10 top-[22%]` · "every" — `left-[6%] md:left-[10%] top-[42%]` · "turn" — `right-[18%] md:right-[26%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "real-time monitoring follows your data end to end, flagging anomalies before they become incidents"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider `rotate-[20deg]` first, right-aligned): **24/7** / "always watching"

### Chapter 5 — "detail" (the detail) — close-up portrait, snowy bokeh
- **Video:** `https://videos.pexels.com/video-files/6286881/6286881-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/6286881/pexels-photo-6286881.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/40` · **Kicker:** "04 / the detail" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "we see what" — `left-4 md:left-10 top-[20%]` · "others" — `right-4 md:right-10 top-[42%]` · "miss" — `left-[20%] md:left-[26%] top-[64%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "behavioral analytics inspects every packet, every permission, every pattern — down to the last byte"
- Stat (`left-6 md:left-10 bottom-24`, number first, divider after, left-aligned): **99.99%** / "threat detection"

### Chapter 6 — "control" (the control) — board-level low angle, sunny
- **Video:** `https://videos.pexels.com/video-files/6947537/6947537-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/6947537/extreme-sports-mountain-ski-skiing-6947537.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/35` · **Kicker:** "05 / the control" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "you stay" — `right-4 md:right-10 top-[22%]` · "in" — `left-[8%] top-[42%]` · "control" — `right-[12%] md:right-[18%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "granular policies, zero-trust access and one clean console — your rules, your data, your call"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **1** / "console, zero trust"

### Chapter 7 — "scale" (the scale) — wide valley, 24 fps
- **Video:** `https://videos.pexels.com/video-files/7166365/7166365-hd_1920_1080_24fps.mp4`
- **Poster:** `https://images.pexels.com/videos/7166365/pexels-photo-7166365.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/35` · **Kicker:** "06 / the scale" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "privacy" — `left-4 md:left-10 top-[20%]` · "every" — `right-4 md:right-10 top-[40%]` · "where" — `left-[18%] md:left-[28%] top-[60%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "from one laptop to a global team — the same protection follows your data, everywhere it goes"
- Stat (`left-6 md:left-10 bottom-24`, number first, divider after, left-aligned): **+1.5b** / "gb of data protected"

### Chapter 8 — "speed" (the speed) — first-person board POV
- **Video:** `https://videos.pexels.com/video-files/6818701/6818701-hd_1920_1080_30fps.mp4`
- **Poster:** `https://images.pexels.com/videos/6818701/pexels-photo-6818701.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/35` · **Kicker:** "07 / the speed" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "fast" — `right-4 md:right-10 top-[24%]` · "without" — `left-[8%] top-[44%]` · "friction" — `right-[12%] md:right-[16%] top-[64%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "security that never slows you down — inline protection in milliseconds, invisible to your users"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **0.2ms** / "median overhead"

### Chapter 9 — "proof" (the proof) — rider through pine forest
- **Video:** `https://videos.pexels.com/video-files/11618451/11618451-hd_1920_1080_60fps.mp4`
- **Poster:** `https://images.pexels.com/videos/11618451/pexels-photo-11618451.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/30` · **Kicker:** "08 / the proof" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "trusted" — `left-4 md:left-10 top-[22%]` · "and" — `right-[10%] md:right-[14%] top-[42%]` · "proven" — `left-[16%] md:left-[22%] top-[62%]`
- Paragraph (`right-6 md:right-10 bottom-24 text-right`): "soc 2, gdpr-ready, independently audited — the answers your security team will ask for"
- Stat (`left-6 md:left-10 bottom-24`, number first, divider after, left-aligned): **4** / "compliance frameworks"

### Chapter 10 — "momentum" (the momentum) — long low-angle pass, blue sky
- **Video:** `https://videos.pexels.com/video-files/11270206/11270206-hd_1920_1080_60fps.mp4`
- **Poster:** `https://images.pexels.com/videos/11270206/pink-snowboard-ski-resort-skiing-snowboard-11270206.jpeg?auto=compress&w=1600`
- **Shade:** `bg-black/35` · **Kicker:** "09 / the momentum" · **Word size:** `text-[11.5vw] md:text-[10.5vw]`
- Words: "keep" — `right-4 md:right-10 top-[20%]` · "moving" — `left-[6%] md:left-[10%] top-[40%]` · "forward" — `right-[10%] md:right-[16%] top-[62%]`
- Paragraph (`left-6 md:left-10 bottom-24`): "ship faster, sleep better — securify grows with you, from first commit to global scale"
- Stat (`right-6 md:right-10 bottom-24 md:bottom-28`, divider first, right-aligned): **+300k** / "downloads"

### Chapter 11 — "calm" (the calm) — night snowfall finale
- **Video:** `https://videos.pexels.com/video-files/35552773/15063226_2560_1440_30fps.mp4` (4K source; consider re-encoding to 1080p before production)
- **Poster:** `https://images.pexels.com/videos/35552773/black-effect-particle-slowmotion-35552773.jpeg?auto=compress&w=1600`
- **Shade:** none (dark) · **Kicker:** "10 / the calm" · **Word size:** `text-[12vw] md:text-[11vw]`
- Words: "quiet." — `left-4 md:left-10 top-[26%]` · "safe." — `right-4 md:right-10 top-[46%]` · "yours." — `left-[18%] md:left-[28%] top-[66%]`
- CTA block (`absolute left-1/2 -translate-x-1/2 bottom-28 w-full px-6 flex flex-col items-center gap-7`):
  - Paragraph (`max-w-[340px] text-[15px] leading-snug text-white/90 text-center`): "your data, at rest. encrypted, monitored, at peace — while you keep moving"
  - Buttons row (`flex items-center gap-3`): "get started" (`bg-white text-black text-sm font-normal rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors`) and "talk to us" (`border border-white/40 text-white text-sm font-normal rounded-full px-8 py-4 hover:bg-white/10 transition-colors`).
- Footer (`absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-[11px] text-white/50`): "© 2026 securify" + links "privacy", "terms", "security" (`hover:text-white transition-colors`).

---

## Behavior & Notes

- All text is lowercase.
- Navbar pills use `bg-neutral-900/90 backdrop-blur`.
- Only transitions: `hover:text-white` on nav links, `hover:bg-neutral-200` on the primary button, `hover:bg-white/10` on the outline button, `transition-all duration-500` on the progress dots.
- No purple/indigo anywhere; palette is pure black, white, neutral-900, and white opacity variants (white/30, white/40, white/50, white/60, white/70, white/90) plus `bg-black/*` overlays.
- Every video is `object-cover`, `muted`, `loop`, `playsInline`; only the visible chapter plays (IntersectionObserver at 35%), others pause — so scroll cost stays bounded.
- Performance: `preload="metadata"` on chapters 2–11 (poster shows until played); hero uses `preload="auto"`. For production, trim/re-encode clips to 8–15 s @ 1080p H.264 (e.g. `ffmpeg -i in.mp4 -t 10 -c:v libx264 -crf 23 -an -movflags +faststart out.mp4`) — the 51 s and 82 s clips especially.
- `prefers-reduced-motion`: disable smooth scroll, hide the scroll-cue animation, and do not autoplay any video (posters remain).
- Responsive: mobile hides nav links, diagonal stat dividers, and the side dots; typography scales via vw units.

## Story logic (why this order)

1. **hero** — the promise (your reference clip: night, dramatic, the brand statement).
2. **motion** — establish what we protect: data that never stops moving (bright, energetic tracking shot).
3. **risk** — the threat (dark, moody forest — tone drops, tension).
4. **watch** — securify's answer: constant monitoring (dark low-angle, same camera family as the hero — visual rhyme).
5. **detail** — depth of inspection (intimate close-up — we see everything).
6. **control** — hand control back to the user (dynamic board-level action).
7. **scale** — global reach (biggest, most panoramic shot = biggest claim).
8. **speed** — no friction (POV = velocity).
9. **proof** — trust signals (steady, confident wide).
10. **momentum** — social proof / growth (longest, most dynamic clip).
11. **calm** — resolution: quiet night snowfall, CTA. The page ends the way it began: dark, serene, safe.
