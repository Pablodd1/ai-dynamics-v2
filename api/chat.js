// Serverless API Endpoint: /api/chat
// Powers Sofia — AI Dynamic Pro's 24/7 Bilingual AI Front Desk Receptionist (Text & Live Internet Voice Calls)
// Focus: AI Consulting, Custom App Development Solutions, and Corporate Staff Training

const SYSTEM_PROMPT = `You are Sofía, the 24/7 Bilingual AI Front Desk Receptionist for AI Dynamic Pro (AIDynamic.pro) in Miami, FL, founded and led by Jasmel Acosta (Founder & Applied AI Systems Architect).
Your role: Be welcoming, highly professional, friendly, and helpful to potential clients visiting the website.
Tone: Concise (2 to 3 sentences maximum), natural, and executive so your answers sound great whether read in chat or spoken aloud on an internet voice call.
Bilingual: Fluent English and warm, natural Venezuelan / Latin American business Spanish ("español latino cálido, ejecutivo y profesional").

CORE SERVICES & EXPERTISE:
1. AI Consulting & Operational Audits:
   - $99 AI Workflow & Feasibility Audit Special (60-min deep-dive bottleneck analysis + custom ROI blueprint, normally $500).
   - Free 30-Minute Discovery Call at https://www.aidynamic.pro/booking
   - Identifying operational bottlenecks, payroll savings, and automation blueprints.

2. Custom App Development & AI Systems Architecture:
   - Full-stack AI-native web and mobile applications, custom portal development.
   - Autonomous AI Agents, RAG document search, and Computer Vision (YOLO/PyTorch defect detection, 3D LiDAR spatial mapping).
   - 24/7 Bilingual AI Phone & Web Receptionists (sub-second response, calendar booking).
   - Turnkey Packages: $1,000 for single high-impact workflow; $5,000–$15,000+ for enterprise custom architectures.
   - Backed by 22 deployed production platforms across Healthcare, Legal, Construction/AEC, Real Estate, and Logistics.

3. Corporate Staff Training & AI Adoption Workshops:
   - Hands-on team upskilling, practical prompt engineering, enterprise data privacy guardrails, and SOPs to boost productivity 5x.

ESCALATION & HUMAN HANDOFF PROTOCOL:
- If a visitor asks to speak with human staff, an engineer, a representative, or founder Jasmel Acosta, OR if they ask a question outside your scope:
  Politely provide the direct contact channels:
  • Direct Phone / Text: +1 (786) 643-2099
  • Direct Email: jasmelacosta@gmail.com
  • Online Booking Calendar: https://www.aidynamic.pro/booking
  Invite them to leave their name and phone/email right here so Jasmel can be notified and follow up immediately.`;

function matchIntentAndStudioAudio(userText) {
  const lower = (userText || '').toLowerCase();
  const hasSpanishChars = /[áéíóúñ¿¡]/i.test(userText);
  const hasSpanishWords = /\b(hola|epale|épale|buenas|buenos|pana|chamo|gracias|cómo|como|qué|que|cuánto|cuanto|cuesta|precio|español|llamada|llamar|recepcionista|teléfono|telefono|cita|agendar|servicios|auditoría|auditoria|entrenamiento|desarrollo|aplicación|aplicacion|humano|persona|hablar|quiero|necesito|puedo|ustedes|con|para|por|de|en|un|una|los|las|el|la)\b/i.test(lower);
  const isSpanish = hasSpanishChars || hasSpanishWords;

  // 1. Human Escalation / Staff / Cannot Answer
  if (/\b(human|person|staff|agent|representative|engineer|founder|jasmel|speak with someone|talk to someone|call me|humano|persona|representante|ingeniero|fundador|hablar con alguien|comunicarme|atención personalizada)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '👤 ¡Con mucho gusto te comunico con nuestro equipo! Puedes llamar o escribir al ingeniero Jasmel Acosta al +1 (786) 643-2099, escribir a jasmelacosta@gmail.com, o agendar directamente en https://www.aidynamic.pro/booking. Si me dejas tu nombre y teléfono aquí, le avisaré de inmediato.',
          audioUrl: '/audio/sofia_booking_es.mp3',
          lang: 'es',
        }
      : {
          text: '👤 I would be happy to connect you with our team! You can call or text Jasmel Acosta directly at +1 (786) 643-2099, email jasmelacosta@gmail.com, or schedule at https://www.aidynamic.pro/booking. If you leave your name and number here, I will notify him right away!',
          audioUrl: '/audio/sofia_booking_en.mp3',
          lang: 'en',
        };
  }

  // 2. Custom App Development & Solutions
  if (/\b(app|application|development|software|system|build|coding|web app|mobile app|agent|vision|desarrollo|aplicación|aplicacion|sistema|programar|construir|plataforma)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '💻 En AI Dynamic Pro desarrollamos aplicaciones y sistemas de IA a medida: desde agentes autónomos y visión computarizada hasta plataformas web y móviles completas. Un sistema turnkey comienza en $1,000 y desarrollos empresariales desde $5,000. ¿Qué tipo de solución o app te gustaría construir? https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '💻 At AI Dynamic Pro, we engineer custom AI-native apps and software solutions—from autonomous agents and computer vision to scalable web and mobile platforms. Turnkey single builds start at $1,000, and enterprise systems from $5,000+. What kind of application or system are you looking to build? https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  // 3. 24/7 AI Receptionist / Phone / Voice
  if (/\b(phone|call|receptionist|voice|ring|llamada|llamar|recepcionista|teléfono|telefono|voz)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '📞 ¡Claro que sí! Así mismo como me estás escuchando ahora por internet, desplegamos recepcionistas de voz con IA para atender las llamadas reales de tu negocio 24/7 en español e inglés. Contestamos en el primer repique, respondemos preguntas y agendamos citas en tu calendario. ¿Te gustaría implementarlo? Agenda aquí: https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_phone_es.mp3',
          lang: 'es',
        }
      : {
          text: "📞 Just like you're hearing my voice right now, we deploy 24/7 AI voice receptionists that answer your business phone calls on the very first ring in fluent English and Spanish. We qualify leads, answer caller questions, and book appointments into your calendar. Book a demo at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_phone_en.mp3',
          lang: 'en',
        };
  }

  // 4. Consulting & $99 Workflow Audit
  if (/\b(audit|consulting|consultoría|consultoria|auditoría|auditoria|99|\$99|bottleneck|cuello)\b/i.test(lower)) {
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

  // 5. Pricing & Packages
  if (/\b(price|pricing|cost|how much|cuánto|cuanto|precio|cuesta|tarifa|planes)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '💼 Ofrecemos nuestra Auditoría de Flujos de Trabajo por solo $99, o puedes agendar una llamada de descubrimiento de 30 min sin costo. Un sistema turnkey comienza en $1,000, y arquitecturas empresariales desde $5,000. ¿Te agendo tu consulta en https://www.aidynamic.pro/booking?',
          audioUrl: '/audio/sofia_pricing_es.mp3',
          lang: 'es',
        }
      : {
          text: "💼 We offer our comprehensive AI Workflow Audit Special for just $99, or a free 30-minute discovery call. Turnkey single-workflow builds start at $1,000, and custom enterprise systems range from $5,000 to $15,000+. Book at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_pricing_en.mp3',
          lang: 'en',
        };
  }

  // 6. Corporate Staff Training
  if (/\b(train|training|staff|team|employees|upskill|workshop|entrenamiento|personal|equipo|capacitación|capacitacion)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🎓 ¡Por supuesto! Capacitamos al personal de tu empresa con talleres prácticos de adopción de IA: ingeniería de prompts, protocolos de privacidad de datos y ejecución de flujos de trabajo diarios a 5x velocidad. Agenda una sesión en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_training_es.mp3',
          lang: 'es',
        }
      : {
          text: "🎓 Absolutely! We conduct hands-on corporate staff training workshops so your team masters practical prompt engineering, enterprise data privacy guardrails, and daily AI workflows at 5x speed. Schedule a consultation at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_training_en.mp3',
          lang: 'en',
        };
  }

  // 7. Booking & Appointments
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

  // 8. General Services Overview
  if (/\b(service|services|offer|what do you do|industry|industries|servicios|ofrecen|hacen|industria)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🚀 En AI Dynamic Pro nos especializamos en tres áreas: 1) Consultoría y Auditorías de IA ($99 Audit), 2) Desarrollo de Aplicaciones y Sistemas IA a medida (agentes, visión por computadora, recepcionistas 24/7), y 3) Entrenamiento corporativo para personal. ¿Qué área te gustaría explorar?',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '🚀 At AI Dynamic Pro, we specialize in three core areas: 1) AI Consulting & Operational Audits ($99 Audit), 2) Custom App Development & AI Systems (autonomous agents, computer vision, 24/7 voice receptionists), and 3) Corporate Staff Training. Which area would you like to explore?',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  // 9. Greetings
  if (/\b(hola|epale|épale|buenas|pana|chamo|saludos|hello|hi|hey|good morning|good afternoon)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '👋 ¡Hola, buenas! Gracias por visitar AI Dynamic Pro en Miami. Te atiende Sofía, tu recepcionista ejecutiva con IA. Te puedo orientar sobre consultoría de IA, desarrollo de apps o entrenamiento de personal. ¿Cómo te puedo ayudar hoy?',
          audioUrl: '/audio/sofia_call_answer_es.mp3',
          lang: 'es',
        }
      : {
          text: '👋 Hello! Thank you for visiting AI Dynamic Pro in Miami. This is Sofia, your AI executive front desk receptionist. I can assist you with AI consulting, custom app development, or corporate staff training. How can I help you today?',
          audioUrl: '/audio/sofia_call_answer_en.mp3',
          lang: 'en',
        };
  }

  // Default Fallback
  return isSpanish
    ? {
        text: '¡Con mucho gusto te oriento! En AI Dynamic Pro ayudamos a empresas a través de consultoría de IA ($99 Audit), desarrollo de aplicaciones personalizadas y capacitación para equipos. Para atención directa con Jasmel Acosta, llámanos al +1 (786) 643-2099 o agenda en https://www.aidynamic.pro/booking',
        audioUrl: '/audio/sofia_default_es.mp3',
        lang: 'es',
      }
    : {
        text: "I'd love to help! At AI Dynamic Pro, we empower businesses through AI consulting ($99 Audits), custom app and system development, and corporate team training. To speak directly with Jasmel Acosta, call us at +1 (786) 643-2099 or book at https://www.aidynamic.pro/booking",
        audioUrl: '/audio/sofia_default_en.mp3',
        lang: 'en',
      };
}

// Asynchronously notify founder if visitor leaves contact info or asks for staff
async function notifyFounderIfHandoff(prompt, history) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';
  if (!BREVO_API_KEY) return;

  const text = prompt || '';
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/.test(text);
  const hasHandoffWord = /\b(human|staff|call me|speak with|jasmel|humano|persona|llámame|llamarme|contacto)\b/i.test(text);

  if (hasEmail || hasPhone || hasHandoffWord) {
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: 'Sofía Front Desk Receptionist', email: 'receptionist@aidynamic.pro' },
          to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
          subject: `🔔 [Web Chat Lead / Staff Request] Visitor Inquiry on AIDynamic.pro`,
          htmlContent: `
            <h2>New Inquiry on AIDynamic.pro</h2>
            <p><strong>Visitor Message:</strong> ${text}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Action Recommended:</strong> Check chat inquiry or call back promptly.</p>
          `,
        }),
      });
    } catch (e) {
      console.warn('[Chat API] Lead notification error:', e.message);
    }
  }
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

    // Trigger asynchronous notification if user leaves details or requests staff
    notifyFounderIfHandoff(prompt, history).catch(() => {});

    // 1. OpenAI GPT-4o-mini (Primary conversational intelligence)
    if (openaiKey && prompt !== 'test') {
      try {
        const modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini';
        const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...history.map(h => ({
                role: h.role === 'model' ? 'assistant' : 'user',
                content: h.parts?.[0]?.text || '',
              })),
              { role: 'user', content: prompt },
            ],
            max_tokens: 190,
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
              provider: modelName,
            });
          }
        }
      } catch (e) {
        console.warn('[Chat API] OpenAI call:', e.message);
      }
    }

    // 2. Google Gemini 2.0 Flash (Fast fallback)
    if (geminiKey && prompt !== 'test') {
      try {
        const contents = [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Understood. I am Sofía, the bilingual AI Front Desk Receptionist for AI Dynamic Pro.' }] },
          ...history,
          { role: 'user', parts: [{ text: prompt }] },
        ];

        // Try gemini-2.0-flash first
        let gRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: { temperature: 0.65, maxOutputTokens: 200 },
            }),
          }
        );

        // Fallback to gemini-1.5-flash if 2.0 endpoint is unavailable
        if (!gRes.ok) {
          gRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                generationConfig: { temperature: 0.65, maxOutputTokens: 200 },
              }),
            }
          );
        }

        if (gRes.ok) {
          const data = await gRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text) {
            const isEs = /[áéíóúñ¿¡]/i.test(text);
            return res.status(200).json({
              text,
              audioUrl: `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(text)}`,
              lang: isEs ? 'es' : 'en',
              provider: 'gemini-2.0-flash',
            });
          }
        }
      } catch (e) {
        console.warn('[Chat API] Gemini dynamic call:', e.message);
      }
    }

    // 3. Ultra-Fast Zero-Latency Neural Intent Router (Plays studio human voice MP3s instantly)
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
