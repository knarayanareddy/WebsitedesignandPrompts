import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from '../lib/gsap';

interface ExplorationItem {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly hiRes: string;
}

const ITEMS: readonly ExplorationItem[] = [
  {
    id: 1,
    title: 'Chromatic Bloom',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Neon Fluidity',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Violet Static',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Liquid Geometry',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Executive Study',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Circuit Macro',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    hiRes: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
  },
];

const COLUMN_ONE_SPEED = 1.2;
const COLUMN_TWO_SPEED = 0.8;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExplorationCard({
  item,
  onSelect,
}: {
  readonly item: ExplorationItem;
  readonly onSelect: (item: ExplorationItem) => void;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group aspect-square w-full cursor-pointer overflow-hidden rounded-3xl border border-stroke bg-surface p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </button>
  );
}

export default function Explorations(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const columnOneRef = useRef<HTMLDivElement>(null);
  const columnTwoRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  /* Pinned stage + dual-speed parallax columns */
  useLayoutEffect(() => {
    const section: HTMLDivElement | null = sectionRef.current;
    const stage: HTMLDivElement | null = stageRef.current;
    const columnOne: HTMLDivElement | null = columnOneRef.current;
    const columnTwo: HTMLDivElement | null = columnTwoRef.current;

    if (!section || !stage || !columnOne || !columnTwo) return;

    const ctx = gsap.context(() => {
      const travel = (): number => window.innerHeight * 1.1;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        columnOne,
        { y: (): number => window.innerHeight * 0.18 },
        {
          y: (): number =>
            window.innerHeight * 0.18 - travel() * COLUMN_ONE_SPEED,
          ease: 'none',
        },
        0,
      );

      timeline.fromTo(
        columnTwo,
        { y: (): number => -window.innerHeight * 0.05 },
        {
          y: (): number =>
            -window.innerHeight * 0.05 - travel() * COLUMN_TWO_SPEED,
          ease: 'none',
        },
        0,
      );
    });

    return () => ctx.revert();
  }, []);

  /* Esc closes the lightbox */
  useEffect(() => {
    if (activeItem === null) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const closeLightbox = (): void => setActiveItem(null);

  const columnOneItems: readonly ExplorationItem[] = ITEMS.slice(0, 3);
  const columnTwoItems: readonly ExplorationItem[] = ITEMS.slice(3, 6);

  return (
    <section id="explorations" ref={sectionRef} className="relative min-h-[260vh]">
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
        {/* Dual parallax columns */}
        <div className="absolute inset-0 flex items-center justify-center gap-6 px-6 md:gap-10 md:px-16">
          <div ref={columnOneRef} className="flex w-1/2 max-w-[420px] flex-col gap-6 md:gap-8">
            {columnOneItems.map((item: ExplorationItem) => (
              <ExplorationCard key={item.id} item={item} onSelect={setActiveItem} />
            ))}
          </div>
          <div ref={columnTwoRef} className="flex w-1/2 max-w-[420px] flex-col gap-6 md:gap-8">
            {columnTwoItems.map((item: ExplorationItem) => (
              <ExplorationCard key={item.id} item={item} onSelect={setActiveItem} />
            ))}
          </div>
        </div>

        {/* Pinned center title */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="rounded-full border border-stroke bg-bg/70 px-8 py-5 backdrop-blur-xl">
            <h2 className="text-center font-display text-5xl italic text-text-primary md:text-7xl">
              Visual <span className="font-sans font-normal not-italic">playground</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {activeItem !== null && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
            >
              <img
                src={activeItem.hiRes}
                alt={activeItem.title}
                className="max-h-[72vh] w-full rounded-3xl border border-stroke object-contain"
              />
              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl italic text-text-primary md:text-3xl">
                  {activeItem.title}
                </h3>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-stroke bg-surface text-text-primary transition-all hover:scale-105 hover:border-white/40"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
