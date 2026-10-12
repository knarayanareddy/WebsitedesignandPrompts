# Academy Tutorial Build Prompt — Sticky Video Hero & Navbar

- **Source:** `Lesson-C4G0P249.js` (`/academy/build-animated-website-with-motionsites`)
- **YouTube Tutorial:** https://youtu.be/65pnv0H_ikM

## Complete Verbatim Build Prompt

```markdown
Create a hero section with a fixed navbar and a sticky background video using React + TypeScript + Vite + Tailwind CSS + Framer Motion + lucide-react.

---

## SETUP

Font: In index.html <head>, load this stylesheet:

https://db.onlinewebfonts.com/c/0e6de1ec911a2e267ff136bbdd384a44?family=Helvetica+Neue+Light

Set the page title to DE</HELPERS - Outsourced Development Team.

Global CSS (index.css):
- Reset: * { margin: 0; padding: 0; box-sizing: border-box; }
- html { scroll-behavior: smooth; }
- body: font-family 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif; background #000; color #fff; enable antialiased font smoothing (both webkit and moz).
- ::selection: background rgba(168, 85, 247, 0.4), color #fff.

---

## LIQUID GLASS CSS (class .liquid-glass)

.liquid-glass {
  background: linear-gradient(165deg, rgba(255,255,255,0.005) 0%, rgba(255,255,255,0.002) 40%, rgba(255,255,255,0.001) 100%);
  backdrop-filter: blur(18px) saturate(1.4) brightness(1.05);
  -webkit-backdrop-filter: blur(18px) saturate(1.4) brightness(1.05);
  border: none;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 15%, rgba(255,255,255,0.005) 40%, rgba(255,255,255,0.005) 60%, rgba(255,255,255,0.025) 85%, rgba(255,255,255,0.06) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.liquid-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.01) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 55%, rgba(255,255,255,0.005) 80%, rgba(255,255,255,0.01) 100%);
  pointer-events: none;
}

---

## PAGE STRUCTURE

The outermost wrapper is <div className="relative" style={{ backgroundColor: '#0A061A' }}>.

### BACKGROUND VIDEO (sticky, scrolls behind content)

Wrap in <div className="relative z-0">. Inside, place a <div className="sticky top-0 h-screen w-full overflow-hidden"> containing:
- A <video> tag: autoPlay muted loop playsInline, class w-full h-full object-cover, with this exact src URL:
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4
- An absolute overlay div covering the bottom 40% (inset-x-0 bottom-0 h-[40%] pointer-events-none) with inline style background: linear-gradient(to bottom, transparent, #0A061A).

After the sticky div, place a <div className="relative z-10 -mt-[100vh]"> containing the Nav and HeroContent (content scrolls over the video).

---

## NAV (fixed, z-50)

Fixed top navigation bar: fixed top-0 left-0 right-0 z-50, flex between, padding px-6 sm:px-8 md:px-12 py-5 md:py-6.

Logo (left): text-white font-light text-lg tracking-wide. Text is DE</ (using &lt;/) followed by <span className="font-normal">HELPERS</span>.

Desktop links (right, hidden md:flex, gap-2): Items: "About", "Our cases", "Services", "Prices". Active item ("About") gets border border-white/60 text-white. Others: text-white/70 hover:text-white. All: text-sm px-4 py-2 rounded-full transition-all duration-300. After links: white pill button "Hire us" (bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 ml-4).

Mobile hamburger (md:hidden): A button with z-[60] w-10 h-10 toggling a state. Uses AnimatePresence mode="wait" to crossfade between lucide Menu (24px) and X (24px) icons with rotate animations (rotate 90/-90 on enter/exit, duration 0.2).

Mobile overlay: When open, a fixed inset-0 z-[55] container with AnimatePresence. Inside: a backdrop div bg-black/95 backdrop-blur-xl, a close button (X icon) at top-right, and a centered flex-col of nav links (text-2xl font-light) + "Hire us" button (text-lg px-8 py-3). Links stagger in with delay: 0.15 + i * 0.05, the button at delay: 0.4. All animate opacity + y (20px).

---

## HERO CONTENT

Section: px-6 sm:px-8 md:px-12 pt-24 md:pt-32 pb-20 md:pb-40. Inside: max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start.

Left column:
- <h1> with line breaks: "Outsourced / development / team" (use <br/>). Classes: text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight.
- Subtitle <p>: "Built off-site. Feels in-house." Classes: text-white/50 text-sm mt-6 font-light.

Right column (flex flex-col items-start md:items-end gap-4):
- Avatar row: flex -space-x-2 mb-2. Four <img> tags, each w-8 h-8 rounded-full border-2 border-black/50 object-cover. Sources:
  - https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100
- Testimonial card: max-w-sm w-full rounded-2xl liquid-glass p-5. Inside: <p className="text-white/90 text-sm font-light leading-relaxed"> with text: "Working with this team felt like unlocking a cheat code. I sent them a Figma + a wild idea, and a week later I had a working prototype with pixel-perfect animations. Fully remote, yet fully in sync."

---

## DEPENDENCIES
- framer-motion
- lucide-react
- tailwindcss + postcss + autoprefixer

## TAILWIND CONFIG

Default config, no extensions needed. Content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'].
```
