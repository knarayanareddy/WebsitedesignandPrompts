import { useId, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill } from '../lib/ui'
import { Wave, Stars } from '../lib/art'
import { useTicker } from '../lib/engine'

const A = '#10b981'

const FINISHES = [
  { name: 'Matte Onyx', tint: '#17181b', irid: ['#0f172a', '#6366f1', '#10b981', '#0ea5e9', '#0f172a'] },
  { name: 'Raw Titanium', tint: '#8a8f96', irid: ['#cbd5e1', '#94a3b8', '#e2e8f0', '#64748b', '#cbd5e1'] },
  { name: 'Champagne Gold', tint: '#b99a6c', irid: ['#fde68a', '#d6b36a', '#fff7ed', '#b45309', '#fde68a'] },
]

function Device({ tint = '#15171a', lit = false, irid, className = '' }: { tint?: string; lit?: boolean; irid?: string[]; className?: string }) {
  const u = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 300 520" className={className} aria-hidden>
      <defs>
        <linearGradient id={`b${u}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0c0c0d" />
          <stop offset="1" stopColor="#1c1d20" />
        </linearGradient>
        <linearGradient id={`c${u}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".4" stopColor="#fff" stopOpacity=".06" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>
        {irid && (
          <linearGradient id={`i${u}`} x1="0" x2="1" y1="0" y2="1" gradientUnits="objectBoundingBox">
            {irid.map((c, i) => (
              <stop key={i} offset={i / (irid.length - 1)} stopColor={c} />
            ))}
            <animateTransform attributeName="gradientTransform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur="9s" repeatCount="indefinite" />
          </linearGradient>
        )}
      </defs>
      <path d="M92 0h116l12 150H80z" fill={`url(#b${u})`} />
      <path d="M80 370h140l-12 150H92z" fill={`url(#b${u})`} />
      <rect x="242" y="216" width="10" height="46" rx="4" fill={tint} />
      <rect x="56" y="130" width="188" height="260" rx="66" fill={irid ? `url(#i${u})` : tint} />
      <rect x="56.5" y="130.5" width="187" height="259" rx="65.5" fill="none" stroke={`url(#c${u})`} />
      <rect x="72" y="146" width="156" height="228" rx="52" fill="#020202" />
      {lit ? (
        <g>
          <circle cx="150" cy="260" r="58" fill="none" stroke={`${A}33`} strokeWidth="9" />
          <circle cx="150" cy="260" r="58" fill="none" stroke={A} strokeWidth="9" strokeLinecap="round" strokeDasharray="250 120" transform="rotate(-90 150 260)" className="a-pulse" />
          <text x="150" y="268" textAnchor="middle" fill="#fff" fontSize="34" fontFamily="JetBrains Mono" fontWeight="500">62</text>
          <text x="150" y="288" textAnchor="middle" fill={A} fontSize="9" fontFamily="JetBrains Mono" letterSpacing="3">BPM</text>
        </g>
      ) : (
        <path d="M84 160c30-6 70 6 130 60v-70c-50-14-100-12-130 10z" fill="#fff" opacity=".04" />
      )}
    </svg>
  )
}

function DeviceStage({ children, className = 'h-[58%]' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pb-16 pt-20">
      <div className={`relative aspect-[300/520] ${className}`}>{children}</div>
    </div>
  )
}

/* ---------- hero ---------- */
function Optics() {
  const waves = [
    { c: '#34d399', l: '525 nm', a: 0 },
    { c: '#f87171', l: '660 nm', a: 90 },
    { c: '#c084fc', l: '940 nm', a: 180 },
    { c: '#fbbf24', l: '590 nm', a: 270 },
  ]
  return (
    <div className="absolute inset-0 bg-black">
      <DeviceStage>
        <Device lit tint="#1a1d1c" className="h-full w-full" />
        <svg className="absolute left-1/2 top-1/2 h-[230%] w-[230%] -translate-x-1/2 -translate-y-1/2 overflow-visible" viewBox="-300 -300 600 600">
          {[70, 120, 175, 235].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke={A} strokeOpacity={0.5 - i * 0.1} className="a-dash" style={{ animationDuration: `${3 + i}s` }} />
          ))}
          {waves.map((w, wi) =>
            Array.from({ length: 6 }).map((_, i) => (
              <line key={`${wi}-${i}`} x1="0" y1="-30" x2="0" y2={-150 - wi * 22} stroke={w.c} strokeWidth="1.4" transform={`rotate(${w.a + i * 12 - 30})`} className="a-pulse" style={{ animationDelay: `${i * 0.18 + wi * 0.3}s` }} />
            )),
          )}
          {waves.map((w) => (
            <text key={w.l} x={Math.cos(((w.a - 60) * Math.PI) / 180) * 215} y={Math.sin(((w.a - 60) * Math.PI) / 180) * 215} fill={w.c} fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
              {w.l}
            </text>
          ))}
        </svg>
      </DeviceStage>
      <div className="absolute inset-x-0 bottom-28 h-24 opacity-90">
        <Wave color={A} className="h-full" sw={2} speed={5} cycles={5} />
      </div>
    </div>
  )
}

function LiveBpm() {
  const [v, setV] = useState({ bpm: 62, hrv: 71 })
  useTicker(() => setV({ bpm: 60 + Math.round(Math.random() * 5), hrv: 68 + Math.round(Math.random() * 7) }), 900)
  return (
    <div className="liquid-glass pointer-events-none absolute right-5 top-24 rounded-2xl px-4 py-3 font-mono text-[11px] text-white/70 md:right-10">
      <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />LIVE · {v.bpm} bpm</div>
      <div className="mt-1 text-white/40">HRV {v.hrv} ms · SpO₂ 98%</div>
    </div>
  )
}

/* ---------- sleep ---------- */
const STAGES = [0, 2, 2, 3, 3, 3, 2, 2, 1, 2, 3, 3, 3, 2, 2, 1, 1, 2, 3, 3, 2, 2, 2, 1, 2, 2, 3, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 1, 2, 1, 1, 0, 1, 0, 0]
function NightBase() {
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="nsky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#02040a" />
          <stop offset=".7" stopColor="#0a1322" />
          <stop offset="1" stopColor="#0b1d1b" />
        </linearGradient>
        <radialGradient id="moon"><stop offset="0" stopColor="#e6fff5" /><stop offset=".3" stopColor="#10b98155" /><stop offset="1" stopColor="#10b98100" /></radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#nsky)" />
      <Stars n={110} seed={11} maxY={0.7} />
      <circle cx="760" cy="150" r="120" fill="url(#moon)" />
      <circle cx="760" cy="150" r="26" fill="#e9fff6" opacity=".9" />
      <path d="M0 470 160 380 280 440 440 330 600 450 760 360 1000 470V600H0Z" fill="#08121a" />
      <path d="M0 520 200 450 360 510 560 420 780 510 1000 450V600H0Z" fill="#050b10" />
    </svg>
  )
}
function Hypnogram() {
  const n = STAGES.length
  const x = (i: number) => 70 + (i / (n - 1)) * 860
  const y = (s: number) => 290 + s * 62
  let d = ''
  STAGES.forEach((s, i) => (d += i ? `H${x(i).toFixed(1)}V${y(s)}` : `M${x(0)} ${y(s)}`))
  let hrv = ''
  for (let i = 0; i <= 80; i++) {
    const t = i / 80
    const v = 255 - (Math.sin(t * 5.4 + 0.6) * 0.5 + 0.5) * 30 - t * 22
    hrv += (i ? 'L' : 'M') + (70 + t * 860).toFixed(1) + ' ' + v.toFixed(1)
  }
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full bg-[#020806]">
      <rect width="1000" height="600" fill="#020806" />
      {['Awake', 'REM', 'Light', 'Deep'].map((l, i) => (
        <g key={l}>
          <line x1="70" x2="930" y1={y(i)} y2={y(i)} stroke={A} strokeOpacity=".18" strokeDasharray="3 6" />
          <text x="62" y={y(i) + 4} textAnchor="end" fill={A} fontSize="11" fontFamily="JetBrains Mono" opacity=".8">{l}</text>
        </g>
      ))}
      {['23:00', '01:00', '03:00', '05:00', '07:00'].map((t, i) => (
        <text key={t} x={70 + i * 215} y="510" textAnchor="middle" fill="#fff" opacity=".4" fontSize="11" fontFamily="JetBrains Mono">{t}</text>
      ))}
      <path d={d + 'V520H70Z'} fill={A} opacity=".08" />
      <path d={d} fill="none" stroke={A} strokeWidth="2.4" strokeLinejoin="round" />
      <path d={hrv} fill="none" stroke="#fde68a" strokeWidth="1.8" className="a-dash" />
      <text x="70" y="205" fill="#fde68a" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="3">HRV RECOVERY · RMSSD</text>
    </svg>
  )
}

/* ---------- hardware ---------- */
const LAYERS = [
  { n: 'Sapphire crystal', d: 'Mohs 9 · 0.9 mm', c: '#a5f3fc' },
  { n: 'Quad-λ PPG array', d: '4 LEDs · 2 PDs', c: '#34d399' },
  { n: 'Custom silicon', d: 'M1 · 5 nm · 0.3 mW', c: '#c084fc' },
  { n: 'Flex circuit', d: '6-layer polyimide', c: '#fbbf24' },
  { n: 'Grade-5 titanium case', d: '54 mg/mm² · 100 m', c: '#cbd5e1' },
]
function Exploded() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full bg-[#030504]">
      {LAYERS.map((l, i) => {
        const y = 170 + i * 96
        return (
          <g key={l.n} className="a-float" style={{ animationDelay: `${i * 0.35}s`, animationDuration: '6s' }}>
            <ellipse cx="420" cy={y + 14} rx="170" ry="40" fill="#000" opacity=".5" />
            <ellipse cx="420" cy={y} rx="170" ry="40" fill={`${l.c}14`} stroke={l.c} strokeOpacity=".9" />
            <ellipse cx="420" cy={y} rx="110" ry="24" fill="none" stroke={l.c} strokeOpacity=".4" strokeDasharray="4 5" />
            {i === 2 && <rect x="395" y={y - 10} width="50" height="20" rx="3" fill={l.c} opacity=".5" />}
            <path d={`M590 ${y}H700`} stroke={l.c} strokeOpacity=".6" className="a-dash" fill="none" />
            <circle cx="590" cy={y} r="3" fill={l.c} />
            <text x="712" y={y - 2} fill="#fff" fontSize="15" fontFamily="Inter" fontWeight="500">{l.n}</text>
            <text x="712" y={y + 16} fill={l.c} fontSize="11" fontFamily="JetBrains Mono">{l.d}</text>
          </g>
        )
      })}
    </svg>
  )
}
function TitaniumBase() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <pattern id="brush" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3H6" stroke="#fff" strokeOpacity=".05" /></pattern>
        <radialGradient id="tg" cx=".45" cy=".4"><stop offset="0" stopColor="#3a3f45" /><stop offset="1" stopColor="#050607" /></radialGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#tg)" />
      <rect width="1000" height="700" fill="url(#brush)" />
      <ellipse cx="420" cy="360" rx="190" ry="250" fill="none" stroke="#fff" strokeOpacity=".08" />
    </svg>
  )
}

export default function Measured() {
  const [fi, setFi] = useState(0)
  const [done, setDone] = useState(false)
  const f = FINISHES[fi]
  return (
    <>
      <Surface
        id="hero"
        insetTop={32}
        base={<DeviceStage><Device tint="#101112" className="h-full w-full opacity-70" /></DeviceStage>}
        reveal={<Optics />}
      >
        <LiveBpm />
        <p className="absolute left-1/2 top-[22%] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Move to see beneath the skin</p>
        <Copy id="hero" h="h1" size="hero" kicker="Clinical-grade wearable" title="Measured" sub="Continuous clinical-grade physiological intelligence, rendered invisible." accent={A} stat={{ value: '54 mg', label: 'Weightless Grade 5 Titanium' }} />
      </Surface>

      <Surface id="sleep" insetTop={20} base={<NightBase />} reveal={<Hypnogram />}>
        <Copy id="sleep" kicker="Circadian rhythm" title={<>Tuned to your <em>sleep</em> architecture</>} sub="Tracking autonomic nervous system recovery, micro-awakenings, and core thermal shifts." accent={A} stat={{ value: '+94%', label: 'HRV correlation with ECG' }} />
      </Surface>

      <Surface id="hardware" insetTop={34} base={<TitaniumBase />} reveal={<Exploded />}>
        <Copy id="hardware" kicker="Zero compromise" title={<>Forged in medical <em>titanium</em></>} sub="Sapphire crystal sensor window. Water-resistant to 100 meters. 8 days without a dock." accent={A} stat={{ value: '100 m', label: 'Atmospheric depth resistance' }} />
      </Surface>

      <Surface
        id="reserve"
        insetTop={30}
        className="min-h-[720px] md:min-h-[640px]"
        base={<DeviceStage className="h-[30%] -translate-y-16 md:h-[46%] md:-translate-y-8"><Device tint={f.tint} className="h-full w-full opacity-60" /></DeviceStage>}
        reveal={<div className="absolute inset-0 bg-black"><DeviceStage className="h-[30%] -translate-y-16 md:h-[46%] md:-translate-y-8"><Device tint={f.tint} irid={f.irid} className="h-full w-full" /></DeviceStage></div>}
      >
        <Copy
          id="reserve"
          size="md"
          kicker="Quiet clarity"
          title={<>Own your <em>rhythm</em></>}
          sub="Founding member batches shipping Spring 2027. Includes lifetime membership and custom sizing kit."
          accent={A}
          right={
            <div className="pointer-events-auto flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Finish">
                {FINISHES.map((x, i) => (
                  <Pill key={x.name} active={fi === i} accent={A} onClick={() => setFi(i)}>
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: x.tint }} />
                    {x.name}
                  </Pill>
                ))}
              </div>
              <button onClick={() => setDone(true)} className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
                {done ? `✓ Batch 01 reserved · ${f.name}` : 'Reserve Batch 01'}
              </button>
            </div>
          }
        />
      </Surface>
    </>
  )
}
