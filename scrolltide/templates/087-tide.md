# Tide — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `tide` |
| **ID** | `64` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 564 px |
| **Tags** | `hero`, `react`, `vite`, `motion`, `dark`, `editorial` |
| **Live Page** | https://www.scrolltide.co/templates/tide |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/tide.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/tide.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/tide-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/tide/hero.mp4 |

---

## Overview

> Hairline rules and uppercase tracking over deep green water — a marketing-platform hero built like a broadsheet, calm enough to read and cold enough to trust.

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Tide**:

```markdown
# Tide — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Tide** (Hero Section): Hairline rules and uppercase tracking over deep green water — a marketing-platform hero built like a broadsheet, calm enough to read and cold enough to trust.

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

## 4. Visual Reference & Assets

Download the reference/hero video into `public/` before running:

```bash
mkdir -p public
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/tide/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/tide-poster.jpg"
```

- **Aspect Ratio**: `960 × 564`
- **Cover Archetype**: `mono`
- **Tags / Capabilities**: hero, react, vite, motion, dark, editorial

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `tide`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Tide** composition: Hairline rules and uppercase tracking over deep green water — a marketing-platform hero built like a broadsheet, calm enough to read and cold enough to trust.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
