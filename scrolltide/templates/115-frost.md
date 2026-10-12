# Frost — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `frost` |
| **ID** | `27` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/frost |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/frost.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/frost.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/frost-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/frost/hero.mp4 |

---

## Overview

> Cool, crystalline motion creeps across the screen like frost on glass — sharp, clean, and just a little cold.

### Design Direction & Strategy

A waitlist page has one job and about four seconds to do it. Everything that is not the promise or the input field is working against the conversion.

Frost is a hero section template for waitlist launches, early access and precision-minded tools. It is sharp and cold in the best sense — nothing soft, nothing decorative, the message landing with weight and then stopping.

It fits products whose value is exactness: developer tooling, technical instruments, anything where sloppiness in the marketing would imply sloppiness in the software. Clarity here is not a style choice, it is the demonstration.

### Making It Yours

One promise, one field, nothing else. Every additional element on a waitlist page is a reason to leave, so resist adding feature bullets or a roadmap. If you use a signup count as social proof, make sure it is real — an invented number is the one thing that will cost you the credibility this layout is built to establish.

### Made For

- Waitlist and early access launches
- Developer and technical tools
- Precision instruments and utilities
- Minimal single-purpose products

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Frost**:

```markdown
# Frost — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Frost** (Hero Section): Cool, crystalline motion creeps across the screen like frost on glass — sharp, clean, and just a little cold.

A waitlist page has one job and about four seconds to do it. Everything that is not the promise or the input field is working against the conversion.

Frost is a hero section template for waitlist launches, early access and precision-minded tools. It is sharp and cold in the best sense — nothing soft, nothing decorative, the message landing with weight and then stopping.

It fits products whose value is exactness: developer tooling, technical instruments, anything where sloppiness in the marketing would imply sloppiness in the software. Clarity here is not a style choice, it is the demonstration.

**Customization Direction**: One promise, one field, nothing else. Every additional element on a waitlist page is a reason to leave, so resist adding feature bullets or a roadmap. If you use a signup count as social proof, make sure it is real — an invented number is the one thing that will cost you the credibility this layout is built to establish.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/frost/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/frost-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `bigtype`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `frost`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Frost** composition: Cool, crystalline motion creeps across the screen like frost on glass — sharp, clean, and just a little cold.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
