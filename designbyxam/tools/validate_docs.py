#!/usr/bin/env python3
"""Check this public documentation kit's links, schemas and inclusion boundary."""
import ast
import json
import re
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT.parent
REQUIRED=['README.md','PROCESS.md','ADAPTED_PROMPT.md','TECHNICAL_GUIDE.md','VALIDATION.md','BUILD_LOG.md','ASSETS_AND_RIGHTS.md','references/SOURCES.md','evidence/case-results.json','templates/reconstruction-contract.example.json','templates/asset-manifest.example.json','templates/acceptance-matrix.md','tools/inventory.py','tools/verify_tree.py','tools/compare_png.py','tools/test_tools.py']
IGNORE={'.test-work','__pycache__','node_modules','dist','test-results','playwright-report','site'}
ALLOWED={'.md','.json','.py','.mjs'}
SECRETS=[re.compile(r'gh[pousr]_[A-Za-z0-9]{20,}'),re.compile(r'sk-[A-Za-z0-9]{24,}'),re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')]


def headings(text):
    out=[];fenced=False
    for line in text.splitlines():
        if line.startswith('```'):fenced=not fenced;continue
        if not fenced:
            match=re.match(r'^#{1,6}\s+(.+?)\s*$',line)
            if match:out.append(match.group(1))
    return out


def slug(value):
    return re.sub(r'[^\w\- ]','',value.lower().replace('`','')).replace(' ','-')


def main():
    errors=[];files=[];metrics=[]
    for required in REQUIRED:
        if not (ROOT/required).is_file():errors.append('Missing required file: '+required)
    for path in sorted(ROOT.rglob('*')):
        relative=path.relative_to(ROOT)
        if set(relative.parts)&IGNORE or not path.is_file():continue
        files.append(relative.as_posix())
        if path.name not in {'.gitignore','.gitattributes'} and path.suffix not in ALLOWED:errors.append('Unapproved public file type: '+str(relative))
        if path.is_symlink():errors.append('Unexpected symlink: '+str(relative));continue
        text=path.read_text(encoding='utf8')
        if any(pattern.search(text) for pattern in SECRETS):errors.append('Potential credential material: '+str(relative))
        if str(Path.home())+'/' in text:errors.append('Nonportable personal absolute path: '+str(relative))
        if path.suffix=='.py':
            try:ast.parse(text)
            except SyntaxError as error:errors.append('Python syntax: '+str(error))
        elif path.suffix=='.json':
            try:json.loads(text)
            except ValueError as error:errors.append('JSON syntax: '+str(error))
        elif path.suffix=='.md':
            fences=sum(1 for line in text.splitlines() if line.startswith('```'))
            if fences%2:errors.append('Unpaired code fence: '+str(relative))
            clean=re.sub(r'(?ms)^```[^\n]*\n.*?^```\s*$', '',text)
            hs=headings(text)
            if not hs or not text.startswith('# '):errors.append('Missing document title: '+str(relative))
            duplicate=[h for h,n in Counter(hs).items() if n>1]
            if duplicate:errors.append('Duplicate headings: '+str(relative)+' '+str(duplicate))
            for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',clean):
                if re.match(r'^(?:https?://|mailto:)',target):continue
                name,_,anchor=target.partition('#');linked=(path.parent/name).resolve() if name else path
                if not linked.exists():errors.append('Broken relative link: '+str(relative)+' -> '+target);continue
                if anchor and linked.suffix=='.md':
                    if anchor not in {slug(h) for h in headings(linked.read_text(encoding='utf8'))}:errors.append('Broken heading anchor: '+str(relative)+' -> '+target)
            metrics.append({'file':relative.as_posix(),'words':len(re.findall(r'\b[\w’\'-]+\b',text)),'headings':len(hs),'bytes':len(text.encode())})
    case_path=ROOT/'evidence/case-results.json'
    if case_path.exists():
        case=json.loads(case_path.read_text());assert case['acquired_files']==sum(case['file_extensions'].values())
        assert case['browser_test_results']['passed']==18 and case['browser_test_results']['failed']==0
        assert len(case['matched_screenshot_states'])==3 and all(s['png_bytes_identical'] for s in case['matched_screenshot_states'])
    result={'valid':not errors,'public_files':files,'file_count':len(files),'markdown':metrics,'markdown_words':sum(m['words'] for m in metrics),'errors':errors}
    print(json.dumps(result,indent=2))
    if errors:raise SystemExit(1)

if __name__=='__main__':main()
