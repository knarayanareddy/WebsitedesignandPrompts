# Anchor — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `anchor` |
| **ID** | `42` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/anchor |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/anchor.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/anchor.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/anchor-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/anchor/hero.mp4 |

---

## Overview

> Steady, grounded motion — built for brands that want to feel like the fixed point everyone else moves around.

### Design Direction & Strategy

In a crowded category, the winning position is often not fastest or cheapest but steadiest — the tool that will still be there, unchanged and dependable, in three years.

Anchor is a premium hero section template for products making exactly that argument. Motion is weighted and unhurried, and the composition sits low and firm in the frame rather than floating, so the page reads as settled rather than eager.

It works best where trust is the purchase decision. Infrastructure, records, finance, anything a team is committing to rather than trying — the visual language of permanence does more persuading here than a feature list would.

### Making It Yours

Slow anything you change. The weight of the motion is what signals dependability, so speeding up transitions to feel snappier trades away the exact quality this template exists to convey. Copy should state facts plainly — superlatives read as insecurity in a page pitching permanence, and a specific number will always outperform a strong adjective for this audience.

### Made For

- Clarity and focus platforms
- Infrastructure and systems of record
- Financial and compliance tools
- Brands competing on reliability

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Anchor**:

```markdown
# Anchor — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Anchor** (Hero Section): Steady, grounded motion — built for brands that want to feel like the fixed point everyone else moves around.

In a crowded category, the winning position is often not fastest or cheapest but steadiest — the tool that will still be there, unchanged and dependable, in three years.

Anchor is a premium hero section template for products making exactly that argument. Motion is weighted and unhurried, and the composition sits low and firm in the frame rather than floating, so the page reads as settled rather than eager.

It works best where trust is the purchase decision. Infrastructure, records, finance, anything a team is committing to rather than trying — the visual language of permanence does more persuading here than a feature list would.

**Customization Direction**: Slow anything you change. The weight of the motion is what signals dependability, so speeding up transitions to feel snappier trades away the exact quality this template exists to convey. Copy should state facts plainly — superlatives read as insecurity in a page pitching permanence, and a specific number will always outperform a strong adjective for this audience.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/anchor/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/anchor-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `split`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `anchor`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Anchor** composition: Steady, grounded motion — built for brands that want to feel like the fixed point everyone else moves around.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
