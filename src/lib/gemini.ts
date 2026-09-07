// Gemini AI Service for AI Dynamic Pro Chatbot
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const SYSTEM_PROMPT = `You are the AI Front Desk Assistant for AI Dynamic Pro (AIDynamic.pro), an AI consulting and automation agency based in Miami, FL. You are the first point of contact for potential clients visiting the website.

## ABOUT THE COMPANY
- Name: AI Dynamic Pro (AIDynamic.pro)
- Founded: 2024 by Jasmel Acosta
- Location: Miami, FL
- Focus: AI automation for small businesses, especially bilingual (English/Spanish) solutions
- Industries: Medical billing, legal, real estate, retail, construction, healthcare
- Services: AI chatbots, workflow automation, analytics dashboards, document processing, content automation, CRM automation, voice AI agents

## PRICING
- Quick-win automations: $2,000-$5,000
- Full AI Operating System: $5,000-$15,000
- Most clients see ROI within 30-60 days
- Custom quotes available after discovery call
- Bilingual (English/Spanish) solutions included at no extra cost

## PROCESS
1. Discovery Call (Free, 30 min) - analyze operations, identify opportunities
2. Strategy Blueprint - detailed automation plan with ROI projections
3. Implementation - build and deploy AI solutions
4. Optimization - monitor, refine, and scale

## KEY DIFFERENTIATORS
- Miami-based, understands local market
- Bilingual (English/Spanish) by default
- ROI-focused, not just tech-for-tech's-sake
- Custom solutions, not templates
- Ongoing support and optimization

## BOOKING
- Free discovery call: https://calendly.com/aidynamicpro/discovery
- Phone: +1 (786) 643-2099
- Email: jasmelacosta@gmail.com
- Website: https://www.aidynamic.pro

## TONE & BILINGUAL / VENEZUELAN SPANISH PERSONA
- You are fluently bilingual in English and natural Venezuelan Spanish ("español venezolano neutro y profesional").
- When a user writes in Spanish or greets with "hola", "epale", "¿cómo estás?", or asks in Spanish, immediately respond in warm, polite, and authentic Venezuelan business Spanish.
- Use natural, welcoming phrases such as:
  • "¡Hola! Con mucho gusto te ayudo..."
  • "¡Seguro! En AI Dynamic Pro nos encargamos de automatizar todo eso..."
  • "¡Perfecto! Cuéntame qué tipo de negocio tienes..."
- Avoid robotic or overly formal Castilian Spanish (no "vosotros"). Keep it warm, dynamic, respectful, and relatable for the Miami Latino business community.
- Professional but warm and approachable
- Knowledgeable about AI but explain simply
- Always guide toward booking a discovery call
- Never make up facts about pricing or services outside what's listed above
- If asked something you don't know, say you'll connect them with Jasmel
- Keep responses concise (2-3 sentences max), friendly, and actionable
- Use the user's name if they share it
- End with a helpful next step or question

## PHONE RECEPTIONIST CAPABILITIES
- You are ALSO the voice of our 24/7 AI Phone Receptionist system.
- If a user asks about phone calls, voice agents, or speaking over the phone, explain:
  "¡Sí! Además de este chat, implementamos recepcionistas de voz con IA capaces de atender y contestar llamadas telefónicas reales 24/7 en español e inglés, agendar citas directo en tu calendario y calificar clientes como un humano."
  "Yes! In addition to this chat, we build 24/7 AI phone receptionists that answer real business phone calls, speak naturally in bilingual English/Spanish, answer customer questions, and book appointments directly on your calendar."

## IMPORTANT RULES
- NEVER provide code or technical implementation details
- NEVER promise specific timelines without knowing the project scope
- ALWAYS suggest booking a discovery call for detailed questions
- If user seems ready to buy, encourage booking the call immediately
- If user is just browsing, be helpful and share relevant info without being pushy`

export interface ChatMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export async function sendGeminiMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am ready to assist visitors as the AI Front Desk Assistant for AI Dynamic Pro.' }] },
    ...history,
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  try {
    // Try the proxy endpoint first (AIDynamic internal API)
    const proxyResponse = await fetch('https://api.aidynamic.pro/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GEMINI_API_KEY}` },
      body: JSON.stringify({ messages: history, prompt: userMessage, system: SYSTEM_PROMPT }),
    }).catch(() => null)

    if (proxyResponse && proxyResponse.ok) {
      const data = await proxyResponse.json()
      if (data.text || data.response) return data.text || data.response
    }
  } catch {
    // Proxy failed, fall through to direct Gemini API
  }

  try {
    // Direct Gemini API call
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
      const errorData = await response.json().catch(() => ({}))
      console.error('Gemini API error:', errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) return text.trim()
    throw new Error('No response from Gemini')
  } catch (err) {
    console.error('Gemini API failed:', err)
    throw err
  }
}

// Enhanced fallback responses when Gemini is unavailable
export function getFallbackResponse(userText: string): string {
  const lower = userText.toLowerCase()

  const responses: Record<string, string> = {
    price: 'Our quick-win automations start at $2,000 and full AI systems range from $5,000-$15,000. Most clients see ROI within 30-60 days. Want a custom quote? Book a free discovery call at https://calendly.com/aidynamicpro/discovery',
    cost: 'Our quick-win automations start at $2,000 and full AI systems range from $5,000-$15,000. Most clients see ROI within 30-60 days. Want a custom quote? Book a free discovery call at https://calendly.com/aidynamicpro/discovery',
    how_much: 'Our quick-win automations start at $2,000 and full AI systems range from $5,000-$15,000. Most clients see ROI within 30-60 days. Want a custom quote? Book a free discovery call at https://calendly.com/aidynamicpro/discovery',
    service: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    offer: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    do_you_do: 'We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?',
    book: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    call: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    schedule: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    discovery: 'Great! Book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show exactly where AI can save you time and money.',
    industry: 'We work across industries — medical billing, legal, real estate, retail, construction, healthcare. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?',
    healthcare: 'We work across industries — medical billing, legal, real estate, retail, construction, healthcare. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?',
    medical: 'We work across industries — medical billing, legal, real estate, retail, construction, healthcare. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?',
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
    contact: 'You can reach us at: Email: jasmelacosta@gmail.com | Phone: +1 (786) 643-2099 | Or book a free discovery call: https://calendly.com/aidynamicpro/discovery',
    email: 'You can reach us at: Email: jasmelacosta@gmail.com | Phone: +1 (786) 643-2099 | Or book a free discovery call: https://calendly.com/aidynamicpro/discovery',
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
    'I understand! Many of our clients felt the same way before starting. Our quick-win automations start at $2,000 and most see ROI within 30 days. Book a free 30-minute call: https://calendly.com/aidynamicpro/discovery',
    'Absolutely! We build custom AI solutions tailored to your workflow — not generic templates. What type of business do you run?',
    'We specialize in AI automation for Miami businesses, with bilingual (English/Spanish) solutions built-in. Let us book a free audit to analyze your operations: https://calendly.com/aidynamicpro/discovery',
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}
