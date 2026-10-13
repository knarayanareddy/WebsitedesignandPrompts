import * as THREE from 'three';
import { GLSL_NOISE, GLSL_SKY, GLSL_TERRAIN } from './shaders';
import { steleUniforms } from './stele';
import { COARSE, mulberry } from '@/lib/math';

/** Procedural dusk landscape: sky, terrain, water, grass, mist, birds. */
export const landUniforms = {
  uTime: steleUniforms.uTime, uColor: steleUniforms.uColor, uLightPos: steleUniforms.uLightPos, uReveal: steleUniforms.uReveal,
  uRelief: { value: 1 }, uMist: { value: 0.5 }, uNight: { value: 0 }, uSkyDim: { value: 1 }, uWater: { value: 0 },
  uPointerGround: { value: new THREE.Vector3(0, 0, 0) }, uPointerOn: { value: 0 }, uPointerGlow: { value: 0.9 }, uSteleGlow: { value: 1 },
  uErode: steleUniforms.uErode, uCaustics: { value: 1 }, uStir: { value: new THREE.Vector4(0, 0, 0, 0) }, uFloraBend: { value: 1 }, uWaterReflect: { value: 1 }, uWaterRipple: { value: 1 },
};

/* Sky */
export const skyMat = new THREE.ShaderMaterial({
  uniforms: { uNight: landUniforms.uNight, uSkyDim: landUniforms.uSkyDim, uTime: steleUniforms.uTime },
  side: THREE.BackSide, depthWrite: false,
  vertexShader: `varying vec3 vDir; void main(){ vDir=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_SKY}
    uniform float uNight,uSkyDim,uTime; varying vec3 vDir;
    void main(){
      vec3 d=normalize(vDir);
      vec3 c=skyColor(d,uNight,uSkyDim);
      // stars
      vec2 sp=d.xz/(d.y+0.2)*60.0;
      float st=hash21(floor(sp)); float tw=0.6+0.4*sin(uTime*2.0+st*40.0);
      float star=step(0.985,st)*smoothstep(0.05,0.5,d.y)*tw;
      c+=vec3(0.9,0.9,1.0)*star*0.6*mix(0.15,1.0,uNight);
      // thin cloud bands
      float cl=fbm2(vec2(d.x*3.0+uTime*0.004,d.y*8.0))*smoothstep(0.0,0.3,d.y)*(1.0-smoothstep(0.3,0.7,d.y));
      c+=vec3(0.5,0.3,0.25)*cl*0.08*(1.0-uNight*0.8)*uSkyDim;
      gl_FragColor=vec4(c,1.0);
    }`,
});
export const sky = new THREE.Mesh(new THREE.SphereGeometry(70, 32, 16), skyMat);

/* Ground (flat PlaneGeometry; the vertex shader maps x,y → x,z and displaces by terrainH) */
export const groundMat = new THREE.ShaderMaterial({
  uniforms: landUniforms,
  vertexShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_TERRAIN}
    uniform float uRelief;
    varying vec3 vWorld; varying vec3 vN;
    void main(){
      vec3 p=position; // plane rotated: x,z in-plane, y up handled by using xz from position.xy
      vec2 xz=vec2(p.x,-p.y);
      float h=terrainH(xz,uRelief);
      float e=0.08;
      float hx=terrainH(xz+vec2(e,0.0),uRelief); float hz=terrainH(xz+vec2(0.0,e),uRelief);
      vN=normalize(vec3(h-hx,e,h-hz));
      vWorld=vec3(xz.x,h,xz.y);
      gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.0);
    }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_SKY}
    uniform float uTime,uMist,uNight,uSkyDim,uReveal,uPointerOn,uPointerGlow,uSteleGlow,uErode,uCaustics;
    uniform vec3 uColor,uLightPos,uPointerGround;
    varying vec3 vWorld; varying vec3 vN;
    void main(){
      vec3 N=normalize(vN);
      float detail=fbm2(vWorld.xz*6.0);
      vec3 earth=mix(vec3(0.045,0.04,0.036),vec3(0.085,0.07,0.055),detail);
      earth=mix(earth,vec3(0.06,0.065,0.05),smoothstep(0.3,0.9,N.y)*detail*0.6);
      vec3 sky=skyColor(vec3(0.0,1.0,0.0),uNight,uSkyDim); vec3 hor=skyColor(vec3(0.0,0.02,-1.0),uNight,uSkyDim);
      vec3 amb=mix(hor,sky,N.y*0.5+0.5);
      vec3 col=earth*(amb*2.2+0.08);
      // stele light puddle
      vec3 L=uLightPos-vWorld; float dl=length(L); L/=dl;
      float lam=max(dot(N,L),0.0);
      float pud=1.0/(1.0+dl*dl*1.1);
      col+=uColor*pud*(0.35+lam*0.8)*uSteleGlow*uReveal*(0.9+0.1*sin(uTime*2.3));
      // pointer ground spotlight
      float dp=distance(vWorld.xz,uPointerGround.xz);
      col+=vec3(1.0,0.82,0.65)*exp(-dp*dp/0.22)*0.22*uPointerOn*uPointerGlow;
      // lantern caustics (about route)
      float ca=0.0;
      if(uErode>0.001){
        vec2 q=vWorld.xz*2.6;
        float c1=abs(snoise(vec3(q,uTime*0.35))); float c2=abs(snoise(vec3(q*1.7+5.0,-uTime*0.28)));
        ca=pow(1.0-min(c1,c2),6.0);
        col+=vec3(1.0,0.6,0.28)*ca*0.8*uCaustics*uErode/(1.0+dot(vWorld.xz,vWorld.xz)*0.5);
      }
      // mist & distance fog
      float dist=distance(cameraPosition,vWorld);
      float fog=1.0-exp(-dist*dist*0.0022*(0.4+uMist*0.8));
      float low=uMist*0.55*exp(-max(vWorld.y,0.0)*2.4)*smoothstep(0.5,4.0,dist);
      vec3 fogCol=mix(hor,sky,0.35)*1.6+uColor*0.06*uReveal;
      col=mix(col,fogCol,clamp(fog+low,0.0,0.96));
      gl_FragColor=vec4(col,1.0);
    }`,
});
export const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 260, 260), groundMat);
ground.frustumCulled = false;

/* Water */
export const waterMat = new THREE.ShaderMaterial({
  uniforms: landUniforms, transparent: true, depthWrite: false,
  vertexShader: `varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_SKY}
    uniform float uTime,uMist,uNight,uSkyDim,uReveal,uWaterReflect,uWaterRipple,uErode;
    uniform vec3 uColor,uLightPos; uniform vec4 uStir;
    varying vec3 vWorld;
    void main(){
      vec2 xz=vWorld.xz;
      float r1=snoise(vec3(xz*1.6,uTime*0.35)); float r2=snoise(vec3(xz*3.7+4.0,uTime*0.55));
      // pointer stir rings
      float ds=distance(xz,uStir.xy);
      float ring=sin(ds*34.0-uTime*7.0)*exp(-ds*5.0)*uStir.z;
      float rip=(r1*0.6+r2*0.4)*uWaterRipple*0.05+ring*0.08;
      vec3 N=normalize(vec3(rip*2.0,1.0,rip*2.0));
      vec3 V=normalize(cameraPosition-vWorld);
      vec3 R=reflect(-V,N);
      vec3 sky=skyColor(vec3(R.x,max(R.y,0.02),R.z),uNight,uSkyDim);
      float fres=pow(1.0-max(dot(V,N),0.0),3.0)*0.85+0.15;
      vec3 col=sky*fres*uWaterReflect*1.3;
      // stele reflection streak
      float sx=xz.x+rip*2.5; float streak=exp(-sx*sx/(0.08+0.06*abs(xz.z)))*exp(-max(xz.z,0.0)*0.55)*smoothstep(-0.4,0.3,xz.z);
      col+=uColor*streak*1.1*uReveal*uWaterReflect;
      col+=uColor*0.5/(1.0+dot(xz,xz)*2.0)*uReveal;
      col+=vec3(1.0,0.6,0.28)*uErode*0.25/(1.0+dot(xz,xz)*1.5);
      float dist=distance(cameraPosition,vWorld);
      float fog=1.0-exp(-dist*dist*0.0022*(0.4+uMist*0.8));
      vec3 hor=skyColor(vec3(0.0,0.02,-1.0),uNight,uSkyDim); vec3 zen=skyColor(vec3(0.0,1.0,0.0),uNight,uSkyDim);
      col=mix(col,mix(hor,zen,0.35)*1.6,fog);
      gl_FragColor=vec4(col,0.92);
    }`,
});
export const water = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), waterMat);
water.rotation.x = -Math.PI / 2;

/* Grass */
export const GRASS_N = COARSE ? 2400 : 6500;
const bladeGeo = new THREE.BufferGeometry();
bladeGeo.setAttribute('position', new THREE.Float32BufferAttribute([-0.018, 0, 0, 0.018, 0, 0, 0, 0.26, 0], 3));
bladeGeo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0.5, 1], 2));
bladeGeo.setIndex([0, 1, 2]);
export const grassMat = new THREE.ShaderMaterial({
  uniforms: landUniforms, side: THREE.DoubleSide,
  vertexShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_TERRAIN}
    attribute vec3 aOffset; attribute vec2 aRand;
    uniform float uTime,uRelief,uFloraBend,uPointerOn; uniform vec3 uPointerGround;
    varying float vH; varying vec3 vWorld;
    void main(){
      vec2 xz=aOffset.xz;
      float h=terrainH(xz,uRelief);
      float sc=0.6+aRand.x*0.9;
      vec3 p=position*sc;
      float ang=aRand.y*6.283; float c=cos(ang), s=sin(ang);
      p.xz=vec2(p.x*c-p.z*s,p.x*s+p.z*c);
      float k=uv.y*uv.y;
      float wind=sin(uTime*1.7+xz.x*0.8+xz.y*0.5+aRand.x*6.0)*0.12+sin(uTime*3.1+aRand.y*9.0)*0.04;
      p.x+=wind*k; p.z+=wind*0.5*k;
      vec2 away=xz-uPointerGround.xz; float dp=length(away);
      float bend=exp(-dp*dp/0.5)*uPointerOn*uFloraBend*0.35;
      p.xz+=normalize(away+1e-4)*bend*k;
      vWorld=vec3(xz.x,h,xz.y)+p; vH=uv.y;
      gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.0);
    }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_SKY}
    uniform float uMist,uNight,uSkyDim,uReveal,uSteleGlow; uniform vec3 uColor,uLightPos;
    varying float vH; varying vec3 vWorld;
    void main(){
      vec3 base=mix(vec3(0.035,0.04,0.03),vec3(0.11,0.1,0.06),vH);
      vec3 sky=skyColor(vec3(0.0,1.0,0.0),uNight,uSkyDim); vec3 hor=skyColor(vec3(0.0,0.02,-1.0),uNight,uSkyDim);
      vec3 col=base*(mix(hor,sky,0.5)*2.4+0.1);
      float dl=distance(uLightPos,vWorld);
      col+=uColor*vH*0.5/(1.0+dl*dl*1.1)*uSteleGlow*uReveal;
      float dist=distance(cameraPosition,vWorld);
      float fog=1.0-exp(-dist*dist*0.0022*(0.4+uMist*0.8));
      float low=uMist*0.55*exp(-max(vWorld.y,0.0)*2.4)*smoothstep(0.5,4.0,dist);
      col=mix(col,mix(hor,sky,0.35)*1.6,clamp(fog+low,0.0,0.96));
      gl_FragColor=vec4(col,1.0);
    }`,
});
export const grass = new THREE.InstancedMesh(bladeGeo, grassMat, GRASS_N);
{
  const r = mulberry(7); const off = new Float32Array(GRASS_N * 3), rnd = new Float32Array(GRASS_N * 2);
  for (let i = 0; i < GRASS_N; i++) {
    const a = r() * Math.PI * 2; const d = 1.1 + Math.pow(r(), 0.7) * 13.0;
    off[i * 3] = Math.cos(a) * d; off[i * 3 + 1] = 0; off[i * 3 + 2] = Math.sin(a) * d; rnd[i * 2] = r(); rnd[i * 2 + 1] = r();
  }
  bladeGeo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(off, 3));
  bladeGeo.setAttribute('aRand', new THREE.InstancedBufferAttribute(rnd, 2));
  grass.frustumCulled = false;
}

/* Mist layers */
const makeMistMat = (layer: number) => new THREE.ShaderMaterial({
  uniforms: { uTime: steleUniforms.uTime, uMist: landUniforms.uMist, uColor: steleUniforms.uColor, uNight: landUniforms.uNight, uSkyDim: landUniforms.uSkyDim, uLayer: { value: layer } },
  transparent: true, depthWrite: false,
  vertexShader: `varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
  fragmentShader: /* glsl */`
    ${GLSL_NOISE} ${GLSL_SKY}
    uniform float uTime,uMist,uLayer,uNight,uSkyDim; uniform vec3 uColor; varying vec3 vWorld;
    void main(){
      vec2 q=vWorld.xz*0.22+vec2(uTime*0.012*(1.0+uLayer),uLayer*7.0);
      float n=fbm2(q)*fbm2(q*1.9+vec2(uTime*0.02,0.0))*2.2;
      float r=length(vWorld.xz);
      float a=n*uMist*0.55*(1.0-smoothstep(4.0,16.0,r))*smoothstep(0.6,2.2,r);
      vec3 hor=skyColor(vec3(0.0,0.02,-1.0),uNight,uSkyDim);
      vec3 col=hor*1.4+uColor*0.1/(1.0+r*r*0.4);
      gl_FragColor=vec4(col,clamp(a,0.0,1.0));
    }`,
});
export const mists = [0.1, 0.32, 0.62].map((y, i) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), makeMistMat(i));
  m.rotation.x = -Math.PI / 2; m.position.y = y; m.renderOrder = 2;
  return m;
});

/* Birds */
export const BIRD_N = 14;
export const birdGeo = new THREE.BufferGeometry();
birdGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BIRD_N * 3), 3));
const birdTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d')!;
  x.strokeStyle = '#000'; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(8, 36); x.quadraticCurveTo(20, 20, 32, 34); x.quadraticCurveTo(44, 20, 56, 36); x.stroke();
  return new THREE.CanvasTexture(c);
})();
export const birds = new THREE.Points(birdGeo, new THREE.PointsMaterial({ size: 0.22, map: birdTex, transparent: true, opacity: 0.55, color: 0x120c0a, depthWrite: false, sizeAttenuation: true }));
export interface Bird { a: number; r: number; y: number; sp: number; ph: number }
export const birdState: Bird[] = (() => { const r = mulberry(5); const out: Bird[] = []; for (let i = 0; i < BIRD_N; i++) out.push({ a: r() * Math.PI * 2, r: 18 + r() * 14, y: 4 + r() * 4, sp: 0.03 + r() * 0.02, ph: r() * 6 }); return out; })();

export function addLandscape(scene: THREE.Scene) {
  scene.add(sky, ground, water, grass, birds, ...mists);
}
