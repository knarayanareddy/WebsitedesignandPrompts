# Grainy Carousel — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `grainy-carousel` |
| **ID** | `235` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1418 × 410 px |
| **Tags** | `card`, `carousel`, `grain`, `webgl`, `shader`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grainy-carousel-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grainy-carousel-v1-poster.jpg |

---

## Description

> A row of photographs whose outer ends blow away like sand. The grain is sampled from the picture itself in a shader, so the specks carry its colour and overshoot the card's own edge.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Grainy Carousel" (Card).

### Visual & Behavioral Specification
A row of photographs whose outer ends blow away like sand. The grain is sampled from the picture itself in a shader, so the specks carry its colour and overshoot the card's own edge.

- **Category**: Card
- **Tags**: card, carousel, grain, webgl, shader, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grainy-carousel-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grainy-carousel-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
