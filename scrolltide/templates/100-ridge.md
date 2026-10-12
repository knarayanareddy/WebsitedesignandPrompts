# Ridge — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `ridge` |
| **ID** | `47` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 564 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/ridge |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ridge.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ridge.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ridge-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ridge/hero.mp4 |

---

## Overview

> Motion rises and falls like a distant skyline — a hero for brands with real scale behind them.

### Design Direction & Strategy

Every goal-tracking product makes the same promise: you will finally see progress. The trouble is that almost every OKR landing page opens the same way too — centered headline, dashboard screenshot, gradient. Visitors have seen it a hundred times, and it reads as one more tool rather than the one they will actually adopt.

Ridge is built for that moment. It is a hero section template for goal-tracking, OKR and team-performance software — products whose entire pitch is momentum. Motion carries the message instead of a static screenshot, so the feeling of steady climb lands before a single feature is named.

It is deliberately restrained. Where most SaaS landing page templates crowd the top of the page with navigation, badges and duelling calls to action, Ridge keeps the frame quiet and lets one message land. That restraint is what makes a young product look established rather than eager.

### Making It Yours

The headline is doing the heavy lifting, so write it as an outcome rather than a feature — what the customer will be able to see about their own progress, not what your software tracks. Resist adding a second call to action; the quiet frame is what makes this one land, and a competing button undoes it.

### Made For

- OKR and goal-tracking platforms
- Team performance dashboards
- Habit and progress apps
- B2B SaaS selling consistency over time

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Ridge**:

```markdown
# Ridge — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Ridge** (Hero Section): Motion rises and falls like a distant skyline — a hero for brands with real scale behind them.

Every goal-tracking product makes the same promise: you will finally see progress. The trouble is that almost every OKR landing page opens the same way too — centered headline, dashboard screenshot, gradient. Visitors have seen it a hundred times, and it reads as one more tool rather than the one they will actually adopt.

Ridge is built for that moment. It is a hero section template for goal-tracking, OKR and team-performance software — products whose entire pitch is momentum. Motion carries the message instead of a static screenshot, so the feeling of steady climb lands before a single feature is named.

It is deliberately restrained. Where most SaaS landing page templates crowd the top of the page with navigation, badges and duelling calls to action, Ridge keeps the frame quiet and lets one message land. That restraint is what makes a young product look established rather than eager.

**Customization Direction**: The headline is doing the heavy lifting, so write it as an outcome rather than a feature — what the customer will be able to see about their own progress, not what your software tracks. Resist adding a second call to action; the quiet frame is what makes this one land, and a competing button undoes it.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ridge/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ridge-poster.jpg"
```

- **Aspect Ratio**: `960 × 564`
- **Cover Archetype**: `grid`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `ridge`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Ridge** composition: Motion rises and falls like a distant skyline — a hero for brands with real scale behind them.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
