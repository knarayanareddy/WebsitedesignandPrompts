import { motion, useAnimationControls } from 'framer-motion';

const spring = { type: 'spring', stiffness: 350, damping: 28 } as const;

interface SquashHamburgerProps {
  open: boolean;
  onToggle: () => void;
}

/**
 * Hamburger that squashes vertically on every toggle and
 * morphs into an X when the menu is open.
 */
export default function SquashHamburger({ open, onToggle }: SquashHamburgerProps) {
  const squash = useAnimationControls();

  const handleClick = () => {
    squash.start({
      scaleY: [1, 0.45, 1],
      transition: { duration: 0.36, times: [0, 0.35, 1], ease: 'easeOut' },
    });
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] focus:outline-none"
    >
      <motion.span animate={squash} className="relative block h-5 w-5">
        <motion.span
          className="absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-white"
          animate={open ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
          transition={spring}
        />
        <motion.span
          className="absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-white"
          animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={spring}
        />
        <motion.span
          className="absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-white"
          animate={open ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
          transition={spring}
        />
      </motion.span>
    </button>
  );
}
