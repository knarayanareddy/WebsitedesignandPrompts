/**
 * HUMAN.md — Replicated Website & Engine Architecture
 * Author of Manifesto: Briana (Mazzio) May
 * 
 * This file documents and types the full interactive runtime, scene choreography,
 * HUD controllers, and Lenis/GSAP scroll engine.
 */

import './index.css';

export interface ManifestoChapter {
  id: string;
  number: number;
  title: string;
  color: string;
  angle: string;
  thumbnail: string;
  summary: string;
}

export const MANIFESTO_CHAPTERS: ManifestoChapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'break the rule on purpose',
    color: '#ff4b1f',
    angle: '-1.8deg',
    thumbnail: './assets/ch1.webp',
    summary: 'Models are trained on the average. The average is the floor, not the ceiling. Know the rule cold, and break it on purpose.',
  },
  {
    id: 'ch2',
    number: 2,
    title: 'find the thing in the weird place',
    color: '#3a7bd5',
    angle: '2.1deg',
    thumbnail: './assets/ch2.webp',
    summary: 'Inspiration does not live in the first ten search results. It lives in strange corners, misprinted tickets, and Magritte paintings.',
  },
  {
    id: 'ch3',
    number: 3,
    title: 'advocate for the human and humanity',
    color: '#aebf76',
    angle: '1.42deg',
    thumbnail: './assets/ch3.webp',
    summary: 'Every brief now has an invisible third party at the table. Someone has to keep asking: what does it feel like for the human on the other end?',
  },
  {
    id: 'ch4',
    number: 4,
    title: 'design for emotional resonance, not correctness',
    color: '#f7971e',
    angle: '-1.5deg',
    thumbnail: './assets/ch4.webp',
    summary: 'Tension. Surprise. Restraint. The photograph that is almost in focus. Correct is the lowest bar in the building.',
  },
  {
    id: 'ch5',
    number: 5,
    title: 'seek delight, not delivery',
    color: '#e056fd',
    angle: '1.8deg',
    thumbnail: './assets/ch5.webp',
    summary: 'Rather make one thing that makes someone laugh out loud on a train than ten things that merely meet the brief.',
  },
  {
    id: 'ch6',
    number: 6,
    title: 'experiment ruthlessly, ship more than you opine',
    color: '#22a6b3',
    angle: '-2.4deg',
    thumbnail: './assets/ch6.webp',
    summary: 'Make 50 things. Throw away 47. Talk about the 3. Do not become a person who mostly posts opinions about other people\'s work.',
  },
  {
    id: 'ch7',
    number: 7,
    title: 'own the output. fully.',
    color: '#eb4d4b',
    angle: '1.2deg',
    thumbnail: './assets/ch7.webp',
    summary: 'If the AI output is bad, the AI did not fail you. You failed it. Powerful tools reward the people who showed up sharp.',
  },
  {
    id: 'ch8',
    number: 8,
    title: 'design with it, not next to it',
    color: '#6ab04c',
    angle: '-1.7deg',
    thumbnail: './assets/ch8.webp',
    summary: 'Watching the generation happen is not the work. The work is the back-and-forth, the push, the loop, the hundredth iteration.',
  },
  {
    id: 'ch9',
    number: 9,
    title: 'play with purpose. and play for play.',
    color: '#f0932b',
    angle: '2.0deg',
    thumbnail: './assets/ch9.webp',
    summary: 'Both at the same time. Some days the play is in service of a thing; some days the play is the thing.',
  },
  {
    id: 'ch10',
    number: 10,
    title: 'be a builder and an ideas person',
    color: '#4834d4',
    angle: '-1.9deg',
    thumbnail: './assets/ch10.webp',
    summary: 'The split is fake. The people who can think of the thing and make the thing are going to eat.',
  },
];

export interface SiteSceneState {
  currentChapter: number | null;
  isIndexOpen: boolean;
  isWatching: boolean;
  scrollProgress: number;
}

/**
 * Initializes the HUD eye tracker and interactive controls
 */
export function initHUD() {
  const mug = document.querySelector<HTMLButtonElement>('.hud-mug');
  const mugEye = document.querySelector<HTMLElement>('.hud-mug__eye');
  const indexBtn = document.querySelector<HTMLButtonElement>('.hud-index');
  const watchBtn = document.querySelector<HTMLButtonElement>('.hud-watch');
  const indexNav = document.querySelector<HTMLElement>('nav.index');

  if (mug && mugEye) {
    window.addEventListener('mousemove', (e) => {
      const rect = mug.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 40, 4);
      const x = 50 + Math.cos(angle) * dist * 10;
      const y = 50 + Math.sin(angle) * dist * 10;
      mugEye.style.setProperty('--mug-x', `${x}%`);
      mugEye.style.setProperty('--mug-y', `${y}%`);
    });
  }

  if (indexBtn && indexNav) {
    indexBtn.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('index-open');
      indexNav.setAttribute('aria-hidden', (!isOpen).toString());
    });
  }

  if (watchBtn) {
    watchBtn.addEventListener('click', () => {
      document.body.classList.toggle('is-watching');
    });
  }
}

// Lifecycle boot
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initHUD();
  });
}
