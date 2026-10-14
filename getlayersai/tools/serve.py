#!/usr/bin/env python3
"""Serve the repo with the new collection as the preview entry point."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
parser=argparse.ArgumentParser()
parser.add_argument('--port',type=int,default=8080)
parser.add_argument('--entry',default='/getlayersai/',help='Local entry path for the preview')
args=parser.parse_args()
root=Path(__file__).resolve().parents[2]
class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(root),**kw)
    def do_GET(self):
        if self.path=='/':
            self.send_response(302);self.send_header('Location',args.entry);self.end_headers()
        else:super().do_GET()
print(f'GetLayers collection available on 0.0.0.0:{args.port}',flush=True)
ThreadingHTTPServer(('0.0.0.0',args.port),PreviewHandler).serve_forever()
