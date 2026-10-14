import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {chromium} from 'playwright';
import bundled from '@sparticuz/chromium';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.env.BASE_URL||'http://localhost:8080/getlayersai';
const sites=JSON.parse(readFileSync(`${root}/sites.json`));
const chosen=process.env.SITES?sites.filter(s=>process.env.SITES.split(',').includes(s.slug)):sites;
mkdirSync(`${root}/.cache/screenshots`,{recursive:true});mkdirSync(`${root}/previews`,{recursive:true});
// The npm-distributed browser is useful in sandboxes where browser CDNs are blocked.
// CI may supply a normal Playwright executable instead.
let executable=process.env.CHROMIUM_PATH;
if(!executable){
  const {inflate}=await import('../node_modules/@sparticuz/chromium/build/esm/lambdafs.js');
  const lib=await inflate(`${root}/node_modules/@sparticuz/chromium/bin/al2023.tar.br`);
  process.env.LD_LIBRARY_PATH=`${lib}/lib:${process.env.LD_LIBRARY_PATH||''}`;
  executable=await bundled.executablePath();
}
const browser=await chromium.launch({executablePath:executable,headless:true,args:bundled.args.filter(a=>!['--single-process','--disable-web-security'].includes(a))});
const report={base,runAt:new Date().toISOString(),sites:[],gallery:null,failures:[]};
let assertions=0;
const check=(v,label)=>{assertions++;assert.ok(v,label);};
async function range(page,id,value){await page.locator(id).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},String(value));}
async function text(page,id,expected){check((await page.locator(id).innerText()).includes(expected),`${id} should contain ${expected}`);}
async function click(page,selector){await page.locator(selector).click();}
async function overflow(page){return page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2&&getComputedStyle(e).position!=='fixed').slice(0,8).map(e=>`${e.tagName}.${e.className}`)}));}
async function siteSpecific(p,slug){
  switch(slug){
    case 'vesper':for(const q of ['revenue','latency','risk','unknown']){await p.fill('#command',q);await p.locator('[data-console] button').click();await text(p,'#console-result',q==='unknown'?'Try':q[0].toUpperCase()+q.slice(1));}await click(p,'[data-billing="1"]');await text(p,'#price','$116');await range(p,'#compute',10);await text(p,'#price','$232');break;
    case 'soda':for(let i=0;i<3;i++){await click(p,`[data-flavor="${i}"]`);check(await p.locator(`[data-flavor="${i}"]`).getAttribute('aria-pressed')==='true','flavor pressed');}await click(p,'[data-pack="1"]');await text(p,'#bundle-price','$60');await range(p,'#berry',24);await text(p,'#mix-summary','24 Berry / 0 Yuzu / 0 Mango');await click(p,'[data-cart]');await text(p,'#cart-result','24 cans · $60');await click(p,'[data-pack="0"]');await text(p,'#mix-summary','12 Berry / 0 Yuzu / 0 Mango');break;
    case 'kimi':await range(p,'#lap',50);await text(p,'#lap-pct','50%');check(Number(await p.locator('#car-dot').getAttribute('cx'))!==100,'marker moved');await click(p,'[data-lap]');await p.waitForFunction(()=>!document.querySelector('[data-lap]').disabled);await text(p,'#lap-pct','100%');break;
    case 'stride':await p.fill('#transfer','2000');await click(p,'[data-currency="1"]');await text(p,'#fx-result','1,580.00 GBP');await p.fill('#transfer','-1');await text(p,'#fx-result','Enter an amount');await range(p,'#limit',25000);await text(p,'#limit-out','$25,000');await click(p,'[data-card]');await text(p,'#card-number','4229');break;
    case 'ai-studio':for(let i=0;i<3;i++)await click(p,`[data-pipeline="${i}"]`);await text(p,'#pipeline-result','REFINE');break;
    case 'dantora':for(let i=0;i<4;i++){await click(p,`[data-marker="${i}"]`);const min=await p.locator('#biomarker').getAttribute('min'),max=await p.locator('#biomarker').getAttribute('max');await range(p,'#biomarker',min);await text(p,'#marker-result','0%.');await range(p,'#biomarker',max);await text(p,'#marker-result','100%.');}break;
    case 'clarix':for(let i=0;i<3;i++)await click(p,`[data-density="${i}"]`);check((await p.locator('#ascii').textContent()).length>100,'ASCII rendered');for(let i=0;i<3;i++)await click(p,`[data-language="${i}"]`);await text(p,'#code','curl');await click(p,'[data-deploy]');await p.waitForFunction(()=>!document.querySelector('[data-deploy]').disabled);await text(p,'#deploy-result','No deployment');break;
    case 'relay':for(let i=0;i<2;i++){await click(p,'[data-workflow]');await p.waitForFunction(()=>!document.querySelector('[data-workflow]').disabled);check(await p.locator('.flow-node.done').count()===4,'four complete nodes');}await range(p,'#events',10000000);await text(p,'#event-price','$8,011');await range(p,'#events',10000);await text(p,'#event-price','$19');break;
    case 'lumora':check(/\d{2}:\d{2}/.test(await p.locator('[data-clock]').textContent()),'Amsterdam clock');for(const summary of await p.locator('summary').all())await summary.click();break;
    case 'laocoon':for(let i=0;i<3;i++)await click(p,`[data-material="${i}"]`);await click(p,'[data-orbit]');await text(p,'#exhibit-result','Stone / 90°');await range(p,'#light',100);await text(p,'#light-out','100%');break;
    case 'baseline':for(let i=0;i<3;i++)await click(p,`[data-surface="${i}"]`);await text(p,'#surface-name','Classic grass');for(const b of await p.locator('[data-book]').all()){await b.click();await text(p,'#inquiry-title','session request');await p.keyboard.press('Escape');}break;
    case 'ascend':for(let i=0;i<3;i++)await click(p,`[data-region="${i}"]`);await text(p,'#region-name','Tokyo');await text(p,'#latency','24');await click(p,'[data-benchmark]');await p.waitForFunction(()=>!document.querySelector('[data-benchmark]').disabled);await text(p,'#benchmark-result','ap-tokyo');for(let i=0;i<3;i++)await click(p,`[data-sdk="${i}"]`);await text(p,'#sdk-code','POST');await range(p,'#requests',1);await text(p,'#request-price','$20.00');await range(p,'#requests',500);await text(p,'#request-price','$219.60');break;
  }
  for(const b of await p.locator('[data-case]').all()){await b.focus();await p.keyboard.press('Enter');check(await p.locator('#case-dialog').evaluate(d=>d.open),'case dialog opens by keyboard');check((await p.locator('#case-brief').innerText()).length>20,'real case brief');await p.keyboard.press('Escape');check(await b.evaluate(b=>b===document.activeElement),'case focus restored');}
}

try {
 for(const s of chosen){
  const item={slug:s.slug};const context=await browser.newContext({viewport:{width:1440,height:1080},reducedMotion:'reduce'});const p=await context.newPage();p.setDefaultTimeout(12000);
  const errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(new URL(base).origin))requests.push(r.url());});p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  try{
    await p.goto(`${base}/sites/${s.slug}/`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(250);
    check(await p.locator('h1').count()===1,`${s.slug}: one h1`);check(await p.locator('[data-motion]').innerText()==='Resume motion','reduced motion default');
    if(await p.locator('.scene-canvas').count())check(await p.locator('.stage.has-webgl').count()===1,`${s.slug}: live WebGL`);
    const desktop=await overflow(p);check(desktop.scroll<=desktop.width+1,`${s.slug}: desktop overflow ${JSON.stringify(desktop)}`);
    await p.screenshot({path:`${root}/.cache/screenshots/${s.slug}-desktop.png`});
    if(process.env.UPDATE_PREVIEWS==='1')await sharp(`${root}/.cache/screenshots/${s.slug}-desktop.png`).resize(1000,750).webp({quality:82}).toFile(`${root}/previews/${s.slug}.webp`);
    const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();item.axe=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
    // Do not hide findings: all are recorded, and any violation fails the suite.
    check(item.axe.length===0,`${s.slug}: accessibility ${JSON.stringify(item.axe)}`);
    await siteSpecific(p,s.slug);
    const opener=p.locator('[data-inquiry]').first();await opener.click();check(await p.locator('#inquiry').evaluate(d=>d.open),'inquiry open');await p.keyboard.press('Escape');check(await opener.evaluate(b=>b===document.activeElement),'inquiry focus restored');await opener.click();await p.fill('#name','Sample Visitor');await p.fill('#email','sample@example.com');await p.locator('#inquiry-form button').click();await text(p,'#inquiry-feedback','Nothing was sent or saved');await p.keyboard.press('Escape');
    await p.setViewportSize({width:375,height:812});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(150);const mobile=await overflow(p);check(mobile.scroll<=mobile.width+1,`${s.slug}: mobile overflow ${JSON.stringify(mobile)}`);await click(p,'.nav-toggle');check(await p.locator('.nav-toggle').getAttribute('aria-expanded')==='true','mobile menu opens');await p.keyboard.press('Escape');check(await p.locator('.nav-toggle').getAttribute('aria-expanded')==='false','mobile menu closes');await p.screenshot({path:`${root}/.cache/screenshots/${s.slug}-mobile.png`,fullPage:true});
    await p.setViewportSize({width:768,height:1024});const tablet=await overflow(p);check(tablet.scroll<=tablet.width+1,`${s.slug}: tablet overflow ${JSON.stringify(tablet)}`);
    check(errors.length===0,`${s.slug}: browser errors ${errors}`);check(requests.length===0,`${s.slug}: unexpected external requests ${requests}`);item.status='PASS';console.log(`PASS ${s.slug}`);
  }catch(e){item.status='FAIL';item.error=e.message;report.failures.push(`${s.slug}: ${e.message}`);console.error(`FAIL ${s.slug}: ${e.message}`);if(process.env.GITHUB_ACTIONS)console.error(`::error title=${s.slug} browser validation::${e.message.replaceAll("%","%25").replaceAll("\n","%0A")}`);await p.screenshot({path:`${root}/.cache/screenshots/${s.slug}-failure.png`}).catch(()=>{});}
  await context.close();report.sites.push(item);
 }
 if(!process.env.SITES){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await context.newPage();
  try{await p.goto(base+'/',{waitUntil:'networkidle'});check(await p.locator('.study').count()===13,'13 gallery entries');await p.fill('#search','vesper');check(await p.locator('.study:visible').count()===1,'gallery search');await p.fill('#search','zzzzzz');check(await p.locator('#empty').isVisible(),'empty state');await click(p,'#reset');await click(p,'[data-filter="Creative"]');check(await p.locator('.study:visible').count()===4,'creative filter');await click(p,'[data-filter="All"]');const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();check(!axe.violations.length,`gallery a11y ${JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`);await p.evaluate(()=>{document.activeElement.blur();scrollTo(0,0);});await p.screenshot({path:`${root}/.cache/screenshots/gallery-desktop.png`,fullPage:true});await p.setViewportSize({width:375,height:812});check((await overflow(p)).scroll<=376,'gallery mobile overflow');await p.screenshot({path:`${root}/.cache/screenshots/gallery-mobile.png`,fullPage:true});report.gallery='PASS';console.log('PASS gallery');}catch(e){report.failures.push('gallery: '+e.message);report.gallery='FAIL';console.error(e.message);if(process.env.GITHUB_ACTIONS)console.error(`::error title=Gallery validation::${e.message.replaceAll("%","%25").replaceAll("\n","%0A")}`);}await context.close();
  // Progressive enhancement: every study retains its headings and navigation without JS.
  const nojs=await browser.newContext({javaScriptEnabled:false});for(const s of sites){const p=await nojs.newPage();await p.goto(`${base}/sites/${s.slug}/`);check(await p.locator('h1').isVisible(),`${s.slug} no-JS h1`);check(await p.locator('#details').count()===1,`${s.slug} no-JS content`);await p.close();}await nojs.close();
  const fallback=await browser.newContext();const fp=await fallback.newPage();await fp.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};});await fp.goto(`${base}/sites/vesper/`);check(await fp.locator('.stage.no-webgl').count()===1,'WebGL fallback');check(await fp.locator('h1').isVisible(),'fallback retains content');await fallback.close();
 }
} finally {await browser.close();report.assertions=assertions;writeFileSync(`${root}/.cache/browser-report.json`,JSON.stringify(report,null,2));}
console.log(`${assertions} assertions; ${report.failures.length} failed sites/check groups.`);
if(report.failures.length)process.exitCode=1;
