var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var oldCode = "<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\"'+ch.avatar+'\" style=\"width:48px;height:48px;border-radius:50%;object-fit:cover\">':ch.avatar)+'</div>'";
var newCode = "<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\"/api/proxy-image?url='+encodeURIComponent(ch.avatar)+'\" style=\"width:48px;height:48px;border-radius:50%;object-fit:cover\">':(ch.avatar||'🤖'))+'</div>'";
if (t.indexOf(oldCode) >= 0) {
  t = t.replace(oldCode, newCode);
  fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
  console.log('Replaced OK');
} else {
  console.log('Old code not found');
  // Try to find partial match
  var i = t.indexOf('<div class="av">');
  console.log('At pos', i, ':', t.slice(i, i + 200));
}
