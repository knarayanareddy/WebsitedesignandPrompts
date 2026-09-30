import { useRef, type RefObject } from 'react';
import Reveal from './Reveal';
import AmbientVideo from '@/lib/AmbientVideo';
import { useTilt } from '@/lib/pointer';

function CtaButton({
  children,
  primary,
}: {
  children: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  useTilt(ref as RefObject<HTMLElement | null>, 5);
  return (
    <button
      ref={ref}
      type="button"
      className={`tilt tilt-glow h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity ${
        primary
          ? 'bg-[#E9E9E9] text-[#0A0707] hover:opacity-90'
          : 'border border-white text-white hover:opacity-80'
      }`}
    >
      {children}
    </button>
  );
}

/** Closing CTA — the hero's button language over the "ascent" loop. */
export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden">
      <AmbientVideo
        src="./videos/ascent.mp4"
        poster="./posters/poster-ascent.jpg"
        fallback="radial-gradient(ellipse 60% 55% at 50% 110%, rgba(41,56,140,0.5), transparent 65%), #080A19"
      />
      {/* deep-blue/red glow overlays, echoing the hero clip */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 110%, rgba(41,56,140,0.35), transparent 65%),' +
            'radial-gradient(ellipse 40% 40% at 82% 20%, rgba(140,36,52,0.22), transparent 60%),' +
            'linear-gradient(to bottom, rgba(8,10,25,0.75), rgba(8,10,25,0.35) 40%, rgba(8,10,25,0.8))',
        }}
      />

      <div className="relative max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-28 sm:py-36">
        <Reveal>
          <h2 className="text-white text-[32px] sm:text-[48px] md:text-[64px] font-normal leading-[1.02] tracking-[-0.02em] max-w-[820px]">
            Reach your apogee.
          </h2>
          <p className="text-white/70 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[420px] mt-5 sm:mt-6">
            Put advanced reasoning systems to work on the data that matters most.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-9 sm:mt-10">
            <CtaButton primary>Book a demo</CtaButton>
            <CtaButton>Talk with the team</CtaButton>
          </div>
          <p className="text-white/40 text-[12px] sm:text-[13px] font-[450] leading-[1.5] mt-6">
            No credit card required · SOC 2 Type II · Deployed in your region
          </p>
        </Reveal>
      </div>
    </section>
  );
}
