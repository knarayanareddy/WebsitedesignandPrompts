import { useState, type ReactNode } from 'react'
import { cn } from '../utils/cn'

export function Kicker({ children, accent, className }: { children: ReactNode; accent: string; className?: string }) {
  return (
    <p className={cn('font-mono text-[11px] uppercase tracking-[0.3em]', className)} style={{ color: accent }}>
      {children}
    </p>
  )
}

export function Stat({ value, label, accent }: { value: ReactNode; label: string; accent: string }) {
  return (
    <div className="liquid-glass rounded-2xl px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        <span className="font-mono text-2xl tracking-tight text-white md:text-3xl">{value}</span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/50">{label}</p>
    </div>
  )
}

const SIZES = {
  hero: 'text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem] leading-[0.82]',
  lg: 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9]',
  md: 'text-4xl sm:text-5xl md:text-7xl leading-[0.95]',
}

type CopyProps = {
  id: string
  kicker: string
  title: ReactNode
  sub: string
  accent: string
  stat?: { value: ReactNode; label: string }
  size?: keyof typeof SIZES
  pos?: 'top' | 'bottom'
  h?: 'h1' | 'h2'
  font?: string
  right?: ReactNode
  className?: string
}

/** Editorial copy block: kicker · serif heading · paragraph · stat badge. */
export function Copy({ id, kicker, title, sub, accent, stat, size = 'lg', pos = 'bottom', h = 'h2', font = 'font-serif', right, className }: CopyProps) {
  const H = h
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 flex flex-col gap-5 px-6 md:flex-row md:items-end md:justify-between md:px-10',
        pos === 'bottom' ? 'bottom-0 pb-14 md:pb-12' : 'top-0 pt-24 md:pt-28',
        className,
      )}
    >
      <div className="min-w-0">
        <Kicker accent={accent} className="mb-3">
          {kicker}
        </Kicker>
        <H id={`${id}-h`} className={cn('tracking-tight text-white', font, SIZES[size])}>
          {title}
        </H>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">{sub}</p>
      </div>
      {right ?? (stat && <Stat value={stat.value} label={stat.label} accent={accent} />)}
    </div>
  )
}

export function Pill({
  children,
  onClick,
  active,
  accent,
  className,
  pressed,
  ...rest
}: {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  accent?: string
  className?: string
  pressed?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed ?? active}
      className={cn(
        'liquid-glass pointer-events-auto rounded-full px-4 py-2 text-sm font-medium transition-colors',
        active ? 'text-white' : 'text-white/60 hover:text-white',
        className,
      )}
      style={active && accent ? { boxShadow: `inset 0 0 0 1px ${accent}, 0 0 24px ${accent}33` } : undefined}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  accent,
  readout,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  accent: string
  readout?: ReactNode
}) {
  return (
    <label className="pointer-events-auto block">
      <span className="mb-1 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
        <span>{label}</span>
        <span className="text-xs tracking-normal text-white">{readout ?? value}</span>
      </span>
      <input
        type="range"
        className="rng"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(+e.target.value)}
        style={{ ['--thumb' as string]: accent }}
      />
    </label>
  )
}

/** Email-style call to action with a confirmation state. */
export function CtaPanel({
  accent,
  placeholder,
  button,
  done,
  summary,
}: {
  accent: string
  placeholder: string
  button: string
  done: string
  summary?: ReactNode
}) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <form
      className="pointer-events-auto liquid-glass w-full max-w-md rounded-3xl p-5"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      {summary && <div className="mb-4 text-sm text-white/70">{summary}</div>}
      {sent ? (
        <p className="a-rise font-mono text-sm" style={{ color: accent }}>
          ✓ {done}
        </p>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-w-0 flex-1 rounded-full bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:bg-white/10"
          />
          <button type="submit" className="rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]" style={{ background: accent }}>
            {button}
          </button>
        </div>
      )}
    </form>
  )
}
