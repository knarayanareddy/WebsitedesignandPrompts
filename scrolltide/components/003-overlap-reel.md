# Overlap Reel — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `overlap-reel` |
| **ID** | `278` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1310 × 818 px |
| **Tags** | `card`, `carousel`, `reel`, `drag`, `video`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/overlap-reel-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/overlap-reel-v1-poster.jpg |

---

## Description

> A drifting strip of tall portrait cards, overlapping a little and each leaning its own way. Throw it with a drag or the wheel, hover to straighten a card, click to open the lightbox. Takes images or video.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Overlap Reel" (Card).

### Visual & Behavioral Specification
A drifting strip of tall portrait cards, overlapping a little and each leaning its own way. Throw it with a drag or the wheel, hover to straighten a card, click to open the lightbox. Takes images or video.

- **Category**: Card
- **Tags**: card, carousel, reel, drag, video, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/overlap-reel-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/overlap-reel-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
