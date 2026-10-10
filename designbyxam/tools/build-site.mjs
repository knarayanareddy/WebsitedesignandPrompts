import { readFile, mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
const root=resolve(import.meta.dirname,'..'),source=resolve(root,'site'),output=resolve(root,'dist');
const manifest=JSON.parse(await readFile(resolve(root,'evidence/pages-assets.json'),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
async function paths(dir,prefix=''){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())out.push(...await paths(resolve(dir,e.name),p+'/'));else out.push(p);}return out.sort();}
if(JSON.stringify(await paths(source))!==JSON.stringify(manifest.files.map(f=>f.path).sort()))throw new Error('Source path set mismatch');
for(const f of manifest.files)if(hash(await readFile(resolve(source,f.path)))!==f.sha256)throw new Error('Source byte drift: '+f.path);
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
for(const f of manifest.files){const dest=resolve(output,f.path);if(!dest.startsWith(output+'/'))throw new Error('Unsafe manifest path');await mkdir(dirname(dest),{recursive:true});await copyFile(resolve(source,f.path),dest);if(hash(await readFile(dest))!==f.sha256)throw new Error('Output byte drift');}
console.log(`Built ${manifest.files.length} unchanged frontend files in ${output}`);
