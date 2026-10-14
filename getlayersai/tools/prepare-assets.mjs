import {copyFileSync, mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = `${root}/shared/vendor`;
mkdirSync(dest, {recursive:true});
for (const [from,to] of [
 ['three/build/three.module.min.js','three.module.min.js'],['three/LICENSE','THREE-LICENSE.txt'],
 ['@fontsource/geist/files/geist-latin-400-normal.woff2','geist-400.woff2'],
 ['@fontsource/geist/files/geist-latin-600-normal.woff2','geist-600.woff2'],
 ['@fontsource/geist/LICENSE','GEIST-LICENSE.txt'],
 ['@fontsource/syne/files/syne-latin-800-normal.woff2','syne-800.woff2'],
 ['@fontsource/syne/LICENSE','SYNE-LICENSE.txt'],
 ['@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2','cormorant-500.woff2'],
 ['@fontsource/cormorant-garamond/LICENSE','CORMORANT-LICENSE.txt']
]) copyFileSync(`${root}/node_modules/${from}`,`${dest}/${to}`);
