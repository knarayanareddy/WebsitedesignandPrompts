import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';
import { scrollToId, scrollToTop } from '../lib/scroll';

const menuSpring = { type: 'spring', stiffness: 350, damping: 28 } as const;

const LINKS = [
  { label: 'About', target: 'about' },
  { label: 'Metrics', target: 'metrics' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  // On narrow screens the side capsules fade away while the menu expands.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const sideHidden = open && isNarrow;

  const go = (target: string) => {
    scrollToId(target);
    setOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-20">
      <div className="mx-auto flex h-full items-center justify-between px-3 md:px-6">
        {/* Left group: logo capsule + expanding menu capsule */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex h-12 items-center gap-3 rounded-[14px] bg-white/15 px-5 backdrop-blur-md"
            animate={{ opacity: sideHidden ? 0 : 1, scale: sideHidden ? 0.92 : 1 }}
            transition={menuSpring}
            style={{ pointerEvents: sideHidden ? 'none' : 'auto' }}
            aria-label="SynapseX home"
          >
            <SynapseXLogo className="h-6 w-6 shrink-0 text-white" />
            <span className="whitespace-nowrap text-sm font-bold tracking-wider">SynapseX</span>
          </motion.a>

          <motion.div
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            initial={false}
            animate={{ width: open ? 290 : 48 }}
            transition={menuSpring}
          >
            <SquashHamburger open={open} onToggle={() => setOpen((o) => !o)} />
            <div className="flex items-center gap-7 whitespace-nowrap pl-2 pr-7">
              {LINKS.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => go(link.target)}
                  className="text-sm tracking-wider text-white/90 transition-colors hover:text-white"
                  tabIndex={open ? 0 : -1}
                >
                  <ScrambleText text={link.label} />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: download pill with inline Apple mark */}
        <motion.a
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('footer');
          }}
          className="flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-white px-5 text-black transition-colors hover:bg-white/85 md:px-6"
          animate={{ opacity: sideHidden ? 0 : 1, scale: sideHidden ? 0.92 : 1 }}
          transition={menuSpring}
          style={{ pointerEvents: sideHidden ? 'none' : 'auto' }}
          tabIndex={sideHidden ? -1 : 0}
        >
          {/* Inline crisp Apple logo SVG (no icon font / CDN) */}
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            shapeRendering="geometricPrecision"
          >
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
          </svg>
          <ScrambleText
            text="Download"
            className="text-sm font-bold tracking-wider"
          />
        </motion.a>
      </div>
    </nav>
  );
}
