# Wanderlust (`wanderlust`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `wanderlust` (#12 of 54)
- **Title**: Wanderlust
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/wanderlust`
- **Category & Type**: `template` · `full-page, hospitality-travel`
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `dark` · `organic, luxe`
- **Keywords**: `1024, 55ms, accordion, across, adventure, adventure brand, adventure travel, aerial, after, alone, along, alphas, already, also, and, angle, around, arrives, assembles, atmospheric, backdrop, because, behind, below, bits, black, bleed, blocks, booking, brightened, built, camera, capital, captions, cinematic, clip, collage, company, continuous, counter, counting, country, cream, cta, cursor, cut, dark, destination, destinations, directions, display, dissolved, documentary, editorial, else, encoder, escape, every, everywhere, expedition, experiences, exploration, explore, exposure, fewest, film, film-grain, first, fjords, flying, following, footage, footer, found, four, frame, frosted, full, gallery, gather, gathering, glacial, glass, goes, golden, grain, group, guided tours, half, hands, handwriting, handwritten, headline, height, hiking, hospitality, hover-widen, iceland, immersive, instead, interface, into, italic, itinerary, itself, journey, jumps, lamp, landing, landing page, landscape, last, layered, leading, leaning, left, lenis, lens, light, like, line, list, loader, looked, looking, manifesto, mask, media, moment, monochrome, moody, mountain, mountains, nature, near, near-black, never, newsletter, next, nextjs, nordic, note, nothing, off, once, one, onto, opening, opens, out, outdoors, over, own, page, panels, pans, parallax, photographic, photography, pinned, played, point, pointer-follow, polaroid, polaroids, postcards, preloader, quite, rather, react-spring, reader, recording, red, reserved, resolution, restack, retreat, reveal, rides, river, road trip, saturated, scaling, scandinavian, scattered, scene, scenic, scroll, scroll driven, scroll-scrub, serif, shot, single, single-ink, sixteen, slides, slow travel, small, small group, small group trips, spent, stack, stagger, stepped, sticky, stops, storytelling, table, tailwind, tally, than, that, the, their, them, then, there, three, tilt, tilting, tour operator, tourism, tours, toward, travel, travel agency, travel blog, trekking, trip planning, trips, true, type, under, valley, vertical, video, video-hero, view, wanderlust, warm, what, when, where, while, whole, whose, widen, wilderness, window, word, word-reveal, wordmark, writes, written, you`
- **Created Date**: `2026-08-23` · **Likes**: `203`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/wanderlust-555800a518.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/wanderlust-555800a518.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/wanderlust-555800a518-preview.mp4`

---

## Visual Concept & Choreography
> A dark, windswept travel site that lingers on wide country and quiet mornings — the kind of page that makes leaving feel overdue.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Wanderlust** website:

```markdown
# Recreate this site as a single HTML file: Wanderlust (wanderlust)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Wanderlust** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A dark, windswept travel site that lingers on wide country and quiet mornings — the kind of page that makes leaving feel overdue.
- **Tone**: Dark mode aesthetic with organic, luxe mood.
- **Domain & Design Keywords**: 1024, 55ms, accordion, across, adventure, adventure brand, adventure travel, aerial, after, alone, along, alphas, already, also, and, angle, around, arrives, assembles, atmospheric, backdrop, because, behind, below, bits, black, bleed, blocks, booking, brightened, built, camera, capital, captions, cinematic, clip, collage, company, continuous, counter, counting, country, cream, cta, cursor, cut, dark, destination, destinations, directions, display, dissolved, documentary, editorial, else, encoder, escape, every, everywhere, expedition, experiences, exploration, explore, exposure, fewest, film, film-grain, first, fjords, flying, following, footage, footer, found, four, frame, frosted, full, gallery, gather, gathering, glacial, glass, goes, golden, grain, group, guided tours, half, hands, handwriting, handwritten, headline, height, hiking, hospitality, hover-widen, iceland, immersive, instead, interface, into, italic, itinerary, itself, journey, jumps, lamp, landing, landing page, landscape, last, layered, leading, leaning, left, lenis, lens, light, like, line, list, loader, looked, looking, manifesto, mask, media, moment, monochrome, moody, mountain, mountains, nature, near, near-black, never, newsletter, next, nextjs, nordic, note, nothing, off, once, one, onto, opening, opens, out, outdoors, over, own, page, panels, pans, parallax, photographic, photography, pinned, played, point, pointer-follow, polaroid, polaroids, postcards, preloader, quite, rather, react-spring, reader, recording, red, reserved, resolution, restack, retreat, reveal, rides, river, road trip, saturated, scaling, scandinavian, scattered, scene, scenic, scroll, scroll driven, scroll-scrub, serif, shot, single, single-ink, sixteen, slides, slow travel, small, small group, small group trips, spent, stack, stagger, stepped, sticky, stops, storytelling, table, tailwind, tally, than, that, the, their, them, then, there, three, tilt, tilting, tour operator, tourism, tours, toward, travel, travel agency, travel blog, trekking, trip planning, trips, true, type, under, valley, vertical, video, video-hero, view, wanderlust, warm, what, when, where, while, whole, whose, widen, wilderness, window, word, word-reveal, wordmark, writes, written, you.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/wanderlust-555800a518.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/wanderlust-555800a518.mp4
  - Preview Video: https://storage.getlayers.ai/templates/wanderlust-555800a518-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A dark, windswept travel site that lingers on wide country and quiet mornings — the kind of page that makes leaving feel overdue.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Wanderlust**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
