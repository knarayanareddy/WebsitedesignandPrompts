# Adapted Prompt — Apogee glassmorphic data-intelligence landing

> Feed this to a coding assistant to reproduce the template. **Part A is literal**: every hex,
> pixel, class, delay and copy string must be used verbatim (bracketed Tailwind arbitrary values
> like `text-[15.5px]` stay arbitrary). **Part B** extends the hero into the full page shipped in
> this folder. Do not substitute, round, simplify, or "improve" any value.

---

## Part A — the hero, exactly

### A0. Stack & project setup

- Vite + React 18.3 + TypeScript + Tailwind CSS 3.4 + PostCSS/Autoprefixer
  *(source spec said Vite 5; this repository standardizes on the audit-clean Vite 6.4 line —
  same config API. `oxlint` replaces `eslint`, and `build` runs the typecheck first.)*
- Icons: `lucide-react` — hero uses **only** `ChevronDown`, `Menu`, `X` (the expansion below
  extends the set)
- `package.json` `"type": "module"`. Scripts: `dev: vite`, `build: tsc --noEmit -p tsconfig.app.json && vite build`,
  `lint: oxlint`, `preview: vite preview`, `typecheck: tsc --noEmit -p tsconfig.app.json`

**`vite.config.ts`** (the prompt's config + the repo's `base: './'` and preview host):
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  optimizeDeps: { exclude: ['lucide-react'] },
  server: { host: true, allowedHosts: true, port: 5173 },
  preview: { host: true, allowedHosts: true },
});
```

**`tsconfig.app.json`** includes the matching alias so `@/foo` resolves to `src/foo`:
```json
"baseUrl": ".", "paths": { "@/*": ["src/*"] }
```

**`tailwind.config.js`** — stock, no theme extensions (all styling uses arbitrary values):
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

### A1. `index.html`

Page title **`Apogee`**. Viewport `width=device-width, initial-scale=1.0`. Load the webfont with
this exact stylesheet link:
```html
<link href="https://db.onlinewebfonts.com/c/13ab13418f633c1b0516fed6e30bedbc?family=Suisse+Int%27l" rel="stylesheet">
```
Root div id `root`; module script `/src/main.tsx`. Font stack: `'Suisse Intl', -apple-system, BlinkMacSystemFont, sans-serif`.

### A2. `src/index.css` — global CSS & keyframes

Exactly this file, in this order (the shipped file appends a clearly-marked *additions* block for
Part B and a `prefers-reduced-motion` guard — nothing above the line is altered):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Suisse Intl', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes fade-up    { from { opacity: 0; transform: translateY(24px); }  to { opacity: 1; transform: translateY(0); } }
@keyframes fade-down  { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-left  { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fade-right { from { opacity: 0; transform: translateX(20px); }  to { opacity: 1; transform: translateX(0); } }
@keyframes fade-scale { from { opacity: 0; transform: scale(0.92); }       to { opacity: 1; transform: scale(1); } }
@keyframes bar-grow   { from { transform: scaleY(0); opacity: 0; }        to { transform: scaleY(1); opacity: 1; } }

.animate-fade-up    { animation: fade-up    0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-down  { animation: fade-down  0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-left  { animation: fade-left  0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-right { animation: fade-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-scale { animation: fade-scale 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-bar-grow   { animation: bar-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
```

**Critical:** every animation uses `forwards` and `cubic-bezier(0.16, 1, 0.3, 1)`. Elements start
`opacity-0` in markup and are revealed by the animation — never by JS state.

### A3. `Hero.tsx` — structure

File order: `BAR_HEIGHTS` constant → `Animate` helper → `RevenueCard` → default-exported `Hero`
→ `Nav` (function declarations, hoisted so `Nav` can follow `Hero`).

**`BAR_HEIGHTS` — these 32 numbers, in this order:**
```ts
[23, 40, 53, 40, 33, 14, 7, 17, 75, 65,
 88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
 95, 65, 79, 37, 7, 40, 17, 20, 62, 47,
 92, 72]
```

**`Animate`** — props `children: ReactNode`, `delay = 0`, `className = ''`,
`direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up'`; maps direction → class
(`animate-fade-up` etc.) and renders
`<div className={`opacity-0 ${directionClass} ${className}`} style={{ animationDelay: `${delay}ms` }}>`.

**`Hero`** outer section:
```
<section class="relative w-full h-screen overflow-hidden bg-[#080A19]">
```
Background video — first child, absolutely covering, **this exact source** with
`autoPlay loop muted playsInline` (muted+playsInline are required for iOS autoplay):
```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4
```
Class `absolute inset-0 w-full h-full object-cover`. **No dark gradient overlay** — the
`#080A19` background only shows while the video loads. *(Shipped addition: `onError` swaps the
video for a CSS nebula plate of the same mood.)*

Content wrapper `<div class="relative z-10 h-full flex flex-col">` containing `<Nav />`, then:
```
<div class="flex-1 flex items-center py-8">
  <div class="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
    <div class="max-w-[593px]"> …copy block… </div>
    <RevenueCard />
```

**Copy block (left), in order:**
1. `<Animate delay={300} direction="up">` → `<h1 class="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] mb-5 sm:mb-8">`
   — **`Elevate your essential data to new heights`**
2. `<Animate delay={500} direction="up">` → `<p class="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[370px] mb-7 sm:mb-10">`
   — **`Advanced reasoning systems and predictive models built for the unknown`**
3. `<Animate delay={700} direction="up">` → `<div class="flex flex-wrap gap-3 sm:gap-4">` with two buttons:
   - **`Book a demo`** — `h-[46px] sm:h-[51px] px-5 sm:px-[27px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-90`
   - **`Talk with the team`** — `h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80`

**`RevenueCard`** — wrapper
`<Animate delay={900} direction="scale" className="w-full max-w-[405px] mx-auto lg:mx-0">`
(centered on mobile, left-aligned in its column on `lg`). Shell:
`w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-5 sm:p-8 pb-5 sm:pb-6`.
Contents, in order:
1. **`Revenue Growth`** — `text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-3 sm:mb-4`
2. Amount `<p class="mb-2 sm:mb-3">` with **two spans**: `<span class="text-white text-[28px] sm:text-[46px] font-[450] leading-[1]">$14,205,890</span>` + `<span class="text-white/20 …">.00</span>`
3. Delta row `flex items-center gap-[10px] mb-6 sm:mb-8`:
   - badge **`+32.4%`** — `px-[6px] py-[7px] bg-white/20 rounded-[6px] text-white text-[12px] sm:text-[14px] font-[450] leading-[14px]`
   - caption **`vs. previous period ($10.7M)`** — `text-white/80 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70`
4. Chart `<div class="relative">`:
   - **Bars** — `flex items-end gap-[1.5px] h-[80px] sm:h-[100px]`, `maxHeight = Math.max(...BAR_HEIGHTS)` (= 95). Per bar `const isProjected = i >= 28;`, `height = (h / maxHeight) * 100` %, class `flex-1 rounded-[0.5px] animate-bar-grow origin-bottom`, style
     `{ height, backgroundColor: isProjected ? 'rgba(255,255,255,0.1)' : 'white', animationDelay: `${1100 + i * 30}ms` }`
     — bars stagger **1100 → 2030ms**, each growing `scaleY(0→1)` over 600ms.
   - **Gridlines** — `absolute inset-0 pointer-events-none`, `[0,1,2,3,4].map` of
     `absolute top-0 bottom-0 w-px bg-white/10` at `left: ${((i + 1) / 5) * 100}%`
   - **Axis** — `flex justify-between mt-3` over `['10:00', '12:00', '14:00', '16:00', '16:00']`
     (the duplicated `16:00` is intentional — reproduce it):
     `text-[9px] sm:text-[10px] font-[450] leading-[10px] text-white/80`, style `{ opacity: i >= 3 ? 0.4 : 1 }`

**`Nav`** — `const [isOpen, setIsOpen] = useState(false)` + body-scroll-lock effect
(`document.body.style.overflow = 'hidden'` while open, cleanup on unmount). Fragment `<>…</>`:

- **Nav bar:** `w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50`
- **Logo** (`<Animate delay={0} direction="down">` → `flex items-center gap-2.5`): inline SVG
  `width="28" height="28" viewBox="0 0 256 256" fill="none" className="sm:w-[32px] sm:h-[32px]"`,
  single white path with this exact `d`:
  ```
  M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z
  ```
  Wordmark **`Apogee`** — `text-white text-[22px] sm:text-[26px] font-[450] leading-none tracking-[-0.02em]`
- **Center nav pill** (`<Animate delay={100} direction="down" className="hidden lg:block">`):
  `h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]` —
  **`Platform`** button with trailing `<ChevronDown className="w-[10px] h-[10px] opacity-80" />`
  and `gap-[5px]`; **`Pricing` · `Resources` · `Blog`** spans, all
  `text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors`
- **Right auth pill** (`<Animate delay={200} direction="down" className="hidden lg:block">`):
  `h-[52px] p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] flex items-center gap-[5px]` —
  **`Login`** `h-[46px] px-6 rounded-[11px] text-white … hover:bg-white/5`; **`Book a demo`**
  `h-[46px] px-6 bg-[#E9E9E9] rounded-[11px] text-[#0A0707] … hover:bg-white`
- **Hamburger** (`<Animate delay={100} direction="down" className="lg:hidden">`):
  `w-[44px] h-[44px] … rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px]`,
  `aria-label="Toggle menu"`, inner `relative w-5 h-5` with **both** icons stacked and cross-faded
  (never unmounted):
  `Menu` → `opacity-0 rotate-90 scale-75` when open; `X` → `opacity-100` when open
  (`transition-all duration-300 ease-out` on both)
- **Mobile overlay** (sibling of `<nav>`, visibility-toggled, never unmounted):
  container `lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]`
  + `visible`/`invisible`; backdrop `absolute inset-0 bg-[#080A19]/90 backdrop-blur-[24px]`
  + `opacity-100`/`opacity-0` (click closes); panel
  `absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top`
  + `opacity-100 translate-y-0 scale-100` / `opacity-0 -translate-y-4 scale-[0.97]`.
  Links over `['Platform', 'Pricing', 'Resources', 'Blog']`, each `<a href="#">`
  `flex items-center justify-between px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450] hover:bg-white/[0.06] transition-all duration-300`,
  stagger `transitionDelay: ${100 + i * 50}ms` (100/150/200/250ms), only Platform gets
  `<ChevronDown className="w-4 h-4 opacity-50" />`. Divider `h-px bg-white/10 my-5`. CTA block
  `flex flex-col gap-3 transition-all duration-300`, `transitionDelay: '350ms'`:
  **`Book a demo`** `w-full h-[50px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15px] font-[450] hover:bg-white`;
  **`Login`** `w-full h-[50px] rounded-[12px] border border-white/30 text-white text-[15px] font-[450] hover:bg-white/5`

### A4. Spacing / box-model table — do not estimate

Format: **property — base (<640) → sm (≥640) → md (≥768) → lg (≥1024)**. `—` = unchanged.

**Page containers:** nav + hero row horizontal padding `20px → 32px → 82px`; nav top padding
`20px → 30px`, bottom `0`; hero row `py-8` (32px); max width `1800px` centered; copy↔card gap
`40px` (stacked) → `48px` (row, lg); copy column `max-w-[593px]`; card wrapper `max-w-[405px]`
`mx-auto` → `mx-0` (lg).

**Logo:** `28×28 → 32×32`; icon↔wordmark gap `10px`.

**Center nav pill (≥1024):** height `52px`; h-padding `24px`/side; item gap `30px`;
Platform↔chevron gap `5px`; chevron `10×10`; radius `11px`. Must fit all four links on one line.

**Auth pill (≥1024):** outer height `52px`; outer padding `3px` (all sides); inner gap `5px`;
outer radius `13px`; Login + Book-a-demo each `46px` high, `24px` h-padding, radius `11px`
(46 = 52 − 3 − 3). The 3px gap must be visible — buttons never flush to the pill edge.

**Hamburger (<1024):** `44×44`; icons `20×20`; radius `11px`.

**Headline column:** h1 margin-bottom `20px → 32px`; subhead margin-bottom `28px → 40px`;
subhead `max-w-[370px]`; CTA row gap `12px → 16px`.

**Hero CTA buttons:** height `46px → 51px`; h-padding `20px → 27px` per side (never text
touching the edge); radius `12px`; secondary border `1px` solid white.

**Revenue card shell:** radius `24px → 33px`; padding top/right/left `20px → 32px`; bottom
**shallower** `20px → 24px` (asymmetric on purpose).

**Revenue card internals:** label mb `12px → 16px`; amount mb `8px → 12px`; delta row mb
`24px → 32px`; badge↔caption gap `10px`; badge padding `6px` h / `7px` v, radius `6px`; chart
height `80px → 100px`; bar gap `1.5px`; bar radius `0.5px`; axis row mt `12px`.

**Mobile panel (<1024):** top `76px → 86px`; left/right `16px → 24px`; padding `24px → 32px`;
radius `20px`; border `1px` `white/[0.06]`; link rows `16px` padding, radius `12px`, row gap `4px`;
divider my `20px`; bottom CTA gap `12px`, height `50px`.

### A5. Animation timeline (page load)

| Delay | Element | Animation |
|---|---|---|
| 0 | Logo + wordmark | `fade-down` 700ms |
| 100 | Center pill (desktop) / hamburger (mobile) | `fade-down` 700ms |
| 200 | Auth pill (desktop) | `fade-down` 700ms |
| 300 | h1 | `fade-up` 800ms |
| 500 | Subhead | `fade-up` 800ms |
| 700 | CTA row | `fade-up` 800ms |
| 900 | Revenue card | `fade-scale` 900ms |
| 1100 + i×30 | Bar i (0–31) | `bar-grow` 600ms, `origin-bottom` |

All `cubic-bezier(0.16, 1, 0.3, 1)` with `forwards`. Sequence resolves at ~2630ms.

### A6. Responsive (Tailwind defaults) & non-negotiables

`<lg`: single column, `gap-10`, card centered at `405px`. `≥lg`: `flex-row items-center
justify-between gap-12`, card `mx-0`. Nav pills `≥lg`, hamburger + overlay `<lg` with body
scroll lock. h1 `36 → 52 → 64 → 72px`; subhead `16 → 18 → 20px`; CTA text `14 → 15.5px`;
wordmark `22 → 26px`; card label `16 → 20px`; amount `28 → 46px`; delta `12 → 14px`;
axis `9 → 10px`.

Checklist: video URL character-for-character with `autoPlay loop muted playsInline` · all 32
bars, `Math.max` derived height · bars 28–31 dimmed · duplicated `16:00` + dimming at i ≥ 3 ·
`.00` as separate `white/20` span · `font-[450]` throughout except `font-normal` h1 ·
visibility-toggled menu · cross-faded icons · body scroll lock with cleanup · `opacity-0` +
CSS `forwards` only · no scroll-triggered animation in the hero · comfortable CTA button padding ·
roomy nav pills · asymmetric card padding (20/20/20/24 after sm) · re-measure §A4 before done.

---

## Part B — the expansion (sections below the hero)

Same design language (`#080A19`, glass at `rgba(17,16,15,0.35)` + `backdrop-blur-[20px]`,
`font-[450]`, radius scale, `white/80`-family text). Sections in order:

1. **Trust strip** — hairline `border-y border-white/[0.06]` band; eyebrow
   `tracking-[0.28em] uppercase` "Trusted by data teams at"; wordmarks
   (NORTHWIND · VERTEX LABS · HELIOGRAPH · ATLAS FREIGHT · KINETIC · MERIDIAN) at
   `white/35`, `tracking-[0.12em]`, duplicated into a seamless CSS **marquee**
   (~48s linear loop, pauses for reduced motion / wraps static).
2. **The numbers** — eyebrow "The numbers"; h2 "Signal, at the scale your business runs";
   four stats on `border-t border-white/[0.08]` cells: `$4.2B` forecast volume daily ·
   `99.98%` uptime · `12ms` median query latency · `340+` production models. Numbers count up
   over 1.4s (rAF, cubic ease-out) when scrolled into view; instant under reduced motion.
   The whole band sits on a full-bleed **ambient video layer** ("field": slow-drifting network
   nodes, self-hosted loop + poster + CSS-gradient fallback), and each stat cell **tilts at the
   pointer** (perspective 1000px, ≤3.5°, pointer-only).
3. **Platform** — eyebrow "Platform"; h2 "Advanced reasoning, end to end"; six glass cards
   (`rounded-[24px]`, hover border lift) in 1/2/3 columns: Predictive Models, Anomaly
   Detection, Scenario Planning, Data Fabric, Model Governance, Real-time Signals — each with a
   `w-11 h-11 rounded-[12px]` icon chip (lucide: TrendingUp, Radar, Layers, Database,
   ShieldCheck, Zap). A **cursor spotlight** (large soft radial gradient following the pointer)
   sweeps the section, and each card **tilts + tracks a glow** at the pointer.
4. **Forecast console** — copy column ("From raw signal to confident decision" + three
   check bullets) beside a wide glass panel that reuses the card grammar: range tabs
   Today/30D/YTD (pill group, `aria-pressed`), "Live" pulse dot, headline metric + delta badge
   (the card's badge classes), SVG chart (`pathLength=1` line-draw on reveal, area gradient,
   gridlines), and the card's exact axis row (`10:00…16:00, 16:00`, dimming at i ≥ 3).
   Switching tabs swaps the curve/amount/delta (path remounts so the draw replays).
   **Two assumption sliders** sit below a hairline inside the panel — "Market growth"
   (−5…+25%, default +12%) and "Volatility" (0…60, default 18) — and the forecast curve
   (41 computed points), projected amount and delta recompute on every input event, with a
   "Reset" affordance when the assumptions drift from default. The panel itself tilts at the
   pointer. Sliders use `input[type=range]` with custom `.apogee-range` styling (white/10
   track, white/55 thumb).
5. **Quote** — editorial blockquote (fictional customer: Maya Ortiz, CFO,
   Northwind Logistics) with monogram avatar, over a full-bleed **ambient video band**
   ("terrain": low wireframe horizon drifting laterally) darkened with `#080A19/62` plus
   top/bottom fade gradients.
6. **CTA** — "Reach your apogee." + "Put advanced reasoning systems to work on the data that
   matters most." + the hero's two buttons verbatim, over the **"ascent" video loop** (rising
   light streaks) under the same blue/red radial glow family as the hero clip. Buttons
   **tilt at the pointer**. Caption: "No credit card required · SOC 2 Type II · Deployed in
   your region".
7. **Footer** — a "Built for the unknown" **marquee strip** (`tracking-[0.22em]` uppercase,
   hairline-bounded), then the brand block (logo + wordmark + hero subhead) and four link
   columns (Product/Company/Resources/Legal), bottom bar "© 2026 Apogee Systems." / "Built
   for the unknown."

**Band media:** the three loops (`field`/`terrain`/`ascent`) are generated procedurally
(`tools/generate-bands.py`) on-palette and self-hosted — 1920×1080, 30 fps, seamless 15 s
H.264 — with poster frames; any dark navy loop of matching mood can replace them at the same
paths. Every video layer respects reduced motion (poster still + no parallax) and falls back
to a CSS gradient if the file is missing.

**Expansion animation language:** scroll reveals use a `.reveal` wrapper (IntersectionObserver
adds `.is-visible`; 0.8s `cubic-bezier(0.16, 1, 0.3, 1)`, 24px rise, optional delay); video
layers parallax gently on scroll (rAF, transform only); pointer interactions (marquee aside)
are gated on fine pointers and disabled entirely under reduced motion — the hero
keeps its own pure-CSS timeline. `prefers-reduced-motion: reduce` resolves every animation
instantly and pauses the hero video (repo accessibility standard).

---

## Behavior & notes

- Palette: `#080A19` bg · `#E9E9E9` buttons / `#0A0707` button text · glass
  `rgba(10,7,7,0.35)` nav · `rgba(0,0,0,0.35)` auth · `rgba(17,16,15,0.35)` card ·
  `rgba(255,255,255,0.1)` projected bars · `white/10` gridlines.
- Backdrop-blur: `17px` pills · `20px` card · `24px` mobile backdrop · `30px` mobile panel.
- The Suisse Intl webfont is hot-linked (`db.onlinewebfonts.com`) with a system-sans fallback;
  the hero video is hot-linked (CloudFront) with the CSS nebula fallback plate. See `../ASSETS.md`
  — both are third-party assets to replace before publishing as your own site.
- Everything presentational lives in components; copy is plain string literals, so re-skinning
  is a find-and-replace away.
