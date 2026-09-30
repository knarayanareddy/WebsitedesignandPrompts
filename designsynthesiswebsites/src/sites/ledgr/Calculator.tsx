import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#C6F432";

export const PROFILES = [
  { k: "Calm", rate: 3.8, spread: 2.2, vol: 4, dd: -8, blurb: "Steady and bond-heavy. Built for goals under five years." },
  { k: "Balanced", rate: 6.2, spread: 3.6, vol: 9, dd: -17, blurb: "A global mix of equities and bonds for the long middle." },
  { k: "Bold", rate: 8.6, spread: 5.5, vol: 15, dd: -31, blurb: "Equity-led growth. Expect bumps; ten years or more." },
];

const fmt = (n: number) => `€${Math.round(n).toLocaleString()}`;

function project(start: number, monthly: number, years: number, rate: number) {
  const r = rate / 100 / 12;
  const out = [start];
  let b = start;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) b = b * (1 + r) + monthly;
    out.push(b);
  }
  return out;
}

export function Calculator() {
  const [start, setStart] = useState(10000);
  const [monthly, setMonthly] = useState(400);
  const [years, setYears] = useState(20);
  const [pi, setPi] = useState(1);
  const [ledgrFee, setLedgrFee] = useState(true);
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const p = PROFILES[pi];
  const fee = ledgrFee ? 0.25 : 1.4;

  const d = useMemo(() => {
    const exp = project(start, monthly, years, p.rate - fee);
    const low = project(start, monthly, years, Math.max(0, p.rate - fee - p.spread));
    const high = project(start, monthly, years, p.rate - fee + p.spread);
    const contrib = Array.from({ length: years + 1 }, (_, y) => start + monthly * 12 * y);
    const alt = project(start, monthly, years, p.rate - (ledgrFee ? 1.4 : 0.25));
    return { exp, low, high, contrib, alt };
  }, [start, monthly, years, p, fee, ledgrFee]);

  const W = 800;
  const H = 380;
  const padL = 10;
  const padB = 28;
  const max = Math.max(...d.high) * 1.05;
  const X = (i: number) => padL + (i / years) * (W - padL - 10);
  const Y = (v: number) => H - padB - (v / max) * (H - padB - 14);
  const line = (a: number[]) => a.map((v, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const band = `${line(d.high)} ${d.low
    .map((_, i) => `L${X(years - i).toFixed(1)},${Y(d.low[years - i]).toFixed(1)}`)
    .join(" ")} Z`;
  const area = `${line(d.exp)} L${X(years)},${H - padB} L${X(0)},${H - padB} Z`;

  const final = d.exp[years];
  const contributed = d.contrib[years];
  const growth = final - contributed;
  const feeDiff = ledgrFee ? d.exp[years] - d.alt[years] : d.alt[years] - d.exp[years];
  const idx = hover ?? years;

  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - padL) / (W - padL - 10)) * years);
    setHover(Math.max(0, Math.min(years, i)));
  };

  const sliders = [
    { l: "Initial deposit", v: start, s: setStart, min: 0, max: 100000, step: 500, f: fmt },
    { l: "Monthly contribution", v: monthly, s: setMonthly, min: 0, max: 5000, step: 50, f: fmt },
    { l: "Time horizon", v: years, s: setYears, min: 1, max: 40, step: 1, f: (n: number) => `${n} yrs` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1728px] mx-auto">
      <div className="lg:col-span-4 flex flex-col gap-8">
        <div>
          <div className="text-xs uppercase tracking-wide text-white/60 mb-3">Risk profile</div>
          <div className="grid grid-cols-3 gap-2">
            {PROFILES.map((x, i) => (
              <button key={x.k} onClick={() => setPi(i)} className={`py-3 text-sm uppercase rounded-[2px] transition-colors ${pi === i ? "text-black" : "bg-neutral-800 text-white/60 hover:text-white"}`} style={pi === i ? { background: ACCENT } : undefined}>
                {x.k}
              </button>
            ))}
          </div>
          <div className="text-sm text-white/50 mt-3 min-h-[40px]">{p.blurb}</div>
        </div>

        {sliders.map((s) => (
          <div key={s.l}>
            <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
              <span className="text-white/60">{s.l}</span>
              <span className="tabular-nums">{s.f(s.v)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={(e) => s.s(parseFloat(e.target.value))} className="w-full" style={{ ["--thumb" as string]: ACCENT }} />
          </div>
        ))}

        <button onClick={() => setLedgrFee((f) => !f)} className="flex items-center justify-between border border-white/15 p-4 rounded-[2px] text-left hover:bg-white/5 transition-colors">
          <div>
            <div className="text-sm">{ledgrFee ? "Ledgr fee — 0.25% a year" : "Typical advisor — 1.40% a year"}</div>
            <div className="text-xs text-white/40 mt-1">Tap to compare</div>
          </div>
          <span className="w-10 h-5 rounded-full relative shrink-0" style={{ background: ledgrFee ? ACCENT : "#444" }}>
            <motion.span className="absolute top-0.5 w-4 h-4 rounded-full bg-white" animate={{ left: ledgrFee ? 22 : 2 }} />
          </span>
        </button>
      </div>

      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1">{hover === null ? `In ${years} years` : `At year ${idx}`}</div>
            <motion.div key={Math.round(d.exp[idx])} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="text-[56px] sm:text-7xl lg:text-[110px] leading-none font-light tabular-nums" style={{ color: ACCENT }}>
              {fmt(d.exp[idx])}
            </motion.div>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Range</div>
              <div className="tabular-nums">{fmt(d.low[idx])} – {fmt(d.high[idx])}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Volatility</div>
              <div>±{p.vol}%</div>
            </div>
          </div>
        </div>

        <div className="relative bg-[#11140d] border border-white/10 rounded-[2px] p-2 lg:p-4">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto touch-none cursor-crosshair" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
            {[0, 0.25, 0.5, 0.75, 1].map((g) => (
              <g key={g}>
                <line x1={padL} x2={W - 10} y1={Y(max * g / 1.05)} y2={Y(max * g / 1.05)} stroke="rgba(255,255,255,0.08)" />
                <text x={padL + 4} y={Y(max * g / 1.05) - 4} fill="rgba(255,255,255,0.35)" fontSize="10">
                  {g === 0 ? "" : `€${Math.round((max * g) / 1.05 / 1000)}k`}
                </text>
              </g>
            ))}
            {Array.from({ length: Math.min(years, 8) + 1 }).map((_, i) => {
              const yr = Math.round((i / Math.min(years, 8)) * years);
              return (
                <text key={i} x={X(yr)} y={H - 8} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">
                  {yr}y
                </text>
              );
            })}
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={ACCENT} stopOpacity="0.28" />
                <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={band} fill={ACCENT} opacity="0.1" />
            <path d={area} fill="url(#area)" />
            <path d={line(d.contrib)} fill="none" stroke="rgba(255,255,255,0.5)" strokeDasharray="4 5" strokeWidth="1.2" />
            <path d={line(d.exp)} fill="none" stroke={ACCENT} strokeWidth="2.2" />
            {hover !== null && (
              <g>
                <line x1={X(idx)} x2={X(idx)} y1={10} y2={H - padB} stroke="rgba(255,255,255,0.4)" />
                <circle cx={X(idx)} cy={Y(d.exp[idx])} r="5" fill="#000" stroke={ACCENT} strokeWidth="2" />
                <circle cx={X(idx)} cy={Y(d.contrib[idx])} r="3.5" fill="#fff" />
              </g>
            )}
          </svg>
          <div className="absolute top-4 right-4 flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/60 bg-black/40 px-3 py-2 rounded-[2px]">
            <span className="flex items-center gap-2"><span className="w-3 h-[2px]" style={{ background: ACCENT }} /> Expected</span>
            <span className="flex items-center gap-2"><span className="w-3 h-2 opacity-30" style={{ background: ACCENT }} /> Range</span>
            <span className="flex items-center gap-2"><span className="w-3 border-t border-dashed border-white/60" /> Contributed</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex h-3 w-full overflow-hidden rounded-[1px]">
            <motion.div animate={{ width: `${(contributed / final) * 100}%` }} className="bg-white/70" />
            <motion.div animate={{ width: `${(growth / final) * 100}%` }} style={{ background: ACCENT }} />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-5">
            {[
              ["You put in", fmt(contributed), "#fff"],
              ["Growth earned", fmt(growth), ACCENT],
              [ledgrFee ? "Saved vs. typical fees" : "Lost to higher fees", fmt(feeDiff), ledgrFee ? ACCENT : "#ff7a6b"],
            ].map(([k, v, c]) => (
              <div key={k} className="border-t border-white/15 pt-[10px]">
                <div className="text-[11px] uppercase tracking-wider text-white/40">{k}</div>
                <div className="text-xl lg:text-3xl tabular-nums" style={{ color: c }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/30 mt-6">Illustrative projection only — not a guarantee. Capital at risk.</p>
      </div>
    </div>
  );
}
