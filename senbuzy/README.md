# Senbuzy — Authentic 3D Claymation Studio Resume Portfolio

![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![React Three Fiber](https://img.shields.io/badge/R3F-8.17-black)
![Three.js](https://img.shields.io/badge/Three.js-0.169-049EF4?logo=threedotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-magenta)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages%20Ready-121013?logo=github)

A direct, production-grade replication of **Senbuzy's iconic 3D claymation portfolio (`about.senbuzy.com`)**, sourced directly from the author's open-source repository ([`dayinji/sen-3d-resume`](https://github.com/dayinji/sen-3d-resume)).

The experience anchors a real-time, animated 3D clay character within an interactive environment where user scrolling drives continuous cinematic camera spline trajectories—zooming into cheek stickers, rotating across facial contours, and panning into a sticky horizontal works gallery with rich markdown project dossiers.

---

## 🎨 Features & Technical Anatomy

| Feature | Architecture & Implementation | In-Engine Result |
|---|---|---|
| **Real-Time 3D Clay Character** | React Three Fiber + Drei (`useGLTF`) loading `man2.glb`, continuous skeletal animation | Expressive clay avatar with facial sticker decals (`I ♥ SYSU`, `HOTSAR`, `ZOOOP`), organic wrinkles, and shirt folds |
| **Scroll-Driven Camera Splines** | Framer Motion scroll listeners synced with React Three Fiber camera matrices | Page scrolling acts as cinematic camera operator—zooms into details, rotates around head, transitions smoothly |
| **Film Grain & Post-Processing** | `@react-three/postprocessing` + custom SVG noise filter overlay (`NoiseOverlay.tsx`) | Authentic claymation tactile grain texture, depth-of-field foreground blur, and photographic studio feel |
| **Studio 3-Point Lighting** | Ambient hemisphere bounce, warm incandescent key light, cool daylight fill light | Soft clay specular highlights and natural rim lighting |
| **Bilingual Localization** | Zustand global store toggle (`EN` / `中文`) | Instantaneous language switching across hero copy, résumé timeline, and project briefs |
| **Rich Markdown Dossiers** | `react-markdown` with `remark-gfm` and `rehype-raw` | Full-screen interactive project inspection sheets with cover images, technical write-ups, and diagrams |

---

## 🚀 Running Locally

```bash
# Navigate to the senbuzy directory
cd WebsitedesignandPrompts/senbuzy

# Install dependencies (React, Three.js, R3F, Framer Motion, Vite)
npm install

# Start Vite development server
npm run dev

# Or build production distribution
npm run build
```

---

## 📂 Codebase Structure

```
senbuzy/
├── public/
│   ├── models/man2.glb              # High-resolution 3D clay character
│   ├── images/                      # Studio logos and stickers
│   └── works/                       # Project photography and covers
├── src/
│   ├── components/                  # UI components, buttons, badges
│   ├── data/                        # Timeline milestones & project markdown docs
│   ├── hooks/                       # Responsive and viewport hooks
│   ├── scene/                       # 3D R3F scene, camera splines, lights, model
│   ├── store/                       # Zustand language and UI state
│   ├── ui/                          # Noise overlay, frame markers, typography
│   ├── App.tsx                      # Main app container
│   └── main.tsx                     # React root mount
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📖 Methodology & Replication

- [`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md) — Comprehensive technical reverse-engineering specification.
- [`BUILD_LOG.md`](./BUILD_LOG.md) — Chronological engineering journal and provenance analysis.
