# Mosaic Trail — Scrolltide Background (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `mosaic-trail` |
| **ID** | `266` |
| **Kind** | `component` |
| **Category** | Background |
| **Access Tier** | `pro` |
| **Dimensions** | 1586 × 992 px |
| **Tags** | `background`, `grid`, `gallery`, `webgl`, `pointer`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mosaic-trail-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mosaic-trail-v1-poster.jpg |

---

## Description

> A field of tiny greyscale thumbnails that swell and bloom into colour along the pointer's path, then shrink back to dots behind it. One shader pass, however dense the grid.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Mosaic Trail" (Background).

### Visual & Behavioral Specification
A field of tiny greyscale thumbnails that swell and bloom into colour along the pointer's path, then shrink back to dots behind it. One shader pass, however dense the grid.

- **Category**: Background
- **Tags**: background, grid, gallery, webgl, pointer, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mosaic-trail-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mosaic-trail-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
