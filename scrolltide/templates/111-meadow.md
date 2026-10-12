# Meadow — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `meadow` |
| **ID** | `33` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/meadow |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/meadow.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/meadow.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/meadow-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/meadow/hero.mp4 |

---

## Overview

> Soft light rolls across an open field of color — a hero built for brands that want to feel unhurried and alive.

### Design Direction & Strategy

Productivity software is used at eight in the morning on a bad week. Brands in this category increasingly compete on whether the product feels like a relief to open, and that judgement starts on the marketing site.

Meadow is a bright hero section template for team productivity, planning and collaboration tools. It is one of the few light, sunlit heroes in the library — open and warm where most SaaS templates default to dark and severe.

That optimism is doing real work. Against a market of near-identical dark gradients, a genuinely bright page is the differentiator, and it sets an expectation of a product that is pleasant rather than merely powerful.

### Making It Yours

Keep it bright. The instinct when adapting a light template is to darken it for contrast, and that turns it into every other SaaS page immediately. If the copy needs more weight, get it from a shorter headline rather than a heavier background.

### Made For

- Team productivity and planning tools
- Collaboration software
- Consumer and prosumer apps
- Brands positioning against heavy enterprise tools

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Meadow**:

```markdown
# Meadow — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Meadow** (Hero Section): Soft light rolls across an open field of color — a hero built for brands that want to feel unhurried and alive.

Productivity software is used at eight in the morning on a bad week. Brands in this category increasingly compete on whether the product feels like a relief to open, and that judgement starts on the marketing site.

Meadow is a bright hero section template for team productivity, planning and collaboration tools. It is one of the few light, sunlit heroes in the library — open and warm where most SaaS templates default to dark and severe.

That optimism is doing real work. Against a market of near-identical dark gradients, a genuinely bright page is the differentiator, and it sets an expectation of a product that is pleasant rather than merely powerful.

**Customization Direction**: Keep it bright. The instinct when adapting a light template is to darken it for contrast, and that turns it into every other SaaS page immediately. If the copy needs more weight, get it from a shorter headline rather than a heavier background.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/meadow/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/meadow-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `grid`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `meadow`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Meadow** composition: Soft light rolls across an open field of color — a hero built for brands that want to feel unhurried and alive.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
