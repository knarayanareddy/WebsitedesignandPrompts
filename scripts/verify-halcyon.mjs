import { createRequire } from 'node:module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(process.cwd(), 'brunosimon', 'package.json'));
const puppeteer = require('puppeteer');

async function run() {
  console.log('🚀 Starting Halcyon verification on http://localhost:3008/halcyon/ ...');

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

  page.on('requestfailed', request => {
    networkErrors.push(`Failed URL: ${request.url()} - ${request.failure()?.errorText}`);
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  await page.goto('http://localhost:3008/halcyon/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  console.log('📸 1. Capturing Biome 1: Golden Hour Dawn...');
  await page.screenshot({ path: 'scripts/halcyon_live_dawn.png' });

  console.log('📜 2. Scrolling to Biome 2: Forge / Smouldering Dusk...');
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, 0.48 * maxScroll);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/halcyon_live_dusk.png' });

  console.log('🌌 3. Scrolling to Biome 3: Heritage / Moonlit Night...');
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, 0.72 * maxScroll);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/halcyon_live_night.png' });

  console.log('💎 4. Scrolling to Biome 4: Timeless / Emerald Dawn...');
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, 1.0 * maxScroll);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/halcyon_live_emerald.png' });

  console.log('🏛️ 5. Opening Atelier Shop Drawer...');
  await page.click('#btnShopCta');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/halcyon_live_drawer.png' });

  console.log('📱 6. Testing Mobile Viewport...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/halcyon_live_mobile.png' });

  console.log('-------------------------------------------');
  console.log(`Console Errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ❌ ${e}`));
  console.log(`Network Errors: ${networkErrors.length}`);
  networkErrors.forEach(e => console.log(`  ❌ ${e}`));
  console.log('-------------------------------------------');

  await browser.close();

  if (errors.length > 0 || networkErrors.length > 0) {
    process.exit(1);
  } else {
    console.log('✅ ALL HALCYON VERIFICATION CHECKS PASSED WITH ZERO ERRORS!');
  }
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
