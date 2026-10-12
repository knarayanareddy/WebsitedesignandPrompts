# Card Folder — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `card-folder` |
| **ID** | `89` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1650 × 620 px |
| **Tags** | `card`, `folder`, `hover`, `mask`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-folder-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-folder-v1-poster.jpg |

---

## Description

> A manila-folder card whose tab slides down on hover to reveal an iridescent gradient beneath, with a cut-out object rising into view from behind it. The notch is an SVG mask, so the folder face can be any gradient.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Card Folder" (Card).

### Visual & Behavioral Specification
A manila-folder card whose tab slides down on hover to reveal an iridescent gradient beneath, with a cut-out object rising into view from behind it. The notch is an SVG mask, so the folder face can be any gradient.

- **Category**: Card
- **Tags**: card, folder, hover, mask, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-folder-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-folder-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
