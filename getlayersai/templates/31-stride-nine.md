# Stride Nine (`stride-nine`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `stride-nine` (#31 of 54)
- **Title**: Stride Nine
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/stride-nine`
- **Category & Type**: `template` · `hero, sports-education, ecommerce`
- **Tech Stack**: `hero, nextjs`
- **Tags**: `hero, nextjs`
- **Tone & Mood**: `dark` · `brutal, technical`
- **Keywords**: `120ms, 1240ms, 28px, 52px, 90px, absolute, across, activewear, after, against, agrees, air, airflow, alone, along, already, and, anisotropic, apparel, are, around, arrive, arriving, assurance, athlete, athletes, athletics, authored, axis, back, baked, bar, before, biased, bleed, blend, block, blue, blur, bottom, bracketed, brand, break, brutal, buffer, buttons, canvas, capitals, caps, card, carries, catching, caught, chain, cinematic, copy, counting, cover, cropped, crossed, crossing, ctas, cursor, curved, dark, decode, deep, delays, diagonal, difference, difference-blend, dimensional, directly, disc, displacement, displaces, does, drag, dragging, drawn, draws, driven, ecommerce, editorial, education, ellipse, endurance, entrance, every, everything, eyebrow, fade, failsafe, falloffs, field, fine, first, fitness, five, floats, fold, fonts, footage, frame, frosted, frozen, full, full-bleed, fullscreen, gate, gaussian, gear, geist, glass, glsl, grades, grips, gym, hairline, happening, headline, hero, instead, interactive, interface, item, itself, jogging, just, kit, layer, lays, lead, leaves, left, lifting, lifts, line, lines, live, load, loader, loading, looping, marathon, mid, mile, milestones, mono, motion, move, moving, nav, next, nextjs, nike, nine, one, one-screen, only, orange, page, pass, performance, photograph, photographic, picture, pinned, pointer, points, poster, preloader, react-spring, real, refuses, result, right, rotated, row, run, runner, runners, running, same, screen, second, separated, set, shader, shoes, shop, silently, single, six, sixteen, sky, smear, smears, sneakers, something, space, speed, sport, sports, sportswear, spring-text-engine, sprint, sprinter, sprinters, square, standing, start, starts, stats, step, still, store, streaks, streamlines, stride, subject, summed, tagline, telemetry, that, the, their, them, then, three, through, top, touch, track, trail, training, travelling, turbulence, two, unbroken, uncovered, uncovering, uneven, untouched, uppercase, video, wake, warm, way, webgl, webgl2, weight, wherever, while, white, whole, whose, wordmark, you, your`
- **Created Date**: `2026-08-06` · **Likes**: `99`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f-preview.mp4`

---

## Visual Concept & Choreography
> Two sprinters caught mid-stride against a deep blue sky, a headline set across them in unbroken white caps — and the air itself catching and dragging wherever you move.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Stride Nine** website:

```markdown
# Recreate this site as a single HTML file: Stride Nine (stride-nine)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Stride Nine** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: Two sprinters caught mid-stride against a deep blue sky, a headline set across them in unbroken white caps — and the air itself catching and dragging wherever you move.
- **Tone**: Dark mode aesthetic with brutal, technical mood.
- **Domain & Design Keywords**: 120ms, 1240ms, 28px, 52px, 90px, absolute, across, activewear, after, against, agrees, air, airflow, alone, along, already, and, anisotropic, apparel, are, around, arrive, arriving, assurance, athlete, athletes, athletics, authored, axis, back, baked, bar, before, biased, bleed, blend, block, blue, blur, bottom, bracketed, brand, break, brutal, buffer, buttons, canvas, capitals, caps, card, carries, catching, caught, chain, cinematic, copy, counting, cover, cropped, crossed, crossing, ctas, cursor, curved, dark, decode, deep, delays, diagonal, difference, difference-blend, dimensional, directly, disc, displacement, displaces, does, drag, dragging, drawn, draws, driven, ecommerce, editorial, education, ellipse, endurance, entrance, every, everything, eyebrow, fade, failsafe, falloffs, field, fine, first, fitness, five, floats, fold, fonts, footage, frame, frosted, frozen, full, full-bleed, fullscreen, gate, gaussian, gear, geist, glass, glsl, grades, grips, gym, hairline, happening, headline, hero, instead, interactive, interface, item, itself, jogging, just, kit, layer, lays, lead, leaves, left, lifting, lifts, line, lines, live, load, loader, loading, looping, marathon, mid, mile, milestones, mono, motion, move, moving, nav, next, nextjs, nike, nine, one, one-screen, only, orange, page, pass, performance, photograph, photographic, picture, pinned, pointer, points, poster, preloader, react-spring, real, refuses, result, right, rotated, row, run, runner, runners, running, same, screen, second, separated, set, shader, shoes, shop, silently, single, six, sixteen, sky, smear, smears, sneakers, something, space, speed, sport, sports, sportswear, spring-text-engine, sprint, sprinter, sprinters, square, standing, start, starts, stats, step, still, store, streaks, streamlines, stride, subject, summed, tagline, telemetry, that, the, their, them, then, three, through, top, touch, track, trail, training, travelling, turbulence, two, unbroken, uncovered, uncovering, uneven, untouched, uppercase, video, wake, warm, way, webgl, webgl2, weight, wherever, while, white, whole, whose, wordmark, you, your.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f.mp4
  - Preview Video: https://storage.getlayers.ai/templates/stride-nine-a6fc990c1f-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: Two sprinters caught mid-stride against a deep blue sky, a headline set across them in unbroken white caps — and the air itself catching and dragging wherever you move.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Stride Nine**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
