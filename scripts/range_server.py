#!/usr/bin/env python3
import http.server
import socketserver
import os
import re
import sys

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        if 'Range' not in self.headers:
            return super().send_head()
        
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            return super().send_head()
            
        range_header = self.headers.get('Range')
        m = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not m:
            return super().send_head()
            
        file_size = os.path.getsize(path)
        start = int(m.group(1))
        end = int(m.group(2)) if m.group(2) else file_size - 1
        if start >= file_size:
            self.send_error(416, 'Requested Range Not Satisfiable')
            return None
            
        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header('Content-type', ctype)
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        
        f = open(path, 'rb')
        f.seek(start)
        return f

port = int(sys.argv[1]) if len(sys.argv) > 1 else 3008
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', port), RangeHTTPRequestHandler) as httpd:
    print(f'RangeHTTPRequestHandler serving on port {port}')
    httpd.serve_forever()
