var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Find the OC function to check the send button ID
var idx = js.indexOf('function OC');
var end = js.indexOf('function LC', idx);
console.log('OC function:', js.slice(idx, end));
