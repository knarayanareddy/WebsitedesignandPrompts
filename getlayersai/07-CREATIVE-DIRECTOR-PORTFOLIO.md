# Website Prompt: Creative Director (`creative-director`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `dark` · `playful, luxe`
- **Preview Image**: https://storage.getlayers.ai/templates/creative-director.webp
- **Preview Video**: https://storage.getlayers.ai/templates/creative-director.mp4
- **Design Keywords**: `portfolio, art-director, creative, webgl, lava, shader, cinematic, grain, scroll, next, director, pure, black, art, full, screen, hero, video, lit, mouse, following, molten, orange, glow, dot, matrix, scramble, wordmark, sitting, one, continuous, raymarched, backdrop, that, blurs, blooms, behind, glass, case, study, cards, services, grid, horizontal, project, carousel, get, touch, footer, all, single, lenis, clock, spring, reveals, film, page, agency, studio`

---

## Visual Overview
> A portfolio that smolders — molten reds drift like a lava lamp beneath film grain while case studies glide past in a slow heat haze.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: CREATIVE DIRECTOR

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Creative Director** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A portfolio that smolders — molten reds drift like a lava lamp beneath film grain while case studies glide past in a slow heat haze.
- **Tone**: Dark mode with playful, luxe styling.
- **Color Tokens**:
  - `--bg-charcoal`: `#0a0708`
  - `--accent-molten`: `#ff2a1f`
  - `--accent-crimson`: `#990a00`
  - `--ink-cream`: `#f5ebe6`
- **Typography**:
  - Display: `'Playfair Display'` or `'Instrument Serif'` paired with `'Inter'` uppercase micro-labels.

## 2. Core Interactive & WebGL Architecture
- **Molten Lava-Lamp Shader & Film Grain**: Fullscreen WebGL metaball / domain-warped FBM noise shader in deep crimson (`#990a00`) and molten orange-red (`#ff2a1f`), overlaid with animated 35mm analog film grain (`uTime`, `uMouse`).

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Editorial Masthead**: Name, role (*Executive Creative Director*), availability indicator, and index jump-links.
2. **Smoldering Hero**: Towering editorial typography over the molten red shader canvas with cursor-repelling heat distortion.
3. **Case Study Index**: Interactive numbered list (`01 — 08`) where hovering a row cross-fades a floating parallax preview frame and warps the background shader palette.
4. **Philosophy & Awards**: Pull-quotes with word-by-word scroll opacity reveals and a tabular recognition ledger (Cannes Lions, D&AD, Awwwards SOTY).
5. **Colophon & Direct Inquiry**: Minimalist oversized email copy-to-clipboard interaction.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
