import type { ReactNode } from 'react'

export type SurfaceMeta = { id: string; label: string; title: string; interaction: string }
export type Domain = {
  slug: string
  num: string
  name: string
  product: string
  domain: string
  tagline: string
  accent: string
  mechanic: string
  hidden: string
  signature: string
  elements: string[]
  surfaces: SurfaceMeta[]
  cta: string
  font: string
  reference?: boolean
  glyph: ReactNode
}

const g = (children: ReactNode) => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
)

export const DOMAINS: Domain[] = [
  {
    slug: 'measured',
    num: '01',
    name: 'Measured',
    product: 'Measured Band',
    domain: 'Health wearables',
    tagline: 'Continuous clinical-grade physiological intelligence, rendered invisible.',
    accent: '#10b981',
    mechanic: 'Radial spotlight mask',
    hidden: 'Live PPG optics · sleep hypnogram · exploded titanium schematic',
    signature: 'Finish selector re-tints an iridescent device in real time',
    elements: ['Pulse optics', 'Hypnogram', 'Exploded view', 'Finish selector'],
    cta: 'Reserve',
    font: 'font-serif',
    reference: true,
    surfaces: [
      { id: 'hero', label: 'Device', title: 'The Pulse of Form', interaction: 'Hover / drag / arrow-keys moves a 260px feathered spotlight; underneath the dark device a live PPG optics simulation glows (4 wavelengths + ECG trace).' },
      { id: 'sleep', label: 'Sleep', title: 'Tuned to Your Sleep Architecture', interaction: 'Spotlight over a night landscape reveals a hypnogram (Awake/REM/Light/Deep) with an HRV recovery curve.' },
      { id: 'hardware', label: 'Hardware', title: 'Forged in Medical Titanium', interaction: 'Spotlight reveals an exploded schematic — sapphire, flex PCB, cell, custom silicon — with floating leader lines.' },
      { id: 'reserve', label: 'Reserve', title: 'Own Your Rhythm', interaction: 'Frosted finish selector (Onyx / Titanium / Champagne) re-tints the mirror-finish reveal; “Reserve Batch 01” has a confirmation state.' },
    ],
    glyph: g(<><rect x="9" y="6" width="14" height="20" rx="6" /><path d="M12 6 13 2h6l1 4M12 26l1 4h6l1-4" /><path d="M11 16h3l1.5-3 2 6 1.5-3h2" /></>),
  },
  {
    slug: 'aurum',
    num: '02',
    name: 'Aurum Atelier',
    product: 'Calibre 01 Tourbillon',
    domain: 'Haute horlogerie',
    tagline: 'Every second, hand-finished. Turn the watch over and watch time being made.',
    accent: '#d6b36a',
    mechanic: 'Angular drag + 3D case-back flip',
    hidden: 'The mechanical movement on the reverse: gear train, mainspring, balance',
    signature: 'Drag the dial to set the time; wind slider drives the gear train',
    elements: ['Bezel drag', '3D flip', 'Gear train', 'Engraving configurator'],
    cta: 'Commission',
    font: 'font-cormorant',
    surfaces: [
      { id: 'hero', label: 'Dial', title: 'Time, Made Visible', interaction: 'Pointer drag around the dial sets the minute hand (hours follow). “Turn over” flips the watch in 3D to its transparent case-back.' },
      { id: 'movement', label: 'Movement', title: 'Wound by Hand', interaction: 'A winding slider 0→72h drives gear speeds, tightens a spiral mainspring, and stops the movement at zero.' },
      { id: 'commission', label: 'Commission', title: 'Yours, Engraved', interaction: 'Choose case metal, dial colour and engraving; both faces update live with a running price.' },
    ],
    glyph: g(<><circle cx="16" cy="16" r="10" /><path d="M16 9v7l4 3M12 3h8M12 29h8" /></>),
  },
  {
    slug: 'meridian',
    num: '03',
    name: 'Meridian Air',
    product: 'Meridian M7 Jet',
    domain: 'Aerospace & private aviation',
    tagline: 'The sky, plotted in real time. Nothing visible until the sweep passes.',
    accent: '#60a5fa',
    mechanic: 'Rotating conic radar sweep (CSS @property)',
    hidden: 'Live traffic, callsigns and track vectors — visible only while swept',
    signature: 'Click a blip to lock it and read its telemetry',
    elements: ['Radar sweep', 'Target lock', 'ISA altitude model', 'Great-circle routes'],
    cta: 'Charter',
    font: 'font-grotesk',
    surfaces: [
      { id: 'hero', label: 'Radar', title: 'Meridian', interaction: 'A 7s conic sweep masks a hidden traffic layer; blips glow then decay. Click to lock and read telemetry.' },
      { id: 'altitude', label: 'Altitude', title: 'Above the Weather', interaction: 'Altitude slider 0→45,000 ft re-paints the sky to space and computes ISA temperature, pressure and Mach-1 speed.' },
      { id: 'routes', label: 'Routes', title: 'Anywhere, Directly', interaction: 'Pick two airports — an animated great-circle arc draws with distance, block time and CO₂.' },
    ],
    glyph: g(<><circle cx="16" cy="16" r="12" /><circle cx="16" cy="16" r="6" /><path d="M16 16 25 8" /></>),
  },
  {
    slug: 'vireo',
    num: '04',
    name: 'Vireo Labs',
    product: 'Vireo Discovery Platform',
    domain: 'Biotech & drug discovery',
    tagline: 'See the cell. Then go one level deeper.',
    accent: '#a78bfa',
    mechanic: 'Magnifying lens with re-rendered scene',
    hidden: 'A molecular layer — antibodies and receptors — that only exists inside the lens',
    signature: '96-well assay plate and a protein that folds as you drag',
    elements: ['Lens ×10–×100', 'Well-plate screen', 'Hit threshold', 'Protein folding'],
    cta: 'Request access',
    font: 'font-serif',
    surfaces: [
      { id: 'hero', label: 'Lens', title: 'Vireo', interaction: 'A circular lens follows the pointer and re-renders the scene at up to ×6 with a molecular layer.' },
      { id: 'assay', label: 'Assay', title: 'Ninety-six Questions at Once', interaction: 'Hover wells for compound/dose, run the screen for a fluorescence sweep, tune the hit threshold.' },
      { id: 'fold', label: 'Fold', title: 'Watch a Protein Decide', interaction: 'Slider morphs a random coil into a helix; ΔG and RMSD update; hover residues to name them.' },
    ],
    glyph: g(<><circle cx="14" cy="14" r="9" /><path d="m21 21 8 8" /><circle cx="14" cy="14" r="3" /></>),
  },
  {
    slug: 'halcyon',
    num: '05',
    name: 'Halcyon Residences',
    product: 'Halcyon House',
    domain: 'Architecture & real estate',
    tagline: 'The render is what you will love. The blueprint is why it stands.',
    accent: '#e0a27a',
    mechanic: 'Rectangular blueprint x-ray lens (clip-path)',
    hidden: 'Structural grid, dimensions and material callouts under the facade',
    signature: 'Time-of-day slider, daylight study, build-cost estimator',
    elements: ['Blueprint lens', 'Sun/sky model', 'Room explorer', 'Cost estimator'],
    cta: 'Book a visit',
    font: 'font-fraunces',
    surfaces: [
      { id: 'hero', label: 'Elevation', title: 'Halcyon', interaction: 'A rectangular lens swaps the render for the blueprint; a time slider moves sun, sky and window glow.' },
      { id: 'plan', label: 'Plan', title: 'Follow the Light', interaction: 'Click rooms for area/materials; an hour slider computes daylight per room from its orientation.' },
      { id: 'build', label: 'Build', title: 'Choose Your Skin', interaction: 'Facade material swatches re-pattern the elevation; area slider computes cost & programme.' },
    ],
    glyph: g(<><path d="M3 28V14l8-6 6 6v14M17 28V10l5-5 7 5v18M3 28h26" /><path d="M8 20h4M22 16h3M22 21h3" /></>),
  },
  {
    slug: 'voltara',
    num: '06',
    name: 'Voltara',
    product: 'Voltara One',
    domain: 'Electric vehicles',
    tagline: 'Beautiful outside. Brutally efficient within.',
    accent: '#ff6a2b',
    mechanic: 'Vertical scan-line wipe (clip-path)',
    hidden: 'Skateboard chassis: thermal cells, dual motors, energy flow',
    signature: 'Hold-to-charge ring with a true taper curve',
    elements: ['Scan-line x-ray', 'Range model', 'Efficiency curve', 'Hold to charge'],
    cta: 'Configure',
    font: 'font-grotesk',
    surfaces: [
      { id: 'hero', label: 'Chassis', title: 'Voltara', interaction: 'A glowing scan-line follows the pointer; right of it the body becomes a thermal chassis x-ray.' },
      { id: 'range', label: 'Range', title: 'Honest Range', interaction: 'Speed, temperature and climate sliders drive a consumption model and live efficiency curve.' },
      { id: 'charge', label: 'Charge', title: '10 to 80 in Eighteen', interaction: 'Press and hold to charge; kW tapers realistically, release to pause.' },
    ],
    glyph: g(<><path d="M3 21c0-3 2-4 6-5l4-5h9l5 5c2 .5 2 2 2 5H3Z" /><circle cx="9" cy="23" r="2.5" /><circle cx="23" cy="23" r="2.5" /></>),
  },
  {
    slug: 'sonora',
    num: '07',
    name: 'Sonora',
    product: 'Sonora Reference',
    domain: 'Hi-fi audio',
    tagline: 'Sound you can see — wherever you click.',
    accent: '#ff4d8d',
    mechanic: 'Click-emitted ripples as canvas clip masks',
    hidden: 'A living frequency spectrum that exists only inside expanding rings',
    signature: 'Real Web-Audio EQ and an ANC attenuation visual',
    elements: ['Ripple reveal', '5-band EQ', 'Web Audio', 'ANC rings'],
    cta: 'Reserve a pair',
    font: 'font-grotesk',
    surfaces: [
      { id: 'hero', label: 'Resonance', title: 'Sonora', interaction: 'Click/tap to emit sonic rings; a spectrum is painted only inside them. Optional tone per click.' },
      { id: 'tuning', label: 'Tuning', title: 'Tune the Room', interaction: 'Five peaking-filter bands update a live response curve and a real synthesised chord through Web Audio.' },
      { id: 'silence', label: 'Silence', title: 'Hush', interaction: 'ANC slider calms noise rings and recomputes dB per environment.' },
    ],
    glyph: g(<><path d="M5 18v-3a11 11 0 0 1 22 0v3" /><rect x="3" y="17" width="5" height="9" rx="2" /><rect x="24" y="17" width="5" height="9" rx="2" /></>),
  },
  {
    slug: 'terra',
    num: '08',
    name: 'Terra Loom',
    product: 'Loom Soil Probe',
    domain: 'Agritech & soil intelligence',
    tagline: 'The farm you can see is 10% of the farm.',
    accent: '#a3e635',
    mechanic: 'Draggable depth probe curtain',
    hidden: 'Soil horizons, roots, moisture, microbes — revealed down to the probe tip',
    signature: 'Crop-season scrubber and a precision-irrigation game',
    elements: ['Depth probe', 'Horizon readouts', 'Season model', 'Moisture grid'],
    cta: 'Request a trial',
    font: 'font-fraunces',
    surfaces: [
      { id: 'hero', label: 'Probe', title: 'Terra', interaction: 'Drag (or arrow-key) a probe into the ground; strata, roots and live soil metrics appear to its tip.' },
      { id: 'season', label: 'Season', title: 'One Year, One Crop', interaction: 'Pick a crop and scrub months — the plant grows and water demand charts itself.' },
      { id: 'field', label: 'Field', title: 'Water Only Where It Hurts', interaction: 'Moisture heat-grid: irrigate dry cells precisely vs blanket and see litres saved.' },
    ],
    glyph: g(<><path d="M16 14V4M16 8c-3 0-5-2-5-4 3 0 5 2 5 4ZM16 10c3 0 5-2 5-4-3 0-5 2-5 4Z" /><path d="M3 16h26M6 21l3 2-3 3M14 20v8M22 20l3 3-3 3" /></>),
  },
  {
    slug: 'cipher',
    num: '09',
    name: 'Cipher',
    product: 'Cipher Ledger',
    domain: 'Private banking & fintech',
    tagline: 'Everything is encrypted. Until it is yours.',
    accent: '#fde047',
    mechanic: 'Canvas text decryption radius',
    hidden: 'A redacted ledger that decrypts glyph-by-glyph under the cursor',
    signature: 'Keypad vault that irises open to holdings',
    elements: ['Decrypt cursor', 'Live tx stream', 'Risk chips', 'Vault keypad'],
    cta: 'Open a vault',
    font: 'font-serif',
    surfaces: [
      { id: 'hero', label: 'Ledger', title: 'Cipher', interaction: 'Redacted ledger; glyphs within the radius scramble then resolve to plaintext.' },
      { id: 'stream', label: 'Stream', title: 'Watch It Settle', interaction: 'Live transaction feed with masked amounts; decrypt per-row or all at once.' },
      { id: 'vault', label: 'Vault', title: 'Only You', interaction: 'Enter the 4-digit code (hint on screen); door rotates open to reveal allocations. Wrong code shakes.' },
    ],
    glyph: g(<><rect x="6" y="14" width="20" height="14" rx="3" /><path d="M10 14V10a6 6 0 0 1 12 0v4" /><circle cx="16" cy="21" r="2" /></>),
  },
  {
    slug: 'fathom',
    num: '10',
    name: 'Fathom Deep',
    product: 'Fathom Crewed Submersible',
    domain: 'Ocean exploration',
    tagline: 'Eleven thousand metres of dark. Bring a light.',
    accent: '#22d3ee',
    mechanic: 'Aimed conic flashlight beam',
    hidden: 'Bioluminescent creatures that exist only in the beam',
    signature: 'Aim-and-click to log species in a field journal',
    elements: ['Beam aiming', 'Field journal', 'Depth zones', 'Pressure model'],
    cta: 'Join expedition',
    font: 'font-serif',
    surfaces: [
      { id: 'hero', label: 'Beam', title: 'Fathom', interaction: 'The submersible’s cone follows your pointer; click a creature inside the beam to log it (6 to find).' },
      { id: 'descent', label: 'Descent', title: 'Down, and Down', interaction: 'Depth slider 0→11,000 m: light, pressure, temperature, zones and species update.' },
      { id: 'join', label: 'Expedition', title: 'Take the Seat', interaction: 'Berth reservation with confirmation.' },
    ],
    glyph: g(<><path d="M4 18c4-7 18-7 24 0-6 7-20 7-24 0Z" /><circle cx="22" cy="17" r="1.5" /><path d="M4 18 1 14M4 18l-3 4" /></>),
  },
]

/** Builds a reproducible, paste-ready prompt spec for one domain (mirrors the repo's ADAPTED_PROMPT.md). */
export function buildPrompt(d: Domain) {
  return `# ${d.name} — "${d.product}" · ${d.domain}
Build a full-screen, multi-surface scroll experience (React + Vite + Tailwind + TypeScript) for ${d.product}.
Tagline: "${d.tagline}"

## 1. Shared DNA (inherited from Measured)
- Dark luxury: #000 / #0a0a0a / white opacities, single accent ${d.accent}.
- Fonts: Inter (body), Instrument Serif / ${d.font.replace('font-', '')} (display), JetBrains Mono (labels).
- .liquid-glass for nav pills, tags, stat badges and controls.
- Surface layer stack: L0 48px parallax grid (LERP 0.06, ±12px) · L1 base atmosphere · L3 hidden reveal layer · L2 editorial copy · L4 top h-28 / bottom h-36 black bleeds.
- IntersectionObserver (≥25%): off-screen surfaces cancel rAF, pause CSS animation (animation-play-state) and tickers.
- One h1 (hero), h2 elsewhere; each <section aria-labelledby>; decorative layers aria-hidden.
- prefers-reduced-motion disables drift, smooth-scroll and decorative animation; arrow keys steer the pointer engine.

## 2. What is DIFFERENT here
Reveal mechanic : ${d.mechanic}
Hidden layer    : ${d.hidden}
Signature       : ${d.signature}
Domain elements : ${d.elements.join(' · ')}

## 3. Surfaces
${d.surfaces.map((s, i) => `${i + 1}. #${s.id} — "${s.title}"\n   ${s.interaction}`).join('\n')}

## 4. Acceptance
- All copy/stats live in a single config object; all art is procedural SVG/CSS/canvas (zero hot-linked media).
- Hidden-layer meaning is also present in visible text so it is not gated behind pointer use.
- npm run build is clean; single-file output works from any sub-path (base './').`
}
