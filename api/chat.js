// Serverless API Endpoint: /api/chat
// Powers JAss — AI Dynamic Pro's 24/7 Bilingual AI Front Desk Assistant (Text & Live Internet Voice Calls)
// Focus: AI Consulting, Custom App Development Solutions, and Corporate Staff Training

const SYSTEM_PROMPT = `You are JAss, the 24/7 Bilingual AI Front Desk Assistant and Executive Receptionist for AI Dynamic Pro (AIDynamic.pro) in Miami, FL, founded and led by Jasmel Acosta (Founder & Applied AI Systems Architect).
Your role: Be welcoming, highly professional, friendly, and helpful to potential clients visiting the website.
Tone: Concise (2 to 3 sentences maximum), natural, and executive so your answers sound great whether read in chat or spoken aloud on an internet voice call.
Bilingual: Fluent English and warm, natural Venezuelan / Latin American business Spanish ("español latino cálido, ejecutivo y profesional").

CORE SERVICES & 4-TIER COMPETITIVE PRICING:
1. Executive AI Consultation & Efficiency Audit (Two-Speed Front Door):
   - Free 15-Minute Executive Triage Call OR $99 Full 60-Min Department AI Efficiency Audit (normally $500) at https://www.aidynamic.pro/booking
   - Includes a Free 48-Hour Live AI Voice/Workflow Prototype customized for their business.
   - Zero-Risk Guarantee: Guaranteed to uncover at least $2,500+/month ($30,000/year) in manual payroll savings they can automate immediately, or they pay $0 (100% of the $99 is credited toward any solution or training).

2. Corporate AI Staff Bootcamp ($497 Half-Day Team Workshop, normally $1,500):
   - Fast-entry team training for up to 15 staff members (on-site in South Florida or live virtual, English & Spanish).
   - Role-specific AI workflows, enterprise data privacy guardrails, and custom SOPs so 1 trained employee produces the output of 5.

3. Custom AI Solution & 24/7 Agent ($997 Turnkey Build OR $297/mo All-Inclusive Managed AI):
   - 14-day turnkey deployment of a 24/7 Bilingual AI Voice & Web Receptionist (JAss) or 1 high-impact automated intake, CRM, or billing workflow.
   - Autonomous AI Agents, RAG document search, and Computer Vision.

4. Full Enterprise AI Transformation ($4,900 – $15,000+):
   - Multi-department custom AI software, ERP/EHR/CRM architecture, dedicated AI Systems Architect, and includes the Corporate AI Staff Bootcamp free.
   - Backed by 21 deployed production platforms across Healthcare, Legal, Construction/AEC, Real Estate, and Logistics.

ESCALATION & HUMAN HANDOFF PROTOCOL:
- If a visitor asks to speak with human staff, an engineer, a representative, or founder Jasmel Acosta, OR if they ask a question outside your scope:
  Politely provide the direct contact channels:
  • Direct Phone / Text: +1 (786) 643-2099
  • Direct Email: jasmel@aidynamic.pro (or jasmelacosta@gmail.com)
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
          text: '👤 ¡Con mucho gusto te comunico con nuestro equipo! Puedes llamar o escribir al ingeniero Jasmel Acosta al +1 (786) 643-2099, escribir a jasmel@aidynamic.pro, o agendar directamente en https://www.aidynamic.pro/booking. Si me dejas tu nombre y teléfono aquí, le avisaré de inmediato.',
          audioUrl: '/audio/sofia_booking_es.mp3',
          lang: 'es',
        }
      : {
          text: '👤 I would be happy to connect you with our team! You can call or text Jasmel Acosta directly at +1 (786) 643-2099, email jasmel@aidynamic.pro, or schedule at https://www.aidynamic.pro/booking. If you leave your name and number here, I will notify him right away!',
          audioUrl: '/audio/sofia_booking_en.mp3',
          lang: 'en',
        };
  }

  // 2. Custom App Development & Solutions
  if (/\b(app|application|development|software|system|build|coding|web app|mobile app|agent|vision|desarrollo|aplicación|aplicacion|sistema|programar|construir|plataforma)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '💻 En AI Dynamic Pro desarrollamos soluciones de IA a medida en 14 días: desde agentes autónomos 24/7 hasta automatización de CRM y facturación. Un sistema llave en mano comienza en $997 (o $297/mes todo incluido) y transformaciones empresariales desde $4,900. Agenda tu prototipo gratis en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '💻 At AI Dynamic Pro, we engineer custom AI solutions in 14 days—from 24/7 autonomous agents to CRM and billing automation. Turnkey builds start at $997 (or $297/mo all-inclusive managed AI), and full enterprise transformations from $4,900+. Claim your free 48-hour prototype at https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  // 3. 24/7 AI Receptionist / Phone / Voice
  if (/\b(phone|call|receptionist|voice|ring|llamada|llamar|recepcionista|teléfono|telefono|voz)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '📞 ¡Claro que sí! Desplegamos recepcionistas de voz y chat con IA (como yo, JAss) que atienden tus llamadas 24/7 en español e inglés desde el primer repique por $997 llave en mano o $297/mes todo incluido. Además, te armamos un prototipo en vivo en 48 horas. Agenda en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_phone_es.mp3',
          lang: 'es',
        }
      : {
          text: "📞 Just like you're hearing my voice right now, we deploy 24/7 bilingual AI voice and web receptionists that answer on the first ring and book appointments into your calendar—for $997 turnkey or $297/mo managed, including a free 48-hour live prototype! Book at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_phone_en.mp3',
          lang: 'en',
        };
  }

  // 4. Consulting & $99 Workflow Audit
  if (/\b(audit|consulting|consultoría|consultoria|auditoría|auditoria|99|\$99|bottleneck|cuello)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '⚡ Puedes agendar una llamada ejecutiva de 15 min gratis o nuestra Auditoría Profunda de 60 min por $99 (incluye un prototipo IA en 48 horas). Garantizamos encontrar al menos $2,500+/mes en ahorros de nómina automatizables o pagas $0. Resérvala en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_audit_es.mp3',
          lang: 'es',
        }
      : {
          text: '⚡ You can book a Free 15-Minute Executive Triage Call or our 60-minute $99 Efficiency Audit (which includes a Free 48-Hour Live AI Prototype). We guarantee to uncover at least $2,500+/month in payroll savings or you pay $0! Lock in your spot at https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_audit_en.mp3',
          lang: 'en',
        };
  }

  // 5. Pricing & Packages
  if (/\b(price|pricing|cost|how much|cuánto|cuanto|precio|cuesta|tarifa|planes)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '💼 Tenemos 4 opciones claras: 1) Llamada de 15 min Gratis o Auditoría de $99 (garantía de ahorrar $2,500+/mes o pagas $0), 2) Bootcamp Corporativo de IA para tu personal por $497, 3) Solución IA o Agente 24/7 por $997 (o $297/mes), y 4) Transformación Empresarial desde $4,900. Agenda en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_pricing_es.mp3',
          lang: 'es',
        }
      : {
          text: "💼 We offer 4 transparent tiers: 1) Free 15-Min Triage Call or $99 Full Audit (guaranteed to find $2,500+/mo in payroll savings or $0), 2) $497 Corporate AI Staff Bootcamp, 3) $997 Turnkey AI Solution or $297/mo Managed Agent, and 4) Enterprise AI Transformation from $4,900+. Book at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_pricing_en.mp3',
          lang: 'en',
        };
  }

  // 6. Corporate Staff Training
  if (/\b(train|training|staff|team|employees|upskill|workshop|bootcamp|entrenamiento|personal|equipo|capacitación|capacitacion)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🎓 ¡Por supuesto! Nuestro Bootcamp Corporativo de IA cuesta solo $497 (taller intensivo de medio día para hasta 15 empleados, presencial en el Sur de la Florida o virtual). Entrenamos a tu equipo con SOPs de IA para que 1 empleado produzca el trabajo de 5. Agenda en https://www.aidynamic.pro/booking',
          audioUrl: '/audio/sofia_training_es.mp3',
          lang: 'es',
        }
      : {
          text: "🎓 Absolutely! Our Corporate AI Staff Bootcamp is just $497 for a half-day team workshop (up to 15 staff members, on-site in South Florida or virtual). We equip your team with role-specific AI SOPs so 1 trained employee produces the output of 5. Schedule at https://www.aidynamic.pro/booking",
          audioUrl: '/audio/sofia_training_en.mp3',
          lang: 'en',
        };
  }

  // 7. Booking & Appointments
  if (/\b(book|schedule|appointment|calendar|meeting|discovery|cita|agendar|reservar|reunión|reunion)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '📅 ¡Excelente! Puedes elegir tu llamada ejecutiva de 15 min gratis o tu Auditoría de $99 directamente en https://www.aidynamic.pro/booking, o llamarnos al +1 (786) 643-2099. ¡El ingeniero Jasmel Acosta y nuestro equipo te atenderán con mucho gusto!',
          audioUrl: '/audio/sofia_booking_es.mp3',
          lang: 'es',
        }
      : {
          text: '📅 Wonderful! You can schedule your Free 15-Minute Executive Triage Call or $99 Audit directly on our calendar at https://www.aidynamic.pro/booking, or call and text us at +1 (786) 643-2099. Jasmel Acosta and our team look forward to speaking with you!',
          audioUrl: '/audio/sofia_booking_en.mp3',
          lang: 'en',
        };
  }

  // 8. General Services Overview
  if (/\b(service|services|offer|what do you do|industry|industries|servicios|ofrecen|hacen|industria)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '🚀 En AI Dynamic Pro ayudamos a empresas a reducir costos y automatizar todo lo posible: 1) Consultoría y Auditoría IA ($99 o llamada 15m gratis + prototipo en 48h), 2) Soluciones IA y Agentes 24/7 ($997 o $297/mes), y 3) Bootcamp de IA para Personal ($497). ¿Cuál te gustaría explorar?',
          audioUrl: '/audio/sofia_services_es.mp3',
          lang: 'es',
        }
      : {
          text: '🚀 At AI Dynamic Pro, we cut operating costs and automate everything possible through: 1) Executive AI Consultation (Free 15m Call or $99 Audit + Free 48h Prototype), 2) Custom AI Solutions & 24/7 Agents ($997 turnkey or $297/mo), and 3) $497 Corporate AI Staff Bootcamps. Which area would you like to explore?',
          audioUrl: '/audio/sofia_services_en.mp3',
          lang: 'en',
        };
  }

  // 9. Greetings
  if (/\b(hola|epale|épale|buenas|pana|chamo|saludos|hello|hi|hey|good morning|good afternoon)\b/i.test(lower)) {
    return isSpanish
      ? {
          text: '👋 ¡Hola, buenas! Gracias por visitar AI Dynamic Pro en Miami. Te atiende JAss, tu asistente ejecutivo con IA. Te puedo orientar sobre consultoría de IA, desarrollo de apps o entrenamiento de personal. ¿Cómo te puedo ayudar hoy?',
          audioUrl: '/audio/sofia_call_answer_es.mp3',
          lang: 'es',
        }
      : {
          text: '👋 Hello! Thank you for visiting AI Dynamic Pro in Miami. This is JAss, your AI executive front desk assistant. I can assist you with AI consulting, custom app development, or corporate staff training. How can I help you today?',
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

// Asynchronously notify founder and log to Supabase CRM if visitor leaves contact info or asks for staff
async function notifyFounderIfHandoff(prompt, history) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

  const text = prompt || '';
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/);
  const hasEmail = Boolean(emailMatch);
  const hasPhone = Boolean(phoneMatch);
  const hasHandoffWord = /\b(human|staff|call me|speak with|jasmel|humano|persona|llámame|llamarme|contacto|audit|auditoría|auditoria|consult)\b/i.test(text);

  if (hasEmail || hasPhone || hasHandoffWord) {
    // 1. Save to Supabase CRM (`aidynamic_leads`) if email or phone is present
    if (SUPABASE_KEY && (hasEmail || hasPhone)) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name: 'JAss Chat Visitor',
            email: emailMatch ? emailMatch[0].trim().toLowerCase() : `phone-lead-${Date.now()}@aidynamic.pro`,
            phone: phoneMatch ? phoneMatch[0].trim() : null,
            service_interest: ['JAss Live Chat Inquiry'],
            status: 'new',
            source: 'jass_ai_chat_widget',
            notes: `Chat Message: ${text}`,
          }),
        });
      } catch (sbErr) {
        console.warn('[Chat API] Supabase lead save warning:', sbErr.message);
      }
    }

    // 2. Email instant alert to Jasmel via Brevo
    if (BREVO_API_KEY) {
      try {
        let resolvedSender = process.env.BREVO_SENDER_EMAIL || 'jasmel@aidynamic.pro';
        try {
          const sdrR = await fetch('https://api.brevo.com/v3/senders', {
            headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
          }).catch(() => null);
          if (sdrR && sdrR.ok) {
            const sdrD = await sdrR.json();
            const active = (sdrD.senders || []).filter((s) => s && s.active && s.email);
            const aiDyn = active.find((s) => s.email.toLowerCase().endsWith('@aidynamic.pro'));
            const gmail = active.find((s) => s.email.toLowerCase() === 'jasmelacosta@gmail.com');
            if (aiDyn) resolvedSender = aiDyn.email;
            else if (gmail) resolvedSender = gmail.email;
            else if (active.length > 0) resolvedSender = active[0].email;
          }
        } catch {}

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'JAss AI Assistant — AI Dynamic Pro', email: resolvedSender },
            replyTo: { email: emailMatch ? emailMatch[0].trim().toLowerCase() : 'jasmelacosta@gmail.com' },
            to: [{ email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' }],
            subject: `🔔 [JAss Live Chat Lead] Visitor Inquiry on AIDynamic.pro`,
            htmlContent: `
              <h2>New Inquiry via JAss AI Assistant on AIDynamic.pro</h2>
              <p><strong>Visitor Message:</strong> ${text}</p>
              <p><strong>Extracted Email:</strong> ${emailMatch ? emailMatch[0] : 'Not provided in this message'}</p>
              <p><strong>Extracted Phone:</strong> ${phoneMatch ? phoneMatch[0] : 'Not provided in this message'}</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <p><strong>Action Recommended:</strong> Check /admin CRM or follow up promptly.</p>
            `,
          }),
        });
      } catch (e) {
        console.warn('[Chat API] Lead notification error:', e.message);
      }
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
    const deepseekKey = process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '';
    const xaiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.VITE_XAI_API_KEY || '';
    const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || '';

    // Trigger asynchronous notification if user leaves details or requests staff
    notifyFounderIfHandoff(prompt, history).catch(() => {});

    const oaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(h => ({
        role: h.role === 'model' ? 'assistant' : 'user',
        content: h.parts?.[0]?.text || '',
      })),
      { role: 'user', content: prompt },
    ];

    // 1. xAI Grok Fast Brain (Priority 1 — grok-3-mini-fast / grok-3-mini)
    if (xaiKey && prompt !== 'test') {
      const grokModels = [process.env.GROK_MODEL, 'grok-3-mini-fast', 'grok-3-mini', 'grok-3-fast'].filter(Boolean);
      for (const grokModel of grokModels) {
        try {
          const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${xaiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: grokModel,
              messages: oaiMessages,
              max_tokens: 190,
              temperature: 0.5,
            }),
          });
          if (grokRes.ok) {
            const data = await grokRes.json();
            const text = (data.choices?.[0]?.message?.content || '')
              .replace(/<think>[\s\S]*?<\/think>/gi, '')
              .trim();
            if (text) {
              const isEs = /[áéíóúñ¿¡]/i.test(text);
              return res.status(200).json({
                text,
                audioUrl: `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(text)}`,
                lang: isEs ? 'es' : 'en',
                provider: grokModel,
              });
            }
          }
        } catch (e) {
          console.warn(`[Chat API] Grok (${grokModel}) call:`, e.message);
        }
      }
    }

    // 2. OpenAI (Priority 2 — gpt-5.4-mini / gpt-4o-mini)
    if (openaiKey && prompt !== 'test') {
      const openAiModels = [process.env.OPENAI_MODEL, 'gpt-5.4-mini', 'gpt-4o-mini'].filter(Boolean);
      for (const modelName of openAiModels) {
        try {
          const isGpt5 = modelName.startsWith('gpt-5');
          const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openaiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: modelName,
              messages: oaiMessages,
              ...(isGpt5 ? { max_completion_tokens: 220 } : { max_tokens: 190, temperature: 0.65 }),
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
          console.warn(`[Chat API] OpenAI (${modelName}) call:`, e.message);
        }
      }
    }

    // 3. DeepSeek V3.2 Fast (Failover if DEEPSEEK_API_KEY is active)
    if (deepseekKey && prompt !== 'test') {
      try {
        const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${deepseekKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: oaiMessages,
            max_tokens: 190,
            temperature: 0.5,
          }),
        });
        if (dsRes.ok) {
          const data = await dsRes.json();
          const text = (data.choices?.[0]?.message?.content || '')
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .trim();
          if (text) {
            const isEs = /[áéíóúñ¿¡]/i.test(text);
            return res.status(200).json({
              text,
              audioUrl: `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(text)}`,
              lang: isEs ? 'es' : 'en',
              provider: 'deepseek-chat',
            });
          }
        }
      } catch (e) {
        console.warn('[Chat API] DeepSeek call:', e.message);
      }
    }

    // 4. Google Gemini 2.0 Flash (Fast fallback)
    if (geminiKey && prompt !== 'test') {
      try {
        const contents = [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Understood. I am JAss, the bilingual AI Front Desk Assistant for AI Dynamic Pro.' }] },
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
      provider: 'jass-neural-engine',
    });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    const matched = matchIntentAndStudioAudio('');
    return res.status(200).json(matched);
  }
}
