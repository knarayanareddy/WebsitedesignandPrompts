import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './lib/motion';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Works from './components/Works';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  /* ---- Lenis smooth scroll, synced with GSAP ScrollTrigger ----
     Skipped entirely under prefers-reduced-motion: the page then uses native
     scrolling and ScrollTrigger listens to the window directly. */
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  /* ---- Recalculate pinned sections once webfonts settle ---- */
  useEffect(() => {
    if (!document.fonts) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- Lock scroll while the preloader runs ---- */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (isLoading) {
      lenis?.stop();
      return;
    }
    lenis?.start();
    const refreshId: number = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
    return () => window.clearTimeout(refreshId);
  }, [isLoading]);

  const handleLoadingComplete = useCallback((): void => {
    setIsLoading(false);
  }, []);

  const handleNavigate = useCallback(
    (target: string): void => {
      const lenis = lenisRef.current;
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, { duration: 1.4 });
      } else {
        document
          .querySelector<HTMLElement>(target)
          ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reducedMotion],
  );

  return (
    <div className="min-h-svh bg-bg font-body text-text-primary">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <main>
        <Hero ready={!isLoading} onNavigate={handleNavigate} />
        <Works />
        <Journal />
        <Explorations />
        <Stats />
        <Footer />
      </main>
    </div>
  );
}
