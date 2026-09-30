import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

const portraitUrl = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const aboutDecor = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: '',
    className: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '',
    className: 'bottom-[8%] left-[3%] w-[100px] sm:bottom-[8%] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
    size: 'w-[100px] sm:w-[140px] md:w-[180px]',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: '',
    className: 'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '',
    className: 'bottom-[8%] right-[3%] w-[130px] sm:bottom-[8%] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
    size: 'w-[130px] sm:w-[170px] md:w-[220px]',
  },
];

const services = [
  { number: '01', name: '3D Modeling', copy: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' },
  { number: '02', name: 'Rendering', copy: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' },
  { number: '03', name: 'Motion Design', copy: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' },
  { number: '04', name: 'Branding', copy: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.' },
  { number: '05', name: 'Web Design', copy: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.' },
];

const projects = [
  {
    category: 'Client',
    name: 'Nextlevel Studio',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    category: 'Personal',
    name: 'Aura Brand Identity',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    category: 'Client',
    name: 'Solaris Digital',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

type FadeInTag = 'div' | 'section' | 'article' | 'p' | 'h1' | 'h2';
const motionElements = {
  div: motion.create('div'),
  section: motion.create('section'),
  article: motion.create('article'),
  p: motion.create('p'),
  h1: motion.create('h1'),
  h2: motion.create('h2'),
};

type FadeInProps = {
  as?: FadeInTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

function FadeIn({ as = 'div', children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  const MotionElement = motionElements[as];
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <MotionElement
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionElement>
  );
}

function ContactButton({ className = '', id }: { className?: string; id?: string }) {
  return (
    <a
      id={id}
      href="#contact"
      className={`inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-[0_4px_4px_rgba(181,1,167,0.25),inset_4px_4px_12px_#7721B1] outline outline-2 outline-white outline-offset-[-3px] transition-transform duration-300 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
    >
      Contact Me
    </a>
  );
}

function Magnet({ children, padding = 150, strength = 3 }: { children: ReactNode; padding?: number; strength?: number }) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      const element = magnetRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const withinRange = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding && event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;
      if (!withinRange) {
        element.style.transition = 'transform 0.6s ease-in-out';
        element.style.transform = 'translate3d(0, 0, 0)';
        return;
      }
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [padding, reduceMotion, strength]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-center sm:items-end">
      <div ref={magnetRef} className="pointer-events-auto absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]" style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[620px] flex-col overflow-x-clip bg-[#0C0C0C] px-6 pt-6 md:px-10 md:pt-8">
      <FadeIn as="div" className="relative z-20 flex items-center justify-between text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem]" delay={0} y={-20}>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#about">About</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#services">Price</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#projects">Projects</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#contact">Contact</a>
      </FadeIn>

      <div className="relative z-0 mt-6 w-full overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn as="h1" className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]" delay={0.15} y={40}>
          Hi, i'm jack
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
        <FadeIn as="p" className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]" delay={0.35} y={20}>
          a 3d creator driven by crafting striking and unforgettable projects
        </FadeIn>
        <FadeIn as="div" delay={0.5} y={20}>
          <ContactButton id="contact" />
        </FadeIn>
      </div>

      <FadeIn as="div" className="pointer-events-none absolute inset-0 z-10" delay={0.6} y={30}>
        <Magnet>
          <img src={portraitUrl} alt="Jack, 3D creator" className="block h-auto w-full object-contain" fetchPriority="high" />
        </Magnet>
      </FadeIn>
    </section>
  );
}

function MarqueeRow({ images, x, label }: { images: string[]; x: MotionValue<number>; label: string }) {
  const loop = [...images, ...images, ...images];
  return (
    <motion.div className="flex w-max gap-3" style={{ x, willChange: 'transform' }} aria-label={label}>
      {loop.map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="" loading="lazy" className="h-[170px] w-[260px] shrink-0 rounded-2xl object-cover sm:h-[220px] sm:w-[340px] md:h-[270px] md:w-[420px]" />
      ))}
    </motion.div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rawOffset = useMotionValue(0);
  const reduceMotion = useReducedMotion() ?? false;
  const smoothOffset = useSpring(rawOffset, { stiffness: 80, damping: 28, mass: 0.5 });
  const rightX = useTransform(smoothOffset, (offset) => offset - 200);
  const leftX = useTransform(smoothOffset, (offset) => -(offset - 200));

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      if (reduceMotion) {
        rawOffset.set(200);
        return;
      }
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      rawOffset.set((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [rawOffset, reduceMotion]);

  return (
    <section ref={sectionRef} aria-label="Selected visual work" className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} x={rightX} label="First row of selected projects" />
        <MarqueeRow images={marqueeImages.slice(11)} x={leftX} label="Second row of selected projects" />
      </div>
    </section>
  );
}

function AnimatedCharacter({ character, index, total, progress, reduceMotion }: { character: string; index: number; total: number; progress: MotionValue<number>; reduceMotion: boolean }) {
  const start = index / total;
  const end = Math.min(1, start + Math.max(0.025, 1 / total));
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity: reduceMotion ? 1 : opacity }} className="whitespace-pre">
      {character === ' ' ? '\u00a0' : character}
    </motion.span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: paragraphRef, offset: ['start 0.8', 'end 0.2'] });
  const reduceMotion = useReducedMotion() ?? false;
  const characters = Array.from(text);
  return (
    <p ref={paragraphRef} aria-label={text} className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      {characters.map((character, index) => (
        <AnimatedCharacter key={`${character}-${index}`} character={character} index={index} total={characters.length} progress={scrollYProgress} reduceMotion={reduceMotion} />
      ))}
    </p>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      {aboutDecor.map((image) => (
        <FadeIn key={image.src} as="div" className={`pointer-events-none absolute z-0 ${image.className}`} delay={image.delay} x={image.x} duration={0.9}>
          <img src={image.src} alt={image.alt} aria-hidden="true" className={`${image.size} h-auto object-contain`} loading="lazy" />
        </FadeIn>
      ))}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn as="h2" className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight" delay={0} y={40}>
            About me
          </FadeIn>
          <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
        </div>
        <FadeIn as="div" delay={0.2} y={20} className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn as="h2" className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Services
        </FadeIn>
        <div>
          {services.map((service, index) => (
            <FadeIn key={service.number} as="article" className="flex items-center gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12" delay={index * 0.1}>
              <span className="shrink-0 font-black leading-none text-[clamp(3rem,10vw,140px)]">{service.number}</span>
              <div className="max-w-2xl">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{service.name}</h3>
                <p className="mt-2 text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C]/60">{service.copy}</p>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-[rgba(12,12,12,0.15)]" />
        </div>
      </div>
    </section>
  );
}

function LiveProjectButton() {
  return (
    <a href="#projects" className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-8 sm:py-3 sm:text-sm" aria-label="View featured projects">
      Live Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div ref={cardRef} className="relative h-[85vh] min-h-[560px]">
      <motion.article style={{ scale: reduceMotion ? 1 : scale, '--stack-offset': `${index * 28}px` } as MotionStyle} className="project-card-sticky sticky flex h-[80vh] min-h-[520px] flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 text-[#D7E2EA] sm:rounded-[50px] sm:p-6 md:h-[78vh] md:min-h-[570px] md:rounded-[60px] md:p-8">
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div className="flex min-w-0 items-end gap-3 sm:gap-5 md:gap-8">
            <span className="hero-heading shrink-0 font-black leading-[0.8] text-[clamp(3rem,8vw,100px)]">0{index + 1}</span>
            <div className="min-w-0 pb-1 sm:pb-2">
              <p className="mb-1 text-[10px] font-light uppercase tracking-[0.2em] text-[#D7E2EA]/55 sm:text-xs">{project.category}</p>
              <h3 className="truncate text-base font-medium uppercase leading-tight tracking-wide sm:text-xl md:text-2xl">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] gap-2 sm:gap-3">
          <div className="grid min-h-0 grid-rows-[0.42fr_0.58fr] gap-2 sm:gap-3">
            {project.images.slice(0, 2).map((src, imageIndex) => (
              <div key={src} className="min-h-0 overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[48px]">
                <img src={src} alt={`${project.name} visual ${imageIndex + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="min-h-0 overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[48px]">
            <img src={project.images[2]} alt={`${project.name} featured visual`} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn as="h2" className="hero-heading mb-12 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20">
          Project
        </FadeIn>
        <div>
          {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} total={projects.length} />)}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-sans text-[#D7E2EA]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
