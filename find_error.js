var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Check for any non-ASCII, non-printable characters
for (var i = 0; i < Math.min(js.length, 20000); i++) {
  var c = js.charCodeAt(i);
  if (c === 0) {
    console.log('NULL char at position', i);
  }
}

// Try to find error by linear scanning
try {
  // Evaluate piece by piece to find the error
  var lines = js.split('\n');
  var built = '';
  for (var i = 0; i < lines.length; i++) {
    try {
      new Function(built + lines[i]);
    } catch (e) {
      console.log('Error near line', i, ':', lines[i].slice(0, 80));
      break;
    }
    built += lines[i] + '\n';
  }
} catch (e) {
  console.log('Error:', e.message);
}
