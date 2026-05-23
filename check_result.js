var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var i = t.indexOf('<div class="av">');
console.log(t.slice(i, i + 320));
// Also check if proxy is in the code
console.log('Has proxy:', t.indexOf('/api/proxy-image') >= 0);
