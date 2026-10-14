# Website Prompt: Ascend (`ascend`)

- **Category**: Website Template (Free)
- **Tech Stack**: `landing page, threejs, react`
- **Tags**: `landing page, threejs, react`
- **Tone & Mood**: `dark` · `technical, luxe`
- **Preview Image**: https://storage.getlayers.ai/templates/ascend.webp
- **Preview Video**: https://storage.getlayers.ai/templates/ascend.mp4
- **Design Keywords**: `saas, landing, webgl, planet, earth, space, scroll, bloom, glass, vite, ascend, single, page, immersive, experience, one, fixed, photoreal, day, night, city, lights, shader, drifting, cloud, shells, atmosphere, halo, starfield, radar, ping, markers, composited, through, corner, flame, pass, sits, behind, four, sections, hero, features, live, dashboard, showcase, cta, footer, while, clock, zooms, swings, across`

---

## Visual Overview
> A living Earth turns in deep space behind a mint-lit SaaS landing page — city lights, drifting clouds, and radar pings glowing as the planet sinks and swings with every scroll.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: ASCEND

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Ascend** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A living Earth turns in deep space behind a mint-lit SaaS landing page — city lights, drifting clouds, and radar pings glowing as the planet sinks and swings with every scroll.
- **Tone**: Dark mode with technical, luxe styling.
- **Color Tokens**:
  - `--bg-space`: `#03070e`
  - `--accent-mint`: `#34d399`
  - `--accent-Atmosphere`: `#0ea5e9`
  - `--ink-star`: `#f0fdf4`
- **Typography**:
  - Technical SaaS sans (`'Inter'`) with glowing mint metric badges.

## 2. Core Interactive & WebGL Architecture
- **Living 3D Earth in Deep Space**: A Three.js high-resolution procedural globe featuring day/night terminator shading, glowing city-light clusters, a drifting cloud layer sphere, a custom Fresnel atmospheric halo in mint/cyan, and animated orbital arcs connecting global edge data centers.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Global Network Navbar**: Status dot (`All 42 Regions Operational`), navigation links, and `Deploy Now` CTA.
2. **Planetary Hero**: Mint-lit SaaS headline set over the rotating 3D Earth horizon, with live request-per-second counter and region ping selector.
3. **Edge Region Explorer**: Clicking region pills (*us-east*, *eu-central*, *ap-tokyo*) smoothly rotates the 3D globe camera to focus on that continent and highlights active fiber arcs.
4. **Developer DX & SDKs**: Interactive code tabs and instant latency benchmark widget.
5. **Pricing & Global Footer**: Usage calculator and status page links.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
