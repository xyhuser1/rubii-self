var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Check the RW button area
var idx = a.indexOf('RW(');
if (idx >= 0) {
  console.log('RW found, context:');
  console.log(a.slice(Math.max(0,idx-50), idx+80));
} else {
  console.log('RW not found');
  // Check if the file has issues
  console.log('Checking around BW onclick:');
  var bwIdx = a.indexOf('onclick="BW');
  if (bwIdx < 0) bwIdx = a.indexOf('onclick=\\"BW');
  if (bwIdx >= 0) console.log(a.slice(bwIdx-10, bwIdx+100));
}
