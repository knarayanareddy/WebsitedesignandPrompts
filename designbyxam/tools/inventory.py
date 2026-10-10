#!/usr/bin/env python3
"""Offline linked-asset inventory; never fetches or grants reuse permission."""
import argparse
import json
import re
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path

EXTS={'.html','.css','.js','.json','.svg','.png','.jpg','.jpeg','.webp','.avif','.woff','.woff2','.mp4','.webm','.glb','.gltf','.hdr','.exr','.ktx2'}


def inventory(html, origin, config=None, derive=False):
    base=urllib.parse.urlsplit(origin)
    if base.scheme not in {'http','https'} or not base.netloc or base.username or base.password or base.query or base.fragment:
        raise ValueError('Origin must be an ordinary http(s) URL without credentials/query/fragment')
    records={}

    def add(token, found, force=False, derived=False):
        if not isinstance(token,str) or not token or token.startswith(('data:','blob:','#','javascript:','mailto:')):
            return
        raw=urllib.parse.urlsplit(token)
        if '..' in urllib.parse.unquote(raw.path).replace('\\','/').split('/'):
            raise ValueError('Traversal token requires explicit review')
        value=urllib.parse.urlsplit(urllib.parse.urljoin(origin,token))
        if value.scheme not in {'http','https'} or value.username or value.password:
            return
        if not force and Path(value.path).suffix.lower() not in EXTS:
            return
        same=(value.scheme,value.netloc)==(base.scheme,base.netloc)
        safe_url=urllib.parse.urlunsplit((value.scheme,value.netloc,value.path,'',''))
        key=(safe_url,derived)
        if key not in records:
            records[key]={'url_without_query':safe_url,'path':value.path.lstrip('/'),'kind':'derived-unverified' if derived else ('same-origin-linked' if same else 'external-metadata'),'requires_review':bool(value.query or not same or derived),'query_redacted':bool(value.query),'found_in':[]}
        record=records[key];record['query_redacted'] |= bool(value.query);record['requires_review'] |= bool(value.query)
        if found not in record['found_in']:record['found_in'].append(found)

    class Parser(HTMLParser):
        def handle_starttag(self,tag,attrs):
            values=dict(attrs)
            for key,value in attrs:
                if key in {'src','data-src','data-hq','poster'}:add(value,'html:'+key)
                elif key=='srcset' and value and not value.startswith('data:'):
                    for candidate in value.split(','):
                        parts=candidate.strip().split()
                        if parts:add(parts[0],'html:srcset')
            if tag=='link' and set((values.get('rel') or '').split()) & {'stylesheet','preload','modulepreload'}:
                add(values.get('href'),'html:link',force=True)
    Parser().feed(html)
    for match in re.finditer(r'''url\(\s*["']?([^\s"'()<>]+)''',html):add(match.group(1),'css:url')
    extensions='|'.join(sorted(re.escape(e.lstrip('.')) for e in EXTS))
    for match in re.finditer(r'''["']([^\s"'<>]{1,512}\.(?:'''+extensions+r''')(?:\?[^\s"'<>]*)?)["']''',html):add(match.group(1),'quoted-path')

    def walk(node,depth=0):
        if depth>40:raise ValueError('JSON nesting limit exceeded')
        if isinstance(node,dict):
            for value in node.values():walk(value,depth+1)
        elif isinstance(node,list):
            for value in node:walk(value,depth+1)
        elif isinstance(node,str):add(node,'json-value')
    if config is not None:walk(config)
    if derive:
        for record in list(records.values()):
            if record['path'].endswith('.mp4') and not record['query_redacted']:
                add(record['url_without_query'][:-4]+'-poster.jpg','explicit-mp4-derivation',derived=True)
    files=sorted(records.values(),key=lambda r:(r['url_without_query'],r['kind']))
    for record in files:record['found_in'].sort()
    return {'origin':urllib.parse.urlunsplit((base.scheme,base.netloc,base.path,'','')),'offline':True,'files':files,'count':len(files),'limitations':['Discovery only; no asset acquisition or reuse permission.','Quoted-path regex is not a JavaScript interpreter.','Derived posters require verification; naming is not universal.','Queries are redacted and require separate review.']}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('html',type=Path);parser.add_argument('--origin',required=True);parser.add_argument('--json',type=Path);parser.add_argument('--derive-mp4-posters',action='store_true');args=parser.parse_args()
    try:
        if args.html.stat().st_size>10_000_000:raise ValueError('HTML exceeds 10 MB limit')
        config=None
        if args.json:
            if args.json.stat().st_size>10_000_000:raise ValueError('JSON exceeds 10 MB limit')
            config=json.loads(args.json.read_text(encoding='utf8'))
        result=inventory(args.html.read_text(encoding='utf8'),args.origin,config,args.derive_mp4_posters)
    except (OSError,ValueError) as error:parser.error(str(error))
    print(json.dumps(result,indent=2))

if __name__=='__main__':main()
