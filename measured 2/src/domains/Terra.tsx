import { useMemo, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { clamp, fmt, lerp, rng } from '../lib/engine'

const A = '#a3e635'
const F = 'font-fraunces'


/* ---------- soil model ---------- */
const HORIZONS = [
  { n: 'O · Organic litter', to: 0.12 },
  { n: 'A · Topsoil', to: 0.56 },
  { n: 'B · Subsoil (clay)', to: 1.24 },
  { n: 'C · Parent material', to: 1.76 },
  { n: 'R · Bedrock', to: 2 },
]
const hz = (d: number) => HORIZONS.find((h) => d <= h.to)!.n
const moisture = (d: number) => 14 + 24 * Math.exp(-Math.pow((d - 0.7) / 0.5, 2)) + 5 * d
const ph = (d: number) => 6.1 + 0.95 * d
const temp = (d: number) => 17 - 7 * (d / 2)
const microbes = (d: number) => 9.5e8 * Math.exp(-d * 3.2)

function Soil() {
  const roots = useMemo(() => {
    const r = rng(12)
    return Array.from({ length: 11 }).map((_, i) => {
      const x = 60 + i * 88 + r() * 30
      const len = 160 + r() * 140
      let d = `M${x} 0`
      let cx = x
      for (let k = 1; k <= 6; k++) {
        cx += (r() - 0.5) * 50
        d += `L${cx.toFixed(0)} ${((len / 6) * k).toFixed(0)}`
      }
      return { d, x, len, b: r() > 0.4 }
    })
  }, [])
  const specks = useMemo(() => {
    const r = rng(3)
    return Array.from({ length: 220 }).map(() => ({ x: r() * 1000, y: r() * 500, s: r() * 2 + 0.5, o: r() * 0.5 }))
  }, [])
  const y = (d: number) => (d / 2) * 500
  return (
    <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="h-full w-full">
      <rect y="0" width="1000" height={y(0.12)} fill="#1a1008" />
      <rect y={y(0.12)} width="1000" height={y(0.56 - 0.12)} fill="#3b2a1c" />
      <rect y={y(0.56)} width="1000" height={y(1.24 - 0.56)} fill="#6a4a2c" />
      <rect y={y(1.24)} width="1000" height={y(1.76 - 1.24)} fill="#85745a" />
      <rect y={y(1.76)} width="1000" height={y(0.24) + 2} fill="#2a2a2e" />
      {specks.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#000" opacity={s.o * 0.6} />)}
      {roots.map((r, i) => (
        <g key={i}>
          <path d={r.d} fill="none" stroke={A} strokeWidth="2.2" strokeOpacity=".85" strokeLinecap="round" />
          {r.b && <path d={`M${r.x} ${r.len * 0.4}q-40 30 -60 70M${r.x} ${r.len * 0.6}q40 20 70 60`} fill="none" stroke={A} strokeOpacity=".5" />}
        </g>
      ))}
      {[0.35, 0.6, 0.8, 1.0, 0.5, 0.7].map((d, i) => <circle key={i} cx={120 + i * 150} cy={y(d + 0.25)} r="9" fill="#22d3ee" opacity=".7" className="a-pulse" style={{ animationDelay: `${i * 0.4}s` }} />)}
      <path d="M200 120q30-20 60 0t60 0M700 170q30 20 60 0t60 0" fill="none" stroke="#f9a8d4" strokeWidth="5" strokeLinecap="round" />
      {HORIZONS.slice(0, 4).map((h) => <line key={h.n} x1="0" x2="1000" y1={y(h.to)} y2={y(h.to)} stroke="#fff" strokeOpacity=".25" strokeDasharray="6 8" />)}
    </svg>
  )
}

function Probe() {
  const [d, setD] = useState(0.55)
  const zone = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const f = d / 2
  const set = (cy: number) => {
    const b = zone.current!.getBoundingClientRect()
    setD(clamp(((cy - b.top) / b.height) * 2, 0.05, 1.96))
  }
  return (
    <>
      {/* ground */}
      <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-[#05070a] via-[#2a1a14] to-[#e89a52]/70" />
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-x-0 top-[24%] h-[22%] w-full" aria-hidden>
        <circle cx="720" cy="170" r="58" fill="#ffd28a" opacity=".85" />
        {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${-200 + i * 120} 200 Q${300 + i * 40} 120 ${500 + i * 35} 70`} stroke="#0b1406" strokeWidth={5 + i * 0.6} fill="none" opacity=".9" />)}
        {Array.from({ length: 30 }).map((_, i) => <line key={i} x1={20 + i * 33} y1="200" x2={20 + i * 33 + (i % 2 ? 4 : -4)} y2={150 - (i % 5) * 6} stroke={A} strokeWidth="2" />)}
      </svg>
      <div className="absolute inset-x-0 top-[46%] h-px bg-[#e89a52]" />
      {/* soil region */}
      <div ref={zone} className="absolute inset-x-0 bottom-0 top-[46%] bg-[#0a0705]" onPointerDown={(e) => { if (e.pointerType === 'mouse') set(e.clientY) }} onClick={(e) => set(e.clientY)}>
        <div aria-hidden className="absolute inset-0 transition-[clip-path] duration-100" style={{ clipPath: `inset(0 0 ${(1 - f) * 100}% 0)` }}>
          <Soil />
        </div>
        {/* depth ruler */}
        {[0, 0.5, 1, 1.5, 2].map((m) => <span key={m} className="pointer-events-none absolute left-2 -translate-y-1/2 font-mono text-[10px] text-white/40" style={{ top: `${(m / 2) * 100}%`, marginTop: m === 0 ? 8 : 0 }}>{m.toFixed(1)} m</span>)}
        {/* probe shaft + knob */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-white to-white/60" style={{ height: `${f * 100}%`, boxShadow: `0 0 16px ${A}` }} />
        <button
          role="slider"
          aria-label="Probe depth"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={Number(d.toFixed(2))}
          aria-valuetext={`${d.toFixed(2)} metres, ${hz(d)}`}
          className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 bg-black text-lg text-white outline-none focus-visible:ring-2 focus-visible:ring-white active:cursor-grabbing"
          style={{ top: `${f * 100}%`, borderColor: A, touchAction: 'none', boxShadow: `0 0 26px ${A}` }}
          onPointerDown={(e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); drag.current = true }}
          onPointerMove={(e) => drag.current && set(e.clientY)}
          onPointerUp={() => (drag.current = false)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setD((v) => clamp(v + 0.05, 0.05, 1.96)) }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setD((v) => clamp(v - 0.05, 0.05, 1.96)) }
          }}
        >
          ↕
        </button>
      </div>
      {/* HUD */}
      <div className="liquid-glass pointer-events-none absolute bottom-8 right-5 w-64 rounded-2xl p-4 font-mono text-[11px] text-white/60 md:right-10">
        <div className="mb-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: A }}>{hz(d)}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div><b className="text-xl text-white">{d.toFixed(2)}</b> m</div>
          <div><b className="text-xl text-white">{moisture(d).toFixed(0)}</b> % moisture</div>
          <div>pH <b className="text-xl text-white">{ph(d).toFixed(1)}</b></div>
          <div><b className="text-xl text-white">{temp(d).toFixed(1)}</b> °C</div>
          <div className="col-span-2"><b className="text-white">{microbes(d).toExponential(1)}</b> CFU/g microbes</div>
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-10 left-5 max-w-[45%] font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 md:left-10">Drag the probe ↓ or use arrow keys</p>
    </>
  )
}

/* ---------- season ---------- */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CROPS = [
  { n: 'Wheat', sow: 10, len: 9, c: '#e5c35a', peak: 420 },
  { n: 'Maize', sow: 4, len: 6, c: '#facc15', peak: 620 },
  { n: 'Rice', sow: 5, len: 5, c: '#d9f99d', peak: 1100 },
  { n: 'Tomato', sow: 3, len: 6, c: '#ef4444', peak: 520 },
]
const growth = (c: (typeof CROPS)[number], m: number) => {
  const k = (m - c.sow + 12) % 12
  return k <= c.len ? k / c.len : 0
}
const stage = (g: number) => (g === 0 ? 'Fallow' : g < 0.2 ? 'Seedling' : g < 0.55 ? 'Vegetative' : g < 0.8 ? 'Flowering' : g < 1 ? 'Ripening' : 'Harvest')
function Season() {
  const [ci, setCi] = useState(0)
  const [m, setM] = useState(3)
  const c = CROPS[ci]
  const g = growth(c, m)
  const water = (mm: number) => {
    const gg = growth(c, mm)
    return gg === 0 ? 0 : Math.sin(Math.PI * Math.min(1, gg)) * c.peak * 0.22
  }
  const H = 30 + g * 170
  return (
    <>
      <Copy id="season" font={F} size="md" pos="top" kicker="Crop model · northern hemisphere" title={<>One year, <em>one crop</em></>} sub="Pick a crop and scrub the calendar. Growth and water demand update from the soil up." accent={A} right={<span />} />
      <svg viewBox="0 0 300 260" className="absolute left-[6%] top-[40%] h-[22%] md:left-[30%] md:top-[26%] md:h-[44%]" role="img" aria-label={`${c.n} at ${stage(g)}`}>
        <path d="M0 240H300" stroke="#fff" strokeOpacity=".2" />
        <rect x="0" y="240" width="300" height="20" fill="#3b2a1c" />
        {g > 0 && (
          <g transform="translate(150 240)">
            <line x1="0" y1="0" x2="0" y2={-H} stroke={A} strokeWidth="5" strokeLinecap="round" />
            {Array.from({ length: Math.floor(g * 7) }).map((_, i) => {
              const yy = -28 - i * (H / 8)
              const s = i % 2 ? 1 : -1
              return <path key={i} d={`M0 ${yy}q${s * 50} -24 ${s * 70} -4q${-s * 40} 20 ${-s * 70} 4`} fill={A} opacity=".85" />
            })}
            {g > 0.55 && Array.from({ length: c.n === 'Tomato' ? 5 : 9 }).map((_, i) => <circle key={i} cx={c.n === 'Tomato' ? ((i % 3) - 1) * 26 : (i % 2 ? 7 : -7)} cy={c.n === 'Tomato' ? -60 - i * 12 : -H - 6 + i * 8} r={c.n === 'Tomato' ? 11 : 6} fill={c.c} />)}
          </g>
        )}
        {g === 0 && <text x="150" y="215" textAnchor="middle" fill="#fff" opacity=".4" fontFamily="JetBrains Mono" fontSize="12">fallow</text>}
      </svg>
      <div className="absolute right-5 top-[40%] h-[22%] w-[56%] md:right-10 md:top-[26%] md:h-[44%] md:w-[38%]">
        <div className="flex h-full items-end gap-1.5 md:gap-2.5">
          {MONTHS.map((mm, i) => {
            const w = water(i + 1)
            return (
              <button key={mm} onClick={() => setM(i + 1)} aria-label={`${mm}: ${Math.round(w)} mm`} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <div className="w-full rounded-t-md transition-all duration-500" style={{ height: `${Math.max(3, (w / (c.peak * 0.22)) * 100)}%`, background: i + 1 === m ? A : 'rgba(163,230,53,.25)', boxShadow: i + 1 === m ? `0 0 20px ${A}` : undefined }} />
                <span className="font-mono text-[9px] text-white/40">{mm[0]}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 mx-auto max-w-3xl rounded-3xl p-5 md:bottom-12">
        <div className="mb-3 flex flex-wrap gap-2">{CROPS.map((x, i) => <Pill key={x.n} active={ci === i} accent={A} onClick={() => setCi(i)} className="px-3 py-1.5 text-xs">{x.n}</Pill>)}</div>
        <div className="grid items-center gap-4 md:grid-cols-[1.3fr_1fr]">
          <Range label="Month" value={m} min={1} max={12} onChange={setM} accent={A} readout={MONTHS[m - 1]} />
          <div className="font-mono text-[11px] text-white/60"><b className="text-xl text-white">{stage(g)}</b> · {Math.round(g * 100)}% grown<br />water demand <b className="text-white">{Math.round(water(m))} mm</b>/month · season {fmt(Math.round(MONTHS.reduce((s, _, i) => s + water(i + 1), 0)))} mm</div>
        </div>
      </div>
    </>
  )
}

/* ---------- field ---------- */
const COLS = 14
const ROWS = 8
const base = (i: number) => {
  const c = i % COLS
  const r = Math.floor(i / COLS)
  return clamp(0.5 + 0.28 * Math.sin(c * 0.55 + 1) + 0.22 * Math.cos(r * 0.8 + c * 0.25) + 0.08 * Math.sin(c * r * 0.3), 0, 1) * 100
}
const cellColor = (v: number) => `rgb(${Math.round(lerp(120, 34, v / 100))},${Math.round(lerp(76, 211, v / 100))},${Math.round(lerp(40, 238, v / 100))})`

function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-4 top-[42%] bottom-[32%] md:inset-x-auto md:bottom-[14%] md:left-[42%] md:right-10 md:top-[14%]">
      <div className="grid h-full w-full gap-[3px]" style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}>{children}</div>
    </div>
  )
}
function Field() {
  const [irr, setIrr] = useState<Set<number>>(new Set())
  const [hv, setHv] = useState<number | null>(null)
  const n = COLS * ROWS
  const val = (i: number) => base(i) + (irr.has(i) ? 28 : 0)
  const dry = Array.from({ length: n }).filter((_, i) => val(i) < 35).length
  const used = irr.size * 120
  const blanket = n * 120
  const toggle = (i: number) => setIrr((s) => { const x = new Set(s); x.has(i) ? x.delete(i) : x.add(i); return x })
  return (
    <>
      <Copy id="field" font={F} size="md" pos="top" kicker="112 sensors · 4 hectares" title={<>Water only where it <em>hurts</em></>} sub="Sweep the spotlight to read each sensor. Click cells to irrigate — or let precision mode find the dry ones." accent={A} right={<span />} />
      <GridLayout>
        {Array.from({ length: n }).map((_, i) => (
          <button key={i} aria-label={`Cell ${i + 1}: ${Math.round(val(i))}% moisture`} onMouseEnter={() => setHv(i)} onFocus={() => setHv(i)} onClick={() => toggle(i)} className="rounded-[3px] transition-colors duration-500" style={{ background: cellColor(val(i)), boxShadow: irr.has(i) ? 'inset 0 0 0 2px #fff' : val(i) < 35 ? 'inset 0 0 0 1px #ef4444' : 'none' }} />
        ))}
      </GridLayout>
      {/* hidden numeric layer under the spotlight */}
      <div aria-hidden className="spot-mask pointer-events-none absolute inset-0">
        <GridLayout>
          {Array.from({ length: n }).map((_, i) => <span key={i} className="flex items-center justify-center font-mono text-[9px] font-medium text-black/80 md:text-[11px]" style={{ background: 'rgba(255,255,255,.65)' }}>{Math.round(val(i))}</span>)}
        </GridLayout>
      </div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(42%-2.5rem)] md:min-w-[360px]">
        <div className="flex flex-wrap gap-2">
          <Pill active accent={A} onClick={() => setIrr(new Set(Array.from({ length: n }).map((_, i) => i).filter((i) => base(i) < 35)))} className="px-3 py-1.5 text-xs">◎ Precision</Pill>
          <Pill onClick={() => setIrr(new Set(Array.from({ length: n }).map((_, i) => i)))} className="px-3 py-1.5 text-xs">Blanket</Pill>
          <Pill onClick={() => setIrr(new Set())} className="px-3 py-1.5 text-xs">Clear</Pill>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px] text-white/60">
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{dry}</div>dry cells</div>
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{fmt(used)}</div>litres used</div>
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg" style={{ color: A }}>{Math.round((1 - used / blanket) * 100)}%</div>saved vs blanket</div>
        </div>
        <p className="mt-2 min-h-4 font-mono text-[10px] text-white/40">{hv !== null ? `Sensor ${String.fromCharCode(65 + Math.floor(hv / COLS))}${(hv % COLS) + 1} · ${Math.round(val(hv))}% volumetric water` : 'Hover a cell for its sensor id.'}</p>
      </div>
    </>
  )
}

export default function Terra() {
  return (
    <>
      <Surface id="hero" gridColor="#a3e635" vignette={false}>
        <Probe />
        <Copy id="hero" h="h1" pos="top" size="lg" font={F} kicker="Loom soil probe" title="Terra" sub="The farm you can see is ten percent of the farm. Push the probe down and read the rest." accent={A} right={<span />} />
      </Surface>
      <Surface id="season" gridColor="#a3e635" className="min-h-[800px] md:min-h-[700px]"><Season /></Surface>
      <Surface id="field" gridColor="#a3e635" radius={200} className="min-h-[840px] md:min-h-[700px]"><Field /></Surface>
    </>
  )
}
