import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/** Register the shared Lenis instance so UI code can drive smooth scrolling. */
export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

/** Smooth-scroll to a section by element id (offset clears the fixed navbar). */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -96 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/** Smooth-scroll back to the very top. */
export function scrollToTop(): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
