# WanderLust — Beyond Places, Into Moments

> **Adapted Implementation & Prompt Specification**  
> **Source Inspiration**: [GetLayers AI — Wanderlust](https://www.getlayers.ai/templates?layer=wanderlust)  
> **Live GitHub Pages URL**: [https://knarayanareddy.github.io/WebsitedesignandPrompts/wanderlust/](https://knarayanareddy.github.io/WebsitedesignandPrompts/wanderlust/)

---

## 1. Design Philosophy & Aesthetic Blueprint

WanderLust is an editorial, dark windswept travel studio website that lingers on wide country, quiet mornings, and authentic human moments.

- **Creative Direction**: "A dark, windswept travel site that lingers on wide country and quiet mornings — the kind of page that makes leaving feel overdue."
- **Visual Tone**: Moody, organic, luxe, documentary-style photography with tactile scrapbook ephemera (white polaroids, green washi tape, torn binder paper, airmail stamps, and pushpin notes).
- **Color Palette**:
  - Deep Charcoal / Black Canvas: `#000000`, `#060507`, `#0e0d10`
  - Cream & Champagne Typography: `#f4eedb`, `#f7f3e8`, `#d5caa9`
  - Paper & Polaroid Whites: `#fcfbf7`
  - Washi Masking Tape Green: `rgba(162, 186, 120, 0.82)`
  - Pushpin & Telemetry Vermilion: `#e53935`
  - Muted Earth Tones: `#9e9a90`, `#605d56`
- **Typography**:
  - High-Contrast Editorial Serif: **Cormorant Garamond** (400, 600, Italic) for poetic titles (*"Beyond Places"*, *"Into Moments"*, *"Destinations Worth Wandering"*, *"Go Somewhere That Stays With You"*).
  - Contemporary Grotesk Sans: **Plus Jakarta Sans** (400, 600) for navigation stacks, telemetry tags, and catalog indices.
  - Handwritten Cursive Script: **Caveat** (400, 700) for personal scrapbook notes (*"Less ticking places off a list. More actually being there."*, *"Stay somewhere you'll remember."*).

---

## 2. Key Interactive Features & Architecture

1. **Fixed Header & Floating Compass Dock**:
   - `WanderLust` brand wordmark with italic ligature.
   - Four-tier vertical navigation stack (`JOURNAL.`, `EXPERIENCES.`, `ABOUT.`, `CONTACT.`) and pill CTA (`↳ EXPLORE DESTINATIONS`).
   - Bottom-left floating widget with rotating `N` compass needle, `SLIDER / LIST` view mode toggle, and Web Audio API ambient toggle.
2. **Hero Section ("Beyond Places · Into Moments")**:
   - Panoramic Iceland valley background with braided glacial rivers and lone traveler in beanie.
   - Opening camera reticle crosshair animation.
   - Center floating video reel window with live red recording indicator, vertical film strip peeking from above and below, and journey telemetry (`01. REAL JOURNEYS 42.`).
   - Split serif headlines: `Beyond Places` (left) and `Into Moments` (right).
   - Bottom-right destination quicklist (`• ALL DESTINATIONS`).
3. **Destinations Worth Wandering (Interactive Polaroid Scattering)**:
   - 16 authentic Polaroids scattered across the pitch-black canvas with varying tilt angles (`rotate(-14deg)` to `rotate(14deg)`).
   - Travel ephemera: Swiss flag sticker, Italian flag sticker, airmail postage stamp, Icelandic flag + puffin, cherry blossom sticker.
   - Dual catalog index columns (`01. ICELAND` to `08. PORTUGAL` on left, `SPAIN 09.` to `ISTANBUL 16.` on right).
   - Bidirectional hover linking: hovering any polaroid highlights its catalog item; hovering any catalog item brings that polaroid into elevation and levels its tilt.
   - Full drag-and-drop physics: user can toss and drag polaroids across the table!
   - Alternative `LIST` mode: toggles to an editorial tabular catalog with destination metadata and travel seasons.
4. **Scrapbook Collage ("Go Somewhere That Stays With You")**:
   - Tactile scrapbook centerpiece featuring traveler girl on a canyon ridge with open arms.
   - Textured green washi masking tape, ripped ring-binder notebook paper, and cursive vintage letters.
   - Flanking manifesto quotes: *"WE PLAN TRIPS FOR THE MOMENTS YOU'LL STILL TALK ABOUT YEARS LATER."* and *"THE QUIET MORNINGS, THE UNEXPECTED TURNS, THE PLACES YOU ALMOST DIDN'T FIND."*
   - Handwritten footnote: *"Less ticking places off a list. More actually being there."*
5. **Expandable Vertical Accordion ("How We Travel")**:
   - Four full-height vertical photo slats:
     1. `Small Group Trips` (Friends in yellow raincoats)
     2. `Road Trips` (Overland 4x4 camper on winding fjord road)
     3. `Handpicked Stays` (Glacial torrent waterfall and basalt rocks)
     4. `Local Experiences` (Outdoor picnic feast in the cold)
   - Smooth flex-grow transition (`flex: 3.4` on active, `flex: 1` on inactive) with staggered typography reveals and handwritten sublines.
6. **Plan a Journey (Pinned Note & Interactive Drawer)**:
   - Foggy alpine ridge background.
   - Realistic white parchment card pinned with a 3D red pushpin casting shadow: *"TELL US WHAT YOU'RE DREAMING OF. WE'LL SHAPE THE JOURNEY."* with red marker underline and *"ready when you are"*.
   - Rounded pill button (`↳ START PLANNING`) that opens the interactive trip inquiry modal with destination selector, style picker, and dream trip notes.
7. **Editorial Footer & Dispatch**:
   - Destination, Experience, and Company link columns.
   - Interactive newsletter subscription with email validation and toast notification.
   - Compass badge `N`, copyright, and social links.
8. **Web Audio Ambient Atmosphere**:
   - Real-time pink-noise filtered wind synthesizer simulating Nordic mountain breeze with pentatonic chime reverberations.

---

## 3. Reverse-Engineered System Prompt

```markdown
Create a single-page, self-contained interactive website for "WanderLust", an editorial dark windswept travel studio designing intimate, documentary-style journeys across quiet landscapes.

TECHNICAL CONSTRAINTS:
- Single self-contained HTML file (index.html) with inline CSS and vanilla JavaScript.
- Zero external build steps, zero npm packages, zero external CSS/JS libraries.
- Self-hosted variable woff2 fonts (Cormorant Garamond, Plus Jakarta Sans, Caveat).
- Fully offline-capable, responsive across mobile (390px), tablet, and desktop viewports.

KEY SECTIONS & EXPERIENCES:
1. Fixed Header & Floating Compass:
   - WanderLust logo with italic capital L.
   - Stacked vertical links (JOURNAL, EXPERIENCES, ABOUT, CONTACT) and "Explore Destinations" pill button.
   - Floating bottom-left dock with rotating "N" compass badge, "SLIDER / LIST" view mode switch, and ambient sound toggle.
2. Hero Section:
   - Full-viewport moody Iceland valley background with braided glacial rivers.
   - Viewfinder reticle pulse animation on load.
   - Centered floating video card with red live recording dot and vertical preview film strips.
   - Split serif typography: "Beyond Places" on left, "Into Moments" on right.
   - Bottom-right destinations shortlist.
3. Destinations Worth Wandering:
   - Pitch-black canvas with 16 scattered polaroids at natural tilt angles.
   - Decorated with travel stickers (Swiss flag, Italian tricolor, airmail stamp, Icelandic flag with puffin, cherry blossom).
   - Left (01-08) and Right (09-16) catalog columns with bidirectional hover synchronization.
   - Mouse drag-and-drop physics allowing cards to be rearranged.
   - Click polaroid opens destination quick-view modal with itinerary details.
   - "LIST" mode toggle displaying a structured table catalog.
4. Scrapbook Collage ("Go Somewhere That Stays With You"):
   - Outstretched-arms traveler girl polaroid with green washi tape, torn binder paper, and vintage letters.
   - Flanking editorial manifesto quotes.
   - Handwritten cursive caption: "Less ticking places off a list. More actually being there."
5. Expandable Vertical Accordion ("How We Travel"):
   - Four vertical full-height panels: Small Group Trips, Road Trips, Handpicked Stays, Local Experiences.
   - Smooth flex-grow expansion with staggered copy and handwritten footnotes.
6. Plan a Journey:
   - Pinned white parchment note with 3D red pushpin, marker lettering with red underline, and "ready when you are".
   - "Start Planning" CTA button opening interactive trip inquiry drawer.
7. Editorial Footer & Dispatch:
   - Multi-column link index, interactive newsletter form with toast feedback, compass badge, and social icons.
8. Web Audio API Ambient Sound:
   - Toggleable procedural wind noise and pentatonic chimes synthesizer.
```
