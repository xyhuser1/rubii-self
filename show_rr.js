var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Show the FULL RR function
var rrIdx = t.indexOf('function RR(');
var sdIdx = t.indexOf('function SD(');
var rrCode = t.slice(rrIdx, sdIdx);
console.log(rrCode);
