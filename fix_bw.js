var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add rewind button next to clear button
t = t.replace(
  '<button class="btn" onclick="CC()">🗑 清空</button>',
  '<button class="btn" onclick="CC()">🗑 清空</button><button class="btn" onclick="BW()">↩ 回溯</button>'
);

// Add BW function
t = t.replace(
  'function BC(){',
  'function BW(){if(!CID||M.length<2)return;var n=prompt("回溯到第几条消息？(1-"+M.length+")");n=parseInt(n);if(!n||n<1||n>M.length)return;M=M.slice(0,n);RR();T("已回溯");}\nfunction BC(){'
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
