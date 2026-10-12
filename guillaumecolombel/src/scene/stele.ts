import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { GLSL_NOISE } from './shaders';
import { clamp, mulberry } from '@/lib/math';

/* ------------------------------------------------------------------ */
/*  Sculpted monolith: parametric surface                              */
/* ------------------------------------------------------------------ */
export const STONE = { H: 2.4, W: 0.9, D: 0.42, center: new THREE.Vector3(0, 1.02, 0) };

function stoneProfile(t: number) {
  const w = (0.86 + 0.3 * Math.sin(t * 2.4)) * (1 - Math.pow(t, 3.2) * 0.72);
  return { a: 0.45 * w * (STONE.W / 0.9), b: 0.21 * w * (STONE.D / 0.42), cx: 0.1 * t * t - 0.03 * Math.sin(t * 3.0), cz: 0.03 * Math.sin(t * 2.0) };
}
function stoneSurface(theta: number, y: number, out = new THREE.Vector3()) {
  const t = clamp(y / STONE.H, 0, 1);
  const p = stoneProfile(t);
  const c = Math.cos(theta), s = Math.sin(theta);
  const bump = 1 + 0.045 * (Math.sin(theta * 3 + y * 2.1) + 0.5 * Math.sin(theta * 7 - y * 4.3) + 0.35 * Math.sin(y * 9 + theta * 1.7));
  const ex = Math.sign(c) * Math.pow(Math.abs(c), 0.78), ez = Math.sign(s) * Math.pow(Math.abs(s), 0.78);
  const depthK = 1 + 0.18 * s; // one face flatter than the other
  out.set(p.cx + p.a * ex * bump, y, p.cz + p.b * ez * bump * depthK);
  return out;
}
function stoneAxis(y: number) { const p = stoneProfile(clamp(y / STONE.H, 0, 1)); return new THREE.Vector3(p.cx, y, p.cz); }
function stoneNormal(theta: number, y: number) {
  const e = 1e-3;
  const p0 = stoneSurface(theta, y), pt = stoneSurface(theta + e, y), py = stoneSurface(theta, y + e);
  const n = new THREE.Vector3().crossVectors(py.sub(p0), pt.sub(p0)).normalize();
  const ax = stoneAxis(y); if (n.dot(p0.clone().sub(ax)) < 0) n.negate();
  return n;
}

interface Sample { p: THREE.Vector3; n: THREE.Vector3 | null; radial: number; surface: boolean }
export interface Cell { geo: THREE.BufferGeometry; center: THREE.Vector3; seed: THREE.Vector3; rand: number }

/** Samples the stone, clusters samples into slab-like Voronoi cells, hulls each cell. */
export function buildStele(): Cell[] {
  const rand = mulberry(1337);
  const samples: Sample[] = [];
  const TH = 44, NY = 46;
  for (let j = 0; j <= NY; j++) {
    const y = -0.22 + (STONE.H + 0.22) * (j / NY);
    for (let i = 0; i < TH; i++) {
      const th = (i / TH) * Math.PI * 2 + ((j % 2) * Math.PI) / TH;
      samples.push({ p: stoneSurface(th, y), n: stoneNormal(th, y), radial: 1, surface: true });
    }
  }
  for (let i = 0; i < 12; i++) { // crown
    const th = (i / 12) * Math.PI * 2; const p = stoneSurface(th, STONE.H); const ax = stoneAxis(STONE.H);
    p.lerp(ax, 0.55); p.y = STONE.H + 0.05; samples.push({ p, n: new THREE.Vector3(0, 1, 0), radial: 0.7, surface: true });
  }
  { const ax = stoneAxis(STONE.H); ax.y = STONE.H + 0.075; samples.push({ p: ax, n: new THREE.Vector3(0, 1, 0), radial: 0.4, surface: true }); }
  for (let k = 0; k < 1400; k++) { // interior
    const y = -0.2 + (STONE.H + 0.1) * rand(); const th = rand() * Math.PI * 2; const rho = Math.sqrt(rand()) * 0.96;
    const yc = clamp(y, 0, STONE.H);
    const p = stoneAxis(yc).lerp(stoneSurface(th, yc), rho); p.y = y;
    samples.push({ p, n: null, radial: rho, surface: false });
  }
  const NC = 16; const seeds: THREE.Vector3[] = [];
  for (let i = 0; i < NC; i++) {
    const y = 0.02 + (STONE.H - 0.1) * ((i + 0.5 + (rand() - 0.5) * 0.7) / NC);
    const ax = stoneAxis(clamp(y, 0, STONE.H));
    seeds.push(new THREE.Vector3(ax.x + (rand() - 0.5) * 0.5, y, ax.z + (rand() - 0.5) * 0.25));
  }
  const metric = (p: THREE.Vector3, s: THREE.Vector3) => { const dx = p.x - s.x, dy = (p.y - s.y) * 0.95, dz = (p.z - s.z) * 0.8; return dx * dx + dy * dy + dz * dz; };
  const clusters: Sample[][] = seeds.map(() => []);
  for (const s of samples) {
    let best = 0, bd = Infinity;
    for (let i = 0; i < NC; i++) { const d = metric(s.p, seeds[i]); if (d < bd) { bd = d; best = i; } }
    clusters[best].push(s);
  }
  const key = (v: THREE.Vector3) => `${v.x.toFixed(5)},${v.y.toFixed(5)},${v.z.toFixed(5)}`;
  const cells: Cell[] = [];
  clusters.forEach((cl, ci) => {
    if (cl.length < 16) return;
    const map = new Map<string, Sample>(); cl.forEach((s) => map.set(key(s.p), s));
    let geo: ConvexGeometry;
    try { geo = new ConvexGeometry(cl.map((s) => s.p)); } catch { return; }
    const pos = geo.attributes.position as THREE.BufferAttribute; const nor = geo.attributes.normal as THREE.BufferAttribute; const n = pos.count;
    const inner = new Float32Array(n), radial = new Float32Array(n);
    const v = new THREE.Vector3(), fa = new THREE.Vector3(), fb = new THREE.Vector3(), fc = new THREE.Vector3(), fn = new THREE.Vector3();
    for (let f = 0; f < n; f += 3) {
      const ss = [0, 1, 2].map((k) => map.get(key(v.fromBufferAttribute(pos, f + k))));
      fa.fromBufferAttribute(pos, f); fb.fromBufferAttribute(pos, f + 1); fc.fromBufferAttribute(pos, f + 2);
      fn.crossVectors(fb.clone().sub(fa), fc.clone().sub(fa)).normalize();
      let exterior = false;
      const [s0, s1, s2] = ss;
      if (s0?.n && s1?.n && s2?.n && s0.surface && s1.surface && s2.surface) {
        const an = s0.n.clone().add(s1.n).add(s2.n).normalize();
        exterior = fn.dot(an) > 0.55;
      }
      for (let k = 0; k < 3; k++) {
        const s = ss[k];
        inner[f + k] = exterior ? 0 : 1;
        radial[f + k] = s ? s.radial : 0.5;
        if (exterior && s && s.n) nor.setXYZ(f + k, s.n.x, s.n.y, s.n.z);
      }
    }
    geo.setAttribute('aInner', new THREE.BufferAttribute(inner, 1));
    geo.setAttribute('aRadial', new THREE.BufferAttribute(radial, 1));
    geo.computeBoundingBox();
    const c = new THREE.Vector3(); geo.boundingBox!.getCenter(c);
    geo.translate(-c.x, -c.y, -c.z);
    cells.push({ geo, center: c, seed: seeds[ci], rand: rand() });
  });
  return cells;
}

/* ------------------------------------------------------------------ */
/*  Material & uniforms                                                */
/* ------------------------------------------------------------------ */
export const steleUniforms = {
  uTime: { value: 0 }, uColor: { value: new THREE.Vector3(1, 0.3, 0.1) },
  uDensity: { value: 1 }, uVeins: { value: 1 }, uVeinScale: { value: 1 }, uBands: { value: 1 }, uBandScale: { value: 1 },
  uLightPos: { value: new THREE.Vector3(0, 1.05, 0) }, uIntensity: { value: 1 }, uReveal: { value: 0 }, uAmbient: { value: 0.9 }, uRim: { value: 0.6 },
  uPointer: { value: new THREE.Vector3(0, -10, 0) }, uPointerOn: { value: 0 }, uPointerRadius: { value: 0.25 },
  uOpen: { value: 0 }, uErode: { value: 0 }, uErodeRelief: { value: 0.62 }, uCorePos: { value: new THREE.Vector3(0, 1.1, 0) }, uBreath: { value: 0 },
  uCover: { value: null as THREE.Texture | null }, uCoverAspect: { value: 1.6 }, uIncl: { value: 1 }, uInclDepth: { value: 0.55 }, uIor: { value: 1.5 }, uParallax: { value: 0.28 }, uFrost: { value: 0.6 },
  uNight: { value: 0 },
  // per-cell, set in onBeforeRender
  uHeat: { value: 0 }, uCellCenter: { value: new THREE.Vector3() }, uCellSeed: { value: 0 },
};

export const steleMaterial = new THREE.ShaderMaterial({
  uniforms: steleUniforms,
  side: THREE.DoubleSide,
  vertexShader: /* glsl */`
    attribute float aInner; attribute float aRadial;
    uniform vec3 uCellCenter; uniform float uHeat; uniform float uOpen;
    varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vStone; varying float vInner; varying float vRadial;
    void main(){
      vInner=aInner; vRadial=aRadial;
      vStone=position+uCellCenter;
      vec3 p=position;
      vec4 w=modelMatrix*vec4(p,1.0);
      vWorld=w.xyz;
      vNormalW=normalize(mat3(modelMatrix)*normal);
      gl_Position=projectionMatrix*viewMatrix*w;
    }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE}
    uniform float uTime; uniform vec3 uColor; uniform float uDensity,uVeins,uVeinScale,uBands,uBandScale;
    uniform vec3 uLightPos; uniform float uIntensity,uReveal,uAmbient,uRim;
    uniform vec3 uPointer; uniform float uPointerOn,uPointerRadius;
    uniform float uOpen,uErode,uErodeRelief,uBreath; uniform vec3 uCorePos;
    uniform sampler2D uCover; uniform float uCoverAspect,uIncl,uInclDepth,uIor,uParallax,uFrost;
    uniform float uNight,uHeat,uCellSeed;
    varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vStone; varying float vInner; varying float vRadial;

    vec3 sampleCover(vec2 uv){
      vec2 c=clamp(uv,0.001,0.999);
      vec3 s=texture2D(uCover,c,uFrost*3.0).rgb;
      return s;
    }
    void main(){
      vec3 p=vStone;
      bool front=gl_FrontFacing;
      vec3 N=normalize(vNormalW)*(front?1.0:-1.0);
      vec3 V=normalize(cameraPosition-vWorld);
      float ndv=max(dot(N,V),0.0);
      float fres=pow(1.0-ndv,2.5);

      // ---- erosion (about route): exterior skin dissolves into a hollow relic
      if(uErode>0.001 && vInner<0.5){
        float e=fbm3(p*vec3(2.6,1.6,2.6)+vec3(0.0,uTime*0.015,0.0))*0.5+0.5;
        float rel=smoothstep(0.0,1.0,(p.y-0.15)/2.0);
        if(e < uErode*uErodeRelief*(0.55+0.6*rel)) discard;
      }

      // ---- mineralogy
      float strata=fbm3(p*vec3(0.9,1.4,0.9)*uBandScale);
      float band=sin((p.y*4.6+strata*1.4)*uBandScale*1.6+uCellSeed*0.3);
      band=smoothstep(0.15,0.95,band)*clamp(uBands,0.0,2.5)*0.5;
      float vn=abs(snoise(p*2.4*uVeinScale+vec3(3.1,1.7,5.2)));
      float vn2=abs(snoise(p*5.1*uVeinScale+vec3(9.1,2.7,1.2)));
      float vein=(1.0-smoothstep(0.0,0.07+0.03*uVeins,vn))*0.85+(1.0-smoothstep(0.0,0.05,vn2))*0.35;
      vein*=clamp(uVeins,0.0,2.5)*0.6; vein=clamp(vein,0.0,1.0);

      // ---- backlight / subsurface
      float d=distance(p,uLightPos);
      float thick=1.0-vRadial;
      float dens=max(uDensity,0.05);
      float trans=exp(-dens*(1.35*d+1.8*thick))*uIntensity*uReveal;
      float rim=fres*exp(-dens*d*0.7)*uRim*uReveal;
      vec3 glow=uColor*(trans*1.6+rim*0.9);

      // ---- base alabaster lit by dusk ambience
      vec3 skyA=mix(vec3(0.10,0.11,0.17),vec3(0.02,0.025,0.05),uNight);
      vec3 horA=mix(vec3(0.28,0.14,0.10),vec3(0.05,0.03,0.04),uNight);
      vec3 amb=mix(horA,skyA,N.y*0.5+0.5)*uAmbient;
      vec3 alabaster=vec3(0.86,0.80,0.72)*(0.92+0.08*snoise(p*9.0));
      vec3 col=alabaster*amb;
      col=mix(col,col*vec3(0.78,0.62,0.52),band);
      glow*=(1.0-band*0.45);
      col+=glow;

      // ---- inclusion: cover trapped inside the stone
      vec2 cuv=(p.xy-vec2(0.0,1.02));
      cuv.x-=(uIor-1.0)*N.x*0.18; cuv.y-=(uIor-1.0)*N.y*0.08;
      cuv-=V.xy*uParallax*uInclDepth;
      cuv+=vec2(snoise(p*3.0),snoise(p*3.0+7.0))*0.02*uFrost;
      vec2 covSize=vec2(0.86,0.86/uCoverAspect)*1.15;
      vec2 uv=cuv/covSize+0.5;
      float inside=step(0.0,uv.x)*step(uv.x,1.0)*step(0.0,uv.y)*step(uv.y,1.0);
      vec3 cover=sampleCover(uv);
      float coreMask=smoothstep(0.0,1.0,thick*1.6);
      float inclVis=coreMask*uIncl*inside*(1.0-vein*0.8)*(1.0-band*0.3)*uReveal;
      col+=cover*inclVis*(0.22+0.9*trans)*(1.0-uOpen);

      // ---- veins occlude and burn
      col=mix(col,col*0.22+uColor*vein*(0.35+trans*1.4),vein);

      // ---- pointer heat & molten pinhole
      float dp=distance(vWorld,uPointer);
      float hp=(1.0-smoothstep(0.0,uPointerRadius,dp))*uPointerOn;
      float heat=clamp(uHeat*0.8+hp*0.9,0.0,1.6);
      col+=uColor*heat*(0.18+fres*1.1)*(1.0-vInner);
      float pin=smoothstep(0.35,1.0,hp)*uPointerOn*inside;
      col=mix(col,cover*1.6+uColor*0.25,pin*0.85*(1.0-uOpen));

      // ---- inner faces: molten core when fractured / hollow when eroded
      float molten=fbm3(p*3.5+vec3(0.0,-uTime*0.25,0.0))*0.5+0.5;
      vec3 innerCol=uColor*(0.35+uOpen*2.2)*(0.55+0.7*molten)+vec3(0.06,0.03,0.02);
      innerCol+=uColor*uHeat*1.2;
      // about-route lantern light on the inside walls
      float dc=distance(p,uCorePos);
      vec3 amber=vec3(1.0,0.55,0.22);
      innerCol=mix(innerCol, innerCol*0.35+amber*(1.2+uBreath*0.6)/(1.0+dc*dc*6.0)*max(dot(N,normalize(uCorePos-p)),0.15), uErode);
      col=mix(col,innerCol,vInner);
      // eroded exterior backfaces (looking into the hollow)
      if(!front && vInner<0.5){ col=vec3(0.02,0.015,0.012)+amber*(0.9+uBreath*0.5)/(1.0+dc*dc*5.0)*uErode; }
      // erosion edge heat
      col+=amber*uErode*fres*0.25;

      col*=mix(0.35,1.0,uReveal);
      gl_FragColor=vec4(col,1.0);
    }`,
});

export interface CellData { center: THREE.Vector3; heat: number; seed: number; dir: THREE.Vector3; rot: THREE.Euler; idx: number }
export type CellMesh = THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> & { userData: CellData };

export const steleGroup = new THREE.Group();
export const cellMeshes: CellMesh[] = buildStele().map((c, i) => {
  const m = new THREE.Mesh(c.geo, steleMaterial) as CellMesh;
  m.position.copy(c.center);
  const dir = new THREE.Vector3(c.center.x * 2.0, (c.center.y - 1.0) * 0.5, c.center.z * 3.4);
  if (dir.length() < 0.05) dir.set(c.rand - 0.5, 0.1, 0.4);
  m.userData = {
    center: c.center.clone(), heat: 0, seed: c.rand, dir: dir.normalize(), idx: i,
    rot: new THREE.Euler((c.rand - 0.5) * 0.5, (((c.rand * 7) % 1) - 0.5) * 0.6, (((c.rand * 13) % 1) - 0.5) * 0.5),
  };
  m.onBeforeRender = () => {
    steleUniforms.uHeat.value = m.userData.heat;
    steleUniforms.uCellCenter.value.copy(m.userData.center);
    steleUniforms.uCellSeed.value = m.userData.seed * 10;
    steleMaterial.uniformsNeedUpdate = true;
  };
  steleGroup.add(m);
  return m;
});
export const neighbors = cellMeshes.map((a) => cellMeshes.filter((b) => b !== a && a.userData.center.distanceTo(b.userData.center) < 0.75));

/* Lantern core (about route) */
export const coreMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.16, 32, 24),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 1.25, 0.5), transparent: true, opacity: 0 }),
);
coreMesh.position.set(0.02, 1.12, 0);

/* Debris shards flung out on fracture */
export const DEBRIS_N = 42;
export const debris = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.03, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.4, 0.55, 0.25) }), DEBRIS_N);
debris.visible = false;
export interface Shard { v: THREE.Vector3; s: number; y0: number; life: number }
export const debrisState: Shard[] = (() => {
  const r = mulberry(99); const out: Shard[] = [];
  for (let i = 0; i < DEBRIS_N; i++) out.push({ v: new THREE.Vector3((r() - 0.5) * 2.4, r() * 1.8 + 0.4, (r() - 0.2) * 2.6), s: 0.4 + r() * 1.2, y0: 0.2 + r() * 2.0, life: 0 });
  return out;
})();

/* ------------------------------------------------------------------ */
/*  Unfolding cover sheet (cloth plane)                                */
/* ------------------------------------------------------------------ */
export const sheetUniforms = {
  uTime: { value: 0 }, uMap: { value: null as THREE.Texture | null }, uUnfold: { value: 0 }, uFold: { value: 1 },
  uPointer: { value: new THREE.Vector2() }, uColor: { value: steleUniforms.uColor.value }, uOpacity: { value: 0 },
};
export const sheetMat = new THREE.ShaderMaterial({
  uniforms: sheetUniforms, transparent: true, side: THREE.DoubleSide, depthWrite: false,
  vertexShader: /* glsl */`
    uniform float uTime,uUnfold,uFold; uniform vec2 uPointer;
    varying vec2 vUv; varying float vShade;
    void main(){
      vUv=uv; vec3 p=position;
      float f=uFold;
      // fold: paper folded along vertical mid line + horizontal thirds
      p.z+=sin(uv.x*3.14159)*f*0.55; p.x*= (1.0-f*0.55);
      p.z+=sin(uv.y*6.283)*f*0.12;
      // cloth / breeze
      float wv=sin(uv.x*6.0+uTime*1.6)*0.018+sin(uv.y*7.0-uTime*1.1+uv.x*3.0)*0.014;
      wv*= (0.3+uv.y*0.7);
      p.z+=wv*uUnfold;
      // edge weave
      float edgeW=1.0-smoothstep(0.0,0.06,min(uv.x,1.0-uv.x));
      p.x+=sin(uv.y*40.0+uTime*3.0)*0.004*edgeW*uUnfold;
      vShade=0.85+0.15*cos(uv.x*6.0+uTime*1.6);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
    }`,
  fragmentShader: /* glsl */`
    uniform sampler2D uMap; uniform float uOpacity,uUnfold; uniform vec3 uColor;
    varying vec2 vUv; varying float vShade;
    void main(){
      vec3 c=texture2D(uMap,vUv).rgb*vShade;
      // molten edge as it unfolds
      float e=min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y));
      float edge=1.0-smoothstep(0.0,0.03,e);
      c+=uColor*edge*(1.4-uUnfold*1.1);
      gl_FragColor=vec4(c,uOpacity);
    }`,
});
export const sheetMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7 / 1.6, 40, 26), sheetMat);
export const sheetGroup = new THREE.Group();
sheetGroup.position.set(0, 1.08, 0.05); sheetGroup.add(sheetMesh); sheetGroup.visible = false;
