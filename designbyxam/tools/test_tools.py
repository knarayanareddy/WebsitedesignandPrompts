#!/usr/bin/env python3
"""Deterministic offline fixtures for the public documentation helpers."""
import json
import shutil
import struct
import subprocess
import sys
import tempfile
import unittest
import zlib
from pathlib import Path
from inventory import inventory
from verify_tree import manifest, compare
from compare_png import compare_png

ROOT=Path(__file__).resolve().parents[1]

def png(pixel=b'\x01\x02\x03'):
    def chunk(kind,data):
        return struct.pack('>I',len(data))+kind+data+struct.pack('>I',zlib.crc32(kind+data)&0xffffffff)
    return b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',1,1,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(b'\x00'+pixel))+chunk(b'IEND',b'')

class InventoryTests(unittest.TestCase):
    def test_srcset_and_css_and_quoted_library_are_included(self):
        html='''<img src="img/a.webp" srcset="img/a.webp 400w, hq/a.webp 1000w"><style>x{background:url('img/bg.webp')}</style><script>const LIB='lib/three.min.js'</script>'''
        result=inventory(html,'https://example.com/')
        self.assertEqual({r['path'] for r in result['files']},{'img/a.webp','hq/a.webp','img/bg.webp','lib/three.min.js'})
    def test_public_json_is_traversed(self):
        result=inventory('','https://example.com/',{'img':{'portrait':'site/u/a.webp'}})
        self.assertEqual(result['files'][0]['path'],'site/u/a.webp')
    def test_data_and_blob_urls_are_not_exported(self):
        result=inventory('<img src="data:image/png;base64,SECRET"><img src="blob:https://example.com/x">','https://example.com/')
        self.assertEqual(result['files'],[])
    def test_external_origin_is_metadata_only(self):
        result=inventory('<img src="https://cdn.example.net/a.webp">','https://example.com/')
        self.assertEqual(result['files'][0]['kind'],'external-metadata')
    def test_query_is_redacted_and_review_required(self):
        result=inventory('<img src="img/a.webp?token=DO_NOT_PUBLISH">','https://example.com/')
        self.assertNotIn('DO_NOT_PUBLISH',json.dumps(result));self.assertTrue(result['files'][0]['requires_review'])
    def test_derived_poster_is_not_claimed_acquired(self):
        result=inventory('<video src="ab/a.mp4"></video>','https://example.com/',derive=True)
        poster=next(r for r in result['files'] if r['path']=='ab/a-poster.jpg')
        self.assertEqual(poster['kind'],'derived-unverified');self.assertTrue(poster['requires_review'])
    def test_traversal_token_is_rejected_not_normalized(self):
        with self.assertRaises(ValueError):inventory('<img src="../private/a.webp">','https://example.com/')
    def test_invalid_origin_is_rejected(self):
        with self.assertRaises(ValueError):inventory('','not-a-url')

class FileTests(unittest.TestCase):
    def setUp(self):
        scratch=ROOT/'.test-work';scratch.mkdir(exist_ok=True)
        self.tmp=tempfile.TemporaryDirectory(dir=str(scratch));self.root=Path(self.tmp.name)
    def tearDown(self):self.tmp.cleanup()
    def trees(self):
        a=self.root/'a';b=self.root/'b';a.mkdir();b.mkdir();return a,b
    def test_equal_tree_proves_paths_and_hashes(self):
        a,b=self.trees();(a/'x.txt').write_text('same');(b/'x.txt').write_text('same')
        self.assertTrue(compare(a,b)['equal']);self.assertEqual(manifest(a)['files'][0]['path'],'x.txt')
    def test_missing_and_extra_do_not_cancel_by_equal_counts(self):
        a,b=self.trees();(a/'x.txt').write_text('same');(b/'y.txt').write_text('same')
        r=compare(a,b);self.assertFalse(r['equal']);self.assertEqual(r['missing_in_right'],['x.txt']);self.assertEqual(r['extra_in_right'],['y.txt'])
    def test_same_path_different_bytes_fails(self):
        a,b=self.trees();(a/'x.txt').write_text('one');(b/'x.txt').write_text('two')
        self.assertEqual(compare(a,b)['changed'],['x.txt'])
    def test_symlink_is_rejected(self):
        a,b=self.trees();(b/'x.txt').write_text('outside');(a/'link').symlink_to(b/'x.txt')
        with self.assertRaises(ValueError):manifest(a)
    def test_suspect_secret_path_is_rejected_before_hashing(self):
        a,b=self.trees();(a/'.env').write_text('not-a-real-secret')
        with self.assertRaises(ValueError):manifest(a)
    def test_explicit_exclusion_is_recorded(self):
        a,b=self.trees();(a/'temporary.txt').write_text('cache');(a/'real.txt').write_text('keep')
        r=manifest(a,['temporary.txt']);self.assertEqual(r['excluded'],['temporary.txt']);self.assertEqual([f['path'] for f in r['files']],['real.txt'])
    def test_explicit_directory_exclusion_can_skip_git_metadata(self):
        a,b=self.trees();(a/'.git').mkdir();(a/'.git/config').write_text('synthetic fixture');(a/'real.txt').write_text('keep')
        result=manifest(a,['.git/**']);self.assertEqual([f['path'] for f in result['files']],['real.txt']);self.assertIn('.git',result['excluded'])
    def test_equal_pngs_and_different_pngs(self):
        a=self.root/'a.png';b=self.root/'b.png';a.write_bytes(png());b.write_bytes(png())
        self.assertTrue(compare_png(a,b)['exact_png_bytes_equal']);b.write_bytes(png(b'\x03\x02\x01'));self.assertFalse(compare_png(a,b)['exact_png_bytes_equal'])
    def test_png_cli_equal_and_unequal_exit_codes(self):
        a=self.root/'a.png';b=self.root/'b.png';a.write_bytes(png());b.write_bytes(png())
        command=[sys.executable,str(ROOT/'tools/compare_png.py'),str(a),str(b)]
        equal=subprocess.run(command,capture_output=True,text=True);self.assertEqual(equal.returncode,0);self.assertTrue(json.loads(equal.stdout)['exact_png_bytes_equal'])
        b.write_bytes(png(b'\x02\x02\x02'));unequal=subprocess.run(command,capture_output=True,text=True);self.assertEqual(unequal.returncode,1)
    def test_tree_cli_unequal_exit_and_diff(self):
        a,b=self.trees();(a/'a.txt').write_text('x');(b/'b.txt').write_text('x')
        run=subprocess.run([sys.executable,str(ROOT/'tools/verify_tree.py'),'compare',str(a),str(b)],capture_output=True,text=True)
        self.assertEqual(run.returncode,1);self.assertEqual(json.loads(run.stdout)['missing_in_right'],['a.txt'])
    def test_inventory_cli_outputs_real_discovered_paths(self):
        html=self.root/'page.html';html.write_text('<img src="img/real.webp">')
        run=subprocess.run([sys.executable,str(ROOT/'tools/inventory.py'),str(html),'--origin','https://example.com/'],capture_output=True,text=True)
        self.assertEqual(run.returncode,0);self.assertEqual(json.loads(run.stdout)['files'][0]['path'],'img/real.webp')
    def test_non_png_does_not_pass_as_an_image(self):
        a=self.root/'a.png';b=self.root/'b.png';a.write_text('not png');b.write_text('not png')
        with self.assertRaises(ValueError):compare_png(a,b)

if __name__=='__main__':unittest.main(verbosity=2)
