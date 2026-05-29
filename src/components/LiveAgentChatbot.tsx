import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight, Mic, MicOff } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  options?: string[];
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
        recognition.continuous = false; // Stop after one phrase so we can answer back-to-back
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleUserInput(transcript, true); // true = from voice
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
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Natural, smooth conversational tone
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      
      // Prioritize premium, natural-sounding browser/OS voices
      const premiumVoice = voices.find(v => 
        (v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Google UK English Male') || v.name.includes('Guy')) && v.lang.startsWith('en')
      );
      
      // Fallback to any decent male voice if premium isn't found
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

  const processIntent = (input: string) => {
    const lowerInput = input.toLowerCase();
    let reply = "I'm sorry, I didn't quite catch that. You can ask me about our services, our pricing tiers like the Macho Matchman, or how to get a free audit!";
    let nextOptions: string[] = ["See Pricing", "Request Free Audit"];

    if (lowerInput.includes("healthcare") || lowerInput.includes("clinic") || lowerInput.includes("medical")) {
      reply = "For healthcare, we deploy 'Agents of Agents' that handle bilingual patient triage, HIPAA-compliant charting, and policy lookups. Want to explore a free audit?";
      nextOptions = ["Request Free Audit", "See Pricing"];
    } else if (lowerInput.includes("legal") || lowerInput.includes("attorney") || lowerInput.includes("law")) {
      reply = "Our legal agents ingest massive documents, audit mutual indemnity anomalies, and cross-reference Florida case law instantly. Shall we schedule a free audit for your firm?";
      nextOptions = ["Request Free Audit", "See Pricing"];
    } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("macho") || lowerInput.includes("sovereign")) {
      reply = "We offer the 'Macho Matchman' integration suite at twenty-five hundred a month, or the full 'Sovereign AI Overlord' with custom private servers at five thousand a month. The first year audit is absolutely free though! Would you like to start there?";
      nextOptions = ["Request Free Audit"];
    } else if (lowerInput.includes("contact") || lowerInput.includes("audit") || lowerInput.includes("free") || lowerInput.includes("schedule")) {
      reply = "Excellent! The first year audit is free. Our human team will reach out within 15 minutes to begin your operational assessment. Just leave your email below!";
      nextOptions = [];
    } else if (lowerInput.includes("robotics") || lowerInput.includes("logistics")) {
      reply = "We integrate OpenAI Vision with IoT hardware to automate warehouse fleet dispatch and inventory audits. Want to explore a free audit for your operations?";
      nextOptions = ["Request Free Audit", "See Pricing"];
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      reply = "Hello there! I'm the AI Dynamic receptionist. How can I help automate your Miami business today?";
    }

    return { reply, nextOptions };
  };

  const handleUserInput = (text: string, fromVoice: boolean = false) => {
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

    // Simulate Agent processing delay
    setTimeout(() => {
      setIsTyping(false);
      const { reply, nextOptions } = processIntent(text);

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'agent', text: reply, options: nextOptions.length > 0 ? nextOptions : undefined }
      ]);
      
      // If the interaction was voice, reply with voice and restart listening
      if (fromVoice) {
        speakResponse(reply, () => {
          // Restart listening for back-to-back conversation
          if (recognitionRef.current && isOpen) {
            try { recognitionRef.current.start(); } catch(e) {}
          }
        });
      }

    }, 1000);
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
                      <>Online <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></>
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
