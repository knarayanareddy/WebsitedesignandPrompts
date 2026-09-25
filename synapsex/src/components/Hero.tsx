import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

const HEADING_CLASS =
  'block text-[clamp(2.75rem,8.5vw,7rem)] font-bold leading-[0.92] tracking-tight';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Cursor coordinates normalized from -1 to 1.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Fluid physics: pipe coordinates through springs (stiffness 150, damping 20).
  const smoothX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 150, damping: 20 });

  // Watermark depth parallax: x = mouseX * -30px, y = mouseY * -20px.
  const watermarkX = useTransform(smoothX, (v) => v * -30);
  const watermarkY = useTransform(smoothY, (v) => v * -20);

  // Hero headline tilt: rotateY = mouseX * 8deg, rotateX = mouseY * -8deg.
  const rotateY = useTransform(smoothX, (v) => v * 8);
  const rotateX = useTransform(smoothY, (v) => v * -8);

  // Interactive time-warp state (playbackRate 1.0x -> 1.6x -> 1.0x).
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const targetRate = useRef(1);
  const rate = useRef(1);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playbackRate = 1;
      video.play().catch(() => {
        /* autoplay can be blocked until first gesture */
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      // Normalized cursor coordinates for the tilt/parallax system.
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);

      // Cursor speed feeds the time-warp: rapid movement boosts playback.
      const now = performance.now();
      const prev = lastPointer.current;
      if (prev) {
        const dt = Math.max(now - prev.t, 1);
        const speed = Math.hypot(e.clientX - prev.x, e.clientY - prev.y) / dt;
        const boost = Math.min(0.6, speed * 0.18);
        targetRate.current = Math.min(1.6, Math.max(targetRate.current, 1 + boost));
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    };
    window.addEventListener('pointermove', onPointerMove);

    // Smoothly ease playback toward the target; decay to 1.0x when idle.
    let raf = 0;
    const loop = () => {
      targetRate.current += (1 - targetRate.current) * 0.03;
      rate.current += (targetRate.current - rate.current) * 0.06;
      const videoNow = videoRef.current;
      if (videoNow) {
        videoNow.playbackRate = Math.min(1.6, Math.max(1, rate.current));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [rawX, rawY]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100dvh] overflow-hidden bg-black">
      {/* Video #1 - hero: always alive (autoplay, loop, smooth 60fps) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
        aria-hidden="true"
      />

      {/* 24x24px dot-matrix overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Centered giant watermark - shifts with depth */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <motion.span className="watermark" style={{ x: watermarkX, y: watermarkY }}>
          TRANSCENDENCE
        </motion.span>
      </div>

      {/* Hero typography - 3D parallax tilt */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
        <div style={{ perspective: '900px' }}>
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <h1
              aria-label="Brain And Body One Network"
              className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8"
            >
              <span className="block text-left">
                <ScrambleIn text="Brain" delay={0.2} triggered={inView} className={HEADING_CLASS} />
                <ScrambleIn text="And Body" delay={0.6} triggered={inView} className={HEADING_CLASS} />
              </span>
              <span className="block text-right">
                <ScrambleIn text="One" delay={1.0} triggered={inView} className={HEADING_CLASS} />
                <ScrambleIn text="Network" delay={1.4} triggered={inView} className={HEADING_CLASS} />
              </span>
            </h1>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.9, ease: 'easeOut' }}
          className="mt-8 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
        >
          A closed-loop neural interface for the whole body. SynapseX reads intent at
          the synapse and returns capability — instantly, continuously, invisibly.
        </motion.p>
      </div>
    </section>
  );
}
