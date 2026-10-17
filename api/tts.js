// Serverless API Endpoint: /api/tts
// Streams natural human voice audio (MP3) for any dynamic text in Spanish or English
// Priority 1: xAI Grok Voice 3.0 Standalone TTS (if XAI_API_KEY / GROK_API_KEY is configured — $15/1M chars, ~90ms TTFA)
// Priority 2: OpenAI TTS-1 HD Nova human voice (if OPENAI_API_KEY is configured)
// Priority 3: ElevenLabs Multilingual v2 (if ELEVENLABS_API_KEY is configured)
// Priority 4: Cloud TTS MP3 Stream (zero API key required, works on all mobile/desktop browsers)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const params = req.method === 'POST' ? (req.body || {}) : (req.query || {});
    const rawText = (params.text || '').toString().trim();
    const langParam = (params.lang || '').toString().toLowerCase();

    if (!rawText) {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    // Clean URLs and markdown symbols for natural speech
    const cleanText = rawText
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 600);

    // Detect Spanish vs English automatically if lang not explicitly set
    const isSpanish =
      langParam.startsWith('es') ||
      /[áéíóúñ¿¡]/i.test(cleanText) ||
      /\b(hola|buenas|gracias|empresa|negocio|cita|español|llamada|auditoría|dólares)\b/i.test(cleanText);

    // 1. xAI Grok Voice 3.0 Standalone TTS ('ara') - Priority 1
    const xaiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.VITE_XAI_API_KEY || '';
    if (xaiKey) {
      try {
        const grokVoice = process.env.GROK_VOICE || 'ara';
        const grokRes = await fetch('https://api.x.ai/v1/tts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${xaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: cleanText,
            voice_id: grokVoice,
            language: isSpanish ? 'es' : 'en',
          }),
        });
        if (grokRes.ok) {
          const arrayBuffer = await grokRes.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('X-TTS-Provider', 'grok-voice-3.0');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          return res.status(200).send(Buffer.from(arrayBuffer));
        }
      } catch (e) {
        console.warn('[TTS API] Grok Voice 3.0 fallback:', e.message);
      }
    }

    // 2. OpenAI HD Human Voice 'nova' (tts-1) - Priority 2
    const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || '';
    if (openaiKey) {
      try {
        const oaRes = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            voice: process.env.OPENAI_VOICE || 'nova',
            input: cleanText,
            speed: 1.02,
          }),
        });
        if (oaRes.ok) {
          const arrayBuffer = await oaRes.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          return res.status(200).send(Buffer.from(arrayBuffer));
        }
      } catch (e) {
        console.warn('[TTS API] OpenAI TTS fallback:', e.message);
      }
    }

    // 2. ElevenLabs Multilingual v2 (if configured as alternative)
    const elevenKey = process.env.ELEVENLABS_API_KEY;
    if (elevenKey) {
      try {
        const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
        const elRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': elevenKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          body: JSON.stringify({
            text: cleanText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
          }),
        });
        if (elRes.ok) {
          const arrayBuffer = await elRes.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          return res.status(200).send(Buffer.from(arrayBuffer));
        }
      } catch (e) {
        console.warn('[TTS API] ElevenLabs fallback:', e.message);
      }
    }

    // 3. Universal Cloud MP3 Stream (Split into <=180 char sentence chunks & concatenate MP3 buffers)
    const tl = isSpanish ? 'es-US' : 'en-US';
    const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];
    const chunks = [];
    let current = '';

    for (const s of sentences) {
      if ((current + ' ' + s).trim().length <= 180) {
        current = (current + ' ' + s).trim();
      } else {
        if (current) chunks.push(current);
        if (s.length <= 180) {
          current = s.trim();
        } else {
          // Hard split long clause by words
          const words = s.trim().split(' ');
          let sub = '';
          for (const w of words) {
            if ((sub + ' ' + w).trim().length <= 180) {
              sub = (sub + ' ' + w).trim();
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          current = sub;
        }
      }
    }
    if (current) chunks.push(current);

    const buffers = [];
    for (const chunk of chunks) {
      const ttsUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${tl}&client=tw-ob`;
      const gRes = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      if (gRes.ok) {
        const ab = await gRes.arrayBuffer();
        buffers.push(Buffer.from(ab));
      }
    }

    if (buffers.length > 0) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.status(200).send(Buffer.concat(buffers));
    }

    return res.status(500).json({ error: 'Unable to synthesize speech' });
  } catch (error) {
    console.error('[TTS API] Error:', error);
    return res.status(500).json({ error: 'TTS failed' });
  }
}
