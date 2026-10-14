import * as T from '../../shared/vendor/three.module.min.js';

const TAU = Math.PI * 2;
const GREEN = new T.Color('#099b48'), BLUE = new T.Color('#0757a3');
const lerp = (a,b,t) => a + (b-a)*t;
function rng(seed=71) { return () => { seed = (seed*16807)%2147483647; return (seed-1)/2147483646; }; }

/** Dedicated product scene, rebuilt from actual frames rather than the gallery template. */
export async function createProductScene(canvas, onState) {
  await document.fonts.load('400 60px Lobster');
  let renderer;
  try { renderer = new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'}); }
  catch { onState('fallback');return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setClearColor(0,0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene=new T.Scene();
  const camera=new T.PerspectiveCamera(34,1,.1,100);
  camera.position.set(0,0,14.4);camera.lookAt(0,0,0);
  const disposables=new Set();
  const track=x=>(disposables.add(x),x);
  const white=new T.Color('#ffffff');
  const seed=rng();
  const mat=(color,metalness=0,roughness=.4)=>track(new T.MeshStandardMaterial({color,metalness,roughness}));
  const mesh=(g,m,parent)=>{track(g);const o=new T.Mesh(g,m);parent.add(o);return o;};
  const ambient=new T.HemisphereLight('#d3fff0','#133929',1.25);scene.add(ambient);
  const key=new T.DirectionalLight('#ffffff',2.7);key.position.set(-4,6,7);scene.add(key);
  const side=new T.DirectionalLight('#c7ffdf',2.2);side.position.set(4,2,-1);scene.add(side);
  const fill=new T.DirectionalLight('#ffffff',.65);fill.position.set(1,-3,5);scene.add(fill);
  const env=makeEnvironment(renderer);scene.environment=env.texture;track(env);

  function texture(draw,w=2048,h=2048){
    const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);
    const t=track(new T.CanvasTexture(c));t.colorSpace=T.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;
  }
  const colorMaps=[makeLabel('#008438'),makeLabel('#0b519a')];
  function makeLabel(color){
    return texture((c,w,h)=>{
      c.fillStyle=color;c.fillRect(0,0,w,h);
      const shade=c.createLinearGradient(0,0,w,0);shade.addColorStop(0,'#0008');shade.addColorStop(.2,'#0002');shade.addColorStop(.42,'#fff1');shade.addColorStop(.65,'#fff0');shade.addColorStop(1,'#0008');c.fillStyle=shade;c.fillRect(0,0,w,h);
      // Fine brushed print grain, deliberately below the product lettering.
      for(let i=0;i<10000;i++){c.fillStyle=seed()>.5?'#ffffff05':'#00000005';c.fillRect(seed()*w,seed()*h,.6,3+seed()*8);}
      c.textAlign='center';c.fillStyle='#f4f5e9';c.font='bold 47px Arial';c.fillText('ORIGINAL DO BRASIL',w/2,183);
      c.save();c.translate(w/2-345,310);drawEmblem(c,690,690);c.restore();
      c.fillStyle='#e1e4d4';c.font='400 157px Lobster';c.fillText('Guaraná',w/2,1235);
      c.font='38px Arial';spacedText(c,'ANTARCTICA',w/2,1320,11);
      c.font='bold 59px Arial';c.fillText('350ml',w/2,1630);
      c.font='bold 23px Arial';c.fillText('REFRIGERANTE DE GUARANÁ',w/2,1670);c.fillText('CONTÉM AROMATIZANTE',w/2,1704);
      // The back remains plausible during a full spin, without pretending to be a real label.
      c.save();c.translate(145,620);c.fillStyle='#ecf1d8';c.font='600 26px Arial';c.textAlign='left';c.fillText('INFORMAÇÃO NUTRICIONAL',0,0);c.font='22px Arial';for(let i=0;i<9;i++){c.fillRect(0,35+i*44,245,1);c.fillText(['PORÇÃO 350ml','VALOR ENERGÉTICO','CARBOIDRATOS','AÇÚCARES','SÓDIO','DESIGN RECONSTRUCTION','NOT A PRODUCT LABEL','',''][i],0,62+i*44);}for(let i=0;i<60;i++){c.fillRect(i*4,495,(i%3)+1,110);}c.restore();
    });
  }
  const bodyMaterial=track(new T.MeshPhysicalMaterial({map:colorMaps[0],metalness:.85,roughness:.235,clearcoat:.7,clearcoatRoughness:.25,envMapIntensity:1.25}));
  const metal=track(new T.MeshStandardMaterial({color:'#d5d8d5',metalness:.94,roughness:.23,envMapIntensity:1.5}));
  const darkMetal=mat('#4f5854',.92,.28);
  const rig=new T.Group();scene.add(rig);
  const can=createCan(bodyMaterial);rig.add(can);can.rotation.y=Math.PI;

  function createCan(bodyMat){
    const group=new T.Group();
    const profile=[
      [0,-2.98],[1.04,-2.98],[1.115,-2.94],[1.15,-2.89],[1.16,-2.81],[1.22,-2.71],
      [1.29,-2.56],[1.32,-2.42],[1.325,2.30],[1.305,2.40],[1.26,2.54],[1.175,2.70],
      [1.16,2.77],[1.20,2.81],[1.205,2.85],[1.19,2.89],[0,2.89]
    ];
    const geo=new T.LatheGeometry(profile.map(p=>new T.Vector2(...p)),128);
    const uv=geo.attributes.uv,pos=geo.attributes.position;
    for(let i=0;i<uv.count;i++)uv.setY(i,(pos.getY(i)+2.98)/5.87);
    // Lathe segments below the printed sidewall are bare aluminum.
    const printed=[],aluminum=[],original=geo.index.array;
    for(let segment=0;segment<128;segment++)for(let row=0;row<profile.length-1;row++){
      const target=row<6||row>12?aluminum:printed,offset=(segment*(profile.length-1)+row)*6;
      for(let k=0;k<6;k++)target.push(original[offset+k]);
    }
    geo.setIndex([...printed,...aluminum]);geo.clearGroups();
    geo.addGroup(0,printed.length,0);geo.addGroup(printed.length,aluminum.length,1);
    mesh(geo,[bodyMat,metal],group);
    // A separate lower skirt reads as real unprinted aluminum, not a painted cylinder.
    const bottomProfile=[[1.29,-2.56],[1.265,-2.67],[1.205,-2.76],[1.16,-2.84],[1.15,-2.91],[1.10,-2.97],[1.035,-2.98]];
    // The grouped base above avoids coplanar surfaces and visible z-fighting.
    const upperRim=mesh(new T.TorusGeometry(1.182,.043,12,128),metal,group);upperRim.rotation.x=Math.PI/2;upperRim.position.y=2.854;
    const upperInset=mesh(new T.TorusGeometry(1.122,.022,10,128),darkMetal,group);upperInset.rotation.x=Math.PI/2;upperInset.position.y=2.858;
    const top=mesh(new T.CylinderGeometry(1.135,1.135,.03,96),metal,group);top.position.y=2.833;
    const bevel=mesh(new T.TorusGeometry(1.053,.021,8,96),metal,group);bevel.rotation.x=Math.PI/2;bevel.position.y=2.86;
    const opening=mesh(new T.SphereGeometry(1,24,16),mat('#151e1b',.5,.35),group);opening.scale.set(.30,.012,.40);opening.position.set(0,2.86,-.36);
    const tab=mesh(new T.TorusGeometry(.235,.056,12,40),metal,group);tab.rotation.x=Math.PI/2;tab.scale.set(.7,1.3,1);tab.position.set(0,2.9,.17);
    const rivet=mesh(new T.SphereGeometry(.068,16,12),metal,group);rivet.scale.y=.35;rivet.position.set(0,2.925,0);
    const lowerRim=mesh(new T.TorusGeometry(1.09,.029,10,128),darkMetal,group);lowerRim.rotation.x=Math.PI/2;lowerRim.position.y=-2.961;
    return group;
  }

  // Subtle condensation is instanced, so it adds specular detail without 90 draw calls.
  const dropletMat=track(new T.MeshPhysicalMaterial({color:'#d7fff0',metalness:.1,roughness:.1,transparent:true,opacity:.24,clearcoat:1}));
  const dropGeo=track(new T.SphereGeometry(1,10,8));
  const drops=new T.InstancedMesh(dropGeo,dropletMat,85);can.add(drops);
  const dummy=new T.Object3D();
  for(let i=0;i<85;i++){const a=seed()*TAU,s=.009+seed()*.022;dummy.position.set(Math.sin(a)*1.33,-2.4+seed()*4.7,Math.cos(a)*1.33);dummy.scale.set(s,s*1.45,s*.7);dummy.updateMatrix();drops.setMatrixAt(i,dummy.matrix);}

  const cherryMap=texture((c,w,h)=>{
    c.fillStyle='#ca0013';c.fillRect(0,0,w,h);
    const image=c.getImageData(0,0,w,h);for(let i=0;i<image.data.length;i+=4){const n=(seed()-.5)*24;image.data[i]+=n;image.data[i+1]=Math.max(0,8+n*.2);image.data[i+2]=Math.max(0,17+n*.5);}c.putImageData(image,0,0);
    for(let i=0;i<600;i++){c.fillStyle='#ffc2ae15';c.beginPath();c.ellipse(seed()*w,seed()*h,1+seed()*2,2+seed()*4,0,0,TAU);c.fill();}
  },512,512);
  const cherryMat=track(new T.MeshPhysicalMaterial({map:cherryMap,color:'#ba1020',roughness:.24,metalness:.04,clearcoat:1,clearcoatRoughness:.15,envMapIntensity:1.2}));
  const cherryGeo=new T.SphereGeometry(1,48,36);
  const cp=cherryGeo.attributes.position;
  for(let i=0;i<cp.count;i++){
    const x=cp.getX(i),y=cp.getY(i),z=cp.getZ(i),a=Math.atan2(z,x);
    const dimple=Math.exp(-(x*x+z*z)*14)*Math.max(0,y)*.24;
    cp.setXYZ(i,x*(1+.045*Math.cos(2*a)),y*.98-dimple,z*(1-.045*Math.cos(2*a)));
  }
  cherryGeo.computeVertexNormals();track(cherryGeo);
  const stemMat=mat('#548827',.02,.45),stemEnd=mat('#7b3c1c',.05,.75);
  function cherry(){
    const g=new T.Group();mesh(cherryGeo,cherryMat,g);
    const stem=mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(0,.79,0),new T.Vector3(.13,1.15,.03),new T.Vector3(.57,1.49,.02),new T.Vector3(.75,1.71,.07)]),30,.045,7,false),stemMat,g);
    const end=mesh(new T.SphereGeometry(.076,12,8),stemEnd,g);end.position.set(.75,1.71,.07);end.scale.set(1,1.5,1);
    return g;
  }
  const berryMap=texture((c,w,h)=>{
    const image=c.createImageData(w,h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const u=x/w*TAU,v=y/h*Math.PI;
      const nx=Math.sin(v)*Math.cos(u),ny=Math.cos(v),nz=Math.sin(v)*Math.sin(u);
      const clouds=.53*noise3(nx*3.5+7,ny*3.5+8,nz*3.5+9)+.27*noise3(nx*10+4,ny*10+5,nz*10+6)+.14*noise3(nx*28,ny*28,nz*28)+.06*noise3(nx*63,ny*63,nz*63);
      const grain=(seed()-.5)*.30,bloom=Math.max(0,Math.min(1,(clouds-.23)*1.8+grain)),i=(y*w+x)*4;
      image.data[i]=13+bloom*111;image.data[i+1]=19+bloom*114;image.data[i+2]=47+bloom*139;image.data[i+3]=255;
    }c.putImageData(image,0,0);
    for(let i=0;i<13000;i++){c.fillStyle=seed()>.6?'#c6ceff18':'#18254124';c.fillRect(seed()*w,seed()*h,1+seed()*2,1+seed()*2);}
  },1024,512);
  const berryMat=track(new T.MeshPhysicalMaterial({map:berryMap,roughness:.5,metalness:.04,clearcoat:.23,clearcoatRoughness:.3,envMapIntensity:.8}));
  const berryGeo=new T.SphereGeometry(1,56,40);const bp=berryGeo.attributes.position;
  for(let i=0;i<bp.count;i++){const x=bp.getX(i),y=bp.getY(i),z=bp.getZ(i);const lump=1+.025*Math.sin(Math.atan2(z,x)*5)*Math.sin(Math.acos(Math.max(-1,Math.min(1,y)))*3);bp.setXYZ(i,x*lump,y*.96,z*lump);}berryGeo.computeVertexNormals();track(berryGeo);
  const crownMat=mat('#3b3959',.02,.66);
  function berry(){
    const g=new T.Group();mesh(berryGeo,berryMat,g);
    const indentation=mesh(new T.SphereGeometry(.18,20,12),mat('#292332',.04,.7),g);indentation.position.y=.935;indentation.scale.set(1,.2,1);
    const cv=[],ci=[];
    for(let ring=0;ring<2;ring++)for(let j=0;j<=50;j++){
      const a=j/50*TAU,r=ring?.15+.05*Math.cos(a*5):.065;
      cv.push(Math.cos(a)*r,.925+(ring?.05+.025*Math.cos(a*5):0),Math.sin(a)*r);
      if(ring&&j<50){const p=j;ci.push(p,p+1,51+p,p+1,52+p,51+p);}
    }
    const cg=new T.BufferGeometry();cg.setAttribute('position',new T.Float32BufferAttribute(cv,3));cg.setIndex(ci);cg.computeVertexNormals();mesh(cg,crownMat,g);
g.rotation.x=1.15;return g;
  }
  const leafMap=texture((c,w,h)=>{
    c.fillStyle='#487c25';c.fillRect(0,0,w,h);const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#789143');g.addColorStop(.45,'#547c30');g.addColorStop(.55,'#244d26');g.addColorStop(1,'#274b2c');c.fillStyle=g;c.fillRect(0,0,w,h);
    c.strokeStyle='#a9bb684c';c.lineWidth=3;c.beginPath();c.moveTo(0,h/2);c.lineTo(w,h/2);c.stroke();for(let i=0;i<16;i++){const x=i*w/16;c.lineWidth=1;c.beginPath();c.moveTo(x,h/2);c.lineTo(x+w*.2,0);c.moveTo(x,h/2);c.lineTo(x+w*.2,h);c.stroke();}
  },512,128);
  const leafMat=track(new T.MeshStandardMaterial({map:leafMap,roughness:.68,side:T.DoubleSide}));
  function leaf(){
    const verts=[],uvs=[],indices=[];const N=24;
    for(let i=0;i<=N;i++){const u=i/N,x=(u-.5)*1.4,w=Math.pow(Math.sin(Math.PI*u),.8)*.24;for(let side=0;side<3;side++){const v=side/2;verts.push(x,(v-.5)*w*2,Math.sin(u*Math.PI)*.075+Math.abs(v-.5)*.11);uvs.push(u,v);}}
    for(let i=0;i<N;i++)for(let j=0;j<2;j++){const a=i*3+j;indices.push(a,a+3,a+1,a+1,a+3,a+4);}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();return mesh(geo,leafMat,scene);
  }
  // Normalized layout anchors measured against the 1440 × 1026 reference frames.
  const fruitSpecs=[
    [.395,.445,.44,.7,-.75], [.724,.422,.45,.95,2.8], [.805,.58,.34,1.1,-.6],
    [.486,.29,.22,.8,-.4], [.475,.675,.18,.65,1.3], [.278,.80,.20,.6,1.3],
    [.425,.17,.14,-.3,.2], [.388,.868,.115,-.15,-1]
  ];
  const fruits=fruitSpecs.map((spec,i)=>{const ch=cherry(),be=berry();scene.add(ch,be);ch.rotation.z=spec[4];be.rotation.set(1.1+i*.31,.3+i*.7,.5);return {ch,be,spec,base:new T.Vector3(),velocity:new T.Vector2(),offset:new T.Vector2(),phase:seed()*TAU};});
  const leaves=[[.27,.90,.65,-.3],[.825,.515,.7,.3],[.208,.207,.3,-.5],[.61,.805,.25,1.2]].map(spec=>({obj:leaf(),spec}));
  const bubbleMaterial=track(new T.MeshBasicMaterial({color:'#b3f5df',transparent:true,opacity:.12,depthWrite:false}));
  const bubbleHighlight=track(new T.MeshBasicMaterial({color:'#ddfff5',transparent:true,opacity:.12,depthWrite:false}));
  const bubbles=Array.from({length:23},(_,i)=>{
    const g=new T.Group();scene.add(g);const radius=.025+seed()*.055;
    const ring=mesh(new T.TorusGeometry(radius,.004,5,32),bubbleMaterial,g);
    const arc=mesh(new T.TorusGeometry(radius*.85,.006,5,18,Math.PI*.7),bubbleHighlight,g);arc.rotation.z=.45;
    return {g,x:seed(),y:seed(),speed:.012+seed()*.014,z:-.5-seed()*1.4};
  });

  let width=1,height=1,mobile=false,selected=0,from=0,transition=1,spinStart=0,angle=0,transitionStarted=0;
  let auto=true,time=0,raf=0,last=0,visible=true,pointer={x:0,y:0},spring={x:0,y:0,vx:0,vy:0};
  const smooth=t=>t*t*(3-2*t);
  const unproject=(u,v,z=0)=>{
    const distance=camera.position.z-z,viewHeight=2*Math.tan(T.MathUtils.degToRad(camera.fov)/2)*distance;
    return new T.Vector3((u-.5)*viewHeight*camera.aspect,(.5-v)*viewHeight,z);
  };
  function layout(){
    const box=canvas.parentElement.getBoundingClientRect();width=box.width;height=box.height;mobile=width<=700;
    renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=mobile?38:34;camera.updateProjectionMatrix();
    render(0,true);
  }
  function render(dt=0,still=false){
    if(renderer.getContext().isContextLost())return;
    if(auto&&!still){
      time+=dt;spring.vx+=(180*(pointer.x-spring.x)-24*spring.vx)*dt;spring.vy+=(180*(pointer.y-spring.y)-24*spring.vy)*dt;spring.x+=spring.vx*dt;spring.y+=spring.vy*dt;
    }else{spring.x=pointer.x;spring.y=pointer.y;}
    if(transition<1){transition=auto?Math.min(1,(performance.now()-transitionStarted)/1050):1;}
    const e=smooth(transition),mix=lerp(from,selected,e);
    document.documentElement.style.setProperty('--flavor',mix.toFixed(4));
    if(transition<1){
      angle=spinStart+TAU*e;
      if(e>.43&&bodyMaterial.map!==colorMaps[selected]){bodyMaterial.map=colorMaps[selected];bodyMaterial.needsUpdate=true;}
    }else{angle=spinStart+TAU;bodyMaterial.map=colorMaps[selected];}
    canvas.style.filter=transition<1?`blur(${Math.sin(transition*Math.PI)*3.8}px)`:'none';
    const center=unproject(mobile?.60:.515,mobile?.515:.525,0);
    rig.position.copy(center);rig.position.y+=Math.sin(time*.65)*.05;
    const scale=mobile?.56:1;
    rig.scale.setScalar(scale);
    rig.rotation.set(.035+spring.y*.07,-.055+spring.x*.12+angle,-.39+spring.x*.055+Math.sin(time*.42)*.018);
    const fruitMix=smooth(Math.max(0,Math.min(1,(e-.25)/.55)));
    for(let i=0;i<fruits.length;i++){
      const f=fruits[i],spec=f.spec;
      let u=spec[0],v=spec[1];
      if(mobile){u=.60+(u-.52)*1.14;v=.515+(v-.52)*.66;}
      const base=unproject(u,v,spec[3]);
      const px=(u-.5)*2,py=(.5-v)*2,dx=px-pointer.x,dy=py-pointer.y,dist=Math.sqrt(dx*dx+dy*dy),force=auto&&dist<.3?(.3-dist)*1.6:0;
      f.velocity.x+=(dx*force-f.offset.x*3-f.velocity.x*4)*dt;f.velocity.y+=(dy*force-f.offset.y*3-f.velocity.y*4)*dt;f.offset.x+=f.velocity.x*dt;f.offset.y+=f.velocity.y*dt;
      base.x+=Math.sin(time*.45+f.phase)*.06+spring.x*spec[3]*.045+f.offset.x;
      base.y+=Math.cos(time*.55+f.phase)*.055+spring.y*spec[3]*.045+f.offset.y;
      f.ch.position.copy(base);f.be.position.copy(base);
      const size=spec[2]*(mobile?.54:1);
      const blueScale=selected?fruitMix:1-fruitMix;
      f.ch.visible=blueScale<.99;f.be.visible=blueScale>.01;
      f.ch.scale.setScalar(size*(1-blueScale));f.be.scale.setScalar(size*1.72*blueScale);
      f.ch.rotation.y=Math.sin(time*.24+i)*.2;f.be.rotation.y=.3+i*.7+Math.sin(time*.2+i)*.2;
    }
    for(const {obj,spec} of leaves){let u=spec[0],v=spec[1];if(mobile){u=.5+(u-.5)*1.2;v=.5+(v-.5)*.7;}obj.position.copy(unproject(u,v,.15));obj.position.y+=Math.sin(time*.7+spec[0]*5)*.045;obj.scale.setScalar(spec[2]*(mobile?.55:1));obj.rotation.set(.1+Math.sin(time*.3)*.2,.12,spec[3]+Math.sin(time*.3)*.07);}
    for(const b of bubbles){const y=(b.y-time*b.speed*.07+100)%1;b.g.position.copy(unproject(b.x,y,b.z));}
    side.color.set(mix>.5?'#8ac3ff':'#c7ffdf');
    renderer.render(scene,camera);
  }
  function tick(now){raf=0;const dt=Math.min((now-last)/1000||.016,.033);last=now;render(dt);if((auto||transition<1)&&visible&&!document.hidden)raf=requestAnimationFrame(tick);}
  function request(){if(!raf&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
  function setFlavor(n){if(n===selected&&transition===1)return;from=Number(document.documentElement.style.getPropertyValue('--flavor'))||0;selected=n;spinStart=angle;transitionStarted=performance.now();transition=auto?0:1;if(!auto){bodyMaterial.map=colorMaps[n];render(0,true);}request();}
  function setMotion(value){auto=value;if(!auto){transition=1;render(0,true);}request();}
  function move(event){const box=canvas.getBoundingClientRect();pointer.x=((event.clientX-box.left)/box.width-.5)*2;pointer.y=(.5-(event.clientY-box.top)/box.height)*2;request();}
  function reset(){pointer.x=pointer.y=0;request();}
  function burst(event){if(!auto)return;const box=canvas.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;for(const f of fruits){const dx=f.spec[0]-x,dy=y-f.spec[1],d=Math.max(.15,Math.hypot(dx,dy));f.velocity.x+=dx/d*.7;f.velocity.y+=dy/d*.7;}request();}
  const host=canvas.parentElement;
  host.addEventListener('pointermove',move);host.addEventListener('pointerleave',reset);host.addEventListener('pointerdown',burst);
  const observer=new ResizeObserver(layout);observer.observe(host);
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)request();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'50px'});intersection.observe(host);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else request();};document.addEventListener('visibilitychange',visibility);
  const lost=e=>{e.preventDefault();cancelAnimationFrame(raf);raf=0;onState('fallback');};canvas.addEventListener('webglcontextlost',lost);
  // Render real 3D product thumbnails from the same geometry, not cropped source frames.
  makeThumb(0);makeThumb(1);layout();onState('ready');request();
  function makeThumb(index){
    const s=new T.Scene();s.environment=scene.environment;
    s.add(ambient.clone(),key.clone(),side.clone());
    const m=bodyMaterial.clone();m.map=colorMaps[index];track(m);
    const product=createCan(m);product.rotation.set(.05,Math.PI,-.11);s.add(product);
    const c=new T.PerspectiveCamera(31,200/300,.1,100);c.position.set(0,0,13.1);c.lookAt(0,0,0);
    renderer.setPixelRatio(1);renderer.setSize(200,300,false);renderer.render(s,c);
    const img=document.querySelector(index?'#lime-thumb':'#classic-thumb');img.src=canvas.toDataURL('image/png');
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  }
  return {setFlavor,setMotion,renderStill:()=>render(0,true),dispose(){cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',reset);host.removeEventListener('pointerdown',burst);canvas.removeEventListener('webglcontextlost',lost);disposables.forEach(d=>d.dispose?.());renderer.dispose();}};
}

function spacedText(c,text,x,y,spacing){const widths=[...text].map(letter=>c.measureText(letter).width);let start=x-(widths.reduce((a,b)=>a+b,0)+(text.length-1)*spacing)/2;c.save();c.textAlign='left';[...text].forEach((letter,i)=>{c.fillText(letter,start,y);start+=widths[i]+spacing;});c.restore();}

function drawEmblem(c,w,h){
  c.save();c.scale(w/700,h/700);c.lineJoin='round';
  // Silver-edged red lozenge and green flourish observed on the reference can.
  c.beginPath();c.moveTo(150,150);c.bezierCurveTo(260,90,470,100,568,177);c.lineTo(631,566);c.quadraticCurveTo(640,603,595,610);c.lineTo(87,610);c.quadraticCurveTo(48,607,60,566);c.closePath();c.fillStyle='#f5f2e7';c.fill();
  c.save();c.translate(25,30);c.scale(.925,.925);c.beginPath();c.moveTo(145,154);c.bezierCurveTo(255,103,476,107,568,188);c.lineTo(625,571);c.quadraticCurveTo(626,595,596,597);c.lineTo(83,597);c.quadraticCurveTo(65,594,68,570);c.closePath();c.fillStyle='#c9001c';c.fill();c.restore();
  c.beginPath();c.moveTo(154,236);c.quadraticCurveTo(350,141,558,240);c.lineTo(599,556);c.quadraticCurveTo(602,567,585,568);c.lineTo(105,568);c.quadraticCurveTo(86,565,92,553);c.closePath();const silver=c.createLinearGradient(80,0,620,0);silver.addColorStop(0,'#e5e6df');silver.addColorStop(.5,'#fcfff4');silver.addColorStop(1,'#b4bfb4');c.fillStyle=silver;c.fill();
  c.beginPath();c.moveTo(300,242);c.bezierCurveTo(295,82,463,51,552,102);c.quadraticCurveTo(638,140,674,77);c.bezierCurveTo(698,248,561,371,360,358);c.closePath();c.strokeStyle='#f7f5e7';c.lineWidth=17;c.fillStyle='#006b34';c.fill();c.stroke();
  c.beginPath();c.moveTo(365,246);c.bezierCurveTo(478,147,570,257,637,173);c.bezierCurveTo(591,302,481,250,382,319);c.fillStyle='#eeeede';c.fill();
  const cherry=(x,y,rx,ry)=>{const g=c.createRadialGradient(x-rx*.32,y-ry*.38,rx*.04,x,y,ry*1.13);g.addColorStop(0,'#ff102b');g.addColorStop(.55,'#d40016');g.addColorStop(1,'#750013');c.beginPath();c.ellipse(x,y,rx,ry,-.08,0,Math.PI*2);c.fillStyle=g;c.fill();c.strokeStyle='#f9f8eb';c.lineWidth=12;c.stroke();c.beginPath();c.ellipse(x-rx*.27,y-ry*.63,rx*.29,ry*.085,-.15,0,Math.PI*2);c.fillStyle='#f7f9ee';c.fill();};
  cherry(332,454,116,113);cherry(263,309,125,143);cherry(421,344,145,162);
  c.restore();
}

function makeEnvironment(renderer){
  const w=512,h=256,data=new Float32Array(w*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h;let light=.095;
    for(const [cx,cy,sx,sy,power] of [[.15,.41,.026,.3,7],[.54,.38,.055,.23,5],[.78,.48,.02,.36,3],[.93,.18,.16,.04,2]]){
      light+=Math.exp(-Math.pow((u-cx)/sx,4)-Math.pow((v-cy)/sy,8))*power;
    }
    const i=(y*w+x)*4;data[i]=light;data[i+1]=light;data[i+2]=light;data[i+3]=1;
  }
  const tex=new T.DataTexture(data,w,h,T.RGBAFormat,T.FloatType);tex.mapping=T.EquirectangularReflectionMapping;tex.needsUpdate=true;
  const pmrem=new T.PMREMGenerator(renderer);const result=pmrem.fromEquirectangular(tex);pmrem.dispose();tex.dispose();return result;
}

// Smooth, non-periodic value noise. A 3D sphere sample avoids striped UV bands.
function noise3(x,y,z){
  const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z);
  let fx=x-ix,fy=y-iy,fz=z-iz;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);fz=fz*fz*(3-2*fz);
  const hash=(a,b,c)=>{let n=Math.imul(a,374761393)^Math.imul(b,668265263)^Math.imul(c,1274126177);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
  const a=lerp(hash(ix,iy,iz),hash(ix+1,iy,iz),fx),b=lerp(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),fx);
  const c=lerp(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),fx),d=lerp(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),fx);
  return lerp(lerp(a,b,fy),lerp(c,d,fy),fz);
}
