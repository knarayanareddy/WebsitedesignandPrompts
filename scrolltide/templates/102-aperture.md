# Aperture — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `aperture` |
| **ID** | `43` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/aperture |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aperture.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aperture.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aperture-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aperture/hero.mp4 |

---

## Overview

> The frame opens like a lens finding focus — a hero built for the exact moment clarity arrives.

### Design Direction & Strategy

Media brands live or die on whether the first screen feels like a destination or a directory. A grid of thumbnails says archive; a single confident statement says this is worth your evening.

Aperture is an editorial hero section template for streaming services, publications and media products. It leans on scale rather than decoration — type stretched across the full width of the viewport, treated as the image rather than a caption for one.

That makes it a good fit for brands whose product is attention itself. It reads as a magazine cover more than a software landing page, which is the right register for anything asking for an hour of someone's time rather than a free trial signup.

### Making It Yours

Pick one word and make it the whole page. The layout is built around a single term stretched to the full width, so it needs to be short and worth the space — a category, a mood, a promise, not a sentence. Everything else on the screen should read as a caption to it rather than competing with it.

### Made For

- Streaming and video platforms
- Digital publications and magazines
- Creative and media agencies
- Launches built around a single statement

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Aperture**:

```markdown
# Aperture — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Aperture** (Hero Section): The frame opens like a lens finding focus — a hero built for the exact moment clarity arrives.

Media brands live or die on whether the first screen feels like a destination or a directory. A grid of thumbnails says archive; a single confident statement says this is worth your evening.

Aperture is an editorial hero section template for streaming services, publications and media products. It leans on scale rather than decoration — type stretched across the full width of the viewport, treated as the image rather than a caption for one.

That makes it a good fit for brands whose product is attention itself. It reads as a magazine cover more than a software landing page, which is the right register for anything asking for an hour of someone's time rather than a free trial signup.

**Customization Direction**: Pick one word and make it the whole page. The layout is built around a single term stretched to the full width, so it needs to be short and worth the space — a category, a mood, a promise, not a sentence. Everything else on the screen should read as a caption to it rather than competing with it.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aperture/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aperture-poster.jpg"
```

- **Aspect Ratio**: `960 × 568`
- **Cover Archetype**: `orbit`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `aperture`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Aperture** composition: The frame opens like a lens finding focus — a hero built for the exact moment clarity arrives.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
