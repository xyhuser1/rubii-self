const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Increase default maxHistory from 20 to 100
t = t.replace('temperature:1.0,maxHistory:20', 'temperature:1.0,maxHistory:100');

// Update settings memory label
t = t.replace('记忆条数', '记忆增强(条数)');
t = t.replace('value="20" min="5" max="100"', 'value="100" min="10" max="200"');

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');

// Also update server.js default
var s = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');
s = s.replace('const maxHistory = config?.maxHistory ?? 50;', 'const maxHistory = config?.maxHistory ?? 100;');
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', s, 'utf8');
console.log('Server OK');
