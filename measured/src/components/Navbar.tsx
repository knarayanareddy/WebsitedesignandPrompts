import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Logo } from './Logo';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LINKS = [
  { label: 'Device', href: '#hero' },
  { label: 'Science', href: '#science' },
  { label: 'Real Stories', href: '#stories' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'Reserve', href: '#reserve' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // While the drawer is open: lock scroll, move focus inside, trap Tab, close on
  // Escape, and hand focus back to the hamburger when it closes.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const nodes = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
      openBtnRef.current?.focus();
    };
  }, [open]);

  // close if resized up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="relative flex items-center justify-between px-6 pt-6 md:px-10">
          <a href="#hero" aria-label="Measured — back to top" className="shrink-0">
            <Logo />
          </a>

          {/* center nav pill */}
          <nav
            aria-label="Primary"
            className="liquid-glass absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-full p-1 md:flex"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* right CTA pill */}
          <a
            href="#reserve"
            className="liquid-glass hidden items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 md:flex"
          >
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Reserve Yours
          </a>

          {/* mobile hamburger */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-white" />
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-white" />
            </span>
          </button>
        </div>
      </header>

      {/* fullscreen drawer */}
      {open && (
        <div
          ref={drawerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[55] flex flex-col bg-[#0a0a0a] md:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <a href="#hero" onClick={() => setOpen(false)} aria-label="Measured — home">
              <Logo />
            </a>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span aria-hidden className="relative block h-3.5 w-3.5">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-white" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-white" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-3 px-8">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="drawer-item font-serif text-5xl leading-tight text-white/90 transition-colors hover:text-white"
                style={{ '--i': i } as CSSProperties}
              >
                <span className="mr-4 align-middle font-mono text-[10px] tracking-[0.3em] text-emerald-400/70">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="px-8 pb-10">
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="drawer-item flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black"
              style={{ '--i': 5 } as CSSProperties}
            >
              <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Reserve Yours
            </a>
            <p
              className="drawer-item mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35"
              style={{ '--i': 6 } as CSSProperties}
            >
              Batch 01 — Spring 2027
            </p>
          </div>
        </div>
      )}
    </>
  );
}
