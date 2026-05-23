var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix the onchange handler - escape the inner single quotes
t = t.replace(
  "onchange=\"var f=this.files[0];if(f){var r=new FileReader();r.onload=function(e){$('EA').value=e.target.result;T('图片已加载')};r.readAsDataURL(f)}\"",
  "onchange=\"var f=this.files[0];if(f){var r=new FileReader();r.onload=function(e){$('EA').value=e.target.result;T('\u56fe\u7247\u5df2\u52a0\u8f7d')};r.readAsDataURL(f)}\""
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Fixed');

// Verify JS parses
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS OK'); }
catch (e) { console.log('Still broken:', e.message); }
