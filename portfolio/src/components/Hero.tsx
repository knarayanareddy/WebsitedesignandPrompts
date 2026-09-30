import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHlsVideo } from '../lib/useHlsVideo';
import { POSTER_SRC, VIDEO_SRC } from '../lib/media';
import { usePrefersReducedMotion } from '../lib/motion';
import Navbar from './Navbar';

interface HeroProps {
  readonly ready: boolean;
  readonly onNavigate: (target: string) => void;
}

const ROLES: readonly string[] = ['Creative', 'Fullstack', 'Founder', 'Scholar'];
const ROLE_INTERVAL_MS = 2200;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ ready, onNavigate }: HeroProps): JSX.Element {
  const videoRef = useHlsVideo(VIDEO_SRC, { eager: true });
  const reducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState<number>(0);

  /* Cycle through roles every 2.2s (static under prefers-reduced-motion) */
  useEffect(() => {
    if (reducedMotion) return;
    const intervalId: number = window.setInterval(() => {
      setRoleIndex((prev: number) => (prev + 1) % ROLES.length);
    }, ROLE_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative flex h-svh min-h-[700px] flex-col justify-between overflow-hidden"
    >
      {/* Background HLS video — attached/played by useHlsVideo; poster stays if
          the stream fails or the user prefers reduced motion */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Floating navbar */}
      <Navbar ready={ready} onNavigate={onNavigate} />

      {/* Top spacer (navbar clearance) */}
      <div aria-hidden="true" className="h-28 shrink-0" />

      {/* Centered content */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">COLLECTION '26</p>

        <h1 className="mb-6 font-display text-6xl italic leading-[0.88] tracking-tight text-text-primary sm:text-7xl md:text-9xl">
          Michael Smith
        </h1>

        <p className="mb-5 font-display text-lg italic text-text-primary md:text-2xl">
          A{' '}
          <span key={ROLES[roleIndex]} className="animate-role-fade-in inline-block">
            {ROLES[roleIndex]}
          </span>{' '}
          lives in Chicago.
        </p>

        <p className="mx-auto mb-10 max-w-md text-sm text-muted sm:text-base">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('#work')}
            className="rounded-full bg-text-primary px-8 py-3.5 text-sm font-medium text-bg transition-transform hover:scale-105"
          >
            See Works
          </button>
          <button
            type="button"
            onClick={() => onNavigate('#contact')}
            className="rounded-full border border-stroke px-8 py-3.5 text-sm font-medium text-text-primary transition-all hover:scale-105 hover:border-white/40"
          >
            Reach out
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">SCROLL</span>
        <div className="relative h-14 w-px overflow-hidden bg-stroke">
          <div className="animate-scroll-down accent-gradient absolute inset-0" />
        </div>
      </motion.div>
    </section>
  );
}
