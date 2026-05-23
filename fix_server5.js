const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');

// Change from first person to third person narrative
t = t.replace('以${charName}的第一人称视角回应，完全沉浸角色', '用第三人称叙述，以小说作者视角描写角色的动作、心理和对话');

// Increase default maxHistory
t = t.replace('const maxHistory = config?.maxHistory ?? 30;', 'const maxHistory = config?.maxHistory ?? 50;');

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('OK');
