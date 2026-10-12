# Orchid — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `orchid` |
| **ID** | `38` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/orchid |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/orchid.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/orchid.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/orchid-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/orchid/hero.mp4 |

---

## Overview

> Delicate, unfolding motion with a single striking bloom of color — a hero for brands with quiet confidence.

### Design Direction & Strategy

Project management is the most crowded category in software, and its marketing pages have converged: the same board screenshot, the same avatar stack, the same claim about shipping faster. Differentiation on features is essentially unavailable.

Orchid competes on bearing instead. It is a hero section template for project management, coordination and workflow tools, with an elegant, serif-led register that reads more like a considered brand than a productivity app.

That register is the strategy. Against a field of interchangeable blue-and-white SaaS pages, looking genuinely different is the differentiator — particularly for a product aimed at design and creative teams, who are evaluating taste as well as function.

### Making It Yours

Let the headline be a claim about the team's experience rather than the software's feature set — everyone in this category already says tasks, boards and deadlines. The serif register only pays off if the writing matches it, so short and considered beats punchy and generic here.

### Made For

- Project management and coordination tools
- Workflow and process software
- Products aimed at creative teams
- Brands competing in saturated categories

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Orchid**:

```markdown
# Orchid — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Orchid** (Hero Section): Delicate, unfolding motion with a single striking bloom of color — a hero for brands with quiet confidence.

Project management is the most crowded category in software, and its marketing pages have converged: the same board screenshot, the same avatar stack, the same claim about shipping faster. Differentiation on features is essentially unavailable.

Orchid competes on bearing instead. It is a hero section template for project management, coordination and workflow tools, with an elegant, serif-led register that reads more like a considered brand than a productivity app.

That register is the strategy. Against a field of interchangeable blue-and-white SaaS pages, looking genuinely different is the differentiator — particularly for a product aimed at design and creative teams, who are evaluating taste as well as function.

**Customization Direction**: Let the headline be a claim about the team's experience rather than the software's feature set — everyone in this category already says tasks, boards and deadlines. The serif register only pays off if the writing matches it, so short and considered beats punchy and generic here.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/orchid/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/orchid-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `bigtype`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `orchid`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Orchid** composition: Delicate, unfolding motion with a single striking bloom of color — a hero for brands with quiet confidence.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
