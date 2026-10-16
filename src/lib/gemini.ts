// Gemini AI Service for AI Dynamic Pro Chatbot
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const SYSTEM_PROMPT = `You are JAss, the 24/7 Bilingual AI Front Desk Assistant for AI Dynamic Pro (AIDynamic.pro) in Miami, FL, founded and led by Jasmel Acosta (Founder & Applied AI Systems Architect).
Your role: Be welcoming, highly professional, friendly, and helpful to potential clients visiting the website.
Tone: Concise (2 to 3 sentences max), natural, and executive so your answers sound great whether read in chat or spoken aloud on an internet voice call.
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
    /\b(hola|con gusto|claro que sí|auditoría|llamadas|recepcionista|empresa|negocio|español|desarrollo|app|humano|persona)\b/i.test(combined)

  if (/\b(human|staff|person|representative|engineer|jasmel|humano|persona|representante|ingeniero|fundador)\b/i.test(combined)) {
    return { audioUrl: isSpanish ? '/audio/sofia_booking_es.mp3' : '/audio/sofia_booking_en.mp3', lang: isSpanish ? 'es' : 'en' }
  }
  if (/\b(app|application|development|software|desarrollo|aplicación|aplicacion|sistema|programar)\b/i.test(combined)) {
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
  if (/\b(22|veintidós|platforms|plataformas|services|servicios)\b/i.test(combined)) {
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
  // 1. Call serverless /api/chat endpoint first
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

  // 2. Client-side fallback if GEMINI_API_KEY is present
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(userMessage)
  }

  const messages: ChatMessage[] = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am JAss, the bilingual AI Front Desk Assistant for AI Dynamic Pro.' }] },
    ...history,
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  try {
    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 220,
          },
        }),
      }
    )

    if (!response.ok) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages,
            generationConfig: {
              temperature: 0.65,
              maxOutputTokens: 220,
            },
          }),
        }
      )
    }

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

// Fallback responses when backend is offline
export function getFallbackResponse(userText: string): string {
  const lower = userText.toLowerCase()

  const responses: Record<string, string> = {
    human: '👤 I would be glad to connect you with our team! You can reach founder Jasmel Acosta directly at +1 (786) 643-2099 (call or text), email jasmelacosta@gmail.com, or schedule a 1-on-1 meeting at https://www.aidynamic.pro/booking',
    staff: '👤 I would be glad to connect you with our team! You can reach founder Jasmel Acosta directly at +1 (786) 643-2099 (call or text), email jasmelacosta@gmail.com, or schedule a 1-on-1 meeting at https://www.aidynamic.pro/booking',
    person: '👤 I would be glad to connect you with our team! You can reach founder Jasmel Acosta directly at +1 (786) 643-2099 (call or text), email jasmelacosta@gmail.com, or schedule a 1-on-1 meeting at https://www.aidynamic.pro/booking',
    humano: '👤 ¡Con gusto te comunico con nuestro equipo! Puedes llamar o escribir al ingeniero Jasmel Acosta al +1 (786) 643-2099, enviar un correo a jasmelacosta@gmail.com, o agendar una llamada directa en https://www.aidynamic.pro/booking',
    persona: '👤 ¡Con gusto te comunico con nuestro equipo! Puedes llamar o escribir al ingeniero Jasmel Acosta al +1 (786) 643-2099, enviar un correo a jasmelacosta@gmail.com, o agendar una llamada directa en https://www.aidynamic.pro/booking',
    app: '💻 We build bespoke AI applications, custom web/mobile platforms, autonomous agents, and computer vision systems. Turnkey single systems start at $1,000, and full custom architectures range from $5,000 to $15,000+. Book a consultation at https://www.aidynamic.pro/booking',
    application: '💻 We build bespoke AI applications, custom web/mobile platforms, autonomous agents, and computer vision systems. Turnkey single systems start at $1,000, and full custom architectures range from $5,000 to $15,000+. Book a consultation at https://www.aidynamic.pro/booking',
    desarrollo: '💻 Desarrollamos aplicaciones personalizadas, agentes de IA y sistemas de visión por computadora. Un sistema llave en mano comienza en $1,000 y desarrollos empresariales desde $5,000. ¿Qué aplicación te gustaría construir? Agenda en https://www.aidynamic.pro/booking',
    audit: 'Our $99 AI Workflow & Feasibility Audit Special (normally $500) includes a 60-minute deep-dive into your manual bottlenecks, payroll leak calculations, and an actionable automation blueprint. You can book it or start with a free 30-min consultation at https://www.aidynamic.pro/booking',
    training: 'Yes! We conduct hands-on Enterprise Staff Training & AI Adoption workshops — teaching your team industry-specific prompt engineering, data privacy guardrails, and daily AI workflow execution so they operate at 5x speed. Book a consultation at https://www.aidynamic.pro/booking',
    price: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    cost: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    how_much: 'We offer a Free 30-min Discovery Call, or our $99 Comprehensive AI Workflow Audit Special (60-min deep dive + blueprint). A Single High-Impact Workflow build is $1,000 flat, and comprehensive enterprise architectures range from $5,000-$15,000+. Book at https://www.aidynamic.pro/booking',
    service: 'We specialize in AI Consulting ($99 Audit), Custom App & AI Systems Development, 24/7 AI Voice Phone Receptionists, and Corporate Staff Training. Which area interests you most?',
    offer: 'We specialize in AI Consulting ($99 Audit), Custom App & AI Systems Development, 24/7 AI Voice Phone Receptionists, and Corporate Staff Training. Which area interests you most?',
    book: 'Great! You can book a time directly with Jasmel Acosta on our calendar at https://www.aidynamic.pro/booking or call/text us at +1 (786) 643-2099.',
    call: 'Great! You can book a time directly with Jasmel Acosta on our calendar at https://www.aidynamic.pro/booking or call/text us at +1 (786) 643-2099.',
    schedule: 'Great! You can book a time directly with Jasmel Acosta on our calendar at https://www.aidynamic.pro/booking or call/text us at +1 (786) 643-2099.',
    discovery: 'Great! You can book a time directly with Jasmel Acosta on our calendar at https://www.aidynamic.pro/booking or call/text us at +1 (786) 643-2099.',
    industry: 'We build custom AI applications and automated systems for companies across healthcare, legal, construction/AEC, real estate, and logistics. What industry is your business in?',
    spanish: '¡Hola! Claro que sí. Todos nuestros sistemas de IA y recepcionistas son 100% bilingües en inglés y español. ¿En qué tipo de negocio te gustaría implementarlo?',
    español: '¡Hola! Claro que sí. Todos nuestros sistemas de IA y recepcionistas son 100% bilingües en inglés y español. ¿En qué tipo de negocio te gustaría implementarlo?',
    bilingual: 'Yes! All our AI systems and phone receptionists are bilingual (English/Spanish) by default at no extra cost. We built this specifically for Miami businesses. What industry are you in?',
    phone: '📞 ¡Por supuesto! Además de este chat web, implementamos Recepcionistas de Voz con IA que atienden llamadas telefónicas reales 24/7 en español e inglés, agendan citas y responden dudas como una persona real. Llámanos directamente al +1 (786) 643-2099 o agenda en https://www.aidynamic.pro/booking',
    llamada: '📞 ¡Por supuesto! Implementamos Recepcionistas Telefónicos con IA que contestan llamadas reales 24/7 en español e inglés, agendan citas en tu calendario y atienden a tus clientes como un humano. Llámanos al +1 (786) 643-2099 o agenda en https://www.aidynamic.pro/booking',
    recepcionista: '📞 ¡Exacto! Nuestras recepcionistas de voz con IA atienden tanto el chat de tu web como llamadas telefónicas 24/7, fluidas y naturales en español e inglés. ¿Te gustaría ver una demostración en vivo?',
    epale: '¡Épale! ¿Cómo estás? Aquí a la orden en AI Dynamic Pro. Te puedo explicar sobre consultoría de IA, desarrollo de apps a medida, o agendar una consulta con Jasmel. ¿Qué proyecto tienes en mente?',
    pana: '¡Qué tal, pana! Todo excelente. Cuéntame, ¿qué retos de software o automatización te gustaría resolver en tu empresa?',
    buenas: '¡Hola, buenas! Con gusto te oriento. Cuéntame en qué área trabaja tu empresa para mostrarte cómo nuestras soluciones de IA pueden acelerar tu negocio.',
    chamo: '¡Saludos! En AI Dynamic Pro ayudamos a empresas a través de consultoría de IA, desarrollo de aplicaciones y capacitación para equipos. ¿En qué te puedo colaborar?',
    miami: 'Yes! We are based in Miami, FL. We engineer bilingual AI systems, custom app development, and AI voice receptionists for companies here and worldwide.',
    founder: 'AI Dynamic Pro was founded by Jasmel Acosta, an Applied AI Systems Architect with 15+ years of engineering and operations experience. Contact him at jasmelacosta@gmail.com or +1 (786) 643-2099.',
    jasmel: 'Jasmel Acosta is the founder of AI Dynamic Pro. You can reach him at jasmelacosta@gmail.com, call/text +1 (786) 643-2099, or book a call at https://www.aidynamic.pro/booking',
    contact: 'You can reach us at: Phone/Text: +1 (786) 643-2099 | Email: jasmelacosta@gmail.com | Or book online at https://www.aidynamic.pro/booking',
    email: 'You can email founder Jasmel Acosta directly at jasmelacosta@gmail.com or call/text +1 (786) 643-2099.',
    hello: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI consulting ($99 Audit), custom app development, corporate staff training, or book a call. What brings you here today?',
    hi: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI consulting ($99 Audit), custom app development, corporate staff training, or book a call. What brings you here today?',
    hey: '👋 Hi! Welcome to AI Dynamic Pro. I can help you learn about our AI consulting ($99 Audit), custom app development, corporate staff training, or book a call. What brings you here today?',
  }

  for (const [keyword, response] of Object.entries(responses)) {
    if (lower.includes(keyword.replace('_', ' '))) return response
  }

  const defaults = [
    "I'd love to help! In AI Dynamic Pro, we specialize in AI consulting ($99 Audits), custom app development, and corporate team training. To speak with our team or Jasmel Acosta, call +1 (786) 643-2099 or book at https://www.aidynamic.pro/booking",
    'Great question! Based on your operations, our custom AI application development or $99 Workflow Audit will give you the exact ROI blueprint. Would you like to schedule a free 30-minute discovery call at https://www.aidynamic.pro/booking?',
    'If you have a specific question our AI cannot resolve or want to speak directly with an engineer, please call or text Jasmel Acosta at +1 (786) 643-2099 or email jasmelacosta@gmail.com.',
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}
