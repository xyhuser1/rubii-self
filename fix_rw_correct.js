var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// The match text is: onclick=\"BW('+i+')\">↩</div></div>'}}
// Count: o n c l i c k = \ " B W ( ' + i + ' ) \ " > ↩ < / d i v > < / d i v > ' } }
//       1 2 3 4 5 6 7 8 9 10 ...etc up to 39
// We need to insert the RW button BEFORE the closing ' (position 37)
// But find it differently - just replace the last </div> before '}}

var idx = a.indexOf('onclick=\\"BW(\'+i+\')\\">\u21a9</div></div>\'}}');
if (idx >= 0) {
  var beforeClose = a.slice(0, idx + 33); // up to </div> (before the closing ')
  var afterClose = a.slice(idx + 33);      // from </div>'}} onwards
  var insert = '<div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div>';
  a = beforeClose + insert + afterClose;
  console.log('Fixed insert position');
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
// Show the AI message template
var aiIdx = a.indexOf("msg-row a-row");
console.log('AI template:', a.slice(aiIdx, aiIdx + 300));
