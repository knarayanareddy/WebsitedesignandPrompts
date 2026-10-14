# Adapted Prompt — Marie Drouvin Portfolio

> Feed this prompt to any senior frontend engineer, design engineer, or AI coding assistant to replicate the **Marie Drouvin Portfolio** (`https://portfolio.mariedrouvin.com/`) with 1:1 visual fidelity and complete interaction mechanics.

---

## 01 / Master Design Brief & Visual Aesthetic

Build an authentic, high-craft personal portfolio website for an independent product designer and AI-assisted builder named **Marie Drouvin**.

### Aesthetic Pillars
1. **Botanical Paper & Oil-Canvas Frame:**
   The entire page floats inside a lush, dark botanical oil-painting background (`assets/botanical-background.webp`) overlaid with a subtle dark OKLCH wash (`oklch(19% 0.025 55 / 0.16)`). The content sits on an expansive, warm, rounded paper-sheet canvas (`oklch(97.5% 0.006 88)`) with soft diffusion drop-shadows (`box-shadow: 0 22px 60px oklch(25% 0.01 70 / 0.12)`).
2. **Typographic Masterpiece (`Portfolio’` with Interactive Avatar):**
   The primary heading is set in **Lancelot** (a classic French humanist serif font) alongside warm grotesque body type. In the word `Portfolio’`, the first letter **`o`** is replaced with a circular slot embedding Marie's illustrated avatar (`assets/marie-avatar.png`). Clicking this avatar opens a delightful, folded-paper typewriter-styled note and social directory.
3. **Harmonious Earthy Pastel Palette & Dynamic Graph Balancing:**
   Cards feature tactile pastel-tinted cards with colored pills and custom borders in 7 curated tones:
   - `red` (`#dd361d`)
   - `olive` (`#7b7a0b`)
   - `teal` (`#0c765d`)
   - `orange` (`#ad642c`)
   - `rose` (`#a4576f`)
   - `blue` (`#315b82`)
   - `paper` (`#f4ecd9`)
   A graph-coloring algorithm dynamically balances the grid so no two adjacent cards share the same accent color!
4. **Multi-View Project Exploration:**
   Visitors can seamlessly toggle between:
   - **Curated View:** Dynamic multi-column masonry grid with media teasers, tags, and footer bio card.
   - **All Projects View:** Filterable index either grouped by **Chronology** (by year: 2026, 2025, 2024...) or **By Type** (Independent Websites, Private Tools, Client Work, Publications, Experiments).
5. **Interactive Slide-Out Case Study Drawer:**
   Clicking any project opens a full-height slide-over drawer modal featuring multi-image carousel galleries with keyboard pagination, deep architectural stories, interactive SVG workflow diagrams, tech stack breakdowns, and live project launch links.
6. **Bilingual Support (EN / FR):**
   Includes dedicated localized routing and French interface copy (`/fr/`).

---

## 02 / Page Layout & Document Architecture

### 1. HTML5 Structural Skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Marie Drouvin - Product Designer and AI-assisted Product Builder</title>
  <link rel="stylesheet" href="./styles.css">
  <script src="./project-content.js" defer></script>
  <script src="./script.js" defer></script>
</head>
<body>
  <main class="page-shell">
    <section class="portfolio" aria-labelledby="portfolio-title">
      <!-- 1. Header & Controls -->
      <header class="portfolio-top">
        <div class="portfolio-controls">
          <div class="portfolio-control">
            <span class="portfolio-control-label">View</span>
            <div class="portfolio-pills" role="group" aria-label="Portfolio view">
              <button class="portfolio-pill is-active" type="button" data-view-button="curated">Curated</button>
              <button class="portfolio-pill" type="button" data-view-button="all">All projects</button>
            </div>
            <div class="portfolio-subviews" id="allViewOptions" hidden>
              <div class="portfolio-pills portfolio-pills--subviews" role="group" aria-label="Organize all projects">
                <button class="portfolio-pill portfolio-pill--subview is-active" type="button" data-index-view-button="year">Chronology</button>
                <button class="portfolio-pill portfolio-pill--subview" type="button" data-index-view-button="type">By type</button>
              </div>
            </div>
          </div>
          <nav class="portfolio-language" aria-label="Language">
            <a class="portfolio-language-link" href="./fr/">Lire en français</a>
          </nav>
        </div>

        <!-- 2. The Signature Title with Avatar Slot -->
        <h1 id="portfolio-title" aria-label="Portfolio">
          <span class="title-word">
            <span aria-hidden="true">P</span>
            <span class="avatar-slot">
              <span aria-hidden="true">o</span>
              <details class="profile-intro">
                <summary class="title-avatar" aria-label="About Marie">
                  <img src="./assets/marie-avatar.png" alt="Marie avatar" width="220" height="220">
                </summary>
                <div class="profile-intro-card">
                  <p>Hey, I’m Marie. I like making things on the internet, and this year I’m going all in on exploring AI. This portfolio contains the experiments that worked: things I actively use or have launched.</p>
                  <p>I’m open to product design roles, selected freelance work and collaborations with people building thoughtful AI products.</p>
                  <nav class="profile-intro-links">
                    <a class="profile-intro-link" href="https://notes.mariedrouvin.com/" target="_blank">...</a>
                    <a class="profile-intro-link" href="https://x.com/circecreates" target="_blank">...</a>
                    <a class="profile-intro-link" href="https://www.youtube.com/@mariedrouvin" target="_blank">...</a>
                    <a class="profile-intro-link" href="https://substack.com/@mariedrouvin" target="_blank">...</a>
                    <a class="profile-intro-link" href="mailto:mariedrouvin.com@gmail.com">...</a>
                  </nav>
                </div>
              </details>
            </span>
            <span aria-hidden="true">rtfolio<span class="title-mark">’</span></span>
          </span>
        </h1>

        <!-- Availability Note -->
        <p class="portfolio-opportunity">
          <span class="portfolio-opportunity-label">Available for web and product design work ·</span>
          <a href="mailto:mariedrouvin.com@gmail.com">mariedrouvin.com@gmail.com</a>
        </p>
      </header>

      <!-- 3. Dynamic Views -->
      <!-- Curated Masonry Grid -->
      <section class="cards-view" id="cardsView">
        <div class="project-grid" id="projects"></div>
      </section>

      <!-- All Projects (Chronology) -->
      <section class="index-view" id="indexYearView" hidden></section>

      <!-- All Projects (By Type) -->
      <section class="index-view" id="indexTypeView" hidden>
        <div id="typeIndexGroups"></div>
      </section>

      <!-- 4. Case Study Drawer Layer -->
      <div class="project-drawer-layer" id="projectDrawerLayer" hidden>
        <div class="project-drawer-scrim" id="projectDrawerScrim"></div>
        <aside class="project-drawer" id="projectDrawer" role="dialog" aria-modal="true" aria-labelledby="projectDrawerTitle">
          <!-- Drawer Content Container with Gallery, Story, Architecture -->
        </aside>
      </div>
    </section>
  </main>
</body>
</html>
```

---

## 03 / Typography & Color System

### Typography
- **Display Serif:** `Lancelot` (licensed humanist serif font loaded via `@font-face` from `assets/fonts/lancelot.woff2`).
- **Body & Sans:** `"Avenir Next", "Century Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **Typewriter / Notes:** `"American Typewriter", "Courier New", Courier, monospace`.

```css
@font-face {
  font-family: "Lancelot";
  src: url("assets/fonts/lancelot.woff2") format("woff2");
  font-display: swap;
}

:root {
  --display: "Lancelot", "Iowan Old Style", serif;
  --sans: "Avenir Next", "Century Gothic", sans-serif;
  --typewriter: "American Typewriter", "Courier New", Courier, monospace;
}
```

### Color Palette (OKLCH Modern Tokens)
```css
:root {
  color-scheme: light dark;
  --page: oklch(91.5% 0.004 90);
  --panel: oklch(97.5% 0.006 88);
  --ink: oklch(17% 0.01 65);

  /* Curated Card Accents */
  --card-red: #dd361d;
  --card-olive: #7b7a0b;
  --card-teal: #0c765d;
  --card-orange: #ad642c;
  --card-rose: #a4576f;
  --card-blue: #315b82;
  --card-paper: #f4ecd9;
}
```

---

## 04 / The Wordmark & Interactive Avatar Popover

### Mechanics
1. **Letter Replacement:**
   The heading text `Portfolio’` renders with font size `clamp(4rem, 8vw, 7.5rem)`, line-height `0.72`, and letter-spacing `-0.075em`.
   The letter `o` resides within `.avatar-slot` (`width: 0.54em; height: 0.72em; vertical-align: bottom; color: transparent`).
2. **HTML5 `<details><summary>` Profile Card:**
   Within `.avatar-slot`, place `<details class="profile-intro">`. The `<summary class="title-avatar">` holds the 220px round avatar with `border-radius: 50%` and `cursor: pointer`.
3. **Folded Paper Note Modal (`.profile-intro-card`):**
   - Styled like a textured tactile paper stationery note (`#fffefb` over `#25211e` ink).
   - Positioned at `top: calc(100% + 0.08rem); left: calc(100% - 3.25rem); width: min(22rem, calc(100vw - 2.5rem))`.
   - Has a speech bubble arrow notch (`::before`) and a soft folded-corner cast shadow (`::after` blurred by `0.45rem` with `transform: rotate(2deg)`).
   - Animated with `transform: translateY(0) rotate(-1.2deg)`.
   - On open, exposes bio text in `American Typewriter` and 5 round social pills (`Website`, `X`, `YouTube`, `Substack`, `Email`).
4. **Accessible Close Behavior:**
   - Clicking outside the popover closes the `<details>` tag.
   - Pressing `Escape` closes the popover and restores focus to the trigger.

---

## 05 / Masonry Engine & Graph-Coloring Palette Balancer

### CSS Grid Masonry Calculation
Use dynamic CSS Grid with `grid-auto-rows: 8px` and variable row spans:
```javascript
function layoutMasonry() {
  cardsView.querySelectorAll(".project-grid").forEach((grid) => {
    const gridStyle = window.getComputedStyle(grid);
    const rowHeight = parseFloat(gridStyle.gridAutoRows);
    const rowGap = parseFloat(gridStyle.rowGap);
    const cards = [...grid.querySelectorAll(".project")];

    cards.forEach((project) => {
      project.style.gridRowEnd = "auto";
      const cardHeight = project.querySelector(".project-card, .site-footer-note-card").getBoundingClientRect().height;
      const rowSpan = Math.ceil((cardHeight + rowGap) / (rowHeight + rowGap));
      project.style.gridRowEnd = `span ${rowSpan}`;
    });

    balanceAdjacentCardColors(grid);
  });
}
```

### Graph-Coloring Adjacency Balancer
To prevent adjacent cards from clashing or sharing identical accent colors:
1. Extract the geometric bounding box (`getBoundingClientRect()`) for each card.
2. Group cards into vertical columns based on `bounds.left`.
3. Build an undirected adjacency graph `neighbours`:
   - Connect vertical neighbors within the same column: card $i$ and card $i+1$.
   - Connect horizontal neighbors across adjacent columns whenever their vertical overlap exceeds 12px:
     $$\text{verticalOverlap} = \min(A.\text{bottom}, B.\text{bottom}) - \max(A.\text{top}, B.\text{top}) > 12\text{px}$$
4. Iterate through cards: for each card, inspect all colors currently assigned to its neighbors. Select the first available color from `[card.dataset.accent, ...palette]` that is not used by any adjacent card.
5. Apply the resolved color class (`project--red`, `project--teal`, etc.).

---

## 06 / Slide-Out Case Study Drawer

When a card is activated, open `#projectDrawerLayer`:
1. **Backdrop & Scrim:**
   Semi-transparent blur overlay (`#projectDrawerScrim`) that traps focus inside the drawer and dismisses on click.
2. **Drawer Sheet:**
   Slides in from the right edge (`transform: translateX(0)`) with smooth spring cubic-bezier (`cubic-bezier(.16, 1, .3, 1)`).
3. **Media Gallery Carousel:**
   - Sticky top horizontal scroll gallery with lazy-loaded WebP images.
   - Previous/Next navigation controls with current counter index (`"2 / 5"`).
   - Keyboard arrow key navigation (`ArrowLeft` / `ArrowRight`).
4. **Case Study Body:**
   - **Header:** Project title, year/month, project type, and status tag (`Live`, `Active`, `Published`).
   - **Executive Summary:** Overview paragraph in high-contrast editorial typography.
   - **Key Components:** Structured breakdown cards detailing technical tools, APIs, frameworks, and workflows used.
   - **The Process Story:** Deep narrative essays describing problem discovery, design explorations, and AI prompting methodologies.
   - **Interactive Diagrams & Media:** Architectural pipeline flows and embedded videos where applicable.
   - **External Links:** Clear launch buttons (`"Visit mariedrouvin.com"`, `"Read how I built it"`).
5. **Keyboard & Accessibility:**
   - Traps Tab focus inside the drawer.
   - Sets `aria-modal="true"`.
   - On close (`Escape`, scrim click, or close button), returns focus precisely to the originating card trigger (`lastDrawerTrigger.focus()`).

---

## 07 / Multi-View Navigation Mechanics

### Views:
1. **`Curated`:**
   Displays high-impact visual cards in the masonry grid, ending with the personal bio footer card.
2. **`All Projects` &rarr; `Chronology`:**
   Groups every project by launch year (`2026`, `2025`, `2024`...) in a streamlined editorial list with badges and direct drawer links.
3. **`All Projects` &rarr; `By Type`:**
   Groups projects into categorical taxonomies:
   - *Independent Websites*
   - *Private Tools*
   - *Client Work*
   - *Publications*
   - *Web Experiments*

Clicking any view button updates the URL state and toggles the corresponding DOM sections seamlessly without page reloads.

---

## 08 / Localization Architecture (EN / FR)

- Root `/` serves English language with French alternate link: `Lire en français -> ./fr/`.
- Subfolder `/fr/` serves complete French localization with English alternate link: `Read in English -> ../`.
- Uses relative asset paths (`./assets/...` in root, `../assets/...` in `fr/`) ensuring zero 404s when hosted on GitHub Pages or custom subdomains.
