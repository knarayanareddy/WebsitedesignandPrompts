import { useEffect, type RefObject } from 'react';

/** Pointer-capable + motion-allowed: the gate for every tactile effect here. */
function effectsAllowed(): boolean {
  return (
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(pointer: coarse)').matches
  );
}

/**
 * Cursor tilt + glow on a card: writes CSS vars (no React state, no re-render).
 *   --rx / --ry  → `transform: perspective(...) rotateX/Y` via the .tilt class
 *   --mx / --my  → radial glow position via the .tilt-glow::before layer
 */
export function useTilt(ref: RefObject<HTMLElement | null>, maxDeg = 3.5) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !effectsAllowed()) return;

    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const rect = el.getBoundingClientRect();
      const px = (last.clientX - rect.left) / rect.width;
      const py = (last.clientY - rect.top) / rect.height;
      el.style.setProperty('--ry', `${((px - 0.5) * 2 * maxDeg).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - py) * 2 * maxDeg).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      last = null;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, maxDeg]);
}

/**
 * Cursor spotlight across a whole section: sets --mx/--my on the container so a
 * radial mask/glow layer can follow the pointer (measured-style, CSS-driven).
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !effectsAllowed()) return;

    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(last.clientX - rect.left).toFixed(1)}px`);
      el.style.setProperty('--my', `${(last.clientY - rect.top).toFixed(1)}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
    };
  }, [ref]);
}
