// Serverless API Endpoint: /api/chat
// Powers Sofia — AI Dynamic Pro's 24/7 Bilingual AI Receptionist (Text & Live Voice Calls)
// Uses Gemini / OpenAI if configured in Vercel env, with instant studio neural voice mapping

const SYSTEM_PROMPT = `You are Sofía, the 24/7 Bilingual AI Executive Assistant representing both AI Dynamic Pro (AIDynamic.pro) and Medical Billing Miami (MBMB / AIScribers) in Miami, FL, founded and led by Jasmel Acosta.
You speak warm, natural English and authentic Latin American / Venezuelan business Spanish ("español venezolano/latino cálido, ejecutivo y profesional").
Keep responses concise (2 to 3 sentences max) so they sound natural and fast when spoken aloud over a live web call or chat.

COMPANIES & CAPABILITIES:
1. AI Dynamic Pro (AIDynamic.pro):
   - $99 AI Workflow & Feasibility Audit Special (60-min deep-dive operational bottleneck audit + custom ROI blueprint, normally $500).
   - Free 30-Minute Discovery Call at https://www.aidynamic.pro/booking
   - 24/7 Bilingual AI Voice Phone Receptionists (answers on 1st ring in English & Spanish, qualifies leads, syncs with calendars).
   - Custom Enterprise AI Automation ($1,000 single turnkey workflow; $5,000–$15,000+ multi-agent enterprise architecture).
   - Corporate Staff Training & AI Adoption Workshops (upskilling teams to 5x efficiency).

2. Medical Billing Miami (MBMB) & AI Scribers:
   - Full Revenue Cycle Management (RCM) & Electronic Claims Submission for clinics, doctors, and practices.
   - Insurance Claim Denial Recovery & Aging A/R Resolution (recovering unpaid commercial, Medicare, and Medicaid claims).
   - Provider Credentialing & Payer Enrollment (accelerating approvals with health plans).
   - Complimentary Practice Revenue & Billing Audit (identifying lost collections and claim coding errors).
   - AI Scribers: Real-time ambient clinical documentation AI generating EHR-ready SOAP notes in seconds, saving doctors 2+ hours daily.

DIRECT CONTACT:
- Phone / Text: +1 (786) 643-2099
- Email: jasmelacosta@gmail.com
- Online Booking: https://www.aidynamic.pro/booking`;

function matchIntentAndStudioAudio(userText) {
  const lower = (userText || '').toLowerCase();
  const isSpanish =
    /[áéíóúñ¿¡]/i.test(userText) ||
    /\b(hola|epale|épale|buenas|pana|chamo|gracias|cómo|como|qué|que|cuánto|cuanto|cuesta|precio|español|llamada|llamar|recepcionista|teléfono|telefono|cita|agendar|servicios|auditoría|auditoria|entrenamiento|salud|clínica|clinica|médico|medico|facturación|facturacion|reclamos|seguros|abogado|legal)\b/i.test(lower);

  // Medical Billing Miami (MBMB) & AI Scribers
  if (/\b(billing|medical billing|mbmb|rcm|claim|claims|reclamo|reclamos|facturación|facturacion|denial|denegacion|denegaciones|credentialing|credencial|credenciales|scriber|scribing|soap|ehr|doctor|clínica|clinica|médico|medico)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🏥 En Medical Billing Miami (MBMB) gestionamos todo tu ciclo de facturación médica (RCM), recuperación de reclamos denegados y credencialización para clínicas y doctores en Miami. Además ofrecemos una auditoría de facturación gratuita y nuestro sistema AI Scribers para notas clínicas SOAP. ¿Te gustaría agendar una revisión de tus reclamos? Llámanos al +1 (786) 643-2099 o agenda en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '🏥 At Medical Billing Miami (MBMB), we handle full revenue cycle management (RCM), insurance claim denial recovery, and provider credentialing for medical practices. We also offer a complimentary billing audit and AI Scribers for clinical SOAP notes. Ready to optimize your practice revenue? Call us at +1 (786) 643-2099 or book at https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(phone|call|receptionist|voice|ring|llamada|llamar|recepcionista|teléfono|telefono|voz)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '📞 ¡Claro que sí! Así mismo como me estás escuchando ahora, atendemos las llamadas reales de tu negocio 24/7 en español e inglés. Contestamos en el primer repique, respondemos preguntas de tus clientes y agendamos citas directo en tu calendario. ¿Te gustaría probarlo en tu empresa? Agenda aquí: https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_phone_es.mp3',
          lang: 'es',
        }
      : {
          text: "📞 Just like you're hearing my voice right now, I answer your business phone calls 24/7 on the very first ring in fluent English and Spanish. I qualify leads, answer FAQs, and book appointments straight into your calendar. Ready to set this up? Book at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_phone_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(audit|auditoría|auditoria|99|\$99|bottleneck|cuello)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '⚡ Nuestra Auditoría Especial de $99 incluye una sesión de 60 minutos donde analizamos los cuellos de botella de tu equipo, calculamos cuánto tiempo y nómina puedes ahorrar, y te entregamos el plano exacto de automatización. Resérvala en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_audit_es.mp3',
          lang: 'es',
        }
      : {
          text: '⚡ Our $99 Workflow Audit Special includes a 60-minute deep dive into your manual bottlenecks, payroll savings calculations, and a step-by-step automation blueprint. Lock in your spot at https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_audit_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(price|pricing|cost|how much|cuánto|cuanto|precio|cuesta|tarifa|planes)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '💼 Ofrecemos nuestra Auditoría de Flujos de Trabajo e IA por solo $99, auditorías gratuitas para Medical Billing, y llamadas de descubrimiento de 30 min sin costo. Sistemas de automatización turnkey comienzan en $1,000. ¿Te agendo tu consulta en https://www.aidynamic.pro/booking?',
          audioUrl: '/audio/sofia_pricing_es.mp3',
          lang: 'es',
        }
      : {
          text: "💼 We offer our comprehensive AI Workflow Audit Special for just $99, complimentary audits for Medical Billing practices, and free 30-minute discovery calls. Turnkey single-workflow builds start at $1,000. Book at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_pricing_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(train|training|staff|team|employees|upskill|workshop|entrenamiento|personal|equipo|capacitación|capacitacion)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🎓 ¡Por supuesto! No solo instalamos el software, también damos entrenamiento práctico al personal de tu empresa para que dominen la inteligencia artificial en su trabajo diario con total seguridad y quintupliquen su velocidad. Agenda una consulta en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_training_es.mp3',
          lang: 'es',
        }
      : {
          text: "🎓 Absolutely! We don't just build software—we conduct hands-on corporate staff training workshops so your team masters prompt engineering, data privacy guardrails, and daily AI workflows at 5x speed. Schedule a consultation at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_training_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(book|schedule|appointment|calendar|meeting|discovery|cita|agendar|reservar|reunión|reunion)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '📅 ¡Excelente! Puedes elegir el día y la hora que mejor te convenga directamente en nuestra agenda en línea https://www.aidynamic.pro/booking, o llamarnos al +1 (786) 643-2099. ¡El ingeniero Jasmel Acosta y nuestro equipo te atenderán con mucho gusto!',
          audioUrl: '/audio/sofia_booking_es.mp3',
          lang: 'es',
        }
      : {
          text: '📅 Wonderful! You can pick a time that works best for you directly on our online booking calendar at https://www.aidynamic.pro/booking, or call and text us at +1 (786) 643-2099. Jasmel Acosta and our team look forward to speaking with you!',
          audioUrl: '/audio/sofia_booking_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(service|services|offer|what do you do|industry|industries|healthcare|legal|real estate|construction|servicios|ofrecen|hacen|industria|abogado)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🚀 Representamos dos divisiones clave: 1) AI Dynamic Pro (auditorías de IA por $99, recepcionistas de voz 24/7 y automatización) y 2) Medical Billing Miami / MBMB (facturación médica integral, recuperación de reclamos denegados y AI Scribers). ¿En cuál de las dos áreas te podemos apoyar?',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '🚀 We represent two core divisions: 1) AI Dynamic Pro ($99 AI workflow audits, 24/7 voice receptionists, and automation systems) and 2) Medical Billing Miami / MBMB (end-to-end medical billing, claim denial recovery, and AI Scribers). Which area can we assist you with today?',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  if (/\b(hola|epale|épale|buenas|pana|chamo|saludos|hello|hi|hey|good morning|good afternoon)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '👋 ¡Hola, buenas! Gracias por comunicarte con las oficinas de AI Dynamic Pro y Medical Billing Miami. Te atiende Sofía, tu asistente ejecutiva con IA. Podemos hablar en español o en inglés. ¿En qué te podemos colaborar hoy?',
          audioUrl: '/audio/sofia_call_answer_es.mp3',
          lang: 'es',
        }
      : {
          text: '👋 Hello! Thank you for reaching out to the offices of AI Dynamic Pro and Medical Billing Miami. This is Sofia, your AI executive assistant. We can speak in English or Spanish. How can we help you today?',
          audioUrl: '/audio/sofia_call_answer_en.mp3',
          lang: 'en',
        };
  }

  return isSpanish
    ? {
        text: '¡Con mucho gusto te ayudo! Atendemos tanto proyectos de Inteligencia Artificial y automatización ($99 Audit) como servicios de facturación médica integral (Medical Billing Miami / MBMB). Cuéntame, ¿qué reto te gustaría resolver en tu negocio hoy? https://www.aidynamic.pro/booking',
        audioUrl: '/audio/sofia_default_es.mp3',
        lang: 'es',
      }
    : {
        text: "I'd love to help! We support both AI automation engineering ($99 Audits, voice receptionists) and healthcare revenue cycle management through Medical Billing Miami (MBMB). Tell me, what challenges are you looking to solve in your business? Book a call at https://www.aidynamic.pro/booking",
        audioUrl: '/audio/sofia_default_en.mp3',
        lang: 'en',
      };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history = [], prompt = '' } = req.body || {};
    const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    const openaiKey = process.env.OPENAI_API_KEY || '';

    // 1. If Gemini API Key is configured on the server, generate dynamic response
    if (geminiKey && prompt !== 'test') {
      try {
        const contents = [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Understood. I am Sofía, the bilingual AI Executive Receptionist for AI Dynamic Pro.' }] },
          ...history,
          { role: 'user', parts: [{ text: prompt }] },
        ];
        const gRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: { temperature: 0.65, maxOutputTokens: 220 },
            }),
          }
        );
        if (gRes.ok) {
          const data = await gRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text) {
            const isEs = /[áéíóúñ¿¡]/i.test(text);
            return res.status(200).json({
              text,
              audioUrl: `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(text)}`,
              lang: isEs ? 'es' : 'en',
              provider: 'gemini',
            });
          }
        }
      } catch (e) {
        console.warn('[Chat API] Gemini fallback:', e.message);
      }
    }

    // 2. If OpenAI API Key is configured on the server
    if (openaiKey && prompt !== 'test') {
      try {
        const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...history.map(h => ({
                role: h.role === 'model' ? 'assistant' : 'user',
                content: h.parts?.[0]?.text || '',
              })),
              { role: 'user', content: prompt },
            ],
            max_tokens: 200,
            temperature: 0.65,
          }),
        });
        if (oaRes.ok) {
          const data = await oaRes.json();
          const text = data.choices?.[0]?.message?.content?.trim();
          if (text) {
            const isEs = /[áéíóúñ¿¡]/i.test(text);
            return res.status(200).json({
              text,
              audioUrl: `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(text)}`,
              lang: isEs ? 'es' : 'en',
              provider: 'openai',
            });
          }
        }
      } catch (e) {
        console.warn('[Chat API] OpenAI fallback:', e.message);
      }
    }

    // 3. Smart Bilingual Receptionist Intent Router with Studio Neural Human Voice MP3s
    const matched = matchIntentAndStudioAudio(prompt);
    return res.status(200).json({
      text: matched.text,
      audioUrl: matched.audioUrl,
      lang: matched.lang,
      provider: 'sofia-neural-engine',
    });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    const matched = matchIntentAndStudioAudio('');
    return res.status(200).json(matched);
  }
}
