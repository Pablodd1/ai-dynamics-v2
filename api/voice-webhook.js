// Serverless API Endpoint: /api/voice-webhook
// Handles incoming function calls & call summaries from Vapi.ai, Retell AI, or Bland.ai with Instant Founder Fast-Action SMS/Call Alerts

import {
  buildFounderFastActionAlertHtml,
  resolveVerifiedBrevoSender,
} from './_directConnectEmail.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const { message, call, functionCall, type } = body;

    // 1. Handle Vapi / Retell Function Calling
    const toolCall = functionCall || message?.functionCall || message?.toolCalls?.[0]?.function;
    if (toolCall) {
      const name = toolCall.name;
      const parameters =
        typeof toolCall.arguments === 'string'
          ? JSON.parse(toolCall.arguments || '{}')
          : toolCall.arguments || {};

      if (name === 'book_discovery_call' || name === 'schedule_appointment') {
        const { caller_name, caller_phone, preferred_date, preferred_time, notes } = parameters;

        const BREVO_API_KEY = (process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '').trim();
        if (BREVO_API_KEY) {
          try {
            const resolvedSender = await resolveVerifiedBrevoSender(BREVO_API_KEY);
            const alertHtml = buildFounderFastActionAlertHtml({
              badge: 'LIVE AI PHONE RECEPTIONIST LEAD',
              headline: `${caller_name || 'Phone Caller'} scheduled via JAss Voice AI`,
              name: caller_name || 'Caller',
              phone: caller_phone || '',
              detailRows: [
                { label: 'Preferred Slot', value: `${preferred_date || 'ASAP'} ${preferred_time || ''}`.trim() },
                { label: 'Call Notes', value: notes || 'Booked over live AI phone line' },
              ],
              mode: 'call',
              topic: `${preferred_date || ''} ${preferred_time || ''}`.trim(),
            });

            await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
              },
              body: JSON.stringify({
                sender: { name: 'AI Dynamic Pro — JAss Voice Alert', email: resolvedSender },
                to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
                subject: `📞 [Live Phone Lead] ${caller_name || 'Caller'} (${caller_phone || 'Phone'}) via JAss`,
                htmlContent: alertHtml,
              }),
            });
          } catch (e) {
            console.warn('[Voice Webhook] Email notice failed:', e.message);
          }
        }

        return res.status(200).json({
          result: `Appointment scheduled successfully for ${caller_name || 'the caller'} on ${preferred_date || 'the requested date'}. Jasmel has been alerted directly.`,
        });
      }

      if (name === 'get_pricing_packages') {
        return res.status(200).json({
          packages: [
            {
              name: '$99 60-Min Workflow Audit + Free 48-Hr Custom AI Prototype',
              price: '$99 flat (100% refunded if <$2,500/mo savings)',
              description: 'Full bottleneck map + working custom AI prototype in 48 hours',
            },
            {
              name: 'Half-Day On-Site Corporate Staff AI Bootcamp',
              price: '$497 flat (up to 15 employees)',
              description: 'Hands-on English & Spanish role-specific AI training so 1 employee = 5',
            },
            {
              name: 'JAss 24/7 Bilingual Voice & WhatsApp Receptionist',
              price: '$997 turnkey or $297/mo',
              description: 'Answers calls, texts, WhatsApp & Instagram in <3 seconds in English & Spanish',
            },
          ],
        });
      }
    }

    if (type === 'end-of-call-report' || message?.type === 'end-of-call-report') {
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({
      success: true,
      message: 'Voice webhook processed successfully',
    });
  } catch (error) {
    console.error('[Voice Webhook] Error:', error);
    return res.status(200).json({ success: true, fallback: true });
  }
}
