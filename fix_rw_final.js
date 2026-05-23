var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Use simple string replacement without template interpolation
// Find and replace the message rows with ones that include rewind buttons

// User message: add rewind button
var oldUser = "h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div></div>'";
var newUser = "h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">👤</div><div class=\"rw\" onclick=\\\"BW('+i+')\\\">↩</div></div>'";

// AI message: add rewind button  
var oldAi = "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div></div>'";
var newAi = "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div><div class=\"rw\" onclick=\\\"BW('+i+')\\\">↩</div></div>'";

console.log('Old user exists:', t.indexOf(oldUser) >= 0);
console.log('Old AI exists:', t.indexOf(oldAi) >= 0);

if (t.indexOf(oldUser) >= 0 && t.indexOf(oldAi) >= 0) {
  t = t.replace(oldUser, newUser);
  t = t.replace(oldAi, newAi);
  console.log('Message templates updated');
}

// Also add CSS and replace BW function (if already exists)
var css = '.rw{font-size:12px;cursor:pointer;opacity:0;transition:opacity .2s;padding:0 6px;align-self:center;color:#666;user-select:none}.msg-row:hover .rw{opacity:1}.rw:hover{color:#7c6fef}';
if (t.indexOf(css) < 0) {
  t = t.replace('.typing span:nth-child(2){animation-delay:.2s}', '.typing span:nth-child(2){animation-delay:.2s}' + css);
}

// Check if BW function already exists, if not add it
if (t.indexOf('function BW') < 0) {
  t = t.replace('function BC(){', 'function BW(i){M=M.slice(0,i+1);RR();T("\\u5df2\\u56de\\u6eaf");}\nfunction BC(){');
  console.log('BW function added');
} else {
  // Replace existing BW
  var oldBw = t.match(/function BW.*?return;[^}]*}/);
  if (oldBw) {
    console.log('Found existing BW');
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
