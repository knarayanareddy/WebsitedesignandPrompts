/** Shared GLSL chunks: Ashima 3D simplex noise, value-noise FBM, terrain heightfield and dusk sky. */
export const GLSL_NOISE = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm3(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<4;i++){ v+=a*snoise(p); p=p*2.02+vec3(1.7,9.2,3.1); a*=0.5; } return v; }
float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f); float a=hash21(i); float b=hash21(i+vec2(1.0,0.0)); float c=hash21(i+vec2(0.0,1.0)); float d=hash21(i+vec2(1.0,1.0)); return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm2(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*vnoise(p); p=p*2.03+vec2(17.1,9.3); a*=0.5; } return v; }
`;

export const GLSL_TERRAIN = /* glsl */`
float terrainH(vec2 xz, float relief){
  float r=length(xz);
  float h=(fbm2(xz*0.16)-0.42)*2.4;
  float far=fbm2(xz*0.05+3.0); h+=far*far*2.6*smoothstep(6.0,16.0,r);
  h*=relief; h*=smoothstep(0.75,3.4,r);
  return h-0.02;
}
`;

export const GLSL_SKY = /* glsl */`
vec3 skyColor(vec3 dir, float night, float dim){
  float t=clamp(dir.y,-0.05,1.0);
  vec3 horizon=mix(vec3(0.95,0.42,0.22), vec3(0.12,0.08,0.12), night);
  vec3 mid=mix(vec3(0.30,0.16,0.22), vec3(0.03,0.03,0.07), night);
  vec3 zenith=mix(vec3(0.03,0.04,0.09), vec3(0.004,0.005,0.012), night);
  vec3 c=mix(horizon, mid, smoothstep(0.0,0.22,t));
  c=mix(c, zenith, smoothstep(0.18,0.8,t));
  vec3 sunDir=normalize(vec3(-0.45,0.04,-1.0));
  float s=max(dot(normalize(dir),sunDir),0.0);
  c+=vec3(1.0,0.55,0.25)*pow(s,18.0)*0.9*(1.0-night*0.85);
  c+=vec3(1.0,0.7,0.4)*pow(s,4.0)*0.12*(1.0-night*0.85);
  return c*dim*0.55;
}
`;

