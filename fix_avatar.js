const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add avatar URL field to character editor (edit form)
t = t.replace(
  "'+ap+'</div>'",
  "'+ap+'</div>'+'<div class=\"fg\"><label>头像图片URL（可选）</label><input id=\"EA\" value=\"'+(ch?esc(ch.avatar||''):'')+'\" placeholder=\"https://... 或留空用emoji\"></div>'"
);

// When saving character, include avatar URL
t = t.replace(
  "var data={name:$('EN').value.trim(),avatar:sel2?sel2.textContent:'🤖'",
  "var data={name:$('EN').value.trim(),avatar:$('EA').value.trim()||(sel2?sel2.textContent:'🤖')"
);

// Display avatar as image if it's a URL
t = t.replace(
  "'<div class=\"av\">'+ch.avatar+'</div>'",
  "'<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\"'+ch.avatar+'\" style=\"width:48px;height:48px;border-radius:50%;object-fit:cover\">':ch.avatar)+'</div>'"
);

// Also in chat header
t = t.replace(
  "'+ch.avatar+'</div>'",
  "'+ch.avatar+'</div>'"  // already fine
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Avatar support added');
