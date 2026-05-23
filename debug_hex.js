var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var i = t.indexOf('<div class="av">');
var snippet = t.slice(i, i + 200);
console.log('Raw chars:');
for (var j = 0; j < snippet.length; j++) {
  var code = snippet.charCodeAt(j);
  if (code > 127 || code < 32) {
    console.log('Pos', j, 'code:', code, 'char:', snippet[j]);
  }
}
console.log('Has \\":', snippet.indexOf('\\"') >= 0);
console.log('Has ":', snippet.indexOf('"') >= 0);
// Show hex around 'img src'
var imgIdx = snippet.indexOf('img src');
if (imgIdx >= 0) {
  console.log('img src area hex:');
  for (var j = Math.max(0, imgIdx - 5); j < Math.min(snippet.length, imgIdx + 30); j++) {
    process.stdout.write(snippet[j] + '(' + snippet.charCodeAt(j).toString(16) + ') ');
  }
  console.log();
}
