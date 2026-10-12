# Website Prompt: Baseline (`baseline`)

- **Category**: Website Template (Free)
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `light` · `luxe, calm`
- **Preview Image**: https://storage.getlayers.ai/templates/baseline.webp
- **Preview Video**: https://storage.getlayers.ai/templates/baseline.mp4
- **Design Keywords**: `marketing, sports, academy, blue, next, baseline, bright, confident, tennis, landing, page, royal, white, hero, court, trust, bar, program, cards, facilities, stat, counters, testimonials, closing, footer, contact, modal, full, education`

---

## Visual Overview
> A members' tennis club and academy carried with championship poise — deep court-blue, confident type, and a calm scroll that reveals the coaching, the courts, and the pedigree one beat at a time.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: BASELINE

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Baseline** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A members' tennis club and academy carried with championship poise — deep court-blue, confident type, and a calm scroll that reveals the coaching, the courts, and the pedigree one beat at a time.
- **Tone**: Light mode with luxe, calm styling.
- **Color Tokens**:
  - `--bg-court`: `#0b192c` (Championship deep court blue)
  - `--accent-ball`: `#d4ff00` (Optic yellow tennis ball accent)
  - `--accent-clay`: `#e05a47`
  - `--ink-chalk`: `#ffffff`
- **Typography**:
  - Athletic heritage display typography combined with crisp scoreboard monospace numerals.

## 2. Core Interactive & WebGL Architecture
- **Court Line Geometry & Ball Trajectory Physics**: Interactive canvas rendering perspective court baselines that respond to scroll, plus a physics-driven optic-yellow trajectory arc that traces across the hero.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Clubhouse Navbar**: Crest logo, Court status (`14/16 Courts Open`), Membership & Academy links.
2. **Championship Hero**: Deep court-blue stage with crisp white baseline rules, kinetic headline, and live tournament scoreboard widget.
3. **Court Surfaces & Facilities**: Interactive switcher between *Championship Hardcourt*, *Red Clay*, and *Grass*, dynamically updating the page's color tokens and texture preview.
4. **Academy & Coaching Roster**: Horizontal card rail of pro coaches with UTR rating badges and booking modal.
5. **Membership Application Footer**: Tier cards (Junior, Full Member, Patron) and club hours.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
