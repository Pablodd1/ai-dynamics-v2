// Serverless API Endpoint: /api/lead
// Captures leads, logs them to Supabase & Brevo, and returns the Playbook PDF

export default async function handler(req, res) {
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
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    // 1. Save lead to Supabase server-side if configured
    if (SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name: name || email.split('@')[0],
            email: email.trim().toLowerCase(),
            service_interest: [interest],
            status: 'new',
            source: source,
            notes: 'Downloaded 2026 AI Automation Playbook',
          }),
        });
      } catch (sbErr) {
        console.warn('[Lead API] Supabase insert non-critical warning:', sbErr.message);
      }
    }

    // 2. If Brevo API key is present, forward contact to Brevo
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

    // 3. Return success with exact case-sensitive guide download asset link
    return res.status(200).json({
      success: true,
      message: 'Lead registered successfully',
      guideUrl: '/AI-Automation-Playbook-2026.pdf',
    });
  } catch (error) {
    console.error('[Lead API] Error:', error);
    return res.status(200).json({
      success: true,
      message: 'Request received',
      guideUrl: '/AI-Automation-Playbook-2026.pdf',
    });
  }
}
