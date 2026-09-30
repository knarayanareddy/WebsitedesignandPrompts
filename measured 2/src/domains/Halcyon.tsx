import { useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { Stars } from '../lib/art'
import { clamp, fmt, lerp, useFrame } from '../lib/engine'

const A = '#e0a27a'
const F = 'font-fraunces'
const BP = '#7fb2ff'


/* ---------- sky ---------- */
const KEYS: { h: number; top: number[]; hor: number[] }[] = [
  { h: 6, top: [43, 42, 74], hor: [244, 162, 122] },
  { h: 9, top: [74, 143, 216], hor: [191, 224, 255] },
  { h: 13, top: [47, 127, 224], hor: [207, 232, 255] },
  { h: 18, top: [42, 58, 120], hor: [255, 154, 90] },
  { h: 21, top: [5, 7, 15], hor: [27, 36, 72] },
  { h: 22, top: [3, 4, 10], hor: [16, 22, 48] },
]
function sky(h: number) {
  let i = 0
  while (i < KEYS.length - 2 && h > KEYS[i + 1].h) i++
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const t = clamp((h - a.h) / (b.h - a.h), 0, 1)
  const m = (x: number[], y: number[]) => `rgb(${x.map((v, k) => Math.round(lerp(v, y[k], t))).join(',')})`
  return { top: m(a.top, b.top), hor: m(a.hor, b.hor) }
}
const fmtH = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`

function SkyLayer({ hour }: { hour: number }) {
  const s = sky(hour)
  const night = clamp((hour - 17.5) / 3, 0, 1)
  const t = clamp((hour - 6) / 15, 0, 1)
  const sx = 80 + t * 840
  const sy = 420 - Math.sin(Math.PI * t) * 330
  return (
    <>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${s.hor}, ${s.top} 80%)` }} />
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" style={{ opacity: night }}>
        <Stars n={90} seed={5} maxY={0.55} />
      </svg>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <circle cx={sx} cy={sy} r="70" fill={hour > 17 ? '#ff9a5a' : '#fff3c4'} opacity=".25" />
        <circle cx={sx} cy={sy} r={hour > 20 ? 14 : 22} fill={hour > 20 ? '#e9efff' : '#fff7d6'} />
      </svg>
    </>
  )
}

/* ---------- house ---------- */
const GRID = [150, 290, 430, 570]
function House({ mode, hour = 13 }: { mode: 'render' | 'blueprint'; hour?: number }) {
  const glow = clamp(Math.max((hour - 16.5) / 3, (8 - hour) / 2), 0, 1)
  if (mode === 'blueprint') {
    return (
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible" fill="none" stroke={BP} strokeWidth="1.3">
        {GRID.map((x, i) => (
          <g key={x}>
            <line x1={x} x2={x} y1="120" y2="520" strokeDasharray="10 6" strokeOpacity=".5" />
            <circle cx={x} cy="108" r="11" /><text x={x} y="112" textAnchor="middle" fill={BP} stroke="none" fontSize="11" fontFamily="JetBrains Mono">{'ABCD'[i]}</text>
            <rect x={x - 6} y="458" width="12" height="12" fill={`${BP}55`} />
          </g>
        ))}
        <rect x="150" y="340" width="420" height="130" />
        <rect x="300" y="215" width="560" height="125" />
        <rect x="280" y="203" width="600" height="12" fill={`${BP}33`} />
        <rect x="600" y="150" width="90" height="190" strokeDasharray="4 4" />
        <path d="M300 340 420 215M420 340 540 215M540 340 660 215" strokeOpacity=".35" />
        {[[150, 'L+0'], [340, 'L+1'], [215, 'L+2']].map(([y, l]) => <text key={String(l)} x="900" y={Number(y) === 150 ? 474 : Number(y) + 4} fill={BP} stroke="none" fontSize="12" fontFamily="JetBrains Mono">{l}</text>)}
        <path d="M150 500H570M150 492v16M570 492v16" /><text x="360" y="495" textAnchor="middle" fill={BP} stroke="none" fontSize="13" fontFamily="JetBrains Mono">8 400</text>
        <path d="M570 192H860M570 184v16M860 184v16" /><text x="715" y="184" textAnchor="middle" fill={BP} stroke="none" fontSize="13" fontFamily="JetBrains Mono">CANTILEVER 6 400</text>
        <path d="M880 203V340M872 203h16M872 340h16" /><text x="892" y="280" fill={BP} stroke="none" fontSize="11" fontFamily="JetBrains Mono">3 200</text>
        <path d="M870 215 930 170" /><text x="932" y="166" fill={BP} stroke="none" fontSize="12" fontFamily="JetBrains Mono">CLT slab 240</text>
        <path d="M200 400 110 440" /><text x="20" y="452" fill={BP} stroke="none" fontSize="12" fontFamily="JetBrains Mono">Triple glazing U=0.6</text>
        <path d="M640 150V120" /><text x="650" y="126" fill={BP} stroke="none" fontSize="12" fontFamily="JetBrains Mono">Core · fair-faced RC</text>
        <line x1="60" x2="960" y1="470" y2="470" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <pattern id="slats" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#3b2a20" /><rect width="5" height="9" fill="#5a4030" /></pattern>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#9fc4e6" stopOpacity=".55" /><stop offset="1" stopColor="#2a3a4a" stopOpacity=".8" /></linearGradient>
      </defs>
      <rect x="0" y="470" width="1000" height="90" fill="#16110d" />
      <ellipse cx="500" cy="500" rx="480" ry="16" fill="#000" opacity=".4" />
      <rect x="600" y="150" width="90" height="190" fill="#6a6660" />
      <rect x="150" y="340" width="420" height="130" fill="#161a1e" />
      <rect x="150" y="340" width="420" height="130" fill="url(#glass)" />
      <rect x="150" y="340" width="420" height="130" fill="#ffc46b" opacity={glow * 0.75} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={GRID[i] - 2} y="340" width="4" height="130" fill="#0b0b0b" />)}
      <rect x="300" y="215" width="560" height="125" fill="url(#slats)" />
      <rect x="330" y="250" width="400" height="56" fill="#0d1218" />
      <rect x="330" y="250" width="400" height="56" fill="url(#glass)" />
      <rect x="330" y="250" width="400" height="56" fill="#ffc46b" opacity={glow * 0.85} />
      <rect x="280" y="203" width="600" height="12" fill="#e8e3da" />
      <ellipse cx="860" cy="430" rx="36" ry="46" fill="#1f3a26" /><ellipse cx="900" cy="450" rx="26" ry="36" fill="#27492f" />
      <rect x="878" y="470" width="4" height="0" />
    </svg>
  )
}

/* ---------- blueprint lens ---------- */
function BlueLens() {
  const clip = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  useFrame(({ x, y, r, w, h }) => {
    const k = clamp(r / 200, 0, 1)
    const hw = 190 * k
    const hh = 130 * k
    if (clip.current) clip.current.style.clipPath = `inset(${Math.max(0, y - hh)}px ${Math.max(0, w - x - hw)}px ${Math.max(0, h - y - hh)}px ${Math.max(0, x - hw)}px round 6px)`
    if (frame.current) {
      frame.current.style.transform = `translate3d(${x - 190}px,${y - 130}px,0) scale(${k})`
      frame.current.style.opacity = String(k)
    }
  })
  return (
    <>
      <div ref={clip} aria-hidden className="pointer-events-none absolute inset-0" style={{ clipPath: 'inset(0 100% 100% 0)' }}>
        <div className="absolute inset-0 bg-[#06142b]" style={{ backgroundImage: 'linear-gradient(rgba(127,178,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(127,178,255,.12) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-x-0 top-[14%] h-[56%]"><House mode="blueprint" /></div>
      </div>
      <div ref={frame} aria-hidden className="pointer-events-none absolute left-0 top-0 h-[260px] w-[380px] opacity-0">
        <div className="absolute inset-0 rounded-md border border-sky-300/70" />
        {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((p) => <span key={p} className={`absolute h-3 w-3 border-2 border-white ${p}`} style={{ margin: -2 }} />)}
        <span className="absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.25em] text-sky-300">Structural x-ray · 1:200</span>
      </div>
    </>
  )
}

/* ---------- plan ---------- */
const ROOMS = [
  { id: 'Living', x: 40, y: 40, w: 380, h: 250, f: 180, mat: 'Oiled oak · lime plaster · travertine hearth', face: 'South' },
  { id: 'Kitchen', x: 420, y: 40, w: 340, h: 170, f: 90, mat: 'Honed basalt · brushed brass · ash joinery', face: 'East' },
  { id: 'Studio', x: 420, y: 210, w: 340, h: 230, f: 270, mat: 'Birch ply · polished concrete · linen', face: 'West' },
  { id: 'Bedroom', x: 40, y: 290, w: 260, h: 150, f: 90, mat: 'Wool carpet · oak · bouclé', face: 'East' },
  { id: 'Bath', x: 300, y: 290, w: 120, h: 150, f: 0, mat: 'Tadelakt · travertine · bronze', face: 'North' },
]
function Plan() {
  const [sel, setSel] = useState(0)
  const [hour, setHour] = useState(15)
  const az = 90 + ((hour - 7) / 12) * 180
  const elev = Math.sin((Math.PI * (hour - 5.5)) / 14)
  const light = (f: number) => clamp(Math.cos(((az - f) * Math.PI) / 180), 0, 1) * clamp(elev, 0, 1)
  const R = ROOMS[sel]
  const lx = light(R.f)
  const sunX = 400 + Math.sin((az * Math.PI) / 180) * 430
  const sunY = 240 - Math.cos((az * Math.PI) / 180) * 250
  return (
    <>
      <Copy id="plan" font={F} size="md" pos="top" kicker="Daylight study" title={<>Follow the <em>light</em></>} sub="Choose a room, then move the sun. Every room is oriented to keep its best hour." accent={A} right={<span />} />
      <svg viewBox="0 0 800 480" className="absolute inset-x-4 top-[38%] h-[30%] md:inset-x-auto md:left-[40%] md:right-10 md:top-[14%] md:h-[60%]" role="group" aria-label="Floor plan">
        {ROOMS.map((r, i) => (
          <g key={r.id} onClick={() => setSel(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(i)} tabIndex={0} role="button" aria-label={r.id} style={{ cursor: 'pointer', outline: 'none' }}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#0c0a09" stroke={sel === i ? A : '#ffffff33'} strokeWidth={sel === i ? 3 : 1.5} />
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#ffd28a" opacity={0.06 + light(r.f) * 0.55} style={{ transition: 'opacity .3s' }} />
            <text x={r.x + 16} y={r.y + 28} fill="#fff" fontFamily="Fraunces" fontSize="22" opacity=".9">{r.id}</text>
            <text x={r.x + 16} y={r.y + 48} fill={A} fontFamily="JetBrains Mono" fontSize="11">{fmt(r.w * r.h * 0.000484, 1)} m²</text>
          </g>
        ))}
        <circle cx={sunX} cy={sunY} r="16" fill="#ffe08a" opacity={clamp(elev * 3, 0, 1)} />
        <circle cx={sunX} cy={sunY} r="34" fill="#ffe08a" opacity={clamp(elev * 3, 0, 1) * 0.2} />
        <text x="400" y="470" textAnchor="middle" fill="#fff" opacity=".3" fontFamily="JetBrains Mono" fontSize="11">S ↓</text>
      </svg>
      <div className="liquid-glass absolute inset-x-5 bottom-8 mx-auto max-w-3xl rounded-3xl p-5 md:bottom-12">
        <div className="grid items-center gap-4 md:grid-cols-[1.2fr_1fr]">
          <Range label="Sun" value={hour} min={7} max={19} step={0.5} onChange={setHour} accent={A} readout={fmtH(hour)} />
          <div className="font-mono text-[11px] text-white/60">
            <div className="text-lg text-white" style={{ fontFamily: 'Fraunces' }}>{R.id} <span className="text-white/40">· faces {R.face}</span></div>
            {fmt(R.w * R.h * 0.000484, 1)} m² · <b style={{ color: A }}>{Math.round(80 + lx * 900)} lux</b> now
            <div className="mt-1 text-white/40">{R.mat}</div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- build ---------- */
const MATS = [
  { n: 'Travertine', rate: 5200, co2: 380, c: '#d8c6a6' },
  { n: 'Charred cedar', rate: 4300, co2: 140, c: '#241b15' },
  { n: 'Board-formed concrete', rate: 3800, co2: 520, c: '#8b8b88' },
  { n: 'Zinc standing seam', rate: 4900, co2: 310, c: '#7d8a93' },
]
function Skin({ m }: { m: number }) {
  const mat = MATS[m]
  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" role="img" aria-label={`${mat.n} facade`}>
      <defs>
        <pattern id="p0" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#d8c6a6" /><path d="M0 0H60M0 15H60M30 0V15M0 15V30M60 15V30" stroke="#b8a382" strokeWidth="1.5" fill="none" /></pattern>
        <pattern id="p1" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#15100c" /><path d="M2 0V10" stroke="#3a2d22" strokeWidth="3" /></pattern>
        <pattern id="p2" width="80" height="22" patternUnits="userSpaceOnUse"><rect width="80" height="22" fill="#8b8b88" /><path d="M0 0H80" stroke="#6e6e6b" strokeWidth="2" /><circle cx="20" cy="11" r="1.2" fill="#6e6e6b" /><circle cx="60" cy="11" r="1.2" fill="#6e6e6b" /></pattern>
        <pattern id="p3" width="28" height="10" patternUnits="userSpaceOnUse"><rect width="28" height="10" fill="#7d8a93" /><path d="M0 0V10" stroke="#5d6970" strokeWidth="2" /><path d="M14 0V10" stroke="#9aa7af" strokeWidth="1" /></pattern>
      </defs>
      <rect x="0" y="330" width="1000" height="70" fill="#0d0b0a" />
      <rect x="140" y="200" width="420" height="130" fill={`url(#p${m})`} />
      <rect x="260" y="80" width="560" height="125" fill={`url(#p${m})`} />
      <rect x="290" y="120" width="380" height="50" fill="#0a1016" stroke="#ffffff22" />
      <rect x="180" y="230" width="340" height="100" fill="#0a1016" stroke="#ffffff22" />
      <rect x="240" y="70" width="600" height="11" fill="#eee" />
    </svg>
  )
}
function Build() {
  const [m, setM] = useState(0)
  const [area, setArea] = useState(280)
  const [base, setBase] = useState(false)
  const [roof, setRoof] = useState(true)
  const [done, setDone] = useState(false)
  const mat = MATS[m]
  const cost = area * mat.rate * (1 + (base ? 0.12 : 0) + (roof ? 0.05 : 0))
  return (
    <>
      <Copy id="build" font={F} size="md" pos="top" kicker="Preliminary estimate" title={<>Choose your <em>skin</em></>} sub="Four facades, one volume. Materials change cost, carbon and how the house ages." accent={A} right={<span />} />
      <div className="absolute inset-x-0 top-[36%] h-[20%] px-6 md:top-[14%] md:h-[46%] md:left-[44%] md:pl-0 md:pr-10"><Skin m={m} /></div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(44%-2.5rem)] md:min-w-[380px]">
        <div className="flex flex-wrap gap-2">
          {MATS.map((x, i) => <Pill key={x.n} active={m === i} accent={A} onClick={() => setM(i)} className="px-3 py-1.5 text-xs"><span className="mr-1.5 inline-block h-2 w-2 rounded-full border border-white/30" style={{ background: x.c }} />{x.n}</Pill>)}
        </div>
        <div className="mt-3"><Range label="Floor area" value={area} min={120} max={600} step={10} onChange={setArea} accent={A} readout={`${area} m²`} /></div>
        <div className="mt-1 flex flex-wrap gap-2"><Pill active={base} accent={A} onClick={() => setBase((b) => !b)} className="px-3 py-1.5 text-xs">Basement +12%</Pill><Pill active={roof} accent={A} onClick={() => setRoof((b) => !b)} className="px-3 py-1.5 text-xs">Green roof +5%</Pill></div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div><div className="text-3xl text-white" style={{ fontFamily: 'Fraunces' }}>€{fmt(Math.round(cost / 1000))}k</div><div className="font-mono text-[10px] text-white/50">{Math.round(10 + area / 60)} months · {fmt((area * mat.co2) / 1000, 1)} t CO₂e facade</div></div>
          <button onClick={() => setDone(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-black" style={{ background: A }}>{done ? '✓ Visit requested' : 'Book a site visit'}</button>
        </div>
      </div>
    </>
  )
}

export default function Halcyon() {
  const [hour, setHour] = useState(18)
  return (
    <>
      <Surface
        id="hero"
        radius={200}
        insetTop={0}
        gridColor="#e0a27a"
        vignette={false}
        base={
          <>
            <SkyLayer hour={hour} />
            <div className="absolute inset-x-0 top-[14%] h-[56%]"><House mode="render" hour={hour} /></div>
            <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-b from-[#16110d] to-black" />
          </>
        }
      >
        <BlueLens />
        <p className="pointer-events-none absolute inset-x-0 top-[11%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Move the lens across the facade</p>
        <Copy
          id="hero"
          h="h1"
          size="lg"
          font={F}
          kicker="Halcyon Residences · Lake Como"
          title="Halcyon"
          sub="The render is what you will love. The blueprint is why it stands."
          accent={A}
          right={<div className="liquid-glass pointer-events-auto w-full rounded-2xl p-4 md:w-72"><Range label="Time of day" value={hour} min={6} max={22} step={0.5} onChange={setHour} accent={A} readout={fmtH(hour)} /></div>}
        />
      </Surface>
      <Surface id="plan" gridColor="#e0a27a" className="min-h-[780px] md:min-h-[700px]"><Plan /></Surface>
      <Surface id="build" gridColor="#e0a27a" className="min-h-[880px] md:min-h-[700px]"><Build /></Surface>
    </>
  )
}
