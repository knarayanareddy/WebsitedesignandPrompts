#!/usr/bin/env python3
"""Offline complete path/size/SHA-256 comparison with explicit exclusions."""
import argparse
import fnmatch
import hashlib
import json
from pathlib import Path

SUSPECT={'.git','.env','Cookies','Login Data','storage_state.json','secrets.json'}


def manifest(root, exclusions=None):
    root=Path(root).resolve();exclusions=list(exclusions or [])
    if not root.is_dir():raise ValueError('Tree root is not a directory')
    files=[];excluded=[]
    for path in sorted(root.rglob('*')):
        relative=path.relative_to(root).as_posix()
        if any(fnmatch.fnmatchcase(relative,p) or (path.is_dir() and fnmatch.fnmatchcase(relative+'/',p)) for p in exclusions):
            excluded.append(relative);continue
        if path.is_symlink():raise ValueError('Symlink requires separate review: '+relative)
        if path.name in SUSPECT or path.name.startswith('.env.') or path.suffix.lower() in {'.pem','.key','.p12'}:
            raise ValueError('Suspect credential/private path; exclude explicitly or select an asset-only root: '+relative)
        if not path.is_file():continue
        if len(files)>=10000:raise ValueError('File count limit exceeded')
        size=path.stat().st_size
        if size>100_000_000:raise ValueError('File exceeds 100 MB limit: '+relative)
        digest=hashlib.sha256()
        with path.open('rb') as stream:
            for chunk in iter(lambda:stream.read(1024*1024),b''):digest.update(chunk)
        files.append({'path':relative,'bytes':size,'sha256':digest.hexdigest()})
    return {'files':files,'count':len(files),'exclusion_patterns':exclusions,'excluded':excluded,'limits':{'max_files':10000,'max_file_bytes':100000000}}


def compare(left,right,exclusions=None):
    l=manifest(left,exclusions);r=manifest(right,exclusions)
    a={f['path']:f for f in l['files']};b={f['path']:f for f in r['files']}
    missing=sorted(set(a)-set(b));extra=sorted(set(b)-set(a))
    changed=sorted(p for p in set(a)&set(b) if (a[p]['bytes'],a[p]['sha256'])!=(b[p]['bytes'],b[p]['sha256']))
    return {'equal':not(missing or extra or changed),'left_count':l['count'],'right_count':r['count'],'missing_in_right':missing,'extra_in_right':extra,'changed':changed,'exclusion_patterns':list(exclusions or []),'left_excluded':l['excluded'],'right_excluded':r['excluded']}


def main():
    parser=argparse.ArgumentParser(description=__doc__);sub=parser.add_subparsers(dest='command',required=True)
    create=sub.add_parser('manifest');create.add_argument('root',type=Path);create.add_argument('--exclude',action='append',default=[])
    diff=sub.add_parser('compare');diff.add_argument('left',type=Path);diff.add_argument('right',type=Path);diff.add_argument('--exclude',action='append',default=[])
    args=parser.parse_args()
    try:result=manifest(args.root,args.exclude) if args.command=='manifest' else compare(args.left,args.right,args.exclude)
    except (OSError,ValueError) as error:parser.error(str(error))
    print(json.dumps(result,indent=2))
    if args.command=='compare' and not result['equal']:raise SystemExit(1)

if __name__=='__main__':main()
