// Serverless API Endpoint: /api/connect
// Powers AI Dynamic Pro's Ultra-Minimalistic Direct Connect Hub (/connect & /call-me):
// - Logs fast-action Call, Text, and 15-Min Virtual requests to Supabase CRM & Brevo
// - Dispatches Instant Mobile Founder Alert Email with 1-tap tel: + Gmail-safe ?admin-sms= launcher
// - Sends plain-spoken human confirmation email to leads who book a 15-Min Virtual Consultation

function normalizePhone(raw = '') {
  const digits = String(raw).replace(/\D/g, '');
  if (!digits) return { e164: '', display: '' };
  let e164 = '';
  if (digits.length === 10) {
    e164 = `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    e164 = `+${digits}`;
  } else {
    e164 = `+${digits}`;
  }
  const ten = e164.startsWith('+1') && e164.length === 12 ? e164.slice(2) : '';
  const display = ten
    ? `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`
    : raw.trim();
  return { e164, display };
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'AI Dynamic Pro — Direct Connect Hub API',
      domain: 'https://www.aidynamic.pro',
      phoneDisplay: '(786) 643-2099',
      phoneE164: '+17866432099',
      modes: ['call', 'text', 'virtual', 'open-sms', 'admin-sms'],
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      mode = 'call', // 'call' | 'text' | 'virtual'
      name = '',
      phone = '',
      email = '',
      timing = 'Right Now',
      topic = '$99 Audit + 48-Hr Prototype',
      dayLabel = '',
      dayIso = '',
      timeWindow = 'Morning (9–12 EST)',
      segment = '',
      utmCampaign = '',
    } = req.body || {};

    const cleanName = String(name).trim();
    const firstName = cleanName.split(/\s+/)[0] || 'there';
    const rawEmail = String(email).trim().toLowerCase();
    const cleanEmail =
      rawEmail && rawEmail.includes('@') && !rawEmail.includes('{{') ? rawEmail : '';
    const { e164: e164Phone, display: displayPhone } = normalizePhone(phone);

    if (!cleanName) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    if ((mode === 'call' || mode === 'text') && !e164Phone) {
      return res.status(400).json({ error: 'Please enter a valid phone number.' });
    }
    if (mode === 'virtual' && !cleanEmail) {
      return res.status(400).json({ error: 'Please enter your work email so we can send the invite.' });
    }

    const rawBrevoKey = process.env.BREVO_API_KEY || process.env.BREVO_KEY || '';
    const rawViteBrevoKey = process.env.VITE_BREVO_API_KEY || '';
    const BREVO_API_KEY = rawBrevoKey.startsWith('xkeysib-')
      ? rawBrevoKey.trim()
      : rawViteBrevoKey.startsWith('xkeysib-')
      ? rawViteBrevoKey.trim()
      : (rawBrevoKey || rawViteBrevoKey).trim();

    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    const summaryDetail =
      mode === 'call'
        ? `Call Me Request — Timing: ${timing}`
        : mode === 'text'
        ? `Text Me Request — Topic: ${topic}`
        : `15-Min Virtual Consultation — ${dayLabel || dayIso || 'Next Available'} (${timeWindow})`;

    // 1. Save to Supabase CRM (aidynamic_leads)
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
            name: cleanName,
            email: cleanEmail || `phone-${e164Phone.replace(/\D/g, '')}@connect.aidynamic.pro`,
            phone: displayPhone || e164Phone || null,
            service_interest: [
              mode === 'text'
                ? topic
                : mode === 'virtual'
                ? 'Free 15-Min Virtual Consultation'
                : `Callback (${timing})`,
            ],
            status: 'new',
            source: `direct_connect_${mode}${segment ? `_${segment}` : ''}`,
            notes: `${summaryDetail}${utmCampaign ? ` | Campaign: ${utmCampaign}` : ''}`,
          }),
        });
      } catch (sbErr) {
        console.warn('[Connect API] Supabase insert warning:', sbErr.message);
      }
    }

    // 2. Brevo CRM Upsert + Instant Mobile Founder Alert + Virtual Confirmation
    if (BREVO_API_KEY) {
      let resolvedSender = 'jasmel@aidynamic.pro';
      try {
        const sdrR = await fetch('https://api.brevo.com/v3/senders', {
          headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
        }).catch(() => null);
        if (sdrR && sdrR.ok) {
          const sdrD = await sdrR.json();
          const active = (sdrD.senders || []).filter((s) => s && s.active && s.email);
          const aiDyn = active.find((s) => s.email.toLowerCase() === 'jasmel@aidynamic.pro') ||
            active.find((s) => s.email.toLowerCase().endsWith('@aidynamic.pro'));
          if (aiDyn) resolvedSender = aiDyn.email;
          else if (active.length > 0) resolvedSender = active[0].email;
        }
      } catch {}

      // Upsert into Brevo List #36 if real email provided
      if (cleanEmail) {
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
              FIRSTNAME: firstName,
              NAME: cleanName,
            },
            listIds: [36],
            updateEnabled: true,
          }),
        }).catch(() => null);
      }

      const modeBadge =
        mode === 'call'
          ? `📞 CALL ME (${timing.toUpperCase()})`
          : mode === 'text'
          ? `💬 TEXT ME (${topic})`
          : `🗓️ 15-MIN VIRTUAL (${dayLabel || 'Requested'} · ${timeWindow})`;

      const subjectLine =
        mode === 'call'
          ? `📞 Call Request (${timing}): ${cleanName} — ${displayPhone}`
          : mode === 'text'
          ? `💬 Text Request: ${cleanName} (${displayPhone}) — ${topic}`
          : `🗓️ 15-Min Virtual Booked: ${cleanName} — ${dayLabel || ''} (${timeWindow})`;

      // Build Gmail-safe founder SMS bridge URL (?admin-sms=...)
      const adminSmsUrl = e164Phone
        ? `https://www.aidynamic.pro/connect?admin-sms=${encodeURIComponent(e164Phone)}&name=${encodeURIComponent(
            firstName
          )}&req=${encodeURIComponent(mode)}&detail=${encodeURIComponent(
            mode === 'call' ? timing : mode === 'text' ? topic : `${dayLabel} ${timeWindow}`
          )}`
        : '';

      const actionButtonsHtml = e164Phone
        ? `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0 12px;">
            <tr>
              <td width="50%" style="padding: 0 5px 10px 0; vertical-align: top;">
                <a href="tel:${escapeHtml(e164Phone)}" style="display: block; background-color: #c9a96e; color: #0a0a0f; text-decoration: none; text-align: center; padding: 14px 12px; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 14px;">
                  📞 Call ${escapeHtml(firstName)} Now<br/>
                  <span style="font-size: 11px; font-weight: 500; color: #27272a;">${escapeHtml(displayPhone)}</span>
                </a>
              </td>
              <td width="50%" style="padding: 0 0 10px 5px; vertical-align: top;">
                <a href="${adminSmsUrl}" style="display: block; background-color: #0a0a0f; color: #ffffff; text-decoration: none; text-align: center; padding: 14px 12px; border-radius: 8px; border: 1px solid #c9a96e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 14px;">
                  💬 Text ${escapeHtml(firstName)} (1-Tap)<br/>
                  <span style="font-size: 11px; font-weight: 400; color: #f7e7ce;">Opens SMS w/ personal intro</span>
                </a>
              </td>
            </tr>
          </table>
        `
        : '';

      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a; padding: 16px;">
          <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a0894e; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">
            AI DYNAMIC PRO · INSTANT DIRECT CONNECT ALERT
          </div>
          <div style="display: inline-block; background: #0a0a0f; color: #f7e7ce; border: 1px solid #c9a96e; border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 700; margin-bottom: 14px;">
            ${escapeHtml(modeBadge)}
          </div>

          ${actionButtonsHtml}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; font-size: 14px;">
            <tr>
              <td style="padding: 6px 8px; color: #64748b; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 6px 8px; color: #0f172a; font-weight: 600;">${escapeHtml(cleanName)}</td>
            </tr>
            ${
              displayPhone
                ? `<tr>
                    <td style="padding: 6px 8px; color: #64748b;"><strong>Phone</strong></td>
                    <td style="padding: 6px 8px; color: #0f172a; font-weight: 600;"><a href="tel:${escapeHtml(e164Phone)}" style="color: #0f172a;">${escapeHtml(displayPhone)}</a></td>
                  </tr>`
                : ''
            }
            ${
              cleanEmail
                ? `<tr>
                    <td style="padding: 6px 8px; color: #64748b;"><strong>Email</strong></td>
                    <td style="padding: 6px 8px; color: #0f172a;"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #0f172a;">${escapeHtml(cleanEmail)}</a></td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding: 6px 8px; color: #64748b;"><strong>Request</strong></td>
              <td style="padding: 6px 8px; color: #0f172a;">${escapeHtml(summaryDetail)}</td>
            </tr>
            ${
              segment || utmCampaign
                ? `<tr>
                    <td style="padding: 6px 8px; color: #64748b;"><strong>Campaign</strong></td>
                    <td style="padding: 6px 8px; color: #64748b;">${escapeHtml([segment, utmCampaign].filter(Boolean).join(' · '))}</td>
                  </tr>`
                : ''
            }
          </table>
        </div>
      `;

      // Send Instant Founder Alert to admin inbox(es)
      const adminRecipients = [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }];
      if (resolvedSender.toLowerCase() !== 'jasmelacosta@gmail.com') {
        adminRecipients.push({ email: 'jasmel@aidynamic.pro', name: 'Jasmel Acosta' });
      }

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: 'AI Dynamic Pro Direct Alert', email: resolvedSender },
          to: adminRecipients,
          ...(cleanEmail ? { replyTo: { email: cleanEmail, name: cleanName } } : {}),
          subject: subjectLine,
          htmlContent: adminHtml,
          tags: ['direct_connect_alert', `connect_${mode}`],
        }),
      }).catch((e) => console.warn('[Connect API] Admin alert warning:', e.message));

      // Send short, human confirmation email to the lead when they request a 15-Min Virtual Consultation
      if (mode === 'virtual' && cleanEmail) {
        const leadConfirmHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b; font-size: 15px; line-height: 1.65; padding: 12px 4px;">
            <div style="font-size: 12px; font-weight: 700; letter-spacing: 1.5px; color: #9a7b3e; margin-bottom: 18px;">
              AI DYNAMIC PRO · MIAMI
            </div>
            <p style="margin: 0 0 14px;">Hi ${escapeHtml(firstName)},</p>
            <p style="margin: 0 0 14px;">Got your request for our <strong>Free 15-Min Virtual Consultation</strong> on <strong>${escapeHtml(
              dayLabel || 'your selected day'
            )} (${escapeHtml(timeWindow)})</strong>.</p>
            <p style="margin: 0 0 14px;">I'm locking a slot on my calendar now and will send over the video/phone link shortly. We'll keep it practical—just looking at your slowest daily workflow and how a 48-hour custom AI prototype can take it off your team's plate.</p>
            <p style="margin: 0 0 18px;">If anything comes up or you'd rather just talk sooner, reply right here or call/text my cell directly at <a href="tel:+17866432099" style="color: #0f172a; font-weight: 600; text-decoration: none;">(786) 643-2099</a>.</p>
            <p style="margin: 0;">Talk soon,<br/>
            <strong>Jasmel Acosta</strong><br/>
            <span style="color: #64748b; font-size: 13px;">Founder, AI Dynamic Pro · Brickell, Miami · (786) 643-2099</span></p>
          </div>
        `;

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'Jasmel Acosta', email: resolvedSender },
            replyTo: { email: 'jasmel@aidynamic.pro', name: 'Jasmel Acosta' },
            to: [{ email: cleanEmail, name: cleanName }],
            subject: `Confirmed: 15-min chat on ${dayLabel || 'your calendar'} (${timeWindow})`,
            htmlContent: leadConfirmHtml,
            tags: ['direct_connect_virtual_confirm'],
          }),
        }).catch((e) => console.warn('[Connect API] Lead confirm warning:', e.message));
      }
    }

    return res.status(200).json({
      success: true,
      mode,
      summary: summaryDetail,
      message:
        mode === 'call'
          ? `Got it, ${firstName}. Jasmel just received your number on his phone (${timing}).`
          : mode === 'text'
          ? `Got it, ${firstName}. Jasmel will text ${displayPhone} shortly about ${topic}.`
          : `Confirmed, ${firstName}! Check ${cleanEmail} for a quick note from Jasmel for ${dayLabel} (${timeWindow}).`,
    });
  } catch (err) {
    console.error('[Connect API] Error:', err);
    return res.status(500).json({ error: 'Could not submit right now. Please call (786) 643-2099 directly.' });
  }
}
