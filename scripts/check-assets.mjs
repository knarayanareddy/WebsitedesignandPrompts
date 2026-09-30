#!/usr/bin/env node
/**
 * HEAD-check every remote asset this repository hot-links.
 *
 *   node scripts/check-assets.mjs            # report only (always exits 0)
 *   node scripts/check-assets.mjs --strict   # exit 1 if any URL fails
 *
 * None of this media is committed, so a changed or removed upstream file is
 * invisible to `git status` — it only shows up as an empty area on the live
 * demo. Provenance and replacement steps are documented in ASSETS.md.
 *
 * URLs are scraped from the source rather than duplicated here, so this stays
 * honest when a template swaps a host.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const strict = process.argv.includes('--strict');
const root = process.cwd();
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;

const SOURCES = [
  'videoembeddeddesign/securify/src',
  'aetherascrollstory/src',
  'apogee/src',
  'measured/src',
  'portfolio/src',
  'synapsex/src',
  'ethan-vale-archive/index.html',
];

const TEXT_FILE = /\.(tsx?|jsx?|html|css)$/;
const URL_RE = /https?:\/\/[^\s"'`)<>]+/g;
// Fonts, spec links and social profiles are not media assets — only media is checked.
const SKIP_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'www.w3.org',
  'reactjs.org',
  'github.com',
  'x.com',
  'linkedin.com',
  'dribbble.com',
  'pexels.com/video/',
];
// Hosts that serve media without a file extension in the path (proxies, HLS).
const MEDIA_HOSTS = [
  'videos.pexels.com',
  'images.pexels.com',
  'images.unsplash.com',
  'images.higgs.ai',
  'stream.mux.com',
  'd8j0ntlcm91z4.cloudfront.net',
];
const ASSET_EXT = /\.(mp4|webm|mov|m3u8|jpe?g|png|webp|avif|gif|svg)(\?|#|$)/i;

const isAsset = (url) => ASSET_EXT.test(url) || MEDIA_HOSTS.some((h) => url.includes(h));

function walk(target, acc = []) {
  if (!statSync(target).isDirectory()) {
    acc.push(target);
    return acc;
  }
  for (const entry of readdirSync(target)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    walk(join(target, entry), acc);
  }
  return acc;
}

const found = new Map(); // url -> Set(relative file)
for (const src of SOURCES) {
  for (const file of walk(join(root, src))) {
    if (!TEXT_FILE.test(file)) continue;
    for (const url of readFileSync(file, 'utf8').match(URL_RE) ?? []) {
      const clean = url.replace(/[),.;]+$/, '').replace(/&amp;/g, '&');
      if (SKIP_HOSTS.some((h) => clean.includes(h))) continue;
      if (!isAsset(clean)) continue;
      if (!found.has(clean)) found.set(clean, new Set());
      found.get(clean).add(relative(root, file));
    }
  }
}

const urls = [...found.keys()].sort();
// Deduplicate by resource, not by URL string: the same Pexels file often appears
// as both the video and its poster, and Unsplash URLs differ only by ?w=.
const byResource = new Map();
for (const url of urls) {
  const key = url.replace(/[?#].*$/, '');
  if (!byResource.has(key)) byResource.set(key, []);
  byResource.get(key).push(url);
}

async function check(resource, variants) {
  const started = Date.now();
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(variants[0], {
        method,
        redirect: 'follow',
        headers: method === 'GET' ? { range: 'bytes=0-0' } : {},
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      // 403/405 on HEAD is common for CDNs; fall through to GET once.
      if (method === 'HEAD' && (res.status === 403 || res.status === 405)) continue;
      return { ok: res.ok, status: res.status, ms: Date.now() - started };
    } catch (err) {
      if (method === 'GET') {
        return { ok: false, status: 0, ms: Date.now() - started, error: err.name };
      }
    }
  }
  return { ok: false, status: 0, ms: Date.now() - started, error: 'unreachable' };
}

const checked = [...byResource.entries()];
const results = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < checked.length) {
      const [resource, variants] = checked[cursor++];
      const result = await check(resource, variants);
      results.push({ resource, variants, ...result });
      const mark = result.ok ? '✓' : '✗';
      const detail = result.ok ? `${result.status} ${result.ms}ms` : `${result.status || result.error}`;
      console.log(`${mark} ${detail.padEnd(12)} ${resource.slice(0, 110)}`);
    }
  }),
);

const failed = results.filter((r) => !r.ok);
const referencingFiles = new Set([...found.values()].flatMap((s) => [...s]));
console.log(
  `\ncheck-assets: ${results.length - failed.length}/${results.length} reachable ` +
    `(${found.size} URLs referenced from ${referencingFiles.size} files)`,
);

// A fully-failing run that completes almost instantly is almost always a blocked
// network (restricted sandbox, offline laptop) rather than 30 dead upstreams.
const elapsed = results.reduce((max, r) => Math.max(max, r.ms), 0);
if (failed.length === results.length && elapsed < 2000) {
  console.log(
    `\n! every check failed in <${elapsed}ms — this environment looks like it has no ` +
      'outbound access to these hosts, so the results above are inconclusive. ' +
      'Re-run from CI or an unrestricted network.',
  );
  process.exit(0);
}

if (failed.length > 0) {
  console.log('\nUnreachable sources and the files that reference them:');
  for (const { resource, variants } of failed) {
    console.log(`  ✗ ${resource}`);
    for (const file of found.get(variants[0]) ?? []) console.log(`      ${file}`);
  }
  console.log('\nSee ASSETS.md for provenance and self-hosting instructions.');
  if (strict) process.exit(1);
}
