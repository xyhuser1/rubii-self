var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add rewrite button to AI messages - use the exact text from file
// The file has: onclick=\"BW('+i+')\" 
var searchStr = '<div class="rw" onclick=\\"BW('+i+')\\" >\u21a9</div></div>';
var replaceStr = '<div class="rw" onclick=\\"BW('+i+')\\" >\u21a9</div><div class="rw" onclick=\\"RW('+i+')\\" >\u270f</div></div>';

t = t.replace(searchStr, replaceStr);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Done');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
