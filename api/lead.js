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

        // Send automated Playbook delivery + $99 Audit welcome email with GA4 UTM tracking
        const utmBookingUrl = 'https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=playbook_welcome_audit99';
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: 'jasmelacosta@gmail.com' },
            to: [{ email: email.trim().toLowerCase(), name: name || email.split('@')[0] }],
            subject: 'Your 2026 AI Automation Playbook + $99 Workflow Audit Special',
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px;">
                <h2 style="color: #c9a96e; margin-top: 0;">Here is Your 2026 AI Automation Playbook</h2>
                <p>Hi ${name || 'there'},</p>
                <p>Thank you for downloading the <strong>AI Dynamic Pro Automation Playbook</strong>. You can access your copy anytime here:</p>
                <p><a href="https://www.aidynamic.pro/AI-Automation-Playbook-2026.pdf" style="color: #38bdf8; font-weight: bold;">Download the 2026 AI Automation Playbook (PDF)</a></p>
                <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
                <p><strong>Want us to audit your business workflows directly?</strong></p>
                <p>Claim our <strong>$99 AI Workflow & Feasibility Audit</strong>—we map your manual bottlenecks, build custom app & voice AI solutions, and train your staff to operate at 5x speed.</p>
                <p style="margin: 24px 0;">
                  <a href="${utmBookingUrl}" style="background: #c9a96e; color: #0a0a0f; padding: 12px 22px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
                    Book Your $99 Workflow Audit →
                  </a>
                </p>
                <p style="font-size: 13px; color: #94a3b8;">Direct Miami Line: +1 (786) 643-2099 • www.aidynamic.pro</p>
              </div>
            `,
          }),
        });
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
