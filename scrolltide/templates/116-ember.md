# Ember — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `ember` |
| **ID** | `25` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/ember |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ember/hero.mp4 |

---

## Overview

> A warm glow flickers at the edges of the frame, keeping the headline lit long after the page has loaded.

### Design Direction & Strategy

Tools for makers are bought by people with strong opinions about craft. They will judge the marketing site as a piece of work in itself, and a generic template signals a generic product.

Ember is a hero section template for prototyping, design and creative tooling. A serif headline and a warm accent give it an editorial character that separates it from the flat, cool palettes most developer-adjacent products default to.

The result reads as considered rather than assembled. For a product whose whole promise is helping people make better things faster, a page that visibly had care put into it is not decoration — it is evidence.

### Making It Yours

Keep the warm accent to one place. Its effect comes from scarcity, and repeating it across buttons, links and badges flattens the page back into a standard SaaS layout. The headline should name the craft the tool supports, not the speed it promises — this audience is suspicious of speed claims.

### Made For

- Prototyping and design tools
- Brand and asset management
- Creative software and plugins
- Products sold to designers and makers

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Ember**:

```markdown
# Ember — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Ember** (Hero Section): A warm glow flickers at the edges of the frame, keeping the headline lit long after the page has loaded.

Tools for makers are bought by people with strong opinions about craft. They will judge the marketing site as a piece of work in itself, and a generic template signals a generic product.

Ember is a hero section template for prototyping, design and creative tooling. A serif headline and a warm accent give it an editorial character that separates it from the flat, cool palettes most developer-adjacent products default to.

The result reads as considered rather than assembled. For a product whose whole promise is helping people make better things faster, a page that visibly had care put into it is not decoration — it is evidence.

**Customization Direction**: Keep the warm accent to one place. Its effect comes from scarcity, and repeating it across buttons, links and badges flattens the page back into a standard SaaS layout. The headline should name the craft the tool supports, not the speed it promises — this audience is suspicious of speed claims.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ember/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `aurora`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `ember`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Ember** composition: A warm glow flickers at the edges of the frame, keeping the headline lit long after the page has loaded.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
