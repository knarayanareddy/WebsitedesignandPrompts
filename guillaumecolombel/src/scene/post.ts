import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { TUNE } from '@/tune';

export const TRAIL_N = 12;

/** Render → bloom → ACES/sRGB output → pointer-frost lens, chromatic split, vignette, grain. */
export function createPost(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), TUNE.Lumiere.bloom, TUNE.Lumiere.bloomRadius, TUNE.Lumiere.bloomThreshold);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const frostUniforms = {
    tDiffuse: { value: null as THREE.Texture | null }, uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 },
    uTrail: { value: Array.from({ length: TRAIL_N }, () => new THREE.Vector3(-1, -1, 0)) },
    uFrost: { value: 1 }, uWarp: { value: 0.012 }, uVignette: { value: 0.38 }, uGrain: { value: 0.035 },
  };
  const frostPass = new ShaderPass({
    uniforms: frostUniforms,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uTime,uFrost,uWarp,uVignette,uGrain; uniform vec3 uTrail[${TRAIL_N}];
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 uv=vUv; float aspect=uRes.x/uRes.y;
      vec2 warp=vec2(0.0); float frost=0.0;
      for(int i=0;i<${TRAIL_N};i++){
        vec3 t=uTrail[i]; if(t.z<=0.0) continue;
        vec2 d=(uv-t.xy)*vec2(aspect,1.0); float r=length(d);
        float k=t.z*exp(-r*r/0.006);
        warp+=d/(r+1e-4)*k; frost+=k;
      }
      vec2 o=warp*uWarp*uFrost;
      vec3 col;
      col.r=texture2D(tDiffuse,uv-o*1.06).r;
      col.g=texture2D(tDiffuse,uv-o).g;
      col.b=texture2D(tDiffuse,uv-o*0.94).b;
      // frosted glass: tiny blur in the wake
      if(frost>0.01){ vec2 px=1.5/uRes; vec3 b=texture2D(tDiffuse,uv-o+px).rgb+texture2D(tDiffuse,uv-o-px).rgb+texture2D(tDiffuse,uv-o+vec2(px.x,-px.y)).rgb+texture2D(tDiffuse,uv-o-vec2(px.x,-px.y)).rgb; col=mix(col,b*0.25,clamp(frost*0.7,0.0,0.6)*uFrost); }
      vec2 v=(uv-0.5)*vec2(1.05,1.0);
      col*=1.0-uVignette*smoothstep(0.35,1.05,length(v));
      float g=hash(gl_FragCoord.xy+vec2(fract(uTime*61.0),fract(uTime*37.0))*100.0);
      col+=(g-0.5)*uGrain;
      gl_FragColor=vec4(col,1.0);
    }`,
  });
  composer.addPass(frostPass);
  return { composer, bloom, frostPass, frostUniforms };
}
