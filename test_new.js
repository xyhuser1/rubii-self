var http = require('http');
http.get('http://localhost:3000/', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    var m = d.match(/<script>([\s\S]*?)<\/script>/);
    if (m) {
      try { new Function(m[1]); console.log('JS: OK'); }
      catch (e) { console.log('JS Error:', e.message.slice(0, 200)); }
    }
    // Verify key features
    var features = ['function RR', 'function SD', 'function BW', 'function RW', 'function AD'];
    for (var i = 0; i < features.length; i++) {
      console.log('Has', features[i] + ':', d.indexOf(features[i]) >= 0);
    }
  });
});
