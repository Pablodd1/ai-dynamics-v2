import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight, Mic, MicOff } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  options?: string[];
}

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';

const SYSTEM_PROMPT = `You are the AI Front Desk Assistant for AI Dynamic Pro (AIDynamic.pro), an AI consulting and automation agency based in Miami, FL.

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

## BOOKING
- Free discovery call: https://calendly.com/aidynamicpro/discovery
- Phone: +1 (786) 643-2099
- Email: jasmelacosta@gmail.com
- Website: https://www.aidynamic.pro

## TONE
- Professional but warm and approachable
- Knowledgeable about AI but explain simply
- Always guide toward booking a discovery call
- Keep responses concise (2-3 sentences max), friendly, and actionable
- End with a helpful next step or question

## IMPORTANT RULES
- NEVER provide code or technical implementation details
- NEVER promise specific timelines without knowing the project scope
- ALWAYS suggest booking a discovery call for detailed questions`;

// Rate limiting (client-side, per session)
let requestCount = 0;
let lastReset = Date.now();
const MAX_REQUESTS_PER_MINUTE = 15;

function checkRateLimit(): boolean {
  const now = Date.now();
  if (now - lastReset > 60000) {
    requestCount = 0;
    lastReset = now;
  }
  requestCount++;
  return requestCount <= MAX_REQUESTS_PER_MINUTE;
}

async function fetchDeepSeekResponse(userMessage: string): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded');
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 300,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('DeepSeek API error:', errorData);
    throw new Error(`DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (text) return text.trim();
  throw new Error('No response from DeepSeek');
}

// Fallback responses when DeepSeek is unavailable
function getFallbackResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("healthcare") || lowerInput.includes("clinic") || lowerInput.includes("medical")) {
    return "For healthcare, we deploy AI agents that handle bilingual patient triage, HIPAA-compliant charting, and policy lookups. Want to explore a free audit?";
  }
  if (lowerInput.includes("legal") || lowerInput.includes("attorney") || lowerInput.includes("law")) {
    return "Our legal agents ingest massive documents, audit mutual indemnity anomalies, and cross-reference Florida case law instantly. Shall we schedule a free audit for your firm?";
  }
  if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("pricing")) {
    return "Our quick-win automations start at $2,000 and full AI systems range from $5,000-$15,000. Most clients see ROI within 30-60 days. Want a custom quote? Book a free discovery call at https://calendly.com/aidynamicpro/discovery";
  }
  if (lowerInput.includes("contact") || lowerInput.includes("audit") || lowerInput.includes("free") || lowerInput.includes("schedule")) {
    return "Excellent! The first year audit is free. Our human team will reach out within 15 minutes to begin your operational assessment. Just leave your email below!";
  }
  if (lowerInput.includes("robotics") || lowerInput.includes("logistics")) {
    return "We integrate OpenAI Vision with IoT hardware to automate warehouse fleet dispatch and inventory audits. Want to explore a free audit for your operations?";
  }
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return "Hello there! I'm the AI Dynamic receptionist. How can I help automate your Miami business today?";
  }
  if (lowerInput.includes("service") || lowerInput.includes("do") || lowerInput.includes("offer")) {
    return "We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation — all tailored to your business. Which area interests you most?";
  }
  if (lowerInput.includes("spanish") || lowerInput.includes("español") || lowerInput.includes("bilingual")) {
    return "¡Sí! Todos nuestros sistemas de IA son bilingües (inglés/español) por defecto. No hay costo adicional. ¿En qué industria trabajas?";
  }
  if (lowerInput.includes("miami")) {
    return "Yes! We are based in Miami and understand the local market. We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. What industry are you in?";
  }
  if (lowerInput.includes("time") || lowerInput.includes("long") || lowerInput.includes("deploy")) {
    return "Typical deployment is 2-4 weeks for a single workflow, and 1-3 months for a full AI transformation. Most clients see ROI within the first 30 days.";
  }

  return "Thanks for reaching out! To give you the best recommendation, could you tell me what industry you are in and what challenges you are facing? Or book a free discovery call at https://calendly.com/aidynamicpro/discovery";
}

export const LiveAgentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: "👋 Hello! I am the AI Dynamic Meta-Agent. I can help you with pricing, industry solutions, or scheduling a free audit. Speak to me or type below!",
      options: ["Healthcare / Clinics", "Legal / Attorney", "Pricing & Audit"]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleUserInput(transcript, true);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    // Preload voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // When widget opens, auto-greet and auto-listen
  useEffect(() => {
    if (isOpen) {
      const greeting = "Hello! I am the AI Dynamic front desk. How can I help you today?";

      // Speak greeting
      speakResponse(greeting, () => {
        // After speaking, immediately start listening
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch(e) {}
        }
      });
    } else {
      // Clean up when closed
      window.speechSynthesis.cancel();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [isOpen]);

  const speakResponse = (text: string, onEndCallback?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();

      const premiumVoice = voices.find(v =>
        (v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Google UK English Male') || v.name.includes('Guy')) && v.lang.startsWith('en')
      );

      const fallbackVoice = voices.find(v =>
        (v.name.includes('Male') || v.name.includes('Arthur') || v.name.includes('Mark')) && v.lang.startsWith('en')
      );

      if (premiumVoice) {
        utterance.voice = premiumVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }

      if (onEndCallback) {
        utterance.onend = onEndCallback;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleUserInput = async (text: string, fromVoice: boolean = false) => {
    if (!text.trim()) return;

    // If user types, stop voice/listening
    if (!fromVoice) {
      window.speechSynthesis.cancel();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }

    // Add user message
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInputText("");

    try {
      // Try DeepSeek AI first
      const reply = await fetchDeepSeekResponse(text);
      const nextOptions = deriveOptions(reply);

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'agent', text: reply, options: nextOptions.length > 0 ? nextOptions : undefined }
      ]);

      // If voice interaction, speak and restart listening
      if (fromVoice) {
        speakResponse(reply, () => {
          if (recognitionRef.current && isOpen) {
            try { recognitionRef.current.start(); } catch(e) {}
          }
        });
      }
    } catch (err) {
      // Fallback to rule-based
      console.error('DeepSeek failed, using fallback:', err);
      const fallbackReply = getFallbackResponse(text);
      const nextOptions = deriveOptions(fallbackReply);

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'agent', text: fallbackReply, options: nextOptions.length > 0 ? nextOptions : undefined }
      ]);

      if (fromVoice) {
        speakResponse(fallbackReply, () => {
          if (recognitionRef.current && isOpen) {
            try { recognitionRef.current.start(); } catch(e) {}
          }
        });
      }
    }
  };

  // Derive suggestion buttons from response text
  const deriveOptions = (reply: string): string[] => {
    const lower = reply.toLowerCase();
    if (lower.includes('audit') || lower.includes('discovery') || lower.includes('call')) {
      return ["Request Free Audit", "See Pricing"];
    }
    if (lower.includes('pricing') || lower.includes('$') || lower.includes('cost')) {
      return ["Request Free Audit", "Contact Us"];
    }
    if (lower.includes('industry') || lower.includes('service')) {
      return ["Healthcare", "Legal", "Real Estate"];
    }
    return ["Request Free Audit"];
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(inputText, false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-gradient-to-br from-[#FF8A00] to-[#E55D00] shadow-2xl shadow-[#FF8A00]/40 flex items-center justify-center border-2 border-[#FF8A00]/50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={28} className="text-black" fill="currentColor" />
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-[#FF8A00]"></span>
        </span>
      </motion.button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[100] w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#18011F] to-[#7621B0] p-4 flex justify-between items-center border-b border-[#B600A8]/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,138,0,0.2),transparent)] pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0C0C0C] flex items-center justify-center border border-[#FF8A00]/50">
                    <Sparkles size={18} className="text-[#FF8A00]" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#18011F]"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white leading-tight uppercase tracking-wide">Voice Receptionist</span>
                  <span className="text-[10px] text-[#D7E2EA]/70 uppercase tracking-widest flex items-center gap-1">
                    {isListening ? (
                      <>Listening <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div></>
                    ) : (
                      <>DeepSeek AI <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></>
                    )}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative z-10"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-[#151515] relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D7E2EA_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>

                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-[#D7E2EA]/20' : 'bg-[#FF8A00]/20 border border-[#FF8A00]/30'
                    }`}>
                      {msg.sender === 'user' ? <User size={12} className="text-[#D7E2EA]" /> : <Bot size={12} className="text-[#FF8A00]" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#D7E2EA]/10 text-[#D7E2EA] rounded-br-none'
                        : 'bg-[#0C0C0C] text-[#D7E2EA] border border-[#D7E2EA]/10 rounded-bl-none shadow-lg'
                    }`}>
                      {msg.text}
                    </div>
                  </div>

                  {msg.options && msg.id === messages[messages.length - 1].id && !isTyping && (
                    <div className="flex flex-col gap-2 mt-3 ml-8 w-[75%]">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt, false)}
                          className="text-left text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-[#B600A8]/10 border border-[#B600A8]/30 text-[#D7E2EA] p-2.5 rounded-xl hover:bg-[#B600A8] hover:text-white transition-all flex justify-between items-center group"
                        >
                          {opt}
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full bg-[#FF8A00]/20 border border-[#FF8A00]/30 shrink-0 flex items-center justify-center">
                    <Bot size={12} className="text-[#FF8A00]" />
                  </div>
                  <div className="bg-[#0C0C0C] border border-[#D7E2EA]/10 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-[38px]">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with Text/Voice Toggle */}
            <div className="p-3 bg-[#0C0C0C] border-t border-[#D7E2EA]/10">
              <form onSubmit={handleTextSubmit} className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      recognitionRef.current?.stop();
                      window.speechSynthesis.cancel();
                    } else {
                      try { recognitionRef.current?.start(); } catch(e) {}
                    }
                  }}
                  className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isListening
                      ? 'bg-red-500/20 text-red-500 border-2 border-red-500 animate-pulse'
                      : 'bg-[#151515] text-[#FF8A00] border border-[#FF8A00]/50 hover:bg-[#FF8A00]/10'
                  }`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Or type here..."
                    className="w-full bg-[#151515] border border-[#D7E2EA]/20 rounded-full py-3 pl-4 pr-12 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#FF8A00]/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF8A00] hover:bg-[#E55D00] rounded-full flex items-center justify-center transition-colors"
                  >
                    <Send size={14} className="text-black -ml-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
