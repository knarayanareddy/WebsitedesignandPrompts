# Dither Lens — Scrolltide Background (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `dither-lens` |
| **ID** | `273` |
| **Kind** | `component` |
| **Category** | Background |
| **Access Tier** | `pro` |
| **Dimensions** | 1318 × 822 px |
| **Tags** | `background`, `dither`, `canvas`, `pointer`, `image`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dither-lens-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dither-lens-v1-poster.jpg |

---

## Description

> A photograph that turns into an ordered-dither print in a ragged, flickering zone that follows the pointer. Canvas 2D over a plain image, so the photo stays a real image everywhere else.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Dither Lens" (Background).

### Visual & Behavioral Specification
A photograph that turns into an ordered-dither print in a ragged, flickering zone that follows the pointer. Canvas 2D over a plain image, so the photo stays a real image everywhere else.

- **Category**: Background
- **Tags**: background, dither, canvas, pointer, image, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dither-lens-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dither-lens-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
