var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Find all locations where < appears outside of strings
var lines = js.split('\n');
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Check if < appears in a suspicious place
  var inString = false;
  var strChar = '';
  for (var j = 0; j < line.length; j++) {
    var ch = line[j];
    if ((ch === "'" || ch === '"') && (j === 0 || line[j-1] !== '\\')) {
      if (!inString) { inString = true; strChar = ch; }
      else if (ch === strChar) { inString = false; }
    }
    if (ch === '<' && !inString) {
      console.log('Suspicious < at line', i+1, 'pos', j, ':', line.slice(Math.max(0,j-20), j+20));
    }
  }
}
console.log('Check complete');
