var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var e = new Error;
try { new Function(js); } catch (ex) {
  var posMatch = ex.message.match(/position (\d+)/);
  if (posMatch) {
    var pos = parseInt(posMatch[1]);
    console.log('Error at position', pos);
    console.log('Context:', JSON.stringify(js.slice(Math.max(0,pos-100), pos+100)));
  } else {
    console.log('Error:', ex.message);
    // Check all EA references
    var eaIdx = 0;
    while ((eaIdx = js.indexOf('EA', eaIdx)) >= 0) {
      console.log('EA at', eaIdx, ':', js.slice(eaIdx-20, eaIdx+30));
      eaIdx++;
    }
  }
}
