import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export interface SurfaceEngineOptions {
  sectionRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  baseRef: RefObject<HTMLDivElement | null>;
  maskRef: RefObject<HTMLDivElement | null>;
  /** % down from the top of the section where the spotlight zone begins */
  insetTop: number;
  active: boolean;
  radius?: number;
}

/**
 * Per-surface animation engine.
 *
 * - Tracks pointer + touch, LERP (0.1) the spotlight position inside a
 *   requestAnimationFrame loop, and writes the radial mask as CSS custom
 *   properties (hardware-accelerated mask, no canvas).
 * - Parallax-offsets the grid ((cursor - center) scaled, LERP 0.06) and the
 *   base image (scroll-driven drift).
 * - On touch devices with no recent touch, the spotlight drifts in a slow
 *   figure-8 breathing loop; any touchstart/touchmove snaps it to the finger.
 * - The loop only runs while the surface is IntersectionObserver-active.
 */
export function useSurfaceEngine({
  sectionRef,
  gridRef,
  baseRef,
  maskRef,
  insetTop,
  active,
  radius = 260,
}: SurfaceEngineOptions) {
  const control = useRef<(v: boolean) => void>(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    const p = {
      x: section.clientWidth / 2,
      y: section.clientHeight * 0.6,
      last: -1e9,
      present: false,
    };
    const cur = { x: p.x, y: p.y, r: 0, gx: 0, gy: 0, by: 0 };
    let running = false;
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      p.x = e.clientX - rect.left;
      p.y = e.clientY - rect.top;
      p.last = performance.now();
      p.present = true;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = section.getBoundingClientRect();
      p.x = t.clientX - rect.left;
      p.y = t.clientY - rect.top;
      p.last = performance.now();
      p.present = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') p.present = false;
    };

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);

      const rect = section.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const now = performance.now();
      const zoneTop = h * (insetTop / 100);

      // --- spotlight target
      let tx = p.x;
      let ty = p.y;
      let want = 0;
      if (p.present && now - p.last < 2600) {
        tx = p.x;
        ty = p.y;
        want = 1;
      } else if (isTouch && !reduceMotion) {
        // idle figure-8 breathing loop
        const ph = (now / 11000) * Math.PI * 2;
        tx = w * 0.5 + Math.sin(ph) * w * 0.3;
        ty =
          zoneTop +
          (h - zoneTop) * 0.52 +
          Math.sin(ph * 2) * (h - zoneTop) * 0.2;
        want = 1;
      }
      cur.x += (tx - cur.x) * 0.1;
      cur.y += (ty - cur.y) * 0.1;
      cur.r += ((want ? radius : 0) - cur.r) * (want ? 0.14 : 0.1);

      // --- grid parallax: (cursor - center), max ±12px, lerp 0.06
      let tgx = 0;
      let tgy = 0;
      if (!reduceMotion && p.present && now - p.last < 4000) {
        tgx = -(p.x / w - 0.5) * 24;
        tgy = -(p.y / h - 0.5) * 24;
      }
      cur.gx += (tgx - cur.gx) * 0.06;
      cur.gy += (tgy - cur.gy) * 0.06;

      // --- base image scroll drift
      let tby = 0;
      if (!reduceMotion) {
        const progress = Math.min(1, Math.max(0, (-rect.top + h) / (2 * h)));
        tby = (0.5 - progress) * 44;
      }
      cur.by += (tby - cur.by) * 0.06;

      // --- style writes (one read per frame, writes after)
      const grid = gridRef.current;
      const base = baseRef.current;
      const mask = maskRef.current;
      if (grid) {
        grid.style.transform = `translate3d(${cur.gx.toFixed(2)}px, ${cur.gy.toFixed(2)}px, 0)`;
      }
      if (base) {
        base.style.transform = `translate3d(0px, ${cur.by.toFixed(2)}px, 0) scale(1.07)`;
      }
      if (mask) {
        mask.style.setProperty('--mx', `${cur.x.toFixed(1)}px`);
        mask.style.setProperty('--my', `${(cur.y - zoneTop).toFixed(1)}px`);
        mask.style.setProperty('--r', `${cur.r.toFixed(1)}px`);
      }
    };

    control.current = (v: boolean) => {
      if (v) {
        if (p.present) {
          cur.x = p.x;
          cur.y = p.y;
        }
        if (!running) {
          running = true;
          raf = requestAnimationFrame(tick);
        }
      } else if (running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onLeave, { passive: true });
    section.addEventListener('touchstart', onTouch, { passive: true });
    section.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onLeave);
      section.removeEventListener('touchstart', onTouch);
      section.removeEventListener('touchmove', onTouch);
      control.current(false);
    };
  }, [sectionRef, gridRef, baseRef, maskRef, insetTop, radius]);

  useEffect(() => {
    control.current(active);
  }, [active]);
}
