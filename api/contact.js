// Serverless API Endpoint: /api/contact
// Handles contact inquiries, logs to Supabase, and sends notification via Brevo

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

    console.log('[Contact API] Received inquiry:', { name, email, phone, company, message });

    const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    // 1. Persist lead in Supabase server-side if key is available
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
            name: name || 'Website Visitor',
            email: email.trim().toLowerCase(),
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

    // 2. Send notification email to founder via Brevo if configured
    if (BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'AI Dynamic Pro Web', email: 'jasmelacosta@gmail.com' },
            to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
            replyTo: { email: email, name: name || email },
            subject: `🚨 New Lead Inquiry from ${name || 'Website Visitor'} (${company || 'Direct'})`,
            htmlContent: `
              <h2>New Contact Form Inquiry</h2>
              <p><strong>Name:</strong> ${name || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <div style="background:#f4f4f5;padding:12px;border-radius:8px;">${message || 'No message'}</div>
            `,
          }),
        });

        // Send auto-confirmation & $99 Audit CTA to prospect with GA4 UTM link
        const utmBookingUrl = 'https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=contact_autoresponder';
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: 'jasmelacosta@gmail.com' },
            to: [{ email: email.trim().toLowerCase(), name: name || email }],
            subject: 'We received your message — AI Dynamic Pro (Miami)',
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px;">
                <h2 style="color: #c9a96e; margin-top: 0;">Thank You for Reaching Out, ${name || 'there'}!</h2>
                <p>We received your inquiry at <strong>AI Dynamic Pro</strong> and our team will get back to you shortly.</p>
                <p>If you'd like to skip the wait and lock in a time on our calendar right now for a <strong>$99 AI Workflow Audit, Custom App Consultation, or Corporate Staff Training</strong>:</p>
                <p style="margin: 24px 0;">
                  <a href="${utmBookingUrl}" style="background: #c9a96e; color: #0a0a0f; padding: 12px 22px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
                    Choose a Time on Our Calendar →
                  </a>
                </p>
                <p style="font-size: 13px; color: #94a3b8;">Need immediate assistance? Call or text us in Miami at <strong>+1 (786) 643-2099</strong> or talk live with <strong>JAss</strong> at www.aidynamic.pro.</p>
              </div>
            `,
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
