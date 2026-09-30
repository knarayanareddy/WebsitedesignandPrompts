import { useEffect, useState, type ReactNode } from 'react'
import { DOMAINS, buildPrompt, type Domain } from '../data/registry'
import { cn } from '../utils/cn'

export const go = (slug?: string) => {
  window.location.hash = slug ? `#/d/${slug}` : '#/'
}

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function PromptDrawer({ d, onClose }: { d: Domain; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const text = buildPrompt(d)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={`${d.name} prompt spec`}>
      <button aria-label="Close" className="a-fade absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="a-fade absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#0a0a0a] p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: d.accent }}>
              Prompt spec · {d.num}
            </p>
            <h3 className="mt-2 font-serif text-4xl text-white">{d.name}</h3>
          </div>
          <button onClick={onClose} className="liquid-glass rounded-full px-4 py-2 text-sm text-white/70 hover:text-white">
            Close
          </button>
        </div>
        <pre className="no-scrollbar mt-6 flex-1 overflow-auto whitespace-pre-wrap rounded-2xl bg-white/[0.03] p-4 font-mono text-[12px] leading-relaxed text-white/75">{text}</pre>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
          }}
          className="mt-4 rounded-full py-3 text-sm font-semibold text-black"
          style={{ background: d.accent }}
        >
          {copied ? 'Copied ✓' : 'Copy prompt'}
        </button>
      </aside>
    </div>
  )
}

export function DomainShell({ d, children }: { d: Domain; children: ReactNode }) {
  const [menu, setMenu] = useState(false)
  const [prompt, setPrompt] = useState(false)
  const [current, setCurrent] = useState(d.surfaces[0].id)
  const idx = DOMAINS.findIndex((x) => x.slug === d.slug)
  const next = DOMAINS[(idx + 1) % DOMAINS.length]

  useEffect(() => {
    document.documentElement.classList.add('snap-domain')
    return () => document.documentElement.classList.remove('snap-domain')
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { threshold: 0.55 },
    )
    d.surfaces.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [d])

  useEffect(() => {
    document.body.style.overflow = menu || prompt ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    const r = () => setMenu(false)
    window.addEventListener('keydown', k)
    window.addEventListener('resize', r)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', k)
      window.removeEventListener('resize', r)
    }
  }, [menu, prompt])

  const last = d.surfaces[d.surfaces.length - 1].id

  return (
    <div className={cn('a-fade', d.font)}>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-5 md:px-10 md:pt-6">
        <div className="flex items-center gap-3">
          <button onClick={() => go()} aria-label="Back to Atlas" className="liquid-glass flex h-10 items-center gap-2 rounded-full px-4 text-xs text-white/70 hover:text-white">
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">Atlas</span>
          </button>
          <button onClick={() => scrollToId(d.surfaces[0].id)} aria-label={`${d.name} — top`} className="flex items-center gap-2 text-white">
            <span className="block h-7 w-7" style={{ color: d.accent }}>
              {d.glyph}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 sm:inline">{d.name}</span>
          </button>
        </div>

        <nav className="liquid-glass hidden rounded-full px-2 py-1 md:flex" aria-label="Sections">
          {d.surfaces.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              aria-current={current === s.id}
              className={cn('rounded-full px-4 py-2 text-sm font-medium transition-colors', current === s.id ? 'text-white' : 'text-white/60 hover:text-white')}
              style={current === s.id ? { background: `${d.accent}22` } : undefined}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setPrompt(true)} className="liquid-glass hidden h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-widest text-white/70 hover:text-white sm:block">
            Prompt
          </button>
          <button onClick={() => scrollToId(last)} className="liquid-glass hidden h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: d.accent }} />
            {d.cta}
          </button>
          <button aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)} className="liquid-glass flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden">
            <span className={cn('h-px w-4 bg-white transition-transform', menu && 'translate-y-[3.5px] rotate-45')} />
            <span className={cn('h-px w-4 bg-white transition-transform', menu && '-translate-y-[3.5px] -rotate-45')} />
          </button>
        </div>
      </header>

      {menu && (
        <div className="a-fade fixed inset-0 z-[55] flex flex-col justify-center gap-2 bg-[#0a0a0a] px-8 md:hidden" role="dialog" aria-modal="true">
          {d.surfaces.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setMenu(false)
                setTimeout(() => scrollToId(s.id), 50)
              }}
              className="a-rise text-left font-serif text-5xl text-white"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {s.label}
            </button>
          ))}
          <div className="a-rise mt-8 flex gap-3" style={{ animationDelay: '360ms' }}>
            <button
              onClick={() => {
                setMenu(false)
                setPrompt(true)
              }}
              className="liquid-glass rounded-full px-5 py-3 text-sm text-white"
            >
              View prompt
            </button>
            <button onClick={() => { setMenu(false); setTimeout(() => scrollToId(last), 50) }} className="rounded-full px-6 py-3 text-sm font-semibold text-black" style={{ background: d.accent }}>
              {d.cta}
            </button>
          </div>
        </div>
      )}

      <main>{children}</main>

      <footer className="relative flex h-[34svh] min-h-[240px] snap-start flex-col items-center justify-center gap-5 overflow-hidden bg-black px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
          {d.num} / 10 · {d.domain}
        </p>
        <button onClick={() => go(next.slug)} className="group flex items-center gap-4 text-white">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">Next</span>
          <span className="font-serif text-5xl transition-transform group-hover:translate-x-2 md:text-7xl" style={{ color: next.accent }}>
            {next.name} →
          </span>
        </button>
        <button onClick={() => go()} className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 hover:text-white">
          Back to the Atlas
        </button>
      </footer>

      {prompt && <PromptDrawer d={d} onClose={() => setPrompt(false)} />}
    </div>
  )
}
