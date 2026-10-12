# Evolve (`evolve`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `evolve` (#25 of 54)
- **Title**: Evolve
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/evolve`
- **Category & Type**: `template` · `hero, ai-tech`
- **Tech Stack**: `hero, threejs, nextjs`
- **Tags**: `hero, threejs, nextjs`
- **Tone & Mood**: `dark` · `technical, luxe`
- **Keywords**: `3d, ai, artificial-intelligence, black, bloom, blue, blueprint, breathes, bust, cloud, counter, crosshair, cursor, cyber, dark, decode, dots, drift, drifts, engineering, enterprise, evolve, face, figures, follow, foundation-models, futuristic, glow, glowing, glyphs, gradient, grid, hairline, haze, head, headline, hero, human, infrastructure, intelligence, interactive, jet, key, landing, letter, machine-learning, magenta, metrics, minimal, ml, mono, monospace, neon, nextjs, out, parallax, particle, particles, platform, point-cloud, points, premium, red, repulsion, rim, rules, saas, scatter, scramble, scrambled, settle, shimmer, stat, stats, sweeps, tech, tens, thousands, threejs, turns, webgl, where, while`
- **Created Date**: `2026-08-04` · **Likes**: `114`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/evolve-f940e12f08.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/evolve-f940e12f08.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/evolve-f940e12f08-preview.mp4`

---

## Visual Concept & Choreography
> A jet-black AI hero where a human head of tens of thousands of glowing particles — blue key, red rim — drifts, breathes and turns to follow the cursor over a hairline blueprint grid, while the headline sweeps in letter by letter and stat figures settle out of scrambled glyphs.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Evolve** website:

```markdown
# Recreate this site as a single HTML file: Evolve (evolve)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Evolve** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: A jet-black AI hero where a human head of tens of thousands of glowing particles — blue key, red rim — drifts, breathes and turns to follow the cursor over a hairline blueprint grid, while the headline sweeps in letter by letter and stat figures settle out of scrambled glyphs.
- **Tone**: Dark mode aesthetic with technical, luxe mood.
- **Domain & Design Keywords**: 3d, ai, artificial-intelligence, black, bloom, blue, blueprint, breathes, bust, cloud, counter, crosshair, cursor, cyber, dark, decode, dots, drift, drifts, engineering, enterprise, evolve, face, figures, follow, foundation-models, futuristic, glow, glowing, glyphs, gradient, grid, hairline, haze, head, headline, hero, human, infrastructure, intelligence, interactive, jet, key, landing, letter, machine-learning, magenta, metrics, minimal, ml, mono, monospace, neon, nextjs, out, parallax, particle, particles, platform, point-cloud, points, premium, red, repulsion, rim, rules, saas, scatter, scramble, scrambled, settle, shimmer, stat, stats, sweeps, tech, tens, thousands, threejs, turns, webgl, where, while.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/evolve-f940e12f08.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/evolve-f940e12f08.mp4
  - Preview Video: https://storage.getlayers.ai/templates/evolve-f940e12f08-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: A jet-black AI hero where a human head of tens of thousands of glowing particles — blue key, red rim — drifts, breathes and turns to follow the cursor over a hairline blueprint grid, while the headline sweeps in letter by letter and stat figures settle out of scrambled glyphs.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Evolve**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
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
