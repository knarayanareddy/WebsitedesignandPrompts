import { createContext, useContext, useEffect, useRef, useState, type MutableRefObject, type RefObject } from 'react'

/** One frame of the pointer engine, in section-local pixels. */
export type FrameArg = { x: number; y: number; r: number; w: number; h: number; el: HTMLElement; present: boolean }
export type FrameFn = (a: FrameArg) => void

type SurfaceContext = { active: boolean; frame: MutableRefObject<Set<FrameFn>> }

const Ctx = createContext<SurfaceContext>({ active: false, frame: { current: new Set() } })
export const SurfaceProvider = Ctx.Provider
export const useSurface = () => useContext(Ctx)

/** Subscribe to the smoothed pointer loop of the surrounding <Surface>. */
export function useFrame(fn: FrameFn) {
  const { frame } = useSurface()
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    const f: FrameFn = (a) => ref.current(a)
    frame.current.add(f)
    return () => {
      frame.current.delete(f)
    }
  }, [frame])
}

/** IntersectionObserver gate — only the visible surface runs loops. */
export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, threshold = 0.25) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && e.intersectionRatio >= threshold),
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return active
}

/**
 * Spotlight engine (Measured, generalised).
 * - pointer/touch → section-local target, LERP 0.10
 * - radius grows/shrinks (0 ↔ radius)
 * - grid parallax ±12px, LERP 0.06
 * - idle figure-8 drift on touch devices (or until first real input) after 2.6s
 * - arrow keys steer the spotlight when the surface has focus
 * Writes --mx --my --r --gx --gy on the section.
 */
export function useSpotlight(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  frame: MutableRefObject<Set<FrameFn>>,
  radius: number,
  zoneTop: number,
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !active) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    let sx = 0, sy = 0, tx = 0, ty = 0, sr = 0, gx = 0, gy = 0
    let raf = 0
    let inited = false
    let seen = false
    let presence = false
    let lastInput = -1e9

    const local = (cx: number, cy: number) => {
      const b = el.getBoundingClientRect()
      tx = cx - b.left
      ty = cy - b.top
      if (!inited) {
        sx = tx
        sy = ty
        inited = true
      }
      seen = true
      presence = true
      lastInput = performance.now()
    }
    const onMove = (e: PointerEvent) => local(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) local(t.clientX, t.clientY)
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') presence = false
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.target !== el) return
      const d: Record<string, [number, number]> = { ArrowLeft: [-48, 0], ArrowRight: [48, 0], ArrowUp: [0, -48], ArrowDown: [0, 48] }
      const v = d[e.key]
      if (!v) return
      e.preventDefault()
      const b = el.getBoundingClientRect()
      if (!inited) {
        tx = sx = b.width / 2
        ty = sy = b.height * 0.6
        inited = true
      }
      tx += v[0]
      ty += v[1]
      seen = true
      presence = true
      lastInput = performance.now()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('touchstart', onTouch, { passive: true })
    el.addEventListener('touchmove', onTouch, { passive: true })
    el.addEventListener('keydown', onKey)

    const zt = zoneTop / 100
    const loop = (now: number) => {
      const b = el.getBoundingClientRect()
      const w = b.width
      const h = b.height
      if (!inited) {
        tx = sx = w * 0.5
        ty = sy = h * 0.6
        inited = true
      }
      if (!reduce && (coarse || !seen) && now - lastInput > 2600) {
        const p = (now / 11000) * Math.PI * 2
        tx = w * 0.5 + Math.sin(p) * w * 0.3
        ty = h * (zt + (1 - zt) * 0.52) + Math.sin(2 * p) * h * (1 - zt) * 0.2
        presence = true
      }
      sx += (tx - sx) * 0.1
      sy += (ty - sy) * 0.1
      sr += ((presence ? radius : 0) - sr) * (presence ? 0.14 : 0.1)
      gx += (-(sx / w - 0.5) * 24 - gx) * 0.06
      gy += (-(sy / h - 0.5) * 24 - gy) * 0.06
      const s = el.style
      s.setProperty('--mx', sx.toFixed(1) + 'px')
      s.setProperty('--my', sy.toFixed(1) + 'px')
      s.setProperty('--r', sr.toFixed(1) + 'px')
      s.setProperty('--gx', gx.toFixed(2) + 'px')
      s.setProperty('--gy', gy.toFixed(2) + 'px')
      if (frame.current.size) {
        const a: FrameArg = { x: sx, y: sy, r: sr, w, h, el, present: presence }
        frame.current.forEach((f) => f(a))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('touchmove', onTouch)
      el.removeEventListener('keydown', onKey)
    }
  }, [ref, active, frame, radius, zoneTop])
}

/** Interval that only runs while the surface is active. */
export function useTicker(fn: () => void, ms: number) {
  const { active } = useSurface()
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => ref.current(), ms)
    return () => clearInterval(id)
  }, [active, ms])
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const fmt = (n: number, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
export function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
