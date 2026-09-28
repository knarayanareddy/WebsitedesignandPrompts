#!/usr/bin/env node
/**
 * Offline verification of an assembled site tree.
 *
 *   node scripts/verify-site.mjs _site
 *
 * Guards the regression that took the live showcase down: a published directory
 * whose index.html points at a dev-server entry point (`/src/main.tsx`) instead
 * of built assets renders a blank page, because that file does not exist on
 * GitHub Pages.
 *
 * Assumes nothing about which template is which — it discovers published
 * directories and validates every asset reference it finds.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const siteDir = resolve(process.argv[2] ?? '_site');
const failures = [];
const notes = [];

if (!existsSync(siteDir) || !statSync(siteDir).isDirectory()) {
  console.error(`verify-site: no such directory: ${siteDir}`);
  process.exit(1);
}

const readIfPresent = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

/* ---- 1. required files at the site root ---- */
const rootHtml = readIfPresent(join(siteDir, 'index.html'));
if (!rootHtml) {
  failures.push('root index.html is missing (the showcase hub)');
} else {
  for (const path of ['./favicon.svg']) {
    if (rootHtml.includes(`href="${path}"`) && !existsSync(join(siteDir, 'favicon.svg'))) {
      failures.push(`root index.html references ${path} but the file is not published`);
    }
  }
}

/* ---- 2. every directory the hub links to must exist ---- */
if (rootHtml) {
  const hrefs = [...rootHtml.matchAll(/href="(\.\/[^"#?]*\/)"/g)].map((m) => m[1]);
  for (const href of [...new Set(hrefs)]) {
    const target = join(siteDir, href.replace(/^\.\//, ''), 'index.html');
    if (!existsSync(target)) {
      failures.push(`root index.html links ${href} but ${href}index.html was not published`);
    }
  }
}

/* ---- 3. inspect every published index.html ---- */
const skip = new Set(['_site', '.git', 'node_modules']);
const dirs = (function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || skip.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (existsSync(join(full, 'index.html'))) acc.push(full);
    walk(full, acc);
  }
  return acc;
})(siteDir);

for (const dir of dirs) {
  const rel = dir.slice(siteDir.length + 1).replaceAll('\\', '/') || '.';
  const html = readFileSync(join(dir, 'index.html'), 'utf8');

  /* 3a. no dev-server entry points — this is the exact blank-page bug */
  for (const m of html.matchAll(/<(?:script|link)[^>]*\b(?:src|href)="(\/src\/[^"]+)"/g)) {
    failures.push(
      `${rel}/index.html references the dev entry point ${m[1]} — ` +
        'publish the built dist/ (see scripts/build-site.sh), not the source folder',
    );
  }

  /* 3b. every local asset reference resolves inside the published tree */
  const refs = [
    ...html.matchAll(/\b(?:src|href)="((?:\.\/|\/)[^"]+\.(?:js|css|svg|jpg|jpeg|png|webp|mp4|woff2?|json))"/g),
  ].map((m) => m[1]);

  for (const ref of [...new Set(refs)]) {
    const candidate = ref.startsWith('/')
      ? join(siteDir, ref.slice(1))
      : resolve(dir, ref);
    if (!existsSync(candidate)) {
      // GitHub Pages serves from a repo subpath; a root-absolute path is a bug too.
      const hint = ref.startsWith('/')
        ? ' (root-absolute path — will 404 under the /<repo>/ prefix)'
        : '';
      failures.push(`${rel}/index.html -> missing asset ${ref}${hint}`);
    }
  }

  /* 3c. informational: is this a built app or a hand-written page? */
  const builtAssets = [...html.matchAll(/\.\/(assets|img)\//g)].length;
  notes.push(
    `${rel.padEnd(24)} ${builtAssets > 0 ? 'built bundle' : 'static page '} ` +
      `(${(html.length / 1024).toFixed(1)} KB html, ${refs.length} asset refs)`,
  );
}

/* ---- 4. report ---- */
console.log(`verify-site: checked ${dirs.length} published page(s) in ${siteDir}`);
for (const note of notes) console.log(`  • ${note}`);

if (failures.length > 0) {
  console.error(`\nverify-site: ${failures.length} problem(s) found:`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log('verify-site: OK — no dev entry points, all asset references resolve');
