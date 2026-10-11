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

  const targetUrl = process.argv[2] || 'http://localhost:3008/wanderlust/';
  console.log(`Navigating to ${targetUrl} ...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  // 1. Hero Screenshot
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/wanderlust_live_hero.png' });
  console.log('✓ Captured hero screenshot');

  // 2. Destinations Polaroid Board
  await page.evaluate(() => {
    document.getElementById('destinationsSection').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  // Hover Japan polaroid to test bidirectional linking
  await page.hover('#card-03_japan');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scripts/wanderlust_live_polaroids.png' });
  console.log('✓ Captured polaroids screenshot');

  // 3. Stays Scrapbook Collage Section
  await page.evaluate(() => {
    document.getElementById('staysSection').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/wanderlust_live_stays.png' });
  console.log('✓ Captured stays scrapbook screenshot');

  // 4. Accordion Section (Hover Road Trips)
  await page.evaluate(() => {
    document.getElementById('accordionSection').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.hover('.accordion-panel[data-panel="1"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/wanderlust_live_accordion.png' });
  console.log('✓ Captured accordion screenshot');

  // 5. Plan a Journey Section
  await page.evaluate(() => {
    document.getElementById('planSection').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/wanderlust_live_plan.png' });
  console.log('✓ Captured plan a journey screenshot');

  // 6. Footer Section
  await page.evaluate(() => {
    document.querySelector('.site-footer').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scripts/wanderlust_live_footer.png' });
  console.log('✓ Captured footer screenshot');

  // 7. Modal Interaction
  await page.evaluate(() => {
    openDestModal('01_iceland');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scripts/wanderlust_live_modal.png' });
  console.log('✓ Captured destination detail modal screenshot');

  // 8. Mobile Viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    closeModal('destModal');
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/wanderlust_live_mobile.png' });
  console.log('✓ Captured mobile viewport screenshot');

  await browser.close();

  console.log('\n--- VERIFICATION REPORT ---');
  console.log(`Console errors: ${errors.length}`);
  if (errors.length) console.log(errors);
  console.log(`Network errors: ${networkErrors.length}`);
  if (networkErrors.length) console.log(networkErrors);

  if (errors.length === 0 && networkErrors.length === 0) {
    console.log('🎉 WANDERLUST VERIFICATION PASSED WITH ZERO ERRORS!');
  } else {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
