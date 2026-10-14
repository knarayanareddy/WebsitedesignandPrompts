# Website Prompt: Dantora (`dantora`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `light` · `calm, organic`
- **Preview Image**: https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.webp
- **Preview Video**: https://storage.getlayers.ai/templates/dantora-ee8f83f9a3.mp4
- **Design Keywords**: `000, 160, 3d, about, after, along, already, and, another, appears, appointment, around, arriving, away, ball, band, banner, bar, because, behind, between, biotech, black, bleeding, blended, block, blocks, blur, blur-reveal, booking, born, both, bottom, bounce, brand, built, calm, camera, cards, carousel, carrying, check-up, clean, clears, climbing, clinic, clips, clockwise, clouds, comes, consultation, contact, contact form, continuously, copy, count, counter, cursor, cursor-trail, curtain, dantora, darkens, deform, diagnosis, diagnostics, diagonal, diffusion, disperses, dissolving, dna, doctor, doctors, double, down, drag, drawing, drawn, draws, drifts, dropped, dye, each, editorial, evolving, falling, fills, five, flow, focus, following, form, four, frosted, full, function, genetic-testing, genetics, genomic, glass, glowing, glsl, green, hard, health, healthcare, helix, hero, horizontal-scroll, hospital, hugging, image-trail, imaging, ink, instead, into, itself, lab, laboratory, landing, landing page, lazily, life, life-sciences, lift, light, lime, loader, mark, medical, mid, mint, more, mouse, moves, moving, much, multiply, next, nextjs, noise, normalised, nothing, nowhere, numbers, oldest, one, opens, out, outward, over, overlay, page, pale, panel, paper, parallax, part, particles, parting, path, patient, photographs, physician, pinned, pins, plume, point, point-cloud, pointer, points, practice, preloader, prevention, private, progress, pure, pushed, radiology, rail, rather, releasing, resolving, rides, ring, runway, scaling, science, screening, scroll, scroll-hijack, scrolled, scrub, sequence, service, settling, shader, shedding, sideways, simplex, slider, sliding, soft, spawns, specialist, spring-text-engine, statistics, stays, sticky, strand, swelling, swirls, team, than, that, the, their, them, then, thinning, thins, threejs, throw, top, transitions, trustworthy, turn, twice, under, underneath, viewport, wall, was, water, webgl, wellness, where, wherever, while, white, whose, without, words, you, your`

---

## Visual Overview
> A medical clinic told through ink in water — a green double helix that never stops shedding plumes, swirling outward on an evolving noise flow and parting wherever your cursor goes, with photographs trailing off the pointer, a rail of services that scrubs sideways under your scroll, and every block riding up over the one before it.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: DANTORA

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Dantora** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A medical clinic told through ink in water — a green double helix that never stops shedding plumes, swirling outward on an evolving noise flow and parting wherever your cursor goes, with photographs trailing off the pointer, a rail of services that scrubs sideways under your scroll, and every block riding up over the one before it.
- **Tone**: Light mode with calm, organic styling.
- **Color Tokens**:
  - `--bg-deep`: `#030908`
  - `--accent-emerald`: `#10b981`
  - `--accent-biolum`: `#6ee7b7`
  - `--ink-ivory`: `#ecfdf5`
- **Typography**:
  - Display: Clean swiss neo-grotesque + editorial serif italics for clinical precision and warmth.

## 2. Core Interactive & WebGL Architecture
- **Bioluminescent Double-Helix & Ink-in-Water Plumes**: A 3D DNA double-helix composed of 20,000 fluid particles that continuously shed soft green ink-in-water advection plumes (`curlNoise`) as the user scrolls and moves the pointer.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Clinical Navigation**: Glass header with biomarker status pill and `Book Consultation` button.
2. **Helix Hero**: Split composition with longevity & cellular diagnostics headline alongside the rotating green double-helix simulation.
3. **Biomarker Interactive Explorer**: 4 interactive diagnostic panels (Epigenetic Age,VO2 Max, Metabolic Flux, Neural Resilience) with live range sliders and percentile curves.
4. **The Protocol Timeline**: 3-stage clinical journey with scroll-activated helix zoom.
5. **Physician Board & Concierge Footer**: Credential cards and private membership application.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
