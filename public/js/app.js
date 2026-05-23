/* ═══════════════════════════════════════════════
   Rubii Self · 前端逻辑
   ═══════════════════════════════════════════════ */

// ── 可用 Emoji 头像（80+ 个） ──
const AVATARS = [
  '🤖','😺','🦊','🐰','🐻','🐲','🦋','🌸','👾','🎭',
  '🧙','🧝','🦸','🧛','👻','🤠','💃','🎸','🕵️','🧚',
  '🧜','🧞','🦄','🐉','🦅','🐺','🦁','🐯','🐱','🦝',
  '🦩','🦚','🦜','🐍','🦎','🐳','🐬','🦈','🐙','🦑',
  '🌙','☀️','⭐','🌺','🌻','🌹','🍀','🌿','🔥','⚡',
  '💎','🔮','🎯','🎪','🎨','📚','⚔️','🛡️','🏹','🗡️',
  '👑','🎩','🧢','🥷','🎴','♟️','🎲','🧩','🎬','📸',
  '🌌','🗻','🏯','⛩️','🎋','🌸','🌊','🔥','💫','✨'
];

// 保存的 API Key（只在内存中，不存 localStorage）
let savedApiKey = '';

let state = {
  currentChar: null,        // 当前聊天/编辑的角色
  messages: [],             // 当前聊天消息
  isSending: false,
  config: {}
};

// ── 工具 ──
function $(id) { return document.getElementById(id); }

function showToast(msg, duration = 2500) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

function formatTime(ts) {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── 页面切换 ──
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $(pageId).classList.add('active');
}

// ── 请求 ──
async function api(method, url, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

// ── 加载设置 ──
async function loadConfig() {
  try {
    const cfg = await api('GET', '/api/config');
    state.config = cfg;
    $('set-base-url').value = cfg.baseUrl;
    $('set-model').value = cfg.model;
    $('set-temp').value = cfg.temperature;
    $('set-max-history').value = cfg.maxHistory;
  } catch (e) {
    console.error('加载设置失败:', e);
  }
}

// ═══════════════════════════════════════════════
//  首页 · 角色列表
// ═══════════════════════════════════════════════

async function renderHome() {
  const container = $('home-main');
  try {
    const chars = await api('GET', '/api/characters');
    if (chars.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="icon">🤖</div>
          <h3>还没有角色</h3>
          <p>创建你的第一个 AI 角色<br>开始一段专属的角色扮演</p>
        </div>
        <div style="padding: 8px 16px 24px; display:flex; flex-direction:column; gap:8px;">
          <button class="btn-primary" id="btn-create-char">＋ 创建角色</button>
          <button class="btn-primary" id="btn-import-char" style="background:var(--surface2); color:var(--text); border:1px solid var(--border);">📥 导入角色卡</button>
        </div>
      `;
      const btn = $('btn-create-char');
      if (btn) btn.addEventListener('click', () => openEdit(null));
      const btnImport = $('btn-import-char');
      if (btnImport) btnImport.addEventListener('click', () => showImportDialog());
      return;
    }

    let html = '<div class="char-grid">';
    for (const c of chars) {
      const desc = c.description || '...';
      html += `
        <div class="char-card" data-id="${c.id}">
          <div class="char-avatar">${c.avatar || '🤖'}</div>
          <div class="char-info">
            <div class="name">${escapeHtml(c.name)}</div>
            <div class="desc">${escapeHtml(desc)}</div>
          </div>
          <div class="char-actions">
            <button class="btn-icon" data-action="edit" data-id="${c.id}" title="编辑">✎</button>
            <button class="btn-icon" data-action="delete" data-id="${c.id}" title="删除">✕</button>
          </div>
        </div>
      `;
    }
    html += '</div>';

    // 底部按钮组
    html += `
      <div style="padding: 8px 16px 24px; display:flex; flex-direction:column; gap:8px;">
        <button class="btn-primary" id="btn-create-char">＋ 创建角色</button>
        <button class="btn-primary" id="btn-import-char" style="background:var(--surface2); color:var(--text); border:1px solid var(--border);">📥 导入角色卡</button>
      </div>
    `;

    container.innerHTML = html;

    // 事件绑定
    container.querySelectorAll('.char-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]')) return;
        openChat(el.dataset.id);
      });
    });
    container.querySelectorAll('[data-action="edit"]').forEach(el => {
      el.addEventListener('click', () => openEdit(el.dataset.id));
    });
    container.querySelectorAll('[data-action="delete"]').forEach(el => {
      el.addEventListener('click', () => confirmDelete(el.dataset.id));
    });
    const btnCreate = $('btn-create-char');
    if (btnCreate) btnCreate.addEventListener('click', () => openEdit(null));
    const btnImport = $('btn-import-char');
    if (btnImport) btnImport.addEventListener('click', () => showImportDialog());

  } catch (e) {
    container.innerHTML = `<div class="empty-state"><p>加载失败: ${e.message}</p></div>`;
  }
}

// ── 删除确认 ──
function confirmDelete(id) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = `
    <div class="dialog-box">
      <h3>确认删除</h3>
      <p>删除后角色和所有聊天记录将无法恢复。</p>
      <div class="dialog-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm" data-id="${id}">删除</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.btn-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.btn-confirm').addEventListener('click', async () => {
    try {
      await api('DELETE', `/api/characters/${id}`);
      overlay.remove();
      renderHome();
      showToast('已删除');
    } catch (e) {
      showToast('删除失败: ' + e.message);
    }
  });
}

// ═══════════════════════════════════════════════
//  导入角色卡
// ═══════════════════════════════════════════════

function showImportDialog() {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.alignItems = 'flex-start';
  overlay.style.paddingTop = '40px';
  overlay.innerHTML = `
    <div class="dialog-box" style="width:350px;max-width:92%;">
      <h3>📥 导入角色卡</h3>
      <p style="font-size:13px;margin-bottom:12px;">粘贴角色卡 JSON 或选择文件（支持 SillyTavern / Chub.ai 格式）</p>
      <div class="form-group">
        <label>选择 .json 文件</label>
        <input type="file" id="import-file" accept=".json" style="font-size:13px;padding:8px;background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:8px;width:100%;">
      </div>
      <div class="form-group">
        <label>或粘贴 JSON</label>
        <textarea id="import-json" rows="6" placeholder=\'{"spec":"chara_card_v2","data":{"name":"..."}}\' style="width:100%;font-size:12px;font-family:monospace;"></textarea>
      </div>
      <div class="dialog-actions" style="justify-content:stretch;gap:8px;">
        <button class="btn-cancel" id="import-cancel" style="flex:1;padding:10px;">取消</button>
        <button class="btn-confirm" id="import-confirm" style="flex:2;background:var(--accent);padding:10px;">导入</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#import-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#import-confirm').addEventListener('click', async () => {
    const fileInput = overlay.querySelector('#import-file');
    const textarea = overlay.querySelector('#import-json');

    let jsonStr = textarea.value.trim();

    // 优先读取文件
    if (fileInput.files.length > 0) {
      try {
        jsonStr = await fileInput.files[0].text();
      } catch (e) {
        showToast('读取文件失败: ' + e.message);
        return;
      }
    }

    if (!jsonStr) {
      showToast('请选择文件或粘贴 JSON');
      return;
    }

    try {
      const card = JSON.parse(jsonStr);
      const char = await importCharacterCard(card);
      overlay.remove();
      showToast(`✅ 已导入: ${char.name}`);
      renderHome();
    } catch (e) {
      showToast('导入失败: ' + e.message);
    }
  });
}

async function importCharacterCard(card) {
  // 支持多种格式
  let data;

  // 格式1: V2 spec { spec: "chara_card_v2", data: { name, ... } }
  if (card.spec === 'chara_card_v2' && card.data) {
    data = card.data;
  }
  // 格式2: 直接 { name, ... }
  else if (card.name) {
    data = card;
  }
  // 格式3: 其他结构
  else {
    throw new Error('无法识别的角色卡格式，请确保包含 name 字段');
  }

  if (!data.name) throw new Error('角色卡缺少名称');

  // 构建系统提示词
  let systemPrompt = data.system_prompt || data.personality || '';
  if (data.description) {
    systemPrompt = systemPrompt ? `${data.description}\n${systemPrompt}` : data.description;
  }
  if (data.scenario) {
    systemPrompt = `${systemPrompt}\n场景: ${data.scenario}`;
  }
  if (data.mes_example) {
    systemPrompt = `${systemPrompt}\n对话示例:\n${data.mes_example}`;
  }
  if (data.post_history_instructions) {
    systemPrompt = `${systemPrompt}\n${data.post_history_instructions}`;
  }

  const greeting = data.first_mes || data.greeting || `你好，我是${data.name}。`;

  const charData = {
    name: data.name,
    avatar: '🤖',
    description: data.description || '',
    systemPrompt: systemPrompt.trim(),
    greeting: greeting
  };

  return await api('POST', '/api/characters', charData);
}

// ═══════════════════════════════════════════════
//  聊天
// ═══════════════════════════════════════════════

let currentChatId = null;

async function openChat(charId) {
  try {
    const char = await api('GET', `/api/characters/${charId}`);
    currentChatId = charId;
    state.currentChar = char;

    // 安全地设置元素，给用户清晰的错误信息
    const nameEl = $('chat-header-name');
    if (nameEl) nameEl.textContent = char.name;
    else console.error('chat-header-name element not found!');

    const greetEl = $('chat-greeting');
    if (greetEl) greetEl.textContent = char.greeting || `你好，我是${char.name}。`;
    else console.error('chat-greeting element not found!');

    // 加载聊天记录
    const msgs = await api('GET', `/api/characters/${charId}/chat`);
    state.messages = msgs;

    // 显示页面
    showPage('page-chat');
    renderMessages();
    $('chat-input')?.focus();

  } catch (e) {
    showToast('⚠️ 加载失败: ' + e.message);
    console.error('openChat error:', e);
  }
}

function renderMessages() {
  const container = $('chat-messages');
  const empty = $('chat-empty');

  if (state.messages.length === 0) {
    container.innerHTML = '';
    container.appendChild(empty);
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  let html = '';
  for (const m of state.messages) {
    if (m.role === 'user') {
      html += `<div class="msg user"><div>${escapeHtml(m.content)}</div><div class="time">${formatTime(m.timestamp)}</div></div>`;
    } else {
      html += `<div class="msg ai"><div class="sender">${escapeHtml(state.currentChar?.name || 'AI')}</div><div>${renderAIResponse(m.content)}</div><div class="time">${formatTime(m.timestamp)}</div></div>`;
    }
  }
  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

/* 台词高亮：识别对话标记并着色 */
function renderAIResponse(text) {
  var s = escapeHtml(text);
  // 1) 「」直角引号 → 暖金色
  s = s.replace(/\u300c([^\u300d]+)\u300d/g,"<span class='dlg-talk'>\u300c$1\u300d</span>");
  // 2) ""中文弯引号 \u201c\u201d → 暖金色
  s = s.replace(/\u201c([^\u201d]+)\u201d/g,"<span class='dlg-talk'>\u201c$1\u201d</span>");
  // 3) ""标准ASCII双引号 → 暖金色（用单引号的HTML属性避免冲突）
  s = s.replace(/\x22([^\x22]*)\x22/g,"<span class='dlg-talk'>\x22$1\x22</span>");
  // 4) 『』内心/叙述 → 斜体灰色
  s = s.replace(/\u300e([^\u300f]+)\u300f/g,"<span class='dlg-think'>\u300e$1\u300f</span>");
  // 5) （）全角括号 → 柔和色
  s = s.replace(/\uff08([^\uff09]+)\uff09/g,"<span class='dlg-narr'>\uff08$1\uff09</span>");
  return s.replace(/\n/g,'<br>');
}

// 显示打字指示器
function showTyping() {
  const container = $('chat-messages');
  const el = document.createElement('div');
  el.className = 'msg-typing';
  el.id = 'typing-indicator';
  el.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  const el = $('typing-indicator');
  if (el) el.remove();
}

async function sendMessage() {
  const input = $('chat-input');
  const msg = input.value.trim();
  if (!msg || state.isSending || !currentChatId) return;

  input.value = '';
  input.style.height = 'auto';
  state.isSending = true;
  $('btn-send').disabled = true;

  // 先把用户消息加进去，显示在聊天里
  const tempMsg = { role: 'user', content: msg, timestamp: Date.now() };
  state.messages.push(tempMsg);
  try {
    renderMessages();
    showTyping();
  } catch (renderErr) {
    console.error('render error:', renderErr);
  }

  try {
    // 获取完整配置
    const apiKey = savedApiKey || $('set-api-key')?.value || '';
    const baseUrl = $('set-base-url')?.value || state.config.baseUrl || 'https://api.deepseek.com';
    const model = $('set-model')?.value || state.config.model || 'deepseek-chat';
    const temperature = parseFloat($('set-temp')?.value) || state.config.temperature || 0.8;
    const maxHistory = parseInt($('set-max-history')?.value) || state.config.maxHistory || 30;

    console.log('[Send] 发送消息, apiKey长度:', apiKey.length, 'model:', model);

    const result = await api('POST', `/api/characters/${currentChatId}/chat`, {
      message: msg,
      config: { apiKey, baseUrl, model, temperature, maxHistory }
    });

    hideTyping();
    state.messages.push({ role: 'assistant', content: result.reply, timestamp: Date.now() });
    try { renderMessages(); } catch (e) { console.error('render error:', e); }

  } catch (e) {
    console.error('[Send] 错误:', e.message);
    hideTyping();
    // 把错误消息显示在聊天里
    state.messages.push({ role: 'assistant', content: `⚠️ ${e.message}`, timestamp: Date.now() });
    try { renderMessages(); } catch (e2) { console.error('render error2:', e2); }
    // 恢复输入
    input.value = msg;
  } finally {
    state.isSending = false;
    $('btn-send').disabled = false;
    try { input.focus(); } catch (e) {}
  }
}
}

async function clearChat() {
  if (!currentChatId) return;
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = `
    <div class="dialog-box">
      <h3>清空对话</h3>
      <p>所有聊天记录将被清除，角色设定不会受影响。</p>
      <div class="dialog-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm" style="background:var(--accent);">清空</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.btn-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.btn-confirm').addEventListener('click', async () => {
    try {
      await api('POST', `/api/characters/${currentChatId}/chat/clear`);
      state.messages = [];
      renderMessages();
      overlay.remove();
      showToast('已清空');
    } catch (e) {
      showToast('清空失败: ' + e.message);
    }
  });
}

// ═══════════════════════════════════════════════
//  角色编辑
// ═══════════════════════════════════════════════

let editingId = null;

function openEdit(charId) {
  editingId = charId;
  const title = $('edit-title');
  const delBtn = $('btn-delete');

  // 渲染头像选择器
  renderAvatarPicker();

  if (charId) {
    title.textContent = '编辑角色';
    delBtn.style.display = 'block';
    loadCharForEdit(charId);
  } else {
    title.textContent = '创建角色';
    delBtn.style.display = 'none';
    resetEditForm();
  }
  showPage('page-edit');
}

function renderAvatarPicker(selected = '🤖') {
  const container = $('avatar-picker');
  container.innerHTML = AVATARS.map(a =>
    `<div class="avatar-opt ${a === selected ? 'selected' : ''}" data-avatar="${a}">${a}</div>`
  ).join('');
  container.querySelectorAll('.avatar-opt').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.avatar-opt').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
}

async function loadCharForEdit(id) {
  try {
    const c = await api('GET', `/api/characters/${id}`);
    $('edit-name').value = c.name;
    $('edit-desc').value = c.description || '';
    $('edit-prompt').value = c.systemPrompt || '';
    $('edit-greeting').value = c.greeting || '';
    $('edit-model').value = c.model || 'deepseek-chat';
    $('edit-temp').value = c.temperature ?? 0.8;
    $('temp-val').textContent = c.temperature ?? 0.8;
    renderAvatarPicker(c.avatar || '🤖');
  } catch (e) {
    showToast('加载角色失败: ' + e.message);
  }
}

function resetEditForm() {
  $('edit-name').value = '';
  $('edit-desc').value = '';
  $('edit-prompt').value = '';
  $('edit-greeting').value = '';
  $('edit-model').value = 'deepseek-chat';
  $('edit-temp').value = '0.8';
  $('temp-val').textContent = '0.8';
  renderAvatarPicker('🤖');
}

async function saveChar(e) {
  e.preventDefault();
  const name = $('edit-name').value.trim();
  if (!name) { showToast('请输入角色名'); return; }

  const avatar = $('avatar-picker').querySelector('.selected')?.dataset?.avatar || '🤖';

  const data = {
    name,
    avatar,
    description: $('edit-desc').value.trim(),
    systemPrompt: $('edit-prompt').value.trim(),
    greeting: $('edit-greeting').value.trim() || `你好，我是${name}。`,
    model: $('edit-model').value,
    temperature: parseFloat($('edit-temp').value) || 0.8
  };

  try {
    if (editingId) {
      await api('PUT', `/api/characters/${editingId}`, data);
      showToast('角色已更新');
    } else {
      const newChar = await api('POST', '/api/characters', data);
      showToast('角色已创建');
    }
    showPage('page-home');
    renderHome();
  } catch (e) {
    showToast('保存失败: ' + e.message);
  }
}

async function deleteChar() {
  if (!editingId) return;
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = `
    <div class="dialog-box">
      <h3>确认删除</h3>
      <p>此操作不可恢复。</p>
      <div class="dialog-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm">删除</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.btn-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.btn-confirm').addEventListener('click', async () => {
    try {
      await api('DELETE', `/api/characters/${editingId}`);
      overlay.remove();
      showPage('page-home');
      renderHome();
      showToast('已删除');
    } catch (e) {
      showToast('删除失败: ' + e.message);
    }
  });
}

// ═══════════════════════════════════════════════
//  设置
// ═══════════════════════════════════════════════

async function saveSettings() {
  const apiKey = $('set-api-key').value;
  savedApiKey = apiKey || savedApiKey;

  const data = {
    apiKey: apiKey || undefined,
    baseUrl: $('set-base-url').value || undefined,
    model: $('set-model').value || undefined,
    temperature: parseFloat($('set-temp').value) || undefined,
    maxHistory: parseInt($('set-max-history').value) || undefined
  };

  try {
    await api('PUT', '/api/config', data);
    await loadConfig();
    // 保存后清掉密码框（key 已存内存），显示已保存提示
    $('set-api-key').value = '';
    $('set-api-key').placeholder = '✓ API Key 已保存（重新输入可更新）';
    showToast('设置已保存');
  } catch (e) {
    showToast('保存失败: ' + e.message);
  }
}

function clearAllData() {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = `
    <div class="dialog-box">
      <h3>⚠️ 清除所有数据</h3>
      <p>所有角色、聊天记录和设置将被永久删除！</p>
      <div class="dialog-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm">确认清除</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.btn-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.btn-confirm').addEventListener('click', async () => {
    try {
      // 逐条删除所有角色（服务端会连带删除聊天记录）
      const chars = await api('GET', '/api/characters');
      for (const c of chars) {
        await api('DELETE', `/api/characters/${c.id}`);
      }
      // 重置设置
      await api('PUT', '/api/config', { apiKey: '', baseUrl: 'https://api.deepseek.com', model: 'deepseek-chat', temperature: 0.8, maxHistory: 30 });
      overlay.remove();
      savedApiKey = '';
      await loadConfig();
      $('set-api-key').value = '';
      $('set-api-key').placeholder = 'API Key';
      renderHome();
      showPage('page-home');
      showToast('所有数据已清除');
    } catch (e) {
      showToast('清除失败: ' + e.message);
    }
  });
}

// ═══════════════════════════════════════════════
//  事件绑定
// ═══════════════════════════════════════════════

async function debugSend() {
  try {
    showToast('🔧 currentChatId=' + (currentChatId || 'null') + ' isSending=' + state.isSending);
    
    // 直接测试 API
    try {
      const testResult = await fetch('/api/characters/' + (currentChatId || 'none') + '/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: 'test', config: {apiKey: savedApiKey || 'none'}})
      });
      const testData = await testResult.text();
      showToast('🔧 API响应: ' + testData.slice(0, 100));
    } catch(fetchErr) {
      showToast('🔧 fetch失败: ' + fetchErr.message);
    }
  } catch(e) {
    showToast('🔧 调试错误: ' + e.message);
  }
}

// ── 导航 ──
$('btn-settings').addEventListener('click', () => {
  showPage('page-settings');
  loadConfig();
});

// ── 聊天页 ──
$('btn-chat-back').addEventListener('click', () => {
  currentChatId = null;
  state.messages = [];
  showPage('page-home');
  renderHome();
});
$('btn-chat-info').addEventListener('click', () => {
  if (currentChatId) openEdit(currentChatId);
});
$('btn-send').addEventListener('click', sendMessage);

$('chat-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
$('chat-input').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

$('btn-chat-clear').addEventListener('click', clearChat);
$('btn-debug-send').addEventListener('click', debugSend);
$('btn-debug-send').style.display = 'block';
$('btn-chat-export').addEventListener('click', () => {
  if (currentChatId) {
    window.open(`/api/characters/${currentChatId}/chat/export`, '_blank');
    showToast('导出中…');
  }
});

// ── 编辑页 ──
$('btn-edit-back').addEventListener('click', () => {
  if (currentChatId && editingId === currentChatId) {
    showPage('page-chat');
  } else {
    showPage('page-home');
    renderHome();
  }
});
$('edit-temp').addEventListener('input', function() {
  $('temp-val').textContent = this.value;
});
$('edit-form').addEventListener('submit', saveChar);
$('btn-delete').addEventListener('click', deleteChar);

// ── 设置页 ──
$('btn-settings-back').addEventListener('click', () => {
  showPage('page-home');
  renderHome();
});
$('btn-save-settings').addEventListener('click', saveSettings);
$('btn-clear-all').addEventListener('click', clearAllData);

// ═══════════════════════════════════════════════
//  启动
// ═══════════════════════════════════════════════

async function init() {
  await loadConfig();
  // 如果保存了 API Key，回填到输入框（但不暴露明文）
  // 让用户自行输入或从服务端加载
  renderHome();
}

init();
