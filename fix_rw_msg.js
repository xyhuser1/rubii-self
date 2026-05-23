var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// In the RR function, add a rewind button to each message row
// Current user message: h+='<div class="msg-row u-row"><div class="msg u"><div>'+E(m.content)+'</div></div><div class="uav">👤</div></div>'
// Add: +'<div class="rw" onclick="BW('+i+')">↩</div>'

// User messages
var oldUser = "h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div></div>'";
var newUser = "h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div><div class=\"rw\" onclick=\"BW("+i+")\">↩</div></div>'";

// AI messages
var oldAi = "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div></div>'";
var newAi = "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div><div class=\"rw\" onclick=\"BW("+i+")\">↩</div></div>'";

// Replace (check both exist first)
if (t.indexOf(oldUser) >= 0 && t.indexOf(oldAi) >= 0) {
  t = t.replace(oldUser, newUser);
  t = t.replace(oldAi, newAi);
  console.log('Message templates updated');
  
  // Replace the old BW function with one that takes an index
  var oldBw = "function BW(){if(!CID||M.length<2)return;var n=prompt(\"回溯到第几条消息？(1-\"+M.length+\")\");n=parseInt(n);if(!n||n<1||n>M.length)return;M=M.slice(0,n);RR();T(\"已回溯\");}";
  var newBw = "function BW(i){if(i===undefined){if(!CID||M.length<2)return;var n=prompt(\"回溯到第几条？(1-\"+M.length+\")\");n=parseInt(n);if(!n||n<1||n>M.length)return;i=n}M=M.slice(0,i+1);RR();T(\"已回溯\");}";
  t = t.replace(oldBw, newBw);
  console.log('BW function updated');
}

// CSS for rewind button
var css = '.rw{font-size:12px;cursor:pointer;opacity:0;transition:opacity .2s;padding:0 4px;align-self:center;color:#666}.msg-row:hover .rw{opacity:1}.rw:hover{color:#7c6fef}';
t = t.replace('.typing span:nth-child(2){animation-delay:.2s}', '.typing span:nth-child(2){animation-delay:.2s}' + css);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
