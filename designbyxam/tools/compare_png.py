#!/usr/bin/env python3
"""Exact PNG-file comparison, not a decoded-pixel/perceptual quality metric."""
import argparse
import hashlib
import json
import struct
from pathlib import Path


def read_png(path):
    path=Path(path)
    if path.stat().st_size>50_000_000:raise ValueError('PNG exceeds 50 MB limit')
    data=path.read_bytes()
    if len(data)<24 or data[:8]!=b'\x89PNG\r\n\x1a\n' or data[12:16]!=b'IHDR':raise ValueError('Not a recognized PNG header: '+path.name)
    width,height=struct.unpack('>II',data[16:24])
    if not width or not height:raise ValueError('PNG has invalid dimensions')
    return data,{'width':width,'height':height,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}


def compare_png(left,right):
    a,am=read_png(left);b,bm=read_png(right)
    return {'exact_png_bytes_equal':a==b,'left':am,'right':bm,'limits':'Header validation and byte equality only. Unequal PNG files may still decode to identical pixels; no perceptual score or temporal fidelity is established.'}


def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('left',type=Path);parser.add_argument('right',type=Path);args=parser.parse_args()
    try:result=compare_png(args.left,args.right)
    except (OSError,ValueError) as error:parser.error(str(error))
    print(json.dumps(result,indent=2))
    if not result['exact_png_bytes_equal']:raise SystemExit(1)

if __name__=='__main__':main()
