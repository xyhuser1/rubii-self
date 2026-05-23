var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
// Show the avt function
var idx = js.indexOf('function avt');
console.log('avt:', js.slice(idx, idx + 150));
