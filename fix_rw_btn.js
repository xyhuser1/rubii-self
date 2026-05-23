var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Directly find and replace the AI message template
// The file has: onclick=\"BW('+i+')\">↩</div></div>
// Find this exact pattern and add rewrite button after it
var search = 'onclick=\\\"BW(';
var mid = '+i+' + ')\\\" >\u21a9</div></div>';
var searchFull = '<div class="rw" ' + search + mid;
var replaceFull = '<div class="rw" ' + search + mid + '<div class="rw" onclick=\\\"RW(' + '+i+' + ')\\\" >\u270f</div></div>';
a = a.replace(searchFull, replaceFull);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');
console.log('Done');
var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
