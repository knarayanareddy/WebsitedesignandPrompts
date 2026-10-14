import {chromium} from 'playwright';
import bundled from '@sparticuz/chromium';
import AxeBuilder from '@axe-core/playwright';
import {inflate} from '../node_modules/@sparticuz/chromium/build/esm/lambdafs.js';
import {mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'.cache/soda-v2');mkdirSync(output,{recursive:true});
const lib=await inflate(path.join(root,'node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
process.env.LD_LIBRARY_PATH=lib+'/lib';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await bundled.executablePath(),args:bundled.args.filter(a=>!['--single-process','--disable-web-security'].includes(a)),headless:true});
const base=process.env.SODA_URL||'http://localhost:8080/getlayersai/rebuilds/soda/';
let count=0;const failures=[],errors=[],external=[];
function check(condition,label){count++;assert.ok(condition,label);}
const context=await browser.newContext({viewport:{width:1440,height:1026},reducedMotion:'reduce'});
const p=await context.newPage();p.setDefaultTimeout(20000);
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});p.on('request',r=>{if(!r.url().startsWith(new URL(base).origin)&&!r.url().startsWith('data:'))external.push(r.url());});
async function click(s){await p.locator(s).click();}
async function text(s,t){check((await p.locator(s).innerText()).includes(t),s+' contains '+t);}
async function overflow(){return p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);}
try{
  await p.goto(base,{waitUntil:'networkidle'});await p.waitForSelector('.scene.ready');
  check(await p.locator('h1').count()===1,'One semantic main heading');
  check(await p.locator('#motion-toggle').getAttribute('aria-pressed')==='true','OS reduced-motion honored');
  check(await overflow(),'Desktop fits viewport');
  check(await p.locator('#classic-thumb').getAttribute('src').then(s=>s.startsWith('data:image/png')),'Thumbnails rendered from reconstructed mesh');
  await p.screenshot({path:path.join(output,'desktop-green.png')});
  const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  writeFileSync(path.join(output,'axe.json'),JSON.stringify(axe.violations,null,2));
  check(axe.violations.length===0,'Default-state automated accessibility scan: '+axe.violations.map(v=>v.id));
  const canvasGreen=await p.locator('canvas').screenshot();
  await click('[data-select="1"]');await p.waitForTimeout(250);
  check(await p.locator('[data-select="1"]').getAttribute('aria-pressed')==='true','Blue pressed state');
  await text('#flavor-status','Blue can with blueberries');
  check((await p.evaluate(()=>Number(document.documentElement.style.getPropertyValue('--flavor'))))===1,'Blue background settled in reduced motion');
  check(!canvasGreen.equals(await p.locator('canvas').screenshot()),'3D canvas actually changes, not only DOM labels');
  await p.screenshot({path:path.join(output,'desktop-blue.png')});
  await click('[data-direction="1"]');check(await p.locator('[data-select="0"]').getAttribute('aria-pressed')==='true','Arrow cycles flavor');
  await click('[data-open="shop"]');await click('[data-quantity="1"]');await click('[data-quantity="1"]');await text('#total','$8.97');await click('#add-to-bag');await text('.cart-count','3');await text('#toast','No order placed');
  for(const page of ['ingredients','taste','eco','reviews']){await click(`[data-page="${page}"]`);check(await p.locator('dialog').evaluate(d=>d.open),page+' opens details');await p.keyboard.press('Escape');check(await p.locator(`[data-page="${page}"]`).evaluate(b=>b===document.activeElement),page+' focus restores');}
  await click('[data-open="contact"]');await p.fill('#name','Sample Visitor');await p.fill('#email','sample@example.com');await p.locator('#contact-form button').click();await text('#contact-status','Nothing was sent or saved');await p.keyboard.press('Escape');
  await p.setViewportSize({width:768,height:1024});await p.waitForTimeout(200);check(await overflow(),'Tablet fits viewport');
  for(const width of [375,390,430]){
    await p.setViewportSize({width,height:844});await p.waitForTimeout(200);check(await overflow(),`${width}px mobile fits viewport`);
    await click('.mobile-menu');check(await p.locator('.mobile-menu').getAttribute('aria-expanded')==='true','Mobile menu opens');await p.keyboard.press('Escape');check(await p.locator('.mobile-menu').getAttribute('aria-expanded')==='false','Escape closes menu');
    await p.evaluate(()=>document.activeElement.blur());await p.screenshot({path:path.join(output,`mobile-${width}.png`),fullPage:true});
  }
  await p.setViewportSize({width:1440,height:1026});await p.evaluate(()=>document.activeElement.blur());await click('#motion-toggle');await click('[data-select="1"]');
  await p.waitForFunction(()=>Number(document.documentElement.style.getPropertyValue('--flavor'))===1,null,{timeout:20000});
  check(await p.locator('#motion-toggle').getAttribute('aria-pressed')==='false','Motion resumes on request');
  await click('[data-select="0"]');await p.waitForFunction(()=>Number(document.documentElement.style.getPropertyValue('--flavor'))===0,null,{timeout:20000});
  check(await p.locator('.scene.ready').count()===1,'Repeated animated changes retain live scene');
  await click('#motion-toggle');
  check(errors.length===0,'No page/HTTP errors: '+errors.join('; '));check(external.length===0,'No external runtime requests: '+external.join('; '));
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const n=await nojs.newPage();await n.goto(base);check(await n.locator('h1').isVisible(),'No-JS heading');check(await n.locator('.product-fallback').isVisible(),'No-JS local product fallback');await nojs.close();
  const fallback=await browser.newContext();const f=await fallback.newPage();await f.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return /webgl/.test(kind)?null:original.call(this,kind,...args);};});await f.goto(base);await f.waitForSelector('.scene-status:visible');check(await f.locator('.product-fallback').isVisible(),'Explicit WebGL failure retains product');await f.locator('[data-select="1"]').click();check(await f.locator('[data-select="1"]').getAttribute('aria-pressed')==='true','Fallback flavor controls remain functional');await fallback.close();
  // Notes are part of the requested deliverable and must actually resolve.
  const response=await p.goto(new URL('methodology.html',base).href);check(response.status()===200,'Methodology page resolves');check(await p.locator('h1').count()===1,'Methodology has a heading');
}catch(e){failures.push(e.stack);console.error(e);await p.screenshot({path:path.join(output,'failure.png'),fullPage:true}).catch(()=>{});}finally{await browser.close();}
const report={assertions:count,failures,errors,external,referenceViewport:'1440 x 1026',base};writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(`${count} assertions; ${failures.length} failure groups.`);if(failures.length)process.exitCode=1;
