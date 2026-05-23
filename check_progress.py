import re
with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8') as f:
    s = f.read()

# Check session endpoints
for m in re.finditer(r"app\.(get|post|put|delete)\('/api/([^']+)'", s):
    method, path = m.groups()
    if 'session' in path.lower() or 'fav' in path.lower():
        print(method.upper(), path)

print('---')
print('fav in create:', 'fav: false' in s)
print('fav in update:', 'fav !== undefined' in s)

# Check frontend
with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','r',encoding='utf-8') as f:
    h = f.read()

funcs = re.findall(r'function (\w+)\(', h)
print('Frontend functions:', sorted(funcs))
