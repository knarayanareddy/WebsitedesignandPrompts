import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  readonly ready: boolean;
  readonly onNavigate: (target: string) => void;
}

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Journal', href: '#journal' },
  { label: 'Explorations', href: '#explorations' },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar({ ready, onNavigate }: NavbarProps): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5"
      initial={{ opacity: 0, y: -24 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      aria-label="Primary"
    >
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2 py-1.5 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(event: MouseEvent<HTMLAnchorElement>) => handleLinkClick(event, '#home')}
          className="group/logo relative mr-1 grid h-10 w-10 shrink-0 place-items-center"
          aria-label="Michael Smith — home"
        >
          <span
            aria-hidden="true"
            className="accent-gradient animate-gradient-shift absolute inset-0 rounded-full bg-[length:200%_100%] opacity-0 blur-[2px] transition-opacity duration-300 group-hover/logo:opacity-100"
          />
          <span aria-hidden="true" className="absolute inset-[1.5px] rounded-full bg-stroke" />
          <span className="relative z-10 font-display text-sm italic text-text-primary">MS</span>
        </a>

        {/* Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item: NavItem) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => handleLinkClick(event, item.href)}
              className="rounded-full px-3.5 py-2 text-[13px] text-muted transition-colors hover:text-text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Say Hi CTA */}
        <a
          href="#contact"
          onClick={(event: MouseEvent<HTMLAnchorElement>) => handleLinkClick(event, '#contact')}
          className="gradient-ring-hover ml-1 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:bg-white/10"
        >
          Say Hi
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.nav>
  );
}
