import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { DOMAINS, type Domain } from './data/registry'
import { Surface } from './lib/surface'
import { Copy, Kicker } from './lib/ui'
import { useInView } from './lib/engine'

const EM = '#10b981'
const REPO = 'https://github.com/knarayanareddy/WebsitedesignandPrompts'
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ------------------------------------------------------------------ nav */
function Nav() {
  const links = [['Review', 'review'], ['Gallery', 'gallery'], ['Matrix', 'matrix'], ['Method', 'method']]
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-5 md:px-10 md:pt-6">
        <button onClick={() => go('top')} className="flex items-center gap-2 text-white" aria-label="Measured Atlas — top">
          <svg viewBox="0 0 256 256" width="28" height="28" fill="#fff" aria-hidden><path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" /></svg>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 sm:inline">Atlas</span>
        </button>
        <nav className="liquid-glass hidden rounded-full px-2 py-1 md:flex" aria-label="Sections">
          {links.map(([l, id]) => <button key={id} onClick={() => go(id)} className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white">{l}</button>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={REPO} target="_blank" rel="noreferrer" className="liquid-glass hidden h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white md:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Source repo</a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="liquid-glass flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden">
            <span className={`h-px w-4 bg-white transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-4 bg-white transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
      {open && (
        <div className="a-fade fixed inset-0 z-[45] flex flex-col justify-center gap-2 bg-[#0a0a0a] px-8 md:hidden" role="dialog" aria-modal="true">
          {links.map(([l, id], i) => <button key={id} onClick={() => { setOpen(false); setTimeout(() => go(id), 50) }} className="a-rise text-left font-serif text-5xl text-white" style={{ animationDelay: `${i * 70}ms` }}>{l}</button>)}
        </div>
      )}
    </>
  )
}

/* ----------------------------------------------------------------- hero */
function HeroReveal() {
  return (
    <div className="absolute inset-0 bg-[#020403]">
      <div className="absolute inset-x-5 bottom-[30%] top-[20%] grid grid-cols-2 content-center gap-2 md:inset-x-14 md:grid-cols-5 md:gap-4">
        {DOMAINS.map((d) => (
          <div key={d.slug} className="flex flex-col justify-between rounded-2xl p-3 md:p-4" style={{ background: `${d.accent}14`, boxShadow: `inset 0 0 0 1px ${d.accent}66`, color: d.accent }}>
            <span className="block h-6 w-6 md:h-9 md:w-9">{d.glyph}</span>
            <div className="mt-2 md:mt-6">
              <div className="font-serif text-lg leading-none text-white md:text-2xl">{d.name}</div>
              <div className="mt-1 hidden font-mono text-[9px] uppercase leading-tight tracking-wider md:block">{d.mechanic}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- review */
const LAYERS = [
  { id: 'L0', z: 'z-0', name: 'Parallax grid', c: '#64748b', what: 'Repeating 48px SVG grid, stroke #64748b @ 10% opacity.', how: 'Offset = −(cursor ÷ size − 0.5) × 24 px → ±12 px travel, LERP 0.06, written as CSS vars (no React render).', verdict: 'Keep verbatim. Zero-cost depth that makes every surface feel spatial.' },
  { id: 'L1', z: 'z-10', name: 'Base atmosphere', c: '#0ea5e9', what: 'High-res still + dark vignette gradients (from-black/80 via-transparent to-black).', how: 'Drifts ±22 px with scroll position at LERP 0.06.', verdict: 'Keep the role, replace the asset: hot-linked imagery is the weakest dependency.' },
  { id: 'L2', z: 'z-20', name: 'Editorial content', c: '#10b981', what: 'Mono emerald kicker · Instrument Serif heading · Inter paragraph · liquid-glass stat badge (250 ms live tick).', how: 'One h1 (hero), h2 elsewhere; each section aria-labelledby its heading.', verdict: 'Keep. In the Atlas it sits above the bleeds so copy is never dimmed.' },
  { id: 'L3', z: 'z-30', name: 'Spotlight reveal', c: '#f59e0b', what: 'The hidden layer — video / telemetry / schematic — in the lower 60–80% of each surface.', how: 'radial-gradient mask on CSS vars --mx/--my/--r, LERP 0.10, r 0↔260 px, feather 42 / 66 / 100 %; touch idles on an 11 s figure-8.', verdict: 'The signature. Generalised here into ten different reveal mechanics.' },
  { id: 'L4', z: 'z-40', name: 'Readability bleeds', c: '#a78bfa', what: 'Top h-28 black/80→transparent, bottom h-36 transparent→black.', how: 'Pure gradients; guarantee seamless continuity between pinned surfaces.', verdict: 'Keep verbatim.' },
]

function StackExplorer() {
  const [i, setI] = useState(3)
  const L = LAYERS[i]
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative h-[340px] overflow-hidden rounded-3xl bg-[#050505] ring-1 ring-white/10" style={{ perspective: 900 }}>
        <div className="absolute left-1/2 top-[54%] h-[180px] w-[260px] -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(-32deg)' }}>
          {LAYERS.map((l, k) => (
            <button key={l.id} onClick={() => setI(k)} aria-label={`Layer ${l.id}: ${l.name}`} className="absolute inset-0 rounded-xl border text-left transition-all duration-500" style={{ transform: `translateZ(${k * 34 + (k === i ? 16 : 0)}px)`, borderColor: k === i ? l.c : `${l.c}55`, background: k === i ? `${l.c}33` : `${l.c}10`, boxShadow: k === i ? `0 0 40px ${l.c}66` : 'none' }}>
              <span className="absolute left-3 top-2 font-mono text-[11px]" style={{ color: l.c }}>{l.id}</span>
            </button>
          ))}
        </div>
        <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Click a slab</span>
      </div>
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {LAYERS.map((l, k) => <button key={l.id} onClick={() => setI(k)} className="rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors" style={{ color: k === i ? '#000' : l.c, background: k === i ? l.c : 'transparent', boxShadow: `inset 0 0 0 1px ${l.c}88` }}>{l.id}</button>)}
        </div>
        <h4 className="font-serif text-4xl text-white">{L.name}</h4>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{L.what}</p>
        <p className="mt-3 font-mono text-xs leading-relaxed text-white/50">{L.how}</p>
        <p className="mt-4 rounded-2xl p-4 text-sm text-white" style={{ background: `${L.c}18`, boxShadow: `inset 0 0 0 1px ${L.c}55` }}><b style={{ color: L.c }}>Verdict · </b>{L.verdict}</p>
      </div>
    </div>
  )
}

function LerpDemo() {
  const box = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLSpanElement>(null)
  const aim = useRef<HTMLSpanElement>(null)
  const [k, setK] = useState(0.1)
  const kr = useRef(k)
  kr.current = k
  const active = useInView(box, 0.2)
  const tgt = useRef({ x: 200, y: 80 })
  const pos = useRef({ x: 200, y: 80 })
  useEffect(() => {
    if (!active) return
    let raf = 0
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * kr.current
      pos.current.y += (tgt.current.y - pos.current.y) * kr.current
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x - 28}px,${pos.current.y - 28}px)`
      if (aim.current) aim.current.style.transform = `translate(${tgt.current.x - 5}px,${tgt.current.y - 5}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active])
  return (
    <div className="rounded-3xl bg-[#050505] p-4 ring-1 ring-white/10">
      <div ref={box} className="relative h-44 cursor-crosshair overflow-hidden rounded-2xl bg-black" style={{ touchAction: 'pan-y', backgroundImage: 'linear-gradient(rgba(100,116,139,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,.12) 1px,transparent 1px)', backgroundSize: '24px 24px' }} onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); tgt.current = { x: e.clientX - b.left, y: e.clientY - b.top } }}>
        <span ref={dot} className="absolute left-0 top-0 h-14 w-14 rounded-full" style={{ background: 'radial-gradient(circle,#10b981aa,transparent 70%)', boxShadow: '0 0 0 1px #10b98188' }} />
        <span ref={aim} className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-white" />
        <span className="absolute bottom-2 left-3 font-mono text-[10px] text-white/30">move here — the glow chases the dot</span>
      </div>
      <label className="mt-3 block"><span className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50"><span>LERP factor</span><span className="text-white">{k.toFixed(2)}{Math.abs(k - 0.1) < 0.005 ? ' · Measured spotlight' : Math.abs(k - 0.06) < 0.005 ? ' · Measured grid' : ''}</span></span>
        <input type="range" className="rng" min={0.02} max={0.4} step={0.01} value={k} onChange={(e) => setK(+e.target.value)} aria-label="LERP factor" style={{ ['--thumb' as string]: EM }} /></label>
    </div>
  )
}

const STRENGTHS = [
  ['Single config object', 'All copy, assets and stats live in one SURFACES array — a rebrand is a data edit, not a refactor.'],
  ['Cheap pointer engine', 'rAF + three CSS custom properties. No React re-render per frame; masks stay compositor-friendly.'],
  ['Lifecycle suspension', 'IntersectionObserver (≥25%) cancels rAF, pauses video, freezes CSS animation (--play) and stops counters off-screen.'],
  ['Real accessibility basics', 'One h1, aria-labelledby sections, aria-hidden art, reduced-motion path, drawer scroll-lock with Esc.'],
  ['Path-agnostic build', 'base "./" + relative assets + local fallbacks for hot-linked hero media — deployable to any sub-path.'],
  ['Documented decisions', 'ADAPTED_PROMPT + BUILD_LOG record the why (svh, ×12→±12px parallax, zone-fade), making the design reproducible.'],
]
const FINDINGS = [
  ['Med', 'Hot-linked hero media', 'higgs.ai and CloudFront assets can vanish; the README itself says media is not MIT-licensed.', 'Zero hot-linked media — every visual is procedural SVG / CSS / canvas.'],
  ['Med', 'Hidden layer is pointer-only', 'Keyboard and screen-reader users cannot reach what the spotlight reveals.', 'Arrow keys steer the spotlight; the hidden layer’s meaning is repeated in visible text and stats.'],
  ['Med', 'Snap + smooth scroll can trap', 'Mandatory scroll-snap on tall or short viewports fights the user, especially on mobile.', 'Proximity snapping, svh + min-height guards, disabled under reduced motion.'],
  ['Low', 'Desktop discoverability', 'Touch gets a figure-8 idle drift; desktop sees nothing until the first hover.', 'Idle drift runs on desktop until the first real input, then hands over.'],
  ['Low', 'Documentation drift', 'BUILD_LOG says “100vh sections” while ADAPTED_PROMPT adopts 100svh.', 'Single source of truth: registry data generates each prompt spec.'],
  ['Low', 'One reveal mechanic', 'Only the radial mask is used as the hidden-layer gesture, limiting reuse.', 'Ten distinct mechanics — sweep, lens, scan-line, probe, ripples, beam…'],
]

function Review() {
  return (
    <section id="review" className="relative bg-black px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Kicker accent={EM}>01 · End-to-end review</Kicker>
        <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-8xl">Reading <em>Measured</em>, layer by layer</h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">Measured is a five-surface luxury-wearable page where a cursor spotlight uncovers a dynamic layer hidden under every screen. This review is based on the repository’s published <span className="font-mono text-white/90">ADAPTED_PROMPT.md</span>, <span className="font-mono text-white/90">BUILD_LOG.md</span> and README for <span className="font-mono text-white/90">measured/</span> — I read the specification and architecture notes rather than executing the source.</p>

        <div className="mt-16"><StackExplorer /></div>

        <div className="mt-24 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <Kicker accent={EM}>The engine, in numbers</Kicker>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[['0.10', 'spotlight LERP'], ['260px', 'reveal radius'], ['0.06', 'grid parallax LERP'], ['±12px', 'grid travel'], ['2.6s', 'idle before drift'], ['11s', 'figure-8 period'], ['25%', 'IO threshold'], ['5', 'surfaces']].map(([v, l]) => (
                <div key={l} className="liquid-glass rounded-2xl p-4"><div className="font-mono text-2xl text-white">{v}</div><div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <Kicker accent={EM}>Feel the smoothing</Kicker>
            <div className="mt-5"><LerpDemo /></div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-4xl text-white">What it gets right</h3>
            <ul className="mt-6 space-y-3">
              {STRENGTHS.map(([t, d]) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white/[0.03] p-4"><span className="mt-0.5 text-emerald-400">✓</span><div><div className="text-sm font-semibold text-white">{t}</div><div className="mt-1 text-sm leading-relaxed text-white/60">{d}</div></div></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-4xl text-white">Findings &amp; how the Atlas responds</h3>
            <ul className="mt-6 space-y-3">
              {FINDINGS.map(([sev, t, d, fix]) => (
                <li key={t} className="rounded-2xl bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase" style={{ color: sev === 'Med' ? '#fbbf24' : '#94a3b8', boxShadow: `inset 0 0 0 1px ${sev === 'Med' ? '#fbbf2466' : '#94a3b855'}` }}>{sev}</span><span className="text-sm font-semibold text-white">{t}</span></div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{d}</p>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-300/90"><span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Atlas → </span>{fix}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <Kicker accent={EM}>DNA carried into all ten builds</Kicker>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Pure-black luxury palette', 'Liquid-glass controls', 'L0–L4 layer stack', 'Hidden-until-touched layer', 'Serif + mono editorial type', 'Off-screen suspension', 'Single h1 outline', 'Reduced-motion path'].map((t) => <span key={t} className="liquid-glass rounded-full px-4 py-2 text-sm text-white/80">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- gallery */
function Card({ d }: { d: Domain }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    const el = ref.current!
    const b = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - b.left}px`)
    el.style.setProperty('--my', `${e.clientY - b.top}px`)
    el.style.setProperty('--r', '190px')
  }
  return (
    <a
      ref={ref}
      href={`#/d/${d.slug}`}
      onPointerMove={move}
      onPointerLeave={() => ref.current?.style.setProperty('--r', '0px')}
      className="group card relative block h-[360px] overflow-hidden rounded-3xl bg-[#050505] ring-1 ring-white/10 transition-shadow hover:ring-white/30"
      style={{ '--mx': '50%', '--my': '75%', '--r': '0px', transition: '--r .35s ease' } as CSSProperties}
    >
      {/* base */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="block h-11 w-11" style={{ color: d.accent }}>{d.glyph}</span>
          <span className="font-mono text-[11px] text-white/40">{d.num}{d.reference ? ' · reference' : ''}</span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: d.accent }}>{d.domain}</p>
          <h3 className="mt-2 font-serif text-4xl leading-none text-white">{d.name}</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">{d.tagline}</p>
        </div>
      </div>
      {/* hidden layer (masked by pointer) */}
      <div aria-hidden className="card-reveal spot-mask pointer-events-none absolute inset-0">
        <div className="absolute inset-0 flex flex-col justify-between p-6" style={{ background: `radial-gradient(circle at 80% 0%, ${d.accent}55, #050505 70%)` }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Hidden layer</div>
          <div>
            <p className="font-serif text-2xl leading-tight text-white">{d.hidden}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: d.accent }}>Gesture · {d.mechanic}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{d.elements.map((e) => <span key={e} className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/80">{e}</span>)}</div>
          </div>
        </div>
      </div>
      <span className="absolute bottom-5 right-6 font-mono text-xs text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white">Open →</span>
    </a>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="relative bg-black px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Kicker accent={EM}>02 · The ten worlds</Kicker>
        <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-8xl">Same DNA. <em>Ten</em> different secrets.</h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">Hover a card to try its own spotlight, then open it. Each site has a different product, reveal mechanic, hidden layer and set of native interactions — and its own copy-paste prompt spec.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => <Card key={d.slug} d={d} />)}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- matrix */
function Matrix() {
  return (
    <section id="matrix" className="relative bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Kicker accent={EM}>03 · What changed, per domain</Kicker>
        <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">Adaptation <em>matrix</em></h2>
        <div className="no-scrollbar mt-12 overflow-x-auto rounded-3xl ring-1 ring-white/10">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead><tr className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{['#', 'Product', 'Domain', 'Reveal mechanic', 'Hidden layer', 'Signature interaction', 'Surfaces'].map((h) => <th key={h} className="px-5 py-4 font-normal">{h}</th>)}</tr></thead>
            <tbody>
              {DOMAINS.map((d) => (
                <tr key={d.slug} onClick={() => (window.location.hash = `#/d/${d.slug}`)} className="cursor-pointer border-t border-white/10 align-top transition-colors hover:bg-white/[0.04]">
                  <td className="px-5 py-4 font-mono text-white/40">{d.num}</td>
                  <td className="px-5 py-4"><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: d.accent }} /><a href={`#/d/${d.slug}`} className="font-serif text-xl text-white">{d.name}</a></td>
                  <td className="px-5 py-4 text-white/70">{d.domain}</td>
                  <td className="px-5 py-4 text-white/90">{d.mechanic}</td>
                  <td className="px-5 py-4 text-white/60">{d.hidden}</td>
                  <td className="px-5 py-4 text-white/60">{d.signature}</td>
                  <td className="px-5 py-4 font-mono text-xs text-white/50">{d.surfaces.map((s) => s.label).join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- method */
const STEPS = [
  ['Find the hidden truth', 'What does this product hide that its buyer would love to see? A movement, a chassis, a ledger, a seabed.'],
  ['Choose the discovering gesture', 'Match the physics of the domain: a sweep for radar, a probe for soil, a lens for cells, a beam for the deep.'],
  ['Keep the stack', 'L0 grid · L1 atmosphere · L3 reveal · L2 copy · L4 bleeds. The layering is what makes it feel like Measured.'],
  ['Say it in text too', 'The hidden layer is a bonus, never the only place a fact lives. Mirror it in visible copy and stats.'],
  ['Sleep when unseen', 'Gate every loop with an IntersectionObserver; pause CSS animation and audio when the surface leaves the viewport.'],
]
function Method() {
  return (
    <section id="method" className="relative bg-black px-6 pb-24 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <Kicker accent={EM}>04 · Recipe</Kicker>
        <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">Five moves to <em>adapt</em> it</h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="liquid-glass rounded-3xl p-5">
              <div className="font-mono text-xs text-emerald-400">0{i + 1}</div>
              <div className="mt-6 font-serif text-2xl leading-tight text-white">{t}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <p className="max-w-lg text-sm leading-relaxed text-white/50">Every site in this Atlas ships its own prompt spec — open any one and press <span className="font-mono text-white/80">Prompt</span> in the top bar. Original templates, media licences and build logs: <a className="underline underline-offset-4 hover:text-white" href={REPO} target="_blank" rel="noreferrer">knarayanareddy/WebsitedesignandPrompts</a>.</p>
          <a href={`#/d/${DOMAINS[0].slug}`} className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">Start with Measured →</a>
        </div>
      </div>
    </section>
  )
}

export default function Atlas() {
  return (
    <div className="a-fade">
      <Nav />
      <main>
        <Surface id="top" insetTop={22} reveal={<HeroReveal />}>
          <p className="pointer-events-none absolute inset-x-0 top-[15%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Move to reveal the ten worlds</p>
          <Copy
            id="top"
            h="h1"
            size="lg"
            kicker="Atlas of hidden-layer interfaces"
            title={<>Measured, <em>×10</em></>}
            sub="An end-to-end review of the Measured build — and ten new products across ten domains that keep its DNA while changing every mechanic."
            accent={EM}
            stat={{ value: `10 · ${DOMAINS.reduce((n, d) => n + d.surfaces.length, 0)}`, label: 'Worlds · interactive surfaces' }}
          />
        </Surface>
        <Review />
        <Gallery />
        <Matrix />
        <Method />
      </main>
    </div>
  )
}
