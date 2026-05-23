var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add auto-advance button to the chat action bar
t = t.replace(
  "<button class=\"btn\" onclick=\"CC()\">🗑 清空</button><button class=\"btn\" onclick=\"EX()\">📥 导出</button>",
  "<button class=\"btn\" onclick=\"CC()\">🗑 清空</button><button class=\"btn\" onclick=\"AD()\">▶ 推进</button><button class=\"btn\" onclick=\"EX()\">📥 导出</button>"
);

// Add the AD function before the BC function
t = t.replace(
  "function BC(){",
  "function AD(){if(!CID)return;var inp=$(IN);if(inp)inp.value='（剧情自然推进，根据当前场景和氛围发展下一步）';SD()}\nfunction BC(){"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
