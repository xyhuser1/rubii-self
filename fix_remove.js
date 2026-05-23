var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the problematic EFILE section and remove it entirely (it broke the JS)
var startIdx = t.indexOf('EFILE');
if (startIdx >= 0) {
  // Find the end: this is inside '+...+' concatenation
  var endMarker = "'+\n    '<div class=\"fg\"><label>角色名";
  var endIdx = t.indexOf(endMarker, startIdx);
  if (endIdx >= 0) {
    // Go back to the start of this line
    var lineStart = t.lastIndexOf("'+", startIdx);
    if (lineStart < 0) lineStart = t.lastIndexOf("\n", startIdx);
    // Remove the broken file upload section
    var before = t.slice(0, lineStart);
    var after = t.slice(endIdx);
    t = before + after;
    fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
    console.log('Removed broken section');
  } else {
    console.log('End marker not found');
  }
}

// Verify
var mt = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(mt[1]); console.log('JS OK'); }
catch (e) { console.log('Error:', e.message); }
