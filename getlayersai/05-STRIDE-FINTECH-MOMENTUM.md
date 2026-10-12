# Website Prompt: Stride (`stride`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `light` · `brutal, playful`
- **Preview Image**: https://storage.getlayers.ai/templates/stride.webp
- **Preview Video**: https://storage.getlayers.ai/templates/stride.mp4
- **Design Keywords**: `fintech, saas, product, marketing, blue, webgl, plasma, chrome, scroll, next, stride, bright, landing, page, royal, white, full, bleed, burst, hero, that, shrinks, rounded, card, tied, logo, marquee, icon, chip, about, statement, stats, bento, hover, reveal, showcase, cylinder, portfolio, stack, pinned, chain, explainer, mesh, gradient, heart, footer, contact, form, all, set, mulish, one, shared, clock`

---

## Visual Overview
> Modern banking rendered as momentum — a deep-blue fintech landing where a filament of light pulses at the heart of the hero, cool, precise, and quietly in motion.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: STRIDE

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Stride** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: Modern banking rendered as momentum — a deep-blue fintech landing where a filament of light pulses at the heart of the hero, cool, precise, and quietly in motion.
- **Tone**: Light mode with brutal, playful styling.
- **Color Tokens**:
  - `--bg-navy`: `#040814`
  - `--accent-electric`: `#2b5bff`
  - `--accent-cyan`: `#38bdf8`
  - `--ink-crisp`: `#f8fafc`
  - `--ink-slate`: `#94a3b8`
- **Typography**:
  - Display: `'Plus Jakarta Sans'` or `'Inter'` 700, `-0.03em` tracking.
  - Financial Figures: `'JetBrains Mono'` with strict `tabular-nums` for live currency tickers.

## 2. Core Interactive & WebGL Architecture
- **Light Filament Spine**: A continuous 3D WebGL light ribbon (`THREE.TubeGeometry` + custom Fresnel glow shader) that pulses from the hero card down the entire length of the page, splitting into multi-currency settlement streams as you scroll.
- **Interactive 3D Metal Card**: Tilting dark-titanium payment card in the hero with anisotropic brushed-metal specular highlights that react to pointer position.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Header**: Minimalist fintech nav with live FX status indicator and `Open Account` pill.
2. **Hero**: Split layout with headline *"Modern banking rendered as momentum"*, interactive 3D titanium card, and instant settlement ticker.
3. **Global Treasury Flow**: Scroll-driven map and settlement visualizer where the WebGL light filament connects London, New York, Singapore, and Tokyo with sub-second latency counters.
4. **Yield & Spend Controls**: Interactive card limit sliders, virtual card generator preview, and automated treasury rules.
5. **Tier Comparison & Footer**: Clean institutional-grade pricing matrix and compliance footer.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
