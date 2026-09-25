import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const CINEMATIC_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function CinematicText() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Fluid camera: raw scroll progress piped through a spring.
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });

  // Multi-stage 3D camera tilt: 55deg (enters) -> 0deg (center) -> -45deg (exits).
  const rotateX = useTransform(smooth, [0, 0.5, 1], [55, 0, -45]);
  const y = useTransform(smooth, [0, 0.5, 1], [140, 0, -140]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.85, 1.08, 0.9]);
  const opacity = useTransform(smooth, [0.2, 0.4, 0.65, 0.85], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-[100dvh] overflow-hidden bg-black"
    >
      {/* Video #2 - cinematic text (autoplay, muted, loop) */}
      <video
        src={CINEMATIC_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Top gradient overlay: #000 -> transparent */}
      <div
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent"
        aria-hidden="true"
      />

      {/* Typography floating freely in open 3D space over the video */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div style={{ perspective: '400px' }}>
          <motion.p
            style={{ rotateX, y, scale, opacity, transformStyle: 'preserve-3d' }}
            className="max-w-5xl text-center text-xl font-bold leading-snug tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] md:text-4xl md:leading-snug"
          >
            A neural-AI interface built on the architecture of the human nervous
            system. SynapseX translates synaptic activity into computational
            intelligence — every intention becomes an action before the body
            can move.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
