import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill, Range } from '../lib/ui'
import { useSurface } from '../lib/engine'

const A = '#ff4d8d'
const F = 'font-grotesk'

function Headphones({ color = '#2a2a30', className = '' }: { color?: string; className?: string }) {
  const u = 'cup' + useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id={u} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".5" stopColor={color} /><stop offset="1" stopColor="#000" /></linearGradient>
      </defs>
      <path d="M78 230V190a122 122 0 0 1 244 0v40" fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" />
      <path d="M78 230V190a122 122 0 0 1 244 0v40" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" transform="translate(0 -6)" />
      {[[52, 1], [294, -1]].map(([x]) => (
        <g key={x}>
          <rect x={x} y="200" width="54" height="120" rx="26" fill={`url(#${u})`} stroke="#fff" strokeOpacity=".3" />
          <circle cx={Number(x) + 27} cy="260" r="14" fill="#000" stroke={A} strokeOpacity=".8" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- audio helpers ---------- */
type AC = AudioContext
const makeCtx = () => new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
function blip(ac: AC, x01: number) {
  const scale = [0, 2, 4, 7, 9]
  const idx = Math.floor(x01 * 10)
  const f = 220 * Math.pow(2, (scale[idx % 5] + 12 * Math.floor(idx / 5)) / 12)
  const g = ac.createGain()
  g.gain.setValueAtTime(0.0001, ac.currentTime)
  g.gain.exponentialRampToValueAtTime(0.09, ac.currentTime + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 1.6)
  g.connect(ac.destination)
  ;[1, 2].forEach((m, i) => {
    const o = ac.createOscillator()
    o.type = i ? 'triangle' : 'sine'
    o.frequency.value = f * m
    o.connect(g)
    o.start()
    o.stop(ac.currentTime + 1.7)
  })
}

/* ---------- ripple reveal ---------- */
function Ripples({ sound }: { sound: boolean }) {
  const { active } = useSurface()
  const cv = useRef<HTMLCanvasElement>(null)
  const rip = useRef<{ x: number; y: number; t: number }[]>([])
  const size = useRef({ w: 0, h: 0 })
  const ac = useRef<AC | null>(null)
  const soundRef = useRef(sound)
  soundRef.current = sound

  const emit = useCallback((x: number, y: number, tone = false) => {
    rip.current.push({ x, y, t: performance.now() })
    if (rip.current.length > 7) rip.current.shift()
    if (tone && soundRef.current) {
      try {
        ac.current = ac.current ?? makeCtx()
        ac.current.resume()
        blip(ac.current, x / Math.max(1, size.current.w))
      } catch { /* audio unavailable */ }
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const c = cv.current!
    const ctx = c.getContext('2d')!
    let raf = 0
    let dpr = 1
    const resize = () => {
      const b = c.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      c.width = b.width * dpr
      c.height = b.height * dpr
      size.current = { w: b.width, h: b.height }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    let lastAuto = performance.now() - 2000
    const loop = (now: number) => {
      const { w, h } = size.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      if (now - lastAuto > 3200 && !rip.current.some((r) => now - r.t < 1200)) {
        lastAuto = now
        emit(w / 2, h * 0.46)
      }
      const grad = ctx.createLinearGradient(0, h * 0.2, 0, h * 0.8)
      grad.addColorStop(0, '#ff4d8d')
      grad.addColorStop(0.5, '#ffb3d0')
      grad.addColorStop(1, '#8b5cf6')
      rip.current = rip.current.filter((r) => now - r.t < 4200)
      for (const r of rip.current) {
        const age = now - r.t
        const R = age * 0.34
        const wd = 80 + age * 0.06
        const alpha = 1 - age / 4200
        ctx.save()
        ctx.beginPath()
        ctx.arc(r.x, r.y, R, 0, Math.PI * 2)
        ctx.arc(r.x, r.y, Math.max(0, R - wd), 0, Math.PI * 2)
        ctx.clip('evenodd')
        ctx.globalAlpha = alpha
        ctx.fillStyle = grad
        for (let x = 0; x < w; x += 10) {
          const nx = x / w
          const amp = (0.22 + 0.78 * Math.abs(Math.sin(nx * 9 + now / 420) * Math.cos(nx * 4.3 - now / 650))) * (1 - Math.abs(nx - 0.5) * 0.85)
          const bh = amp * h * 0.5
          ctx.fillRect(x, h * 0.5 - bh / 2, 6, bh)
        }
        ctx.restore()
        ctx.beginPath()
        ctx.arc(r.x, r.y, R, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,77,141,${alpha * 0.85})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [active, emit])

  useEffect(() => () => { ac.current?.close() }, [])

  return (
    <div
      className="absolute inset-0"
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).tagName !== 'CANVAS') return
        const b = cv.current!.getBoundingClientRect()
        emit(e.clientX - b.left, e.clientY - b.top, true)
      }}
    >
      <canvas ref={cv} className="absolute inset-0 h-full w-full" aria-hidden />
    </div>
  )
}

/* ---------- EQ ---------- */
const BANDS = [60, 250, 1000, 4000, 12000]
const LABELS = ['60 Hz', '250 Hz', '1 kHz', '4 kHz', '12 kHz']
const PRESETS: Record<string, number[]> = { Flat: [0, 0, 0, 0, 0], Warm: [4, 2, -1, -2, -3], Bright: [-2, -1, 1, 3, 5], Bass: [8, 4, 0, -1, 0] }
const CHORDS = [[110, 164.81, 220, 277.18, 329.63], [87.31, 130.81, 174.61, 220, 261.63], [130.81, 196, 261.63, 329.63, 392], [98, 146.83, 196, 246.94, 293.66]]
const resp = (f: number, g: number[]) => g.reduce((s, gi, i) => s + gi * Math.exp(-Math.pow(Math.log2(f / BANDS[i]), 2) / (2 * 0.9 * 0.9)), 0)

function Tuning() {
  const { active } = useSurface()
  const [g, setG] = useState<number[]>([0, 0, 0, 0, 0])
  const [playing, setPlaying] = useState(false)
  const audio = useRef<{ ac: AC; filters: BiquadFilterNode[]; oscs: OscillatorNode[]; timer: number; master: GainNode } | null>(null)

  const stop = useCallback(() => {
    const a = audio.current
    if (!a) return
    clearInterval(a.timer)
    a.master.gain.setTargetAtTime(0, a.ac.currentTime, 0.05)
    setTimeout(() => a.ac.close(), 300)
    audio.current = null
    setPlaying(false)
  }, [])

  const start = () => {
    const ac = makeCtx()
    ac.resume()
    const master = ac.createGain()
    master.gain.value = 0
    master.gain.setTargetAtTime(0.05, ac.currentTime, 0.1)
    const lp = ac.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 3200
    const filters = BANDS.map((f, i) => {
      const b = ac.createBiquadFilter()
      b.type = 'peaking'
      b.frequency.value = f
      b.Q.value = 0.9
      b.gain.value = g[i]
      return b
    })
    lp.connect(filters[0])
    filters.forEach((f, i) => f.connect(filters[i + 1] ?? master))
    master.connect(ac.destination)
    const oscs = CHORDS[0].map((f) => {
      const o = ac.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = f
      o.detune.value = (Math.random() - 0.5) * 10
      o.connect(lp)
      o.start()
      return o
    })
    let k = 0
    const timer = window.setInterval(() => {
      k = (k + 1) % CHORDS.length
      oscs.forEach((o, i) => o.frequency.setTargetAtTime(CHORDS[k][i], ac.currentTime, 0.08))
    }, 2400)
    audio.current = { ac, filters, oscs, timer, master }
    setPlaying(true)
  }

  useEffect(() => {
    audio.current?.filters.forEach((f, i) => f.gain.setTargetAtTime(g[i], audio.current!.ac.currentTime, 0.05))
  }, [g])
  useEffect(() => { if (!active) stop() }, [active, stop])
  useEffect(() => stop, [stop])

  const pts = Array.from({ length: 81 }).map((_, i) => {
    const f = 20 * Math.pow(1000, i / 80)
    return [(i / 80) * 600, 100 - resp(f, g) * 6.5] as const
  })
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('')
  return (
    <>
      <Copy id="tuning" font={F} size="md" pos="top" kicker="Five-band parametric" title={<>Tune the <em>room</em></>} sub="Every slider is a real peaking filter. Press play to hear a synthesised chord pass through your curve." accent={A} right={<span />} />
      <div className="absolute inset-x-5 top-[37%] h-[16%] md:inset-x-10 md:top-[15%] md:h-[36%] md:left-[42%]">
        <div className="absolute inset-0 flex items-center gap-[3px]" aria-hidden>
          {Array.from({ length: 48 }).map((_, i) => {
            const f = 20 * Math.pow(1000, i / 47)
            const gain = Math.pow(10, resp(f, g) / 20)
            const base = 0.3 + 0.5 * Math.abs(Math.sin(i * 0.7))
            return <div key={i} className="a-pulse flex-1 rounded-sm" style={{ height: `${Math.min(100, base * gain * 70)}%`, background: `linear-gradient(to top,${A},#8b5cf6)`, opacity: 0.35, animationDelay: `${(i % 8) * 0.2}s`, animationDuration: playing ? '0.9s' : '3s' }} />
          })}
        </div>
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Frequency response curve">
          <line x1="0" x2="600" y1="100" y2="100" stroke="#fff" strokeOpacity=".2" strokeDasharray="3 5" />
          <path d={`${line}L600 200L0 200Z`} fill={A} opacity=".12" />
          <path d={line} fill="none" stroke="#fff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(42%-2.5rem)] md:min-w-[360px]">
        <div className="grid gap-0.5">
          {BANDS.map((_, i) => <Range key={i} label={LABELS[i]} value={g[i]} min={-12} max={12} step={0.5} onChange={(v) => setG((p) => p.map((x, k) => (k === i ? v : x)))} accent={A} readout={`${g[i] > 0 ? '+' : ''}${g[i]} dB`} />)}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Pill active={playing} accent={A} onClick={() => (playing ? stop() : start())} className="px-3 py-1.5 text-xs">{playing ? '■ Stop' : '▶ Play chord'}</Pill>
          {Object.keys(PRESETS).map((p) => <Pill key={p} onClick={() => setG(PRESETS[p])} className="px-3 py-1.5 text-xs">{p}</Pill>)}
        </div>
      </div>
    </>
  )
}

/* ---------- ANC ---------- */
const ENVS = [{ n: 'Open office', db: 68 }, { n: 'Street', db: 82 }, { n: 'Train', db: 88 }, { n: 'Aircraft cabin', db: 95 }]
const COLORS = [{ n: 'Graphite', c: '#2a2a30' }, { n: 'Rose', c: '#ff4d8d' }, { n: 'Bone', c: '#d9d4c8' }]
function Silence() {
  const [anc, setAnc] = useState(60)
  const [env, setEnv] = useState(1)
  const [ci, setCi] = useState(0)
  const [done, setDone] = useState(false)
  const red = anc * 0.38
  const db = ENVS[env].db - red
  return (
    <>
      <Copy id="silence" font={F} size="md" pos="top" kicker="Adaptive noise cancelling" title={<><em>Hush.</em></>} sub="Twelve microphones listen 48,000 times a second. Raise the slider and watch the noise rings collapse." accent={A} right={<span />} />
      <div className="absolute inset-x-0 top-[34%] h-[24%] md:left-[40%] md:top-[12%] md:h-[60%]">
        <svg viewBox="-260 -260 520 520" className="h-full w-full" aria-hidden>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} r={60 + i * 32} fill="none" stroke={A} strokeWidth={1.5} strokeDasharray={`${4 + i * 2} ${6 + i}`} opacity={Math.max(0, (1 - anc / 100) * (0.25 + i * 0.1)) * (ENVS[env].db / 82)} className={anc < 75 ? 'a-jitter' : ''} style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
          <foreignObject x="-110" y="-110" width="220" height="220"><Headphones color={COLORS[ci].c} className="h-full w-full" /></foreignObject>
        </svg>
      </div>
      <div className="liquid-glass absolute inset-x-5 bottom-8 rounded-3xl p-5 md:inset-x-auto md:bottom-12 md:left-10 md:w-[calc(40%-2.5rem)] md:min-w-[380px]">
        <div className="flex flex-wrap gap-2">{ENVS.map((e, i) => <Pill key={e.n} active={env === i} accent={A} onClick={() => setEnv(i)} className="px-3 py-1.5 text-xs">{e.n}</Pill>)}</div>
        <div className="mt-2"><Range label="ANC strength" value={anc} min={0} max={100} onChange={setAnc} accent={A} readout={`${anc}%`} /></div>
        <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-white/60">
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{Math.round(db)}</div>dB at ear</div>
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">−{red.toFixed(0)}</div>dB reduction</div>
          <div className="rounded-xl bg-white/5 p-2.5"><div className="text-lg text-white">{Math.round(100 * Math.pow(2, -red / 10))}%</div>as loud</div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex gap-2">{COLORS.map((c, i) => <button key={c.n} aria-label={c.n} aria-pressed={ci === i} onClick={() => setCi(i)} className="h-6 w-6 rounded-full border-2" style={{ background: c.c, borderColor: ci === i ? '#fff' : 'transparent' }} />)}</div>
          <button onClick={() => setDone(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-black" style={{ background: A }}>{done ? `✓ ${COLORS[ci].n} reserved` : 'Reserve a pair'}</button>
        </div>
      </div>
    </>
  )
}

export default function Sonora() {
  const [sound, setSound] = useState(false)
  return (
    <>
      <Surface id="hero" gridColor="#ff4d8d" base={<div className="absolute inset-0 flex items-center justify-center pb-24"><Headphones className="a-float h-[46%] opacity-90" /></div>}>
        <Ripples sound={sound} />
        <p className="pointer-events-none absolute inset-x-0 top-[14%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Click or tap anywhere to send a wave</p>
        <Copy
          id="hero"
          h="h1"
          size="hero"
          font={F}
          kicker="Sonora Reference · Hi-fi headphones"
          title="Sonora"
          sub="Sound you can see — wherever you click. The spectrum exists only inside the rings."
          accent={A}
          right={<Pill active={sound} accent={A} onClick={() => setSound((s) => !s)}>{sound ? '♪ Sound on' : '♪ Sound off'}</Pill>}
        />
      </Surface>
      <Surface id="tuning" gridColor="#ff4d8d" className="min-h-[880px] md:min-h-[700px]"><Tuning /></Surface>
      <Surface id="silence" gridColor="#ff4d8d" className="min-h-[860px] md:min-h-[700px]"><Silence /></Surface>
    </>
  )
}
