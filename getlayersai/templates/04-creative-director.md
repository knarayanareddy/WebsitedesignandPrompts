# Creative Director (`creative-director`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `creative-director` (#4 of 54)
- **Title**: Creative Director
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/creative-director`
- **Category & Type**: `template` · `full-page, portfolio, agency-studio`
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `dark` · `playful, luxe`
- **Keywords**: `portfolio, art-director, creative, webgl, lava, shader, cinematic, grain, scroll, next, director, pure, black, art, full, screen, hero, video, lit, mouse, following, molten, orange, glow, dot, matrix, scramble, wordmark, sitting, one, continuous, raymarched, backdrop, that, blurs, blooms, behind, glass, case, study, cards, services, grid, horizontal, project, carousel, get, touch, footer, all, single, lenis, clock, spring, reveals, film, page, agency, studio`
- **Created Date**: `2026-06-25` · **Likes**: `135`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/creative-director.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/creative-director.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/creative-director-preview.mp4`

---

## Visual Concept & Choreography
> A portfolio that smolders — molten reds drift like a lava lamp beneath film grain while case studies glide past in a slow heat haze.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Creative Director** website:

```markdown
# Recreate this site as a single HTML file: Creative Director (creative-director)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Creative Director** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A portfolio that smolders — molten reds drift like a lava lamp beneath film grain while case studies glide past in a slow heat haze.
- **Tone**: Dark mode aesthetic with playful, luxe mood.
- **Domain & Design Keywords**: portfolio, art-director, creative, webgl, lava, shader, cinematic, grain, scroll, next, director, pure, black, art, full, screen, hero, video, lit, mouse, following, molten, orange, glow, dot, matrix, scramble, wordmark, sitting, one, continuous, raymarched, backdrop, that, blurs, blooms, behind, glass, case, study, cards, services, grid, horizontal, project, carousel, get, touch, footer, all, single, lenis, clock, spring, reveals, film, page, agency, studio.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/creative-director.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/creative-director.mp4
  - Preview Video: https://storage.getlayers.ai/templates/creative-director-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A portfolio that smolders — molten reds drift like a lava lamp beneath film grain while case studies glide past in a slow heat haze.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Creative Director**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
