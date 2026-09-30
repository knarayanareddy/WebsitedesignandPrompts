import { useEffect, useRef, useState, type RefObject } from 'react';
import Reveal from './Reveal';
import AmbientVideo from '@/lib/AmbientVideo';
import { useTilt } from '@/lib/pointer';

type Stat = {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { prefix: '$', value: 4.2, decimals: 1, suffix: 'B', label: 'Forecast volume processed daily' },
  { value: 99.98, decimals: 2, suffix: '%', label: 'Platform uptime across regions' },
  { value: 12, suffix: 'ms', label: 'Median query latency at p50' },
  { value: 340, suffix: '+', label: 'Production models in service' },
];

/** rAF count-up that resolves instantly under prefers-reduced-motion. */
function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(() =>
    stat.value.toLocaleString('en-US', {
      minimumFractionDigits: stat.decimals ?? 0,
      maximumFractionDigits: stat.decimals ?? 0,
    }),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const format = (v: number) =>
      v.toLocaleString('en-US', {
        minimumFractionDigits: stat.decimals ?? 0,
        maximumFractionDigits: stat.decimals ?? 0,
      });

    if (reduced) return;

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(stat.value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [stat]);

  return (
    <span ref={ref}>
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

function StatCell({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useTilt(ref as RefObject<HTMLElement | null>, 3);
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="tilt tilt-glow h-full rounded-[24px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8"
      >
        <p className="text-white text-[32px] sm:text-[46px] lg:text-[52px] font-[450] leading-[1] tracking-[-0.02em]">
          <Counter stat={stat} />
        </p>
        <p className="text-white/60 text-[13px] sm:text-[15px] font-[450] leading-[1.45] mt-3 sm:mt-4">
          {stat.label}
        </p>
      </div>
    </Reveal>
  );
}

/** Full-bleed "data field" band — the numbers, floating on glass over video. */
export default function Metrics() {
  return (
    <section className="relative w-full overflow-hidden">
      <AmbientVideo
        src="./videos/field.mp4"
        poster="./posters/poster-field.jpg"
        fallback="radial-gradient(ellipse 70% 60% at 50% 40%, rgba(41,56,140,0.45), transparent 70%), #080A19"
      />
      {/* legibility scrim + edge fades into the page */}
      <div className="absolute inset-0 bg-[#080A19]/55" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080A19] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080A19] to-transparent" />

      <div className="relative max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32">
        <Reveal>
          <p className="text-white/50 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase">
            The numbers
          </p>
          <h2 className="text-white text-[28px] sm:text-[38px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] mt-4 sm:mt-5 max-w-[640px]">
            Signal, at the scale your business runs
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
