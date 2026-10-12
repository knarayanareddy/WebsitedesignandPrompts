import * as THREE from 'three';
import { gsap } from 'gsap';
import { PROJECTS, type Project } from '@/data/projects';
import { TUNE } from '@/tune';
import { clamp, lerp, damp, lerpProject, REDUCED, COARSE, type BlendedParams } from '@/lib/math';
import { steleUniforms, steleGroup, cellMeshes, neighbors, coreMesh, debris, debrisState, sheetUniforms, sheetMesh, sheetGroup, STONE, type CellMesh } from '@/scene/stele';
import { drum, labels, buildDrum, layoutDrum } from '@/scene/drum';
import { landUniforms, addLandscape, water, grass, GRASS_N, birds, birdGeo, birdState } from '@/scene/landscape';
import { createPost, TRAIL_N } from '@/scene/post';
import { SoundEngine } from '@/audio/engine';
import { ui, body } from '@/ui/dom';

const N = PROJECTS.length;

/* ------------------------------------------------------------------ */
/*  Renderer                                                           */
/* ------------------------------------------------------------------ */
function createRenderer(): THREE.WebGLRenderer | null {
  try {
    const r = new THREE.WebGLRenderer({ canvas: ui.canvas, antialias: false, powerPreference: 'high-performance', alpha: false });
    if (!r.getContext()) return null;
    return r;
  } catch {
    return null;
  }
}

export function start() {
  const renderer = createRenderer();
  if (!renderer) {
    body.classList.add('stone-off', 'stele-ui');
    ui.noglList.innerHTML = PROJECTS.map((p) => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a> — ${p.description} <em>(${p.year})</em></li>`).join('');
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, COARSE ? 1.25 : 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
  const CAM = { baseZ: 6.2, baseY: 1.35, lookY: 1.02 };

  scene.add(steleGroup, coreMesh, debris, sheetGroup, drum);
  buildDrum(PROJECTS, renderer.capabilities.getMaxAnisotropy());
  addLandscape(scene);
  const { composer, bloom, frostUniforms } = createPost(renderer, scene, camera);
  const sound = new SoundEngine();

  /* ---------------------------------------------------------------- */
  /*  State                                                            */
  /* ---------------------------------------------------------------- */
  const state = {
    pos: 0, target: 0, active: 0, lastWheelAt: 0,
    open: -1, openT: 0, about: false, aboutShift: 0,
    hold: 0, holding: false, holdTimer: 0, dragging: false, dragMoved: 0,
    hoverCell: null as CellMesh | null, pointerOn: 0,
    pointerWorld: new THREE.Vector3(0, -10, 0), pointerGround: new THREE.Vector3(),
    px: 0, py: 0, sx: 0, sy: 0, viewMul: 1,
  };
  const pointerNDC = new THREE.Vector2(-2, -2);
  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const trail = Array.from({ length: TRAIL_N }, () => ({ x: -1, y: -1, t: -10 }));
  let trailIdx = 0; let lastTrail = { x: 0, y: 0 };
  const clock = new THREE.Clock();
  let curParams: BlendedParams = lerpProject(PROJECTS[0], PROJECTS[0], 0);

  /* ---------------------------------------------------------------- */
  /*  Covers (with graceful procedural fallback)                       */
  /* ---------------------------------------------------------------- */
  const texLoader = new THREE.TextureLoader(); texLoader.crossOrigin = 'anonymous';
  function fallbackCover(p: Project) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 640; const x = c.getContext('2d')!;
    const col = `rgb(${Math.round(clamp(p.color[0], 0, 1) * 255)},${Math.round(clamp(p.color[1], 0, 1) * 255)},${Math.round(clamp(p.color[2], 0, 1) * 255)})`;
    const g = x.createLinearGradient(0, 0, 1024, 640); g.addColorStop(0, '#141010'); g.addColorStop(0.55, col); g.addColorStop(1, '#f4f2ee');
    x.fillStyle = g; x.fillRect(0, 0, 1024, 640);
    x.fillStyle = 'rgba(5,4,4,0.75)'; x.font = '800 150px Inter, system-ui, sans-serif'; x.textAlign = 'center'; x.fillText(p.wheel[0], 512, 370);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const covers: (THREE.Texture | null)[] = Array.from({ length: N }, () => null); let loadedCount = 0;
  function setProgress() {
    const pr = clamp(0.05 + (0.95 * loadedCount) / N, 0, 1);
    document.documentElement.style.setProperty('--stele-progress', pr.toFixed(3));
    ui.loadPct.textContent = String(Math.round(pr * 100)).padStart(2, '0');
  }
  const coverPromises = PROJECTS.map((p, i) => new Promise<void>((res) => {
    const done = (t: THREE.Texture) => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; t.anisotropy = 4; covers[i] = t; loadedCount++; setProgress(); res(); };
    const timer = setTimeout(() => { if (!covers[i]) done(fallbackCover(p)); }, 9000);
    texLoader.load(p.coverImage, (t) => { clearTimeout(timer); if (!covers[i]) done(t); }, undefined, () => { clearTimeout(timer); if (!covers[i]) done(fallbackCover(p)); });
  }));
  const coverOf = (i: number) => covers[i] ?? (covers[i] = fallbackCover(PROJECTS[i]));
  const coverAspect = (t: THREE.Texture) => { const im = t.image as { width?: number; height?: number } | undefined; return im?.width && im.height ? im.width / im.height : 1.6; };

  /* ---------------------------------------------------------------- */
  /*  Pointer / wheel / keyboard                                       */
  /* ---------------------------------------------------------------- */
  function setPointer(e: PointerEvent) {
    state.px = e.clientX / innerWidth; state.py = e.clientY / innerHeight;
    pointerNDC.set(state.px * 2 - 1, -(state.py * 2 - 1));
    const dx = state.px - lastTrail.x, dy = state.py - lastTrail.y;
    if (dx * dx + dy * dy > 0.0004) { lastTrail = { x: state.px, y: state.py }; const t = trail[trailIdx++ % TRAIL_N]; t.x = state.px; t.y = 1 - state.py; t.t = clock.elapsedTime; }
  }
  const markScrolled = () => { state.lastWheelAt = performance.now(); body.classList.add('has-scrolled'); };
  ui.canvas.addEventListener('pointermove', (e) => {
    setPointer(e);
    if (!state.dragging) return;
    const d = e.movementX + e.movementY * 0.6; state.dragMoved += Math.abs(d);
    if (state.open < 0 && !state.about) { state.target = clamp(state.target - d * 0.004 * (state.holding ? 1.8 : 1), 0, N - 1); markScrolled(); }
  });
  ui.canvas.addEventListener('pointerdown', (e) => {
    setPointer(e); state.dragging = true; state.dragMoved = 0; ui.canvas.setPointerCapture(e.pointerId);
    clearTimeout(state.holdTimer);
    if (state.open < 0 && !state.about) state.holdTimer = window.setTimeout(() => { if (state.dragging) { state.holding = true; body.classList.add('is-jogging'); } }, 260);
  });
  window.addEventListener('pointerup', () => {
    if (!state.dragging) return;
    state.dragging = false; clearTimeout(state.holdTimer);
    const wasHold = state.holding; state.holding = false; body.classList.remove('is-jogging');
    if (wasHold || state.dragMoved > 6) { state.target = clamp(Math.round(state.target), 0, N - 1); return; }
    if (state.about) return;
    if (state.open >= 0) { if (!state.hoverCell) closeProject(); return; }
    if (state.hoverCell) openProject(state.active);
  });
  ui.canvas.addEventListener('pointerleave', () => pointerNDC.set(-2, -2));
  window.addEventListener('wheel', (e) => {
    if (state.open >= 0 || state.about) return;
    const d = clamp(e.deltaY, -120, 120) * (e.deltaMode === 1 ? 20 : 1);
    state.target = clamp(state.target + d * 0.0024, 0, N - 1); markScrolled();
  }, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') { e.preventDefault(); void openDebug(); return; }
    if (e.key === 'Escape') { if (state.open >= 0) closeProject(); else if (state.about) closeAbout(); return; }
    if (e.target instanceof HTMLElement && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    if (e.key === 'Enter' && state.open < 0 && !state.about && document.activeElement === body) openProject(state.active);
  });
  function step(dir: number) {
    if (state.about) return;
    const next = clamp((state.open >= 0 ? state.open : Math.round(state.target)) + dir, 0, N - 1);
    if (state.open >= 0) { if (next !== state.open) switchProject(next); }
    else { state.target = next; markScrolled(); }
  }

  /* ---------------------------------------------------------------- */
  /*  Project index dots                                               */
  /* ---------------------------------------------------------------- */
  PROJECTS.forEach((p, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `${p.title} — project ${i + 1} of ${N}`); b.innerHTML = '<i></i>';
    b.addEventListener('click', () => { if (state.open >= 0) return; state.target = i; if (Math.abs(state.pos - i) < 0.01) openProject(i); });
    ui.index.appendChild(b);
  });
  const syncIndex = () => ui.index.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', i === state.active ? 'true' : 'false'));

  /* ---------------------------------------------------------------- */
  /*  Project sheet                                                    */
  /* ---------------------------------------------------------------- */
  'Visit website'.split('').forEach((ch, i) => {
    const s = document.createElement('span'); s.className = 'char'; s.style.setProperty('--i', String(i));
    const c = ch === ' ' ? '\u00a0' : ch; s.dataset.char = c; s.textContent = c; ui.visitRoll.appendChild(s);
  });
  function fillSheet(i: number) {
    const p = PROJECTS[i];
    ui.sheetDesc.textContent = p.description; ui.sheetIdx.textContent = String(i + 1).padStart(2, '0');
    ui.sheetCredits.textContent = p.credits || p.title; ui.sheetYear.textContent = `© ${p.year}`; ui.sheetVisit.href = p.url;
  }
  const sheetLines = () => ui.sheet.querySelectorAll('.line');
  const animateSheetIn = () => gsap.fromTo(sheetLines(), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, delay: 0.3, overwrite: true });
  const animateSheetOut = () => gsap.to(sheetLines(), { yPercent: 110, duration: 0.4, ease: 'power2.in', stagger: 0.03, overwrite: true });
  ui.prev.addEventListener('click', (e) => { e.preventDefault(); step(-1); });
  ui.next.addEventListener('click', (e) => { e.preventDefault(); step(1); });

  /* ---------------------------------------------------------------- */
  /*  Open / close / switch project                                    */
  /* ---------------------------------------------------------------- */
  let openTween: gsap.core.Timeline | null = null;
  const setNav = (closeMode: boolean) => { ui.navAbout.hidden = closeMode; ui.navClose.hidden = !closeMode; };
  function openProject(i: number, silent = false) {
    if (state.open >= 0 || state.about) return;
    state.open = i; state.target = i; body.classList.add('is-open');
    fillSheet(i); ui.sheet.classList.add('is-visible'); ui.prev.classList.toggle('is-visible', i > 0); ui.next.classList.toggle('is-visible', i < N - 1); animateSheetIn();
    setNav(true);
    const cov = coverOf(i); sheetUniforms.uMap.value = cov; sheetGroup.visible = true; sheetMesh.scale.set(1, 1.6 / coverAspect(cov), 1);
    if (!silent) sound.break();
    debris.visible = true; debrisState.forEach((d) => { d.life = 0; });
    openTween?.kill();
    openTween = gsap.timeline()
      .to(state, { openT: 1, duration: 1.4, ease: 'elastic.out(1, 0.55)' }, 0)
      .to(sheetUniforms.uOpacity, { value: 1, duration: 0.5, ease: 'power2.out' }, 0.12)
      .to(sheetUniforms.uUnfold, { value: 1, duration: 1.3, ease: 'power3.out' }, 0.18)
      .to(sheetUniforms.uFold, { value: 0, duration: 1.1, ease: 'power3.inOut' }, 0.18);
    setHash(`#/projects/${PROJECTS[i].slug}`);
  }
  function closeProject() {
    if (state.open < 0) return;
    state.open = -1; body.classList.remove('is-open'); ui.sheet.classList.remove('is-visible'); ui.prev.classList.remove('is-visible'); ui.next.classList.remove('is-visible'); animateSheetOut();
    setNav(false); sound.close();
    openTween?.kill();
    openTween = gsap.timeline({ onComplete: () => { sheetGroup.visible = false; debris.visible = false; } })
      .to(sheetUniforms.uFold, { value: 1, duration: 0.5, ease: 'power3.in' }, 0)
      .to(sheetUniforms.uUnfold, { value: 0, duration: 0.5, ease: 'power3.in' }, 0)
      .to(sheetUniforms.uOpacity, { value: 0, duration: 0.3, ease: 'power2.in' }, 0.25)
      .to(state, { openT: 0, duration: 0.9, ease: 'elastic.out(1, 0.7)' }, 0.3);
    setHash('#/');
  }
  function switchProject(i: number) {
    state.open = i; state.target = i; sound.wheel();
    ui.prev.classList.toggle('is-visible', i > 0); ui.next.classList.toggle('is-visible', i < N - 1);
    animateSheetOut();
    gsap.timeline()
      .to(sheetUniforms.uFold, { value: 0.8, duration: 0.35, ease: 'power2.in' }, 0)
      .to(sheetUniforms.uOpacity, { value: 0.2, duration: 0.3 }, 0)
      .call(() => { const cov = coverOf(i); sheetUniforms.uMap.value = cov; sheetMesh.scale.set(1, 1.6 / coverAspect(cov), 1); fillSheet(i); animateSheetIn(); })
      .to(sheetUniforms.uFold, { value: 0, duration: 0.9, ease: 'power3.out' })
      .to(sheetUniforms.uOpacity, { value: 1, duration: 0.5 }, '<');
    setHash(`#/projects/${PROJECTS[i].slug}`);
  }

  /* ---------------------------------------------------------------- */
  /*  About route                                                      */
  /* ---------------------------------------------------------------- */
  let aboutTl: gsap.core.Timeline | null = null;
  function openAbout() {
    if (state.about) return; if (state.open >= 0) closeProject();
    state.about = true; body.classList.add('is-about', 'stele-about-route'); ui.about.classList.add('is-active');
    setNav(true); sound.about(true);
    // FLIP: header brand → bio name
    const a = ui.brand.getBoundingClientRect();
    gsap.set(ui.aboutName, { clearProps: 'transform' });
    const b = ui.aboutName.getBoundingClientRect();
    body.classList.add('brand-flipped');
    gsap.fromTo(ui.aboutName, { x: a.left - b.left, y: a.top - b.top, scale: a.width / b.width }, { x: 0, y: 0, scale: 1, duration: 1.0, ease: 'power3.inOut', onComplete: () => ui.about.classList.add('is-live') });
    aboutTl?.kill();
    aboutTl = gsap.timeline()
      .fromTo('#about-panel .rest', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.5)
      .fromTo('#about-panel .line', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.045 }, 0.45)
      .to(state, { aboutShift: 1, duration: 1.3, ease: 'power3.inOut' }, 0)
      .to(steleUniforms.uErode, { value: 1, duration: 1.6, ease: 'power2.inOut' }, 0.2)
      .to(coreMesh.material, { opacity: 1, duration: 0.8 }, 0.6);
    setHash('#/about');
  }
  function closeAbout() {
    if (!state.about) return;
    state.about = false; body.classList.remove('is-about', 'stele-about-route'); ui.about.classList.remove('is-live');
    setNav(false); sound.about(false);
    const b = ui.aboutName.getBoundingClientRect(); const a = ui.brand.getBoundingClientRect();
    gsap.to(ui.aboutName, { x: a.left - b.left, y: a.top - b.top, scale: a.width / b.width, duration: 0.8, ease: 'power3.inOut', onComplete: () => { body.classList.remove('brand-flipped'); gsap.set(ui.aboutName, { clearProps: 'transform' }); ui.about.classList.remove('is-active'); } });
    aboutTl?.kill();
    aboutTl = gsap.timeline()
      .to('#about-panel .line', { yPercent: 110, duration: 0.45, ease: 'power2.in', stagger: 0.02 }, 0)
      .to('#about-panel .rest', { opacity: 0, duration: 0.4 }, 0)
      .to(state, { aboutShift: 0, duration: 1.1, ease: 'power3.inOut' }, 0.1)
      .to(steleUniforms.uErode, { value: 0, duration: 1.0, ease: 'power2.inOut' }, 0)
      .to(coreMesh.material, { opacity: 0, duration: 0.5 }, 0);
    setHash('#/');
  }
  ui.navAbout.addEventListener('click', (e) => { e.preventDefault(); openAbout(); });
  ui.navClose.addEventListener('click', () => { if (state.open >= 0) closeProject(); else closeAbout(); });
  ui.brand.addEventListener('click', (e) => { e.preventDefault(); if (state.open >= 0) closeProject(); if (state.about) closeAbout(); });
  ui.aboutName.querySelector('a')?.addEventListener('click', (e) => { e.preventDefault(); closeAbout(); });
  let copyTimer = 0;
  ui.copyEmail.addEventListener('click', async () => {
    const btn = ui.copyEmail; const row = btn.querySelector('.row')!; const email = btn.dataset.email ?? '';
    try { await navigator.clipboard.writeText(email); } catch { /* clipboard unavailable: still show feedback */ }
    btn.classList.add('is-copied'); row.textContent = 'Copied';
    clearTimeout(copyTimer); copyTimer = window.setTimeout(() => { btn.classList.remove('is-copied'); row.textContent = 'Copy email'; }, 1800);
  });

  /* ---------------------------------------------------------------- */
  /*  Hash routes                                                      */
  /* ---------------------------------------------------------------- */
  function setHash(h: string) { if (location.hash !== h) history.replaceState(null, '', h); }
  function routeFromHash() {
    const h = location.hash.replace(/^#\/?/, '');
    if (h === 'about') { if (!state.about) openAbout(); return; }
    const m = h.match(/^projects\/(.+)$/);
    if (m) {
      const i = PROJECTS.findIndex((p) => p.slug === m[1]);
      if (i >= 0) { if (state.about) closeAbout(); if (state.open !== i) { state.pos = state.target = i; if (state.open < 0) openProject(i, true); else switchProject(i); } }
      return;
    }
    if (state.open >= 0) closeProject();
    if (state.about) closeAbout();
  }
  window.addEventListener('hashchange', routeFromHash);

  /* ---------------------------------------------------------------- */
  /*  Sound toggle & debug inspector                                   */
  /* ---------------------------------------------------------------- */
  ui.sound.addEventListener('click', () => { const on = sound.toggle(); ui.sound.classList.toggle('is-on', on); ui.sound.setAttribute('aria-pressed', String(on)); });

  let gui: import('lil-gui').GUI | null = null;
  async function openDebug() {
    if (gui) { gui.show(gui._hidden); return; }
    try {
      const { default: GUI } = await import('lil-gui');
      gui = new GUI({ title: 'Stele inspector' });
      for (const [folder, obj] of Object.entries(TUNE) as [string, Record<string, number>][]) {
        const f = gui.addFolder(folder); f.close();
        for (const k of Object.keys(obj)) f.add(obj, k, 0, Math.max(3, obj[k] * 3), 0.001).onChange(() => layoutDrum());
      }
      const act = {
        'Copy project preset': () => { const p = PROJECTS[state.active]; const txt = JSON.stringify({ color: p.color, matter: p.matter, scene: p.scene }, null, 2); void navigator.clipboard?.writeText(txt); console.log(txt); },
        'Toggle stone': () => body.classList.toggle('stone-off'),
      };
      gui.add(act, 'Copy project preset'); gui.add(act, 'Toggle stone');
    } catch (e) { console.warn('Inspector unavailable', e); }
  }
  if (new URLSearchParams(location.search).has('debug')) void openDebug();

  /* ---------------------------------------------------------------- */
  /*  Frame loop                                                       */
  /* ---------------------------------------------------------------- */
  const tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3(), camTarget = new THREE.Vector3();
  const dm = new THREE.Matrix4(), dq = new THREE.Quaternion(), ds = new THREE.Vector3(), de = new THREE.Euler();

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer!.setSize(w, h, false); composer.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const pr = renderer!.getPixelRatio(); frostUniforms.uRes.value.set(w * pr, h * pr);
  }
  addEventListener('resize', resize); resize();

  function updateCells(dt: number) {
    let hit: THREE.Intersection | null = null;
    if (pointerNDC.x > -1.5 && !state.holding) {
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(cellMeshes, false);
      if (hits.length) hit = hits[0];
      if (!raycaster.ray.intersectPlane(groundPlane, state.pointerGround)) state.pointerGround.set(0, 0, 0);
    }
    const hovering = !!hit && !state.about;
    state.hoverCell = hovering ? (hit!.object as CellMesh) : null;
    body.classList.toggle('is-stone-hover', hovering && state.open < 0);
    if (hovering) state.pointerWorld.copy(hit!.point);
    state.pointerOn = damp(state.pointerOn, hovering ? 1 : 0, 10, dt);
    steleUniforms.uPointer.value.copy(state.pointerWorld); steleUniforms.uPointerOn.value = state.pointerOn;
    landUniforms.uPointerGround.value.copy(state.pointerGround);
    landUniforms.uPointerOn.value = damp(landUniforms.uPointerOn.value, pointerNDC.x > -1.5 ? 1 : 0, 6, dt);
    if (hovering) landUniforms.uStir.value.set(state.pointerGround.x, state.pointerGround.z, 1, 0);
    landUniforms.uStir.value.z = damp(landUniforms.uStir.value.z, 0, 2.5, dt) * TUNE.Decor.waterStir;
    if (hovering && state.hoverCell) sound.hover(state.hoverCell.userData.heat, dt);

    const F = TUNE.Fracture;
    for (const m of cellMeshes) {
      const u = m.userData;
      const isHot = m === state.hoverCell;
      const near = !!state.hoverCell && neighbors[u.idx].includes(state.hoverCell);
      const targetHeat = isHot ? 1 : near ? 0.45 : 0;
      u.heat = targetHeat > u.heat ? damp(u.heat, targetHeat, F.conductionRate, dt) : damp(u.heat, targetHeat, F.decay, dt);
      const o = state.openT;
      tmpV.copy(u.dir).multiplyScalar(o * F.openOffset * (0.8 + u.seed * 0.5));
      tmpV.y += o * 0.18 * (u.seed - 0.3);
      tmpV2.copy(u.center).sub(STONE.center).normalize().multiplyScalar(u.heat * F.spread);
      tmpV.add(tmpV2); tmpV.z += u.heat * F.lift;
      m.position.copy(u.center).add(tmpV);
      m.rotation.set(u.rot.x * o, u.rot.y * o, u.rot.z * o);
    }
    if (debris.visible) {
      debrisState.forEach((d, i) => {
        d.life += dt;
        const t = Math.min(d.life, 3);
        const life = clamp(1 - t / 2.6, 0, 1) * state.openT;
        const px = d.v.x * t * 0.6, py = d.y0 + d.v.y * t * 0.6 - 1.2 * t * t, pz = d.v.z * t * 0.6;
        dq.setFromEuler(de.set(t * 3 + i, t * 2, t)); ds.setScalar(d.s * life);
        dm.compose(tmpV.set(px, Math.max(py, 0.02), pz), dq, ds); debris.setMatrixAt(i, dm);
      });
      debris.instanceMatrix.needsUpdate = true;
      debris.material.color.setRGB(curParams.color[0] * 1.3, curParams.color[1] * 1.3, curParams.color[2] * 1.3);
    }
  }

  function tick() {
    requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime;
    steleUniforms.uTime.value = t; sheetUniforms.uTime.value = t; frostUniforms.uTime.value = t;

    // drum motion & magnetic snapping
    if (state.open < 0 && !state.holding && performance.now() - state.lastWheelAt > 140) state.target = damp(state.target, Math.round(state.target), TUNE.Roue.snapStrength, dt);
    state.pos = damp(state.pos, state.target, state.holding ? 9 : 6, dt);
    const nearest = clamp(Math.round(state.pos), 0, N - 1);
    if (nearest !== state.active) { state.active = nearest; sound.wheel(); syncIndex(); }
    const i0 = clamp(Math.floor(state.pos), 0, N - 1), i1 = clamp(i0 + 1, 0, N - 1), f = clamp(state.pos - i0, 0, 1);
    curParams = lerpProject(PROJECTS[i0], PROJECTS[i1], f);

    // uniforms from blended project + tuning
    const M = TUNE.Matiere, S = steleUniforms, L = landUniforms;
    S.uColor.value.set(curParams.color[0], curParams.color[1], curParams.color[2]);
    S.uDensity.value = curParams.matter.density * M.density; S.uVeins.value = curParams.matter.veins * M.veins; S.uVeinScale.value = curParams.matter.veinScale * M.veinScale;
    S.uBands.value = curParams.matter.bands * M.bands; S.uBandScale.value = curParams.matter.bandScale * M.bandScale;
    S.uNight.value = curParams.scene.night; L.uNight.value = curParams.scene.night; L.uSkyDim.value = curParams.scene.skyDim;
    L.uRelief.value = curParams.scene.relief; L.uMist.value = curParams.scene.mist;
    water.position.y = curParams.scene.water; water.visible = curParams.scene.water > -0.11;
    grass.count = Math.max(0, Math.floor(GRASS_N * clamp(curParams.scene.flora, 0, 1)));
    L.uPointerGlow.value = TUNE.Decor.pointerGlow; L.uSteleGlow.value = TUNE.Decor.steleGlow; L.uFloraBend.value = TUNE.Decor.floraBend; L.uWaterReflect.value = TUNE.Decor.waterReflect; L.uWaterRipple.value = TUNE.Decor.waterRipple; L.uCaustics.value = TUNE.Lanterne.caustics;
    S.uIntensity.value = TUNE.Source.intensity; S.uAmbient.value = TUNE.Lumiere.ambient; S.uRim.value = TUNE.Lumiere.rim; S.uPointerRadius.value = TUNE.Fracture.pointerRadius;
    S.uInclDepth.value = TUNE.Inclusion.depth; S.uIor.value = TUNE.Inclusion.ior; S.uParallax.value = TUNE.Inclusion.parallax; S.uFrost.value = TUNE.Inclusion.frost; S.uErodeRelief.value = TUNE.Lanterne.erodeRelief;
    bloom.strength = TUNE.Lumiere.bloom; bloom.threshold = TUNE.Lumiere.bloomThreshold; bloom.radius = TUNE.Lumiere.bloomRadius;
    frostUniforms.uFrost.value = TUNE.Fluide.frostAmp; frostUniforms.uWarp.value = TUNE.Fluide.frostWarp; frostUniforms.uVignette.value = TUNE.Post.vignette; frostUniforms.uGrain.value = TUNE.Post.grain;
    S.uLightPos.value.set(Math.sin(t * 0.37) * 0.08 * TUNE.Source.drift, TUNE.Source.height + Math.sin(t * 0.23) * 0.12 * TUNE.Source.drift, Math.cos(t * 0.31) * 0.05 * TUNE.Source.drift);
    S.uIncl.value = clamp(1 - Math.abs(state.pos - state.active) * 2.2, 0, 1) * TUNE.Inclusion.strength;
    const cov = covers[state.active]; if (cov && S.uCover.value !== cov) { S.uCover.value = cov; S.uCoverAspect.value = coverAspect(cov); }
    S.uOpen.value = state.openT;
    const breath = (Math.sin(t * 1.3 * TUNE.Lanterne.orgSpeed) * 0.5 + 0.5) * TUNE.Lanterne.breath;
    S.uBreath.value = breath; coreMesh.scale.setScalar(0.85 + breath * 0.35);
    coreMesh.position.set(0.02 + Math.sin(t * 0.7) * 0.03, 1.12 + Math.sin(t * 0.9) * 0.05, Math.cos(t * 0.6) * 0.02);
    coreMesh.visible = coreMesh.material.opacity > 0.01;

    // drum
    const R = TUNE.Roue;
    state.hold = damp(state.hold, state.holding ? 1 : 0, 6, dt);
    drum.rotation.y = -state.pos * R.angleStep; drum.position.y = 1.3 + state.pos * R.verticalStep;
    drum.rotation.x = state.hold * R.holdTilt; drum.scale.setScalar(lerp(1, R.holdScale, state.hold));
    const fade = (1 - state.openT) * (1 - state.aboutShift) * S.uReveal.value;
    labels.forEach((m, i) => {
      const far = Math.abs(i - state.pos); const u = m.labelUniforms;
      u.uActive.value = clamp(1 - far, 0, 1);
      u.uBlur.value = clamp(far / 0.9, 0, 1) * R.bokehWidth * 0.55;
      u.uOpacity.value = lerp(R.farOpacity, 1, Math.pow(clamp(1 - far / 2.2, 0, 1), 1.4)) * fade;
      u.uMeniscus.value = R.meniscusStrength;
      m.visible = u.uOpacity.value > 0.005;
    });

    updateCells(dt);

    if (sheetGroup.visible) {
      sheetGroup.rotation.y = damp(sheetGroup.rotation.y, (state.px - 0.5) * 0.35, 5, dt);
      sheetGroup.rotation.x = damp(sheetGroup.rotation.x, -(state.py - 0.5) * 0.25, 5, dt);
      sheetGroup.position.z = 0.05 + state.openT * 0.25;
    }

    // camera
    state.viewMul = damp(state.viewMul, curParams.scene.view, 3, dt);
    state.sx = damp(state.sx, state.px - 0.5, 4, dt); state.sy = damp(state.sy, state.py - 0.5, 4, dt);
    const shift = -state.aboutShift * (innerWidth > 768 ? 1.55 : 0);
    const z = CAM.baseZ * state.viewMul + state.hold * R.holdPull + state.openT * 0.4;
    camera.position.set(shift + state.sx * 0.5, CAM.baseY + 0.3 * (state.viewMul - 1) - state.sy * 0.25 + state.hold * 0.15, z);
    camTarget.set(shift, CAM.lookY - state.hold * 0.1, 0); camera.lookAt(camTarget);
    if (innerWidth <= 768 && state.about) camera.position.y += 0.9;

    // birds
    const pa = birdGeo.attributes.position as THREE.BufferAttribute;
    birdState.forEach((b, i) => { b.a += dt * b.sp; const fl = Math.sin(t * 6 + b.ph) * 0.08; pa.setXYZ(i, Math.cos(b.a) * b.r, b.y + Math.sin(b.a * 3 + b.ph) * 0.6 + fl, Math.sin(b.a) * b.r - 6); });
    pa.needsUpdate = true; birds.material.opacity = 0.55 * TUNE.Decor.birds * (1 - curParams.scene.night * 0.7) * S.uReveal.value;

    // pointer frost trail
    const tr = frostUniforms.uTrail.value;
    for (let i = 0; i < TRAIL_N; i++) { const s = trail[i]; const age = t - s.t; tr[i].set(s.x, s.y, clamp(1 - age / TUNE.Fluide.trailLife, 0, 1) * (1 - Math.exp(-age * 12))); }

    composer.render();
  }

  /* ---------------------------------------------------------------- */
  /*  Boot: preloader → reveal                                         */
  /* ---------------------------------------------------------------- */
  setProgress();
  const minWait = new Promise((r) => setTimeout(r, REDUCED ? 200 : 1500));
  Promise.all([Promise.all(coverPromises), minWait, document.fonts ? document.fonts.ready : Promise.resolve()]).then(() => {
    const c0 = coverOf(0); steleUniforms.uCover.value = c0; steleUniforms.uCoverAspect.value = coverAspect(c0);
    renderer.compile(scene, camera); composer.render();
    document.documentElement.style.setProperty('--stele-progress', '1');
    setTimeout(() => {
      body.classList.add('stele-wired');
      gsap.to(steleUniforms.uReveal, { value: 1, duration: REDUCED ? 0.2 : 2.4, ease: 'power2.inOut' });
      setTimeout(() => { body.classList.add('stele-ui'); syncIndex(); routeFromHash(); }, 500);
    }, 450);
  });
  clock.start(); tick();
}
