# Auralis (`auralis`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `auralis` (#20 of 54)
- **Title**: Auralis
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/auralis`
- **Category & Type**: `template` · `full-page, agency-studio, ai-tech`
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `light` · `calm, luxe, technical`
- **Keywords**: `000, 150, 360, 3d, act, acts, agency, ai, along, and, around, assembling, auralis, band, bar, bead, beads, behind, blended, bloom, blur, bottom, bright, bursts, camera, camera-flight, canvas, carrying, cinematic, contact, continuous, copy, corridor, crumble, crumbling, cursor, curtain, design, dive, dollies, drifting, drives, dust, engine, entire, envision, film, finale, fixture, flare, flight, floating, fog, foggy, form, forward, four, framed, frosted, frozen, full, glass, glyph, grain, gray, grey, grid, grows, hand, header, heading, hero, huge, imagine, immersive, into, just, landing, layers, letter, lift, light, line, loader, made, manifest, materialises, meandering, metal, monochrome, morph, native, next, one, one-page, onepager, onto, out, over, overhead, overlays, own, page, parallax, particle, particles, per, pink, pinned, podium, point-cloud, pointcloud, preloader, purple, repels, reveal, reveals, ribbon, ribbons, riding, ring, rippling, roll, rolls, room, same, scan, scans, scene, scroll, scroll-driven, scrolltelling, second, separately, shot, silver, single, site, slides, spheres, spring, stepped, streamers, streams, strung, studio, surfaces, sweeps, tech, that, the, then, thin, third, thousands, three, threejs, through, tilted, tiny, transform, transition, tree, type, unbroken, under, violet, visits, volumetric, vortex, wave, way, webgl, where, while, white, whose, wipe, x, you`
- **Created Date**: `2026-07-27` · **Likes**: `136`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/auralis-7725b062e5.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/auralis-7725b062e5.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/auralis-7725b062e5-preview.mp4`

---

## Visual Concept & Choreography
> One unbroken camera flight through a silver studio where thousands of glowing beads keep changing their mind about what they are — an X that bursts into violet ribbons, a hand that crumbles into a rippling curtain, and a tree that grows out of the fog for the finale.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Auralis** website:

```markdown
# Recreate this site as a single HTML file: Auralis (auralis)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Auralis** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: One unbroken camera flight through a silver studio where thousands of glowing beads keep changing their mind about what they are — an X that bursts into violet ribbons, a hand that crumbles into a rippling curtain, and a tree that grows out of the fog for the finale.
- **Tone**: Light mode aesthetic with calm, luxe, technical mood.
- **Domain & Design Keywords**: 000, 150, 360, 3d, act, acts, agency, ai, along, and, around, assembling, auralis, band, bar, bead, beads, behind, blended, bloom, blur, bottom, bright, bursts, camera, camera-flight, canvas, carrying, cinematic, contact, continuous, copy, corridor, crumble, crumbling, cursor, curtain, design, dive, dollies, drifting, drives, dust, engine, entire, envision, film, finale, fixture, flare, flight, floating, fog, foggy, form, forward, four, framed, frosted, frozen, full, glass, glyph, grain, gray, grey, grid, grows, hand, header, heading, hero, huge, imagine, immersive, into, just, landing, layers, letter, lift, light, line, loader, made, manifest, materialises, meandering, metal, monochrome, morph, native, next, one, one-page, onepager, onto, out, over, overhead, overlays, own, page, parallax, particle, particles, per, pink, pinned, podium, point-cloud, pointcloud, preloader, purple, repels, reveal, reveals, ribbon, ribbons, riding, ring, rippling, roll, rolls, room, same, scan, scans, scene, scroll, scroll-driven, scrolltelling, second, separately, shot, silver, single, site, slides, spheres, spring, stepped, streamers, streams, strung, studio, surfaces, sweeps, tech, that, the, then, thin, third, thousands, three, threejs, through, tilted, tiny, transform, transition, tree, type, unbroken, under, violet, visits, volumetric, vortex, wave, way, webgl, where, while, white, whose, wipe, x, you.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/auralis-7725b062e5.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/auralis-7725b062e5.mp4
  - Preview Video: https://storage.getlayers.ai/templates/auralis-7725b062e5-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: One unbroken camera flight through a silver studio where thousands of glowing beads keep changing their mind about what they are — an X that bursts into violet ribbons, a hand that crumbles into a rippling curtain, and a tree that grows out of the fog for the finale.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Auralis**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
