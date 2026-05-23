var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
console.log('Has escaped EA:', t.indexOf("$('EA')") >= 0);
console.log('Has escaped T:', t.indexOf("T('图片已加载')") >= 0);
// Check JS syntax
var m = t.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  try { new Function(m[1]); console.log('JS OK'); }
  catch (e) { console.log('JS Error:', e.message); }
}
