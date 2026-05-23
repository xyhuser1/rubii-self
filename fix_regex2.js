var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the broken regex pattern: replace(/ + NEWLINE + /g,'<br>')
var regexIdx = t.indexOf("replace(/");
if (regexIdx >= 0) {
  var before = t.slice(regexIdx, regexIdx + 30);
  console.log('Found regex at', regexIdx, ':', JSON.stringify(before));
  
  // Check if there's a newline in the regex
  var nlIdx = t.indexOf('\n', regexIdx);
  var closeIdx = t.indexOf('/g', regexIdx);
  if (nlIdx >= 0 && nlIdx < closeIdx) {
    // Broken! Replace the entire broken regex
    var brokenEnd = closeIdx + 2; // after '/g'
    var afterRegex = t.slice(regexIdx + 30, regexIdx + 60);
    console.log('After regex:', JSON.stringify(afterRegex));
    
    // Replace with correct regex
    t = t.slice(0, regexIdx) + "replace(/\\n/g,'<br>')" + t.slice(closeIdx + 2);
    console.log('Fixed regex');
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
