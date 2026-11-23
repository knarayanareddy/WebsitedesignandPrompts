# Adapted Prompt — HUMAN.md Surrealist Editorial Manifesto

> Feed this prompt specification to a coding assistant to reproduce or adapt the **HUMAN.md** landing page.
> **Part A** defines the core stack, system tokens, and dual-layer architecture.
> **Part B** details the exact visual scenes, surrealist dioramas, and mechanical SVG mechanisms.
> **Part C** specifies the interactive HUD, tarot index drawer, and Lenis/GSAP scroll choreography.
> **Part D** provides the complete manifesto copy, 10 principles, and editorial texts verbatim.

---

## 1. Project Overview & Aesthetic Thesis

You are tasked with building a web experience modeled on **HUMAN.md** (`https://www.human-md.ai/`) by Briana (Mazzio) May.

The site is an interactive, surrealist editorial manifesto that addresses human creativity in the age of generative AI. Visually, it fuses:
1. **Surrealist collage art**: René Magritte, Terry Gilliam-style paper cutouts, Italian Renaissance still-life feasts, antique architectural elements.
2. **Editorial typography**: High-impact modern sans (`Bricolage Grotesque`), classical editorial serif italic (`Instrument Serif`), and monospaced typewriter notes (`Cutive Mono`).
3. **Playful kinetic mechanics**: An underground cutaway cellar with an animated brass clockwork engine that mechanically bounces letters, a ceramic coffee mug with an eyeball tracking the user's cursor, and a 16-card tarot/playing card navigation drawer.
4. **Dual-Layer Architecture**: A semantic, quiet plain Markdown reading page for screen readers and reduced motion, running in tandem with a cinematic visual stage.

---

## 2. Technical Stack & Setup

- **Bundler**: Vite 6.4+ (`base: './'` for universal relative deployment).
- **Language**: TypeScript 5.5+ (`strict: true`).
- **Styling**: Tailwind CSS 3.4+ with arbitrary values and custom color extensions.
- **Scroll & Animation Engines**:
  - `Lenis` (v1.1+) for smooth momentum scrolling.
  - `GSAP` (v3.12+) and ScrollTrigger for timeline synchronization.
- **Linting & Code Quality**: `oxlint` for lightning-fast zero-config checks.
- **File Organization**:
  - `index.html`: Entry document housing `<article id="read">`, `<header class="hud">`, and `<div id="stage">`.
  - `src/main.ts`: HUD eye tracking, tarot card interactions, and conductor lifecycle.
  - `src/index.css`: Typography `@font-face` definitions, SVG filter definitions, and film grain overlay.
  - `public/assets/`: Self-contained webfonts, cutout sprites, and textures.

---

## 3. Design Tokens & Color Palette

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        stage: '#201e1f',    // Deep warm graphite background
        accent: '#fc4109',   // Safety/signal orange
        cobalt: '#1a37c9',   // Saturated Klein blue
        olive: '#aebf76',    // Pastoral olive green
        cellar: '#2b0b02',   // Subterranean earth shadow
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Cutive Mono"', 'Courier New', 'monospace'],
      },
    },
  },
};
```

---

## 4. Semantic Layer vs. Stage Architecture

The page MUST maintain two parallel representations in `index.html`:

### A. The Accessible Reading Article (`<article id="read" class="read" lang="en">`)
- Sits before the stage in DOM order with a skip link: `<a class="skip" href="#read">Skip to the text</a>`.
- Uses pure semantic tags (`h1`, `h2`, `h3`, `blockquote`, `ul`, `li`, `p`).
- In default mode, it is visually hidden from the graphic stage, but remains fully accessible to screen readers, search engines, and users who have `prefers-reduced-motion` enabled.
- Displays the complete, unabridged manifesto text.

### B. The Visual Stage (`<div id="stage" aria-hidden="true">`)
- Positioned fixed or sticky to fill the viewport (`width: 100vw; height: 100vh`).
- Contains the cinematic layers:
  - `#bg`: Dynamic backdrop transitions between room color palettes.
  - `.L-open`: Opening room with cobalt wall, wooden floor, table, foot vase, protagonist, and lamp.
  - `.L-taste`: The mannequin corridor, the floating ceramic "taste" question, and the subterranean mechanical cellar.
  - `.L-table`: The expansive Renaissance feast table scene under `## the actual (human) job`.
  - Dynamic chapter dioramas (1 through 10) featuring cutout illustrations and parallax objects.

---

## 5. Scene-by-Scene Visual Specification

### Scene 0: Opening / Home Room
- **Wall & Floor**: Cobalt blue back wall (`#1a37c9`) floating over a pale natural wood plank floor.
- **Furniture & Props**:
  - Center-right: Protagonist standing in blue vertical striped pajamas and fuzzy red slippers holding a white ceramic mug.
  - Center-left: Solid oak table topped with a surrealist pale-pink high-heeled foot ceramic vase holding a lush green Boston fern.
  - Far-right: A warm glowing orange spherical Bauhaus floor lamp casting a radial ambient glow.
- **Title Block**: `# HUMAN md` in massive typography (`HUMAN` in heavyweight sans-serif, `md` in elegant italic serif).
- **Metadata**: Left: `BRIANA (MAZZIO) MAY` · Right: `APR 28, 2026`.
- **Sub-manifesto**: Three typewriter bullet points prefixed with `>`:
  - `> a working manifesto. notes-to-self, mostly.`
  - `> not a thinkpiece. not a thread. not a deck.`
  - `> last edited at the kitchen table, coffee #2.`

### Scene 1: The Mannequin Corridor & The Banquet
- **Atmosphere**: Room shifts to soft pastel pink with a deep forest-green floor.
- **Characters**: Five jointed wooden artist mannequins march in lockstep with arms posed forward.
- **Silver Trays**: Each mannequin carries a formal silver tray containing surreal feasts:
  - A trembling translucent strawberry-pink gelatin dessert.
  - A two-tiered pastel powder-blue frosted celebration cake.
  - A towering orange profiterole/croquembouche cone.
- **Text Reveal**: *"are very good and getting better every day... I keep coming back to the word 'taste' and I keep finding it too small. Taste is the surface."*

### Scene 2: The Underground Mechanical Cellar
- **Camera Movement**: Smoothly descends down through the floorboards into a subterranean excavation.
- **The SVG Engine**:
  - Brass and steel clockwork mechanism rendered in inline SVG with `#t-shade` drop shadows.
  - Articulated human arm operating a heavy brass rotary hand-crank.
  - An eccentric camshaft with dual counterweights driving five vertical pushrods.
  - Each pushrod physically lifts and drops individual cutout letters: **`t` - `a` - `s` - `t` - `e`**.
- **Accompanying Copy**: *"There is a whole engine underneath it, and that engine is the part the model can't have. Yet. Maybe ever. I don't know. I'm not in that argument. I'm in this one:"*

### Scene 3: The Ceiling Inversion
- **Split Screen**: Horizontal split with pastel pink above and deep cobalt below.
- **Inversion**: Protagonist walking upside down along the ceiling holding her coffee mug, proving that *"The average is the floor, not the ceiling."*

### Scene 4: The Banquet Table (`## the actual (human) job`)
- **Setting**: Mustard-yellow hall with an expansive banquet table extending in dramatic one-point perspective.
- **Still-Life Feast**: Lavish assortment of Renaissance fruits and objects: artichokes, sliced melons, pomegranates, radishes, grapes, lemons, candelabras, books, and antique glassware.
- **Protagonist**: Standing atop/beside the feast table with hands on hips, flanked by a flip notepad and steaming coffee mug under the bold headline: `## the actual (human) job`.

---

## 6. The Interactive HUD & Tarot Drawer

### A. The Eye-Mug Cursor Tracker (`.hud-mug`)
- Implemented as a circular ceramic mug button at top-left.
- Inside sits `.hud-mug__eye`. Calculate cursor coordinates relative to the mug center:
  ```ts
  const angle = Math.atan2(dy, dx);
  const dist = Math.min(Math.hypot(dx, dy) / 40, 4);
  const x = 50 + Math.cos(angle) * dist * 10;
  const y = 50 + Math.sin(angle) * dist * 10;
  mugEye.style.setProperty('--mug-x', `${x}%`);
  mugEye.style.setProperty('--mug-y', `${y}%`);
  ```
- Clicking the mug triggers a smooth scroll back to `top: 0` (`#home`).

### B. The 16-Card Tarot Index Drawer (`nav.index`)
- Triggered by clicking the top-right pink pill `.hud-index`.
- Opens a full-screen drawer displaying a staggered grid of 16 tarot/playing cards.
- Each card has:
  - An organic angle (`transform: rotate(var(--a))`).
  - An archival cutout thumbnail (`data-pic`).
  - Chapter number and title.
  - Anchor link smooth-scrolling directly to that section.

### C. Cinematic Watch Mode (`.hud-watch`)
- Toggles an automated virtual conductor (`html.is-conducted`).
- Smoothly animates the virtual scroll position at reading cadence.
- Transforms the HUD pill text to `"scroll"` so the user can interrupt at any point.

---

## 7. Complete Manifesto Text Verbatim

### 1. break the rule on purpose
Models are trained on the average. The average is the floor, not the ceiling. Our job is not to conform a little better than the last person who conformed. Our job is to know the rule cold, and then break it on purpose, in public, with a reason.
Symmetry is a rule. Break it.
Three-act structure is a rule. Break it.
"Don't shoot into the sun" is a rule. Break it.
If you can't say *why* you broke it, you didn't break it, you just missed.

### 2. find the thing in the weird place
Inspiration does not live in the first ten image-search results. It lives in:
- a misprinted parking ticket
- the way your grandfather folded a napkin
- an obscure Victorian zoetrope of a cat
- the back of a menu in a town you can't pronounce
- the tension in René Magritte's "The Son of Man", 1946
A model averages the internet. A human walks somewhere strange and brings back something unexpected.

### 3. advocate for the human and humanity
Every brief now has an invisible third party at the table. Someone has to keep saying "and what does this feel like for the person on the other end of it." Someone has to keep saying "how is humanity better through the birthing of this idea?" That's the job. Not "is it on-brand." Not "does it convert." *What does it feel like? what good does it do?*
If you aren't there saying it, no one will. The model certainly won't.

### 4. design for emotional resonance, not correctness
Tension. Surprise. Restraint. The pause before the punchline. The photograph that's *almost* in focus. The sentence that ends one beat earlier than you expected.
These are not bugs. These are the entire reason anyone remembers anything. "Correct" is the lowest bar in the building. Step over it and keep walking.

### 5. seek delight, not delivery
I would rather make one thing that makes someone laugh out loud on a train than ten things that "meet the brief." At the very least, it needs to make ME laugh. This is a personal bias.
If it's not at least a little bit fun, why are we here?

### 6. experiment ruthlessly, ship more than you opine
A working sketch beats a confident take. Every time.
A bad first draft beats a brilliant unwritten one. Every time.
A weird little prototype beats a slide deck about prototyping.
Every. Time.
Make 50 things. Throw away 47. Talk about the 3.
Do not, under any circumstances, become a person who mostly posts opinions about other people's work.

### 7. own the output. fully.
If the AI output is bad, the AI did not fail you. *You* failed it. You picked the tool. You wrote the prompt. You accepted the result. You shipped it.
The fix is not a better model, or a return to tools of the past. The fix is a sharper you. Sharpen yourself. Sharpen your ideas. Sharpen the way you say what you mean, because the gap between what you wanted and what came back is almost always a gap in *you*, not in the tool.
Powerful tools reward the people who showed up sharp, iterate, spend extra time on the vision. They expose the people who didn't. AI is not the great equalizer, it is the great amplifier.

### 8. design *with* it, not next to it
Watching the generation happen is not the work.
Prompting once and accepting the result is not the work.
The work is the back-and-forth. The push. The loop. The "again, but tweak is this way..." The hundredth iteration where the thing finally clicks.
If you're a spectator to your own output, you are not the author of your own output. Get your hands in.

### 9. play with purpose. and play for play.
Both. At the same time.
Some days the play is in service of a thing.
Some days the play *is* the thing.
A practice that only ever has goals is a job. A practice that never has goals is a hobby. The good work lives in between. Play doesn't result in burnout. It results in excitement, happiness, experiment, the unexpected, and an urge to play more.

### 10. be a builder *and* an ideas person
The split is fake. It was always fake. It's especially fake now. The people who can think of the thing *and* make the thing are going to eat. The people who can only do one half are going to be very busy explaining why the other half is hard, or blame the processes or tools.
Don't be that person. Learn the other half. It's never been cheaper to learn it.

### Things I am trying to stop doing
- waiting until it's "ready"
- editing in my head instead of on the page
- making but not sharing publicly
- taking briefs that secretly bore me
- pretending taste is an innate quality
- treating "AI" like a noun instead of a verb

### Things I am trying to do more
- finish the bad version first
- show people the in-between, mess, experiments
- write the thing I'd want to read
- dig deeper, get help
- stop pretending I know stuff, ask dumber questions
- say the more specific thing

### Closing
This file will be wrong in six months. That is fine.  
I'd rather be specifically wrong than vaguely correct.  
— b.  
last touched, kitchen table, late.  
Contact: briana.mazzio@gmail.com
