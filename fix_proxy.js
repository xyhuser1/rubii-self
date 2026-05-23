var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Update avt function to use image proxy
t = t.replace(
  "function avt(a){return a&&a.indexOf('http')===0?'<img src=\"'+a+'\" style=\"width:36px;height:36px;border-radius:50%;object-fit:cover\">':(a||'🤖')}",
  "function avt(a){if(a&&a.indexOf('http')===0)a='/api/proxy-image?url='+encodeURIComponent(a);return a&&a.indexOf('http')===0?'<img src=\"'+a+'\" style=\"width:36px;height:36px;border-radius:50%;object-fit:cover\">':(a||'🤖')}"
);
// Also fix the card avatar
t = t.replace(
  "<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\"'+ch.avatar+'\" style=\"width:48px;height:48px;border-radius:50%;object-fit:cover\">':ch.avatar)+'</div>",
  "<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\"/api/proxy-image?url='+encodeURIComponent(ch.avatar)+'\" style=\"width:48px;height:48px;border-radius:50%;object-fit:cover\">':ch.avatar)+'</div>"
);
// Also fix the chat header
t = t.replace(
  "<div class=\"aav\">'+avt(a)+'</div>",
  "<div class=\"aav\">'+avt(a)+'</div>"
);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
