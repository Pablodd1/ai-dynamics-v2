export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { service, date, time, name, email, company, phone, message } = req.body

  if (!name || !email || !service) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const brevoApiKey = process.env.BREVO_API_KEY

  if (!brevoApiKey) {
    return res.status(500).json({ 
      error: 'Email service not configured. Add BREVO_API_KEY to Vercel environment variables.' 
    })
  }

  // 1. Send notification to Jasmel
  const notifyJasmel = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': brevoApiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'AI Dynamics Pro', email: 'jasmelacosta@gmail.com' },
      to: [{ email: 'jasmelacosta@gmail.com' }],
      subject: `New Booking: ${service} — ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${service}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${date || 'Not selected'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${time || 'Not selected'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px;"><strong>Message:</strong></td><td style="padding: 8px;">${message || 'N/A'}</td></tr>
          </table>
          <p style="margin-top: 20px; color: #666;">Reply to this email or call them directly to confirm.</p>
        </div>
      `
    })
  })

  // 2. Send confirmation to the person who booked
  const confirmBooking = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': brevoApiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'AI Dynamics Pro', email: 'jasmelacosta@gmail.com' },
      to: [{ email }],
      subject: `Booking Confirmed — ${service}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center; color: #c9a96e;">
            <h1 style="margin: 0; font-size: 28px;">Booking Request Received</h1>
            <p style="margin: 10px 0 0; opacity: 0.8;">We'll confirm within 2 hours</p>
          </div>
          <div style="padding: 30px; background: #fafafa;">
            <h2 style="color: #1a1a2e; margin-top: 0;">Hi ${name},</h2>
            <p>Thanks for booking a <strong style="color: #c9a96e;">${service}</strong> with AI Dynamics Pro.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c9a96e;">
              <p style="margin: 0;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 8px 0 0;"><strong>Date:</strong> ${date || 'TBD'}</p>
              <p style="margin: 8px 0 0;"><strong>Time:</strong> ${time || 'TBD'} (EST)</p>
            </div>
            <p>You'll receive a calendar invite and a Google Meet link once we confirm your slot.</p>
            <p style="margin-top: 30px;">Questions? Reply to this email or call <strong>+1 (786) 643-2099</strong>.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">AI Dynamics Pro | Miami, FL</p>
          </div>
        </div>
      `
    })
  })

  if (!notifyJasmel.ok || !confirmBooking.ok) {
    console.error('Email send failed:', await notifyJasmel.text(), await confirmBooking.text())
    return res.status(500).json({ error: 'Failed to send emails' })
  }

  return res.status(200).json({ success: true, message: 'Booking confirmed. Check your email.' })
}
