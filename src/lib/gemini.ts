// Gemini AI Service for AI Dynamic Pro Chatbot
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const SYSTEM_PROMPT = `You are Sofía, the AI Executive Assistant representing both AI Dynamic Pro (AIDynamic.pro) and Medical Billing Miami (MBMB / AIScribers) based in Miami, FL, founded and led by Jasmel Acosta.
You are the primary contact for potential clients visiting our web platforms.

## ABOUT THE ENTERPRISE
- AI Dynamic Pro (AIDynamic.pro): Applied AI systems, custom AI phone receptionists, $99 AI Workflow & Feasibility Audits, turnkey workflow automation ($1,000 to $15,000+), and corporate staff training workshops.
- Medical Billing Miami (MBMB): End-to-end Revenue Cycle Management (RCM), electronic insurance claims submission, denial recovery, aging A/R cleanup, provider credentialing, and complimentary practice billing audits.
- AI Scribers: Ambient clinical documentation AI saving doctors and clinics 2+ hours daily on EHR/EMR charts and SOAP notes.
- Founder & Systems Architect: Jasmel Acosta (15+ years engineering & operations experience).
- Direct Contact: Phone/Text +1 (786) 643-2099 | Email: jasmelacosta@gmail.com | Booking: https://www.aidynamic.pro/booking

## TONE & BILINGUAL PERSONA
- Warm, polite, concise (2-3 sentences max), professional Venezuelan/Latin American Spanish and fluent English.
- Fast, friendly, and actionable. Guide visitors to book a call or review their claims/workflows.`;

export interface ChatMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export interface ChatResponsePayload {
  text: string
  audioUrl: string
  lang: 'es' | 'en'
}

export function getStudioAudioForResponse(userText: string, aiText: string): { audioUrl: string; lang: 'es' | 'en' } {
  const combined = `${userText} ${aiText}`.toLowerCase()
  const isSpanish =
    /[áéíóúñ¿¡]/i.test(aiText) ||
    /\b(hola|con gusto|claro que sí|auditoría|llamadas|recepcionista|empresa|negocio|español|facturación|facturacion|reclamos|médico|medico)\b/i.test(combined)

  if (/\b(billing|mbmb|rcm|claim|claims|reclamo|reclamos|facturación|facturacion|denial|denegacion|credentialing|credencial|credenciales|scriber|scribing|doctor|clínica|clinica)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_services_es.mp3' : '/audio/sofia_services_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(phone|call|receptionist|ring|llamada|recepcionista|repique|teléfono|telefono)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_phone_es.mp3' : '/audio/sofia_phone_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(audit|auditoría|auditoria|\$99|99|bottleneck|cuello)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_audit_es.mp3' : '/audio/sofia_audit_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(price|pricing|cost|\$1,000|\$5,000|precio|cuesta|tarifa|mil dólares)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_pricing_es.mp3' : '/audio/sofia_pricing_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(train|training|staff|upskill|workshop|entrenamiento|personal|capacitación)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_training_es.mp3' : '/audio/sofia_training_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(book|schedule|calendar|appointment|agenda|reservar|cita|veinte noventa y nueve)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_booking_es.mp3' : '/audio/sofia_booking_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(22|veintidós|platforms|plataformas|services|servicios|healthcare|legal)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_services_es.mp3' : '/audio/sofia_services_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(hola|welcome|bienvenido|gracias por llamar|thank you for calling)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_call_answer_es.mp3' : '/audio/sofia_call_answer_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  return { audioUrl: isSpanish ? '/audio/sofia_default_es.mp3' : '/audio/sofia_default_en.mp3', lang: isSpanish ? 'es' : 'en' }
}

export async function sendGeminiMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  // 1. Call our serverless /api/chat endpoint first
  try {
    const apiRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, prompt: userMessage }),
    }).catch(() => null)

    if (apiRes && apiRes.ok) {
      const data = await apiRes.json()
      if (data.text) return data.text
    }
  } catch {
    // Fall through
  }

  // 2. If client GEMINI_API_KEY is present in local dev
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(userMessage)
  }

  const messages: ChatMessage[] = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am ready to assist visitors as the AI Front Desk Assistant for AI Dynamic Pro.' }] },
    ...history,
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
            topP: 0.9,
          },
        }),
      }
    )

    if (!response.ok) {
      return getFallbackResponse(userMessage)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) return text.trim()
    return getFallbackResponse(userMessage)
  } catch {
    return getFallbackResponse(userMessage)
  }
}

// Enhanced fallback responses when Gemini is unavailable
export function getFallbackResponse(userText: string): string {
  const lower = userText.toLowerCase()

  const responses: Record<string, string> = {
    audit: 'Our $99 AI Workflow & Feasibility Audit Special (normally $500) includes a 60-minute deep-dive into your manual bottlenecks, payroll leak calculations, and an actionable automation blueprint. You can book it or start with a free 30-min consultation at https://www.aidynamic.pro/booking',
    training: 'Yes! We conduct hands-on Enterprise Staff Training & AI Adoption workshops — teaching your team industry-specific prompt engineering, data privacy guardrails, and daily AI workflow execution so they operate at 5x speed. Book a consultation at https://www.aidynamic.pro/booking',
    price: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    cost: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    how_much: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    service: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    offer: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    do_you_do: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    book: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    call: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    schedule: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    discovery: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    billing: '🏥 At Medical Billing Miami (MBMB), we handle full Revenue Cycle Management (RCM), insurance claim denial recovery, and provider credentialing. We also provide a complimentary practice billing audit. Call us at +1 (786) 643-2099 or book at https://www.aidynamic.pro/booking',
    mbmb: '🏥 Medical Billing Miami (MBMB) provides full-service medical billing, aging A/R denial recovery, credentialing, and AI Scribers for clinics and physicians across Florida. Schedule a free billing consultation at https://www.aidynamic.pro/booking',
    claim: '🏥 Dealing with denied or delayed insurance claims? Medical Billing Miami specializes in aggressive denial recovery and aging A/R cleanup to boost cash flow. Call +1 (786) 643-2099 or visit https://www.aidynamic.pro/booking',
    claims: '🏥 Dealing with denied or delayed insurance claims? Medical Billing Miami specializes in aggressive denial recovery and aging A/R cleanup to boost cash flow. Call +1 (786) 643-2099 or visit https://www.aidynamic.pro/booking',
    facturacion: '🏥 ¡Hola! En Medical Billing Miami (MBMB) gestionamos todo el ciclo de facturación médica, apelación de reclamos denegados y credencialización con aseguradoras para doctores y clínicas. ¿Deseas una auditoría de facturación gratuita? Contáctanos al +1 (786) 643-2099 o en https://www.aidynamic.pro/booking',
    reclamos: '🏥 ¡Hola! En Medical Billing Miami (MBMB) gestionamos todo el ciclo de facturación médica, apelación de reclamos denegados y credencialización con aseguradoras para doctores y clínicas. ¿Deseas una auditoría de facturación gratuita? Contáctanos al +1 (786) 643-2099 o en https://www.aidynamic.pro/booking',
    credentialing: '🏥 Medical Billing Miami handles provider enrollment and credentialing with Medicare, Medicaid, and private commercial payers, accelerating approvals for practices. Contact us at +1 (786) 643-2099 or https://www.aidynamic.pro/booking',
    scriber: '🩺 AI Scribers provides ambient clinical voice AI that captures patient visits and drafts complete EHR-ready SOAP notes in seconds, saving doctors 2+ hours daily. Book a live demo at https://www.aidynamic.pro/booking',
    scribing: '🩺 AI Scribers provides ambient clinical voice AI that captures patient visits and drafts complete EHR-ready SOAP notes in seconds, saving doctors 2+ hours daily. Book a live demo at https://www.aidynamic.pro/booking',
    industry: 'We work across industries — medical billing & healthcare (MBMB / AI Scribers), legal, real estate, retail, and construction. What industry is your business in?',
    healthcare: 'In healthcare, we operate Medical Billing Miami (MBMB) for RCM & claims denial recovery, plus AI Scribers for clinical SOAP note generation, and custom HIPAA-compliant workflows. What challenges is your practice facing?',
    medical: 'In healthcare, we operate Medical Billing Miami (MBMB) for RCM & claims denial recovery, plus AI Scribers for clinical SOAP note generation, and custom HIPAA-compliant workflows. What challenges is your practice facing?',
    legal: 'We work across industries — medical billing, legal, real estate, retail, construction, healthcare. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?',
    real_estate: 'We work across industries — medical billing, legal, real estate, retail, construction, healthcare. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?',
    spanish: '¡Hola! Claro que sí, chamo. Todos nuestros sistemas de IA y recepcionistas son 100% bilingües en inglés y español. ¿En qué tipo de negocio te gustaría implementarlo?',
    español: '¡Hola! Claro que sí, chamo. Todos nuestros sistemas de IA y recepcionistas son 100% bilingües en inglés y español. ¿En qué tipo de negocio te gustaría implementarlo?',
    bilingual: 'Yes! All our AI systems and phone receptionists are bilingual (English/Spanish) by default at no extra cost. We built this specifically for Miami businesses. What industry are you in?',
    phone: '📞 ¡Por supuesto! Además de este chat, implementamos Recepcionistas de Voz con IA que atienden llamadas telefónicas reales 24/7 en español e inglés, agendan citas y responden dudas como una persona real. Puedes llamarnos directamente al +1 (786) 643-2099 o agendar una demo en https://calendly.com/aidynamicpro/discovery',
    llamada: '📞 ¡Por supuesto! Implementamos Recepcionistas Telefónicos con IA que contestan llamadas reales 24/7 en español e inglés, agendan citas en tu calendario y atienden a tus clientes como un humano. Llámanos al +1 (786) 643-2099 o agenda una demo aquí: https://calendly.com/aidynamicpro/discovery',
    recepcionista: '📞 ¡Exacto! Nuestras recepcionistas de voz con IA atienden tanto el chat de tu web como llamadas telefónicas 24/7, fluidas y naturales en español e inglés. ¿Te gustaría ver una demostración en vivo?',
    epale: '¡Épale! ¿Cómo estás? Aquí a la orden en AI Dynamic Pro. Te puedo explicar sobre nuestras automatizaciones, recepcionistas de llamadas con IA, o agendar una consulta gratis. ¿Qué negocio tienes?',
    pana: '¡Qué tal, pana! Todo fino por aquí. Cuéntame, ¿qué procesos o tareas repetitivas te gustaría automatizar en tu empresa?',
    buenas: '¡Hola, buenas! Con gusto te oriento. Cuéntame en qué área trabaja tu empresa para mostrarte cómo la IA te puede ahorrar tiempo y dinero.',
    chamo: '¡Saludos! En AI Dynamic Pro ayudamos a dueños de negocios en Miami a automatizar llamadas, leads y soporte 24/7. ¿Qué duda tienes sobre nuestros servicios?',
    miami: 'Yes! We are based in Miami and understand the local market. We specialize in bilingual (English/Spanish) AI solutions and voice phone receptionists for Miami businesses. What industry are you in?',
    process: 'Our process: 1) Free Discovery Call — analyze your operations, 2) Strategy Blueprint — detailed plan with ROI, 3) Implementation — build and deploy, 4) Optimization — monitor and refine. Ready to start?',
    who: 'AI Dynamic Pro was founded by Jasmel Acosta in 2024. We are an AI consulting and automation agency based in Miami, FL. We build custom AI solutions for small businesses. Want to learn more?',
    founder: 'AI Dynamic Pro was founded by Jasmel Acosta in 2024. We are an AI consulting and automation agency based in Miami, FL. We build custom AI solutions for small businesses. Want to learn more?',
    jasmel: 'Jasmel Acosta is the founder of AI Dynamic Pro. He specializes in AI automation for small businesses, especially bilingual solutions for Miami. Book a call with him: https://calendly.com/aidynamicpro/discovery',
    roi: 'Most clients see ROI within 30-60 days. For example, a medical billing client saved 20+ hours/week with our AI automation. Want to see what AI could do for your business?',
    time: 'Most clients see ROI within 30-60 days. For example, a medical billing client saved 20+ hours/week with our AI automation. Want to see what AI could do for your business?',
    hours: 'Most clients see ROI within 30-60 days. For example, a medical billing client saved 20+ hours/week with our AI automation. Want to see what AI could do for your business?',
    chatbot: 'AI chatbots & Voice Receptionists are our core services. We build custom conversational AI that handles customer inquiries, schedules appointments, and answers phone calls — 24/7, in English and Spanish. Interested?',
    automation: 'Workflow automation is our bread and butter. We automate repetitive tasks, integrate your tools, and build AI-powered workflows that save you 10-20 hours per week. Want to see what we can automate for you?',
    dashboard: 'We build real-time analytics dashboards that connect your data sources and give you AI-powered insights. See exactly what is happening in your business at a glance. Want to see a demo?',
    contact: 'You can reach us at: Email: jasmelacosta@gmail.com | Phone: +1 (786) 643-2099 | Telegram: https://t.me/aidynamicpro | Or book a free discovery call: https://calendly.com/aidynamicpro/discovery',
    email: 'You can reach us at: Email: jasmelacosta@gmail.com | Phone: +1 (786) 643-2099 | Telegram: https://t.me/aidynamicpro | Or book a free discovery call: https://calendly.com/aidynamicpro/discovery',
    telegram: 'You can reach us directly on Telegram at https://t.me/aidynamicpro. We are always happy to chat! Or you can book a free discovery call: https://calendly.com/aidynamicpro/discovery',
    hello: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI automation services, phone receptionists, pricing, or book a free discovery call. What brings you here today?',
    hi: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI automation services, phone receptionists, pricing, or book a free discovery call. What brings you here today?',
    hey: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI automation services, phone receptionists, pricing, or book a free discovery call. What brings you here today?',
  }

  // Check for keyword matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (lower.includes(keyword.replace('_', ' '))) return response
  }

  // Default responses
  const defaults = [
    "Thanks for reaching out! I would love to help. To give you the best recommendation, could you tell me what industry you are in and what challenges you are facing?",
    'Great question! Based on what we typically see, an AI chatbot + workflow automation would likely save you 15-20 hours per week. Want to book a free discovery call to discuss your specific needs?',
    'I understand! Many of our clients felt the same way before starting. Our single high-impact workflow builds are $1,000 flat and most see ROI within 30 days. Book a free 30-minute call: https://calendly.com/aidynamicpro/discovery',
    'Absolutely! We build custom AI solutions tailored to your workflow — not generic templates. What type of business do you run?',
    'We specialize in AI automation for Miami businesses, with bilingual (English/Spanish) solutions built-in. Let us book a free audit to analyze your operations: https://calendly.com/aidynamicpro/discovery',
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}
