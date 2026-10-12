# Arc Carousel — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `arc-carousel` |
| **ID** | `91` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1646 × 854 px |
| **Tags** | `card`, `carousel`, `arc`, `drag`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/arc-carousel-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/arc-carousel-v1-poster.jpg |

---

## Description

> Cards riding a very large circle with the focused one upright at its apex, each tilted tangent to the curve. Position and tilt fall out of a single rotation, so there is no per-card trigonometry anywhere in it.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Arc Carousel" (Card).

### Visual & Behavioral Specification
Cards riding a very large circle with the focused one upright at its apex, each tilted tangent to the curve. Position and tilt fall out of a single rotation, so there is no per-card trigonometry anywhere in it.

- **Category**: Card
- **Tags**: card, carousel, arc, drag, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/arc-carousel-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/arc-carousel-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
