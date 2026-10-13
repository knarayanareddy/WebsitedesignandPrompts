# Guillaume Colombel — Backlit Alabaster Stele Portfolio

![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.165-000000?logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-121013?logo=github)

A **Vite + TypeScript + Three.js** recreation of [guillaumecolombel.fr](https://guillaumecolombel.fr/) —
*"a backlit alabaster standing stone with coloured strata, in a dusk landscape"* — rebuilt from the
REA reverse-engineering analysis in this folder as a customisable developer portfolio. Every project
you list changes the stone's minerals, the landscape biome and the title drum. GitHub Pages ready
(`base: './'`).

> **Live Demo:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/guillaumecolombel/](https://knarayanareddy.github.io/WebsitedesignandPrompts/guillaumecolombel/)

> The brand/bio/awards copy is fictional placeholder content ("Aurèle Vasseur"). Replace it with your
> own in `index.html` and your projects in `src/data/projects.ts`.

---

## 📂 Contents of this folder

| File | Description |
| :--- | :--- |
| **`index.html`, `src/`, `public/`** | The built site (Vite entry + TypeScript modules). `npm run dev` to work on it, `npm run build` to produce `dist/`. |
| **[`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md)** | Prompt spec adapted to this repository's Vite/TypeScript stack — feed it to a coding assistant to reproduce the template. |
| **[`BUILD_LOG.md`](./BUILD_LOG.md)** | Build log: prompt → implementation map, verification steps, customisation notes. |
| **[`BUILD_PROMPT.md`](./BUILD_PROMPT.md)** | Original master prompt (single-file / import-map version). |
| **[`REA_REVERSE_ENGINEERING_REPORT.md`](./REA_REVERSE_ENGINEERING_REPORT.md)** | Architectural breakdown of the original's 12 bundles and 18 shader subsystems. |
| **[`ORIGINAL_CSS_AND_SHADERS.md`](./ORIGINAL_CSS_AND_SHADERS.md)** | Verbatim production CSS and the 404 "void" slab shader extracted from the original. |

---

## ✨ The experience

| # | Layer | What it does |
|---|-------|--------------|
| 0 | **Preloader** | SVG stele silhouette traces itself (`--stele-progress`) while the 8 covers load, then the stone lights up over 2.4 s |
| 1 | **The stele** | Parametric monolith split into **16 convex Voronoi cells**; subsurface backlight, sedimentary strata and incandescent veins; the active cover is **refracted inside** the stone |
| 2 | **Hover** | Cells under the cursor heat up and conduct to neighbours, seams glow in the project colour, a molten pinhole reveals the cover; mineral crackle audio |
| 3 | **Click** | Spring fracture parts the cells, debris flies, a cloth cover sheet unfolds from the core; `#project-sheet` slides in with description / credits / year / **Visit website ↗** |
| 4 | **Title drum** | Helical drum of two-line titles around the stone — wheel, drag, touch, arrow keys; bokeh blur on inactive rows, meniscus warp near the silhouette, click-and-hold jog mode |
| 5 | **Landscape** | Terrain relief, reflective water, mist layers, 6,500 wind-bent grass blades, dusk/night sky, birds — all morphing per project's `scene` |
| 6 | **About** | Camera slides, the stone erodes into a hollow relic around a breathing amber lantern that casts caustics; the header brand FLIPs into the bio; awards ledger, links, copy-email |
| 7 | **Post & sound** | Bloom → ACES → pointer-frost lens / vignette / grain; zero-asset Web Audio wind, ticks, thuds and chimes (bottom-right toggle) |

Secret: append `?debug` or press `Ctrl+Shift+D` for the lil-gui inspector (Source, Lumière, Matière,
Décor, Inclusion, Fracture, Lanterne, Roue, Fluide, Post) and **Copy project preset**.

---

## 🧬 How a project drives the scene

```ts
{
  slug: "clarte", title: "CLARTÉ", wheel: ["CLARTÉ", "WORLD"], year: 2026,
  description: "…", credits: "Design & Creative Development", url: "https://…",
  coverImage: "https://images.unsplash.com/…",
  color: [1.0, 0.25, 0.1],                                   // internal glow (linear RGB, >1 blooms)
  matter: { veins: 1.4, veinScale: 1.0, bands: 0.5, bandScale: 1.0, density: 1.0 },
  scene:  { water: 0.02, mist: 0.7, view: 1.05, flora: 0.85, relief: 1.25, night: 0, skyDim: 1 },
}
```

| Field | Effect |
|---|---|
| `color` | Stone transmission/rim glow, vein incandescence, ground light puddle, water streak, label tint, debris |
| `matter.*` | Vein strength/frequency, strata strength/frequency, optical density (how deep the light travels) |
| `scene.water` | Water level (−0.12 dry canyon → +0.08 flooded) |
| `scene.mist` / `relief` / `flora` | Fog density, terrain amplitude, grass instance count |
| `scene.view` | Camera distance multiplier (0.8 close → 1.3 wide) |
| `scene.night` / `skyDim` | Night sky blend (stars) and sky brightness |

All values are **interpolated continuously** as the drum turns, so neighbouring projects melt into
one another.

---

## 🚀 Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview
```

Deployed by [`scripts/build-site.sh`](../scripts/build-site.sh) (listed in `apps`), which builds
`dist/` and publishes it at `/guillaumecolombel/`.

---

## 🛠 Customising

1. **Projects** — edit `src/data/projects.ts`. Keep `wheel` to two short uppercase lines.
2. **Covers** — any CORS-enabled image, or drop files into `public/assets/covers/` and reference
   `./assets/covers/<slug>.jpg`. Failed loads fall back to a procedural gradient card.
3. **Identity** — header brand, `#about-panel` bio / awards / links and `data-email` in `index.html`;
   `<title>` and meta tags.
4. **Look** — defaults in `src/tune.ts`; tune live with `?debug`, then paste **Copy project preset**
   output into a project entry.

## 🧱 Architecture

```
src/app.ts ─ renderer · state · input · routes · open/close/switch · about · frame loop · boot
   ├─ scene/stele.ts      parametric stone → Voronoi cells (ConvexGeometry) → SSS ShaderMaterial, core, debris, cover sheet
   ├─ scene/drum.ts       canvas label textures, helical layout, bokeh/meniscus shader
   ├─ scene/landscape.ts  sky · ground · water · grass (InstancedMesh) · mist · birds (shared terrainH GLSL)
   ├─ scene/post.ts       EffectComposer: Render → UnrealBloom → Output → frost/vignette/grain
   ├─ audio/engine.ts     procedural SoundEngine (Web Audio)
   ├─ data/projects.ts    PROJECTS
   └─ tune.ts             TUNE (lil-gui tree)
```
