var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add rewrite button to the action bar
t = t.replace(
  '<button class="btn" onclick="CC()">🗑 清空</button><button class="btn" onclick="AD()">▶ 推进</button>',
  '<button class="btn" onclick="CC()">🗑 清空</button><button class="btn" onclick="AD()">▶ 推进</button><button class="btn" onclick="RW()">✏ 重写</button>'
);

// Add RW function (rewrite - removes last AI response and regenerates)
t = t.replace(
  'function BW(i)',
  'function RW(){if(!CID||M.length<2||M[M.length-1].role!==\'assistant\'){T(\'没有可重写的回复\');return}var lastUser=M[M.length-2];if(lastUser.role!==\'user\'){T(\'无法重写\');return}M.pop();var inp=$(IN);if(inp)inp.value=lastUser.content;SD()}\nfunction BW(i)'
);

// Also update AD to use the "zoom in" approach  
var oldAd = t.match(/function AD\(\).*?[^}]*}\);/);
if (oldAd) {
  var newAd = "function AD(){if(!CID||M.length<2)return;var last=M[M.length-1];if(last.role==='assistant'){M.pop();var inp=$(IN);if(inp)inp.value='（用更多细节重新描写刚才的场景）';SD()}else if(M.length>=2&&M[M.length-2].role==='user'){var inp2=$(IN);if(inp2)inp2.value='（详细描写以上情景，把每一刻都展开来写）';SD()}}";
  if (oldAd[0].indexOf('无法推进') >= 0) {
    t = t.replace(oldAd[0], newAd);
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
