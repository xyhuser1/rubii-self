var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS OK'); }
catch (e) { console.log('Error:', e.message);
  var pm = e.message.match(/position (\d+)/);
  if (pm) { var pos = parseInt(pm[1]); console.log('Around:', m[1].slice(Math.max(0,pos-50), pos+50)); }
}
