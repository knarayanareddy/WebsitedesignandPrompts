import { useEffect, useRef, type CSSProperties } from 'react'

const FADE_SECONDS = 0.5
const RESET_DELAY_MS = 100
const VISIBLE_THRESHOLD = 0.35

type Props = {
  src: string
  poster?: string
  /** Hero clip loads immediately; the rest wait for scroll */
  eager?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Fullscreen background video with a seamless manual loop:
 *  - requestAnimationFrame continuously reads currentTime / duration
 *  - fades in over 0.5s at the start (opacity 0 -> 1)
 *  - fades out over 0.5s before the end (opacity 1 -> 0)
 *  - on "ended": opacity 0, wait 100ms, reset currentTime = 0, play() again
 *  - only plays while >= 35% visible (IntersectionObserver)
 *  - prefers-reduced-motion: never autoplays, shows the poster at full opacity
 */
export default function VideoLoop({ src, poster, eager = false, className = '', style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setOpacity = (o: number) => {
      wrap.style.opacity = String(o)
    }

    if (reduced) {
      setOpacity(1)
      video.pause()
      return
    }

    let raf = 0
    let resetTimer: number | undefined

    // Continuously monitor currentTime/duration and drive the fade envelope.
    const tick = () => {
      const duration = video.duration
      const t = video.currentTime
      if (Number.isFinite(duration) && duration > 0 && !video.paused) {
        let opacity = 1
        if (t < FADE_SECONDS) opacity = t / FADE_SECONDS
        else if (t > duration - FADE_SECONDS) opacity = Math.max(0, (duration - t) / FADE_SECONDS)
        setOpacity(opacity)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Seamless manual loop with smooth fade transitions.
    const onEnded = () => {
      setOpacity(0)
      resetTimer = window.setTimeout(() => {
        video.currentTime = 0
        void video.play().catch(() => undefined)
      }, RESET_DELAY_MS)
    }
    video.addEventListener('ended', onEnded)

    // Bounded scroll cost: only the visible chapter plays.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void video.play().catch(() => undefined)
          else video.pause()
        }
      },
      { threshold: VISIBLE_THRESHOLD },
    )
    observer.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resetTimer)
      video.removeEventListener('ended', onEnded)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`absolute z-0 will-change-[opacity] ${className}`}
      style={{ opacity: 0, ...style }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        playsInline
        preload={eager ? 'auto' : 'metadata'}
      />
    </div>
  )
}
