# Marie Drouvin — Independent Product Designer & Builder Portfolio

> **Template 12:** An authentic botanical oil-painted canvas portfolio featuring an interactive `Portfolio’` serif wordmark with embedded avatar bio popover, multi-view project exploration (Curated Masonry, Chronology, and By-Type), dynamic graph-coloring palette balancing, and rich slide-out case study drawers.

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-OKLCH_Masonry-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/mariedrouvin/)
[![Prompt Spec](https://img.shields.io/badge/Prompt_Spec-ADAPTED__PROMPT.md-purple?style=flat)](./ADAPTED_PROMPT.md)

---

## 🌟 Live Demo

Experience the live interactive portfolio on GitHub Pages:  
👉 **[https://knarayanareddy.github.io/WebsitedesignandPrompts/mariedrouvin/](https://knarayanareddy.github.io/WebsitedesignandPrompts/mariedrouvin/)**

---

## ⚡ Key Highlights & Engineering Features

### 1. Botanical Paper Sheet & Oil-Canvas Frame
The viewport features a deep botanical oil-painted background (`botanical-background.webp`) with an OKLCH dark wash overlay, framing an expansive rounded cream paper sheet canvas with soft diffusion drop-shadows.

### 2. Signature Typographic Wordmark & Avatar Popover
Rendered in the humanist French serif font **Lancelot**, the primary heading `Portfolio’` features an interactive circular slot replacing the letter **`o`**. Clicking the avatar reveals a folded typewriter paper bio card with Marie's journey, newsletter, and social directory.

### 3. Graph-Coloring Adjacency Balancer
A custom graph-coloring algorithm computes spatial bounding boxes of cards in the masonry grid and automatically reassigns pastel accent colors so that no two adjacent cards (vertically or horizontally overlapping) ever share the same color.

### 4. Slide-Out Case Study Drawer
Selecting any project opens a full-height interactive slide-over drawer modal complete with:
- Multi-image swipeable carousel galleries with counter badges.
- Deep architectural narratives, discovery notes, and AI prompting workflows.
- Structured technical component breakdowns.
- External launch links and documentation essays.
- Accessible focus trap with seamless `Escape` key dismissal.

### 5. Multi-View Exploration Engine
Effortlessly switch between:
- **Curated:** Multi-column masonry showcase with teaser visuals and personal bio card.
- **Chronology:** Linear year-by-year index (2026, 2025, 2024...).
- **By Type:** Categorized index (Independent Websites, Private Tools, Client Work, Publications, Web Experiments).

### 6. Bilingual Support (EN / FR)
Includes complete English and French editions with full UI localization and localized case study metadata.

---

## 🛠 Project Structure

```
mariedrouvin/
├── ADAPTED_PROMPT.md        # Complete prompt specification for 1:1 replication
├── BUILD_LOG.md             # Detailed engineering log, asset audit & math formulas
├── README.md                # Project documentation and showcase guide
├── index.html               # Main English portfolio markup
├── styles.css               # OKLCH tokens, responsive layout, masonry & drawer styles
├── script.js                # View controls, graph color balancing & drawer logic
├── project-content.js       # Dynamic project database and localized copy
├── fr/
│   └── index.html           # Dedicated French edition
└── assets/
    ├── botanical-background.webp # Chassis background oil painting
    ├── marie-avatar.png     # Hand-drawn circular profile illustration
    ├── fonts/
    │   └── lancelot.woff2   # Humanist serif font
    └── projects/            # 56 localized WebP project screenshots & diagrams
```

---

## 🚀 Quick Start & Local Development

No build step or npm installation required! Serve directly using any static HTTP server:

```bash
# Using python
cd mariedrouvin
python3 -m http.server 8080

# Or using npx serve
npx serve . -l 8080
```

Open your browser at `http://localhost:8080`.

---

## 📄 License & Attribution

- Original design & content by [Marie Drouvin](https://portfolio.mariedrouvin.com/).
- Replicated and documented autonomously by Antigravity for educational and archival curation under the [MIT License](https://github.com/knarayanareddy/WebsitedesignandPrompts/blob/main/LICENSE).
