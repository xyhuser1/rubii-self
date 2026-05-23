const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// After the variable declarations, add a function to load config from server
var startMark = "var K=localStorage.getItem('dsKey')||'',C=[],CID=null,M=[],S=false;";
var newStart = "var K='',C=[],CID=null,M=[],S=false;\n// Load saved config from server\nAPI('GET','/api/config').then(function(cfg){if(cfg.apiKey)K=cfg.apiKey;}).catch(function(){});";

t = t.replace(startMark, newStart);

// Update SAVES to also save to server
var oldSave = "function SAVES(){\n  var k=$('SK').value.trim();if(k){K=k;localStorage.setItem('dsKey',k)}\n  var u=$('SU').value.trim();if(u){DEF_URL=u;localStorage.setItem('dsUrl',u)}\n  var m=$('SM').value.trim();if(m){DEF_MODEL=m;localStorage.setItem('dsModel',m)}\n  T('已保存');\n}";

var newSave = "function SAVES(){\n  var k=$('SK').value.trim();if(k){K=k;}\n  var u=$('SU').value.trim();if(u){DEF_URL=u;}\n  var m=$('SM').value.trim();if(m){DEF_MODEL=m;}\n  // Save to server so all devices share\n  if(K){API('PUT','/api/config',{apiKey:K,baseUrl:DEF_URL,model:DEF_MODEL}).then(function(){T('已保存到服务器，所有设备共享');}).catch(function(){T('保存失败');})}else{T('请输入 API Key');}\n}";

t = t.replace(oldSave, newSave);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
