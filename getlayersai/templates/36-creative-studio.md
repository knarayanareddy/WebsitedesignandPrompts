# Creative Studio (`creative-studio`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `creative-studio` (#36 of 54)
- **Title**: Creative Studio
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/creative-studio`
- **Category & Type**: `template` · `full-page, agency-studio`
- **Tech Stack**: `hero, threejs, nextjs`
- **Tags**: `hero, threejs, nextjs`
- **Tone & Mood**: `dark` · `luxe, playful`
- **Keywords**: `studio, agency, webgl, particles, sun, solar, bloom, dark, next, creative, hero, one, continuous, scene, additive, particle, breathing, fbm, aurora, finished, unrealbloom, sits, behind, frosted, near, black, glass, panel, cut, out, window, framed, nested, orbit, rings, while, white, masthead, per, word, headline, reveal, stat, strip, ease, after, counting, preloader, wipes, away, full, page`
- **Created Date**: `2026-07-06` · **Likes**: `88`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/creative-studio-12920d9ef2.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/creative-studio-12920d9ef2.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/creative-studio-12920d9ef2-preview.mp4`

---

## Visual Concept & Choreography
> A void-black creative-studio hero where a solar swell of amber particles ripples beneath faint orbital rings — identity and art direction rendered as light in motion.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Creative Studio** website:

```markdown
# Recreate this site as a single HTML file: Creative Studio (creative-studio)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Creative Studio** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A void-black creative-studio hero where a solar swell of amber particles ripples beneath faint orbital rings — identity and art direction rendered as light in motion.
- **Tone**: Dark mode aesthetic with luxe, playful mood.
- **Domain & Design Keywords**: studio, agency, webgl, particles, sun, solar, bloom, dark, next, creative, hero, one, continuous, scene, additive, particle, breathing, fbm, aurora, finished, unrealbloom, sits, behind, frosted, near, black, glass, panel, cut, out, window, framed, nested, orbit, rings, while, white, masthead, per, word, headline, reveal, stat, strip, ease, after, counting, preloader, wipes, away, full, page.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/creative-studio-12920d9ef2.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/creative-studio-12920d9ef2.mp4
  - Preview Video: https://storage.getlayers.ai/templates/creative-studio-12920d9ef2-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A void-black creative-studio hero where a solar swell of amber particles ripples beneath faint orbital rings — identity and art direction rendered as light in motion.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Creative Studio**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
