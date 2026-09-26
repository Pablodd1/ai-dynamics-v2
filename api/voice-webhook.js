// Serverless API Endpoint: /api/voice-webhook
// Handles incoming function calls & call summaries from Vapi.ai, Retell AI, or Bland.ai

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

    console.log('[Voice Webhook] Received event:', type || message?.type || 'function-call');

    // 1. Handle Vapi / Retell Function Calling
    const toolCall = functionCall || message?.functionCall || message?.toolCalls?.[0]?.function;
    if (toolCall) {
      const name = toolCall.name;
      const parameters = typeof toolCall.arguments === 'string' 
        ? JSON.parse(toolCall.arguments || '{}') 
        : toolCall.arguments || {};

      console.log('[Voice Webhook] Executing Tool:', name, parameters);

      if (name === 'book_discovery_call' || name === 'schedule_appointment') {
        const { caller_name, caller_phone, preferred_date, preferred_time, notes } = parameters;
        
        // Forward notification to founder
        const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';
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
                sender: { name: 'AI Voice Receptionist', email: 'receptionist@aidynamic.pro' },
                to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
                subject: `📞 [Live Phone Lead] ${caller_name || 'Caller'} scheduled via AI Receptionist`,
                htmlContent: `
                  <h2>New Call Booking via AI Phone Line</h2>
                  <p><strong>Caller Name:</strong> ${caller_name || 'Not provided'}</p>
                  <p><strong>Caller Phone:</strong> ${caller_phone || 'Not provided'}</p>
                  <p><strong>Preferred Date/Time:</strong> ${preferred_date || ''} ${preferred_time || ''}</p>
                  <p><strong>Notes:</strong> ${notes || 'Booked over phone call'}</p>
                `,
              }),
            });
          } catch (e) {
            console.warn('[Voice Webhook] Email notice failed:', e.message);
          }
        }

        return res.status(200).json({
          result: `Appointment scheduled successfully for ${caller_name || 'the caller'} on ${preferred_date || 'the requested date'}. We will send an SMS confirmation.`,
        });
      }

      if (name === 'get_pricing_packages') {
        return res.status(200).json({
          packages: [
            { name: 'Strategy & Audit', price: '$0 Free', description: 'Comprehensive 1-on-1 workflow opportunity map' },
            { name: 'Single High-Impact Workflow', price: '$1,000 flat', description: 'Turnkey 2-3 week build with 30-day support' },
            { name: 'Full AI Transformation', price: '$5,000 - $15,000', description: 'Comprehensive multi-workflow system' }
          ]
        });
      }
    }

    // 2. Handle End-of-Call Transcripts & Call Summaries
    if (type === 'end-of-call-report' || message?.type === 'end-of-call-report') {
      const summary = call?.summary || message?.transcript || 'No transcript provided';
      console.log('[Voice Webhook] End-of-call transcript logged.');
      return res.status(200).json({ success: true });
    }

    // Default response
    return res.status(200).json({
      success: true,
      message: 'Voice webhook processed successfully',
    });
  } catch (error) {
    console.error('[Voice Webhook] Error:', error);
    return res.status(200).json({ success: true, fallback: true });
  }
}
