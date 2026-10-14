# Dantora (`dantora`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `dantora` (#5 of 54)
- **Title**: Dantora
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/dantora`
- **Category & Type**: `template` · `full-page, health-science`
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `light` · `calm, organic`
- **Keywords**: `000, 160, 3d, about, after, along, already, and, another, appears, appointment, around, arriving, away, ball, band, banner, bar, because, behind, between, biotech, black, bleeding, blended, block, blocks, blur, blur-reveal, booking, born, both, bottom, bounce, brand, built, calm, camera, cards, carousel, carrying, check-up, clean, clears, climbing, clinic, clips, clockwise, clouds, comes, consultation, contact, contact form, continuously, copy, count, counter, cursor, cursor-trail, curtain, dantora, darkens, deform, diagnosis, diagnostics, diagonal, diffusion, disperses, dissolving, dna, doctor, doctors, double, down, drag, drawing, drawn, draws, drifts, dropped, dye, each, editorial, evolving, falling, fills, five, flow, focus, following, form, four, frosted, full, function, genetic-testing, genetics, genomic, glass, glowing, glsl, green, hard, health, healthcare, helix, hero, horizontal-scroll, hospital, hugging, image-trail, imaging, ink, instead, into, itself, lab, laboratory, landing, landing page, lazily, life, life-sciences, lift, light, lime, loader, mark, medical, mid, mint, more, mouse, moves, moving, much, multiply, next, nextjs, noise, normalised, nothing, nowhere, numbers, oldest, one, opens, out, outward, over, overlay, page, pale, panel, paper, parallax, part, particles, parting, path, patient, photographs, physician, pinned, pins, plume, point, point-cloud, pointer, points, practice, preloader, prevention, private, progress, pure, pushed, radiology, rail, rather, releasing, resolving, rides, ring, runway, scaling, science, screening, scroll, scroll-hijack, scrolled, scrub, sequence, service, settling, shader, shedding, sideways, simplex, slider, sliding, soft, spawns, specialist, spring-text-engine, statistics, stays, sticky, strand, swelling, swirls, team, than, that, the, their, them, then, thinning, thins, threejs, throw, top, transitions, trustworthy, turn, twice, under, underneath, viewport, wall, was, water, webgl, wellness, where, wherever, while, white, whose, without, words, you, your`
- **Created Date**: `2026-08-11` · **Likes**: `135`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/dantora-ee8f83f9a3-preview.mp4`

---

## Visual Concept & Choreography
> A medical clinic told through ink in water — a green double helix that never stops shedding plumes, swirling outward on an evolving noise flow and parting wherever your cursor goes, with photographs trailing off the pointer, a rail of services that scrubs sideways under your scroll, and every block riding up over the one before it.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Dantora** website:

```markdown
# Recreate this site as a single HTML file: Dantora (dantora)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Dantora** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A medical clinic told through ink in water — a green double helix that never stops shedding plumes, swirling outward on an evolving noise flow and parting wherever your cursor goes, with photographs trailing off the pointer, a rail of services that scrubs sideways under your scroll, and every block riding up over the one before it.
- **Tone**: Light mode aesthetic with calm, organic mood.
- **Domain & Design Keywords**: 000, 160, 3d, about, after, along, already, and, another, appears, appointment, around, arriving, away, ball, band, banner, bar, because, behind, between, biotech, black, bleeding, blended, block, blocks, blur, blur-reveal, booking, born, both, bottom, bounce, brand, built, calm, camera, cards, carousel, carrying, check-up, clean, clears, climbing, clinic, clips, clockwise, clouds, comes, consultation, contact, contact form, continuously, copy, count, counter, cursor, cursor-trail, curtain, dantora, darkens, deform, diagnosis, diagnostics, diagonal, diffusion, disperses, dissolving, dna, doctor, doctors, double, down, drag, drawing, drawn, draws, drifts, dropped, dye, each, editorial, evolving, falling, fills, five, flow, focus, following, form, four, frosted, full, function, genetic-testing, genetics, genomic, glass, glowing, glsl, green, hard, health, healthcare, helix, hero, horizontal-scroll, hospital, hugging, image-trail, imaging, ink, instead, into, itself, lab, laboratory, landing, landing page, lazily, life, life-sciences, lift, light, lime, loader, mark, medical, mid, mint, more, mouse, moves, moving, much, multiply, next, nextjs, noise, normalised, nothing, nowhere, numbers, oldest, one, opens, out, outward, over, overlay, page, pale, panel, paper, parallax, part, particles, parting, path, patient, photographs, physician, pinned, pins, plume, point, point-cloud, pointer, points, practice, preloader, prevention, private, progress, pure, pushed, radiology, rail, rather, releasing, resolving, rides, ring, runway, scaling, science, screening, scroll, scroll-hijack, scrolled, scrub, sequence, service, settling, shader, shedding, sideways, simplex, slider, sliding, soft, spawns, specialist, spring-text-engine, statistics, stays, sticky, strand, swelling, swirls, team, than, that, the, their, them, then, thinning, thins, threejs, throw, top, transitions, trustworthy, turn, twice, under, underneath, viewport, wall, was, water, webgl, wellness, where, wherever, while, white, whose, without, words, you, your.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.mp4
  - Preview Video: https://storage.getlayers.ai/templates/dantora-ee8f83f9a3-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A medical clinic told through ink in water — a green double helix that never stops shedding plumes, swirling outward on an evolving noise flow and parting wherever your cursor goes, with photographs trailing off the pointer, a rail of services that scrubs sideways under your scroll, and every block riding up over the one before it.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Dantora**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
