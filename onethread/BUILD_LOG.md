# BUILD LOG — "One Thread"

Technical implementation record and engineering deep-dive for the 3D WebGL camera spline flight
portfolio (Three.js r186 + WebGL 2.0 + Web Audio API + Vite 6 + TypeScript). Companion document
to `ADAPTED_PROMPT.md`.

---

## 1. Engineering Decisions & Architectural Stack

### 1.1 Why Pure Vanilla WebGL + DOM Over Component Frameworks
While React and Vue excel at state-heavy dashboard applications, full-screen interactive WebGL
spatial fly-through experiences require:
- **Zero Layout Thrashing:** Synchronous DOM updates inside high-frequency `requestAnimationFrame` loops cause severe frame drops when coupled with virtual DOM reconcilers.
- **Direct GPU Pipeline Control:** Managing post-processing buffers (`WebGLRenderTarget`), depth textures, and shader uniform updates must occur directly on the render thread.
- **Hardware-Accelerated CSS Transitions:** UI elements like `.ch-char` staggered letter reveals and `.ft-tag` leader lines run on the browser's compositor thread via CSS transforms and opacity, leaving the main thread 100% dedicated to Three.js and the Web Audio synthesizer.

---

## 2. Mathematical Spline Parameterization & Flight Trajectory

### 2.1 The 3D Catmull-Rom Spline Curve
The flight path is governed by a 3D Catmull-Rom spline with 10 control points:
$$\mathbf{P}(t) = \sum_{i=0}^{3} b_i(u) \mathbf{P}_{k+i}, \quad t \in [0, 1]$$
where $u = (t \cdot N) \pmod 1$ and $b_i(u)$ are the cubic Catmull-Rom blending polynomials with centripetal tension $\alpha = 0.5$.

### 2.2 Forward Tangent Vector & Look Target
At any normalized scroll progress $t$, the camera position and forward look target are:
$$\vec{P}_{\text{cam}} = \mathbf{P}(t)$$
$$\vec{P}_{\text{look}} = \mathbf{P}(\min(0.9999, t + \Delta t)), \quad \Delta t = 0.032$$
$$\vec{T}_{\text{forward}} = \frac{\vec{P}_{\text{look}} - \vec{P}_{\text{cam}}}{\|\vec{P}_{\text{look}} - \vec{P}_{\text{cam}}\|}$$

### 2.3 Aircraft Banking & Lateral Inertia
To give the flight a dynamic aerospace flight simulator feel, the camera banks into curves.
1. Compute the second derivative (curvature vector $\vec{K}$):
   $$\vec{K} = \vec{T}(t + \Delta t) - \vec{T}(t)$$
2. Project curvature onto the camera's lateral vector $\vec{S} = \vec{T} \times \vec{U}_{\text{world}}$:
   $$\kappa_{\text{lat}} = \vec{K} \cdot \vec{S}$$
3. Compute the target bank angle $\theta_{\text{bank}}$:
   $$\theta_{\text{bank}} = \text{clamp}\left(-\dot{x}_{\text{mouse}} \cdot 0.3 - \kappa_{\text{lat}} \cdot 2.2, -0.9, 0.9\right)$$
4. Apply an exponential smoothing filter (LERP):
   $$\theta_{\text{bank}}(k) = \theta_{\text{bank}}(k-1) + \left(\theta_{\text{bank}} - \theta_{\text{bank}}(k-1)\right) \cdot (1 - e^{-\lambda \Delta t})$$
5. Rotate the camera basis quaternion around the forward tangent $\vec{T}_{\text{forward}}$ by $\theta_{\text{bank}}$.

---

## 3. The GLSL Post-Processing Pass Chain

```
               ┌───────────────────────┐
               │   Scene Render Pass   │
               │  (#gl Color + Depth)  │
               └───────────┬───────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
┌──────────────┐                       ┌───────────────┐
│  CoC & Bokeh │                       │  Streak Pass  │
│  Depth-Field │                       │  (Anamorphic) │
└──────┬───────┘                       └───────┬───────┘
       │                                       │
       └───────────────────┬───────────────────┘
                           ▼
               ┌───────────────────────┐
               │   Dual-Pass 6-Level   │
               │     Gaussian Bloom    │
               └───────────┬───────────┘
                           ▼
               ┌───────────────────────┐
               │ Composite & Grade     │
               │ • ACES Filmic Tone    │
               │ • Chromatic Aberr.    │
               │ • Procedural Grain    │
               │ • Lens Vignette       │
               └───────────────────────┘
```

### 3.1 Depth of Field (Circle of Confusion)
The Circle of Confusion (CoC) per fragment is computed from the linear depth buffer:
```glsl
float depth = texture2D(tDepth, vUv).r;
float linearDepth = perspectiveDepthToViewZ(depth, uNear, uFar);
float coc = clamp((linearDepth - uFocus) / linearDepth * uAperture, -uNearMax, uFarMax);
```
Fragments are subsequently gathered using a 12-tap Poisson disc with radius proportional to $|\text{coc}|$.

### 3.2 Anamorphic Horizontal Streak Lens Flare
To mimic cinema-grade anamorphic prime lenses, a dedicated horizontal pass isolates luminance above threshold:
```glsl
vec3 color = texture2D(tColor, vUv).rgb;
float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
float weight = max(0.0, luma - uStreakThreshold) / max(0.001, luma);
vec3 streak = vec3(0.0);
for (int i = -16; i <= 16; i++) {
    float offset = float(i) * uTexel.x * 2.5;
    float atten = exp(-abs(float(i)) * 0.16);
    streak += texture2D(tColor, vUv + vec2(offset, 0.0)).rgb * atten;
}
gl_FragColor = vec4(streak * uStreakTint * weight, 1.0);
```

### 3.3 Composite & Film Grain
Film grain is generated procedurally on the GPU using a high-frequency fract noise function:
```glsl
float grain(vec2 uv, float time) {
    vec2 seed = uv + fract(time * 0.07);
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
}
```

---

## 4. Web Audio API Synthesizer Architecture

```
[41.2Hz Sub Sine] ──► [Sub Gain] ──────────────────────────┐
                                                           │
[Noise Buffer] ─────► [Bandpass (400Hz)] ──► [Seam Gain] ──┤
                                                           │
[Noise Buffer] ─────► [Lowpass (300Hz)] ───► [Air Gain] ───┼──► [Bus] ──► [Compressor] ──► [Output]
                                                           │
[Oscillator 1 (55Hz)] ──┐                                  │
                        ├──► [Biquad Lowpass] ──► [Drone] ─┘
[Oscillator 2 (82.4Hz)] ─┘
```

### 4.1 Resonant Noise Buffer Generation
Brownian/pink noise is generated algorithmically at boot into an AudioBuffer:
```javascript
const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
const data = buffer.getChannelData(0);
let b0 = 0, b1 = 0, b2 = 0;
for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.997 * b0 + white * 0.029;
    b1 = 0.985 * b1 + white * 0.032;
    b2 = 0.950 * b2 + white * 0.048;
    data[i] = (b0 + b1 + b2 + white * 0.02) * 0.9;
}
```

### 4.2 Dynamic Velocity Cutoff
When the user scrolls fast, the lowpass filter opens, introducing high-frequency spatial whooshes:
$$f_{\text{song}} = \text{exp}\left(\ln(f_{\text{low}}) \cdot (1 - \alpha) + \ln(f_{\text{high}}) \cdot \alpha\right)$$
$$f_{\text{cutoff}} = \text{clamp}(120, 19000, f_{\text{song}} \cdot (1 - \text{scrollVelocity} \cdot 0.6))$$

---

## 5. Hardware Precision Cursor (Spring-Damper Model)

The cursor consists of a central coordinate dot (`.c-dot`) and an outer trailing ring (`.c-ring`).
The outer ring follows the target pointer using a second-order critically damped spring:
$$F = -k \cdot (x - x_{\text{target}}) - c \cdot v$$
where stiffness $k = 16.0$ and damping coefficient $c = 2\sqrt{k} = 8.0$.
```javascript
const stiffness = 16;
const damping = 2 * Math.sqrt(stiffness);
this.vx += ((target.x - this.x) * stiffness - this.vx * damping) * dt;
this.vy += ((target.y - this.y) * stiffness - this.vy * damping) * dt;
this.x += this.vx * dt;
this.y += this.vy * dt;
```

---

## 6. Staggered Character Reveal System

To prevent JavaScript DOM manipulation during transitions, each character is isolated in HTML with an index variable `--i`:
```css
.ch-title .ch-char {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(0.35em);
  transition: transform 0.9s var(--ease), opacity 0.7s var(--ease), filter 0.9s var(--ease);
  transition-delay: calc(var(--i) * 28ms);
}
.chapter.on .ch-title .ch-char {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}
```
When `.chapter.on` is added to the container, all character animations trigger hardware-accelerated transitions with staggered 28ms delays.

---

## 7. Performance & Edge Deployment

- **Device Pixel Ratio Clamping:** `Math.min(devicePixelRatio, 1.5)` prevents GPU fillrate saturation on 3x Retina displays.
- **Dynamic Level of Detail (LOD):** If frame time exceeds 28ms (dropping below 36 FPS), render target resolution drops dynamically.
- **Edge Deployment:** Deployed on Cloudflare Workers using asset serving with `wrangler.jsonc`. Assets receive immutable cache headers with instant global edge delivery from nearest CDN nodes.
