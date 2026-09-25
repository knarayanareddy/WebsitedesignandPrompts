import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import App from './App';
import { setLenis } from './lib/scroll';
import './index.css';

// Lenis smooth scroll initialization
const lenis = new Lenis({ duration: 1.2 });
setLenis(lenis);

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
