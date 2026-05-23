var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Replace the AD function
t = t.replace(
  "function AD(){if(!CID)return;var inp=$(IN);if(inp)inp.value='不要推进剧情，把当前这一刻的每一秒都展开来写，写动作、写触感、写呼吸、写心跳、写内心活动，越细越好';SD()}",
  "function AD(){if(!CID||!M.length)return;var last=M[M.length-1];if(last.role==='user'){var inp=$(IN);if(inp)inp.value='（请把刚才那一幕放慢展开，详细描写过程，不要跳过任何瞬间）';SD()}else{T('等对方先回应再推进')}}"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('AD updated');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
