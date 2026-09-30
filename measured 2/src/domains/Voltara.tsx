import { useEffect, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { clamp, fmt } from '../lib/engine'

const A = '#ff6a2b'
const F = 'font-grotesk'
const BODY = 'M60 288C56 252 96 244 168 226L330 152C384 124 486 108 588 112C690 118 748 152 806 192L902 216C952 228 950 262 944 288Z'

function Body() {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <linearGradient id="vbody" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3a3d44" /><stop offset=".45" stopColor="#15161a" /><stop offset="1" stopColor="#050506" /></linearGradient>
        <linearGradient id="vglass" x1="0" x2="1"><stop offset="0" stopColor="#0b0d12" /><stop offset=".5" stopColor="#2a3340" /><stop offset="1" stopColor="#0b0d12" /></linearGradient>
      </defs>
      <ellipse cx="500" cy="352" rx="470" ry="18" fill="#000" opacity=".7" />
      <path d={BODY} fill="url(#vbody)" stroke="#fff" strokeOpacity=".25" />
      <path d="M350 168 420 140C470 126 540 122 600 128L650 158Z" fill="url(#vglass)" />
      <path d="M660 160 770 192H668Z" fill="url(#vglass)" />
      <path d="M170 248C400 232 650 236 930 250" stroke="#fff" strokeOpacity=".22" fill="none" />
      <path d="M900 236c18 0 34 4 40 10-14 2-30 0-46-2Z" fill="#fff" opacity=".9" />
      <path d="M62 262c10-8 30-10 50-8l-4 10c-18 0-34 2-46 6Z" fill={A} />
      {[250, 750].map((x) => (
        <g key={x}>
          <circle cx={x} cy="288" r="68" fill="#0a0a0b" />
          <circle cx={x} cy="288" r="52" fill="#15161a" stroke="#fff" strokeOpacity=".25" />
          <circle cx={x} cy="288" r="8" fill="#888" />
        </g>
      ))}
    </svg>
  )
}

function Chassis() {
  const cells = Array.from({ length: 28 })
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
      <ellipse cx="500" cy="352" rx="470" ry="18" fill="#000" opacity=".7" />
      <path d={BODY} fill="#0c0502" stroke={A} strokeOpacity=".5" strokeDasharray="5 6" />
      {/* battery */}
      <rect x="318" y="262" width="364" height="48" rx="8" fill="#140803" stroke={A} />
      {cells.map((_, i) => (
        <g key={i}>
          {[0, 1].map((r) => (
            <rect key={r} x={324 + i * 12.8} y={268 + r * 20} width="10" height="16" rx="2" fill={`hsl(${18 + ((i * 7 + r * 13) % 34)} 100% ${46 + ((i * 5) % 18)}%)`} className="a-pulse" style={{ animationDelay: `${(i % 9) * 0.18}s`, animationDuration: '2.2s' }} />
          ))}
        </g>
      ))}
      <text x="500" y="256" textAnchor="middle" fill={A} fontSize="11" fontFamily="JetBrains Mono" letterSpacing="3">100 kWh · 4 416 CELLS · 46 °C MAX</text>
      {/* cables + motors */}
      <path d="M318 286H272M682 286H728" stroke="#ffd36b" strokeWidth="3" className="a-dash" />
      {[250, 750].map((x) => (
        <g key={x}>
          <circle cx={x} cy="288" r="68" fill="none" stroke={A} strokeWidth="2" />
          {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={x} y1="288" x2={x + Math.cos((i * Math.PI) / 5) * 52} y2={288 + Math.sin((i * Math.PI) / 5) * 52} stroke={A} strokeOpacity=".5" />)}
          <g className="a-spin" style={{ animationDuration: '1.8s' }}>
            <circle cx={x} cy="288" r="24" fill="#2a0f04" stroke="#ffd36b" />
            {[0, 1, 2].map((k) => <rect key={k} x={x - 3} y="266" width="6" height="20" fill="#ffd36b" transform={`rotate(${k * 120} ${x} 288)`} />)}
          </g>
          <text x={x} y="384" textAnchor="middle" fill="#ffd36b" fontSize="11" fontFamily="JetBrains Mono">{x < 500 ? 'FRONT 310 kW' : 'REAR 420 kW'}</text>
        </g>
      ))}
      <path d="M250 220 290 150M750 220 710 152M330 152 420 130H590L690 158" stroke="#ffd36b" strokeOpacity=".5" fill="none" />
      <text x="500" y="92" textAnchor="middle" fill="#ffd36b" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="4">STRUCTURAL PACK · 0.94 Cd</text>
    </svg>
  )
}

/* ---------- range model ---------- */
function model(v: number, T: number, climate: boolean, regen: boolean) {
  let c = 105 + 0.0062 * v * v
  c *= T < 20 ? 1 + (20 - T) * 0.011 : T > 28 ? 1 + (T - 28) * 0.005 : 1
  if (climate) c += ((T < 18 ? 4 : T > 24 ? 2.5 : 0.5) * 1000) / v
  if (regen) c *= 0.96
  return { c, range: 95000 / c }
}
function Range_() {
  const [v, setV] = useState(110)
  const [T, setT] = useState(12)
  const [cl, setCl] = useState(true)
  const [rg, setRg] = useState(true)
  const m = model(v, T, cl, rg)
  const pts = Array.from({ length: 27 }).map((_, i) => {
    const s = 50 + i * 5
    return [((s - 50) / 130) * 560 + 20, 160 - (model(s, T, cl, rg).range / 950) * 140] as const
  })
  const cur = [((v - 50) / 130) * 560 + 20, 160 - (m.range / 950) * 140]
  return (
    <>
      <Copy id="range" font={F} size="md" pos="top" kicker="WLTP is a rumour" title={<>Honest <em>range</em></>} sub="Speed, weather and cabin climate — all in the model. Move a slider and the curve answers." accent={A} right={<span />} />
      <div className="absolute inset-x-5 top-[38%] md:left-[46%] md:right-10 md:top-[16%]">
        <div className="font-grotesk text-7xl font-medium tracking-tight text-white md:text-8xl">{fmt(m.range)}<span className="ml-2 text-2xl text-white/50">km</span></div>
        <div className="mt-1 font-mono text-[11px] text-white/50">{fmt(m.c)} Wh/km · {fmt(95000 / 1000)} kWh usable</div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${clamp(m.range / 950, 0, 1) * 100}%`, background: `linear-gradient(90deg,${A},#ffd36b)` }} /></div>
        <svg viewBox="0 0 600 180" className="mt-3 h-28 w-full md:h-44" role="img" aria-label="Range versus speed">
          {[0, 1, 2, 3].map((i) => <line key={i} x1="20" x2="580" y1={20 + i * 46.6} y2={20 + i * 46.6} stroke="#fff" strokeOpacity=".08" />)}
          <path d={pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('')} fill="none" stroke={A} strokeWidth="2.5" />
          <line x1={cur[0]} x2={cur[0]} y1="20" y2="165" stroke="#fff" strokeOpacity=".3" strokeDasharray="3 4" />
          <circle cx={cur[0]} cy={cur[1]} r="7" fill="#fff" stroke={A} strokeWidth="3" />
          <text x="20" y="178" fill="#fff" opacity=".4" fontSize="10" fontFamily="JetBrains Mono">50 km/h</text>
          <text x="580" y="178" textAnchor="end" fill="#fff" opacity=".4" fontSize="10" fontFamily="JetBrains Mono">180 km/h</text>
        </svg>
      </div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(46%-2.5rem)] md:min-w-[380px]">
        <div className="grid gap-2">
          <Range label="Speed" value={v} min={50} max={180} step={5} onChange={setV} accent={A} readout={`${v} km/h`} />
          <Range label="Outside temperature" value={T} min={-20} max={40} onChange={setT} accent={A} readout={`${T} °C`} />
          <div className="flex gap-2"><Pill active={cl} accent={A} onClick={() => setCl((c) => !c)} className="px-3 py-1.5 text-xs">Climate {cl ? 'on' : 'off'}</Pill><Pill active={rg} accent={A} onClick={() => setRg((c) => !c)} className="px-3 py-1.5 text-xs">Regen {rg ? 'high' : 'off'}</Pill></div>
        </div>
      </div>
    </>
  )
}

/* ---------- charge ---------- */
const kw = (s: number) => (s < 35 ? 250 : Math.max(35, 250 - (s - 35) * 3.3))
function Charge() {
  const [soc, setSoc] = useState(10)
  const [mins, setMins] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (!hold) return
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      setSoc((s) => {
        const n = Math.min(100, s + (kw(s) / 250) * 20 * dt)
        return n
      })
      setMins((m) => m + dt * 5.2)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [hold])
  const C = 2 * Math.PI * 110
  const flow = hold && soc < 100
  return (
    <>
      <Copy id="charge" font={F} size="md" pos="top" kicker="800-volt architecture" title={<>10 to 80 in <em>eighteen</em></>} sub="Press and hold the ring. Power peaks at 250 kW and tapers like the real thing; let go and it pauses." accent={A} right={<span />} />
      <div className="absolute inset-x-0 bottom-8 top-[36%] flex flex-col items-center justify-center gap-4 md:left-[40%] md:top-[14%] md:bottom-10">
        <button
          aria-label="Hold to charge"
          className="relative h-56 w-56 select-none rounded-full outline-none md:h-72 md:w-72"
          style={{ touchAction: 'none' }}
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setHold(true) }}
          onPointerUp={() => setHold(false)}
          onPointerCancel={() => setHold(false)}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setHold(true)}
          onKeyUp={() => setHold(false)}
          onBlur={() => setHold(false)}
        >
          <svg viewBox="0 0 260 260" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="130" cy="130" r="110" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="14" />
            <circle cx="130" cy="130" r="110" fill="none" stroke={A} strokeWidth="14" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - soc / 100)} style={{ filter: `drop-shadow(0 0 ${hold ? 14 : 4}px ${A})` }} />
            <circle cx="130" cy="130" r="92" fill="none" stroke={A} strokeOpacity={flow ? 0.7 : 0.2} strokeDasharray="2 10" className={flow ? 'a-dash' : ''} />
            {/* 80% marker */}
            <circle cx={130 + Math.cos(0.8 * 2 * Math.PI) * 110} cy={130 + Math.sin(0.8 * 2 * Math.PI) * 110} r="5" fill="#fff" />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-grotesk text-6xl font-medium text-white md:text-7xl">{Math.round(soc)}<span className="text-2xl text-white/50">%</span></span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: flow ? A : 'rgba(255,255,255,.45)' }}>{soc >= 100 ? 'Full' : hold ? `${Math.round(kw(soc))} kW` : 'Hold to charge'}</span>
          </span>
        </button>
        <div className="flex items-center gap-6 font-mono text-[11px] text-white/60">
          <span><b className="text-xl text-white">{Math.floor(mins)}</b> min</span>
          <span><b className="text-xl text-white">{fmt(((soc - 10) / 100) * 100)}</b> kWh added</span>
          <Pill onClick={() => { setSoc(10); setMins(0) }} className="px-3 py-1.5 text-xs">Reset</Pill>
        </div>
      </div>
    </>
  )
}

export default function Voltara() {
  return (
    <>
      <Surface
        id="hero"
        gridColor="#ff6a2b"
        base={<div className="absolute inset-x-0 top-[14%] h-[52%]"><Body /></div>}
      >
        {/* hidden layer: chassis revealed right of the scan-line */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ clipPath: 'inset(0 0 0 var(--mx, 100%))' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,106,43,.16),transparent_60%)]" />
          <div className="absolute inset-x-0 top-[14%] h-[52%]"><Chassis /></div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white" style={{ left: 'var(--mx, 100%)', boxShadow: `0 0 24px 4px ${A}` }}>
          <span className="absolute left-1/2 top-[40%] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-black text-xs text-white">⇄</span>
          <span className="absolute right-3 top-28 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Body</span>
          <span className="absolute left-3 top-28 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: A }}>Chassis</span>
        </div>
        <Copy id="hero" h="h1" size="lg" font={F} kicker="Voltara One · Grand tourer" title="Voltara" sub="Beautiful outside. Brutally efficient within. Sweep across to see what the paint is hiding." accent={A} stat={{ value: '2.1 s', label: '0 – 100 km/h' }} />
      </Surface>
      <Surface id="range" gridColor="#ff6a2b" className="min-h-[840px] md:min-h-[700px]"><Range_ /></Surface>
      <Surface id="charge" gridColor="#ff6a2b" className="min-h-[720px] md:min-h-[680px]"><Charge /></Surface>
    </>
  )
}
