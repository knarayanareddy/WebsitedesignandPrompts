import type { Project, ProjectMatter, ProjectScene } from '@/data/projects';

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Frame-rate independent exponential smoothing. */
export const damp = (a: number, b: number, k: number, dt: number) => lerp(a, b, 1 - Math.exp(-k * dt));

export const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const COARSE = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;

/** Deterministic PRNG so the stone fractures identically on every visit. */
export function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface BlendedParams { color: [number, number, number]; matter: ProjectMatter; scene: ProjectScene }
const MATTER_KEYS: (keyof ProjectMatter)[] = ['veins', 'veinScale', 'bands', 'bandScale', 'density'];
const SCENE_KEYS: (keyof ProjectScene)[] = ['water', 'mist', 'view', 'flora', 'relief', 'night', 'skyDim'];

export function lerpProject(a: Project, b: Project, t: number): BlendedParams {
  const out: BlendedParams = { color: [0, 0, 0], matter: { ...a.matter }, scene: { ...a.scene } };
  for (let i = 0; i < 3; i++) out.color[i] = lerp(a.color[i], b.color[i], t);
  for (const k of MATTER_KEYS) out.matter[k] = lerp(a.matter[k], b.matter[k], t);
  for (const k of SCENE_KEYS) out.scene[k] = lerp(a.scene[k], b.scene[k], t);
  return out;
}
