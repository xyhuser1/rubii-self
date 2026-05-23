var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var i = t.indexOf('<div class="av">');
if (i >= 0) {
  console.log('Found at', i);
  console.log(t.slice(i, i + 350));
} else {
  console.log('Not found');
}
