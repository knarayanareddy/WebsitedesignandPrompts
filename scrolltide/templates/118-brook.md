# Brook — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `brook` |
| **ID** | `20` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/brook |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/brook.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/brook.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/brook-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/brook/hero.mp4 |

---

## Overview

> A quiet current of light traces its own path across the frame, leading the eye exactly where it needs to go.

### Design Direction & Strategy

Automation is invisible when it works, which makes it hard to sell. Screenshots of a workflow builder show complexity, when the entire promise is that complexity disappears.

Brook is a hero section template for automation, workflow and integration tools. A single continuous line of movement traces its way across the frame — work flowing without anyone pushing it, which is the product's claim rendered as motion rather than described in a paragraph.

It suits products aimed at people who are not engineers. The tone is calm and unintimidating, which matters when the buyer's real fear is that the tool will be one more thing to learn.

### Making It Yours

Name the work that disappears, not the mechanism that removes it. Buyers of automation are picturing their Monday, so a headline about the report that writes itself lands harder than one about triggers and actions. Keep the technical vocabulary for further down the page.

### Made For

- Automation and workflow platforms
- Integration and no-code tools
- Ops and back-office software
- Automation sold to non-technical teams

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Brook**:

```markdown
# Brook — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Brook** (Hero Section): A quiet current of light traces its own path across the frame, leading the eye exactly where it needs to go.

Automation is invisible when it works, which makes it hard to sell. Screenshots of a workflow builder show complexity, when the entire promise is that complexity disappears.

Brook is a hero section template for automation, workflow and integration tools. A single continuous line of movement traces its way across the frame — work flowing without anyone pushing it, which is the product's claim rendered as motion rather than described in a paragraph.

It suits products aimed at people who are not engineers. The tone is calm and unintimidating, which matters when the buyer's real fear is that the tool will be one more thing to learn.

**Customization Direction**: Name the work that disappears, not the mechanism that removes it. Buyers of automation are picturing their Monday, so a headline about the report that writes itself lands harder than one about triggers and actions. Keep the technical vocabulary for further down the page.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/brook/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/brook-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `editorial`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `brook`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Brook** composition: A quiet current of light traces its own path across the frame, leading the eye exactly where it needs to go.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
