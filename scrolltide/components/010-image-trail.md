# Image Trail — Scrolltide Background (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `image-trail` |
| **ID** | `271` |
| **Kind** | `component` |
| **Category** | Background |
| **Access Tier** | `pro` |
| **Dimensions** | 1320 × 826 px |
| **Tags** | `background`, `cursor`, `trail`, `stickers`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/image-trail-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/image-trail-v1-poster.jpg |

---

## Description

> A wrapper that drops picture stickers along the pointer's path, evenly spaced however fast you move, each popping in and fading away. Click-through, so the section underneath keeps working.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Image Trail" (Background).

### Visual & Behavioral Specification
A wrapper that drops picture stickers along the pointer's path, evenly spaced however fast you move, each popping in and fading away. Click-through, so the section underneath keeps working.

- **Category**: Background
- **Tags**: background, cursor, trail, stickers, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/image-trail-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/image-trail-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
