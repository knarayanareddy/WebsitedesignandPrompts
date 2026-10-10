import { test, expect } from '@playwright/test';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
const BASE=process.env.PUBLIC_SITE_URL||'http://127.0.0.1:4174/WebsitedesignandPrompts/designbyxam/';
test.use({reducedMotion:'reduce'});
async function ready(page,route='about'){
 await page.goto('./#'+route);await page.waitForFunction(()=>document.querySelector('[data-ek="ab-p1"]')?.textContent.startsWith("I've always"));await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!document.documentElement.classList.contains('ep'));
}
async function filePaths(root,prefix=''){const result=[];for(const e of await readdir(root,{withFileTypes:true})){const path=prefix+e.name;if(e.isDirectory())result.push(...await filePaths(root+'/'+e.name,path+'/'));else result.push(path);}return result.sort();}

test('all acquired original files and build outputs are byte-identical with complete path sets',async()=>{
 const manifest=JSON.parse(await readFile('evidence/pages-assets.json','utf8'));const expected=manifest.files.map(f=>f.path).sort();expect(await filePaths('site')).toEqual(expected);expect(await filePaths('dist')).toEqual(expected);
 for(const f of manifest.files){expect(hash(await readFile('site/'+f.path))).toBe(f.sha256);expect(hash(await readFile('dist/'+f.path))).toBe(f.sha256);}
});

test('served HTML and every original asset match the acquired bytes',async({request})=>{
 const manifest=JSON.parse(await readFile('evidence/pages-assets.json','utf8'));
 for(const f of manifest.files){const response=await request.get('./'+(f.path==='index.html'?'':f.path));expect(response.ok(),f.path).toBe(true);expect(hash(await response.body()),f.path).toBe(f.sha256);}
});

test('About shows real original portraits/shadows and no substitute UI or JS errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await ready(page);const photo=page.getByRole('img',{name:'Samuel standing in a grey kaftan'});await photo.evaluate(i=>i.decode());await expect(photo).toBeVisible();expect(await photo.evaluate(i=>[i.naturalWidth,i.naturalHeight])).toEqual([503,1206]);await page.locator('#ab-ph1 .ab-sh').evaluate(i=>i.decode());expect(await page.locator('#ab-ph1 .ab-sh').evaluate(i=>[i.naturalWidth,i.naturalHeight])).toEqual([978,616]);
 await expect(page.getByText('Independent local study',{exact:false})).toHaveCount(0);await expect(page.locator('.study-note')).toHaveCount(0);expect(errors).toEqual([]);
});

test('original page links and back navigate without invented routes',async({page})=>{
 await ready(page);await page.locator('#view-about nav').getByRole('link',{name:'Projects',exact:true}).click();await expect(page.locator('#view-projects')).toBeVisible();await page.locator('#view-projects nav').getByRole('link',{name:'Archive',exact:true}).click();await expect(page.getByRole('heading',{name:'Archive',exact:true})).toBeVisible();await page.goBack();await expect(page.locator('#view-projects')).toBeVisible();await page.locator('#view-projects nav').getByRole('link',{name:'Home',exact:true}).click();await expect(page.locator('#view-home')).toBeVisible();await page.locator('#view-home nav').getByRole('link',{name:'Contact me',exact:true}).click();await expect(page.locator('#view-contact')).toBeVisible();
});

test('original project categories expose six branding and seven motion entries',async({page})=>{
 await ready(page,'projects');await expect(page.locator('#view-projects .pj-card:not(.is-off)')).toHaveCount(6);await page.getByRole('tab',{name:'Motion',exact:true}).click();await expect(page.locator('#view-projects .pj-card:not(.is-off)')).toHaveCount(7);await expect(page.locator('#view-projects .pj-card:not(.is-off)').first()).toContainText('Deductive');await page.getByRole('tab',{name:'Branding',exact:true}).click();await expect(page.locator('#view-projects .pj-card:not(.is-off)')).toHaveCount(6);
});

test('original archive filter and high-resolution poster lightbox work',async({page})=>{
 await ready(page,'archive');await page.getByRole('tab',{name:'Merch',exact:true}).click();await expect(page.getByText('is on its way.',{exact:false}).first()).toBeVisible();await page.getByRole('tab',{name:'Posters',exact:true}).click();await page.locator('#ar-grid .ar-cell[data-pid="p02"]').click();await expect(page.locator('.lb')).toBeVisible();await expect.poll(()=>page.locator('.lb img').evaluate(i=>i.naturalWidth)).toBeGreaterThan(0);await page.keyboard.press('Escape');await expect(page.locator('.lb')).toBeHidden();
});

test('original dark hover visibly changes the page and clears on leave',async({page})=>{
 await ready(page);const service=page.locator('#view-about .hv-dark');await service.scrollIntoViewIfNeeded();await page.mouse.move(1,1);const before=await page.screenshot({animations:'disabled'});await service.hover();const dark=await page.screenshot({animations:'disabled'});expect(dark.equals(before)).toBe(false);await page.mouse.move(1,1);await expect(page.locator('html')).not.toHaveClass(/\binv\b/);
});

for(const name of ['The Bible','The Soundcore Q45','My M1 Max'])test(`original WebGL ${name} renders and responds to real dragging`,async({page})=>{
 test.setTimeout(120000); // Recorded cold WebGL initialization exceeded the default case budget; no retries.
 await ready(page);const trigger=page.getByRole('button',{name:`View ${name} in 3D`,exact:true});await trigger.click();const viewer=page.getByRole('dialog',{name:`3D view: ${name}`,exact:true});await expect(viewer).toBeVisible();const canvas=viewer.locator('canvas');await expect(canvas).toBeVisible();await expect(viewer.locator('.lv-msg')).toBeHidden();
 const b=await canvas.boundingBox();const before=await page.screenshot({clip:b});await page.mouse.move(b.x+b.width*.5,b.y+b.height*.5);await page.mouse.down();await page.mouse.move(b.x+b.width*.65,b.y+b.height*.42,{steps:10});await page.mouse.up();await expect.poll(async()=>!(await page.screenshot({clip:b})).equals(before)).toBe(true);await mkdir('test-results/screenshots',{recursive:true});await page.screenshot({path:`test-results/screenshots/webgl-${name.replaceAll(' ','-')}.png`});await page.keyboard.press('Escape');await expect(page.locator('html')).not.toHaveClass(/\blv-open\b/);await expect(trigger).toBeFocused();
});

test('original photo gallery preserves real photos and the original double-step keyboard behavior',async({page})=>{
 await ready(page);const trigger=page.getByRole('button',{name:'Open the My Babe gallery'});await trigger.click();const gallery=page.getByRole('dialog',{name:'My Babe gallery',exact:true});await expect(gallery).toBeVisible();await gallery.locator('.bgl-card').first().locator('img').evaluate(i=>i.decode());const slider=page.getByRole('slider',{name:'Scrub through photos'});await expect(slider).toHaveAttribute('aria-valuenow','1');await slider.focus();await page.keyboard.press('ArrowRight');await expect(slider).toHaveAttribute('aria-valuenow','3');await page.keyboard.press('Escape');await expect(page.locator('html')).not.toHaveClass(/\bbgl-open\b/);await expect(trigger).toBeFocused();
});

test('original mobile menu and Escape focus return work with touch emulation',async({browser})=>{
 const context=await browser.newContext({baseURL:BASE,viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const page=await context.newPage();await ready(page);const menu=page.locator('#view-about').getByRole('button',{name:'Menu',exact:true});await menu.tap();const panel=page.getByRole('dialog',{name:'Menu',exact:true});await expect(panel).toBeVisible();await panel.getByRole('link',{name:'Projects',exact:true}).tap();await expect(page.locator('#view-projects')).toBeVisible();await page.locator('#view-projects').getByRole('button',{name:'Menu',exact:true}).tap();await page.keyboard.press('Escape');await expect(page.locator('#view-projects').getByRole('button',{name:'Menu',exact:true})).toBeFocused();await context.close();
});

for(const width of [390,768,1280,1440])test(`original layout loads five views without horizontal scrolling at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});await ready(page);for(const name of ['about','projects','archive','contact','home']){await page.evaluate(n=>{location.hash=n==='home'?'':n;},name);await expect(page.locator('#view-'+name)).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});

test('original smooth wheel scrolling and reverse direction work',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await ready(page);await page.mouse.move(1200,500);await page.mouse.wheel(0,700);await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(700);const position=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,-300);await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(position);
});

test('media ranges work and the local server rejects writes and hidden files',async({request})=>{
 const range=await request.get('./ab/b6.mp4',{headers:{Range:'bytes=0-15'}});expect(range.status()).toBe(206);expect((await range.body()).length).toBe(16);expect(range.headers()['content-type']).toBe('video/mp4');if(!process.env.PUBLIC_SITE_URL){expect((await request.get('./.git/config')).status()).toBe(403);expect((await request.post('./site/edits.json',{data:{v:100}})).status()).toBe(405);}
});
