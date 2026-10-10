import { existsSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(join(process.cwd(), 'brunosimon', 'package.json'));
const puppeteer = require('puppeteer');

const outDir = join(process.cwd(), 'assets', 'previews');
mkdirSync(outDir, { recursive: true });

const sites = [
  { slug: 'apogee', title: 'Apogee', url: 'http://localhost:3008/_site/apogee/', waitMs: 2500 },
  { slug: 'jack', title: 'Jack', url: 'http://localhost:3008/_site/jack/', waitMs: 2000 },
  { slug: 'synapsex', title: 'SynapseX', url: 'http://localhost:3008/_site/synapsex/', waitMs: 2000 },
  { slug: 'ethanvale', title: 'Ethan Vale', url: 'http://localhost:3008/_site/ethanvale/', waitMs: 2000 },
  { slug: 'portfolio', title: 'Editorial Portfolio', url: 'http://localhost:3008/_site/portfolio/', waitMs: 2000 },
  { slug: 'aetherascrollstory', title: 'Aethera®', url: 'http://localhost:3008/_site/aetherascrollstory/', waitMs: 2000 },
  { slug: 'measured', title: 'Measured', url: 'http://localhost:3008/_site/measured/', waitMs: 2000 },
  { slug: 'videoembeddeddesign', title: 'Securify', url: 'http://localhost:3008/_site/videoembeddeddesign/', waitMs: 2500 },
  { slug: 'brunosimon', title: 'Bruno Simon', url: 'http://localhost:3008/_site/brunosimon/', waitMs: 3000 },
  { slug: 'senbuzy', title: 'Senbuzy', url: 'http://localhost:3008/_site/senbuzy/', waitMs: 2500 },
  { slug: 'portfolio-console', title: 'The Portfolio Console', url: 'http://localhost:3008/_site/portfolio-console/', waitMs: 2000 },
  { slug: 'mariedrouvin', title: 'Marie Drouvin', url: 'http://localhost:3008/_site/mariedrouvin/', waitMs: 2000 },
  { slug: 'bbdo', title: 'BBDO Germany', url: 'http://localhost:3008/_site/bbdo/', waitMs: 2000 },
  { slug: 'bizarro', title: 'Luis Bizarro', url: 'http://localhost:3008/_site/bizarro/', waitMs: 2500 },
  { slug: 'designbyxam', title: 'DesignByXam', url: 'http://localhost:3008/_site/designbyxam/#about', waitMs: 2000 },
  { slug: 'expa', title: 'Expa', url: 'http://localhost:3008/_site/expa/', waitMs: 2500 },
  { slug: 'vitaliiradov', title: 'Vitalii Radov', url: 'http://localhost:3008/_site/vitaliiradov/', waitMs: 2000 },
  { slug: 'meliketurgut', title: 'Melike Turgut', url: 'http://localhost:3008/_site/meliketurgut/', waitMs: 2500 },
  { slug: 'ysuriadesign', title: 'Yogi Suria', url: 'http://localhost:3008/_site/ysuriadesign/', waitMs: 2500 }
];

console.log(`Starting preview capture for ${sites.length} sites...`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=metal']
});

const page = await browser.newPage();
await page.setViewport({ width: 960, height: 540, deviceScaleFactor: 1 });

for (let i = 0; i < sites.length; i++) {
  const item = sites[i];
  const posterPath = join(outDir, `${item.slug}.webp`);
  const videoPath = join(outDir, `${item.slug}.mp4`);
  const frameDir = `/tmp/reel_frames_${item.slug}`;
  mkdirSync(frameDir, { recursive: true });

  console.log(`[${i + 1}/${sites.length}] Capturing ${item.slug}...`);
  try {
    await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(r => setTimeout(r, item.waitMs));

    // Capture poster WebP
    await page.screenshot({ path: posterPath, type: 'webp', quality: 90 });

    // Capture 18 frames (~1.5s video at 12fps) with slight micro-motion
    const frameCount = 18;
    for (let f = 0; f < frameCount; f++) {
      // simulate subtle mouse movement or scroll for dynamic reaction
      const mx = 480 + Math.sin(f / 3) * 60;
      const my = 270 + Math.cos(f / 3) * 40;
      await page.mouse.move(mx, my);
      await page.screenshot({ path: join(frameDir, `frame_${String(f).padStart(3, '0')}.jpg`), quality: 80 });
      await new Promise(r => setTimeout(r, 65));
    }

    // Encode MP4 with ffmpeg (silent, h264, yuv420p, high compatibility, loop-friendly)
    execSync(`ffmpeg -y -framerate 12 -i "${frameDir}/frame_%03d.jpg" -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart "${videoPath}" 2>/dev/null`);

    rmSync(frameDir, { recursive: true, force: true });

    const pSize = (statSync(posterPath).size / 1024).toFixed(1);
    const vSize = (statSync(videoPath).size / 1024).toFixed(1);
    console.log(`    -> poster: ${pSize} KB, video: ${vSize} KB`);
  } catch (err) {
    console.error(`    FAILED for ${item.slug}:`, err.message);
  }
}

await browser.close();
console.log('All 19 previews successfully generated!');
