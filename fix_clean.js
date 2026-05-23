var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix 1: add server clear to BW 
t = t.replace('RR();T("已回溯到该处")', 'RR();API("POST","/api/characters/"+CID+"/chat/clear").catch(function(){});T("已回溯")');

// Fix 2: Add rewrite button after rewind on AI msgs
t = t.replace('<div class="rw" onclick="BW(\'+i+\')">\u21a9</div></div>', '<div class="rw" onclick="BW(\'+i+\')">\u21a9</div><div class="rw" onclick="RW(\'+i+\')">\u270f</div></div>');

// Fix 3: Replace RW function with version that accepts index
var rwIdx = t.indexOf('function RW(');
var bcIdx = t.indexOf('function BC(');
if (rwIdx >= 0 && bcIdx > rwIdx) {
  t = t.slice(0, rwIdx) + 
    'function RW(i){if(i!==undefined){M=M.slice(0,i)}if(!CID||M.length<2||M[M.length-1].role!==\"assistant\"){T(\"\u65e0\u6cd5\u91cd\u5199\");return}M.pop();var last=M[M.length-1];if(last&&last.role===\"user\"){var inp=$(IN);if(inp)inp.value=last.content;SD()}else{T(\"\u65e0\u6cd5\u91cd\u5199\")}}' + 
    t.slice(bcIdx);
}

// Fix 4: Remove toolbar RW button
t = t.replace('<button class="btn" onclick="RW()">\u270f \u91cd\u5199</button>', '');

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Done');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
