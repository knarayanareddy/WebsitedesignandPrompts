#!/usr/bin/env python3
"""Prepare the explicitly requested Pages rendition from the verified local tree."""
import argparse
import hashlib
import json
import re
import shutil
import urllib.request
from pathlib import Path

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source',type=Path,required=True);parser.add_argument('--manifest',type=Path,required=True)
args=parser.parse_args()
repo=Path(__file__).resolve().parents[1];dest=repo/'designbyxam/site'
source=args.source.resolve();manifest=json.loads(args.manifest.read_text())
records=[]
for item in manifest['files']:
    if item['status']!='copied-unmodified':raise SystemExit('Incomplete source inventory')
    relative=Path(item['path']);target=source/relative
    if relative.is_absolute() or '..' in relative.parts or target.is_symlink():raise SystemExit('Unsafe source entry')
    data=target.read_bytes();digest=hashlib.sha256(data).hexdigest()
    if digest!=item['sha256']:raise SystemExit('Source hash mismatch: '+item['path'])
    records.append({'path':item['path'],'bytes':len(data),'sha256':digest,'source':item['source'],'origin':'verified-local-copy'})
html=(source/'index.html').read_text()
for pattern in [r'gh[pousr]_[A-Za-z0-9]{20,}',r'sk-[A-Za-z0-9]{24,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----']:
    if re.search(pattern,html):raise SystemExit('Potential credential material: inspect before publication')
if dest.exists() and any(dest.iterdir()):raise SystemExit('Destination not empty; do not overwrite unrelated work')
dest.mkdir(parents=True,exist_ok=True)
for item in records:
    target=dest/item['path'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source/item['path'],target)
# Native icon links are present in original HTML but absent from the earlier image-prefix inventory.
for filename in ['favicon.ico','favicon-32.png','favicon-192.png','apple-touch-icon.png']:
    url='https://samuelidowu.com/'+filename
    with urllib.request.urlopen(url,timeout=30) as response:
        if response.status!=200 or response.headers.get_content_type()=='text/html':raise SystemExit('Icon acquisition failed: '+filename)
        data=response.read(2_000_001)
        if len(data)>2_000_000:raise SystemExit('Icon too large')
    (dest/filename).write_bytes(data)
    records.append({'path':filename,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'source':url,'origin':'original-linked-icon'})
actual=sorted(p.relative_to(dest).as_posix() for p in dest.rglob('*') if p.is_file())
assert actual==sorted(i['path'] for i in records)
for item in records:assert hashlib.sha256((dest/item['path']).read_bytes()).hexdigest()==item['sha256']
assert (dest/'index.html').read_bytes()==(source/'index.html').read_bytes()
result={'scope':'User-requested public reference rendition; original attribution and frontend bytes retained; third-party rights not granted by repository license','reference':'https://samuelidowu.com/','serving_slug':'designbyxam','file_count':len(records),'original_frontend_unchanged':True,'files':records}
(repo/'designbyxam/evidence/pages-assets.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'site_files':len(records),'total_bytes':sum(i['bytes'] for i in records),'original_frontend_unchanged':True,'destination':str(dest)},indent=2))
