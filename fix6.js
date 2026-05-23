const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');
t = t.replace(
  '用第三人称叙述，以小说作者视角描写角色的动作、心理和对话',
  '绝对禁止使用第一人称"我"。全程用第三人称（她/角色名）来叙述动作、心理和对话'
);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('OK');
