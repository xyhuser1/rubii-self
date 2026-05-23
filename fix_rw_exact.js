var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Build the search string
// We need to match: onclick=\"BW('+i+')\">↩</div></div>
// In the file this is: onclick=\\"BW('+i+')\\">↩</div></div>
// In JS string: onclick=\\"BW('+i+')\\">

var s = 'onclick=\\\\u005c"BW(\'';
s = s + '+i+';
s = s + '\')\\\\u005c">\u21a9</div></div>';

var r = 'onclick=\\\\u005c"BW(\'';
r = r + '+i+';
r = r + '\')\\\\u005c">\u21a9</div><div class="rw" onclick=\\\\u005c"RW(\'';
r = r + '+i+';
r = r + '\')\\\\u005c">\u270f</div></div>';

if (a.indexOf(s) >= 0) {
  a = a.replace(s, r);
  console.log('Replaced');
} else {
  console.log('Not found, checking actual text...');
  var idx = a.indexOf('BW(\'');
  if (idx >= 0) console.log('Found BW at', idx, ':', a.slice(idx-20, idx+40));
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
