const fs = require('fs');
const h = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/test.html', 'utf8');
const m = h.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  const js = m[1];
  console.log('JS length:', js.length, 'chars');
  try { new Function(js); console.log('JS syntax: OK'); }
  catch (e) { console.log('JS syntax error:', e.message); }
} else {
  console.log('No script tag found');
}
// also check for content
console.log('HTML size:', h.length, 'bytes');
console.log('Has title:', h.includes('<title>'));
console.log('Has #app:', h.includes('id="app"'));
console.log('First 200 chars:', h.slice(0, 200));
