import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({ children, className, delay = 0 }: RevealProps): JSX.Element {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
