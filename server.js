const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/tasar', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key no configurada en el servidor.' });
  }
  try {
    const { default: fetch } = await import('node-fetch');
    const body = req.body;
    if (body.messages) {
      body.messages = body.messages.map(msg => {
        if (Array.isArray(msg.content)) {
          msg.content = msg.content.map(block => {
            if (block.type === 'image' && block.source?.data) {
              const data = block.source.data;
              let media_type = 'image/jpeg';
              if (data.startsWith('iVBORw0KGgo')) media_type = 'image/png';
              else if (data.startsWith('/9j/')) media_type = 'image/jpeg';
              else if (data.startsWith('R0lGOD')) media_type = 'image/gif';
              else if (data.startsWith('UklGR')) media_type = 'image/webp';
              block.source.media_type = media_type;
            }
            return block;
          });
        }
        return msg;
      });
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch(e) {
      res.status(500).json({ error: text });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Back2Street Tasador corriendo en puerto ${PORT}`);
});
