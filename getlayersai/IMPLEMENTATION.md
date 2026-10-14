# GetLayers featured studies — shared methodology and provenance

## 1. Scope and design philosophy

The user chose the 13 sites covered by documents 02–14: **Kimi, Soda, Vesper, Stride, AI Studio, Creative Director, Dantora, Clarix, Relay, Lumora, Laocoon, Baseline, and Ascend**. The collection is not all 54 archived briefs. Every new page is a functioning, independently addressable frontend study, with its own composition, interactive mechanism, and three Apogee-style markdown documents plus an HTML methodology page.

The source links could not be visually inspected because their hosting domains are outside the environment's allowlist. Instead of embedding unavailable posters and calling them rebuilt websites, this implementation creates original procedural artwork and documents the differences. The archive itself is preserved unchanged apart from navigation additions to its README.

## 2. From brief to implementation

1. **Inventory:** separate the 13 deep-dive narratives from repeated generic template instructions.
2. **Extract:** identify domain, concrete palette, typography direction, signature mechanism, section order, and expected controls.
3. **Resolve:** choose a clear rule when metadata and prompt tokens disagree. Record that rule in the site build log.
4. **Compose:** make distinct heroes (centered instrument, oversize product typography, editorial manifesto, clinical split, museum display, terminal, workflow window). Share UI fundamentals, not entire page layouts.
5. **Construct:** create local meshes, canvas label textures, shaders, CSS artwork, and ASCII rendering. No remote model or image is required.
6. **Connect:** build meaningful domain interactions with explicit states, calculations, and outputs. Do not wire every button to the same generic message.
7. **Constrain:** label synthetic data, remove unsubstantiated credentials/awards, avoid real transaction claims, and never imply a local form was delivered.
8. **Verify:** structural parsing, actual browser rendering, screenshot inspection, controls, keyboard focus, reduced motion, small-screen overflow, and automated accessibility.
9. **Publish:** integrate with the existing full-site build and PR checks. Do not replace or silently bypass the repository's deployment conventions.

## 3. Per-site mechanisms and practical adaptations

| Site | Distinctive implementation | Functional inspection surface | Deliberate boundary |
| --- | --- | --- | --- |
| Vesper | Mint/violet point cloud: orb → galaxy → neural lobes | Local command console, annual/monthly pricing, seat range | 7,000 particles, no real inference or financial service |
| Soda | Lathed metallic can, canvas label, condensation, fruit orbit | Three flavors, burst, 12/24-can mix, cart count | Local demo cart only, no checkout or health claim |
| Kimi / GRIDO1 | Metallic helmet with wireframe reveal and number treatment | SVG lap scrubber, speed/gear/G-force, run-one-lap | No licensed portrait, real standings, or official endorsement |
| Stride | Tilted titanium card and blue light filament | Fixed FX demo, spending limit, masked card suffix | No financial accounts, real rates, yield, or payments |
| AI Studio | Reflective eight-point chrome star | Three project briefs, creative pipeline steps | No real films, client work, or generated audio |
| Creative Director | Crimson GLSL molten field and editorial case index | Eight keyboard-accessible case-study dialogs | Fictional person/projects; no borrowed awards |
| Dantora | Green helix tubes, base pairs, and particle mist | Four sample markers with different ranges/units | No diagnosis, clinical percentile, doctor credentials, or treatment |
| Clarix | Depth-buffered ASCII torus | Density, three code languages, local deployment sequence | No backend; source CLI explicitly unverified and not executed |
| Relay | Perspective workflow window with connected DOM nodes | Four-step runner and 10k–10M event pricing | No actual payment, notification, webhook, or ledger |
| Lumora | Warm procedural light field with asymmetric work grid | Two case studies, capability disclosures, Amsterdam clock | Fictional studio and projects |
| Laocoon | Abstract articulated figures and intertwined serpent tubes | Material, lighting, and accessible orbit controls | Not an archaeological scan; no museum affiliation |
| Baseline | Perspective court, net, and animated ball | Three surfaces, academy inquiry, membership concepts | No real coach, calendar, fee, or booking |
| Ascend | Locally painted Earth, atmosphere, arcs, and region marker | Region explorer, simulated benchmark, SDK tabs, usage calculator | Stylized geography, no live edge network or deployment |

## 4. Source vs generated output

`tools/catalog.py` is the authored content source. It contains site-specific content, section composition, theme CSS, mechanisms, explicit limitations, and acceptance contracts. `tools/build.py` deterministically emits the 13 HTML entries, per-site theme CSS, methodology pages, README/adapted-prompt/build-log documents, gallery, and manifest.

Shared CSS, scene code, interaction code, gallery code, and review/validation documents are authored directly. They are not overwritten by the generator. The generated files are checked in so Pages can serve the collection without a JavaScript build step, and a reviewer can inspect semantic content immediately. CI regenerates and verifies the generated tree does not drift from its authoring source.

A site cannot be copied out of its folder in isolation: it uses `../../shared/`. To distribute one site independently, retain the directory hierarchy or copy/update those references. This is documented explicitly instead of calling each folder self-contained.

## 5. Runtime architecture

- **Static HTML first:** one real `h1`, descriptive sections, working anchors, native controls, and documentation before JavaScript runs.
- **Local ES modules:** Three.js 0.165.0 is vendored once. No import-map CDN, remote font CSS, runtime fetch, analytics, storage, or backend.
- **One rendering clock:** delta cap of 32 ms; spring tension 180/friction 24; DPR capped at 1.6. ASCII and WebGL use the same page scheduler.
- **Lifecycle:** ResizeObserver refreshes projection and drawing size; IntersectionObserver stops offscreen continuous work; hidden tabs suspend; reduced-motion starts in still mode; the footer can pause or resume motion.
- **Direct interaction:** range changes, flavor/material selection, pointer updates, and scroll progress can request a still frame even while automatic animation is paused. No scroll hijacking or custom cursor is required.
- **Fallback:** a CSS light-field plate remains visible when WebGL initialization fails. A context-loss handler restores that plate. Text and controls are not inside the canvas.
- **Privacy:** inquiry data is held only in native inputs, reset after the demonstration, and never persisted or sent. Browser-native validity is used; no private information should be entered.

## 6. Local asset provenance and licenses

| Asset | Source | License / treatment |
| --- | --- | --- |
| `shared/vendor/three.module.min.js` | npm `three@0.165.0` | MIT; license included as `THREE-LICENSE.txt` |
| Geist 400/600 WOFF2 | npm `@fontsource/geist@5.2.6` | Font package license included as `GEIST-LICENSE.txt` |
| Syne 800 WOFF2 | npm `@fontsource/syne@5.2.6` | Font package license included as `SYNE-LICENSE.txt` |
| Cormorant Garamond 500 WOFF2 | npm `@fontsource/cormorant-garamond@5.2.5` | Font package license included as `CORMORANT-LICENSE.txt` |
| All model geometry | Authored mathematical construction in `shared/scenes.js` | Original implementation; repository license applies |
| Can/card/environment/globe textures | Canvas2D generated in `shared/scenes.js` | Original artwork; no downloaded photograph or map dataset |
| Project plates and court plan | Authored CSS | Original abstract artwork, not reference campaign assets |
| `previews/*.webp` | Playwright captures of these implementations | Actual rendered site previews, not reference screenshots |
| Source briefs | Existing repository archive | Preserved as source context; no new commercial asset rights inferred |

`npm run assets` reproduces vendored runtime assets from the exact lockfile. Browser-test tooling stays in `node_modules` and is never published. Tool dependencies are all development-only; `npm audit` results are recorded with validation.

## 7. Reproducible commands

```sh
# Repository root — serve all relative paths correctly
python3 -m http.server 8080 --bind 0.0.0.0

# In another terminal
cd getlayersai
npm ci
python3 tools/build.py
python3 tools/verify.py
npm test

# Optional: refresh real gallery preview screenshots (requires npm dev tools)
UPDATE_PREVIEWS=1 npm test

# Optional: restore runtime libraries/fonts from exact npm package versions
npm run assets

# Repository root — build and assemble all existing and new websites
bash scripts/build-site.sh
```

The browser test defaults to `http://localhost:8080/getlayersai`. Override `BASE_URL` to test an assembled or prefixed tree. This localhost URL is only for the test runner in the server environment; no browser-facing application code calls localhost. `CHROMIUM_PATH` can select an installed browser; otherwise the pinned npm-distributed Chromium is extracted. `SITES=vesper,soda` runs a targeted diagnostic subset; the default checks the whole collection.

Browser screenshots and machine-readable results go to `getlayersai/.cache/` (ignored). Only optimized gallery previews are committed. CI uploads test evidence as a seven-day artifact.

## 8. Publication and inspection

One project-level Pages deployment exposes `/getlayersai/` and `/getlayersai/sites/<slug>/`. Each site links back to the gallery, its HTML methodology, and source folder. The root showcase links the collection without replacing its existing content.

The static assembler explicitly copies the runtime collection, Markdown documentation, source briefs, and gallery previews. It excludes npm tools, browser binaries, caches, test scripts, and authoring scripts. Existing Vite apps still publish their built `dist` output. The new browser job is a prerequisite of the deployment build.

## 9. Known limits

Automated accessibility checks are not a screen-reader certification. GPU performance needs real-device profiling. Visual fidelity cannot be scored without access to the original reference media. The demos do not implement APIs, persistence, payments, actual diagnoses, official racing data, or real commercial service provisioning. A production launch would require domain ownership, branding/asset rights review, backend design, privacy requirements, security review, and domain-specific legal review.
