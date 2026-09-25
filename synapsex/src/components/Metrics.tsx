import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const METRICS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

const STATS = [
  {
    key: 'latency',
    value: 2.4,
    decimals: 1,
    suffix: 'ms',
    jitter: true,
    durationMs: 1400,
    label: 'Synaptic Latency',
  },
  {
    key: 'accuracy',
    value: 99.7,
    decimals: 1,
    suffix: '%',
    padInt: 2,
    durationMs: 900,
    label: 'Signal Accuracy',
  },
  {
    key: 'params',
    value: 140,
    decimals: 0,
    suffix: 'B',
    durationMs: 1400,
    label: 'Neural Parameters',
  },
] as const;

export default function Metrics() {
  return (
    <section
      id="metrics"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Video #3 - metrics */}
      <video
        src={METRICS_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/70 md:text-sm">
          Performance Metrics
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
              className="column-flicker group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10"
            >
              {/* Vertical glitch scanlines - flicker on hover */}
              <div
                className="glitch-scanlines pointer-events-none absolute inset-0"
                aria-hidden="true"
              />

              <div className="relative z-10 text-center">
                {/* Live telemetry status badge */}
                <div className="flex items-center justify-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                  <span className="text-[10px] tracking-widest text-emerald-400/80 uppercase">
                    STREAM ACTIVE • 1000Hz
                  </span>
                </div>

                <div className="mt-5 text-[clamp(3.25rem,8vw,6.5rem)] font-bold leading-none tracking-tight tabular-nums">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    padInt={'padInt' in stat ? stat.padInt : undefined}
                    jitter={'jitter' in stat ? stat.jitter : false}
                    durationMs={stat.durationMs}
                  />
                </div>

                <div className="mt-5 text-xs uppercase tracking-[0.2em] text-white/60 md:text-sm">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
