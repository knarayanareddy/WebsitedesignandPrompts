# Media Gallery — Scrolltide 3D (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `media-gallery` |
| **ID** | `93` |
| **Kind** | `component` |
| **Category** | 3D |
| **Access Tier** | `pro` |
| **Dimensions** | 1656 × 654 px |
| **Tags** | `3d`, `gallery`, `carousel`, `drag`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/media-gallery-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/media-gallery-v1-poster.jpg |

---

## Description

> Portrait media standing on a ring that curls around the viewer, smallest in the middle and leaning in at both edges. The gaps are solved in projected space, so they stay even where every other 3D carousel bunches up.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Media Gallery" (3D).

### Visual & Behavioral Specification
Portrait media standing on a ring that curls around the viewer, smallest in the middle and leaning in at both edges. The gaps are solved in projected space, so they stay even where every other 3D carousel bunches up.

- **Category**: 3D
- **Tags**: 3d, gallery, carousel, drag, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/media-gallery-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/media-gallery-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
