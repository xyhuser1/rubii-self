var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
// Find the SD function
var idx = js.indexOf('function SD');
console.log('SD function:', js.slice(idx, idx + 350));
// Check for any remaining unquoted ID references
var bareRefs = js.match(/\$\([A-Z]{2,}\)/g);
if (bareRefs) {
  console.log('Bare $() refs:', bareRefs.join(', '));
}
// Check for known ID issues
console.log('Has $(IN):', js.indexOf('$(IN)') >= 0);
console.log('Has $(SB):', js.indexOf('$(SB)') >= 0);
