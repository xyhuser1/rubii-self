var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the exact text in the file
var idx = a.indexOf('onclick=\\"BW(\'+i+\')\\">\u21a9</div></div>\'}}');
if (idx >= 0) {
  var exactText = a.slice(idx, idx + 60);
  console.log('Found exact text:', JSON.stringify(exactText));
  
  // Insert RW button right after the ↩ button closes
  var insert = '<div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div>';
  a = a.slice(0, idx + 41) + insert + a.slice(idx + 41);
  console.log('Inserted at position', idx + 41);
  
  fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');
} else {
  console.log('Exact text not found');
  // Search for partial
  var pidx = a.indexOf('onclick=\\"BW(');
  if (pidx >= 0) console.log('Partial found:', JSON.stringify(a.slice(pidx, pidx + 80)));
}

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
