# Finds text in the wrong script: Arabic inside /en pages (and, with --ar,
# stray English sentences inside Arabic pages are not flagged — Latin product
# names are expected there). Usage: python scripts/scan-lang.py
import re, glob, html, os, collections
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'site', 'en'))
hits = collections.Counter()
for f in glob.glob('**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read()
    s = re.sub(r'(?s)<(script|style)[^>]*>.*?</\1>', ' ', s)
    s = re.sub(r'(?s)<[^>]+>', ' ', s)
    s = html.unescape(s).replace('النسخة العربية', '').replace('العربية', '')
    for m in re.findall(r'[؀-ۿ][؀-ۿ\s،]{0,40}', s):
        hits[(f.replace(os.sep, '/'), m.strip()[:40])] += 1
for (f, m), c in sorted(hits.items())[:60]:
    print(f, '|', m, '|', c)
print('distinct hits:', len(hits))
