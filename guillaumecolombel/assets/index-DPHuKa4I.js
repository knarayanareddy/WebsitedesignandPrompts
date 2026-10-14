var ii=Object.defineProperty;var oi=(r,e,t)=>e in r?ii(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var he=(r,e,t)=>oi(r,typeof e!="symbol"?e+"":e,t);import{V as w,L as si,P as Lt,T as ai,B as Ye,F as Me,S as G,D as tt,G as it,M as ie,E as kt,a as Ft,b as ot,C as Ce,I as Nt,c as ni,d as V,e as Le,f as Je,O as ri,g as li,h as ui,i as st,j as We,k as ci,l as di,m as hi,n as St,o as fi,p as vi,q as pi,U as qe,W as Ve,H as Ge,N as mi,r as Bt,A as gi,R as xi,s as yi,t as bi,u as wi,v as Si,w as Ti,x as It,y as Mi,z as Ci,J as Pi,K as Ri,Q as Ei,X as Di,Y as zi,Z as Ai,_ as _i,$ as Li}from"./three-Dm9OCHQx.js";import{g as Q}from"./gsap-BmWgXYHb.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const ki="modulepreload",Fi=function(r,e){return new URL(r,e).href},Tt={},Ni=function(e,t,o){let s=Promise.resolve();if(t&&t.length>0){let l=function(c){return Promise.all(c.map(v=>Promise.resolve(v).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const u=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),f=i?.nonce||i?.getAttribute("nonce");s=l(t.map(c=>{if(c=Fi(c,o),c in Tt)return;Tt[c]=!0;const v=c.endsWith(".css"),h=v?'[rel="stylesheet"]':"";if(!!o)for(let M=u.length-1;M>=0;M--){const y=u[M];if(y.href===c&&(!v||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const g=document.createElement("link");if(g.rel=v?"stylesheet":ki,v||(g.as="script"),g.crossOrigin="",g.href=c,f&&g.setAttribute("nonce",f),document.head.appendChild(g),v)return new Promise((M,y)=>{g.addEventListener("load",M),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return s.then(l=>{for(const u of l||[])u.status==="rejected"&&a(u.reason);return e().catch(a)})},B=[{slug:"clarte",title:"CLARTÉ",wheel:["CLARTÉ","WORLD"],year:2026,description:"An interactive WebGL & AI design system built for real-time spatial storytelling and high-craft product launches.",credits:"Design & Creative Development",url:"https://example.com/clarte",coverImage:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",color:[1,.25,.1],matter:{veins:1.4,veinScale:1,bands:.5,bandScale:1,density:1},scene:{water:.02,mist:.7,view:1.05,flora:.85,relief:1.25,night:0,skyDim:1}},{slug:"ondine",title:"Ondine",wheel:["ONDINE","ATELIER"],year:2025,description:"A fluid-simulation storefront for a perfume house: every bottle is poured, not clicked, in a GPU Navier-Stokes field.",credits:"Creative Development with Studio Marée",url:"https://example.com/ondine",coverImage:"https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80",color:[.15,.55,1.4],matter:{veins:.6,veinScale:1.6,bands:1.2,bandScale:.7,density:.7},scene:{water:.08,mist:.35,view:1.15,flora:.25,relief:.5,night:0,skyDim:.9}},{slug:"halcyon-os",title:"Halcyon OS",wheel:["HALCYON","OS"],year:2025,description:"Launch film and configurator for a spatial computing OS, rendered live in the browser with a custom MSDF type engine.",credits:"Lead WebGL Engineer",url:"https://example.com/halcyon",coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",color:[.3,1.3,.9],matter:{veins:1,veinScale:2.2,bands:.2,bandScale:1.4,density:1.3},scene:{water:-.12,mist:.15,view:.85,flora:.1,relief:1.6,night:1,skyDim:.6}},{slug:"sable",title:"Sable",wheel:["SABLE","DUNES"],year:2024,description:"A scroll-driven desert documentary. Terrain, heat haze and sand grain are all procedural; the footage is the only asset.",credits:"Design & Development for Atelier Nord",url:"https://example.com/sable",coverImage:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",color:[1.6,.7,.2],matter:{veins:.3,veinScale:.8,bands:1.8,bandScale:1.2,density:.6},scene:{water:-.12,mist:.9,view:1.25,flora:.05,relief:1,night:0,skyDim:1}},{slug:"aether",title:"Aether",wheel:["AETHER","ORBITAL"],year:2024,description:"Real-time satellite tracker and data portrait for a climate observatory: 4,000 orbits drawn as a single instanced ribbon.",credits:"Data visualisation & WebGPU",url:"https://example.com/aether",coverImage:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",color:[.7,.3,1.5],matter:{veins:1.8,veinScale:1.3,bands:.3,bandScale:.8,density:1.1},scene:{water:0,mist:.2,view:1.3,flora:.4,relief:.8,night:1,skyDim:.35}},{slug:"verdure",title:"Verdure",wheel:["VERDURE","BOTANIC"],year:2023,description:"An ever-growing garden for a botanical archive — L-system plants seeded from each visitor's cursor, kept alive between sessions.",credits:"Concept, Design & Development",url:"https://example.com/verdure",coverImage:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",color:[.5,1.4,.35],matter:{veins:.9,veinScale:.6,bands:.9,bandScale:.5,density:.8},scene:{water:.03,mist:1.1,view:.95,flora:1,relief:.9,night:0,skyDim:.8}},{slug:"braise",title:"Braise",wheel:["BRAISE","RECORDS"],year:2023,description:"Audio-reactive label site: each release is a slab of molten glass, shaded by the track's own spectrum in real time.",credits:"Creative Development with Ondine",url:"https://example.com/braise",coverImage:"https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80",color:[1.7,.35,.3],matter:{veins:2,veinScale:1.8,bands:.6,bandScale:1.6,density:1.4},scene:{water:-.05,mist:.5,view:.8,flora:.3,relief:1.4,night:1,skyDim:.5}},{slug:"lanterne",title:"Lanterne",wheel:["LANTERNE","MUSEUM"],year:2022,description:"Permanent installation and companion site for a museum of light: 60 lanterns, one volumetric shader, zero video.",credits:"Installation & Web — Lead Developer",url:"https://example.com/lanterne",coverImage:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",color:[1.3,.85,.45],matter:{veins:.5,veinScale:1.1,bands:1.4,bandScale:.9,density:.9},scene:{water:.05,mist:1.4,view:1.1,flora:.6,relief:.6,night:0,skyDim:.7}}],b={Source:{intensity:1,height:1.05,drift:.35},Lumiere:{ambient:.9,rim:.6,bloom:.55,bloomThreshold:.85,bloomRadius:.55},Matiere:{veins:1,veinScale:1,bands:1,bandScale:1,density:1},Decor:{steleGlow:1,pointerGlow:.9,waterReflect:1,waterRipple:1,waterStir:1,birds:1,floraBend:1},Inclusion:{depth:.55,ior:1.5,parallax:.28,frost:.6,strength:1},Fracture:{pointerRadius:.25,conductionRate:2.5,decay:1.6,openOffset:.9,springW0:7.5,lift:.025,spread:.012},Lanterne:{breath:.8,orgSpeed:1,erodeRelief:.62,caustics:1},Roue:{radius:2.3,verticalStep:.72,angleStep:.6,bokehWidth:8.5,farOpacity:.14,meniscusStrength:.08,snapStrength:6,holdPull:1.1,holdTilt:.22,holdScale:.86},Fluide:{frostAmp:1,frostWarp:.012,trailLife:1.4},Post:{vignette:.38,grain:.035}},R=(r,e,t)=>Math.min(t,Math.max(e,r)),we=(r,e,t)=>r+(e-r)*t,j=(r,e,t,o)=>we(r,e,1-Math.exp(-t*o)),Mt=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,Ot=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;function Xe(r){return()=>{r|=0,r=r+1831565813|0;let e=Math.imul(r^r>>>15,1|r);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Bi=["veins","veinScale","bands","bandScale","density"],Ii=["water","mist","view","flora","relief","night","skyDim"];function Ct(r,e,t){const o={color:[0,0,0],matter:{...r.matter},scene:{...r.scene}};for(let s=0;s<3;s++)o.color[s]=we(r.color[s],e.color[s],t);for(const s of Bi)o.matter[s]=we(r.matter[s],e.matter[s],t);for(const s of Ii)o.scene[s]=we(r.scene[s],e.scene[s],t);return o}const He=0,Oi=1,Ui=new w,Pt=new si,Ke=new Lt,Rt=new w,Ue=new ai;class Wi{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Et,this.unassigned=new Et,this.vertices=[]}setFromPoints(e){if(e.length>=4){this.makeEmpty();for(let t=0,o=e.length;t<o;t++)this.vertices.push(new Vi(e[t]));this.compute()}return this}setFromObject(e){const t=[];return e.updateMatrixWorld(!0),e.traverse(function(o){const s=o.geometry;if(s!==void 0){const a=s.attributes.position;if(a!==void 0)for(let l=0,u=a.count;l<u;l++){const i=new w;i.fromBufferAttribute(a,l).applyMatrix4(o.matrixWorld),t.push(i)}}}),this.setFromPoints(t)}containsPoint(e){const t=this.faces;for(let o=0,s=t.length;o<s;o++)if(t[o].distanceToPoint(e)>this.tolerance)return!1;return!0}intersectRay(e,t){const o=this.faces;let s=-1/0,a=1/0;for(let l=0,u=o.length;l<u;l++){const i=o[l],f=i.distanceToPoint(e.origin),c=i.normal.dot(e.direction);if(f>0&&c>=0)return null;const v=c!==0?-f/c:0;if(!(v<=0)&&(c>0?a=Math.min(v,a):s=Math.max(v,s),s>a))return null}return s!==-1/0?e.at(s,t):e.at(a,t),t}intersectsRay(e){return this.intersectRay(e,Ui)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(e,t){return e.face=t,t.outside===null?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this}removeVertexFromFace(e,t){return e===t.outside&&(e.next!==null&&e.next.face===t?t.outside=e.next:t.outside=null),this.assigned.remove(e),this}removeAllVerticesFromFace(e){if(e.outside!==null){const t=e.outside;let o=e.outside;for(;o.next!==null&&o.next.face===e;)o=o.next;return this.assigned.removeSubList(t,o),t.prev=o.next=null,e.outside=null,t}}deleteFaceVertices(e,t){const o=this.removeAllVerticesFromFace(e);if(o!==void 0)if(t===void 0)this.unassigned.appendChain(o);else{let s=o;do{const a=s.next;t.distanceToPoint(s.point)>this.tolerance?this.addVertexToFace(s,t):this.unassigned.append(s),s=a}while(s!==null)}return this}resolveUnassignedPoints(e){if(this.unassigned.isEmpty()===!1){let t=this.unassigned.first();do{const o=t.next;let s=this.tolerance,a=null;for(let l=0;l<e.length;l++){const u=e[l];if(u.mark===He){const i=u.distanceToPoint(t.point);if(i>s&&(s=i,a=u),s>1e3*this.tolerance)break}}a!==null&&this.addVertexToFace(t,a),t=o}while(t!==null)}return this}computeExtremes(){const e=new w,t=new w,o=[],s=[];for(let a=0;a<3;a++)o[a]=s[a]=this.vertices[0];e.copy(this.vertices[0].point),t.copy(this.vertices[0].point);for(let a=0,l=this.vertices.length;a<l;a++){const u=this.vertices[a],i=u.point;for(let f=0;f<3;f++)i.getComponent(f)<e.getComponent(f)&&(e.setComponent(f,i.getComponent(f)),o[f]=u);for(let f=0;f<3;f++)i.getComponent(f)>t.getComponent(f)&&(t.setComponent(f,i.getComponent(f)),s[f]=u)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(e.x),Math.abs(t.x))+Math.max(Math.abs(e.y),Math.abs(t.y))+Math.max(Math.abs(e.z),Math.abs(t.z))),{min:o,max:s}}computeInitialHull(){const e=this.vertices,t=this.computeExtremes(),o=t.min,s=t.max;let a=0,l=0;for(let h=0;h<3;h++){const m=s[h].point.getComponent(h)-o[h].point.getComponent(h);m>a&&(a=m,l=h)}const u=o[l],i=s[l];let f,c;a=0,Pt.set(u.point,i.point);for(let h=0,m=this.vertices.length;h<m;h++){const g=e[h];if(g!==u&&g!==i){Pt.closestPointToPoint(g.point,!0,Rt);const M=Rt.distanceToSquared(g.point);M>a&&(a=M,f=g)}}a=-1,Ke.setFromCoplanarPoints(u.point,i.point,f.point);for(let h=0,m=this.vertices.length;h<m;h++){const g=e[h];if(g!==u&&g!==i&&g!==f){const M=Math.abs(Ke.distanceToPoint(g.point));M>a&&(a=M,c=g)}}const v=[];if(Ke.distanceToPoint(c.point)<0){v.push(Z.create(u,i,f),Z.create(c,i,u),Z.create(c,f,i),Z.create(c,u,f));for(let h=0;h<3;h++){const m=(h+1)%3;v[h+1].getEdge(2).setTwin(v[0].getEdge(m)),v[h+1].getEdge(1).setTwin(v[m+1].getEdge(0))}}else{v.push(Z.create(u,f,i),Z.create(c,u,i),Z.create(c,i,f),Z.create(c,f,u));for(let h=0;h<3;h++){const m=(h+1)%3;v[h+1].getEdge(2).setTwin(v[0].getEdge((3-h)%3)),v[h+1].getEdge(0).setTwin(v[m+1].getEdge(1))}}for(let h=0;h<4;h++)this.faces.push(v[h]);for(let h=0,m=e.length;h<m;h++){const g=e[h];if(g!==u&&g!==i&&g!==f&&g!==c){a=this.tolerance;let M=null;for(let y=0;y<4;y++){const K=this.faces[y].distanceToPoint(g.point);K>a&&(a=K,M=this.faces[y])}M!==null&&this.addVertexToFace(g,M)}}return this}reindexFaces(){const e=[];for(let t=0;t<this.faces.length;t++){const o=this.faces[t];o.mark===He&&e.push(o)}return this.faces=e,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let e,t=0;const o=this.assigned.first().face;let s=o.outside;do{const a=o.distanceToPoint(s.point);a>t&&(t=a,e=s),s=s.next}while(s!==null&&s.face===o);return e}}computeHorizon(e,t,o,s){this.deleteFaceVertices(o),o.mark=Oi;let a;t===null?a=t=o.getEdge(0):a=t.next;do{const l=a.twin,u=l.face;u.mark===He&&(u.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,l,u,s):s.push(a)),a=a.next}while(a!==t);return this}addAdjoiningFace(e,t){const o=Z.create(e,t.tail(),t.head());return this.faces.push(o),o.getEdge(-1).setTwin(t.twin),o.getEdge(0)}addNewFaces(e,t){this.newFaces=[];let o=null,s=null;for(let a=0;a<t.length;a++){const l=t[a],u=this.addAdjoiningFace(e,l);o===null?o=u:u.next.setTwin(s),this.newFaces.push(u.face),s=u}return o.next.setTwin(s),this}addVertexToHull(e){const t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let e;for(this.computeInitialHull();(e=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}class Z{constructor(){this.normal=new w,this.midpoint=new w,this.area=0,this.constant=0,this.outside=null,this.mark=He,this.edge=null}static create(e,t,o){const s=new Z,a=new Ze(e,s),l=new Ze(t,s),u=new Ze(o,s);return a.next=u.prev=l,l.next=a.prev=u,u.next=l.prev=a,s.edge=a,s.compute()}getEdge(e){let t=this.edge;for(;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t}compute(){const e=this.edge.tail(),t=this.edge.head(),o=this.edge.next.head();return Ue.set(e.point,t.point,o.point),Ue.getNormal(this.normal),Ue.getMidpoint(this.midpoint),this.area=Ue.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(e){return this.normal.dot(e)-this.constant}}class Ze{constructor(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceTo(e.point):-1}lengthSquared(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceToSquared(e.point):-1}setTwin(e){return this.twin=e,e.twin=this,this}}class Vi{constructor(e){this.point=e,this.prev=null,this.next=null,this.face=null}}class Et{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(e,t){return t.prev=e.prev,t.next=e,t.prev===null?this.head=t:t.prev.next=t,e.prev=t,this}insertAfter(e,t){return t.prev=e,t.next=e.next,t.next===null?this.tail=t:t.next.prev=t,e.next=t,this}append(e){return this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this}appendChain(e){for(this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail;e.next!==null;)e=e.next;return this.tail=e,this}remove(e){return e.prev===null?this.head=e.next:e.prev.next=e.next,e.next===null?this.tail=e.prev:e.next.prev=e.prev,this}removeSubList(e,t){return e.prev===null?this.head=t.next:e.prev.next=t.next,t.next===null?this.tail=e.prev:t.next.prev=e.prev,this}isEmpty(){return this.head===null}}class Gi extends Ye{constructor(e=[]){super();const t=[],o=[],a=new Wi().setFromPoints(e).faces;for(let l=0;l<a.length;l++){const u=a[l];let i=u.edge;do{const f=i.head().point;t.push(f.x,f.y,f.z),o.push(u.normal.x,u.normal.y,u.normal.z),i=i.next}while(i!==u.edge)}this.setAttribute("position",new Me(t,3)),this.setAttribute("normal",new Me(o,3))}}const ue=`
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
`,Ut=`
float terrainH(vec2 xz, float relief){
  float r=length(xz);
  float h=(fbm2(xz*0.16)-0.42)*2.4;
  float far=fbm2(xz*0.05+3.0); h+=far*far*2.6*smoothstep(6.0,16.0,r);
  h*=relief; h*=smoothstep(0.75,3.4,r);
  return h-0.02;
}
`,ke=`
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
`,I={H:2.4,W:.9,D:.42,center:new w(0,1.02,0)};function Wt(r){const e=(.86+.3*Math.sin(r*2.4))*(1-Math.pow(r,3.2)*.72);return{a:.45*e*(I.W/.9),b:.21*e*(I.D/.42),cx:.1*r*r-.03*Math.sin(r*3),cz:.03*Math.sin(r*2)}}function Se(r,e,t=new w){const o=R(e/I.H,0,1),s=Wt(o),a=Math.cos(r),l=Math.sin(r),u=1+.045*(Math.sin(r*3+e*2.1)+.5*Math.sin(r*7-e*4.3)+.35*Math.sin(e*9+r*1.7)),i=Math.sign(a)*Math.pow(Math.abs(a),.78),f=Math.sign(l)*Math.pow(Math.abs(l),.78),c=1+.18*l;return t.set(s.cx+s.a*i*u,e,s.cz+s.b*f*u*c),t}function Ae(r){const e=Wt(R(r/I.H,0,1));return new w(e.cx,r,e.cz)}function Hi(r,e){const o=Se(r,e),s=Se(r+.001,e),a=Se(r,e+.001),l=new w().crossVectors(a.sub(o),s.sub(o)).normalize(),u=Ae(e);return l.dot(o.clone().sub(u))<0&&l.negate(),l}function qi(){const r=Xe(1337),e=[],t=44,o=46;for(let c=0;c<=o;c++){const v=-.22+(I.H+.22)*(c/o);for(let h=0;h<t;h++){const m=h/t*Math.PI*2+c%2*Math.PI/t;e.push({p:Se(m,v),n:Hi(m,v),radial:1,surface:!0})}}for(let c=0;c<12;c++){const v=c/12*Math.PI*2,h=Se(v,I.H),m=Ae(I.H);h.lerp(m,.55),h.y=I.H+.05,e.push({p:h,n:new w(0,1,0),radial:.7,surface:!0})}{const c=Ae(I.H);c.y=I.H+.075,e.push({p:c,n:new w(0,1,0),radial:.4,surface:!0})}for(let c=0;c<1400;c++){const v=-.2+(I.H+.1)*r(),h=r()*Math.PI*2,m=Math.sqrt(r())*.96,g=R(v,0,I.H),M=Ae(g).lerp(Se(h,g),m);M.y=v,e.push({p:M,n:null,radial:m,surface:!1})}const s=16,a=[];for(let c=0;c<s;c++){const v=.02+(I.H-.1)*((c+.5+(r()-.5)*.7)/s),h=Ae(R(v,0,I.H));a.push(new w(h.x+(r()-.5)*.5,v,h.z+(r()-.5)*.25))}const l=(c,v)=>{const h=c.x-v.x,m=(c.y-v.y)*.95,g=(c.z-v.z)*.8;return h*h+m*m+g*g},u=a.map(()=>[]);for(const c of e){let v=0,h=1/0;for(let m=0;m<s;m++){const g=l(c.p,a[m]);g<h&&(h=g,v=m)}u[v].push(c)}const i=c=>`${c.x.toFixed(5)},${c.y.toFixed(5)},${c.z.toFixed(5)}`,f=[];return u.forEach((c,v)=>{if(c.length<16)return;const h=new Map;c.forEach(A=>h.set(i(A.p),A));let m;try{m=new Gi(c.map(A=>A.p))}catch{return}const g=m.attributes.position,M=m.attributes.normal,y=g.count,K=new Float32Array(y),J=new Float32Array(y),H=new w,ee=new w,L=new w,z=new w,oe=new w;for(let A=0;A<y;A+=3){const fe=[0,1,2].map(q=>h.get(i(H.fromBufferAttribute(g,A+q))));ee.fromBufferAttribute(g,A),L.fromBufferAttribute(g,A+1),z.fromBufferAttribute(g,A+2),oe.crossVectors(L.clone().sub(ee),z.clone().sub(ee)).normalize();let se=!1;const[ve,pe,me]=fe;if(ve?.n&&pe?.n&&me?.n&&ve.surface&&pe.surface&&me.surface){const q=ve.n.clone().add(pe.n).add(me.n).normalize();se=oe.dot(q)>.55}for(let q=0;q<3;q++){const te=fe[q];K[A+q]=se?0:1,J[A+q]=te?te.radial:.5,se&&te&&te.n&&M.setXYZ(A+q,te.n.x,te.n.y,te.n.z)}}m.setAttribute("aInner",new Je(K,1)),m.setAttribute("aRadial",new Je(J,1)),m.computeBoundingBox();const U=new w;m.boundingBox.getCenter(U),m.translate(-U.x,-U.y,-U.z),f.push({geo:m,center:U,seed:a[v],rand:r()})}),f}const E={uTime:{value:0},uColor:{value:new w(1,.3,.1)},uDensity:{value:1},uVeins:{value:1},uVeinScale:{value:1},uBands:{value:1},uBandScale:{value:1},uLightPos:{value:new w(0,1.05,0)},uIntensity:{value:1},uReveal:{value:0},uAmbient:{value:.9},uRim:{value:.6},uPointer:{value:new w(0,-10,0)},uPointerOn:{value:0},uPointerRadius:{value:.25},uOpen:{value:0},uErode:{value:0},uErodeRelief:{value:.62},uCorePos:{value:new w(0,1.1,0)},uBreath:{value:0},uCover:{value:null},uCoverAspect:{value:1.6},uIncl:{value:1},uInclDepth:{value:.55},uIor:{value:1.5},uParallax:{value:.28},uFrost:{value:.6},uNight:{value:0},uHeat:{value:0},uCellCenter:{value:new w},uCellSeed:{value:0}},Dt=new G({uniforms:E,side:tt,vertexShader:`
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
    }`,fragmentShader:`
    ${ue}
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
    }`}),Vt=new it,je=qi().map((r,e)=>{const t=new ie(r.geo,Dt);t.position.copy(r.center);const o=new w(r.center.x*2,(r.center.y-1)*.5,r.center.z*3.4);return o.length()<.05&&o.set(r.rand-.5,.1,.4),t.userData={center:r.center.clone(),heat:0,seed:r.rand,dir:o.normalize(),idx:e,rot:new kt((r.rand-.5)*.5,(r.rand*7%1-.5)*.6,(r.rand*13%1-.5)*.5)},t.onBeforeRender=()=>{E.uHeat.value=t.userData.heat,E.uCellCenter.value.copy(t.userData.center),E.uCellSeed.value=t.userData.seed*10,Dt.uniformsNeedUpdate=!0},Vt.add(t),t}),ji=je.map(r=>je.filter(e=>e!==r&&r.userData.center.distanceTo(e.userData.center)<.75)),re=new ie(new Ft(.16,32,24),new ot({color:new Ce(2.6,1.25,.5),transparent:!0,opacity:0}));re.position.set(.02,1.12,0);const Gt=42,le=new Nt(new ni(.03,0),new ot({color:new Ce(1.4,.55,.25)}),Gt);le.visible=!1;const zt=(()=>{const r=Xe(99),e=[];for(let t=0;t<Gt;t++)e.push({v:new w((r()-.5)*2.4,r()*1.8+.4,(r()-.2)*2.6),s:.4+r()*1.2,y0:.2+r()*2,life:0});return e})(),W={uTime:{value:0},uMap:{value:null},uUnfold:{value:0},uFold:{value:1},uPointer:{value:new V},uColor:{value:E.uColor.value},uOpacity:{value:0}},$i=new G({uniforms:W,transparent:!0,side:tt,depthWrite:!1,vertexShader:`
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
    }`,fragmentShader:`
    uniform sampler2D uMap; uniform float uOpacity,uUnfold; uniform vec3 uColor;
    varying vec2 vUv; varying float vShade;
    void main(){
      vec3 c=texture2D(uMap,vUv).rgb*vShade;
      // molten edge as it unfolds
      float e=min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y));
      float edge=1.0-smoothstep(0.0,0.03,e);
      c+=uColor*edge*(1.4-uUnfold*1.1);
      gl_FragColor=vec4(c,uOpacity);
    }`}),et=new ie(new Le(1.7,1.7/1.6,40,26),$i),X=new it;X.position.set(0,1.08,.05);X.add(et);X.visible=!1;const be=new it;function At(r,e,t){const o=document.createElement("canvas");o.width=2048,o.height=640;const s=o.getContext("2d");s.clearRect(0,0,o.width,o.height),s.fillStyle="#f4f2ee",s.textAlign="center",s.textBaseline="alphabetic",s.save(),s.translate(1024,0),s.scale(.8,1),s.font='800 262px Inter, "Neue Montreal", system-ui, sans-serif';const[a,l]=r.wheel;s.fillText(a,0,285),s.fillText(l,0,560),s.restore(),s.font="500 54px Inter, system-ui, sans-serif",s.textAlign="left",s.fillStyle="rgba(244,242,238,0.75)",s.fillText(String(e+1).padStart(2,"0"),150,120);const u=new st(o);return u.colorSpace=We,u.anisotropy=Math.min(8,t),u.generateMipmaps=!0,u.minFilter=ci,u.needsUpdate=!0,u}const Qi=`
  varying vec2 vUv; varying float vX;
  void main(){ vUv=uv; vec4 w=modelMatrix*vec4(position,1.0); vX=w.x; gl_Position=projectionMatrix*viewMatrix*w; }`,Yi=`
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
  }`,$e=[];function Xi(r,e){r.forEach((t,o)=>{const s={uMap:{value:At(t,o,e)},uOpacity:{value:1},uBlur:{value:0},uActive:{value:0},uMeniscus:{value:b.Roue.meniscusStrength},uTime:E.uTime,uColor:{value:E.uColor.value}},a=new G({uniforms:s,vertexShader:Qi,fragmentShader:Yi,transparent:!0,depthWrite:!1,blending:ui,blendSrc:li,blendDst:ri}),l=new ie(new Le(3.4,3.4*640/2048),a);l.labelUniforms=s,be.add(l),$e.push(l)}),Ht(),document.fonts?.load("800 100px Inter").then(()=>$e.forEach((t,o)=>{t.labelUniforms.uMap.value.dispose(),t.labelUniforms.uMap.value=At(r[o],o,e)})).catch(()=>{})}function Ht(){const r=b.Roue;$e.forEach((e,t)=>{const o=t*r.angleStep;e.position.set(Math.sin(o)*r.radius,-t*r.verticalStep,Math.cos(o)*r.radius),e.rotation.set(0,o,0)})}const O={uTime:E.uTime,uColor:E.uColor,uLightPos:E.uLightPos,uReveal:E.uReveal,uRelief:{value:1},uMist:{value:.5},uNight:{value:0},uSkyDim:{value:1},uWater:{value:0},uPointerGround:{value:new w(0,0,0)},uPointerOn:{value:0},uPointerGlow:{value:.9},uSteleGlow:{value:1},uErode:E.uErode,uCaustics:{value:1},uStir:{value:new hi(0,0,0,0)},uFloraBend:{value:1},uWaterReflect:{value:1},uWaterRipple:{value:1}},Ki=new G({uniforms:{uNight:O.uNight,uSkyDim:O.uSkyDim,uTime:E.uTime},side:di,depthWrite:!1,vertexShader:"varying vec3 vDir; void main(){ vDir=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    ${ue} ${ke}
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
    }`}),Zi=new ie(new Ft(70,32,16),Ki),Ji=new G({uniforms:O,vertexShader:`
    ${ue} ${Ut}
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
    }`,fragmentShader:`
    ${ue} ${ke}
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
    }`}),qt=new ie(new Le(60,60,260,260),Ji);qt.frustumCulled=!1;const eo=new G({uniforms:O,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",fragmentShader:`
    ${ue} ${ke}
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
    }`}),Qe=new ie(new Le(60,60),eo);Qe.rotation.x=-Math.PI/2;const _e=Ot?2400:6500,Pe=new Ye;Pe.setAttribute("position",new Me([-.018,0,0,.018,0,0,0,.26,0],3));Pe.setAttribute("uv",new Me([0,0,1,0,.5,1],2));Pe.setIndex([0,1,2]);const to=new G({uniforms:O,side:tt,vertexShader:`
    ${ue} ${Ut}
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
    }`,fragmentShader:`
    ${ue} ${ke}
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
    }`}),at=new Nt(Pe,to,_e);{const r=Xe(7),e=new Float32Array(_e*3),t=new Float32Array(_e*2);for(let o=0;o<_e;o++){const s=r()*Math.PI*2,a=1.1+Math.pow(r(),.7)*13;e[o*3]=Math.cos(s)*a,e[o*3+1]=0,e[o*3+2]=Math.sin(s)*a,t[o*2]=r(),t[o*2+1]=r()}Pe.setAttribute("aOffset",new St(e,3)),Pe.setAttribute("aRand",new St(t,2)),at.frustumCulled=!1}const io=r=>new G({uniforms:{uTime:E.uTime,uMist:O.uMist,uColor:E.uColor,uNight:O.uNight,uSkyDim:O.uSkyDim,uLayer:{value:r}},transparent:!0,depthWrite:!1,vertexShader:"varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",fragmentShader:`
    ${ue} ${ke}
    uniform float uTime,uMist,uLayer,uNight,uSkyDim; uniform vec3 uColor; varying vec3 vWorld;
    void main(){
      vec2 q=vWorld.xz*0.22+vec2(uTime*0.012*(1.0+uLayer),uLayer*7.0);
      float n=fbm2(q)*fbm2(q*1.9+vec2(uTime*0.02,0.0))*2.2;
      float r=length(vWorld.xz);
      float a=n*uMist*0.55*(1.0-smoothstep(4.0,16.0,r))*smoothstep(0.6,2.2,r);
      vec3 hor=skyColor(vec3(0.0,0.02,-1.0),uNight,uSkyDim);
      vec3 col=hor*1.4+uColor*0.1/(1.0+r*r*0.4);
      gl_FragColor=vec4(col,clamp(a,0.0,1.0));
    }`}),oo=[.1,.32,.62].map((r,e)=>{const t=new ie(new Le(40,40),io(e));return t.rotation.x=-Math.PI/2,t.position.y=r,t.renderOrder=2,t}),jt=14,nt=new Ye;nt.setAttribute("position",new Je(new Float32Array(jt*3),3));const so=(()=>{const r=document.createElement("canvas");r.width=r.height=64;const e=r.getContext("2d");return e.strokeStyle="#000",e.lineWidth=5,e.lineCap="round",e.beginPath(),e.moveTo(8,36),e.quadraticCurveTo(20,20,32,34),e.quadraticCurveTo(44,20,56,36),e.stroke(),new st(r)})(),$t=new fi(nt,new vi({size:.22,map:so,transparent:!0,opacity:.55,color:1182730,depthWrite:!1,sizeAttenuation:!0})),ao=(()=>{const r=Xe(5),e=[];for(let t=0;t<jt;t++)e.push({a:r()*Math.PI*2,r:18+r()*14,y:4+r()*4,sp:.03+r()*.02,ph:r()*6});return e})();function no(r){r.add(Zi,qt,Qe,at,$t,...oo)}const Qt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ee{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ro=new pi(-1,1,1,-1,0,1);class lo extends Ye{constructor(){super(),this.setAttribute("position",new Me([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Me([0,2,0,0,2,0],2))}}const uo=new lo;class rt{constructor(e){this._mesh=new ie(uo,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ro)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Yt extends Ee{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof G?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qe.clone(e.uniforms),this.material=new G({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new rt(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _t extends Ee{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,o){const s=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,l,4294967295),a.buffers.stencil.setClear(u),a.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class co extends Ee{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ho{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const o=e.getSize(new V);this._width=o.width,this._height=o.height,t=new Ve(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ge}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Yt(Qt),this.copyPass.material.blending=mi,this.clock=new Bt}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let o=!1;for(let s=0,a=this.passes.length;s<a;s++){const l=this.passes[s];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),l.needsSwap){if(o){const u=this.renderer.getContext(),i=this.renderer.state.buffers.stencil;i.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),i.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}_t!==void 0&&(l instanceof _t?o=!0:l instanceof co&&(o=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new V);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const o=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(o,s),this.renderTarget2.setSize(o,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(o,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class fo extends Ee{constructor(e,t,o=null,s=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=o,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ce}render(e,t,o){const s=e.autoClear;e.autoClear=!1;let a,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=s}}const vo={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ce(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Re extends Ee{constructor(e,t,o,s){super(),this.strength=t!==void 0?t:1,this.radius=o,this.threshold=s,this.resolution=e!==void 0?new V(e.x,e.y):new V(256,256),this.clearColor=new Ce(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new Ve(a,l,{type:Ge}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const h=new Ve(a,l,{type:Ge});h.texture.name="UnrealBloomPass.h"+v,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const m=new Ve(a,l,{type:Ge});m.texture.name="UnrealBloomPass.v"+v,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),a=Math.round(a/2),l=Math.round(l/2)}const u=vo;this.highPassUniforms=qe.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new G({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];const i=[3,5,7,9,11];a=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(i[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new V(1/a,1/l),a=Math.round(a/2),l=Math.round(l/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=Qt;this.copyUniforms=qe.clone(c.uniforms),this.blendMaterial=new G({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:gi,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ce,this.oldClearAlpha=1,this.basic=new ot,this.fsQuad=new rt(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(o,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(o,s),this.renderTargetsVertical[a].setSize(o,s),this.separableBlurMaterials[a].uniforms.invSize.value=new V(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2)}render(e,t,o,s,a){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const l=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=o.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let u=this.renderTargetBright;for(let i=0;i<this.nMips;i++)this.fsQuad.material=this.separableBlurMaterials[i],this.separableBlurMaterials[i].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[i].uniforms.direction.value=Re.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[i]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[i].uniforms.colorTexture.value=this.renderTargetsHorizontal[i].texture,this.separableBlurMaterials[i].uniforms.direction.value=Re.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[i]),e.clear(),this.fsQuad.render(e),u=this.renderTargetsVertical[i];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(o),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=l}getSeperableBlurMaterial(e){const t=[];for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(e*e))/e);return new G({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new V(.5,.5)},direction:{value:new V(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new G({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Re.BlurDirectionX=new V(1,0);Re.BlurDirectionY=new V(0,1);const po={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class mo extends Ee{constructor(){super();const e=po;this.uniforms=qe.clone(e.uniforms),this.material=new xi({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new rt(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},yi.getTransfer(this._outputColorSpace)===bi&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===wi?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Si?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ti?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===It?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Mi?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ci&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Te=12;function go(r,e,t){const o=new ho(r);o.addPass(new fo(e,t));const s=new Re(new V(1,1),b.Lumiere.bloom,b.Lumiere.bloomRadius,b.Lumiere.bloomThreshold);o.addPass(s),o.addPass(new mo);const a={tDiffuse:{value:null},uRes:{value:new V(1,1)},uTime:{value:0},uTrail:{value:Array.from({length:Te},()=>new w(-1,-1,0))},uFrost:{value:1},uWarp:{value:.012},uVignette:{value:.38},uGrain:{value:.035}},l=new Yt({uniforms:a,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uTime,uFrost,uWarp,uVignette,uGrain; uniform vec3 uTrail[${Te}];
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 uv=vUv; float aspect=uRes.x/uRes.y;
      vec2 warp=vec2(0.0); float frost=0.0;
      for(int i=0;i<${Te};i++){
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
    }`});return o.addPass(l),{composer:o,bloom:s,frostPass:l,frostUniforms:a}}class xo{constructor(){he(this,"ctx",null);he(this,"on",!1);he(this,"master");he(this,"pink");he(this,"white");he(this,"hoverAcc",0)}ensure(){if(this.ctx)return;const e=this.ctx=new AudioContext;this.master=e.createGain(),this.master.gain.value=0,this.master.connect(e.destination);const t=e.sampleRate*4,o=e.createBuffer(1,t,e.sampleRate),s=o.getChannelData(0);let a=0,l=0,u=0,i=0,f=0,c=0,v=0;for(let L=0;L<t;L++){const z=Math.random()*2-1;a=.99886*a+z*.0555179,l=.99332*l+z*.0750759,u=.969*u+z*.153852,i=.8665*i+z*.3104856,f=.55*f+z*.5329522,c=-.7616*c-z*.016898,s[L]=(a+l+u+i+f+c+v+z*.5362)*.11,v=z*.115926}this.pink=o;const h=e.createBuffer(1,e.sampleRate,e.sampleRate),m=h.getChannelData(0);for(let L=0;L<m.length;L++)m[L]=Math.random()*2-1;this.white=h;const g=e.createBufferSource();g.buffer=o,g.loop=!0;const M=e.createBiquadFilter();M.type="lowpass",M.frequency.value=420,M.Q.value=.7;const y=e.createBiquadFilter();y.type="bandpass",y.frequency.value=900,y.Q.value=1.6;const K=e.createGain();K.gain.value=.55;const J=e.createGain();J.gain.value=.12,g.connect(M).connect(K).connect(this.master),g.connect(y).connect(J).connect(this.master);const H=(L,z,oe)=>{const U=e.createOscillator();U.frequency.value=L;const A=e.createGain();A.gain.value=z,U.connect(A).connect(oe),U.start()};H(.07,220,M.frequency),H(.11,.06,J.gain),H(.05,350,y.frequency),g.start();const ee=e.createGain();ee.gain.value=.045,ee.connect(this.master);for(const L of[48,48.4]){const z=e.createOscillator();z.type="sine",z.frequency.value=L,z.connect(ee),z.start()}}toggle(e){this.ensure();const t=this.ctx;return this.on=e??!this.on,t.resume(),this.master.gain.cancelScheduledValues(t.currentTime),this.master.gain.setTargetAtTime(this.on?.9:0,t.currentTime,.5),this.on}noiseBurst({dur:e=.05,type:t="highpass",freq:o=2e3,q:s=1,gain:a=.1,pink:l=!1,attack:u=.002}){const i=this.ctx,f=i.createBufferSource();f.buffer=l?this.pink:this.white,f.loop=!0,f.playbackRate.value=.8+Math.random()*.4;const c=i.createBiquadFilter();c.type=t,c.frequency.value=o,c.Q.value=s;const v=i.createGain(),h=i.currentTime;v.gain.setValueAtTime(1e-4,h),v.gain.exponentialRampToValueAtTime(a,h+u),v.gain.exponentialRampToValueAtTime(1e-4,h+u+e),f.connect(c).connect(v).connect(this.master),f.start(h),f.stop(h+u+e+.05)}tone({freq:e=440,dur:t=.3,gain:o=.1,type:s="sine",slide:a=null,attack:l=.005,fm:u=0}){const i=this.ctx,f=i.currentTime,c=i.createOscillator();if(c.type=s,c.frequency.setValueAtTime(e,f),a&&c.frequency.exponentialRampToValueAtTime(a,f+t),u){const h=i.createOscillator();h.frequency.value=e*1.41;const m=i.createGain();m.gain.value=u,h.connect(m).connect(c.frequency),h.start(f),h.stop(f+t+.1)}const v=i.createGain();v.gain.setValueAtTime(1e-4,f),v.gain.exponentialRampToValueAtTime(o,f+l),v.gain.exponentialRampToValueAtTime(1e-4,f+t),c.connect(v).connect(this.master),c.start(f),c.stop(f+t+.05)}hover(e,t){this.on&&(this.hoverAcc+=t*(6+e*40),this.hoverAcc>1&&Math.random()<.6&&(this.hoverAcc=0,this.noiseBurst({dur:.012+Math.random()*.02,freq:1800+Math.random()*3e3,gain:.03+e*.05,q:2})))}break(){this.on&&(this.tone({freq:72,slide:32,dur:.7,gain:.7,attack:.003}),this.noiseBurst({dur:.28,type:"lowpass",freq:700,gain:.35,pink:!0,attack:.004}),this.noiseBurst({dur:.08,type:"bandpass",freq:2600,q:1.5,gain:.18}),[1320,1980,2640,3300].forEach((e,t)=>setTimeout(()=>this.tone({freq:e*(1+(Math.random()-.5)*.01),dur:1.6-t*.2,gain:.05-t*.008,fm:30}),40+t*55)))}close(){this.on&&(this.tone({freq:56,slide:40,dur:.45,gain:.35}),this.noiseBurst({dur:.2,type:"lowpass",freq:500,gain:.18,pink:!0}),setTimeout(()=>this.noiseBurst({dur:.03,type:"bandpass",freq:3e3,gain:.1}),180))}wheel(){this.on&&(this.noiseBurst({dur:.012,type:"highpass",freq:2500,gain:.12}),this.tone({freq:880+Math.random()*60,slide:620,dur:.045,gain:.07,type:"triangle"}))}about(e){this.on&&(this.noiseBurst({dur:.5,type:"bandpass",freq:e?700:400,q:.8,gain:.12,pink:!0,attack:.08}),this.tone({freq:e?220:165,dur:.9,gain:.03,fm:12}))}}const D=r=>{const e=document.querySelector(r);if(!e)throw new Error(`Missing element ${r}`);return e},N=document.body,x={canvas:D("#gl"),header:D("#site-header"),brand:D("#site-header .brand"),navAbout:D("#nav-about"),navClose:D("#nav-close"),index:D("#project-index"),sheet:D("#project-sheet"),sheetDesc:D("#sheet-desc"),sheetIdx:D("#sheet-idx"),sheetCredits:D("#sheet-credits"),sheetYear:D("#sheet-year"),sheetVisit:D("#sheet-visit"),visitRoll:D("#visit-roll"),prev:D("#project-prev"),next:D("#project-next"),about:D("#about-panel"),aboutName:D("#about-panel .name"),copyEmail:D("#copy-email"),sound:D("#sound-toggle"),loadPct:D("#load-pct"),noglList:D("#nogl-list")},Y=B.length;function yo(){try{const r=new Ai({canvas:x.canvas,antialias:!1,powerPreference:"high-performance",alpha:!1});return r.getContext()?r:null}catch{return null}}function bo(){const r=yo();if(!r){N.classList.add("stone-off","stele-ui"),x.noglList.innerHTML=B.map(n=>`<li><a href="${n.url}" target="_blank" rel="noopener">${n.title}</a> — ${n.description} <em>(${n.year})</em></li>`).join("");return}r.setPixelRatio(Math.min(devicePixelRatio||1,Ot?1.25:1.5)),r.toneMapping=It,r.toneMappingExposure=1,r.outputColorSpace=We;const e=new Pi,t=new Ri(32,1,.1,120),o={baseZ:6.2,baseY:1.35,lookY:1.02};e.add(Vt,re,le,X,be),Xi(B,r.capabilities.getMaxAnisotropy()),no(e);const{composer:s,bloom:a,frostUniforms:l}=go(r,e,t),u=new xo,i={pos:0,target:0,active:0,lastWheelAt:0,open:-1,openT:0,about:!1,aboutShift:0,hold:0,holding:!1,holdTimer:0,dragging:!1,dragMoved:0,hoverCell:null,pointerOn:0,pointerWorld:new w(0,-10,0),pointerGround:new w,px:0,py:0,sx:0,sy:0,viewMul:1},f=new V(-2,-2),c=new Ei,v=new Lt(new w(0,1,0),0),h=Array.from({length:Te},()=>({x:-1,y:-1,t:-10}));let m=0,g={x:0,y:0};const M=new Bt;let y=Ct(B[0],B[0],0);const K=new Di;K.crossOrigin="anonymous";function J(n){const d=document.createElement("canvas");d.width=1024,d.height=640;const p=d.getContext("2d"),T=`rgb(${Math.round(R(n.color[0],0,1)*255)},${Math.round(R(n.color[1],0,1)*255)},${Math.round(R(n.color[2],0,1)*255)})`,P=p.createLinearGradient(0,0,1024,640);P.addColorStop(0,"#141010"),P.addColorStop(.55,T),P.addColorStop(1,"#f4f2ee"),p.fillStyle=P,p.fillRect(0,0,1024,640),p.fillStyle="rgba(5,4,4,0.75)",p.font="800 150px Inter, system-ui, sans-serif",p.textAlign="center",p.fillText(n.wheel[0],512,370);const S=new st(d);return S.colorSpace=We,S}const H=Array.from({length:Y},()=>null);let ee=0;function L(){const n=R(.05+.95*ee/Y,0,1);document.documentElement.style.setProperty("--stele-progress",n.toFixed(3)),x.loadPct.textContent=String(Math.round(n*100)).padStart(2,"0")}const z=B.map((n,d)=>new Promise(p=>{const T=S=>{S.colorSpace=We,S.wrapS=S.wrapT=_i,S.anisotropy=4,H[d]=S,ee++,L(),p()},P=setTimeout(()=>{H[d]||T(J(n))},9e3);K.load(n.coverImage,S=>{clearTimeout(P),H[d]||T(S)},void 0,()=>{clearTimeout(P),H[d]||T(J(n))})})),oe=n=>H[n]??(H[n]=J(B[n])),U=n=>{const d=n.image;return d?.width&&d.height?d.width/d.height:1.6};function A(n){i.px=n.clientX/innerWidth,i.py=n.clientY/innerHeight,f.set(i.px*2-1,-(i.py*2-1));const d=i.px-g.x,p=i.py-g.y;if(d*d+p*p>4e-4){g={x:i.px,y:i.py};const T=h[m++%Te];T.x=i.px,T.y=1-i.py,T.t=M.elapsedTime}}const fe=()=>{i.lastWheelAt=performance.now(),N.classList.add("has-scrolled")};x.canvas.addEventListener("pointermove",n=>{if(A(n),!i.dragging)return;const d=n.movementX+n.movementY*.6;i.dragMoved+=Math.abs(d),i.open<0&&!i.about&&(i.target=R(i.target-d*.004*(i.holding?1.8:1),0,Y-1),fe())}),x.canvas.addEventListener("pointerdown",n=>{A(n),i.dragging=!0,i.dragMoved=0,x.canvas.setPointerCapture(n.pointerId),clearTimeout(i.holdTimer),i.open<0&&!i.about&&(i.holdTimer=window.setTimeout(()=>{i.dragging&&(i.holding=!0,N.classList.add("is-jogging"))},260))}),window.addEventListener("pointerup",()=>{if(!i.dragging)return;i.dragging=!1,clearTimeout(i.holdTimer);const n=i.holding;if(i.holding=!1,N.classList.remove("is-jogging"),n||i.dragMoved>6){i.target=R(Math.round(i.target),0,Y-1);return}if(!i.about){if(i.open>=0){i.hoverCell||ge();return}i.hoverCell&&Be(i.active)}}),x.canvas.addEventListener("pointerleave",()=>f.set(-2,-2)),window.addEventListener("wheel",n=>{if(i.open>=0||i.about)return;const d=R(n.deltaY,-120,120)*(n.deltaMode===1?20:1);i.target=R(i.target+d*.0024,0,Y-1),fe()},{passive:!0}),window.addEventListener("keydown",n=>{if(n.ctrlKey&&n.shiftKey&&n.code==="KeyD"){n.preventDefault(),ht();return}if(n.key==="Escape"){i.open>=0?ge():i.about&&xe();return}n.target instanceof HTMLElement&&/INPUT|TEXTAREA/.test(n.target.tagName)||((n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),se(1)),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),se(-1)),n.key==="Enter"&&i.open<0&&!i.about&&document.activeElement===N&&Be(i.active))});function se(n){if(i.about)return;const d=R((i.open>=0?i.open:Math.round(i.target))+n,0,Y-1);i.open>=0?d!==i.open&&lt(d):(i.target=d,fe())}B.forEach((n,d)=>{const p=document.createElement("button");p.type="button",p.setAttribute("aria-label",`${n.title} — project ${d+1} of ${Y}`),p.innerHTML="<i></i>",p.addEventListener("click",()=>{i.open>=0||(i.target=d,Math.abs(i.pos-d)<.01&&Be(d))}),x.index.appendChild(p)});const ve=()=>x.index.querySelectorAll("button").forEach((n,d)=>n.setAttribute("aria-current",d===i.active?"true":"false"));"Visit website".split("").forEach((n,d)=>{const p=document.createElement("span");p.className="char",p.style.setProperty("--i",String(d));const T=n===" "?" ":n;p.dataset.char=T,p.textContent=T,x.visitRoll.appendChild(p)});function pe(n){const d=B[n];x.sheetDesc.textContent=d.description,x.sheetIdx.textContent=String(n+1).padStart(2,"0"),x.sheetCredits.textContent=d.credits||d.title,x.sheetYear.textContent=`© ${d.year}`,x.sheetVisit.href=d.url}const me=()=>x.sheet.querySelectorAll(".line"),q=()=>Q.fromTo(me(),{yPercent:110},{yPercent:0,duration:.9,ease:"power3.out",stagger:.07,delay:.3,overwrite:!0}),te=()=>Q.to(me(),{yPercent:110,duration:.4,ease:"power2.in",stagger:.03,overwrite:!0});x.prev.addEventListener("click",n=>{n.preventDefault(),se(-1)}),x.next.addEventListener("click",n=>{n.preventDefault(),se(1)});let Fe=null;const Ne=n=>{x.navAbout.hidden=n,x.navClose.hidden=!n};function Be(n,d=!1){if(i.open>=0||i.about)return;i.open=n,i.target=n,N.classList.add("is-open"),pe(n),x.sheet.classList.add("is-visible"),x.prev.classList.toggle("is-visible",n>0),x.next.classList.toggle("is-visible",n<Y-1),q(),Ne(!0);const p=oe(n);W.uMap.value=p,X.visible=!0,et.scale.set(1,1.6/U(p),1),d||u.break(),le.visible=!0,zt.forEach(T=>{T.life=0}),Fe?.kill(),Fe=Q.timeline().to(i,{openT:1,duration:1.4,ease:"elastic.out(1, 0.55)"},0).to(W.uOpacity,{value:1,duration:.5,ease:"power2.out"},.12).to(W.uUnfold,{value:1,duration:1.3,ease:"power3.out"},.18).to(W.uFold,{value:0,duration:1.1,ease:"power3.inOut"},.18),De(`#/projects/${B[n].slug}`)}function ge(){i.open<0||(i.open=-1,N.classList.remove("is-open"),x.sheet.classList.remove("is-visible"),x.prev.classList.remove("is-visible"),x.next.classList.remove("is-visible"),te(),Ne(!1),u.close(),Fe?.kill(),Fe=Q.timeline({onComplete:()=>{X.visible=!1,le.visible=!1}}).to(W.uFold,{value:1,duration:.5,ease:"power3.in"},0).to(W.uUnfold,{value:0,duration:.5,ease:"power3.in"},0).to(W.uOpacity,{value:0,duration:.3,ease:"power2.in"},.25).to(i,{openT:0,duration:.9,ease:"elastic.out(1, 0.7)"},.3),De("#/"))}function lt(n){i.open=n,i.target=n,u.wheel(),x.prev.classList.toggle("is-visible",n>0),x.next.classList.toggle("is-visible",n<Y-1),te(),Q.timeline().to(W.uFold,{value:.8,duration:.35,ease:"power2.in"},0).to(W.uOpacity,{value:.2,duration:.3},0).call(()=>{const d=oe(n);W.uMap.value=d,et.scale.set(1,1.6/U(d),1),pe(n),q()}).to(W.uFold,{value:0,duration:.9,ease:"power3.out"}).to(W.uOpacity,{value:1,duration:.5},"<"),De(`#/projects/${B[n].slug}`)}let Ie=null;function ut(){if(i.about)return;i.open>=0&&ge(),i.about=!0,N.classList.add("is-about","stele-about-route"),x.about.classList.add("is-active"),Ne(!0),u.about(!0);const n=x.brand.getBoundingClientRect();Q.set(x.aboutName,{clearProps:"transform"});const d=x.aboutName.getBoundingClientRect();N.classList.add("brand-flipped"),Q.fromTo(x.aboutName,{x:n.left-d.left,y:n.top-d.top,scale:n.width/d.width},{x:0,y:0,scale:1,duration:1,ease:"power3.inOut",onComplete:()=>x.about.classList.add("is-live")}),Ie?.kill(),Ie=Q.timeline().fromTo("#about-panel .rest",{opacity:0},{opacity:1,duration:.8,ease:"power2.out"},.5).fromTo("#about-panel .line",{yPercent:110},{yPercent:0,duration:.9,ease:"power3.out",stagger:.045},.45).to(i,{aboutShift:1,duration:1.3,ease:"power3.inOut"},0).to(E.uErode,{value:1,duration:1.6,ease:"power2.inOut"},.2).to(re.material,{opacity:1,duration:.8},.6),De("#/about")}function xe(){if(!i.about)return;i.about=!1,N.classList.remove("is-about","stele-about-route"),x.about.classList.remove("is-live"),Ne(!1),u.about(!1);const n=x.aboutName.getBoundingClientRect(),d=x.brand.getBoundingClientRect();Q.to(x.aboutName,{x:d.left-n.left,y:d.top-n.top,scale:d.width/n.width,duration:.8,ease:"power3.inOut",onComplete:()=>{N.classList.remove("brand-flipped"),Q.set(x.aboutName,{clearProps:"transform"}),x.about.classList.remove("is-active")}}),Ie?.kill(),Ie=Q.timeline().to("#about-panel .line",{yPercent:110,duration:.45,ease:"power2.in",stagger:.02},0).to("#about-panel .rest",{opacity:0,duration:.4},0).to(i,{aboutShift:0,duration:1.1,ease:"power3.inOut"},.1).to(E.uErode,{value:0,duration:1,ease:"power2.inOut"},0).to(re.material,{opacity:0,duration:.5},0),De("#/")}x.navAbout.addEventListener("click",n=>{n.preventDefault(),ut()}),x.navClose.addEventListener("click",()=>{i.open>=0?ge():xe()}),x.brand.addEventListener("click",n=>{n.preventDefault(),i.open>=0&&ge(),i.about&&xe()}),x.aboutName.querySelector("a")?.addEventListener("click",n=>{n.preventDefault(),xe()});let ct=0;x.copyEmail.addEventListener("click",async()=>{const n=x.copyEmail,d=n.querySelector(".row"),p=n.dataset.email??"";try{await navigator.clipboard.writeText(p)}catch{}n.classList.add("is-copied"),d.textContent="Copied",clearTimeout(ct),ct=window.setTimeout(()=>{n.classList.remove("is-copied"),d.textContent="Copy email"},1800)});function De(n){location.hash!==n&&history.replaceState(null,"",n)}function dt(){const n=location.hash.replace(/^#\/?/,"");if(n==="about"){i.about||ut();return}const d=n.match(/^projects\/(.+)$/);if(d){const p=B.findIndex(T=>T.slug===d[1]);p>=0&&(i.about&&xe(),i.open!==p&&(i.pos=i.target=p,i.open<0?Be(p,!0):lt(p)));return}i.open>=0&&ge(),i.about&&xe()}window.addEventListener("hashchange",dt),x.sound.addEventListener("click",()=>{const n=u.toggle();x.sound.classList.toggle("is-on",n),x.sound.setAttribute("aria-pressed",String(n))});let ce=null;async function ht(){if(ce){ce.show(ce._hidden);return}try{const{default:n}=await Ni(async()=>{const{default:p}=await import("./lil-gui.esm-BVNW_y_o.js");return{default:p}},[],import.meta.url);ce=new n({title:"Stele inspector"});for(const[p,T]of Object.entries(b)){const P=ce.addFolder(p);P.close();for(const S of Object.keys(T))P.add(T,S,0,Math.max(3,T[S]*3),.001).onChange(()=>Ht())}const d={"Copy project preset":()=>{const p=B[i.active],T=JSON.stringify({color:p.color,matter:p.matter,scene:p.scene},null,2);navigator.clipboard?.writeText(T),console.log(T)},"Toggle stone":()=>N.classList.toggle("stone-off")};ce.add(d,"Copy project preset"),ce.add(d,"Toggle stone")}catch(n){console.warn("Inspector unavailable",n)}}new URLSearchParams(location.search).has("debug")&&ht();const ye=new w,ft=new w,vt=new w,pt=new zi,mt=new Li,gt=new w,Xt=new kt;function xt(){const n=innerWidth,d=innerHeight;r.setSize(n,d,!1),s.setSize(n,d),t.aspect=n/d,t.updateProjectionMatrix();const p=r.getPixelRatio();l.uRes.value.set(n*p,d*p)}addEventListener("resize",xt),xt();function Kt(n){let d=null;if(f.x>-1.5&&!i.holding){c.setFromCamera(f,t);const P=c.intersectObjects(je,!1);P.length&&(d=P[0]),c.ray.intersectPlane(v,i.pointerGround)||i.pointerGround.set(0,0,0)}const p=!!d&&!i.about;i.hoverCell=p?d.object:null,N.classList.toggle("is-stone-hover",p&&i.open<0),p&&i.pointerWorld.copy(d.point),i.pointerOn=j(i.pointerOn,p?1:0,10,n),E.uPointer.value.copy(i.pointerWorld),E.uPointerOn.value=i.pointerOn,O.uPointerGround.value.copy(i.pointerGround),O.uPointerOn.value=j(O.uPointerOn.value,f.x>-1.5?1:0,6,n),p&&O.uStir.value.set(i.pointerGround.x,i.pointerGround.z,1,0),O.uStir.value.z=j(O.uStir.value.z,0,2.5,n)*b.Decor.waterStir,p&&i.hoverCell&&u.hover(i.hoverCell.userData.heat,n);const T=b.Fracture;for(const P of je){const S=P.userData,k=P===i.hoverCell,C=!!i.hoverCell&&ji[S.idx].includes(i.hoverCell),F=k?1:C?.45:0;S.heat=F>S.heat?j(S.heat,F,T.conductionRate,n):j(S.heat,F,T.decay,n);const $=i.openT;ye.copy(S.dir).multiplyScalar($*T.openOffset*(.8+S.seed*.5)),ye.y+=$*.18*(S.seed-.3),ft.copy(S.center).sub(I.center).normalize().multiplyScalar(S.heat*T.spread),ye.add(ft),ye.z+=S.heat*T.lift,P.position.copy(S.center).add(ye),P.rotation.set(S.rot.x*$,S.rot.y*$,S.rot.z*$)}le.visible&&(zt.forEach((P,S)=>{P.life+=n;const k=Math.min(P.life,3),C=R(1-k/2.6,0,1)*i.openT,F=P.v.x*k*.6,$=P.y0+P.v.y*k*.6-1.2*k*k,Oe=P.v.z*k*.6;mt.setFromEuler(Xt.set(k*3+S,k*2,k)),gt.setScalar(P.s*C),pt.compose(ye.set(F,Math.max($,.02),Oe),mt,gt),le.setMatrixAt(S,pt)}),le.instanceMatrix.needsUpdate=!0,le.material.color.setRGB(y.color[0]*1.3,y.color[1]*1.3,y.color[2]*1.3))}function yt(){requestAnimationFrame(yt);const n=Math.min(M.getDelta(),.05),d=M.elapsedTime;E.uTime.value=d,W.uTime.value=d,l.uTime.value=d,i.open<0&&!i.holding&&performance.now()-i.lastWheelAt>140&&(i.target=j(i.target,Math.round(i.target),b.Roue.snapStrength,n)),i.pos=j(i.pos,i.target,i.holding?9:6,n);const p=R(Math.round(i.pos),0,Y-1);p!==i.active&&(i.active=p,u.wheel(),ve());const T=R(Math.floor(i.pos),0,Y-1),P=R(T+1,0,Y-1),S=R(i.pos-T,0,1);y=Ct(B[T],B[P],S);const k=b.Matiere,C=E,F=O;C.uColor.value.set(y.color[0],y.color[1],y.color[2]),C.uDensity.value=y.matter.density*k.density,C.uVeins.value=y.matter.veins*k.veins,C.uVeinScale.value=y.matter.veinScale*k.veinScale,C.uBands.value=y.matter.bands*k.bands,C.uBandScale.value=y.matter.bandScale*k.bandScale,C.uNight.value=y.scene.night,F.uNight.value=y.scene.night,F.uSkyDim.value=y.scene.skyDim,F.uRelief.value=y.scene.relief,F.uMist.value=y.scene.mist,Qe.position.y=y.scene.water,Qe.visible=y.scene.water>-.11,at.count=Math.max(0,Math.floor(_e*R(y.scene.flora,0,1))),F.uPointerGlow.value=b.Decor.pointerGlow,F.uSteleGlow.value=b.Decor.steleGlow,F.uFloraBend.value=b.Decor.floraBend,F.uWaterReflect.value=b.Decor.waterReflect,F.uWaterRipple.value=b.Decor.waterRipple,F.uCaustics.value=b.Lanterne.caustics,C.uIntensity.value=b.Source.intensity,C.uAmbient.value=b.Lumiere.ambient,C.uRim.value=b.Lumiere.rim,C.uPointerRadius.value=b.Fracture.pointerRadius,C.uInclDepth.value=b.Inclusion.depth,C.uIor.value=b.Inclusion.ior,C.uParallax.value=b.Inclusion.parallax,C.uFrost.value=b.Inclusion.frost,C.uErodeRelief.value=b.Lanterne.erodeRelief,a.strength=b.Lumiere.bloom,a.threshold=b.Lumiere.bloomThreshold,a.radius=b.Lumiere.bloomRadius,l.uFrost.value=b.Fluide.frostAmp,l.uWarp.value=b.Fluide.frostWarp,l.uVignette.value=b.Post.vignette,l.uGrain.value=b.Post.grain,C.uLightPos.value.set(Math.sin(d*.37)*.08*b.Source.drift,b.Source.height+Math.sin(d*.23)*.12*b.Source.drift,Math.cos(d*.31)*.05*b.Source.drift),C.uIncl.value=R(1-Math.abs(i.pos-i.active)*2.2,0,1)*b.Inclusion.strength;const $=H[i.active];$&&C.uCover.value!==$&&(C.uCover.value=$,C.uCoverAspect.value=U($)),C.uOpen.value=i.openT;const Oe=(Math.sin(d*1.3*b.Lanterne.orgSpeed)*.5+.5)*b.Lanterne.breath;C.uBreath.value=Oe,re.scale.setScalar(.85+Oe*.35),re.position.set(.02+Math.sin(d*.7)*.03,1.12+Math.sin(d*.9)*.05,Math.cos(d*.6)*.02),re.visible=re.material.opacity>.01;const ae=b.Roue;i.hold=j(i.hold,i.holding?1:0,6,n),be.rotation.y=-i.pos*ae.angleStep,be.position.y=1.3+i.pos*ae.verticalStep,be.rotation.x=i.hold*ae.holdTilt,be.scale.setScalar(we(1,ae.holdScale,i.hold));const Jt=(1-i.openT)*(1-i.aboutShift)*C.uReveal.value;$e.forEach((_,de)=>{const ne=Math.abs(de-i.pos),ze=_.labelUniforms;ze.uActive.value=R(1-ne,0,1),ze.uBlur.value=R(ne/.9,0,1)*ae.bokehWidth*.55,ze.uOpacity.value=we(ae.farOpacity,1,Math.pow(R(1-ne/2.2,0,1),1.4))*Jt,ze.uMeniscus.value=ae.meniscusStrength,_.visible=ze.uOpacity.value>.005}),Kt(n),X.visible&&(X.rotation.y=j(X.rotation.y,(i.px-.5)*.35,5,n),X.rotation.x=j(X.rotation.x,-(i.py-.5)*.25,5,n),X.position.z=.05+i.openT*.25),i.viewMul=j(i.viewMul,y.scene.view,3,n),i.sx=j(i.sx,i.px-.5,4,n),i.sy=j(i.sy,i.py-.5,4,n);const bt=-i.aboutShift*(innerWidth>768?1.55:0),ei=o.baseZ*i.viewMul+i.hold*ae.holdPull+i.openT*.4;t.position.set(bt+i.sx*.5,o.baseY+.3*(i.viewMul-1)-i.sy*.25+i.hold*.15,ei),vt.set(bt,o.lookY-i.hold*.1,0),t.lookAt(vt),innerWidth<=768&&i.about&&(t.position.y+=.9);const wt=nt.attributes.position;ao.forEach((_,de)=>{_.a+=n*_.sp;const ne=Math.sin(d*6+_.ph)*.08;wt.setXYZ(de,Math.cos(_.a)*_.r,_.y+Math.sin(_.a*3+_.ph)*.6+ne,Math.sin(_.a)*_.r-6)}),wt.needsUpdate=!0,$t.material.opacity=.55*b.Decor.birds*(1-y.scene.night*.7)*C.uReveal.value;const ti=l.uTrail.value;for(let _=0;_<Te;_++){const de=h[_],ne=d-de.t;ti[_].set(de.x,de.y,R(1-ne/b.Fluide.trailLife,0,1)*(1-Math.exp(-ne*12)))}s.render()}L();const Zt=new Promise(n=>setTimeout(n,Mt?200:1500));Promise.all([Promise.all(z),Zt,document.fonts?document.fonts.ready:Promise.resolve()]).then(()=>{const n=oe(0);E.uCover.value=n,E.uCoverAspect.value=U(n),r.compile(e,t),s.render(),document.documentElement.style.setProperty("--stele-progress","1"),setTimeout(()=>{N.classList.add("stele-wired"),Q.to(E.uReveal,{value:1,duration:Mt?.2:2.4,ease:"power2.inOut"}),setTimeout(()=>{N.classList.add("stele-ui"),ve(),dt()},500)},450)}),M.start(),yt()}bo();
