import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function format(v: number, decimals: number, suffix: string, padInt?: number): string {
  const s = v.toFixed(decimals);
  const [intPart, fracPart] = s.split('.');
  const intPadded = padInt ? intPart.padStart(padInt, '0') : intPart;
  return `${intPadded}${fracPart !== undefined ? `.${fracPart}` : ''}${suffix}`;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

interface AnimatedCounterProps {
  /** Target value counted up to. */
  value: number;
  decimals?: number;
  suffix?: string;
  /** Pad the integer part with leading zeros (e.g. 2 -> "00.0%"). */
  padInt?: number;
  /** Random decimal-jitter pre-roll before the count begins. */
  jitter?: boolean;
  jitterMs?: number;
  durationMs?: number;
  className?: string;
}

/**
 * Viewport-triggered cyberpunk counter. Fires once on enter (`whileInView`
 * viewport tracking), optionally scrambling with random decimal jitter
 * before easing from zero to the target value.
 */
export default function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
  padInt,
  jitter = false,
  jitterMs = 550,
  durationMs = 1400,
  className,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(() => format(0, decimals, suffix, padInt));
  const startedRef = useRef(false);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cancelRef.current?.();
    },
    [],
  );

  const runCount = () => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      setDisplay(format(value * easeOutCubic(p), decimals, suffix, padInt));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cancelRef.current = () => cancelAnimationFrame(raf);
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!jitter) {
      runCount();
      return;
    }

    // Random decimal jitter first, then the real count.
    const t0 = performance.now();
    const id = window.setInterval(() => {
      if (performance.now() - t0 >= jitterMs) {
        window.clearInterval(id);
        runCount();
        return;
      }
      setDisplay(format(Math.random() * 9.9, decimals, suffix, padInt));
    }, 25);
    cancelRef.current = () => window.clearInterval(id);
  };

  return (
    <motion.span
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      onViewportEnter={start}
      viewport={{ once: true, amount: 0.5 }}
    >
      {display}
    </motion.span>
  );
}
