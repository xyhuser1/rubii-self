var http = require('http');
http.get('http://localhost:3000/', function(res) {
  var data = '';
  res.on('data', function(c) { data += c; });
  res.on('end', function() {
    var m = data.match(/<script>([\s\S]*?)<\/script>/);
    if (!m) { console.log('No script'); return; }
    var js = m[1];
    try {
      new Function(js);
      console.log('JS OK');
    } catch (e) {
      console.log('Error:', e.message);
      // Find the error position
      var posMatch = e.message.match(/position (\d+)/);
      if (posMatch) {
        var pos = parseInt(posMatch[1]);
        console.log('Around error:', js.slice(Math.max(0,pos-50), pos+50));
      }
    }
  });
});
