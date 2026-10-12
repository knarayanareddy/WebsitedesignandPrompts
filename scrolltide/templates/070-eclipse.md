# Eclipse — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `eclipse` |
| **ID** | `24` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/eclipse |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclipse.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclipse.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclipse-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/eclipse/hero.mp4 |

---

## Overview

> Light and shadow trade places in a slow, dramatic reveal — built for the moment right before the big announcement.

### Design Direction & Strategy

Focus apps have a credibility problem on their own websites. A page that flashes, pops and autoplay-scrolls is arguing against itself before the visitor reads a word.

Eclipse solves that by staying still. It is a minimal hero section template for deep-work tools, distraction blockers and focus software, with the content settled low in the frame and a great deal of deliberate empty space above it.

The restraint is the demonstration. Visitors evaluating a calm-productivity product are, consciously or not, testing whether the brand can practise what it sells — and a hero that refuses to compete for attention answers that question immediately.

### Making It Yours

Protect the empty space above the content — it is not wasted room, it is the argument. The temptation with any calm layout is to fill it with a badge, a logo strip or a testimonial, and each of those makes the page slightly less credible for a product that promises fewer distractions.

### Made For

- Deep-work and focus apps
- Distraction blockers
- Calm-technology products
- Minimal productivity tools

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Eclipse**:

```markdown
# Eclipse — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Eclipse** (Hero Section): Light and shadow trade places in a slow, dramatic reveal — built for the moment right before the big announcement.

Focus apps have a credibility problem on their own websites. A page that flashes, pops and autoplay-scrolls is arguing against itself before the visitor reads a word.

Eclipse solves that by staying still. It is a minimal hero section template for deep-work tools, distraction blockers and focus software, with the content settled low in the frame and a great deal of deliberate empty space above it.

The restraint is the demonstration. Visitors evaluating a calm-productivity product are, consciously or not, testing whether the brand can practise what it sells — and a hero that refuses to compete for attention answers that question immediately.

**Customization Direction**: Protect the empty space above the content — it is not wasted room, it is the argument. The temptation with any calm layout is to fill it with a badge, a logo strip or a testimonial, and each of those makes the page slightly less credible for a product that promises fewer distractions.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/eclipse/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclipse-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `orbit`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `eclipse`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Eclipse** composition: Light and shadow trade places in a slow, dramatic reveal — built for the moment right before the big announcement.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
