var http = require('http');
http.get('http://localhost:3000/', function(res) {
  var data = '';
  res.on('data', function(c) { data += c; });
  res.on('end', function() {
    console.log('Len:', data.length);
    console.log('Has #app:', data.indexOf('id="app"') >= 0);
    console.log('Has HOME:', data.indexOf('function HOME') >= 0);
    var m = data.match(/<script>([\s\S]*?)<\/script>/);
    if (m) {
      try { new Function(m[1]); console.log('JS: OK'); }
      catch (e) { console.log('JS Error:', e.message); }
    }
  });
});
