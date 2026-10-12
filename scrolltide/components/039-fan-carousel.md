# Fan Carousel — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `fan-carousel` |
| **ID** | `88` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1650 × 846 px |
| **Tags** | `card`, `carousel`, `fan`, `drag`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-carousel-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-carousel-v1-poster.jpg |

---

## Description

> A hand of cards dealt across the frame with the focused one picked up out of the spread — it jumps clear of the scale its neighbours sit on, which is what makes it read as lifted rather than merely nearest.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Fan Carousel" (Card).

### Visual & Behavioral Specification
A hand of cards dealt across the frame with the focused one picked up out of the spread — it jumps clear of the scale its neighbours sit on, which is what makes it read as lifted rather than merely nearest.

- **Category**: Card
- **Tags**: card, carousel, fan, drag, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-carousel-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-carousel-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
