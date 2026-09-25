# Securify — 11-Chapter Cinematic Video-Embedded Scroll Story

> **Live Demo:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/](https://knarayanareddy.github.io/WebsitedesignandPrompts/)

A full-screen, 11-chapter cinematic scroll-story landing page template built for modern SaaS products. Each chapter is an immersive full-height viewport with a looping background video, fluid typography, and micro-interactions that guide the user through a narrative emotional arc:

```
your data is in motion (energy) ➔ the trail isn't safe (tension) ➔ securify watches every turn (monitoring) 
➔ we see what others miss (depth) ➔ you stay in control (governance) ➔ privacy everywhere (scale) 
➔ fast without friction (speed) ➔ trusted and proven (proof) ➔ keep moving forward (momentum) 
➔ quiet. safe. yours. (calm resolution & CTA)
```

---

## 📁 Folder Structure

```
videoembeddeddesign/
├── securify/               # Production React 19 + Vite 8 + Tailwind v4 web app
│   ├── ADAPTED_PROMPT.md   # Complete prompt specification for AI code generation
│   ├── BUILD_LOG.md        # Technical architecture, performance notes & build details
│   ├── public/             # Static assets (poster-hero.jpg, icons.svg, favicon.svg)
│   ├── src/
│   │   ├── App.tsx         # Data-driven chapter story, IntersectionObserver playback, navbar
│   │   ├── index.css       # Tailwind CSS v4, Readex Pro typography, smooth scroll
│   │   └── main.tsx        # React entrypoint
│   └── package.json        # Dependencies & build scripts
├── video_picks.md          # Curated stock video analysis (Pexels 1080p links, framing, specs)
└── video_search/           # Research, scraping scripts, and candidate frame extractions
```

---

## 🚀 Quick Start (Run Locally)

```bash
# 1. Navigate to the web app directory
cd videoembeddeddesign/securify

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser: http://localhost:5173
```

To build for production:
```bash
npm run build
# Outputs relative-path static assets into dist/
```

---

## 🎨 Design System & Prompts

- **Detailed Prompts:** Read [`securify/ADAPTED_PROMPT.md`](./securify/ADAPTED_PROMPT.md) to see how to prompt an AI agent to build a multi-chapter scroll story from scratch.
- **Video Curation:** Read [`video_picks.md`](./video_picks.md) for direct verified 1080p Pexels CDN URLs, camera angles, and license guidelines.
- **Build & Optimization Rationale:** Read [`securify/BUILD_LOG.md`](./securify/BUILD_LOG.md) for video lazy-loading, IntersectionObserver lifecycle, and mobile considerations.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8 (`base: './'` for universal path portability)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Typography:** Readex Pro via Google Fonts
- **Linter:** Oxlint (0 errors, 0 warnings)
