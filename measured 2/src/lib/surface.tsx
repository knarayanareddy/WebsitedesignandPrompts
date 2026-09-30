import { useRef, type CSSProperties, type ReactNode } from 'react'
import { SurfaceProvider, useInView, useSpotlight, type FrameFn } from './engine'
import { cn } from '../utils/cn'

type Props = {
  id: string
  /** Optional atmosphere under the content (Layer 1). */
  base?: ReactNode
  /** Optional hidden layer, revealed by the radial spotlight (Layer 3). */
  reveal?: ReactNode
  radius?: number
  /** % of the section height where the reveal zone begins. */
  insetTop?: number
  gridColor?: string
  className?: string
  children?: ReactNode
  /** Extra vignette strength. */
  vignette?: boolean
}

/**
 * The Measured layer stack, generalised:
 *  L0 parallax grid · L1 base atmosphere · L3 spotlight reveal · L2 content (above for legibility) · L4 bleeds
 * Pointer engine runs only while the surface is ≥25% visible.
 */
export function Surface({
  id,
  base,
  reveal,
  radius = 260,
  insetTop = 35,
  gridColor = '#64748b',
  className,
  children,
  vignette = true,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(new Set<FrameFn>())
  const active = useInView(ref)
  useSpotlight(ref, active, frame, radius, insetTop)
  const pid = `grid-${id}`

  return (
    <SurfaceProvider value={{ active, frame }}>
      <section
        ref={ref}
        id={id}
        tabIndex={0}
        aria-labelledby={`${id}-h`}
        data-active={active}
        className={cn(
          'relative h-svh min-h-[640px] w-full snap-start overflow-hidden bg-black outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/25',
          className,
        )}
        style={{ touchAction: 'pan-y' }}
      >
        {/* L0 — parallax grid */}
        <div
          aria-hidden
          className="absolute -inset-8 z-0 will-change-transform"
          style={{ transform: 'translate3d(var(--gx,0px),var(--gy,0px),0)' }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id={pid} width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke={gridColor} strokeOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${pid})`} />
          </svg>
        </div>

        {/* L1 — base atmosphere */}
        {base && (
          <div aria-hidden className="absolute inset-0 z-10">
            {base}
          </div>
        )}
        {vignette && <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-transparent to-black" />}

        {/* L3 — spotlight reveal */}
        {reveal && (
          <div
            aria-hidden
            className="zone-fade pointer-events-none absolute inset-0 z-30"
            style={{ '--zt': `${insetTop}%` } as CSSProperties}
          >
            <div className="spot-mask absolute inset-0">{reveal}</div>
          </div>
        )}

        {/* L4 — readability bleeds */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/80 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-36 bg-gradient-to-b from-transparent to-black" />

        {/* L2 — content (above bleeds so copy is never dimmed) */}
        <div className="absolute inset-0 z-[45]">{children}</div>
      </section>
    </SurfaceProvider>
  )
}
