var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// 1. BW: add server clear
t = t.replace(
  'function BW(i){i=parseInt(i);M=M.slice(0,i+1);RR();T(\u201c\u5df2\u56de\u6eaf\u201d);}',
  'function BW(i){i=parseInt(i);M=M.slice(0,i+1);RR();API(\'POST\',\'/api/characters/\'+CID+\'/chat/clear\').catch(function(){});T(\u201c\u5df2\u56de\u6eaf\u201d);}'
);

// 2. Add rewrite button to AI messages (after the ↩ button in AI message row)
t = t.replace(
  '<div class="rw" onclick="BW(\'+i+\')">\u21a9</div></div>\'',
  '<div class="rw" onclick="BW(\'+i+\')">\u21a9</div><div class="rw" onclick="RW(\'+i+\')">\u270f</div></div>\''
);

// 3. Update RW function  
// Find current RW function
var rwStart = t.indexOf('function RW(');
if (rwStart >= 0) {
  var rwEnd = t.indexOf('\nfunction', rwStart + 10);
  if (rwEnd < 0) rwEnd = t.indexOf('}\n', rwStart);
  var oldRw = t.slice(rwStart, rwEnd);
  var newRw = 'function RW(i){if(i!==undefined){M=M.slice(0,i+1);RR()}if(!CID||M.length<2||M[M.length-1].role!==\'assistant\'){T(\'\u6ca1\u6709\u53ef\u91cd\u5199\u7684\u56de\u590d\');return}M.pop();var last=M[M.length-1];if(last&&last.role===\'user\'){var inp=$(IN);if(inp)inp.value=last.content;SD()}else{T(\'\u65e0\u6cd5\u91cd\u5199\')}}';
  t = t.slice(0, rwStart) + newRw + t.slice(rwEnd);
  console.log('RW updated');
}

// Remove toolbar RW button since it's now per-message
t = t.replace('<button class="btn" onclick="RW()">\u270f \u91cd\u5199</button>', '');

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
