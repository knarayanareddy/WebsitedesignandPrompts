# Fromzero (`fromzero`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `fromzero` (#26 of 54)
- **Title**: Fromzero
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/fromzero`
- **Category & Type**: `template` · `hero, agency-studio, ai-tech`
- **Tech Stack**: `hero, threejs, nextjs`
- **Tags**: `hero, threejs, nextjs`
- **Tone & Mood**: `dark` · `technical, calm`
- **Keywords**: `100, 3d, accent, across, against, agency, air, amber, analytic, and, around, arrow, art-direction, atmospheric, back, bar, been, billboard, black, blinking, bloom, box, brand, brands, breaks, bright, build, build-log, camera, canvas, caret, carrying, centre, character, cinematic, code, coding, compiling, counter, counts, creative, cta, cursor, curtain, dark, dead, decode, decodes, depth, dividers, dolly, down, draco, drifts, editor, element, everywhere, exactly, expanding, eye, face, falling, fictional, file, film, film-grain, finish, floating, floats, floor, fog, follow, framed, from, fromzer, fromzero, frosted, fullscreen, gaze, gets, glass, glb, glitch, glow, gold, grain, hairline, has, haze, header, headline, hero, human, identity, image, immersive, itself, lake, leaves, left, letter, light, like, line, live, loader, logs, look, look-back, make, maps, matrix, meet, middle, midnight, mirror, monolith, moody, mountain, near, next, nextjs, night, normal, one, one-screen, onto, out, overline, page, panel, parallax, planes, point, pointer, portfolio, poster, preloader, progress, pure, rain, raining, real, rectangles, reflection, reflective, relief, remembers, reveal, right, ringed, rings, ripple, ripples, rippling, rock, running, running-code, scanlines, scene, scramble, screen, scroll, scrolling, showing, single-viewport, site, six, slate, slides, slow, snippets, source, spilling, spring, springs, stamps, stare, straight, streaming, studio, tailwind, tech, terminal, terrain, that, the, themselves, then, threejs, through, tilt, tilting, travel, turns, typing, under, valley, video, video-panel, viewport, wake, warm, watch, watches, watching, water, way, web, webgl, where, wherever, white, wordmark, yellow, you, your`
- **Created Date**: `2026-07-28` · **Likes**: `114`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f-preview.mp4`

---

## Visual Concept & Choreography
> A midnight valley where a floating screen turns to meet your cursor — an eye framed by falling code, its light spilling onto a black lake that ripples wherever you point.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Fromzero** website:

```markdown
# Recreate this site as a single HTML file: Fromzero (fromzero)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Fromzero** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A midnight valley where a floating screen turns to meet your cursor — an eye framed by falling code, its light spilling onto a black lake that ripples wherever you point.
- **Tone**: Dark mode aesthetic with technical, calm mood.
- **Domain & Design Keywords**: 100, 3d, accent, across, against, agency, air, amber, analytic, and, around, arrow, art-direction, atmospheric, back, bar, been, billboard, black, blinking, bloom, box, brand, brands, breaks, bright, build, build-log, camera, canvas, caret, carrying, centre, character, cinematic, code, coding, compiling, counter, counts, creative, cta, cursor, curtain, dark, dead, decode, decodes, depth, dividers, dolly, down, draco, drifts, editor, element, everywhere, exactly, expanding, eye, face, falling, fictional, file, film, film-grain, finish, floating, floats, floor, fog, follow, framed, from, fromzer, fromzero, frosted, fullscreen, gaze, gets, glass, glb, glitch, glow, gold, grain, hairline, has, haze, header, headline, hero, human, identity, image, immersive, itself, lake, leaves, left, letter, light, like, line, live, loader, logs, look, look-back, make, maps, matrix, meet, middle, midnight, mirror, monolith, moody, mountain, near, next, nextjs, night, normal, one, one-screen, onto, out, overline, page, panel, parallax, planes, point, pointer, portfolio, poster, preloader, progress, pure, rain, raining, real, rectangles, reflection, reflective, relief, remembers, reveal, right, ringed, rings, ripple, ripples, rippling, rock, running, running-code, scanlines, scene, scramble, screen, scroll, scrolling, showing, single-viewport, site, six, slate, slides, slow, snippets, source, spilling, spring, springs, stamps, stare, straight, streaming, studio, tailwind, tech, terminal, terrain, that, the, themselves, then, threejs, through, tilt, tilting, travel, turns, typing, under, valley, video, video-panel, viewport, wake, warm, watch, watches, watching, water, way, web, webgl, where, wherever, white, wordmark, yellow, you, your.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f.mp4
  - Preview Video: https://storage.getlayers.ai/templates/fromzero-b5f0a96b6f-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A midnight valley where a floating screen turns to meet your cursor — an eye framed by falling code, its light spilling onto a black lake that ripples wherever you point.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Fromzero**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
2. **Interactive Hero Stage**:
   - Full-viewport interactive stage showcasing the centerpiece WebGL/video choreography, oversized statement headline, lead copy, and primary/secondary action buttons.
3. **Interactive Feature & Showcase Grid**:
   - Scroll-triggered feature cards with pointer-reactive border glows, live interactive micro-controls, and smooth reveal masks.
4. **Scroll-Pinned Narrative / Architecture Breakdown**:
   - Pinned viewport section where scrolling scrubs through 3–4 chapters while the background WebGL stage morphs camera angles or shader parameters.
5. **Interactive Pricing / Specification Ledger & Footer**:
   - Interactive parameter/tier controls, FAQ accordion with spring-animated height, and a cinematic footer with social/contact triggers.

## 4. Performance & Accessibility
- Pause offscreen animations via `IntersectionObserver`.
- Respect `prefers-reduced-motion: reduce`.
- Ensure full responsive layout across desktop (`1440px+`), tablet (`768px`), and mobile (`375px`).
```
