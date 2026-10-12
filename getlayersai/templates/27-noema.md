# Noema (`noema`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `noema` (#27 of 54)
- **Title**: Noema
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/noema`
- **Category & Type**: `template` · `hero, agency-studio`
- **Tech Stack**: `hero, nextjs`
- **Tags**: `hero, nextjs`
- **Tone & Mood**: `dark` · `luxe, technical, calm`
- **Keywords**: `000, 100, above-the-fold, against, agency, ai, all, and, around, art-direction, away, base, beams, behind, below, bottom, branding, brighten, built, bust, card, carves, centre, cinematic, continuously, counter, creative-studio, ctas, cursor, curtain, dark, deep-blue, diagonal, didone, display-type, doing, dom, domain, drift, drifting, dust, edges, editorial, elegant, embers, empty, entirely, envision, face, fall, far, featured, flanking, forming, frame, front, full, generative, glsl, god-rays, gpu, gradient, hairline, hard, head, headline, hero, human, identity, immersive, italiana, left, lifts, light, light-rays, line, lit, made, margins, masthead, materialising, materialize, midnight, minimal, navy, nebula, next, next16, nextjs, noema, non, nothing, off, one, out, over, pairing, particle, particles, pixel, point, point-cloud, pointcloud, portfolio, portrait, preloader, progress, pushed, raw, react, regenerate, rendered, right, room, row, scene, screen, scrolling, scrollless, scrolls, serif, shader, shadow, shedding, side, single, single-screen, smoke, split, split-headline, starfield, still, stream, studio, subtitle, surface, talking, that, the, they, through, ticks, top, twin, upper, upward, vertical, volumetric, warped, webgl, while, white, work`
- **Created Date**: `2026-07-24` · **Likes**: `108`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/noema-656d33b840.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/noema-656d33b840.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/noema-656d33b840-preview.mp4`

---

## Visual Concept & Choreography
> A portrait dissolving into slow-drifting light against deep navy, split by a towering serif headline — a studio hero that feels like a thought catching form.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Noema** website:

```markdown
# Recreate this site as a single HTML file: Noema (noema)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Noema** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A portrait dissolving into slow-drifting light against deep navy, split by a towering serif headline — a studio hero that feels like a thought catching form.
- **Tone**: Dark mode aesthetic with luxe, technical, calm mood.
- **Domain & Design Keywords**: 000, 100, above-the-fold, against, agency, ai, all, and, around, art-direction, away, base, beams, behind, below, bottom, branding, brighten, built, bust, card, carves, centre, cinematic, continuously, counter, creative-studio, ctas, cursor, curtain, dark, deep-blue, diagonal, didone, display-type, doing, dom, domain, drift, drifting, dust, edges, editorial, elegant, embers, empty, entirely, envision, face, fall, far, featured, flanking, forming, frame, front, full, generative, glsl, god-rays, gpu, gradient, hairline, hard, head, headline, hero, human, identity, immersive, italiana, left, lifts, light, light-rays, line, lit, made, margins, masthead, materialising, materialize, midnight, minimal, navy, nebula, next, next16, nextjs, noema, non, nothing, off, one, out, over, pairing, particle, particles, pixel, point, point-cloud, pointcloud, portfolio, portrait, preloader, progress, pushed, raw, react, regenerate, rendered, right, room, row, scene, screen, scrolling, scrollless, scrolls, serif, shader, shadow, shedding, side, single, single-screen, smoke, split, split-headline, starfield, still, stream, studio, subtitle, surface, talking, that, the, they, through, ticks, top, twin, upper, upward, vertical, volumetric, warped, webgl, while, white, work.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/noema-656d33b840.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/noema-656d33b840.mp4
  - Preview Video: https://storage.getlayers.ai/templates/noema-656d33b840-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A portrait dissolving into slow-drifting light against deep navy, split by a towering serif headline — a studio hero that feels like a thought catching form.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Noema**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
