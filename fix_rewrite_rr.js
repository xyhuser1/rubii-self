var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find and replace the entire RR function
var rrStart = t.indexOf('function RR(');
var sdStart = t.indexOf('function SD(');
var oldRR = t.slice(rrStart, sdStart);

var newRR = 'function RR(){var c=$(\'MS\'),e=$(\'EM\');if(!c)return;\n  if(!M.length){if(e){c.innerHTML=\'\';c.appendChild(e);e.style.display=\'block\'}return}\n  if(e)e.style.display=\'none\';var n=\'AI\',a=\'\';for(var i=0;i<C.length;i++){if(C[i].id===CID){n=C[i].name;a=C[i].avatar||\'\';break}}\n  var bg=localStorage.getItem(\'cbg\')||\'\';var bs=bg?\' style="background-image:url(\'+bg+\');background-size:cover;background-position:center;min-height:100%;padding:10px 14px"\':\'\';\n  var h=\'\';for(var i=0;i<M.length;i++){var m=M[i];\n    if(m.role===\'user\'){h+=\'<div class="msg-row u-row"><div class="msg u"><div>\'+E(m.content)+\'</div></div><div class="uav">\uD83D\uDC64</div><div class="rw" onclick="BW(\'+i+\')">\u21A9</div></div>\'}\n    else{h+=\'<div class="msg-row a-row"><div class="aav">\'+avt(a,32)+\'</div><div class="msg a"><div class="sn">\'+E(n)+\'</div><div>\'+E(m.content).replace(/\n/g,\'<br>\')+\'</div></div><div class="rw" onclick="BW(\'+i+\')">\u21A9</div><div class="rw" onclick="RW(\'+i+\')">\u270F</div></div>\'}}\n  if(bg)c.innerHTML=\'<div\'+bs+\'>\'+h+\'</div>\';else c.innerHTML=h;c.scrollTop=c.scrollHeight}';

t = t.slice(0, rrStart) + newRR + t.slice(sdStart);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }

// Show the new RR
var ns = t.indexOf('function RR(');
var ne = t.indexOf('function SD(');
console.log('New RR:', t.slice(ns, ne).slice(0, 200));
