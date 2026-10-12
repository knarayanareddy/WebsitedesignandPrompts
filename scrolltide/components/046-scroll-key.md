# Scroll Key — Scrolltide 3D (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `scroll-key` |
| **ID** | `75` |
| **Kind** | `component` |
| **Category** | 3D |
| **Access Tier** | `pro` |
| **Dimensions** | 986 × 764 px |
| **Tags** | `3d`, `keycap`, `glass`, `react`, `three` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-key-v2.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-key-v2-poster.jpg |

---

## Description

> A glass keycap that turns under the cursor and presses when you click — bevelled edges catching a violet rim light, the label sunk into the surface rather than printed on it.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Scroll Key" (3D).

### Visual & Behavioral Specification
A glass keycap that turns under the cursor and presses when you click — bevelled edges catching a violet rim light, the label sunk into the surface rather than printed on it.

- **Category**: 3D
- **Tags**: 3d, keycap, glass, react, three
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-key-v2.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-key-v2-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
