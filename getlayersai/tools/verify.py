#!/usr/bin/env python3
"""Strict offline validation of collection links, fragments, assets, and source parity.
Usage: python3 getlayersai/tools/verify.py [published/getlayersai]
"""
import json, re, sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
ROOT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self):
        super().__init__();self.refs=[];self.ids=[];self.h1=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        for key in ['src','href']:
            if a.get(key):self.refs.append((tag,key,a[key]))
errors=[];count=0
sites=json.loads((ROOT/'sites.json').read_text())
if len(sites)!=13:errors.append('Expected exactly 13 selected sites')
docs={}
for path in [ROOT/'index.html',*sorted((ROOT/'sites').glob('*/*.html'))]:
    doc=Document();doc.feed(path.read_text());docs[path]=doc
    if doc.h1!=1:errors.append(f'{path}: expected one h1, got {doc.h1}')
    if len(doc.ids)!=len(set(doc.ids)):errors.append(f'{path}: duplicate ids')
for path,doc in docs.items():
    for tag,key,ref in doc.refs:
        parts=urlsplit(ref)
        if parts.scheme or parts.netloc:
            if tag in ['script','img','link'] and not (tag=='link' and key=='href' and 'github.com' in ref):errors.append(f'{path}: runtime external dependency {ref}')
            continue
        if ref.startswith('/'):
            errors.append(f'{path}: root absolute URL breaks Pages prefix: {ref}');continue
        target=(path.parent/unquote(parts.path)).resolve() if parts.path else path
        if target.is_dir():target/= 'index.html'
        # The gallery links one level up into the enclosing repository showcase.
        if target==ROOT.parent/'index.html':continue
        if not target.exists():errors.append(f'{path.relative_to(ROOT)}: missing {ref}');continue
        if parts.fragment and target.suffix=='.html':
            other=docs.get(target)
            if other and parts.fragment not in other.ids:errors.append(f'{path}: missing fragment {ref}')
        count+=1
for s in sites:
    folder=ROOT/'sites'/s['slug']
    for name in ['index.html','theme.css','methodology.html','README.md','ADAPTED_PROMPT.md','BUILD_LOG.md']:
        if not (folder/name).is_file():errors.append(f'{s["slug"]}: missing {name}')
    preview=ROOT/'previews'/f'{s["slug"]}.webp'
    if not preview.is_file():errors.append(f'{s["slug"]}: missing actual screenshot preview')
for path in (ROOT/'shared').glob('*.css'):
    for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',path.read_text()):
        if not (path.parent/ref).exists():errors.append(f'{path.name}: missing CSS asset {ref}')
for path in (ROOT/'shared').glob('*.js'):
    for ref in re.findall(r'from\s+[\'"](\.[^\'"]+)',path.read_text()):
        if not (path.parent/ref).exists():errors.append(f'{path.name}: missing JS import {ref}')
if errors:
    print('\n'.join(errors));sys.exit(1)
print(f'PASS: {len(sites)} sites, {len(docs)} HTML documents, {count} local references; no broken anchors/assets or runtime CDN dependencies.')
