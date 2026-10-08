# ADAPTED PROMPT — "One Thread" 3D WebGL Flight Experience

The definitive specification prompt for building a 3D camera spline flight portfolio inspired by
**ysuriadesign.co** ("One person. One thread."). Any LLM or senior design engineer following this
specification will recreate the experience with 100% architectural and visual fidelity.

---

## 1. Executive Concept & Creative Direction

Build a full-screen, scroll-driven **3D WebGL spatial flight experience** where the visitor is taken on
an interactive cinematic ride through dark space along an illuminated physical thread.

- **Philosophy:** "One person. One thread." — a unified trajectory traversing physical ventures, 3D WebGL architectures, autonomous protocols, and creative engineering.
- **Atmosphere:** Deep obsidian space (`#000000`), warm ivory typography (`#f2eee7`), electric crimson/amber laser thread (`#ff3a26`), volumetric dust, and an anamorphic lens flare.
- **Interaction Model:** The scroll wheel / touch swipe does not move a standard 2D webpage down; it accelerates a high-velocity camera along a 3D spline trajectory in space with dynamic vehicle banking, pitch inertia, and lateral parallax.
- **Zero React Overhead:** Pure vanilla Three.js + hardware-accelerated DOM overlay. No React hydration lag or Framer Motion layout thrashing. Locked 60/120 FPS performance.

---

## 2. Design System Tokens & Typography

### 2.1 CSS Custom Properties
```css
:root {
  --ink: #f2eee7;            /* Primary warm ivory text */
  --ink-2: #f2eee79e;        /* Secondary muted text (62% opacity) */
  --ink-3: #f2eee747;        /* Tertiary faint captions (28% opacity) */
  --line: #f2eee72e;         /* Hairline borders and rules (18% opacity) */
  --accent: #ff3a26;         /* Signature electric laser crimson */
  --bg: #000000;             /* Pure pitch black canvas */
  --f-display: "Geist", "Helvetica Neue", -apple-system, sans-serif;
  --f-serif: var(--f-display);
  --f-mono: var(--f-display);
  --gutter: clamp(16px, 3.2vw, 48px);
  --ease: cubic-bezier(0.2, 0.7, 0.1, 1);
}
```

### 2.2 Typography Hierarchy
- **Font Face:** Variable font `Geist` (`/fonts/geist-latin-var.woff`), weights 200 to 500.
- **Intro & Main Headings:** `font-weight: 300`, `letter-spacing: -0.04em`, `line-height: 0.96`, responsive fluid sizing `clamp(34px, 5vw, 80px)`.
- **Character Staggering:** Chapter titles must wrap each word in `.ch-word` and each letter in `.ch-char` carrying a staggered CSS variable `--i`:
  ```html
  <span class="ch-word">
    <span class="ch-char" style="--i:0">O</span>
    <span class="ch-char" style="--i:1">n</span>
    <span class="ch-char" style="--i:2">e</span>
  </span>
  ```
  CSS transition: `transition: transform 0.9s var(--ease), opacity 0.7s var(--ease), filter 0.9s var(--ease); transition-delay: calc(var(--i) * 28ms);`.
- **Technical Monospace Kicker:** `font-size: 12px`, `letter-spacing: 0.01em`, uppercase/tabular formatting.

---

## 3. DOM & Viewport Architecture

```html
<!doctype html>
<html lang="en" class="gate">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Kiran Reddy — Systems Builder &amp; Founder</title>
    <link rel="preload" href="/fonts/geist-latin-var.woff" as="font" type="font/woff" crossorigin />
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body>
    <!-- 1. Fullscreen WebGL Canvas -->
    <canvas id="gl" aria-hidden="true"></canvas>

    <!-- 2. Virtual Scroll Track (count * 46vh) -->
    <div id="scroll" aria-hidden="true"></div>

    <!-- 3. Expanding Horizon Footer -->
    <footer class="footer" id="footer">
      <div class="ft-bar">
        <div class="ft-l">
          <p class="ft-kick mono"><span class="ft-dot"></span>Open for new work &amp; ventures · 2026</p>
          <h2 class="ft-title">Let’s build <em>what’s next.</em></h2>
        </div>
        <div class="ft-r">
          <a class="ft-mail" href="mailto:kiran@kiranreddy.nl">kiran@kiranreddy.nl<span>→</span></a>
          <nav class="ft-links mono">
            <a href="https://vouwfiets.kiranreddy.nl" target="_blank">Vouwloods Delft ↗</a>
            <a href="/multiverse" target="_blank">3D Multiverse ↗</a>
            <a href="https://github.com/knarayanareddy" target="_blank">GitHub ↗</a>
          </nav>
        </div>
        <div class="ft-base mono">
          <span>© 2026 Kiran Reddy · Delft, NL</span>
          <button class="ft-again mono" data-jump="0">Begin again ↑</button>
        </div>
      </div>
    </footer>

    <!-- 4. Fixed Editorial HUD Overlay -->
    <main id="ui">
      <!-- Fixed Header Bar -->
      <header class="top">
        <a class="mark" href="#" data-jump="0">
          <span class="mark-pic"><b>KR</b></span>
          <span class="mark-word">Kiran&nbsp;Reddy</span>
        </a>
        <div class="counter mono"><span id="count-now">00</span><span class="counter-sep">/</span><span>06</span></div>
        <div class="top-r">
          <button class="sound-btn mono" id="sound-btn" aria-pressed="false">Sound <span>off</span></button>
          <button class="index-btn mono" id="index-btn" aria-expanded="false">Index</button>
        </div>
      </header>

      <!-- Intro Statement -->
      <section class="intro" id="intro">
        <p class="intro-kicker mono">Systems, autonomous agents and ventures · Delft 2026</p>
        <h1 class="intro-title">Kiran Reddy — systems, AI and code, by one person.</h1>
        <p class="intro-now"><i></i>Building ventures &amp; showroom at <a href="https://vouwfiets.kiranreddy.nl" target="_blank">Vouwloods Delft</a></p>
      </section>

      <!-- Active Chapter Display -->
      <section class="chapter" id="chapter">
        <div class="ch-meta mono"><span class="ch-num" id="ch-num">01</span><span class="ch-rule"></span><span class="ch-kicker">Chapter</span></div>
        <h2 class="ch-title" id="ch-title"></h2>
        <p class="ch-line" id="ch-line"></p>
        <dl class="ch-stats" id="ch-stats"></dl>
      </section>

      <!-- Project Cards & Projected Landmark Pins -->
      <div class="work-labels" id="work-labels"></div>
      <div class="frame-tags" id="frame-tags" aria-hidden="true"></div>

      <!-- Finale Text -->
      <section class="finale" id="finale">
        <p class="finale-kicker mono">Systems Engineer · AI Builder · Founder</p>
        <h2 class="finale-title">One person. <em>One thread.</em></h2>
      </section>

      <!-- Right Navigation Rail -->
      <nav class="rail" id="rail" aria-label="Chapters"></nav>

      <!-- Scroll Prompt -->
      <div class="scroll-cue mono" id="cue"><span>Scroll</span><i></i></div>

      <!-- Index Drawer -->
      <nav class="index open" id="index"><ol id="index-list"></ol></nav>
    </main>

    <!-- 5. Interactive Work Modal -->
    <div class="work-modal" id="work-modal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="wm-backdrop" data-close></div>
      <article class="wm-glass">
        <header class="wm-head">
          <h3 class="wm-title" id="wm-title"></h3>
          <p class="wm-desc" id="wm-desc"></p>
          <button class="wm-close" data-close aria-label="Close">✕</button>
        </header>
        <div class="wm-stage" id="wm-stage"></div>
        <footer class="wm-foot">
          <div class="wm-thumbs" id="wm-thumbs"></div>
          <nav class="wm-nav"><button id="wm-prev">←</button><button id="wm-next">→</button></nav>
        </footer>
      </article>
    </div>

    <!-- 6. Precompilation Gate Loader -->
    <div id="loader">
      <div class="loader-inner">
        <p class="mono loader-k">Tying the thread</p>
        <div class="loader-bar"><i id="loader-fill"></i></div>
        <p class="mono loader-p" id="loader-p">000</p>
        <div class="loader-enter">
          <button class="enter-btn on" data-enter="sound">Enter with sound</button>
          <button class="enter-btn" data-enter="mute">Enter muted</button>
        </div>
      </div>
    </div>

    <!-- 7. Hardware-Accelerated Precision Cursor -->
    <div id="cursor" aria-hidden="true"><i class="c-dot"></i><i class="c-ring"></i></div>

    <script type="module" src="/assets/engine.js"></script>
  </body>
</html>
```

---

## 4. 3D WebGL Flight & Spline Engine

### 4.1 The Spline Flight Curve
The flight path is a 3D Catmull-Rom spline curve (`THREE.CatmullRomCurve3`) parameterized over progress $t \in [0, 1]$:
```javascript
const spline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 45),       // Station 01: Origin
  new THREE.Vector3(12, -4, 25),     // Banking right
  new THREE.Vector3(18, 6, 0),       // Approaching Vouwloods Showroom
  new THREE.Vector3(8, 2, -28),      // Swoop past workshop
  new THREE.Vector3(-14, -8, -55),   // Dives left into The Multiverse
  new THREE.Vector3(-18, 4, -85),    // Orbiting celestial constellations
  new THREE.Vector3(6, 12, -120),    // Rising into Solana Nimbus node
  new THREE.Vector3(16, -2, -150),   // Banking through agent protocols
  new THREE.Vector3(0, 4, -185),     // Aligning for Finale
  new THREE.Vector3(0, 0, -215)      // Station 06: Horizon Gate
], false, 'catmullrom', 0.5);
```

### 4.2 Luminous Tube Mesh & Energy Packets
- **Core Spline Tube:** `new THREE.TubeGeometry(spline, 600, 0.16, 16, false)` with an emissive metallic material (`color: #221a12`, `emissive: #ff3a26`, `emissiveIntensity: 1.2`, `roughness: 0.15`).
- **Outer Aura Glow:** A second tube mesh with radius `0.32`, transparent additive blending (`THREE.AdditiveBlending`), and opacity `0.18`.
- **Traveling Pulses:** 7 energy packets sliding continuously along the thread:
  $$t_{\text{pulse}} = (t_{\text{elapsed}} \times 0.08 + \frac{i}{7}) \pmod 1$$
  positioned at `spline.getPointAt(pulseT)`.

### 4.3 Aircraft Banking & Camera Dynamics
In each frame of the render loop:
1. Target scroll progress is calculated from `window.scrollY / maxScroll`.
2. Progress is lerped with inertia damping:
   $$t_{\text{current}} = t_{\text{current}} + (t_{\text{target}} - t_{\text{current}}) \times 0.058$$
3. Camera position is computed: $\vec{P}_{\text{cam}} = \text{spline.getPointAt}(t_{\text{current}})$.
4. Camera look-ahead point is computed: $\vec{P}_{\text{look}} = \text{spline.getPointAt}(\min(0.9999, t_{\text{current}} + 0.032))$.
5. Lateral roll/bank angle is derived from path curvature $\kappa$ and mouse velocity:
   $$\text{bank} = \text{clamp}(-\text{latV} \times 0.5 - \text{sx} \times 0.3 - \vec{u} \cdot \vec{S} \times 2.2, -0.9, 0.9)$$
6. Camera quaternion applies the bank rotation along its forward axis:
   $$\mathbf{Q}_{\text{final}} = \mathbf{Q}_{\text{basis}} \times \mathbf{Q}_{\text{bank}}(\vec{v}_{\text{forward}}, \text{bank})$$

---

## 5. GLSL Post-Processing Pipeline

The scene renders into an offscreen render target (`rtScene`) with an attached depth texture (`depthTexture`), followed by four sequential GLSL shader passes:

1. **Circle of Confusion & Bokeh (DoF):**
   Computes circle of confusion per pixel:
   $$\text{CoC} = \text{clamp}\left(\frac{|\text{depth} - u_{\text{focus}}|}{\text{depth}} \times u_{\text{aperture}}, -u_{\text{nearMax}}, u_{\text{farMax}}\right)$$
   Applies a Poisson disc bokeh blur weighted by the CoC factor.
2. **Anamorphic Streak Lens Flare:**
   Extracts bright pixels above $u_{\text{streakThreshold}}$, stretches horizontally across 16 samples with exponential falloff:
   $$\text{Streak}(x) = \sum_{k=-16}^{16} \text{Color}(x + k \cdot \Delta x) \cdot e^{-|k| \cdot 0.18} \cdot \vec{C}_{\text{streakTint}}$$
3. **Multi-Level Dual-Pass Gaussian Bloom:**
   6 mip levels of downsampling with bilinear filtering followed by progressive additive upsampling with cubic interpolation.
4. **Compositing & Film Grading:**
   Blends scene, bloom, and streak, applies ACES Filmic tone mapping, subtle chromatic aberration ($r/b$ channel UV offset), organic procedural grain, and edge vignette:
   $$\text{Vignette} = 1.0 - \text{length}(\text{UV} - 0.5)^2 \times 0.85$$

---

## 6. Reactive Web Audio API Synthesis

### 6.1 Audio Architecture Graph
```
[Noise Buffer / Oscillators] ──► [Biquad Filters] ──► [Gain Nodes]
                                                            │
                                                            ▼
                                                     [Aux Reverb Bus]
                                                            │
                                                            ▼
[Dynamics Compressor] ◄── [Lowpass Filter (20kHz)] ◄── [Master Gain] ──► [Destination]
```

### 6.2 Synthesizer Rules
- **Fundamental Drones:**
  - Oscillator 1: Sine wave at $55\text{Hz}$ (A1 root).
  - Oscillator 2: Triangle wave at $82.4\text{Hz}$ (E2 fifth harmonic).
- **Dynamic Speed Filtering:**
  As the camera accelerates along the curve, the lowpass filter cutoff tracks camera velocity:
  $$f_{\text{filter}} = \text{clamp}\left(120, 19000, f_{\text{base}} \times \left(1 - \frac{v_{\text{cam}}}{100} \times 0.55\right)\right)$$
- **SFX Matrix:**
  - `tag`: Pentatonic sine chime (`880Hz`, `988Hz`, `1175Hz`, `1319Hz`, `1568Hz`) with $2\times$ harmonic octave.
  - `card`: Triangle tone at $1320\text{Hz}$ (duration 90ms).
  - `open`: Pitch bend up $420\text{Hz} \to 840\text{Hz}$ + resonant bandpass noise sweep.
  - `close`: Pitch bend down $760\text{Hz} \to 380\text{Hz}$.
  - `release`: Deep sub-bass rumble ($48\text{Hz} \to 28\text{Hz}$) + lowpass noise burst.

---

## 7. Interactive Work Modal Contract

When the camera reaches Station 04 ("The work"), four interactive floating 3D exhibition panels appear. Clicking `View work ↗` on any card opens the modal:

1. **Backdrop:** Radial gradient backdrop blur with dynamic `--pc` project color tint:
   ```css
   background: radial-gradient(90% 70% at 50% 45%, color-mix(in srgb, var(--pc) 7%, #030306e6), #010103f5);
   backdrop-filter: blur(18px) saturate(0.8);
   ```
2. **Glass Container:** `border: 1px solid rgba(255, 255, 255, 0.1)`, `border-radius: 22px`, `box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7)`.
3. **Stage:** Renders high-resolution photography or HTML5 video loop.
4. **Thumbnails:** Clickable thumbnail row highlighting the active media item.
5. **Keyboard Support:** `Escape` closes modal, `ArrowRight` advances to next media item, `ArrowLeft` returns to previous media item.

---

## 8. Screen-Projected Landmark Pins (`.ft-tag`)

Each pin represents a 3D coordinate in world space rendered as a 2D DOM element:
- Position update:
  $$\vec{p}_{\text{NDC}} = \vec{v}_{\text{world}} \cdot \mathbf{M}_{\text{view}} \cdot \mathbf{M}_{\text{proj}}$$
  $$x_{\text{screen}} = (p_x \cdot 0.5 + 0.5) \times \text{window.innerWidth}$$
  $$y_{\text{screen}} = (-p_y \cdot 0.5 + 0.5) \times \text{window.innerHeight}$$
- **CSS Structure:**
  - `.ft-dot`: 6px white circle with box shadow `0 0 10px rgba(255,255,255,0.6)`.
  - `.ft-lead`: 56px horizontal rule line expanding with `transform: scaleX(1)`.
  - `span.mono`: Pill badge with `backdrop-filter: blur(8px)`, background `#0a08088c`, and hairline border.
- **Micro-Interaction:** Hovering or revealing a tag plays a spatial audio chime.
