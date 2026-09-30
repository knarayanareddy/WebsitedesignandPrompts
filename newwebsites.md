# newwebsites.md

Six ready-to-run website build prompts. Prompt 1 is a fully specified, pixel-exact
rebuild brief (verbatim). Prompts 2-6 are new briefs written in the same house
style and built on the same design system, but for different domains and use
cases - same interaction engineering, different content, layout and motion.

Each prompt is self-contained. Paste one prompt into a coding agent and it
builds the complete site with no follow-up questions.

---

# WEBSITE 1 - KRAKEN (crypto trading platform)

can you create a website with following prompt (CRITICAL GLOBAL RULE - NO QUESTIONS, BUILD IMMEDIATELY (THIS COMES FIRST, BEFORE EVERYTHING ELSE)

BUILD THE COMPLETE WEBSITE DIRECTLY FROM THIS PROMPT RIGHT NOW. DO NOT ASK ANY CLARIFYING QUESTIONS, DO NOT PROPOSE ALTERNATIVES OR OPTIONS, DO NOT PAUSE TO CONFIRM SCOPE OR ASK WHAT TO PRIORITIZE. EVERY DETAIL NEEDED IS ALREADY SPECIFIED BELOW. GENERATE THE FULL SITE IMMEDIATELY.

---

CRITICAL GLOBAL RULE - IMAGE AND VIDEO ASSET URLS (NON-NEGOTIABLE)

ALL IMAGE, ICON, AND VIDEO ASSETS MUST BE LOADED DIRECTLY FROM THE CLOUD USING THIS EXACT BASE URL PATTERN AND NOTHING ELSE:

https://qclay.design/lovable/kraken/[FILENAME]

WHERE [FILENAME] IS THE EXACT FILENAME LISTED IN THE ASSET MANIFEST BELOW, INCLUDING HYPHENS AND CAPITALIZATION EXACTLY AS WRITTEN.

DO NOT ADD /assets/, /public/, /images/, /static/, /media/, OR ANY OTHER SUBFOLDER TO THE URL.
DO NOT INVENT NEW FILENAMES. DO NOT RENAME, SLUGIFY, OR URL-ENCODE THEM.
DO NOT DOWNLOAD THE ASSETS INTO THE PROJECT AND DO NOT CONVERT THEM INTO LOCAL IMPORTS - KEEP THE FULL HTTPS URLS AS STRING CONSTANTS EXACTLY AS THEY APPEAR IN THE CODE BELOW.
STRICTLY FORBIDDEN: PLACEHOLDER IMAGES OR RECTANGLES, EMPTY src, ICON-LIBRARY SUBSTITUTES (LUCIDE ETC.) FOR PROVIDED FILES.
EVERY ASSET CONSTANT IN THE CODE BELOW ALREADY HOLDS ITS FINAL URL - COPY IT EXACTLY.

---

CRITICAL GLOBAL RULE - TEXT WRAPPING, NEVER CLIP TEXT

NO TEXT CONTAINER MAY GET A NEW FIXED HEIGHT OR overflow:hidden THAT COULD CUT OFF WRAPPED TEXT. DO NOT ADD HEIGHT CLAMPS OR LINE CLAMPS ANYWHERE. THE ONLY overflow:hidden ON TEXT IS THE ONE ALREADY INSIDE AnimatedLines (EACH LINE WRAPPER HAS overflow:hidden PLUS paddingBottom 0.2em SO THE SLIDE-UP REVEAL IS MASKED) - KEEP THAT EXACTLY AS CODED. PRESERVE EVERY INTENTIONAL whitespace-nowrap ON THE DESKTOP CANVASES (DESKTOP TEXT IS PRE-BROKEN INTO EXPLICIT LINES INSIDE A FIXED-PX CANVAS) AND THE FREE WRAPPING ON THE MOBILE CANVASES (MOBILE TEXT IS PASSED AS ONE LONG LINE AND WRAPS NATURALLY).

---

CRITICAL GLOBAL RULE - EXACT CODE FOR MAIN SECTIONS

EVERY FILE BELOW IS EXACT SOURCE CODE (REACT 19 + TYPESCRIPT + TAILWIND CSS V4 + FRAMER MOTION). DO NOT RE-DERIVE LAYOUT, PIXEL POSITIONS, GRADIENTS, SHADERS, CANVAS DRAWING LOGIC, OR ANIMATION TIMING FROM PROSE. REPRODUCE EACH FILE VERBATIM AT THE PATH GIVEN. DO NOT "CLEAN UP", DEDUPLICATE, SPLIT, MERGE, OR RESTYLE ANY OF THEM. DO NOT SWAP FRAMER MOTION FOR ANOTHER LIBRARY.

---

CRITICAL GLOBAL RULE - RESPONSIVE SCALING LOGIC (useFitScale / useFitScaleAuto)

EVERY SECTION IS RENDERED ON A FIXED-PIXEL DESIGN CANVAS AND SCALED AS ONE PIECE TO THE REAL WIDTH WITH ResizeObserver + transform: scale(). THE HOOKS useFitScale AND useFitScaleAuto ARE DUPLICATED INSIDE EACH SECTION FILE ON PURPOSE - COPY THEM 1-TO-1 IN EVERY FILE. DO NOT REPLACE THEM WITH CSS BREAKPOINTS, FLEX/GRID REFLOW, clamp(), vw UNITS, OR A SHARED REWRITE. DO NOT REMOVE transformOrigin: 'top left'. NEVER MOVE THE SCALE transform ONTO A motion.div (FRAMER MOTION OVERWRITES transform AND THE CANVAS STOPS SCALING) - IT MUST STAY ON THE PLAIN div EXACTLY AS CODED.

==================================================
1. PROJECT OVERVIEW
==================================================

Kraken - a single-page dark landing page for a crypto trading platform. Stack: Vite + React 19 + TypeScript, Tailwind CSS v4 (via @tailwindcss/vite, configured only through @theme in index.css, there is no tailwind.config file), Framer Motion for all animations. No router, no backend, no state library.

Theme at a glance: near-black background #08090b everywhere; white text at several opacities (white, white/80, white/60, white/50, white/40); a single warm accent orange #FF6215 with the recurring brand gradient linear-gradient(180deg, #FF6215 0%, #FFF28E 100%) (used for the 6px square in every section badge, the dashboard logo tile and the hero glow blobs); the hero background gradient is linear-gradient(180deg, #08090B 0%, #7B3627 62.5%, #B16D3C 100%). Sharp corners almost everywhere (buttons, badges, cards have no radius), except the glass "browser window" cards (rounded 9px) and the round dots.

Page composition, top to bottom: Hero (nav, headline, CTAs, glass browser window with a live portfolio dashboard over a dot-matrix video glow) -> a 10vh spacer in #08090b -> TickerGrid (grid of lines with coin labels, dot-matrix octopus texture tiles, an interactive swap widget, and empty cells that light up under the cursor and unfold into live quote cards) -> Pricing (two plan cards, the Pro card has a live WebGL flowing gradient) -> WhyUs (bento grid of stats and testimonial quotes, two cells with dot-matrix texture) -> CTA ("Let's Talk Trading" block with a second dashboard window over a dot-matrix wave) -> Footer (logo, blurb, socials, four link columns, legal bar, dashed dividers).

Animation philosophy: everything is scroll-triggered once (Framer Motion useInView with once: true) and choreographed. Text never just fades: each line of a heading/paragraph slides up out of an overflow mask (AnimatedLines, 0.5s easeOut, +0.08s per line). Small elements (badges, buttons, icons, coin labels) pop in with a spring (popIn: stiffness 340, damping 22, mass 0.8). Delays are computed, not arbitrary: most sections use TEXT_STEP = 0.03s and give each successive element (index * TEXT_STEP) or a base offset + n * TEXT_STEP, so content cascades in reading order; grid/guide lines draw in first (width/height or scaleX/scaleY from 0), then texts, then buttons. Numbers count up from 0 while keeping their exact formatting (only digits animate, separators like $ , . % + < / ms stay in place). Hover effects: buttons and badges flip their label like a rolodex drum (DrumText), nav/footer links re-roll their letters through random characters (ScrambleText) or drum-flip (HoverLine). The dot-matrix blocks (DotMatrix canvas) react to the cursor: dots bulge away from the pointer and turn into flickering ASCII glyphs, and entering the block sends a glitchy diagonal re-assembly wave; on mobile they breathe on their own (ambient) and re-run the wave on a timer (autoSweepMs). The Pro pricing card runs a WebGL domain-warped noise shader (FlowGradient) that swirls around the cursor.

==================================================
2. FILE / FOLDER STRUCTURE
==================================================

index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (popIn, DrumText, HoverLine, AnimatedLines, ScrambleText)
src/lib/DotMatrix.tsx       (interactive halftone canvas renderer for images and video)
src/lib/FlowGradient.tsx    (WebGL flowing gradient shader)
src/sections/Hero.tsx
src/sections/PortfolioDashboard.tsx   (dashboard mock used inside Hero and CTA)
src/sections/TickerGrid.tsx
src/sections/TickerCells.tsx  (interactive layer over the empty grid cells of TickerGrid)
src/sections/Pricing.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx

There is no src/assets folder in the rebuild: every asset is a remote URL (see the asset manifest).

Dependencies (from package.json):
react ^19.2.8
react-dom ^19.2.8
framer-motion ^13.2.0
tailwindcss ^4.3.3
@tailwindcss/vite ^4.3.3
Dev: vite ^8.2.2, @vitejs/plugin-react ^6.1.0, typescript ~6.0.2, @types/react ^19.2.18, @types/react-dom ^19.2.4, @types/node ^24.13.3.
If the target environment pins other versions of Vite/React/Tailwind, keep its versions, but Tailwind must be v4 (the CSS uses @import "tailwindcss" and @theme) and framer-motion must be present.

==================================================
3. GLOBAL SETUP
==================================================

Fonts: loaded by the @import at the top of src/index.css (Google Fonts: Inter Tight weight 500, Fragment Mono). The display font is the system Helvetica Neue stack, no webfont for it. There are no other font links. Three Tailwind v4 theme tokens, used via var(--font-...) in inline styles:
--font-display: 'Helvetica Neue', Helvetica, Arial, sans-serif - all headings, body text, buttons, badges, dashboard texts, numbers.
--font-logo: 'Inter Tight' - the "Kraken" wordmark next to the logo, the footer blurb and footer link columns.
--font-mono-label: 'Fragment Mono' - small uppercase footer labels (column headers, legal links, copyright, "Back to top") and the ASCII glyphs drawn inside DotMatrix.

Typography rules: headings are font-weight 500 (font-medium) with tight negative letter-spacing of about -3% of the font size (e.g. 54px -> -1.62px, 62.86px -> -1.89px, 42px -> -1.26px) and line-height at about 0.96 of the size. Section badges are 13px (12px on mobile) uppercase font-medium white/80 in a bordered white/10 box with a 6px gradient square. Body copy is 16px white/60 or white/80, line-height 20px. Prices and big stats are regular weight with the same tight tracking. Every font size, letter-spacing and line-height is written explicitly in the code - copy them, do not normalize to a type scale.

Color usage: background #08090b (body, every section). Accent #FF6215 for the swap button hover, connect-wallet button, dashboard badges and accent bars. Pro card tint #E5710A at 10%. Borders are white/10, white/15 or white/20 hairlines. Glass cards: background rgba(255,255,255,0.06) + border white/15 + backdrop-blur 27px + radius 9px.

Responsive breakpoint convention: exactly one breakpoint, Tailwind lg (1024px). Every section renders TWO siblings: a desktop version with className "... hidden ... lg:block" (fixed canvas at the Figma frame size, 1510-1545px wide, scaled with useFitScale and aspect-ratio) and a mobile version with className "... block ... lg:hidden" (a 420px-wide design canvas scaled with useFitScaleAuto, whose height is measured from the natural content height). Below 1024px only the mobile version is visible, at 1024px and above only the desktop one. Do not add any other breakpoints (no sm:, md:, xl:).

Recurring verbatim values (apply exactly wherever they appear in the code):
brand gradient: linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)
hero background: linear-gradient(180deg, #08090B 0%, #7B3627 62.5%, #B16D3C 100%)
CTA warm overlay: linear-gradient(180deg, rgba(254,107,29,0) 0%, rgba(254,107,29,0.2) 100%)
glass card fill: rgba(255,255,255,0.06)

==================================================
4. ASSET MANIFEST
==================================================

Base URL: https://qclay.design/lovable/kraken/
Every file below is served flat from that base URL. The code already contains the full URLs as string constants.

cta-wave-glow.webp - https://qclay.design/lovable/kraken/cta-wave-glow.webp - used in CTA
dashboard-bell.svg - https://qclay.design/lovable/kraken/dashboard-bell.svg - used in PortfolioDashboard
dashboard-calendar.svg - https://qclay.design/lovable/kraken/dashboard-calendar.svg - used in PortfolioDashboard
dashboard-chart-bars.svg - https://qclay.design/lovable/kraken/dashboard-chart-bars.svg - used in PortfolioDashboard
dashboard-chart-line.svg - https://qclay.design/lovable/kraken/dashboard-chart-line.svg - used in PortfolioDashboard
dashboard-fav-chart.svg - https://qclay.design/lovable/kraken/dashboard-fav-chart.svg - used in PortfolioDashboard
dashboard-import.svg - https://qclay.design/lovable/kraken/dashboard-import.svg - used in PortfolioDashboard
dashboard-logo-s.svg - https://qclay.design/lovable/kraken/dashboard-logo-s.svg - used in PortfolioDashboard
dashboard-tm.svg - https://qclay.design/lovable/kraken/dashboard-tm.svg - used in PortfolioDashboard
dashboard-user.svg - https://qclay.design/lovable/kraken/dashboard-user.svg - used in PortfolioDashboard
favicon.svg - https://qclay.design/lovable/kraken/favicon.svg - used in index.html
footer-github.svg - https://qclay.design/lovable/kraken/footer-github.svg - used in Footer
footer-linkedin.svg - https://qclay.design/lovable/kraken/footer-linkedin.svg - used in Footer
footer-x.svg - https://qclay.design/lovable/kraken/footer-x.svg - used in Footer
hero-glow.mp4 - https://qclay.design/lovable/kraken/hero-glow.mp4 - used in Hero
hero-kraken-mark.svg - https://qclay.design/lovable/kraken/hero-kraken-mark.svg - used in Footer, Hero
pricing-pro-card-bg.webp - https://qclay.design/lovable/kraken/pricing-pro-card-bg.webp - used in Pricing, WhyUs
tickers-arrow-left-chunky.svg - https://qclay.design/lovable/kraken/tickers-arrow-left-chunky.svg - used in TickerGrid
tickers-arrow-right-chunky.svg - https://qclay.design/lovable/kraken/tickers-arrow-right-chunky.svg - used in Pricing, TickerGrid
tickers-chevron-down.svg - https://qclay.design/lovable/kraken/tickers-chevron-down.svg - used in TickerGrid
tickers-octopus-texture.webp - https://qclay.design/lovable/kraken/tickers-octopus-texture.webp - used in TickerGrid
tickers-swap-icon.svg - https://qclay.design/lovable/kraken/tickers-swap-icon.svg - used in TickerGrid
whyus-buy-crypto.svg - https://qclay.design/lovable/kraken/whyus-buy-crypto.svg - used in WhyUs
whyus-comb-divider.svg - https://qclay.design/lovable/kraken/whyus-comb-divider.svg - used in WhyUs
whyus-timer.svg - https://qclay.design/lovable/kraken/whyus-timer.svg - used in WhyUs

Present in the asset folder but NOT used anywhere on the page (do not place them in the design): cta-portfolio-window-tall.png, hero-portfolio-window.png, icons.svg.

==================================================
3a. GLOBAL FILES - EXACT CODE
==================================================

==================================================
FILE: index.html
Entry HTML (favicon is a remote URL).
==================================================

BEGIN CODE index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://qclay.design/lovable/kraken/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>kraken</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
END CODE index.html

==================================================
FILE: vite.config.ts
Vite config.
==================================================

BEGIN CODE vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
END CODE vite.config.ts

==================================================
FILE: src/main.tsx
React entry.
==================================================

BEGIN CODE src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
END CODE src/main.tsx

==================================================
FILE: src/index.css
Global CSS with the font import and the Tailwind v4 @theme tokens. There is no tailwind.config file in this project.
==================================================

BEGIN CODE src/index.css
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&family=Fragment+Mono&display=swap');
@import "tailwindcss";

@theme {
  --font-display: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-logo: 'Inter Tight', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono-label: 'Fragment Mono', ui-monospace, Consolas, monospace;
}

:root {
  color-scheme: dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background: #08090b;
}

p {
  margin: 0;
}
END CODE src/index.css

==================================================
5. SHARED HOOKS / UTILS - EXACT CODE
==================================================

==================================================
FILE: src/lib/animations.tsx
Animation primitives used by every section.
==================================================

BEGIN CODE src/lib/animations.tsx
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType } from 'react'

export function popIn(isInView: boolean, delay: number) {
  return {
    initial: { scale: 0, opacity: 0 },
    animate: isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: { type: 'spring' as const, stiffness: 340, damping: 22, mass: 0.8, delay: delay / 1000 },
  }
}

const drumFaceStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
}

/**
 * Text that flips like a rolodex drum on hover: the visible face rotates away
 * revealing an identical copy underneath, giving a subtle "refresh" feel.
 */
export function DrumText({
  text,
  hovering,
  className,
  style,
  radius = 9,
  hoverScale = 1,
}: {
  text: string
  hovering: boolean
  className?: string
  style?: CSSProperties
  radius?: number
  hoverScale?: number
}) {
  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap', perspective: 240, ...style }}
    >
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transition: hovering ? 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          transform: hovering ? `rotateX(180deg) scale(${hoverScale})` : 'rotateX(0deg) scale(1)',
        }}
      >
        <span style={{ ...drumFaceStyle, transform: `translateZ(${radius}px)` }}>{text}</span>
        <span style={{ ...drumFaceStyle, transform: `rotateX(180deg) translateZ(${radius}px)` }}>{text}</span>
      </span>
    </span>
  )
}

/**
 * A single line of text that fades/slides in like `AnimatedLines` on mount,
 * and flips via `DrumText` on hover — for nav links, footer links, and other
 * loose (non-boxed) clickable text where hovering the glyphs themselves is
 * the natural hover target. className/style go straight on the animated
 * `Tag` (e.g. for `absolute`/`left` positioning), with `DrumText` as its only
 * child — no extra clipping wrapper, since nesting one around `DrumText`'s
 * own nested inline-blocks was cropping the text on narrower containers.
 */
export function HoverLine({
  text,
  as = 'div',
  baseDelay = 0,
  isInView,
  className,
  style,
  effect = 'drum',
}: {
  text: string
  as?: 'div' | 'span'
  baseDelay?: number
  isInView: boolean
  className?: string
  style?: CSSProperties
  effect?: 'drum' | 'scramble'
}) {
  const [hovering, setHovering] = useState(false)
  const MotionTag = as === 'span' ? motion.span : motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: baseDelay, ease: 'easeOut' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {effect === 'scramble' ? (
        <ScrambleText text={text} trigger={hovering} style={{ cursor: 'pointer' }} />
      ) : (
        <DrumText text={text} hovering={hovering} style={{ cursor: 'pointer' }} />
      )}
    </MotionTag>
  )
}

export function AnimatedLines({
  lines,
  className,
  style,
  lineClassName,
  lineStyle,
  as: Tag = 'div',
  baseDelay = 0,
  isInView,
}: {
  lines: string[]
  className?: string
  style?: CSSProperties
  lineClassName?: string
  /** merged into each line wrapper - e.g. a negative marginBottom to cancel the descender padding */
  lineStyle?: CSSProperties
  as?: ElementType
  baseDelay?: number
  isInView: boolean
}) {
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <div key={i} className={lineClassName} style={{ overflow: 'hidden', paddingBottom: '0.2em', ...lineStyle }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, delay: baseDelay + i * 0.08, ease: 'easeOut' }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </Tag>
  )
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+<>/'

/**
 * Text that "re-rolls" through random characters, left to right, before
 * settling on `text`. Runs whenever `trigger` flips to true (hover) or `text`
 * itself changes. Width is held by an invisible copy of the final text so the
 * surrounding layout never jumps while the random glyphs are showing.
 */
export function ScrambleText({
  text,
  trigger = false,
  className,
  style,
  duration = 450,
}: {
  text: string
  trigger?: boolean
  className?: string
  style?: CSSProperties
  duration?: number
}) {
  const [display, setDisplay] = useState(text)
  const prevText = useRef(text)
  const prevTrigger = useRef(trigger)
  // Kept outside the effect cleanup: releasing hover mid-run flips `trigger`
  // back to false, and cancelling there would freeze the random glyphs.
  const rafRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  useEffect(() => {
    const textChanged = prevText.current !== text
    const triggered = trigger && !prevTrigger.current
    prevText.current = text
    prevTrigger.current = trigger
    if (!textChanged && !triggered) return

    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        const settleAt = (i + 1) / text.length
        out += ch === ' ' || t >= settleAt ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      setDisplay(out)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [text, trigger, duration])

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap', ...style }}>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-label={text} style={{ position: 'absolute', left: 0, top: 0 }}>
        {display}
      </span>
    </span>
  )
}
END CODE src/lib/animations.tsx

Notes on animations.tsx: popIn takes the delay in MILLISECONDS (callers pass e.g. 150 or delay * 1000), while AnimatedLines/HoverLine take baseDelay in SECONDS - keep that asymmetry. DrumText keeps an invisible copy of the text to hold the width, then flips a 3D drum (perspective 240, rotateX 180deg, radius 9px translateZ, 0.5s cubic-bezier(0.65, 0, 0.35, 1)) with no scaling (hoverScale defaults to 1 - buttons, badge and links must not shrink or grow on hover); on mouse leave it snaps back with no transition. ScrambleText re-rolls characters left to right over `duration` ms and keeps the width with an invisible copy; the requestAnimationFrame id lives in a ref and is NOT cancelled when the trigger flips back to false, so releasing hover mid-run still finishes the scramble on the final text.

==================================================
FILE: src/lib/DotMatrix.tsx
Interactive dot-matrix canvas (used by Hero, TickerGrid, WhyUs, CTA).
==================================================

BEGIN CODE src/lib/DotMatrix.tsx
import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Interactive halftone renderer: resamples an image or a looping video into a
 * grid of dots (dot size = brightness, color = source color) and draws it to a
 * canvas. Near the cursor the dots bulge outward and turn into flickering ASCII
 * glyphs; entering the block sends a "re-assembly" wave with glitchy row shifts
 * across it. Coordinates are in design px - the canvas is sized to
 * `width`/`height` and follows whatever transform:scale() its parent applies.
 */

export type DotMatrixCrop = { x: number; y: number; w: number; h: number }

const GLYPHS = ' .,:;_<>/*+=O#SF'
const SUPERSAMPLE = 3

function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

export default function DotMatrix({
  src,
  video = false,
  width,
  height,
  crop,
  flipX = false,
  pitch = 10,
  gain = 1.8,
  threshold = 0.08,
  dotScale = 0.9,
  radius = 110,
  sweepOnEnter = true,
  ambient = false,
  autoSweepMs = 0,
  litOnly = false,
  backdrop,
  backdropFade = 0,
  className,
  style,
}: {
  src: string
  video?: boolean
  width: number
  height: number
  /** region of the source (in source px) to show; default = object-cover */
  crop?: DotMatrixCrop
  flipX?: boolean
  /** distance between dot centers, design px */
  pitch?: number
  /** brightness boost - averaging a source that is itself dotted loses ~half the light */
  gain?: number
  /** cells darker than this stay empty */
  threshold?: number
  /** max dot diameter as a fraction of pitch */
  dotScale?: number
  /** cursor influence radius, design px */
  radius?: number
  sweepOnEnter?: boolean
  /** slow diagonal "breathing" shimmer so the block is alive without a cursor (touch screens) */
  ambient?: boolean
  /** run the re-assembly wave on its own every N ms (0 = only on pointer enter / tap) */
  autoSweepMs?: number
  /**
   * cursor and sweep never light up cells that are empty in the source - set it when
   * the block is layered over other content, otherwise the glyphs around the cursor
   * are drawn (black) on top of whatever lies underneath
   */
  litOnly?: boolean
  /**
   * color that fills the block under the wave's silhouette (every column from its
   * first lit cell down), drawn beneath the dots - darkens whatever lies below
   */
  backdrop?: string
  /** backdrop fades in from transparent over this many design px below the wave's top edge */
  backdropFade?: number
  className?: string
  style?: CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cols = Math.max(1, Math.round(width / pitch))
    const rows = Math.max(1, Math.round(height / pitch))
    const cellW = width / cols
    const cellH = height / rows
    const count = cols * rows

    // per-cell sampled source: brightness 0..1 and a normalized color
    const lum = new Float32Array(count)
    const colR = new Uint8ClampedArray(count)
    const colG = new Uint8ClampedArray(count)
    const colB = new Uint8ClampedArray(count)

    const sampler = document.createElement('canvas')
    sampler.width = cols * SUPERSAMPLE
    sampler.height = rows * SUPERSAMPLE
    const sctx = sampler.getContext('2d', { willReadFrequently: true })
    if (!sctx) return

    // one px per cell; drawn upscaled with smoothing, so the silhouette edge is soft
    const mask = backdrop ? document.createElement('canvas') : null
    if (mask) {
      mask.width = cols
      mask.height = rows
    }

    let source: HTMLImageElement | HTMLVideoElement | null = null
    let sourceReady = false
    let disposed = false

    function sourceSize() {
      if (!source) return { w: 0, h: 0 }
      if (source instanceof HTMLVideoElement) return { w: source.videoWidth, h: source.videoHeight }
      return { w: source.naturalWidth, h: source.naturalHeight }
    }

    function resolveCrop(): DotMatrixCrop {
      if (crop) return crop
      const { w, h } = sourceSize()
      // object-cover
      const s = Math.max(width / w, height / h)
      const cw = width / s
      const ch = height / s
      return { x: (w - cw) / 2, y: (h - ch) / 2, w: cw, h: ch }
    }

    function sample() {
      if (!source || !sctx) return
      const c = resolveCrop()
      sctx.clearRect(0, 0, sampler.width, sampler.height)
      sctx.save()
      if (flipX) {
        sctx.translate(sampler.width, 0)
        sctx.scale(-1, 1)
      }
      sctx.imageSmoothingEnabled = true
      sctx.imageSmoothingQuality = 'high'
      sctx.drawImage(source, c.x, c.y, c.w, c.h, 0, 0, sampler.width, sampler.height)
      sctx.restore()
      const data = sctx.getImageData(0, 0, sampler.width, sampler.height).data
      const rowStride = sampler.width * 4
      const n = SUPERSAMPLE * SUPERSAMPLE
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          let r = 0
          let g = 0
          let b = 0
          for (let sy = 0; sy < SUPERSAMPLE; sy++) {
            let o = (cy * SUPERSAMPLE + sy) * rowStride + cx * SUPERSAMPLE * 4
            for (let sx = 0; sx < SUPERSAMPLE; sx++) {
              const a = data[o + 3] / 255
              r += data[o] * a
              g += data[o + 1] * a
              b += data[o + 2] * a
              o += 4
            }
          }
          r /= n
          g /= n
          b /= n
          const max = Math.max(r, g, b)
          const i = cy * cols + cx
          lum[i] = Math.min(1, (max / 255) * gain)
          if (max > 0) {
            // keep the hue, push it toward full saturation/brightness so dots read vivid
            const k = 255 / max
            colR[i] = r * k
            colG[i] = g * k
            colB[i] = b * k
          }
        }
      }
      if (mask) buildMask()
    }

    function buildMask() {
      const mctx = mask!.getContext('2d')
      if (!mctx) return
      const img = mctx.createImageData(cols, rows)
      for (let cx = 0; cx < cols; cx++) {
        // top edge = first run of 3 lit cells, so stray sparkles above the dune don't count
        let top = rows
        for (let cy = 0; cy < rows - 2; cy++) {
          const i = cy * cols + cx
          if (lum[i] >= threshold && lum[i + cols] >= threshold && lum[i + 2 * cols] >= threshold) {
            top = cy
            break
          }
        }
        const fadeRows = backdropFade / cellH
        for (let cy = top; cy < rows; cy++) {
          const a = fadeRows > 0 ? smoothstep(0, fadeRows, cy - top) : 1
          img.data[(cy * cols + cx) * 4 + 3] = a * 255
        }
      }
      mctx.putImageData(img, 0, 0)
      mctx.globalCompositeOperation = 'source-in'
      mctx.fillStyle = backdrop!
      mctx.fillRect(0, 0, cols, rows)
      mctx.globalCompositeOperation = 'source-over'
    }

    if (video) {
      const v = document.createElement('video')
      v.src = src
      v.muted = true
      v.loop = true
      v.playsInline = true
      v.autoplay = true
      v.crossOrigin = 'anonymous'
      v.addEventListener('loadeddata', () => {
        sourceReady = true
      })
      source = v
    } else {
      const img = new Image()
      img.decoding = 'async'
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (disposed) return
        sourceReady = true
        sample()
        dirty = true
      }
      img.src = src
      source = img
    }

    // pointer state, in design px relative to the canvas
    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, inside: false }
    let hover = 0
    let sweepStart = -1
    let dirty = true
    let visible = false
    let raf = 0
    let lastBucket = -1
    let lastVideoTime = -1
    let lastAmbientTick = -1
    let lastAutoSweep = performance.now()

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((e.clientX - rect.left) / rect.width) * width
      const y = ((e.clientY - rect.top) / rect.height) * height
      const inside = x >= 0 && y >= 0 && x <= width && y <= height
      if (inside && !pointer.inside) {
        if (sweepOnEnter) sweepStart = performance.now()
        if (pointer.sx < -1000) {
          pointer.sx = x
          pointer.sy = y
        }
      }
      pointer.inside = inside
      pointer.x = x
      pointer.y = y
    }
    function onPointerLeaveWindow() {
      pointer.inside = false
    }
    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === 'mouse') return
      const rect = canvas!.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((e.clientX - rect.left) / rect.width) * width
      const y = ((e.clientY - rect.top) / rect.height) * height
      if (x < 0 || y < 0 || x > width || y > height) return
      sweepStart = performance.now()
      pointer.x = pointer.sx = x
      pointer.y = pointer.sy = y
      pointer.inside = true
    }
    function onPointerUp(e: PointerEvent) {
      if (e.pointerType !== 'mouse') pointer.inside = false
    }

    function ensureBackingSize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bw = Math.max(1, Math.round(rect.width * dpr))
      const bh = Math.max(1, Math.round(rect.height * dpr))
      if (canvas!.width !== bw || canvas!.height !== bh) {
        canvas!.width = bw
        canvas!.height = bh
        dirty = true
      }
    }

    function draw(now: number) {
      if (!ctx) return
      ctx.setTransform(canvas!.width / width, 0, 0, canvas!.height / height, 0, 0)
      ctx.clearRect(0, 0, width, height)
      if (mask) {
        ctx.imageSmoothingEnabled = true
        ctx.drawImage(mask, 0, 0, width, height)
      }

      const sweepT = sweepStart < 0 ? -1 : (now - sweepStart) / 700
      const sweeping = sweepT >= 0 && sweepT < 1.4
      const bucket = Math.floor(now / 70)
      const px = pointer.sx
      const py = pointer.sy
      const r2 = radius * radius
      const baseR = Math.min(cellW, cellH) * 0.5 * dotScale
      const glyphSize = Math.min(cellW, cellH) * 1.25
      ctx.font = `${glyphSize}px 'Fragment Mono', ui-monospace, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let cy = 0; cy < rows; cy++) {
        // glitch: during the sweep some rows slide sideways for a moment
        let rowShift = 0
        if (sweeping) {
          const h = hash(cy, bucket)
          if (h < 0.08) rowShift = (hash(cy + 7, bucket) - 0.5) * cellW * 6
        }
        for (let cx = 0; cx < cols; cx++) {
          const i = cy * cols + cx
          const l = lum[i]
          if (litOnly && l < threshold) continue
          let x = (cx + 0.5) * cellW + rowShift
          let y = (cy + 0.5) * cellH

          // cursor influence
          let f = 0
          if (hover > 0.001) {
            const dx = x - px
            const dy = y - py
            const d2 = dx * dx + dy * dy
            if (d2 < r2) {
              const d = Math.sqrt(d2)
              f = hover * (1 - smoothstep(0, radius, d))
              if (d > 0.001) {
                const push = f * cellW * 1.4
                x += (dx / d) * push
                y += (dy / d) * push
              }
            }
          }

          // re-assembly wave, travelling along the diagonal
          let wave = 0
          if (sweeping) {
            const p = (cx / cols + cy / rows) * 0.5
            const front = sweepT - 0.2
            wave = 1 - Math.min(1, Math.abs(p - front) / 0.18)
          }

          let breath = 0
          if (ambient) breath = 0.5 + 0.5 * Math.sin(now / 900 - (cx * 0.35 + cy * 0.2))

          const lit = Math.min(1, l * (0.8 + 0.3 * breath) + f * 0.35 + wave * 0.25)
          if (lit < threshold && f < 0.2 && wave < 0.2) continue

          const r = colR[i]
          const g = colG[i]
          const b = colB[i]
          const shade = 0.45 + 0.55 * lit
          ctx.fillStyle = `rgb(${(r * shade) | 0},${(g * shade) | 0},${(b * shade) | 0})`

          const glyphMode = f > 0.3 || (wave > 0.35 && hash(i, bucket) < wave)
          if (glyphMode && lit >= threshold * 0.5) {
            const flicker = hash(i, bucket) * 0.35
            const gi = Math.min(GLYPHS.length - 1, Math.max(1, Math.floor((lit + flicker) * (GLYPHS.length - 1))))
            ctx.fillText(GLYPHS[gi], x, y)
            continue
          }
          if (lit < threshold) continue
          const rad = baseR * Math.sqrt(lit) * (1 + f * 0.5)
          ctx.beginPath()
          ctx.arc(x, y, rad, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      lastBucket = bucket
    }

    function frame(now: number) {
      raf = 0
      if (disposed || !visible) return
      ensureBackingSize()

      const targetHover = pointer.inside ? 1 : 0
      hover += (targetHover - hover) * 0.12
      if (Math.abs(targetHover - hover) < 0.002) hover = targetHover
      if (pointer.inside) {
        pointer.sx += (pointer.x - pointer.sx) * 0.25
        pointer.sy += (pointer.y - pointer.sy) * 0.25
      }

      if (autoSweepMs > 0 && now - lastAutoSweep > autoSweepMs) {
        lastAutoSweep = now
        sweepStart = now
      }
      const sweeping = sweepStart >= 0 && now - sweepStart < 1000
      const animating = hover > 0.001 || sweeping
      if (source instanceof HTMLVideoElement && sourceReady && source.currentTime !== lastVideoTime) {
        lastVideoTime = source.currentTime
        sample()
        dirty = true
      }
      // glyphs flicker on a 70ms clock, so only redraw when that ticks or something moved
      if (animating && (Math.floor(now / 70) !== lastBucket || pointer.inside)) dirty = true
      // ambient shimmer only needs ~30fps
      if (ambient && Math.floor(now / 33) !== lastAmbientTick) {
        lastAmbientTick = Math.floor(now / 33)
        dirty = true
      }
      if (sourceReady && dirty) {
        draw(now)
        dirty = false
      }
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (source instanceof HTMLVideoElement) {
          if (visible) source.play().catch(() => {})
          else source.pause()
        }
        if (visible && !raf) {
          dirty = true
          raf = requestAnimationFrame(frame)
        }
      },
      { rootMargin: '100px' },
    )
    io.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeaveWindow)
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })

    return () => {
      disposed = true
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeaveWindow)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      if (source instanceof HTMLVideoElement) {
        source.pause()
        source.removeAttribute('src')
        source.load()
      }
    }
  }, [src, video, width, height, crop, flipX, pitch, gain, threshold, dotScale, radius, sweepOnEnter, ambient, autoSweepMs, litOnly, backdrop, backdropFade])

  return <canvas ref={canvasRef} className={className} style={{ width, height, display: 'block', ...style }} />
}
END CODE src/lib/DotMatrix.tsx

Notes on DotMatrix.tsx: it resamples the source into a grid (pitch = distance between dot centers in design px, 3x supersampling), dot radius = brightness, dot color = source hue pushed to full saturation. Near the cursor (radius prop) dots are pushed outward and switch to flickering ASCII glyphs from ' .,:;_<>/*+=O#SF' on a 70ms clock; entering the block starts a 700ms diagonal re-assembly wave where ~8% of rows jump sideways. `crop` selects a region of the source in source pixels, otherwise object-cover. The canvas is sized in design px and inherits the parent's transform: scale(); the backing store follows the real on-screen size (capped at 2x DPR). It only animates while on screen (IntersectionObserver) and pauses a video source off screen. litOnly: cells that are empty in the source (below threshold) are skipped entirely, so the cursor glyphs and the sweep never draw over content underneath the block - CTA's desktop wave needs it because it sits above the dashboard. backdrop (a CSS color) + backdropFade (design px): before the dots, every column is filled with that color from the wave's top edge (the first run of 3 lit cells, so stray sparkles above the dune don't count) down to the bottom, drawn from a one-px-per-cell mask upscaled with smoothing so the edge is soft; within backdropFade px below the top edge the fill fades in from transparent (smoothstep). This darkens whatever lies under the wave (in CTA: the lower part of the dashboard) without holes between the dune's dots.
CRITICAL DETAIL - DO NOT DROP: the sources are remote URLs, so the code sets img.crossOrigin = 'anonymous' for images and v.crossOrigin = 'anonymous' for the video before setting src. Without it the canvas is tainted and getImageData throws, and every dot-matrix block stays empty. Keep both lines.

==================================================
FILE: src/lib/FlowGradient.tsx
WebGL flowing gradient (used by Pricing).
==================================================

BEGIN CODE src/lib/FlowGradient.tsx
import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Slowly flowing warm gradient (domain-warped noise in a fragment shader) that
 * reacts to the cursor: the colors swirl around the pointer and a soft hot spot
 * follows it. Raw WebGL, no three.js. Fills its parent (position absolute,
 * inset 0); put a static fallback image underneath for browsers without WebGL.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  // swirl around the pointer
  vec2 d = p - m;
  float dist = length(d);
  float infl = uHover * exp(-dist * dist * 6.0);
  float ang = infl * 2.2;
  p = m + mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * d;

  float t = uTime * 0.06;
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.4 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.4 + 3.0 * q + vec2(8.3, 2.8) - t * 0.9));
  float f = fbm(p * 1.4 + 3.0 * r);

  vec3 deep   = vec3(0.23, 0.09, 0.04);
  vec3 brown  = vec3(0.40, 0.19, 0.08);
  vec3 orange = vec3(0.62, 0.32, 0.10);
  vec3 gold   = vec3(0.72, 0.50, 0.16);

  vec3 col = mix(deep, brown, smoothstep(0.15, 0.55, f));
  col = mix(col, orange, smoothstep(0.35, 0.8, length(q)));
  col = mix(col, gold, smoothstep(0.55, 0.95, r.x) * 0.7);
  col = mix(col, deep, smoothstep(0.55, 0.9, q.y) * 0.6);

  // warm hot spot under the cursor
  col += vec3(0.35, 0.18, 0.05) * infl * 0.8;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function FlowGradient({ className, style }: { className?: string; style?: CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      canvas.style.display = 'none'
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uHover = gl.getUniformLocation(program, 'uHover')

    // pointer in 0..1 canvas space (y up, like gl_FragCoord), smoothed every frame
    const target = { x: 0.5, y: 0.5, inside: false }
    const mouse = { x: 0.5, y: 0.5 }
    let hover = 0
    let visible = false
    let raf = 0
    const start = performance.now()

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      target.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      if (target.inside) {
        target.x = x
        target.y = y
      }
    }

    function frame(now: number) {
      raf = 0
      if (!visible) return
      const rect = canvas!.getBoundingClientRect()
      // a soft gradient needs no retina resolution; keep the fragment cost low
      const bw = Math.max(1, Math.round(rect.width))
      const bh = Math.max(1, Math.round(rect.height))
      if (canvas!.width !== bw || canvas!.height !== bh) {
        canvas!.width = bw
        canvas!.height = bh
        gl!.viewport(0, 0, bw, bh)
      }
      hover += ((target.inside ? 1 : 0) - hover) * 0.05
      mouse.x += (target.x - mouse.x) * 0.06
      mouse.y += (target.y - mouse.y) * 0.06

      gl!.uniform2f(uRes, bw, bh)
      gl!.uniform1f(uTime, (now - start) / 1000)
      gl!.uniform2f(uMouse, mouse.x, mouse.y)
      gl!.uniform1f(uHover, hover)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }} />
}
END CODE src/lib/FlowGradient.tsx

Notes on FlowGradient.tsx: raw WebGL (no three.js) full-quad fragment shader, domain-warped fbm noise in deep brown -> brown -> orange -> gold, slowly flowing (time * 0.06), with a swirl and a warm hot spot that follow the cursor (smoothed at 0.06 per frame). It fills its parent (position absolute, inset 0) and hides itself if WebGL is missing, so the static blurred image under it acts as the fallback. Keep the GLSL strings byte for byte.

==================================================
6. ROOT COMPOSITION FILE - EXACT CODE
==================================================

==================================================
FILE: src/App.tsx
Root component.
==================================================

BEGIN CODE src/App.tsx
import Hero from './sections/Hero'
import TickerGrid from './sections/TickerGrid'
import Pricing from './sections/Pricing'
import WhyUs from './sections/WhyUs'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <Hero />
      <div className="bg-[#08090b]" style={{ height: '10vh' }} />
      <TickerGrid />
      <Pricing />
      <WhyUs />
      <CTA />
      <Footer />
    </>
  )
}

export default App
END CODE src/App.tsx

Render order is exactly: Hero, a 10vh-tall spacer div with background #08090b, TickerGrid, Pricing, WhyUs, CTA, Footer. The same order as the imports. The spacer is intentional (breathing room under the hero); the Footer trims its own top by the same 10vh (see Footer notes).

==================================================
7. STRUCTURAL SECTIONS, IN RENDER ORDER - EXACT CODE
==================================================

==================================================
FILE: src/sections/Hero.tsx
Section 1: Hero (desktop + MobileHero).
==================================================

BEGIN CODE src/sections/Hero.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const heroGlow = 'https://qclay.design/lovable/kraken/hero-glow.mp4'
const krakenMark = 'https://qclay.design/lovable/kraken/hero-kraken-mark.svg'
import PortfolioDashboard from './PortfolioDashboard'
import { popIn, AnimatedLines, DrumText, HoverLine, ScrambleText } from '../lib/animations'
import DotMatrix from '../lib/DotMatrix'

const DESIGN_WIDTH = 1512
const DESIGN_HEIGHT = 935

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

const MOBILE_DESIGN_WIDTH = 420

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

const navLinks = ['Benefits', 'Workflows', 'Pricing', 'Refer']

function MobileNavLink({ label, onSelect }: { label: string; onSelect: () => void }) {
  const [hovering, setHovering] = useState(false)
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="border-b border-white/10 px-[16px] py-[14px] text-left text-[15px] text-white/80 last:border-b-0"
      style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.6px' }}
    >
      <ScrambleText text={label} trigger={hovering} />
    </button>
  )
}

function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M1 5.5H10M10 5.5L6.5 2M10 5.5L6.5 9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Crosshair({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.span
      className="absolute"
      style={{ left: x - 7.5, top: y - 7.5, width: 15, height: 15 }}
      {...popIn(true, delay)}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#969696]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#969696]" />
    </motion.span>
  )
}

function GuideBand({ top, lineDelay = 0, fadeDelay = 0 }: { top: number; lineDelay?: number; fadeDelay?: number }) {
  const left = 58
  const width = 1394
  const height = 40
  return (
    <>
      {/* top/bottom border lines drawn in */}
      <motion.span
        className="absolute h-px bg-white/20"
        style={{ left, top }}
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: lineDelay }}
      />
      <motion.span
        className="absolute h-px bg-white/20"
        style={{ left, top: top + height }}
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: lineDelay + 0.1 }}
      />
      {/* diagonal hatch texture (CSS pattern, not SVG) — fades in with a slide */}
      <motion.div
        className="absolute"
        style={{
          left,
          top,
          width,
          height,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 9px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: fadeDelay }}
      />
      <Crosshair x={left} y={top} delay={lineDelay * 1000} />
      <Crosshair x={left} y={top + height} delay={(lineDelay + 0.1) * 1000} />
      <Crosshair x={left + width} y={top} delay={lineDelay * 1000} />
      <Crosshair x={left + width} y={top + height} delay={(lineDelay + 0.1) * 1000} />
    </>
  )
}

function CornerBrackets() {
  const corner = 'absolute h-[5px] w-[5px] border-white/50'
  return (
    <>
      <span className={`${corner} -left-px -top-px border-l border-t`} />
      <span className={`${corner} -bottom-px -left-px border-b border-l`} />
      <span className={`${corner} -right-px -top-px border-r border-t`} />
      <span className={`${corner} -bottom-px -right-px border-b border-r`} />
    </>
  )
}

function ScheduleDemoButton({
  x,
  y,
  width,
  delay = 0,
}: {
  x: number
  y: number
  width: number
  delay?: number
}) {
  const [hovering, setHovering] = useState(false)
  return (
    <motion.div
      className="absolute flex h-[30px] items-center justify-center gap-[7px] bg-white px-[9px]"
      style={{ left: x, top: y, width }}
      {...popIn(true, delay)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <DrumText
        text="Schedule a Demo"
        hovering={hovering}
        className="whitespace-nowrap text-[14px] font-medium text-black"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
      />
      <span className="h-[16px] w-px bg-black/10" />
      <ArrowRight color="black" />
    </motion.div>
  )
}

function ContactUsButton({
  x,
  y,
  width,
  delay = 0,
}: {
  x: number
  y: number
  width: number
  delay?: number
}) {
  const [hovering, setHovering] = useState(false)
  return (
    <motion.div
      className="absolute flex h-[30px] items-center justify-center border border-white/10 bg-white/5 px-[9px]"
      style={{ left: x, top: y, width }}
      {...popIn(true, delay)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CornerBrackets />
      <DrumText
        text="Contact us"
        hovering={hovering}
        className="whitespace-nowrap text-[14px] font-medium text-white"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
      />
    </motion.div>
  )
}

const CHROME_BAR_HEIGHT = 28
// PortfolioDashboard's canvas is 718.4 tall, but real content (through the Open
// Positions table) ends around y≈511 — the rest is empty background. Crop to
// this height instead of the full canvas so no blank space shows below the card.
const DASHBOARD_CROP_HEIGHT = 535

function MobileHero() {
  const mobile = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const [badgeHovering, setBadgeHovering] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const contentWidth = MOBILE_DESIGN_WIDTH - 40
  const windowInset = 14
  const dashboardWidth = contentWidth - windowInset * 2
  const dashboardScale = dashboardWidth / 948
  const windowHeight = CHROME_BAR_HEIGHT + DASHBOARD_CROP_HEIGHT * dashboardScale + windowInset
  // dot-matrix glow video behind the window, edge to edge, from 60px under its
  // top edge down through the 20px bottom padding
  const glowTop = 60
  const glowHeight = windowHeight - glowTop + 20

  return (
    <section className="relative block w-full overflow-hidden lg:hidden">
      <div
        ref={mobile.outerRef}
        className="relative w-full overflow-hidden"
        style={{
          height: mobile.naturalHeight * mobile.scale,
          background: 'linear-gradient(180deg, #08090B 0%, #7B3627 62.5%, #B16D3C 100%)',
        }}
      >
        <div
          ref={mobile.innerRef}
          className="absolute left-0 top-0 flex flex-col"
          style={{
            width: MOBILE_DESIGN_WIDTH,
            transform: `scale(${mobile.scale})`,
            transformOrigin: 'top left',
            padding: '20px',
          }}
        >
          {/* nav */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <img src={krakenMark} alt="" width={28} height={21} />
              <span
                className="ml-[14px] text-[19px] font-medium text-white"
                style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.38px' }}
              >
                Kraken
              </span>
            </div>
            <button
              type="button"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-[40] flex h-[36px] w-[36px] items-center justify-center border border-white/15 bg-white/5"
            >
              <motion.span
                className="absolute h-px w-[16px] bg-white/70"
                style={{ left: 10, right: 10 }}
                animate={menuOpen ? { top: 17, rotate: 45 } : { top: 14, rotate: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.span
                className="absolute h-px w-[16px] bg-white/70"
                style={{ left: 10, right: 10 }}
                animate={menuOpen ? { top: 17, rotate: -45 } : { top: 20, rotate: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute inset-x-0 top-full z-30 mt-[10px] flex flex-col overflow-hidden border border-white/10 bg-[#0c0d10]/95 backdrop-blur-[20px]"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {navLinks.map((label) => (
                    <MobileNavLink key={label} label={label} onSelect={() => setMenuOpen(false)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* badge */}
          <motion.div
            className="mt-[28px] inline-flex w-fit items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
            {...popIn(true, 50)}
            onMouseEnter={() => setBadgeHovering(true)}
            onMouseLeave={() => setBadgeHovering(false)}
          >
            <span
              className="h-[6px] w-[6px] shrink-0"
              style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
            />
            <DrumText
              text="Smarter Crypto Trading"
              hovering={badgeHovering}
              className="text-[12px] font-medium uppercase text-white/80"
              style={{ fontFamily: 'var(--font-display)' }}
            />
          </motion.div>

          {/* headline */}
          <AnimatedLines
            as="h1"
            lines={['Extend your reach', 'across every market.']}
            isInView={true}
            lineStyle={{ marginBottom: '-0.2em' }}
            className="mt-[16px] font-medium text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 34,
              lineHeight: '36px',
              letterSpacing: '-1px',
            }}
          />

          {/* description */}
          <AnimatedLines
            as="p"
            lines={[
              'Kraken gives you more reach across the market — powerful tools for trading, analytics, automation, risk management, and portfolio control, all working together.',
            ]}
            isInView={true}
            className="mt-[14px] text-[14px] font-medium text-white/80"
            style={{ fontFamily: 'var(--font-display)', lineHeight: '20px' }}
          />

          {/* CTAs */}
          <div className="mt-[20px] flex items-center gap-[10px]">
            <div className="relative" style={{ width: 151, height: 30 }}>
              <ScheduleDemoButton x={0} y={0} width={151} delay={100} />
            </div>
            <div className="relative" style={{ width: contentWidth - 151 - 10, height: 30 }}>
              <ContactUsButton x={0} y={0} width={contentWidth - 151 - 10} delay={150} />
            </div>
          </div>

          {/* glass card over the dot-matrix glow */}
          <div className="relative mt-[24px]">
          <motion.div
            className="absolute"
            style={{ left: -20, top: glowTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          >
            <DotMatrix
              src={heroGlow}
              video
              width={MOBILE_DESIGN_WIDTH}
              height={glowHeight}
              pitch={8}
              gain={1.9}
              radius={80}
              ambient
              autoSweepMs={6000}
            />
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-[9px] border border-white/15 backdrop-blur-[27px]"
            style={{
              width: contentWidth,
              height: windowHeight,
              background: 'rgba(255,255,255,0.06)',
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute flex items-center gap-[4px]" style={{ left: 14, top: 11 }}>
              <span className="h-[7px] w-[7px] rounded-full bg-white" />
              <span className="h-[7px] w-[7px] rounded-full bg-white/50" />
              <span className="h-[7px] w-[7px] rounded-full bg-white/20" />
            </div>
            <PortfolioDashboard
              x={windowInset}
              y={CHROME_BAR_HEIGHT}
              width={dashboardWidth}
              height={DASHBOARD_CROP_HEIGHT * dashboardScale}
              scale={dashboardScale}
              revealDelay={0.3}
            />
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const [badgeHovering, setBadgeHovering] = useState(false)

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden lg:block"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
          background:
            'linear-gradient(180deg, #08090B 0%, #7B3627 62.5%, #B16D3C 100%)',
        }}
      >
        {/* hero illustration: live dot-matrix render of the glow video, reacts to the cursor */}
        <motion.div
          className="absolute overflow-hidden bg-black"
          style={{ left: 59, top: 461, width: 1394, height: 667 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <DotMatrix src={heroGlow} video width={1394} height={667} pitch={11} gain={1.9} radius={140} />
        </motion.div>

        {/* glow */}
        <div
          className="absolute rounded-full"
          style={{
            left: 177,
            top: 444,
            width: 948.8,
            height: 978.69,
            background: '#FF6215',
            opacity: 0.4,
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: 97.01,
            top: 210.61,
            width: 801.72,
            height: 750.04,
            background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)',
            opacity: 0.3,
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: -86.72,
            top: 625.97,
            width: 651.76,
            height: 669.37,
            background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)',
            opacity: 0.3,
            filter: 'blur(50px)',
          }}
        />

        {/* guide lines */}
        <motion.span
          className="absolute top-0 w-px bg-white/30"
          style={{ left: 58 }}
          initial={{ height: 0 }}
          animate={{ height: DESIGN_HEIGHT }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute top-0 w-px bg-white/30"
          style={{ left: 1452 }}
          initial={{ height: 0 }}
          animate={{ height: DESIGN_HEIGHT }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
        />
        <GuideBand top={87} lineDelay={0.1} fadeDelay={0.15} />
        <GuideBand top={418.75} lineDelay={0.2} fadeDelay={0.25} />

        {/* nav */}
        <div className="absolute flex items-center" style={{ left: 114, top: 24, width: 109, height: 26 }}>
          <motion.img src={krakenMark} alt="" width={34} height={26} {...popIn(true, 0)} />
          <AnimatedLines
            lines={['Kraken']}
            isInView={true}
            className="ml-[19px] text-[23px] font-medium text-white"
            style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.47px' }}
          />
        </div>

        <div className="absolute flex items-center" style={{ left: 308, top: 25, width: 274, height: 24 }}>
          {navLinks.map((label, i) => (
            <HoverLine
              key={label}
              text={label}
              baseDelay={i * 0.06}
              isInView={true}
              effect="scramble"
              className="absolute whitespace-nowrap text-[16px] text-white/70"
              style={{
                left: [0, 77, 170, 239][i],
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.64px',
              }}
            />
          ))}
        </div>

        <ContactUsButton x={1178} y={22} width={84} delay={50} />
        <ScheduleDemoButton x={1274} y={22} width={151} delay={100} />

        {/* headline */}
        <motion.div
          className="absolute inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
          style={{ left: 114, top: 180 }}
          {...popIn(true, 150)}
          onMouseEnter={() => setBadgeHovering(true)}
          onMouseLeave={() => setBadgeHovering(false)}
        >
          <span
            className="h-[6px] w-[6px] shrink-0"
            style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
          />
          <DrumText
            text="Smarter Crypto Trading"
            hovering={badgeHovering}
            className="text-[13px] font-medium uppercase text-white/80"
            style={{ fontFamily: 'var(--font-display)' }}
          />
        </motion.div>

        <AnimatedLines
          as="h1"
          lines={['Extend your reach', 'across every market.']}
          isInView={true}
          lineStyle={{ marginBottom: '-0.2em' }}
          className="absolute font-medium text-white"
          style={{
            left: 114,
            top: 219,
            width: 735,
            fontFamily: 'var(--font-display)',
            fontSize: 62.86,
            lineHeight: '60.34px',
            letterSpacing: '-1.89px',
          }}
        />

        {/* description + CTAs */}
        <AnimatedLines
          as="p"
          lines={[
            'Kraken gives you more reach across the market —',
            'powerful tools for trading, analytics, automation, risk',
            'management, and portfolio control, all working together.',
          ]}
          isInView={true}
          lineClassName="whitespace-nowrap"
          className="absolute text-[16px] font-medium text-white"
          style={{
            left: 1014.59,
            top: 226,
            width: 398.13,
            fontFamily: 'var(--font-display)',
            lineHeight: '20px',
          }}
        />

        <ScheduleDemoButton x={1014.59} y={311} width={151} delay={200} />
        <ContactUsButton x={1177.09} y={311} width={95} delay={250} />

        {/* glass card */}
        <motion.div
          className="absolute rounded-[9px] border border-white/15 backdrop-blur-[27px]"
          style={{ left: 265, top: 518.24, width: 982, height: 589, background: 'rgba(255,255,255,0.06)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <PortfolioDashboard x={282} y={547.24} width={948} height={387} revealDelay={0.45} />
        <motion.div
          className="absolute flex items-center gap-[1.6px]"
          style={{ left: 283, top: 531.24 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-[6.76px] w-[6.76px] rounded-full bg-white" />
          <span className="h-[6.76px] w-[6.76px] rounded-full bg-white/50" />
          <span className="h-[6.76px] w-[6.76px] rounded-full bg-white/20" />
        </motion.div>
      </div>
    </section>
    <MobileHero />
    </>
  )
}
END CODE src/sections/Hero.tsx

Notes on Hero.tsx: desktop canvas 1512x935. Intro choreography with no scroll trigger (plays on load): two vertical guide lines at x=58 and x=1452 grow to full height (0.9s), two hatched guide bands (at y=87 and y=418.75, 1394x40) draw their top/bottom lines (0.8s) then fade in their diagonal hatch, with crosshair markers popping at their corners; the logo and "Kraken" wordmark, nav links (stagger 0.06s), buttons and badge pop in; headline and description lines slide up; the glass card rises at 0.3s, the dashboard inside at 0.45s, and the dot-matrix video block rises last at 1.15s. Nav links re-roll letters on hover (effect="scramble"). The mobile version (MobileHero) has a burger button whose two lines rotate into an X and a dropdown menu with AnimatePresence; the dashboard is cropped to DASHBOARD_CROP_HEIGHT = 535 (the dashboard canvas is 718.4 tall but its content ends around y 511) and scaled to fit the 380px window.
CRITICAL DETAIL - DO NOT DROP: (1) the canvas background linear-gradient(180deg, #08090B 0%, #7B3627 62.5%, #B16D3C 100%); (2) the three blurred glow blobs: #FF6215 opacity 0.4 blur(60px) mix-blend-mode screen, and two brand-gradient blobs at opacity 0.3 blur(50px) - they give the warm orange haze; (3) the GuideBand hatch backgroundImage 'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 9px)' - thin diagonal stripes, not a solid band; (4) the glass card backdrop-blur-[27px] with background rgba(255,255,255,0.06) and border-white/15.

==================================================
FILE: src/sections/PortfolioDashboard.tsx
Dashboard mock rendered inside Hero and CTA.
==================================================

BEGIN CODE src/sections/PortfolioDashboard.tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
const logoS = 'https://qclay.design/lovable/kraken/dashboard-logo-s.svg'
const tmMark = 'https://qclay.design/lovable/kraken/dashboard-tm.svg'
const bellIcon = 'https://qclay.design/lovable/kraken/dashboard-bell.svg'
const userIcon = 'https://qclay.design/lovable/kraken/dashboard-user.svg'
const favChartIcon = 'https://qclay.design/lovable/kraken/dashboard-fav-chart.svg'
const calendarIcon = 'https://qclay.design/lovable/kraken/dashboard-calendar.svg'
const importIcon = 'https://qclay.design/lovable/kraken/dashboard-import.svg'
const chartBars = 'https://qclay.design/lovable/kraken/dashboard-chart-bars.svg'
const chartLine = 'https://qclay.design/lovable/kraken/dashboard-chart-line.svg'

const CANVAS_WIDTH = 948
const CANVAS_HEIGHT = 718.4

const MUTED = '#999ba8'
const ACCENT = '#ff6215'
const HAIRLINE = 'rgba(0,0,0,0.1)'

const EASE = [0.22, 1, 0.36, 1] as const

const ActiveContext = createContext(false)
const useActive = () => useContext(ActiveContext)

/* ---------- animated primitives ---------- */

type TextProps = {
  x: number
  y: number
  w: number
  h: number
  size: number
  lh: number
  color?: string
  weight?: number
  ls?: number
  align?: 'left' | 'center' | 'right'
  vTop?: boolean
  underline?: boolean
  uppercase?: boolean
  delay?: number
  children: ReactNode
}

function T({
  x,
  y,
  w,
  h,
  size,
  lh,
  color = '#000',
  weight = 500,
  ls = -0.1,
  align = 'left',
  vTop,
  underline,
  uppercase,
  delay,
  children,
}: TextProps) {
  const active = useActive()
  const style: CSSProperties = {
    left: x,
    top: y,
    width: w,
    height: h,
    alignItems: vTop ? 'flex-start' : 'center',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    fontSize: size,
    lineHeight: `${lh}px`,
    letterSpacing: `${ls}px`,
    fontWeight: weight,
    color,
    textTransform: uppercase ? 'uppercase' : undefined,
    textDecoration: underline ? 'underline' : undefined,
    textUnderlineOffset: underline ? 2 : undefined,
  }

  if (delay === undefined) {
    return (
      <div className="absolute flex whitespace-nowrap" style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className="absolute flex whitespace-nowrap"
      style={style}
      initial={{ opacity: 0, y: 4 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Box({ style, className = '' }: { style: CSSProperties; className?: string }) {
  return <div className={`absolute ${className}`} style={style} />
}

/** Grows from its centre outwards — horizontal by default, vertical when `vertical`. */
function Line({
  x,
  y,
  w,
  h,
  delay = 0,
  vertical,
  background = HAIRLINE,
}: {
  x: number
  y: number
  w: number
  h: number
  delay?: number
  vertical?: boolean
  background?: string
}) {
  const active = useActive()
  const axis = vertical ? 'scaleY' : 'scaleX'
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width: w, height: h, background }}
      initial={{ [axis]: 0 }}
      animate={active ? { [axis]: 1 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    />
  )
}

/** Scales up from nothing — used for pills, badges and icon buttons. */
function Pop({
  x,
  y,
  w,
  h,
  delay = 0,
  background,
  border,
  origin,
  radius,
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  delay?: number
  background?: string
  border?: string
  origin?: string
  radius?: number
  children?: ReactNode
}) {
  const active = useActive()
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        background,
        border,
        borderRadius: radius,
        transformOrigin: origin,
      }}
      initial={{ scale: 0 }}
      animate={active ? { scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.4, 0.64, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Counts up to `value`, keeping its exact formatting: only the digits are
 * animated, every separator stays where the design put it.
 */
function CountUp({ value, delay = 0, duration = 1.3 }: { value: string; delay?: number; duration?: number }) {
  const active = useActive()
  const digits = value.replace(/\D/g, '')
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!active || !digits) return
    const end = Number(digits)
    const startAt = performance.now() + delay * 1000
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - startAt) / (duration * 1000), 0), 1)
      setShown(Math.round(end * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, digits, delay, duration])

  if (!digits) return <>{value}</>

  const padded = String(shown).padStart(digits.length, '0')
  let i = 0
  const text = value.replace(/\d/g, () => padded[i++])
  return <>{text}</>
}

function Icon({ src, x, y, size }: { src: string; x: number; y: number; size: number }) {
  return <img src={src} alt="" className="absolute" style={{ left: x, top: y, width: size, height: size }} />
}

function Caret({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) {
  return (
    <svg className="absolute" style={{ left: x, top: y }} width={w} height={h} viewBox="0 0 7 7" fill="none">
      <path
        d="M4.9 2.8L3.5 4.2L2.1 2.8"
        stroke={color}
        strokeWidth="0.79"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ---------- nav ---------- */

const navLinks: { label: string; x: number; w: number; active?: boolean }[] = [
  { label: 'My Portfolio', x: 56, w: 46, active: true },
  { label: 'Overview', x: 115.2, w: 37 },
  { label: 'Top Traders', x: 165.3, w: 46 },
  { label: 'My Copy Traders', x: 224.5, w: 65 },
  { label: 'My Favorites', x: 302.7, w: 49 },
]

function NavBar() {
  return (
    <>
      <Box style={{ left: 0, top: 0, width: CANVAS_WIDTH, height: 34, background: '#000' }} />
      <Box
        style={{
          left: 0,
          top: 0,
          width: 36.8,
          height: 34,
          background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)',
        }}
      />
      <img src={logoS} alt="" className="absolute" style={{ left: 11.5, top: 12.6, width: 11.5, height: 9.9 }} />
      <img src={tmMark} alt="" className="absolute" style={{ left: 24.2, top: 9.3, width: 3.8, height: 2.2 }} />

      {navLinks.map((link, i) => (
        <T
          key={link.label}
          x={link.x}
          y={9.3}
          w={link.w}
          h={13}
          size={8.78}
          lh={12.9}
          color={link.active ? '#fff' : 'rgba(255,255,255,0.5)'}
          underline={link.active}
          delay={0.05 + i * 0.05}
        >
          {link.label}
        </T>
      ))}

      <T x={438.6} y={8.8} w={176.2} h={13} size={8.78} lh={12.9} color="rgba(255,255,255,0.5)" delay={0.3}>
        Search Pair...
      </T>
      <Line x={438.6} y={26.2} w={176.2} h={0.82} background="rgba(255,255,255,0.4)" delay={0.3} />

      <Pop
        x={693.3}
        y={7.7}
        w={18.7}
        h={18.7}
        delay={0.4}
        background="rgba(255,255,255,0.15)"
        border="0.55px solid rgba(255,255,255,0.2)"
      >
        <Icon src={bellIcon} x={4.9} y={5} size={8.8} />
      </Pop>
      <Pop
        x={714.2}
        y={7.7}
        w={18.7}
        h={18.7}
        delay={0.45}
        background="rgba(255,255,255,0.15)"
        border="0.55px solid rgba(255,255,255,0.2)"
      >
        <Icon src={userIcon} x={4.9} y={5} size={8.8} />
      </Pop>

      <Pop x={755.3} y={7.7} w={24.6} h={9.4} delay={0.5} background="#fff">
        <T x={3.3} y={2.2} w={18} h={5} size={6.59} lh={9.7} weight={400}>
          Demo
        </T>
      </Pop>
      <T x={783.2} y={9.9} w={29} h={5} size={6.59} lh={9.7} weight={400} color="rgba(255,255,255,0.4)" delay={0.5}>
        Total value
      </T>
      <T x={755.3} y={20.6} w={55} h={5} size={7.69} lh={10} color="#fff" uppercase delay={0.55}>
        <CountUp value="10,000.00" delay={0.55} />
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>&nbsp;USDC</span>
      </T>
      <Caret x={812.5} y={19.8} w={6.6} h={6.6} color="rgba(255,255,255,0.7)" />

      <Pop x={841.5} y={7.7} w={89.6} h={18.7} delay={0.6} background="rgba(255,255,255,0.15)">
        <T x={4.9} y={3.8} w={66} h={11} size={7.69} lh={11.3} ls={-0.08} weight={400} color="#fff" align="center" uppercase>
          Connect wallet
        </T>
        <Box style={{ left: 74.8, top: 1.1, width: 0.55, height: 16.5, background: 'rgba(255,255,255,0.17)' }} />
        <svg className="absolute" style={{ left: 78.6, top: 6.3 }} width={6} height={6} viewBox="0 0 6 6" fill="none">
          <path
            d="M2.3 1.1L4.1 3L2.3 4.9"
            stroke="#fff"
            strokeWidth="1.13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Pop>
    </>
  )
}

/* ---------- header ---------- */

function Header() {
  return (
    <>
      <img src={favChartIcon} alt="" className="absolute" style={{ left: 17.6, top: 46.7, width: 13.2, height: 13.2 }} />
      <T x={37.3} y={48.7} w={69} h={9} size={13.17} lh={19.4} delay={0.15}>
        My Portfolio
      </T>

      <Pop x={787.2} y={48.3} w={91.9} h={17.4} delay={0.25} background="#eeeeee">
        <Icon src={calendarIcon} x={4.4} y={4.3} size={8.8} />
        <T x={18.6} y={2.2} w={54} h={13} size={8.78} lh={12.9}>
          May 1 - May 31
        </T>
        <Caret x={78.1} y={4.3} w={9.3} h={8.8} color="rgba(0,0,0,0.4)" />
      </Pop>

      <Pop x={881.6} y={48.3} w={49.1} h={17.4} delay={0.3} background="#eeeeee">
        <Icon src={importIcon} x={4.4} y={4.3} size={8.8} />
        <T x={18.6} y={2.2} w={26} h={13} size={8.78} lh={12.9}>
          Export
        </T>
      </Pop>
    </>
  )
}

/* ---------- portfolio value ---------- */

function PortfolioValue() {
  return (
    <>
      <T x={18.7} y={91.7} w={62} h={15} size={9.88} lh={14.5} color={MUTED} delay={0.35}>
        Portfolio Value
      </T>
      <T x={17.6} y={120.8} w={370} h={74} size={76.85} lh={73.8} ls={-2.31} weight={400} align="center" vTop delay={0.4}>
        <CountUp value="$12,486.075" delay={0.45} duration={1.5} />
      </T>
      <T x={401.2} y={175.8} w={34} h={19} size={13.17} lh={19.4} color={MUTED} delay={0.6}>
        USDT
      </T>
    </>
  )
}

/* ---------- statistics ---------- */

const years: { label: string; x: number; w: number; active?: boolean }[] = [
  { label: '2024', x: 523.1, w: 25, active: true },
  { label: '2025', x: 558, w: 25 },
  { label: '2026', x: 592.9, w: 26 },
]

const stats = [
  {
    label: 'Total P&L',
    x: 523.1,
    labelW: 112.3,
    value: '$1,246.75',
    valueW: 71,
    badge: '+11.09%',
    badgeX: 606.6,
    badgeW: 35.8,
    badgeTextW: 27,
  },
  {
    label: 'ROI',
    x: 669,
    labelW: 105.4,
    value: '+18.42%',
    valueW: 65,
    badge: '+2.8%',
    badgeX: 746.5,
    badgeW: 29.8,
    badgeTextW: 21,
  },
  {
    label: 'Total Invested',
    x: 808.1,
    labelW: 121.3,
    value: '$11,240.00',
    valueW: 81,
    badge: '+8.02%',
    badgeX: 901.6,
    badgeW: 34.8,
    badgeTextW: 26,
  },
]

function Statistics() {
  return (
    <>
      <T x={523.1} y={91.7} w={39} h={15} size={9.88} lh={14.5} color={MUTED} delay={0.35}>
        Statistics
      </T>
      {years.map((year, i) => (
        <T
          key={year.label}
          x={year.x}
          y={113.1}
          w={year.w}
          h={16}
          size={10.98}
          lh={16.1}
          color={year.active ? '#000' : 'rgba(0,0,0,0.4)'}
          underline={year.active}
          delay={0.4 + i * 0.05}
        >
          {year.label}
        </T>
      ))}

      {stats.map((stat, i) => {
        const delay = 0.55 + i * 0.1
        return (
          <div key={stat.label}>
            <T x={stat.x} y={151} w={stat.labelW} h={13} size={8.78} lh={12.9} color="rgba(0,0,0,0.3)" delay={delay}>
              {stat.label}
            </T>
            <T x={stat.x} y={165.1} w={stat.valueW} h={26} size={17.57} lh={25.8} delay={delay + 0.05}>
              <CountUp value={stat.value} delay={delay + 0.1} />
            </T>
            <Pop x={stat.badgeX} y={172.6} w={stat.badgeW} h={11} delay={delay + 0.2} background={ACCENT}>
              <T x={4.4} y={0} w={stat.badgeTextW} h={11} size={7.69} lh={11.3} color="#fff">
                <CountUp value={stat.badge} delay={delay + 0.25} duration={0.9} />
              </T>
            </Pop>
          </div>
        )
      })}

      <Line x={652.2} y={151} w={0.55} h={40.1} vertical delay={0.6} />
      <Line x={791.2} y={151} w={0.55} h={40.1} vertical delay={0.65} />
    </>
  )
}

/* ---------- value chart ---------- */

const ranges = [
  { label: 'All', active: true },
  { label: '1H' },
  { label: '1D' },
  { label: '1W' },
  { label: '1Y' },
]

const axisLabels = [
  { label: '$32.0K', y: 290.9 },
  { label: '$31.8K', y: 311.5 },
  { label: '$31.6K', y: 332 },
  { label: '$31.4K', y: 352.6 },
  { label: '$31.2K', y: 373.2 },
]

const timeLabels = [
  { label: '4:00 PM', x: 17, w: 24 },
  { label: '6:00 PM', x: 66.5, w: 24 },
  { label: '8:00 PM', x: 116, w: 24 },
  { label: '12:00 PM', x: 165.1, w: 26 },
  { label: '4:00 AM', x: 216.3, w: 24 },
  { label: '6:00 AM', x: 265.8, w: 24 },
  { label: '8:00 AM', x: 315.3, w: 24 },
  { label: '10:00 AM', x: 364.7, w: 27 },
  { label: '12:00 AM', x: 416.9, w: 27 },
]

function ValueChart() {
  const active = useActive()
  return (
    <>
      <T x={17} y={245.9} w={123.1} h={15} size={9.88} lh={14.5} color={MUTED} delay={0.7}>
        Value Chart
      </T>
      <T x={17} y={263.1} w={57} h={19} size={13.17} lh={19.4} delay={0.75}>
        <CountUp value="$2,246.24" delay={0.8} duration={1.1} />
      </T>

      {ranges.map((range, i) => (
        <Pop
          key={range.label}
          x={329.7 + i * 27.45}
          y={261.3}
          w={25.3}
          h={15.4}
          delay={0.8 + i * 0.06}
          background={range.active ? '#000' : '#eeeeee'}
        >
          <T x={0} y={0} w={25.3} h={15.4} size={8.78} lh={12.9} align="center" color={range.active ? '#fff' : '#000'}>
            {range.label}
          </T>
        </Pop>
      ))}

      {/* bars + line reveal together, left to right */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ left: 17, top: 307.37, width: 427.5, height: 71.1 }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={active ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
        transition={{ duration: 1.3, delay: 0.95, ease: 'easeInOut' }}
      >
        <img src={chartBars} alt="" className="absolute" style={{ left: 0, top: 0, width: 426.74, height: 70.81 }} />
        <img src={chartLine} alt="" className="absolute" style={{ left: 0.6, top: 23.03, width: 427, height: 49 }} />
      </motion.div>

      {timeLabels.map((time, i) => (
        <T
          key={time.label}
          x={time.x}
          y={386.5}
          w={time.w}
          h={5}
          size={6.59}
          lh={7.9}
          vTop
          color="rgba(0,0,0,0.3)"
          delay={1.1 + i * 0.03}
        >
          {time.label}
        </T>
      ))}

      {axisLabels.map((axis, i) => (
        <T
          key={axis.label}
          x={453.2}
          y={axis.y}
          w={30.9}
          h={5}
          size={6.59}
          lh={7.9}
          align="right"
          vTop
          color="rgba(0,0,0,0.4)"
          delay={1 + i * 0.05}
        >
          {axis.label}
        </T>
      ))}
    </>
  )
}

/* ---------- allocation ---------- */

const allocations = [
  {
    symbol: 'ETH',
    symbolX: 523.1,
    symbolW: 17,
    name: 'Ethereum',
    nameX: 544.5,
    nameW: 28,
    price: '$ 3832,26',
    priceX: 623.2,
    priceW: 30,
    headerY: 319.5,
    box: { x: 523.1, y: 336.3, w: 130.1, h: 50.5 },
    accent: '#000',
    delay: 1.05,
  },
  {
    symbol: 'BTC',
    symbolX: 661.5,
    symbolW: 17,
    name: 'Bitcoin',
    nameX: 682.9,
    nameW: 20,
    price: '$ 6,612,02',
    priceX: 763.1,
    priceW: 29,
    headerY: 275,
    box: { x: 661.5, y: 291.3, w: 130.6, h: 96.1 },
    accent: ACCENT,
    delay: 1.15,
  },
  {
    symbol: 'USDT',
    symbolX: 800.9,
    symbolW: 23,
    name: 'Teher',
    nameX: 828.3,
    nameW: 17,
    price: '$ 0,612,02',
    priceX: 902,
    priceW: 29,
    headerY: 361.2,
    box: { x: 800.9, y: 378, w: 130.1, h: 8.8 },
    accent: '#000',
    delay: 1.25,
  },
]

const HATCH = 'repeating-linear-gradient(337.3deg, rgba(0,0,0,0.1) 0 0.55px, rgba(0,0,0,0) 0.55px 2.03px)'

function Allocation() {
  const active = useActive()
  return (
    <>
      <T x={523.7} y={252} w={46} h={16} size={10.98} lh={16.1} underline delay={0.7}>
        Alocation
      </T>
      <T x={579.6} y={252} w={33} h={16} size={10.98} lh={16.1} color="rgba(0,0,0,0.4)" delay={0.75}>
        Charts
      </T>

      {[657.6, 796.5].map((x, i) => (
        <Line
          key={x}
          x={x}
          y={304.1}
          w={0.55}
          h={82.9}
          vertical
          delay={1 + i * 0.08}
          background={`repeating-linear-gradient(to bottom, ${HAIRLINE} 0 2.2px, rgba(0,0,0,0) 2.2px 4.4px)`}
        />
      ))}

      {allocations.map((coin) => (
        <div key={coin.symbol}>
          <T x={coin.symbolX} y={coin.headerY} w={coin.symbolW} h={13} size={8.78} lh={12.9} weight={700} delay={coin.delay}>
            {coin.symbol}
          </T>
          <T
            x={coin.nameX}
            y={coin.headerY + 1.5}
            w={coin.nameW}
            h={10}
            size={6.59}
            lh={9.7}
            color="rgba(0,0,0,0.4)"
            delay={coin.delay + 0.05}
          >
            {coin.name}
          </T>
          <T
            x={coin.priceX}
            y={coin.headerY + 1.5}
            w={coin.priceW}
            h={10}
            size={6.59}
            lh={9.7}
            align="right"
            delay={coin.delay + 0.05}
          >
            <CountUp value={coin.price} delay={coin.delay + 0.1} duration={1} />
          </T>
          <motion.div
            className="absolute"
            style={{
              left: coin.box.x,
              top: coin.box.y,
              width: coin.box.w,
              height: coin.box.h,
              boxSizing: 'border-box',
              borderTop: `2px solid ${coin.accent}`,
              backgroundColor: 'rgba(238,238,238,0.3)',
              backgroundImage: HATCH,
              transformOrigin: 'bottom',
            }}
            initial={{ scaleY: 0 }}
            animate={active ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.7, delay: coin.delay, ease: EASE }}
          />
        </div>
      ))}
    </>
  )
}

/* ---------- open positions ---------- */

const positionTabs = [
  { label: 'Open Positions', x: 17, w: 66.8, textW: 58, active: true },
  { label: 'Trade History', x: 88.2, w: 59.8, textW: 51 },
  { label: 'Analitics', x: 152.4, w: 41.8, textW: 33 },
]

const positionColumns = [
  { label: 'Crypto', x: 17, y: 450, w: 23 },
  { label: 'P&L (%)', x: 128.4, y: 450.5, w: 26, caret: { x: 155.5, y: 452.7 } },
  { label: 'Risk', x: 268.4, y: 450, w: 15 },
  { label: 'P&L (%)', x: 377.1, y: 448.9, w: 26, caret: { x: 404.2, y: 451.1 } },
  { label: 'P&L (%)', x: 551.7, y: 450, w: 26, caret: { x: 578.8, y: 452.2 } },
  { label: 'Invested $', x: 735.1, y: 450.6, w: 35 },
  { label: 'Action', x: 902.5, y: 450, w: 23 },
]

const positionRows = [
  {
    symbol: 'BTC',
    symbolW: 23,
    name: 'Bitcoin',
    nameX: 44.4,
    nameW: 20,
    change: '+9.10%',
    changeW: 38,
    y: 469.2,
    cells: [469.2, 467.5, 464.8],
    cellX: [123.5, 372.2, 549.5],
    riskY: 476.8,
    invested: '1.3457820',
    delay: 1.4,
  },
  {
    symbol: 'ETH',
    symbolW: 24,
    name: 'Ethereum',
    nameX: 45.4,
    nameW: 28,
    change: '+6.50%',
    changeW: 41,
    y: 492.2,
    cells: [492.2, 490.6, 487.8],
    cellX: [120.2, 368.9, 546.2],
    riskY: 499.9,
    invested: '0.5757932',
    delay: 1.5,
  },
  {
    symbol: 'USDT',
    symbolW: 32,
    name: 'Teher',
    nameX: 53.4,
    nameW: 17,
    change: '+4.11%',
    changeW: 35,
    y: 515.3,
    cells: [515.3, 513.7, 510.9],
    cellX: [126.7, 375.3, 552.5],
    riskY: 523,
    invested: '8.320421',
    delay: 1.6,
  },
  {
    symbol: 'BNB',
    symbolW: 25,
    name: 'BNB',
    nameX: 46.3,
    nameW: 14,
    change: '+8.02%',
    changeW: 41,
    y: 538.3,
    cells: [538.3, 536.7, 534],
    cellX: [121.2, 369.8, 547],
    riskY: 546,
    invested: '2.57572321',
    delay: 1.7,
  },
]

function OpenPositions() {
  return (
    <>
      {positionTabs.map((tab, i) => (
        <Pop
          key={tab.label}
          x={tab.x}
          y={420.5}
          w={tab.w}
          h={17.4}
          delay={1.15 + i * 0.07}
          background={tab.active ? '#000' : '#eeeeee'}
        >
          <T
            x={4.4}
            y={2.2}
            w={tab.textW}
            h={13}
            size={8.78}
            lh={12.9}
            color={tab.active ? '#fff' : 'rgba(0,0,0,0.8)'}
          >
            {tab.label}
          </T>
        </Pop>
      ))}

      <Pop x={718} y={420.5} w={92} h={17.4} delay={1.2} background="#eeeeee">
        <Icon src={calendarIcon} x={4.4} y={4.3} size={8.8} />
        <T x={18.7} y={2.2} w={54} h={13} size={8.78} lh={12.9}>
          May 1 - May 31
        </T>
        <Caret x={78.3} y={4.3} w={9.3} h={8.8} color="rgba(0,0,0,0.4)" />
      </Pop>

      <Pop x={814.4} y={420.5} w={62.9} h={17.4} delay={1.25} background="#eeeeee">
        <T x={4.4} y={2.2} w={29} h={13} size={8.78} lh={12.9} color="rgba(0,0,0,0.4)">
          Sort By
        </T>
        <T x={38.3} y={2.2} w={10} h={13} size={8.78} lh={12.9}>
          All
        </T>
        <Caret x={49.2} y={4.3} w={9.3} h={8.8} color="rgba(0,0,0,0.4)" />
      </Pop>

      <Pop x={881.7} y={420.5} w={48.8} h={17.4} delay={1.3} background="#eeeeee">
        <Icon src={importIcon} x={4.4} y={4.3} size={8.8} />
        <T x={18.6} y={2.2} w={26} h={13} size={8.78} lh={12.9}>
          Export
        </T>
      </Pop>

      {positionColumns.map((column, i) => (
        <div key={`${column.label}-${column.x}`}>
          <T
            x={column.x}
            y={column.y}
            w={column.w}
            h={11}
            size={7.69}
            lh={11.3}
            color="rgba(0,0,0,0.4)"
            delay={1.3 + i * 0.04}
          >
            {column.label}
          </T>
          {column.caret && <Caret x={column.caret.x} y={column.caret.y} w={9.3} h={8.8} color="rgba(0,0,0,0.4)" />}
        </div>
      ))}
      <Line x={17} y={465.3} w={914} h={0.55} delay={1.3} />

      {positionRows.map((row) => (
        <div key={row.symbol}>
          <T x={17} y={row.y} w={row.symbolW} h={18} size={12.08} lh={17.8} weight={700} delay={row.delay}>
            {row.symbol}
          </T>
          <T
            x={row.nameX}
            y={row.y + 4}
            w={row.nameW}
            h={10}
            size={6.59}
            lh={9.7}
            color="rgba(0,0,0,0.4)"
            delay={row.delay + 0.05}
          >
            {row.name}
          </T>
          {row.cellX.map((x, i) => (
            <T
              key={x}
              x={x}
              y={row.cells[i]}
              w={row.changeW}
              h={18}
              size={12.08}
              lh={17.8}
              align="right"
              delay={row.delay + 0.05 + i * 0.05}
            >
              <CountUp value={row.change} delay={row.delay + 0.1 + i * 0.05} duration={0.9} />
            </T>
          ))}
          {[0, 1, 2].map((i) => (
            <Pop
              key={i}
              x={260.7 + i * 9.9}
              y={row.riskY}
              w={8.2}
              h={1.6}
              delay={row.delay + 0.15 + i * 0.05}
              background={i === 0 ? '#121212' : 'rgba(18,18,18,0.2)'}
            />
          ))}
          <T
            x={700}
            y={row.y}
            w={70.4}
            h={18}
            size={12.08}
            lh={17.8}
            ls={0}
            weight={400}
            align="right"
            delay={row.delay + 0.2}
          >
            {row.invested}
          </T>
          <Pop
            x={896.4}
            y={row.y + 2.2}
            w={32.9}
            h={12.1}
            delay={row.delay + 0.25}
            border="0.55px solid rgba(0,0,0,0.2)"
            radius={999}
          >
            <T x={0} y={0} w={32.9} h={12.1} size={7.69} lh={11.3} align="center">
              End
            </T>
          </Pop>
          <Line x={17} y={row.y + 18.7} w={914} h={0.55} delay={row.delay} />
        </div>
      ))}
    </>
  )
}

/* ---------- card ---------- */

type DashboardProps = {
  x: number
  y: number
  width: number
  height: number
  scale?: number
  radius?: number
  zIndex?: number
  revealDelay?: number
}

export default function PortfolioDashboard({
  x,
  y,
  width,
  height,
  scale = 1,
  radius = 7.11,
  zIndex,
  revealDelay = 0,
}: DashboardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="absolute overflow-hidden"
      style={{ left: x, top: y, width, height, borderRadius: radius, background: '#fbfbfb', zIndex }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: revealDelay, ease: EASE }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: 'var(--font-display)',
        }}
      >
        <ActiveContext.Provider value={active}>
          <NavBar />
          <Header />
          <Line x={17.57} y={71.91} w={912.87} h={0.55} delay={0.3} />
          <PortfolioValue />
          <Statistics />
          <Line x={17.02} y={221.77} w={912.87} h={0.55} delay={0.65} />
          <ValueChart />
          <Allocation />
          <OpenPositions />
        </ActiveContext.Provider>
      </div>
    </motion.div>
  )
}
END CODE src/sections/PortfolioDashboard.tsx

Notes on PortfolioDashboard.tsx: a light (#fbfbfb) trading dashboard drawn on its own 948x718.4 canvas with absolute px coordinates, scaled by the `scale` prop (1 in the desktop hero, 1067.9 / 948 in the desktop CTA, window width / 948 on mobile). It starts animating when 20% is in view (ActiveContext): texts fade up 4px with individual delays, hairlines grow from their center (scaleX/scaleY), pills/badges/icon buttons pop with an overshoot ease [0.34, 1.4, 0.64, 1], all numbers count up keeping their formatting, the value chart reveals left to right with clip-path inset(0 100% 0 0) -> inset(0 0% 0 0) over 1.3s, and the allocation bars grow up from the bottom. The value chart has a time axis under it (4:00 PM ... 12:00 AM, black/30). The Open Positions block has, on the right of its tabs, three #eeeeee pills: "May 1 - May 31" with calendar icon and caret, "Sort By All" with caret, "Export" with import icon; the table has columns Crypto, P&L (%), Risk, P&L (%), P&L (%), Invested $, Action and four rows BTC, ETH, USDT, BNB, each with an Invested $ value (weight 400, right-aligned) and a round "End" pill (0.55px black/20 border). The typos "Alocation", "Teher", "Analitics" are in the design - keep them.
CRITICAL DETAIL - DO NOT DROP: HATCH = 'repeating-linear-gradient(337.3deg, rgba(0,0,0,0.1) 0 0.55px, rgba(0,0,0,0) 0.55px 2.03px)' on the allocation bars (fine diagonal hatching over rgba(238,238,238,0.3) with a 2px colored top border), the dashed vertical dividers 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.1) 0 2.2px, rgba(0,0,0,0) 2.2px 4.4px)', and the black nav bar's gradient logo tile linear-gradient(180deg, #FF6215 0%, #FFF28E 100%).

==================================================
FILE: src/sections/TickerGrid.tsx
Section 2: TickerGrid (after the 10vh spacer).
==================================================

BEGIN CODE src/sections/TickerGrid.tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, animate } from 'framer-motion'
const octopusTexture = 'https://qclay.design/lovable/kraken/tickers-octopus-texture.webp'
const arrowRightChunky = 'https://qclay.design/lovable/kraken/tickers-arrow-right-chunky.svg'
const arrowLeftChunky = 'https://qclay.design/lovable/kraken/tickers-arrow-left-chunky.svg'
const swapIcon = 'https://qclay.design/lovable/kraken/tickers-swap-icon.svg'
const chevronDown = 'https://qclay.design/lovable/kraken/tickers-chevron-down.svg'
import { popIn, AnimatedLines, DrumText, ScrambleText } from '../lib/animations'
import DotMatrix, { type DotMatrixCrop } from '../lib/DotMatrix'
import TickerCells, { type CellRect } from './TickerCells'

const TEXT_STEP = 0.03

function CountUpNumber({
  value,
  decimals = 0,
  isInView,
  delay = 0,
  duration = 1,
  className,
  style,
}: {
  value: number
  decimals?: number
  isInView: boolean
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (!isInView) return
    if (!started.current) {
      started.current = true
      prevValue.current = value
      const controls = animate(0, value, {
        duration,
        delay,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(v),
      })
      return () => controls.stop()
    }
    if (prevValue.current !== value) {
      const from = prevValue.current
      prevValue.current = value
      const controls = animate(from, value, {
        duration: 0.4,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(v),
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration, delay])

  return (
    <span className={className} style={style}>
      {display.toFixed(decimals)}
    </span>
  )
}

const DESIGN_WIDTH = 1545
const DESIGN_HEIGHT = 922

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

const MOBILE_DESIGN_WIDTH = 420

function MobileCoinChip({ label }: { label: string }) {
  return (
    <span
      className="whitespace-nowrap border border-white/10 bg-white/5 px-[9px] py-[6px] text-[12px] font-medium text-white/60"
      style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.36px' }}
    >
      {label}
    </span>
  )
}

const vLines = [117, 243, 369, 495, 622, 748, 873, 1000, 1126, 1252, 1378]
const hLines = [0, 114.5, 229, 343.5, 458, 572.5, 687, 801.5, 916]

const coinLabels = [
  { label: 'USDC', x: 218, y: 103 },
  { label: 'BTC', x: 733, y: 103 },
  { label: 'DOGE', x: 1100, y: 103 },
  { label: 'USDC', x: 1495, y: 103 },
  { label: 'ETH', x: 353, y: 217 },
  { label: 'EOS', x: 988, y: 217 },
  { label: 'SOL', x: 1362, y: 217 },
  { label: 'USDC', x: 344, y: 561 },
  { label: 'ETH', x: 102, y: 677 },
  { label: 'XLM', x: 1235, y: 677 },
  { label: 'USDC', x: 723, y: 790 },
  { label: 'BTC', x: 1111, y: 790 },
]

// each tile shows a different part of the 450x562 tentacle texture (crops keep
// the tile's ~1.1 aspect), so the four blocks don't read as the same picture
const textureTiles: { x: number; y: number; crop: DotMatrixCrop; flipX?: boolean }[] = [
  { x: 1127.1, y: 229.8, crop: { x: 190, y: 20, w: 260, h: 236 } },
  { x: 370, y: 1, crop: { x: 20, y: 250, w: 230, h: 208 }, flipX: true },
  { x: 244, y: 688, crop: { x: 0, y: 360, w: 225, h: 204 } },
  { x: 1379, y: 802.5, crop: { x: 225, y: 300, w: 225, h: 204 } },
]

const TEXTURE_TILE_WIDTH = 125.38
const TEXTURE_TILE_HEIGHT = 113.6

// empty grid cells that react to the cursor: edges of the drawn grid, minus
// the swap widget and the texture tiles
const CELL_COL_EDGES = [0, ...vLines, DESIGN_WIDTH]
const CELL_BLOCKED: CellRect[] = [
  { x: 513, y: 258, w: 486, h: 385 },
  ...textureTiles.map((t) => ({ x: t.x, y: t.y, w: TEXTURE_TILE_WIDTH, h: TEXTURE_TILE_HEIGHT })),
]

const BLIND_ROWS = 4
const BLIND_COLOR = '#08090b'

function ImageBlinds({
  left,
  top,
  width,
  height,
  isInView,
  baseDelay = 0,
  leftExtraBleed = 0,
  rightExtraBleed = 0,
  bottomExtraBleed = 0,
}: {
  left: number
  top: number
  width: number
  height: number
  isInView: boolean
  baseDelay?: number
  leftExtraBleed?: number
  rightExtraBleed?: number
  bottomExtraBleed?: number
}) {
  const rowHeight = height / BLIND_ROWS
  return (
    <>
      {Array.from({ length: BLIND_ROWS }).map((_, i) => {
        const isFirst = i === 0
        const isLast = i === BLIND_ROWS - 1
        // Outer top/bottom edges are trimmed 1px inward (no bleed past the image).
        // Internal seams between rows keep a 1px bleed each way so rounding
        // never leaves a hairline gap between adjacent rows.
        const rowTop = top + i * rowHeight + (isFirst ? 1 : -1)
        const rowBottom = top + (i + 1) * rowHeight + (isLast ? -1 + bottomExtraBleed : 1)
        const rowLeft = left + 1 - leftExtraBleed
        const rowRight = left + width - 1 + rightExtraBleed
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: rowLeft,
              top: rowTop,
              width: rowRight - rowLeft,
              height: rowBottom - rowTop,
              backgroundColor: BLIND_COLOR,
              transformOrigin: 'bottom',
            }}
            initial={{ scaleY: 1 }}
            animate={isInView ? { scaleY: 0 } : undefined}
            transition={{ duration: 0.5, delay: baseDelay + i * 0.12, ease: 'easeOut' }}
          />
        )
      })}
    </>
  )
}

const sparkleDotsLeft = [
  { x: 508, y: 578, s: 2 },
  { x: 523, y: 615, s: 1 },
  { x: 548, y: 596, s: 1 },
  { x: 562, y: 582, s: 1 },
  { x: 562, y: 621, s: 1 },
  { x: 580, y: 601, s: 1 },
  { x: 601, y: 610, s: 1 },
  { x: 621, y: 599, s: 1 },
  { x: 605, y: 583, s: 1 },
  { x: 621, y: 628, s: 1 },
  { x: 647, y: 577, s: 1 },
]
const sparkleDotsRight = sparkleDotsLeft.map((d) => ({ ...d, x: d.x + 154 }))

function CoinLabel({
  label,
  x,
  y,
  isInView,
  delay = 0,
}: {
  label: string
  x: number
  y: number
  isInView: boolean
  delay?: number
}) {
  return (
    <motion.div
      className="absolute whitespace-nowrap bg-[#08090b] px-[9px] py-[6px] text-[12px] font-medium text-white/60"
      style={{ left: x, top: y, fontFamily: 'var(--font-display)', letterSpacing: '-0.36px' }}
      {...popIn(isInView, delay)}
    >
      {label}
    </motion.div>
  )
}

const mobileChipLabels = ['USDC', 'BTC', 'DOGE', 'ETH', 'SOL', 'XLM']

const SWAP_COINS = ['USDC', 'ETH', 'BTC', 'SOL']

const SWAP_ICON_HOVER = 'transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:rotate-180 group-active:scale-90'

const CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const COIN_HOLD_MS = 2600
const CODE_HOLD_MS = 1400

function randomCode(length: number) {
  let out = ''
  for (let i = 0; i < length; i++) out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  return out
}

/**
 * Loops a coin label between two resting states: the ticker (USDC) and a
 * random "encrypted" code of the same length (FJDS) - feed the result to
 * ScrambleText so every switch re-rolls the letters: USDC -> FJDS -> USDC -> ...
 * Picking another coin restarts the loop from the new ticker.
 */
function useCoinCodeCycle(coin: string) {
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    setCode(null)
    let timer = 0
    const showCoin = () => {
      setCode(null)
      timer = window.setTimeout(showCode, COIN_HOLD_MS)
    }
    const showCode = () => {
      setCode(randomCode(coin.length))
      timer = window.setTimeout(showCoin, CODE_HOLD_MS)
    }
    timer = window.setTimeout(showCode, COIN_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [coin])

  return code ?? coin
}

/** Big coin name beside the swap widget, cycling via useCoinCodeCycle. */
function SideCoinLabel({ coin }: { coin: string }) {
  const [hovering, setHovering] = useState(false)
  const text = useCoinCodeCycle(coin)

  return (
    <span
      className="text-[64px] font-medium text-white"
      style={{ fontFamily: 'var(--font-display)', letterSpacing: '-1.92px' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <ScrambleText text={text} trigger={hovering} duration={600} />
    </span>
  )
}

const COIN_MOCK: Record<string, { amount: number; decimals: number; usd: string }> = {
  USDC: { amount: 210.5, decimals: 1, usd: '$210.50' },
  ETH: { amount: 0.6842, decimals: 4, usd: '$2.481.30' },
  BTC: { amount: 0.0219, decimals: 4, usd: '$1.986.45' },
  SOL: { amount: 1904.61, decimals: 2, usd: '$1.905.19' },
}

function useSwapWidget() {
  const [sellCoin, setSellCoin] = useState('USDC')
  const [buyCoin, setBuyCoin] = useState('SOL')
  const [sellMenuOpen, setSellMenuOpen] = useState(false)
  const [buyMenuOpen, setBuyMenuOpen] = useState(false)
  const sellWrapRef = useRef<HTMLDivElement>(null)
  const buyWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sellMenuOpen && !buyMenuOpen) return
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (sellWrapRef.current?.contains(target)) return
      if (buyWrapRef.current?.contains(target)) return
      setSellMenuOpen(false)
      setBuyMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [sellMenuOpen, buyMenuOpen])

  function swap() {
    setSellCoin(buyCoin)
    setBuyCoin(sellCoin)
  }

  function pickSellCoin(coin: string) {
    if (coin === buyCoin) swap()
    else setSellCoin(coin)
    setSellMenuOpen(false)
  }

  function pickBuyCoin(coin: string) {
    if (coin === sellCoin) swap()
    else setBuyCoin(coin)
    setBuyMenuOpen(false)
  }

  return {
    sellCoin,
    buyCoin,
    sellMock: COIN_MOCK[sellCoin],
    buyMock: COIN_MOCK[buyCoin],
    sellMenuOpen,
    buyMenuOpen,
    sellWrapRef,
    buyWrapRef,
    swap,
    pickSellCoin,
    pickBuyCoin,
    toggleSellMenu: () => {
      setBuyMenuOpen(false)
      setSellMenuOpen((v) => !v)
    },
    toggleBuyMenu: () => {
      setSellMenuOpen(false)
      setBuyMenuOpen((v) => !v)
    },
  }
}

function CoinMenu({
  options,
  onPick,
  width,
}: {
  options: string[]
  onPick: (coin: string) => void
  width: number
}) {
  return (
    <div
      className="absolute left-0 top-[calc(100%+8px)] z-30 border border-white/10 bg-[#151517]"
      style={{ width }}
    >
      {options.map((coin) => (
        <button
          key={coin}
          type="button"
          onClick={() => onPick(coin)}
          className="block w-full px-[9px] py-[8px] text-left text-[16px] font-normal text-white hover:bg-white/10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {coin}
        </button>
      ))}
    </div>
  )
}

export default function TickerGrid() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const mobile = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const textureRef = useRef<HTMLDivElement>(null)
  const textureInView = useInView(textureRef, { once: true, amount: 0.2 })
  const swapRef = useRef<HTMLDivElement>(null)
  const swapInView = useInView(swapRef, { once: true, amount: 0.2 })
  const labelsInView = useInView(canvas.ref, { once: true, amount: 0.1 })
  const mobileSwapRef = useRef<HTMLDivElement>(null)
  const mobileSwapInView = useInView(mobileSwapRef, { once: true, amount: 0.2 })
  const [connectHovering, setConnectHovering] = useState(false)
  const [mobileConnectHovering, setMobileConnectHovering] = useState(false)
  const desktopSwap = useSwapWidget()
  const mobileSwap = useSwapWidget()
  const mobileSellLabel = useCoinCodeCycle(mobileSwap.sellCoin)
  const mobileBuyLabel = useCoinCodeCycle(mobileSwap.buyCoin)

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden bg-[#08090b] lg:block"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* hover trail + unfolding quote cards in the empty cells */}
        <TickerCells
          colEdges={CELL_COL_EDGES}
          rowEdges={hLines}
          width={DESIGN_WIDTH}
          height={DESIGN_HEIGHT}
          blocked={CELL_BLOCKED}
        />

        {/* grid lines: drawn in from their center, expanding both ways */}
        {vLines.map((x, i) => (
          <motion.span
            key={x}
            className="absolute top-0 w-px bg-white/20"
            style={{ left: x, height: DESIGN_HEIGHT }}
            initial={{ scaleY: 0 }}
            animate={labelsInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.04 }}
          />
        ))}
        {hLines.map((y, i) => (
          <motion.span
            key={y}
            className={`absolute left-0 h-px ${i === 0 || i === hLines.length - 1 ? 'bg-white/25' : 'bg-white/20'}`}
            style={{ top: y, width: DESIGN_WIDTH }}
            initial={{ scaleX: 0 }}
            animate={labelsInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: vLines.length * 0.04 + i * 0.04 }}
          />
        ))}

        {/* dedicated, real-sized element used purely for visibility detection */}
        <div
          ref={textureRef}
          className="absolute"
          style={{ left: textureTiles[0].x, top: textureTiles[0].y, width: TEXTURE_TILE_WIDTH, height: TEXTURE_TILE_HEIGHT }}
        />

        {/* decorative texture tiles */}
        {textureTiles.map((t, i) => (
          <div key={i}>
            <DotMatrix
              src={octopusTexture}
              width={TEXTURE_TILE_WIDTH}
              height={TEXTURE_TILE_HEIGHT}
              crop={t.crop}
              flipX={t.flipX}
              pitch={3.4}
              gain={1.3}
              dotScale={1}
              radius={45}
              className="absolute opacity-90"
              style={{ left: t.x, top: t.y }}
            />
            <ImageBlinds
              left={t.x}
              top={t.y}
              width={TEXTURE_TILE_WIDTH}
              height={TEXTURE_TILE_HEIGHT}
              isInView={textureInView}
              baseDelay={i * 0.08}
              leftExtraBleed={i === 0 ? 1.75 : i === 1 ? 1 : i === 2 ? 1 : i === 3 ? 2 : 0}
              rightExtraBleed={i === 0 ? 1 : i === 1 ? 1 : i === 2 ? 0.5 : i === 3 ? 1 : 0}
              bottomExtraBleed={i === 0 ? 1 : i === 1 ? 1 : i === 2 ? 1 : i === 3 ? 2.75 : 0}
            />
          </div>
        ))}

        {/* coin labels */}
        {coinLabels.map((c, i) => (
          <CoinLabel key={i} label={c.label} x={c.x} y={c.y} isInView={labelsInView} delay={i * 30} />
        ))}
        <motion.div
          className="absolute text-[12px] font-medium text-white/60"
          style={{ left: 350, top: 910, fontFamily: 'var(--font-display)', letterSpacing: '-0.36px' }}
          {...popIn(labelsInView, coinLabels.length * 30)}
        >
          MATIC
        </motion.div>

        {/* dedicated, real-sized element used purely for visibility detection */}
        <div ref={swapRef} className="absolute" style={{ left: 513, top: 258, width: 486, height: 385 }} />

        {/* left side: arrow + USDC (slides in left-to-right, fading in) */}
        <motion.div
          className="absolute flex items-center gap-[15px]"
          style={{ left: 69, top: 436 }}
          initial={{ x: -60, opacity: 0 }}
          animate={swapInView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.img
            src={arrowRightChunky}
            alt=""
            width={53}
            height={48}
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <SideCoinLabel coin={desktopSwap.sellCoin} />
        </motion.div>

        {/* right side: SOL + arrow (slides in right-to-left, fading in) */}
        <motion.div
          className="absolute flex items-center gap-[15px]"
          style={{ right: DESIGN_WIDTH - 1450, top: 428 }}
          initial={{ x: 60, opacity: 0 }}
          animate={swapInView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <SideCoinLabel coin={desktopSwap.buyCoin} />
          <motion.img
            src={arrowLeftChunky}
            alt=""
            width={53}
            height={48}
            animate={{ x: [0, -12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* swap card */}
        <AnimatedLines
          lines={['Swap']}
          baseDelay={0}
          isInView={swapInView}
          className="absolute text-[24px] font-medium text-white"
          style={{ left: 513, top: 258, fontFamily: 'var(--font-display)', letterSpacing: '-0.72px' }}
        />

        {/* sell panel */}
        <motion.div
          className="absolute border border-white/10 backdrop-blur-[10px]"
          style={{ left: 513, top: 303, width: 486, height: 128, background: 'rgba(255,255,255,0.07)' }}
          initial={{ y: 24, opacity: 0 }}
          animate={swapInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <AnimatedLines
            lines={['Sell']}
            baseDelay={2 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-white/50"
            style={{ left: 20, top: 17, fontFamily: 'var(--font-display)' }}
          />
          <CountUpNumber
            value={desktopSwap.sellMock.amount}
            decimals={desktopSwap.sellMock.decimals}
            isInView={swapInView}
            delay={3 * TEXT_STEP}
            duration={1}
            className="absolute text-[40px] font-normal text-white"
            style={{ left: 20, top: 43, fontFamily: 'var(--font-display)', letterSpacing: '-1.2px' }}
          />
          <AnimatedLines
            lines={[desktopSwap.sellMock.usd]}
            baseDelay={4 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-white/50"
            style={{ left: 20, top: 94, fontFamily: 'var(--font-display)' }}
          />
          <AnimatedLines
            lines={[`0 ${desktopSwap.sellCoin}`]}
            baseDelay={5 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-white/50"
            style={{ left: 422, top: 94, fontFamily: 'var(--font-display)' }}
          />
          <motion.div
            ref={desktopSwap.sellWrapRef}
            className="absolute flex items-center gap-[8px] bg-white/10 px-[9px] cursor-pointer select-none"
            style={{ left: 365.8, top: 45, width: 100, height: 35 }}
            onClick={desktopSwap.toggleSellMenu}
            {...popIn(swapInView, 60)}
          >
            <span
              className="text-[24px] font-normal text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.72px' }}
            >
              {desktopSwap.sellCoin}
            </span>
            <img src={chevronDown} alt="" width={14} height={14} />
            {desktopSwap.sellMenuOpen && (
              <CoinMenu
                width={100}
                options={SWAP_COINS.filter((c) => c !== desktopSwap.sellCoin)}
                onPick={desktopSwap.pickSellCoin}
              />
            )}
          </motion.div>
        </motion.div>

        {/* swap icon button */}
        <motion.div
          className="group absolute z-[2] flex items-center justify-center border-[4px] border-[#08090b] bg-[#222325] cursor-pointer transition-colors duration-300 hover:bg-[#FF6215]"
          style={{ left: 726, top: 404, width: 60, height: 60 }}
          onClick={desktopSwap.swap}
          {...popIn(swapInView, 90)}
        >
          <img src={swapIcon} alt="" width={24} height={24} className={SWAP_ICON_HOVER} />
        </motion.div>

        {/* buy panel */}
        <motion.div
          className="absolute bg-white"
          style={{ left: 513, top: 435, width: 486, height: 128 }}
          initial={{ y: 24, opacity: 0 }}
          animate={swapInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
        >
          <AnimatedLines
            lines={['Buy']}
            baseDelay={7 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-black"
            style={{ left: 20, top: 17, fontFamily: 'var(--font-display)' }}
          />
          <CountUpNumber
            value={desktopSwap.buyMock.amount}
            decimals={desktopSwap.buyMock.decimals}
            isInView={swapInView}
            delay={8 * TEXT_STEP}
            duration={1}
            className="absolute text-[40px] font-normal text-black"
            style={{ left: 20, top: 45, fontFamily: 'var(--font-display)', letterSpacing: '-1.2px' }}
          />
          <AnimatedLines
            lines={[desktopSwap.buyMock.usd]}
            baseDelay={9 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-black"
            style={{ left: 20, top: 94, fontFamily: 'var(--font-display)' }}
          />
          <AnimatedLines
            lines={[`0 ${desktopSwap.buyCoin}`]}
            baseDelay={10 * TEXT_STEP}
            isInView={swapInView}
            className="absolute text-[16px] font-normal text-black"
            style={{ left: 422, top: 94, fontFamily: 'var(--font-display)' }}
          />
          <motion.div
            ref={desktopSwap.buyWrapRef}
            className="absolute flex items-center gap-[8px] rounded-none border border-white/15 bg-black px-[9px] cursor-pointer select-none"
            style={{ left: 364, top: 45, width: 102, height: 36.8 }}
            onClick={desktopSwap.toggleBuyMenu}
            {...popIn(swapInView, 120)}
          >
            <span
              className="text-[24px] font-normal text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.72px' }}
            >
              {desktopSwap.buyCoin}
            </span>
            <img src={chevronDown} alt="" width={14} height={14} className="opacity-50" />
            {desktopSwap.buyMenuOpen && (
              <CoinMenu
                width={102}
                options={SWAP_COINS.filter((c) => c !== desktopSwap.buyCoin)}
                onPick={desktopSwap.pickBuyCoin}
              />
            )}
          </motion.div>
        </motion.div>

        {/* connect wallet button */}
        <motion.div
          className="absolute flex items-center justify-center overflow-hidden bg-[#FF6215]"
          style={{ left: 513, top: 583, width: 486, height: 60 }}
          initial={{ y: 24, opacity: 0 }}
          animate={swapInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
          onMouseEnter={() => setConnectHovering(true)}
          onMouseLeave={() => setConnectHovering(false)}
        >
          {sparkleDotsLeft.concat(sparkleDotsRight).map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/70"
              style={{ left: d.x - 513, top: d.y - 583, width: d.s, height: d.s }}
            />
          ))}
          <span
            className="absolute rounded-full"
            style={{
              left: 213,
              top: 5,
              width: 60,
              height: 30,
              background: 'rgba(206,187,150,0.32)',
              filter: 'blur(20px)',
            }}
          />
          <motion.span
            className="relative inline-block"
            initial={{ y: 10, opacity: 0 }}
            animate={swapInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.16 + 13 * TEXT_STEP, ease: 'easeOut' }}
          >
            <DrumText
              text="Connect Wallet"
              hovering={connectHovering}
              className="text-[20px] font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.6px' }}
            />
          </motion.span>
        </motion.div>
      </div>
    </section>

    <section className="relative block w-full overflow-hidden bg-[#08090b] lg:hidden">
      <div
        ref={mobile.outerRef}
        className="relative w-full overflow-hidden"
        style={{ height: mobile.naturalHeight * mobile.scale }}
      >
        <div
          ref={mobile.innerRef}
          className="absolute left-0 top-0 flex flex-col items-center px-[24px] py-[56px]"
          style={{
            width: MOBILE_DESIGN_WIDTH,
            transform: `scale(${mobile.scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="mb-[28px] flex flex-wrap items-center justify-center gap-[8px]">
            {mobileChipLabels.map((label) => (
              <MobileCoinChip key={label} label={label} />
            ))}
          </div>

          <div className="mb-[28px] flex items-center gap-[8px]">
            <img src={arrowRightChunky} alt="" width={26} height={24} />
            <span
              className="text-[26px] font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.78px' }}
            >
              <ScrambleText text={mobileSellLabel} />
            </span>
            <span className="text-[26px] font-medium text-white/40">/</span>
            <span
              className="text-[26px] font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.78px' }}
            >
              <ScrambleText text={mobileBuyLabel} />
            </span>
            <img src={arrowLeftChunky} alt="" width={26} height={24} />
          </div>

          <div ref={mobileSwapRef} className="flex w-full flex-col items-center">
            <AnimatedLines
              lines={['Swap']}
              isInView={mobileSwapInView}
              className="mb-[12px] w-full text-[20px] font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.6px' }}
            />

            <motion.div
              className="w-full border border-white/10 backdrop-blur-[10px]"
              style={{ background: 'rgba(255,255,255,0.07)', padding: 16 }}
              initial={{ y: 16, opacity: 0 }}
              animate={mobileSwapInView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <AnimatedLines
                  lines={['Sell']}
                  baseDelay={2 * TEXT_STEP}
                  isInView={mobileSwapInView}
                  className="text-[14px] font-normal text-white/50"
                  style={{ fontFamily: 'var(--font-display)' }}
                />
                <motion.div
                  ref={mobileSwap.sellWrapRef}
                  className="relative flex items-center gap-[6px] bg-white/10 px-[9px] py-[6px] cursor-pointer select-none"
                  onClick={mobileSwap.toggleSellMenu}
                  {...popIn(mobileSwapInView, 60)}
                >
                  <span
                    className="text-[18px] font-normal text-white"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.54px' }}
                  >
                    {mobileSwap.sellCoin}
                  </span>
                  <img src={chevronDown} alt="" width={12} height={12} />
                  {mobileSwap.sellMenuOpen && (
                    <CoinMenu
                      width={90}
                      options={SWAP_COINS.filter((c) => c !== mobileSwap.sellCoin)}
                      onPick={mobileSwap.pickSellCoin}
                    />
                  )}
                </motion.div>
              </div>
              <CountUpNumber
                value={mobileSwap.sellMock.amount}
                decimals={mobileSwap.sellMock.decimals}
                isInView={mobileSwapInView}
                delay={3 * TEXT_STEP}
                duration={1}
                className="mt-[8px] block text-[32px] font-normal text-white"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.96px' }}
              />
              <div
                className="mt-[8px] flex items-center justify-between text-[13px] font-normal text-white/50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span>{mobileSwap.sellMock.usd}</span>
                <span>0 {mobileSwap.sellCoin}</span>
              </div>
            </motion.div>

            <motion.div
              className="group relative z-[2] -my-[16px] flex items-center justify-center border-[4px] border-[#08090b] bg-[#222325] cursor-pointer transition-colors duration-300 hover:bg-[#FF6215]"
              style={{ width: 48, height: 48 }}
              onClick={mobileSwap.swap}
              {...popIn(mobileSwapInView, 90)}
            >
              <img src={swapIcon} alt="" width={20} height={20} className={SWAP_ICON_HOVER} />
            </motion.div>

            <motion.div
              className="w-full bg-white"
              style={{ padding: 16 }}
              initial={{ y: 16, opacity: 0 }}
              animate={mobileSwapInView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <AnimatedLines
                  lines={['Buy']}
                  baseDelay={7 * TEXT_STEP}
                  isInView={mobileSwapInView}
                  className="text-[14px] font-normal text-black"
                  style={{ fontFamily: 'var(--font-display)' }}
                />
                <motion.div
                  ref={mobileSwap.buyWrapRef}
                  className="relative flex items-center gap-[6px] border border-white/15 bg-black px-[9px] py-[6px] cursor-pointer select-none"
                  onClick={mobileSwap.toggleBuyMenu}
                  {...popIn(mobileSwapInView, 120)}
                >
                  <span
                    className="text-[18px] font-normal text-white"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.54px' }}
                  >
                    {mobileSwap.buyCoin}
                  </span>
                  <img src={chevronDown} alt="" width={12} height={12} className="opacity-50" />
                  {mobileSwap.buyMenuOpen && (
                    <CoinMenu
                      width={90}
                      options={SWAP_COINS.filter((c) => c !== mobileSwap.buyCoin)}
                      onPick={mobileSwap.pickBuyCoin}
                    />
                  )}
                </motion.div>
              </div>
              <CountUpNumber
                value={mobileSwap.buyMock.amount}
                decimals={mobileSwap.buyMock.decimals}
                isInView={mobileSwapInView}
                delay={8 * TEXT_STEP}
                duration={1}
                className="mt-[8px] block text-[32px] font-normal text-black"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.96px' }}
              />
              <div
                className="mt-[8px] flex items-center justify-between text-[13px] font-normal text-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span>{mobileSwap.buyMock.usd}</span>
                <span>0 {mobileSwap.buyCoin}</span>
              </div>
            </motion.div>

            <motion.div
              className="mt-[16px] flex w-full items-center justify-center overflow-hidden bg-[#FF6215]"
              style={{ height: 52 }}
              initial={{ y: 16, opacity: 0 }}
              animate={mobileSwapInView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
              onMouseEnter={() => setMobileConnectHovering(true)}
              onMouseLeave={() => setMobileConnectHovering(false)}
            >
              <motion.span
                className="relative inline-block"
                initial={{ y: 10, opacity: 0 }}
                animate={mobileSwapInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.16 + 13 * TEXT_STEP, ease: 'easeOut' }}
              >
                <DrumText
                  text="Connect Wallet"
                  hovering={mobileConnectHovering}
                  className="text-[16px] font-medium text-white"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
                />
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
END CODE src/sections/TickerGrid.tsx

Notes on TickerGrid.tsx: desktop canvas 1545x922. Grid lines draw in one after another (vertical lines 0.04s apart, then horizontal ones), coin labels pop in 30ms apart. Four 125.38x113.6 dot-matrix tiles show different crops of the octopus texture (one flipped); each is covered by 4 horizontal "blinds" in #08090b that collapse (scaleY 1 -> 0 from the bottom, 0.12s apart) when revealed - the per-tile leftExtraBleed/rightExtraBleed/bottomExtraBleed values are hand-tuned to hide sub-pixel seams, keep them. Swap widget: sell/buy coin selectors open a dropdown (closed by clicking outside), picking the coin that is already on the other side swaps them, the round swap button swaps sell and buy; amounts count up and re-animate (0.4s) when the coin changes. The big side labels (64px) and the mobile "USDC / SOL" pair cycle between the ticker (held 2600ms) and a random code of the same length (held 1400ms), re-rolling through ScrambleText on every switch (useCoinCodeCycle). The arrows beside them bob horizontally forever (x 0 -> 12 -> 0, 1.6s).
CRITICAL DETAIL - DO NOT DROP: SWAP_ICON_HOVER = 'transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:rotate-180 group-active:scale-90' on the swap icon (rotates 180deg on hover of the round button, which also turns #FF6215 via hover:bg-[#FF6215] with a 4px #08090b border); the sell panel's backdrop-blur-[10px] with rgba(255,255,255,0.07); the connect-wallet button's scattered 1-2px white/70 sparkle dots and the blurred rgba(206,187,150,0.32) highlight.

==================================================
FILE: src/sections/TickerCells.tsx
Interactive empty-cell layer rendered inside TickerGrid.
==================================================

BEGIN CODE src/sections/TickerCells.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrambleText } from '../lib/animations'

/**
 * Interactive layer for the empty cells of the ticker grid: the cursor leaves
 * a fading grey trail of lit cells with ticking mono prices, and resting on a
 * cell unfolds it into a light quote card (spinner, coin, live price). With no
 * cursor over the grid a few cells flicker on their own and now and then one
 * unfolds by itself. Coordinates are in design px of the parent canvas.
 */

export type CellRect = { x: number; y: number; w: number; h: number }

type Cell = CellRect & { base: number; coin: string }

const CARD_COINS: { coin: string; price: number; decimals: number }[] = [
  { coin: 'BTC', price: 64210.52, decimals: 2 },
  { coin: 'ETH', price: 3832.26, decimals: 2 },
  { coin: 'SOL', price: 142.18, decimals: 2 },
  { coin: 'DOGE', price: 0.1243, decimals: 4 },
  { coin: 'XLM', price: 0.1102, decimals: 4 },
  { coin: 'EOS', price: 0.7134, decimals: 4 },
  { coin: 'MATIC', price: 0.5218, decimals: 4 },
  { coin: 'USDC', price: 1.0001, decimals: 4 },
]
const COIN_BY_NAME = Object.fromEntries(CARD_COINS.map((c) => [c.coin, c]))

const TICK_MS = 650
const DWELL_MS = 420
const AMBIENT_EVERY_MS = 850
const AMBIENT_LIFE_MS = 1700
const AMBIENT_MAX = 3
const AMBIENT_CARD_EVERY_MS = 5200
const AMBIENT_CARD_LIFE_MS = 2800
const CARD_INSET = 7

function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function intersects(a: CellRect, b: CellRect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

function formatPrice(value: number, decimals: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default function TickerCells({
  colEdges,
  rowEdges,
  width,
  height,
  blocked,
}: {
  colEdges: number[]
  rowEdges: number[]
  width: number
  height: number
  /** regions whose cells stay dark (swap widget, texture tiles) */
  blocked: CellRect[]
}) {
  const layerRef = useRef<HTMLDivElement>(null)
  const cols = colEdges.length - 1

  const cells = useMemo<(Cell | null)[]>(() => {
    const out: (Cell | null)[] = []
    for (let r = 0; r < rowEdges.length - 1; r++) {
      for (let c = 0; c < cols; c++) {
        const rect = { x: colEdges[c], y: rowEdges[r], w: colEdges[c + 1] - colEdges[c], h: rowEdges[r + 1] - rowEdges[r] }
        const i = r * cols + c
        out.push(
          blocked.some((b) => intersects(rect, b))
            ? null
            : {
                ...rect,
                base: 100 + hash(i, 1) * 170,
                coin: CARD_COINS[Math.floor(hash(i, 2) * CARD_COINS.length)].coin,
              },
        )
      }
    }
    return out
  }, [colEdges, rowEdges, cols, blocked])

  const freeCells = useMemo(() => cells.flatMap((c, i) => (c ? [i] : [])), [cells])

  const [hot, setHot] = useState<number | null>(null)
  const [card, setCard] = useState<number | null>(null)
  const [ambient, setAmbient] = useState<number[]>([])
  const [tick, setTick] = useState(0)
  const [visible, setVisible] = useState(false)

  // pointer -> cell under it, in design px of the scaled canvas
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const layer = layerRef.current
      if (!layer) return
      const rect = layer.getBoundingClientRect()
      if (!rect.width) return
      const x = ((e.clientX - rect.left) / rect.width) * width
      const y = ((e.clientY - rect.top) / rect.height) * height
      let next: number | null = null
      if (x >= 0 && y >= 0 && x < width && y < rowEdges[rowEdges.length - 1]) {
        const c = colEdges.findIndex((edge, k) => x >= edge && x < colEdges[k + 1])
        const r = rowEdges.findIndex((edge, k) => y >= edge && y < rowEdges[k + 1])
        const i = r * cols + c
        if (c >= 0 && r >= 0 && cells[i]) next = i
      }
      setHot(next)
    }
    function onLeave() {
      setHot(null)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [cells, colEdges, rowEdges, cols, width, height])

  useEffect(() => {
    const el = layerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // prices tick only while the grid is on screen
  useEffect(() => {
    if (!visible) return
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => window.clearInterval(id)
  }, [visible])

  // resting on a cell unfolds it; moving on folds it back
  useEffect(() => {
    if (hot === null) {
      setCard(null)
      return
    }
    setCard((c) => (c === hot ? c : null))
    const id = window.setTimeout(() => setCard(hot), DWELL_MS)
    return () => window.clearTimeout(id)
  }, [hot])

  // idle life: a few cells flicker and now and then one unfolds on its own
  const idle = visible && hot === null
  useEffect(() => {
    if (!idle || !freeCells.length) {
      setAmbient([])
      return
    }
    const timers: number[] = []
    const flicker = window.setInterval(() => {
      const i = freeCells[Math.floor(Math.random() * freeCells.length)]
      setAmbient((a) => (a.length >= AMBIENT_MAX || a.includes(i) ? a : [...a, i]))
      timers.push(window.setTimeout(() => setAmbient((a) => a.filter((x) => x !== i)), AMBIENT_LIFE_MS))
    }, AMBIENT_EVERY_MS)
    const unfold = window.setInterval(() => {
      const i = freeCells[Math.floor(Math.random() * freeCells.length)]
      setCard(i)
      timers.push(window.setTimeout(() => setCard((c) => (c === i ? null : c)), AMBIENT_CARD_LIFE_MS))
    }, AMBIENT_CARD_EVERY_MS)
    return () => {
      window.clearInterval(flicker)
      window.clearInterval(unfold)
      timers.forEach(window.clearTimeout)
    }
  }, [idle, freeCells])

  const hotRow = hot === null ? -1 : Math.floor(hot / cols)
  const hotCol = hot === null ? -1 : hot % cols

  function level(i: number) {
    if (i === hot) return 0.075
    if (ambient.includes(i)) return 0.05
    if (hot !== null) {
      const r = Math.floor(i / cols)
      const c = i % cols
      if (Math.abs(r - hotRow) + Math.abs(c - hotCol) === 1) return 0.025
    }
    return 0
  }

  const cardCell = card === null ? null : cells[card]
  const cardCoin = cardCell ? COIN_BY_NAME[cardCell.coin] : null
  const cardDrift = card === null ? 0 : (hash(card, tick) - 0.5) * 0.004
  const cardChange = card === null ? 0 : (hash(card, 7) - 0.3) * 6 + (hash(card, tick + 1) - 0.5) * 0.3

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute left-0 top-0"
      style={{ width, height }}
    >
      {cells.map((cell, i) => {
        if (!cell) return null
        const a = level(i)
        const showNumber = i === hot || ambient.includes(i)
        const price = cell.base * (1 + (hash(i, tick) - 0.5) * 0.01)
        return (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: cell.x + 1,
              top: cell.y + 1,
              width: cell.w - 1,
              height: cell.h - 1,
              backgroundColor: `rgba(255,255,255,${a})`,
              // light up fast, fade out slowly - that leaves the trail
              transition: `background-color ${a > 0 ? 120 : 1100}ms ease-out`,
            }}
          >
            <span
              className="text-[10px] text-white/40"
              style={{
                fontFamily: 'var(--font-mono-label)',
                opacity: showNumber ? 1 : 0,
                transition: `opacity ${showNumber ? 150 : 900}ms ease-out`,
              }}
            >
              {price.toFixed(2)}
            </span>
          </div>
        )
      })}

      <AnimatePresence>
        {cardCell && cardCoin && (
          <motion.div
            key={card}
            className="absolute flex flex-col items-center justify-between bg-[#e9e9e9] text-black"
            style={{
              left: cardCell.x + CARD_INSET,
              top: cardCell.y + CARD_INSET,
              width: cardCell.w - CARD_INSET * 2,
              height: cardCell.h - CARD_INSET * 2,
              padding: '12px 8px 10px',
              fontFamily: 'var(--font-mono-label)',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.7 }}
          >
            <span className="text-[10px] text-black/60">
              {formatPrice(cardCoin.price * (1 + cardDrift), cardCoin.decimals)}
            </span>
            <span className="flex items-center gap-[6px] text-[15px] uppercase">
              <span
                className="h-[9px] w-[9px] animate-spin rounded-full border-[1.5px] border-black border-t-transparent"
                style={{ animationDuration: '0.9s' }}
              />
              <ScrambleText text={cardCoin.coin} duration={380} />
            </span>
            <span className="text-[10px]" style={{ color: cardChange >= 0 ? '#FF6215' : 'rgba(0,0,0,0.45)' }}>
              {cardChange >= 0 ? '+' : ''}
              {cardChange.toFixed(2)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
END CODE src/sections/TickerCells.tsx

Notes on TickerCells.tsx: an absolutely positioned, pointer-events-none layer in the same 1545x922 design px as the TickerGrid canvas, rendered BEFORE the grid lines so the lines stay on top. TickerGrid passes the column edges [0, ...vLines, 1545], the row edges (hLines) and the blocked regions (the swap widget box x513 y258 486x385 plus the four texture tiles); cells that intersect a blocked region never light up. The cursor is tracked by a window pointermove listener and mapped into design px through the layer's getBoundingClientRect, so it works through the parent's transform: scale(). Hovered cell: rgba(255,255,255,0.075) with a 10px Fragment Mono price in white/40; its 4 direct neighbours 0.025. Lighting up takes 120ms, fading out 1100ms, which leaves a fading trail behind the cursor. Resting 420ms (DWELL_MS) on one cell unfolds a #e9e9e9 quote card inset 7px inside it with a spring pop (scale 0.4 -> 1, stiffness 420, damping 28, mass 0.7): live price at the top, a spinning ring plus the coin name via ScrambleText in the middle, change % at the bottom (#FF6215 when positive). Prices tick every 650ms, only while the grid is on screen (IntersectionObserver). With no cursor over the grid: every 850ms a random free cell flickers for 1700ms (max 3 at once), and every 5200ms one cell unfolds into a card by itself for 2800ms. Desktop only (it lives inside the desktop canvas).
CRITICAL DETAIL - DO NOT DROP: the fast-in / slow-out background-color transition (120ms vs 1100ms) is the whole trail effect, and the card must sit inside the cell with CARD_INSET 7 on the light #e9e9e9 background, not as a floating tooltip.

==================================================
FILE: src/sections/Pricing.tsx
Section 3: Pricing.
==================================================

BEGIN CODE src/sections/Pricing.tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, animate } from 'framer-motion'
const proCardBg = 'https://qclay.design/lovable/kraken/pricing-pro-card-bg.webp'
const arrowBullet = 'https://qclay.design/lovable/kraken/tickers-arrow-right-chunky.svg'
import { popIn, AnimatedLines, DrumText } from '../lib/animations'
import FlowGradient from '../lib/FlowGradient'

const TEXT_STEP = 0.03
const CARD_ITEM_OFFSET = 0.15

function CountUpPrice({
  value,
  isInView,
  delay = 0,
  duration = 1,
  className,
  style,
}: {
  value: number
  isInView: boolean
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true
    const controls = animate(0, value, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [isInView, value, duration, delay])

  return (
    <div className={className} style={style}>
      ${display.toFixed(2).replace('.', ',')}
    </div>
  )
}

const DESIGN_WIDTH = 1513
const DESIGN_HEIGHT = 1104
const PAD_X = 80
const PAD_Y = 120
const CONTENT_WIDTH = 1353
const CONTENT_HEIGHT = 864

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

const MOBILE_DESIGN_WIDTH = 420

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M1 5.5H10M10 5.5L6.5 2M10 5.5L6.5 9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlanBadge({
  x,
  y,
  label,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  label: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute flex items-center gap-[9px]" style={{ left: x, top: y }}>
      <motion.span className="h-[10px] w-[10px] shrink-0 bg-white" {...popIn(isInView, delay * 1000)} />
      <AnimatedLines
        as="span"
        lines={[label]}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="whitespace-nowrap text-[16px] text-white/60"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
      />
    </div>
  )
}

function PriceTag({
  x,
  y,
  value,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  value: number
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <CountUpPrice
        value={value}
        isInView={isInView}
        delay={delay}
        className="text-[88px] leading-[88px] text-white"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-2.64px' }}
      />
      <AnimatedLines
        lines={['/year']}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="text-[80px] leading-[80px] text-white/40"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-2.4px' }}
      />
    </div>
  )
}

function FeatureRow({
  x,
  y,
  label,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  label: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute flex items-center gap-[7px]" style={{ left: x, top: y }}>
      <motion.img src={arrowBullet} alt="" width={14} height={12.6} {...popIn(isInView, delay * 1000)} />
      <AnimatedLines
        as="span"
        lines={[label]}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="whitespace-nowrap text-[16px] text-white/80"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
      />
    </div>
  )
}

function PlanButton({
  x,
  y,
  width,
  label,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  width: number
  label: string
  isInView: boolean
  delay?: number
}) {
  const [hovering, setHovering] = useState(false)
  return (
    <motion.div
      className="absolute flex h-[30px] items-center justify-center gap-[7px] bg-white px-[9px]"
      style={{ left: x, top: y, width }}
      {...popIn(isInView, delay * 1000)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <DrumText
        text={label}
        hovering={hovering}
        className="whitespace-nowrap text-[14px] font-medium text-black"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
      />
      <span className="h-[16px] w-px bg-black/10" />
      <ArrowRight color="black" />
    </motion.div>
  )
}

function MobilePlanBadge({ label, isInView, delay = 0 }: { label: string; isInView: boolean; delay?: number }) {
  return (
    <div className="flex items-center gap-[9px]">
      <motion.span className="h-[10px] w-[10px] shrink-0 bg-white" {...popIn(isInView, delay * 1000)} />
      <AnimatedLines
        as="span"
        lines={[label]}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="whitespace-nowrap text-[16px] text-white/60"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
      />
    </div>
  )
}

function MobilePriceTag({ value, isInView, delay = 0 }: { value: number; isInView: boolean; delay?: number }) {
  return (
    <div className="mt-[16px]">
      <CountUpPrice
        value={value}
        isInView={isInView}
        delay={delay}
        className="text-[56px] leading-[56px] text-white"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-1.68px' }}
      />
      <AnimatedLines
        lines={['/year']}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="text-[48px] leading-[48px] text-white/40"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-1.44px' }}
      />
    </div>
  )
}

function MobileFeatureRow({ label, isInView, delay = 0 }: { label: string; isInView: boolean; delay?: number }) {
  return (
    <div className="flex items-center gap-[7px]">
      <motion.img src={arrowBullet} alt="" width={14} height={12.6} {...popIn(isInView, delay * 1000)} />
      <AnimatedLines
        as="span"
        lines={[label]}
        baseDelay={delay + TEXT_STEP}
        isInView={isInView}
        className="whitespace-nowrap text-[15px] text-white/80"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.45px' }}
      />
    </div>
  )
}

function MobilePlanButton({ label, isInView, delay = 0 }: { label: string; isInView: boolean; delay?: number }) {
  const [hovering, setHovering] = useState(false)
  return (
    <motion.div
      className="flex h-[42px] w-full items-center justify-center gap-[7px] bg-white px-[9px]"
      {...popIn(isInView, delay * 1000)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <DrumText
        text={label}
        hovering={hovering}
        className="whitespace-nowrap text-[14px] font-medium text-black"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
      />
      <span className="h-[16px] w-px bg-black/10" />
      <ArrowRight color="black" />
    </motion.div>
  )
}

const traderFeatures = [
  'Spot trading access',
  'Standard trading fees',
  'Basic market analytics',
  'Standard support',
]

const proFeatures = [
  'Lower trading fees',
  'Advanced analytics',
  'Real-time trading signals',
  'Copy trading tools',
  'Advanced risk controls',
]

export default function Pricing() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 })
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 })

  const mobile = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const mobileHeaderRef = useRef<HTMLDivElement>(null)
  const mobileHeaderInView = useInView(mobileHeaderRef, { once: true, amount: 0.4 })
  const mobileCardsRef = useRef<HTMLDivElement>(null)
  const mobileCardsInView = useInView(mobileCardsRef, { once: true, amount: 0.2 })

  const traderBase = 0
  const proBase = 0.1

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden bg-[#08090b] lg:block"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="absolute" style={{ left: PAD_X, top: PAD_Y, width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}>
          {/* header */}
          <motion.div
            ref={headerRef}
            className="absolute inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
            style={{ left: 0, top: 0 }}
            {...popIn(headerInView, 0)}
          >
            <span
              className="h-[6px] w-[6px] shrink-0"
              style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
            />
            <span
              className="text-[13px] font-medium uppercase text-white/80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Upgrade
            </span>
          </motion.div>

          <AnimatedLines
            as="h2"
            lines={['Choose the Plan That', 'Fits Your Trading']}
            baseDelay={0.05}
            isInView={headerInView}
            className="absolute font-medium text-white"
            style={{
              left: 0,
              top: 36,
              width: 561,
              fontFamily: 'var(--font-display)',
              fontSize: 54,
              lineHeight: '51.84px',
              letterSpacing: '-1.62px',
            }}
          />
          <div ref={cardsRef} className="absolute" style={{ left: 0, top: 197, width: CONTENT_WIDTH, height: 667 }}>
            {/* trader card */}
            <motion.div
              className="absolute border border-white/20"
              style={{
                left: 0,
                top: 0,
                width: 669,
                height: 667,
                background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              }}
              initial={{ y: 24, opacity: 0 }}
              animate={cardsInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <PlanBadge x={38} y={31} label="TRADER PLAN" isInView={cardsInView} delay={traderBase + CARD_ITEM_OFFSET} />
              <PriceTag x={38} y={96} value={149} isInView={cardsInView} delay={traderBase + CARD_ITEM_OFFSET + 1 * TEXT_STEP} />
              <AnimatedLines
                as="p"
                lines={['Trade with the essentials.', 'Simple tools for getting', 'started.']}
                baseDelay={traderBase + CARD_ITEM_OFFSET + 2 * TEXT_STEP}
                isInView={cardsInView}
                className="absolute text-[20px] text-white/80"
                style={{ left: 38, top: 284, width: 259, fontFamily: 'var(--font-display)', letterSpacing: '-0.6px', lineHeight: '24.8px' }}
              />
              <AnimatedLines
                lines={['What you get:']}
                baseDelay={traderBase + CARD_ITEM_OFFSET + 3 * TEXT_STEP}
                isInView={cardsInView}
                className="absolute text-[20px] font-medium text-white"
                style={{ left: 38, top: 379, fontFamily: 'var(--font-display)', letterSpacing: '-0.6px' }}
              />
              {traderFeatures.map((f, i) => (
                <FeatureRow
                  key={f}
                  x={38}
                  y={416 + i * 26}
                  label={f}
                  isInView={cardsInView}
                  delay={traderBase + CARD_ITEM_OFFSET + (4 + i) * TEXT_STEP}
                />
              ))}
              <PlanButton
                x={38}
                y={600}
                width={134}
                label="Choose Trader"
                isInView={cardsInView}
                delay={traderBase + CARD_ITEM_OFFSET + (4 + traderFeatures.length) * TEXT_STEP}
              />
            </motion.div>

            {/* pro card */}
            <motion.div
              className="absolute overflow-hidden border border-white/20"
              style={{ left: 684, top: 0, width: 669, height: 667 }}
              initial={{ y: 24, opacity: 0 }}
              animate={cardsInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, delay: proBase, ease: 'easeOut' }}
            >
              <img
                src={proCardBg}
                alt=""
                className="absolute -left-[10px] -top-[10px] h-[calc(100%+20px)] w-[calc(100%+20px)] object-cover"
                style={{ filter: 'blur(10px)', transform: 'scale(3)', transformOrigin: '50% 85%' }}
              />
              {/* live shader gradient over the static fallback image; swirls around the cursor */}
              <FlowGradient />
              <div className="absolute inset-0 bg-[#E5710A]/10" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' }}
              />

              <PlanBadge x={38} y={31} label="PRO PLAN" isInView={cardsInView} delay={proBase + CARD_ITEM_OFFSET} />
              <PriceTag x={38} y={96} value={299} isInView={cardsInView} delay={proBase + CARD_ITEM_OFFSET + 1 * TEXT_STEP} />
              <AnimatedLines
                as="p"
                lines={['More power, deeper insights, and better', 'conditions for active traders.']}
                baseDelay={proBase + CARD_ITEM_OFFSET + 2 * TEXT_STEP}
                isInView={cardsInView}
                className="absolute text-[20px] text-white/80"
                style={{ left: 38, top: 284, width: 357, fontFamily: 'var(--font-display)', letterSpacing: '-0.6px', lineHeight: '24.8px' }}
              />
              <AnimatedLines
                lines={['What you get:']}
                baseDelay={proBase + CARD_ITEM_OFFSET + 3 * TEXT_STEP}
                isInView={cardsInView}
                className="absolute text-[20px] font-medium text-white"
                style={{ left: 38, top: 379, fontFamily: 'var(--font-display)', letterSpacing: '-0.6px' }}
              />
              {proFeatures.map((f, i) => (
                <FeatureRow
                  key={f}
                  x={38}
                  y={416 + i * 26}
                  label={f}
                  isInView={cardsInView}
                  delay={proBase + CARD_ITEM_OFFSET + (4 + i) * TEXT_STEP}
                />
              ))}
              <PlanButton
                x={38}
                y={600}
                width={135}
                label="Upgrade to Pro"
                isInView={cardsInView}
                delay={proBase + CARD_ITEM_OFFSET + (4 + proFeatures.length) * TEXT_STEP}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    <section className="relative block w-full overflow-hidden bg-[#08090b] lg:hidden">
      <div
        ref={mobile.outerRef}
        className="relative w-full overflow-hidden"
        style={{ height: mobile.naturalHeight * mobile.scale }}
      >
        <div
          ref={mobile.innerRef}
          className="absolute left-0 top-0"
          style={{ width: MOBILE_DESIGN_WIDTH, transform: `scale(${mobile.scale})`, transformOrigin: 'top left' }}
        >
        <div className="px-[20px] py-[60px]">
          <motion.div
            ref={mobileHeaderRef}
            className="inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
            {...popIn(mobileHeaderInView, 0)}
          >
            <span
              className="h-[6px] w-[6px] shrink-0"
              style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
            />
            <span
              className="text-[13px] font-medium uppercase text-white/80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Upgrade
            </span>
          </motion.div>

          <AnimatedLines
            as="h2"
            lines={['Choose the Plan That Fits Your Trading']}
            baseDelay={0.05}
            isInView={mobileHeaderInView}
            className="mt-[20px] font-medium text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              lineHeight: '36px',
              letterSpacing: '-0.96px',
            }}
          />

          <div ref={mobileCardsRef} className="mt-[32px] flex flex-col gap-[20px]">
            {/* trader card */}
            <motion.div
              className="relative border border-white/20 px-[24px] py-[28px]"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              }}
              initial={{ y: 24, opacity: 0 }}
              animate={mobileCardsInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <MobilePlanBadge label="TRADER PLAN" isInView={mobileCardsInView} delay={traderBase + CARD_ITEM_OFFSET} />
              <MobilePriceTag value={149} isInView={mobileCardsInView} delay={traderBase + CARD_ITEM_OFFSET + 1 * TEXT_STEP} />
              <AnimatedLines
                as="p"
                lines={['Trade with the essentials. Simple tools for getting started.']}
                baseDelay={traderBase + CARD_ITEM_OFFSET + 2 * TEXT_STEP}
                isInView={mobileCardsInView}
                className="mt-[16px] text-[16px] text-white/80"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px', lineHeight: '20.8px' }}
              />
              <AnimatedLines
                lines={['What you get:']}
                baseDelay={traderBase + CARD_ITEM_OFFSET + 3 * TEXT_STEP}
                isInView={mobileCardsInView}
                className="mt-[20px] text-[16px] font-medium text-white"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
              />
              <div className="mt-[12px] flex flex-col gap-[10px]">
                {traderFeatures.map((f, i) => (
                  <MobileFeatureRow
                    key={f}
                    label={f}
                    isInView={mobileCardsInView}
                    delay={traderBase + CARD_ITEM_OFFSET + (4 + i) * TEXT_STEP}
                  />
                ))}
              </div>
              <div className="mt-[24px]">
                <MobilePlanButton
                  label="Choose Trader"
                  isInView={mobileCardsInView}
                  delay={traderBase + CARD_ITEM_OFFSET + (4 + traderFeatures.length) * TEXT_STEP}
                />
              </div>
            </motion.div>

            {/* pro card */}
            <motion.div
              className="relative overflow-hidden border border-white/20 px-[24px] py-[28px]"
              initial={{ y: 24, opacity: 0 }}
              animate={mobileCardsInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, delay: proBase, ease: 'easeOut' }}
            >
              <img
                src={proCardBg}
                alt=""
                className="absolute -left-[10px] -top-[10px] h-[calc(100%+20px)] w-[calc(100%+20px)] object-cover"
                style={{ filter: 'blur(10px)', transform: 'scale(3)', transformOrigin: '50% 85%' }}
              />
              {/* live shader gradient over the static fallback image; swirls around the cursor */}
              <FlowGradient />
              <div className="absolute inset-0 bg-[#E5710A]/10" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="relative">
                <MobilePlanBadge label="PRO PLAN" isInView={mobileCardsInView} delay={proBase + CARD_ITEM_OFFSET} />
                <MobilePriceTag value={299} isInView={mobileCardsInView} delay={proBase + CARD_ITEM_OFFSET + 1 * TEXT_STEP} />
                <AnimatedLines
                  as="p"
                  lines={['More power, deeper insights, and better conditions for active traders.']}
                  baseDelay={proBase + CARD_ITEM_OFFSET + 2 * TEXT_STEP}
                  isInView={mobileCardsInView}
                  className="mt-[16px] text-[16px] text-white/80"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px', lineHeight: '20.8px' }}
                />
                <AnimatedLines
                  lines={['What you get:']}
                  baseDelay={proBase + CARD_ITEM_OFFSET + 3 * TEXT_STEP}
                  isInView={mobileCardsInView}
                  className="mt-[20px] text-[16px] font-medium text-white"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.48px' }}
                />
                <div className="mt-[12px] flex flex-col gap-[10px]">
                  {proFeatures.map((f, i) => (
                    <MobileFeatureRow
                      key={f}
                      label={f}
                      isInView={mobileCardsInView}
                      delay={proBase + CARD_ITEM_OFFSET + (4 + i) * TEXT_STEP}
                    />
                  ))}
                </div>
                <div className="mt-[24px]">
                  <MobilePlanButton
                    label="Upgrade to Pro"
                    isInView={mobileCardsInView}
                    delay={proBase + CARD_ITEM_OFFSET + (4 + proFeatures.length) * TEXT_STEP}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </section>
    </>
  )
}
END CODE src/sections/Pricing.tsx

Notes on Pricing.tsx: desktop canvas 1513x1104. Header animates when 40% visible, cards when 20% visible; the Pro card starts 0.1s after the Trader card, and inside each card every item follows at CARD_ITEM_OFFSET (0.15s) + n * TEXT_STEP. Prices count up from 0 and use a comma as the decimal separator ($149,00 / $299,00).
CRITICAL DETAIL - DO NOT DROP: the Trader card background 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)'; the Pro card layer stack, in order: the pricing-pro-card-bg.webp image enlarged with -left/-top 10px, calc(100%+20px) size, filter blur(10px), transform scale(3) with transformOrigin '50% 85%' (static fallback), then the live FlowGradient canvas, then an overlay bg-[#E5710A]/10, then a 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' sheen. Do not replace this stack with a flat orange fill.

==================================================
FILE: src/sections/WhyUs.tsx
Section 4: WhyUs.
==================================================

BEGIN CODE src/sections/WhyUs.tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, animate } from 'framer-motion'
const cardTexture = 'https://qclay.design/lovable/kraken/pricing-pro-card-bg.webp'
const buyCryptoIcon = 'https://qclay.design/lovable/kraken/whyus-buy-crypto.svg'
const timerIcon = 'https://qclay.design/lovable/kraken/whyus-timer.svg'
const combDivider = 'https://qclay.design/lovable/kraken/whyus-comb-divider.svg'
import { popIn, AnimatedLines } from '../lib/animations'
import DotMatrix, { type DotMatrixCrop } from '../lib/DotMatrix'

const TEXT_STEP = 0.03

const DESIGN_WIDTH = 1510

// source regions of the 1000x750 texture that the old img (object-cover +
// scale(2.5) from the left/right center) showed in each card
const UPTIME_CROP: DotMatrixCrop = { x: 138, y: 225, w: 290, h: 300 }
const ACCESS_CROP: DotMatrixCrop = { x: 575, y: 225, w: 300, h: 300 }

// mobile cards are 372x176 (420 canvas minus 24px padding each side) - same
// bands of the texture, widened to that ~2.1 aspect
const MOBILE_CARD_WIDTH = 372
const MOBILE_CARD_HEIGHT = 176
const MOBILE_UPTIME_CROP: DotMatrixCrop = { x: 80, y: 280, w: 440, h: 208 }
const MOBILE_ACCESS_CROP: DotMatrixCrop = { x: 480, y: 280, w: 440, h: 208 }
const DESIGN_HEIGHT = 1283
const PAD_X = 65
const PAD_Y = 150
const CONTENT_WIDTH = 1380
const CONTENT_HEIGHT = 983

const MOBILE_DESIGN_WIDTH = 420

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

/**
 * Counts up to `value`, keeping its exact formatting: only the digits are
 * animated, every other character (%, +, <, /, ms, .) stays where it is.
 */
function CountUp({
  value,
  isInView,
  delay = 0,
  duration = 1.2,
  className,
  style,
}: {
  value: string
  isInView: boolean
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const digits = value.replace(/\D/g, '')
  const [shown, setShown] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current || !digits) return
    started.current = true
    const end = Number(digits)
    const controls = animate(0, end, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, digits, delay, duration])

  const text = !digits
    ? value
    : (() => {
        const padded = String(shown).padStart(digits.length, '0')
        let i = 0
        return value.replace(/\d/g, () => padded[i++])
      })()

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {text}
    </motion.span>
  )
}

function IconWithBrackets({ icon, isInView, delay = 0 }: { icon: string; isInView: boolean; delay?: number }) {
  const tick = 'absolute h-[10px] w-[13.4px] border-white/70'
  return (
    <motion.div className="relative h-[42px] w-[42px]" {...popIn(isInView, delay * 1000)}>
      <span className={`${tick} left-0 top-0 border-l border-t`} />
      <span className={`${tick} right-0 top-0 border-r border-t`} />
      <span className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span className={`${tick} bottom-0 right-0 border-b border-r`} />
      <img src={icon} alt="" width={24} height={24} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  )
}

function Stat({
  x,
  y,
  value,
  label,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  value: string
  label: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <CountUp
        value={value}
        isInView={isInView}
        delay={delay}
        className="block font-medium text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 54, lineHeight: '51.84px', letterSpacing: '-1.62px' }}
      />
      <AnimatedLines
        as="div"
        lines={[label]}
        baseDelay={delay + 0.25}
        isInView={isInView}
        className="mt-[10px] lowercase text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: '15.36px', letterSpacing: 0 }}
      />
    </div>
  )
}

function Quote({
  x,
  y,
  width,
  quoteLines,
  name,
  role,
  isInView,
  delay = 0,
}: {
  x: number
  y: number
  width: number
  quoteLines: string[]
  name: string
  role: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute" style={{ left: x, top: y, width }}>
      <AnimatedLines
        as="p"
        lines={quoteLines}
        baseDelay={delay}
        isInView={isInView}
        lineClassName="whitespace-nowrap"
        className="text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: '124%', letterSpacing: '-0.24px' }}
      />
      <div className="absolute" style={{ left: 14, top: 226 }}>
        <AnimatedLines
          as="div"
          lines={[name]}
          baseDelay={delay + 0.3}
          isInView={isInView}
          className="text-[20px] font-medium text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        />
        <AnimatedLines
          as="div"
          lines={[role]}
          baseDelay={delay + 0.33}
          isInView={isInView}
          className="mt-[6px] text-[14px] text-white/60"
          style={{ fontFamily: 'var(--font-display)' }}
        />
      </div>
    </div>
  )
}

const verticalLines = [
  { left: 3, top: 239, height: 703 },
  { left: 1380, top: 240, height: 703 },
  { left: 681, top: 240, height: 703 },
  { left: 340, top: 239, height: 350 },
  { left: 1030, top: 591, height: 350 },
]

const horizontalLines = [
  { left: 3, top: 239, width: 1377 },
  { left: 681, top: 589, width: 699 },
  { left: 6, top: 588, width: 675 },
]

function DrawInLines({ isInView }: { isInView: boolean }) {
  return (
    <>
      {verticalLines.map((l, i) => (
        <motion.span
          key={`v-${i}`}
          className="absolute w-px bg-white/20"
          style={{ left: l.left, top: l.top }}
          initial={{ height: 0 }}
          animate={isInView ? { height: l.height } : { height: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.07 }}
        />
      ))}
      {horizontalLines.map((l, i) => (
        <motion.span
          key={`h-${i}`}
          className="absolute h-px bg-white/20"
          style={{ left: l.left, top: l.top }}
          initial={{ width: 0 }}
          animate={isInView ? { width: l.width } : { width: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 + i * 0.07 }}
        />
      ))}
    </>
  )
}

function MobileStatBlock({
  value,
  label,
  isInView,
  delay = 0,
}: {
  value: string
  label: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div>
      <CountUp
        value={value}
        isInView={isInView}
        delay={delay}
        className="block font-medium text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 38, lineHeight: '36px', letterSpacing: '-1.1px' }}
      />
      <AnimatedLines
        as="div"
        lines={[label]}
        baseDelay={delay + 0.25}
        isInView={isInView}
        className="mt-[8px] lowercase text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: '17px', letterSpacing: 0 }}
      />
    </div>
  )
}

function MobileQuoteBlock({
  quoteLines,
  name,
  role,
  isInView,
  delay = 0,
}: {
  quoteLines: string[]
  name: string
  role: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div>
      <AnimatedLines
        as="p"
        lines={quoteLines}
        baseDelay={delay}
        isInView={isInView}
        className="text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: '138%', letterSpacing: '-0.18px' }}
      />
      <div className="mt-[18px]">
        <AnimatedLines
          as="div"
          lines={[name]}
          baseDelay={delay + 0.3}
          isInView={isInView}
          className="text-[16px] font-medium text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        />
        <AnimatedLines
          as="div"
          lines={[role]}
          baseDelay={delay + 0.33}
          isInView={isInView}
          className="mt-[4px] text-[13px] text-white/60"
          style={{ fontFamily: 'var(--font-display)' }}
        />
      </div>
    </div>
  )
}

function WhyUsMobile() {
  const canvas = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, amount: 0.2 })

  return (
    <section className="relative block w-full overflow-hidden bg-[#08090b] lg:hidden">
      <div
        ref={canvas.outerRef}
        className="relative w-full overflow-hidden"
        style={{ height: canvas.naturalHeight * canvas.scale }}
      >
        <div
          ref={canvas.innerRef}
          className="absolute left-0 top-0"
          style={{ width: MOBILE_DESIGN_WIDTH, transform: `scale(${canvas.scale})`, transformOrigin: 'top left' }}
        >
          <div ref={contentRef} className="flex flex-col px-[24px] py-[56px]">
            {/* header badge */}
            <div className="inline-flex w-fit items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]">
              <span
                className="h-[6px] w-[6px] shrink-0"
                style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
              />
              <span className="text-[12px] font-medium uppercase text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                Why us
              </span>
            </div>

            {/* heading */}
            <div className="mt-[20px]">
              <AnimatedLines
                as="div"
                lines={['Built for traders who move fast — powerful execution, deep market access,']}
                baseDelay={1 * TEXT_STEP}
                isInView={inView}
                className="font-medium text-white"
                style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: '32px', letterSpacing: '-0.7px' }}
              />
              <AnimatedLines
                as="div"
                lines={['and smarter tools without the complexity.']}
                baseDelay={3 * TEXT_STEP}
                isInView={inView}
                className="font-medium text-white/50"
                style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: '32px', letterSpacing: '-0.7px' }}
              />
            </div>

            {/* stacked cards, same reading order as desktop */}
            <div className="mt-[32px] flex flex-col">
              {/* 99.99% platform uptime */}
              <div className="relative h-[176px] w-full overflow-hidden">
                <DotMatrix
                  src={cardTexture}
                  width={MOBILE_CARD_WIDTH}
                  height={MOBILE_CARD_HEIGHT}
                  crop={MOBILE_UPTIME_CROP}
                  pitch={6}
                  gain={1.6}
                  radius={70}
                  ambient
                  autoSweepMs={5000}
                  className="absolute left-0 top-0"
                />
                <div className="absolute inset-0 bg-[#08090b]/40" />
                <div className="relative flex h-full flex-col justify-center px-[24px]">
                  <MobileStatBlock value="99.99%" label="platform uptime" isInView={inView} delay={0.35} />
                </div>
              </div>

              {/* 100+ trading pairs */}
              <div className="flex items-center gap-[16px] border-t border-white/10 px-[2px] py-[28px]">
                <IconWithBrackets icon={buyCryptoIcon} isInView={inView} delay={0.55} />
                <MobileStatBlock value="100+" label="trading pairs" isInView={inView} delay={0.45} />
              </div>

              {/* Sophia Bennett quote */}
              <div className="border-t border-white/10 px-[2px] py-[28px]">
                <MobileQuoteBlock
                  quoteLines={[
                    '“Built for both active traders and long-term investors, SUCTRA combines powerful trading tools with clear analytics and risk controls — so every decision stays in your hands.”',
                  ]}
                  name="Sophia Bennett"
                  role="Portfolio Manager, Vertex Digital"
                  isInView={inView}
                  delay={0.4}
                />
              </div>

              {/* Daniel Carter quote */}
              <div className="border-t border-white/10 px-[2px] py-[28px]">
                <MobileQuoteBlock
                  quoteLines={[
                    '“From market discovery to execution, everything you need is in one place. Track opportunities, manage positions, and react to market moves without switching between platforms.”',
                  ]}
                  name="Daniel Carter"
                  role="Senior Crypto Trader, Nexora Capital"
                  isInView={inView}
                  delay={0.55}
                />
              </div>

              {/* <50ms average execution speed */}
              <div className="flex items-center gap-[16px] border-t border-white/10 px-[2px] py-[28px]">
                <IconWithBrackets icon={timerIcon} isInView={inView} delay={0.7} />
                <MobileStatBlock value="<50ms" label="average execution speed" isInView={inView} delay={0.6} />
              </div>

              {/* 24/7 market access */}
              <div className="relative h-[176px] w-full overflow-hidden border-t border-white/10">
                <DotMatrix
                  src={cardTexture}
                  width={MOBILE_CARD_WIDTH}
                  height={MOBILE_CARD_HEIGHT}
                  crop={MOBILE_ACCESS_CROP}
                  pitch={6}
                  gain={1.6}
                  radius={70}
                  ambient
                  autoSweepMs={5000}
                  className="absolute left-0 top-0"
                />
                <div className="absolute inset-0 bg-[#08090b]/40" />
                <div className="relative flex h-full flex-col justify-center px-[24px]">
                  <MobileStatBlock value="24/7" label="market access" isInView={inView} delay={0.7} />
                </div>
              </div>
            </div>

            {/* bottom comb divider */}
            <motion.img
              src={combDivider}
              alt=""
              className="mt-[32px] w-full"
              style={{ height: 32 }}
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function WhyUs() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, amount: 0.3 })

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden bg-[#08090b] lg:block"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        ref={contentRef}
        className="absolute left-0 top-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="absolute" style={{ left: PAD_X, top: PAD_Y, width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}>
          {/* header */}
          <motion.div
            className="absolute inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
            style={{ left: 1, top: 0 }}
            {...popIn(inView, 0)}
          >
            <span
              className="h-[6px] w-[6px] shrink-0"
              style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
            />
            <span className="text-[13px] font-medium uppercase text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
              Why us
            </span>
          </motion.div>

          <div className="absolute" style={{ left: 1, top: 50, width: 1350 }}>
            <AnimatedLines
              as="div"
              lines={['Built for traders who move fast — powerful', 'execution, deep market access, and smarter']}
              baseDelay={1 * TEXT_STEP}
              isInView={inView}
              className="font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: '40.32px', letterSpacing: '-1.26px' }}
            />
            <AnimatedLines
              as="div"
              lines={['tools without the complexity.']}
              baseDelay={3 * TEXT_STEP}
              isInView={inView}
              className="font-medium text-white/50"
              style={{ fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: '40.32px', letterSpacing: '-1.26px' }}
            />
          </div>

          {/* grid lines */}
          <DrawInLines isInView={inView} />

          {/* 99.99% platform uptime */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ left: 2, top: 239, width: 338, height: 350 }}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <DotMatrix
              src={cardTexture}
              width={338}
              height={350}
              crop={UPTIME_CROP}
              pitch={7}
              gain={1.6}
              radius={90}
              className="absolute left-0 top-0"
            />
            <div className="absolute inset-0 bg-[#08090b]/40" />
            <Stat x={36} y={41} value="99.99%" label="platform uptime" isInView={inView} delay={0.35} />
          </motion.div>

          {/* 100+ trading pairs */}
          <div className="absolute" style={{ left: 343, top: 241, width: 338, height: 350 }}>
            <Stat x={36} y={41} value="100+" label="trading pairs" isInView={inView} delay={0.45} />
            <div className="absolute" style={{ left: 36, top: 273 }}>
              <IconWithBrackets icon={buyCryptoIcon} isInView={inView} delay={0.55} />
            </div>
          </div>

          {/* Sophia Bennett quote */}
          <div className="absolute" style={{ left: 681, top: 239, width: 699, height: 350 }}>
            <Quote
              x={28}
              y={50}
              width={620}
              quoteLines={[
                '“Built for both active traders and long-term investors,',
                'SUCTRA combines powerful trading tools with clear',
                'analytics and risk controls — so every decision stays in',
                'your hands.”',
              ]}
              name="Sophia Bennett"
              role="Portfolio Manager, Vertex Digital"
              isInView={inView}
              delay={0.4}
            />
          </div>

          {/* Daniel Carter quote */}
          <div className="absolute" style={{ left: 6, top: 588, width: 675, height: 352 }}>
            <Quote
              x={31}
              y={39}
              width={588}
              quoteLines={[
                '“From market discovery to execution, everything you',
                'need is in one place. Track opportunities, manage',
                'positions, and react to market moves without switching',
                'between platforms.”',
              ]}
              name="Daniel Carter"
              role="Senior Crypto Trader, Nexora Capital"
              isInView={inView}
              delay={0.55}
            />
          </div>

          {/* <50ms average execution speed */}
          <div className="absolute" style={{ left: 681, top: 591, width: 349, height: 350 }}>
            <Stat x={36} y={41} value="<50ms" label="average execution speed" isInView={inView} delay={0.6} />
            <div className="absolute" style={{ left: 36, top: 273 }}>
              <IconWithBrackets icon={timerIcon} isInView={inView} delay={0.7} />
            </div>
          </div>

          {/* 24/7 market access */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ left: 1030, top: 591, width: 350, height: 350 }}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <DotMatrix
              src={cardTexture}
              width={350}
              height={350}
              crop={ACCESS_CROP}
              pitch={7}
              gain={1.6}
              radius={90}
              className="absolute left-0 top-0"
            />
            <div className="absolute inset-0 bg-[#08090b]/40" />
            <Stat x={36} y={41} value="24/7" label="market access" isInView={inView} delay={0.7} />
          </motion.div>

          {/* bottom comb divider */}
          <motion.img
            src={combDivider}
            alt=""
            className="absolute"
            style={{ left: 0, top: 943, width: CONTENT_WIDTH, height: 40 }}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
    <WhyUsMobile />
    </>
  )
}
END CODE src/sections/WhyUs.tsx

Notes on WhyUs.tsx: desktop canvas 1510x1283, a bento grid drawn with animated 1px white/20 lines (verticals 0.07s apart, then horizontals from 0.3s). Stats count up keeping their format (99.99%, 100+, <50ms, 24/7) and their labels are forced lowercase. Two cells render the pricing texture as a dot-matrix (different crops, darkened by a #08090b/40 overlay). Quotes are pre-broken into lines on desktop and wrap freely on mobile. The mobile version stacks the same six cells in the same reading order, separated by border-t white/10, with ambient dot-matrix cards that re-sweep every 5s.
CRITICAL DETAIL - DO NOT DROP: the bracket corners around the icons (four 13.4x10 L-shaped border-white/70 ticks around a 42px box) and the #08090b/40 darkening overlay on the dot-matrix cells.

==================================================
FILE: src/sections/CTA.tsx
Section 5: CTA.
==================================================

BEGIN CODE src/sections/CTA.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
const waveGlow = 'https://qclay.design/lovable/kraken/cta-wave-glow.webp'
import PortfolioDashboard from './PortfolioDashboard'
import { popIn, AnimatedLines, DrumText } from '../lib/animations'
import DotMatrix from '../lib/DotMatrix'

const DESIGN_WIDTH = 1516
const DESIGN_HEIGHT = 1275

// the wave image used to be drawn at 1720x928.5 * 1.05 from (-10, 346); only the
// part inside the canvas (1526x929 px on screen) was ever visible - this is that
// part in source px of the 2298x1417 texture
const WAVE_CROP = { x: 0, y: 0, w: 1942, h: 1182 }

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

const MOBILE_DESIGN_WIDTH = 420

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M1 5.5H10M10 5.5L6.5 2M10 5.5L6.5 9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 1px inside stroke that fades out top to bottom (Figma gradient stroke):
// the gradient is masked down to just the border ring
function GradientStroke({ stops }: { stops: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: 'inherit',
        padding: 1,
        background: `linear-gradient(180deg, ${stops})`,
        mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
      }}
    />
  )
}

const TEXT_STEP = 0.03
const CHROME_BAR_HEIGHT = 28
const WINDOW_INSET = 14
const WINDOW_DASHBOARD_WIDTH = 380 - WINDOW_INSET * 2
// PortfolioDashboard's canvas is 718.4 tall, but real content (through the Open
// Positions table) ends around y≈511 — the rest is empty background. Crop to
// this height instead of the full canvas so no blank space shows below the card.
const DASHBOARD_CROP_HEIGHT = 535
const MOBILE_WINDOW_HEIGHT = CHROME_BAR_HEIGHT + (WINDOW_DASHBOARD_WIDTH * DASHBOARD_CROP_HEIGHT) / 948 + WINDOW_INSET

// mobile: dune band of the wave texture behind the lower part of the window,
// running on into the 40px bottom margin
const MOBILE_WAVE_TOP = 90
const MOBILE_WAVE_HEIGHT = MOBILE_WINDOW_HEIGHT - MOBILE_WAVE_TOP + 40
const MOBILE_WAVE_CROP = { x: 150, y: 250, w: 2000, h: 1000 }

export default function CTA() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const mobile = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, amount: 0.3 })
  const mobileInView = useInView(mobile.innerRef, { once: true, amount: 0.2 })
  const [auditHovering, setAuditHovering] = useState(false)
  const [mobileAuditHovering, setMobileAuditHovering] = useState(false)

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden bg-[#08090b] lg:block"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        ref={contentRef}
        className="absolute left-0 top-0"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* warm glow overlay on the dark base */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: 255,
            width: 1516,
            height: 594,
            background: 'linear-gradient(180deg, rgba(254,107,29,0) 0%, rgba(254,107,29,0.2) 100%)',
          }}
        />

        {/* text block */}
        <motion.div
          className="absolute inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
          style={{ left: 66, top: 0 }}
          {...popIn(inView, 0)}
        >
          <span
            className="h-[6px] w-[6px] shrink-0"
            style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
          />
          <span className="text-[13px] font-medium uppercase text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
            FAQs
          </span>
        </motion.div>

        <AnimatedLines
          as="h2"
          lines={["Let's Talk Trading"]}
          baseDelay={1 * TEXT_STEP}
          isInView={inView}
          className="absolute font-medium text-white"
          style={{ left: 66, top: 46.4, width: 561, fontFamily: 'var(--font-display)', fontSize: 54, lineHeight: '51.84px', letterSpacing: '-1.62px' }}
        />

        <AnimatedLines
          as="p"
          lines={[
            'Have questions about KRAKEN, your account, or our trading tools? Our team is here to',
            'help you get the answers you need and make the most of the platform.',
          ]}
          baseDelay={2 * TEXT_STEP}
          isInView={inView}
          lineClassName="whitespace-nowrap"
          className="absolute text-[16px] text-white/60"
          style={{ left: 66, top: 113.2, width: 409, fontFamily: 'var(--font-display)', lineHeight: '20px' }}
        />

        <motion.div
          className="absolute flex h-[30px] items-center justify-center gap-[7px] bg-white px-[9px]"
          style={{ left: 66, top: 185.2, width: 105 }}
          {...popIn(inView, 120)}
          onMouseEnter={() => setAuditHovering(true)}
          onMouseLeave={() => setAuditHovering(false)}
        >
          <DrumText
            text="View audit"
            hovering={auditHovering}
            className="whitespace-nowrap text-[14px] font-medium text-black"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
          />
          <span className="h-[16px] w-px bg-black/10" />
          <ArrowRight color="black" />
        </motion.div>

        {/* wave / dot-pattern glow graphic */}
        <DotMatrix
          src={waveGlow}
          width={1526}
          height={929}
          crop={WAVE_CROP}
          flipX
          pitch={12}
          gain={1.7}
          radius={150}
          litOnly
          backdrop="rgba(10,7,5,0.9)"
          backdropFade={120}
          className="absolute z-[3]"
          style={{ left: -5, top: 346, transform: 'scale(1.05)', transformOrigin: 'left bottom' }}
        />

        {/* glass card illustration */}
        {/* runs past the right edge of the canvas, as in the design */}
        <div
          className="absolute z-[1]"
          style={{
            left: 684,
            top: 13,
            width: 1128,
            height: 697,
            borderRadius: '20px 0 0 20px',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <GradientStroke stops="rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.07) 43.4%, rgba(255,255,255,0) 89.9%" />
        </div>
        <div
          className="absolute z-[1] backdrop-blur-[30px]"
          style={{
            left: 690,
            top: 19,
            width: 1114,
            height: 674,
            borderRadius: '16px 0 0 16px',
            background:
              'linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04)), linear-gradient(180deg, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.4) 30.4%, rgba(6,6,6,0) 78.1%)',
          }}
        >
          <GradientStroke stops="rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.07) 56%, rgba(255,255,255,0) 115.8%" />
        </div>
        <PortfolioDashboard x={704} y={61} width={1067.9} height={618} scale={1067.9 / 948} radius={8} zIndex={2} />
        <div className="absolute z-[4] flex items-center gap-[8px]" style={{ left: 704, top: 36 }}>
          <span className="h-[10px] w-[10px] rounded-full bg-white" />
          <span className="h-[10px] w-[10px] rounded-full bg-white/50" />
          <span className="h-[10px] w-[10px] rounded-full bg-white/20" />
        </div>

      </div>
    </section>

    <section className="relative block w-full overflow-hidden bg-[#08090b] lg:hidden">
      <div
        ref={mobile.outerRef}
        className="relative w-full overflow-hidden"
        style={{ height: mobile.naturalHeight * mobile.scale }}
      >
        <div
          ref={mobile.innerRef}
          className="absolute left-0 top-0"
          style={{
            width: MOBILE_DESIGN_WIDTH,
            transform: `scale(${mobile.scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* warm glow overlay on the dark base */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: MOBILE_DESIGN_WIDTH,
              height: 320,
              background: 'linear-gradient(180deg, rgba(254,107,29,0) 0%, rgba(254,107,29,0.2) 100%)',
            }}
          />

          <div className="relative flex flex-col items-center px-6 pb-10 pt-14 text-center">
            <motion.div
              className="inline-flex items-center gap-[6px] whitespace-nowrap border border-white/10 bg-white/10 px-[10px] py-[6px]"
              {...popIn(mobileInView, 0)}
            >
              <span
                className="h-[6px] w-[6px] shrink-0"
                style={{ background: 'linear-gradient(180deg, #FF6215 0%, #FFF28E 100%)' }}
              />
              <span className="text-[13px] font-medium uppercase text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                FAQs
              </span>
            </motion.div>

            <AnimatedLines
              as="h2"
              lines={["Let's Talk Trading"]}
              baseDelay={1 * TEXT_STEP}
              isInView={mobileInView}
              className="mt-6 font-medium text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: '34px', letterSpacing: '-1px' }}
            />

            <AnimatedLines
              as="p"
              lines={[
                'Have questions about KRAKEN, your account, or our trading tools? Our team is here to help you get the answers you need and make the most of the platform.',
              ]}
              baseDelay={2 * TEXT_STEP}
              isInView={mobileInView}
              className="mt-4 text-[15px] text-white/60"
              style={{ fontFamily: 'var(--font-display)', lineHeight: '22px' }}
            />

            <motion.div
              className="mt-6 flex h-[42px] items-center justify-center gap-[7px] bg-white px-[16px]"
              {...popIn(mobileInView, 120)}
              onMouseEnter={() => setMobileAuditHovering(true)}
              onMouseLeave={() => setMobileAuditHovering(false)}
            >
              <DrumText
                text="View audit"
                hovering={mobileAuditHovering}
                className="whitespace-nowrap text-[14px] font-medium text-black"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.14px' }}
              />
              <span className="h-[16px] w-px bg-black/10" />
              <ArrowRight color="black" />
            </motion.div>
          </div>

          <div className="relative pb-10">
          <DotMatrix
            src={waveGlow}
            width={MOBILE_DESIGN_WIDTH}
            height={MOBILE_WAVE_HEIGHT}
            crop={MOBILE_WAVE_CROP}
            flipX
            pitch={8}
            gain={1.7}
            radius={80}
            ambient
            autoSweepMs={6000}
            className="absolute left-0"
            style={{ top: MOBILE_WAVE_TOP }}
          />
          <div
            className="relative z-[1] mx-auto overflow-hidden rounded-[9px] border border-white/15 backdrop-blur-[27px]"
            style={{
              width: 380,
              height: MOBILE_WINDOW_HEIGHT,
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <div className="absolute flex items-center gap-[4px]" style={{ left: 14, top: 11 }}>
              <span className="h-[7px] w-[7px] rounded-full bg-white" />
              <span className="h-[7px] w-[7px] rounded-full bg-white/50" />
              <span className="h-[7px] w-[7px] rounded-full bg-white/20" />
            </div>
            <PortfolioDashboard
              x={WINDOW_INSET}
              y={CHROME_BAR_HEIGHT}
              width={WINDOW_DASHBOARD_WIDTH}
              height={(WINDOW_DASHBOARD_WIDTH * DASHBOARD_CROP_HEIGHT) / 948}
              scale={WINDOW_DASHBOARD_WIDTH / 948}
              revealDelay={0.2}
            />
          </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
END CODE src/sections/CTA.tsx

Notes on CTA.tsx: desktop canvas 1516x1275. Text block spacing: FAQs tag at top 0, heading at top 46.4, paragraph at top 113.2, "View audit" button at top 185.2 (x 66 for all). The dashboard window follows the Figma frame and deliberately runs past the right edge of the canvas (cropped by overflow-hidden): outer glass frame at (684, 13) 1128x697 with only the left corners rounded 20px, fill rgba(255,255,255,0.04); inner frame at (690, 19) 1114x674, left corners 16px, backdrop-blur 30px, background 'linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04)), linear-gradient(180deg, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.4) 30.4%, rgba(6,6,6,0) 78.1%)'; both frames have a 1px white stroke that fades out top to bottom (GradientStroke, a masked gradient ring). Dashboard at (704, 61) 1067.9x618, window dots 10px with an 8px gap at (704, 36). The wave is mirrored (flipX) on desktop and mobile; on desktop it sits at left -5, top 346 with transform scale(1.05) from the left bottom corner, and has backdrop="rgba(10,7,5,0.9)" backdropFade={120} so the part of the dashboard under the dune is darkened, fading in below the wave's top edge. Layer order matters (z-index): glass card z-1, dashboard z-2, the dot-matrix wave z-3 (it deliberately draws OVER the lower part of the dashboard window), window dots z-4. WAVE_CROP is the part of the 2298x1417 source that is visible in the 1526x929 block. The desktop wave has litOnly: without it the cursor glyphs (black) are drawn over the white dashboard wherever the source is empty; only the real wave dots may overlap the window. shows a narrower dune band of the same wave behind the lower part of the window, ambient, re-sweeping every 6s.
CRITICAL DETAIL - DO NOT DROP: the warm overlay 'linear-gradient(180deg, rgba(254,107,29,0) 0%, rgba(254,107,29,0.2) 100%)' (594px tall from y 255 on desktop, 320px on mobile); on desktop the two glass frames with their fading GradientStroke and the dark inner gradient, and the wave's flipX + backdrop darkening; on mobile the glass window backdrop-blur-[27px] with rgba(255,255,255,0.06).

==================================================
FILE: src/sections/Footer.tsx
Section 6: Footer.
==================================================

BEGIN CODE src/sections/Footer.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
const krakenMark = 'https://qclay.design/lovable/kraken/hero-kraken-mark.svg'
const xIcon = 'https://qclay.design/lovable/kraken/footer-x.svg'
const linkedinIcon = 'https://qclay.design/lovable/kraken/footer-linkedin.svg'
const githubIcon = 'https://qclay.design/lovable/kraken/footer-github.svg'
import { popIn, AnimatedLines, HoverLine } from '../lib/animations'

const DESIGN_WIDTH = 1514
const DESIGN_HEIGHT = 618
const PAD_X = 40
const CONTENT_WIDTH = 1434
const FOOTER_TOP_TRIM_VH = 10
const TEXT_STEP = 0.03
const ITEMS_PER_COLUMN = 7
const MOBILE_DESIGN_WIDTH = 420

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

function useFitScaleAuto(designWidth: number) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / designWidth)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (height) setNaturalHeight(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, scale, naturalHeight }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 1.5L9 4.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 1.5V10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const columns = [
  {
    header: 'PRODUCTS',
    x: 470,
    links: ['Spot Trading', 'Futures', 'Copy Trading', 'Staking', 'Earn', 'Trading Bots'],
  },
  {
    header: 'MARKETS',
    x: 705,
    links: ['Markets', 'Cryptocurrencies', 'New Listings', 'Top Gainers', 'Market Trends', 'Trading Fees'],
  },
  {
    header: 'TRADERS',
    x: 1019,
    links: ['Top Traders', 'Copy Trading', 'Leaderboard', 'Become a Trader', 'Referral Program', 'Rewards'],
  },
  {
    header: 'RESOURCES',
    x: 1254,
    links: ['Learn', 'Trading Guides', 'Market Insights', 'Help Center', 'About Us', 'Contact Us'],
  },
]

const legalLinks = ['Legal', 'Privacy', 'Data Privacy', 'Certifications', 'Cookies']

const blurbLines = [
  'Trade smarter. Move with the market.',
  'A powerful crypto trading platform built to',
  'help you track markets, manage positions,',
  'and act on opportunities with confidence.',
]

const DASH_BG = 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0 10px, transparent 10px 18px)'
const DASH_BG_H = 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 18px)'

const verticalDividers = [
  { left: 0, top: 0, height: 618 },
  { left: CONTENT_WIDTH, top: 0, height: 618 },
  { left: 402, top: 75, height: 500 },
  { left: 439, top: 78, height: 500 },
  { left: 928, top: 75, height: 441 },
  { left: 965, top: 78, height: 441 },
]

const horizontalDividers = [
  { left: 9, top: 519, width: 1424 },
  { left: 0, top: 578, width: 1424 },
]

function DrawInDividers({ isInView }: { isInView: boolean }) {
  return (
    <>
      {verticalDividers.map((d, i) => (
        <motion.span
          key={`v-${i}`}
          className="absolute w-px"
          style={{ left: d.left, top: d.top, backgroundImage: DASH_BG }}
          initial={{ height: 0 }}
          animate={isInView ? { height: d.height } : { height: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.08 }}
        />
      ))}
      {horizontalDividers.map((d, i) => (
        <motion.span
          key={`h-${i}`}
          className="absolute h-px"
          style={{ left: d.left, top: d.top, backgroundImage: DASH_BG_H }}
          initial={{ width: 0 }}
          animate={isInView ? { width: d.width } : { width: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 + i * 0.08 }}
        />
      ))}
    </>
  )
}

function FooterColumn({
  header,
  x,
  links,
  colIndex,
  isInView,
}: {
  header: string
  x: number
  links: string[]
  colIndex: number
  isInView: boolean
}) {
  const base = 5 + colIndex * ITEMS_PER_COLUMN

  return (
    <div className="absolute" style={{ left: x, top: 193 }}>
      <AnimatedLines
        lines={[header]}
        baseDelay={base * TEXT_STEP}
        isInView={isInView}
        className="text-[12px] uppercase text-white/50"
        style={{ fontFamily: 'var(--font-mono-label)', letterSpacing: '0.48px' }}
      />
      {links.map((link, i) => (
        <HoverLine
          key={link}
          text={link}
          baseDelay={(base + 1 + i) * TEXT_STEP}
          effect="scramble"
          isInView={isInView}
          className="absolute whitespace-nowrap text-[16px] font-medium text-white"
          style={{ top: 42 + i * 33, fontFamily: 'var(--font-logo)' }}
        />
      ))}
    </div>
  )
}

function MobileFooter() {
  const mobile = useFitScaleAuto(MOBILE_DESIGN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, amount: 0.2 })

  const bottomBase = 5 + columns.length * ITEMS_PER_COLUMN
  const dashedH = 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 6px, transparent 6px 11px)'

  return (
    <section className="relative block w-full overflow-hidden bg-[#08090b] lg:hidden">
      <div
        ref={mobile.outerRef}
        className="relative w-full overflow-hidden"
        style={{ height: mobile.naturalHeight * mobile.scale }}
      >
        <div
          ref={mobile.innerRef}
          className="absolute left-0 top-0"
          style={{ width: MOBILE_DESIGN_WIDTH, transform: `scale(${mobile.scale})`, transformOrigin: 'top left' }}
        >
          <div ref={contentRef} className="flex flex-col gap-[36px] px-[24px] py-[56px]">
            {/* logo + blurb */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center">
                <motion.img src={krakenMark} alt="" width={30} height={23} {...popIn(inView, 0)} />
                <AnimatedLines
                  lines={['Kraken']}
                  baseDelay={0}
                  isInView={inView}
                  className="ml-[9px] text-[26px] font-medium text-white"
                  style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.52px' }}
                />
              </div>
              <AnimatedLines
                as="p"
                lines={blurbLines.join(' ').split(/(?<=\.)\s+/)}
                baseDelay={1 * TEXT_STEP}
                isInView={inView}
                className="text-[15px] text-white/60"
                style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.16px', lineHeight: '140%' }}
              />
            </div>

            {/* social icons */}
            <div className="flex items-center gap-[8px]">
              <motion.a
                href="#"
                className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
                {...popIn(inView, 40)}
              >
                <img src={xIcon} alt="X" width={18} height={18} className="transition-transform duration-300 group-hover:scale-90" />
              </motion.a>
              <motion.a
                href="#"
                className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
                {...popIn(inView, 70)}
              >
                <img src={linkedinIcon} alt="LinkedIn" width={16} height={16} className="transition-transform duration-300 group-hover:scale-90" />
              </motion.a>
              <motion.a
                href="#"
                className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
                {...popIn(inView, 100)}
              >
                <img src={githubIcon} alt="GitHub" width={16} height={16} className="transition-transform duration-300 group-hover:scale-90" />
              </motion.a>
            </div>

            <span className="h-px w-full" style={{ backgroundImage: dashedH }} />

            {/* link columns */}
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[32px]">
              {columns.map((col, i) => {
                const base = 5 + i * ITEMS_PER_COLUMN
                return (
                  <div key={col.header} className="flex flex-col">
                    <AnimatedLines
                      lines={[col.header]}
                      baseDelay={base * TEXT_STEP}
                      isInView={inView}
                      className="text-[11px] uppercase text-white/50"
                      style={{ fontFamily: 'var(--font-mono-label)', letterSpacing: '0.44px' }}
                    />
                    <div className="mt-[14px] flex flex-col gap-[12px]">
                      {col.links.map((link, j) => (
                        <HoverLine
                          key={link}
                          text={link}
                          baseDelay={(base + 1 + j) * TEXT_STEP}
                          effect="scramble"
                          isInView={inView}
                          className="text-[14px] font-medium text-white"
                          style={{ fontFamily: 'var(--font-logo)' }}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <span className="h-px w-full" style={{ backgroundImage: dashedH }} />

            {/* bottom bar */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[10px]">
                {legalLinks.map((link, i) => (
                  <HoverLine
                    key={link}
                    as="span"
                    text={link}
                    baseDelay={(bottomBase + 1 + i) * TEXT_STEP}
                    isInView={inView}
                    className="whitespace-nowrap text-[11px] uppercase text-white/40"
                    style={{ fontFamily: 'var(--font-mono-label)' }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <AnimatedLines
                  lines={['© 2026 processing.com. All rights reserved.']}
                  baseDelay={bottomBase * TEXT_STEP}
                  isInView={inView}
                  className="uppercase text-white/40"
                  style={{ fontFamily: 'var(--font-mono-label)', fontSize: 11 }}
                />
                <motion.button
                  type="button"
                  aria-label="Back to top"
                  onClick={scrollToTop}
                  className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-white/[0.09]"
                  {...popIn(inView, 130)}
                >
                  <ArrowUp />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Footer() {
  const canvas = useFitScale(DESIGN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, amount: 0.2 })

  const bottomBase = 5 + columns.length * ITEMS_PER_COLUMN

  return (
    <>
    <section
      ref={canvas.ref}
      className="relative hidden w-full overflow-hidden bg-[#08090b] lg:block"
      style={{ height: `calc(${DESIGN_HEIGHT * canvas.scale}px - ${FOOTER_TOP_TRIM_VH}vh)` }}
    >
      <div
        className="absolute left-0"
        style={{
          top: `-${FOOTER_TOP_TRIM_VH}vh`,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${canvas.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div ref={contentRef} className="absolute" style={{ left: PAD_X, top: 0, width: CONTENT_WIDTH, height: DESIGN_HEIGHT }}>
          <DrawInDividers isInView={inView} />

          {/* logo + blurb */}
          <div className="absolute flex items-center" style={{ left: 20, top: 195 }}>
            <motion.img src={krakenMark} alt="" width={34} height={26} {...popIn(inView, 0)} />
            <AnimatedLines
              lines={['Kraken']}
              baseDelay={0}
              isInView={inView}
              className="ml-[10px] text-[32px] font-medium text-white"
              style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.64px' }}
            />
          </div>
          <AnimatedLines
            as="p"
            lines={blurbLines}
            baseDelay={1 * TEXT_STEP}
            isInView={inView}
            lineClassName="whitespace-nowrap"
            className="absolute text-[16px] text-white/60"
            style={{ left: 20, top: 256, width: 306, fontFamily: 'var(--font-logo)', letterSpacing: '-0.16px', lineHeight: '140%' }}
          />

          {/* social icons */}
          <div className="absolute flex items-center gap-[4px]" style={{ left: 20, top: 416 }}>
            <motion.a
              href="#"
              className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
              {...popIn(inView, 40)}
            >
              <img src={xIcon} alt="X" width={18} height={18} className="transition-transform duration-300 group-hover:scale-90" />
            </motion.a>
            <motion.a
              href="#"
              className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
              {...popIn(inView, 70)}
            >
              <img src={linkedinIcon} alt="LinkedIn" width={16} height={16} className="transition-transform duration-300 group-hover:scale-90" />
            </motion.a>
            <motion.a
              href="#"
              className="group flex h-[36px] w-[36px] items-center justify-center rounded-[2px] bg-white/5 transition-colors duration-300 hover:bg-white/10"
              {...popIn(inView, 100)}
            >
              <img src={githubIcon} alt="GitHub" width={16} height={16} className="transition-transform duration-300 group-hover:scale-90" />
            </motion.a>
          </div>

          {/* link columns */}
          {columns.map((col, i) => (
            <FooterColumn key={col.header} header={col.header} x={col.x} links={col.links} colIndex={i} isInView={inView} />
          ))}

          {/* bottom bar */}
          <AnimatedLines
            lines={['© 2026 processing.com. All rights reserved.']}
            baseDelay={bottomBase * TEXT_STEP}
            isInView={inView}
            className="absolute uppercase text-white/40"
            style={{ left: 20, top: 539, fontFamily: 'var(--font-mono-label)', fontSize: 12 }}
          />

          <div className="absolute flex items-center gap-[16px]" style={{ left: 470, top: 539 }}>
            {legalLinks.map((link, i) => (
              <HoverLine
                key={link}
                as="span"
                text={link}
                baseDelay={(bottomBase + 1 + i) * TEXT_STEP}
                isInView={inView}
                className="whitespace-nowrap text-[12px] uppercase text-white/40"
                style={{ fontFamily: 'var(--font-mono-label)' }}
              />
            ))}
          </div>

          <div
            className="absolute flex cursor-pointer items-center gap-[16px]"
            style={{ left: 1247, top: 535 }}
            onClick={scrollToTop}
          >
            <HoverLine
              as="span"
              text="Back to top"
              baseDelay={(bottomBase + 1 + legalLinks.length) * TEXT_STEP}
              isInView={inView}
              className="text-[12px] uppercase text-white/40"
              style={{ fontFamily: 'var(--font-mono-label)' }}
            />
            <motion.button
              type="button"
              aria-label="Back to top"
              className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white/[0.09]"
              {...popIn(inView, 130)}
            >
              <ArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
    <MobileFooter />
    </>
  )
}
END CODE src/sections/Footer.tsx

Notes on Footer.tsx: desktop canvas 1514x618 with its top trimmed by 10vh: the section height is calc(618 * scale px - 10vh) and the canvas is shifted up by -10vh, which compensates the 10vh spacer after the Hero. Keep both halves of this trick. Dividers are dashed lines drawn in (verticals 0.08s apart, then horizontals from 0.4s). Link columns cascade: each column starts at (5 + columnIndex * 7) * TEXT_STEP and each link adds one TEXT_STEP; the bottom bar follows after all columns. Column links (desktop and mobile) re-roll their letters on hover like the Hero nav (HoverLine effect="scramble"); the bottom-row legal links and the Back to top label keep the drum flip. Social icons shrink to 90% on hover while their tile lightens. Back to top: the desktop label+arrow group and the mobile arrow button both call scrollToTop (window.scrollTo({ top: 0, behavior: 'smooth' })) on click - do not leave them as decorative buttons without onClick.
CRITICAL DETAIL - DO NOT DROP: the dashed dividers use backgroundImage 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0 10px, transparent 10px 18px)' (vertical) and 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 18px)' (horizontal); on mobile 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 6px, transparent 6px 11px)'. They must stay dashed, not solid borders.

==================================================
8. FINAL PIXEL-PERFECT CHECKLIST (VERIFY BEFORE GENERATING)
==================================================

Confirm you are building immediately without asking any question.
Confirm every asset is loaded from https://qclay.design/lovable/kraken/<exact filename>, with no subfolder, no placeholder, no icon-library substitute, and no local copy.
Confirm every file was reproduced verbatim at its path, including the duplicated useFitScale / useFitScaleAuto hooks in each section file.
Confirm every scale transform stays on a plain div with transformOrigin 'top left', never on a motion.div.
Confirm the only breakpoint is lg (1024px): desktop sections "hidden lg:block", mobile sections "block lg:hidden", nothing else.
Confirm no text got a new fixed height, line clamp or overflow:hidden, and the desktop whitespace-nowrap lines are kept.
Confirm the fonts: Helvetica Neue stack for --font-display, Inter Tight 500 for --font-logo, Fragment Mono for --font-mono-label, via the exact index.css.
Confirm render order: Hero, 10vh #08090b spacer, TickerGrid, Pricing, WhyUs, CTA, Footer, and the Footer's -10vh top trim.
Confirm animation timing is the computed cascade (TEXT_STEP 0.03, per-line 0.08, popIn spring, count-ups, line draw-ins), not a single fade for everything.
Confirm DrumText, ScrambleText, HoverLine, CountUp, useCoinCodeCycle and the swap widget logic behave exactly as coded.
Confirm DotMatrix keeps img.crossOrigin = 'anonymous' and v.crossOrigin = 'anonymous', so the dot-matrix blocks are not empty.
Confirm FlowGradient's GLSL is unchanged and sits above the blurred fallback image on the Pro card.
Confirm Hero's background gradient, three blurred glow blobs and the 45deg GuideBand hatch were not dropped or simplified.
Confirm PortfolioDashboard's 337.3deg HATCH on the allocation bars and the dashed dividers were not dropped or simplified.
Confirm TickerGrid's swap icon hover (rotate-180, cubic-bezier(0.65,0,0.35,1)) and the button's #FF6215 hover were not dropped.
Confirm TickerCells is rendered inside TickerGrid's desktop canvas before the grid lines, lights cells with the 120ms in / 1100ms out trail, unfolds the #e9e9e9 card after 420ms of rest, and keeps its idle flicker and self-unfolding cards.
Confirm Pricing's Pro card layer stack (scaled blurred image, FlowGradient, #E5710A/10 overlay, 160deg sheen) and the Trader card's 160deg gradient were not dropped or simplified.
Confirm WhyUs's bracket-corner icons and #08090b/40 overlays were not dropped.
Confirm CTA's warm orange overlay gradient and the wave's z-index above the dashboard were not dropped, and the desktop wave keeps litOnly (no ASCII glyphs over the dashboard when hovering it).
Confirm both Back to top controls (desktop label+button group, mobile round button) call scrollToTop on click and actually scroll the page to the top.
Confirm Footer's dashed repeating-linear-gradient dividers were not replaced by solid borders.

---
---

# SHARED DESIGN SYSTEM (prompts 2-6)

Prompts 2-6 are different websites for different domains, but they deliberately
reuse this exact design system, because it is what makes them feel like one
family. Do not substitute it.

**Non-negotiable across all five:**

1. **Stack:** Vite + React 19 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`,
   configured only through `@theme` in `index.css`, no `tailwind.config`), Framer
   Motion for all animation. No router, no backend, no state library.

2. **`src/lib/animations.tsx` is reused verbatim** - `popIn`, `DrumText`,
   `HoverLine`, `AnimatedLines`, `ScrambleText`. Do not rewrite it. Same for the
   `useFitScale` / `useFitScaleAuto` hooks: **duplicate them inside every section
   file** exactly as prompt 1 does, never extract them to a shared module.

3. **Fixed-pixel design canvas + `transform: scale()`.** Desktop sections render a
   fixed 1510-1545px-wide canvas scaled to the real width by `ResizeObserver`,
   with `transformOrigin: 'top left'` on a **plain div**. Mobile sections render a
   420px-wide canvas whose height is measured from natural content height
   (`useFitScaleAuto`). Exactly one breakpoint: Tailwind `lg` (1024px) - desktop
   `hidden lg:block`, mobile `block lg:hidden`. No `sm:`, no `md:`, no `xl:`, no
   `clamp()`, no `vw` units.

4. **Never put the scale transform on a `motion.div`.** Framer Motion overwrites
   `transform` and the canvas silently stops scaling.

5. **Animation language.** Scroll-triggered once (`useInView` with
   `once: true`) and choreographed. `AnimatedLines` slides each line up out of its
   overflow mask (0.5s easeOut, +0.08s per line) - text never simply fades.
   `popIn` is a spring (stiffness 340, damping 22, mass 0.8) for badges, buttons,
   icons, chips. Delays are computed from `TEXT_STEP = 0.03` (index * TEXT_STEP, or
   base offset + n * TEXT_STEP) so content cascades in reading order. Grid and guide
   lines draw in first (`width`/`height` or `scaleX`/`scaleY` from 0), then texts,
   then buttons. Numbers count up from 0 keeping their exact formatting - only the
   digits animate, separators like `$ , . % + < / - ms` stay put. Hover: buttons and
   badges drum-flip (`DrumText`), nav/footer links scramble-re-roll their letters
   (`ScrambleText` via `HoverLine effect="scramble"`).

6. **Interactive canvas.** Each domain needs its own interactive canvas element,
   replacing Kraken's `DotMatrix` / `FlowGradient` / `TickerCells` with something
   suited to the domain, but keeping the same engineering contract:
   - coordinates in design px, mapped through `getBoundingClientRect()` so the
     parent's `transform: scale()` is transparent to the pointer code;
   - resize the backing store to the real on-screen size, DPR capped at 2;
   - `IntersectionObserver` so nothing animates off screen;
   - a real interaction (cursor response or touch), plus an `ambient` mode that
     keeps it alive without a pointer and a timer that re-runs the effect on mobile;
   - respect the pointer's leave/tap-up, never trap the cursor.

7. **Type and color system.** `--font-display` (system Helvetica Neue stack) for
   everything structural, `--font-logo` (Inter Tight 500) for the wordmark and footer
   prose, `--font-mono-label` (Fragment Mono) for small uppercase labels. Headings
   `font-weight 500` with letter-spacing at about -3% of the font size and line-height
   at about 0.96 of the size. Body copy 16px white/60 or white/80 at line-height 20px.
   Every size, tracking and line-height written explicitly - never normalized to a
   type scale. One background color, one accent, white text at four or five opacities,
   hairline borders at white/10, white/15, white/20. Sharp corners everywhere except
   the glass "window" cards and the round dots.

8. **Never clip text.** No new fixed heights, no line clamps. The only
   `overflow:hidden` on text is inside `AnimatedLines`. Keep the desktop
   `whitespace-nowrap` on pre-broken canvas lines and the free wrapping on mobile.

9. **Assets stay remote.** Cloud URLs as string constants, full HTTPS, exact
   filenames, no subfolders, no local copies, no icon-library substitutes for
   provided art, no placeholder rectangles. If a canvas samples a remote image, it
   must set `crossOrigin = 'anonymous'` before `src` or the canvas is tainted and
   `getImageData` throws.

10. **Footer:** dashed `repeating-linear-gradient` dividers (not solid borders),
    four link columns cascading at `(5 + columnIndex * 7) * TEXT_STEP`, a real
    `scrollToTop` on both the desktop label+button group and the mobile round
    button.

---

# WEBSITE 2 - HELIOTROPE (space launch telemetry)

Build a single-page dark landing page for **Heliotrope**, a company that builds
flight software for orbital launch vehicles. Same stack, same design system, same
non-negotiables as the shared system above.

**Assets.** Base URL `https://qclay.design/lovable/heliotrope/`, served flat, as
string constants. Manifest you must use exactly as given:

- heliotrope-mark.svg (nav + footer)
- hero-plume.mp4 (hero, sampled by canvas)
- launch-trail.webp (interactive canvas)
- telemetry-window.webp (telemetry card background)
- favicon.svg (index.html)
- telemetry-axis.svg, telemetry-legend.svg, telemetry-gauge.svg (telemetry mock)
- countdown-bracket.svg, stage-separator.svg, orbit-ring.svg (section art)
- footer-x.svg, footer-linkedin.svg, footer-github.svg (footer)

**Palette.** Background `#07080a`. Accent `#4CC2FF` with brand gradient
`linear-gradient(180deg, #4CC2FF 0%, #D6F2FF 100%)`. Hero background gradient
`linear-gradient(180deg, #07080A 0%, #0B2B44 62.5%, #164A6B 100%)`. Highlight tint
`#7FD4FF` at 10%. Glass fill `rgba(255,255,255,0.06)`.

**Fonts.** `--font-display: 'Helvetica Neue', Helvetica, Arial, sans-serif`,
`--font-logo: 'Inter Tight'`, `--font-mono-label: 'Fragment Mono'` (loaded by the
single `@import` in `index.css`). Same `@theme` block shape as prompt 1.

**Page composition, top to bottom.**

1. **Hero** - nav (`Mission`, `Vehicles`, `Telemetry`, `Company`), badge
   `Orbital Flight Software`, headline `Launch on schedule.` / `Land on target.`,
   two CTAs (`Request a briefing`, `Contact us`), and a glass "window" card
   containing a live telemetry mock, sitting over a dot/plume canvas fed by
   `hero-plume.mp4`. Desktop canvas 1512x935; mobile 420px wide with a burger
   menu. Guide lines at x=58 and x=1452 growing full height, two hatched guide
   bands at y=87 and y=418.75 using
   `repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 9px)`,
   crosshair markers popping at their corners.

2. **10vh spacer** in `#07080a`, matched by a `-10vh` top trim on the footer.

3. **LaunchGrid** - a grid of drawn hairlines with vehicle labels
   (`HELIOTROPE-1`, `HELIOTROPE-2`, `ROADRUNNER`, `VOYAGER`), dot-matrix trail tiles
   from `launch-trail.webp`, and a **countdown widget** as the interactive centre
   piece: a T-10:00:00 style clock that counts down live, a stage indicator that
   steps Ignition → Max-Q → MECO → Sep, and a `HOLD` / `RESUME` button that
   freezes the clock. Empty grid cells light under the cursor with a fast-in
   (120ms) / slow-out (1100ms) background-color trail and ticking mono readouts;
   resting 420ms on a cell unfolds it into a light card showing that stage's
   altitude and velocity.

4. **Vehicles** - two vehicle cards (LEO-class, HEAVY-class). The HEAVY card runs a
   live WebGL domain-warped noise shader in cyan over a blurred static fallback,
   swirling around the cursor. Specs count up keeping their formatting
   (`68,000 kg`, `9,400 kg`, `21.7 m`).

5. **WhyUs** - bento grid with animated 1px lines: stats (`99.2%` on-time
   launches, `148` missions, `<11ms` guidance loop, `24/7` flight ops), two
   testimonial quotes, and two cells rendering `telemetry-window.webp` through the
   interactive canvas, darkened with `#07080a/40`.

6. **CTA** - `Let's Talk Flight` block with a second telemetry window over an
   interactive horizon-band canvas, warm-tinted overlay replaced here by
   `linear-gradient(180deg, rgba(76,194,255,0) 0%, rgba(76,194,255,0.18) 100%)`,
   layered above the window with a backdrop that darkens what's under it.

7. **Footer** - mark, blurb, socials, four columns (`VEHICLES`, `MISSIONS`,
   `TECHNICAL`, `COMPANY`), legal bar, dashed dividers, working back-to-top.

**Files**

```
index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (verbatim from prompt 1)
src/lib/PlumeField.tsx      (dot/plume canvas for the hero video)
src/lib/FieldLines.tsx      (WebGL domain-warped cyan shader, replaces FlowGradient)
src/sections/Hero.tsx
src/sections/TelemetryMock.tsx   (the telemetry card used in Hero and CTA)
src/sections/LaunchGrid.tsx
src/sections/LaunchCells.tsx     (interactive empty-cell layer)
src/sections/Vehicles.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx
```

`src/lib/PlumeField.tsx` keeps prompt 1's `DotMatrix` contract exactly: sample the
remote video into a grid of dots (dot size = brightness, color = source hue pushed to
saturation), dots bulge away from the cursor and switch to flickering ASCII glyphs
from `' .,:;_<>/*+=O#SF'` on a 70ms clock, entering the block triggers a 700ms
diagonal re-assembly wave with ~8% of rows sliding sideways, `ambient` breathing for
touch, DPR capped at 2, `IntersectionObserver` gating. Set
`v.crossOrigin = 'anonymous'` before `v.src` or the canvas taints and stays empty.

`src/lib/FieldLines.tsx` keeps prompt 1's `FlowGradient` contract: raw WebGL
full-quad fragment shader, no three.js, domain-warped fbm flowing at `time * 0.06`,
a rotation around the pointer plus a soft hot spot following it, cursor smoothed at
0.06 per frame, `position: absolute; inset: 0`, and `canvas.style.display = 'none'`
when WebGL is missing so the static blurred image underneath becomes the fallback.
Palette in the shader: deep navy `#0B2233` → steel `#1A4A63` → cyan `#3E9FD1` → pale
`#9FE4FF`.

**No questions. Build the whole page now.** Every font size, letter-spacing, delay
and pixel position is specified above - reproduce them explicitly, do not
normalize to a type scale, do not reflow into flex/grid instead of the scaled
canvas, and do not swap Framer Motion for anything else.

---

# WEBSITE 3 - COBALT (AI code review / CI platform)

Build a single-page dark landing page for **Cobalt**, a code review and CI platform
for engineering teams. Same stack, same design system, same non-negotiables as the
shared system above.

**Assets.** Base URL `https://qclay.design/lovable/cobalt/`, served flat, as string
constants:

- cobalt-mark.svg (nav + footer)
- hero-scan.mp4 (hero, sampled by canvas)
- diff-texture.webp (interactive canvas tiles)
- review-panel.webp (pricing card background)
- favicon.svg (index.html)
- review-check.svg, review-comment.svg, review-branch.svg, review-clock.svg (review mock)
- pipeline-step.svg, pipeline-connector.svg, coverage-ring.svg (section art)
- footer-x.svg, footer-linkedin.svg, footer-github.svg (footer)

**Palette.** Background `#0A0A0C`. Accent `#7C6CFF` with brand gradient
`linear-gradient(180deg, #7C6CFF 0%, #D6D2FF 100%)`. Hero background gradient
`linear-gradient(180deg, #0A0A0C 0%, #241E5C 62.5%, #3D3480 100%)`. Highlight tint
`#8F82FF` at 10%. Glass fill `rgba(255,255,255,0.06)`.

**Page composition, top to bottom.**

1. **Hero** - nav (`Product`, `Pricing`, `Docs`, `Customers`), badge `Code Review,
   Automated`, headline `Ship the diff.` / `Skip the meeting.`, two CTAs
   (`Start free`, `Contact us`), glass "window" card with a live review mock over a
   scan canvas fed by `hero-scan.mp4`. Desktop canvas 1512x935, mobile 420px with
   burger menu. Guide lines at x=58 and x=1452, hatched guide bands at y=87 and
   y=418.75 with the same 45deg 1px/9px repeating hatch.

2. **10vh spacer** in `#0A0A0C`, matched by a `-10vh` footer top trim.

3. **PipelineGrid** - hairline grid with repository labels (`api-gateway`,
   `web-client`, `infra`, `sdk`), dot-matrix diff tiles from `diff-texture.webp`, and
   a **pipeline widget** as the interactive centre: five stages (`Lint` → `Build` →
   `Unit` → `Integration` → `Deploy`) with per-stage duration that count up, a
   progress bar that fills left to right, and a rerun button that replays the whole
   cascade. Empty grid cells light under the cursor with the 120ms-in / 1100ms-out
   trail and ticking mono coverage numbers; resting 420ms unfolds a light card with
   that package's coverage, changed lines and open review comments.

4. **Pricing** - two plan cards (Team, Enterprise). The Enterprise card runs a live
   WebGL domain-warped noise shader in violet over a blurred static fallback, swirling
   around the cursor. Prices count up from 0 with a comma decimal separator
   (`$29,00` / `$89,00`).

5. **WhyUs** - bento grid with animated 1px lines: stats (`6.2×` faster reviews,
   `38%` fewer defects, `1,400+` teams, `24/7` runners), two quotes, and two cells
   rendering `review-panel.webp` through the interactive canvas under a
   `#0A0A0C/40` darkening overlay.

6. **CTA** - `Let's Talk Reviews` block with a second review window over an
   interactive diff-band canvas, tinted with
   `linear-gradient(180deg, rgba(124,108,255,0) 0%, rgba(124,108,255,0.18) 100%)`,
   layered above the window with a backdrop that darkens what's beneath it.

7. **Footer** - mark, blurb, socials, four columns (`PRODUCT`, `RESOURCES`,
   `COMPANY`, `LEGAL`), legal bar, dashed dividers, working back-to-top.

**Files**

```
index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (verbatim from prompt 1)
src/lib/ScanField.tsx       (dot/plume-style canvas for the hero video)
src/lib/FieldLines.tsx      (WebGL domain-warped violet shader)
src/sections/Hero.tsx
src/sections/ReviewMock.tsx     (the review card used in Hero and CTA)
src/sections/PipelineGrid.tsx
src/sections/PipelineCells.tsx  (interactive empty-cell layer)
src/sections/Pricing.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx
```

`ScanField.tsx` keeps the `DotMatrix` contract verbatim (cursor bulge, ASCII glyph
flicker on the 70ms clock, 700ms diagonal re-assembly sweep, ambient mode, DPR cap
2, `IntersectionObserver`, `crossOrigin = 'anonymous'` before `src`).
`FieldLines.tsx` keeps the `FlowGradient` contract verbatim, palette deep indigo
`#161233` → `#2A2360` → `#5A4FD1` → `#B9B2FF`.

**No questions. Build the whole page now.** Reproduce every specified size,
tracking, delay and pixel position explicitly; do not normalize to a type scale,
do not reflow into flex/grid instead of the scaled canvas, do not swap Framer
Motion.

---

# WEBSITE 4 - TIDEWATER (marine logistics platform)

Build a single-page dark landing page for **Tidewater**, a platform coordinating
short-sea freight and port operations. Same stack, same design system, same
non-negotiables as the shared system above.

**Assets.** Base URL `https://qclay.design/lovable/tidewater/`, served flat, as string
constants:

- tidewater-mark.svg (nav + footer)
- hero-current.mp4 (hero, sampled by canvas)
- wave-texture.webp (interactive canvas tiles)
- operations-panel.webp (pricing card background)
- favicon.svg (index.html)
- ops-vessel.svg, ops-container.svg, ops-berth.svg, ops-tide.svg (ops mock)
- route-line.svg, port-marker.svg, current-arrow.svg (section art)
- footer-x.svg, footer-linkedin.svg, footer-github.svg (footer)

**Palette.** Background `#06100F`. Accent `#2ED6B0` with brand gradient
`linear-gradient(180deg, #2ED6B0 0%, #C6FFF0 100%)`. Hero background gradient
`linear-gradient(180deg, #06100F 0%, #0B3A34 62.5%, #16604F 100%)`. Highlight tint
`#3EE0BD` at 10%. Glass fill `rgba(255,255,255,0.06)`.

**Page composition, top to bottom.**

1. **Hero** - nav (`Network`, `Vessels`, `Pricing`, `Contact`), badge `Short-Sea
   Freight`, headline `Know your berth.` / `before you dock.`, two CTAs
   (`Book a sailing`, `Contact us`), glass "window" card with a live operations mock
   over a current canvas fed by `hero-current.mp4`. Desktop canvas 1512x935, mobile
   420px with burger menu. Guide lines at x=58 and x=1452, hatched guide bands at
   y=87 and y=418.75 with the same 45deg 1px/9px repeating hatch.

2. **10vh spacer** in `#06100F`, matched by a `-10vh` footer top trim.

3. **RouteGrid** - hairline grid with port labels (`ROTTERDAM`, `SINGAPORE`,
   `SANTOS`, `DURBAN`, `BUSAN`), dot-matrix wave tiles from `wave-texture.webp`, and
   a **booking widget** as the interactive centre: a vessel selector opening a
   dropdown, a berth-time picker, a live freight quote in EUR that counts up and
   re-animates (0.4s) when the vessel changes, and a `Confirm booking` button. Empty
   grid cells light under the cursor with the 120ms-in / 1100ms-out trail and ticking
   mono TEU counts; resting 420ms unfolds a light card with that port's berth
   occupancy and average wait.

4. **Pricing** - two plan cards (Carrier, Terminal). The Terminal card runs a live
   WebGL domain-warped noise shader in teal over a blurred static fallback, swirling
   around the cursor. Prices count up from 0 with a comma decimal separator
   (`$890,00` / `$2,400,00`).

5. **WhyUs** - bento grid with animated 1px lines: stats (`4,800` sailings a year,
   `38` ports covered, `<2h` berth confirmation, `24/7` dispatch), two quotes, and
   two cells rendering `operations-panel.webp` through the interactive canvas under a
   `#06100F/40` darkening overlay.

6. **CTA** - `Let's Talk Freight` block with a second operations window over an
   interactive current-band canvas, tinted with
   `linear-gradient(180deg, rgba(46,214,176,0) 0%, rgba(46,214,176,0.18) 100%)`,
   layered above the window with a backdrop that darkens what's beneath it.

7. **Footer** - mark, blurb, socials, four columns (`NETWORK`, `SERVICES`,
   `COMPANY`, `LEGAL`), legal bar, dashed dividers, working back-to-top.

**Files**

```
index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (verbatim from prompt 1)
src/lib/CurrentField.tsx    (dot/plume-style canvas for the hero video)
src/lib/FieldLines.tsx      (WebGL domain-warped teal shader)
src/sections/Hero.tsx
src/sections/OpsMock.tsx        (the operations card used in Hero and CTA)
src/sections/RouteGrid.tsx
src/sections/RouteCells.tsx     (interactive empty-cell layer)
src/sections/Pricing.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx
```

`CurrentField.tsx` keeps the `DotMatrix` contract verbatim. `FieldLines.tsx` keeps
the `FlowGradient` contract verbatim, palette deep teal `#0A2A26` → `#125148` →
`#25B294` → `#A8F5E3`.

**No questions. Build the whole page now.** Reproduce every specified size,
tracking, delay and pixel position explicitly; do not normalize to a type scale, do
not reflow into flex/grid instead of the scaled canvas, do not swap Framer Motion.

---

# WEBSITE 5 - FERROVIA (rail network operations)

Build a single-page dark landing page for **Ferrovia**, a rail network operations and
timetabling platform. Same stack, same design system, same non-negotiables as the
shared system above.

**Assets.** Base URL `https://qclay.design/lovable/ferrovia/`, served flat, as string
constants:

- ferrovia-mark.svg (nav + footer)
- hero-rails.mp4 (hero, sampled by canvas)
- track-texture.webp (interactive canvas tiles)
- signalling-panel.webp (pricing card background)
- favicon.svg (index.html)
- signal-box.svg, platform-icon.svg, junction-icon.svg, delay-icon.svg (ops mock)
- track-line.svg, sleeper-tick.svg, gradient-arrow.svg (section art)
- footer-x.svg, footer-linkedin.svg, footer-github.svg (footer)

**Palette.** Background `#0B0A08`. Accent `#E8B33A` with brand gradient
`linear-gradient(180deg, #E8B33A 0%, #FFF0C2 100%)`. Hero background gradient
`linear-gradient(180deg, #0B0A08 0%, #4A3410 62.5%, #7A5A1E 100%)`. Highlight tint
`#EFC257` at 10%. Glass fill `rgba(255,255,255,0.06)`.

**Page composition, top to bottom.**

1. **Hero** - nav (`Network`, `Timetable`, `Pricing`, `Contact`), badge `Rail
   Operations`, headline `Right train.` / `Right minute.`, two CTAs
   (`Plan a timetable`, `Contact us`), glass "window" card with a live signalling mock
   over a rails canvas fed by `hero-rails.mp4`. Desktop canvas 1512x935, mobile 420px
   with burger menu. Guide lines at x=58 and x=1452, hatched guide bands at y=87 and
   y=418.75 with the same 45deg 1px/9px repeating hatch.

2. **10vh spacer** in `#0B0A08`, matched by a `-10vh` footer top trim.

3. **TimetableGrid** - hairline grid with line labels (`NORTHBOUND`,
   `SOUTHBOUND`, `FREIGHT`, `INTERNATIONAL`), dot-matrix track tiles from
   `track-texture.webp`, and a **junction widget** as the interactive centre: a
   track selector opening a dropdown, a route planner whose conflict count updates
   live, a timetable in minutes that counts up, and a `Publish timetable` button.
   Empty grid cells light under the cursor with the 120ms-in / 1100ms-out trail and
   ticking mono delay figures; resting 420ms unfolds a light card with that line's
   punctuality, capacity and next departure.

4. **Pricing** - two plan cards (Operator, Authority). The Authority card runs a live
   WebGL domain-warped noise shader in amber over a blurred static fallback, swirling
   around the cursor. Prices count up from 0 with a comma decimal separator
   (`$1,450,00` / `$4,900,00`).

5. **WhyUs** - bento grid with animated 1px lines: stats (`97.8%` punctuality,
   `310` stations, `<900` signalling cycle, `24/7` control rooms), two quotes, and
   two cells rendering `signalling-panel.webp` through the interactive canvas under a
   `#0B0A08/40` darkening overlay.

6. **CTA** - `Let's Talk Operations` block with a second signalling window over an
   interactive track-band canvas, tinted with
   `linear-gradient(180deg, rgba(232,179,58,0) 0%, rgba(232,179,58,0.18) 100%)`,
   layered above the window with a backdrop that darkens what's beneath it.

7. **Footer** - mark, blurb, socials, four columns (`NETWORK`, `PLATFORM`,
   `COMPANY`, `LEGAL`), legal bar, dashed dividers, working back-to-top.

**Files**

```
index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (verbatim from prompt 1)
src/lib/RailField.tsx       (dot/plume-style canvas for the hero video)
src/lib/FieldLines.tsx      (WebGL domain-warped amber shader)
src/sections/Hero.tsx
src/sections/SignalMock.tsx     (the signalling card used in Hero and CTA)
src/sections/TimetableGrid.tsx
src/sections/TimetableCells.tsx (interactive empty-cell layer)
src/sections/Pricing.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx
```

`RailField.tsx` keeps the `DotMatrix` contract verbatim. `FieldLines.tsx` keeps the
`FlowGradient` contract verbatim, palette deep umber `#2A1D08` → `#5C4211` →
`#C79A2C` → `#F7DE97`.

**No questions. Build the whole page now.** Reproduce every specified size,
tracking, delay and pixel position explicitly; do not normalize to a type scale, do
not reflow into flex/grid instead of the scaled canvas, do not swap Framer Motion.

---

# WEBSITE 6 - AETHERGRID (energy grid balancing)

Build a single-page dark landing page for **Aethergrid**, a platform for balancing
renewable energy across a grid. Same stack, same design system, same non-negotiables
as the shared system above.

**Assets.** Base URL `https://qclay.design/lovable/aethergrid/`, served flat, as
string constants:

- aethergrid-mark.svg (nav + footer)
- hero-aurora.mp4 (hero, sampled by canvas)
- lattice-texture.webp (interactive canvas tiles)
- load-panel.webp (pricing card background)
- favicon.svg (index.html)
- load-turbine.svg, load-solar.svg, load-battery.svg, load-grid.svg (grid mock)
- grid-link.svg, node-pulse.svg, flow-arrow.svg (section art)
- footer-x.svg, footer-linkedin.svg, footer-github.svg (footer)

**Palette.** Background `#080A0C`. Accent `#FFD166` with brand gradient
`linear-gradient(180deg, #FFD166 0%, #FFF6D9 100%)`. Hero background gradient
`linear-gradient(180deg, #080A0C 0%, #3E3512 62.5%, #6B5C21 100%)`. Highlight tint
`#FFD97E` at 10%. Glass fill `rgba(255,255,255,0.06)`.

**Page composition, top to bottom.**

1. **Hero** - nav (`Grid`, `Products`, `Pricing`, `Contact`), badge `Grid Balancing`,
   headline `Match demand.` / `to the wind.`, two CTAs (`Request an assessment`,
   `Contact us`), glass "window" card with a live grid mock over an aurora canvas fed
   by `hero-aurora.mp4`. Desktop canvas 1512x935, mobile 420px with burger menu.
   Guide lines at x=58 and x=1452, hatched guide bands at y=87 and y=418.75 with the
   same 45deg 1px/9px repeating hatch.

2. **10vh spacer** in `#080A0C`, matched by a `-10vh` footer top trim.

3. **DispatchGrid** - hairline grid with node labels (`NORTH RIDGE`, `COASTAL WIND`,
   `SOLAR FIELD`, `CITY LOAD`, `RESERVOIR`), dot-matrix lattice tiles from
   `lattice-texture.webp`, and a **dispatch widget** as the interactive centre: a
   source selector opening a dropdown (wind, solar, hydro, battery), a live load
   figure in MW that counts up and re-animates (0.4s) when the source changes, a
   reserve-margin bar, and a `Dispatch` button. Empty grid cells light under the cursor
   with the 120ms-in / 1100ms-out trail and ticking mono frequency figures; resting
   420ms unfolds a light card with that node's output, curtailment and forecast.

4. **Pricing** - two plan cards (Operator, Aggregator). The Aggregator card runs a
   live WebGL domain-warped noise shader in gold over a blurred static fallback,
   swirling around the cursor. Prices count up from 0 with a comma decimal separator
   (`$590,00` / `$1,750,00`).

5. **WhyUs** - bento grid with animated 1px lines: stats (`12.4 GW` under dispatch,
   `1,900` nodes, `<250ms` balancing cycle, `24/7` forecasting), two quotes, and two
   cells rendering `load-panel.webp` through the interactive canvas under a
   `#080A0C/40` darkening overlay.

6. **CTA** - `Let's Talk Grid` block with a second grid window over an interactive
   lattice-band canvas, tinted with
   `linear-gradient(180deg, rgba(255,209,102,0) 0%, rgba(255,209,102,0.18) 100%)`,
   layered above the window with a backdrop that darkens what's beneath it.

7. **Footer** - mark, blurb, socials, four columns (`PLATFORM`, `MARKETS`,
   `COMPANY`, `LEGAL`), legal bar, dashed dividers, working back-to-top.

**Files**

```
index.html
vite.config.ts
package.json
src/main.tsx
src/index.css
src/App.tsx
src/lib/animations.tsx      (verbatim from prompt 1)
src/lib/AuroraField.tsx     (dot/plume-style canvas for the hero video)
src/lib/FieldLines.tsx      (WebGL domain-warped gold shader)
src/sections/Hero.tsx
src/sections/GridMock.tsx       (the grid card used in Hero and CTA)
src/sections/DispatchGrid.tsx
src/sections/DispatchCells.tsx  (interactive empty-cell layer)
src/sections/Pricing.tsx
src/sections/WhyUs.tsx
src/sections/CTA.tsx
src/sections/Footer.tsx
```

`AuroraField.tsx` keeps the `DotMatrix` contract verbatim. `FieldLines.tsx` keeps
the `FlowGradient` contract verbatim, palette deep olive `#26200A` → `#574A16` →
`#C7A62E` → `#FBEBA6`.

**No questions. Build the whole page now.** Reproduce every specified size,
tracking, delay and pixel position explicitly; do not normalize to a type scale, do
not reflow into flex/grid instead of the scaled canvas, do not swap Framer Motion.






