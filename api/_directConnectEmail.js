// Shared Direct Connect Hub Email Builder & Founder Fast-Action Alert Builder
// Used across /api/email-campaign, /api/connect, /api/lead, /api/contact, /api/booking, and /api/voice-webhook

export const PROJECT_DOMAIN = 'https://www.aidynamic.pro';
export const PROJECT_PHONE_DISPLAY = '(786) 643-2099';
export const PROJECT_PHONE_E164 = '+17866432099';

export function normalizePhoneE164(raw = '') {
  const digits = String(raw).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export async function resolveVerifiedBrevoSender(brevoApiKey, preferredEmail = 'jasmel@aidynamic.pro') {
  let resolved = (preferredEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();
  if (!brevoApiKey) return resolved;
  try {
    const sdrR = await fetch('https://api.brevo.com/v3/senders', {
      headers: { Accept: 'application/json', 'api-key': brevoApiKey },
    }).catch(() => null);
    if (sdrR && sdrR.ok) {
      const sdrD = await sdrR.json();
      const active = (sdrD.senders || []).filter((s) => s && s.active && s.email);
      const exact = active.find((s) => s.email.trim().toLowerCase() === resolved);
      const aiDyn = active.find((s) => s.email.toLowerCase().endsWith('@aidynamic.pro'));
      if (exact) resolved = exact.email.trim().toLowerCase();
      else if (aiDyn) resolved = aiDyn.email.trim().toLowerCase();
      else if (active.length > 0) resolved = active[0].email.trim().toLowerCase();
    }
  } catch {}
  return resolved || 'jasmel@aidynamic.pro';
}

export function buildDirectConnectHubLetter({
  firstName = 'there',
  emailParam = '{{ contact.EMAIL }}',
  segment = 'ceo',
  utmCampaign = 'direct_connect_hub',
  openingPara1,
  openingPara2,
  extraBoxHtml = '',
  closingPara1,
  closingPara2 = '',
  isBrevoCampaignDraft = false,
}) {
  const qsTail = `&segment=${encodeURIComponent(segment)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
  const callMeUrl = `${PROJECT_DOMAIN}/connect?mode=call&email=${emailParam}${qsTail}`;
  const textMeUrl = `${PROJECT_DOMAIN}/connect?mode=text&email=${emailParam}${qsTail}`;
  // CRITICAL GMAIL FIX: Never put raw sms: inside HTML emails — route via /connect?mode=open-sms
  const openSmsUrl = `${PROJECT_DOMAIN}/connect?mode=open-sms&email=${emailParam}${qsTail}`;
  const virtualUrl = `${PROJECT_DOMAIN}/connect?mode=virtual&email=${emailParam}${qsTail}`;
  const homeUrl = `${PROJECT_DOMAIN}/?utm_source=brevo&utm_medium=email&utm_campaign=${encodeURIComponent(utmCampaign)}`;

  const unsubLinkHtml = isBrevoCampaignDraft
    ? `<a href="{{ unsubscribe }}" style="color: #64748b; text-decoration: underline;">unsubscribe here</a>`
    : `<a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Dynamic Pro</title>
  <style>
    @media only screen and (max-width: 520px) {
      .hub-col {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 10px !important;
      }
      .hub-card {
        padding: 14px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; color: #1e293b; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 18px 14px 24px; color: #1e293b; font-size: 15px; line-height: 1.65;">

    <!-- 1. TOP STRIP: Minimalistic compact brand mark + company name (zero heavy banner) -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
      <tr>
        <td style="vertical-align: middle;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color: #0a0a0f; border: 1px solid #c9a96e; border-radius: 6px; width: 26px; height: 26px; text-align: center; vertical-align: middle; font-family: Georgia, serif; font-size: 11px; font-weight: 700; color: #f7e7ce;">
                AI
              </td>
              <td style="padding-left: 9px; font-size: 13px; font-weight: 700; color: #0f172a; letter-spacing: 0.2px;">
                AI Dynamic Pro <span style="font-weight: 400; color: #64748b;">· Miami</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- 2. OPENING: 2 short, plain-spoken paragraphs -->
    <p style="margin: 0 0 14px; color: #0f172a;">Hi ${firstName},</p>

    <p style="margin: 0 0 14px; color: #1e293b;">${openingPara1}</p>

    ${openingPara2 ? `<p style="margin: 0 0 18px; color: #1e293b;">${openingPara2}</p>` : ''}

    ${extraBoxHtml || ''}

    <!-- 3. CENTERPIECE: Minimalistic 5-Option Mid-Email Direct Connect Hub -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 20px 0;">
      <tr>
        <td class="hub-card" style="padding: 16px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; margin-bottom: 12px;">
            Pick how you&rsquo;d rather connect (takes 10 seconds):
          </div>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <!-- ROW 1: Phone Call Pair (Solid Primary Gold + Solid Dark-Contrast Obsidian) -->
            <tr>
              <td width="50%" class="hub-col" style="padding: 0 5px 10px 0; vertical-align: top;">
                <a href="${callMeUrl}" style="display: block; background-color: #c9a96e; border: 1.5px solid #b89352; border-radius: 8px; padding: 11px 10px; text-decoration: none; text-align: center;">
                  <span style="display: block; font-size: 14px; font-weight: 700; color: #0a0a0f; line-height: 1.25;">📞 You Call Me &rarr;</span>
                  <span style="display: block; font-size: 11px; font-weight: 500; color: #27272a; margin-top: 3px; line-height: 1.25;">Drop your name &amp; direct number</span>
                </a>
              </td>
              <td width="50%" class="hub-col" style="padding: 0 0 10px 5px; vertical-align: top;">
                <a href="tel:${PROJECT_PHONE_E164}" style="display: block; background-color: #0a0a0f; border: 1.5px solid #0a0a0f; border-radius: 8px; padding: 11px 10px; text-decoration: none; text-align: center;">
                  <span style="display: block; font-size: 14px; font-weight: 700; color: #ffffff; line-height: 1.25;">📲 I&rsquo;ll Call You</span>
                  <span style="display: block; font-size: 11px; font-weight: 400; color: #f7e7ce; margin-top: 3px; line-height: 1.25;">Tap to dial ${PROJECT_PHONE_DISPLAY}</span>
                </a>
              </td>
            </tr>

            <!-- ROW 2: Text / SMS Pair (Crisp #ffffff Outlined Buttons) -->
            <tr>
              <td width="50%" class="hub-col" style="padding: 0 5px 10px 0; vertical-align: top;">
                <a href="${textMeUrl}" style="display: block; background-color: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 10px; text-decoration: none; text-align: center;">
                  <span style="display: block; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.25;">💬 You Text Me &rarr;</span>
                  <span style="display: block; font-size: 11px; font-weight: 400; color: #64748b; margin-top: 3px; line-height: 1.25;">Leave your cell for a quick text</span>
                </a>
              </td>
              <td width="50%" class="hub-col" style="padding: 0 0 10px 5px; vertical-align: top;">
                <a href="${openSmsUrl}" style="display: block; background-color: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 10px; text-decoration: none; text-align: center;">
                  <span style="display: block; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.25;">✉️ I&rsquo;ll Text You</span>
                  <span style="display: block; font-size: 11px; font-weight: 400; color: #64748b; margin-top: 3px; line-height: 1.25;">Text ${PROJECT_PHONE_DISPLAY} right now</span>
                </a>
              </td>
            </tr>

            <!-- ROW 3: Slim Full-Span Virtual Consultation Bar (Pixel-Aligned Outer Edges + Soft Brand Tint) -->
            <tr>
              <td colspan="2" style="padding: 0; vertical-align: top;">
                <a href="${virtualUrl}" style="display: block; background-color: #faf5eb; border: 1.5px solid #d4b87a; border-radius: 8px; padding: 12px 12px; text-decoration: none; text-align: center;">
                  <span style="display: block; font-size: 14px; font-weight: 700; color: #0a0a0f; line-height: 1.3;">🗓️ Make an Appointment &mdash; Free 15-Min Virtual Consultation &rarr;</span>
                  <span style="display: block; font-size: 11px; font-weight: 500; color: #6b5327; margin-top: 3px; line-height: 1.25;">Pick a day &amp; time on your calendar &middot; Video or Phone</span>
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- 4. CLOSING: Transparent pricing / risk-reversal + human founder sign-off -->
    ${closingPara1 ? `<p style="margin: 0 0 14px; color: #1e293b;">${closingPara1}</p>` : ''}
    ${closingPara2 ? `<p style="margin: 0 0 16px; color: #1e293b;">${closingPara2}</p>` : ''}

    <p style="margin: 18px 0 0; color: #0f172a; line-height: 1.55;">
      Talk soon,<br/>
      <strong>Jasmel Acosta</strong><br/>
      <span style="font-size: 13px; color: #475569;">Founder &amp; AI Developer, AI Dynamic Pro</span><br/>
      <span style="font-size: 13px; color: #64748b;">Brickell, Miami &middot; <a href="tel:${PROJECT_PHONE_E164}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${PROJECT_PHONE_DISPLAY}</a> &middot; <a href="${homeUrl}" style="color: #9a7b3e; text-decoration: none; font-weight: 600;">aidynamic.pro</a></span>
    </p>

    <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0 12px;" />
    <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
      AI Dynamic Pro &middot; Brickell Financial District, Miami, FL 33131 &middot; Hablamos Espa&ntilde;ol.<br/>
      Don&rsquo;t want notes from me? Reply &ldquo;unsubscribe&rdquo; anytime or ${unsubLinkHtml}.
    </p>

  </div>
</body>
</html>`;
}

export function buildFounderFastActionAlertHtml({
  badge = 'NEW LEAD ALERT',
  headline = 'New Direct Connect Submission',
  name = '',
  phone = '',
  email = '',
  company = '',
  detailRows = [],
  mode = 'call',
  topic = '',
}) {
  const leadE164 = normalizePhoneE164(phone);
  // Gmail-safe SMS launcher on /connect?admin-sms=... (never raw sms: inside HTML email)
  const adminSmsBridgeUrl = leadE164
    ? `${PROJECT_DOMAIN}/connect?admin-sms=${encodeURIComponent(leadE164)}&name=${encodeURIComponent(name || '')}&mode=${encodeURIComponent(mode)}&topic=${encodeURIComponent(topic || '')}`
    : '';

  const rowsHtml = [
    { label: 'Name', value: name || 'Not provided' },
    ...(company ? [{ label: 'Company', value: company }] : []),
    ...(phone ? [{ label: 'Phone', value: phone }] : []),
    ...(email ? [{ label: 'Email', value: email }] : []),
    ...detailRows,
  ]
    .map(
      (r) => `
      <tr>
        <td style="padding: 5px 0; color: #64748b; width: 120px; vertical-align: top;">${r.label}:</td>
        <td style="padding: 5px 0; font-weight: 600; color: #0f172a;">${r.value}</td>
      </tr>`
    )
    .join('');

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 20px; color: #0f172a; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #b89352; margin-bottom: 6px;">
    AI Dynamic Pro &middot; ${badge}
  </div>
  <h2 style="margin: 0 0 14px; font-size: 19px; color: #0a0a0f;">${headline}</h2>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 18px; background: #f8fafc; border-radius: 8px; padding: 12px;">
    <tbody>${rowsHtml}</tbody>
  </table>

  ${
    leadE164
      ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 8px;">
          <tr>
            <td width="50%" style="padding-right: 6px;">
              <a href="tel:${leadE164}" style="display: block; text-align: center; background: #c9a96e; color: #0a0a0f; font-weight: 700; font-size: 14px; padding: 13px 10px; border-radius: 8px; text-decoration: none;">
                📞 Call ${name || 'Lead'} Now
              </a>
            </td>
            <td width="50%" style="padding-left: 6px;">
              <a href="${adminSmsBridgeUrl}" style="display: block; text-align: center; background: #0a0a0f; color: #f7e7ce; font-weight: 700; font-size: 14px; padding: 13px 10px; border-radius: 8px; text-decoration: none; border: 1px solid #c9a96e;">
                💬 Text ${name || 'Lead'} (SMS Draft)
              </a>
            </td>
          </tr>
        </table>`
      : email
      ? `<p style="margin: 12px 0 0;"><a href="mailto:${email}" style="display: inline-block; background: #0a0a0f; color: #f7e7ce; font-weight: 700; font-size: 13px; padding: 11px 16px; border-radius: 8px; text-decoration: none; border: 1px solid #c9a96e;">✉️ Reply to ${name || email} &rarr;</a></p>`
      : ''
  }
</div>`;
}
