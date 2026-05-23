var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Simulate what RR() would render by checking the template string
// Locate the AI message template in the JS
var aiIdx = js.indexOf("msg-row a-row");
var part = js.slice(aiIdx, aiIdx + 300);
console.log('AI message template:');
console.log('---');
console.log(part);
console.log('---');
console.log('Has BW onclick:', part.indexOf('BW(') >= 0);
console.log('Has RW onclick:', part.indexOf('RW(') >= 0);
