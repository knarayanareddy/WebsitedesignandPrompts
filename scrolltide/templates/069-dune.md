# Dune — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `dune` |
| **ID** | `23` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/dune |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dune.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dune.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dune-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/dune/hero.mp4 |

---

## Overview

> Soft, wind-shaped gradients shift like sand across the frame — a hero for brands with something vast to say.

### Design Direction & Strategy

AI companies have a tone problem. The category defaults to loud — bold claims, hard gradients, a great deal of exclamation — and every new entrant sounds identical to the last.

Dune goes the other way. It is a minimal, editorial hero section template for AI automation and intelligent-infrastructure products, built on scale and negative space rather than intensity.

Quiet reads as established. For a company whose actual claim is significant, understatement is more persuasive than emphasis: the page implies the product does not need to oversell itself, which is exactly what a serious buyer is looking for.

### Making It Yours

Underwrite the claim. This template's authority comes from restraint, so drop the words revolutionary, powerful and next-generation entirely and state what the system actually does in plain language. The scale of the layout supplies the emphasis that the copy no longer needs to, and a buyer comparing three AI vendors will notice the one that stopped shouting first.

### Made For

- AI automation platforms
- Intelligent infrastructure
- Enterprise AI products
- Brands avoiding hype-driven positioning

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Dune**:

```markdown
# Dune — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Dune** (Hero Section): Soft, wind-shaped gradients shift like sand across the frame — a hero for brands with something vast to say.

AI companies have a tone problem. The category defaults to loud — bold claims, hard gradients, a great deal of exclamation — and every new entrant sounds identical to the last.

Dune goes the other way. It is a minimal, editorial hero section template for AI automation and intelligent-infrastructure products, built on scale and negative space rather than intensity.

Quiet reads as established. For a company whose actual claim is significant, understatement is more persuasive than emphasis: the page implies the product does not need to oversell itself, which is exactly what a serious buyer is looking for.

**Customization Direction**: Underwrite the claim. This template's authority comes from restraint, so drop the words revolutionary, powerful and next-generation entirely and state what the system actually does in plain language. The scale of the layout supplies the emphasis that the copy no longer needs to, and a buyer comparing three AI vendors will notice the one that stopped shouting first.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/dune/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dune-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `split`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `dune`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Dune** composition: Soft, wind-shaped gradients shift like sand across the frame — a hero for brands with something vast to say.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
