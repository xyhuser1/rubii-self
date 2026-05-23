var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var i = t.indexOf('<div class="av">');
console.log('At', i);
console.log(t.slice(i, i + 300));
