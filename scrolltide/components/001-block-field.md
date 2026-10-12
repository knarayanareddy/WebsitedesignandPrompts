# Block Field — Scrolltide 3D (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `block-field` |
| **ID** | `280` |
| **Kind** | `component` |
| **Category** | 3D |
| **Access Tier** | `pro` |
| **Dimensions** | 1310 × 818 px |
| **Tags** | `3d`, `isometric`, `webgl`, `wave`, `pointer`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/block-field-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/block-field-v1-poster.jpg |

---

## Description

> An isometric field of rounded blocks that ripples like water under the pointer. Every block is a spring tied to its neighbours, so the swell spreads, overshoots and settles, glowing as it rises.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Block Field" (3D).

### Visual & Behavioral Specification
An isometric field of rounded blocks that ripples like water under the pointer. Every block is a spring tied to its neighbours, so the swell spreads, overshoots and settles, glowing as it rises.

- **Category**: 3D
- **Tags**: 3d, isometric, webgl, wave, pointer, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/block-field-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/block-field-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
