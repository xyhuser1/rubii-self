var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');
for (var i = 0; i < 15; i++) {
  console.log('Line', i, ':', JSON.stringify(lines[i]).slice(0, 120));
}
