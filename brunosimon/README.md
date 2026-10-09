# Bruno Simon — Authentic 3D Physics-Driven Playground Portfolio

![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.164-049EF4?logo=threedotjs&logoColor=white)
![Cannon.js](https://img.shields.io/badge/Cannon.js-0.6.2-FF6B6B)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)
![Howler.js](https://img.shields.io/badge/Howler.js-2.2-yellow)
![License](https://img.shields.io/badge/License-MIT-green)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages%20Ready-121013?logo=github)

A direct, production-grade replication of **Bruno Simon's iconic 3D portfolio (`bruno-simon.com`)**, sourced directly from the author's open-source codebase ([`brunosimon/folio-2019`](https://github.com/brunosimon/folio-2019)), packaged and upgraded for modern Vite 5, ES modules, and relative static asset serving.

Visitors pilot an authentic stylized RC toy buggy across a warm, pastel-shaded isometric playground featuring full rigid-body physics, knockable bowling pins, brick walls, ramps, physical 3D extruded typography, tire tracks, and interactive project stations.

---

## 🎮 Features & Technical Anatomy

| System | Architecture & Implementation | In-Engine Result |
|---|---|---|
| **RC Toy Car Simulation** | Cannon.js rigid body with compound collision shapes, 4 independent suspension wheel assemblies, raycasting ground contact | Authentic toy truck chassis with spring roll, pitch acceleration bounce, realistic steering inertia, and handbrake drift |
| **3D World Assets & Matcaps** | Draco-compressed GLB meshes (`models/`) with baked ambient occlusion textures and custom Matcap shaders (`models/matcaps/`) | Clean, low-poly aesthetic with signature baked warm contact shadows on the floor plane (`floorShadow.png`) |
| **Interactive Rigid Bodies** | Dynamic Cannon bodies for bricks, bowling pins, bowling balls, traffic cones, and boulders | Realistic collisions, scatter reactions, and kinetic force propagation upon impact |
| **Physical 3D Typography** | Extruded 3D geometry letters (`models/intro/`) resting on the floor with dynamic contact shadows | Monumental physical lettering ("BRUNO SIMON", "PROJECTS", "PLAYGROUND", keyboard arrow keys) |
| **Sound Synthesis & Howler.js** | Multi-track audio engine via Howler.js (`sounds/`) | Looping pitch-modulated engine revs, authentic toy horn honks, tire screeches on drift, and velocity-proportional collision hits |
| **Tire Skid Marks** | Dynamic canvas-backed ground track shader | Leaves realistic black rubber marks on the floor when drifting or braking |
| **Camera Spring System** | Custom smooth camera tracker with lead lag and isometric tilt angle | Floats gracefully above the vehicle, anticipating driving trajectory |

---

## 🕹 Controls

- **`W` / `▲`**: Accelerate forward
- **`S` / `▼`**: Reverse / brake
- **`A` / `◀`**: Steer left
- **`D` / `▶`**: Steer right
- **`Space`**: Drift / handbrake
- **`H`**: Honk toy horn
- **`R`**: Reset car position to origin
- **Easter Egg**: Append `#cybertruck` to the URL to drive the low-poly Tesla Cybertruck!
- **Debug Mode**: Append `#debug` to the URL to open the `dat.gui` inspection console.

---

## 🚀 Running Locally

```bash
# Navigate to the brunosimon directory
cd WebsitedesignandPrompts/brunosimon

# Install dependencies (Three.js, Cannon, GSAP, Howler, Vite)
npm install

# Start Vite development server
npm run dev

# Or build production distribution
npm run build
```

---

## 📂 Codebase Structure

```
brunosimon/
├── src/
│   ├── index.html                   # HTML entry point with canvas and loader
│   ├── index.js                     # Application bootstrapper
│   ├── javascript/
│   │   ├── Application.js           # Core loop, renderer, camera, composer
│   │   ├── Camera.js                # Spring follow-camera tracker
│   │   ├── Resources.js             # Asset registry (matcaps, models, sounds)
│   │   ├── Utils/                   # EventEmitter, Loader, Sizes, Time
│   │   ├── Passes/                  # Glow, blur, and post-processing shaders
│   │   └── World/                   # World container
│   │       ├── Car.js               # Vehicle physics, steering, chassis roll
│   │       ├── Physics.js           # Cannon.js world integration
│   │       ├── Controls.js          # Keyboard and touch input handlers
│   │       ├── Sounds.js            # Engine, horns, screeches, crash sound engine
│   │       ├── Floor.js             # Ground plane and skid mark shaders
│   │       └── Sections/            # Intro, Projects, Playground, Information
├── static/
│   ├── draco/                       # Draco mesh decoders (WebAssembly/JS)
│   ├── models/                      # Authentic 3D GLB models & matcap textures
│   └── sounds/                      # Audio clips (engines, screeches, crashes)
├── package.json
└── vite.config.js
```

---

## 📖 Methodology & Replication

- [`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md) — Comprehensive technical breakdown and parameter guide.
- [`BUILD_LOG.md`](./BUILD_LOG.md) — Engineering journal, provenance, and Vite modernization records.
