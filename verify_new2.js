var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  try { new Function(m[1]); console.log('JS: OK'); }
  catch (e) { console.log('JS Error:', e.message); }
} else { console.log('No script'); }
console.log('Size:', t.length);
