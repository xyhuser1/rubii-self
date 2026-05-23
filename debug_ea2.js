var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Find the file upload code area
var idx = t.indexOf('EFILE');
if (idx >= 0) {
  console.log('EFILE found at', idx);
  console.log(t.slice(idx - 50, idx + 200));
} else {
  console.log('EFILE not found');
  // Try EA
  var eaIdx = t.indexOf('id="EA"');
  var eaEnd = t.indexOf('+', eaIdx);
  console.log('EA context:', t.slice(eaIdx, eaEnd + 100));
}
