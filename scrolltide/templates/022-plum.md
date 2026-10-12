# Plum — Scrolltide Landing Page (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `plum` |
| **ID** | `245` |
| **Kind** | `template` |
| **Category** | Landing Page |
| **Access Tier** | `pro` (Pro / Yearly & Lifetime (3D)) |
| **Dimensions** | 1280 × 756 px |
| **Tags** | `landing`, `webgl`, `scroll`, `frame-sequence`, `painting`, `agency`, `react`, `vite` |
| **Live Page** | https://www.scrolltide.co/templates/plum |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plum.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plum-poster.jpg |

---

## Overview

> A revenue-share agency told as one camera journey through moving Dutch Golden Age paintings — a WebGL stage that dissolves each scene into halftone dots, paints it back in, and draws a constellation in the shape of a Delft porcelain plum.

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Plum**:

```markdown
# Plum — Landing Page Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Plum** (Landing Page): A revenue-share agency told as one camera journey through moving Dutch Golden Age paintings — a WebGL stage that dissolves each scene into halftone dots, paints it back in, and draws a constellation in the shape of a Delft porcelain plum.

## 2. Standing Design Constraints (Apply to Every Section — Never Override)

- Spacing scale: `8 / 16 / 24 / 40 / 64 / 96` px. Nothing between.
- Display typography: `letter-spacing: -0.03em`, tight line-height (`0.95` to `1.02`). Body: `letter-spacing: 0`.
- Letter-spacing above `0` ONLY on uppercase monospace/eyebrow labels under `12px` (`0.12em` to `0.18em`).
- Never add generic AI tells: no purple-to-blue gradients, no gradient text, no arbitrary glowing blobs, no unrequested 3-card feature grids.
- Respect `prefers-reduced-motion: reduce` across all animations and video/canvas loops.

## 3. Tech Stack (Required)

- Vite + React 19 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite` (`@import "tailwindcss";` in `src/index.css`)
- `framer-motion` for mount reveals, spring transitions (`ease: [0.22, 1, 0.36, 1]`), and interactive micro-states
- `three`, `@react-three/fiber`, and `@react-three/drei` for interactive 3D WebGL scene rendering
- HTML5 `<canvas>` / scroll-scrubbed frame sequence or smooth `lerp: 0.06` scroll progress binding (`0 -> 1`)

## 4. Visual Reference & Assets

Download the reference/hero video into `public/` before running:

```bash
mkdir -p public
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plum.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plum-poster.jpg"
```

- **Aspect Ratio**: `1280 × 756`
- **Cover Archetype**: `editorial`
- **Tags / Capabilities**: landing, webgl, scroll, frame-sequence, painting, agency, react, vite

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `plum`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Plum** composition: A revenue-share agency told as one camera journey through moving Dutch Golden Age paintings — a WebGL stage that dissolves each scene into halftone dots, paints it back in, and draws a constellation in the shape of a Delft porcelain plum.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
