import { useEffect, useId, useRef, useState } from 'react';
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
const DESKTOP_BREAKPOINT = '(min-width: 768px)';

export default function Navbar({ ready, onNavigate }: NavbarProps): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuId: string = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Mobile menu: Escape closes and returns focus; resizing to desktop closes it. */
  useEffect(() => {
    if (!menuOpen) return;

    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq: MediaQueryList = window.matchMedia(DESKTOP_BREAKPOINT);
    const handleBreakpoint = (event: MediaQueryListEvent): void => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    mq.addEventListener('change', handleBreakpoint);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      mq.removeEventListener('change', handleBreakpoint);
    };
  }, [menuOpen]);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-5"
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

        {/* Nav links (desktop) */}
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

        {/* Menu toggle (mobile) */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open: boolean) => !open)}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="ml-1 grid h-10 w-10 place-items-center rounded-full text-text-primary transition-colors hover:bg-white/10 md:hidden"
        >
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? 'translate-y-[5.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? '-translate-y-[5.5px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel (disclosure, below md) */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="mt-3 w-full max-w-xs rounded-3xl border border-white/10 bg-surface/95 p-2 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item: NavItem, index: number) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={(event: MouseEvent<HTMLAnchorElement>) => handleLinkClick(event, item.href)}
                className="block rounded-2xl px-4 py-3 text-base text-text-primary transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
