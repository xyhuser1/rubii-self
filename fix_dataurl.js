var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Handle data URLs for avatar display
// Replace all instances of indexOf('http')===0 to also check for data:
t = t.split("ch.avatar.indexOf('http')===0").join("(ch.avatar.indexOf('http')===0||ch.avatar.indexOf('data:')===0)");
t = t.split("a.indexOf('http')===0").join("(a.indexOf('http')===0||a.indexOf('data:')===0)");

// For data URLs, don't use proxy - use directly
t = t.replace(
  "'<img src=\\\"/api/proxy-image?url='+encodeURIComponent(ch.avatar)+'\\\"'",
  "'<img src=\\\"'+((ch.avatar.indexOf('data:')===0)?ch.avatar:'/api/proxy-image?url='+encodeURIComponent(ch.avatar))+'\\\"'"
);

t = t.replace(
  "'<img src=\\\"/api/proxy-image?url='+encodeURIComponent(a)+'\\\"'",
  "'<img src=\\\"'+((a.indexOf('data:')===0)?a:'/api/proxy-image?url='+encodeURIComponent(a))+'\\\"'"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
