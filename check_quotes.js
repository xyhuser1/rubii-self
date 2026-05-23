var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Check for the problematic pattern
var count = 0;
var idx = 0;
while ((idx = js.indexOf("$('", idx)) >= 0) {
  var end = js.indexOf("')", idx);
  if (end >= 0) {
    var content = js.slice(idx, end + 2);
    console.log('Found:', content, 'at', idx);
    count++;
    idx = end + 2;
  } else {
    idx++;
  }
}
console.log('Total:', count);

// Also check the js for any obvious issue
// Show lines with single quotes
var lines = js.split('\n');
for (var i = 0; i < Math.min(lines.length, 5); i++) {
  console.log('Line', i, ':', lines[i].slice(0, 100));
}
