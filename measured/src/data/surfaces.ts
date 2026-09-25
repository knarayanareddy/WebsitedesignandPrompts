export interface Finish {
  name: string;
  swatch: string;
  tints: { hi: string; mid: string; lo: string; sheen: string };
}

export type RevealKind = 'video' | 'optics' | 'sleep' | 'schematic' | 'iridescent';

export interface SurfaceConfig {
  id: string;
  chapter: string;
  kicker: string;
  heading: string;
  /** word rendered in Instrument Serif italic */
  headingItalic?: string;
  sub: string;
  statValue: string;
  statLabel: string;
  /** optional live readout appended to the stat badge; tick increments every 250ms while active */
  live?: (tick: number) => string;
  base: string;
  baseAlt: string;
  baseFallback?: string;
  video?: string;
  reveal: RevealKind;
  /** % down from the top of the section where the spotlight reveal zone begins */
  insetTop: number;
  layout: 'center' | 'left' | 'right';
  finishes?: Finish[];
}

export const FINISHES: Finish[] = [
  {
    name: 'Matte Onyx',
    swatch: 'radial-gradient(circle at 32% 30%, #3b3b41, #101013 72%)',
    tints: { hi: '#303036', mid: '#17171a', lo: '#070708', sheen: 'rgba(255,255,255,0.16)' },
  },
  {
    name: 'Raw Titanium',
    swatch: 'radial-gradient(circle at 32% 30%, #e8eaee, #6d747d 72%)',
    tints: { hi: '#cdd2d9', mid: '#787f89', lo: '#23262b', sheen: 'rgba(255,255,255,0.24)' },
  },
  {
    name: 'Champagne Gold',
    swatch: 'radial-gradient(circle at 32% 30%, #f4e4b9, #9d8048 75%)',
    tints: { hi: '#ead9ac', mid: '#a6884f', lo: '#372d1e', sheen: 'rgba(244,226,180,0.22)' },
  },
];

export const SURFACES: SurfaceConfig[] = [
  {
    id: 'hero',
    chapter: '01',
    kicker: 'The Pulse of Form',
    heading: 'Measured',
    sub: 'Continuous clinical-grade physiological intelligence, rendered invisible.',
    statValue: '54mg',
    statLabel: 'Weightless Grade 5 Titanium',
    base: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85',
    baseAlt: 'A titanium wearable resting on a wrist in low-key light',
    baseFallback: './img/hero-base.jpg',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4',
    reveal: 'video',
    insetTop: 40,
    layout: 'center',
  },
  {
    id: 'science',
    chapter: '02',
    kicker: 'Sub-Dermal Accuracy',
    heading: 'Light That Sees Within',
    headingItalic: 'Sees',
    sub: 'Quad-wavelength PPG sensors sample arterial blood volume 250 times per second.',
    statValue: '250 Hz',
    statLabel: 'Continuous Optical Sampling',
    live: (t) => `${(61204 + Math.round(t * 62.5)).toLocaleString('en-US')} samples`,
    base: './img/science.jpg',
    baseAlt: 'Macro view of the optical sensor pressed against skin',
    reveal: 'optics',
    insetTop: 38,
    layout: 'left',
  },
  {
    id: 'stories',
    chapter: '03',
    kicker: 'Circadian Rhythm',
    heading: 'Tuned to Your Sleep Architecture',
    headingItalic: 'Sleep',
    sub: 'Tracking autonomic nervous system recovery, micro-awakenings, and core thermal shifts.',
    statValue: '+94%',
    statLabel: 'HRV Correlation with ECG',
    live: (t) => `HRV ${46 + Math.round(2.4 * Math.sin(t / 4))} ms`,
    base: './img/stories.jpg',
    baseAlt: 'A deep night landscape over still water',
    reveal: 'sleep',
    insetTop: 20,
    layout: 'right',
  },
  {
    id: 'hardware',
    chapter: '04',
    kicker: 'Zero Compromise',
    heading: 'Forged in Medical Titanium',
    headingItalic: 'Medical',
    sub: 'Sapphire crystal sensor window. Water-resistant to 100 meters. 8 days without a dock.',
    statValue: '100m',
    statLabel: 'Atmospheric Depth Resistance',
    base: './img/hardware.jpg',
    baseAlt: 'A titanium wearable under a single hard light',
    reveal: 'schematic',
    insetTop: 34,
    layout: 'left',
  },
  {
    id: 'reserve',
    chapter: '05',
    kicker: 'Quiet Clarity',
    heading: 'Own Your Rhythm',
    headingItalic: 'Rhythm',
    sub: 'Founding member batches shipping Spring 2027. Includes lifetime membership and custom sizing kit.',
    statValue: 'Batch 01',
    statLabel: '500 Units · Spring 2027',
    base: './img/reserve.jpg',
    baseAlt: 'A mirror-finish wearable catching iridescent light',
    reveal: 'iridescent',
    insetTop: 32,
    layout: 'center',
    finishes: FINISHES,
  },
];
