# Reveal Gallery — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `reveal-gallery` |
| **ID** | `270` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1586 × 992 px |
| **Tags** | `card`, `gallery`, `hover`, `webgl`, `shader`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/reveal-gallery-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/reveal-gallery-v1-poster.jpg |

---

## Description

> A strip of staggered photo cards over a huge serif headline. Hovering a card breaks a second picture through it by one of five effects, from a gooey blob to a melting letter, while the page tints to match.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Reveal Gallery" (Card).

### Visual & Behavioral Specification
A strip of staggered photo cards over a huge serif headline. Hovering a card breaks a second picture through it by one of five effects, from a gooey blob to a melting letter, while the page tints to match.

- **Category**: Card
- **Tags**: card, gallery, hover, webgl, shader, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/reveal-gallery-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/reveal-gallery-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
