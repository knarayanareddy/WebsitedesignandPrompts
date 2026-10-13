/**
 * Zero-asset procedural sound engine (Web Audio API).
 * Stems: wind drone (pink noise), mineral hover crackle, fracture thud + chime,
 * close thud, wheel detent tick, about swell.
 */
interface BurstOpts { dur?: number; type?: BiquadFilterType; freq?: number; q?: number; gain?: number; pink?: boolean; attack?: number }
interface ToneOpts { freq?: number; dur?: number; gain?: number; type?: OscillatorType; slide?: number | null; attack?: number; fm?: number }

export class SoundEngine {
  ctx: AudioContext | null = null;
  on = false;
  private master!: GainNode;
  private pink!: AudioBuffer;
  private white!: AudioBuffer;
  private hoverAcc = 0;

  ensure() {
    if (this.ctx) return;
    const ctx = (this.ctx = new AudioContext());
    this.master = ctx.createGain(); this.master.gain.value = 0; this.master.connect(ctx.destination);
    // pink noise (Paul Kellet)
    const len = ctx.sampleRate * 4; const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
    this.pink = buf;
    const white = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const wd = white.getChannelData(0);
    for (let i = 0; i < wd.length; i++) wd[i] = Math.random() * 2 - 1;
    this.white = white;
    // wind drone
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = 0.7;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 1.6;
    const g = ctx.createGain(); g.gain.value = 0.55; const gb = ctx.createGain(); gb.gain.value = 0.12;
    src.connect(lp).connect(g).connect(this.master); src.connect(bp).connect(gb).connect(this.master);
    const lfo = (freq: number, amount: number, target: AudioParam) => { const o = ctx.createOscillator(); o.frequency.value = freq; const og = ctx.createGain(); og.gain.value = amount; o.connect(og).connect(target); o.start(); };
    lfo(0.07, 220, lp.frequency); lfo(0.11, 0.06, gb.gain); lfo(0.05, 350, bp.frequency);
    src.start();
    // sub drone (beating pair)
    const og = ctx.createGain(); og.gain.value = 0.045; og.connect(this.master);
    for (const f of [48, 48.4]) { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(og); o.start(); }
  }

  toggle(force?: boolean) {
    this.ensure(); const ctx = this.ctx!;
    this.on = force ?? !this.on; void ctx.resume();
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(this.on ? 0.9 : 0, ctx.currentTime, 0.5);
    return this.on;
  }

  private noiseBurst({ dur = 0.05, type = 'highpass', freq = 2000, q = 1, gain = 0.1, pink = false, attack = 0.002 }: BurstOpts) {
    const ctx = this.ctx!; const s = ctx.createBufferSource(); s.buffer = pink ? this.pink : this.white; s.loop = true; s.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + attack + dur);
    s.connect(f).connect(g).connect(this.master); s.start(t); s.stop(t + attack + dur + 0.05);
  }

  private tone({ freq = 440, dur = 0.3, gain = 0.1, type = 'sine', slide = null, attack = 0.005, fm = 0 }: ToneOpts) {
    const ctx = this.ctx!; const t = ctx.currentTime; const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    if (fm) { const m = ctx.createOscillator(); m.frequency.value = freq * 1.41; const mg = ctx.createGain(); mg.gain.value = fm; m.connect(mg).connect(o.frequency); m.start(t); m.stop(t + dur + 0.1); }
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master); o.start(t); o.stop(t + dur + 0.05);
  }

  /** Mineral geiger crackle while hovering the stone. */
  hover(intensity: number, dt: number) {
    if (!this.on) return;
    this.hoverAcc += dt * (6 + intensity * 40);
    if (this.hoverAcc > 1 && Math.random() < 0.6) { this.hoverAcc = 0; this.noiseBurst({ dur: 0.012 + Math.random() * 0.02, freq: 1800 + Math.random() * 3000, gain: 0.03 + intensity * 0.05, q: 2 }); }
  }
  /** Deep stone fracture thud + crystalline chime. */
  break() {
    if (!this.on) return;
    this.tone({ freq: 72, slide: 32, dur: 0.7, gain: 0.7, attack: 0.003 });
    this.noiseBurst({ dur: 0.28, type: 'lowpass', freq: 700, gain: 0.35, pink: true, attack: 0.004 });
    this.noiseBurst({ dur: 0.08, type: 'bandpass', freq: 2600, q: 1.5, gain: 0.18 });
    [1320, 1980, 2640, 3300].forEach((f, i) => setTimeout(() => this.tone({ freq: f * (1 + (Math.random() - 0.5) * 0.01), dur: 1.6 - i * 0.2, gain: 0.05 - i * 0.008, fm: 30 }), 40 + i * 55));
  }
  close() {
    if (!this.on) return;
    this.tone({ freq: 56, slide: 40, dur: 0.45, gain: 0.35 });
    this.noiseBurst({ dur: 0.2, type: 'lowpass', freq: 500, gain: 0.18, pink: true });
    setTimeout(() => this.noiseBurst({ dur: 0.03, type: 'bandpass', freq: 3000, gain: 0.1 }), 180);
  }
  /** Wooden/stone detent tick as the drum steps. */
  wheel() {
    if (!this.on) return;
    this.noiseBurst({ dur: 0.012, type: 'highpass', freq: 2500, gain: 0.12 });
    this.tone({ freq: 880 + Math.random() * 60, slide: 620, dur: 0.045, gain: 0.07, type: 'triangle' });
  }
  about(open: boolean) {
    if (!this.on) return;
    this.noiseBurst({ dur: 0.5, type: 'bandpass', freq: open ? 700 : 400, q: 0.8, gain: 0.12, pink: true, attack: 0.08 });
    this.tone({ freq: open ? 220 : 165, dur: 0.9, gain: 0.03, fm: 12 });
  }
}
