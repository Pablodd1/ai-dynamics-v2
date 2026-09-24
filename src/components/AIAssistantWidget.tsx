import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, Loader2, Sparkles, Phone, PhoneCall, Settings2, Play } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { sendGeminiMessage, getFallbackResponse, type ChatMessage } from '../lib/gemini'

interface Message {
  type: 'user' | 'ai'
  text: string
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: "👋 ¡Hola! Soy tu Asistente y Recepcionista Virtual de AI Dynamic Pro en Miami. Atiendo chat y llamadas telefónicas 24/7 en español e inglés como un humano. ¿En qué puedo ayudarte hoy?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [geminiAvailable, setGeminiAvailable] = useState<boolean | null>(null)
  const [history, setHistory] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages])

  // Check Gemini availability on mount
  useEffect(() => {
    const checkGemini = async () => {
      try {
        await sendGeminiMessage([], 'test')
        setGeminiAvailable(true)
      } catch {
        setGeminiAvailable(false)
      }
    }
    checkGemini()
  }, [])

  // Speech synthesis setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        // Auto-send after voice input
        setTimeout(() => handleSend(transcript), 200)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')
  const [showVoicePicker, setShowVoicePicker] = useState<boolean>(false)

  // Load available system voices
  useEffect(() => {
    const updateVoices = () => {
      if (!synthRef.current) return
      const vList = synthRef.current.getVoices()
      setAvailableVoices(vList)
      
      // Look for Latin American Spanish or Venezuelan / Mexican / US Spanish first
      const defaultEs = vList.find(v => v.lang.toLowerCase().includes('es-ve')) ||
                        vList.find(v => v.name.toLowerCase().includes('venezuela')) ||
                        vList.find(v => v.lang.toLowerCase().includes('es-419')) ||
                        vList.find(v => v.lang.toLowerCase().includes('es-us')) ||
                        vList.find(v => v.lang.toLowerCase().includes('es-mx')) ||
                        vList.find(v => v.lang.toLowerCase().startsWith('es')) ||
                        vList.find(v => v.name.includes('Google US English')) ||
                        vList[0]
                        
      if (defaultEs && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultEs.voiceURI)
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices
      updateVoices()
    }
  }, [])

  const speak = (text: string, voiceOverrideURI?: string) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    
    // Clean markdown/urls before speaking
    const cleanText = text.replace(/https?:\/\/[^\s]+/g, '').replace(/[*_#`]/g, '').trim()
    if (!cleanText) return

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.05
    utterance.pitch = 1.0
    utterance.volume = 1.0

    const voices = synthRef.current.getVoices()
    const targetURI = voiceOverrideURI || selectedVoiceURI
    const chosenVoice = voices.find(v => v.voiceURI === targetURI) ||
                        voices.find(v => v.lang.toLowerCase().includes('es-419')) ||
                        voices.find(v => v.lang.toLowerCase().startsWith('es')) ||
                        voices[0]

    if (chosenVoice) utterance.voice = chosenVoice
    synthRef.current.speak(utterance)
  }

  const previewVoice = (voice: SpeechSynthesisVoice) => {
    setSelectedVoiceURI(voice.voiceURI)
    setIsVoiceEnabled(true)
    const previewText = voice.lang.toLowerCase().startsWith('es')
      ? "¡Épale! Saludos desde AI Dynamic Pro en Miami. ¿Cómo puedo ayudarte hoy con tu negocio?"
      : "Hello! Welcome to AI Dynamic Pro in Miami. How can our AI receptionist assist you today?"
    speak(previewText, voice.voiceURI)
  }

  const stopSpeaking = () => {
    synthRef.current?.cancel()
  }

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      stopSpeaking()
      setIsVoiceEnabled(false)
    } else {
      setIsVoiceEnabled(true)
    }
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Try Chrome.')
      return
    }
    setIsListening(true)
    setInput('')
    recognitionRef.current.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || input.trim()
    if (!text) return

    const userText = text
    setMessages(prev => [...prev, { type: 'user', text: userText }])
    setInput('')
    setIsLoading(true)

    try {
      let response: string

      if (geminiAvailable) {
        const newHistory: ChatMessage[] = [...history, { role: 'user', parts: [{ text: userText }] }]
        response = await sendGeminiMessage(newHistory, userText)
        setHistory([...newHistory, { role: 'model', parts: [{ text: response }] }])
      } else {
        // Fallback to enhanced rule-based
        response = getFallbackResponse(userText)
      }

      setMessages(prev => [...prev, { type: 'ai', text: response }])
      if (isVoiceEnabled) speak(response)
    } catch (err) {
      const fallback = getFallbackResponse(userText)
      setMessages(prev => [...prev, { type: 'ai', text: fallback }])
      if (isVoiceEnabled) speak(fallback)
    } finally {
      setIsLoading(false)
    }
  }

  const suggestions = [
    "📞 ¿Cómo funciona la recepcionista telefónica?",
    "¿Qué servicios ofrecen?",
    "¿Cuánto cuesta?",
    "Agendar llamada de descubrimiento",
    "How does the AI phone receptionist work?",
  ]

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

  return (
    <>
      {/* Floating AI & Phone Receptionist Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-dark-50/95 backdrop-blur-xl border border-luxury-gold/30 text-white shadow-2xl shadow-primary-900/40 cursor-pointer hover:border-luxury-gold/60 transition-all"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/30 border border-green-500/40 flex items-center justify-center text-green-400">
                <PhoneCall className="w-4 h-4 animate-bounce" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  AI Front Desk & Phone
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[10px] text-luxury-silver">Habla español • Calls & Chat</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => { setIsOpen(!isOpen); stopSpeaking() }}
          className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary-600 via-indigo-600 to-accent-500 text-white shadow-xl shadow-primary-600/40 flex items-center justify-center relative overflow-hidden group"
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
          aria-label="Open AI Assistant and Phone Receptionist"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-emerald-500 border-2 border-dark text-white flex items-center justify-center shadow-md">
              <Phone className="w-3 h-3" />
            </div>
          </div>
          <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-30 pointer-events-none" />
        </motion.button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[100px] right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[75vh] rounded-2xl border border-white/10 bg-dark-50/98 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary-600/25 via-indigo-600/15 to-accent-500/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600/30 border border-primary-500/40 flex items-center justify-center relative">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-sm">AI Receptionist</h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5" /> 24/7 Phone & Web
                    </span>
                  </div>
                  <span className="text-xs text-accent-400 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${geminiAvailable === true ? 'bg-green-400' : geminiAvailable === false ? 'bg-yellow-400' : 'bg-accent-400 animate-pulse'}`} />
                    {geminiAvailable === true ? 'Bilingual Voice Engine • Online' : 'Smart Voice Assistant • Online'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Voice Selection Drawer Toggle */}
                <button
                  onClick={() => setShowVoicePicker(!showVoicePicker)}
                  className={`px-2 py-1.5 rounded-lg flex items-center gap-1 text-xs transition-all ${
                    showVoicePicker ? 'bg-primary-500 text-white' : 'bg-white/5 text-luxury-silver hover:text-white'
                  }`}
                  title="Select and listen to voice models"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Voices</span>
                </button>
                {/* Voice Toggle */}
                <button
                  onClick={toggleVoice}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isVoiceEnabled ? 'bg-accent-500/30 text-accent-300 border border-accent-500/40' : 'bg-white/5 text-white/50 hover:text-white/70'
                  }`}
                  title={isVoiceEnabled ? 'Mute AI voice output' : 'Enable AI voice speech'}
                >
                  {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsOpen(false); stopSpeaking() }}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice Picker Drawer */}
            <AnimatePresence>
              {showVoicePicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-white/10 bg-dark/95 p-3 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-luxury-champagne flex items-center gap-1.5">
                      🎙️ Select AI Receptionist Voice
                    </span>
                    <span className="text-[10px] text-luxury-silver">Click play to hear sample</span>
                  </div>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {/* Filter to Spanish and top English voices */}
                    {availableVoices
                      .filter(v => v.lang.toLowerCase().startsWith('es') || v.lang.toLowerCase().startsWith('en'))
                      .slice(0, 10)
                      .map((voice) => {
                        const isSelected = selectedVoiceURI === voice.voiceURI
                        const isSpanish = voice.lang.toLowerCase().startsWith('es')
                        const isLatin = voice.lang.toLowerCase().includes('419') || voice.lang.toLowerCase().includes('ve') || voice.lang.toLowerCase().includes('us') || voice.lang.toLowerCase().includes('mx')
                        return (
                          <div
                            key={voice.voiceURI}
                            onClick={() => previewVoice(voice)}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-primary-600/30 border-primary-500 text-white font-medium'
                                : 'bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-sm">{isSpanish ? '🇻🇪/🇲🇽' : '🇺🇸'}</span>
                              <div className="truncate">
                                <span className="truncate block font-semibold">{voice.name}</span>
                                <span className="text-[10px] opacity-60">{voice.lang} {isLatin ? '• Latino/Caribe' : ''}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              {isSelected && <span className="text-[9px] bg-primary-500 text-white px-1.5 py-0.5 rounded-full">Active</span>}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  previewVoice(voice)
                                }}
                                className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                                title="Play voice sample"
                              >
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    {availableVoices.length === 0 && (
                      <div className="text-xs text-luxury-silver text-center py-2">
                        Loading system voice synthesizers...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                      <span className="text-sm text-luxury-silver">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setMessages(prev => [...prev, { type: 'user', text: suggestion }])
                    handleSend(suggestion)
                  }}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-primary-600/30 border border-white/10 hover:border-primary-500/30 text-white/70 hover:text-white transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Phone Receptionist Quick Call Bar */}
            <div className="px-4 py-2 border-t border-white/5 bg-emerald-950/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span>Test receptionist over the phone:</span>
              </div>
              <a
                href="tel:+17866432099"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
              >
                +1 (786) 643-2099
              </a>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              {/* Mic Button */}
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 animate-pulse'
                    : 'bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10'
                }`}
                title={isListening ? 'Stop listening' : 'Voice input'}
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                className={`flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all text-sm ${isListening ? 'border-red-500/30' : ''}`}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
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
