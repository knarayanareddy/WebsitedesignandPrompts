import { rng } from './engine'

/** ECG-style PQRST shape, p ∈ [0,1) → roughly [-0.25, 1]. */
export function ecg(p: number) {
  if (p < 0.1) return 0
  if (p < 0.18) return Math.sin(((p - 0.1) / 0.08) * Math.PI) * 0.15
  if (p < 0.3) return 0
  if (p < 0.33) return -((p - 0.3) / 0.03) * 0.12
  if (p < 0.37) return -0.12 + ((p - 0.33) / 0.04) * 1.12
  if (p < 0.41) return 1 - ((p - 0.37) / 0.04) * 1.25
  if (p < 0.44) return -0.25 + ((p - 0.41) / 0.03) * 0.25
  if (p < 0.56) return 0
  if (p < 0.72) return Math.sin(((p - 0.56) / 0.16) * Math.PI) * 0.28
  return 0
}

/** Seamlessly scrolling waveform (CSS-driven, pausable). */
export function Wave({
  w = 800,
  h = 120,
  cycles = 4,
  color = '#10b981',
  fn = ecg,
  speed = 6,
  sw = 2,
  className = '',
}: {
  w?: number
  h?: number
  cycles?: number
  color?: string
  fn?: (p: number) => number
  speed?: number
  sw?: number
  className?: string
}) {
  const per = 64
  const n = cycles * 2 * per
  let d = ''
  for (let i = 0; i <= n; i++) {
    const p = (i % per) / per
    const x = (i / n) * w * 2
    const y = h * 0.72 - fn(p) * h * 0.6
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)
  }
  return (
    <div className={`overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${w * 2} ${h}`} preserveAspectRatio="none" className="a-scroll block h-full" style={{ width: '200%', animationDuration: `${speed}s` }}>
        <path d={d} fill="none" stroke={color} strokeWidth={sw} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function Stars({ n = 90, seed = 7, w = 1000, h = 600, maxY = 1 }: { n?: number; seed?: number; w?: number; h?: number; maxY?: number }) {
  const r = rng(seed)
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const x = r() * w
        const y = r() * h * maxY
        const s = r() * 1.4 + 0.3
        return <circle key={i} cx={x} cy={y} r={s} fill="#fff" opacity={0.25 + r() * 0.7} className={i % 7 === 0 ? 'a-pulse' : ''} style={i % 7 === 0 ? { animationDelay: `${r() * 3}s` } : undefined} />
      })}
    </>
  )
}

/** Mechanical gear outline. */
export function gearPath(cx: number, cy: number, r: number, teeth: number, depth = 0.14) {
  const pts: string[] = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const ro = r
    const ri = r * (1 - depth)
    const p = [
      [ri, a],
      [ro, a + step * 0.12],
      [ro, a + step * 0.42],
      [ri, a + step * 0.54],
    ]
    p.forEach(([rad, ang]) => pts.push(`${(cx + Math.cos(ang) * rad).toFixed(1)},${(cy + Math.sin(ang) * rad).toFixed(1)}`))
  }
  return 'M' + pts.join('L') + 'Z'
}
