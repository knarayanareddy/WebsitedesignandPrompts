# Depth Carousel — Scrolltide 3D (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `depth-carousel` |
| **ID** | `234` |
| **Kind** | `component` |
| **Category** | 3D |
| **Access Tier** | `pro` |
| **Dimensions** | 1332 × 508 px |
| **Tags** | `3d`, `carousel`, `coverflow`, `drag`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/depth-carousel-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/depth-carousel-v1-poster.jpg |

---

## Description

> A coverflow that turns each card further edge-on as it recedes, until the sides stack into slivers that dissolve into frosted glass. Plain CSS 3D, no canvas.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Depth Carousel" (3D).

### Visual & Behavioral Specification
A coverflow that turns each card further edge-on as it recedes, until the sides stack into slivers that dissolve into frosted glass. Plain CSS 3D, no canvas.

- **Category**: 3D
- **Tags**: 3d, carousel, coverflow, drag, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/depth-carousel-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/depth-carousel-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
