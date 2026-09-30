# MASTER PROMPT — Geptral Nature-Driven Landing Page (Pixel-Perfect Rebuild)

Build a premium, dark, cinematic, Awwwards-level landing page for **Geptral** — a nature-driven innovation company. The site must be a **pixel- and animation-perfect reproduction** of the spec below. All section code is provided verbatim — DO NOT modify logic, class names, timings, easings, opacities, or magic numbers. Treat the code as the source of truth.

---

## 1. Tech Stack & Global Setup

- **Framework:** TanStack Start v1 + React 19 + Vite 7 + TypeScript (strict).
- **Styling:** Tailwind CSS v4 (configured in `src/styles.css` via `@import "tailwindcss"` and theme variables — no `tailwind.config.js`).
- **Animation:** `framer-motion`.
- **3D:** `@react-three/fiber` + `three` (used only in `WaveGrid`).
- **Font:** Google Font **"Inter Tight"** weights 200–900 (load via `<link>` in `__root.tsx`). This is the sole global font: ALL text elements on the page without exception must use **"Inter Tight"** (apply globally as `font-['Inter_Tight',_sans-serif]`).
- **Global background:** `#1b1b1b`. Global text: white.
- **Routes:** single `/` route in `src/routes/index.tsx` rendering all 8 sections in order: `<Hero /> <Section2 /> <Section3 /> <Section4 /> <Section5 /> <Section6 /> <Section7 /> <Section8 />`.

### Page wrapper
```tsx
<main className="bg-[#1b1b1b] text-white font-['Inter_Tight',_sans-serif]">
  <Hero />
  <Section2 />
  <Section3 />
  <Section4 />
  <Section5 />
  <Section6 />
  <Section7 />
  <Section8 />
</main>
```

---

## 2. Assets — load EVERY image/video from the CDN

All assets must be served from the base URL:

```
https://qclay.design/lovable/ceptral/
```

Map every `@/assets/*.asset.json` import to a simple object with a `url` field pointing to the matching CDN file. The cleanest way: create tiny stub modules under `src/assets/` that export `{ url: "https://qclay.design/lovable/ceptral/<filename>" }`, OR replace the imports inline with the URL string. Example stub for `src/assets/Professional_Mode_Large_group_of_small_fish_gracef (1).mp4.asset.json.ts`:

```ts
export default { url: "https://qclay.design/lovable/ceptral/Professional_Mode_Large_group_of_small_fish_gracef (1).mp4" };
```

### Required asset URLs (use exactly these filenames):

**Video**
- `https://qclay.design/lovable/ceptral/Professional_Mode_Large_group_of_small_fish_gracef (1).mp4`

**SVG (in `src/assets/` — imported by components)**
- `logo.svg`, `ArrowDown.svg`, `ArrowRight.svg`, `Arrow45.svg`, `Line.svg`, `LeftDot.svg`, `RightDot.svg`

**SVG (in `/public/` — referenced by absolute path in Section8)**
- `/In.svg`, `/inst.svg`, `/clutch.svg`, `/X.svg`, `/RedArrow.svg`
- `/intel.svg`, `/gofound.svg`, `/oracle.svg`, `/nutanix.svg`, `/Mstar-logo.svg`
- `/Arrow45.svg` (also used by Section2 glass cursor)

All of these must also be reachable at `https://qclay.design/lovable/ceptral/<filename>` — place a small redirect or copy them into `/public/` so the absolute `/In.svg` style paths work, OR rewrite Section8 to import from the CDN URLs.

**PNG (in `src/assets/`)**
- `BGCard.png`, `Card.png`, `FirstCard.png`, `Noise.png`, `Side-Image-Container.png`, `imageTower.png`, `Flower.png`, `SolarPaner.png`, `Stone.png`
- `image.png`, `image-1.png`, `image-2.png`, `image-3.png`, `image-4.png`, `image-5.png`, `image-6.png`, `image-7.png`, `image-8.png`
- `image9.png`, `image-10.png`, `image-11.png`, `image-12.png`, `image-13.png`, `image14.png`, `image-15.png`, `image-16.png`, `image-17.png`, `image-18.png`, `image19.png`, `image20.png`
- `image-21.png` … `image-39.png` (continuous range)
- Extras: `image-1-2.png`, `image-2-2.png`, `image-3-2.png`, `image-4-2.png`

Every `.asset.json` import in the code below resolves to `{ url: "https://qclay.design/lovable/ceptral/<original_filename>" }`. Do not change the import names in the code — only the URL they resolve to.

---

## 3. Component Structure

Create these files exactly:
```
src/components/GeptralLogo.tsx     (used inside Section7 if desired; standalone export)
src/components/Hero.tsx
src/components/Section2.tsx
src/components/Section3.tsx
src/components/Section4.tsx
src/components/Section5.tsx
src/components/Section6.tsx
src/components/Section7.tsx
src/components/Section8.tsx
src/components/WaveGrid.tsx
```

---

## 4. Behavior rules that span sections

- **Mobile/tablet (< `lg`):** remove all custom cursors (`glass-cursor`, `cursor-grab`, `cursor-pointer` decorative overlays). Touch-only interactions.
- **Desktop/laptop (≥ `lg`):** keep all hover, drag, glass cursor, parallax effects exactly as coded.
- **Section2** carousel: desktop = animated collage + drag-to-shift + glass cursor (cursor smoothly appears ONLY when hovering exactly over one of the visible cards, and smoothly disappears when leaving the card). Mobile/tablet = 2×2 grid of 4 images.
- **Section6** "See More" button: on mobile, drops to a new row under the title. Desktop unchanged.
- **Hero video:** `object-cover`, `object-position: center 20%`, `autoPlay loop muted playsInline`. (If you want play-once-and-freeze instead of loop, remove `loop` and add an `onEnded` handler that calls `pause()` on the last frame — but the provided Hero code uses `loop`, keep as-is for parity.)
- **Section7 `HoverLetter`:** NO load-in animation. Starts at `fontWeight: 900`. `onMouseMove` uses `e.movementX`: `> 0` → set 300 (or 200 in GeptralLogo); `< 0` → set 900. No reset on `onMouseLeave`. Animates via framer-motion `transition: { duration: 0.3 }`.
- **Section8 copyright row:** NO `gap` on container. Each word has `mr-[5px]`, the `•` has 0 margin, "Privacy Policy" has `ml-[5px]`.
- **Buttons (Global):** Buttons like "Join the Movement", "Get access", "Join Community", and "See More" MUST be square-like with minimal border radius (e.g. use `rounded-[2px]`). Do not use fully rounded pill shapes.

---

## 5. Section code — USE VERBATIM

> The following code is the canonical implementation. Copy each block into the corresponding file unchanged. Resolve `@/assets/*.asset.json` imports to `{ url: "https://qclay.design/lovable/ceptral/<filename>" }` as described in §2. JSX that was stripped during copy-paste must be reconstructed faithfully from the surrounding logic and the existing className tokens — every `motion.div`, `whileInView`, `viewport`, `transition`, opacity, and dimension stays exactly as written.

### `src/components/GeptralLogo.tsx`
```tsx
import { useState } from "react";
import { motion } from "framer-motion";

const LETTERS = ["G", "e", "p", "t", "r", "a", "l"];

function HoverLetter({ char }: { char: string }) {
  const [weight, setWeight] = useState(900);

  return (
    <motion.span
      className="inline-block"
      animate={{ fontWeight: weight }}
      transition={{ duration: 0.3 }}
      onMouseMove={(e) => {
        if (e.movementX > 0) setWeight(200);
        else if (e.movementX < 0) setWeight(900);
      }}
    >
      {char}
    </motion.span>
  );
}

export function GeptralLogo({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      {LETTERS.map((char, i) => (
        <HoverLetter key={i} char={char} />
      ))}
    </span>
  );
}
```

### `src/components/Hero.tsx`
```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@/assets/logo.svg";
import arrowDownUrl from "@/assets/ArrowDown.svg";
import arrowRightUrl from "@/assets/ArrowRight.svg";
import heroVideo from "@/assets/Professional_Mode_Large_group_of_small_fish_gracef (1).mp4.asset.json";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white lg:min-h-[100vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ objectPosition: "center 20%" }}
        src={heroVideo.url}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col lg:min-h-[100vh]">
        {/* HEADER — DESKTOP */}
        <header className="hidden w-full items-center justify-between px-10 pt-[26px] pb-[14px] lg:flex">
          <div className="flex items-center gap-4">
            <motion.img src={logoUrl} alt="Geptral" className="h-9 w-9"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }} />
            <motion.span className="text-2xl font-medium"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
              Geptral
            </motion.span>
          </div>

          <nav className="flex items-center gap-[60px] text-xs font-semibold uppercase">
            <motion.a href="#future" className="flex items-center gap-1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
              FUTURE <img src={arrowDownUrl} alt="" />
            </motion.a>
            <motion.a href="#about" className="flex items-center gap-1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
              ABOUT US <img src={arrowDownUrl} alt="" />
            </motion.a>
            <motion.a href="#press"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
              PRESS RELEASES
            </motion.a>
          </nav>

          <div className="flex items-center gap-[50px]">
            <motion.a href="#signin" className="flex items-center gap-2 text-base font-medium"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}>
              Sign In <img src={arrowRightUrl} alt="" />
            </motion.a>
            <motion.a href="#join"
              className="bg-white px-5 py-4 text-base font-normal text-zinc-800 rounded-sm"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}>
              Join the Movement
            </motion.a>
          </div>
        </header>

        {/* HEADER — MOBILE/TABLET */}
        <header className="flex w-full items-center justify-between px-5 pt-5 pb-2 lg:hidden">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Geptral" className="h-8 w-8" />
            <span className="text-xl font-medium">Geptral</span>
          </div>
          <button type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px]">
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden flex flex-col gap-5 px-5 pb-6 text-sm font-semibold uppercase">
              <a href="#future" className="flex items-center gap-1">FUTURE <img src={arrowDownUrl} alt="" /></a>
              <a href="#about" className="flex items-center gap-1">ABOUT US <img src={arrowDownUrl} alt="" /></a>
              <a href="#press">PRESS RELEASES</a>
              <a href="#signin" className="flex items-center gap-2 normal-case text-base font-medium">Sign In <img src={arrowRightUrl} alt="" /></a>
              <a href="#join" className="bg-white px-5 py-3 text-base font-normal normal-case text-zinc-800 w-fit">Join the Movement</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP DIVIDER */}
        <motion.div
          className="mx-auto h-[1px] w-[calc(100%-40px)] bg-white/25 lg:w-[calc(100%-80px)]"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }} />

        {/* MIDDLE TAGS */}
        <div className="relative flex flex-1 items-center py-10 lg:py-0">
          <motion.span className="absolute left-5 text-[10px] font-medium uppercase tracking-wide lg:left-10 lg:text-xs"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}>
            RESTORE ECOSYSTEMS
          </motion.span>
          <motion.span className="absolute right-5 max-w-[55%] text-right text-[10px] font-medium uppercase tracking-wide lg:right-10 lg:max-w-none lg:text-xs"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}>
            & RETURN NATURAL CYCLES TO HARMONY
          </motion.span>
        </div>

        {/* BOTTOM MAIN CONTENT */}
        <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
          <motion.h1
            className="text-[36px] leading-[1.05] font-normal sm:text-5xl lg:text-[100px] lg:leading-[1] lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>
            Preserving Nature<br />for Future Generations
          </motion.h1>
          <motion.p
            className="w-full text-sm font-normal text-white/75 lg:w-96 lg:text-base"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}>
            We develop and implement innovative technologies that effectively clean water bodies from pollution and minimize the harm from agricultural waste.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto h-[1px] w-[calc(100%-40px)] bg-white/25 lg:w-[calc(100%-80px)]"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }} />

        <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] font-normal uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
          <motion.span className="text-stone-300"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}>
            BE PART OF THE CHANGE RESTORING OUR PLANET
          </motion.span>
          <motion.span className="text-neutral-400"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}>
            SCROLL TO EXPLORE
          </motion.span>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/Section2.tsx`
```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import imageTower from "@/assets/imageTower.png.asset.json";
import flower from "@/assets/Flower.png.asset.json";
import solarPaner from "@/assets/SolarPaner.png.asset.json";
import stone from "@/assets/Stone.png.asset.json";

function AnimatedWords({ text, className, delayStart = 0, stagger = 0.06 }:
  { text: string; className?: string; delayStart?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delayStart + i * stagger, ease: [0.25, 1, 0.5, 1] }}>
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const INITIAL_STATES = [
  { width: "22%", y: 160, opacity: 1, marginRight: "40px", height: "320px" },
  { width: "28%", y: -20, opacity: 1, marginRight: "40px", height: "420px" },
  { width: "22%", y: 0,   opacity: 1, marginRight: "40px", height: "320px" },
  { width: "18%", y: 40,  opacity: 1, marginRight: "40px", height: "300px" },
  { width: "0%",  y: 40,  opacity: 0, marginRight: "0px",  height: "300px" },
  { width: "0%",  y: 40,  opacity: 0, marginRight: "0px",  height: "300px" },
];

const WHILE_IN_VIEW_STATES = [
  { width: ["22%", "22%", "0%"], opacity: [1,1,0], marginRight: ["40px","40px","0px"], height: ["320px","320px","320px"] },
  { width: ["28%", "28%", "22%"], y: [-20,-20,140], height: ["420px","420px","320px"] },
  { width: ["22%", "22%", "28%"], y: [0,0,-75], height: ["320px","320px","420px"] },
  { width: ["18%", "18%", "22%"], height: ["300px","300px","450px"], y: [40,40,-15] },
  { width: ["0%",  "0%",  "24%"], height: ["300px","300px","300px"], opacity: [0,0,1] },
  { width: "0%", height: "300px", y: 40, opacity: 0, marginRight: "0px" },
];

const FINAL_SLOTS = [
  { width: "0%",  y: 160, opacity: 0, marginRight: "0px",  height: "320px" },
  { width: "22%", y: 140, opacity: 1, marginRight: "40px", height: "320px" },
  { width: "28%", y: -75, opacity: 1, marginRight: "40px", height: "420px" },
  { width: "22%", y: -15, opacity: 1, marginRight: "40px", height: "450px" },
  { width: "24%", y: 40,  opacity: 1, marginRight: "0px",  height: "300px" },
  { width: "0%",  y: 40,  opacity: 0, marginRight: "0px",  height: "300px" },
];

const IMG_CLASS = "w-full h-full object-cover rounded-[1px] pointer-events-none";

const INITIAL_CARDS = [
  { id: "c0", src: imageTower.url, alt: "Tower structure" },
  { id: "c1", src: flower.url,     alt: "Flower" },
  { id: "c2", src: solarPaner.url,  alt: "Solar panels" },
  { id: "c3", src: stone.url,      alt: "Stone structure" },
  { id: "c4", src: imageTower.url, alt: "Tower structure" },
  { id: "c5", src: flower.url,     alt: "Flower" },
];

export function Section2() {
  const collageRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [shift, setShift] = useState(0);

  const CURSOR_SIZE = 130;
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.5 });

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const handleCardPointerMove = (e: React.PointerEvent) => {
    if (!isDesktop()) return;
    mx.set(e.clientX - CURSOR_SIZE / 2);
    my.set(e.clientY - CURSOR_SIZE / 2);
  };
  const handleCardPointerEnter = (e: React.PointerEvent) => {
    if (!isDesktop()) return;
    mx.jump(e.clientX - CURSOR_SIZE / 2);
    my.jump(e.clientY - CURSOR_SIZE / 2);
    setIsHovering(true);
  };
  const handleCardPointerLeave = () => setIsHovering(false);

  const visibleCards = useMemo(() => {
    const cards = [...INITIAL_CARDS];
    const normalizedShift = ((shift % 6) + 6) % 6;
    return [...cards.slice(normalizedShift), ...cards.slice(0, normalizedShift)];
  }, [shift]);

  const handleDragEnd = (_e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) setShift((p) => p + 1);
    else if (offset.x > swipeThreshold) setShift((p) => p - 1);
  };

  const mobileCards = [
    { src: imageTower.url, alt: "Tower structure" },
    { src: flower.url,     alt: "Flower" },
    { src: solarPaner.url,  alt: "Solar panels" },
    { src: stone.url,      alt: "Stone structure" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#1b1b1b] px-5 pt-16 pb-20 font-['Inter_Tight',_sans-serif] font-light text-white lg:px-10 lg:pt-24 lg:pb-32">
      <div className="relative z-20 flex w-full flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-10">
        <h2 className="flex flex-col text-[40px] leading-[1.05] font-light sm:text-5xl lg:text-[81px] lg:leading-[85px] lg:max-w-[900px]">
          <span className="whitespace-nowrap"><AnimatedWords text="Flexibility &" /></span>
          <span className="whitespace-nowrap">
            <AnimatedWords text="complete" delayStart={0.18} />{" "}
            <span className="opacity-50"><AnimatedWords text="balance" delayStart={0.3} /></span>
          </span>
        </h2>
        <p className="text-left text-base font-light leading-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent lg:mt-4 lg:text-right lg:text-xl lg:leading-7">
          <AnimatedWords text="Immerse your clients in sustainable beauty" delayStart={0.2} stagger={0.04} /><br />
          <AnimatedWords text="—where every detail restores the" delayStart={0.4} stagger={0.04} /><br />
          <AnimatedWords text="planet and inspires a better tomorrow." delayStart={0.55} stagger={0.04} />
        </p>
      </div>

      {/* MOBILE / TABLET — 2x2 grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
        {mobileCards.map((c) => (
          <motion.div key={c.alt}
            className="w-full aspect-square overflow-hidden rounded-[2px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <img src={c.src} alt={c.alt} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* DESKTOP COLLAGE */}
      <div className="relative hidden lg:block" ref={collageRef}>
        <motion.div
          className="relative z-10 mt-[-22px] flex w-full flex-row items-center justify-between cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
          onPointerMove={handleCardPointerMove}>
          {visibleCards.map((card, index) => {
            const isInitial = shift === 0;
            return (
              <motion.div key={card.id}
                className="overflow-hidden shrink-0"
                onPointerEnter={handleCardPointerEnter}
                onPointerLeave={handleCardPointerLeave}
                initial={isInitial ? INITIAL_STATES[index] : false}
                whileInView={isInitial ? WHILE_IN_VIEW_STATES[index] : undefined}
                animate={!isInitial ? FINAL_SLOTS[index] : undefined}
                viewport={{ once: true }}
                transition={isInitial
                  ? { duration: 2.5, times: [0, 0.3, 1], ease: "easeInOut" }
                  : { duration: 0.8, ease: "easeInOut" }}>
                <img src={card.src} alt={card.alt} className={IMG_CLASS} />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="fixed top-0 left-0 z-50 hidden lg:flex items-center justify-center w-[130px] h-[130px] rounded-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 pointer-events-none"
          style={{ x: sx, y: sy }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}>
          <img src="/Arrow45.svg" className="w-[40px] h-[40px] brightness-0 invert" alt="" />
        </motion.div>
      </div>

      <div className="relative z-20 mt-10 flex w-full lg:mt-16 lg:translate-y-[-96px]">
        <div className="hidden lg:block lg:w-[22%]" />
        <p className="w-full text-[26px] font-light leading-[1.1] bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent sm:text-3xl lg:ml-[40px] lg:w-[75%] lg:text-[48px] lg:leading-[54px] lg:whitespace-nowrap">
          <AnimatedWords text="Nature-driven innovation to restore" /><br />
          <AnimatedWords text="balance and grow real impact" delayStart={0.25} />
        </p>
      </div>
    </section>
  );
}
```

### `src/components/Section3.tsx` — Focus Areas
Use a 12-col grid on `lg`: left 4 cols hold the section number `03 — Focus Areas` (this text must be white and have a font size of 18px, e.g. using `text-white text-[18px]`) and an intro line "We address the most pressing environmental challenges through scalable, science-driven solutions." (this text must have color `#888888`, e.g., `text-[#888888]`); right 8 cols hold a 2-col grid of 4 items (`Ecosystem Restoration`, `Sustainable Infrastructure`, `Clean Water Initiatives`, `Environmental Research`). Each of these 4 items MUST have a top separator line (`border-t border-white/15`) with exactly 10px spacing between the line and the title (e.g. `pt-[10px]`). Below the title is a 4-bullet list; the vertical spacing between the items in this list MUST be exactly 3px (e.g. flex column with `gap-[3px]`), and the text color of the list items must be `#888888` (e.g., `text-[#888888]`). Mobile = single column stack. Each title and each list item should `whileInView` fade-in with small `y` offset and staggered delay. Items array:
```ts
const items = [
  { title: "Ecosystem Restoration", list: ["Wetland and watershed renewal","Rewilding and biodiversity programs","Soil and vegetation recovery","Long-term ecological monitoring"] },
  { title: "Sustainable Infrastructure", list: ["Low-impact land use planning","Renewable energy integration","Closed-loop waste systems","Climate-resilient design"] },
  { title: "Clean Water Initiatives", list: ["Agricultural runoff filtration","River and lake purification systems","Microplastics detection","Zero-discharge processing"] },
  { title: "Environmental Research", list: ["Climate data analysis","Environmental risk modeling","Impact forecasting","Scientific collaboration"] },
];
```
Background `#1b1b1b`, white text (except the intro line and list items which are `#888888`), generous padding (`lg:px-10 lg:py-32`), separators using `border-white/15`.

### `src/components/Section4.tsx`
```tsx
import { motion } from "framer-motion";
import cardAsset from "@/assets/Card.png.asset.json";
import lineAsset from "@/assets/Line.svg.asset.json";
import { WaveGrid } from "./WaveGrid";

const tabs = [
  { label: "LOCATE CRITICAL ZONES", active: true },
  { label: "ACCELERATE WITH AI", active: false },
  { label: "SCALE ENVIRONMENTAL IMPACT", active: false },
  { label: "SCIENCE & ADVISORY", active: false },
];

const listItems = [
  "Track pollution sources & flow",
  "Filter regions by restoration viability",
  "Analyze land, water, and vegetation impact",
  "Prioritize response by urgency & scale",
];

export function Section4() {
  return (
    <section className="w-full min-h-[90vh] bg-[#1b1b1b] text-white px-5 py-12 lg:px-10 lg:py-20 flex flex-col overflow-hidden font-['Inter_Tight',_sans-serif]">
      {/* Top Tabs */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-3 lg:gap-5 mb-8 lg:mb-10">
        {tabs.map((t, index) => (
          <motion.div
            key={t.label}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`uppercase text-sm lg:text-base px-4 py-3 lg:px-6 text-center w-full sm:flex-1 ${
              t.active ? "bg-[#DE7D4D] text-black" : "bg-neutral-800 text-white/60"
            }`}
          >
            {t.label}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full max-w-[1728px] mx-auto">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-[36px] sm:text-5xl lg:text-[60px] leading-tight mb-4 lg:whitespace-nowrap"
          >
            Find high-impact targets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-white/50 text-base max-w-md mb-8"
          >
            Continuous environmental scanning that identifies the most at-risk regions and prioritizes action — in real
            time
          </motion.p>
          <motion.button
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-zinc-300 text-black text-base px-8 py-3 w-fit mb-24 rounded-sm"
          >
            Get access
          </motion.button>

          <div className="mt-auto max-w-[384px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-sm text-white mb-1"
            >
              Discover hotspots & environmental threats
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-sm text-white/50 mb-6"
            >
              Access the world's most complete environmental data hub — filter by location, source, severity, and
              restoration potential.
            </motion.div>
            {listItems.map((item, i) => (
              <div key={item} className="relative py-4">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "82%" }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 h-px bg-neutral-700"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-white/30 text-sm"
                >
                  {item}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="col-span-1 lg:col-span-6 relative flex items-center justify-center"
        >
          <div className="flex flex-col items-center pt-[30px] pb-[15px] relative w-full h-fit self-center overflow-hidden bg-[#2F2F2F]">
            {/* 3D Wave Grid */}
            <div
              className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
              }}
            >
              <WaveGrid />
            </div>

            {/* Layer 2: Static iPhone Camera Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-10">
                {Array.from({ length: 9 }).map((_, i) => {
                  const col = i % 3;
                  const row = Math.floor(i / 3);
                  const borderR = col < 2 ? "border-r border-white" : "";
                  const borderB = row < 2 ? "border-b border-white" : "";
                  return <div key={i} className={`${borderR} ${borderB}`} />;
                })}
              </div>
            </div>

            {/* Card */}
            <div className="relative z-20 w-[280px] lg:w-[340px]">
              <img
                src={cardAsset.url}
                alt="California weather card"
                className="block w-full h-auto shadow-2xl rounded-lg"
              />

              {/* Equalizer Bars — dotted columns matching reference shape */}
              <div className="absolute z-30 left-[12px] right-[12px] bottom-[38%] h-[8%] flex justify-between items-end gap-[3px] overflow-hidden pointer-events-none">
                {[
                  10, 15, 20, 15, 10, 15, 20, 15, 10, 15, 10, 5, 15, 25, 40, 55, 70, 85, 90, 95, 90, 85, 70, 55, 40, 25,
                  15, 10, 15, 20, 30, 20, 15, 10, 15, 20, 25, 15, 10, 15,
                ].map((peak, i) => {
                  const low = Math.max(8, peak * 0.35);
                  const duration = 0.5 + (i % 5) * 0.12;
                  const delay = (i % 7) * 0.08;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 w-[3px] bg-transparent border-l-[3px] border-dotted border-white/80"
                      initial={{ height: `${low}%` }}
                      animate={{
                        height: [`${low}%`, `${peak}%`, `${low}%`],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration,
                        delay,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Pagination Line — 40px below card */}
            <img src={lineAsset.url} alt="" className="relative z-20 mt-[40px] opacity-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### `src/components/Section5.tsx`
```tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";

const CDN = "https://qclay.design/lovable/ceptral";
const noise = { url: `${CDN}/Noise.png` };
const sideShadow = { url: `${CDN}/Side-Image-Container.png` };

// Helper to generate 1 to 39 exact URLs
const IMAGES: string[] = Array.from({ length: 39 }, (_, i) => {
  const num = i + 1;
  if ([9, 14, 19, 20].includes(num)) return `${CDN}/image${num}.png`;
  return `${CDN}/image-${num}.png`;
});

const COLS = [
  { width: 78,  itemH: 118, marginTopClass: "mt-[120px]" },
  { width: 105, itemH: 158, marginTopClass: "mt-[40px]" },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]" },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]" },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: true },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: true },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]" },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]" },
  { width: 105, itemH: 158, marginTopClass: "mt-[40px]" },
  { width: 78,  itemH: 118, marginTopClass: "mt-[120px]" },
];
const ITEMS_PER_COL = 5;

const randomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

export function Section5() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState("0.0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, 3.2, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setCount(latest.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView]);

  const [grid, setGrid] = useState<string[][]>(() =>
    COLS.map((c) => (c.white ? [] : Array.from({ length: ITEMS_PER_COL }, randomImage)))
  );

  useEffect(() => {
    const activeCells: { col: number; row: number }[] = [];
    COLS.forEach((c, ci) => {
      if (!c.white) {
        for (let r = 0; r < ITEMS_PER_COL; r++) activeCells.push({ col: ci, row: r });
      }
    });

    const id = setInterval(() => {
      setGrid((prev) => {
        const next = prev.map((col) => col.slice());
        for (let i = 0; i < 5; i++) {
          const cell = activeCells[Math.floor(Math.random() * activeCells.length)];
          next[cell.col][cell.row] = randomImage();
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 z-0 h-[105vh] overflow-hidden bg-gradient-to-b from-[#523426] to-[#865438] font-['Inter_Tight',_sans-serif]">
      
      {/* 10-column grid */}
      <motion.div
        initial={{ scale: 1.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0 flex justify-center gap-[32px] z-10 w-max left-1/2 -translate-x-1/2"
      >
        <div className="flex justify-center gap-[32px] scale-[1.04]">
        {COLS.map((col, ci) => (
          <div key={ci} className={`flex flex-col gap-[20px] ${col.marginTopClass}`} style={{ width: `${col.width}px` }}>
            {Array.from({ length: ITEMS_PER_COL }).map((_, ri) => {
              const src = grid[ci]?.[ri];
              if (col.white) {
                return <div key={ri} className="w-full bg-white rounded-sm" style={{ height: `${col.itemH}px` }} />;
              }
              return (
                <div key={ri} className="relative w-full overflow-hidden rounded-sm" style={{ height: `${col.itemH}px` }}>
                  <AnimatePresence mode="wait">
                    <motion.img key={src} src={src} alt=""
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" />
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-20 bg-[#865438]/50 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-[110] bg-gradient-to-b from-[#865438] to-[#865438] opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 z-[100] bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${noise.url})` }} />

      {/* Center Text UI */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[130]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          className="text-white/80 text-xl font-normal mb-2">
          Your referral helped restore
        </motion.div>
        
        <div className="text-white text-[88px] sm:text-[120px] lg:text-[160px] leading-none font-[550] mb-4">
          {count}
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          className="text-white text-2xl lg:text-3xl mb-[110px]">
          HA of Ecosystem
        </motion.div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          className="text-zinc-300 text-base lg:text-lg text-center max-w-[280px] sm:max-w-sm mb-[110px] leading-relaxed px-4">
          From every action your network takes, real-world change happens. Track your collective environmental contribution.
        </motion.p>
        
        <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          className="bg-white text-black text-xl font-normal px-10 py-5 rounded-[2px] hover:bg-gray-100 transition-colors">
          Join Community
        </motion.button>
      </div>

      {/* Absolute Top Layer Side Shadow */}
      <img src={sideShadow.url} alt="" className="absolute top-0 left-1/2 -translate-x-1/2 w-[984px] h-full object-cover pointer-events-none z-[120]" />
    </section>
  );
}
```


### `src/components/Section6.tsx`
```tsx
import { motion } from "framer-motion";
import bgCard from "@/assets/BGCard.png.asset.json";
import firstCard from "@/assets/FirstCard.png.asset.json";
import noise from "@/assets/Noise.png.asset.json";
import arrow from "@/assets/Arrow45.svg";

const ITEMS = [
  "Segregated, Bankruptcy-Remote Structure",
  "Something new in the world",
  "Blog post about something",
  "Closed-loop waste systems",
  "Low-impact land use planning",
  "Hello World",
];

export function Section6() {
  return (
    <section className="relative z-40 w-full min-h-screen bg-[#1b1b1b] overflow-hidden font-['Inter_Tight',_sans-serif]">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* LEFT */}
        <div className="relative col-span-1 w-full h-full flex flex-col justify-start items-center lg:items-start pt-20 pb-20 px-10 lg:pt-[140px] lg:pb-[140px] lg:px-[125px]">
          <motion.img
            src={bgCard.url}
            alt=""
            className="absolute left-0 right-0 top-20 bottom-20 lg:top-[140px] lg:bottom-[140px] w-full object-cover z-0"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.img
            src={firstCard.url}
            alt=""
            className="relative z-10 w-full max-w-[530px] h-auto object-contain shadow-2xl mt-10 lg:mt-20"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
          <div
            className="absolute left-0 right-0 top-20 bottom-20 lg:top-[140px] lg:bottom-[140px] z-20 bg-repeat opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${noise.url})` }}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-1 flex flex-col pt-20 pb-20 px-10 lg:pt-[140px] lg:pb-[140px] lg:pr-[120px] lg:pl-10 font-['Inter_Tight',_sans-serif]">
          <div className="flex flex-col items-start gap-6 w-full lg:flex-row lg:justify-between lg:items-start lg:gap-8">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-[60px] leading-[1.05] font-['Inter_Tight',_sans-serif] max-w-[500px] lg:max-w-[600px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white">Announcements,</span>{" "}
              <span className="text-stone-300">insights and Newsletter</span>
            </motion.h2>
            <motion.button
              className="bg-white text-black text-base px-7 py-4 flex items-center gap-2 whitespace-nowrap cursor-pointer font-['Inter_Tight',_sans-serif] shrink-0 rounded-[2px]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              See More
              <img src={arrow} className="w-3 h-3" alt="" />
            </motion.button>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-4 lg:gap-8 mt-10 lg:mt-16 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-sm font-medium uppercase text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              ALL (17)
            </motion.span>
            <motion.span
              className="text-sm font-medium uppercase text-white/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Announcements (7)
            </motion.span>
            <motion.span
              className="text-sm font-medium uppercase text-white/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              insights (4)
            </motion.span>
            <motion.span
              className="text-sm font-medium uppercase text-white/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Newsletter (6)
            </motion.span>
          </motion.div>
          <motion.div
            className="w-full lg:w-[calc(100%+80px)] h-[1px] bg-white/25 mt-6 mb-10 lg:mb-12 origin-left"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="flex flex-col w-full lg:w-[calc(100%+80px)]">
            {ITEMS.map((t, index) => (
              <motion.div
                key={t}
                className="flex flex-col cursor-pointer group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center pt-6 pb-[20px] px-10 -mx-10 hover:bg-white/5 transition-colors">
                  <span className="text-lg text-white/60 group-hover:text-white transition-colors font-['Inter_Tight',_sans-serif]">
                    {t}
                  </span>
                  <img src={arrow} className="w-3 h-3 brightness-0 invert opacity-100" alt="" />
                </div>
                <motion.div
                  className="w-full h-[1px] bg-white/25"
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/Section7.tsx`
```tsx
import { useState } from "react";
import { motion } from "framer-motion";
const letters = ["G", "E", "P", "T", "R", "A", "L"];

function HoverLetter({ char }) {
  const [weight, setWeight] = useState(900);
  const handleMouseMove = (e) => {
    if (e.movementX > 0) setWeight(300);
    else if (e.movementX < 0) setWeight(900);
  };
  return (
    <motion.span onMouseMove={handleMouseMove}
      className="font-['Inter_Tight',_sans-serif] text-[15vw] xl:text-[250px] leading-none tracking-tighter text-white uppercase cursor-default"
      animate={{ fontWeight: weight }}
      transition={{ duration: 0.3, ease: "easeOut" }}>
      {char}
    </motion.span>
  );
}

export function Section7() {
  return (
    <section className="relative z-50 w-full h-[35vh] bg-[#1b1b1b] flex items-center justify-center overflow-hidden">
      <div className="flex flex-row items-center justify-between w-full max-w-[1728px] px-10 mx-auto relative z-0">
        {letters.map((char, index) => (<HoverLetter key={`${char}-${index}`} char={char} />))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #1b1b1b 0%, rgba(27,27,27,0.98) 15%, rgba(27,27,27,0.88) 35%, rgba(27,27,27,0.65) 55%, rgba(27,27,27,0.35) 75%, rgba(27,27,27,0.1) 90%, transparent 100%)",
        }} />
    </section>
  );
}
```

### `src/components/Section8.tsx`
```tsx
import { motion } from "framer-motion";

export function Section8() {
  const copyWords = "© Geptral since 2015. All rights reserved".split(" ");
  const socialIcons = [
    { src: "/In.svg", alt: "LinkedIn", label: "LinkedIn" },
    { src: "/inst.svg", alt: "Instagram", label: "Instagram" },
    { src: "/clutch.svg", alt: "Clutch", label: "Clutch" },
    { src: "/X.svg", alt: "X", label: "X" },
  ];

  return (
    <footer className="relative z-50 w-full bg-[#1b1b1b] text-white pt-12 pb-8 px-5 lg:pt-16 lg:pb-10 lg:px-10 font-['Inter_Tight',_sans-serif]">
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-white/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 w-full max-w-[1728px] mx-auto">
        {/* LEFT COLUMN */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between font-['Inter_Tight',_sans-serif]">
          <div className="flex flex-row flex-wrap items-center justify-start lg:justify-between w-full gap-x-6 gap-y-4 opacity-40 mb-12 lg:mb-24">
            {[
              { src: "/intel.svg", alt: "Intel" },
              { src: "/gofound.svg", alt: "GoFound" },
              { src: "/oracle.svg", alt: "Oracle" },
              { src: "/nutanix.svg", alt: "Nutanix" },
              { src: "/Mstar-logo.svg", alt: "Mstar" },
            ].map((logo, i) => (
              <motion.img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                // Grayscale rendering, NO color inversion, Mstar-logo.svg is slightly larger for visual balance
                className={`object-contain shrink min-w-[50px] max-w-[140px] grayscale ${logo.alt === "Mstar" ? "h-[23px] lg:h-[28px]" : "h-5 lg:h-6"}`}
                style={{ filter: "grayscale(100%)" }} // Ensure grayscale, NEVER apply invert filter
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="font-['Inter_Tight',_sans-serif]">
            <motion.p
              className="text-sm text-white mb-4 font-['Inter_Tight',_sans-serif]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Follow us:
            </motion.p>

            <div className="flex items-center gap-6 mb-8">
              {socialIcons.map((icon, index) => (
                <a key={icon.label} href="#" aria-label={icon.label}>
                  <motion.img
                    src={icon.src}
                    alt={icon.alt}
                    className="h-5 w-5"
                    // Social icons MUST NOT have their colors inverted
                    style={{ filter: "none" }}
                    initial={{ opacity: 0, rotate: -360 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: "backOut", delay: index * 0.1 }}
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center text-sm text-white/60 font-['Inter_Tight',_sans-serif]">
              {copyWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="mr-[5px]" // Ideal size of normal space
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                •{" "}
                <a href="#" className="text-[#A2A2A2] hover:text-white transition-colors underline-offset-4 hover:underline ml-1">
                  Privacy Policy
                </a>
              </motion.span>
            </div>
          </div>
        </div>

        {/* MIDDLE — Mail us */}
        <motion.div
          className="col-span-1 lg:col-span-2 flex flex-col justify-between lg:border-l lg:border-white/20 lg:pl-8 font-['Inter_Tight',_sans-serif]"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h3 className="text-3xl font-normal mb-4 font-['Inter_Tight',_sans-serif]">Mail us</h3>
            <p className="text-neutral-400 text-base leading-relaxed font-['Inter_Tight',_sans-serif]">
              Don't like the forms? Drop us a line via email
            </p>
          </div>
          <div className="mt-auto pt-16">
            <a
              href="mailto:info@geptral.com"
              className="flex items-center gap-3 text-lg hover:opacity-80 transition-opacity font-['Inter_Tight',_sans-serif]"
            >
              info@geptral.com
              <img src="/RedArrow.svg" alt="" className="w-5 h-5 rounded-[3px]" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Book a call */}
        <motion.div
          className="col-span-1 lg:col-span-2 flex flex-col justify-between lg:border-l lg:border-white/20 lg:pl-8 font-['Inter_Tight',_sans-serif]"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div>
            <h3 className="text-3xl font-normal mb-4 font-['Inter_Tight',_sans-serif]">Book a call</h3>
            <p className="text-neutral-400 text-base leading-relaxed font-['Inter_Tight',_sans-serif]">
              Let's discuss your needs and KPI's in detail. Speak soon!
            </p>
          </div>
          <div className="mt-auto pt-16">
            <a
              href="#"
              className="flex items-center gap-3 text-lg hover:opacity-80 transition-opacity font-['Inter_Tight',_sans-serif]"
            >
              Let's talk
              <img src="/RedArrow.svg" alt="" className="w-5 h-5 rounded-[3px]" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
```

### `src/components/WaveGrid.tsx`
```tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Square-grid shader: draws thin lines along UV, no diagonals.
const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform vec2 uCells;
  uniform float uLineWidth;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    vec2 grid = fract(vUv * uCells);
    vec2 d = min(grid, 1.0 - grid);
    float line = min(d.x, d.y);
    float aa = fwidth(line);
    float alpha = 1.0 - smoothstep(uLineWidth, uLineWidth + aa, line);
    if (alpha <= 0.001) discard;
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uCells: { value: new THREE.Vector2(80, 100) },
      uLineWidth: { value: 0.02 },
      uColor: { value: new THREE.Color("#ffffff") },
      uOpacity: { value: 0.35 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const geom = mesh.geometry as THREE.PlaneGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 1.2 + t) * 0.15 +
        Math.cos(y * 1.5 + t * 0.8) * 0.15 +
        Math.sin((x + y) * 0.5 - t) * 0.2 +
        Math.cos(x * 0.4 - t * 0.6) * 0.1;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[30, 40, 80, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function WaveGrid() {
  return (
    <Canvas camera={{ position: [0, 1.33, 5], fov: 45 }} dpr={[1, 2]}>
      <WaveMesh />
    </Canvas>
  );
}
```

---

## 6. Acceptance checklist
- [ ] All images/video stream from `https://qclay.design/lovable/ceptral/<filename>`.
- [ ] Font is Inter Tight, weights 200–900.
- [ ] Hero video covers full viewport at `object-position: center 20%`.
- [ ] Section2: desktop collage animates from `INITIAL_STATES` → `WHILE_IN_VIEW_STATES` → drag snaps to `FINAL_SLOTS`. Glass cursor visible only ≥ `lg` and ONLY when hovering directly over visible cards. Mobile/tablet shows 2×2 grid.
- [ ] Section3: 12-col `lg` layout, single-column mobile, exact titles/bullets.
- [ ] Section4: active tab `#DE7D4D`, 3D WaveGrid with radial mask, 3×3 camera-grid overlay, 340px Card, 40 dotted equalizer bars with exact peak array.
- [ ] Section5: sticky 105vh, 10-col grid, 2 middle white columns, crossfade every 2s, counter `0.0 → 3.2` in 1.5s.
- [ ] Section6: bg+first card stack on left, list on right; "See More" wraps below title on mobile only.
- [ ] Section7: 7 hover letters starting at 900, no load-in, `e.movementX` only, no reset on leave; cinematic bottom shadow as specified.
- [ ] Section8: partner logos at opacity-40, socials rotate-in, copyright uses `mr-[5px]` per word, `•` has zero margin, "Privacy Policy" has `ml-[5px]`.
- [ ] No custom decorative cursor below `lg` anywhere.

Build it as a faithful reproduction. Do not "improve" timings, change tokens, or refactor the verbatim code.
