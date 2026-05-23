var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// The file contains: src=\"'+ch.avatar+'\" (note the ')
// In JS string: \\\"' matches \"'  
var search1 = "<img src=\\\"'+ch.avatar+'\\\" style=\\\"width:48px";
var replace1 = "<img src=\\\"/api/proxy-image?url='+encodeURIComponent(ch.avatar)+'\\\" style=\\\"width:48px";

if (t.indexOf(search1) >= 0) {
  t = t.replace(search1, replace1);
  console.log('Avatar 1 fixed');
} else {
  console.log('Search1 not found');
  console.log('Looking for:', JSON.stringify(search1));
}

var search2 = "<img src=\\\"+a+'\\\" style=\\\"width:36px";
var replace2 = "<img src=\\\"/api/proxy-image?url='+encodeURIComponent(a)+'\\\" style=\\\"width:36px";

if (t.indexOf(search2) >= 0) {
  t = t.replace(search2, replace2);
  console.log('Avatar 2 fixed');
} else {
  console.log('Search2 not found');
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Done');
