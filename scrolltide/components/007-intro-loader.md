# Intro Loader — Scrolltide Loader (component)

| Property | Value |
| :--- | :--- |
| **Slug** | `intro-loader` |
| **ID** | `274` |
| **Kind** | `component` |
| **Category** | Loader |
| **Access Tier** | `pro` |
| **Dimensions** | 1106 × 692 px |
| **Tags** | `loader`, `intro`, `preloader`, `page-load`, `react`, `css` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/intro-loader-v1.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/intro-loader-v1-poster.jpg |

---

## Description

> A page-load intro: a tagline builds word by word, gives way to the logo, picture cards stream up both sides, and the screen splits open onto the page. Two sequences, and it removes itself when done.

## AI Build Prompt (COMPONENT)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 component named "Intro Loader" (Loader).

### Visual & Behavioral Specification
A page-load intro: a tagline builds word by word, gives way to the logo, picture cards stream up both sides, and the screen splits open onto the page. Two sequences, and it removes itself when done.

- **Category**: Loader
- **Tags**: loader, intro, preloader, page-load, react, css
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/intro-loader-v1.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/intro-loader-v1-poster.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
