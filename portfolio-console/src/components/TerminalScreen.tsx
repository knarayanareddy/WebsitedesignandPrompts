import React, { useEffect, useState, useRef } from 'react';

interface TerminalScreenProps {
  targetTitle: string;
  targetDesc: string;
  isCustomHover: boolean;
  displayName: string;
}

export const TerminalScreen: React.FC<TerminalScreenProps> = ({
  targetTitle,
  targetDesc,
  isCustomHover,
  displayName,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');
  const [status, setStatus] = useState<'TYPING' | 'READY'>('READY');
  const timerRef = useRef<any>(null);
  const titleIndexRef = useRef(0);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Clear previous typing loop
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (prefersReducedMotion) {
      setDisplayedTitle(targetTitle);
      setDisplayedDesc(targetDesc);
      setStatus('READY');
      return;
    }

    setStatus('TYPING');
    setDisplayedTitle('');
    setDisplayedDesc(targetDesc); // Description appears immediately per brief
    titleIndexRef.current = 0;

    // 350ms pause before starting typing loop
    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        titleIndexRef.current += 1;
        const nextSubstr = targetTitle.slice(0, titleIndexRef.current);
        setDisplayedTitle(nextSubstr);

        if (titleIndexRef.current >= targetTitle.length) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setStatus('READY');
        }
      }, 95); // ~95-110ms per character
    }, isCustomHover ? 60 : 350);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [targetTitle, targetDesc, prefersReducedMotion]);

  return (
    <div
      className="absolute z-20 overflow-hidden pointer-events-none select-none flex flex-col justify-between"
      style={{
        left: '21.8%',
        top: '17.9%',
        width: '56.9%',
        height: '15.3%',
        transform: 'rotate(-3deg) skewX(5deg)',
        transformOrigin: 'top left',
      }}
    >
      {/* CRT Scanline and vignette overlay */}
      <div className="absolute inset-0 cr-screen opacity-90" />
      <div className="absolute inset-0 crt-scanlines opacity-40 z-10" />

      {/* Screen Content Container */}
      <div className="relative z-20 w-full h-full p-[1.8%] flex flex-col justify-between font-mono text-left">
        {/* Top Header Strip: Metadata + Status */}
        <div className="flex items-center justify-between text-[clamp(7px,1.1cqi,11px)] tracking-wider text-[#8A8A93] border-b border-white/[0.08] pb-[0.8%]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[#F8A91F] font-bold">●</span>
            <span className="font-semibold text-neutral-300">
              {displayName.toUpperCase()} / CREATIVE INDEX
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            <span
              className={`size-1.5 rounded-full ${
                status === 'TYPING'
                  ? 'bg-[#F8A91F] animate-ping'
                  : 'bg-emerald-400 shadow-[0_0_6px_#10B981]'
              }`}
            />
            <span
              className={`font-semibold tracking-widest text-[9px] ${
                status === 'TYPING' ? 'text-[#F8A91F]' : 'text-emerald-400'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Middle Main Title with Typing Effect & Amber Caret */}
        <div className="flex-1 flex items-center py-[1%]">
          <div className="w-full truncate">
            <span
              className="font-bold text-[#FDE3CF] tracking-normal inline-block"
              style={{
                fontSize: 'clamp(11px, 3.15cqi, 27px)',
                lineHeight: 1.15,
                textShadow: '0 0 10px rgba(253, 227, 207, 0.45)',
              }}
              aria-label={targetTitle}
            >
              {displayedTitle}
            </span>
            {/* Blinking amber cursor */}
            {!prefersReducedMotion && (
              <span className="inline-block w-[0.45em] h-[1em] ml-0.5 bg-[#F8A91F] animate-caret align-middle shadow-[0_0_8px_#F8A91F]" />
            )}
          </div>
        </div>

        {/* Bottom Supporting Description Line */}
        <div className="text-[clamp(7px,1.15cqi,11.5px)] text-[#9CA3AF] truncate leading-tight border-t border-white/[0.05] pt-[0.8%]">
          {displayedDesc}
        </div>
      </div>
    </div>
  );
};
