# Scrolltide "Prompt to Motion" — Extracted Prompt Sheets, Shaders & Case Studies

Extracted from Scrolltide's **Prompt to Motion** eBook spreads (`/ebook/spread-*.webp` + `1im17enftjrm_.js`) and Scrolltide's own production WebGL Hero Nebula shader (`15xr2ihqaja8o.js`).

---

## 1. Prompt Sheet 02.1 — "The block that kills all four" (Anti-Slop Standing Instructions)

> **Where it lives**: In the coding agent's instructions file at the project root (`CLAUDE.md` / `.cursorrules` / `GEMINI.md`) — not in the chat conversation. Chat scrolls out of context after ~40 messages; the root file is re-read on every turn.

```markdown
DESIGN CONSTRAINTS - apply to every section, never override.

Ground #0A0B0D. Accent #5A3CF0. One accent only.
Positive states #C8F53F, caution #E8850C, errors #E0435B.

Display type: letter-spacing -0.03em. Body: 0.
Letter-spacing above 0 only on uppercase labels under 12px.

Spacing scale: 8 / 16 / 24 / 40 / 64 / 96. Nothing between.
Separate sections with space, never a border or a divider.

Do not add: card strokes, card fills, section dividers,
gradient fills on surfaces, overlays on video.
Do not change the colour scheme unless I ask.
```

### Also from `1im17enftjrm_.js` ("The never-list"):
```markdown
Never add: gradient text, glass cards, floating 3D blobs, purple-to-blue.
Ground is one value. Accent is one value, used three times or fewer.
Every measurement in this file is a value, not an adjective.
```

| Vague Prompt (Averaged Slop) | Exact Mechanism (Copied Literally) |
| :--- | :--- |
| `"make it feel premium"` | `letter-spacing: -0.03em` |
| `"a nice dark background"` | `#0a0a0a, grain at 3.5%` |
| `"make the metal shiny"` | `roughness 0.18, envmap on` |
| `"smooth scrolling please"` | `lerp 0.06, progress 0→1` |

---

## 2. Prompt Sheet 08.1 — "Basalt's hero plate" (Prompting an Image Model Like a Photographer)

> **The six slots, in order, at about forty words.** Everything after the blank line is flags, and flags go last because they carry the least weight. Iterate in order: `01 Composition` → `02 Light direction` → `03 Material detail` → `04 Colour, always last`.

```text
A single {compact studio monitor, machined from one aluminium
billet, matte dark grey}, three-quarter view, floating.
Shot on 85mm at f/2.0 - shallow depth, the subject fully sharp.
Light: one hard rim from behind right, no fill, shadows falling
toward camera.
Material: fine concentric tool marks, anisotropic highlights,
no gloss, soft airborne particles catching the key.
Background: seamless #0C0D0F, gentle falloff, no floor seam,
no props, no studio.
Composition: the subject sits in the LOWER RIGHT. Keep the left
45% of the frame empty and unlit for headline type.

No text. No logos. No watermark. No reflections of a camera.
--ar 16:9 --style raw
```

---

## 3. Prompt Sheet 09.2 — "Taking the comp apart" (Two Removals, One Comp)

> Both run against the reference comp as an attached image (upload the original file, not a screenshot). Each deletes a layer and repairs what was underneath it.

### 01 · THE PLATE (ships to production)
```text
Recreate this image as large as you can.

Remove every word, button, icon, logo and badge. Rebuild
what was behind them so nothing is patched or smeared.

Keep the composition, the crop and the framing exactly. Do
not zoom in or out. Do not move the subject. The ground
stays #0C0D0F, same falloff.

No text. No UI. No watermark.
```

### 02 · THE LAYOUT (never ships — used by the coding agent to measure positions)
```text
Recreate this image as large as you can, with every line of
text in the same position, at the same size and the same
weight.

Remove the background and the subject entirely. Put the text,
buttons and icons on pure black #000000.

Do not re-typeset. Do not fix the line breaks. Do not add
anything that was not there.
```

---

## 4. Chapter 11 — "Two stills, one transition" (Cinematic Scroll Loops)

> Make Frame B by handing the image model Frame A and changing **one** thing (never three). Then feed the pair to the video model (Kling 3.0 / Seedance 2.5) as first and last frame:

```text
a smooth, natural transition from frame one to frame two
```

- **Single changes that make a transition worth scrubbing**:
  1. **The camera moves closer**: A push (the safest of the four).
  2. **The light changes**: Day to night, or the rim crossing from one side to the other.
  3. **The object rotates**: 20 degrees at most, or it invents a side it never saw.
  4. **Something opens**: A lid, a panel, a door.
- **Fixing a loop seam**: Match the end frame to the start frame, then re-encode.

---

## 5. Chapter 21 — "Twelve blades, one function" (`Iris.jsx` Procedural 3D Aperture)

> Aperture's procedural 3D iris in React Three Fiber — 18 lines, zero external `.glb` model files, driven by a single `open` (`0` = closed, `1` = wide) scroll scalar.

```jsx
import * as THREE from 'three';

const BLADES = 12;

// One blade: a curved wedge, extruded 0.04 deep.
const bladeShape = () => {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(1.05, 0);
  s.quadraticCurveTo(0.92, 0.46, 0.30, 0.55);
  s.lineTo(0, 0);
  return s;
};

// open: 0 = closed, 1 = wide. This is what scroll drives.
export function Iris({ open }) {
  return [...Array(BLADES)].map((_, i) => (
    <group key={i} rotation-z={(i / BLADES) * Math.PI * 2}>
      <mesh rotation-z={-0.9 + open * 1.15} position-x={0.34}>
        <extrudeGeometry args={[bladeShape(), { depth: 0.04, bevelSize: 0.01 }]} />
        <meshStandardMaterial metalness={1} roughness={0.28} />
      </mesh>
    </group>
  ));
}
```

---

## 6. Chapter 24 & Case Studies — Reflection vs. Diffraction vs. Thin Film, Spectral Ring & Meridian

1. **Three optical effects, one word**:
   - **Reflection**: White highlights, no hue at all (shows the room; needs an `envMap`).
   - **Diffraction**: The whole spectrum **repeating** in bands from grooves at regular spacing (`d = 1180 nm`). Pure 2D fragment shader, no 3D needed.
   - **Thin Film**: One sweep through hue, never repeating (soap, oil, anodised metal; driven by thickness, not spacing).
2. **Case Study — `spectral-ring`**:
   - 1 fragment shader on a ring-shaped mask (`3.9 KB` uncompressed GLSL, `32` wavelengths integrated, `0` textures loaded, `d = 1180 nm`).
3. **Case Study — `Meridian` (`100k` Point Cloud Globe)**:
   - 5 scroll stages, 1 geometry (`100,000` points sorted by angle, then height — except stage 03 wordmark which sorts by `x` so letters with holes don't get crossed by angular sort), 1 material, 1 draw call, `6 MB` buffers uploaded once, `60 fps` on mobile, arc term `sin(t * PI)` on the GPU.

---

## 7. Scrolltide's Own Production Hero Nebula Shader (Extracted from `15xr2ihqaja8o.js`)

This is the exact WebGL fragment shader running on the hero background of `https://www.scrolltide.co/` (3-octave Perlin FBM + 2-octave domain warp + dual star-twinkle layers + filmic grain):

```glsl
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 hash2(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec2 grad(vec2 i) {
  vec2 g = hash2(i) * 2.0 - 1.0;
  return g * inversesqrt(dot(g, g) + 1e-4);
}
float pnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(grad(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
  float b = dot(grad(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(grad(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(grad(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm3(vec2 p) {
  float v = 0.0, a = 0.609;
  mat2 m = mat2(1.6, -1.2, 1.2, 1.6);
  for (int i = 0; i < 3; i++) { v += a * pnoise(p); p = m * p; a *= 0.5; }
  return v;
}
float fbm2(vec2 p) {
  float v = 0.0, a = 0.710;
  mat2 m = mat2(1.6, -1.2, 1.2, 1.6);
  for (int i = 0; i < 2; i++) { v += a * pnoise(p); p = m * p; a *= 0.5; }
  return v;
}
float starLayer(vec2 uv, float t, float density) {
  vec2 g = uv * density;
  vec2 id = floor(g);
  vec2 fp = fract(g) - 0.5;
  float h = hash(id);
  if (h < 0.92) return 0.0;
  vec2 off = (hash2(id) - 0.5) * 0.7;
  float dd = length(fp - off);
  float tw = 0.55 + 0.45 * sin(t * 3.0 + h * 30.0);
  return smoothstep(0.05, 0.0, dd) * tw;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
  float t = u_time * 0.04;
  vec2 par = u_mouse * 0.10;

  vec2 p = uv * 1.0 + par;
  vec2 warp = vec2(fbm2(p * 0.8 + t), fbm2(p * 0.8 + vec2(3.1, 1.7) - t));
  float n1 = fbm3(p * 0.85 + warp * 0.85 + t * 0.35);
  float n2 = fbm3(p * 0.85 + warp * 0.85 + vec2(4.0, 2.0) - t * 0.30);

  float warmF = smoothstep(-0.35, 0.78, n1);
  float coolF = smoothstep(-0.35, 0.78, n2);

  float warmPos = smoothstep(-0.95, 0.95, -uv.x - uv.y * 0.5);
  float coolPos = smoothstep(-0.95, 0.95, uv.x + uv.y * 0.4);

  vec2 cc = uv - par * 0.4;
  float d = length(cc * vec2(0.80, 1.20));
  float vis = smoothstep(0.12, 0.80, d);

  vec3 amber = vec3(1.00, 0.46, 0.18);
  vec3 blue  = vec3(0.22, 0.50, 1.00);
  vec3 teal  = vec3(0.38, 0.90, 0.90);

  vec3 col = vec3(0.0);
  col += amber * warmF * warmPos * vis * 0.95;
  col += blue  * coolF * coolPos * vis * 1.05;
  col += teal  * coolF * coolF * coolPos * vis * 0.28;
  col += (amber * warmPos + blue * coolPos) * vis * 0.05;

  float lit = (warmF * warmPos + coolF * coolPos) * vis;
  float st = starLayer(uv + par, u_time, 14.0)
           + starLayer(uv * 1.7 + par, u_time * 1.3, 22.0) * 0.7;
  col += vec3(1.0) * st * smoothstep(0.1, 0.5, lit + 0.05);

  float gr = hash(gl_FragCoord.xy * 1.3 + fract(u_time) * 97.0);
  col += (gr - 0.5) * 0.05;

  col = vec3(1.0) - exp(-col * 1.6);
  col = pow(col, vec3(0.92));

  gl_FragColor = vec4(col, 1.0);
}
```
