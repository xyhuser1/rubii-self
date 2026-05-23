var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the broken regex - it's replace(/ + NEWLINE + /g,'<br>')
// The full pattern: replace/\n/g,'<br>')  (with actual newline between / and /g)
var search = "replace(/\n/g,'<br>')";  // \n here is a real newline in the file
var fixed = "replace(/\\n/g,'<br>')";   // \\n produces \n literal in the file

if (t.indexOf(search) >= 0) {
  t = t.replace(search, fixed);
  console.log('Fixed');
} else {
  console.log('Pattern not found, trying alternative...');
  // Try to find the broken regex differently
  var idx = t.indexOf("replace(/\n");
  if (idx >= 0) {
    console.log('Found broken replace(/\n at', idx);
    console.log('Context:', JSON.stringify(t.slice(idx, idx + 40)));
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
