# Website Design and Prompts

> All the cool-looking websites are behind paywalls for people to access. I am trying to democratize this and create a collection of awesome website templates with detailed prompts on how they are built, so they can be readily adapted to your use case and customized.

[![Deploy to GitHub Pages](https://github.com/knarayanareddy/WebsitedesignandPrompts/actions/workflows/deploy.yml/badge.svg)](https://github.com/knarayanareddy/WebsitedesignandPrompts/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/)

---

## 🌐 Live Showcase

Visit the deployed GitHub Pages site to experience the templates live in action:
- **Securify (Dark Video Story):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/videoembeddeddesign/](https://knarayanareddy.github.io/WebsitedesignandPrompts/videoembeddeddesign/)
- **Aethera® (White-to-Night Haven):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/](https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/)
- **Measured (Multi-Surface Wearable):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/)
- **Ethan Vale (3D Spatial Sphere Archive):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/)
- **SynapseX (Neural-AI Interface):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/)
- **Editorial Portfolio (Creative Engineer Showcase):** [https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/)

---

## 📚 Templates Catalog

| # | Template Name | Folder | Description | Tech Stack | Prompts & Docs | Live Preview |
|---|---|---|---|---|---|---|
| **01** | **Securify (Video-Embedded Scroll Story)** | [`videoembeddeddesign/`](./videoembeddeddesign/) | Full-screen 11-chapter cinematic storytelling landing page with synchronized video loops, fluid typography, and dark-mode minimalism. | React 19, Vite 8, Tailwind CSS v4, TypeScript | [Prompt Spec](./videoembeddeddesign/securify/ADAPTED_PROMPT.md) · [Build Log](./videoembeddeddesign/securify/BUILD_LOG.md) · [Video Picks](./videoembeddeddesign/video_picks.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/videoembeddeddesign/) |
| **02** | **Aethera® (White-to-Night Scroll Story)** | [`aetherascrollstory/`](./aetherascrollstory/) | Full-screen 8-chapter digital studio haven featuring self-hosted 1080p video loops, custom rAF fade loops, and white-to-night-to-white aesthetic. | React 18, Vite 6, Tailwind CSS v3, TypeScript | [Prompt Spec](./aetherascrollstory/ADAPTED_PROMPT.md) · [Build Log](./aetherascrollstory/BUILD_LOG.md) · [Video Picks](./aetherascrollstory/VIDEO_PICKS.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/aetherascrollstory/) |
| **03** | **Measured (Interactive Multi-Surface Wearable)** | [`measured/`](./measured/) | Luxury health wearable landing page across 5 interactive surfaces featuring hardware-accelerated spotlight mask reveals, live PPG optics simulation, and material customizer. | React 19, Vite 7, Tailwind CSS v4, TypeScript | [Prompt Spec](./measured/ADAPTED_PROMPT.md) · [Build Log](./measured/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/measured/) |
| **04** | **Ethan Vale (3D Spatial Sphere Archive)** | [`ethan-vale-archive/`](./ethan-vale-archive/) | Fine-art wildlife photography archive mathematically projected on an interactive 3D Fibonacci sphere with drag momentum, depth shading, and FLIP modal. | Vanilla HTML5, CSS3 3D, Vanilla ES6+ | [Prompt Spec](./ethan-vale-archive/ADAPTED_PROMPT.md) · [Build Log](./ethan-vale-archive/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/) |
| **05** | **SynapseX (Neural-AI Interface)** | [`synapsex/`](./synapsex/) | Futuristic cyberpunk neural-AI landing page featuring 3D cursor parallax, dynamic multi-stage scroll camera tilt, rolling telemetry counters, and magnetic hardware layer stacks. | React 18, Vite 6, Tailwind CSS v3, Framer Motion v12, TypeScript | [Prompt Spec](./synapsex/ADAPTED_PROMPT.md) · [Build Log](./synapsex/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/) |
| **06** | **Editorial Portfolio (Michael Smith)** | [`portfolio/`](./portfolio/) | Awwwards-grade editorial dark portfolio featuring Instrument Serif typography, Lenis smooth inertia scrolling synced with GSAP ScrollTrigger, Mux HLS streaming, dynamic cursor spotlights with halftone textures, and a pinned dual-speed parallax gallery. | React 18, Vite 6, Tailwind CSS v3, GSAP 3, Lenis, Framer Motion v11, TypeScript | [Prompt Spec](./portfolio/ADAPTED_PROMPT.md) · [Build Log](./portfolio/BUILD_LOG.md) | [Live Demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/) |

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

## 🚀 How the showcase is published

The live site is built from `main` by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which runs `scripts/build-site.sh`:

1. **Builds every app** (`npm ci` + `npm run build`) and publishes its `dist/` output.
   Only already-static templates are copied as-is.
2. **Replaces each published directory** (`rsync --delete`) so stale bundles and source
   files from earlier revisions cannot survive a deploy.
3. **Verifies the result** with `scripts/verify-site.mjs`, which fails the build if a
   published page still points at a dev entry point such as `/src/main.tsx`, or if any
   asset reference does not resolve.
4. **Pushes `gh-pages`** as a single fresh commit containing exactly that assembled tree.

Because asset paths are relative (`base: './'`), each template also works from any subpath,
including a fork's Pages URL. The folder → URL mapping is explicit:

| Repository folder | Published at |
|---|---|
| `videoembeddeddesign/securify/` | `/videoembeddeddesign/` |
| `aetherascrollstory/` | `/aetherascrollstory/` |
| `measured/` | `/measured/` |
| `ethan-vale-archive/` | `/ethanvale/` |
| `synapsex/` | `/synapsex/` |
| `portfolio/` | `/portfolio/` |

To reproduce a deploy locally:

```bash
bash scripts/build-site.sh                     # builds + assembles + verifies _site/
python3 -m http.server 8080 --directory _site  # then open http://localhost:8080
node scripts/check-assets.mjs                  # HEAD-check the hot-linked media
```

Deployment and code-quality status is tracked in [`REVIEW_CHECKLIST.md`](./REVIEW_CHECKLIST.md).

---

## 📄 License & Attribution

- Code templates and prompts are provided under the [MIT License](./LICENSE).
- **Media is not covered by that licence.** Photography and video are hot-linked from Pexels (free for commercial use, no attribution required), Unsplash, and a set of undocumented AI-generated reference clips on a third-party CDN. Per-template provenance, licences, and replacement steps are in [`ASSETS.md`](./ASSETS.md) — read it before publishing any template as your own site.


