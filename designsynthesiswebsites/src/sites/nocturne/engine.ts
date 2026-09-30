export const STEPS = 16;
export const TRACKS = ["KICK", "SNARE", "HAT", "BASS", "LEAD"] as const;
export type Pattern = number[][];

export const KEYS: Record<string, number> = { A: 220, C: 261.63, D: 293.66, F: 174.61 };
const PENTA = [0, 3, 5, 7, 10, 12];

const mk = (kick: number[], snare: number[], hat: number[], bass: number[], lead: number[][]): Pattern => {
  const p: Pattern = TRACKS.map(() => Array(STEPS).fill(0));
  kick.forEach((i) => (p[0][i] = 1));
  snare.forEach((i) => (p[1][i] = 1));
  hat.forEach((i) => (p[2][i] = 1));
  bass.forEach((i) => (p[3][i] = 1));
  lead.forEach(([i, d]) => (p[4][i] = d));
  return p;
};

export const PRESETS: { id: string; name: string; bpm: number; key: string; pattern: Pattern }[] = [
  { id: "low-tide", name: "Low Tide", bpm: 92, key: "A", pattern: mk([0, 7, 10], [4, 12], [2, 6, 10, 14], [0, 6, 10], [[3, 3], [8, 4], [11, 2], [14, 1]]) },
  { id: "neon-static", name: "Neon Static", bpm: 124, key: "C", pattern: mk([0, 4, 8, 12], [4, 12], [2, 6, 10, 14, 15], [2, 3, 6, 10, 11, 14], [[0, 5], [3, 4], [6, 5], [7, 3], [10, 4], [13, 2]]) },
  { id: "glass-hours", name: "Glass Hours", bpm: 70, key: "D", pattern: mk([0, 10], [8], [0, 4, 8, 12], [0, 8], [[2, 5], [6, 3], [10, 4], [15, 2]]) },
  { id: "violet-hour", name: "Violet Hour", bpm: 140, key: "F", pattern: mk([0, 3, 10, 13], [4, 12, 15], [0, 2, 4, 6, 8, 10, 12, 14], [0, 3, 10], [[1, 4], [5, 5], [9, 3], [12, 2]]) },
  { id: "undertow", name: "Undertow", bpm: 104, key: "A", pattern: mk([0, 5, 8, 11], [4, 12], [1, 3, 5, 7, 9, 11, 13, 15], [0, 5, 8, 13], [[2, 2], [4, 3], [7, 5], [12, 4], [14, 1]]) },
];

type Listener = () => void;

class Engine {
  ctx?: AudioContext;
  master!: GainNode;
  analyser!: AnalyserNode;
  noise!: AudioBuffer;
  delay!: DelayNode;

  playing = false;
  step = -1;
  bpm = 100;
  key = "A";
  volume = 0.8;
  pattern: Pattern = PRESETS[0].pattern.map((r) => r.slice());
  activePreset: string | null = "low-tide";

  private timer: number | undefined;
  private nextTime = 0;
  private cur = 0;
  private listeners = new Set<Listener>();

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }
  emit() {
    this.listeners.forEach((l) => l());
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.volume;
    const comp = ctx.createDynamicsCompressor();
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;
    this.master.connect(comp);
    comp.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    this.delay = ctx.createDelay(1);
    this.delay.delayTime.value = 0.32;
    const fb = ctx.createGain();
    fb.gain.value = 0.35;
    const wet = ctx.createGain();
    wet.gain.value = 0.4;
    this.delay.connect(fb);
    fb.connect(this.delay);
    this.delay.connect(wet);
    wet.connect(this.master);

    const len = ctx.sampleRate;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
    this.emit();
  }

  toggle() {
    this.playing ? this.stop() : this.start();
  }

  start() {
    this.init();
    if (this.playing || !this.ctx) return;
    this.playing = true;
    this.cur = 0;
    this.nextTime = this.ctx.currentTime + 0.06;
    this.timer = window.setInterval(() => this.tick(), 25);
    this.emit();
  }

  stop() {
    this.playing = false;
    this.step = -1;
    if (this.timer) clearInterval(this.timer);
    this.emit();
  }

  private tick() {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + 0.12) {
      const s = this.cur;
      const t = this.nextTime;
      this.playStep(s, t);
      window.setTimeout(() => {
        if (this.playing) {
          this.step = s;
          this.emit();
        }
      }, Math.max(0, (t - ctx.currentTime) * 1000));
      this.nextTime += 60 / this.bpm / 4;
      this.cur = (s + 1) % STEPS;
    }
  }

  private playStep(s: number, t: number) {
    const p = this.pattern;
    if (p[0][s]) this.kick(t);
    if (p[1][s]) this.snare(t);
    if (p[2][s]) this.hat(t);
    const root = KEYS[this.key];
    if (p[3][s]) this.bass(t, (root / 2) * (s % 8 === 6 ? 1.5 : 1));
    if (p[4][s]) this.lead(t, root * 2 * Math.pow(2, PENTA[p[4][s]] / 12));
  }

  private env(g: GainNode, t: number, peak: number, dur: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    this.env(g, t, 1, 0.45);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.5);
  }

  private snare(t: number) {
    const ctx = this.ctx!;
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1800;
    const g = ctx.createGain();
    this.env(g, t, 0.55, 0.2);
    n.connect(f).connect(g).connect(this.master);
    n.start(t);
    n.stop(t + 0.25);
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.1);
    const g2 = ctx.createGain();
    this.env(g2, t, 0.35, 0.12);
    o.connect(g2).connect(this.master);
    o.start(t);
    o.stop(t + 0.15);
  }

  private hat(t: number) {
    const ctx = this.ctx!;
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 7500;
    const g = ctx.createGain();
    this.env(g, t, 0.22, 0.05);
    n.connect(f).connect(g).connect(this.master);
    n.start(t);
    n.stop(t + 0.08);
  }

  private bass(t: number, freq: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(700, t);
    f.frequency.exponentialRampToValueAtTime(120, t + 0.25);
    const g = ctx.createGain();
    this.env(g, t, 0.5, 0.3);
    o.connect(f).connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.35);
  }

  private lead(t: number, freq: number) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    this.env(g, t, 0.16, 0.32);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 2600;
    f.connect(g);
    g.connect(this.master);
    g.connect(this.delay);
    [-7, 7].forEach((det) => {
      const o = ctx.createOscillator();
      o.type = "square";
      o.frequency.value = freq;
      o.detune.value = det;
      o.connect(f);
      o.start(t);
      o.stop(t + 0.4);
    });
  }

  /* ---- editing ---- */
  toggleCell(track: number, s: number) {
    const p = this.pattern.map((r) => r.slice());
    if (track === 4) p[4][s] = (p[4][s] + 1) % (PENTA.length);
    else p[track][s] = p[track][s] ? 0 : 1;
    this.pattern = p;
    this.activePreset = null;
    if (this.ctx && !this.playing) {
      // audition
      const t = this.ctx.currentTime + 0.01;
      if (track === 0 && p[0][s]) this.kick(t);
      if (track === 1 && p[1][s]) this.snare(t);
      if (track === 2 && p[2][s]) this.hat(t);
      if (track === 3 && p[3][s]) this.bass(t, KEYS[this.key] / 2);
      if (track === 4 && p[4][s]) this.lead(t, KEYS[this.key] * 2 * Math.pow(2, PENTA[p[4][s]] / 12));
    }
    this.emit();
  }

  load(id: string) {
    const pr = PRESETS.find((p) => p.id === id);
    if (!pr) return;
    this.pattern = pr.pattern.map((r) => r.slice());
    this.bpm = pr.bpm;
    this.key = pr.key;
    this.activePreset = id;
    this.emit();
  }

  clear() {
    this.pattern = TRACKS.map(() => Array(STEPS).fill(0));
    this.activePreset = null;
    this.emit();
  }

  randomize() {
    const r = (prob: number) => (Math.random() < prob ? 1 : 0);
    this.pattern = [
      Array.from({ length: STEPS }, (_, i) => (i % 4 === 0 ? r(0.7) : r(0.12))),
      Array.from({ length: STEPS }, (_, i) => (i % 8 === 4 ? 1 : r(0.08))),
      Array.from({ length: STEPS }, (_, i) => (i % 2 === 1 ? r(0.7) : r(0.25))),
      Array.from({ length: STEPS }, () => r(0.25)),
      Array.from({ length: STEPS }, () => (Math.random() < 0.3 ? 1 + Math.floor(Math.random() * 5) : 0)),
    ];
    this.activePreset = null;
    this.emit();
  }

  setBpm(b: number) {
    this.bpm = b;
    this.emit();
  }
  setKey(k: string) {
    this.key = k;
    this.emit();
  }
}

export const engine = new Engine();
