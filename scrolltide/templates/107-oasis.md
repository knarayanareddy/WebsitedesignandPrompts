# Oasis — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `oasis` |
| **ID** | `37` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/oasis |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/oasis.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/oasis.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/oasis-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/oasis/hero.mp4 |

---

## Overview

> A pocket of light and calm in the middle of the noise — built for brands that want to feel like relief.

### Design Direction & Strategy

Most workplace software sells more: more dashboards, more integrations, more notifications. Products that sell less have to make that legible fast, because subtraction is a harder pitch than addition.

Oasis is a hero section template for focused-work, wellbeing and workload-reduction products. Where a typical SaaS hero front-loads feature badges and social proof, this one gives the message room and lets the space itself carry the argument.

It runs slightly warmer and more spacious than the other calm heroes in the library, which makes it the better choice when the product is about relief and recovery rather than raw output. The page should feel like the exhale the product is promising.

### Making It Yours

Write the copy in the second person and keep it warm — this template is aimed at someone who is tired, and language about optimisation and throughput works against it. Lead with what the product removes from their week rather than what it adds to their stack.

### Made For

- Workplace wellbeing platforms
- Focused-work and calm productivity tools
- Burnout and workload management
- Employee experience products

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Oasis**:

```markdown
# Oasis — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Oasis** (Hero Section): A pocket of light and calm in the middle of the noise — built for brands that want to feel like relief.

Most workplace software sells more: more dashboards, more integrations, more notifications. Products that sell less have to make that legible fast, because subtraction is a harder pitch than addition.

Oasis is a hero section template for focused-work, wellbeing and workload-reduction products. Where a typical SaaS hero front-loads feature badges and social proof, this one gives the message room and lets the space itself carry the argument.

It runs slightly warmer and more spacious than the other calm heroes in the library, which makes it the better choice when the product is about relief and recovery rather than raw output. The page should feel like the exhale the product is promising.

**Customization Direction**: Write the copy in the second person and keep it warm — this template is aimed at someone who is tired, and language about optimisation and throughput works against it. Lead with what the product removes from their week rather than what it adds to their stack.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/oasis/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/oasis-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `editorial`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `oasis`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Oasis** composition: A pocket of light and calm in the middle of the noise — built for brands that want to feel like relief.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
