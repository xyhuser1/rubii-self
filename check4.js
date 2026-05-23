const http = require('http');
http.get('http://localhost:3000/', (res) => {
  let chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => {
    const t = Buffer.concat(chunks).toString();
    const m = t.match(/<script>([\s\S]*?)<\/script>/);
    if (!m) { console.log('No script!'); return; }
    const js = m[1];
    console.log('JS length:', js.length);
    // Try to find syntax error
    try {
      new Function(js);
      console.log('JS OK');
    } catch (e) {
      console.log('Error:', e.message);
      // Find problem area
      const lines = js.split('\n');
      const errMatch = e.message.match(/position (\d+)/);
      if (errMatch) {
        const pos = parseInt(errMatch[1]);
        console.log('Error around position', pos);
        console.log('Context:', js.slice(Math.max(0,pos-40), pos+40));
      }
      // Check for template literal issues
      var btc = 0;
      var inStr = false;
      var inSingle = false;
      for (var i = 0; i < js.length; i++) {
        var ch = js[i];
        var prev = i > 0 ? js[i-1] : '';
        if (ch === "'" && prev !== '\\' && !inStr) inSingle = !inSingle;
        else if (ch === '`' && prev !== '\\' && !inSingle) { btc++; console.log('Backtick at', i, 'context:', js.slice(Math.max(0,i-20), i+20)); }
      }
      console.log('Total backticks:', btc);
    }
  });
});
