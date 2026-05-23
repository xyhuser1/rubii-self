var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// The current BW function starts with "function BW(i){if(i===undefined)"
// Find its full body and replace with version that clears server
t = t.replace(
  'T(\u201c\u5df2\u56de\u6eaf\u201d)',
  'API(\'POST\',\'/api/characters/\'+CID+\'/chat/clear\').catch(function(){});T(\u201c\u5df2\u56de\u6eaf\u201d)'
);

// Add rewrite button to AI messages - after ↩
t = t.replace(
  '<div class="rw" onclick="BW(\'+i+\')">\u21a9</div></div>',
  '<div class="rw" onclick="BW(\'+i+\')">\u21a9</div><div class="rw" onclick="RW(\'+i+\')">\u270f</div></div>'
);

// Update RW function to handle index parameter
var rwFunc = t.match(/function RW\(\)[^}]*\}/);
if (rwFunc) {
  console.log('Found RW function:', rwFunc[0].slice(0,50));
  t = t.replace(rwFunc[0], 'function RW(i){if(i!==undefined){M=M.slice(0,i)}if(!CID||M.length<2||M[M.length-1].role!==\'assistant\'){T(\'\u6ca1\u6709\u53ef\u91cd\u5199\u7684\u56de\u590d\');return}M.pop();var last=M[M.length-1];if(last&&last.role===\'user\'){var inp=$(IN);if(inp)inp.value=last.content;SD()}else{T(\'\u65e0\u6cd5\u91cd\u5199\')}}');
}

// Remove toolbar rewrite button (now per-message)
t = t.replace('<button class="btn" onclick="RW()">\u270f \u91cd\u5199</button>', '');

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Done');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
