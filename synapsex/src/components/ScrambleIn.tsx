import { useEffect, useState } from 'react';

const GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const FRAME_MS = 25;
const CHARS_PER_FRAME = 0.5;

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function scrambleAll(text: string): string {
  return text
    .split('')
    .map((ch) => (ch === ' ' ? ' ' : randomGlyph()))
    .join('');
}

interface ScrambleInProps {
  /** Final text that resolves on screen. */
  text: string;
  /** Seconds to wait before the reveal starts. */
  delay: number;
  /** Flip to true when the element enters the viewport. */
  triggered: boolean;
  className?: string;
}

/**
 * Entrance reveal: glyphs randomize every 25ms and resolve
 * left-to-right at 0.5 chars per frame.
 */
export default function ScrambleIn({ text, delay, triggered, className }: ScrambleInProps) {
  const [display, setDisplay] = useState(() => scrambleAll(text));

  useEffect(() => {
    if (!triggered) return;

    const total = text.length;
    const startFrame = Math.ceil((delay * 1000) / FRAME_MS);
    let frame = 0;

    const id = window.setInterval(() => {
      frame += 1;

      const resolved =
        frame <= startFrame ? 0 : Math.floor((frame - startFrame) * CHARS_PER_FRAME);

      if (resolved >= total) {
        setDisplay(text);
        window.clearInterval(id);
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

    return () => window.clearInterval(id);
  }, [triggered, text, delay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
