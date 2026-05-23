var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Replace the problematic onchange with properly escaped version
var oldOnchange = "$('EA').value=e.target.result;T('图片已加载')";
var newOnchange = "$(\\'EA\\').value=e.target.result;T(\\'图片已加载\\')";

t = t.replace(oldOnchange, newOnchange);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\\s\\S]*?)<\\/script>/);
try { new Function(m[1]); console.log('JS OK'); }
catch (e) { console.log('Error:', e.message); }
