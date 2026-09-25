import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/**
 * IntersectionObserver hook — a surface is "active" (computes cursor
 * animations, plays media) only while at least `threshold` is visible.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.25,
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.intersectionRatio >= threshold);
        }
      },
      { threshold: [0, threshold, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}
