import { useEffect, useMemo, useRef, useState } from 'react'
import { Surface } from '../lib/surface'
import { Copy, Pill } from '../lib/ui'
import { fmt, rng, useFrame, useTicker } from '../lib/engine'

const A = '#fde047'
const CHARS = 'ABCDEF0123456789#%&$@*+=<>/\\'


/* ---------- ledger canvas ---------- */
const PARTIES = ['NORTHWIND LTD', 'ACME LOGISTICS', 'HELIX BIO AG', 'MERIDIAN AIR', 'AURUM ATELIER', 'TERRA LOOM', 'FATHOM DEEP', 'VOLTARA MOTORS', 'HALCYON RES.', 'SONORA AUDIO']
function makeLines(n: number) {
  const r = rng(404)
  return Array.from({ length: n }).map(() => {
    const id = Math.floor(r() * 0xffffff).toString(16).toUpperCase().padStart(6, '0')
    const a = PARTIES[Math.floor(r() * PARTIES.length)]
    const b = PARTIES[Math.floor(r() * PARTIES.length)]
    const amt = (r() * 9e6 + 1e4).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const st = ['SETTLED', 'PENDING', 'CLEARED', 'HELD'][Math.floor(r() * 4)]
    return `TXN 0x${id}  2026-03-${String(1 + Math.floor(r() * 28)).padStart(2, '0')}  ${a.padEnd(15)} → ${b.padEnd(15)}  EUR ${amt.padStart(13)}  ${st.padEnd(8)}  KYC✓  `.repeat(3)
  })
}

function Ledger() {
  const cv = useRef<HTMLCanvasElement>(null)
  const lines = useMemo(() => makeLines(70), [])
  const st = useRef<{ bg: HTMLCanvasElement; dpr: number; w: number; h: number; cw: number; lh: number } | null>(null)

  useEffect(() => {
    const c = cv.current!
    const setup = () => {
      const b = c.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      c.width = b.width * dpr
      c.height = b.height * dpr
      const ctx = c.getContext('2d')!
      ctx.font = '13px "JetBrains Mono", monospace'
      const cw = ctx.measureText('M').width
      const lh = 19
      const bg = document.createElement('canvas')
      bg.width = c.width
      bg.height = c.height
      const g = bg.getContext('2d')!
      g.scale(dpr, dpr)
      g.fillStyle = 'rgba(255,255,255,.07)'
      const cols = Math.ceil(b.width / cw)
      const rows = Math.ceil(b.height / lh)
      for (let r = 0; r < rows; r++)
        for (let k = 0; k < cols; k++) if (lines[r % lines.length][k] !== ' ') g.fillRect(k * cw + 0.5, r * lh + 4, cw - 1.5, 11)
      st.current = { bg, dpr, w: b.width, h: b.height, cw, lh }
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(c)
    document.fonts?.ready.then(setup)
    return () => ro.disconnect()
  }, [lines])

  useFrame(({ x, y, r }) => {
    const s = st.current
    if (!s) return
    const ctx = cv.current!.getContext('2d')!
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, cv.current!.width, cv.current!.height)
    ctx.drawImage(s.bg, 0, 0)
    if (r < 4) return
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
    ctx.font = '13px "JetBrains Mono", monospace'
    ctx.textBaseline = 'alphabetic'
    const c0 = Math.max(0, Math.floor((x - r) / s.cw))
    const c1 = Math.ceil((x + r) / s.cw)
    const r0 = Math.max(0, Math.floor((y - r) / s.lh))
    const r1 = Math.ceil((y + r) / s.lh)
    for (let row = r0; row <= r1; row++) {
      for (let col = c0; col <= c1; col++) {
        const ch = lines[row % lines.length][col]
        if (!ch || ch === ' ') continue
        const cx = col * s.cw + s.cw / 2
        const cy = row * s.lh + s.lh / 2
        const d = Math.hypot(cx - x, cy - y) / r
        if (d > 1) continue
        ctx.fillStyle = '#000'
        ctx.fillRect(col * s.cw, row * s.lh + 3, s.cw, 13)
        if (d < 0.5) {
          ctx.fillStyle = /[0-9.,]/.test(ch) ? A : '#fff'
          ctx.fillText(ch, col * s.cw, row * s.lh + 14)
        } else {
          ctx.fillStyle = `rgba(253,224,71,${(1 - d) * 1.6})`
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], col * s.cw, row * s.lh + 14)
        }
      }
    }
  })

  return <canvas ref={cv} aria-hidden className="absolute inset-0 h-full w-full" />
}

/* ---------- stream ---------- */
type Tx = { id: number; from: string; to: string; amount: number; risk: 0 | 1 | 2; dec: boolean }
const RISK = [{ n: 'LOW', c: '#4ade80' }, { n: 'MED', c: '#fbbf24' }, { n: 'HIGH', c: '#f87171' }]
let txSeq = 1
const mkTx = (): Tx => ({
  id: txSeq++,
  from: PARTIES[Math.floor(Math.random() * PARTIES.length)],
  to: PARTIES[Math.floor(Math.random() * PARTIES.length)],
  amount: Math.round((Math.random() * 4e6 + 2e4) * 100) / 100,
  risk: (Math.random() > 0.85 ? 2 : Math.random() > 0.6 ? 1 : 0) as 0 | 1 | 2,
  dec: false,
})

function Amount({ v, dec }: { v: number; dec: boolean }) {
  const final = `€ ${fmt(v, 2)}`
  const [txt, setTxt] = useState(dec ? final : '€ ••••••••')
  useEffect(() => {
    if (!dec) {
      setTxt('€ ••••••••')
      return
    }
    let n = 0
    const id = setInterval(() => {
      n++
      setTxt(final.split('').map((ch, i) => (i < (n / 14) * final.length || ch === ' ' ? ch : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''))
      if (n >= 14) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [dec, final])
  return <span className={dec ? 'text-white' : 'text-white/40'} style={dec ? { color: A } : undefined}>{txt}</span>
}

function Stream() {
  const [rows, setRows] = useState<Tx[]>(() => Array.from({ length: 5 }).map(mkTx))
  const [paused, setPaused] = useState(false)
  useTicker(() => !paused && setRows((r) => [mkTx(), ...r].slice(0, 7)), 1700)
  return (
    <>
      <Copy id="stream" size="md" pos="top" kicker="End-to-end encrypted · live" title={<>Watch it <em>settle</em></>} sub="Every transfer arrives sealed. Decrypt a single row — or the whole stream — and only you see the amount." accent={A} right={<span />} />
      <div className="absolute inset-x-5 top-[40%] bottom-24 overflow-hidden md:inset-x-auto md:bottom-12 md:left-[40%] md:right-10 md:top-[14%]">
        <div className="space-y-2">
          {rows.map((t) => (
            <div key={t.id} className="a-rise liquid-glass flex items-center gap-3 rounded-2xl px-4 py-3 font-mono text-[11px] text-white/60">
              <span className="hidden text-white/30 sm:block">#{String(t.id).padStart(4, '0')}</span>
              <span className="min-w-0 flex-1 truncate">{t.from} <span style={{ color: A }}>→</span> {t.to}</span>
              <span className="text-xs md:text-sm"><Amount v={t.amount} dec={t.dec} /></span>
              <span className="rounded-full px-2 py-0.5 text-[9px]" style={{ color: RISK[t.risk].c, boxShadow: `inset 0 0 0 1px ${RISK[t.risk].c}55` }}>{RISK[t.risk].n}</span>
              <button aria-label={t.dec ? 'Encrypt' : 'Decrypt'} onClick={() => setRows((r) => r.map((x) => (x.id === t.id ? { ...x, dec: !x.dec } : x)))} className="pointer-events-auto rounded-full px-2.5 py-1 text-[10px] text-black" style={{ background: t.dec ? '#ffffff55' : A }}>{t.dec ? '🔓' : '🔒'}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-8 flex flex-wrap gap-2 md:inset-x-auto md:bottom-12 md:left-10">
        <Pill active accent={A} onClick={() => setRows((r) => r.map((x) => ({ ...x, dec: true })))}>Decrypt all</Pill>
        <Pill onClick={() => setRows((r) => r.map((x) => ({ ...x, dec: false })))}>Seal all</Pill>
        <Pill active={paused} accent={A} onClick={() => setPaused((p) => !p)}>{paused ? '▶ Resume' : '❚❚ Pause'}</Pill>
      </div>
    </>
  )
}

/* ---------- vault ---------- */
const CODE = '2027'
const HOLD = [{ n: 'Treasuries', v: 31, c: '#fde047' }, { n: 'Equities', v: 27, c: '#fb923c' }, { n: 'Cash', v: 22, c: '#67e8f9' }, { n: 'Gold', v: 12, c: '#fbbf24' }, { n: 'Digital', v: 8, c: '#c084fc' }]
function Vault() {
  const [entry, setEntry] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'open'>('idle')
  const press = (k: string) => {
    if (status !== 'idle') return
    if (k === 'C') return setEntry('')
    const e = (entry + k).slice(0, 4)
    setEntry(e)
    if (e.length === 4) {
      if (e === CODE) setTimeout(() => setStatus('open'), 200)
      else {
        setStatus('wrong')
        setTimeout(() => { setStatus('idle'); setEntry('') }, 600)
      }
    }
  }
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!document.getElementById('vault')?.matches(':hover, :focus-within')) return
      if (/^[0-9]$/.test(e.key)) press(e.key)
      if (e.key === 'Backspace') setEntry((v) => v.slice(0, -1))
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  let acc = 0
  const open = status === 'open'
  return (
    <>
      <Copy id="vault" size="md" pos="top" kicker="Hardware-key custody" title={<><em>Only</em> you.</>} sub={open ? 'Vault open. Positions decrypted locally — nothing left this device.' : 'Enter the four-digit code to open the vault. Hint: the year we ship.'} accent={A} right={<span />} />
      <div className="absolute inset-x-0 top-[38%] flex h-[26%] justify-center md:left-[34%] md:right-auto md:top-[14%] md:h-[60%] md:w-[30%]">
        <div className="relative aspect-square h-full">
          {/* holdings (hidden layer) */}
          <svg viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full" role="img" aria-label="Holdings allocation">
            {HOLD.map((h) => {
              const C = 2 * Math.PI * 70
              const len = (h.v / 100) * C
              const el = <circle key={h.n} r="70" fill="none" stroke={h.c} strokeWidth="22" strokeDasharray={`${len - 2} ${C - len + 2}`} strokeDashoffset={-acc} transform="rotate(-90)" />
              acc += len
              return el
            })}
            <text y="-2" textAnchor="middle" fill="#fff" fontFamily="Instrument Serif" fontSize="30">€48.2M</text>
            <text y="16" textAnchor="middle" fill={A} fontFamily="JetBrains Mono" fontSize="7" letterSpacing="2">NET POSITION</text>
          </svg>
          {/* door */}
          <div className={`absolute inset-0 ${status === 'wrong' ? 'a-shake' : ''}`} style={{ transform: open ? 'scale(1.4) rotate(140deg)' : 'none', opacity: open ? 0 : 1, transition: 'transform 1.1s cubic-bezier(.6,0,.2,1), opacity .7s ease .5s', pointerEvents: 'none' }}>
            <svg viewBox="-100 -100 200 200" className="h-full w-full" aria-hidden>
              <defs><radialGradient id="door" cx=".35" cy=".3"><stop offset="0" stopColor="#3f3f46" /><stop offset="1" stopColor="#0a0a0b" /></radialGradient></defs>
              <circle r="98" fill="#111" stroke={status === 'wrong' ? '#f87171' : A} strokeWidth="2" />
              <circle r="88" fill="url(#door)" />
              {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={Math.cos((i * Math.PI) / 6) * 76} cy={Math.sin((i * Math.PI) / 6) * 76} r="4" fill="#71717a" stroke="#000" />)}
              <circle r="40" fill="none" stroke="#fff" strokeOpacity=".2" />
              {[0, 1, 2].map((k) => <rect key={k} x="-4" y="-44" width="8" height="44" rx="4" fill={A} transform={`rotate(${k * 120})`} />)}
              <circle r="9" fill="#000" stroke={A} />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-6 md:inset-x-auto md:bottom-auto md:right-10 md:top-[18%] md:w-72">
        {open ? (
          <div className="a-rise liquid-glass rounded-3xl p-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: A }}>Allocation</p>
            {HOLD.map((h) => <div key={h.n} className="flex items-center justify-between py-1 font-mono text-xs text-white/70"><span><i className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: h.c }} />{h.n}</span><span className="text-white">{h.v}%</span></div>)}
            <Pill onClick={() => { setStatus('idle'); setEntry('') }} className="mt-3 w-full text-center text-xs">Lock vault</Pill>
          </div>
        ) : (
          <div className="liquid-glass rounded-3xl p-4">
            <div className="mb-3 flex justify-center gap-3" aria-label={`${entry.length} of 4 digits entered`}>
              {[0, 1, 2, 3].map((i) => <span key={i} className="h-3 w-3 rounded-full border" style={{ borderColor: status === 'wrong' ? '#f87171' : A, background: i < entry.length ? (status === 'wrong' ? '#f87171' : A) : 'transparent' }} />)}
            </div>
            <div className="grid grid-cols-6 gap-2 md:grid-cols-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                <button key={k} onClick={() => (k === '⌫' ? setEntry((v) => v.slice(0, -1)) : press(k))} className="rounded-xl bg-white/5 py-2.5 font-mono text-base text-white transition-colors hover:bg-white/15 md:py-3">{k}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function Cipher() {
  return (
    <>
      <Surface id="hero" gridColor="#fde047" radius={230} vignette={false}>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/70 to-transparent" />
        <Ledger />
        <p className="pointer-events-none absolute inset-x-0 top-[17%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">Move the cursor to decrypt</p>
        <Copy id="hero" h="h1" size="hero" kicker="Cipher Ledger · Private banking" title="Cipher" sub="Everything is encrypted. Until it is yours. The ledger behind this page is real — you only see what you point at." accent={A} stat={{ value: 'AES-256', label: 'Client-side keys only' }} />
      </Surface>
      <Surface id="stream" gridColor="#fde047" className="min-h-[820px] md:min-h-[680px]"><Stream /></Surface>
      <Surface id="vault" gridColor="#fde047" className="min-h-[820px] md:min-h-[680px]"><Vault /></Surface>
    </>
  )
}
