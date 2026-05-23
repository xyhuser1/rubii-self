s = open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8').read()
s = s.replace('(function seedSampleChars() {', 'ensureUserDir("admin");\n\n(function seedSampleChars() {')
open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','w',encoding='utf-8').write(s)
print('Fixed')
