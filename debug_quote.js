var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
try { new Function(js); }
catch (e) {
  console.log('Error:', e.message);
  // Try to find the issue by looking for problematic quoting
  var singleQuotes = 0;
  var inString = false;
  for (var i = 0; i < js.length; i++) {
    if (js[i] === "'" && (i === 0 || js[i-1] !== '\\')) {
      if (!inString) { inString = true; }
      else { 
        var prevChar = i > 0 ? js[i-1] : '';
        // Check if this ' ends a string but the next meaningful char isn't a valid operator
        var next = js.slice(i+1, i+5).trim();
        if (next && next[0] !== ')' && next[0] !== ',' && next[0] !== ';' && next[0] !== ']' && next[0] !== ':' && next[0] !== '}' && next[0] !== '|' && next[0] !== '&' && next[0] !== '+' && next[0] !== '-' && next[0] !== '?' && next[0] !== '.' && next[0] !== '/' && next[0] !== '>' && next[0] !== '<' && next[0] !== '!' && next[0] !== ' ' && next[0] !== '\n' && next[0] !== '\r') {
          console.log('Suspicious quote at', i, ':', js.slice(Math.max(0,i-30), i+30));
        }
        inString = false;
      }
    }
  }
}
