var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

var oldCode = "$('EA').value=e.target.result;T('图片已加载')";
var newCode = "$(\\'EA\\').value=e.target.result;T(\\'图片已加载\\')";

if (t.indexOf(oldCode) >= 0) {
  t = t.replace(oldCode, newCode);
  fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
  console.log('Fixed');
} else {
  console.log('Not found');
  // Check what's actually there
  var idx = t.indexOf('EA').value');
  console.log('Found at', idx);
  if (idx >= 0) console.log(t.slice(idx-30, idx+80));
}
