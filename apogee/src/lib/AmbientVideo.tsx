import { useEffect, useRef, useState } from 'react';

/**
 * Ambient full-bleed video layer for the page bands (metrics / quote / CTA).
 * - plays muted/looped like the hero, pauses under prefers-reduced-motion
 * - `onError` swaps in the band's CSS gradient plate (repo media standard)
 * - optional scroll parallax (`parallax` > 0 translates the clip inside its
 *   clipped frame), disabled for reduced motion
 */
export default function AmbientVideo({
  src,
  poster,
  fallback,
  parallax = 0.12,
  className = '',
}: {
  src: string;
  poster: string;
  /** CSS background painted if the clip cannot load (same mood as the clip). */
  fallback: string;
  parallax?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mq.matches) {
        v.pause();
        v.style.transform = '';
      }
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (parallax <= 0) return;
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      // -1 (entering) .. 1 (leaving); video drifts slower than the page
      const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      v.style.transform = `translate3d(0, ${(p * parallax * rect.height).toFixed(1)}px, 0) scale(${1 + parallax * 1.25})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [parallax]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      {failed ? (
        <div className="absolute inset-0" style={{ background: fallback }} />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
