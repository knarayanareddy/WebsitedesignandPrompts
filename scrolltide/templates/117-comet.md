# Comet — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `comet` |
| **ID** | `22` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/comet |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/comet.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/comet.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/comet-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/comet/hero.mp4 |

---

## Overview

> A streak of light cuts across the dark and is gone before you can look away — built for a first impression that doesn't wait.

### Design Direction & Strategy

Speed is the easiest thing to claim and the hardest to demonstrate on a static page. Every competitor says instant; none of them feel it.

Comet is a hero section template for real-time sync, live collaboration and anything selling immediacy. It is one of the few genuinely bright, light heroes in the library, and it reads fast — the eye reaches the message with nothing slowing it down.

That legibility is the argument. A page a visitor parses in a single glance makes a claim about responsiveness that a paragraph about latency cannot, and it does it before they have finished reading.

### Making It Yours

Cut the copy until it can be read at a glance, then cut it again. A page about immediacy that takes effort to parse argues against itself, so every word above the fold should earn its place. Avoid dark overlays — the brightness is what makes it feel quick.

### Made For

- Real-time collaboration tools
- Sync and live-data products
- Messaging and presence platforms
- Anything competing on speed

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Comet**:

```markdown
# Comet — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Comet** (Hero Section): A streak of light cuts across the dark and is gone before you can look away — built for a first impression that doesn't wait.

Speed is the easiest thing to claim and the hardest to demonstrate on a static page. Every competitor says instant; none of them feel it.

Comet is a hero section template for real-time sync, live collaboration and anything selling immediacy. It is one of the few genuinely bright, light heroes in the library, and it reads fast — the eye reaches the message with nothing slowing it down.

That legibility is the argument. A page a visitor parses in a single glance makes a claim about responsiveness that a paragraph about latency cannot, and it does it before they have finished reading.

**Customization Direction**: Cut the copy until it can be read at a glance, then cut it again. A page about immediacy that takes effort to parse argues against itself, so every word above the fold should earn its place. Avoid dark overlays — the brightness is what makes it feel quick.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/comet/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/comet-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `orbit`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `comet`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Comet** composition: A streak of light cuts across the dark and is gone before you can look away — built for a first impression that doesn't wait.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
