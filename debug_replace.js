var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var search = "'<img src=\"'+ch.avatar+'\" style=\"width:48px";
var idx = t.indexOf(search);
console.log('Search found at:', idx);
console.log('Match:', t.slice(idx, idx + search.length) === search);
// Show context
if (idx >= 0) console.log('Context:', t.slice(idx, idx + 100));
