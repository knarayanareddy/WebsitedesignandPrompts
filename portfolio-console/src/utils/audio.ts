// Web Audio API Mechanical Switch Click Synthesizer

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playKeyClick(type: 'down' | 'up' = 'down') {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'down') {
    // 1. High-frequency click ping (plastic stem collision)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // 2. Low-frequency case bottom-out thud
    const oscThud = ctx.createOscillator();
    const gainThud = ctx.createGain();

    oscThud.type = 'sine';
    oscThud.frequency.setValueAtTime(180, now);
    oscThud.frequency.exponentialRampToValueAtTime(50, now + 0.06);

    gainThud.gain.setValueAtTime(0.35, now);
    gainThud.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);

    oscThud.start(now);
    oscThud.stop(now + 0.07);
  } else {
    // Key release (lighter crisp spring click)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }
}
