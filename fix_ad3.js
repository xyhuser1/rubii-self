var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// AD function: resend last user message with detailed instruction
t = t.replace(
  "function AD(){if(!CID||!M.length)return;var last=M[M.length-1];if(last.role==='user'){var inp=$(IN);if(inp)inp.value='（请把刚才那一幕放慢展开，详细描写过程，不要跳过任何瞬间）';SD()}else{T('等对方先回应再推进')}}",
  "function AD(){if(!CID||M.length<2)return;var u=M[M.length-2];if(u.role==='user'){var inp=$(IN);if(inp)inp.value='（详细描写以上场景中每一秒的细节和感受）';SD()}else{T('无法推进')}}"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('AD fixed');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
