export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}
  const service = body.service || body.meeting_type || 'Free AI Consultation'
  const name = body.name
  const email = body.email
  const company = body.company || ''
  const phone = body.phone || ''
  const message = body.message || body.challenge || body.interest || ''
  
  let date = body.date
  let time = body.time

  if (!date && body.selected_slot?.day) {
    date = body.selected_slot.day
  }
  if (!time && body.selected_slot?.display) {
    time = body.selected_slot.display
  }

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name and email are required.' })
  }

  const brevoApiKey = process.env.BREVO_API_KEY
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN

  let meetLink = null
  let calendarEventId = null

  // ─── GOOGLE CALENDAR: Create event + Meet link ───
  if (googleClientId && googleClientSecret && googleRefreshToken && date && time) {
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
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
        const [hourStr, minStr, ampm] = match ? match.slice(1) : ['10', '00', 'AM']
        let hour = parseInt(hourStr)
        if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12
        if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0

        // Format clean date string if date is formatted like "YYYY-MM-DD"
        let dateClean = date
        if (body.selected_slot?.start) {
          dateClean = body.selected_slot.start.slice(0, 10)
        }
        
        const startDate = new Date(`${dateClean}T${String(hour).padStart(2, '0')}:${minStr}:00-04:00`)
        const durationMinutes = service.includes('Audit') ? 30 : service.includes('Strategy') ? 45 : 30
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
    }
  }

  // ─── BREVO EMAILS ───
  if (brevoApiKey) {
    try {
      // 1. Notify Jasmel
      await fetch('https://api.brevo.com/v3/smtp/email', {
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
                ${meetLink ? `<tr><td style="padding: 8px; border-top: 2px solid #c9a96e;" colspan="2"><strong style="color: #c9a96e;">Google Meet:</strong> <a href="${meetLink}">${meetLink}</a></td></tr>` : ''}
              </table>
            </div>
          `
        })
      })

      // 2. Confirm to client
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'AI Dynamics Pro', email: 'jasmelacosta@gmail.com' },
          to: [{ email }],
          subject: `Booking Request Received — ${service}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
              <div style="background: linear-gradient(135deg, #0a0a0f 0%, #16213e 100%); padding: 35px; text-align: center; color: #c9a96e;">
                <h1 style="margin: 0; font-size: 26px;">Booking Received</h1>
                <p style="margin: 8px 0 0; opacity: 0.9; color: #e2e8f0;">AI Dynamics Pro — Miami, FL</p>
              </div>
              <div style="padding: 30px; background: #fafafa;">
                <h2 style="color: #1a1a2e; margin-top: 0;">Hi ${name},</h2>
                <p>We received your booking request for <strong>${service}</strong>.</p>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c9a96e;">
                  <p style="margin: 0;"><strong>Service:</strong> ${service}</p>
                  <p style="margin: 8px 0 0;"><strong>Requested Date:</strong> ${date || 'Pending confirmation'}</p>
                  <p style="margin: 8px 0 0;"><strong>Requested Time:</strong> ${time || 'Pending confirmation'} (EST)</p>
                  ${meetLink ? `<p style="margin: 8px 0 0;"><strong>Google Meet:</strong> <a href="${meetLink}" style="color: #c9a96e;">Join Link</a></p>` : ''}
                </div>
                <p>Founder Jasmel Acosta will review and confirm your session. If you have an urgent question, call or text us directly at <strong>+1 (786) 643-2099</strong>.</p>
              </div>
            </div>
          `
        })
      })
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr)
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Booking request confirmed! We will follow up with full meeting details.',
    meet_link: meetLink,
    calendarEventId
  })
}
