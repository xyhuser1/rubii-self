var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Direct replacement - just change the img src to use proxy
t = t.replace(
  "'<img src=\"'+ch.avatar+'\" style=\"width:48px",
  "'<img src=\"/api/proxy-image?url='+encodeURIComponent(ch.avatar)+'\" style=\"width:48px"
);

// Also fix chat avatar  
t = t.replace(
  "'<img src=\"'+a+'\" style=\"width:36px",
  "'<img src=\"/api/proxy-image?url='+encodeURIComponent(a)+'\" style=\"width:36px"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Fixed both avatars');
