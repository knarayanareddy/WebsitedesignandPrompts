# Held-Mint (`held-mint`) — GetLayers AI Website Prompt & Design Spec

## Executive Overview
- **Template ID**: `held-mint` (#54 of 54)
- **Title**: Held-Mint
- **Tier**: Premium
- **Reference URL**: `https://www.getlayers.ai/layer/held-mint`
- **Category & Type**: `template` · `full-page, fintech, ecommerce`
- **Tech Stack**: `landing page, nextjs`
- **Tags**: `landing page, nextjs`
- **Tone & Mood**: `dark` · `brutal, playful`
- **Keywords**: `alternative assets, apes, auction, audit, back, barbed, barbed wire, blockchain, blue, bored ape, card fan, card vault, cards, collectible, collectible cards, collectibles, collectors club, coming, condensed, condensed type, crowns, crypto, custody, dark, door, drop, eases, ecommerce, electric blue, fan, faq, fintech, footer, full, graffiti, grunge, hand-drawn, headlines, heavy, heavy italic, held, hits, hype, insurance, investment, italic, landing page, ledger, lenis, letter, lights, locked, marker script, meeting, membership, mint, navy, nextjs, nft, nft marketplace, one-page, onto, opens, page, parallax, pile, preloader, pressed, rare, rare cards, react-spring, real-world assets, registry, rows, rubber, rwa, scrawled, scribbles, script, scroll, sealed, seals, slapped, spray paint, sprayed, stamp, stamps, standing, steel, stickers, street art, streetwear, strongroom, swiss, table, tokenized assets, trading cards, urban, vault, web3, wire, wordmark, words, wrapped, zug`
- **Created Date**: `2026-10-11` · **Likes**: `4`

---

## Cloud Asset Manifest
- **High-Res Preview Image**: `https://storage.getlayers.ai/templates/held-mint-78f917a508.webp`
- **Full Master Video (MP4)**: `https://storage.getlayers.ai/templates/held-mint-78f917a508.mp4`
- **Preview Loop Video (MP4)**: `https://storage.getlayers.ai/templates/held-mint-78f917a508-preview.mp4`

---

## Visual Concept & Choreography
> Rare collectible cards locked behind graffiti-tagged steel, barbed wire and a stamp that seals the pile.

---

## Complete AI Build Prompt

Copy and paste the prompt below directly into Claude Code, Cursor, Antigravity, Bolt, Lovable, or v0 to build the **Held-Mint** website:

```markdown
# Recreate this site as a single HTML file: Held-Mint (held-mint)

CRITICAL GLOBAL RULE — BUILD IMMEDIATELY:
Produce a **single self-contained `index.html`** that reproduces the **Held-Mint** website below **exactly** — same layout, copy, visuals, motion, shaders, and interaction.
Pure HTML/CSS/JS in one file: no build step, no framework, no bundler. ES modules inline in a `<script type="module">`.
Use an `<script type="importmap">` for **Three.js** (`https://esm.sh/three@0.165.0`) and **Lenis** (`https://esm.sh/lenis@1.1.13`).

## 1. Visual Direction & Choreographed Experience
- **Core Narrative**: Rare collectible cards locked behind graffiti-tagged steel, barbed wire and a stamp that seals the pile.
- **Tone**: Dark mode aesthetic with brutal, playful mood.
- **Domain & Design Keywords**: alternative assets, apes, auction, audit, back, barbed, barbed wire, blockchain, blue, bored ape, card fan, card vault, cards, collectible, collectible cards, collectibles, collectors club, coming, condensed, condensed type, crowns, crypto, custody, dark, door, drop, eases, ecommerce, electric blue, fan, faq, fintech, footer, full, graffiti, grunge, hand-drawn, headlines, heavy, heavy italic, held, hits, hype, insurance, investment, italic, landing page, ledger, lenis, letter, lights, locked, marker script, meeting, membership, mint, navy, nextjs, nft, nft marketplace, one-page, onto, opens, page, parallax, pile, preloader, pressed, rare, rare cards, react-spring, real-world assets, registry, rows, rubber, rwa, scrawled, scribbles, script, scroll, sealed, seals, slapped, spray paint, sprayed, stamp, stamps, standing, steel, stickers, street art, streetwear, strongroom, swiss, table, tokenized assets, trading cards, urban, vault, web3, wire, wordmark, words, wrapped, zug.
- **Reference Media Assets**:
  - Poster Image: https://storage.getlayers.ai/templates/held-mint-78f917a508.webp
  - Hero Video Loop: https://storage.getlayers.ai/templates/held-mint-78f917a508.mp4
  - Preview Video: https://storage.getlayers.ai/templates/held-mint-78f917a508-preview.mp4

## 2. Architecture & Motion System
1. **Smooth Scroll & Shared Ticker**:
   - Initialize Lenis smooth scrolling and drive all animations from a single unified `requestAnimationFrame` ticker loop.
2. **Spring Physics Solver**:
   - Implement a custom spring solver (`tension: 180, friction: 24`) to interpolate pointer coordinates, card hover elevations (`--lift`), 3D tilts, and scroll-scrubbed transitions without rigid CSS keyframes.
3. **WebGL & Canvas Stage**:
   - Render a fixed full-viewport `<canvas>` (`devicePixelRatio` capped at `2.0`) implementing the core visual effect: Rare collectible cards locked behind graffiti-tagged steel, barbed wire and a stamp that seals the pile.
   - Bind normalized scroll progress `uScroll` (`0.0 -> 1.0`) and spring-smoothed pointer position `uPointer` (`[-1, 1]`) as shader/scene uniforms.
4. **Glassmorphic UI & Typography**:
   - Use layered 1px translucent hairlines (`rgba(255, 255, 255, 0.08)`), radial pointer-tracking border glow blobs, and `backdrop-filter: blur(20px)`.
   - Tight display headline tracking (`-0.035em`), balanced text wrapping, and `font-variant-numeric: tabular-nums` on all counters, indices, and telemetry readouts.

## 3. Page Sections to Build
1. **Floating Glass Navigation Bar**:
   - Brand monogram/wordmark for **Held-Mint**, section jump links, live status/telemetry indicator, and primary magnetic CTA pill.
2. **Interactive Hero Stage**:
   - Full-viewport interactive stage showcasing the centerpiece WebGL/video choreography, oversized statement headline, lead copy, and primary/secondary action buttons.
3. **Interactive Feature & Showcase Grid**:
   - Scroll-triggered feature cards with pointer-reactive border glows, live interactive micro-controls, and smooth reveal masks.
4. **Scroll-Pinned Narrative / Architecture Breakdown**:
   - Pinned viewport section where scrolling scrubs through 3–4 chapters while the background WebGL stage morphs camera angles or shader parameters.
5. **Interactive Pricing / Specification Ledger & Footer**:
   - Interactive parameter/tier controls, FAQ accordion with spring-animated height, and a cinematic footer with social/contact triggers.

## 4. Performance & Accessibility
- Pause offscreen animations via `IntersectionObserver`.
- Respect `prefers-reduced-motion: reduce`.
- Ensure full responsive layout across desktop (`1440px+`), tablet (`768px`), and mobile (`375px`).
```
