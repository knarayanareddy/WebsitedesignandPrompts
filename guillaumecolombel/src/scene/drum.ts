import * as THREE from 'three';
import type { Project } from '@/data/projects';
import { TUNE } from '@/tune';
import { steleUniforms } from './stele';

/** "Roue des titres" — project titles on a helical cylinder around the stone. */
export const drum = new THREE.Group();

function makeLabelTexture(project: Project, i: number, maxAniso: number) {
  const c = document.createElement('canvas'); c.width = 2048; c.height = 640;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#f4f2ee'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.save(); ctx.translate(1024, 0); ctx.scale(0.8, 1);
  ctx.font = '800 262px Inter, "Neue Montreal", system-ui, sans-serif';
  const [l1, l2] = project.wheel;
  ctx.fillText(l1, 0, 285); ctx.fillText(l2, 0, 560);
  ctx.restore();
  ctx.font = '500 54px Inter, system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(244,242,238,0.75)';
  ctx.fillText(String(i + 1).padStart(2, '0'), 150, 120);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, maxAniso); t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.needsUpdate = true;
  return t;
}

const labelVert = /* glsl */`
  varying vec2 vUv; varying float vX;
  void main(){ vUv=uv; vec4 w=modelMatrix*vec4(position,1.0); vX=w.x; gl_Position=projectionMatrix*viewMatrix*w; }`;
const labelFrag = /* glsl */`
  uniform sampler2D uMap; uniform float uOpacity,uBlur,uActive,uMeniscus,uTime; uniform vec3 uColor;
  varying vec2 vUv; varying float vX;
  void main(){
    vec2 uv=vUv;
    float near=exp(-vX*vX/0.09); // molten meniscus near the stone silhouette
    uv.x+=sin(uv.y*18.0+uTime*2.0)*uMeniscus*0.6*near*uActive;
    uv.y+=cos(uv.x*22.0-uTime*1.5)*uMeniscus*0.35*near*uActive;
    vec4 t=texture2D(uMap,uv,uBlur);
    vec3 col=vec3(0.96,0.95,0.93);
    col=mix(col,col+uColor*0.6*near,uActive);
    float a=t.a*uOpacity;
    gl_FragColor=vec4(col*a,a);
  }`;

export interface LabelUniforms extends Record<string, THREE.IUniform> {
  uMap: { value: THREE.Texture }; uOpacity: { value: number }; uBlur: { value: number }; uActive: { value: number };
  uMeniscus: { value: number }; uTime: { value: number }; uColor: { value: THREE.Vector3 };
}
export interface LabelMesh extends THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> { labelUniforms: LabelUniforms }

export const labels: LabelMesh[] = [];

export function buildDrum(projects: Project[], maxAniso: number) {
  projects.forEach((p, i) => {
    const uniforms: LabelUniforms = {
      uMap: { value: makeLabelTexture(p, i, maxAniso) }, uOpacity: { value: 1 }, uBlur: { value: 0 }, uActive: { value: 0 },
      uMeniscus: { value: TUNE.Roue.meniscusStrength }, uTime: steleUniforms.uTime, uColor: { value: steleUniforms.uColor.value },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, vertexShader: labelVert, fragmentShader: labelFrag, transparent: true, depthWrite: false,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(3.4, (3.4 * 640) / 2048), mat) as LabelMesh;
    m.labelUniforms = uniforms;
    drum.add(m);
    labels.push(m);
  });
  layoutDrum();
  // Re-rasterise once the web font is available.
  document.fonts?.load('800 100px Inter').then(() => labels.forEach((m, i) => {
    m.labelUniforms.uMap.value.dispose();
    m.labelUniforms.uMap.value = makeLabelTexture(projects[i], i, maxAniso);
  })).catch(() => {});
}

export function layoutDrum() {
  const R = TUNE.Roue;
  labels.forEach((m, i) => {
    const a = i * R.angleStep;
    m.position.set(Math.sin(a) * R.radius, -i * R.verticalStep, Math.cos(a) * R.radius);
    m.rotation.set(0, a, 0);
  });
}
