# Website Prompt: Lumora (`lumora`)

- **Category**: Website Template (Free)
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `light` · `luxe`
- **Preview Image**: https://storage.getlayers.ai/templates/lumora.webp
- **Preview Video**: https://storage.getlayers.ai/templates/lumora.mp4
- **Design Keywords**: `studio, agency, portfolio, editorial, creative-studio, light, warm-neutral, next, lumora, warm, white, landing, page, carried, oversized, brand, watermark, single, burnt, orange, accent, full, bleed, liquid, reveal, hero, portrait, carousel, highlight, card, globe, backed, statement, four, pill, create, band, dark, grid, services, rail, counting, stats, block, wordmark, footer, all, stacked, under, one, lenis, scroll, clock`

---

## Visual Overview
> An independent design-and-engineering studio rendered in near-black calm — bold work surfacing with quiet, fluid precision as the page drifts past.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: LUMORA

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Lumora** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: An independent design-and-engineering studio rendered in near-black calm — bold work surfacing with quiet, fluid precision as the page drifts past.
- **Tone**: Light mode with luxe styling.
- **Color Tokens**:
  - `--bg-calm`: `#090a0c`
  - `--accent-warm`: `#f59e0b`
  - `--ink-bright`: `#fafafa`
  - `--ink-faint`: `#71717a`
- **Typography**:
  - Swiss modernist grid typography with ultra-clean hierarchy and generous negative space.

## 2. Core Interactive & WebGL Architecture
- **Subtle Surface Caustics & Cursor Spotlight**: Soft WebGL light field casting calm ambient caustics behind project cards, paired with spring-smoothed image reveal masks.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Studio Header**: Minimalist 4-column Swiss grid header (Name, Location, Availability, Contact).
2. **Statement Hero**: Poised headline with staggered line-by-line mask reveal and subtle light-field backdrop.
3. **Selected Work Grid**: Asymmetric 2-column project showcase with custom magnetic `"View Case"` cursor follower and smooth image scale on hover.
4. **Capabilities & Principles**: Numbered accordion rows detailing Design Systems, Creative WebGL, and Product Engineering.
5. **Footer**: Local time ticker and one-click email copy pill.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
