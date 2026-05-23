const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix avatar display in the HOME character list
t = t.replace(
  "<div class=\"av\">'+ch.avatar+'</div>",
  "<div class=\"av\">'+(ch.avatar&&ch.avatar.indexOf('http')===0?'<img src=\\\"'+ch.avatar+'\\\" style=\\\"width:48px;height:48px;border-radius:50%;object-fit:cover\\\">':ch.avatar)+'</div>"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
