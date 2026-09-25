import { useEffect, useRef, useState } from 'react';

const GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const FRAME_MS = 25;
const FRAMES_PER_CHAR = 4;

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

interface ScrambleTextProps {
  /** Resting text; scrambled on hover and resolved back over 4 frames/char. */
  text: string;
  className?: string;
}

/**
 * Hover-driven scramble: pointer hover scrambles every character,
 * then the original text resolves left-to-right over 4 frames per char.
 */
export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    },
    [],
  );

  const scramble = () => {
    if (running.current) return;
    running.current = true;

    const total = text.length;
    const totalUnits = total * FRAMES_PER_CHAR;
    let units = 0;

    // Instant full scramble on hover.
    setDisplay(
      text
        .split('')
        .map((ch) => (ch === ' ' ? ' ' : randomGlyph()))
        .join(''),
    );

    intervalRef.current = window.setInterval(() => {
      units += 1;
      const resolved = Math.floor(units / FRAMES_PER_CHAR);

      if (resolved >= total) {
        setDisplay(text);
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        running.current = false;
        return;
      }

      let out = '';
      for (let i = 0; i < total; i += 1) {
        const ch = text[i];
        if (ch === ' ') {
          out += ' ';
        } else {
          out += i < resolved ? ch : randomGlyph();
        }
      }
      setDisplay(out);
    }, FRAME_MS);

    // Safety valve so the interval can never outlive the animation.
    window.setTimeout(() => {
      if (running.current) {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        running.current = false;
        setDisplay(text);
      }
    }, (totalUnits + 4) * FRAME_MS + 50);
  };

  return (
    <span
      className={className}
      style={{ whiteSpace: 'pre' }}
      onPointerEnter={scramble}
      aria-label={text}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
