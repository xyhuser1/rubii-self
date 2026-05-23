const http = require('http');

// 获取角色列表
http.get('http://localhost:3000/api/characters', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const chars = JSON.parse(data);
    console.log('角色数:', chars.length);
    if (chars.length === 0) { console.log('没有角色'); return; }
    
    const charId = chars[0].id;
    console.log('测试角色:', chars[0].name, 'ID:', charId);

    // 发送聊天消息
    const body = JSON.stringify({
      message: '你好',
      config: {
        apiKey: 'test-invalid-key',
        baseUrl: 'https://api.deepseek.com',
        model: 'deepseek-chat',
        temperature: 0.8,
        maxHistory: 30
      }
    });

    const req = http.request(`http://localhost:3000/api/characters/${charId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res2) => {
      let data2 = '';
      res2.on('data', c => data2 += c);
      res2.on('end', () => {
        try {
          const result = JSON.parse(data2);
          console.log('聊天响应:', JSON.stringify(result).slice(0, 200));
        } catch(e) {
          console.log('响应原文:', data2.slice(0, 200));
        }
      });
    });
    req.write(body);
    req.end();
  });
}).on('error', e => console.error('错误:', e.message));
