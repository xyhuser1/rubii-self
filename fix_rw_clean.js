var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Replace: ↩</div></div>  with: ↩</div>[RW BUTTON]</div>
// Find the exact text with ↩ followed by two closing divs
var search = '\u21a9</div></div>\'}}';
var replace = '\u21a9</div><div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div></div>\'}}';

// Only replace in AI messages (the one followed by else{h+=)
if (a.indexOf(search) >= 0) {
  a = a.replace(search, replace);
  console.log('RW button added');
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
