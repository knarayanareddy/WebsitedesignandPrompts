# Step Path — Scrolltide Card (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `step-path` |
| **ID** | `276` |
| **Kind** | `component` |
| **Category** | Card |
| **Access Tier** | `pro` |
| **Dimensions** | 1298 × 812 px |
| **Tags** | `card`, `process`, `steps`, `svg`, `scroll`, `react` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-path-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-path-v1-poster.jpg |

---

## Description

> Process steps joined by one dashed line that hops from dot to dot. It draws itself in as it scrolls into view, each step fading up as the line arrives, then a darker stretch keeps travelling along it.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Step Path" (Card).

### Visual & Behavioral Specification
Process steps joined by one dashed line that hops from dot to dot. It draws itself in as it scrolls into view, each step fading up as the line arrives, then a darker stretch keeps travelling along it.

- **Category**: Card
- **Tags**: card, process, steps, svg, scroll, react
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-path-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-path-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
