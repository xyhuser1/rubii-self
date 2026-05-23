var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix AD function - don't pop, just advance
t = t.replace(
  'function AD(){if(!CID||M.length<2)return;var last=M[M.length-1];if(last.role===\'assistant\'){M.pop();$(\'IN\').value=\'\u8be6\u7ec6\u63cf\u5199\u4ee5\u4e0a\u60c5\u666f\u7684\u6bcf\u4e00\u523b\';SD()}else{$(\'IN\').value=\'\u8be6\u7ec6\u63cf\u5199\u5f53\u524d\u573a\u666f\';SD()}}',
  'function AD(){if(!CID||M.length<2)return;var inp=$(\'IN\');if(inp)inp.value=\'\u987a\u7740\u5f53\u524d\u5267\u60c5\u81ea\u7136\u5411\u524d\u53d1\u5c55\uff0c\u4e0d\u8981\u91cd\u590d\u4e4b\u524d\u7684\u63cf\u5199\uff0c\u63a8\u8fdb\u5230\u4e0b\u4e00\u6b65\';SD()}'
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
