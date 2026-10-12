# VIVANT — Scrolltide Landing Page (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `vivant` |
| **ID** | `243` |
| **Kind** | `template` |
| **Category** | Landing Page |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 1280 × 754 px |
| **Tags** | `landing`, `ecommerce`, `fashion`, `nextjs`, `gsap`, `lenis`, `webgl`, `colorful` |
| **Live Page** | https://www.scrolltide.co/templates/vivant |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vivant.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vivant-poster.jpg |

---

## Overview

> A colour-first fashion storefront built as a full Next.js app — a WebGL silk preloader that tears open onto a hero scrubbing its walk-through film with the scroll, a concave 3D carousel, a pinned lookbook, animated shop filters and twenty product pages.

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **VIVANT**:

```markdown
# VIVANT — Landing Page Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**VIVANT** (Landing Page): A colour-first fashion storefront built as a full Next.js app — a WebGL silk preloader that tears open onto a hero scrubbing its walk-through film with the scroll, a concave 3D carousel, a pinned lookbook, animated shop filters and twenty product pages.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vivant.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vivant-poster.jpg"
```

- **Aspect Ratio**: `1280 × 754`
- **Cover Archetype**: `product`
- **Tags / Capabilities**: landing, ecommerce, fashion, nextjs, gsap, lenis, webgl, colorful

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `vivant`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **VIVANT** composition: A colour-first fashion storefront built as a full Next.js app — a WebGL silk preloader that tears open onto a hero scrubbing its walk-through film with the scroll, a concave 3D carousel, a pinned lookbook, animated shop filters and twenty product pages.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
