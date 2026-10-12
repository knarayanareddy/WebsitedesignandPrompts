# Aurora — Scrolltide Hero Section (template)

| Property | Value |
| :--- | :--- |
| **Slug** | `aurora` |
| **ID** | `19` |
| **Kind** | `template` |
| **Category** | Hero Section |
| **Access Tier** | `free` (Free — Full Verbatim Source Prompt Included) |
| **Dimensions** | 960 × 568 px |
| **Tags** | `hero`, `react`, `vite`, `motion` |
| **Live Page** | https://www.scrolltide.co/templates/aurora |
| **Preview Video (MP4)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora.mp4 |
| **Preview Video (WebM)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora.webm |
| **Poster Image** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-poster.jpg |
| **Unwatermarked Hero Video (R2)** | https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aurora/hero.mp4 |

---

## Overview

> A luminous aurora breathes across the screen as your headline settles into place — built to make the first five seconds unforgettable.

### Design Direction & Strategy

A design studio's website is the portfolio piece every client sees first. It has to prove taste in the time it takes to decide whether to keep scrolling — which is not very long at all.

Aurora is an animated hero template for studios, agencies and design-led SaaS. Light moves across a dark frame while the headline settles into place, so the page demonstrates craft rather than claiming it. The effect is closer to a title sequence than a landing page, which is exactly the point for a business selling visual judgement.

It suits brands that want to feel premium without shouting. Nothing flashes, nothing bounces — the motion is slow enough to read as confidence, and it gets out of the way once the headline has landed.

### Making It Yours

Swap the background footage before anything else — it carries most of the impression, and generic stock will undo the rest of the work instantly. Keep the headline short enough to read in one pass, because the motion is already asking for a few seconds of the visitor's patience and long copy spends the rest of it.

### Made For

- Design studios and creative agencies
- Portfolio and showcase sites
- Design-led SaaS products
- Brands selling craft or taste

---

## Official Verbatim One-Shot Rebuild Prompt

```markdown
# Aurora — Landing Page Hero Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt. It contains the exact, complete source of every file needed — follow it literally and the output will match the original pixel-for-pixel (aside from the background video, noted below).

## What this project is

"Aurora" is a design-studio-style SaaS landing page. Dark background video hero, bottom-left-anchored content (not centered), a warm off-white "Design That Lights the Way" headline in Plus Jakarta Sans, a trusted-by avatar badge, a dark "Get Started" pill + circular play button, and a row of social icons pinned to the bottom-left corner. Accent color is emerald green (`#10b981` → `#047857` gradient) used sparingly in the avatar stack and background glow. The navbar has a white line-art car logo (not a dot/circle mark) and a white "Contact Us" pill on a transparent nav bar.

## Tech stack (required — do not substitute)

- Vite + React 19 + TypeScript
- Tailwind CSS **v4**, wired through the `@tailwindcss/vite` plugin (NOT a `tailwind.config.js` v3 setup) — CSS is pulled in with a single `@import "tailwindcss";` at the top of `src/index.css`
- `framer-motion` for every animation (fade/slide-in on mount, hover/tap scale on buttons)
- All typography inline via the `style` prop on JSX elements (no CSS modules, no Tailwind utility classes for typography) — reproduce styles exactly as given below
- Google Fonts loaded via `<link>` tags in `index.html`, no local font files

### package.json

```json
{
  "name": "aurora",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@tailwindcss/vite": "^4.2.2",
    "@types/node": "^24.12.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "framer-motion": "^12.38.0",
    "globals": "^17.4.0",
    "tailwindcss": "^4.2.2",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.57.0",
    "vite": "^8.0.1"
  }
}
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## Steps to build

1. Scaffold a new Vite React-TS project named `aurora`. Install the dependencies listed above.
2. Overwrite `index.html`, `src/index.css`, `src/App.tsx`, `src/main.tsx` with the exact contents given below.
3. Create `src/components/Navbar.tsx` and `src/components/Hero.tsx` with the exact contents given below.
4. There is **no** `TrustedBy.tsx` component in this project — the trusted-by badge is inline inside `Hero.tsx`.
5. Fetch the real hero background video from **`https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aurora/hero.mp4`** and save it as `public/hero.mp4`. This is the actual final video for this project, not a placeholder — download it (e.g. `curl -L <url> -o public/hero.mp4`) as part of the build.
6. Add a favicon at `public/favicon.svg` (any simple placeholder SVG is fine — it's referenced in `index.html` but not visually important).

## File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aurora</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `src/index.css`

```css
@import "tailwindcss";

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root { width: 100%; min-height: 100svh; }
}
```

## File: `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: `src/App.tsx`

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
```

## File: `src/components/Navbar.tsx`

```tsx
import { motion } from 'framer-motion'

const navLinks = ["Product", "Pricing", "Docs", "Contact"]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 44px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11 1 11.9 1 13v3c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '11px 24px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          color: '#111',
          textDecoration: 'none',
          background: '#fff',
          boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
        }}
      >
        Contact Us
      </motion.a>
    </motion.nav>
  )
}
```

## File: `src/components/Hero.tsx`

```tsx
import { motion } from 'framer-motion'

const socials = [
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
]

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="/hero.mp4" autoPlay muted loop playsInline />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.10)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.13) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.19) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.07) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.07) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(6,95,70,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', paddingTop: '24vh', paddingLeft: '64px', paddingRight: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', borderRadius: '999px', padding: '6px 16px 6px 6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', width: 'fit-content' }}
        >
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: '22px', height: '22px', borderRadius: '999px', background: 'linear-gradient(135deg, #10b981, #047857)', border: '2px solid rgba(10,20,16,0.9)', marginLeft: i === 0 ? 0 : '-8px' }} />
            ))}
          </div>
          <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" }}>
            We&apos;re trusted by <strong style={{ color: '#fff', fontWeight: 600 }}>teams worldwide</strong>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff', marginTop: '22px', maxWidth: '560px' }}
        >
          Design That<br />Lights the Way
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", maxWidth: '340px' }}
        >
          Aurora helps modern brands craft interfaces that feel effortless and alive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.58, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px' }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 26px', borderRadius: '999px', background: '#0a0a0a', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="#work"
            aria-label="Watch demo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{ width: '44px', height: '44px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
          </motion.a>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', gap: '10px' }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            style={{ width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.75)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
          </a>
        ))}
      </div>
    </section>
  )
}
```

## Design notes (context, not instructions to change anything)

- Layout is **not** centered — content is anchored to the top-left, starting at `24vh` from the top and `64px` from the left. This differs from most of the other landing pages in this set which center their hero content.
- The logo in the navbar is a white line-art **car** icon (not the usual dot/circle brand mark used elsewhere in this set) — it was deliberately swapped in to give Aurora product-specific branding.
- Overlay opacities here are already very light (`0.10`, `0.13`, `0.19`, `0.07`) — much lighter than a typical hero overlay — so the background video should be bright/vivid, since very little darkening is applied.
- The hero background video is hosted at `https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aurora/hero.mp4` — fetch it and save it as `public/hero.mp4` before running the project.

```
