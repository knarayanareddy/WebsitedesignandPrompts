# Website Design and Prompts

> All the cool-looking websites are behind paywalls for people to access. I am trying to democratize this and create a collection of awesome website templates with detailed prompts on how they are built, so they can be readily adapted to your use case and customized.

[![Deploy to GitHub Pages](https://github.com/knarayanareddy/WebsitedesignandPrompts/actions/workflows/deploy.yml/badge.svg)](https://github.com/knarayanareddy/WebsitedesignandPrompts/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/)

---

## 🌐 Live Showcase

Visit the deployed GitHub Pages site to experience the templates live in action:
- **Securify (Dark Video Story):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/](https://knarayanareddy.github.io/WebsitedesignandPrompts/)
- **Aethera® (White-to-Night Haven):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/](https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/)
- **Measured (Multi-Surface Wearable):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/)
- **Ethan Vale (3D Spatial Sphere Archive):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/)
- **SynapseX (Neural-AI Interface):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/)
- **Editorial Portfolio (Creative Engineer Showcase):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/)

---

## 📚 Templates Catalog

| # | Template Name | Folder | Description | Tech Stack | Prompts & Docs | Live Preview |
|---|---|---|---|---|---|---|
| **01** | **Securify (Video-Embedded Scroll Story)** | [`videoembeddeddesign/`](./videoembeddeddesign/) | Full-screen 11-chapter cinematic storytelling landing page with synchronized video loops, fluid typography, and dark-mode minimalism. | React 19, Vite 8, Tailwind CSS v4, TypeScript | [Prompt Spec](./videoembeddeddesign/securify/ADAPTED_PROMPT.md) · [Build Log](./videoembeddeddesign/securify/BUILD_LOG.md) · [Video Picks](./videoembeddeddesign/video_picks.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/) |
| **02** | **Aethera® (White-to-Night Scroll Story)** | [`aetherascrollstory/`](./aetherascrollstory/) | Full-screen 8-chapter digital studio haven featuring self-hosted 1080p video loops, custom rAF fade loops, and white-to-night-to-white aesthetic. | React 18, Vite 6, Tailwind CSS v3, TypeScript | [Prompt Spec](./aetherascrollstory/ADAPTED_PROMPT.md) · [Build Log](./aetherascrollstory/BUILD_LOG.md) · [Video Picks](./aetherascrollstory/VIDEO_PICKS.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/) |
| **03** | **Measured (Interactive Multi-Surface Wearable)** | [`measured/`](./measured/) | Luxury health wearable landing page across 5 interactive surfaces featuring hardware-accelerated spotlight mask reveals, live PPG optics simulation, and material customizer. | React 19, Vite 7, Tailwind CSS v4, TypeScript | [Prompt Spec](./measured/ADAPTED_PROMPT.md) · [Build Log](./measured/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/) |
| **04** | **Ethan Vale (3D Spatial Sphere Archive)** | [`ethan-vale-archive/`](./ethan-vale-archive/) | Fine-art wildlife photography archive mathematically projected on an interactive 3D Fibonacci sphere with drag momentum, depth shading, and FLIP modal. | Vanilla HTML5, CSS3 3D, Vanilla ES6+ | [Prompt Spec](./ethan-vale-archive/ADAPTED_PROMPT.md) · [Build Log](./ethan-vale-archive/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/) |
| **05** | **SynapseX (Neural-AI Interface)** | [`synapsex/`](./synapsex/) | Futuristic cyberpunk neural-AI landing page featuring 3D cursor parallax, dynamic multi-stage scroll camera tilt, rolling telemetry counters, and magnetic hardware layer stacks. | React 18, Vite 5, Tailwind CSS v3, Framer Motion v12, TypeScript | [Prompt Spec](./synapsex/ADAPTED_PROMPT.md) · [Build Log](./synapsex/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/) |
| **06** | **Editorial Portfolio (Michael Smith)** | [`portfolio/`](./portfolio/) | Awwwards-grade editorial dark portfolio featuring Instrument Serif typography, Lenis smooth inertia scrolling synced with GSAP ScrollTrigger, Mux HLS streaming, dynamic cursor spotlights with halftone textures, and a pinned dual-speed parallax gallery. | React 18, Vite 5, Tailwind CSS v3, GSAP 3, Lenis, Framer Motion v11, TypeScript | [Prompt Spec](./portfolio/ADAPTED_PROMPT.md) · [Build Log](./portfolio/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/) |

*More curated designs and prompt kits coming soon!*

---

## 💡 How to Use These Templates

Each template folder in this repository is completely self-contained and includes:
1. **Ready-to-Run Codebase:** Production-quality React/Vite/Tailwind code ready to clone and run locally.
2. **AI Adaptation Prompts (`ADAPTED_PROMPT.md`):** Complete, battle-tested prompt specifications that you can feed into coding assistants (such as Antigravity, Claude, ChatGPT, or Cursor) to reproduce or customize the design for your own brand.
3. **Build & Architecture Logs (`BUILD_LOG.md`):** Architectural explanations, performance notes, lazy-loading strategies, and deployment guides.
4. **Curated Media Assets:** Documentation and verified links for commercial-free stock assets, photography, and video b-roll.

---

## 🛠 Local Development

To run any template locally:

```bash
# Clone the repository
git clone https://github.com/knarayanareddy/WebsitedesignandPrompts.git
cd WebsitedesignandPrompts

# 1. To run Securify:
cd videoembeddeddesign/securify
npm install && npm run dev

# 2. To run Aethera:
cd ../../aetherascrollstory
npm install && npm run dev

# 3. To run Measured:
cd ../measured
npm install && npm run dev

# 4. To run Ethan Vale (0 dependencies):
cd ../ethan-vale-archive
npx serve . # or python3 -m http.server 8080

# 5. To run SynapseX:
cd ../synapsex
npm install && npm run dev

# 6. To run Editorial Portfolio:
cd ../portfolio
npm install && npm run dev
```

Open `http://localhost:5173` to explore the design locally.

---

## 📄 License & Attribution

- Code templates and prompts are provided under the MIT License.
- Stock videos and imagery are sourced from [Pexels](https://www.pexels.com/license/) (free for commercial use, no attribution required).

<!-- repo-maintainer:curation:start -->
### Daily curation — 2026-09-28

Added automatically by `repo_maintainer.py --mode curate`.

| # | Template | Folder | Description | Tech Stack | Prompts & Docs |
|---|---|---|---|---|---|
| **01** | **Adapted prompt — Aethera scroll-story landing page (8 videos, one coherent story)** | [`aetherascrollstory/`](./aetherascrollstory/) | A curated design template. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./aetherascrollstory/ADAPTED_PROMPT.md) · [Guide](./aetherascrollstory/README.md) |
| **02** | **Brutalist Ledger** | [`brutalist-ledger/`](./brutalist-ledger/) | Raw concrete, hard rules, and one screaming accent colour. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./brutalist-ledger/ADAPTED_PROMPT.md) · [Guide](./brutalist-ledger/README.md) |
| **03** | **Adapted AI Prompt: Ethan Vale 3D Spatial Photography Archive** | [`ethan-vale-archive/`](./ethan-vale-archive/) | A curated design template. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./ethan-vale-archive/ADAPTED_PROMPT.md) · [Guide](./ethan-vale-archive/README.md) |
| **04** | **Gallery of Ordinary** | [`gallery-of-ordinary/`](./gallery-of-ordinary/) | A type-only index that lets the pictures argue for themselves. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./gallery-of-ordinary/ADAPTED_PROMPT.md) · [Guide](./gallery-of-ordinary/README.md) |
| **05** | **Harbour Logistics** | [`harbour-logistics/`](./harbour-logistics/) | A supply-chain control room that a non-technical buyer can read. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./harbour-logistics/ADAPTED_PROMPT.md) · [Guide](./harbour-logistics/README.md) |
| **06** | **Kinetic Type Lab** | [`kinetic-type-lab/`](./kinetic-type-lab/) | A specimen sheet that animates every glyph it introduces. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./kinetic-type-lab/ADAPTED_PROMPT.md) · [Guide](./kinetic-type-lab/README.md) |
| **07** | **ADAPTED PROMPT — "Measured" Multi-Surface Scroll Experience** | [`measured/`](./measured/) | A curated design template. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./measured/ADAPTED_PROMPT.md) · [Guide](./measured/README.md) |
| **08** | **Adapted AI Prompt: Editorial Dark Portfolio** | [`portfolio/`](./portfolio/) | A curated design template. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./portfolio/ADAPTED_PROMPT.md) · [Guide](./portfolio/README.md) |
| **09** | **Quiet Museum** | [`quiet-museum/`](./quiet-museum/) | An object archive where the caption does all of the storytelling. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./quiet-museum/ADAPTED_PROMPT.md) · [Guide](./quiet-museum/README.md) |
| **10** | **Adapted AI Prompt: SynapseX Neural-AI BCI Landing Page** | [`synapsex/`](./synapsex/) | A curated design template. | Vanilla HTML5, CSS3, ES6+ | [Prompt Spec](./synapsex/ADAPTED_PROMPT.md) · [Guide](./synapsex/README.md) |

> Each template is standalone: open `index.html` and it runs. No build
> step, no npm install, and no remote image placeholders.
<!-- repo-maintainer:curation:end -->
