var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Make messages clickable for rewind - add onclick to each message
// in the RR function where messages are rendered
// The current rendering: h+='<div class="msg-row u-row"><div class="msg u"><div>'+E(m.content)+'</div></div><div class="uav">👤</div></div>'
// Change to: add onclick="RW(i)" 

t = t.replace(
  "h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div></div>'",
  "h+='<div class=\"msg-row u-row\" onclick=\"RW('+i+')\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div></div>'"
);

t = t.replace(
  "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div></div>'",
  "h+='<div class=\"msg-row a-row\" onclick=\"RW('+i+')\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div></div>'"
);

// Add RW function after the RENDER function
t = t.replace(
  "function SD(){",
  "function RW(i){if(!confirm('回溯到此位置？此后的对话将删除'))return;M=M.slice(0,i+1);RR();API('POST','/api/characters/'+CID+'/chat/clear').then(function(){for(var j=0;j<M.length;j++){API('POST','/api/characters/'+CID+'/chat',{message:M[j].content,config:{apiKey:K||'local',baseUrl:ga(),model:gm(),temperature:1.0,maxHistory:1}}).catch(function(){})}}).catch(function(){})}\nfunction SD(){"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
