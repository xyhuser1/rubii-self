var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Find what's wrong by looking for any \' that's NOT in a HTML attribute context
// i.e., \' that appears where a ' would end a JS string
console.log('Total length:', js.length);
console.log('Has \\\\\' ?', js.indexOf("\\'") >= 0);
if (js.indexOf("\\'") >= 0) {
  var idx = js.indexOf("\\'");
  console.log('Context:', JSON.stringify(js.slice(Math.max(0,idx-30), idx+30)));
}
console.log('Has unescaped quotes issue: check around EFILE');

// Output around where EFILE was (line 61 approximately)
var eaI = t.indexOf('EA');
console.log('EA found at', eaI);
console.log('Context:', t.slice(Math.max(0,eaI-50), eaI+50));
