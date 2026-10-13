/**
 * PROJECTS — edit this array to showcase your own work.
 *
 *  color  : linear RGB internal glow (values > 1.0 bloom)
 *  matter : veins, veinScale, bands, bandScale, density   (stone mineralogy)
 *  scene  : water, mist, view, flora, relief, night, skyDim (landscape biome)
 *
 * Covers can be any CORS-enabled image URL or a file under public/assets/covers/.
 * If a cover fails to load, a procedural gradient card is generated instead.
 */
export interface ProjectMatter { veins: number; veinScale: number; bands: number; bandScale: number; density: number }
export interface ProjectScene { water: number; mist: number; view: number; flora: number; relief: number; night: number; skyDim: number }
export interface Project {
  slug: string;
  title: string;
  wheel: [string, string];
  year: number;
  description: string;
  credits: string;
  url: string;
  coverImage: string;
  color: [number, number, number];
  matter: ProjectMatter;
  scene: ProjectScene;
}

export const PROJECTS: Project[] = [
  {
    slug: 'clarte', title: 'CLARTÉ', wheel: ['CLARTÉ', 'WORLD'], year: 2026,
    description: 'An interactive WebGL & AI design system built for real-time spatial storytelling and high-craft product launches.',
    credits: 'Design & Creative Development', url: 'https://example.com/clarte',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    color: [1.0, 0.25, 0.1],
    matter: { veins: 1.4, veinScale: 1.0, bands: 0.5, bandScale: 1.0, density: 1.0 },
    scene: { water: 0.02, mist: 0.7, view: 1.05, flora: 0.85, relief: 1.25, night: 0, skyDim: 1 },
  },
  {
    slug: 'ondine', title: 'Ondine', wheel: ['ONDINE', 'ATELIER'], year: 2025,
    description: 'A fluid-simulation storefront for a perfume house: every bottle is poured, not clicked, in a GPU Navier-Stokes field.',
    credits: 'Creative Development with Studio Marée', url: 'https://example.com/ondine',
    coverImage: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80',
    color: [0.15, 0.55, 1.4],
    matter: { veins: 0.6, veinScale: 1.6, bands: 1.2, bandScale: 0.7, density: 0.7 },
    scene: { water: 0.08, mist: 0.35, view: 1.15, flora: 0.25, relief: 0.5, night: 0, skyDim: 0.9 },
  },
  {
    slug: 'halcyon-os', title: 'Halcyon OS', wheel: ['HALCYON', 'OS'], year: 2025,
    description: 'Launch film and configurator for a spatial computing OS, rendered live in the browser with a custom MSDF type engine.',
    credits: 'Lead WebGL Engineer', url: 'https://example.com/halcyon',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    color: [0.3, 1.3, 0.9],
    matter: { veins: 1.0, veinScale: 2.2, bands: 0.2, bandScale: 1.4, density: 1.3 },
    scene: { water: -0.12, mist: 0.15, view: 0.85, flora: 0.1, relief: 1.6, night: 1, skyDim: 0.6 },
  },
  {
    slug: 'sable', title: 'Sable', wheel: ['SABLE', 'DUNES'], year: 2024,
    description: 'A scroll-driven desert documentary. Terrain, heat haze and sand grain are all procedural; the footage is the only asset.',
    credits: 'Design & Development for Atelier Nord', url: 'https://example.com/sable',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    color: [1.6, 0.7, 0.2],
    matter: { veins: 0.3, veinScale: 0.8, bands: 1.8, bandScale: 1.2, density: 0.6 },
    scene: { water: -0.12, mist: 0.9, view: 1.25, flora: 0.05, relief: 1.0, night: 0, skyDim: 1 },
  },
  {
    slug: 'aether', title: 'Aether', wheel: ['AETHER', 'ORBITAL'], year: 2024,
    description: 'Real-time satellite tracker and data portrait for a climate observatory: 4,000 orbits drawn as a single instanced ribbon.',
    credits: 'Data visualisation & WebGPU', url: 'https://example.com/aether',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    color: [0.7, 0.3, 1.5],
    matter: { veins: 1.8, veinScale: 1.3, bands: 0.3, bandScale: 0.8, density: 1.1 },
    scene: { water: 0.0, mist: 0.2, view: 1.3, flora: 0.4, relief: 0.8, night: 1, skyDim: 0.35 },
  },
  {
    slug: 'verdure', title: 'Verdure', wheel: ['VERDURE', 'BOTANIC'], year: 2023,
    description: "An ever-growing garden for a botanical archive — L-system plants seeded from each visitor's cursor, kept alive between sessions.",
    credits: 'Concept, Design & Development', url: 'https://example.com/verdure',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
    color: [0.5, 1.4, 0.35],
    matter: { veins: 0.9, veinScale: 0.6, bands: 0.9, bandScale: 0.5, density: 0.8 },
    scene: { water: 0.03, mist: 1.1, view: 0.95, flora: 1.0, relief: 0.9, night: 0, skyDim: 0.8 },
  },
  {
    slug: 'braise', title: 'Braise', wheel: ['BRAISE', 'RECORDS'], year: 2023,
    description: "Audio-reactive label site: each release is a slab of molten glass, shaded by the track's own spectrum in real time.",
    credits: 'Creative Development with Ondine', url: 'https://example.com/braise',
    coverImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80',
    color: [1.7, 0.35, 0.3],
    matter: { veins: 2.0, veinScale: 1.8, bands: 0.6, bandScale: 1.6, density: 1.4 },
    scene: { water: -0.05, mist: 0.5, view: 0.8, flora: 0.3, relief: 1.4, night: 1, skyDim: 0.5 },
  },
  {
    slug: 'lanterne', title: 'Lanterne', wheel: ['LANTERNE', 'MUSEUM'], year: 2022,
    description: 'Permanent installation and companion site for a museum of light: 60 lanterns, one volumetric shader, zero video.',
    credits: 'Installation & Web — Lead Developer', url: 'https://example.com/lanterne',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    color: [1.3, 0.85, 0.45],
    matter: { veins: 0.5, veinScale: 1.1, bands: 1.4, bandScale: 0.9, density: 0.9 },
    scene: { water: 0.05, mist: 1.4, view: 1.1, flora: 0.6, relief: 0.6, night: 0, skyDim: 0.7 },
  },
];
