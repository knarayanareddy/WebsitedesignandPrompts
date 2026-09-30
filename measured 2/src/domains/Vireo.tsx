import { useEffect, useMemo, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { clamp, fmt, lerp, rng, useFrame } from '../lib/engine'

const A = '#a78bfa'
const LENS_R = 150

/* ---------- cell scene (rendered twice: base + inside the lens) ---------- */
function Cells({ detail }: { detail?: boolean }) {
  const cells = useMemo(() => {
    const r = rng(21)
    return Array.from({ length: 15 }).map(() => ({ x: 60 + r() * 880, y: 60 + r() * 580, r: 38 + r() * 52, d: r() * 4, rot: r() * 360 }))
  }, [])
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" style={{ background: detail ? '#0a0418' : 'radial-gradient(circle at 50% 40%,#1a1030,#05030c)' }}>
      <defs>
        <radialGradient id={`cg${detail ? 'd' : 'b'}`} cx=".4" cy=".35">
          <stop offset="0" stopColor={detail ? '#c4b5fd' : '#a78bfa'} stopOpacity={detail ? 0.32 : 0.22} />
          <stop offset="1" stopColor="#4c1d95" stopOpacity=".1" />
        </radialGradient>
      </defs>
      {cells.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <g className="a-float" style={{ animationDelay: `${c.d}s`, animationDuration: `${6 + c.d}s` }}>
            <circle r={c.r} fill={`url(#cg${detail ? 'd' : 'b'})`} stroke={A} strokeOpacity={detail ? 0.9 : 0.5} strokeWidth={detail ? 1.6 : 1.4} />
            <circle cx={c.r * 0.15} cy={-c.r * 0.1} r={c.r * 0.38} fill={detail ? '#7c3aed' : '#6d28d9'} fillOpacity={detail ? 0.5 : 0.35} stroke={A} strokeOpacity=".6" />
            {[0, 1, 2].map((k) => (
              <ellipse key={k} cx={Math.cos(c.rot + k * 2.1) * c.r * 0.6} cy={Math.sin(c.rot + k * 2.1) * c.r * 0.6} rx="7" ry="3.5" fill="#f0abfc" opacity=".5" transform={`rotate(${k * 50})`} />
            ))}
            {detail &&
              Array.from({ length: 12 }).map((_, k) => {
                const a = c.rot + (k / 12) * Math.PI * 2
                const x = Math.cos(a) * c.r
                const y = Math.sin(a) * c.r
                const ex = Math.cos(a) * (c.r + 16)
                const ey = Math.sin(a) * (c.r + 16)
                const bound = (k + i) % 3 === 0
                return (
                  <g key={k}>
                    <path d={`M${x} ${y}L${ex} ${ey}M${ex} ${ey}l${Math.cos(a + 0.6) * 7} ${Math.sin(a + 0.6) * 7}M${ex} ${ey}l${Math.cos(a - 0.6) * 7} ${Math.sin(a - 0.6) * 7}`} stroke="#5eead4" strokeWidth="1.6" fill="none" />
                    {bound && <circle cx={ex + Math.cos(a) * 6} cy={ey + Math.sin(a) * 6} r="4" fill="#fde047" className="a-pulse" style={{ animationDelay: `${k * 0.15}s` }} />}
                  </g>
                )
              })}
            {detail && i % 4 === 0 && <text y={-c.r - 26} textAnchor="middle" fill="#5eead4" fontFamily="JetBrains Mono" fontSize="11">CD19⁺ · IgG bound</text>}
          </g>
        </g>
      ))}
    </svg>
  )
}

function Lens({ zoom }: { zoom: React.MutableRefObject<number> }) {
  const lens = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useFrame(({ x, y, r, w, h }) => {
    const k = clamp(r / LENS_R, 0, 1)
    const l = lens.current
    const i = inner.current
    if (!l || !i) return
    l.style.transform = `translate3d(${x - LENS_R}px,${y - LENS_R}px,0) scale(${k})`
    l.style.opacity = String(k)
    i.style.width = w + 'px'
    i.style.height = h + 'px'
    i.style.transform = `translate(${LENS_R}px,${LENS_R}px) scale(${zoom.current}) translate(${-x}px,${-y}px)`
  })
  return (
    <div ref={lens} className="pointer-events-none absolute left-0 top-0 z-30 opacity-0" style={{ width: LENS_R * 2, height: LENS_R * 2 }} aria-hidden>
      <div className="absolute inset-0 overflow-hidden rounded-full bg-black shadow-[0_0_80px_rgba(167,139,250,.45)]">
        <div ref={inner} className="absolute left-0 top-0 origin-top-left will-change-transform">
          <Cells detail />
        </div>
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 40px 10px rgba(0,0,0,.7)' }} />
      </div>
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        <circle cx="150" cy="150" r="147" fill="none" stroke={A} strokeWidth="2" />
        <circle cx="150" cy="150" r="138" fill="none" stroke="#fff" strokeOpacity=".2" strokeDasharray="2 6" />
        <path d="M150 20v40M150 240v40M20 150h40M240 150h40" stroke={A} strokeOpacity=".8" />
        <circle cx="150" cy="150" r="3" fill="#fff" />
      </svg>
    </div>
  )
}

/* ---------- assay ---------- */
const ROWS = 'ABCDEFGH'.split('')
const DOSES = [0.01, 0.03, 0.1, 0.3, 1, 3, 10, 30]
const IC50 = (() => {
  const r = rng(77)
  return Array.from({ length: 12 }).map(() => Math.pow(10, r() * 3.2 - 1.6))
})()
const inhib = (row: number, col: number) => 1 / (1 + Math.pow(IC50[col] / DOSES[row], 1.2))

function Assay() {
  const [ran, setRan] = useState(false)
  const [thr, setThr] = useState(70)
  const [hover, setHover] = useState<[number, number] | null>(null)
  const hits = ran ? ROWS.reduce((n, _, r) => n + IC50.reduce((m, __, c) => m + (inhib(r, c) * 100 >= thr ? 1 : 0), 0), 0) : 0
  const h = hover ? { compound: `VRO-${1000 + hover[1] * 37}`, dose: DOSES[hover[0]], v: inhib(hover[0], hover[1]), ic: IC50[hover[1]] } : null
  return (
    <>
      <Copy id="assay" size="md" pos="top" kicker="High-throughput screening" title={<>Ninety-six questions, <em>at once</em></>} sub="Twelve compounds, eight doses. Run the screen and watch potency reveal itself across the plate." accent={A} right={<span />} />
      <div className="absolute inset-x-0 top-[40%] px-4 md:inset-x-auto md:left-[44%] md:right-10 md:top-[15%] md:px-0">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 grid grid-cols-[14px_repeat(12,1fr)] gap-1.5 font-mono text-[9px] text-white/30 md:grid-cols-[20px_repeat(12,1fr)] md:gap-2.5"><span />{IC50.map((_, c) => <span key={c} className="text-center">{c + 1}</span>)}</div>
          {ROWS.map((row, r) => (
            <div key={row} className="mb-1.5 grid grid-cols-[14px_repeat(12,1fr)] items-center gap-1.5 md:mb-2.5 md:grid-cols-[20px_repeat(12,1fr)] md:gap-2.5">
              <span className="font-mono text-[9px] text-white/30">{row}</span>
              {IC50.map((_, c) => {
                const v = inhib(r, c)
                const hit = ran && v * 100 >= thr
                return (
                  <button
                    key={c}
                    aria-label={`Well ${row}${c + 1}`}
                    onMouseEnter={() => setHover([r, c])}
                    onFocus={() => setHover([r, c])}
                    className="aspect-square rounded-full border border-white/10 transition-all duration-500"
                    style={{
                      transitionDelay: ran ? `${c * 55}ms` : '0ms',
                      background: ran ? `rgba(167,139,250,${0.08 + v * 0.92})` : 'rgba(255,255,255,.03)',
                      boxShadow: hit ? `0 0 14px ${A}, 0 0 0 2px #fde047` : ran ? `0 0 ${v * 12}px ${A}66` : 'none',
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-8 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(44%-3.5rem)] md:min-w-[380px]">
        <div className="liquid-glass rounded-3xl p-5">
          <div className="mb-3 min-h-[2.5rem] font-mono text-[11px] text-white/60">
            {h ? (
              <span><b className="text-white">{h.compound}</b> · {h.dose} µM · {ran ? <>inhibition <b style={{ color: A }}>{(h.v * 100).toFixed(0)}%</b> · IC₅₀ ≈ {h.ic.toFixed(2)} µM</> : 'not yet read'}</span>
            ) : 'Hover a well to inspect the compound and dose.'}
          </div>
          <div className="grid grid-cols-2 items-end gap-3">
            <div className="col-span-2"><Range label="Hit threshold" value={thr} min={40} max={95} onChange={setThr} accent={A} readout={`≥ ${thr}% inhibition`} /></div>
            <div className="font-mono text-[11px] text-white/50"><span className="text-3xl text-white">{ran ? hits : '—'}</span> wells above threshold</div>
            <div className="flex flex-wrap justify-end gap-2"><Pill active={ran} accent={A} onClick={() => setRan(true)}>▶ Run screen</Pill><Pill onClick={() => setRan(false)}>Reset</Pill></div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- fold ---------- */
const N = 36
const SEQ = ['MET', 'ALA', 'LEU', 'GLY', 'VAL', 'LYS', 'ASP', 'PHE', 'SER', 'TRP', 'HIS', 'GLU']
const UNF = (() => {
  const r = rng(5)
  let y = 180
  return Array.from({ length: N }).map((_, i) => {
    y = clamp(y + (r() - 0.5) * 150, 40, 320)
    return [40 + i * 21.5, y + Math.sin(i) * 14] as [number, number]
  })
})()
const FOLD = Array.from({ length: N }).map((_, i) => {
  const t = i / (N - 1)
  const a = t * Math.PI * 7
  const rad = 110 * (0.45 + 0.55 * Math.sin(t * Math.PI))
  return [400 + Math.cos(a) * rad * 1.5, 180 + Math.sin(a) * rad * 0.7 + (t - 0.5) * 30] as [number, number]
})

function Fold() {
  const [p, setP] = useState(0)
  const [hv, setHv] = useState<number | null>(null)
  const timer = useRef<number | null>(null)
  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])
  const e = p * p * (3 - 2 * p)
  const pts = UNF.map((u, i) => [lerp(u[0], FOLD[i][0], e), lerp(u[1], FOLD[i][1], e)])
  const path = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join('')
  const play = () => {
    if (timer.current) clearInterval(timer.current)
    setP(0)
    let v = 0
    timer.current = window.setInterval(() => {
      v += 0.014
      setP(Math.min(1, v))
      if (v >= 1 && timer.current) clearInterval(timer.current)
    }, 30)
  }
  return (
    <>
      <Copy id="fold" size="md" pos="top" kicker="Structure prediction" title={<>Watch a protein <em>decide</em></>} sub="Drag from random coil to folded state. Free energy falls as hydrogen bonds lock in." accent={A} right={<span />} />
      <svg viewBox="0 0 800 360" className="absolute inset-x-0 top-[44%] h-[22%] w-full md:top-[30%] md:h-[38%]" role="img" aria-label="Protein chain morphing from coil to helix">
        <defs><linearGradient id="chain" x1="0" x2="1"><stop offset="0" stopColor={A} /><stop offset="1" stopColor="#f0abfc" /></linearGradient></defs>
        {pts.map((q, i) => i + 4 < N && <line key={i} x1={q[0]} y1={q[1]} x2={pts[i + 4][0]} y2={pts[i + 4][1]} stroke="#5eead4" strokeOpacity={e * 0.5} strokeDasharray="2 4" />)}
        <path d={path} fill="none" stroke="url(#chain)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((q, i) => (
          <circle key={i} cx={q[0]} cy={q[1]} r={hv === i ? 10 : 6} fill={hv === i ? '#fff' : `hsl(${265 + (i / N) * 70} 90% 70%)`} onMouseEnter={() => setHv(i)} onMouseLeave={() => setHv(null)} style={{ cursor: 'pointer' }} />
        ))}
        {hv !== null && <text x={pts[hv][0]} y={pts[hv][1] - 16} textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono" fontSize="13">{SEQ[hv % 12]}{hv + 1}</text>}
      </svg>
      <div className="absolute inset-x-5 bottom-8 mx-auto max-w-3xl md:bottom-12">
        <div className="liquid-glass rounded-3xl p-5">
          <div className="grid grid-cols-2 items-end gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:gap-4">
            <div className="col-span-2 md:col-span-1"><Range label="Folding progress" value={p} min={0} max={1} step={0.01} onChange={setP} accent={A} readout={`${Math.round(p * 100)}%`} /></div>
            <div className="font-mono text-[11px] text-white/50"><span className="text-2xl text-white">{fmt(-42 * Math.pow(p, 1.5), 1)}</span> kcal/mol ΔG</div>
            <div className="font-mono text-[11px] text-white/50"><span className="text-2xl text-white">{(14 * (1 - p) + 0.8).toFixed(1)}</span> Å RMSD</div>
            <Pill onClick={play} accent={A}>↻ Auto-fold</Pill>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Vireo() {
  const [mag, setMag] = useState(40)
  const zoom = useRef(2 + ((40 - 10) / 90) * 4)
  zoom.current = 2 + ((mag - 10) / 90) * 4
  return (
    <>
      <Surface id="hero" radius={LENS_R} insetTop={0} gridColor="#a78bfa" base={<Cells />}>
        <Lens zoom={zoom} />
        <Copy
          id="hero"
          h="h1"
          size="hero"
          kicker="Drug discovery platform"
          title="Vireo"
          sub="See the cell. Then go one level deeper — the molecular layer only exists inside the lens."
          accent={A}
          right={
            <div className="liquid-glass pointer-events-auto w-full rounded-2xl p-4 md:w-64">
              <Range label="Magnification" value={mag} min={10} max={100} step={5} onChange={setMag} accent={A} readout={`×${mag}`} />
              <p className="mt-1 font-mono text-[10px] text-white/40">4.1 M compounds screened / week</p>
            </div>
          }
        />
      </Surface>
      <Surface id="assay" gridColor="#a78bfa" className="min-h-[860px] md:min-h-[700px]"><Assay /></Surface>
      <Surface id="fold" gridColor="#a78bfa" className="min-h-[780px] md:min-h-[660px]"><Fold /></Surface>
    </>
  )
}
