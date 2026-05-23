var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var oldStr = "if(bg){c.innerHTML='<div'+bgStyle+'>'+h+'</div>'}else{c.innerHTML=h}";
var newStr = "if(bg){c.innerHTML='<div style=\"min-height:100%;padding:10px 14px\"'+bgStyle+'>'+h+'</div>'}else{c.innerHTML=h}";
t = t.replace(oldStr, newStr);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('bg fixed');
