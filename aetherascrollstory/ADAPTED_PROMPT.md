# Adapted prompt — Aethera scroll-story landing page (8 videos, one coherent story)

Build a full-screen **scroll-story** landing page for a design studio called "Aethera®" using
React + TypeScript + Vite + Tailwind CSS. The page is a sequence of **8 full-screen chapters**,
each with a **different looping background video**, telling ONE coherent story:

> beyond silence, we build the eternal → we begin where the noise ends → pure flows,
> unhurried → for brilliant minds, thoughtful souls → we build in the warm hours → fearless
> makers climb further → what is built in silence, endures → your haven is waiting.

The emotional/visual arc mirrors the copy: luminous white-sky valley (statement) → misty still
valley → emerald flowing stream → blooming daisy meadow → golden backlit light → vast misty
ridgelines → night sky with the milky way (the one dark beat) → white cosmos dissolving back
into pure white (the invitation). Bright → alive → golden → vast → night → white.

This is an adaptation of the original single-hero "Cinematic Hero Section with Looping Video
Background" prompt: the hero keeps its exact spec (fonts, positioning, fade-loop logic,
copy); chapters 2–8 reuse the same video-loop mechanic and type system to extend it into a
scroll narrative. Implemented and running in this repo — see `VIDEO_PICKS.md` for the
frame-verified sources of every clip.

---

## Fonts & Global Styles

- Display text (headings, logo): **Instrument Serif** (regular + italic), bundled via
  `@fontsource/instrument-serif` and imported in `/src/styles/fonts.css`.
- Body text (navigation, descriptions): **Inter** (400/500) via `@fontsource/inter`, same file.
- Body: white `#FFFFFF` background, `#000000` text, antialiased; `html, body, #root` height 100%;
  `html { scroll-behavior: smooth; }` (disabled under `prefers-reduced-motion`).
- `.hero-title { line-height: 0.95; letter-spacing: -2.46px; }`
- Animations in `/src/styles/theme.css`: `fade-rise` (opacity 0→1, translateY 20px→0, 0.8s
  ease-out), plus `fade-rise-delay` (+0.2s) and `fade-rise-delay-2` (+0.4s). Content is hidden
  (opacity 0) until its chapter gets `.is-active` (≥35% in view), then rises with the stagger.
- Scroll cue: 1px×32px black/60 line, bounces 8px over 2s infinite, opacity pulsing to 0.35.

## Navbar (FIXED, persists across all chapters)

- `fixed inset-x-0 top-0 z-40`; inner `flex justify-between px-8 py-6 max-w-7xl mx-auto`.
- Glassmorphic pill (left): `bg-white/70 backdrop-blur-xl rounded-full border border-white/60`
  with soft shadow — keeps the black-on-white type legible over the dark night chapter.
  - Logo "Aethera®" (® as superscript): `font-display text-3xl tracking-tight`, color `#000000`.
  - Menu (hidden on mobile): Home → `#silence` (`#000000`), Studio → `#flow`, About → `#ascent`,
    Journal → `#eternal`, Reach Us → `#begin` (all others `#6F6F6F`), `text-sm transition-colors`
    with `hover:text-black`.
- Right CTA: "Begin Journey" → `#begin`, `rounded-full px-6 py-2.5 text-sm`, black background,
  white text, `hover:scale-1.03`.

## Video-loop mechanic (every chapter, from the original prompt)

`src/components/VideoLoop.tsx` — a background `<video>` (`object-cover`, `muted`, `playsInline`,
no native loop) inside a wrapper whose opacity is driven by `requestAnimationFrame`:

- continuously read `currentTime` / `duration`;
- fade **in** over 0.5s at the start (opacity 0→1);
- fade **out** over 0.5s before the end (opacity 1→0);
- on `ended`: set opacity 0, wait 100ms, `currentTime = 0`, `play()` again — a seamless manual
  loop with smooth fade transitions (the fade also hides each chapter's loop seam);
- IntersectionObserver at 35%: play only while visible, pause otherwise;
- hero uses `preload="auto"`, all others `preload="metadata"` + poster frame;
- `prefers-reduced-motion: reduce` → never autoplay, poster shown at full opacity.

Overlays per chapter (all `pointer-events-none`, monochrome): a full-bleed
`bg-gradient-to-b from-{bg} via-transparent to-{bg}` (white chapters use white, the night
chapter black) plus a top `h-28` fade from the background color — blending each video into the
page and into the next chapter.

## Chapter shell (chapters 2–8)

`relative h-screen w-full overflow-hidden` + background color (white, or black for "eternal");
foreground `relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center`,
alternating left/right per chapter:

- Kicker: `text-xs md:text-sm tracking-[0.3em]` (`#6F6F6F`, or `white/50` on the dark chapter)
  + `h-px w-10` rule.
- Headline: `font-display font-normal text-5xl sm:text-7xl md:text-8xl` with `.hero-title`
  metrics; main text `#000000` (white on the dark chapter); emphasized words *italic* in
  `#6F6F6F` (or `white/60`).
- Paragraph: `max-w-xl text-base sm:text-lg leading-relaxed` in `#6F6F6F` (or `white/70`).
- Stat (optional): `font-display text-4xl md:text-5xl` number + diagonal `h-px w-24 rotate-[20deg]`
  divider + `text-xs md:text-sm` sublabel.
- Final chapter adds the CTA row ("Begin Journey" black pill `px-14 py-5`, "Reach Us" outline
  pill) and a footer: "© 2026 Aethera" + privacy / terms / journal in `#6F6F6F`, `hover:text-black`.

## Chapter 1 — "silence" (the statement, original hero spec preserved)

- Container `relative min-h-screen w-full overflow-hidden bg-white`.
- Background video: `./videos/01-silence.mp4` (local optimized cut of the reference; original at
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4),
  wrapper positioned `top: 300px` with right/bottom/left 0 (the original's `inset: 'auto 0 0 0'`
  + `top: 300px`), `z-0`.
- Gradient overlay over the same rect: `bg-gradient-to-b from-white via-transparent to-white`.
- Content `relative z-10 flex flex-col items-center justify-center text-center px-6`,
  `paddingTop: calc(8rem - 75px)`, `pb-40`:
  - H1 "Beyond *silence,* we build *the eternal.*" — `text-5xl sm:text-7xl md:text-8xl`,
    Instrument Serif, `font-normal`, `.hero-title`; main `#000000`, "silence," and "the eternal."
    italic `#6F6F6F`; `animate-fade-rise`.
  - Description "Building platforms for brilliant minds, fearless makers, and thoughtful souls.
    Through the noise, we craft digital havens for deep work and pure flows." —
    `text-base sm:text-lg max-w-2xl mt-8 leading-relaxed` `#6F6F6F`; `animate-fade-rise-delay`.
  - CTA "Begin Journey" — `rounded-full px-14 py-5 text-base mt-12`, black/white,
    `hover:scale-1.03`; `animate-fade-rise-delay-2`.
- Scroll cue bottom-center ("scroll" + animated line).

## Chapters 2–8 — content map (video per chapter in `public/videos/`)

| id | kicker | video / poster | tone | headline (italics muted) | paragraph | stat |
|----|--------|----------------|------|--------------------------|-----------|------|
| still | 01 / the still | 02-still | light, left | Where the *noise* ends, / we *begin.* | Aethera is a studio for the quiet hours. We build digital havens where attention can breathe and work can go deep. | 04h / deep-work sessions we design for |
| flow | 02 / the flow | 03-flow | light, right | Pure *flows,* / *unhurried.* | Like water finding its course through stone, we shape platforms that move without friction — clear, continuous, calm. | 0 / friction points shipped, ever |
| bloom | 03 / the bloom | 04-bloom | light, left | For brilliant *minds,* / thoughtful *souls.* | Every interface is planted with intention. We tend the details quietly, so your ideas have room to blossom. | 120+ / platforms grown from quiet beginnings |
| light | 04 / the light | 05-light | light, right | We build in / the warm *hours.* | Craft cannot be rushed. We work at the speed of care, letting every decision settle in good light. | 10y / of patient, deliberate craft |
| ascent | 05 / the ascent | 06-ascent | light, left | Fearless *makers* / climb *further.* | From quiet valleys to open ridgelines, we scale what matters — without ever losing the calm we started with. | 40+ / teams carried to calmer summits |
| eternal | 06 / the eternal | 07-eternal | **dark**, right | What is built in *silence,* / *endures.* | Under the same sky, night after night, the work keeps watch — quietly, patiently, eternally. | 24/7 / quietly keeping watch |
| begin | 07 / begin | 08-begin | light, left | Your *haven* / is *waiting.* | (brand line reprise) + CTA row + footer | — |

## Side progress dots

`fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3` with one
anchor per chapter. Inactive `h-1.5 w-1.5` white/40; active `h-6 w-1.5` white;
`transition-all duration-500`. The rail uses `mix-blend-difference` so the same white dots read
black on white chapters and white on the night chapter. Active id tracked by the same 35%
IntersectionObserver.

## Behavior & Notes

- Palette is strictly `#FFFFFF` / `#000000` / `#6F6F6F` (+ white/black opacity variants) —
  glassmorphic frosted pills, no color accents.
- All videos 16:9 `object-cover`; the one portrait source (03-flow) is center-cropped at
  transcode time. Clips are trimmed to 6–12 s 1080p H.264 CRF 26–27 `+faststart`, no audio
  (≈25 MB total; see `VIDEO_PICKS.md` for sources and the exact ffmpeg line).
- Responsive: mobile hides nav links and the dot rail; type scales via the sm/md steps above.
- `prefers-reduced-motion`: smooth scroll off, reveals shown, scroll cue static, no autoplay.

## Story logic (why this order)

01. **silence** — the promise over the reference valley (night-quiet, luminous).
02. **still** — the world the promise lives in: a valley waking in mist (tone settles).
03. **flow** — the method: water over moss, unhurried (intimate close-up after the wide).
04. **bloom** — the audience: minds and souls, a meadow in bloom (color returns).
05. **light** — the craft: golden hour, patience made visible (warmest beat).
06. **ascent** — the ambition: ridgelines under cloud (widest shot = biggest claim).
07. **eternal** — the proof: the same sky at night, stars over the peak (dark pivot, white type).
08. **begin** — the invitation: white flowers against a white sky, dissolving into the page;
     CTA + footer close the loop back to silence.
