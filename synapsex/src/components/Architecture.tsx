import { useId, useMemo, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion, useSpring } from 'framer-motion';

const LAYERS = [
  {
    index: '01',
    title: 'Capture',
    description:
      'A dry sensor lattice reads cortical and peripheral signal through the skin. No implants, no gel, no calibration ritual — slip it on and the channel is open.',
  },
  {
    index: '02',
    title: 'Process',
    description:
      'Neural silicon decodes intent on-device in 2.4ms. Signal becomes structure before it ever leaves the band, and nothing raw ever travels.',
  },
  {
    index: '03',
    title: 'Interface',
    description:
      'One network — thoughts arrive in your software as clean, typed events. Zero friction, zero translation, one feed for brain and body.',
  },
] as const;

/** Live sine signal that ripples infinitely (one full period per loop). */
function SignalWave() {
  const rawId = useId();
  const gradId = `synapsex-wave-${rawId.replace(/:/g, '')}`;

  const path = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= 1080; x += 3) {
      const y = 30 + Math.sin((x / 180) * Math.PI * 2) * 13;
      pts.push(`${x} ${y.toFixed(2)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);

  return (
    <svg
      viewBox="0 0 360 60"
      preserveAspectRatio="none"
      className="h-14 w-full drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <motion.g
        animate={{ x: [0, -180], scaleY: [1, 1.18, 1] }}
        transition={{
          x: { duration: 1.6, ease: 'linear', repeat: Infinity },
          scaleY: { duration: 2.3, ease: 'easeInOut', repeat: Infinity },
        }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <path d={path} fill="none" stroke={`url(#${gradId})`} strokeWidth="2" />
      </motion.g>
    </svg>
  );
}

interface LayerCardProps {
  layer: (typeof LAYERS)[number];
  active: boolean;
  onActivate: (index: string) => void;
  delay: number;
}

function LayerCard({ layer, active, onActivate, delay }: LayerCardProps) {
  // 3D magnetic tilt springs.
  const rotateX = useSpring(0, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    rotateX.set((my - 0.5) * -12);
    rotateY.set((mx - 0.5) * 12);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      style={{ perspective: '800px' }}
    >
      <motion.article
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`Layer ${layer.index} — ${layer.title}`}
        onMouseMove={handleMove}
        onMouseEnter={() => onActivate(layer.index)}
        onMouseLeave={reset}
        onFocus={() => onActivate(layer.index)}
        onClick={() => onActivate(layer.index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate(layer.index);
          }
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border p-8 outline-none transition-colors md:p-12 ${
          active
            ? 'border-white/30 bg-white/[0.045]'
            : 'border-white/10 bg-white/[0.02] hover:border-white/25'
        }`}
      >
        {/* Sweeping cyan/white laser scanline on active cards */}
        {active && (
          <span
            className="pointer-events-none absolute inset-x-0 h-px opacity-40"
            style={{
              background:
                'linear-gradient(90deg, transparent, #22d3ee 30%, #ffffff 50%, #22d3ee 70%, transparent)',
              animation: 'scanline 2.2s linear infinite',
            }}
            aria-hidden="true"
          />
        )}

        <div className="text-xs uppercase tracking-[0.25em] text-white/40">
          Layer {layer.index}
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">{layer.title}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          {layer.description}
        </p>

        {/* Expanding live signal waveform */}
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key="wave"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 72, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <SignalWave />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
}

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState<string>('01');

  return (
    <section id="architecture" className="relative min-h-screen bg-black py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight"
        >
          Three layers. Zero friction.
        </motion.h2>

        <div className="mt-14 flex flex-col gap-6 md:mt-20">
          {LAYERS.map((layer, i) => (
            <LayerCard
              key={layer.index}
              layer={layer}
              active={activeLayer === layer.index}
              onActivate={setActiveLayer}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
