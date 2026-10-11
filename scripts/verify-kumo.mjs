import { createRequire } from 'node:module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(process.cwd(), 'brunosimon', 'package.json'));
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page error: ${err.message}`);
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      networkErrors.push(`${res.status()} ${res.url()}`);
    }
  });

  const targetUrl = process.argv[2] || 'http://localhost:3008/kumo/';
  console.log(`Navigating to ${targetUrl} ...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  // 1. Capture preloader screenshot immediately or during progress
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_preloader.png') });
  console.log('Captured preloader screenshot');

  // 2. Wait for preloader to dismiss (or click skip)
  await new Promise(r => setTimeout(r, 2600));

  // Capture Hero Scene
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_hero.png') });
  console.log('Captured hero scene screenshot');

  // 3. Scroll to Scene 2 (Golden Boulevard)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.30, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_scene02.png') });
  console.log('Captured Scene 2 screenshot');

  // 4. Scroll to Scene 3 (Girl looking up)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.50, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_scene03.png') });
  console.log('Captured Scene 3 screenshot');

  // 5. Scroll to 3D Ring section
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.84, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_ring.png') });
  console.log('Captured 3D ring screenshot');

  // 6. Test clicking Watch Film button to open modal
  await page.click('#btnWatchActiveFilm');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_modal.png') });
  console.log('Captured cinema modal screenshot');

  // Close modal
  await page.click('#closeModalBtn');
  await new Promise(r => setTimeout(r, 300));

  // 7. Scroll to Footer
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.98, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_footer.png') });
  console.log('Captured footer screenshot');

  // 8. Mobile Viewport Test
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'kumo_live_mobile.png') });
  console.log('Captured mobile screenshot');

  console.log('--- Verification Summary ---');
  console.log('Console Errors:', errors.length);
  errors.forEach(e => console.log('  ', e));
  console.log('Network 4xx/5xx Errors:', networkErrors.length);
  networkErrors.forEach(e => console.log('  ', e));

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
