// Serverless API Endpoint: /api/contact
// Handles contact inquiries and sends notification via Brevo or fallback

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

    // 1. Send notification email to founder via Brevo if configured
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
            sender: { name: 'AI Dynamic Pro Web', email: 'notifications@aidynamic.pro' },
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
