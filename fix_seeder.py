s = open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8').read()
s = s.replace('fs.readdirSync(CHARS_DIR)', 'fs.readdirSync(userCharsDir("admin"))')
open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','w',encoding='utf-8').write(s)
print('Fixed')
