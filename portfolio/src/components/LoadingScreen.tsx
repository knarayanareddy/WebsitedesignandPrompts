import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { POSTER_SRC } from '../lib/media';
import { prefersReducedMotion } from '../lib/motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface CounterState {
  count: number;
  progress: number;
}

const WORDS: readonly string[] = ['Design', 'Create', 'Inspire'];
/** Shortest time the preloader stays up, so the intro never flashes. */
const MIN_DURATION_MS = 1000;
/** Hard ceiling: leave even if fonts / the hero poster are still loading. */
const MAX_DURATION_MS = 2700;
/** Progress shown while still waiting on real assets. */
const WAITING_CAP = 0.9;
const FADE_MS = 400;
const WORD_INTERVAL_MS = 900;

/** Resolves when the webfonts and the hero poster have loaded (never rejects). */
function waitForCriticalAssets(): Promise<void> {
  const fonts: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();
  const poster: Promise<void> = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = POSTER_SRC;
  });
  return Promise.all([fonts, poster]).then(() => undefined);
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps): JSX.Element {
  const [counter, setCounter] = useState<CounterState>({ count: 0, progress: 0 });
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const onCompleteRef = useRef<() => void>(onComplete);
  onCompleteRef.current = onComplete;

  /* Numerical counter 000 -> 100. Progress tracks real loading: it eases
     toward 90% while fonts + the hero poster are still in flight, completes
     as soon as they are ready (after at least MIN_DURATION_MS), and is forced
     to 100% at MAX_DURATION_MS no matter what. */
  useEffect(() => {
    let rafId: number = 0;
    let startTime: number | null = null;
    let assetsReady = false;
    let shown = 0;

    waitForCriticalAssets().then(() => {
      assetsReady = true;
    });

    const step = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;
      const elapsed: number = timestamp - startTime;
      const timedOut: boolean = elapsed >= MAX_DURATION_MS;
      const canFinish: boolean = (assetsReady && elapsed >= MIN_DURATION_MS) || timedOut;

      const target: number = canFinish
        ? 1
        : Math.min(WAITING_CAP, (elapsed / MAX_DURATION_MS) * 1.15);

      // Ease toward the target so the bar never jumps.
      shown += (target - shown) * 0.12;
      if (canFinish && target - shown < 0.005) shown = 1;
      if (timedOut) shown = 1;

      setCounter({ count: Math.round(shown * 100), progress: shown });

      if (shown < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsFadingOut(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Rotating words every 900ms (a single static word under reduced motion) */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const intervalId: number = window.setInterval(() => {
      setWordIndex((prev: number) => (prev + 1) % WORDS.length);
    }, WORD_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  /* 400ms fade-out, then hand control back to the app */
  useEffect(() => {
    if (!isFadingOut) return;
    const timeoutId: number = window.setTimeout(() => {
      onCompleteRef.current();
    }, FADE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isFadingOut]);

  /* Lock body scroll while the preloader is visible */
  useEffect(() => {
    const previousOverflow: string = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const paddedCount: string = counter.count.toString().padStart(3, '0');

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg p-6 md:p-10"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Top-left label */}
      <div className="flex items-start justify-between">
        <span className="text-xs text-muted uppercase tracking-[0.3em]">PORTFOLIO '26</span>
      </div>

      {/* Rotating words */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-display text-4xl italic text-text-primary md:text-6xl"
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Counter + progress bar */}
      <div>
        <div className="flex justify-end">
          <span className="font-display text-7xl leading-none tabular-nums text-text-primary md:text-9xl">
            {paddedCount}
          </span>
        </div>
        <div className="mt-6 h-[2px] w-full overflow-hidden bg-stroke/50">
          <div
            className="accent-gradient h-full w-full origin-left"
            style={{
              transform: `scaleX(${counter.progress})`,
              boxShadow: '0 0 10px rgba(137,170,204,0.4)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
