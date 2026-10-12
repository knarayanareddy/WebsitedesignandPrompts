# Website Prompt: Vesper (`vesper`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `dark` · `technical, luxe`
- **Preview Image**: https://storage.getlayers.ai/templates/vesper-06e69bbad0.webp
- **Preview Video**: https://storage.getlayers.ai/templates/vesper-06e69bbad0.mp4
- **Design Keywords**: `product, developer-tool, webgl, orb, hud, next, vesper, dark, technical, page, built, around, live, instrument, not, decoration, frosted, financial, readouts, faq, all, held, together, one, scroll, clock, full, saas`

---

## Visual Overview
> A cloud of mint and violet light breathes as an orb, blows open into a spiral galaxy, and gathers itself into a thinking brain — a dark, living interface that answers every move you make.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: VESPER

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Vesper** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A cloud of mint and violet light breathes as an orb, blows open into a spiral galaxy, and gathers itself into a thinking brain — a dark, living interface that answers every move you make.
- **Tone**: Dark mode with technical, luxe styling.
- **Color Tokens**:
  - `--bg-obsidian`: `#05060b`
  - `--accent-mint`: `#4dffb8`
  - `--accent-violet`: `#8b5cf6`
  - `--ink-white`: `#f0f4f8`
  - `--ink-dim`: `#7c8594`
  - `--glass-surface`: `rgba(13, 17, 28, 0.65)`
- **Typography**:
  - Display: `'Inter'` or `'Geist'` SemiBold (`600`), `-0.035em` tracking, gradient text fill (`linear-gradient(135deg, #fff 30%, #4dffb8 75%, #8b5cf6 100%)`).
  - HUD / Financial Readouts: `'Geist Mono'` `12px`, `tabular-nums`.

## 2. Core Interactive & WebGL Architecture
- **Morphing 32,000-Particle WebGL Point Cloud**:
  - **State 1 (Hero)**: Breathing spherical orb of mint (`#4dffb8`) and violet (`#8b5cf6`) curl-noise particles that part around the user's cursor.
  - **State 2 (Features Scroll)**: Blows open into a rotating logarithmic spiral galaxy with glowing core filaments.
  - **State 3 (Intelligence Section)**: Gathers itself into a 3D synaptic brain mesh with firing neural pulses along vertex edges.
- **Single Scroll Clock**: A master scroll progress uniform `uScroll` smoothly morphs particle target positions (`mix(posOrb, posGalaxy, s1)`, `mix(posGalaxy, posBrain, s2)`) with additive blending (`THREE.AdditiveBlending`).

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **HUD Header**: Frosted pill header with live system latency readout (`1.4ms`), navigation links, and glowing `Launch Console` CTA.
2. **Hero Stage**: Centered headline over the breathing mint/violet orb, interactive command bar input, and live throughput telemetry counters.
3. **Frosted Financial & Neural Readouts (Bento Grid)**: 6 translucent glass cards with pointer-following border glow blobs, real-time animated SVG sparklines, and liquidity/inference gauges.
4. **Interactive Architecture Timeline**: Scroll-locked section where the WebGL galaxy condenses into the neural brain while step-by-step protocol specs highlight on the left.
5. **Interactive Pricing & FAQ Accordion**: Spring-animated toggle between Monthly/Annual billing, draggable compute slider, and smooth-height FAQ disclosure items.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
