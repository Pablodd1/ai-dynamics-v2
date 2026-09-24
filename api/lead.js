// Serverless API Endpoint: /api/lead
// Captures leads, logs them, and forwards to Brevo (if BREVO_API_KEY is configured)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, name, source = 'AI Dynamics - Lead Magnet', interest = 'Workflow Automation Guide' } = req.body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';

    // 1. If Brevo API key is present, forward contact to Brevo
    if (BREVO_API_KEY) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            attributes: {
              ...(name ? { FIRSTNAME: name } : {}),
              SOURCE: source,
              INTEREST: interest,
            },
            listIds: [1],
            updateEnabled: true,
          }),
        });

        const brevoData = await brevoRes.json().catch(() => ({}));
        console.log('[Lead API] Brevo Response:', brevoRes.status, brevoData);
      } catch (brevoErr) {
        console.warn('[Lead API] Brevo forward failed (non-critical):', brevoErr.message);
      }
    }

    // 2. Return success with guide download asset link
    return res.status(200).json({
      success: true,
      message: 'Lead registered successfully',
      guideUrl: '/ai-automation-playbook-2026.pdf',
    });
  } catch (error) {
    console.error('[Lead API] Error:', error);
    // Still return graceful success so front-end delivers the guide
    return res.status(200).json({
      success: true,
      message: 'Request received',
      guideUrl: '/ai-automation-playbook-2026.pdf',
    });
  }
}
