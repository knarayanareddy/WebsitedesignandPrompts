# Guillaume Colombel Portfolio (`guillaumecolombel.fr`) — Reverse Engineering & Build Guide

This folder contains the complete reverse-engineering analysis, master build prompt, and extracted CSS/shaders for **[guillaumecolombel.fr](https://guillaumecolombel.fr/)**, generated using [`morluto/rea`](https://github.com/morluto/rea) (`rea-agents`, Evidence ID: `ev_a3687a50aecf5cb4dadd3fc58b6108288ffae805dea7c83aedf6b26cde5a2e37`, 104 nodes / 236 edges across 12 Nuxt/Vite bundles).

## 📂 Contents of This Folder

| File | Description |
| :--- | :--- |
| **[`README.md`](./README.md)** | Executive summary of how `guillaumecolombel.fr` works under the hood and how to customize it for your own projects. |
| **[`REA_REVERSE_ENGINEERING_REPORT.md`](./REA_REVERSE_ENGINEERING_REPORT.md)** | Full architectural breakdown of the 12 JS chunks, 18 internal WebGPU/TSL shader subsystems, audio stems, and DOM-to-WebGPU thermal text bridge. |
| **[`BUILD_PROMPT.md`](./BUILD_PROMPT.md)** | Copy-pasteable master prompt to build this exact 3D monolithic alabaster showcase website adapted for your own projects. |
| **[`ORIGINAL_CSS_AND_SHADERS.md`](./ORIGINAL_CSS_AND_SHADERS.md)** | Exact production CSS (`entry.DY30v6x4.css`), MSDF 3D title wheel shader math, and pointer-fluid screen frost shader extracted from the bundles. |
| **[`index.html`](./index.html)** | ✅ The built site — a single self-contained Three.js + GSAP recreation (open it directly or via the root showcase at `./guillaumecolombel/`). Edit the `PROJECTS` array at the top of its module script. |
| **[`BUILD_LOG.md`](./BUILD_LOG.md)** | Build log: how every prompt section was implemented, verification steps, and how to customise. |

---

## 🔍 How `guillaumecolombel.fr` Works Under the Hood

### 1. Core Concept & Stack
- **Visual Metaphor**: *"A backlit alabaster standing stone with coloured strata, in a dusk landscape."*
- **Tech Stack**:
  - **Framework**: Nuxt 3 + Vue 3 (SSR shell + client-side canvas controller in `DECYU8Im.js`)
  - **3D & Shaders**: **Three.js `WebGPURenderer`** with automatic **WebGL2 fallback**, authored in **TSL (Three.js Shading Language)** inside `Cd_dFser.js` (495 KB)
  - **Typography & Motion**: **GSAP 3.15** (`SplitText`) + custom **MSDF (Multi-channel Signed Distance Field)** 3D cylindrical text drum (`/assets/fonts/msdf/Harmond-SemiBoldCondensed.png` + `SpaceMono-Regular.png`)
  - **Interactive Audio**: **Howler.js** (`DKWN85t0.js`) mixing 7 procedural/recorded `.ogg` stems (`ambient-drone`, `wind-loop`, `stone-hover`, `stone-open`, `stone-close`, `wheel-tick`, `about-toggle`)

---

### 2. How Projects Are Showcased & Transitioned
Every project in the portfolio is driven by a single declarative `PROJECTS` array (`hd` in `DECYU8Im.js`) that simultaneously morphs **five** visual layers when you scroll the wheel:

1. **3D Cylindrical Title Drum (`Roue des titres`)**:
   - Project titles (`wheel: ["LINE 1", "LINE 2"]`) and indices (`01`, `02`...) are rendered on an invisible 3D cylinder wrapping around the standing stone (`radius: 2.3`, `verticalStep: 0.72`).
   - Non-selected rows blur out via an MSDF bokeh shader (`bokehWidth: 8.5`) while the active row glows and warps near the stone's silhouette via a molten meniscus (`meniscusStrength: 0.08`).
2. **Alabaster Mineralogy (`Matière`)**:
   - Scrolling to a project interpolates the stone's internal subsurface scattering color (`color: [R, G, B]`), mineral vein intensity/frequency (`matter.veins`, `matter.veinScale`), sedimentary strata bands (`matter.bands`, `matter.bandScale`), and optical density (`matter.density`).
3. **Landscape & Atmosphere (`Décor`)**:
   - Each project morphs the surrounding world between **5 camera viewpoints (`scene.view`)**, **day/dusk/night (`scene.night`, `scene.skyDim`)**, **water level (`scene.water`)**, **valley mist (`scene.mist`)**, **terrain relief (`scene.relief`)**, and **wind-bent flora (`scene.flora`)**.
4. **Refracted Cover Inclusion (`Inclusion`)**:
   - The project's cover video/image (`/assets/covers/<slug>.mp4` or `.webp`) is embedded *inside* the translucent stone (`depth: 0.55`, `ior: 1.5`, `parallax: 0.28`), refracting through the stone's mineral veins as you move your pointer.
5. **Voronoi Stone Fracture & Cloth Unfold (`Fracture` + `Project Sheet`)**:
   - **Hovering** the stone heats up Voronoi fracture seams under the cursor (`pointerRadius: 0.25`, `conductionRate: 2.5`) and opens a molten pinhole peeking at the cover inside.
   - **Clicking** shatters the stone along its Voronoi cells (`openOffset: 0.9`, `springW0: 7.5`), unfolds the project cover onto a 3D cloth-physics plane (`foldAmount`, `edgeWeave`), and slides in the bottom `#project-sheet` with the project's `description`, `credits`, `year`, and live `Visit ↗` link.

---

### 3. How to Customize It for Your Own Projects
To adapt this architecture for your own portfolio (using [`BUILD_PROMPT.md`](./BUILD_PROMPT.md)), you only need to supply your project entries in `src/data/projects.ts` and drop a `.mp4` or `.webp` preview into `public/assets/covers/<slug>.mp4`:

```ts
export const PROJECTS = [
  {
    slug: "my-flagship-project",
    title: "My Flagship Project",
    wheel: ["MY FLAGSHIP", "PROJECT"], // 2-line 3D cylindrical MSDF drum label
    year: "2026",
    description: "Short 1-2 sentence description shown in the bottom sheet when the stone fractures open.",
    credits: [{ role: "Architecture & Engineering", name: "Your Name" }],
    url: "https://github.com/your-org/your-repo",
    color: [1.5, 0.42, 0.1], // Linear RGB internal stone glow (>1.0 triggers HDR bloom)
    matter: { veins: 0.2, veinScale: 0.7, bands: 1.5, bandScale: 0.5, density: 0.8 },
    scene: { water: 0.2, mist: 0.2, view: 0, flora: 0.7, relief: 0.2, night: 0, skyDim: 0 },
  },
];
```

> [!TIP]
> **Built-in Inspector Secret**: On the live site (and documented in the build prompt), appending `?debug` to the URL (`https://guillaumecolombel.fr/?debug`) or pressing `Ctrl+Shift+D` unlocks the full 18-folder `lil-gui` shader tuning panel (`Source`, `Lumière`, `Matière`, `Décor`, `Inclusion`, `Fracture`, `Lanterne / ambre`, `Roue des titres`, `Fluide pointeur`) plus a **`Copy project preset`** button that copies the exact `matter` and `scene` JSON values for your new projects.
