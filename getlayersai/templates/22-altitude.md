# Altitude (`altitude`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `altitude` (#22 of 54)
- **Title**: Altitude
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/altitude`
- **Category & Type**: `template` · `hero, hospitality-travel`
- **Tech Stack**: `hero, nextjs`
- **Tags**: `hero, nextjs`
- **Tone & Mood**: `dark` · `luxe, calm`
- **Keywords**: `hero, hospitality, cabins, retreat, travel, webgl, fluid, vortex, cursor, video-background, night-sky, glass, preloader, serif, dark, next, lantern, the, night, sky, you, forgot, existed, ink, marbling, under, quiet, expensive, one, screen, nothing, else, altitude, single, shot, looping, starry, video, drawn, webgl2, solver, that, also, warps, invisible, stirring, point, orbits, spring, lagged, marbles, yellow, blue, drags, chromatically, splits, picture, where, moves, then, dies, away, within, second, stopping, gilda, display, line, rises, letter, out, blur, left, right, fade, mask, enquiry, capsule, stats, bar, lift, springs, hairline, column, rules, rule, themselves, down, frame, all, released, once, comet, field, counts, 100, opens, page, like, aperture`
- **Created Date**: `2026-07-20` · **Likes**: `125`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/altitude-6a55d25c1e.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/altitude-6a55d25c1e.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/altitude-6a55d25c1e-preview.mp4`

---

## Visual Concept & Choreography
> A still mountain night that stirs to life wherever the cursor drifts — warm and cool ink swirls through the dark and bends the starlit sky behind an invitation to stays past the end of the road.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Altitude** website:

```markdown
# Recreate this site as a single HTML file: Altitude (altitude)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Altitude** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A still mountain night that stirs to life wherever the cursor drifts — warm and cool ink swirls through the dark and bends the starlit sky behind an invitation to stays past the end of the road.
- **Tone**: Dark mode aesthetic with luxe, calm mood.
- **Domain & Design Keywords**: hero, hospitality, cabins, retreat, travel, webgl, fluid, vortex, cursor, video-background, night-sky, glass, preloader, serif, dark, next, lantern, the, night, sky, you, forgot, existed, ink, marbling, under, quiet, expensive, one, screen, nothing, else, altitude, single, shot, looping, starry, video, drawn, webgl2, solver, that, also, warps, invisible, stirring, point, orbits, spring, lagged, marbles, yellow, blue, drags, chromatically, splits, picture, where, moves, then, dies, away, within, second, stopping, gilda, display, line, rises, letter, out, blur, left, right, fade, mask, enquiry, capsule, stats, bar, lift, springs, hairline, column, rules, rule, themselves, down, frame, all, released, once, comet, field, counts, 100, opens, page, like, aperture.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/altitude-6a55d25c1e.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/altitude-6a55d25c1e.mp4
  - Preview Video: https://storage.getlayers.ai/templates/altitude-6a55d25c1e-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A still mountain night that stirs to life wherever the cursor drifts — warm and cool ink swirls through the dark and bends the starlit sky behind an invitation to stays past the end of the road.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Altitude**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
