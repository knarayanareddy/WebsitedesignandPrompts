# Website Prompt: Relay (`relay`)

- **Category**: Website Template (Premium)
- **Tech Stack**: `landing page, threejs, nextjs`
- **Tags**: `landing page, threejs, nextjs`
- **Tone & Mood**: `dark` · `technical, calm`
- **Preview Image**: https://storage.getlayers.ai/templates/relay-4ee0729d77.webp
- **Preview Video**: https://storage.getlayers.ai/templates/relay-4ee0729d77.mp4
- **Design Keywords**: `3d, 3d tilt, 60fps, above, accent, acid green, adaptive grid, additive, adds, app, app tiles, approval, approval card, approvals, arcs, audit log, aurora, automation, avatars, b2b, back, backdrop blur, badges, bar, bar chart, bars, bends, black, blended, block, bloom, bloom plates, blue, blur, blur reveal, bokeh, boots, boring, boring on purpose, brand site, breathing, breathing dot, built, burger, calm, canvas, card, cards, carrying, cascades, case studies, catmull-rom, chart, chartreuse, chevrons, chips, clean, columns, comes, confident, conic ring, connectors, content-visibility, coordinates, copy, core, count up, counted, counter, counts, crawler, crawler safe, crossing, cubes, cursor, cursor ring, cursor tilt, curve, curves, curves chart, custom cursor, cuts, cycling, dark, dark mode, darkens, dashboard, dashboard section, data residency, depth layers, depth of field, depths, developer tools, device tiering, document, dot, dot field, dot map, down, drag, draw, drawn, drift, drifting, edge, end, engineered, face, face stack, faces, fade, failure, feature, feature rows, feed, field, figma, filaments, first, fixed, fixed canvas, flash, flashes, flies, flood, floods, flow, flowchart, focus reveal, fold, folds, follow, footer, forever, four frames, fragment, fragment mono, frame, frames, frankfurt, frosted, frosted glass, full, full page, gap, gauge, glass, glass cards, glass slab, glass window, glassmorphism, glides, glowing, glows, glsl, gradient text, gradient title, grid, ground, hairline, hairline draw, hairlines, hand, hand-off, handoffs, hands, hate, heatmap, hero, honoured, hot, hour, hour bars, hover ring, hub, ink sweep, instrument, instrument serif, integration, integrations, integrations row, inter, inward, iris, italic, italic serif word, knob, krak, landing, landing page, lane, lane bars, last, leaves, left, length, lenis, light, light stream, lime, lime accent, line, link, link columns, lisbon, live, live feed, live runs, lives, load, loader, loading screen, log, logo, logo fold, logo reveal, logo row, logo to logo, long, low-code, make, map, mark, markers, mask, mask sweep, mechanism, menu, menu card, meter, mid, mobile-friendly, mono, mono readouts, monospace, most picked, motes, motion, n8n, navigation, neon green, newsletter, next, next 16, nextjs, no-code, node, nodes, now node, numbers, one-page, one-pager, opens, operations, ops, order, overshoot, packet, packets, page, page-long, parallax, particle, particle stream, particles, pay per run, performance, period, phone, phone menu, phone tier, pick, picked, pill buttons, pills, pinching, pinned, pins, plan, plate, plates, plays, pointer, pops, port, precise, preloader, premium, press, price, price roll, pricing, pricing slider, pricing table, process, process automation, product, product marketing, product page, product window, progress, progress ring, progress run, proof, pulse dot, pulsing, pure black, purpose, pushed, quiet, quote, react-spring, read, readout, real, recovery, reduced, reduced motion, refund, region, regions, relay, relay packet, reliability, rem, rem grid, responsive, ribbon, right, ring, ring gauge, ring loader, rise reveal, rolls, round, row, rows, ruler, run, run history, run meter, running, runs, runtime, runtime hub, saas, saas landing page, scale, scene, screen, screen blend, scroll, scroll fade, scroll pinned, scroll-driven, scroll-linked, scrubbed, seconds, section, sections, sentence, serif, serif accent, shader, shaders, share, shared, sharp, sign, signals, signup, sit, site, sits, sky, slab, slack, slack approvals, slack card, slider, smooth, smooth scroll, socials, sparkline, sparks, spring, springs, square, stack, stage, stagger, startup, statement, stats, stats section, status, status row, steps, sticky plate, strands, stream, stroke fill, style, swaps, sweeping, sweeps, swings, sydney, tailwind v4, task, team, technical, ten sections, testimonial, threaded, threading, threads, three.js, threejs, thumb, ticker, tier, tier cards, tile, tiles, tilt, tilting, timeline, timing, timing bars, title, titles, top, trace, travelling, tuesday, type, type-on, types, typewriter, uncovering, unreal bloom, usage pricing, viewport, virginia, waiting, wave, waypoints, webgl, weekday, weekday chart, white alphas, whole, whole page, wide, window, wires, word, workflow, workflow automation, workflow canvas, world map, zapier`

---

## Visual Overview
> A workflow-automation landing page in black and lime where one stream of light runs the whole length of the site: a lime ring counts the page in and folds away into the logo, a live refund flow runs inside a tilting glass window in the hero, a plate opens out of the logo and folds back into it mid-page, and every section from a Tuesday dashboard to a pricing meter you drag arrives out of focus and settles like a precise mechanism.

---

## Complete AI Build Prompt

Copy and paste the prompt below into Claude, Cursor, Antigravity, Bolt, Lovable, or v0:

```markdown
# Recreate this site as a single HTML file: RELAY

You are an expert creative front-end developer. Produce a **single self-contained `index.html`**
that reproduces the **Relay** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a
`<script type="module">`. Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Aesthetic & Design System
- **Core Concept**: A workflow-automation landing page in black and lime where one stream of light runs the whole length of the site: a lime ring counts the page in and folds away into the logo, a live refund flow runs inside a tilting glass window in the hero, a plate opens out of the logo and folds back into it mid-page, and every section from a Tuesday dashboard to a pricing meter you drag arrives out of focus and settles like a precise mechanism.
- **Tone**: Dark mode with technical, calm styling.
- **Color Tokens**:
  - `--bg-black`: `#060706`
  - `--accent-lime`: `#c8ff00`
  - `--accent-emerald`: `#22c55e`
  - `--ink-white`: `#f7fee7`
- **Typography**:
  - Crisp geometric sans (`'Inter'` / `'Plus Jakarta Sans'`) with monospace node badges.

## 2. Core Interactive & WebGL Architecture
- **Continuous Lime Light Stream**: A glowing lime ring counts the page in on load, folds into the header logo, and projects a continuous stream of light down the page—entering a 3D tilting glass workflow window in the hero and settling into a draggable pricing meter at the bottom.

## 3. Motion, Physics & Scroll System
- **Smooth Scrolling**: Initialize Lenis smooth scroll and bind it to a unified `requestAnimationFrame` ticker loop.
- **Spring Solver**: Implement a hand-written spring physics class `Spring(value, tension = 180, friction = 24)` that steps every frame using semi-implicit Euler integration.
- **Scroll Triggers**: Compute normalized scroll progress `p = clamp((scrollY - start) / (end - start), 0, 1)` for every section to drive parallax, 3D camera keyframes, and text reveals.
- **Pointer Tracking**: Track normalized pointer coordinates `[-1, 1]` and pointer velocity to feed both the WebGL uniforms and magnetic UI buttons.

## 4. Page Sections & DOM Structure
1. **Preloader Ring & Logo Fold**: Lime SVG/WebGL ring counter that morphs into the top-left brand mark.
2. **Tilting Glass Hero**: 3D perspective glass window running a live automated refund workflow (Webhook -> Stripe -> Slack -> Ledger) with real-time packet animations.
3. **Out-of-Focus to Sharp Section Reveals**: Sections arrive with `filter: blur(12px)` and spring into crisp focus as they cross the viewport threshold.
4. **Interactive Pricing Meter**: Draggable volume handle (`10k` to `10M` events/mo) with instant spring-interpolated price readout.

## 5. Polish, Performance & Accessibility
- Cap WebGL `devicePixelRatio` at `2.0`.
- Handle window resize cleanly without layout thrashing.
- Include `prefers-reduced-motion: reduce` fallback that settles springs immediately and slows shader time uniforms.
- Use `font-variant-numeric: tabular-nums` on all live counters, coordinates, and pricing figures.
```
