#!/usr/bin/env python3
"""Research-only public video → JPEG capture on an internet-enabled CI runner.

Images stay in the runner's temporary directory and research check-run output,
not in Git or the published website. Chunked check output permits retrieval via
api.github.com without requiring the artifact storage host. No credentials are
sent to the reference host. This is not a deployment or an asset licensing grant.
"""
import base64
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tempfile
import urllib.request

SOURCES = {
    'poster': 'https://storage.getlayers.ai/templates/soda.webp',
    'preview': 'https://storage.getlayers.ai/templates/soda-preview.mp4',
    'master': 'https://storage.getlayers.ai/templates/soda.mp4',
}
REPO = os.environ['GITHUB_REPOSITORY']
SHA = os.environ['GITHUB_SHA']
TOKEN = os.environ['GH_TOKEN']
ROOT = Path(tempfile.mkdtemp(prefix='soda-reference-'))
MAX_BYTES = 100 * 1024 * 1024


def api(payload):
    req = urllib.request.Request(
        f'https://api.github.com/repos/{REPO}/check-runs',
        data=json.dumps(payload).encode(),
        headers={'Authorization': f'Bearer {TOKEN}', 'Accept': 'application/vnd.github+json',
                 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28'},
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def report(name, summary, text):
    result = api({'name': name, 'head_sha': SHA, 'status': 'completed',
                  'conclusion': 'neutral',
                  'output': {'title': name, 'summary': summary, 'text': text}})
    print(f'Reference report {result["id"]}: {name}', flush=True)
    return result['id']


def download(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Reference-inspection/1.0'})
    with urllib.request.urlopen(req, timeout=45) as response, path.open('wb') as dest:
        total = 0
        while chunk := response.read(1024 * 1024):
            total += len(chunk)
            if total > MAX_BYTES:
                raise ValueError('Reference exceeded the 100 MB research limit')
            dest.write(chunk)
    return total


def frame_report(path, meta):
    data = path.read_bytes()
    encoded = base64.b64encode(data).decode()
    chunks = [encoded[i:i + 58000] for i in range(0, len(encoded), 58000)]
    meta.update({'filename': path.name, 'sha256': hashlib.sha256(data).hexdigest(),
                 'bytes': len(data), 'encoding': 'base64', 'chunks': len(chunks)})
    ids = []
    for index, chunk in enumerate(chunks):
        ids.append(report(f'Soda reference / {path.stem} / {index + 1}',
                          json.dumps(meta | {'part': index + 1}), chunk))
    return meta | {'check_run_ids': ids}


manifest = {'source_page': 'https://www.getlayers.ai/layer/soda', 'head_sha': SHA,
            'purpose': 'Visual inspection, not website runtime content',
            'media': [], 'frames': [], 'errors': []}
for kind, url in SOURCES.items():
    try:
        source = ROOT / (kind + ('.webp' if kind == 'poster' else '.mp4'))
        size = download(url, source)
        if kind == 'poster':
            out = ROOT / 'poster.jpg'
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(source),
                            '-vf', 'scale=1400:-2', '-frames:v', '1', '-q:v', '3', str(out)], check=True)
            manifest['frames'].append(frame_report(out, {'source': url, 'kind': kind, 'time': None}))
            manifest['media'].append({'kind': kind, 'url': url, 'bytes': size})
        else:
            probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format',
                                                        '-show_streams', '-of', 'json', str(source)]))
            duration = float(probe['format']['duration'])
            video = next(s for s in probe['streams'] if s['codec_type'] == 'video')
            manifest['media'].append({'kind': kind, 'url': url, 'bytes': size,
                                      'duration': duration, 'width': video['width'], 'height': video['height']})
            times = [round(max(0, min(duration - .1, f * duration)), 3) for f in [0, .18, .36, .54, .72, .9]]
            for n, timestamp in enumerate(times):
                out = ROOT / f'{kind}-{n:02d}-{timestamp:.2f}s.jpg'
                subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(timestamp),
                                '-i', str(source), '-vf', 'scale=1400:-2', '-frames:v', '1',
                                '-q:v', '3', str(out)], check=True)
                manifest['frames'].append(frame_report(out, {'source': url, 'kind': kind, 'time': timestamp}))
    except Exception as error:
        manifest['errors'].append({'source': url, 'error': str(error)})
        print(f'::warning::{kind}: {error}', flush=True)
report('Soda reference / manifest', 'Machine-readable public reference capture manifest.',
       json.dumps(manifest, indent=2))
if not manifest['frames']:
    raise SystemExit('No inspectable reference frames could be captured')
print(f'Captured {len(manifest["frames"])} actual frames for visual inspection.', flush=True)
