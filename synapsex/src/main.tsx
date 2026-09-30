import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { setLenis } from './lib/scroll';
import { prefersReducedMotion } from './lib/motion';
import './index.css';

// Lenis smooth scroll: skipped entirely when the OS asks for reduced motion so
// the page falls back to native scrolling (scrollToId/scrollToTop handle both).
if (!prefersReducedMotion()) {
  const lenis = new Lenis({ duration: 1.2 });
  setLenis(lenis);

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* reducedMotion="user": framer-motion drops transform/layout animations
        (keeps opacity) whenever prefers-reduced-motion is set. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
);
