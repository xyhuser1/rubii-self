  };
  writeJSON(path.join(CHARS_DIR, `${char.id}.json`), char);
  res.json(char);
});

// 更新角色
app.put('/api/characters/:id', (req, res) => {
  const file = path.join(CHARS_DIR, `${req.params.id}.json`);
  const existing = readJSON(file);
  if (!existing) return res.status(404).json({ error: '角色不存在' });

  const { name, avatar, cardBg, description, systemPrompt, greeting, model, temperature } = req.body;
  Object.assign(existing, {
    ...(name !== undefined && { name }),
    ...(avatar !== undefined && { avatar }),
    ...(cardBg !== undefined && { cardBg }),
    ...(description !== undefined && { description }),
    ...(systemPrompt !== undefined && { systemPrompt }),
    ...(greeting !== undefined && { greeting }),
    ...(model !== undefined && { model }),
    ...(temperature !== undefined && { temperature }),
    updatedAt: Date.now()
  });
  writeJSON(file, existing);
  res.json(existing);
});
