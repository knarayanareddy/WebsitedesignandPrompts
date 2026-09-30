import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { AnimatedWords, Arrow45 } from "../../shared/ui";

const CDN = "https://qclay.design/lovable/ceptral";
const imageTower = { url: `${CDN}/imageTower.png` };
const flower = { url: `${CDN}/Flower.png` };
const solarPaner = { url: `${CDN}/SolarPaner.png` };
const stone = { url: `${CDN}/Stone.png` };

const INITIAL_STATES = [
  { width: "22%", y: 160, opacity: 1, marginRight: "40px", height: "320px" },
  { width: "28%", y: -20, opacity: 1, marginRight: "40px", height: "420px" },
  { width: "22%", y: 0, opacity: 1, marginRight: "40px", height: "320px" },
  { width: "18%", y: 40, opacity: 1, marginRight: "40px", height: "300px" },
  { width: "0%", y: 40, opacity: 0, marginRight: "0px", height: "300px" },
  { width: "0%", y: 40, opacity: 0, marginRight: "0px", height: "300px" },
];

const WHILE_IN_VIEW_STATES = [
  { width: ["22%", "22%", "0%"], opacity: [1, 1, 0], marginRight: ["40px", "40px", "0px"], height: ["320px", "320px", "320px"], y: 160 },
  { width: ["28%", "28%", "22%"], y: [-20, -20, 140], height: ["420px", "420px", "320px"], opacity: 1, marginRight: "40px" },
  { width: ["22%", "22%", "28%"], y: [0, 0, -75], height: ["320px", "320px", "420px"], opacity: 1, marginRight: "40px" },
  { width: ["18%", "18%", "22%"], height: ["300px", "300px", "450px"], y: [40, 40, -15], opacity: 1, marginRight: "40px" },
  { width: ["0%", "0%", "24%"], height: ["300px", "300px", "300px"], opacity: [0, 0, 1], y: 40, marginRight: "0px" },
  { width: "0%", height: "300px", y: 40, opacity: 0, marginRight: "0px" },
];

const FINAL_SLOTS = [
  { width: "0%", y: 160, opacity: 0, marginRight: "0px", height: "320px" },
  { width: "22%", y: 140, opacity: 1, marginRight: "40px", height: "320px" },
  { width: "28%", y: -75, opacity: 1, marginRight: "40px", height: "420px" },
  { width: "22%", y: -15, opacity: 1, marginRight: "40px", height: "450px" },
  { width: "24%", y: 40, opacity: 1, marginRight: "0px", height: "300px" },
  { width: "0%", y: 40, opacity: 0, marginRight: "0px", height: "300px" },
];

const IMG_CLASS = "w-full h-full object-cover rounded-[1px] pointer-events-none";

const INITIAL_CARDS = [
  { id: "c0", src: imageTower.url, alt: "Tower structure" },
  { id: "c1", src: flower.url, alt: "Flower" },
  { id: "c2", src: solarPaner.url, alt: "Solar panels" },
  { id: "c3", src: stone.url, alt: "Stone structure" },
  { id: "c4", src: imageTower.url, alt: "Tower structure" },
  { id: "c5", src: flower.url, alt: "Flower" },
];

export function Section2() {
  const collageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(collageRef, { once: true, margin: "-120px" });
  const [dragged, setDragged] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [shift, setShift] = useState(0);

  const CURSOR_SIZE = 130;
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.5 });

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const handleCardPointerMove = (e: React.PointerEvent) => {
    if (!isDesktop()) return;
    mx.set(e.clientX - CURSOR_SIZE / 2);
    my.set(e.clientY - CURSOR_SIZE / 2);
  };
  const handleCardPointerEnter = (e: React.PointerEvent) => {
    if (!isDesktop()) return;
    mx.jump(e.clientX - CURSOR_SIZE / 2);
    my.jump(e.clientY - CURSOR_SIZE / 2);
    setIsHovering(true);
  };
  const handleCardPointerLeave = () => setIsHovering(false);

  const visibleCards = useMemo(() => {
    const cards = [...INITIAL_CARDS];
    const normalizedShift = ((shift % 6) + 6) % 6;
    return [...cards.slice(normalizedShift), ...cards.slice(0, normalizedShift)];
  }, [shift]);

  const handleDragEnd = (_e: unknown, { offset }: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      setDragged(true);
      setShift((p) => p + 1);
    } else if (offset.x > swipeThreshold) {
      setDragged(true);
      setShift((p) => p - 1);
    }
  };

  const mobileCards = [
    { src: imageTower.url, alt: "Tower structure" },
    { src: flower.url, alt: "Flower" },
    { src: solarPaner.url, alt: "Solar panels" },
    { src: stone.url, alt: "Stone structure" },
  ];

  const target = (i: number) => (dragged ? FINAL_SLOTS[i] : inView ? WHILE_IN_VIEW_STATES[i] : INITIAL_STATES[i]);

  return (
    <section className="relative w-full overflow-hidden bg-[#1b1b1b] px-5 pt-16 pb-20 font-light text-white lg:px-10 lg:pt-24 lg:pb-32">
      <div className="relative z-20 flex w-full flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-10">
        <h2 className="flex flex-col text-[40px] leading-[1.05] font-light sm:text-5xl lg:text-[81px] lg:leading-[85px] lg:max-w-[900px]">
          <span className="whitespace-nowrap">
            <AnimatedWords text="Flexibility &" />
          </span>
          <span className="whitespace-nowrap">
            <AnimatedWords text="complete" delayStart={0.18} />{" "}
            <span className="opacity-50">
              <AnimatedWords text="balance" delayStart={0.3} />
            </span>
          </span>
        </h2>
        <motion.p
          className="text-sm lg:text-base text-white/60 max-w-sm lg:mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Every landscape needs a different answer. Our modular, nature-first systems adapt to terrain, climate and community — drag to explore the work.
        </motion.p>
      </div>

      {/* MOBILE / TABLET — 2x2 grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
        {mobileCards.map((c) => (
          <motion.div
            key={c.alt}
            className="w-full aspect-square overflow-hidden rounded-[2px] bg-neutral-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={c.src} alt={c.alt} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* DESKTOP COLLAGE */}
      <div ref={collageRef} className="hidden lg:flex relative mt-16 w-full h-[620px] items-start justify-start cursor-grab active:cursor-grabbing select-none">
        {visibleCards.map((c, i) => (
          <motion.div
            key={c.id}
            className="relative shrink-0 overflow-hidden rounded-[1px] bg-neutral-800"
            initial={INITIAL_STATES[i]}
            animate={target(i)}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], times: dragged ? undefined : [0, 0.4, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            onPointerEnter={handleCardPointerEnter}
            onPointerMove={handleCardPointerMove}
            onPointerLeave={handleCardPointerLeave}
          >
            <img src={c.src} alt={c.alt} className={IMG_CLASS} draggable={false} />
          </motion.div>
        ))}
      </div>

      {/* GLASS CURSOR — desktop only, only over cards */}
      <motion.div
        className="hidden lg:flex fixed top-0 left-0 z-[90] pointer-events-none items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white"
        style={{ x: sx, y: sy, width: CURSOR_SIZE, height: CURSOR_SIZE }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider font-medium">
          <Arrow45 className="w-4 h-4" />
          Drag
        </div>
      </motion.div>
    </section>
  );
}
