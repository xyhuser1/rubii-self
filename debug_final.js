var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
try { new Function(js); console.log('OK'); }
catch (e) {
  console.log('Error:', e.message);
  var pm = e.message.match(/position (\d+)/);
  if (pm) {
    var pos = parseInt(pm[1]);
    console.log('Around:', JSON.stringify(js.slice(Math.max(0,pos-50), pos+50)));
  }
}
