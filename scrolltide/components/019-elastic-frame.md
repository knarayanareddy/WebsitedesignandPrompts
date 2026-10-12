# Elastic Frame — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `elastic-frame` |
| **ID** | `262` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1590 × 994 px |
| **Tags** | `card`, `frame`, `spring`, `webgl`, `pointer`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/elastic-frame-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/elastic-frame-v1-poster.jpg |

---

## Description

> A rounded frame drawn as an elastic string. Bring the pointer to an edge and it plucks outward into a glowing veil, then springs back with a wobble; whatever you put inside sits in the square.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Elastic Frame" (Card).

### Visual & Behavioral Specification
A rounded frame drawn as an elastic string. Bring the pointer to an edge and it plucks outward into a glowing veil, then springs back with a wobble; whatever you put inside sits in the square.

- **Category**: Card
- **Tags**: card, frame, spring, webgl, pointer, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/elastic-frame-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/elastic-frame-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
