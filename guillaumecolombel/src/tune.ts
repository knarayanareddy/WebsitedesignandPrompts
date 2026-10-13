/** Live-tunable parameters. The lil-gui inspector (?debug / Ctrl+Shift+D) mirrors this tree. */
export const TUNE = {
  Source: { intensity: 1.0, height: 1.05, drift: 0.35 },
  Lumiere: { ambient: 0.9, rim: 0.6, bloom: 0.55, bloomThreshold: 0.85, bloomRadius: 0.55 },
  Matiere: { veins: 1.0, veinScale: 1.0, bands: 1.0, bandScale: 1.0, density: 1.0 },
  Decor: { steleGlow: 1.0, pointerGlow: 0.9, waterReflect: 1.0, waterRipple: 1.0, waterStir: 1.0, birds: 1.0, floraBend: 1.0 },
  Inclusion: { depth: 0.55, ior: 1.5, parallax: 0.28, frost: 0.6, strength: 1.0 },
  Fracture: { pointerRadius: 0.25, conductionRate: 2.5, decay: 1.6, openOffset: 0.9, springW0: 7.5, lift: 0.025, spread: 0.012 },
  Lanterne: { breath: 0.8, orgSpeed: 1.0, erodeRelief: 0.62, caustics: 1.0 },
  Roue: { radius: 2.3, verticalStep: 0.72, angleStep: 0.6, bokehWidth: 8.5, farOpacity: 0.14, meniscusStrength: 0.08, snapStrength: 6.0, holdPull: 1.1, holdTilt: 0.22, holdScale: 0.86 },
  Fluide: { frostAmp: 1.0, frostWarp: 0.012, trailLife: 1.4 },
  Post: { vignette: 0.38, grain: 0.035 },
};
export type Tune = typeof TUNE;
