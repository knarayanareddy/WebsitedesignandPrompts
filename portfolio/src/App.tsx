import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';
import Lenis from 'lenis';
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

  /* ---- Lenis smooth scroll, synced with GSAP ScrollTrigger ---- */
  useEffect(() => {
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

    // Recalculate pinned sections once webfonts settle.
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
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

  const handleNavigate = useCallback((target: string): void => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      document.querySelector<HTMLElement>(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg font-body text-text-primary">
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
