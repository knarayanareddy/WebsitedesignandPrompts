import Reveal from './Reveal';
import AmbientVideo from '@/lib/AmbientVideo';

/** Full-bleed "terrain" band — the horizon you forecast, behind the customer voice. */
export default function Quote() {
  return (
    <section className="relative w-full overflow-hidden">
      <AmbientVideo
        src="./videos/terrain.mp4"
        poster="./posters/poster-terrain.jpg"
        fallback="radial-gradient(ellipse 80% 50% at 50% 28%, rgba(41,56,140,0.5), transparent 70%), #080A19"
      />
      <div className="absolute inset-0 bg-[#080A19]/62" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080A19] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080A19] to-transparent" />

      <div className="relative max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32">
        <Reveal>
          <p className="text-white/25 text-[48px] sm:text-[64px] font-normal leading-[0.6] select-none">
            &ldquo;
          </p>
          <blockquote className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-normal leading-[1.25] tracking-[-0.01em] max-w-[1100px] mt-4 sm:mt-6">
            Apogee turned our forecasting from a monthly scramble into a live instrument. The
            week we switched over, we caught a demand shift our old models would have missed
            entirely.
          </blockquote>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex items-center gap-4 mt-10 sm:mt-12">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-[rgba(17,16,15,0.6)] border border-white/[0.08] flex items-center justify-center"
            >
              <span className="text-white/70 text-[13px] font-[450] tracking-[0.08em]">MO</span>
            </div>
            <div>
              <p className="text-white text-[15px] sm:text-[16px] font-[450] leading-[1.3]">
                Maya Ortiz
              </p>
              <p className="text-white/50 text-[13px] sm:text-[14px] font-[450] leading-[1.4]">
                Chief Financial Officer, Northwind Logistics
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
