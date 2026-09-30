import { useMemo, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, CtaPanel } from '../lib/ui'
import { clamp, fmt, lerp, rng, useFrame } from '../lib/engine'

const A = '#22d3ee'
const OX = 0.5 // beam origin (fraction of width)
const OY = 0.93 // beam origin (fraction of height)

function Plankton({ n = 70, seed = 4 }: { n?: number; seed?: number }) {
  const dots = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: n }).map(() => ({ x: r() * 100, y: r() * 100, s: r() * 2.4 + 0.8, d: r() * 6, o: r() * 0.4 + 0.1 }))
  }, [n, seed])
  return (
    <div aria-hidden className="absolute inset-0">
      {dots.map((d, i) => <span key={i} className="a-float absolute rounded-full bg-cyan-100" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, opacity: d.o, animationDelay: `${d.d}s`, animationDuration: `${7 + d.d}s` }} />)}
    </div>
  )
}

/* ---------- creatures ---------- */
const CREATURES = [
  { id: 'atolla', n: 'Atolla jellyfish', d: '1,200 m', x: 26, y: 40, c: '#67e8f9' },
  { id: 'angler', n: 'Deep-sea anglerfish', d: '2,000 m', x: 72, y: 34, c: '#fde047' },
  { id: 'squid', n: 'Vampire squid', d: '900 m', x: 50, y: 22, c: '#818cf8' },
  { id: 'siph', n: 'Giant siphonophore', d: '700 m', x: 14, y: 66, c: '#f0abfc' },
  { id: 'lantern', n: 'Lanternfish shoal', d: '600 m', x: 84, y: 62, c: '#5eead4' },
  { id: 'worms', n: 'Hydrothermal tube worms', d: '2,500 m', x: 64, y: 72, c: '#fb7185' },
]

function Creature({ id, c }: { id: string; c: string }) {
  const glow = { filter: `drop-shadow(0 0 10px ${c})` }
  switch (id) {
    case 'atolla':
      return (
        <svg viewBox="-60 -60 120 120" style={glow} className="a-float h-full w-full"><path d="M-40 10A40 40 0 0 1 40 10Z" fill={`${c}33`} stroke={c} strokeWidth="2" className="a-pulse" />{[-30, -15, 0, 15, 30].map((x) => <path key={x} d={`M${x} 10q8 18 0 34t4 30`} stroke={c} fill="none" strokeWidth="1.5" />)}<circle cy="-6" r="8" fill={c} opacity=".7" /></svg>
      )
    case 'angler':
      return (
        <svg viewBox="-60 -60 120 120" style={glow} className="a-float h-full w-full"><ellipse rx="34" ry="26" fill="#0b1a24" stroke={c} strokeOpacity=".7" /><path d="M-30 6l10 8 8-8 8 8 8-8 8 8 8-8" stroke="#fff" fill="none" /><circle cx="-14" cy="-6" r="4" fill={c} /><path d="M-6-24q-20-30-42-14" stroke={c} fill="none" strokeWidth="2" /><circle cx="-48" cy="-38" r="6" fill={c} className="a-pulse" /><path d="M32 0l22-14v28Z" fill="#0b1a24" stroke={c} strokeOpacity=".6" /></svg>
      )
    case 'squid':
      return (
        <svg viewBox="-60 -60 120 120" style={glow} className="a-float h-full w-full"><path d="M0-40C26-34 28 4 0 12 -28 4 -26-34 0-40Z" fill={`${c}22`} stroke={c} strokeWidth="1.6" /><circle cx="-10" cy="-8" r="6" fill="#60a5fa" /><circle cx="10" cy="-8" r="6" fill="#60a5fa" />{[-24, -12, 0, 12, 24].map((x) => <path key={x} d={`M${x} 10q${x / 3} 30 ${x / 2} 50`} stroke={c} fill="none" strokeWidth="2" />)}<path d="M-24 14Q0 40 24 14" fill={`${c}22`} stroke={c} strokeOpacity=".5" /></svg>
      )
    case 'siph':
      return (
        <svg viewBox="-80 -60 160 120" style={glow} className="a-float h-full w-full">{Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={-74 + i * 7} cy={Math.sin(i * 0.55) * 26} r={4 + (i % 3)} fill={i % 4 === 0 ? '#fff' : c} opacity=".85" className="a-pulse" style={{ animationDelay: `${i * 0.1}s` }} />)}</svg>
      )
    case 'lantern':
      return (
        <svg viewBox="-70 -50 140 100" style={glow} className="a-float h-full w-full">{[[-40, -14], [-10, 10], [22, -20], [40, 16], [0, -28], [-46, 22]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(${0.8 + (i % 3) * 0.15})`}><path d="M-16 0q16-12 32 0-16 12-32 0Zm32 0l10-7v14Z" fill={`${c}33`} stroke={c} />{[-8, -2, 4].map((dx) => <circle key={dx} cx={dx} cy="3" r="1.4" fill="#fff" />)}</g>)}</svg>
      )
    default:
      return (
        <svg viewBox="-60 -60 120 120" style={glow} className="h-full w-full">{[-36, -18, 0, 20, 38].map((x, i) => <g key={x}><path d={`M${x} 60V${-10 + (i % 2) * 18}`} stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" /><path d={`M${x} ${-10 + (i % 2) * 18}q-12-20-6-32M${x} ${-10 + (i % 2) * 18}q2-24 10-34M${x} ${-10 + (i % 2) * 18}q14-16 18-26`} stroke={c} strokeWidth="3" fill="none" className="a-pulse" style={{ animationDelay: `${i * 0.3}s` }} /></g>)}</svg>
      )
  }
}

function Beam() {
  const beam = useRef({ a: 0, len: 600 })
  const [found, setFound] = useState<string[]>([])
  const [toast, setToast] = useState('')
  const secRef = useRef<HTMLDivElement>(null)

  useFrame(({ x, y, w, h, el }) => {
    const ox = w * OX
    const oy = h * OY
    const a = clamp((Math.atan2(x - ox, oy - y) * 180) / Math.PI, -75, 75)
    const len = clamp(Math.hypot(x - ox, oy - y), 240, 1200)
    beam.current = { a, len }
    el.style.setProperty('--beam', `${a.toFixed(2)}deg`)
    el.style.setProperty('--bl', `${len.toFixed(0)}px`)
  })

  const say = (s: string) => {
    setToast(s)
    setTimeout(() => setToast((t) => (t === s ? '' : t)), 2200)
  }
  const tryLog = (c: (typeof CREATURES)[number], keyboard: boolean) => {
    if (found.includes(c.id)) return say(`${c.n} is already in your journal`)
    const b = secRef.current!.getBoundingClientRect()
    const dx = (b.width * c.x) / 100 - b.width * OX
    const dy = b.height * OY - (b.height * c.y) / 100
    const ca = (Math.atan2(dx, dy) * 180) / Math.PI
    const dist = Math.hypot(dx, dy)
    const inBeam = Math.abs(ca - beam.current.a) < 22 && dist < beam.current.len + 140
    if (inBeam || keyboard) {
      setFound((f) => [...f, c.id])
      say(`New species logged — ${c.n}`)
    } else say('Out of the beam — aim the light at it first')
  }

  const conic = 'conic-gradient(from calc(var(--beam, 0deg) - 18deg) at 50% 93%, transparent 0deg, #000 8deg, #000 28deg, transparent 36deg, transparent 360deg)'
  const radial = 'radial-gradient(circle at 50% 93%, #000 0, #000 var(--bl, 600px), transparent calc(var(--bl, 600px) + 180px))'
  return (
    <div ref={secRef} className="absolute inset-0">
      {/* light cone on the water */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ WebkitMaskImage: conic, maskImage: conic }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 93%, rgba(190,245,255,.55), rgba(34,211,238,.12) 55%, transparent 80%)' }} />
      </div>
      {/* hidden layer: creatures exist only in the beam */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ WebkitMaskImage: conic, maskImage: conic }}>
        <div className="absolute inset-0" style={{ WebkitMaskImage: radial, maskImage: radial }}>
          {CREATURES.map((c) => <div key={c.id} className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 md:h-40 md:w-40" style={{ left: `${c.x}%`, top: `${c.y}%` }}><Creature id={c.id} c={c.c} /></div>)}
        </div>
      </div>
      {/* submersible */}
      <svg aria-hidden viewBox="-80 -30 160 60" className="absolute bottom-[1%] left-1/2 w-40 -translate-x-1/2"><ellipse rx="64" ry="18" fill="#0b1a24" stroke="#fff" strokeOpacity=".3" /><circle cx="-18" cy="-2" r="9" fill="#67e8f9" opacity=".6" /><rect x="-10" y="-26" width="20" height="8" rx="3" fill="#1e3a4a" /><circle cy="-28" r="5" fill="#fff" className="a-pulse" /></svg>
      {/* hit targets */}
      {CREATURES.map((c) => <button key={c.id} aria-label={`Log specimen: ${c.n} (${c.d})`} onClick={(e) => tryLog(c, e.detail === 0)} className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" style={{ left: `${c.x}%`, top: `${c.y}%` }} />)}
      {/* found markers */}
      {CREATURES.filter((c) => found.includes(c.id)).map((c) => <span key={c.id} aria-hidden className="pointer-events-none absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest" style={{ left: `${c.x}%`, top: `${c.y + 9}%`, color: c.c, textShadow: `0 0 10px ${c.c}` }}>✓ {c.n}</span>)}
      <div className="liquid-glass pointer-events-none absolute right-3 top-[42%] w-44 rounded-2xl p-3 md:right-10 md:top-24 md:w-56 md:p-4" role="status" aria-live="polite">
        <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: A }}><span>Field journal</span><span className="text-white">{found.length}/6</span></div>
        <div className="mb-2 flex gap-1.5">{CREATURES.map((c) => <span key={c.id} className="h-1.5 flex-1 rounded-full" style={{ background: found.includes(c.id) ? c.c : 'rgba(255,255,255,.12)' }} />)}</div>
        <p className="min-h-8 font-mono text-[10px] leading-snug text-white/60">{toast || (found.length === 6 ? 'Survey complete. The ocean is 80% unexplored.' : 'Aim the beam, then click what glows.')}</p>
      </div>
    </div>
  )
}

/* ---------- descent ---------- */
const STOPS: [number, number[]][] = [[0, [26, 167, 216]], [200, [10, 74, 122]], [1000, [4, 28, 54]], [4000, [1, 10, 22]], [11000, [0, 0, 0]]]
function water(d: number) {
  let i = 0
  while (i < STOPS.length - 2 && d > STOPS[i + 1][0]) i++
  const [d0, a] = STOPS[i]
  const [d1, b] = STOPS[i + 1]
  const t = clamp((d - d0) / (d1 - d0), 0, 1)
  return a.map((v, k) => Math.round(lerp(v, b[k], t)))
}
const ZONES = [[200, 'Sunlight zone'], [1000, 'Twilight zone'], [4000, 'Midnight zone'], [6000, 'Abyssal zone'], [11000, 'Hadal zone']] as const
const SPECIES = [
  { n: 'Ocean sunfish', a: 0, b: 400 },
  { n: 'Sperm whale', a: 0, b: 2000 },
  { n: 'Hatchetfish', a: 200, b: 1000 },
  { n: 'Vampire squid', a: 600, b: 1200 },
  { n: 'Anglerfish', a: 1000, b: 4000 },
  { n: 'Dumbo octopus', a: 3000, b: 4800 },
  { n: 'Tripod fish', a: 4000, b: 6000 },
  { n: 'Mariana snailfish', a: 6000, b: 8200 },
]
function Descent() {
  const [s, setS] = useState(0.22)
  const d = Math.round((11000 * s * s) / 10) * 10
  const [r, g, b] = water(d)
  const zone = ZONES.find((z) => d <= z[0])![1]
  const temp = 2 + 22 * Math.exp(-d / 350)
  const light = 100 * Math.exp(-d / 45)
  const glowN = Math.round(clamp(Math.sin((clamp(d, 0, 6000) / 6000) * Math.PI) * 1.2, 0, 1) * 40)
  const dots = useMemo(() => { const q = rng(8); return Array.from({ length: 40 }).map(() => ({ x: q() * 100, y: q() * 100, d: q() * 3 })) }, [])
  return (
    <>
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgb(${r},${g},${b}), rgb(${Math.round(r * 0.5)},${Math.round(g * 0.5)},${Math.round(b * 0.6)}))`, opacity: 0.95, transition: 'background .15s' }} />
      <div aria-hidden className="absolute inset-0">{dots.slice(0, glowN).map((p, i) => <span key={i} className="a-pulse absolute h-1.5 w-1.5 rounded-full bg-cyan-300" style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s`, boxShadow: '0 0 12px #22d3ee' }} />)}</div>
      <Copy id="descent" size="md" pos="top" kicker={zone} title={<>Down, and <em>down</em></>} sub="Drag the slider. Light dies in the first 200 metres; pressure climbs one atmosphere every ten." accent={A} right={<span />} />
      <div className="absolute right-5 top-[40%] w-44 space-y-1.5 md:right-10 md:top-[16%] md:w-60">
        {SPECIES.map((sp) => { const on = d >= sp.a && d <= sp.b; return <div key={sp.n} className="flex items-center justify-between rounded-full px-3 py-1.5 font-mono text-[10px] transition-all md:text-[11px]" style={{ background: on ? 'rgba(34,211,238,.18)' : 'rgba(255,255,255,.03)', color: on ? '#fff' : 'rgba(255,255,255,.3)', boxShadow: on ? `inset 0 0 0 1px ${A}` : 'none' }}><span>{sp.n}</span><span>{on ? '●' : ''}</span></div> })}
      </div>
      <div className="absolute inset-x-5 bottom-8 mx-auto max-w-3xl md:bottom-12">
        <div className="liquid-glass rounded-3xl p-5">
          <label className="block"><span className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60"><span>Depth</span><span className="text-sm normal-case tracking-normal text-white">{fmt(d)} m</span></span>
            <input type="range" className="rng" min={0} max={1} step={0.002} value={s} onChange={(e) => setS(+e.target.value)} aria-label="Depth" style={{ ['--thumb' as string]: A }} /></label>
          <div className="mt-1 grid grid-cols-3 gap-2 font-mono text-[11px] text-white/60">
            <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{fmt(d / 10 + 1, 0)}</div>atm pressure</div>
            <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{temp.toFixed(1)}°</div>water temp</div>
            <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{light < 0.01 ? '0' : light.toFixed(light < 1 ? 2 : 0)}%</div>sunlight</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Fathom() {
  return (
    <>
      <Surface id="hero" gridColor="#22d3ee" radius={200} vignette={false} base={<><div className="absolute inset-0 bg-gradient-to-b from-[#010812] via-[#01060e] to-[#020d18]" /><Plankton /></>}>
        <Beam />
        <Copy id="hero" h="h1" pos="top" size="lg" kicker="Fathom crewed submersible · 11,000 m" title="Fathom" sub="Eleven thousand metres of dark. Bring a light — the creatures only exist where you point it." accent={A} right={<span />} />
      </Surface>
      <Surface id="descent" gridColor="#22d3ee" className="min-h-[820px] md:min-h-[700px]"><Descent /></Surface>
      <Surface id="join" gridColor="#22d3ee" base={<><div className="absolute inset-0 bg-gradient-to-b from-[#010812] to-[#02141f]" /><Plankton n={110} seed={9} /></>}>
        <Copy id="join" size="lg" pos="top" kicker="Expedition 2027 · Challenger Deep" title={<>Take the <em>seat</em></>} sub="Forty berths on the next descent series. Two pilots, one scientist, one seat with your name on it." accent={A} right={<span />} />
        <div className="absolute inset-x-5 bottom-10 md:bottom-16 md:left-10 md:w-[460px]">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] text-white/60"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-[65%] rounded-full" style={{ background: A }} /></span>26 / 40 berths taken</div>
          <CtaPanel accent={A} placeholder="you@institute.org" button="Reserve berth" done="Berth reserved. A pilot will contact you within 48 hours." />
        </div>
      </Surface>
    </>
  )
}
