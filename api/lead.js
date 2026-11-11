// Serverless API Endpoint: /api/lead
// Captures Playbook leads, logs them to Supabase & Brevo List #36, sends Playbook + 5-Option Direct Connect Hub email, and alerts founder

import {
  buildDirectConnectHubLetter,
  buildFounderFastActionAlertHtml,
  resolveVerifiedBrevoSender,
} from './_directConnectEmail.js';

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
    const { email, name, phone = '', source = 'AI Dynamics - Lead Magnet', interest = 'Workflow Automation Guide' } = req.body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const displayName = (name || cleanEmail.split('@')[0]).trim();
    const firstName = displayName.split(/\s+/)[0] || 'there';

    const BREVO_API_KEY = (process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '').trim();
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    // 1. Save lead to Supabase server-side if configured
    if (SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            name: displayName,
            email: cleanEmail,
            phone: phone || null,
            service_interest: [interest],
            status: 'new',
            source,
            notes: 'Downloaded 2026 AI Automation Playbook',
          }),
        });
      } catch (sbErr) {
        console.warn('[Lead API] Supabase insert non-critical warning:', sbErr.message);
      }
    }

    // 2. Upsert into Brevo List #36 (AI Dynamic Pro — Miami B2B Leads) + send Direct Connect Hub Playbook email
    if (BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: cleanEmail,
            attributes: {
              FIRSTNAME: displayName,
              NAME: displayName,
              SOURCE: source,
              INTEREST: interest,
            },
            listIds: [36],
            updateEnabled: true,
          }),
        }).catch(() => null);

        const resolvedSender = await resolveVerifiedBrevoSender(BREVO_API_KEY);

        const playbookHtml = buildDirectConnectHubLetter({
          firstName,
          emailParam: encodeURIComponent(cleanEmail),
          segment: 'playbook_download',
          utmCampaign: 'playbook_welcome_hub',
          openingPara1: `Here is your direct copy of our <strong><a href="https://www.aidynamic.pro/AI-Automation-Playbook-2026.pdf" style="color: #9a7b3e; text-decoration: underline;">2026 AI Automation Playbook (PDF)</a></strong>—no hoops, you can open or save it anytime.`,
          openingPara2: `Most business owners who grab the playbook are trying to fix one of two headaches: missed phone/WhatsApp inquiries or staff spending 15+ hours a week on repetitive admin. For a flat <strong>$99</strong>, my team runs a 60-minute workflow audit and builds a <strong>working custom AI prototype for your company in 48 hours</strong>.`,
          closingPara1: `If the audit doesn't uncover at least <strong>$2,500/month ($30,000/year)</strong> in hard time and payroll savings, I refund your $99 on the spot. Pick whichever option above is easiest if you want us to map your workflow this week.`,
        });

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: resolvedSender },
            replyTo: { email: 'jasmel@aidynamic.pro', name: 'Jasmel Acosta — AI Dynamic Pro' },
            to: [{ email: cleanEmail, name: displayName }],
            subject: 'your 2026 AI playbook (pdf inside) + quick question',
            htmlContent: playbookHtml,
            tags: ['playbook_welcome_hub', 'direct_connect_hub'],
          }),
        });

        // Instant founder alert
        const alertHtml = buildFounderFastActionAlertHtml({
          badge: 'PLAYBOOK LEAD',
          headline: `${displayName} downloaded the 2026 AI Playbook`,
          name: displayName,
          phone,
          email: cleanEmail,
          detailRows: [
            { label: 'Interest', value: interest },
            { label: 'Source', value: source },
          ],
          mode: 'text',
          topic: '$99 Audit + 48-Hr Prototype',
        });

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'AI Dynamic Pro — Lead Alert', email: resolvedSender },
            replyTo: { email: cleanEmail, name: displayName },
            to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
            subject: `📥 Playbook Lead: ${displayName} (${cleanEmail})`,
            htmlContent: alertHtml,
          }),
        }).catch(() => null);
      } catch (brevoErr) {
        console.warn('[Lead API] Brevo forward failed (non-critical):', brevoErr.message);
      }
    }

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
