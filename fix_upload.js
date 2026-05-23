var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Add file upload to the edit form, after the URL input
t = t.replace(
  "'<div class=\"fg\"><label>头像图片URL（可选）</label><input id=\"EA\" value=\"'+(ch?E(ch.avatar||''):'')+'\" placeholder=\"https://... 或留空用emoji\"></div>'+",
  "'<div class=\"fg\"><label>头像图片URL（可选）</label><input id=\"EA\" value=\"'+(ch?E(ch.avatar||''):'')+'\" placeholder=\"https://... 或留空\"></div>'+'<div class=\"fg\"><label>或上传本地图片</label><input type=\"file\" id=\"EFILE\" accept=\"image/*\" onchange=\"var f=this.files[0];if(f){var r=new FileReader();r.onload=function(e){$('EA').value=e.target.result;T('图片已加载')};r.readAsDataURL(f)}\"></div>'+"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('File upload added');
