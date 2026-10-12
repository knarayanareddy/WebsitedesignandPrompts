# Kage — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `kage` |
| **ID** | `45` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 564 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/kage |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/kage.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/kage.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/kage-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/kage/hero.mp4 |

---

## Overview

> Motion moves like light through a shifting silhouette — a hero with a little mystery held in reserve.

### Design Direction & Strategy

Launching in stealth is a marketing problem disguised as a secrecy problem. You need people to want in without telling them what they are getting into, and most waitlist pages solve it by saying almost nothing — which reads as unfinished rather than intriguing.

Kage is the most visually elaborate hero in the library, built for exactly that brief. It is a hero section template for stealth-mode products, private betas and invite-only launches, where the motion does the persuading that the copy is not allowed to do.

Depth is the whole idea. The frame responds subtly as the visitor moves, so the page feels alive and slightly withholding — the impression of something substantial behind the curtain. For a product that cannot yet show its screenshots, that impression is the pitch.

### Making It Yours

Say less than feels comfortable. This template works because it withholds, so the copy should hint at the category and the calibre of the team without explaining the product. Keep the waitlist field to a single input — every extra question you ask before there is anything to show costs you signups you will not get back.

### Made For

- Stealth-mode startups
- Private beta and invite-only waitlists
- Security and infrastructure products
- Launches trading on anticipation

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Kage**:

```markdown
# Kage — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Kage** (Hero Section): Motion moves like light through a shifting silhouette — a hero with a little mystery held in reserve.

Launching in stealth is a marketing problem disguised as a secrecy problem. You need people to want in without telling them what they are getting into, and most waitlist pages solve it by saying almost nothing — which reads as unfinished rather than intriguing.

Kage is the most visually elaborate hero in the library, built for exactly that brief. It is a hero section template for stealth-mode products, private betas and invite-only launches, where the motion does the persuading that the copy is not allowed to do.

Depth is the whole idea. The frame responds subtly as the visitor moves, so the page feels alive and slightly withholding — the impression of something substantial behind the curtain. For a product that cannot yet show its screenshots, that impression is the pitch.

**Customization Direction**: Say less than feels comfortable. This template works because it withholds, so the copy should hint at the category and the calibre of the team without explaining the product. Keep the waitlist field to a single input — every extra question you ask before there is anything to show costs you signups you will not get back.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/kage/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/kage-poster.jpg"
```

- **Aspect Ratio**: `960 × 564`
- **Cover Archetype**: `mono`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `kage`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Kage** composition: Motion moves like light through a shifting silhouette — a hero with a little mystery held in reserve.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
