# Prairie — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `prairie` |
| **ID** | `40` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/prairie |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/prairie.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/prairie.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/prairie-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/prairie/hero.mp4 |

---

## Overview

> Wide, open motion with room to breathe — a hero for brands that don't need to shout to be seen.

### Design Direction & Strategy

Platform products sell possibility, which is the hardest thing to put in a hero. A screenshot shows one use case; the pitch is that there are a thousand others you have not thought of yet.

Prairie is a hero section template for AI platforms, developer tools and extensible infrastructure. It is built around openness — a wide, unhurried frame with real breathing room, so the page suggests space rather than a fixed set of features.

It suits products whose value grows with what customers build on them. The atmosphere does work a feature grid cannot: it implies horizon, which is precisely the promise a platform is making.

### Making It Yours

Write for the builder, not the buyer. The headline should suggest what someone could make with the platform rather than listing what it includes, and one concrete example beats three abstract capabilities. Keep the frame wide — cropping in removes the sense of space the whole pitch rests on.

### Made For

- AI and ML platforms
- Developer tools and APIs
- Extensible infrastructure products
- Ecosystem and marketplace plays

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Prairie**:

```markdown
# Prairie — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Prairie** (Hero Section): Wide, open motion with room to breathe — a hero for brands that don't need to shout to be seen.

Platform products sell possibility, which is the hardest thing to put in a hero. A screenshot shows one use case; the pitch is that there are a thousand others you have not thought of yet.

Prairie is a hero section template for AI platforms, developer tools and extensible infrastructure. It is built around openness — a wide, unhurried frame with real breathing room, so the page suggests space rather than a fixed set of features.

It suits products whose value grows with what customers build on them. The atmosphere does work a feature grid cannot: it implies horizon, which is precisely the promise a platform is making.

**Customization Direction**: Write for the builder, not the buyer. The headline should suggest what someone could make with the platform rather than listing what it includes, and one concrete example beats three abstract capabilities. Keep the frame wide — cropping in removes the sense of space the whole pitch rests on.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/prairie/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/prairie-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `mono`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `prairie`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Prairie** composition: Wide, open motion with room to breathe — a hero for brands that don't need to shout to be seen.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
