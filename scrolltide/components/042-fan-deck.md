# Fan Deck — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `fan-deck` |
| **ID** | `85` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1658 × 876 px |
| **Tags** | `card`, `carousel`, `fan`, `drag`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-deck-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-deck-v1-poster.jpg |

---

## Description

> A hand of campaign cards splayed open from a hinge below the deck, the middle one standing upright behind an acid-yellow plate. The spread is one rotation about a pivot off the bottom edge, so the gathered bottoms and swung tops come for free.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Fan Deck" (Card).

### Visual & Behavioral Specification
A hand of campaign cards splayed open from a hinge below the deck, the middle one standing upright behind an acid-yellow plate. The spread is one rotation about a pivot off the bottom edge, so the gathered bottoms and swung tops come for free.

- **Category**: Card
- **Tags**: card, carousel, fan, drag, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-deck-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-deck-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
