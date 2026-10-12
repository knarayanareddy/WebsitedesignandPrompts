# Grid Warp — Scrolltide Text (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `grid-warp` |
| **ID** | `263` |
| **Kind** | `component` |
| **Category** | Text |
| **Access Tier** | `pro` |
| **Dimensions** | 1586 × 992 px |
| **Tags** | `text`, `typography`, `grid`, `webgl`, `pointer`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grid-warp-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grid-warp-v1-poster.jpg |

---

## Description

> A word read through a coarse grid the pointer drags. Cells shift as solid blocks, so the letters shear into stepped slices along your path and knit back together behind it.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Grid Warp" (Text).

### Visual & Behavioral Specification
A word read through a coarse grid the pointer drags. Cells shift as solid blocks, so the letters shear into stepped slices along your path and knit back together behind it.

- **Category**: Text
- **Tags**: text, typography, grid, webgl, pointer, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grid-warp-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grid-warp-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
