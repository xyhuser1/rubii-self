var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Check for invalid escape sequences
for (var i = 0; i < js.length - 1; i++) {
  if (js[i] === '\\' && js[i+1] === "'") {
    // Check if this \' is inside a single-quoted string
    var before = js.slice(Math.max(0,i-100), i);
    var singleQuotes = 0;
    var doubleQuotes = 0;
    var inString = false;
    var stringChar = '';
    for (var j = Math.max(0,i-100); j < i; j++) {
      if (js[j] === "'" && !inString) { inString = true; stringChar = "'"; }
      else if (js[j] === '"' && !inString) { inString = true; stringChar = '"'; }
      else if (js[j] === stringChar && inString && js[j-1] !== '\\') { inString = false; }
    }
    if (inString && stringChar === "'") {
      console.log('Found \\\' inside single-quoted string at', i);
    }
  }
}
console.log('Done scanning');
