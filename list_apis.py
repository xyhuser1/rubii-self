import re
with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8') as f:
    s = f.read()

for m in re.finditer(r"app\.(get|post|put|delete)\('/api/([^']+)'", s):
    method = m.group(1)
    path = m.group(2)
    # skip auth endpoints
    if path in ('login','register'):
        continue
    print(method.upper(), '/api/' + path)
