var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the avatar display in character list
var idx = t.indexOf('<div class="av">');
if (idx >= 0) {
  console.log('Found at', idx);
  console.log('Context:', t.slice(idx, idx + 200));
}
