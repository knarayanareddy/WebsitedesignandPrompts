# Website Prompt: AI Studio (`ai-studio`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `light` · `luxe, technical`
- **Preview Image**: https://storage.getlayers.ai/templates/ai-studio.webp
- **Preview Video**: https://storage.getlayers.ai/templates/ai-studio.mp4
- **Design Keywords**: `showreel, agency, ai, webgl, particles, carousel, scroll, cinematic, next, studio, driven, that, lives, fixed, black, stage, full, bleed, mesh, gradient, hero, card, flips, cosine, sorted, product, opens, 34k, point, violet, particle, sphere, hands, off, horizontal, portfolio, video, rail, wrapped, aurora, glow, then, flies, camera, through, parallax, image, grid, chrome, brand, star, finale, every, phase, scrubbed, one, clock, page, tech`

---

## Visual Overview
> A chrome star turns in the dark and the whole page becomes one cinematic scroll — violet light, a bloom of drifting particles, and a camera that flies clean through it. A neural-brand showreel that thinks ahead.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: AI STUDIO

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **AI Studio** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A chrome star turns in the dark and the whole page becomes one cinematic scroll — violet light, a bloom of drifting particles, and a camera that flies clean through it. A neural-brand showreel that thinks ahead.
- **Tone**: Light mode with luxe, technical styling.
- **Color Tokens**:
  - `--bg-dark`: `#06050a`
  - `--accent-violet`: `#9d4edd`
  - `--accent-chrome`: `#e2e8f0`
  - `--accent-indigo`: `#4361ee`
- **Typography**:
  - Display: High-contrast editorial sans/serif pairing (`'Syne'` + `'Instrument Serif'` italic accents).

## 2. Core Interactive & WebGL Architecture
- **Turning Chrome Star**: Centerpiece 3D custom-extruded 8-point star mesh with a procedural environment map for liquid-chrome reflections and violet rim lighting.
- **Cinematic Scroll Camera**: Scrolling drives the camera through the center of the chrome star into a dark gallery corridor illuminated by volumetric violet light shafts.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Minimalist Studio Bar**: Studio coordinates, local time clock, sound toggle, and menu drawer trigger.
2. **Chrome Star Hero**: Full-viewport 3D chrome star rotating with scroll inertia, framed by oversized kinetic typography.
3. **Selected Works Reel**: Horizontal scroll-hijacked showcase of 5 interactive AI film & brand campaigns with video-on-hover distortion shaders.
4. **Capabilities & Pipeline**: Interactive node graph showing GenAI video, 3D neural rendering, and sonic branding workflows.
5. **Contact & Commission Stage**: Giant magnetic *"Start a Project"* orb trigger.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
