const http = require('http');
http.get('http://localhost:3000/', (res) => {
  let chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => {
    const t = Buffer.concat(chunks).toString('utf8');
    const m = t.match(/<script>([\s\S]*?)<\/script>/);
    if (!m) { console.log('No script'); return; }
    const js = m[1];
    try {
      new Function(js);
      console.log('JS: OK');
    } catch (e) {
      console.log('Error:', e.message);
      const lines = js.split('\n');
      console.log('Total lines:', lines.length);
      // Show last few lines
      console.log('Last lines:', lines.slice(-5).join('\n'));
    }
  });
});
