// Serverless API Endpoint: /api/contact
// Handles contact inquiries, logs to Supabase & Brevo List #36, sends Instant Founder Mobile Alert + 5-Option Direct Connect Hub autoresponder

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
    const { name, email, phone, company, message } = req.body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const displayName = (name || cleanEmail.split('@')[0] || 'there').trim();
    const firstName = displayName.split(/\s+/)[0] || 'there';

    const BREVO_API_KEY = (process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '').trim();
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    // 1. Persist lead in Supabase server-side if key is available
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
            company: company || null,
            service_interest: ['General Inquiry'],
            status: 'new',
            source: 'website_contact_api',
            notes: message || '',
          }),
        });
      } catch (sbErr) {
        console.warn('[Contact API] Supabase insert warning:', sbErr.message);
      }
    }

    // 2. Sync to Brevo List #36 + send Founder Fast-Action Mobile Alert + 5-Option Direct Connect Hub reply
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
              ...(company ? { COMPANY: company } : {}),
            },
            listIds: [36],
            updateEnabled: true,
          }),
        }).catch(() => null);

        const resolvedSender = await resolveVerifiedBrevoSender(BREVO_API_KEY);

        const alertHtml = buildFounderFastActionAlertHtml({
          badge: 'CONTACT FORM INQUIRY',
          headline: `New Inquiry from ${displayName}${company ? ` (${company})` : ''}`,
          name: displayName,
          phone: phone || '',
          email: cleanEmail,
          company: company || '',
          detailRows: message ? [{ label: 'Message', value: message }] : [],
          mode: 'call',
          topic: message ? String(message).slice(0, 60) : '',
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
            to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
            replyTo: { email: cleanEmail, name: displayName },
            subject: `🚨 New Lead Inquiry from ${displayName}${company ? ` (${company})` : ''}`,
            htmlContent: alertHtml,
          }),
        });

        // Plain-spoken Split-Letter autoresponder with 5-Option Direct Connect Hub
        const autoReplyHtml = buildDirectConnectHubLetter({
          firstName,
          emailParam: encodeURIComponent(cleanEmail),
          segment: 'contact_inquiry',
          utmCampaign: 'contact_autoresponder_hub',
          openingPara1: `Got your note just now—thank you for reaching out to me at AI Dynamic Pro.`,
          openingPara2: `I personally review every inquiry that comes across my desk. If you don't want to wait on email tag—whether it's about our <strong>$99 60-minute workflow audit + free 48-hour custom AI prototype</strong>, 24/7 bilingual voice &amp; WhatsApp AI, or our <strong>$497 on-site staff bootcamp</strong>—use whichever option below is fastest for you right now:`,
          closingPara1: `Every $99 workflow audit is backed by a straightforward guarantee: if we don't map at least <strong>$2,500/month ($30,000/year)</strong> in measurable time and payroll savings for ${company || 'your team'}, you pay $0.`,
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
            subject: 'got your note — Jasmel @ AI Dynamic Pro',
            htmlContent: autoReplyHtml,
            tags: ['contact_autoresponder_hub', 'direct_connect_hub'],
          }),
        });
      } catch (emailErr) {
        console.warn('[Contact API] Brevo email send warning:', emailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully. Our team will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('[Contact API] Internal error:', error);
    return res.status(200).json({
      success: true,
      message: 'Inquiry received. Thank you!',
    });
  }
}
