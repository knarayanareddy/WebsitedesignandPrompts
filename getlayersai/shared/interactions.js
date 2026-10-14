import {createScene, renderASCII} from './scenes.js';

const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];
const config=JSON.parse($('#site-config').textContent);
const media=matchMedia('(prefers-reduced-motion: reduce)');
const state={px:0,py:0,scroll:0,flavor:0,burst:0,density:1,material:0,light:50,orbit:0,surface:0,region:0};
let running=!media.matches,visible=true,raf=0,last=0,time=0,pointerX=0,pointerY=0,vx=0,vy=0,scene;
const canvas=$('.scene-canvas'), ascii=$('#ascii'),stage=$('.stage');
if(canvas)scene=createScene(canvas,config,state);
function frame(now){
  raf=0;const dt=Math.min((now-last)/1000||.016,.032);last=now;
  if(running&&!document.hidden){time+=dt;vx+=(180*(pointerX-state.px)-24*vx)*dt;vy+=(180*(pointerY-state.py)-24*vy)*dt;state.px+=vx*dt;state.py+=vy*dt;state.burst=Math.max(0,state.burst-dt*1.7);}
  else {state.px=pointerX;state.py=pointerY;}
  state.animate=running&&visible;
  scene?.render(time);if(ascii)renderASCII(ascii,state,time);
  if((scene||ascii)&&running&&visible&&!document.hidden)raf=requestAnimationFrame(frame);
}
function repaint(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame);}
function motionUI(){const btn=$('[data-motion]');btn.textContent=running?'Pause motion':'Resume motion';btn.setAttribute('aria-pressed',String(!running));}
$('[data-motion]').addEventListener('click',()=>{running=!running;motionUI();repaint();});
media.addEventListener('change',e=>{running=!e.matches;motionUI();repaint();});motionUI();
if(stage){new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){last=performance.now();repaint();}}, {rootMargin:'100px'}).observe(stage);stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();pointerX=((e.clientX-r.left)/r.width-.5)*2;pointerY=((e.clientY-r.top)/r.height-.5)*2;repaint();});stage.addEventListener('pointerleave',()=>{pointerX=pointerY=0;repaint();});}
function scroll(){state.scroll=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);if(visible)repaint();}addEventListener('scroll',scroll,{passive:true});scroll();
addEventListener('resize',repaint,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{last=performance.now();repaint();}});
addEventListener('pagehide',()=>{cancelAnimationFrame(raf);scene?.dispose();});
repaint();

let toastTimer;function toast(text){$('#toast').textContent=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4500);}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('Copied to clipboard.');}catch{toast('Clipboard unavailable. Select and copy the visible text manually.');}}
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copy)));
const navToggle=$('.nav-toggle'),nav=$('.nav-links');
function closeMenu(){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.textContent='Menu +';}
navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));navToggle.textContent=open?'Close −':'Menu +';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();navToggle.focus();}});
function group(key,fn){$$(`[data-${key}]`).forEach(b=>b.addEventListener('click',()=>{$$(`[data-${key}]`).forEach(el=>el.setAttribute('aria-pressed',String(el===b)));fn(Number(b.dataset[key]));repaint();}));}

const dialog=$('#inquiry'),form=$('#inquiry-form');let opener;
function openInquiry(label){opener=document.activeElement;$('#inquiry-title').textContent=label||'Start a conversation';$('#inquiry-feedback').textContent='';form.hidden=false;form.reset();dialog.showModal();}
$$('[data-inquiry]').forEach(b=>b.addEventListener('click',()=>openInquiry(config.slug==='dantora'?'Explore a consultation':b.textContent.replace('↗','').trim())));
$$('[data-book]').forEach(b=>b.addEventListener('click',()=>openInquiry(b.dataset.book+' · session request')));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>opener?.focus());});
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;form.hidden=true;form.reset();$('#inquiry-feedback').textContent='Demo complete. Nothing was sent or saved, and no appointment, order, or account was created.';$('#inquiry-feedback').focus();});
const caseNotes={
 'After Light':['A film that feels like remembering the future.','Use a restrained violet palette, a central luminous object, and long visual pauses.','A storyboard direction and visual-system study; no film has been generated.'],
 'Other Nature':['A living identity for an imagined ecological practice.','Build a modular vocabulary of organic shapes, quiet type, and unexpected color.','Conceptual identity rules and an authored abstract visual plate.'],
 'Echo / 001':['Give an invisible experience a visual rhythm.','Translate repetition and silence into spatial intervals and restrained motion.','A visual direction for a sonic identity; this study contains no audio.'],
 'Orbit':['Make communication feel less like a task.','Reduce the interface to a clear hierarchy, warm surfaces, and meaningful moments.','An imagined product direction, interaction principles, and visual system.'],
 'Field':['Everyday objects with a little more intention.','Pair editorial typography with a generous grid and tactile, earthen color.','A conceptual brand and commerce direction; no shop or inventory.'],
 'Ordinary People':['Find the extraordinary in everyday routines.','Start with human observations and an honest, direct editorial voice.','Fictional brand strategy and a conceptual campaign platform.'],
 'Not Another Tomorrow':['Make a distant idea feel immediate.','Use urgent typographic scale against a warm, emotionally charged field.','An invented campaign direction, not a released client campaign.'],
 'A Good Kind of Noise':['Turn an overlooked signal into a shared feeling.','Balance expressive art direction with one unmistakable central message.','A fictional art-direction brief and visual language.'],
 'Off Script':['Make a digital experience feel less predetermined.','Let navigation remain predictable while the expressive layer rewards exploration.','An imagined digital-experience strategy.'],
 'Second Nature':['An identity people can use instinctively.','Design a compact visual grammar that stays recognisable across contexts.','An original fictional identity-system brief.'],
 'The Long Way Home':['Find a story in the distance between places.','Build narrative through pacing, atmosphere, and a single human perspective.','A film treatment concept; no original footage is represented.'],
 'Against the Grain':['An editorial voice with an independent point of view.','Combine generous type, purposeful tension, and a sharply limited palette.','A fictional editorial direction and publication concept.'],
 'All Together Now':['Give a community an idea to gather around.','Make the creative platform flexible, welcoming, and unmistakably human.','An invented creative-platform brief, not an actual organisation.']
};
$$('[data-case]').forEach((b,i)=>{b.addEventListener('pointerenter',()=>{state.caseHue=i;repaint();});b.addEventListener('focus',()=>{state.caseHue=i;repaint();});b.addEventListener('click',()=>{opener=b;const name=b.dataset.case;$('#case-title').textContent=name;const notes=caseNotes[name];$('#case-brief').textContent=notes[0];$('#case-approach').textContent=notes[1];$('#case-outcome').textContent=notes[2];$('#case-dialog').showModal();});});

// Each site has its own controls; no shared generic "everything is a modal" behavior.
if(config.slug==='vesper'){
  $('[data-console]').addEventListener('submit',e=>{e.preventDefault();const q=$('#command').value.toLowerCase();const answer=q.includes('revenue')?'Revenue / sample week: $42,800. Change: +12.4%. The strongest sample segment is Enterprise.':q.includes('latency')?'Latency / sample window: p50 1.4 ms, p95 4.2 ms. All three sample regions are within the target.':q.includes('risk')?'Risk / sample dataset: 2 flagged events out of 1,240. Review queue prepared. No actual financial analysis was performed.':'Try “revenue”, “latency”, or “risk”. This console reads local sample data, not an AI model.';$('#console-result').textContent=answer;});
  let annual=false;function price(){const n=Number($('#compute').value);$('#seats').textContent=n;$('#price').textContent='$'+(n*29*(annual?.8:1)).toLocaleString('en-US',{maximumFractionDigits:2});}group('billing',i=>{annual=i===1;price();});$('#compute').addEventListener('input',price);
}
if(config.slug==='soda'){
  const names=['WILD BERRY / 330 ML','YUZU CITRUS / 330 ML','MANGO CHILI / 330 ML'];
  group('flavor',i=>{state.flavor=i;const palettes=[['#260b1b','#ff92b2','#3b152d'],['#202612','#dfef8d','#30391e'],['#30170b','#ffbb76','#432515']];['--bg','--accent','--surface'].forEach((key,j)=>document.documentElement.style.setProperty(key,palettes[i][j]));$('.stage-tag').textContent=names[i];$('#flavor-note').textContent=['BLACKBERRY + RASPBERRY / BRIGHT, BOLD & BUBBLY','YUZU + LEMON / A LITTLE CANNED SUNSHINE','MANGO + CHILI / SWEET WITH A SPARK'][i];state.burst=1;});
  $('[data-burst]').addEventListener('click',()=>{state.burst=1.8;toast('A little extra fizz.');repaint();});
  let size=12,cart=0;function mix(){const berry=$('#berry'),citrus=$('#citrus');berry.max=size;berry.value=Math.min(Number(berry.value),size);citrus.max=size-Number(berry.value);citrus.value=Math.min(Number(citrus.value),Number(citrus.max));$('#mix-summary').textContent=`${berry.value} Berry / ${citrus.value} Yuzu / ${size-Number(berry.value)-Number(citrus.value)} Mango`;$('#bundle-price').textContent='$'+size*2.5;}
  group('pack',i=>{size=i===0?12:24;mix();});$('#berry').addEventListener('input',mix);$('#citrus').addEventListener('input',mix);$('[data-cart]').addEventListener('click',()=>{cart++;$('#cart-result').textContent=`${cart} bundle${cart===1?'':'s'} added to this local demo cart. Latest: ${size} cans · $${size*2.5}. No order placed.`;toast('Bundle added to the demo cart.');});
}
if(config.slug==='kimi'){
  function lap(){const n=Number($('#lap').value),path=$('#circuit'),p=path.getPointAtLength(n/100*path.getTotalLength());$('#car-dot').setAttribute('cx',p.x);$('#car-dot').setAttribute('cy',p.y);$('#lap-pct').textContent=n+'%';const speed=Math.round(186+Math.sin(n/100*Math.PI*6)*95);$('#speed').textContent=speed;$('#gear').textContent=Math.max(2,Math.min(8,Math.round(speed/42)));$('#gforce').textContent=(2.1+Math.abs(Math.sin(n*.1))*2.7).toFixed(1)+' G';}
  $('#lap').addEventListener('input',lap);lap();let lapTimer;
  $('[data-lap]').addEventListener('click',()=>{const b=$('[data-lap]');b.disabled=true;$('#lap').value=0;lap();lapTimer=setInterval(()=>{const n=Number($('#lap').value);$('#lap').value=Math.min(n+(running?1:10),100);lap();if(Number($('#lap').value)>=100){clearInterval(lapTimer);b.disabled=false;toast('Lap complete. Illustrative telemetry only.');}},60);});addEventListener('pagehide',()=>clearInterval(lapTimer));
}
if(config.slug==='stride'){
  let currency=0,cards=4092;function fx(){const amount=Number($('#transfer').value);const rates=[.92,.79,148.5],codes=['EUR','GBP','JPY'];$('#fx-result').textContent=Number.isFinite(amount)&&amount>0&&amount<=1000000?`${amount.toLocaleString('en-US')} USD → ${(amount*rates[currency]).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})} ${codes[currency]} · demo rate ${rates[currency]}`:'Enter an amount between 1 and 1,000,000 USD.';}group('currency',i=>{currency=i;fx();});$('#transfer').addEventListener('input',fx);$('#limit').addEventListener('input',()=>$('#limit-out').textContent='$'+Number($('#limit').value).toLocaleString('en-US'));$('[data-card]').addEventListener('click',()=>{cards=(cards+137)%10000;$('#card-number').textContent='••••  ••••  ••••  '+String(cards).padStart(4,'0');toast('New demo suffix generated. Not a payment card.');});
}
if(config.slug==='ai-studio')group('pipeline',i=>{$('#pipeline-node').textContent=['Creative direction','Generative exploration','Human refinement'][i];$('#pipeline-result').textContent=['01 / IMAGINE — Define the feeling before choosing the tool.','02 / GENERATE — Explore possible directions, then curate with intention.','03 / REFINE — Edit, craft, and bring the result back to the human idea.'][i];});
if(config.slug==='dantora'){
  const markers=[['Epigenetic age',20,80,42,'years','A research measure of patterns in DNA methylation. It is not a diagnosis or a prediction of lifespan.'],['VO₂ max',20,70,40,'ml/kg/min','A measure of oxygen use during exercise. Interpretation depends on context and qualified clinical assessment.'],['Metabolic flux',0,100,50,'sample units','An abstract illustration of metabolic activity. These units are fictional and not a clinical measurement.'],['Neural resilience',0,100,65,'sample units','A conceptual marker used to demonstrate an interface. No validated clinical score is represented.']];let selected=0;
  function biomarker(){const m=markers[selected],n=Number($('#biomarker').value);$('#marker-value').textContent=n+' '+m[4];$('#marker-result').textContent=`Sample position within the displayed range: ${Math.round((n-m[1])/(m[2]-m[1])*100)}%. Not a clinical percentile.`;}
  group('marker',i=>{selected=i;const m=markers[i];$('#marker-name').textContent=m[0];$('#marker-description').textContent=m[5];$('#biomarker').min=m[1];$('#biomarker').max=m[2];$('#biomarker').value=m[3];biomarker();});$('#biomarker').addEventListener('input',biomarker);
}
const examples=[
  '// Illustrative SDK — not an installed package\nimport { Clarix } from "@clarix/sdk";\n\nconst app = new Clarix({ region: "eu-central" });\nawait app.deploy({ name: "my-next-idea" });',
  '# Illustrative SDK — not an installed package\nfrom clarix import Client\n\napp = Client(region="eu-central")\napp.deploy(name="my-next-idea")',
  '# Documentation-only endpoint (.example is reserved)\ncurl -X POST https://api.clarix.example/deploy \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"my-next-idea","region":"eu-central"}\''
];
if(config.slug==='clarix'){
  group('density',i=>{state.density=i;});$('#code').textContent=examples[0];group('language',i=>$('#code').textContent=examples[i]);$('[data-code-copy]').addEventListener('click',()=>copy($('#code').textContent));
  $('[data-deploy]').addEventListener('click',async()=>{const b=$('[data-deploy]');b.disabled=true;for(const line of ['Preparing sample bundle…','Validating sample configuration…','Connecting fictional edge region…','Complete / local simulation only. No deployment was made.']){$('#deploy-result').textContent=line;await delay(450);}b.disabled=false;});
}
function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
if(config.slug==='relay'){
  $('[data-workflow]').addEventListener('click',async()=>{const b=$('[data-workflow]');b.disabled=true;$$('[data-node]').forEach(n=>n.classList.remove('active','done'));$('#workflow-result').textContent='Sample event received. Running locally…';for(const n of $$('[data-node]')){n.classList.add('active');await delay(running?650:150);n.classList.remove('active');n.classList.add('done');}$('#workflow-result').textContent='4/4 steps complete. Demo refund recorded locally; no money moved and no message was sent.';b.disabled=false;});
  $('#events').addEventListener('input',()=>{const n=Number($('#events').value);$('#events-out').textContent=n.toLocaleString('en-US');$('#event-price').textContent='$'+(19+(n-10000)*.0008).toLocaleString('en-US',{maximumFractionDigits:2});});
}
if(config.slug==='lumora'){
  const clock=()=>{$('[data-clock]').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit'}).format(new Date())+' / Utrecht';};clock();const timer=setInterval(clock,30000);addEventListener('pagehide',()=>clearInterval(timer));
}
if(config.slug==='laocoon'){
  function exhibit(){$('#exhibit-result').textContent=['Bronze','Sapphire','Stone'][state.material]+' / '+Math.round((state.orbit*180/Math.PI)%360)+'° selected orbit · scroll adds rotation';}
  group('material',i=>{state.material=i;exhibit();});$('#light').addEventListener('input',()=>{state.light=Number($('#light').value);$('#light-out').textContent=state.light+'%';repaint();});$('[data-orbit]').addEventListener('click',()=>{state.orbit+=Math.PI/2;exhibit();repaint();});
}
if(config.slug==='baseline'){
  group('surface',i=>{state.surface=i;$('#court-preview').style.background=['#2860a2','#ad5237','#477048'][i];$('#surface-name').textContent=['Championship hardcourt','Traditional red clay','Classic grass'][i];$('#surface-description').textContent=['A true bounce and a confident pace. The all-rounder, made for every kind of player.','A slower rhythm and a higher bounce. Build the point. Find a little more patience.','A lower bounce and a quicker exchange. A surface that rewards instinct and a good first serve.'][i];$('#court-label').textContent=['01 / HARDCOURT','02 / RED CLAY','03 / GRASS'][i];});
}
if(config.slug==='ascend'){
  let index=0;group('region',i=>{index=i;state.region=i;$('#latency').textContent=[12,18,24][i];$('#region-name').textContent=['Northern Virginia, US','Frankfurt, Germany','Tokyo, Japan'][i];$('#region-note').textContent=['38.9° N / 77.0° W','50.1° N / 8.7° E','35.7° N / 139.7° E'][i]+' · simulated edge region';});
  $('[data-benchmark]').addEventListener('click',async()=>{const b=$('[data-benchmark]');b.disabled=true;const region=index;$('#benchmark-result').textContent='Running a local timing sequence…';await delay(750);$('#benchmark-result').textContent=`${['us-east','eu-central','ap-tokyo'][region]} / sample p50: ${[12,18,24][region]} ms · sample p95: ${[22,29,38][region]} ms. No network benchmark was performed.`;b.disabled=false;});
  const snippets=['// Illustrative SDK, not a real package\nimport { edge } from "@ascend/sdk";\nawait edge.deploy({ region: "eu-central", app: "hello-world" });','# Illustrative SDK, not a real package\nfrom ascend import edge\nedge.deploy(region="eu-central", app="hello-world")','# Documentation-only endpoint (.example is reserved)\nPOST https://api.ascend.example/v1/deploy\n{ "region": "eu-central", "app": "hello-world" }'];$('#sdk-code').textContent=snippets[0];group('sdk',i=>$('#sdk-code').textContent=snippets[i]);$('[data-sdk-copy]').addEventListener('click',()=>copy($('#sdk-code').textContent));$('#requests').addEventListener('input',()=>{const n=Number($('#requests').value);$('#requests-out').textContent=n;$('#request-price').textContent='$'+(20+(n-1)*.4).toFixed(2);});
}
