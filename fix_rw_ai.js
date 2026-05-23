var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the AI-specific message template (the one with 'else{h+=' before it)
var marker = 'else{h+=\'<div class="msg-row a-row">';
var idx = a.indexOf(marker);
if (idx >= 0) {
  // Find the ↩</div></div> that follows
  var endMarker = '\u21a9</div></div>\'}}';
  var endIdx = a.indexOf(endMarker, idx);
  if (endIdx >= 0) {
    var insertPos = endIdx + '\u21a9</div></div>'.length; // right after the second </div>
    var insert = '<div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div>';
    a = a.slice(0, insertPos) + insert + a.slice(insertPos);
    console.log('Inserted RW button specifically in AI message');
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
