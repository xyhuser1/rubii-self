var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  try {
    new Function(m[1]);
    console.log('JS OK');
  } catch (e) {
    console.log('JS Error:', e.message);
    // Find the position
    var posMatch = e.message.match(/position (\d+)/);
    if (posMatch) {
      var pos = parseInt(posMatch[1]);
      console.log('Error around:', m[1].slice(Math.max(0,pos-80), pos+80));
    }
  }
} else {
  console.log('No script found');
}
