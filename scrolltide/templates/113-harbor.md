# Harbor — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `harbor` |
| **ID** | `30` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/harbor |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/harbor.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/harbor.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/harbor-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/harbor/hero.mp4 |

---

## Overview

> Calm water and quiet light — a hero built for brands that want to feel like a safe place to land.

### Design Direction & Strategy

Security marketing has a default aesthetic: dark backgrounds, padlock icons, shield motifs, the vocabulary of threat. It is effective at signalling seriousness and terrible at signalling that a human being can actually use the product.

Harbor takes the opposite route. It is a hero section template for data security, privacy and compliance software that leads with warmth and a handwritten touch — reassurance rather than alarm.

That makes it a strong fit for security products sold to small teams and non-specialists, where the buyer is anxious rather than expert. Feeling safe and being told about danger are different experiences, and this page is built for the first.

### Making It Yours

Keep the threat language out. The whole premise is reassurance, so write about what stays safe rather than what could go wrong, and avoid the padlock-and-shield iconography the category defaults to. If you need to establish credibility, a customer logo strip does it without changing the tone.

### Made For

- Data security and privacy SaaS
- Backup and recovery tools
- Compliance platforms for small teams
- Security products sold to non-experts

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Harbor**:

```markdown
# Harbor — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Harbor** (Hero Section): Calm water and quiet light — a hero built for brands that want to feel like a safe place to land.

Security marketing has a default aesthetic: dark backgrounds, padlock icons, shield motifs, the vocabulary of threat. It is effective at signalling seriousness and terrible at signalling that a human being can actually use the product.

Harbor takes the opposite route. It is a hero section template for data security, privacy and compliance software that leads with warmth and a handwritten touch — reassurance rather than alarm.

That makes it a strong fit for security products sold to small teams and non-specialists, where the buyer is anxious rather than expert. Feeling safe and being told about danger are different experiences, and this page is built for the first.

**Customization Direction**: Keep the threat language out. The whole premise is reassurance, so write about what stays safe rather than what could go wrong, and avoid the padlock-and-shield iconography the category defaults to. If you need to establish credibility, a customer logo strip does it without changing the tone.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/harbor/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/harbor-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `split`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `harbor`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Harbor** composition: Calm water and quiet light — a hero built for brands that want to feel like a safe place to land.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
