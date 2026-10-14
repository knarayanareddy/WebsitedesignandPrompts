# Website Prompt: Soda (`soda`)

- **Category**: Website Template (Free)
- **Tech Stack**: `hero`
- **Tags**: `hero`
- **Tone & Mood**: `dark` · `organic, playful`
- **Preview Image**: https://storage.getlayers.ai/templates/soda.webp
- **Preview Video**: https://storage.getlayers.ai/templates/soda.mp4
- **Design Keywords**: `hero, product, beverage, 3d, model-viewer, gsap, parallax, glass, static, soda, single, screen, zero, sugar, real, time, can, floats, dead, center, inside, emerald, radial, glow, while, cursive, pure, refreshingly, clean, headlines, flank, swarm, cherries, leaves, cursor, frosted, chrome, nav, flavor, cards, frames, edges, image, bubbles, drift, continuously, clicking, card, spins, cross, fades, whole, background, green, blue, swaps, fruit, blueberries, ecommerce`

---

## Visual Overview
> A 3D soda can floats and follows your cursor while berries scatter from your touch and the whole world shifts color when you pick a flavor.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: SODA

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Soda** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A 3D soda can floats and follows your cursor while berries scatter from your touch and the whole world shifts color when you pick a flavor.
- **Tone**: Dark mode with organic, playful styling.
- **Color Tokens**:
  - `--bg-berry`: `#1a0612` transitioning to `#ff2a5f` radial glow
  - `--accent-fizz`: `#ff5c8a`
  - `--accent-lime`: `#d4ff33`
  - `--ink-light`: `#fff8fa`
  - `--glass-card`: `rgba(255, 255, 255, 0.12)`
- **Typography**:
  - Display: Bold expressive rounded display font (`'Plus Jakarta Sans'` / `'Cabinet Grotesk'` 900), oversized `clamp(4rem, 11vw, 10rem)` hero wordmark set behind the 3D can.
  - Body & Nutrition Facts: Clean geometric sans + crisp monospace table for nutrition badges.

## 2. Core Interactive & WebGL Architecture
- **3D Aluminum Can & Condensation**: Interactive 3D cylinder/can mesh (via Three.js PBR material with metallic roughness, clearcoat condensation droplets, or `<model-viewer>` + GSAP camera rig). The can tilts toward the cursor with spring inertia and spins 360° on scroll or flavor switch.
- **Berry & Fizz Particle System**: Instanced 3D berries, ice cubes, and effervescent carbonation bubbles that scatter outward on pointer click/drag and orbit the can in slow-motion physics.
- **Flavor Switcher Morph**: Clicking between *Wild Berry*, *Yuzu Citrus*, and *Mango Chili* smoothly interpolates background radial gradients, can label texture, and floating fruit particles.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Floating Glass Navbar**: Brand mark, Flavor selector pills, Cart counter badge with spring bounce.
2. **Interactive 3D Can Hero**: Giant background typography (`CRISP. ZERO SUGAR.`), centered 3D floating soda can, interactive particle burst button, and floating flavor badges.
3. **Scroll-Driven Flavor Carousel**: Horizontal scrub section where the 3D can rolls across the screen while nutritional callouts (`0g Sugar`, `Prebiotic Fiber`, `Real Botanicals`) snap into place.
4. **Bundle Builder & Footer**: Interactive 12-pack / 24-pack flavor mixer with live price calculation and fizzy wave footer.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
