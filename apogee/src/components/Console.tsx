import { useState } from 'react';
import { Check } from 'lucide-react';
import Reveal from './Reveal';

type Range = 'today' | 'm30' | 'ytd';

const RANGES: { id: Range; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'm30', label: '30D' },
  { id: 'ytd', label: 'YTD' },
];

/** Hand-tuned SVG curves in a 520×220 viewBox — one per range. */
const SERIES: Record<Range, { line: string; amount: string; delta: string; caption: string }> = {
  today: {
    line: 'M 0 160 C 60 150, 90 120, 140 118 S 220 130, 260 100 S 340 60, 400 52 S 480 40, 520 28',
    amount: '$14.2M',
    delta: '+2.1%',
    caption: 'projected revenue · vs. yesterday',
  },
  m30: {
    line: 'M 0 175 C 70 168, 110 150, 160 142 S 240 128, 300 118 S 380 90, 440 70 S 500 55, 520 48',
    amount: '$312.4M',
    delta: '+11.8%',
    caption: 'projected revenue · vs. previous 30 days',
  },
  ytd: {
    line: 'M 0 185 C 80 180, 130 170, 190 150 S 280 120, 330 110 S 420 80, 470 60 S 510 50, 520 42',
    amount: '$4.2B',
    delta: '+32.4%',
    caption: 'projected revenue · vs. previous year',
  },
};

const BULLETS = [
  'Live ensemble forecasts, refreshed every 60 seconds',
  'Assumption sliders with instant re-forecast',
  'Export-ready narratives for every stakeholder',
];

export default function Console() {
  const [range, setRange] = useState<Range>('today');
  const series = SERIES[range];

  return (
    <section className="relative w-full">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:max-w-[480px]">
            <Reveal>
              <p className="text-white/50 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase">
                Forecast console
              </p>
              <h2 className="text-white text-[28px] sm:text-[38px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] mt-4 sm:mt-5">
                From raw signal to confident decision
              </h2>
              <p className="text-white/60 text-[15px] sm:text-[17px] font-[450] leading-[1.55] mt-5 sm:mt-6">
                Apogee folds ingestion, reasoning and scenario planning into one surface. Watch
                the model think, adjust the assumptions, ship the call.
              </p>
            </Reveal>
            <div className="flex flex-col gap-4 mt-7 sm:mt-8">
              {BULLETS.map((b, i) => (
                <Reveal key={b} delay={i * 90}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white/80" strokeWidth={2.5} />
                    </span>
                    <p className="text-white/75 text-[14px] sm:text-[15px] font-[450] leading-[1.5]">
                      {b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Console panel — the RevenueCard language, expanded */}
          <Reveal delay={120} className="w-full">
            <div className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-5 sm:p-8">
              {/* Header row: tabs + live badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 bg-white/[0.05] rounded-[11px] p-1">
                  {RANGES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRange(r.id)}
                      aria-pressed={range === r.id}
                      className={`h-[34px] px-4 rounded-[8px] text-[12px] sm:text-[13px] font-[450] transition-colors duration-200 ${
                        range === r.id
                          ? 'bg-white/15 text-white'
                          : 'text-white/55 hover:text-white/85'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-white/80" />
                  <span className="text-white/50 text-[11px] sm:text-[12px] font-[450] tracking-[0.18em] uppercase">
                    Live
                  </span>
                </div>
              </div>

              {/* Headline metric */}
              <div className="flex items-baseline gap-[10px] mt-6 sm:mt-8">
                <p className="text-white text-[28px] sm:text-[40px] font-[450] leading-[1]">
                  {series.amount}
                </p>
                <span className="px-[6px] py-[7px] bg-white/20 rounded-[6px] text-white text-[12px] sm:text-[14px] font-[450] leading-[14px]">
                  {series.delta}
                </span>
                <p className="text-white/60 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
                  {series.caption}
                </p>
              </div>

              {/* Chart */}
              <div className="relative mt-5 sm:mt-6">
                <svg
                  viewBox="0 0 520 220"
                  className="w-full h-[180px] sm:h-[220px]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="apogeeArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>

                  {/* horizontal gridlines (the card's grid language, rotated) */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="520"
                      y1={20 + i * 45}
                      y2={20 + i * 45}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                    />
                  ))}

                  <path key={`${range}-area`} d={`${series.line} L 520 220 L 0 220 Z`} fill="url(#apogeeArea)" />
                  <path
                    key={range}
                    d={series.line}
                    pathLength={1}
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="chart-line"
                  />
                </svg>
              </div>

              {/* Footer row: axis in the card's label style */}
              <div className="flex justify-between mt-3">
                {['10:00', '12:00', '14:00', '16:00', '16:00'].map((label, i) => (
                  <span
                    key={i}
                    className="text-[9px] sm:text-[10px] font-[450] leading-[10px] text-white/80"
                    style={{ opacity: i >= 3 ? 0.4 : 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
