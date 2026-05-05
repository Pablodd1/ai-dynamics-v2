import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'ai', text: "👋 Hi! I'm your AI Front Desk Assistant. I can help you learn about our automation services, pricing, or book a discovery call. What would you like to know?" }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-link URLs in text
  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-accent-400 hover:text-accent-300 break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  const getResponse = (lowerText: string): string => {
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('how much')) {
      return "Our quick-win automations start at $2,000. A full AI Operating System typically ranges from $5,000-$15,000. Most clients see ROI within 30-60 days. Would you like to book a free discovery call to discuss your specific needs?"
    } else if (lowerText.includes('service') || lowerText.includes('offer') || lowerText.includes('do you do')) {
      return "We build AI chatbots, workflow automation, analytics dashboards, document processing, and content automation. All tailored to your business — not generic templates. Which area interests you most?"
    } else if (lowerText.includes('book') || lowerText.includes('call') || lowerText.includes('schedule') || lowerText.includes('discovery')) {
      return "Great! You can book a free 30-minute discovery call at https://calendly.com/aidynamicpro/discovery. Jasmel will analyze your operations and show you exactly where AI can save you time and money."
    } else if (lowerText.includes('industry') || lowerText.includes('healthcare') || lowerText.includes('medical') || lowerText.includes('legal') || lowerText.includes('real estate')) {
      return "We work across industries — medical billing, legal, real estate, retail, and more. We build bilingual (English/Spanish) solutions for Miami businesses. What's your industry?"
    } else {
      const responses = [
        "Thanks for reaching out! I'd be happy to help with that. Could you tell me more about your business so I can give you the best recommendation?",
        "Great question! Based on what we typically see with businesses like yours, an AI chatbot combined with workflow automation would likely save you 15-20 hours per week. Would you like to book a free discovery call?",
        "I understand! Many of our clients felt the same way before starting. Our quick-win automations start at $2,000 and most see ROI within 30 days. Would you like me to connect you with Jasmel for a free 30-minute call?",
        "Absolutely! We specialize in bilingual (English/Spanish) AI solutions for Miami businesses. We can definitely build a system that matches your specific workflow. What's the best way to reach you?",
        "We work with businesses across industries — medical billing, real estate, retail, legal, and more. Our process starts with a free audit where we analyze your operations and identify the highest-ROI automation opportunities. Would you like to schedule one?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userText = input.trim()
    setMessages(prev => [...prev, { type: 'user', text: userText }])
    setInput('')

    setTimeout(() => {
      const response = getResponse(userText.toLowerCase())
      setMessages(prev => [...prev, { type: 'ai', text: response }])
    }, 1000 + Math.random() * 500)
  }

  const suggestions = [
    "What services do you offer?",
    "How much does it cost?",
    "Book a discovery call",
    "Do you work with my industry?"
  ]

  return (
    <>
      {/* Floating AI Button — BIGGER (72px) */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
            >
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-semibold text-white shadow-xl">
                💬 AI Front Desk
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/40 flex items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 8px 32px rgba(139, 92, 246, 0.4)',
              '0 8px 32px rgba(139, 92, 246, 0.6), 0 0 0 10px rgba(139, 92, 246, 0.1)',
              '0 8px 32px rgba(139, 92, 246, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-7 h-7" />
          {/* Ping animation */}
          <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-30" />
        </motion.button>
      </div>

      {/* Chat Modal — BIGGER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[100px] right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[70vh] rounded-2xl border border-white/10 bg-dark-50/98 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary-600/20 to-accent-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">AI Front Desk Assistant</h4>
                  <span className="text-xs text-accent-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium rounded-br-md'
                        : 'bg-white/5 text-luxury-champagne border border-white/5 rounded-bl-md'
                    }`}
                  >
                    {linkifyText(msg.text)}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setMessages(prev => [...prev, { type: 'user', text: suggestion }])
                    setTimeout(() => {
                      const response = getResponse(suggestion.toLowerCase())
                      setMessages(prev => [...prev, { type: 'ai', text: response }])
                    }, 800)
                  }}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-primary-600/30 border border-white/10 hover:border-primary-500/30 text-white/70 hover:text-white transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all text-sm"
              />
              <button
                onClick={handleSend}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAssistantWidget
