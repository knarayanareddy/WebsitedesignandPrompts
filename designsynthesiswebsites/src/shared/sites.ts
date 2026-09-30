export type SiteMeta = {
  slug: string;
  name: string;
  domain: string;
  use: string;
  accent: string;
  tagline: string;
  interaction: string;
  light?: boolean;
};

export const SITES: SiteMeta[] = [
  {
    slug: "geptral",
    name: "Geptral",
    domain: "Environmental Innovation",
    use: "Brand & Impact Landing",
    accent: "#DE7D4D",
    tagline: "Preserving nature for future generations",
    interaction: "Drag collage · glass cursor · 3D wave grid · live counter",
  },
  {
    slug: "aether",
    name: "Aether",
    domain: "Aerospace & Orbital Systems",
    use: "Mission Control Showcase",
    accent: "#6FD8FF",
    tagline: "Orbit, made legible",
    interaction: "Live orbit simulator · mission selector · launch countdown",
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    domain: "Music & Sound Design",
    use: "Label + Instrument Playground",
    accent: "#B58CFF",
    tagline: "Play the room",
    interaction: "Playable step sequencer · Web Audio synth · live visualiser",
  },
  {
    slug: "forma",
    name: "Forma",
    domain: "Architecture & Interiors",
    use: "Studio Portfolio + Configurator",
    accent: "#B5533C",
    tagline: "Spaces that think slowly",
    interaction: "Filterable projects · material configurator · before/after slider",
    light: true,
  },
  {
    slug: "ember",
    name: "Ember",
    domain: "Fine Dining & Hospitality",
    use: "Menu Builder + Reservations",
    accent: "#F2B544",
    tagline: "Fire, salt, patience",
    interaction: "Tasting-menu builder · live bill · table reservation flow",
  },
  {
    slug: "ledgr",
    name: "Ledgr",
    domain: "Fintech & Wealth",
    use: "Product Landing + Calculator",
    accent: "#C6F432",
    tagline: "Money that compounds quietly",
    interaction: "Live growth chart · risk profiles · allocation explorer",
  },
];
