import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

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

export default function Metrics() {
  return (
    <section className="relative w-full">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-24">
        <Reveal>
          <p className="text-white/50 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase">
            The numbers
          </p>
          <h2 className="text-white text-[28px] sm:text-[38px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] mt-4 sm:mt-5 max-w-[640px]">
            Signal, at the scale your business runs
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-x-10 mt-12 sm:mt-16">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="border-t border-white/[0.08] pt-6 sm:pt-8">
                <p className="text-white text-[36px] sm:text-[52px] lg:text-[60px] font-[450] leading-[1] tracking-[-0.02em]">
                  <Counter stat={stat} />
                </p>
                <p className="text-white/50 text-[13px] sm:text-[15px] font-[450] leading-[1.45] mt-3 sm:mt-4 max-w-[220px]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
