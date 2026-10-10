#!/usr/bin/env python3
"""Verify the rendition's exact asset tree and known Linux filename regression."""
import hashlib
import json
import re
import subprocess
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

REPO=Path(__file__).resolve().parents[1]
manifest=json.loads((REPO/'designbyxam/evidence/pages-assets.json').read_text())
root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else REPO/'designbyxam/site'
expected=sorted(f['path'] for f in manifest['files'])
actual=sorted(p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file())
assert actual==expected,'Published path set differs from manifest'
for item in manifest['files']:
    path=root/item['path'];assert not path.is_symlink()
    data=path.read_bytes();assert len(data)==item['bytes'];assert hashlib.sha256(data).hexdigest()==item['sha256'],item['path']
tracked=set(subprocess.check_output(['git','ls-files','-z','--','bbdo/assets/images'],cwd=REPO).decode().split('\0'))
refs=re.findall(r'(?:data-src|data-src-webp)="(\./assets/images/DB_POETRY[^\"]+)"',(REPO/'bbdo/index.html').read_text())
assert refs and all('bbdo/'+ref[2:] in tracked for ref in refs),'Unicode image spelling does not match Git paths'
class Cards(HTMLParser):
    def __init__(self):super().__init__();self.counts=Counter()
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='article' and 'card' in (d.get('class') or '').split():
            self.counts['all']+=1;self.counts.update((d.get('data-category') or '').split())
p=Cards();p.feed((REPO/'index.html').read_text())
print(json.dumps({'rendition_files':len(actual),'all_hashes_match':True,'linux_unicode_reference_matches_git':True,'showcase_categories':dict(p.counts)},indent=2))
