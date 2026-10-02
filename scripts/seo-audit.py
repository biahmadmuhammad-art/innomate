# SEO audit over every built page (both languages): one h1, no skipped
# heading levels, title <= 70, description 60-175, unique titles, correct
# lang/dir, canonical + hreflang pair. Usage: python scripts/seo-audit.py
import re, glob, os, collections
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'site'))
titles = collections.Counter()
issues = []
for f in sorted(glob.glob('**/*.html', recursive=True)):
    f = f.replace(os.sep, '/')
    s = open(f, encoding='utf-8').read()
    h1 = len(re.findall(r'<h1[\s>]', s))
    t = re.search(r'<title>(.*?)</title>', s).group(1)
    titles[t] += 1
    d = re.search(r'name="description" content="([^"]*)"', s).group(1)
    heads = [int(x) for x in re.findall(r'<h([1-6])[\s>]', s)]
    skip = [(a, b) for a, b in zip(heads, heads[1:]) if b > a + 1]
    lang, dr = re.search(r'<html lang="(\w+)" dir="(\w+)"', s).groups()
    canon = re.search(r'rel="canonical" href="([^"]+)"', s).group(1)
    alts = dict(re.findall(r'hreflang="([\w-]+)" href="([^"]+)"', s))
    en = f.startswith('en/')
    if h1 != 1 or len(t) > 70 or not (60 <= len(d) <= 175) or skip:
        if not f.endswith('404.html'):
            issues.append(f"{f}: h1={h1} title={len(t)} desc={len(d)} skips={skip[:2]}")
    if (lang, dr) != (('en', 'ltr') if en else ('ar', 'rtl')):
        issues.append(f"{f}: lang/dir {lang}/{dr}")
    if ('/en/' in canon) != en or 'ar-EG' not in alts or 'en' not in alts:
        issues.append(f"{f}: canonical/hreflang {canon}")
print('\n'.join(issues) or 'no SEO issues')
print('duplicate titles:', [t for t, c in titles.items() if c > 1])
