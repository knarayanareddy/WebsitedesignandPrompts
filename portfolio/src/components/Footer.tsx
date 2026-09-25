import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { gsap } from '../lib/gsap';
import { useHlsVideo } from '../lib/useHlsVideo';

interface SocialLink {
  readonly label: string;
  readonly href: string;
}

const VIDEO_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const POSTER_SRC =
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop';

const TICKER_TEXT = 'BUILDING THE FUTURE • CRAFTING EXPERIENCES • ';

const SOCIALS: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Twitter/X', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

export default function Footer(): JSX.Element {
  const videoRef = useHlsVideo(VIDEO_SRC);
  const tickerRef = useRef<HTMLDivElement>(null);

  /* Infinite marquee: xPercent -50 over 30s, seamless loop */
  useEffect(() => {
    const ticker: HTMLDivElement | null = tickerRef.current;
    if (!ticker) return;

    const tween = gsap.to(ticker, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    window.location.href = 'mailto:hello@michaelsmith.com';
  };

  const tickerHalf: number[] = [0, 1, 2];

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-stroke">
      {/* Inverted HLS video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full invert object-cover"
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/75" />

      {/* Infinite ticker marquee */}
      <div className="relative z-10 overflow-hidden border-b border-white/5 py-6 md:py-8">
        <div ref={tickerRef} className="flex w-max select-none whitespace-nowrap">
          {[0, 1].map((half: number) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {tickerHalf.map((item: number) => (
                <span
                  key={item}
                  className="px-3 font-display text-3xl italic text-text-primary/80 md:text-5xl"
                >
                  {TICKER_TEXT}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Big action */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 text-center md:py-32">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">Get in touch</p>
        <h2 className="mx-auto mb-10 max-w-3xl font-display text-4xl italic text-text-primary md:text-6xl lg:text-7xl">
          Let&apos;s make something unforgettable.
        </h2>
        <a
          href="mailto:hello@michaelsmith.com"
          onClick={handleEmailClick}
          className="gradient-ring-hover group/email inline-flex items-center gap-3 rounded-full bg-surface/60 px-8 py-4 text-sm text-text-primary backdrop-blur-md transition-colors hover:bg-surface md:text-base"
        >
          <span>hello@michaelsmith.com</span>
          <span aria-hidden="true" className="transition-transform group-hover/email:translate-x-1">
            ↗
          </span>
        </a>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-7 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          </span>
          <span className="text-sm text-muted">Available for Q4 contracts</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5" aria-label="Social">
          {SOCIALS.map((social: SocialLink) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors hover:text-text-primary"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
