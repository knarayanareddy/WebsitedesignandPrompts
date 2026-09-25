import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface CounterState {
  count: number;
  progress: number;
}

const WORDS: readonly string[] = ['Design', 'Create', 'Inspire'];
const DURATION_MS = 2700;
const FADE_MS = 400;
const WORD_INTERVAL_MS = 900;

export default function LoadingScreen({ onComplete }: LoadingScreenProps): JSX.Element {
  const [counter, setCounter] = useState<CounterState>({ count: 0, progress: 0 });
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const onCompleteRef = useRef<() => void>(onComplete);
  onCompleteRef.current = onComplete;

  /* Numerical counter: 000 -> 100 over 2700ms via requestAnimationFrame */
  useEffect(() => {
    let rafId: number = 0;
    let startTime: number | null = null;

    const step = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;
      const elapsed: number = timestamp - startTime;
      const progress: number = Math.min(elapsed / DURATION_MS, 1);

      setCounter({ count: Math.round(progress * 100), progress });

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsFadingOut(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Rotating words every 900ms */
  useEffect(() => {
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
