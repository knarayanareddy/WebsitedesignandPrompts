import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './index.css';

const container: HTMLElement | null = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      {/* reducedMotion="user": framer-motion drops transform animations (keeps
          opacity fades) whenever the OS prefers-reduced-motion setting is on. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StrictMode>,
  );
}
