# Rose Chrome — Scrolltide Metal (shader)

| Property | Value |
| :--- | :--- |
| **Slug** | `chrome-rose` |
| **ID** | `178` |
| **Kind** | `shader` |
| **Category** | Metal |
| **Access Tier** | `pro` |
| **Dimensions** | 1536 × 864 px |
| **Tags** | `chrome`, `metal`, `iridescent`, `liquid`, `dither`, `background`, `webgl` |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.mp4 |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.jpg |

---

## Description

> Pink metal with a soft highlight, the polished end of the family.

## Direct Video Embed Snippet

```bash
curl -L -o public/chrome-rose.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.mp4"
```

```html
<!-- Upload chrome-rose.mp4 to your own site, then point src at it. -->
<video
  src="/chrome-rose.mp4"
  autoplay
  muted
  loop
  playsinline
  poster="https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.jpg"
  style="width:100%;height:100%;object-fit:cover"
></video>
```

## AI Build Prompt (SHADER)

```markdown
Build a standalone, production-ready React 19 + TypeScript + Tailwind CSS v4 shader named "Rose Chrome" (Metal).

### Visual & Behavioral Specification
Pink metal with a soft highlight, the polished end of the family.

- **Category**: Metal
- **Tags**: chrome, metal, iridescent, liquid, dither, background, webgl
- **Reference Video**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.mp4
- **Reference Poster**: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.jpg

### Engineering Requirements
1. Self-contained component with clean props, keyboard accessibility, and `prefers-reduced-motion` support.
2. Use `framer-motion` with cubic-bezier `[0.22, 1, 0.36, 1]` or spring physics for micro-interactions.
3. Follow Scrolltide's anti-slop typography and spacing rules: `letter-spacing: -0.03em` on display headings, `8 / 16 / 24 / 40 / 64 / 96` px spacing scale, and zero generic gradient text.
```
