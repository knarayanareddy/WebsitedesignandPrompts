# Scrolltide (`scrolltide.co`) — Website Prompts, Templates, Components, Shaders & Academy

Extracted and reverse-engineered from **[scrolltide.co](https://www.scrolltide.co/)** using [`morluto/rea`](https://github.com/morluto/rea) (`rea-agents`, Evidence ID: `ev_d93dcd3efa3e0c20fcef8eff500c8801fe36e58dcb5ecd27560b11762cd716ac`, 24 Next.js Turbopack chunks analyzed).

---

## 📊 Summary of Extracted Assets (268 Markdown Files)

| Category | Count | Folder | Description |
| :--- | :---: | :--- | :--- |
| **Free Verbatim Source Prompts** | **4** | [`./free-templates/`](./free-templates/) | 100% verbatim pixel-for-pixel one-shot rebuild prompts fetched via `POST /api/copy` (`glacier`, `fluxora`, `monsoon`, `aurora`, 14 KB–46 KB each). |
| **Website Templates** | **119** | [`./templates/`](./templates/) | All 119 scroll-driven website templates (`Landing Page`, `Hero Section`, `Portfolio`, `Ecommerce`, `3D Website`, `Background`) with R2 video URLs (including 48 direct unwatermarked `hero.mp4`/`hero-loop.mp4` assets) and rebuild prompts. |
| **Animated React Components** | **46** | [`./components/`](./components/) | All 46 interactive UI & 3D components (`Button`, `3D`, `Navigation`, `Card`, `Text`, `Input`, `Loader`, `Background`). |
| **WebGL Shader Backgrounds** | **55** | [`./shaders/`](./shaders/) | All 55 GPU shader loops (`Gradient`, `Aurora`, `Metal`, `Halftone`, `Swirl`, `Voronoi`, `Flame`) with `<video>` embed snippets and build prompts. |
| **Landing Page Sections** | **18** | [`./sections/`](./sections/) | All 18 full-width page bands (`Hero`, `Features`, `Pricing`, `Contact`, `CTA`, `Footer`, `Testimonials`, `FAQ`, `Gallery`, `Navigation`). |
| **Dashboard & App UI Screens** | **14** | [`./ui-screens/`](./ui-screens/) | All 14 application screens (`Dashboard`, `Finance`, `Commerce`, `Health`, `People`, `Projects`, `Property`, `Media`). |
| **Scrolltide Academy Tutorials** | **11** | [`./academy/`](./academy/) | All 11 full step-by-step video/text lessons (including Google Antigravity, Claude Code, 300-frame scroll scrubbing, 3D portals, and spotlight hover reveals). |
| **Prompt to Motion eBook Sheets** | **1** | [`./ebook-prompt-sheets/`](./ebook-prompt-sheets/) | Extracted standing anti-slop instructions (`Prompt Sheet 02.1`), photographer plate prompt (`Prompt Sheet 08.1`), comp splitter (`Prompt Sheet 09.2`), procedural `Iris.jsx` 3D code, and Scrolltide's own Hero Nebula GLSL shader. |

---

## 🔍 How `scrolltide.co` Works Under the Hood (REA Architecture Report)

1. **Framework & Bundler**:
   - Next.js App Router (Turbopack deployment `dpl_74nLkF7qj4yraeuT4zr6Aj7imbiz`) hosted on Vercel with **Cloudflare R2** (`https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev`) serving preview recordings (`/previews/<slug>.mp4`), posters (`/previews/<slug>-poster.jpg`), and unwatermarked template hero videos (`/templates/<slug>/hero.mp4` and `/prompt-assets/<slug>/hero-loop.mp4`).
2. **API & Entitlement Architecture (`0oezn9h93dfm7.js`, `2yft29rkjovbn.js`, `3byc2bnoaker8.js`)**:
   - **Catalog Delivery**: All 252 catalog items (`119` templates, `46` components, `55` shaders, `18` sections, `14` UI screens) are serialized into Next.js Flight RSC payloads (`self.__next_f.push`), while `promptContent` and `codeContent` are stripped to `""` on SSR.
   - **Prompt & Source Retrieval**: Clicking "Copy prompt" or "Download source" triggers `POST /api/copy` (`{ slug, what: "prompt" | "code" }`), `POST /api/download-source` (`{ slug }`), or `POST /api/shader-asset` (`{ slug, asset: "1080" | "720" | "480" | "still" }`).
   - **Authentication & Tier Gating**: Managed via an `HS256` JWT cookie (`st_user`, audience `st:user`) issued by Next.js Server Action `604e82c48d4ba4bbcfc15f46cb12feffe5d67a728a` using React Flight `FormData` reply encoding (`_1_email`, `_1_password`, `_1_next`, `0: [{}, "$K1"]`).
   - **Tiers**: `free` (unlimited copies of free templates when signed in; 1 copy anonymous), `paid` (Monthly/Yearly/Lifetime core library, with Monthly capped at `MONTHLY_WEEKLY_UNLOCK_LIMIT = 10` new unlocks/week), and `pro` (Yearly & Lifetime only — required for `3D` templates, `components`, `shaders`, and `ui` screens).

---

## ⭐ Free Verbatim One-Shot Rebuild Prompts (`./free-templates/`)

| Template | Category | Prompt Size | Direct Unwatermarked R2 Video | File |
| :--- | :--- | :---: | :--- | :--- |
| **Glacier** | Hero Section | 18.7 KB (380 lines) | [`templates/glacier/hero.mp4`](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/glacier/hero.mp4) | [`free-templates/glacier.md`](./free-templates/glacier.md) |
| **Fluxora** | Landing Page | 46.3 KB (1,075 lines) | [`prompt-assets/fluxora/hero-loop.mp4`](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/fluxora/hero-loop.mp4) | [`free-templates/fluxora.md`](./free-templates/fluxora.md) |
| **Monsoon** | Hero Section | 13.7 KB (301 lines) | [`templates/monsoon/hero.mp4`](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/monsoon/hero.mp4) | [`free-templates/monsoon.md`](./free-templates/monsoon.md) |
| **Aurora** | Hero Section | 15.2 KB (318 lines) | [`templates/aurora/hero.mp4`](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aurora/hero.mp4) | [`free-templates/aurora.md`](./free-templates/aurora.md) |

---

## 🎓 Scrolltide Academy Tutorials (`./academy/`)

| # | Lesson Title | YouTube | File |
| :---: | :--- | :--- | :--- |
| 01 | **Build $5,000 Animated Websites with Claude Opus 5 (Full Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=f9nw5RgtN40) | [`academy/01-300-frame-scroll-character-site-claude-code.md`](./academy/01-300-frame-scroll-character-site-claude-code.md) |
| 02 | **Build INSANE Jaw-Dropping 3D Websites (Claude + ChatGPT)** | [Watch ↗](https://www.youtube.com/watch?v=lOHHabby8LI) | [`academy/02-3d-portal-scroll-website-claude-code.md`](./academy/02-3d-portal-scroll-website-claude-code.md) |
| 03 | **Build $10,000 Websites Using Claude Code and ChatGPT in 10 mins (Full Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=F_b23FL4IfY) | [`academy/03-ai-generated-video-hero-section-claude-code.md`](./academy/03-ai-generated-video-hero-section-claude-code.md) |
| 04 | **Build a 3D Interactive Website step-by-step using Claude Code + ChatGPT Images (Full Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=GLs8HfvgIo8) | [`academy/04-build-3d-interactive-website-claude-code.md`](./academy/04-build-3d-interactive-website-claude-code.md) |
| 05 | **Steal These Immersive AI Website Designs | Just Copy, Paste & Build** | [Watch ↗](https://www.youtube.com/watch?v=VlEDuJIvu7U) | [`academy/05-build-an-animated-website-from-one-prompt.md`](./academy/05-build-an-animated-website-from-one-prompt.md) |
| 06 | **Building Beautiful $2000 Websites with Google Antigravity for FREE** | [Watch ↗](https://www.youtube.com/watch?v=mgQFT-50ZVk) | [`academy/06-build-animated-websites-free-google-antigravity.md`](./academy/06-build-animated-websites-free-google-antigravity.md) |
| 07 | **Build $5000 Animated Websites using AI (Full Tutorial | Claude Code)** | [Watch ↗](https://www.youtube.com/watch?v=kbH_YbBgnK4) | [`academy/07-perfect-loop-ai-video-scroll-frames.md`](./academy/07-perfect-loop-ai-video-scroll-frames.md) |
| 08 | **Claude Opus 5 Builds insane 3D Websites in Minutes** | [Watch ↗](https://www.youtube.com/watch?v=b5qiUREeURU) | [`academy/08-procedural-3d-website-no-models-claude-code.md`](./academy/08-procedural-3d-website-no-models-claude-code.md) |
| 09 | **I Built an Award-Winning Website in 9 Minutes using Claude Code (Full Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=DTdogL3GKm0) | [`academy/09-scroll-scrubbing-animation-claude-code-gemini.md`](./academy/09-scroll-scrubbing-animation-claude-code-gemini.md) |
| 10 | **I Built a $2000 Interactive Website using Claude Code (Easy Full Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=PniYeGLdRKw) | [`academy/10-spotlight-hover-reveal-effect-claude-code.md`](./academy/10-spotlight-hover-reveal-effect-claude-code.md) |
| 11 | **Claude Opus 5 Just Changed Web Design Forever! (Full Claude Code Tutorial)** | [Watch ↗](https://www.youtube.com/watch?v=dSIVC9br7v8) | [`academy/11-switching-ai-tools-mid-build-hover-reveal.md`](./academy/11-switching-ai-tools-mid-build-hover-reveal.md) |

---

## 🖥️ Website Templates (119) — [`./templates/`](./templates/)

| # | Name | Category | Tier | Direct Hero Video | Prompt File |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 001 | **Earshot** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/earshot.mp4) | [`templates/001-earshot.md`](./templates/001-earshot.md) |
| 002 | **Firnlight** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/firnlight.mp4) | [`templates/002-firnlight.md`](./templates/002-firnlight.md) |
| 003 | **KAEL-9** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/kael-9.mp4) | [`templates/003-kael-9.md`](./templates/003-kael-9.md) |
| 004 | **Agrumi** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/agrumi.mp4) | [`templates/004-agrumi.md`](./templates/004-agrumi.md) |
| 005 | **SYKÉA** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/sykea.mp4) | [`templates/005-sykea.md`](./templates/005-sykea.md) |
| 006 | **NAÏADE** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/naiade.mp4) | [`templates/006-naiade.md`](./templates/006-naiade.md) |
| 007 | **Macaw** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/macaw.mp4) | [`templates/007-macaw.md`](./templates/007-macaw.md) |
| 008 | **Gummy Grove** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gummy-grove.mp4) | [`templates/008-gummy-grove.md`](./templates/008-gummy-grove.md) |
| 009 | **Toucan** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/toucan.mp4) | [`templates/009-toucan.md`](./templates/009-toucan.md) |
| 010 | **Whisker Ops** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/whisker-ops.mp4) | [`templates/010-whisker-ops.md`](./templates/010-whisker-ops.md) |
| 011 | **ODDBALL** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/oddball.mp4) | [`templates/011-oddball.md`](./templates/011-oddball.md) |
| 012 | **SELENE** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/selene.mp4) | [`templates/012-selene.md`](./templates/012-selene.md) |
| 013 | **NORDLYS** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nordlys.mp4) | [`templates/013-nordlys.md`](./templates/013-nordlys.md) |
| 014 | **VALMORA** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/valmora.mp4) | [`templates/014-valmora.md`](./templates/014-valmora.md) |
| 015 | **Plinth** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plinth.mp4) | [`templates/015-plinth.md`](./templates/015-plinth.md) |
| 016 | **Aerflora** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aerflora.mp4) | [`templates/016-aerflora.md`](./templates/016-aerflora.md) |
| 017 | **Carrara** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/carrara.mp4) | [`templates/017-carrara.md`](./templates/017-carrara.md) |
| 018 | **NOPAL** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/nopal.mp4) | [`templates/018-nopal.md`](./templates/018-nopal.md) |
| 019 | **Midnight Sun** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/midnight-sun.mp4) | [`templates/019-midnight-sun.md`](./templates/019-midnight-sun.md) |
| 020 | **éclose** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclose.mp4) | [`templates/020-eclose.md`](./templates/020-eclose.md) |
| 021 | **Grana** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grana.mp4) | [`templates/021-grana.md`](./templates/021-grana.md) |
| 022 | **Plum** | Landing Page | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/plum.mp4) | [`templates/022-plum.md`](./templates/022-plum.md) |
| 023 | **Cold Club** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cold-club.mp4) | [`templates/023-cold-club.md`](./templates/023-cold-club.md) |
| 024 | **VIVANT** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vivant.mp4) | [`templates/024-vivant.md`](./templates/024-vivant.md) |
| 025 | **Pouterby** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/pouterby.mp4) | [`templates/025-pouterby.md`](./templates/025-pouterby.md) |
| 026 | **Scowlby** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scowlby.mp4) | [`templates/026-scowlby.md`](./templates/026-scowlby.md) |
| 027 | **Ora** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ora-v2.mp4) | [`templates/027-ora.md`](./templates/027-ora.md) |
| 028 | **Katana** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/katana.mp4) | [`templates/028-katana.md`](./templates/028-katana.md) |
| 029 | **Eagle** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eagle.mp4) | [`templates/029-eagle.md`](./templates/029-eagle.md) |
| 030 | **Grey Wolf** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grey-wolf.mp4) | [`templates/030-grey-wolf.md`](./templates/030-grey-wolf.md) |
| 031 | **Vesper** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vesper.mp4) | [`templates/031-vesper.md`](./templates/031-vesper.md) |
| 032 | **Solis** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/solis.mp4) | [`templates/032-solis.md`](./templates/032-solis.md) |
| 033 | **Colibri** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/colibri.mp4) | [`templates/033-colibri.md`](./templates/033-colibri.md) |
| 034 | **Keelway** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/keelway.mp4) | [`templates/034-keelway.md`](./templates/034-keelway.md) |
| 035 | **Marlin** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/marlin.mp4) | [`templates/035-marlin.md`](./templates/035-marlin.md) |
| 036 | **Vespine** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/vespine.mp4) | [`templates/036-vespine.md`](./templates/036-vespine.md) |
| 037 | **Parrot** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/parrot.mp4) | [`templates/037-parrot.md`](./templates/037-parrot.md) |
| 038 | **Rann Mahal** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/rann-mahal-hq.mp4) | [`templates/038-rann-mahal.md`](./templates/038-rann-mahal.md) |
| 039 | **Mariana** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mariana-hq.mp4) | [`templates/039-mariana.md`](./templates/039-mariana.md) |
| 040 | **Poste** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/poste-hq.mp4) | [`templates/040-poste.md`](./templates/040-poste.md) |
| 041 | **Sanctum** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/sanctum-hq.mp4) | [`templates/041-sanctum.md`](./templates/041-sanctum.md) |
| 042 | **Amble** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/amble-hq.mp4) | [`templates/042-amble.md`](./templates/042-amble.md) |
| 043 | **AeroForce** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aeroforce-hq.mp4) | [`templates/043-aeroforce.md`](./templates/043-aeroforce.md) |
| 044 | **Apogee** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/apogee-hq.mp4) | [`templates/044-apogee.md`](./templates/044-apogee.md) |
| 045 | **Marmalade** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/marmalade-hq.mp4) | [`templates/045-marmalade.md`](./templates/045-marmalade.md) |
| 046 | **Threshold** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/threshold-hq.mp4) | [`templates/046-threshold.md`](./templates/046-threshold.md) |
| 047 | **Synapse** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/synapse.mp4) | [`templates/047-synapse.md`](./templates/047-synapse.md) |
| 048 | **Zephyr** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/zephyr/hero.mp4) | [`templates/048-zephyr.md`](./templates/048-zephyr.md) |
| 049 | **Sentinel** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/sentinel/hero.mp4) | [`templates/049-sentinel.md`](./templates/049-sentinel.md) |
| 050 | **Camera** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/camera.mp4) | [`templates/050-camera.md`](./templates/050-camera.md) |
| 051 | **Helix** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/helix.mp4) | [`templates/051-helix.md`](./templates/051-helix.md) |
| 052 | **Cinder** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cinder.mp4) | [`templates/052-cinder.md`](./templates/052-cinder.md) |
| 053 | **Cortex** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cortex.mp4) | [`templates/053-cortex.md`](./templates/053-cortex.md) |
| 054 | **House** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/house.mp4) | [`templates/054-house.md`](./templates/054-house.md) |
| 055 | **Bottle** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/bottle.mp4) | [`templates/055-bottle.md`](./templates/055-bottle.md) |
| 056 | **Astera** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/astera.mp4) | [`templates/056-astera.md`](./templates/056-astera.md) |
| 057 | **Abyssal** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/abyssal.mp4) | [`templates/057-abyssal.md`](./templates/057-abyssal.md) |
| 058 | **Meristem** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/meristem.mp4) | [`templates/058-meristem.md`](./templates/058-meristem.md) |
| 059 | **Mirage** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mirage.mp4) | [`templates/059-mirage.md`](./templates/059-mirage.md) |
| 060 | **Verdant** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/verdant.mp4) | [`templates/060-verdant.md`](./templates/060-verdant.md) |
| 061 | **Clover** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/clover/hero.mp4) | [`templates/061-clover.md`](./templates/061-clover.md) |
| 062 | **Stillbloom** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/stillbloom.mp4) | [`templates/062-stillbloom.md`](./templates/062-stillbloom.md) |
| 063 | **Deadwax** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/deadwax.mp4) | [`templates/063-deadwax.md`](./templates/063-deadwax.md) |
| 064 | **Lodestar** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/lodestar.mp4) | [`templates/064-lodestar.md`](./templates/064-lodestar.md) |
| 065 | **Obsidia** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/obsidia.mp4) | [`templates/065-obsidia.md`](./templates/065-obsidia.md) |
| 066 | **Orchid** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/orchid/hero.mp4) | [`templates/066-orchid.md`](./templates/066-orchid.md) |
| 067 | **Glacier** | Hero Section | `free` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/glacier/hero.mp4) | [`templates/067-glacier.md`](./templates/067-glacier.md) |
| 068 | **Flying Garden** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/flying-garden/hero.mp4) | [`templates/068-flying-garden.md`](./templates/068-flying-garden.md) |
| 069 | **Dune** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/dune/hero.mp4) | [`templates/069-dune.md`](./templates/069-dune.md) |
| 070 | **Eclipse** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/eclipse/hero.mp4) | [`templates/070-eclipse.md`](./templates/070-eclipse.md) |
| 071 | **Coffee** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/coffee.mp4) | [`templates/071-coffee.md`](./templates/071-coffee.md) |
| 072 | **Nymera** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/nymera/hero-loop.mp4) | [`templates/072-nymera.md`](./templates/072-nymera.md) |
| 073 | **Fluxora** | Landing Page | `free` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/fluxora/hero-loop.mp4) | [`templates/073-fluxora.md`](./templates/073-fluxora.md) |
| 074 | **Halcyon** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/halcyon/hero-loop.mp4) | [`templates/074-halcyon.md`](./templates/074-halcyon.md) |
| 075 | **Spacesis** | Landing Page | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/spacesis.mp4) | [`templates/075-spacesis.md`](./templates/075-spacesis.md) |
| 076 | **Beacon** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/beacon/hero.mp4) | [`templates/076-beacon.md`](./templates/076-beacon.md) |
| 077 | **Billet** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/billet.mp4) | [`templates/077-billet.md`](./templates/077-billet.md) |
| 078 | **Noctis** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/noctis.mp4) | [`templates/078-noctis.md`](./templates/078-noctis.md) |
| 079 | **Malachite** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/malachite/hero.mp4) | [`templates/079-malachite.md`](./templates/079-malachite.md) |
| 080 | **Visor** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/visor/hero.mp4) | [`templates/080-visor.md`](./templates/080-visor.md) |
| 081 | **Halide** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halide.mp4) | [`templates/081-halide.md`](./templates/081-halide.md) |
| 082 | **Cinnabar** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/cinnabar/hero.mp4) | [`templates/082-cinnabar.md`](./templates/082-cinnabar.md) |
| 083 | **Verge** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/verge/hero.mp4) | [`templates/083-verge.md`](./templates/083-verge.md) |
| 084 | **Willow** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/willow/hero.mp4) | [`templates/084-willow.md`](./templates/084-willow.md) |
| 085 | **Twilight** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/twilight/hero.mp4) | [`templates/085-twilight.md`](./templates/085-twilight.md) |
| 086 | **Tundra** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/tundra/hero.mp4) | [`templates/086-tundra.md`](./templates/086-tundra.md) |
| 087 | **Tide** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/tide/hero.mp4) | [`templates/087-tide.md`](./templates/087-tide.md) |
| 088 | **Citrine** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/citrine/hero.mp4) | [`templates/088-citrine.md`](./templates/088-citrine.md) |
| 089 | **Auralis** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/auralis-hq.mp4) | [`templates/089-auralis.md`](./templates/089-auralis.md) |
| 090 | **Aethera** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aethera/hero.mp4) | [`templates/090-aethera.md`](./templates/090-aethera.md) |
| 091 | **Arbor** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/arbor/hero.mp4) | [`templates/091-arbor.md`](./templates/091-arbor.md) |
| 092 | **Glowinn** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/glowinn/hero.mp4) | [`templates/092-glowinn.md`](./templates/092-glowinn.md) |
| 093 | **Meridian** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/meridian/hero.mp4) | [`templates/093-meridian.md`](./templates/093-meridian.md) |
| 094 | **Monoio** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/monoio/hero.mp4) | [`templates/094-monoio.md`](./templates/094-monoio.md) |
| 095 | **Nocturne** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/nocturne/hero.mp4) | [`templates/095-nocturne.md`](./templates/095-nocturne.md) |
| 096 | **RedNova** | Landing Page | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/rednova/hero.mp4) | [`templates/096-rednova.md`](./templates/096-rednova.md) |
| 097 | **Cypress** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/cypress/hero.mp4) | [`templates/097-cypress.md`](./templates/097-cypress.md) |
| 098 | **Hourglass** | 3D Website | `pro` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/hourglass.mp4) | [`templates/098-hourglass.md`](./templates/098-hourglass.md) |
| 099 | **Brimstone** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/brimstone.mp4) | [`templates/099-brimstone.md`](./templates/099-brimstone.md) |
| 100 | **Ridge** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ridge/hero.mp4) | [`templates/100-ridge.md`](./templates/100-ridge.md) |
| 101 | **Kage** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/kage/hero.mp4) | [`templates/101-kage.md`](./templates/101-kage.md) |
| 102 | **Aperture** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aperture/hero.mp4) | [`templates/102-aperture.md`](./templates/102-aperture.md) |
| 103 | **Anchor** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/anchor/hero.mp4) | [`templates/103-anchor.md`](./templates/103-anchor.md) |
| 104 | **Aether** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aether/hero.mp4) | [`templates/104-aether.md`](./templates/104-aether.md) |
| 105 | **Prairie** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/prairie/hero.mp4) | [`templates/105-prairie.md`](./templates/105-prairie.md) |
| 106 | **Portal** | Hero Section | `paid` | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/portal.mp4) | [`templates/106-portal.md`](./templates/106-portal.md) |
| 107 | **Oasis** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/oasis/hero.mp4) | [`templates/107-oasis.md`](./templates/107-oasis.md) |
| 108 | **Nebula** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/nebula/hero.mp4) | [`templates/108-nebula.md`](./templates/108-nebula.md) |
| 109 | **Moon** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/moon/hero.mp4) | [`templates/109-moon.md`](./templates/109-moon.md) |
| 110 | **Monsoon** | Hero Section | `free` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/monsoon/hero.mp4) | [`templates/110-monsoon.md`](./templates/110-monsoon.md) |
| 111 | **Meadow** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/meadow/hero.mp4) | [`templates/111-meadow.md`](./templates/111-meadow.md) |
| 112 | **Lagoon** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/lagoon-hero/hero.mp4) | [`templates/112-lagoon-hero.md`](./templates/112-lagoon-hero.md) |
| 113 | **Harbor** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/harbor/hero.mp4) | [`templates/113-harbor.md`](./templates/113-harbor.md) |
| 114 | **Garden** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/garden/hero.mp4) | [`templates/114-garden.md`](./templates/114-garden.md) |
| 115 | **Frost** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/frost/hero.mp4) | [`templates/115-frost.md`](./templates/115-frost.md) |
| 116 | **Ember** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/ember/hero.mp4) | [`templates/116-ember.md`](./templates/116-ember.md) |
| 117 | **Comet** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/comet/hero.mp4) | [`templates/117-comet.md`](./templates/117-comet.md) |
| 118 | **Brook** | Hero Section | `paid` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/brook/hero.mp4) | [`templates/118-brook.md`](./templates/118-brook.md) |
| 119 | **Aurora** | Hero Section | `free` | [Hero MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/aurora/hero.mp4) | [`templates/119-aurora.md`](./templates/119-aurora.md) |

---

## 🧩 Animated React Components (46) — [`./components/`](./components/)

| # | Name | Category | Preview | Prompt File |
| :---: | :--- | :--- | :--- | :--- |
| 001 | **Block Field** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/block-field-v1.mp4) | [`components/001-block-field.md`](./components/001-block-field.md) |
| 002 | **Light Cove** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/light-cove-v1.mp4) | [`components/002-light-cove.md`](./components/002-light-cove.md) |
| 003 | **Overlap Reel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/overlap-reel-v1.mp4) | [`components/003-overlap-reel.md`](./components/003-overlap-reel.md) |
| 004 | **Step Accordion** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-accordion-v1.mp4) | [`components/004-step-accordion.md`](./components/004-step-accordion.md) |
| 005 | **Step Path** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/step-path-v1.mp4) | [`components/005-step-path.md`](./components/005-step-path.md) |
| 006 | **Story Deck** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/story-deck-v1.mp4) | [`components/006-story-deck.md`](./components/006-story-deck.md) |
| 007 | **Intro Loader** | Loader | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/intro-loader-v1.mp4) | [`components/007-intro-loader.md`](./components/007-intro-loader.md) |
| 008 | **Dither Lens** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dither-lens-v1.mp4) | [`components/008-dither-lens.md`](./components/008-dither-lens.md) |
| 009 | **Team Roster** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/team-roster-v1.mp4) | [`components/009-team-roster.md`](./components/009-team-roster.md) |
| 010 | **Image Trail** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/image-trail-v1.mp4) | [`components/010-image-trail.md`](./components/010-image-trail.md) |
| 011 | **Reveal Gallery** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/reveal-gallery-v1.mp4) | [`components/011-reveal-gallery.md`](./components/011-reveal-gallery.md) |
| 012 | **Petal Dissolve** | Text | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/petal-dissolve-v1.mp4) | [`components/012-petal-dissolve.md`](./components/012-petal-dissolve.md) |
| 013 | **Ember Carve** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember-carve-v1.mp4) | [`components/013-ember-carve.md`](./components/013-ember-carve.md) |
| 014 | **Contour Reveal** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/contour-reveal-v1.mp4) | [`components/014-contour-reveal.md`](./components/014-contour-reveal.md) |
| 015 | **Mosaic Trail** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mosaic-trail-v1.mp4) | [`components/015-mosaic-trail.md`](./components/015-mosaic-trail.md) |
| 016 | **Noise Blobs** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/noise-blobs-v1.mp4) | [`components/016-noise-blobs.md`](./components/016-noise-blobs.md) |
| 017 | **Fluted Glass** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fluted-glass-v1.mp4) | [`components/017-fluted-glass.md`](./components/017-fluted-glass.md) |
| 018 | **Grid Warp** | Text | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grid-warp-v1.mp4) | [`components/018-grid-warp.md`](./components/018-grid-warp.md) |
| 019 | **Elastic Frame** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/elastic-frame-v1.mp4) | [`components/019-elastic-frame.md`](./components/019-elastic-frame.md) |
| 020 | **Marble Scroll** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/marble-scroll-v1.mp4) | [`components/020-marble-scroll.md`](./components/020-marble-scroll.md) |
| 021 | **Wave Gallery** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/wave-gallery-v1.mp4) | [`components/021-wave-gallery.md`](./components/021-wave-gallery.md) |
| 022 | **Liquid Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/liquid-carousel-v1.mp4) | [`components/022-liquid-carousel.md`](./components/022-liquid-carousel.md) |
| 023 | **Spiral Slider** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/spiral-slider-v1.mp4) | [`components/023-spiral-slider.md`](./components/023-spiral-slider.md) |
| 024 | **DNA Carousel** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dna-carousel-v1.mp4) | [`components/024-dna-carousel.md`](./components/024-dna-carousel.md) |
| 025 | **Scroll 3D Slider** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-3d-slider-v1.mp4) | [`components/025-scroll-3d-slider.md`](./components/025-scroll-3d-slider.md) |
| 026 | **Liquid Glass Button** | Button | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/liquid-glass-button-v1.mp4) | [`components/026-liquid-glass-button.md`](./components/026-liquid-glass-button.md) |
| 027 | **Grainy Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/grainy-carousel-v1.mp4) | [`components/027-grainy-carousel.md`](./components/027-grainy-carousel.md) |
| 028 | **Depth Carousel** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/depth-carousel-v1.mp4) | [`components/028-depth-carousel.md`](./components/028-depth-carousel.md) |
| 029 | **Post Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/post-carousel-v1.mp4) | [`components/029-post-carousel.md`](./components/029-post-carousel.md) |
| 030 | **Morph Pill Card** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/morph-pill-card-v1.mp4) | [`components/030-morph-pill-card.md`](./components/030-morph-pill-card.md) |
| 031 | **Focus Reveal** | Text | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/focus-reveal-v1.mp4) | [`components/031-focus-reveal.md`](./components/031-focus-reveal.md) |
| 032 | **Mesh Flow** | Background | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-flow-v1.mp4) | [`components/032-mesh-flow.md`](./components/032-mesh-flow.md) |
| 033 | **Circular Slider** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/circular-slider-v1.mp4) | [`components/033-circular-slider.md`](./components/033-circular-slider.md) |
| 034 | **Media Gallery** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/media-gallery-v1.mp4) | [`components/034-media-gallery.md`](./components/034-media-gallery.md) |
| 035 | **Carousel Ring** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/carousel-ring-v1.mp4) | [`components/035-carousel-ring.md`](./components/035-carousel-ring.md) |
| 036 | **Arc Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/arc-carousel-v1.mp4) | [`components/036-arc-carousel.md`](./components/036-arc-carousel.md) |
| 037 | **Card Bookmark** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-bookmark-v1.mp4) | [`components/037-card-bookmark.md`](./components/037-card-bookmark.md) |
| 038 | **Card Folder** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/card-folder-v1.mp4) | [`components/038-card-folder.md`](./components/038-card-folder.md) |
| 039 | **Fan Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-carousel-v1.mp4) | [`components/039-fan-carousel.md`](./components/039-fan-carousel.md) |
| 040 | **Expanded Cards** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/expanded-cards-v1.mp4) | [`components/040-expanded-cards.md`](./components/040-expanded-cards.md) |
| 041 | **Spotlight Carousel** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/spotlight-carousel-v1.mp4) | [`components/041-spotlight-carousel.md`](./components/041-spotlight-carousel.md) |
| 042 | **Fan Deck** | Card | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/fan-deck-v1.mp4) | [`components/042-fan-deck.md`](./components/042-fan-deck.md) |
| 043 | **Send Halo** | Button | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/send-button-v3.mp4) | [`components/043-send-button.md`](./components/043-send-button.md) |
| 044 | **Glow Ring Button** | Button | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/glow-ring-button-v3.mp4) | [`components/044-glow-ring-button.md`](./components/044-glow-ring-button.md) |
| 045 | **Particle Globe** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/particle-globe-v2.mp4) | [`components/045-particle-globe.md`](./components/045-particle-globe.md) |
| 046 | **Scroll Key** | 3D | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/scroll-key-v2.mp4) | [`components/046-scroll-key.md`](./components/046-scroll-key.md) |

---

## 🌈 WebGL Shader Backgrounds (55) — [`./shaders/`](./shaders/)

| # | Name | Category | Preview | Prompt File |
| :---: | :--- | :--- | :--- | :--- |
| 001 | **Tide Swirl** | Swirl | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/swirl-tide.mp4) | [`shaders/001-swirl-tide.md`](./shaders/001-swirl-tide.md) |
| 002 | **Rose Swirl** | Swirl | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/swirl-rose.mp4) | [`shaders/002-swirl-rose.md`](./shaders/002-swirl-rose.md) |
| 003 | **Mono Swirl** | Swirl | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/swirl-mono.mp4) | [`shaders/003-swirl-mono.md`](./shaders/003-swirl-mono.md) |
| 004 | **Citrus Swirl** | Swirl | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/swirl-citrus.mp4) | [`shaders/004-swirl-citrus.md`](./shaders/004-swirl-citrus.md) |
| 005 | **Orchid Flow** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/orchid-flow.mp4) | [`shaders/005-orchid-flow.md`](./shaders/005-orchid-flow.md) |
| 006 | **Noir Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/noir-mesh.mp4) | [`shaders/006-noir-mesh.md`](./shaders/006-noir-mesh.md) |
| 007 | **Mint Haze** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mint-haze.mp4) | [`shaders/007-mint-haze.md`](./shaders/007-mint-haze.md) |
| 008 | **Sunset Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-sunset.mp4) | [`shaders/008-mesh-sunset.md`](./shaders/008-mesh-sunset.md) |
| 009 | **Sorbet Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-sorbet.mp4) | [`shaders/009-mesh-sorbet.md`](./shaders/009-mesh-sorbet.md) |
| 010 | **Sage Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-sage.mp4) | [`shaders/010-mesh-sage.md`](./shaders/010-mesh-sage.md) |
| 011 | **Rust Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-rust.mp4) | [`shaders/011-mesh-rust.md`](./shaders/011-mesh-rust.md) |
| 012 | **Plum Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-plum.mp4) | [`shaders/012-mesh-plum.md`](./shaders/012-mesh-plum.md) |
| 013 | **Ocean Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-ocean.mp4) | [`shaders/013-mesh-ocean.md`](./shaders/013-mesh-ocean.md) |
| 014 | **Neon Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-neon.mp4) | [`shaders/014-mesh-neon.md`](./shaders/014-mesh-neon.md) |
| 015 | **Mocha Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-mocha.mp4) | [`shaders/015-mesh-mocha.md`](./shaders/015-mesh-mocha.md) |
| 016 | **Matcha Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-matcha.mp4) | [`shaders/016-mesh-matcha.md`](./shaders/016-mesh-matcha.md) |
| 017 | **Digital Lavender** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-lavender.mp4) | [`shaders/017-mesh-lavender.md`](./shaders/017-mesh-lavender.md) |
| 018 | **Indigo Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-indigo.mp4) | [`shaders/018-mesh-indigo.md`](./shaders/018-mesh-indigo.md) |
| 019 | **Citrus Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-citrus.mp4) | [`shaders/019-mesh-citrus.md`](./shaders/019-mesh-citrus.md) |
| 020 | **Candy Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-candy.mp4) | [`shaders/020-mesh-candy.md`](./shaders/020-mesh-candy.md) |
| 021 | **Blush Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-blush.mp4) | [`shaders/021-mesh-blush.md`](./shaders/021-mesh-blush.md) |
| 022 | **Arctic Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-arctic.mp4) | [`shaders/022-mesh-arctic.md`](./shaders/022-mesh-arctic.md) |
| 023 | **Magma Flow** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/magma-flow.mp4) | [`shaders/023-magma-flow.md`](./shaders/023-magma-flow.md) |
| 024 | **Jade Flow** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/jade-flow.mp4) | [`shaders/024-jade-flow.md`](./shaders/024-jade-flow.md) |
| 025 | **Halftone Tide** | Halftone | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halftone-tide.mp4) | [`shaders/025-halftone-tide.md`](./shaders/025-halftone-tide.md) |
| 026 | **Halftone Sun** | Halftone | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halftone-sun.mp4) | [`shaders/026-halftone-sun.md`](./shaders/026-halftone-sun.md) |
| 027 | **Halftone Mono** | Halftone | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halftone-mono.mp4) | [`shaders/027-halftone-mono.md`](./shaders/027-halftone-mono.md) |
| 028 | **Halftone Forest** | Halftone | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halftone-forest.mp4) | [`shaders/028-halftone-forest.md`](./shaders/028-halftone-forest.md) |
| 029 | **Halftone Cyan** | Halftone | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/halftone-cyan.mp4) | [`shaders/029-halftone-cyan.md`](./shaders/029-halftone-cyan.md) |
| 030 | **Viridian Flame** | Flame | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/flame-viridian.mp4) | [`shaders/030-flame-viridian.md`](./shaders/030-flame-viridian.md) |
| 031 | **Violet Flame** | Flame | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/flame-violet.mp4) | [`shaders/031-flame-violet.md`](./shaders/031-flame-violet.md) |
| 032 | **Ash Flame** | Flame | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/flame-mono.mp4) | [`shaders/032-flame-mono.md`](./shaders/032-flame-mono.md) |
| 033 | **Azure Flame** | Flame | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/flame-azure.mp4) | [`shaders/033-flame-azure.md`](./shaders/033-flame-azure.md) |
| 034 | **Dusk Mesh** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dusk-mesh.mp4) | [`shaders/034-dusk-mesh.md`](./shaders/034-dusk-mesh.md) |
| 035 | **Cobalt Flow** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cobalt-flow.mp4) | [`shaders/035-cobalt-flow.md`](./shaders/035-cobalt-flow.md) |
| 036 | **Brushed Steel** | Metal | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-steel.mp4) | [`shaders/036-chrome-steel.md`](./shaders/036-chrome-steel.md) |
| 037 | **Rose Chrome** | Metal | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-rose.mp4) | [`shaders/037-chrome-rose.md`](./shaders/037-chrome-rose.md) |
| 038 | **Oil Slick** | Metal | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-oil.mp4) | [`shaders/038-chrome-oil.md`](./shaders/038-chrome-oil.md) |
| 039 | **Chrome Melt** | Metal | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-melt.mp4) | [`shaders/039-chrome-melt.md`](./shaders/039-chrome-melt.md) |
| 040 | **Chrome Gold** | Metal | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/chrome-gold.mp4) | [`shaders/040-chrome-gold.md`](./shaders/040-chrome-gold.md) |
| 041 | **Violet Cells** | Voronoi | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cell-violet.mp4) | [`shaders/041-cell-violet.md`](./shaders/041-cell-violet.md) |
| 042 | **Slate Cells** | Voronoi | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cell-slate.mp4) | [`shaders/042-cell-slate.md`](./shaders/042-cell-slate.md) |
| 043 | **Coral Cells** | Voronoi | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cell-coral.mp4) | [`shaders/043-cell-coral.md`](./shaders/043-cell-coral.md) |
| 044 | **Amber Cells** | Voronoi | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cell-amber.mp4) | [`shaders/044-cell-amber.md`](./shaders/044-cell-amber.md) |
| 045 | **Aurora Solar** | Aurora | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-solar.mp4) | [`shaders/045-aurora-solar.md`](./shaders/045-aurora-solar.md) |
| 046 | **Aurora Rose** | Aurora | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-rose.mp4) | [`shaders/046-aurora-rose.md`](./shaders/046-aurora-rose.md) |
| 047 | **Aurora Noir** | Aurora | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-noir.mp4) | [`shaders/047-aurora-noir.md`](./shaders/047-aurora-noir.md) |
| 048 | **Aurora Ice** | Aurora | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-ice.mp4) | [`shaders/048-aurora-ice.md`](./shaders/048-aurora-ice.md) |
| 049 | **Ash Flow** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ash-flow.mp4) | [`shaders/049-ash-flow.md`](./shaders/049-ash-flow.md) |
| 050 | **Swirl Band** | Swirl | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/swirl-band-v3.mp4) | [`shaders/050-swirl-band.md`](./shaders/050-swirl-band.md) |
| 051 | **Mesh Drift** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/mesh-drift-v3.mp4) | [`shaders/051-mesh-drift.md`](./shaders/051-mesh-drift.md) |
| 052 | **Ember Flame** | Flame | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/flame-ember-v3.mp4) | [`shaders/052-flame-ember.md`](./shaders/052-flame-ember.md) |
| 053 | **Ember Wash** | Gradient | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/ember-wash-v3.mp4) | [`shaders/053-ember-wash.md`](./shaders/053-ember-wash.md) |
| 054 | **Cell Tide** | Voronoi | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cell-tide-v3.mp4) | [`shaders/054-cell-tide.md`](./shaders/054-cell-tide.md) |
| 055 | **Aurora Veil** | Aurora | [Shader MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/aurora-veil-v3.mp4) | [`shaders/055-aurora-veil.md`](./shaders/055-aurora-veil.md) |

---

## 📐 Landing Page Sections (18) — [`./sections/`](./sections/)

| # | Name | Category | Preview | Prompt File |
| :---: | :--- | :--- | :--- | :--- |
| 001 | **Hill Country** | CTA | [Preview MP4 ↗]() | [`sections/001-hill-country.md`](./sections/001-hill-country.md) |
| 002 | **Portfolio Close** | Footer | [Preview MP4 ↗]() | [`sections/002-portfolio-close.md`](./sections/002-portfolio-close.md) |
| 003 | **Dune Card** | Footer | [Preview MP4 ↗]() | [`sections/003-dune-card.md`](./sections/003-dune-card.md) |
| 004 | **River Valley** | Footer | [Preview MP4 ↗]() | [`sections/004-river-valley.md`](./sections/004-river-valley.md) |
| 005 | **Meadow Capture** | CTA | [Preview MP4 ↗]() | [`sections/005-meadow-capture.md`](./sections/005-meadow-capture.md) |
| 006 | **Wordmark Bleed** | Footer | [Preview MP4 ↗]() | [`sections/006-wordmark-bleed.md`](./sections/006-wordmark-bleed.md) |
| 007 | **Snow Summit** | Footer | [Preview MP4 ↗]() | [`sections/007-snow-summit.md`](./sections/007-snow-summit.md) |
| 008 | **Fog Forest** | Footer | [Preview MP4 ↗]() | [`sections/008-fog-forest.md`](./sections/008-fog-forest.md) |
| 009 | **Loom Footer** | Footer | [Preview MP4 ↗]() | [`sections/009-loom-footer.md`](./sections/009-loom-footer.md) |
| 010 | **Service Bento** | Features | [Preview MP4 ↗]() | [`sections/010-service-bento.md`](./sections/010-service-bento.md) |
| 011 | **Render Grid** | Features | [Preview MP4 ↗]() | [`sections/011-render-grid.md`](./sections/011-render-grid.md) |
| 012 | **Studio Enquiry** | Contact | [Preview MP4 ↗]() | [`sections/012-studio-enquiry.md`](./sections/012-studio-enquiry.md) |
| 013 | **Ledger Bento** | Features | [Preview MP4 ↗]() | [`sections/013-ledger-bento.md`](./sections/013-ledger-bento.md) |
| 014 | **Lime Metrics** | Features | [Preview MP4 ↗]() | [`sections/014-lime-metrics.md`](./sections/014-lime-metrics.md) |
| 015 | **Contact Column** | Contact | [Preview MP4 ↗]() | [`sections/015-contact-column.md`](./sections/015-contact-column.md) |
| 016 | **Tier Cards** | Pricing | [Preview MP4 ↗]() | [`sections/016-tier-cards.md`](./sections/016-tier-cards.md) |
| 017 | **Signal Form** | Contact | [Preview MP4 ↗]() | [`sections/017-signal-form.md`](./sections/017-signal-form.md) |
| 018 | **Route Booking** | Contact | [Preview MP4 ↗]() | [`sections/018-route-booking.md`](./sections/018-route-booking.md) |

---

## 📊 Dashboard & App UI Screens (14) — [`./ui-screens/`](./ui-screens/)

| # | Name | Category | Preview | Prompt File |
| :---: | :--- | :--- | :--- | :--- |
| 001 | **Commerce Analytics** | Commerce | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/commerce-analytics.mp4) | [`ui-screens/001-commerce-analytics.md`](./ui-screens/001-commerce-analytics.md) |
| 002 | **Property Portfolio** | Property | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/property-portfolio.mp4) | [`ui-screens/002-property-portfolio.md`](./ui-screens/002-property-portfolio.md) |
| 003 | **Project Roadmap** | Projects | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/project-roadmap.mp4) | [`ui-screens/003-project-roadmap.md`](./ui-screens/003-project-roadmap.md) |
| 004 | **Dark Wallet** | Finance | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/dark-wallet.mp4) | [`ui-screens/004-dark-wallet.md`](./ui-screens/004-dark-wallet.md) |
| 005 | **Banking Home** | Finance | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/banking-home.mp4) | [`ui-screens/005-banking-home.md`](./ui-screens/005-banking-home.md) |
| 006 | **People Directory** | People | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/people-directory.mp4) | [`ui-screens/006-people-directory.md`](./ui-screens/006-people-directory.md) |
| 007 | **Wallet Overview** | Finance | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/wallet-overview.mp4) | [`ui-screens/007-wallet-overview.md`](./ui-screens/007-wallet-overview.md) |
| 008 | **Finance Desk** | Finance | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/finance-desk.mp4) | [`ui-screens/008-finance-desk.md`](./ui-screens/008-finance-desk.md) |
| 009 | **Gallery Storefront** | Media | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/gallery-storefront.mp4) | [`ui-screens/009-gallery-storefront.md`](./ui-screens/009-gallery-storefront.md) |
| 010 | **Health Tracker** | Health | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/health-tracker.mp4) | [`ui-screens/010-health-tracker.md`](./ui-screens/010-health-tracker.md) |
| 011 | **Client Desk** | Dashboard | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/client-desk.mp4) | [`ui-screens/011-client-desk.md`](./ui-screens/011-client-desk.md) |
| 012 | **Widget Board** | Dashboard | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/widget-board.mp4) | [`ui-screens/012-widget-board.md`](./ui-screens/012-widget-board.md) |
| 013 | **Workspace Hub** | Dashboard | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/workspace-hub.mp4) | [`ui-screens/013-workspace-hub.md`](./ui-screens/013-workspace-hub.md) |
| 014 | **Sales Console** | Dashboard | [Preview MP4 ↗](https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/sales-console.mp4) | [`ui-screens/014-sales-console.md`](./ui-screens/014-sales-console.md) |
