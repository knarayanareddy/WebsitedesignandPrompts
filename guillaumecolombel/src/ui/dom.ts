/** Typed DOM lookups for the fixed UI shell. */
export const $ = <T extends HTMLElement = HTMLElement>(sel: string): T => {
  const el = document.querySelector<T>(sel);
  if (!el) throw new Error(`Missing element ${sel}`);
  return el;
};
export const body = document.body;

export const ui = {
  canvas: $<HTMLCanvasElement>('#gl'),
  header: $('#site-header'),
  brand: $<HTMLAnchorElement>('#site-header .brand'),
  navAbout: $<HTMLAnchorElement>('#nav-about'),
  navClose: $<HTMLButtonElement>('#nav-close'),
  index: $('#project-index'),
  sheet: $('#project-sheet'),
  sheetDesc: $('#sheet-desc'),
  sheetIdx: $('#sheet-idx'),
  sheetCredits: $('#sheet-credits'),
  sheetYear: $('#sheet-year'),
  sheetVisit: $<HTMLAnchorElement>('#sheet-visit'),
  visitRoll: $('#visit-roll'),
  prev: $<HTMLAnchorElement>('#project-prev'),
  next: $<HTMLAnchorElement>('#project-next'),
  about: $('#about-panel'),
  aboutName: $('#about-panel .name'),
  copyEmail: $<HTMLButtonElement>('#copy-email'),
  sound: $<HTMLButtonElement>('#sound-toggle'),
  loadPct: $('#load-pct'),
  noglList: $('#nogl-list'),
};
