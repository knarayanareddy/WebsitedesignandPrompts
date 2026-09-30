import { useMemo, useRef, useState, type RefObject } from 'react';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import { useTilt } from '@/lib/pointer';

type Range = 'today' | 'm30' | 'ytd';

const RANGES: { id: Range; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'm30', label: '30D' },
  { id: 'ytd', label: 'YTD' },
];

/** Baseline curve family per range; sliders bend these live. */
const SERIES: Record<
  Range,
  { start: number; gain: number; curve: number; phase: number; amount: number; unit: string; baseDelta: number; caption: string }
> = {
  today: { start: 160, gain: 132, curve: 0.85, phase: 0.4, amount: 14.2, unit: 'M', baseDelta: 2.1, caption: 'projected revenue · vs. yesterday' },
  m30: { start: 175, gain: 128, curve: 0.9, phase: 1.7, amount: 312.4, unit: 'M', baseDelta: 11.8, caption: 'projected revenue · vs. previous 30 days' },
  ytd: { start: 185, gain: 145, curve: 1.1, phase: 3.1, amount: 4.2, unit: 'B', baseDelta: 32.4, caption: 'projected revenue · vs. previous year' },
};

const DEFAULT_GROWTH = 12;
const DEFAULT_VOL = 18;

function buildPath(range: Range, growth: number, vol: number): string {
  const cfg = SERIES[range];
  const pts: string[] = [];
  for (let x = 0; x <= 520; x += 13) {
    const u = x / 520;
    let y = cfg.start - cfg.gain * Math.pow(u, cfg.curve);
    y -= (growth - DEFAULT_GROWTH) * 2.2 * Math.pow(u, 1.15);
    y += Math.sin(u * 9.4 + cfg.phase) * vol * 0.55 + Math.sin(u * 21 + cfg.phase * 2) * vol * 0.22;
    y = Math.min(206, Math.max(14, y));
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')}`;
}

function formatAmount(base: number, unit: string, growth: number): string {
  const scaled = base * (1 + (growth - DEFAULT_GROWTH) * 0.014);
  return `$${scaled.toFixed(1)}${unit}`;
}

const BULLETS = [
  'Live ensemble forecasts, refreshed every 60 seconds',
  'Assumption sliders with instant re-forecast',
  'Export-ready narratives for every stakeholder',
];

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-white/70 text-[12px] sm:text-[13px] font-[450] tracking-[0.06em]">
          {label}
        </span>
        <span className="text-white text-[13px] sm:text-[14px] font-[450] tabular-nums">
          {format(value)}
        </span>
      </span>
      <input
        type="range"
        className="apogee-range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function Console() {
  const [range, setRange] = useState<Range>('today');
  const [growth, setGrowth] = useState(DEFAULT_GROWTH);
  const [vol, setVol] = useState(DEFAULT_VOL);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useTilt(panelRef as RefObject<HTMLElement | null>, 1.6);

  const cfg = SERIES[range];
  const path = useMemo(() => buildPath(range, growth, vol), [range, growth, vol]);
  const amount = formatAmount(cfg.amount, cfg.unit, growth);
  const delta = `${(cfg.baseDelta + (growth - DEFAULT_GROWTH) * 0.75).toFixed(1)}%`;
  const dirty = growth !== DEFAULT_GROWTH || vol !== DEFAULT_VOL;

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
                Apogee folds ingestion, reasoning and scenario planning into one surface. This
                one is live — move the assumptions and watch the forecast answer.
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

          {/* Console panel — the RevenueCard language, now interactive */}
          <Reveal delay={120} className="w-full">
            <div
              ref={panelRef}
              className="tilt tilt-glow w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-5 sm:p-8"
            >
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
                <p className="text-white text-[28px] sm:text-[40px] font-[450] leading-[1] tabular-nums">
                  {amount}
                </p>
                <span className="px-[6px] py-[7px] bg-white/20 rounded-[6px] text-white text-[12px] sm:text-[14px] font-[450] leading-[14px] tabular-nums">
                  +{delta}
                </span>
                <p className="text-white/60 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
                  {cfg.caption}
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

                  <path d={`${path} L 520 220 L 0 220 Z`} fill="url(#apogeeArea)" />
                  {/* key={range} replays the line-draw per tab; slider moves update `d` live */}
                  <path
                    key={range}
                    d={path}
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

              {/* Assumption sliders — the panel's interactive core */}
              <div className="mt-6 sm:mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <Slider
                  label="Market growth"
                  value={growth}
                  min={-5}
                  max={25}
                  step={0.5}
                  format={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`}
                  onChange={setGrowth}
                />
                <Slider
                  label="Volatility"
                  value={vol}
                  min={0}
                  max={60}
                  step={1}
                  format={(v) => v.toFixed(0)}
                  onChange={setVol}
                />
              </div>

              <div className="flex items-center justify-between mt-5">
                <p className="text-white/35 text-[11px] sm:text-[12px] font-[450] leading-[1.4]">
                  Drag the assumptions — the forecast recomputes instantly
                </p>
                {dirty && (
                  <button
                    type="button"
                    onClick={() => {
                      setGrowth(DEFAULT_GROWTH);
                      setVol(DEFAULT_VOL);
                    }}
                    className="text-white/55 text-[12px] font-[450] px-3 py-1.5 rounded-[8px] border border-white/[0.1] hover:text-white hover:border-white/25 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
