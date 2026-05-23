const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Replace the variables to use localStorage persistence
t = t.replace(
  "var K='',C=[],CID=null,M=[],S=false;",
  "var K=localStorage.getItem('dsKey')||'',C=[],CID=null,M=[],S=false;"
);
t = t.replace(
  "var DEF_URL='http://localhost:11434';var DEF_MODEL='llama-rp';",
  "var DEF_URL=localStorage.getItem('dsUrl')||'https://api.deepseek.com';var DEF_MODEL=localStorage.getItem('dsModel')||'deepseek-chat';"
);
t = t.replace(
  "function SAVES(){\n  var k=$('SK').value.trim();if(k)K=k;\n  var u=$('SU').value.trim();if(u)DEF_URL=u;\n  var m=$('SM').value.trim();if(m)DEF_MODEL=m;\n  T('已保存');\n}",
  "function SAVES(){\n  var k=$('SK').value.trim();if(k){K=k;localStorage.setItem('dsKey',k)}\n  var u=$('SU').value.trim();if(u){DEF_URL=u;localStorage.setItem('dsUrl',u)}\n  var m=$('SM').value.trim();if(m){DEF_MODEL=m;localStorage.setItem('dsModel',m)}\n  T('已保存');\n}"
);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
