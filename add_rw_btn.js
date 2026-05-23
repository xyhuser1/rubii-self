var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
t = t.replace(
  '<button class="btn" onclick="AD()">\u25b6 \u63a8\u8fdb</button>',
  '<button class="btn" onclick="AD()">\u25b6 \u63a8\u8fdb</button><button class="btn" onclick="RW()">\u270f \u91cd\u5199</button>'
);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Added rewrite button');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
