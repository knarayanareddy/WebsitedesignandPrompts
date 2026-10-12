# Earshot — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `earshot` |
| **ID** | `292` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 1280 × 762 px |
| **Tags** | `hero`, `scroll`, `frame-sequence`, `game`, `character`, `colorful`, `react`, `vite` |
| **Live Page** | https://www.scrolltide.co/templates/earshot |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/earshot.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/earshot-poster.jpg |

---

## Overview

> A running-game hero where a fennec fox never stops sprinting while the world morphs under its feet — a mirrored salt flat, a village road, a tropical shore — each with its own huge expanded headline.

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Earshot**:

```markdown
# Earshot — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Earshot** (Hero Section): A running-game hero where a fennec fox never stops sprinting while the world morphs under its feet — a mirrored salt flat, a village road, a tropical shore — each with its own huge expanded headline.

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
- HTML5 `<canvas>` / scroll-scrubbed frame sequence or smooth `lerp: 0.06` scroll progress binding (`0 -> 1`)

## 4. Visual Reference & Assets

Download the reference/hero video into `public/` before running:

```bash
mkdir -p public
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/earshot.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/earshot-poster.jpg"
```

- **Aspect Ratio**: `1280 × 762`
- **Cover Archetype**: `bigtype`
- **Tags / Capabilities**: hero, scroll, frame-sequence, game, character, colorful, react, vite

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `earshot`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Earshot** composition: A running-game hero where a fennec fox never stops sprinting while the world morphs under its feet — a mirrored salt flat, a village road, a tropical shore — each with its own huge expanded headline.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
