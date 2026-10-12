# Nebula — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `nebula` |
| **ID** | `36` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `paid` (Premium Library) |
| **Dimensions** | 960 × 566 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/nebula |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nebula.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nebula.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nebula-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/nebula/hero.mp4 |

---

## Overview

> Color drifts and swirls like something being born — a hero for brands with a story still taking shape.

### Design Direction & Strategy

New studios have an awkward first year on the web. The portfolio is thin, the case studies are under NDA, and the site still has to look like somewhere serious clients would hire.

Nebula is built for that stage. It is a hero section template for creative studios, production companies and young agencies, where colour and movement carry the impression of capability before the work is there to show.

The motion is generative rather than literal — something forming rather than something finished, which is an honest register for a brand still defining itself. It buys credibility without claiming a track record the studio does not yet have.

### Making It Yours

Lean on point of view rather than proof. With few case studies to show, the headline should say what the studio believes about the work it takes on — that is a claim you can make on day one, and it filters enquiries better than a client list would anyway.

### Made For

- Creative studios and agencies
- Production companies
- Early-stage brands with thin portfolios
- Rebrands and studio relaunches

---

## AI Rebuild Prompt (Claude Code / Cursor / Antigravity / v0)

Copy and paste the prompt below into your AI coding agent to build **Nebula**:

```markdown
# Nebula — Hero Section Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, Antigravity, v0, Bolt). Follow the architecture, visual direction, motion specification, and standing constraints literally.

## 1. What This Project Is

**Nebula** (Hero Section): Color drifts and swirls like something being born — a hero for brands with a story still taking shape.

New studios have an awkward first year on the web. The portfolio is thin, the case studies are under NDA, and the site still has to look like somewhere serious clients would hire.

Nebula is built for that stage. It is a hero section template for creative studios, production companies and young agencies, where colour and movement carry the impression of capability before the work is there to show.

The motion is generative rather than literal — something forming rather than something finished, which is an honest register for a brand still defining itself. It buys credibility without claiming a track record the studio does not yet have.

**Customization Direction**: Lean on point of view rather than proof. With few case studies to show, the headline should say what the studio believes about the work it takes on — that is a claim you can make on day one, and it filters enquiries better than a client list would anyway.

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
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/nebula/hero.mp4"
curl -L -o public/poster.jpg "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nebula-poster.jpg"
```

- **Aspect Ratio**: `960 × 566`
- **Cover Archetype**: `aurora`
- **Tags / Capabilities**: hero, react, vite, motion

## 5. Implementation Steps

1. Scaffold a Vite + React 19 + TypeScript project named `nebula`.
2. Download `public/hero.mp4` and `public/poster.jpg` and reference locally as `/hero.mp4` (never hotlink the R2 bucket in production markup).
3. Build `src/components/Navbar.tsx` and `src/components/Hero.tsx` matching the **Nebula** composition: Color drifts and swirls like something being born — a hero for brands with a story still taking shape.
4. Wire all entrance animations and scroll/pointer interactions using cubic-bezier `[0.22, 1, 0.36, 1]` with staggered children (`0.08s`–`0.12s`).
```
