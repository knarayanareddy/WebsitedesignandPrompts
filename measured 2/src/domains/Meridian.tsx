import { useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy } from '../lib/ui'
import { Stars } from '../lib/art'
import { clamp, fmt, lerp, useTicker } from '../lib/engine'

const A = '#60a5fa'
const F = 'font-grotesk'

type AC = { id: string; type: string; x: number; y: number; hdg: number; fl: number; kt: number; dest: string }
const TRAFFIC: AC[] = [
  { id: 'MRD 207', type: 'M7', x: 640, y: 330, hdg: 62, fl: 410, kt: 488, dest: 'KTEB' },
  { id: 'BAW 117', type: 'A388', x: 340, y: 300, hdg: 280, fl: 360, kt: 502, dest: 'EGLL' },
  { id: 'UAE 9', type: 'B77W', x: 720, y: 600, hdg: 140, fl: 380, kt: 510, dest: 'OMDB' },
  { id: 'SIA 22', type: 'A359', x: 280, y: 640, hdg: 200, fl: 390, kt: 496, dest: 'WSSS' },
  { id: 'N88MX', type: 'C750', x: 560, y: 190, hdg: 105, fl: 450, kt: 472, dest: 'LFPB' },
  { id: 'DLH 401', type: 'A320', x: 430, y: 480, hdg: 330, fl: 340, kt: 455, dest: 'EDDF' },
  { id: 'QFA 1', type: 'A388', x: 790, y: 440, hdg: 20, fl: 370, kt: 505, dest: 'YSSY' },
  { id: 'MRD 031', type: 'M7', x: 210, y: 420, hdg: 88, fl: 430, kt: 490, dest: 'LSGG' },
]

function RadarBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2" style={{ height: 'min(92%, 94vw)' }}>
      {children}
    </div>
  )
}

function Telemetry({ ac }: { ac: AC | null }) {
  const [j, setJ] = useState(0)
  useTicker(() => setJ(Math.round((Math.random() - 0.5) * 6)), 900)
  return (
    <div className="liquid-glass pointer-events-none absolute right-5 top-24 w-56 rounded-2xl p-4 font-mono text-[11px] text-white/60 md:right-10">
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: A }}>
        <span className={`h-1.5 w-1.5 rounded-full ${ac ? 'a-blink' : ''}`} style={{ background: A }} />
        {ac ? 'Target locked' : 'Scanning'}
      </div>
      {ac ? (
        <div className="space-y-1">
          <div className="text-xl text-white">{ac.id}</div>
          <div>{ac.type} → {ac.dest}</div>
          <div>ALT FL{ac.fl} <span className="text-white/30">±{Math.abs(j)}</span></div>
          <div>GS {ac.kt + j} kt · HDG {String(ac.hdg).padStart(3, '0')}°</div>
        </div>
      ) : (
        <div>Click any blip the sweep reveals to lock its track.</div>
      )}
    </div>
  )
}

function Radar() {
  const [sel, setSel] = useState<AC | null>(null)
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,.1),transparent_60%)]" />
      <RadarBox>
        <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" aria-hidden>
          {[100, 200, 300, 400, 480].map((r) => (
            <circle key={r} cx="500" cy="500" r={r} fill="none" stroke={A} strokeOpacity={r === 480 ? 0.5 : 0.18} />
          ))}
          <path d="M500 20V980M20 500H980M160 160 840 840M840 160 160 840" stroke={A} strokeOpacity=".1" />
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * 5 * Math.PI) / 180
            const l = i % 6 === 0 ? 26 : 12
            return <line key={i} x1={500 + Math.sin(a) * 480} y1={500 - Math.cos(a) * 480} x2={500 + Math.sin(a) * (480 - l)} y2={500 - Math.cos(a) * (480 - l)} stroke={A} strokeOpacity=".45" />
          })}
          {['N', 'E', 'S', 'W'].map((l, i) => (
            <text key={l} x={500 + Math.sin((i * Math.PI) / 2) * 508} y={504 - Math.cos((i * Math.PI) / 2) * 508} textAnchor="middle" fill={A} fontSize="16" fontFamily="JetBrains Mono">{l}</text>
          ))}
          {[100, 200, 300, 400].map((r, i) => (
            <text key={r} x="506" y={500 - r + 14} fill={A} opacity=".5" fontSize="11" fontFamily="JetBrains Mono">{(i + 1) * 50} nm</text>
          ))}
        </svg>
        {/* sweep beam */}
        <div aria-hidden className="radar-sweep absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from var(--ang), transparent 0deg, transparent 250deg, rgba(96,165,250,.28) 358deg, rgba(147,197,253,.95) 360deg)', WebkitMaskImage: 'radial-gradient(circle, #000 94%, transparent 96%)', maskImage: 'radial-gradient(circle, #000 94%, transparent 96%)' }} />
        {/* hidden traffic layer — visible only where swept */}
        <div className="radar-mask absolute inset-0 rounded-full">
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full overflow-visible">
            {TRAFFIC.map((t) => (
              <g key={t.id} transform={`translate(${t.x} ${t.y})`}>
                <line x1="0" y1="0" x2={-Math.sin((t.hdg * Math.PI) / 180) * 60} y2={Math.cos((t.hdg * Math.PI) / 180) * 60} stroke={A} strokeOpacity=".7" strokeDasharray="3 5" />
                <circle r="8" fill="none" stroke={A} className="a-ping" />
                <polygon points="0,-11 7,8 -7,8" fill="#e0f2fe" transform={`rotate(${t.hdg})`} />
                <text x="14" y="-10" fill="#e0f2fe" fontSize="15" fontFamily="JetBrains Mono" fontWeight="500">{t.id}</text>
                <text x="14" y="8" fill={A} fontSize="12" fontFamily="JetBrains Mono">FL{t.fl} · {t.kt}kt</text>
                <circle r="28" fill="transparent" style={{ pointerEvents: 'all', cursor: 'crosshair' }} onClick={() => setSel(t)} />
              </g>
            ))}
          </svg>
        </div>
        {/* lock reticle (always visible) */}
        {sel && (
          <svg viewBox="0 0 1000 1000" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <g transform={`translate(${sel.x} ${sel.y})`}>
              <circle r="34" fill="none" stroke="#fff" strokeDasharray="10 8" className="a-spin" />
              <path d="M-42-28v-14h14M42-28v-14h-14M-42 28v14h14M42 28v14h-14" stroke={A} strokeWidth="2.5" fill="none" />
            </g>
          </svg>
        )}
      </RadarBox>
      <Telemetry ac={sel} />
    </>
  )
}

/* ---------- altitude ---------- */
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`
function isa(ft: number) {
  const h = (ft * 0.3048) / 1000
  const T = h <= 11 ? 15 - 6.5 * h : -56.5
  const P = h <= 11 ? 1013.25 * Math.pow(1 - (0.0065 * h * 1000) / 288.15, 5.2559) : 226.32 * Math.exp(-(h * 1000 - 11000) / 6341.6)
  const a = 20.0468 * Math.sqrt(T + 273.15) * 1.94384
  const rho = (P / 1013.25) * (288.15 / (T + 273.15))
  return { T, P, a, rho }
}

function Altitude() {
  const [alt, setAlt] = useState(12000)
  const s = clamp(alt / 45000, 0, 1)
  const m = isa(alt)
  const top = mix([96, 165, 250], [0, 0, 6], clamp(s * 1.5, 0, 1))
  const hor = mix([186, 222, 255], [20, 44, 92], clamp(s * 1.3, 0, 1))
  const planeY = lerp(74, 22, s)
  return (
    <>
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${hor}, ${top})` }} />
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" style={{ opacity: clamp((alt - 18000) / 22000, 0, 1) }}>
        <Stars n={140} seed={3} />
      </svg>
      <div aria-hidden className="absolute inset-x-[-30%] bottom-[-70%] h-[90%] rounded-[50%] bg-gradient-to-b from-sky-400/60 to-[#04132b]" style={{ transform: `translateY(${lerp(0, 20, s)}%)`, boxShadow: '0 -30px 80px rgba(96,165,250,.45)' }} />
      <div aria-hidden className="absolute left-1/2 w-24 -translate-x-1/2 transition-[top] duration-300" style={{ top: `${planeY}%` }}>
        <div className="absolute left-1/2 top-full h-[60vh] w-px -translate-x-1/2 bg-gradient-to-b from-white/50 to-transparent" />
        <svg viewBox="0 0 64 64" className="relative drop-shadow-[0_0_14px_rgba(255,255,255,.6)]"><path d="M32 4c2 0 3 3 3 8v14l24 14v6L35 38v12l7 5v4l-10-3-10 3v-4l7-5V38L5 46v-6l24-14V12c0-5 1-8 3-8Z" fill="#fff" /></svg>
      </div>
      <Copy id="altitude" font={F} size="md" pos="top" kicker="Service ceiling 51,000 ft" title={<>Above the <em>weather</em></>} sub="Climb the slider. The sky thins, the stars arrive, and the physics update with the International Standard Atmosphere." accent="#fff" right={<span />} />
      <div className="absolute inset-x-0 bottom-8 grid gap-4 px-6 md:bottom-12 md:px-10">
        <div className="liquid-glass mx-auto w-full max-w-3xl rounded-3xl p-5">
          <label className="block">
            <span className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60"><span>Altitude</span><span className="text-sm normal-case tracking-normal text-white">{fmt(alt)} ft · FL{Math.round(alt / 100)}</span></span>
            <input type="range" className="rng" min={0} max={45000} step={500} value={alt} onChange={(e) => setAlt(+e.target.value)} aria-label="Altitude" style={{ ['--thumb' as string]: '#fff' }} />
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3 font-mono text-[11px] text-white/60 md:grid-cols-4">
            {[
              [`${m.T.toFixed(0)} °C`, 'Outside temp'],
              [`${fmt(m.P)} hPa`, 'Static pressure'],
              [`${fmt(m.a)} kt`, 'Speed of sound'],
              [`${(m.rho * 100).toFixed(0)} %`, 'Air density'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/5 p-3"><div className="text-lg text-white">{v}</div>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- routes ---------- */
const PORTS = [
  { c: 'LHR', n: 'London', lat: 51.47, lon: -0.45 },
  { c: 'JFK', n: 'New York', lat: 40.64, lon: -73.78 },
  { c: 'DXB', n: 'Dubai', lat: 25.25, lon: 55.36 },
  { c: 'SIN', n: 'Singapore', lat: 1.36, lon: 103.99 },
  { c: 'SYD', n: 'Sydney', lat: -33.94, lon: 151.18 },
  { c: 'GRU', n: 'São Paulo', lat: -23.43, lon: -46.47 },
  { c: 'HND', n: 'Tokyo', lat: 35.55, lon: 139.78 },
  { c: 'LAX', n: 'Los Angeles', lat: 33.94, lon: -118.4 },
]
const px = (lon: number) => ((lon + 180) / 360) * 1000
const py = (lat: number) => ((75 - lat) / 140) * 500
function dist(a: (typeof PORTS)[number], b: (typeof PORTS)[number]) {
  const r = Math.PI / 180
  const d = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(d))
}

function Routes() {
  const [pair, setPair] = useState<[number, number | null]>([0, 2])
  const [a, b] = [PORTS[pair[0]], pair[1] !== null ? PORTS[pair[1]] : null]
  const click = (i: number) => setPair((p) => (p[1] === null || i === p[0] ? [i, null] : i === p[1] ? p : [p[0], i]))
  const km = b ? dist(a, b) : 0
  let path = ''
  if (b) {
    const x1 = px(a.lon), y1 = py(a.lat), x2 = px(b.lon), y2 = py(b.lat)
    path = `M${x1} ${y1}Q${(x1 + x2) / 2} ${Math.min(y1, y2) - Math.hypot(x2 - x1, y2 - y1) * 0.28} ${x2} ${y2}`
  }
  return (
    <>
      <svg aria-label="Route map" className="absolute inset-x-0 top-[40%] h-[30%] w-full md:top-[32%] md:h-[42%]" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        {Array.from({ length: 24 }).map((_, r) => Array.from({ length: 48 }).map((__, c) => <circle key={`${r}-${c}`} cx={10 + c * 21} cy={10 + r * 21} r="1.2" fill={A} opacity=".18" />))}
        {[-60, -30, 0, 30, 60].map((l) => <line key={l} x1="0" x2="1000" y1={py(l)} y2={py(l)} stroke={A} strokeOpacity=".15" strokeDasharray="2 6" />)}
        {[-120, -60, 0, 60, 120].map((l) => <line key={l} y1="0" y2="500" x1={px(l)} x2={px(l)} stroke={A} strokeOpacity=".15" strokeDasharray="2 6" />)}
        {b && (
          <g key={`${pair[0]}-${pair[1]}`}>
            <path d={path} fill="none" stroke={A} strokeWidth="2.5" pathLength={1} className="a-draw" />
            <path id="mpath" d={path} fill="none" />
            <circle r="6" fill="#fff"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#mpath" /></animateMotion></circle>
          </g>
        )}
        {PORTS.map((p, i) => {
          const on = i === pair[0] || i === pair[1]
          return (
            <g key={p.c} transform={`translate(${px(p.lon)} ${py(p.lat)})`} onClick={() => click(i)} style={{ cursor: 'pointer' }} role="button" aria-label={`${p.n} ${p.c}`}>
              <circle r="22" fill="transparent" />
              {on && <circle r="14" fill="none" stroke={A} className="a-ping" />}
              <circle r={on ? 6 : 4} fill={on ? '#fff' : A} />
              <text y="-12" textAnchor="middle" fill={on ? '#fff' : A} fontSize="14" fontFamily="JetBrains Mono">{p.c}</text>
            </g>
          )
        })}
      </svg>
      <Copy id="routes" font={F} size="md" pos="top" kicker="Door to door · zero layovers" title={<>Anywhere, <em>directly</em></>} sub="Tap two airports. The great circle draws itself and the numbers follow." accent={A} right={<span />} />
      <div className="liquid-glass absolute inset-x-5 bottom-8 mx-auto max-w-3xl rounded-3xl p-5 md:bottom-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-grotesk text-3xl text-white md:text-4xl">{a.n} <span style={{ color: A }}>→</span> {b ? b.n : <span className="text-white/30">pick destination</span>}</div>
          {b && <div className="font-mono text-[11px] text-white/50">{fmt(km)} km great-circle</div>}
        </div>
        {b && (
          <div className="mt-3 grid grid-cols-3 gap-3 font-mono text-[11px] text-white/60">
            {[[`${Math.floor(km / 880 + 0.5)} h ${Math.round(((km / 880 + 0.5) % 1) * 60)} m`, 'Block time'], [`${fmt(km * 4.4 / 1000, 1)} t`, 'CO₂ (Jet-A)'], [`${fmt(km * 4.4 * 0.2 / 1000, 1)} t`, 'With 100% SAF']].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/5 p-3"><div className="text-lg text-white">{v}</div>{l}</div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function Meridian() {
  return (
    <>
      <Surface id="hero" gridColor="#60a5fa" vignette={false}>
        <Radar />
        <Copy id="hero" h="h1" font={F} kicker="Private aviation · M7 jet" title="Meridian" sub="The sky, plotted in real time. Nothing is visible until the sweep passes — just like the real thing." accent={A} stat={{ value: 'Mach 0.92', label: 'Long-range cruise' }} />
      </Surface>
      <Surface id="altitude" gridColor="#60a5fa" vignette={false} className="min-h-[720px] md:min-h-[680px]">
        <Altitude />
      </Surface>
      <Surface id="routes" gridColor="#60a5fa" className="min-h-[720px] md:min-h-[680px]">
        <Routes />
      </Surface>
    </>
  )
}
