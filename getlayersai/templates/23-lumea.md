# Lumea (`lumea`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `lumea` (#23 of 54)
- **Title**: Lumea
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/lumea`
- **Category & Type**: `template` · `hero, agency-studio`
- **Tech Stack**: `hero, threejs, nextjs`
- **Tags**: `hero, threejs, nextjs`
- **Tone & Mood**: `dark` · `calm, luxe`
- **Keywords**: `100, 300, 3d, aberration, above, agency, always, amber, and, around, aside, asteroids, atmospheric, away, back, beam, big, bigger, black, bleed, blend, bloom, blooms, blur, boot, bottom, boulders, brand, buddha, camera, canvas, carries, chromatic, cinematic, circles, circling, climbs, clockwise, compiled, counter, creative, cursor, dark, debris, design, difference, dispersion, display, down, draco, dramatic, draws, drift, dust, dutch, endlessly, every, fades, falling, figure, film, floating, fog, forever, frame, fringe, from, frosted, full, fullscreen, genuinely, glass, glassmorphism, glowing, gltf, god-rays, gold, grain, gravity, halo, hand, haze, headline, heavier, helix, hero, high, him, holding, idea, identity, immersive, inks, inside, interactive, intro, island, itself, letter, levitating, levitation, light, line, lines, loader, low, lumea, marble, masked, meditates, meditating, meditation, mindfulness, mist, model, monastery, monk, moody, motes, motion, museum, mystic, mystical, nav, navbar, near, nearby, never, next, nextjs, night, nowhere, one, only, onto, orbit, orbit-camera, orbiting, out, outline, parallax, particles, parts, peaceful, pedestal, per, percentage, pill, pitch, pointer, portfolio, preloader, pushes, r3f, rakes, rays, ready, real, refuses, rendered, repel, repulsion, reveal, right, ring, ringed, ringing, rings, rock, rocks, same, say, scene, screen, scroll, sculpture, serene, serif, settle, shader, shadow, shaft, shards, single, site, slightly, slow, slowly, soft, source, sparkle, spiral, spiritual, split, spotlight, spring, square, statue, stone, stops, studio, style, subtle, swallows, swings, tagline, temple, that, the, then, they, three, threejs, through, tilt, tilted, time, trailing, tranquil, truly, tumbling, turning, two, under, underdamped, until, uppercase, vertical, viewport, vignette, visible, void, volumetric, warm, way, webgl, weight, wellness, while, white, with, wonder, your, zen, zero-gravity`
- **Created Date**: `2026-07-30` · **Likes**: `121`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/lumea-e7c8ac2bce.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/lumea-e7c8ac2bce.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/lumea-e7c8ac2bce-preview.mp4`

---

## Visual Concept & Choreography
> A stone monk meditates on a floating rock in a near-black void — ringed by glowing amber orbit lines and a slow spiral of tumbling debris that parts around your cursor, under one soft shaft of light and a camera that never stops circling.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Lumea** website:

```markdown
# Recreate this site as a single HTML file: Lumea (lumea)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Lumea** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A stone monk meditates on a floating rock in a near-black void — ringed by glowing amber orbit lines and a slow spiral of tumbling debris that parts around your cursor, under one soft shaft of light and a camera that never stops circling.
- **Tone**: Dark mode aesthetic with calm, luxe mood.
- **Domain & Design Keywords**: 100, 300, 3d, aberration, above, agency, always, amber, and, around, aside, asteroids, atmospheric, away, back, beam, big, bigger, black, bleed, blend, bloom, blooms, blur, boot, bottom, boulders, brand, buddha, camera, canvas, carries, chromatic, cinematic, circles, circling, climbs, clockwise, compiled, counter, creative, cursor, dark, debris, design, difference, dispersion, display, down, draco, dramatic, draws, drift, dust, dutch, endlessly, every, fades, falling, figure, film, floating, fog, forever, frame, fringe, from, frosted, full, fullscreen, genuinely, glass, glassmorphism, glowing, gltf, god-rays, gold, grain, gravity, halo, hand, haze, headline, heavier, helix, hero, high, him, holding, idea, identity, immersive, inks, inside, interactive, intro, island, itself, letter, levitating, levitation, light, line, lines, loader, low, lumea, marble, masked, meditates, meditating, meditation, mindfulness, mist, model, monastery, monk, moody, motes, motion, museum, mystic, mystical, nav, navbar, near, nearby, never, next, nextjs, night, nowhere, one, only, onto, orbit, orbit-camera, orbiting, out, outline, parallax, particles, parts, peaceful, pedestal, per, percentage, pill, pitch, pointer, portfolio, preloader, pushes, r3f, rakes, rays, ready, real, refuses, rendered, repel, repulsion, reveal, right, ring, ringed, ringing, rings, rock, rocks, same, say, scene, screen, scroll, sculpture, serene, serif, settle, shader, shadow, shaft, shards, single, site, slightly, slow, slowly, soft, source, sparkle, spiral, spiritual, split, spotlight, spring, square, statue, stone, stops, studio, style, subtle, swallows, swings, tagline, temple, that, the, then, they, three, threejs, through, tilt, tilted, time, trailing, tranquil, truly, tumbling, turning, two, under, underdamped, until, uppercase, vertical, viewport, vignette, visible, void, volumetric, warm, way, webgl, weight, wellness, while, white, with, wonder, your, zen, zero-gravity.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/lumea-e7c8ac2bce.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/lumea-e7c8ac2bce.mp4
  - Preview Video: https://storage.getlayers.ai/templates/lumea-e7c8ac2bce-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A stone monk meditates on a floating rock in a near-black void — ringed by glowing amber orbit lines and a slow spiral of tumbling debris that parts around your cursor, under one soft shaft of light and a camera that never stops circling.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Lumea**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
