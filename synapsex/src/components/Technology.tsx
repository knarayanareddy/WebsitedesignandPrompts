import { useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Brain, RefreshCw, TrendingUp, Waves } from 'lucide-react';

const TECH_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const FEATURES = [
  {
    icon: Brain,
    title: 'Cortical Mapping',
    description: 'Learns the geometry of your motor cortex in minutes, not months.',
  },
  {
    icon: Waves,
    title: 'Signal Isolation',
    description: 'Strips noise, muscle artifact and drift from every channel, live.',
  },
  {
    icon: TrendingUp,
    title: 'State Prediction',
    description: 'Anticipates intent 80ms before the nerve even fires.',
  },
  {
    icon: RefreshCw,
    title: 'Loop Feedback',
    description: 'Every response retrains the model that produced it.',
  },
] as const;

interface FeatureCardProps {
  feature: (typeof FEATURES)[number];
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const Icon = feature.icon;

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  };

  return (
    <motion.div
      className="feature-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25 md:p-6"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
    >
      {/* Cursor-tracking radial light spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.on ? 1 : 0,
          background: `radial-gradient(350px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Icon
          className="feature-icon h-5 w-5 text-white/70"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="mt-4 text-sm font-bold tracking-wider">{feature.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/55">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Technology() {
  return (
    <section id="technology" className="relative h-[100dvh] overflow-hidden bg-black">
      {/* Video #4 - adaptive technology */}
      <video
        src={TECH_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/85 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-24 md:px-10">
        {/* Top: heading + description */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
            Adaptive
            <br />
            Intelligence
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            SynapseX adapts to the unique topology of every nervous system. The
            longer you wear it, the sharper it gets — a model of you that
            rewrites itself in real time.
          </p>
        </motion.div>

        {/* Bottom: 4-column interactive feature grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
