# Ethan Vale — 3D Spatial Photography Archive

> **Template 04:** A state-of-the-art 3D spherical photography archive and field notes gallery exploring spatial navigation, mathematical lattice projections, tactile drag momentum, and dual-mode layout switching.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3 3D Transforms](https://img.shields.io/badge/CSS3-3D_Transforms-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success?style=flat)](https://github.com/knarayanareddy/WebsitedesignandPrompts)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/)

---

## 🌟 Live Demo

Experience the live interactive 3D sphere on GitHub Pages:  
👉 **[https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/](https://knarayanareddy.github.io/WebsitedesignandPrompts/ethanvale/)**

---

## 📸 Key Architectural Highlights

### 1. Fibonacci Sphere Lattice (No WebGL / Pure CSS 3D)
All 21 fine-art photography exhibits are distributed uniformly over the surface of a virtual sphere using the **Golden Section Spiral algorithm** ($\text{GA} = \pi \times (3 - \sqrt{5})$). Each card dynamically calculates its exact 3D Cartesian coordinates and tangential rotation angles in real time.

### 2. Tactile Momentum & Inertia Physics
Grab the sphere with a cursor or swipe and flick it into motion. The custom physics loop calculates momentary pointer velocity (`velX`, `velY`), applying exponential friction damping (`0.94`) and pitch clamping ($\pm 32^\circ$) for a weighted, physical feel.

### 3. Counter-Rotated Optical Headline Lock
The hero title `"I See Through the Wild"` shares the exact `0×0` coordinate origin of the sphere. As you rotate the sphere in 3D space, JavaScript applies an inverse rotation matrix every frame (`rotateX(-sx) rotateY(-sy) translateZ(R * 0.62px)`), keeping the typography locked dead-center to the camera while foreground cards pass smoothly across it.

### 4. Atmospheric Optical Depth Shading
Cards calculate their real-time Z-depth relative to the camera in `requestAnimationFrame`. Foreground cards retain full brilliance, while cards turning into the distance receive progressive opacity falloff and dynamic black washes, producing authentic optical depth without post-processing shaders.

### 5. Smooth FLIP Lightbox Transitions
Clicking any floating photo on the spinning sphere triggers a **FLIP (First, Last, Invert, Play)** animation that measures the card's current 3D screen coordinates and expands it into a centered, full-resolution modal without visual jumping.

### 6. Dual-Mode View Switcher (3D Orbit ⇄ 2D Grid)
A bottom-right toggle morphs the UI between the **interactive 3D orbital sphere** and a **minimalist 2-column architectural photography grid**.

---

## 🎮 Interaction Controls

| Input Method | Action | Result |
| :--- | :--- | :--- |
| **Mouse / Trackpad** | Click + Drag | Orbits the 3D sphere with momentum |
| **Flick Gesture** | Quick release | Continues spinning with smooth inertia |
| **Click Card** | Left Click | Opens FLIP lightbox modal with high-res photo & field notes |
| **Grid Button** | Bottom-Right Click | Toggles between 3D Spherical Orbit and 2D Editorial Grid |
| **Scroll / Wheel** | Vertical Scroll | 16vh camera dolly forward zoom |
| **Touchscreen** | Horizontal Swipe | Rotates 3D sphere (auto-discriminates vertical page scroll) |
| **Keyboard** | `Escape` Key | Closes lightbox modal, menu, or grid view |

---

## 📂 File Hierarchy

```text
ethan-vale-archive/
├── index.html           # Complete, self-contained 3D engine (~51 KB)
├── favicon.svg          # Custom minimalist brand mark SVG favicon
├── ADAPTED_PROMPT.md    # Master AI prompt to recreate/adapt this 3D sphere
├── BUILD_LOG.md         # In-depth mathematical formulas & engineering architecture
└── README.md            # Template showcase & documentation
```

---

## 🚀 Quickstart & Local Preview

Because this template is engineered with **zero external dependencies and zero build tools**, you can run it immediately with any static HTTP server:

```bash
# Clone the repository
git clone https://github.com/knarayanareddy/WebsitedesignandPrompts.git
cd WebsitedesignandPrompts/ethan-vale-archive

# Option A: Run using Python (pre-installed on macOS/Linux)
python3 -m http.server 8080

# Option B: Run using Node.js npx
npx serve .
```

Open `http://localhost:8080` in any modern desktop or mobile browser.

---

## 🤖 AI Prompt Engineering Kit

Want to adapt this 3D Fibonacci sphere to your own photography portfolio, architectural collection, or 3D product showcase?

👉 Read **[`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md)** for the complete verbatim prompt, geometry constants, and framework adaptation guide.  
👉 Read **[`BUILD_LOG.md`](./BUILD_LOG.md)** for spherical trigonometry formulas, FLIP animation math, and memory management strategies.
