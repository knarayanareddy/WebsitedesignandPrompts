# Garden — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `garden` |
| **ID** | `28` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/garden |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/garden.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/garden.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/garden-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/garden/hero.mp4 |

---

## Overview

> Organic motion grows in from the edges of the frame, like a garden slowly reclaiming the page.

### Design Direction & Strategy

An AI website builder has to prove the thing it sells on the page selling it. If the marketing site looks generated, that is the review; if it looks considered, the product inherits the credit.

Garden is the most straightforward hero section template in the library, built for AI site builders and page generators. Organic motion grows in from the edges of an otherwise clean, centred composition — approachable rather than technical.

Simplicity is the strategy. The target buyer is often not a developer, and a page that looks achievable is more persuasive than one that looks expensive, because it implies they could produce something like it themselves.

### Making It Yours

Make the first action obvious and small. This audience is deciding whether they could do it themselves, so the call to action should describe a five-minute outcome rather than the full product. Keep the page uncluttered — visible simplicity is the proof that the tool is simple, and any feature grid you add above the fold quietly argues that there is a lot to learn.

### Made For

- AI website and page builders
- No-code site generators
- Template marketplaces
- Products aimed at non-developers

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Garden**:

```markdown
# Garden — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Garden** (Hero Section): Organic motion grows in from the edges of the frame, like a garden slowly reclaiming the page.

An AI website builder has to prove the thing it sells on the page selling it. If the marketing site looks generated, that is the review; if it looks considered, the product inherits the credit.

Garden is the most straightforward hero section template in the library, built for AI site builders and page generators. Organic motion grows in from the edges of an otherwise clean, centred composition — approachable rather than technical.

Simplicity is the strategy. The target buyer is often not a developer, and a page that looks achievable is more persuasive than one that looks expensive, because it implies they could produce something like it themselves.

**Customization Direction**: Make the first action obvious and small. This audience is deciding whether they could do it themselves, so the call to action should describe a five-minute outcome rather than the full product. Keep the page uncluttered — visible simplicity is the proof that the tool is simple, and any feature grid you add above the fold quietly argues that there is a lot to learn.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/garden/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/garden-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `grid`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `garden`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Garden** composition: Organic motion grows in from the edges of the frame, like a garden slowly reclaiming the page.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
