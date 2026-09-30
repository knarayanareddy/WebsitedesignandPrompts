import Reveal from './Reveal';

/** Closing CTA — the hero's button language over a nebula-tone glow. */
export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Deep-blue/red glow, echoing the hero clip */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 110%, rgba(41,56,140,0.4), transparent 65%),' +
            'radial-gradient(ellipse 40% 40% at 82% 20%, rgba(140,36,52,0.22), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32">
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
            <button
              type="button"
              className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-90"
            >
              Book a demo
            </button>
            <button
              type="button"
              className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80"
            >
              Talk with the team
            </button>
          </div>
          <p className="text-white/40 text-[12px] sm:text-[13px] font-[450] leading-[1.5] mt-6">
            No credit card required · SOC 2 Type II · Deployed in your region
          </p>
        </Reveal>
      </div>
    </section>
  );
}
