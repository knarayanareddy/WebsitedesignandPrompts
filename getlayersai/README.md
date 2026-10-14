# GetLayers AI — Website Design Prompts & REA Reverse-Engineering Archive

This directory (`getlayersai/`) contains the complete collection of website build prompts, UI template frameworks, procedural WebGL shaders, and architectural specifications extracted from [GetLayers AI](https://www.getlayers.ai/) using [REA (Reverse Engineer Anything)](https://github.com/morluto/rea).

---

## Built collection — 13 featured sites

**[Open the live gallery](https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai/)** ·
[Local gallery](./index.html) · [Review](./REVIEW.md) · [Implementation](./IMPLEMENTATION.md) · [Validation](./VALIDATION.md)

The featured deep-dive briefs have been implemented as independent, interactive static sites.
Each folder includes a README, adapted prompt, build log, and browser-readable methodology.
They are text-brief adaptations with original procedural artwork, not pixel-identical replicas.

| Website | Preview route | Documentation |
| --- | --- | --- |
| Vesper | [Open](./sites/vesper/) | [Methodology](./sites/vesper/methodology.html) · [README](./sites/vesper/README.md) |
| Soda | [Open](./sites/soda/) | [Methodology](./sites/soda/methodology.html) · [README](./sites/soda/README.md) |
| GRIDO1 | [Open](./sites/kimi/) | [Methodology](./sites/kimi/methodology.html) · [README](./sites/kimi/README.md) |
| Stride | [Open](./sites/stride/) | [Methodology](./sites/stride/methodology.html) · [README](./sites/stride/README.md) |
| AI.STUDIO | [Open](./sites/ai-studio/) | [Methodology](./sites/ai-studio/methodology.html) · [README](./sites/ai-studio/README.md) |
| ALEX / MORGAN | [Open](./sites/creative-director/) | [Methodology](./sites/creative-director/methodology.html) · [README](./sites/creative-director/README.md) |
| dantora | [Open](./sites/dantora/) | [Methodology](./sites/dantora/methodology.html) · [README](./sites/dantora/README.md) |
| clarix_ | [Open](./sites/clarix/) | [Methodology](./sites/clarix/methodology.html) · [README](./sites/clarix/README.md) |
| relay | [Open](./sites/relay/) | [Methodology](./sites/relay/methodology.html) · [README](./sites/relay/README.md) |
| lumora® | [Open](./sites/lumora/) | [Methodology](./sites/lumora/methodology.html) · [README](./sites/lumora/README.md) |
| LAOCOÖN | [Open](./sites/laocoon/) | [Methodology](./sites/laocoon/methodology.html) · [README](./sites/laocoon/README.md) |
| BASELINE | [Open](./sites/baseline/) | [Methodology](./sites/baseline/methodology.html) · [README](./sites/baseline/README.md) |
| ascend | [Open](./sites/ascend/) | [Methodology](./sites/ascend/methodology.html) · [README](./sites/ascend/README.md) |

The remaining 41 catalog prompts are not implemented in this batch. For local viewing, serve the repository root with `python3 -m http.server 8080 --bind 0.0.0.0` and visit `/getlayersai/`.

---

## Core Prompt Documents

| Document | Purpose |
| :--- | :--- |
| [**`00-GETLAYERS-OVERVIEW-AND-REA-ANALYSIS.md`**](./00-GETLAYERS-OVERVIEW-AND-REA-ANALYSIS.md) | How REA (`morluto/rea`) was used to de-obfuscate Next.js Server Actions and extract prompt structures. |
| [**`01-STARTER-WORKFLOW-AND-DESIGN-VAULT.md`**](./01-STARTER-WORKFLOW-AND-DESIGN-VAULT.md) | Next.js 16 + Claude Starter & Obsidian AI Design Vault system prompts. |
| [**`02-KIMI-F1-RACING-SYSTEMS.md`**](./02-KIMI-F1-RACING-SYSTEMS.md) | Deep-dive prompt: **Kimi Antonelli / GRIDO1 Racing Systems**. |
| [**`03-SODA-3D-INTERACTIVE-HERO.md`**](./03-SODA-3D-INTERACTIVE-HERO.md) | Deep-dive prompt: **Soda** 3D interactive can experience. |
| [**`04-VESPER-SAAS-LIVING-ORB.md`**](./04-VESPER-SAAS-LIVING-ORB.md) | Deep-dive prompt: **Vesper** dark luxe SaaS living orb & galaxy interface. |
| [**`05-STRIDE-FINTECH-MOMENTUM.md`**](./05-STRIDE-FINTECH-MOMENTUM.md) | Deep-dive prompt: **Stride** fintech banking momentum experience. |
| [**`06-AI-STUDIO-CINEMATIC.md`**](./06-AI-STUDIO-CINEMATIC.md) | Deep-dive prompt: **AI Studio** turning chrome star agency site. |
| [**`07-CREATIVE-DIRECTOR-PORTFOLIO.md`**](./07-CREATIVE-DIRECTOR-PORTFOLIO.md) | Deep-dive prompt: **Creative Director** molten lava-lamp portfolio. |
| [**`08-DANTORA-BIOTECH-CLINIC.md`**](./08-DANTORA-BIOTECH-CLINIC.md) | Deep-dive prompt: **Dantora** bioluminescent double-helix clinic. |
| [**`09-CLARIX-HOLOGRAPHIC-ASCII.md`**](./09-CLARIX-HOLOGRAPHIC-ASCII.md) | Deep-dive prompt: **Clarix** holographic ASCII 3D developer platform. |
| [**`10-RELAY-WORKFLOW-AUTOMATION.md`**](./10-RELAY-WORKFLOW-AUTOMATION.md) | Deep-dive prompt: **Relay** black & lime light-stream workflow automation. |
| [**`11-LUMORA-DESIGN-ENGINEERING.md`**](./11-LUMORA-DESIGN-ENGINEERING.md) | Deep-dive prompt: **Lumora** minimalist design & engineering studio. |
| [**`12-LAOCOON-WEBGL-SCULPTURE.md`**](./12-LAOCOON-WEBGL-SCULPTURE.md) | Deep-dive prompt: **Laocoon** bronze sculpture WebGL orbital homage. |
| [**`13-BASELINE-TENNIS-CLUB.md`**](./13-BASELINE-TENNIS-CLUB.md) | Deep-dive prompt: **Baseline** championship tennis club & academy. |
| [**`14-ASCEND-LIVING-EARTH-SAAS.md`**](./14-ASCEND-LIVING-EARTH-SAAS.md) | Deep-dive prompt: **Ascend** rotating 3D Earth SaaS platform. |
| [**`15-UI-TEMPLATES-LIBRARY-PROMPTS.md`**](./15-UI-TEMPLATES-LIBRARY-PROMPTS.md) | All **10 modular UI layout templates** (*Spotlight*, *Bento*, *Showcase*, *Atelier*, *Split lab*, *Exhibit*, *Lookbook*, *Logo wall*, *Festival*, *Field notes*). |
| [**`16-PROCEDURAL-SHADERS-AND-SCENES-PROMPTS.md`**](./16-PROCEDURAL-SHADERS-AND-SCENES-PROMPTS.md) | **5 pure-WebGL pointer-reactive shaders** (*Soffit*, *Flue*, *Gnomon*, *Astragal*, *Airlight*). |
| [**`17-FULL-CATALOG-54-WEBSITES.md`**](./17-FULL-CATALOG-54-WEBSITES.md) | Single-file master index of all 54 websites and their prompts. |
| [**`all_templates.json`**](./all_templates.json) | Raw JSON dataset of all 54 templates extracted from GetLayers AI. |

---

## Individual Website Template Prompts (`./templates/`)

Every website template also has its own standalone markdown file inside [`./templates/`](./templates/):

| # | ID & Link | Title | Tier | Stack | Tone & Mood |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [`vesper`](./templates/01-vesper.md) | **Vesper** | Premium | `landing page, threejs, nextjs` | dark (technical, luxe) |
| 2 | [`stride`](./templates/02-stride.md) | **Stride** | Premium | `landing page, threejs, nextjs` | light (brutal, playful) |
| 3 | [`ai-studio`](./templates/03-ai-studio.md) | **AI Studio** | Premium | `landing page, threejs, nextjs` | light (luxe, technical) |
| 4 | [`creative-director`](./templates/04-creative-director.md) | **Creative Director** | Premium | `landing page, nextjs` | dark (playful, luxe) |
| 5 | [`dantora`](./templates/05-dantora.md) | **Dantora** | Premium | `landing page, threejs, nextjs` | light (calm, organic) |
| 6 | [`clarix`](./templates/06-clarix.md) | **Clarix** | Premium | `landing page, threejs` | light (luxe, organic) |
| 7 | [`relay`](./templates/07-relay.md) | **Relay** | Premium | `landing page, threejs, nextjs` | dark (technical, calm) |
| 8 | [`artefakt`](./templates/08-artefakt.md) | **Artefakt** | Premium | `landing page, threejs, nextjs` | dark (technical, luxe) |
| 9 | [`brewns`](./templates/09-brewns.md) | **Brewns** | Premium | `landing page, threejs, nextjs` | dark (luxe, organic) |
| 10 | [`house`](./templates/10-house.md) | **House** | Premium | `landing page, nextjs` | dark (luxe, calm) |
| 11 | [`flora`](./templates/11-flora.md) | **Flora** | Premium | `landing page, threejs, nextjs` | dark (organic, technical) |
| 12 | [`wanderlust`](./templates/12-wanderlust.md) | **Wanderlust** | Premium | `landing page, nextjs` | dark (organic, luxe) |
| 13 | [`halden`](./templates/13-halden.md) | **Halden** | Premium | `landing page, nextjs` | light (luxe, calm) |
| 14 | [`longplay`](./templates/14-longplay.md) | **Longplay** | Premium | `hero, threejs, nextjs` | light (organic, calm) |
| 15 | [`new-era`](./templates/15-new-era.md) | **New Era** | Premium | `landing page, threejs, nextjs` | dark (technical, organic) |
| 16 | [`ridgeline`](./templates/16-ridgeline.md) | **Ridgeline** | Premium | `landing page, nextjs` | light (calm, technical) |
| 17 | [`ai-creator`](./templates/17-ai-creator.md) | **AI Creator** | Premium | `landing page, threejs, nextjs` | light (luxe, technical) |
| 18 | [`codescan`](./templates/18-codescan.md) | **Codescan** | Premium | `landing page, threejs, nextjs` | dark (technical, brutal) |
| 19 | [`northwall`](./templates/19-northwall.md) | **Northwall** | Premium | `landing page, nextjs` | dark (luxe, technical) |
| 20 | [`auralis`](./templates/20-auralis.md) | **Auralis** | Premium | `landing page, threejs, nextjs` | light (calm, luxe, technical) |
| 21 | [`aerra`](./templates/21-aerra.md) | **Aerra** | Premium | `landing page, threejs, nextjs` | light (calm, luxe) |
| 22 | [`altitude`](./templates/22-altitude.md) | **Altitude** | Premium | `hero, nextjs` | dark (luxe, calm) |
| 23 | [`lumea`](./templates/23-lumea.md) | **Lumea** | Premium | `hero, threejs, nextjs` | dark (calm, luxe) |
| 24 | [`forma`](./templates/24-forma.md) | **Forma** | Premium | `hero, nextjs` | light (luxe, calm) |
| 25 | [`evolve`](./templates/25-evolve.md) | **Evolve** | Premium | `hero, threejs, nextjs` | dark (technical, luxe) |
| 26 | [`fromzero`](./templates/26-fromzero.md) | **Fromzero** | Premium | `hero, threejs, nextjs` | dark (technical, calm) |
| 27 | [`noema`](./templates/27-noema.md) | **Noema** | Premium | `hero, nextjs` | dark (luxe, technical, calm) |
| 28 | [`helion`](./templates/28-helion.md) | **Helion** | Premium | `landing page, threejs, nextjs` | dark (technical, luxe) |
| 29 | [`lumen`](./templates/29-lumen.md) | **Lumen** | Premium | `hero, threejs, nextjs` | dark (luxe) |
| 30 | [`negantropy`](./templates/30-negantropy.md) | **Negantropy** | Premium | `landing page, threejs, nextjs` | dark (organic, technical, luxe) |
| 31 | [`stride-nine`](./templates/31-stride-nine.md) | **Stride Nine** | Premium | `hero, nextjs` | dark (brutal, technical) |
| 32 | [`vexon`](./templates/32-vexon.md) | **Vexon** | Premium | `hero, threejs, react` | dark (technical, luxe) |
| 33 | [`voxelia`](./templates/33-voxelia.md) | **Voxelia** | Premium | `hero, threejs, nextjs` | dark (playful, technical) |
| 34 | [`gring-x`](./templates/34-gring-x.md) | **GringX** | Premium | `hero, threejs, nextjs` | dark (technical) |
| 35 | [`stackside`](./templates/35-stackside.md) | **Stackside** | Premium | `hero, nextjs` | light (brutal, luxe) |
| 36 | [`creative-studio`](./templates/36-creative-studio.md) | **Creative Studio** | Premium | `hero, threejs, nextjs` | dark (luxe, playful) |
| 37 | [`dringle`](./templates/37-dringle.md) | **Dringle** | Premium | `hero, threejs, nextjs` | light (luxe) |
| 38 | [`cortex`](./templates/38-cortex.md) | **Cortex** | Premium | `hero, threejs, nextjs` | dark (technical) |
| 39 | [`halcyon`](./templates/39-halcyon.md) | **Halcyon** | Premium | `landing page, threejs, nextjs` | light (luxe, calm) |
| 40 | [`neural-monitor`](./templates/40-neural-monitor.md) | **Neural Monitor** | Premium | `landing page, threejs, nextjs` | dark (technical) |
| 41 | [`clair`](./templates/41-clair.md) | **Clair** | Premium | `hero, threejs, nextjs` | dark (brutal, technical) |
| 42 | [`soda`](./templates/42-soda.md) | **Soda** | Free | `hero` | dark (organic, playful) |
| 43 | [`kimi`](./templates/43-kimi.md) | **Kimi** | Free | `landing page, threejs, nextjs` | light (technical, luxe) |
| 44 | [`lumora`](./templates/44-lumora.md) | **Lumora** | Free | `landing page, nextjs` | light (luxe) |
| 45 | [`laocoon`](./templates/45-laocoon.md) | **Laocoon** | Free | `landing page, threejs` | dark (luxe, organic) |
| 46 | [`baseline`](./templates/46-baseline.md) | **Baseline** | Free | `landing page, nextjs` | light (luxe, calm) |
| 47 | [`loopstack`](./templates/47-loopstack.md) | **Loopstack** | Free | `hero` | dark (luxe, organic) |
| 48 | [`ascend`](./templates/48-ascend.md) | **Ascend** | Free | `landing page, threejs, react` | dark (technical, luxe) |
| 49 | [`flowstate`](./templates/49-flowstate.md) | **Flowstate** | Free | `hero, nextjs` | dark (organic, luxe) |
| 50 | [`marcus-vane`](./templates/50-marcus-vane.md) | **Marcus Vane** | Free | `landing page, nextjs` | dark (luxe, brutal) |
| 51 | [`gravity-webgl`](./templates/51-gravity-webgl.md) | **Gravity** | Free | `landing page, threejs, react` | light (playful, luxe) |
| 52 | [`artist`](./templates/52-artist.md) | **Kai Nomura** | Free | `landing page, nextjs` | light (luxe) |
| 53 | [`kumo`](./templates/53-kumo.md) | **Kumo** | Premium | `hero, nextjs` | light (calm, organic) |
| 54 | [`held-mint`](./templates/54-held-mint.md) | **Held-Mint** | Premium | `landing page, nextjs` | dark (brutal, playful) |
