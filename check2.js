const buf = require('fs').readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/test.html');
console.log('First 20 bytes hex:', buf.slice(0, 20).toString('hex'));
console.log('Has BOM:', buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF);
const text = buf.toString('utf8');
console.log('Contains title:', text.includes('<title>'));
console.log('Contains #app:', text.includes('id="app"'));
console.log('Has script:', text.includes('<script>'));
console.log('Ends with html:', text.trim().endsWith('</html>'));
console.log('File size:', buf.length);
// Print around the script tag
const si = text.indexOf('<script>');
if (si >= 0) {
  console.log('Script tag at position:', si);
  console.log('Before script:', text.slice(Math.max(0, si - 30), si));
  console.log('Script start:', text.slice(si, si + 50));
}
