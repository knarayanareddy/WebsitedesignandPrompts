import * as T from './vendor/three.module.min.js';

// One local renderer, one scheduler, no external textures or model downloads.
export function createScene(canvas, config, state) {
  const host = canvas.parentElement;
  let renderer;
  try { renderer = new T.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'low-power'}); }
  catch { host.classList.add('no-webgl'); return {render(){}, dispose(){}}; }
  host.classList.add('has-webgl');
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setClearColor(0,0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(35,1,.1,100);
  camera.position.set(0,0,8);
  const root = new T.Group(); scene.add(root);
  const hemi = new T.HemisphereLight(0xd2e5ff,0x16120d,2.4); scene.add(hemi);
  const key = new T.DirectionalLight(0xffffff,4); key.position.set(-3,4,5); scene.add(key);
  const rim = new T.DirectionalLight(config.accent,5); rim.position.set(4,1,-2); scene.add(rim);
  const fill = new T.DirectionalLight(0x9c82ff,1.5); fill.position.set(-3,-1,2); scene.add(fill);
  const tracked = [];
  const sphere = new T.SphereGeometry(1,40,28); tracked.push(sphere);
  function mat(color,metalness=.25,roughness=.35){const m=new T.MeshStandardMaterial({color,metalness,roughness});tracked.push(m);return m;}
  function mesh(geo,material,parent=root){const m=new T.Mesh(geo,material);parent.add(m);tracked.push(geo);return m;}
  function ball(pos,scale,material,parent=root){const m=mesh(sphere,material,parent);m.position.set(...pos);m.scale.set(...scale);return m;}
  function tube(points,r,material,parent=root,closed=false){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points,closed),150,r,8,closed),material,parent);}
  function canvasTexture(draw,w=1024,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;tracked.push(t);return t;}
  function environment(){
    const tex=canvasTexture((c,w,h)=>{c.fillStyle='#333943';c.fillRect(0,0,w,h);const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#ccd1df');g.addColorStop(.4,'#323042');g.addColorStop(1,'#05050b');c.fillStyle=g;c.fillRect(0,0,w,h);for(let i=0;i<8;i++){c.fillStyle=i%2?'#131320':'#ffffff';c.fillRect(i*w/8+10,35,w/24,h*.8);}},1024,512);
    tex.mapping=T.EquirectangularReflectionMapping;const pmrem=new T.PMREMGenerator(renderer);const env=pmrem.fromEquirectangular(tex);scene.environment=env.texture;tracked.push(env);pmrem.dispose();
  }
  let seed=41; function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
  let update=()=>{};
  const slug=config.slug;
  if(slug==='vesper'){
    const count=7000,p=new Float32Array(count*3),colors=new Float32Array(count*3),orb=[],galaxy=[],brain=[];
    for(let i=0;i<count;i++){
      const y=1-2*(i+.5)/count,phi=i*2.399963229728653,r=Math.sqrt(1-y*y),rad=1.35+rand()*.22;
      orb.push(r*Math.cos(phi)*rad,y*rad,r*Math.sin(phi)*rad);
      const rr=.08+Math.sqrt(rand())*2.2,a=rr*3.5+(i%3)*Math.PI*2/3+rand()*.3;
      galaxy.push(Math.cos(a)*rr,(rand()-.5)*.25,Math.sin(a)*rr);
      const side=i%2?1:-1;
      brain.push(side*.55+r*Math.cos(phi)*.76,y*1.1,r*Math.sin(phi)*.94);
      const col=new T.Color(i%4===0?'#9870ff':'#4dffb8');colors.set([col.r,col.g,col.b],i*3);
    }
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(p,3));geo.setAttribute('color',new T.BufferAttribute(colors,3));tracked.push(geo);
    const material=new T.PointsMaterial({size:.018,vertexColors:true,transparent:true,opacity:.8,depthWrite:false,blending:T.AdditiveBlending});tracked.push(material);root.add(new T.Points(geo,material));
    update=(t)=>{const phase=Math.min(state.scroll*2.5,1.99),a=phase<1?orb:galaxy,b=phase<1?galaxy:brain,f=phase%1,s=f*f*(3-2*f);for(let i=0;i<p.length;i++)p[i]=a[i]+(b[i]-a[i])*s+Math.sin(t*.7+i)*.012;geo.attributes.position.needsUpdate=true;root.rotation.set(.2+state.py*.1,t*.1+state.px*.2,0);};
  } else if(slug==='soda'){
    environment();const group=new T.Group();root.add(group);const metal=mat('#d3dde0',.95,.22);
    const bodymat=mat('#ffffff',.45,.3);
    const profiles=[new T.Vector2(0,-1.44),new T.Vector2(.52,-1.44),new T.Vector2(.57,-1.34),new T.Vector2(.61,-1.21),new T.Vector2(.61,1.12),new T.Vector2(.57,1.27),new T.Vector2(.51,1.35),new T.Vector2(0,1.35)];
    mesh(new T.LatheGeometry(profiles,72),metal,group);
    const labelShell=mesh(new T.CylinderGeometry(.614,.614,2.30,72,1,true),bodymat,group);labelShell.position.y=-.04;bodymat.metalness=.18;bodymat.roughness=.4;
    let flavor=-1,labelTexture;
    const palette=['#bc2159','#d9eb63','#ff943d'],names=['WILD BERRY','YUZU CITRUS','MANGO CHILI'];
    function label(index){if(labelTexture)labelTexture.dispose();labelTexture=canvasTexture((c,w,h)=>{c.fillStyle=palette[index];c.fillRect(0,0,w,h);c.fillStyle='#ffffff18';for(let y=0;y<h;y+=38){c.beginPath();c.ellipse(w*.3,y,w*.65,20,-.3,0,Math.PI*2);c.fill();}c.save();c.translate(w*.48,h*.55);c.rotate(Math.PI/2);c.textAlign='center';c.fillStyle='#fff8ef';c.font='900 172px Arial';c.fillText('soda',0,0);c.restore();c.textAlign='center';c.fillStyle='#fff8ef';c.font='bold 23px Arial';c.fillText(names[index],w*.49,h*.88);c.font='14px monospace';c.fillText('REAL FRUIT. GOOD ENERGY.',w*.49,h*.93);},1024,1024);bodymat.map=labelTexture;bodymat.needsUpdate=true;}
    for(const y of [-1.39,1.34]){const ring=mesh(new T.TorusGeometry(.535,.035,12,80),metal,group);ring.rotation.x=Math.PI/2;ring.position.y=y;}
    const lid=mesh(new T.CylinderGeometry(.52,.52,.025,64),metal,group);lid.position.y=1.34;
    const tab=mesh(new T.TorusGeometry(.15,.034,8,32),metal,group);tab.scale.set(.6,1,1);tab.rotation.x=Math.PI/2;tab.position.set(0,1.365,.08);
    const drops=mat('#ffffff',.1,.05);drops.transparent=true;drops.opacity=.5;
    for(let i=0;i<70;i++){const a=rand()*Math.PI*2,y=rand()*2.35-1.15,s=.008+rand()*.017;ball([Math.sin(a)*.616,y,Math.cos(a)*.616],[s,s*1.3,s],drops,group);}
    const fruits=[];const fruitmat=mat('#84274d',.08,.35);
    for(let i=0;i<14;i++){const g=new T.Group();root.add(g);const scale=.06+rand()*.07;for(let j=0;j<7;j++){const a=j*2.4;ball([Math.cos(a)*scale*.65,(j-3)*scale*.17,Math.sin(a)*scale*.65],[scale*.65,scale*.65,scale*.65],fruitmat,g);}fruits.push({g,a:rand()*6.28,r:1.3+rand()*.7,y:(rand()-.5)*3.9});}
    group.rotation.z=-.18;
    update=t=>{const selected=state.flavor||0;if(selected!==flavor){flavor=selected;label(flavor);fruitmat.color.set(['#b22b60','#d7e866','#ff9b2f'][flavor]);}group.rotation.y=Math.PI+state.px*.7+Math.sin(t*.4)*.1;group.rotation.x=state.py*.18;group.rotation.z=-.15+state.px*.08;group.position.y=Math.sin(t)*.07;const burst=state.burst||0;fruits.forEach((f,i)=>{const a=f.a+t*.17;f.g.position.set(Math.cos(a)*f.r*(1+burst),f.y+Math.sin(t+i)*.1,Math.sin(a)*f.r);f.g.rotation.set(t*.2,i+t*.15,0);});};
    root.scale.setScalar(.98);camera.position.z=7.8;
  } else if(slug==='kimi'){
    environment();const green=mat('#a1ccc1',.75,.22),dark=mat('#07161c',.8,.13),trim=mat('#00c98f',.65,.24);
    const shell=ball([0,.05,0],[1.45,1.7,1.28],green);const visor=ball([0,.12,.53],[1.36,.65,.92],dark);visor.rotation.x=-.09;
    ball([0,-.86,.59],[1.28,.65,.89],green);const line=tube(Array.from({length:45},(_,i)=>{const a=i/44*Math.PI;return new T.Vector3(Math.cos(a)*1.4,.65,Math.sin(a)*1.05+.12)}),.025,trim);
    const wire=new T.Mesh(shell.geometry,new T.MeshBasicMaterial({color:'#00f59b',wireframe:true,transparent:true,opacity:.16}));wire.scale.copy(shell.scale).multiplyScalar(1.01);wire.position.copy(shell.position);root.add(wire);tracked.push(wire.material);
    root.scale.setScalar(.95);update=t=>{root.rotation.set(state.py*.2,-.35+state.px*.6+Math.sin(t*.3)*.06,-.07);green.transparent=true;green.opacity=1-Math.min(Math.abs(state.px)*.7,.6);line.visible=true;};
  } else if(slug==='stride'){
    environment();const shape=new T.Shape();const w=1.7,h=1.04,r=.15;shape.moveTo(-w+r,-h);shape.lineTo(w-r,-h);shape.quadraticCurveTo(w,-h,w,-h+r);shape.lineTo(w,h-r);shape.quadraticCurveTo(w,h,w-r,h);shape.lineTo(-w+r,h);shape.quadraticCurveTo(-w,h,-w,h-r);shape.lineTo(-w,-h+r);shape.quadraticCurveTo(-w,-h,-w+r,-h);
    const card=mesh(new T.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025}),mat('#2b354d',.93,.3));
    const tex=canvasTexture((c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#424e6c');g.addColorStop(.5,'#101827');g.addColorStop(1,'#354261');c.fillStyle=g;c.fillRect(0,0,w,h);for(let i=0;i<h;i+=2){c.fillStyle='#ffffff04';c.fillRect(0,i,w,1);}c.fillStyle='#f5f6ff';c.font='bold 72px Arial';c.fillText('stride ↗',65,105);c.fillStyle='#bcbab0';c.fillRect(75,205,90,65);c.fillStyle='#dfe3ef';c.font='29px monospace';c.fillText('••••   ••••   ••••   4092',70,370);c.font='17px monospace';c.fillText('YOUR NEXT MOVE',70,450);c.fillText('VIRTUAL',790,450);},1024,640);
    const face=mesh(new T.PlaneGeometry(w*2-.06,h*2-.06),new T.MeshStandardMaterial({map:tex,metalness:.65,roughness:.38}),card);face.position.z=.078;tracked.push(face.material);
    const light=mat('#307bff',.5,.2);light.emissive=new T.Color('#1f49dc');light.emissiveIntensity=2;
    tube(Array.from({length:150},(_,i)=>{const t=i/149*8;return new T.Vector3(Math.sin(t)*1.6,(t-4)*.6,Math.cos(t)*1.7-1.3)}),.016,light);
    update=t=>{card.rotation.set(.1+state.py*.25,-.4+state.px*.5,-.14+Math.sin(t*.4)*.03);card.position.y=Math.sin(t*.7)*.1;};
  } else if(slug==='ai-studio'){
    environment();const shape=new T.Shape();for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?.53:1.72;const x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);}shape.closePath();
    const star=mesh(new T.ExtrudeGeometry(shape,{depth:.35,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.13,bevelThickness:.16}),mat('#eeeeff',1,.12));star.position.z=-.2;
    update=t=>{root.rotation.set(Math.sin(t*.25)*.22+state.py*.2,t*.22+state.scroll*3+state.px*.3,.15);};
  } else if(slug==='creative-director'||slug==='lumora'){
    const uniforms={uTime:{value:0},uPointer:{value:new T.Vector2()},uHue:{value:0},uSoft:{value:slug==='lumora'?1:0}};
    const material=new T.ShaderMaterial({uniforms,vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`precision mediump float;
      varying vec2 vUv;uniform float uTime,uHue,uSoft;uniform vec2 uPointer;
      float noise(vec2 p){return sin(p.x*1.7+sin(p.y*2.4))*cos(p.y*1.3+sin(p.x*2.9));}
      void main(){vec2 p=(vUv-.5)*3.;p+=uPointer*.14;float t=uTime*.14;float f=noise(p+vec2(t,-t));f+=.5*noise(p*2.+f+t);float v=sin(f*3.+p.y*2.+t)*.5+.5;v=pow(v,3.);vec3 a=mix(vec3(.09,.003,.002),vec3(.035,.035,.035),uSoft);vec3 b=mix(vec3(.88,.095,.022),vec3(.5,.33,.12),uSoft);vec3 col=mix(a,b,v);col+=vec3(.28,.095,.02)*pow(v,4.);float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);col+=grain*.025;col.gb+=uHue*.015;gl_FragColor=vec4(col,1.);}`});
    mesh(new T.PlaneGeometry(2,2),material);tracked.push(material);update=t=>{uniforms.uTime.value=t;uniforms.uPointer.value.set(state.px,state.py);uniforms.uHue.value=state.caseHue||0;};
  } else if(slug==='dantora'){
    const a=mat('#226d4c',.42,.24),b=mat('#98bea0',.25,.25),bond=mat('#629d7c',.25,.35);
    for(let side=0;side<2;side++)tube(Array.from({length:120},(_,i)=>{const y=(i/119-.5)*4.2,angle=y*2.8+side*Math.PI;return new T.Vector3(Math.cos(angle)*.72,y,Math.sin(angle)*.72)}),.07,side?a:b);
    for(let i=0;i<32;i++){const y=(i/31-.5)*4.05,angle=y*2.8,p=new T.Vector3(Math.cos(angle)*.7,y,Math.sin(angle)*.7);tube([p,p.clone().multiply(new T.Vector3(-1,1,-1))],.025,bond);ball([p.x,p.y,p.z],[.09,.09,.09],a);}
    const pos=new Float32Array(1100*3);for(let i=0;i<1100;i++){pos[i*3]=(rand()-.5)*3;pos[i*3+1]=(rand()-.5)*5;pos[i*3+2]=(rand()-.5)*3;}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));tracked.push(g);const pm=new T.PointsMaterial({size:.016,color:'#438c5d',transparent:true,opacity:.38});tracked.push(pm);root.add(new T.Points(g,pm));root.rotation.z=-.3;
    update=t=>{root.rotation.y=t*.15+state.px*.3;root.rotation.x=state.py*.15;};camera.position.z=8.8;
  } else if(slug==='laocoon'){
    environment();const bronze=mat('#8a572d',.83,.33),base=mat('#26201a',.5,.55);const sculpture=new T.Group();root.add(sculpture);
    function figure(x,y,s,lean){const g=new T.Group();sculpture.add(g);g.position.set(x,y,0);g.scale.setScalar(s);g.rotation.z=lean;
      ball([0,.35,0],[.4,.69,.27],bronze,g);ball([0,1.27,.03],[.28,.35,.29],bronze,g);ball([0,.98,0],[.14,.22,.14],bronze,g);
      const limbs=[[[.29,.77,0],[.73,1.13,.03],[.84,1.9,-.1]],[[-.31,.77,0],[-.76,.43,.06],[-1.0,.7,.2]],[[.18,-.1,0],[.52,-.75,.18],[.85,-1.19,.34]],[[-.18,-.1,0],[-.42,-.75,.4],[-.55,-1.33,.16]]];
      limbs.forEach((points,i)=>tube(points.map(p=>new T.Vector3(...p)),i<2?.095:.145,bronze,g));
    }
    figure(0,.12,1,.12);figure(-1.18,-.65,.54,-.3);figure(1.12,-.56,.57,.27);
    for(let j=0;j<2;j++)tube(Array.from({length:160},(_,i)=>{const t=i/159*12;return new T.Vector3(Math.sin(t+j*3.14)*(1.2-.03*t),(t/12)*2.9-1.2,Math.cos(t+j*3.14)*.58)}),.055,bronze,sculpture);
    const pedestal=mesh(new T.CylinderGeometry(1.65,1.8,.3,64),base);pedestal.position.y=-1.55;
    let material=-1,rot=0;update=t=>{if(material!==state.material){material=state.material||0;bronze.color.set(['#a5723e','#183b8e','#c9c4b7'][material]);bronze.metalness=material===2?.08:.83;bronze.roughness=material===2?.6:.3;}const target=(state.orbit||0)+state.scroll*6.28+state.px*.15;rot=state.animate?rot+(target-rot)*.06:target;root.rotation.y=rot;const light=(state.light??50)/100;key.color.setHSL(.1-light*.07,.15+light*.35,.85);key.position.x=-5+light*10;};camera.position.z=9.5;root.position.y=-.1;
  } else if(slug==='baseline'){
    const courtmat=mat('#28548a',.1,.85),white=mat('#e4ecdf',0,.9),netmat=mat('#bdc8c9',.2,.7);
    const court=mesh(new T.PlaneGeometry(5,8),courtmat);court.rotation.x=-Math.PI/2;court.position.y=-1;
    const points=[];function line(x1,z1,x2,z2){points.push(new T.Vector3(x1,-.985,z1),new T.Vector3(x2,-.985,z2));}
    line(-2.1,-3.5,2.1,-3.5);line(-2.1,3.5,2.1,3.5);for(const x of [-2.1,-1.65,1.65,2.1])line(x,-3.5,x,3.5);line(-1.65,-1.65,1.65,-1.65);line(-1.65,1.65,1.65,1.65);line(0,-1.65,0,1.65);line(-2.1,0,2.1,0);
    const geo=new T.BufferGeometry().setFromPoints(points);tracked.push(geo);const lm=new T.LineBasicMaterial({color:'#f4f8ee'});tracked.push(lm);root.add(new T.LineSegments(geo,lm));
    for(let i=0;i<30;i++){const x=-2.3+i*4.6/29;const post=mesh(new T.CylinderGeometry(.007,.007,.55,4),netmat);post.position.set(x,-.7,0);}
    for(let i=0;i<5;i++){const l=mesh(new T.BoxGeometry(4.6,.008,.008),white);l.position.set(0,-.98+i*.13,0);}
    const b=ball([0,0,0],[.12,.12,.12],mat('#d4ee7b',.1,.7));
    root.rotation.y=-.42;root.rotation.x=.27;camera.position.set(0,4.5,9);camera.lookAt(0,0,0);
    update=t=>{courtmat.color.set(['#28548a','#ad5237','#477048'][state.surface||0]);b.position.set(Math.sin(t*.9)*1.7,Math.abs(Math.sin(t*1.7))*1.2-.8,Math.cos(t*.9)*2.7);root.rotation.y=-.42+state.px*.13;};
  } else if(slug==='ascend'){
    const texture=canvasTexture((c,w,h)=>{
      c.fillStyle='#081f36';c.fillRect(0,0,w,h);
      // Coarse hand-authored land silhouettes: a stylized globe, not a geographic dataset.
      const continents=[[[.06,.23],[.13,.16],[.24,.19],[.29,.31],[.22,.39],[.2,.48],[.13,.4]],[[.22,.48],[.3,.52],[.34,.63],[.3,.8],[.26,.87],[.24,.66]],[[.43,.28],[.47,.2],[.53,.25],[.54,.32],[.5,.36],[.46,.35]],[[.44,.37],[.55,.36],[.59,.48],[.54,.68],[.5,.73],[.45,.57]],[[.54,.24],[.66,.14],[.8,.19],[.91,.26],[.9,.42],[.79,.46],[.71,.57],[.64,.43],[.56,.38]],[[.78,.65],[.89,.63],[.93,.75],[.86,.81],[.79,.76]],[[.32,.1],[.4,.07],[.42,.18],[.36,.25]]];
      c.fillStyle='#3c806f';continents.forEach(poly=>{c.beginPath();poly.forEach(([x,y],i)=>i?c.lineTo(x*w,y*h):c.moveTo(x*w,y*h));c.closePath();c.fill();});
      const image=c.getImageData(0,0,w,h);for(let i=0;i<12000;i++){const x=Math.floor(rand()*w),y=Math.floor(rand()*h);if(image.data[(y*w+x)*4+1]>65){c.fillStyle=rand()>.6?'#cbdb8d':'#25594f';c.fillRect(x,y,1,1);}}
      c.strokeStyle='#71c9ab15';for(let i=0;i<18;i++){c.beginPath();c.moveTo(i*w/18,0);c.lineTo(i*w/18,h);c.stroke();}for(let i=0;i<9;i++){c.beginPath();c.moveTo(0,i*h/9);c.lineTo(w,i*h/9);c.stroke();}
    },2048,1024);
    const planet=mesh(new T.SphereGeometry(1.75,80,60),new T.MeshStandardMaterial({map:texture,roughness:.8,metalness:.16}));tracked.push(planet.material);
    const haloMat=new T.ShaderMaterial({transparent:true,side:T.BackSide,depthWrite:false,blending:T.AdditiveBlending,vertexShader:'varying vec3 vN;varying vec3 vV;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 vN;varying vec3 vV;void main(){float a=pow(1.-abs(dot(normalize(vN),normalize(vV))),3.);gl_FragColor=vec4(.1,.7,.62,a*.55);}'});tracked.push(haloMat);mesh(new T.SphereGeometry(1.85,64,40),haloMat);
    const orbitmat=new T.LineBasicMaterial({color:'#76e8b6',transparent:true,opacity:.35});tracked.push(orbitmat);for(let j=0;j<3;j++){const pts=[];for(let i=0;i<=160;i++){const a=i/160*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*2.05,Math.sin(a)*2.05,0));}const g=new T.BufferGeometry().setFromPoints(pts);tracked.push(g);const line=new T.Line(g,orbitmat);line.rotation.set(j*.8,.6+j*.4,0);root.add(line);}
    const marker=ball([0,0,1.78],[.04,.04,.04],new T.MeshBasicMaterial({color:'#c3ffb5'}),planet);tracked.push(marker.material);
    const stars=new Float32Array(600*3);for(let i=0;i<600;i++){stars.set([(rand()-.5)*16,(rand()-.5)*12,-3-rand()*4],i*3);}const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(stars,3));tracked.push(sg);const sm=new T.PointsMaterial({size:.015,color:'#b9e6d9'});tracked.push(sm);scene.add(new T.Points(sg,sm));
    let rot=.8;update=t=>{const region=state.region||0;const coords=[[38.9,-77],[50.1,8.7],[35.7,139.7]][region];const lat=coords[0]*Math.PI/180,lon=coords[1]*Math.PI/180;marker.position.set(-1.78*Math.cos(lat)*Math.cos(lon),1.78*Math.sin(lat),1.78*Math.cos(lat)*Math.sin(lon));const target=Math.PI/2-lon;rot=state.animate?rot+(target-rot)*.035:target;planet.rotation.y=rot+state.px*.1;root.rotation.x=.1+state.py*.07;};camera.position.z=8.5;
  }
  let width=0,height=0;
  function resize(){const {width:w,height:h}=host.getBoundingClientRect();if(w===width&&h===height)return;width=w;height=h;renderer.setSize(w,h,false);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();renderer.render(scene,camera);}
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  const contextLost=e=>{e.preventDefault();host.classList.remove('has-webgl');host.classList.add('no-webgl');};canvas.addEventListener('webglcontextlost',contextLost);
  function render(t){if(!renderer.getContext().isContextLost()){update(t);renderer.render(scene,camera);}}
  return {render,dispose(){observer.disconnect();canvas.removeEventListener('webglcontextlost',contextLost);new Set(tracked).forEach(x=>x.dispose?.());renderer.dispose();}};
}

export function renderASCII(el, state, time) {
  const cols=[46,66,86][state.density??1],rows=Math.round(cols*.48),buffer=Array(cols*rows).fill(' '),depth=new Float32Array(cols*rows),ramp=' .:-=+*#%@';
  const A=time*.28+state.py*.4,B=time*.14+state.px*.7,sa=Math.sin(A),ca=Math.cos(A),sb=Math.sin(B),cb=Math.cos(B);
  for(let j=0;j<6.28;j+=.065)for(let i=0;i<6.28;i+=.024){const si=Math.sin(i),ci=Math.cos(i),sj=Math.sin(j),cj=Math.cos(j),h=cj+2,D=1/(si*h*sa+sj*ca+5),t=si*h*ca-sj*sa,x=Math.floor(cols/2+cols*.32*D*(ci*h*cb-t*sb)),y=Math.floor(rows/2+rows*.64*D*(ci*h*sb+t*cb)),o=x+cols*y,N=Math.floor(8*((sj*sa-si*cj*ca)*cb-si*cj*sa-sj*ca-ci*cj*sb));if(y>=0&&y<rows&&x>=0&&x<cols&&D>depth[o]){depth[o]=D;buffer[o]=ramp[Math.max(0,Math.min(9,N+1))];}}
  el.textContent=Array.from({length:rows},(_,i)=>buffer.slice(i*cols,(i+1)*cols).join('')).join('\n');
}
