#!/usr/bin/env python3
"""Retrieve SHA-verified research frames through the GitHub checks API.

Usage: python3 getlayersai/tools/retrieve-reference.py <capture-commit-sha>
The frames are ignored local research data, never site runtime assets.
"""
import base64
import hashlib
import json
from pathlib import Path
import subprocess
import sys

REPO = 'knarayanareddy/WebsitedesignandPrompts'
ROOT = Path(__file__).resolve().parents[1] / '.cache/reference/soda'
SHA = sys.argv[1] if len(sys.argv) > 1 else subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()


def api(endpoint):
    return json.loads(subprocess.check_output(['gh', 'api', endpoint], text=True))


checks = api(f'repos/{REPO}/commits/{SHA}/check-runs?per_page=100')['check_runs']
check = next((c for c in checks if c['name'] == 'Soda reference / manifest'), None)
if not check:
    raise SystemExit('Capture manifest is not available yet. Wait for the reference job to finish.')
manifest = json.loads(check['output']['text'])
ROOT.mkdir(parents=True, exist_ok=True)
(ROOT/'manifest.json').write_text(json.dumps(manifest, indent=2))
for frame in manifest['frames']:
    target = ROOT / Path(frame['filename']).name
    if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == frame['sha256']:
        continue
    chunks = []
    for check_id in frame['check_run_ids']:
        chunk = next((c for c in checks if c['id'] == check_id), None)
        if chunk is None:
            chunk = api(f'repos/{REPO}/check-runs/{check_id}')
        chunks.append(chunk['output']['text'])
    data = base64.b64decode(''.join(chunks), validate=True)
    if hashlib.sha256(data).hexdigest() != frame['sha256']:
        raise SystemExit(f'Checksum mismatch for {target.name}')
    target.write_bytes(data)
    print(f'{target}: {len(data)} bytes; checksum verified')
print(json.dumps({'media': manifest['media'], 'errors': manifest['errors']}, indent=2))
