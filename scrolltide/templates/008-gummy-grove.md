# Gummy Grove — Scrolltide 3D Website (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `gummy-grove` |
| **ID** | `259` |
| **Kind** | `template` |
| **Category** | 3D Website |
| **Access Tier** | `pro` (Pro / Yearly & Lifetime (3D)) |
| **Dimensions** | 1280 × 754 px |
| **Tags** | `3d`, `webgl`, `three`, `physics`, `interactive`, `playful`, `react`, `vite` |
| **Live Page** | https://www.scrolltide.co/templates/gummy-grove |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gummy-grove.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gummy-grove-poster.jpg |

---

## Overview

> A physics playground of glossy jelly fruits on a studio floor — drag one and it wobbles, slice it with a knife along any line and the halves fall apart showing their flesh, then shake the whole board into the air.

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Gummy Grove**:

```markdown
# Gummy Grove — 3D Website Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Gummy Grove** (3D Website): A physics playground of glossy jelly fruits on a studio floor — drag one and it wobbles, slice it with a knife along any line and the halves fall apart showing their flesh, then shake the whole board into the air.

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

## 4. Visual Reference & Assets

Download the reference/hero video into `public/` before running:

```bash
mkdir -p public
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gummy-grove.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gummy-grove-poster.jpg"
```

- **Aspect Ratio**: `1280 × 754`
- **Cover Archetype**: `bigtype`
- **Tags / Capabilities**: 3d, webgl, three, physics, interactive, playful, react, vite

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `gummy-grove`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Gummy Grove** composition: A physics playground of glossy jelly fruits on a studio floor — drag one and it wobbles, slice it with a knife along any line and the halves fall apart showing their flesh, then shake the whole board into the air.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
