# BBDO Germany — Creative Agency Showcase
## Adapted Engineering & Prompt Specification

> **Source**: [https://bbdo.bizarro.dev/](https://bbdo.bizarro.dev/)  
> **Agency / Client**: BBDO Germany (Berlin & Düsseldorf)  
> **Design & Development**: Bizarro Studio  
> **Accolades**: Awwwards Site of the Day, FWA of the Day, ADC Gold  
> **Implementation**: Standalone Vanilla HTML5, WebGL/OGL Shaders, GSAP Motion, Normalized Wheel Virtual Scroll, Gotham HTF Typography.

---

### 1. Architectural Concept & Aesthetic Vision

The BBDO Germany website is an avant-garde creative agency portfolio characterized by playful, high-velocity motion, typographic weight, and kinetic tactile interactions:

1. **Brand Identity**:
   - Signature bold corporate red-orange accent (`#EF3F24`, `#F05037`).
   - Monochromatic pastel background canvases (`#FFCDD2`, `#E8C8C8`, `#231E1F`, `#1C1C1D`).
   - Gotham HTF webfonts in Book (400), Bold (600), Black (700), and Ultra (800) weights, with El Messiri serif accents and Montserrat body fallbacks.

2. **Typographic Preloader & Curtain Reveal**:
   - Progressive typographic sequence ("Hello" &rarr; "we" &rarr; "are" &rarr; BBDO logomark).
   - Expanding geometric square reveal from the logomark dot.
   - Circular countdown progress dial with instant "SKIP" interaction.
   - Dual split-column background curtain reveal with easing stagger.

3. **Tilted 3D Hero Carousel (`home__header`)**:
   - 6 campaign preview cards (ADC Ranking, WhatsApp, Young Lions, Too Good To Go, Effie Germany, NY Festivals).
   - Skewed 3D angle transforms (`rotate(7deg)`, `scale(0.87)`), mouse drag/swipe listeners, inertial velocity tracking, and active item synchronization.
   - Animated progress tracking bar (`scaleX((current + 1) / total)`) and rolling number pagination (`01 • 06`).

4. **Dynamic Ambient Work Showcase (`home__work`)**:
   - 4 flagship case studies: Mustang Mach-E, WWF Eurythenes Plasticus, WhatsApp Family Diary, Life Lolli.
   - Parallax scrolling card deck synchronized with dynamic full-screen ambient blurred background crossfading (`Mach-E_Website-Blur`, `eurythenes-plasticus-blur`, `whatsapp-family-diary-blur`, `life-lolli-blur`).
   - "Discover ->" magnetic hover buttons and right-column campaign imagery.

5. **Typographic Agency Stats (`home__who`)**:
   - Massive filled and outlined stats numbers:
     - **145** people from
     - **16** countries speaking
     - **14** languages working at
     - **2** locations from
     - **140** home offices with
     - **1** goal:
   - Infinite animated marquee ribbons ("A culture of diversity and creativity.").

6. **Partner Logo Infinite Tickers (`home__about`)**:
   - Dual-row counter-directional SVG logo marquees showcasing 18 global partners:
     - Row 1: Bitpanda, Deutsche Bahn, Märklin, Henkell & Co, Ortel Mobile, Conrad Electronic, Home Instead, Continental, Nike.
     - Row 2: Johnson & Johnson, Ford, WWF, WhatsApp, Dr. Oetker, SAP, LBS, UNICEF, Henkel.

7. **Full-Screen Red-Orange Navigation Menu Overlay**:
   - Triggered by fixed top-right hamburger toggle button (`.menu__button`).
   - 4 primary navigation entries in outlined Gotham HTF:
     - `01 Work`
     - `02 Agency`
     - `03 Contact`
     - `04 Job Openings`
   - Interactive cursor-following cycling photo preview on link hover.
   - Circular social channels (Facebook, Instagram, LinkedIn), bilingual toggle (EN / DE), and direct "News ->" link.

8. **WebGL Canvas & Fluid Shader Effects**:
   - OGL WebGL displacement canvas driven by noise distortion map (`89db64da4543932f1a1a95d1c93fccaf.png`).
   - Liquid drag distortion trails on cursor movement and touch swipes.

---

### 2. Complete Asset & Dependency Matrix

All assets are 100% localized and self-contained within `./assets/`:

| Asset Category | Directory | Contents |
| :--- | :--- | :--- |
| **Fonts** | `assets/fonts/` | `gotham-htf-book`, `gotham-htf-bold`, `gotham-htf-black`, `gotham-htf-ultra` (woff2 & woff) |
| **Partner Logos** | `assets/logos/` | 18 vector SVG brand logos (`nike.svg`, `ford.svg`, `whatsapp.svg`, `sap.svg`, `wwf.svg`, etc.) |
| **Campaign Images** | `assets/images/` | 46 WebP and JPG campaign photographs, blurred backdrops, and navigation cycler stills |
| **WebGL Shaders** | `assets/build/` | `89db64da4543932f1a1a95d1c93fccaf.png` (displacement noise texture) |
| **SVG Sprites** | `assets/build/` | `spritemap.svg` (`sprite-bbdo`, `sprite-facebook`, `sprite-instagram`, `sprite-linkedin`, `sprite-quote`) |
| **Favicons** | `assets/favicon/` | `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`, `site.webmanifest`, `browserconfig.xml` |

---

### 3. Implementation Verification & Compatibility

- **Host Target**: Static web servers, GitHub Pages (`knarayanareddy.github.io/WebsitedesignandPrompts/bbdo/`).
- **Network Resilience**: 0 external hotlinked dependencies; 0 404 network errors; inlined SVG symbols prevent browser CORS/file-protocol blocks.
- **Cross-Device Support**: Desktop, tablet, and mobile responsive typography and touch event handlers.
