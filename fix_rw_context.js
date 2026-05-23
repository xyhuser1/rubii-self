var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix RW function to clear server chat before rewriting
t = t.replace(
  'function RW(i){if(i===undefined&&M[M.length-1].role===\'assistant\')i=M.length-1;if(i===undefined){T(\'\u65e0\u6cd5\u91cd\u5199\');return}\n  M=M.slice(0,i+1);RR();var last=M[M.length-1];if(last&&last.role===\'user\'){$(\'IN\').value=last.content;SD()}else{T(\'\u65e0\u6cd5\u91cd\u5199\')}}',
  'function RW(i){if(i===undefined&&M[M.length-1].role===\'assistant\')i=M.length-1;if(i===undefined){T(\'\u65e0\u6cd5\u91cd\u5199\');return}\n  M=M.slice(0,i+1);RR();API(\'POST\',\'/api/characters/\'+CID+\'/chat/clear\').catch(function(){});var last=M[M.length-1];if(last&&last.role===\'user\'){$(\'IN\').value=last.content;SD()}else{T(\'\u65e0\u6cd5\u91cd\u5199\')}}'
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
