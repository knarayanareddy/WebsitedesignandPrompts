# Website Prompt: Clarix (`clarix`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs`
- **Tags**: `landing page, threejs`
- **Tone & Mood**: `light` · `luxe, organic`
- **Preview Image**: https://storage.getlayers.ai/templates/clarix.webp
- **Preview Video**: https://storage.getlayers.ai/templates/clarix.mp4
- **Design Keywords**: `landing, webgl, threejs, glb, draco, ascii, holographic, scroll, preloader, particles, glass, marquee, light, vite, agency, cinematic, screen, film, white, page, iridescent, object, dissolving, into, halftone, grid, airy, editorial, whitespace, with, corner, pinned, index, labels, frosted, panels, sliding, over, live, gradient, field, wordmark, shattering, drifting, particle, galaxy, clarix, viewport, single, creative, studio, driven, end, one, clock, compressed, shaded, fresnel, rim, flowing, curved, lines, per, pixel, dither, that, morphs, squares, circles, colour, runs, warm, flies, through, six, choreographed, phases, anchored, hero, three, giant, words, arc, past, lens, perspective, curve, panel, statistics, full, height, left, column, feature, split, assembled, logo, own, alpha, channel, plus, 500, ambient, drifters, centred, outro, lifts, footer, frame, behind, all, procedural, rounded, boxes, pulses, blue, cyan, hot, pink, red, ripples, away, cursor, stepped, 000, 100, odometer, blob, gates, entrance, then, space, reveal, circle, carves, model, existence, tech`

---

## Visual Overview
> A cinematic scroll where a holographic ASCII model dissolves into being, words fly through space, and a logo assembles itself from thousands of glowing particles.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: CLARIX

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Clarix** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A cinematic scroll where a holographic ASCII model dissolves into being, words fly through space, and a logo assembles itself from thousands of glowing particles.
- **Tone**: Light mode with luxe, organic styling.
- **Color Tokens**:
  - `--bg-void`: `#050507`
  - `--accent-holo`: `#38bdf8`
  - `--accent-amber`: `#fbbf24`
  - `--ink-mono`: `#e2e8f0`
- **Typography**:
  - Monospace-forward architecture (`'JetBrains Mono'`) combined with sharp geometric display headers.

## 2. Core Interactive & WebGL Architecture
- **Holographic ASCII 3D Model**: A Three.js post-processing ASCII character rasterizer shader (` .:-=+*#%@`) rendering a rotating 3D geometric torus-knot / bust that dissolves into floating 3D typography words as you scroll through space.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Terminal-Inspired Topbar**: System status, ASCII density switcher (`Low / Med / Ultra`), and documentation link.
2. **Holographic Hero**: Live ASCII-rendered 3D model reacting to cursor orbit, with kinetic words flying along the Z-axis.
3. **Code-to-Infrastructure Pipeline**: Interactive tabs showing live terminal diffs and throughput graphs.
4. **Benchmark Matrix**: Animated bar comparisons and latency histograms.
5. **Developer CTA Footer**: Interactive CLI command copier (`npx @clarix/init`).

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
