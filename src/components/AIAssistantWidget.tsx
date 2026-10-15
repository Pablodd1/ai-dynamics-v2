import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Sparkles,
  Phone,
  PhoneCall,
  PhoneOff,
  Calendar,
} from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { sendGeminiMessage, getFallbackResponse, getStudioAudioForResponse, type ChatMessage } from '../lib/gemini'
import { AnalyticsEvents } from '../lib/analytics'

interface Message {
  type: 'user' | 'ai'
  text: string
  audioUrl?: string
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'call'>('chat')
  const [callLang, setCallLang] = useState<'es' | 'en'>('es')
  const [isCallActive, setIsCallActive] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'speaking' | 'listening' | 'thinking'>('idle')
  const [callSeconds, setCallSeconds] = useState(0)
  const [lastCallTranscript, setLastCallTranscript] = useState(
    '¡Hola, buenas! Gracias por llamar a AI Dynamic Pro en Miami. Te atiende Sofía, tu recepcionista ejecutiva con inteligencia artificial.'
  )
  const [showAttentionGrabber, setShowAttentionGrabber] = useState(false)
  const [grabberDismissed, setGrabberDismissed] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      text: '👋 ¡Hola! Soy Sofía, la Recepcionista Ejecutiva de AI Dynamic Pro en Miami. Te oriento sobre consultoría de IA ($99 Audit), desarrollo de aplicaciones a medida y entrenamiento para tu equipo. ¿En qué te puedo colaborar hoy?',
      audioUrl: '/audio/sofia_call_answer_es.mp3',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [history, setHistory] = useState<ChatMessage[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ringContextRef = useRef<AudioContext | null>(null)
  const isCallActiveRef = useRef(false)
  const callLangRef = useRef<'es' | 'en'>('es')

  // Attention grabber trigger: 2.8s after landing or on scroll
  useEffect(() => {
    try {
      if (sessionStorage.getItem('sofia_grabber_dismissed') === 'true') {
        setGrabberDismissed(true)
        return
      }
    } catch {}

    const timer = setTimeout(() => {
      if (!isOpen && !grabberDismissed) {
        setShowAttentionGrabber(true)
      }
    }, 2800)

    const handleScroll = () => {
      if (window.scrollY > 120 && !isOpen && !grabberDismissed) {
        setShowAttentionGrabber(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, grabberDismissed])

  const dismissAttentionGrabber = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setShowAttentionGrabber(false)
    setGrabberDismissed(true)
    try {
      sessionStorage.setItem('sofia_grabber_dismissed', 'true')
    } catch {}
  }, [])

  useEffect(() => {
    isCallActiveRef.current = isCallActive
  }, [isCallActive])

  useEffect(() => {
    callLangRef.current = callLang
  }, [callLang])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Call duration timer
  useEffect(() => {
    if (!isCallActive) {
      setCallSeconds(0)
      return
    }
    const interval = setInterval(() => {
      setCallSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatCallTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
  }

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if (ringContextRef.current) {
      ringContextRef.current.close().catch(() => {})
      ringContextRef.current = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlayingAudio(false)
  }, [])

  // Play studio human voice MP3 or dynamic /api/tts stream
  const playHumanVoice = useCallback(
    (audioUrl: string, fallbackText?: string, onEndedCallback?: () => void) => {
      stopAudio()
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onplay = () => {
        setIsPlayingAudio(true)
        if (isCallActiveRef.current) setCallStatus('speaking')
      }

      audio.onended = () => {
        setIsPlayingAudio(false)
        if (onEndedCallback) onEndedCallback()
      }

      audio.onerror = () => {
        // Fallback to /api/tts dynamic stream if static path fails
        if (fallbackText && !audioUrl.startsWith('/api/tts')) {
          const isEs = /[áéíóúñ¿¡]/i.test(fallbackText)
          const streamUrl = `/api/tts?lang=${isEs ? 'es' : 'en'}&text=${encodeURIComponent(fallbackText)}`
          const backupAudio = new Audio(streamUrl)
          audioRef.current = backupAudio
          backupAudio.onplay = () => setIsPlayingAudio(true)
          backupAudio.onended = () => {
            setIsPlayingAudio(false)
            if (onEndedCallback) onEndedCallback()
          }
          backupAudio.onerror = () => {
            setIsPlayingAudio(false)
            if (onEndedCallback) onEndedCallback()
          }
          backupAudio.play().catch(() => {
            setIsPlayingAudio(false)
            if (onEndedCallback) onEndedCallback()
          })
        } else {
          setIsPlayingAudio(false)
          if (onEndedCallback) onEndedCallback()
        }
      }

      audio.play().catch(() => {
        setIsPlayingAudio(false)
        if (onEndedCallback) onEndedCallback()
      })
    },
    [stopAudio]
  )

  // Setup browser SpeechRecognition for voice input
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = callLang === 'es' ? 'es-US' : 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript
        if (transcript) {
          setInput(transcript)
          setIsListening(false)
          setTimeout(() => handleSend(transcript), 150)
        }
      }

      recognition.onerror = () => {
        setIsListening(false)
        if (isCallActiveRef.current) setCallStatus('speaking')
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [callLang])

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return
    try {
      stopAudio()
      recognitionRef.current.lang = callLangRef.current === 'es' ? 'es-US' : 'en-US'
      setIsListening(true)
      if (isCallActiveRef.current) setCallStatus('listening')
      recognitionRef.current.start()
    } catch {
      // Already started
    }
  }, [stopAudio])

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop()
    } catch {
      // Ignore
    }
    setIsListening(false)
  }, [])

  // Play realistic US telephone ringback tone (440Hz + 480Hz) for 0.9s before Sofia picks up
  const playPhoneRing = (): Promise<void> => {
    return new Promise((resolve) => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioCtx()
        ringContextRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc2.type = 'sine'
        osc1.frequency.value = 440
        osc2.frequency.value = 480
        gain.gain.value = 0.08

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        setTimeout(() => {
          osc1.stop()
          osc2.stop()
          ctx.close().catch(() => {})
          ringContextRef.current = null
          resolve()
        }, 900)
      } catch {
        setTimeout(resolve, 600)
      }
    })
  }

  // Start interactive Web Voice Call with Sofia
  const startLiveCall = async (selectedLang?: 'es' | 'en') => {
    const langToUse = selectedLang || callLang
    if (selectedLang) setCallLang(selectedLang)

    stopListening()
    stopAudio()
    setIsOpen(true)
    setActiveTab('call')
    setIsCallActive(true)
    setIsVoiceEnabled(true)
    setCallStatus('ringing')
    AnalyticsEvents.openChatbot()

    await playPhoneRing()
    if (!isCallActiveRef.current) return

    const greetingText =
      langToUse === 'es'
        ? '¡Hola, buenas! Gracias por llamar a AI Dynamic Pro en Miami, te atiende Sofía, tu recepcionista ejecutiva con inteligencia artificial. Podemos hablar en español o en inglés. Cuéntame, ¿de qué trata tu negocio y cómo te puedo ayudar hoy?'
        : 'Hello! Thank you for calling AI Dynamic Pro in Miami. This is Sofia, your AI executive receptionist. We can speak in English or Spanish. Tell me a bit about your business—how can I help you today?'

    const greetingAudio =
      langToUse === 'es' ? '/audio/sofia_call_answer_es.mp3' : '/audio/sofia_call_answer_en.mp3'

    setLastCallTranscript(greetingText)
    playHumanVoice(greetingAudio, greetingText, () => {
      if (isCallActiveRef.current) {
        startListening()
      }
    })
  }

  const endLiveCall = () => {
    stopListening()
    stopAudio()
    setIsCallActive(false)
    setCallStatus('idle')
  }

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride || input).trim()
    if (!text) return

    stopListening()
    stopAudio()
    AnalyticsEvents.sendChatMessage(text.length)
    setMessages(prev => [...prev, { type: 'user', text }])
    setInput('')
    setIsLoading(true)
    if (isCallActiveRef.current) setCallStatus('thinking')

    try {
      const newHistory: ChatMessage[] = [...history, { role: 'user', parts: [{ text }] }]
      const responseText = await sendGeminiMessage(newHistory, text)
      setHistory([...newHistory, { role: 'model', parts: [{ text: responseText }] }])

      const { audioUrl } = getStudioAudioForResponse(text, responseText)
      setMessages(prev => [...prev, { type: 'ai', text: responseText, audioUrl }])
      setLastCallTranscript(responseText)

      if (isVoiceEnabled || isCallActiveRef.current) {
        playHumanVoice(audioUrl, responseText, () => {
          if (isCallActiveRef.current) {
            startListening()
          }
        })
      }
    } catch {
      const fallback = getFallbackResponse(text)
      const { audioUrl } = getStudioAudioForResponse(text, fallback)
      setMessages(prev => [...prev, { type: 'ai', text: fallback, audioUrl }])
      setLastCallTranscript(fallback)

      if (isVoiceEnabled || isCallActiveRef.current) {
        playHumanVoice(audioUrl, fallback, () => {
          if (isCallActiveRef.current) {
            startListening()
          }
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const suggestions = [
    '⚡ Auditoría de $99 (Workflow Audit)',
    '💻 Desarrollo de Apps & Sistemas IA',
    '🎓 Entrenamiento de IA para Personal',
    '📞 ¿Cómo funciona la recepcionista 24/7?',
    '👤 Hablar con un Ingeniero / Jasmel',
  ]

  const callQuickPrompts =
    callLang === 'es'
      ? [
          { label: '⚡ Auditoría de $99', prompt: '¿Qué incluye la auditoría de 99 dólares?' },
          { label: '💻 Desarrollo de Apps & IA', prompt: '¿Qué soluciones de desarrollo de aplicaciones y software realizan?' },
          { label: '🎓 Entrenamiento de Personal', prompt: '¿Ofrecen entrenamiento y talleres de IA para mi equipo de trabajo?' },
          { label: '👤 Hablar con Staff / Jasmel', prompt: 'Quiero hablar con una persona del equipo o con Jasmel Acosta' },
        ]
      : [
          { label: '⚡ $99 Workflow Audit', prompt: 'What is included in the $99 workflow audit?' },
          { label: '💻 Custom App Development', prompt: 'What custom application and software development services do you offer?' },
          { label: '🎓 Corporate Staff Training', prompt: 'Do you offer corporate staff AI training workshops?' },
          { label: '👤 Speak with Jasmel / Staff', prompt: 'I want to speak with Jasmel Acosta or an engineer' },
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
      {/* Floating AI Receptionist Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Interactive Attention Grabber Card */}
        <AnimatePresence>
          {showAttentionGrabber && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute bottom-[84px] right-0 w-[310px] sm:w-[350px] p-4 rounded-2xl bg-dark-50/98 backdrop-blur-2xl border border-luxury-gold/50 text-white shadow-2xl shadow-black/90 overflow-hidden"
            >
              {/* Top ambient luxury accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-luxury-gold to-accent-500" />

              {/* Header: Sofía Avatar, Status, Close */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-primary-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                      S
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">Sofía — Asistente IA</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        En Vivo
                      </span>
                    </div>
                    <span className="text-[10px] text-luxury-silver">AI Consulting • App Dev • Training</span>
                  </div>
                </div>

                <button
                  onClick={dismissAttentionGrabber}
                  className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
                  aria-label="Cerrar notificación"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Friendly message */}
              <p className="text-xs text-luxury-champagne leading-relaxed mb-3">
                👋 <strong>¡Hola!</strong> ¿Tienes preguntas sobre consultoría de IA ($99 Audit), desarrollo de aplicaciones a medida o entrenamiento para tu personal? ¡Pruébame en vivo con voz humana o por chat!
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    dismissAttentionGrabber()
                    startLiveCall('es')
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                  <span>Hablar en Vivo</span>
                </button>

                <button
                  onClick={() => {
                    dismissAttentionGrabber()
                    setIsOpen(true)
                    setActiveTab('chat')
                  }}
                  className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-accent-400" />
                  <span>Chatear</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && !showAttentionGrabber && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-dark-50/95 backdrop-blur-xl border border-luxury-gold/40 text-white shadow-2xl shadow-black/60 cursor-pointer hover:border-luxury-gold transition-all"
              onClick={() => startLiveCall('es')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                <PhoneCall className="w-4 h-4 animate-bounce" />
              </div>
              <div className="text-left pr-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Speak with Sofía (AI Receptionist)
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-luxury-champagne">
                  🔊 Real Human Voice • Español & English
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            const next = !isOpen
            setIsOpen(next)
            if (next) {
              AnalyticsEvents.openChatbot()
            } else {
              endLiveCall()
            }
          }}
          className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary-600 via-indigo-600 to-accent-500 text-white shadow-xl shadow-primary-600/40 flex items-center justify-center relative overflow-hidden group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Sofía AI Receptionist (Voice & Chat)"
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

      {/* Receptionist Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[100px] right-6 z-50 w-[430px] max-w-[calc(100vw-2rem)] h-[610px] max-h-[80vh] rounded-2xl border border-luxury-gold/30 bg-dark-50/98 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/80"
          >
            {/* Header */}
            <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary-600/25 via-indigo-600/15 to-emerald-600/15">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center relative">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-dark" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-sm">Sofía — AI Receptionist</h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                      Human Voice
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 Bilingual • Español & English
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Mode Switcher: Chat vs Live Call */}
                <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => {
                      endLiveCall()
                      setActiveTab('chat')
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeTab === 'chat'
                        ? 'bg-primary-600 text-white shadow'
                        : 'text-luxury-silver hover:text-white'
                    }`}
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('call')
                      if (!isCallActive) startLiveCall(callLang)
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                      activeTab === 'call'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-emerald-400 hover:text-white'
                    }`}
                  >
                    <PhoneCall className="w-3 h-3" /> Call
                  </button>
                </div>

                {/* Mute / Unmute Voice Toggle */}
                <button
                  onClick={() => {
                    if (isVoiceEnabled) {
                      stopAudio()
                      setIsVoiceEnabled(false)
                    } else {
                      setIsVoiceEnabled(true)
                    }
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isVoiceEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/5 text-white/40 hover:text-white/70'
                  }`}
                  title={isVoiceEnabled ? 'Human Voice Audio Enabled' : 'Unmute Human Voice'}
                >
                  {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    endLiveCall()
                    setIsOpen(false)
                  }}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: INTERACTIVE LIVE VOICE CALL MODE */}
            {activeTab === 'call' ? (
              <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-dark-50 via-dark to-emerald-950/20 overflow-y-auto">
                {/* Language Switcher inside Call */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      onClick={() => {
                        setCallLang('es')
                        if (isCallActive) startLiveCall('es')
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        callLang === 'es' ? 'bg-luxury-gold text-dark' : 'text-luxury-silver hover:text-white'
                      }`}
                    >
                      🇻🇪 Español
                    </button>
                    <button
                      onClick={() => {
                        setCallLang('en')
                        if (isCallActive) startLiveCall('en')
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        callLang === 'en' ? 'bg-luxury-gold text-dark' : 'text-luxury-silver hover:text-white'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>

                  <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {isCallActive ? `● LIVE ${formatCallTime(callSeconds)}` : 'READY TO CALL'}
                  </div>
                </div>

                {/* Center Avatar & Voice Waveform */}
                <div className="my-4 text-center flex flex-col items-center">
                  <div className="relative mb-3">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/30 via-primary-600/30 to-luxury-gold/30 border-2 ${
                        isPlayingAudio
                          ? 'border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.5)]'
                          : isListening
                          ? 'border-red-400 shadow-[0_0_35px_rgba(248,113,113,0.5)]'
                          : 'border-luxury-gold/50'
                      } flex items-center justify-center relative z-10 transition-all`}
                    >
                      <PhoneCall
                        className={`w-10 h-10 ${
                          isPlayingAudio
                            ? 'text-emerald-400 animate-pulse'
                            : isListening
                            ? 'text-red-400 animate-bounce'
                            : 'text-luxury-gold'
                        }`}
                      />
                    </div>
                    {(isPlayingAudio || callStatus === 'ringing') && (
                      <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-40" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white">Sofía — Recepcionista Ejecutiva IA</h3>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    {callStatus === 'ringing' && (callLang === 'es' ? 'Llamando a Sofía...' : 'Ringing Sofia...')}
                    {callStatus === 'speaking' && (callLang === 'es' ? '🔊 Sofía está hablando (Voz Humana)...' : '🔊 Sofia is speaking (Human Voice)...')}
                    {callStatus === 'listening' && (callLang === 'es' ? '🎙️ Escuchando tu voz... Habla ahora' : '🎙️ Listening to you... Speak now')}
                    {callStatus === 'thinking' && (callLang === 'es' ? 'Procesando respuesta...' : 'Thinking...')}
                    {callStatus === 'idle' && (callLang === 'es' ? 'Presiona Iniciar Llamada para hablar en vivo' : 'Tap Start Call to speak live with Sofia')}
                  </p>

                  {/* Live Subtitle Box */}
                  <div className="mt-3 w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-luxury-champagne leading-relaxed max-h-28 overflow-y-auto">
                    "{lastCallTranscript}"
                  </div>
                </div>

                {/* Quick Voice Topics (Tap to ask Sofia during call) */}
                <div className="space-y-1.5 mb-3">
                  <div className="text-[10px] uppercase tracking-wider text-luxury-silver/70 font-semibold text-center">
                    {callLang === 'es' ? 'O toca una pregunta para escuchar a Sofía:' : 'Or tap a topic to hear Sofia answer:'}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {callQuickPrompts.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (!isCallActive) setIsCallActive(true)
                          handleSend(item.prompt)
                        }}
                        className="px-2.5 py-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-[11px] text-left text-white/90 transition-all truncate"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Call Controls Bar */}
                <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/10">
                  {!isCallActive ? (
                    <button
                      onClick={() => startLiveCall(callLang)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:brightness-110 transition-all"
                    >
                      <PhoneCall className="w-4 h-4" />
                      {callLang === 'es' ? 'Iniciar Llamada de Voz en Vivo' : 'Start Live Human-Voice Call'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={isListening ? stopListening : startListening}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                          isListening
                            ? 'bg-red-500/20 border-red-400 text-red-300 animate-pulse'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                        }`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        {isListening
                          ? callLang === 'es'
                            ? 'Escuchando...'
                            : 'Listening...'
                          : callLang === 'es'
                          ? 'Hablar por Micrófono'
                          : 'Tap to Speak'}
                      </button>
                      <button
                        onClick={endLiveCall}
                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <PhoneOff className="w-4 h-4" />
                        {callLang === 'es' ? 'Colgar' : 'End'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* TAB 2: TEXT & VOICE CHAT MODE */
              <>
                {/* Top Call Banner inside Chat */}
                <div className="px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    Voz humana activa • Escucha a Sofía en vivo
                  </span>
                  <button
                    onClick={() => startLiveCall('es')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <PhoneCall className="w-3 h-3" /> Llamar Ahora
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[86%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium rounded-br-md'
                            : 'bg-white/5 text-luxury-champagne border border-white/10 rounded-bl-md'
                        }`}
                      >
                        {linkifyText(msg.text)}
                        {msg.type === 'ai' && (
                          <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
                            <button
                              onClick={() => {
                                const { audioUrl } = getStudioAudioForResponse('', msg.text)
                                playHumanVoice(msg.audioUrl || audioUrl, msg.text)
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              🔊 Escuchar voz de Sofía
                            </button>
                            <a
                              href="/booking"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-luxury-gold hover:underline"
                            >
                              <Calendar className="w-3 h-3" /> Agendar $99 Audit
                            </a>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                          <span className="text-xs text-luxury-silver">Sofía está respondiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-primary-600/30 border border-white/10 hover:border-primary-500/40 text-white/80 hover:text-white transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Direct Phone Line Bar */}
                <div className="px-4 py-2 border-t border-white/5 bg-black/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-luxury-silver">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>Línea directa en Miami:</span>
                  </div>
                  <a
                    href="tel:+17866432099"
                    onClick={() => AnalyticsEvents.clickPhoneCall('chatbot_banner')}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/25 transition-all"
                  >
                    +1 (786) 643-2099
                  </a>
                </div>

                {/* Input Bar */}
                <div className="p-3 border-t border-white/10 flex gap-2">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                      isListening
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    title={isListening ? 'Detener micrófono' : 'Hablar por micrófono'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isListening ? 'Escuchando tu voz...' : 'Escribe o habla con Sofía...'}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all text-sm"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
