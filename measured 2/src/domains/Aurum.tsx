import { useEffect, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { gearPath } from '../lib/art'
import { useSurface, fmt } from '../lib/engine'

const A = '#d6b36a'
const F = 'font-cormorant'

const METALS = [
  { n: 'Steel', c: '#b8bcc4', p: 0 },
  { n: 'Rose gold', c: '#d9a08a', p: 9200 },
  { n: 'Yellow gold', c: '#d6b36a', p: 8600 },
  { n: 'Platinum', c: '#e5e7eb', p: 14800 },
]
const DIALS = [
  { n: 'Midnight', c: '#0b1224', ink: '#f5e9c8', p: 0 },
  { n: 'Ivory', c: '#e9e1cf', ink: '#1a1a1a', p: 0 },
  { n: 'Forest', c: '#10281f', ink: '#f5e9c8', p: 600 },
]

/* ---------- Dial (front) ---------- */
function Dial({ metal, dial, ink, interactive, setMode, offset }: { metal: string; dial: string; ink: string; interactive?: boolean; setMode?: boolean; offset: React.MutableRefObject<number> }) {
  const { active } = useSurface()
  const hh = useRef<SVGGElement>(null)
  const mh = useRef<SVGGElement>(null)
  const sh = useRef<SVGGElement>(null)
  const drag = useRef(false)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const tick = () => {
      const t = new Date(Date.now() + offset.current)
      const s = t.getSeconds() + t.getMilliseconds() / 1000
      const m = t.getMinutes() + s / 60
      const h = (t.getHours() % 12) + m / 60
      sh.current?.setAttribute('transform', `rotate(${s * 6} 200 200)`)
      mh.current?.setAttribute('transform', `rotate(${m * 6} 200 200)`)
      hh.current?.setAttribute('transform', `rotate(${h * 30} 200 200)`)
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [active, offset])

  const setFromPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const b = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (b.left + b.width / 2)
    const dy = e.clientY - (b.top + b.height / 2)
    const ang = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360
    const now = new Date(Date.now() + offset.current)
    const curMin = now.getMinutes() + now.getSeconds() / 60
    const diff = ang / 6 - curMin
    offset.current += (((diff + 30) % 60 + 60) % 60 - 30) * 60000
  }

  return (
    <svg
      viewBox="-6 -6 416 412"
      className="h-full w-full select-none"
      style={{ touchAction: setMode ? 'none' : 'pan-y', cursor: interactive ? 'grab' : 'default' }}
      onPointerDown={(e) => {
        if (!interactive) return
        drag.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        setFromPointer(e)
      }}
      onPointerMove={(e) => drag.current && setFromPointer(e)}
      onPointerUp={() => (drag.current = false)}
      aria-label={interactive ? 'Watch dial. Drag to set the time.' : 'Watch dial'}
      role="img"
    >
      <defs>
        <linearGradient id={`m${metal.slice(1)}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".35" stopColor={metal} />
          <stop offset=".7" stopColor="#3a3a3a" />
          <stop offset="1" stopColor={metal} />
        </linearGradient>
        <radialGradient id="dshade" cx=".35" cy=".3"><stop offset="0" stopColor="#fff" stopOpacity=".16" /><stop offset="1" stopColor="#000" stopOpacity=".45" /></radialGradient>
      </defs>
      <rect x="388" y="186" width="16" height="28" rx="4" fill={`url(#m${metal.slice(1)})`} />
      <circle cx="200" cy="200" r="190" fill={`url(#m${metal.slice(1)})`} />
      <circle cx="200" cy="200" r="176" fill="#0a0a0a" />
      <circle cx="200" cy="200" r="170" fill={dial} />
      <circle cx="200" cy="200" r="170" fill="url(#dshade)" />
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i * 6 * Math.PI) / 180
        const big = i % 5 === 0
        const r1 = big ? 140 : 152
        return <line key={i} x1={200 + Math.sin(a) * r1} y1={200 - Math.cos(a) * r1} x2={200 + Math.sin(a) * 162} y2={200 - Math.cos(a) * 162} stroke={ink} strokeWidth={big ? 3 : 1} opacity={big ? 0.95 : 0.4} />
      })}
      <text x="200" y="138" textAnchor="middle" fill={ink} fontFamily="Cormorant Garamond" fontSize="22" letterSpacing="9" fontWeight="600">AURUM</text>
      <text x="200" y="158" textAnchor="middle" fill={A} fontFamily="JetBrains Mono" fontSize="7" letterSpacing="4">TOURBILLON</text>
      {/* tourbillon aperture */}
      <circle cx="200" cy="262" r="32" fill="#050505" stroke={metal} strokeWidth="3" />
      <g className="a-spin" style={{ animationDuration: '60s' }}>
        <path d={gearPath(200, 262, 24, 12, 0.2)} fill="none" stroke={A} strokeWidth="1.4" />
        <circle cx="200" cy="262" r="6" fill={A} />
      </g>
      <g ref={hh}><path d="M200 214 192 200 200 122 208 200Z" fill={ink} stroke="#000" strokeOpacity=".4" /></g>
      <g ref={mh}><path d="M200 216 195 200 200 48 205 200Z" fill={ink} stroke="#000" strokeOpacity=".4" /></g>
      <g ref={sh}>
        <line x1="200" y1="228" x2="200" y2="38" stroke={A} strokeWidth="1.6" />
        <circle cx="200" cy="222" r="5" fill={A} />
      </g>
      <circle cx="200" cy="200" r="4" fill="#000" />
    </svg>
  )
}

/* ---------- Movement (back) ---------- */
const GEARS = [
  { cx: 140, cy: 170, r: 62, t: 28, dir: 1, dur: 40, c: A },
  { cx: 252, cy: 140, r: 44, t: 20, dir: -1, dur: 28, c: '#e5e7eb' },
  { cx: 268, cy: 240, r: 54, t: 24, dir: 1, dur: 34, c: A },
  { cx: 150, cy: 290, r: 36, t: 16, dir: -1, dur: 22, c: '#e5e7eb' },
  { cx: 214, cy: 196, r: 26, t: 12, dir: -1, dur: 16, c: '#f87171' },
]
function Movement({ wind, metal, engrave }: { wind: number; metal: string; engrave?: string }) {
  const stopped = wind < 0.02
  const f = 0.35 + wind * 0.9
  const turns = 3 + wind * 6
  let sp = ''
  for (let i = 0; i <= 160; i++) {
    const th = (i / 160) * turns * Math.PI * 2
    const r = 6 + (30 * th) / (turns * Math.PI * 2)
    sp += (i ? 'L' : 'M') + (78 + Math.cos(th) * r).toFixed(1) + ' ' + (92 + Math.sin(th) * r).toFixed(1)
  }
  const ps = { animationPlayState: stopped ? 'paused' : 'running' } as const
  return (
    <svg viewBox="-6 -6 416 412" className="h-full w-full" role="img" aria-label="Watch movement, case-back view">
      <defs>
        <radialGradient id="plate" cx=".4" cy=".35"><stop offset="0" stopColor="#3b342a" /><stop offset="1" stopColor="#0d0b08" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill={metal} />
      <circle cx="200" cy="200" r="176" fill="#0a0a0a" />
      <circle cx="200" cy="200" r="170" fill="url(#plate)" />
      {Array.from({ length: 24 }).map((_, i) => (
        <path key={i} d={`M${60 + i * 12} 40Q${80 + i * 12} 200 ${60 + i * 12} 360`} stroke={A} strokeOpacity=".05" fill="none" />
      ))}
      <path d={sp} fill="none" stroke="#9ca3af" strokeWidth="1.6" />
      <circle cx="78" cy="92" r="4" fill={A} />
      {GEARS.map((g, i) => (
        <g key={i} className="a-spin" style={{ animationDuration: `${g.dur / f}s`, animationDirection: g.dir > 0 ? 'normal' : 'reverse', ...ps }}>
          <path d={gearPath(g.cx, g.cy, g.r, g.t)} fill={`${g.c}18`} stroke={g.c} strokeWidth="1.6" />
          <circle cx={g.cx} cy={g.cy} r={g.r * 0.62} fill="none" stroke={g.c} strokeOpacity=".4" strokeDasharray="3 4" />
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={g.cx} y1={g.cy} x2={g.cx + Math.cos((k * Math.PI) / 2) * g.r * 0.62} y2={g.cy + Math.sin((k * Math.PI) / 2) * g.r * 0.62} stroke={g.c} strokeOpacity=".6" />
          ))}
          <circle cx={g.cx} cy={g.cy} r="5" fill={g.c} />
        </g>
      ))}
      {/* balance wheel */}
      <g className="a-swing" style={{ animationDuration: `${0.5 / f}s`, ...ps }}>
        <circle cx="290" cy="320" r="34" fill="none" stroke="#e5e7eb" strokeWidth="3" />
        <path d="M256 320h68M290 286v68" stroke="#e5e7eb" strokeWidth="2" />
        <circle cx="290" cy="320" r="4" fill={A} />
      </g>
      {['#ef4444', '#ef4444', '#ef4444'].map((c, i) => (
        <circle key={i} cx={300 + i * 22} cy={92} r="7" fill={c} stroke="#fff" strokeOpacity=".5" />
      ))}
      {engrave && <text x="200" y="372" textAnchor="middle" fill={A} fontFamily="Cormorant Garamond" fontSize="15" letterSpacing="6" opacity=".9">{engrave.toUpperCase()}</text>}
    </svg>
  )
}

function Watch3D({ flipped, metal, dial, ink, wind = 0.8, engrave, interactive, setMode, offset }: { flipped: boolean; metal: string; dial: string; ink: string; wind?: number; engrave?: string; interactive?: boolean; setMode?: boolean; offset: React.MutableRefObject<number> }) {
  const hidden = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const
  return (
    <div className="relative aspect-square h-full" style={{ perspective: 1400 }}>
      <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(.3,.7,.2,1)]" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${flipped ? 180 : 0}deg)` }}>
        <div className="absolute inset-0 drop-shadow-[0_30px_60px_rgba(214,179,106,.18)]" style={hidden}>
          <Dial metal={metal} dial={dial} ink={ink} interactive={interactive} setMode={setMode} offset={offset} />
        </div>
        <div className="absolute inset-0" style={{ ...hidden, transform: 'rotateY(180deg)' }}>
          <Movement wind={wind} metal={metal} engrave={engrave} />
        </div>
      </div>
    </div>
  )
}

export default function Aurum() {
  const offset = useRef(0)
  const [flipped, setFlipped] = useState(false)
  const [setMode, setSetMode] = useState(false)
  const [wind, setWind] = useState(0.7)
  const [mi, setMi] = useState(2)
  const [di, setDi] = useState(0)
  const [text, setText] = useState('N · 01')
  const [done, setDone] = useState(false)
  const m = METALS[mi]
  const d = DIALS[di]
  const price = 18400 + m.p + d.p + (text ? 350 : 0)
  const hours = Math.round(wind * 72)

  return (
    <>
      <Surface id="hero" gridColor="#d6b36a" className="min-h-[780px] md:min-h-[680px]" base={<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(214,179,106,.14),transparent_60%)]" />}>
        <div className="absolute inset-x-0 top-[13%] bottom-[40%] flex justify-center md:bottom-[30%]">
          <Watch3D flipped={flipped} metal="#d6b36a" dial="#0b1224" ink="#f5e9c8" wind={0.8} interactive setMode={setMode} offset={offset} />
        </div>
        <p className="pointer-events-none absolute inset-x-0 top-[11%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:top-[12%]">
          {flipped ? 'Case-back · sapphire window' : setMode ? 'Drag around the dial to set the time' : 'Drag the dial to set the time'}
        </p>
        <Copy
          id="hero"
          h="h1"
          size="md"
          font={F}
          kicker="Calibre 01 · Flying tourbillon"
          title={<>Time, made <em>visible</em></>}
          sub="Hand-finished over 410 hours. Set the hands with your fingertip, then turn the watch over to see the movement that keeps them honest."
          accent={A}
          right={
            <div className="pointer-events-auto flex flex-wrap gap-2 md:justify-end">
              <Pill active={flipped} accent={A} onClick={() => setFlipped((f) => !f)}>↻ Turn over</Pill>
              <Pill active={setMode} accent={A} onClick={() => setSetMode((s) => !s)} title="Enable touch-drag on phones">Set time</Pill>
              <Pill onClick={() => (offset.current = 0)}>Real time</Pill>
            </div>
          }
        />
      </Surface>

      <Surface id="movement" gridColor="#d6b36a" className="min-h-[720px] md:min-h-[680px]" base={<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(214,179,106,.12),transparent_55%)]" />}>
        <Copy id="movement" font={F} size="md" pos="top" kicker="Manual-wind movement" title={<>Wound by <em>hand</em></>} sub="Move the slider to wind the mainspring. Every gear answers. Let it run down to zero and the watch falls silent." accent={A} right={<span />} />
        <div className="absolute inset-x-0 top-[40%] bottom-[30%] flex justify-center md:left-[38%] md:top-[14%] md:bottom-[12%]">
          <Watch3D flipped metal="#d6b36a" dial="#0b1224" ink="#f5e9c8" wind={wind} offset={offset} />
        </div>
        <div className="absolute inset-x-0 bottom-10 grid gap-5 px-6 md:bottom-14 md:left-0 md:w-[38%] md:px-10">
          <Range label="Mainspring winding" value={wind} min={0} max={1} step={0.01} onChange={setWind} accent={A} readout={wind < 0.02 ? 'Stopped' : `${hours} h reserve`} />
          <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-white/60">
            <div className="liquid-glass rounded-xl p-3"><div className="text-lg text-white">{wind < 0.02 ? '0' : '28,800'}</div>vph</div>
            <div className="liquid-glass rounded-xl p-3"><div className="text-lg text-white">{Math.round(230 + wind * 70)}°</div>amplitude</div>
            <div className="liquid-glass rounded-xl p-3"><div className="text-lg text-white">±{(2.5 - wind * 2).toFixed(1)}s</div>per day</div>
          </div>
        </div>
      </Surface>

      <Surface id="commission" gridColor="#d6b36a" className="min-h-[820px] md:min-h-[680px]" base={<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(214,179,106,.12),transparent_55%)]" />}>
        <Copy id="commission" font={F} size="md" pos="top" kicker="Made to order · 14 weeks" title={<>Yours, <em>engraved</em></>} sub="Choose the metal, the dial and eight characters that only the case-back will ever say." accent={A} right={<span />} />
        <div className="absolute inset-x-0 top-[36%] flex h-[24%] justify-center gap-6 md:inset-x-auto md:right-10 md:top-[14%] md:h-[52%] md:w-[46%] md:justify-end md:gap-10">
          <Watch3D flipped={false} metal={m.c} dial={d.c} ink={d.ink} offset={offset} />
          <div className="hidden h-full md:block"><Watch3D flipped metal={m.c} dial={d.c} ink={d.ink} wind={0.9} engrave={text} offset={offset} /></div>
        </div>
        <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-14 md:left-10 md:w-[52%]">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Case</p>
              <div className="flex flex-wrap gap-2">
                {METALS.map((x, i) => (<Pill key={x.n} active={mi === i} accent={A} onClick={() => setMi(i)} className="px-3 py-1.5 text-xs"><span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: x.c }} />{x.n}</Pill>))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Dial</p>
              <div className="flex flex-wrap gap-2">
                {DIALS.map((x, i) => (<Pill key={x.n} active={di === i} accent={A} onClick={() => setDi(i)} className="px-3 py-1.5 text-xs"><span className="mr-1.5 inline-block h-2 w-2 rounded-full border border-white/30" style={{ background: x.c }} />{x.n}</Pill>))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input value={text} maxLength={12} onChange={(e) => setText(e.target.value)} aria-label="Engraving" placeholder="Engraving (12 max)" className="min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2.5 font-mono text-xs tracking-widest text-white outline-none placeholder:text-white/30" />
            <div className="flex items-center justify-between gap-4">
              <span className="font-cormorant text-3xl text-white">€{fmt(price)}</span>
              <button onClick={() => setDone(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-black" style={{ background: A }}>{done ? '✓ Request sent' : 'Begin commission'}</button>
            </div>
          </div>
        </div>
      </Surface>
    </>
  )
}
