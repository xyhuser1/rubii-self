const http = require('http');
http.get('http://localhost:3000/', (res) => {
  let chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => {
    const b = Buffer.concat(chunks);
    console.log('Bytes:', b.length);
    console.log('First 4 hex:', b.slice(0, 4).toString('hex'));
    const t = b.toString('utf8');
    console.log('Has DOCTYPE:', t.includes('<!DOCTYPE'));
    console.log('Has script:', t.includes('<script>'));
    console.log('Has home():', t.includes('home()'));
    console.log('Has id=app:', t.includes('id="app"'));
    
    // try extracting and parsing the JS
    const startTag = '<script>';
    const endTag = '</script>';
    const s = t.indexOf(startTag);
    const e = t.indexOf(endTag);
    if (s >= 0 && e > s) {
      const js = t.slice(s + startTag.length, e);
      console.log('JS length:', js.length);
      try {
        new Function(js);
        console.log('JS syntax: OK');
      } catch (err) {
        console.log('JS syntax error:', err.message);
        // Show context around error
        const lines = js.split('\n');
        console.log('Total lines:', lines.length);
        // Check for template literal issues
        const backtickCount = (js.match(/`/g) || []).length;
        console.log('Backtick count:', backtickCount, '(should be even)');
      }
    } else {
      console.log('Script tag not found. s=', s, 'e=', e);
      console.log('Looking for <script> in first 1000 chars...');
      console.log(t.slice(0, 1000));
    }
  });
}).on('error', e => console.log('Error:', e.message));
