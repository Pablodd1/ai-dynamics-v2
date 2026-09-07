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
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN

  let meetLink = null
  let calendarEventId = null

  // ─── GOOGLE CALENDAR: Create event + Meet link ───
  if (googleClientId && googleClientSecret && googleRefreshToken && date) {
    try {
      // 1. Get access token from refresh token
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: googleClientId,
          client_secret: googleClientSecret,
          refresh_token: googleRefreshToken,
          grant_type: 'refresh_token'
        })
      })

      const tokenData = await tokenRes.json()

      if (tokenData.access_token) {
        // Parse date + time into ISO format
        const [hourStr, minStr, ampm] = time.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || ['9', '00', 'AM']
        let hour = parseInt(hourStr)
        if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12
        if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0

        const startDate = new Date(`${date}T${String(hour).padStart(2, '0')}:${minStr}:00-04:00`)
        // Default 30-min duration based on service
        const durationMinutes = 
          service.includes('Audit') ? 30 :
          service.includes('Workflow') ? 45 :
          service.includes('Transformation') ? 60 : 30
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

        // 2. Create calendar event with Meet conference
        const eventRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary: `AI Dynamics Pro — ${service} with ${name}`,
            description: `Service: ${service}\nClient: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nPhone: ${phone || 'N/A'}\nNotes: ${message || 'N/A'}`,
            start: { dateTime: startDate.toISOString(), timeZone: 'America/New_York' },
            end: { dateTime: endDate.toISOString(), timeZone: 'America/New_York' },
            attendees: [
              { email: 'jasmelacosta@gmail.com' },
              { email }
            ],
            conferenceData: {
              createRequest: {
                requestId: `aidynamic-${Date.now()}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' }
              }
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 60 },
                { method: 'popup', minutes: 15 }
              ]
            }
          })
        })

        const eventData = await eventRes.json()
        if (eventData.id) {
          calendarEventId = eventData.id
          meetLink = eventData.conferenceData?.entryPoints?.[0]?.uri || eventData.hangoutLink || null
        }
      }
    } catch (err) {
      console.error('Calendar error:', err)
      // Don't fail the booking if calendar fails — emails still go through
    }
  }

  // ─── BREVO EMAILS ───
  if (!brevoApiKey) {
    return res.status(500).json({
      error: 'Email service not configured. Add BREVO_API_KEY to Vercel environment variables.'
    })
  }

  // 1. Notify Jasmel
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
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${time || 'Not selected'} EST</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px;"><strong>Message:</strong></td><td style="padding: 8px;">${message || 'N/A'}</td></tr>
            ${meetLink ? `<tr><td style="padding: 8px; border-top: 2px solid #c9a96e;" colspan="2"><strong style="color: #c9a96e;">Google Meet:</strong> <a href="${meetLink}">${meetLink}</a></td></tr>
            <tr><td style="padding: 8px;" colspan="2"><strong style="color: #c9a96e;">Calendar Event ID:</strong> ${calendarEventId}</td></tr>` : ''}
          </table>
          <p style="margin-top: 20px; color: #666;">Reply to this email or call them directly to confirm.</p>
        </div>
      `
    })
  })

  // 2. Confirm to client
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
            <h1 style="margin: 0; font-size: 28px;">Booking Confirmed</h1>
            <p style="margin: 10px 0 0; opacity: 0.8;">We're looking forward to speaking with you</p>
          </div>
          <div style="padding: 30px; background: #fafafa;">
            <h2 style="color: #1a1a2e; margin-top: 0;">Hi ${name},</h2>
            <p>Your <strong style="color: #c9a96e;">${service}</strong> with AI Dynamics Pro is scheduled.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c9a96e;">
              <p style="margin: 0;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 8px 0 0;"><strong>Date:</strong> ${date || 'TBD'}</p>
              <p style="margin: 8px 0 0;"><strong>Time:</strong> ${time || 'TBD'} (EST)</p>
              ${meetLink ? `<p style="margin: 8px 0 0;"><strong>Google Meet:</strong> <a href="${meetLink}" style="color: #c9a96e;">Join here</a></p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #666;">You'll also receive a calendar invite with the Meet link.</p>` : '<p style="margin: 8px 0 0; color: #666;">You'll receive a confirmation email with meeting details shortly.</p>'}
            </div>
            <p>Please save the date. If you need to reschedule, reply to this email or call <strong>+1 (786) 643-2099</strong>.</p>
            <p style="margin-top: 30px;">Questions? Reply to this email anytime.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">AI Dynamics Pro | Miami, FL | aidynamic.pro</p>
          </div>
        </div>
      `
    })
  })

  if (!notifyJasmel.ok || !confirmBooking.ok) {
    console.error('Email send failed:', await notifyJasmel.text(), await confirmBooking.text())
    return res.status(500).json({ error: 'Failed to send emails' })
  }

  return res.status(200).json({
    success: true,
    message: 'Booking confirmed. Check your email for the Google Meet link.',
    meetLink,
    calendarEventId
  })
}
