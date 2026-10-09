# The Portfolio Console — Debbie

> **Template 12:** An interactive retro-futurism personal portfolio console featuring skeuomorphic mechanical keycaps, CRT computer-terminal screen typography with dynamic typing loops, synthesized mechanical switch audio, and coordinate-perfect overlay alignment.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesized-green?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio-console/)

---

## 🌟 Live Demo

Experience the live interactive console on GitHub Pages:  
👉 **[https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio-console/](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio-console/)**

---

## ⚡ Key Highlights & Engineering Features

### 1. 1:1 Physical Coordinate Preservation
Built on top of the original `1536 × 1024` uncompressed device reference photography (`device-reference.png`). Interactive HTML keycaps and terminal screen overlay use mathematical percentages with hardware perspective transforms (`rotate(-3.2deg) skewX(4.8deg)`), ensuring zero drift from 1440px desktop down to 390px mobile viewports.

### 2. Skeuomorphic 3D Mechanical Keycaps
- **Top Row (`P O R T F`):** Selected Work, About Me, My Process, What I Do, Explore.
- **Lower Row (`O L I O ★ LET'S TALK`):** A Little About Me, The Process, My Approach, Say Hello, Portfolio Star, Return Bar.
- **Spring Hover/Focus:** Elevates 2.7% device width via `cubic-bezier(0.22, 1.5, 0.4, 1)`.
- **Mechanical Bottom-Out Snap:** Snaps into switch well in 80ms with Web Audio synthesized clicks.
- **Idle Wave Physics:** Automated 1.1s mechanical wave ripples across all 11 switches every 7 seconds.

### 3. CRT Terminal Display Engine
- Authentic monospace typography in **Courier New**.
- Bold warm cream heading (`#FDE3CF`) with phosphor bloom glow.
- Real-time character-by-character typing loop (~100ms per character) with amber blinking vertical caret (`|`).
- Hovering any switch instantly types its destination title and metadata in real-time.

### 4. Zero-Asset Web Audio Synthesizer
Synthesizes physical keyboard clicks in-browser using dual oscillators:
- High-frequency triangle wave collision (1400Hz &rarr; 320Hz) simulates the stem snap.
- Low-frequency sine wave bottom-out (180Hz &rarr; 50Hz) simulates the chassis thud.
- Includes mute/unmute control in the navigation bar.

### 5. Local Editable Display Name
The hero introduction allows visitors to edit the display name inline. Changes persist locally in `localStorage` (`'debbie_console_name'`), updating the hero greeting and terminal telemetry in real time.

---

## 🛠 Project Structure

```
portfolio-console/
├── public/
│   └── device-reference.png           # 1536x1024 master hardware reference
├── src/
│   ├── components/
│   │   ├── ConsoleDevice.tsx          # Device chassis with coordinate overlay
│   │   ├── CredibilityStrip.tsx       # 'Trusted by 30 brands / 50 apps built'
│   │   ├── ContactSection.tsx         # 'Good design starts with hello.'
│   │   ├── Header.tsx                 # Lowercase wordmark, nav & audio toggle
│   │   ├── HeroIntro.tsx              # Editable name & availability badge
│   │   ├── Keycap.tsx                 # 3D mechanical key with spring physics
│   │   ├── ModalDialog.tsx            # Accessible modal dialog system
│   │   └── TerminalScreen.tsx         # CRT scanlines & typing loop
│   ├── types/
│   │   └── console.ts                 # Key configurations, colors & coordinates
│   ├── utils/
│   │   └── audio.ts                   # Web Audio mechanical click synthesizer
│   ├── App.tsx                        # Master layout & state management
│   ├── index.css                      # CRT scanline shaders & keyframe animations
│   └── main.tsx                       # React application bootstrap
├── ADAPTED_PROMPT.md                  # Comprehensive AI reproduction specification
├── BUILD_LOG.md                       # Engineering methodology & coordinate proofs
├── package.json                       # Scripts and dependencies
└── vite.config.ts                     # Relative base './' configuration
```

---

## 🚀 Running Locally

```bash
# Navigate to directory
cd portfolio-console

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
