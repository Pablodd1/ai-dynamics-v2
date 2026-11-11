// Serverless API Endpoint: /api/booking
// Records consultation bookings in Supabase + Google Calendar + Brevo List #36, sends Instant Founder Mobile Alert + Split-Letter Direct Connect Hub confirmation

import {
  buildDirectConnectHubLetter,
  buildFounderFastActionAlertHtml,
  resolveVerifiedBrevoSender,
} from './_directConnectEmail.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

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

  const cleanEmail = String(email).trim().toLowerCase()
  const displayName = String(name).trim()
  const firstName = displayName.split(/\s+/)[0] || 'there'

  const brevoApiKey = (process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '').trim()
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

  // ─── SUPABASE: Record booking lead ───
  if (supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/aidynamic_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: displayName,
          email: cleanEmail,
          phone: phone || null,
          company: company || null,
          service_interest: [service],
          status: 'new',
          source: 'website_booking_page',
          notes: `Requested Slot: ${date || 'TBD'} ${time || ''} EST | Message: ${message || 'N/A'}`,
        }),
      })
    } catch (sbErr) {
      console.warn('[Booking API] Supabase insert non-critical warning:', sbErr.message)
    }
  }

  let meetLink = null
  let calendarEventId = null

  // ─── GOOGLE CALENDAR: Create event + Meet link ───
  if (googleClientId && googleClientSecret && googleRefreshToken && date && time) {
    try {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: googleClientId,
          client_secret: googleClientSecret,
          refresh_token: googleRefreshToken,
          grant_type: 'refresh_token',
        }),
      })

      const tokenData = await tokenRes.json()

      if (tokenData.access_token) {
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
        const [hourStr, minStr, ampm] = match ? match.slice(1) : ['10', '00', 'AM']
        let hour = parseInt(hourStr)
        if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12
        if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0

        let dateClean = date
        if (body.selected_slot?.start) {
          dateClean = body.selected_slot.start.slice(0, 10)
        }

        const startDate = new Date(`${dateClean}T${String(hour).padStart(2, '0')}:${minStr}:00-04:00`)
        const durationMinutes = service.includes('Audit') ? 30 : service.includes('Strategy') ? 45 : 30
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

        const eventRes = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              summary: `AI Dynamic Pro — ${service} with ${displayName}`,
              description: `Service: ${service}\nClient: ${displayName}\nEmail: ${cleanEmail}\nCompany: ${company || 'N/A'}\nPhone: ${phone || 'N/A'}\nNotes: ${message || 'N/A'}`,
              start: { dateTime: startDate.toISOString(), timeZone: 'America/New_York' },
              end: { dateTime: endDate.toISOString(), timeZone: 'America/New_York' },
              attendees: [{ email: 'jasmelacosta@gmail.com' }, { email: cleanEmail }],
              conferenceData: {
                createRequest: {
                  requestId: `aidynamic-${Date.now()}`,
                  conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
              },
            }),
          }
        )

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

  // ─── BREVO EMAILS (Direct Connect Hub Standard) ───
  if (brevoApiKey) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': brevoApiKey,
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
      }).catch(() => null)

      const resolvedSender = await resolveVerifiedBrevoSender(brevoApiKey)

      // 1. Instant Founder Fast-Action Alert (1-tap tel: + Gmail-safe ?admin-sms=)
      const alertHtml = buildFounderFastActionAlertHtml({
        badge: 'NEW CONSULTATION BOOKING',
        headline: `${displayName} booked ${service}`,
        name: displayName,
        phone,
        email: cleanEmail,
        company,
        detailRows: [
          { label: 'Service', value: service },
          { label: 'Date / Time', value: `${date || 'Pending'} · ${time || 'Pending'} EST` },
          ...(meetLink ? [{ label: 'Google Meet', value: `<a href="${meetLink}" style="color:#9a7b3e;">${meetLink}</a>` }] : []),
          ...(message ? [{ label: 'Notes', value: message }] : []),
        ],
        mode: 'virtual',
        topic: `${date || 'upcoming'} ${time || ''}`.trim(),
      })

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'AI Dynamic Pro — Booking Alert', email: resolvedSender },
          replyTo: { email: cleanEmail, name: displayName },
          to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
          subject: `🗓️ New Booking: ${service} — ${displayName}`,
          htmlContent: alertHtml,
        }),
      })

      // 2. Plain-spoken Gmail Primary-safe confirmation with summary box + 5-Option Direct Connect Hub
      const slotBoxHtml = `
        <div style="background-color: #faf5eb; border: 1px solid #d4b87a; border-radius: 10px; padding: 14px 16px; margin: 0 0 18px; font-size: 14px; color: #0f172a;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6b5327; margin-bottom: 6px;">Requested Session Summary</div>
          <div><strong>Session:</strong> ${service}</div>
          <div style="margin-top: 4px;"><strong>Date &amp; Time:</strong> ${date || 'Pending confirmation'} &middot; ${time || 'Pending confirmation'} (EST)</div>
          ${meetLink ? `<div style="margin-top: 6px;"><strong>Video Link:</strong> <a href="${meetLink}" style="color: #9a7b3e; font-weight: 700;">Join Google Meet &rarr;</a></div>` : ''}
        </div>
      `

      const clientConfirmHtml = buildDirectConnectHubLetter({
        firstName,
        emailParam: encodeURIComponent(cleanEmail),
        segment: 'booking_confirmation',
        utmCampaign: 'booking_confirmation_hub',
        openingPara1: `Got your booking request for <strong>${service}</strong>—I've penciled this onto my calendar and look forward to speaking with you.`,
        openingPara2: '',
        extraBoxHtml: slotBoxHtml,
        closingPara1: `Need to adjust the time, share a quick note ahead of our call, or jump on the phone right away? Use any of the 5 quick options above or reply directly to this email.`,
      })

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: resolvedSender },
          replyTo: { email: 'jasmel@aidynamic.pro', name: 'Jasmel Acosta — AI Dynamic Pro' },
          to: [{ email: cleanEmail, name: displayName }],
          subject: `confirmed: ${service} (${date || 'upcoming'})`,
          htmlContent: clientConfirmHtml,
          tags: ['booking_confirmation_hub', 'direct_connect_hub'],
        }),
      })
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr)
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Booking request confirmed! We will follow up with full meeting details.',
    meet_link: meetLink,
    calendarEventId,
  })
}
