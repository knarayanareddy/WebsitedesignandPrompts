# Expanded Cards — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `expanded-cards` |
| **ID** | `87` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1656 × 992 px |
| **Tags** | `card`, `accordion`, `hover`, `rail`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/expanded-cards-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/expanded-cards-v1-poster.jpg |

---

## Description

> A rail of tall slivers where hovering one widens it into a full card and slides its neighbours aside. The caption is laid out once at the open width, so the text never rewraps halfway through the reveal.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Expanded Cards" (Card).

### Visual & Behavioral Specification
A rail of tall slivers where hovering one widens it into a full card and slides its neighbours aside. The caption is laid out once at the open width, so the text never rewraps halfway through the reveal.

- **Category**: Card
- **Tags**: card, accordion, hover, rail, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/expanded-cards-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/expanded-cards-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
