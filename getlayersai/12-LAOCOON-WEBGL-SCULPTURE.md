# Website Prompt: Laocoon (`laocoon`)

- **Category**: Website Template (Free)
- **Tech Stack**: `landing page, threejs`
- **Tags**: `landing page, threejs`
- **Tone & Mood**: `dark` · `luxe, organic`
- **Preview Image**: https://storage.getlayers.ai/templates/laocoon.webp
- **Preview Video**: https://storage.getlayers.ai/templates/laocoon.mp4
- **Design Keywords**: `cinematic, webgl, three, glb, sculpture, bronze, liquid-metal, orbit, scroll, sparks, vite, laoco, single, screen, landing, built, around, one, rearing, statue, real, time, scene, where, horse, lit, chiaroscuro, liquid, metal, wave, shader, forge, drifting, upward, while, camera, orbits, 360, degrees, clock, palette, cools, molten, copper, deep, sapphire, four, italiana, set, editorial, slides, fade, out, same, hero, portfolio`

---

## Visual Overview
> A cinematic WebGL homage to the Laocoön — a glowing bronze sculpture you orbit as you scroll, wrapped in molten forge sparks and a breathing liquid-metal shader that drifts from bronze to deep sapphire.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: LAOCOON

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Laocoon** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A cinematic WebGL homage to the Laocoön — a glowing bronze sculpture you orbit as you scroll, wrapped in molten forge sparks and a breathing liquid-metal shader that drifts from bronze to deep sapphire.
- **Tone**: Dark mode with luxe, organic styling.
- **Color Tokens**:
  - `--bg-museum`: `#080706`
  - `--accent-bronze`: `#d97706`
  - `--accent-gold`: `#fcd34d`
  - `--ink-parchment`: `#f5f5f4`
- **Typography**:
  - Classical Roman-inspired serif (`'Cormorant Garamond'` or `'Cinzel'`) paired with minimalist museum catalog annotations.

## 2. Core Interactive & WebGL Architecture
- **Orbital Bronze Sculpture Homage**: A procedural Three.js sculptural composition (intertwined procedural serpent tubes and classical bust geometry) rendered with a custom bronze patina PBR shader (warm specular rim lights, ambient occlusion, and volumetric dust motes). Scrolling orbits the camera 360° around the sculpture while spotlights shift dramatically.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Museum Exhibition Header**: Catalog number (`CAT. II — VATICAN MUSEUMS HOMAGE`), lighting angle toggle, and audio ambiance button.
2. **Hero Orbit Stage**: Full-viewport fixed WebGL canvas with overlaid classical serif titles that fade in and out at specific camera azimuth angles.
3. **Anatomical & Historical Annotations**: Scroll-pinned callout lines (`SVG` leader lines anchored to 3D world-space coordinates projected to 2D screen space) explaining the composition, tension, and patina.
4. **Exhibition Credits Footer**: Archival metadata and interactive light-temperature slider.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
