# GetLayers AI & REA Reverse-Engineering Report

This collection contains prompts and architectural blueprints to build high-end, cinematic, animation-rich websites sourced and reverse-engineered from [GetLayers AI](https://www.getlayers.ai/) using [REA (Reverse Engineer Anything)](https://github.com/morluto/rea).

---

## 1. How REA Was Used

[REA (morluto/rea)](https://github.com/morluto/rea) is a reverse-engineering toolkit and MCP provider for analyzing binaries, Electron apps, and JavaScript web bundles.

### Analysis Steps Executed:
1. **JavaScript Bundle Extraction**:
   Captured and parsed the Next.js production client chunks (`00lwrpf20me7x.js`, `0b~jayw_3hgb-.js`, `0ik7wh9ieb593.js`, `0sh.--lbpzm2x.js`, `0esw841ax7orw.js`, `0d98l4cmxld5m.js`, etc.).
2. **Static AST & Application Graph Reconstruction**:
   Executed REA's JavaScript application analyzer:
   ```bash
   rea analyze-javascript-application /scratch/chunks --format json --full-output
   ```
   REA mapped module dependencies, sealed the application graph (`JavaScriptApplicationGraph`), and identified client-server boundaries.
3. **Server Action De-obfuscation**:
   REA isolated Next.js Server Action references created via `createServerReference`:
   - `composeLayerPromptAction`: Action ID `403e3778190791480886c3d2fbaaa522b18888e573` — Generates website build prompts for full page templates and heroes.
   - `getGradientPromptAction`: Action ID `601a685667a4b21e21252ebb7eb5e6592930f9577d` — Generates full prompts combining WebGL shaders with UI template layers.
   - `getBackgroundPromptAction`: Action ID `70a7c73262ba5ebbea348093f4414ccc5a099ee2e5` — Generates video/canvas background prompts.
   - `getScenePanelAction`: Action ID `40003b46a890d36c57e175e311bca6d56538b25a72` — Generates 3D scene parameter controls.
   - `searchLibraryAction`: Action ID `40d134ff3f6dacacc4c60969ccd331a21fbaa8e2b3` — Real-time catalog search.
4. **Access Control & Fingerprinting Discovery**:
   - `canAccessLayerPrompt`: Gates prompts based on user subscription tier (`Free` vs `Premium`).
   - `collectClientFingerprintSignals`: Unpacked the 6-factor hardware fingerprint (`timeZone|widthxheightxcolorDepth|languages|platform|hardwareConcurrency|deviceMemory`) used for rate-limiting.

---

## 2. GetLayers AI Prompt Architecture

Every website prompt created by GetLayers follows a strict creative engineering standard:

1. **Target Architecture**: Single self-contained `index.html` file (or Next.js 16 + Three.js project).
2. **External Dependencies**: Minimized strictly to core rendering engines (Three.js via ESM/CDN, Lenis for inertia scroll). Zero heavy UI frameworks.
3. **Custom Motion Engine**: Pure TypeScript/JavaScript spring physics solver (`tension`, `friction`, `velocity`, `mass`), eliminating CSS keyframe rigidity.
4. **WebGL & Shaders**: Procedural GLSL shaders for glowing orbs, light filaments, particles, halftone rasterizers, and noise displacement.
5. **Micro-Interactions**: Magnetic hover vectors, cursor velocity calculations, glassmorphism refractions, and responsive layout adaptations.

---

## 3. Directory Contents

- [01-STARTER-WORKFLOW-AND-DESIGN-VAULT.md](./01-STARTER-WORKFLOW-AND-DESIGN-VAULT.md): Next.js 16 Claude Starter & Obsidian Design Vault system prompts.
- [02-KIMI-F1-RACING-SYSTEMS.md](./02-KIMI-F1-RACING-SYSTEMS.md): Full prompt for Kimi Antonelli / GRIDO1 F1 telemetry racing site.
- [03-SODA-3D-INTERACTIVE-HERO.md](./03-SODA-3D-INTERACTIVE-HERO.md): Full prompt for Soda interactive 3D can experience.
- [04-VESPER-SAAS-LIVING-ORB.md](./04-VESPER-SAAS-LIVING-ORB.md): Full prompt for Vesper SaaS dark luxe living orb platform.
- [05-STRIDE-FINTECH-MOMENTUM.md](./05-STRIDE-FINTECH-MOMENTUM.md): Full prompt for Stride modern fintech banking experience.
- [06-AI-STUDIO-CINEMATIC.md](./06-AI-STUDIO-CINEMATIC.md): Full prompt for AI Studio creative agency experience.
- [07-CREATIVE-DIRECTOR-PORTFOLIO.md](./07-CREATIVE-DIRECTOR-PORTFOLIO.md): Full prompt for Creative Director lava-lamp molten red portfolio.
- [08-DANTORA-BIOTECH-CLINIC.md](./08-DANTORA-BIOTECH-CLINIC.md): Full prompt for Dantora green double-helix medical platform.
- [09-CLARIX-HOLOGRAPHIC-ASCII.md](./09-CLARIX-HOLOGRAPHIC-ASCII.md): Full prompt for Clarix holographic ASCII SaaS tour.
- [10-RELAY-WORKFLOW-AUTOMATION.md](./10-RELAY-WORKFLOW-AUTOMATION.md): Full prompt for Relay black & lime light-stream automation.
- [11-LUMORA-DESIGN-ENGINEERING.md](./11-LUMORA-DESIGN-ENGINEERING.md): Full prompt for Lumora independent studio site.
- [12-LAOCOON-WEBGL-SCULPTURE.md](./12-LAOCOON-WEBGL-SCULPTURE.md): Full prompt for Laocoon bronze sculpture homage.
- [13-BASELINE-TENNIS-CLUB.md](./13-BASELINE-TENNIS-CLUB.md): Full prompt for Baseline members' tennis club & academy.
- [14-ASCEND-LIVING-EARTH-SAAS.md](./14-ASCEND-LIVING-EARTH-SAAS.md): Full prompt for Ascend rotating Earth SaaS landing.
- [15-UI-TEMPLATES-LIBRARY-PROMPTS.md](./15-UI-TEMPLATES-LIBRARY-PROMPTS.md): Prompts for all 10 modular UI layout overlays.
- [16-PROCEDURAL-SHADERS-AND-SCENES-PROMPTS.md](./16-PROCEDURAL-SHADERS-AND-SCENES-PROMPTS.md): Prompts for pure WebGL procedural shader backdrops.
- [17-FULL-CATALOG-54-WEBSITES.md](./17-FULL-CATALOG-54-WEBSITES.md): Complete catalog and prompt specification for all 54 GetLayers websites.
