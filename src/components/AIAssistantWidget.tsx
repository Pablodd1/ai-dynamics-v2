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
  Phone,
  PhoneCall,
  PhoneOff,
  Calendar,
  Check,
} from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { sendGeminiMessage, getFallbackResponse, getStudioAudioForResponse, type ChatMessage } from '../lib/gemini'
import { AnalyticsEvents } from '../lib/analytics'

interface Message {
  type: 'user' | 'ai'
  text: string
  audioUrl?: string
  showSchedulePrompt?: boolean
}

interface SlotItem {
  start: string
  end: string
  display: string
  day: string
  value: string
}

const BOOKING_SERVICES = [
  { id: 'Free 15-Min AI Consultation Call', label: 'Free 15-Min Call', badge: 'FREE' },
  { id: '$99 AI Efficiency Audit + 48h Prototype', label: '$99 Full Audit + Prototype', badge: '$99' },
  { id: '$497 Corporate AI Staff Bootcamp', label: '$497 Team AI Bootcamp', badge: '$497' },
  { id: '$997 Custom AI Solution / 24/7 Agent', label: '$997 Turnkey AI Agent', badge: '$997' },
]

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'schedule'>('chat')
  const [callLang, setCallLang] = useState<'es' | 'en'>('es')
  const [isCallActive, setIsCallActive] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'speaking' | 'listening' | 'thinking'>('idle')
  const [callSeconds, setCallSeconds] = useState(0)
  const [lastCallTranscript, setLastCallTranscript] = useState(
    '¡Hola, buenas! Gracias por llamar a AI Dynamic Pro en Miami. Te atiende JAss, tu asistente ejecutivo con inteligencia artificial.'
  )
  const [showAttentionGrabber, setShowAttentionGrabber] = useState(false)
  const [grabberDismissed, setGrabberDismissed] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      text: '👋 ¡Hola! Soy tu Asistente Ejecutivo en AI Dynamic Pro. Puedo responder tus dudas al instante o agendar tu llamada o cita ahora mismo. ¿En qué te puedo ayudar hoy?',
      audioUrl: '/audio/sofia_call_answer_es.mp3',
      showSchedulePrompt: true,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [history, setHistory] = useState<ChatMessage[]>([])

  // Embedded Appointment & Call Scheduler State
  const [slotsByDay, setSlotsByDay] = useState<Record<string, SlotItem[]>>({})
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null)
  const [bookingService, setBookingService] = useState(BOOKING_SERVICES[0].id)
  const [bookingName, setBookingName] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingNotes, setBookingNotes] = useState('')
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingMeetLink, setBookingMeetLink] = useState('')
  const [bookingError, setBookingError] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ringContextRef = useRef<AudioContext | null>(null)
  const isCallActiveRef = useRef(false)
  const callLangRef = useRef<'es' | 'en'>('es')

  // Generate 5 business days of instant slots + fetch live /api/availability
  useEffect(() => {
    const generateLocalSlots = (): Record<string, SlotItem[]> => {
      const fallback: Record<string, SlotItem[]> = {}
      const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const curr = new Date()
      curr.setDate(curr.getDate() + 1)
      let added = 0
      while (added < 5) {
        const d = curr.getDay()
        if (d !== 0 && d !== 6) {
          const yyyy = curr.getFullYear()
          const mm = String(curr.getMonth() + 1).padStart(2, '0')
          const dd = String(curr.getDate()).padStart(2, '0')
          const key = `${yyyy}-${mm}-${dd}`
          const label = `${days[d]}, ${months[curr.getMonth()]} ${curr.getDate()}`
          fallback[key] = times.map((display) => ({
            start: `${key}T10:00:00-04:00`,
            end: `${key}T10:30:00-04:00`,
            display,
            day: label,
            value: `${key} ${display}`,
          }))
          added++
        }
        curr.setDate(curr.getDate() + 1)
      }
      return fallback
    }

    const initialSlots = generateLocalSlots()
    setSlotsByDay(initialSlots)
    const firstKey = Object.keys(initialSlots)[0]
    if (firstKey) {
      setSelectedDay(firstKey)
      setSelectedSlot(initialSlots[firstKey]?.[1] || initialSlots[firstKey]?.[0] || null)
    }

    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.slots && Object.keys(data.slots).length > 0) {
          setSlotsByDay(data.slots)
          const k = Object.keys(data.slots)[0]
          if (k) {
            setSelectedDay(k)
            setSelectedSlot(data.slots[k]?.[1] || data.slots[k]?.[0] || null)
          }
        }
      })
      .catch(() => {})
  }, [])

  // Attention grabber trigger
  useEffect(() => {
    try {
      if (sessionStorage.getItem('jass_grabber_dismissed') === 'true') {
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
      sessionStorage.setItem('jass_grabber_dismissed', 'true')
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
      setCallSeconds((prev) => prev + 1)
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
          setTimeout(() => handleSend(transcript), 50)
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

  // Play brief 0.45s US telephone ringback tone before answering
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
        }, 450)
      } catch {
        setTimeout(resolve, 250)
      }
    })
  }

  // Start interactive Web Voice Call
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
        ? '¡Hola, buenas! Gracias por llamar a AI Dynamic Pro en Miami. Podemos hablar en español o en inglés, y puedo agendar tu cita o llamada ahora mismo. ¿Cómo te puedo ayudar hoy?'
        : 'Hello! Thank you for calling AI Dynamic Pro in Miami. We can speak in English or Spanish, and I can book your appointment or call right here. How can I help you today?'

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

  const handleDirectBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingName.trim() || !bookingEmail.trim() || !selectedSlot) {
      setBookingError('Por favor ingresa tu nombre, email y elige un horario / Please enter name, email, and slot.')
      return
    }
    setIsSubmittingBooking(true)
    setBookingError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName.trim(),
          email: bookingEmail.trim(),
          phone: bookingPhone.trim(),
          service: bookingService,
          meeting_type: bookingService,
          date: selectedSlot.day,
          time: selectedSlot.display,
          selected_slot: selectedSlot,
          message: bookingNotes.trim() || 'Scheduled directly via AI Assistant Widget',
          source: 'ai_assistant_scheduler',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Could not confirm booking')
      }
      if (data.meet_link) setBookingMeetLink(data.meet_link)
      setBookingConfirmed(true)
      AnalyticsEvents.clickBooking(bookingService, 'chatbot_inline_scheduler')

      // Also post confirmation inside chat messages
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: `✅ ¡Cita confirmada para ${bookingName}! Te esperamos el ${selectedSlot.day} a las ${selectedSlot.display} EST (${bookingService}). Hemos enviado la confirmación a ${bookingEmail}.`,
        },
      ])
    } catch (err: any) {
      setBookingError(err.message || 'Error al agendar. Llámanos al +1 (786) 643-2099.')
    } finally {
      setIsSubmittingBooking(false)
    }
  }

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride || input).trim()
    if (!text) return

    stopListening()
    stopAudio()
    AnalyticsEvents.sendChatMessage(text.length)
    setMessages((prev) => [...prev, { type: 'user', text }])
    setInput('')

    const wantsToSchedule = /\b(book|schedule|appointment|calendar|meeting|call|cita|agendar|reservar|reunión|reunion|horario|disponibilidad)\b/i.test(text)

    // Instant response path (<15ms) for common questions so text is never slow
    const lower = text.toLowerCase()
    const isInstantMatch =
      text.length < 130 &&
      /\b(hola|hello|hi|hey|buenas|epale|épale|price|pricing|cost|cuánto|cuanto|precio|tarifa|audit|auditoría|auditoria|\$99|99|book|schedule|appointment|calendar|cita|agendar|reservar|reunión|reunion|call|phone|receptionist|recepcionista|llamada|train|training|bootcamp|entrenamiento|capacitación|app|application|software|desarrollo|aplicación|human|staff|jasmel|persona|ingeniero|service|services|servicios)\b/i.test(lower)

    if (isInstantMatch) {
      const instantReply = getFallbackResponse(text)
      const { audioUrl } = getStudioAudioForResponse(text, instantReply)
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: instantReply,
          audioUrl,
          showSchedulePrompt: true,
        },
      ])
      setLastCallTranscript(instantReply)

      // Fire non-blocking lead/handoff notification in background
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, prompt: text }),
      }).catch(() => null)

      if (isVoiceEnabled || isCallActiveRef.current) {
        playHumanVoice(audioUrl, instantReply, () => {
          if (isCallActiveRef.current) startListening()
        })
      }
      return
    }

    setIsLoading(true)
    if (isCallActiveRef.current) setCallStatus('thinking')

    try {
      const newHistory: ChatMessage[] = [...history, { role: 'user', parts: [{ text }] }]
      const responseText = await sendGeminiMessage(newHistory, text)
      setHistory([...newHistory, { role: 'model', parts: [{ text: responseText }] }])

      const { audioUrl } = getStudioAudioForResponse(text, responseText)
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: responseText,
          audioUrl,
          showSchedulePrompt: wantsToSchedule || true,
        },
      ])
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
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: fallback,
          audioUrl,
          showSchedulePrompt: true,
        },
      ])
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
    '📅 Agendar Llamada / Cita',
    '⚡ Auditoría de $99 (Workflow Audit)',
    '💻 Desarrollo de Apps & Sistemas IA',
    '🎓 Entrenamiento de IA para Personal',
    '👤 Hablar con Jasmel',
  ]

  const callQuickPrompts =
    callLang === 'es'
      ? [
          { label: '📅 Agendar Cita / Llamada', prompt: 'Quiero agendar una cita o llamada' },
          { label: '⚡ Auditoría de $99', prompt: '¿Qué incluye la auditoría de 99 dólares?' },
          { label: '💻 Desarrollo de Apps & IA', prompt: '¿Qué soluciones de desarrollo de aplicaciones realizan?' },
          { label: '🎓 Entrenamiento de Personal', prompt: '¿Ofrecen entrenamiento de IA para mi equipo?' },
        ]
      : [
          { label: '📅 Schedule Call / Appointment', prompt: 'I want to schedule a call or appointment' },
          { label: '⚡ $99 Workflow Audit', prompt: 'What is included in the $99 workflow audit?' },
          { label: '💻 Custom App Development', prompt: 'What custom application development services do you offer?' },
          { label: '🎓 Corporate Staff Training', prompt: 'Do you offer corporate staff AI training workshops?' },
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
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-[84px] right-0 w-[310px] sm:w-[350px] p-4 rounded-2xl bg-dark-50/98 backdrop-blur-2xl border border-luxury-gold/50 text-white shadow-2xl shadow-black/90 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-luxury-gold to-accent-500" />

              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Asistente en Línea • Agenda o Consulta</span>
                </div>

                <button
                  onClick={dismissAttentionGrabber}
                  className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
                  aria-label="Cerrar notificación"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-luxury-champagne leading-relaxed mb-3">
                👋 <strong>¡Hola!</strong> ¿Quieres agendar una llamada rápida, reservar tu Auditoría de $99 o resolver dudas al instante?
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    dismissAttentionGrabber()
                    setIsOpen(true)
                    setActiveTab('schedule')
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-luxury-gold to-amber-500 text-dark font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Cita</span>
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
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-dark-50/95 backdrop-blur-xl border border-luxury-gold/40 text-white shadow-2xl shadow-black/60 cursor-pointer hover:border-luxury-gold transition-all"
              onClick={() => {
                setIsOpen(true)
                setActiveTab('schedule')
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left pr-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Chat & Schedule a Call
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-luxury-champagne">
                  ⚡ Instant Answers & Live Calendar
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
          aria-label="Open Assistant & Scheduler"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-emerald-500 border-2 border-dark text-white flex items-center justify-center shadow-md">
              <Calendar className="w-3 h-3" />
            </div>
          </div>
          <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-30 pointer-events-none" />
        </motion.button>
      </div>

      {/* Receptionist & Scheduler Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="fixed bottom-[100px] right-6 z-50 w-[430px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[82vh] rounded-2xl border border-luxury-gold/30 bg-dark-50/98 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/80"
          >
            {/* Header — Top-left logo and branding text erased as requested */}
            <div className="p-2.5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary-600/25 via-indigo-600/15 to-emerald-600/15">
              {/* Mode Switcher: Chat vs Schedule vs Live Call */}
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => {
                    endLiveCall()
                    setActiveTab('chat')
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'chat'
                      ? 'bg-primary-600 text-white shadow'
                      : 'text-luxury-silver hover:text-white'
                  }`}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => {
                    endLiveCall()
                    setActiveTab('schedule')
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    activeTab === 'schedule'
                      ? 'bg-luxury-gold text-dark font-bold shadow'
                      : 'text-luxury-gold hover:text-white'
                  }`}
                >
                  <Calendar className="w-3 h-3" /> Schedule
                </button>
                <button
                  onClick={() => {
                    setActiveTab('call')
                    if (!isCallActive) startLiveCall(callLang)
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    activeTab === 'call'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-emerald-400 hover:text-white'
                  }`}
                >
                  <PhoneCall className="w-3 h-3" /> Call
                </button>
              </div>

              <div className="flex items-center gap-1.5">
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
                  title={isVoiceEnabled ? 'Voice Audio Enabled' : 'Enable Voice Audio'}
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

            {/* TAB 1: DIRECT APPOINTMENT & CALL SCHEDULER */}
            {activeTab === 'schedule' ? (
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-dark-50 via-dark to-black/60">
                {bookingConfirmed ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-6 px-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mb-3">
                      <Check className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Appointment Confirmed!</h3>
                    <p className="text-xs text-luxury-silver mb-3">
                      {bookingName}, your <strong className="text-luxury-gold">{bookingService}</strong> is locked in for{' '}
                      <strong className="text-white">
                        {selectedSlot?.day} at {selectedSlot?.display} EST
                      </strong>
                      .
                    </p>
                    {bookingMeetLink && (
                      <a
                        href={bookingMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-3 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold underline break-all"
                      >
                        Join Google Meet Link
                      </a>
                    )}
                    <p className="text-[11px] text-luxury-silver/70 mb-5">
                      Confirmation sent to {bookingEmail}. Need immediate assistance? Call +1 (786) 643-2099.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBookingConfirmed(false)
                          setActiveTab('chat')
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                      >
                        Back to Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleDirectBookingSubmit} className="space-y-3.5">
                    <div>
                      <div className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                        <span>1. Select Call or Consultation Type</span>
                        <span className="text-[10px] font-mono text-emerald-400">EST Timezone</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {BOOKING_SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setBookingService(srv.id)}
                            className={`p-2 rounded-xl border text-left transition-all ${
                              bookingService === srv.id
                                ? 'border-luxury-gold bg-luxury-gold/15 text-white'
                                : 'border-white/10 bg-white/[0.03] text-luxury-silver hover:border-white/25'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[11px] font-bold leading-tight">{srv.label}</span>
                              <span className="text-[10px] font-extrabold text-luxury-gold shrink-0">{srv.badge}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Day & Time Picker */}
                    <div>
                      <div className="text-xs font-bold text-white mb-1.5">2. Pick Date & Time</div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1.5 mb-2">
                        {Object.entries(slotsByDay).map(([dateKey, daySlots]) => (
                          <button
                            key={dateKey}
                            type="button"
                            onClick={() => {
                              setSelectedDay(dateKey)
                              setSelectedSlot(daySlots[0] || null)
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border whitespace-nowrap transition-all ${
                              selectedDay === dateKey
                                ? 'border-luxury-gold bg-luxury-gold/25 text-luxury-gold'
                                : 'border-white/10 bg-white/[0.03] text-luxury-silver hover:border-white/25'
                            }`}
                          >
                            {daySlots[0]?.day || dateKey}
                          </button>
                        ))}
                      </div>

                      {selectedDay && slotsByDay[selectedDay] && (
                        <div className="grid grid-cols-4 gap-1.5">
                          {slotsByDay[selectedDay].map((slot) => (
                            <button
                              key={slot.value}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                                selectedSlot?.value === slot.value
                                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold'
                                  : 'border-white/10 bg-white/[0.03] text-luxury-silver hover:border-white/25'
                              }`}
                            >
                              {slot.display}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-white">3. Your Details</div>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="Full Name *"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-luxury-gold focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="email"
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="Email *"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-luxury-gold focus:outline-none"
                        />
                        <input
                          type="tel"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="Phone (Optional)"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-luxury-gold focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Brief topic or goal (Optional)"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    {bookingError && (
                      <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-[11px]">
                        {bookingError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-luxury-gold to-amber-500 text-dark font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {isSubmittingBooking ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Confirming Appointment...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>
                            Confirm {selectedSlot ? `${selectedSlot.day} @ ${selectedSlot.display}` : 'Appointment'}
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : activeTab === 'call' ? (
              /* TAB 2: INTERACTIVE LIVE VOICE CALL MODE */
              <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-dark-50 via-dark to-emerald-950/20 overflow-y-auto">
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
                <div className="my-3 text-center flex flex-col items-center">
                  <div className="relative mb-3">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/30 via-primary-600/30 to-luxury-gold/30 border-2 ${
                        isPlayingAudio
                          ? 'border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.5)]'
                          : isListening
                          ? 'border-red-400 shadow-[0_0_35px_rgba(248,113,113,0.5)]'
                          : 'border-luxury-gold/50'
                      } flex items-center justify-center relative z-10 transition-all`}
                    >
                      <PhoneCall
                        className={`w-8 h-8 ${
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

                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    {callStatus === 'ringing' && (callLang === 'es' ? 'Conectando...' : 'Connecting...')}
                    {callStatus === 'speaking' && (callLang === 'es' ? '🔊 Hablando en vivo...' : '🔊 Speaking live...')}
                    {callStatus === 'listening' && (callLang === 'es' ? '🎙️ Escuchando... Habla ahora' : '🎙️ Listening... Speak now')}
                    {callStatus === 'thinking' && (callLang === 'es' ? 'Respondiendo...' : 'Replying...')}
                    {callStatus === 'idle' && (callLang === 'es' ? 'Presiona Iniciar Llamada' : 'Tap Start Call')}
                  </p>

                  <div className="mt-2.5 w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-luxury-champagne leading-relaxed max-h-28 overflow-y-auto">
                    "{lastCallTranscript}"
                  </div>
                </div>

                {/* Quick Voice Topics */}
                <div className="space-y-1.5 mb-3">
                  <div className="grid grid-cols-2 gap-1.5">
                    {callQuickPrompts.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.label.includes('Agendar') || item.label.includes('Schedule')) {
                            endLiveCall()
                            setActiveTab('schedule')
                            return
                          }
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
                      {callLang === 'es' ? 'Iniciar Llamada de Voz' : 'Start Live Voice Call'}
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
                          ? 'Hablar'
                          : 'Speak'}
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
              /* TAB 3: INSTANT TEXT CHAT MODE */
              <>
                {/* Top Quick-Action Bar inside Chat */}
                <div className="px-3.5 py-2 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="px-2.5 py-1 rounded-lg bg-luxury-gold/20 hover:bg-luxury-gold/30 text-luxury-gold border border-luxury-gold/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Calendar className="w-3 h-3" /> Agendar Llamada / Cita
                  </button>
                  <button
                    onClick={() => startLiveCall('es')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <PhoneCall className="w-3 h-3" /> Llamar Ahora
                  </button>
                </div>

                {/* Messages (Instant zero-delay rendering) */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium rounded-br-md'
                            : 'bg-white/5 text-luxury-champagne border border-white/10 rounded-bl-md'
                        }`}
                      >
                        {linkifyText(msg.text)}
                        {msg.type === 'ai' && (
                          <div className="mt-2 pt-1.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                            <button
                              onClick={() => {
                                const { audioUrl } = getStudioAudioForResponse('', msg.text)
                                playHumanVoice(msg.audioUrl || audioUrl, msg.text)
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              🔊 Escuchar
                            </button>
                            <button
                              onClick={() => setActiveTab('schedule')}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-luxury-gold/20 text-[11px] font-bold text-luxury-gold hover:bg-luxury-gold/30 transition-all"
                            >
                              <Calendar className="w-3 h-3" /> Agendar Cita / Llamada
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md p-2.5">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                          <span className="text-xs text-luxury-silver">Respondiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="px-3.5 pb-2 flex flex-wrap gap-1.5">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        if (suggestion.includes('Agendar')) {
                          setActiveTab('schedule')
                          return
                        }
                        handleSend(suggestion)
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-primary-600/30 border border-white/10 hover:border-primary-500/40 text-white/80 hover:text-white transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Direct Phone Line Bar */}
                <div className="px-3.5 py-1.5 border-t border-white/5 bg-black/30 flex items-center justify-between">
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
                <div className="p-2.5 border-t border-white/10 flex gap-2">
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
                    placeholder={isListening ? 'Escuchando tu voz...' : 'Escribe tu pregunta o agenda una cita...'}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all text-sm"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {/* Legal AI & Florida Recording Consent Disclosure Footer */}
            <div className="px-3 py-1.5 bg-black/50 border-t border-white/5 text-[10px] text-luxury-silver/60 text-center leading-tight">
              Al chatear o agendar, aceptas nuestros{' '}
              <a href="/terms" className="text-luxury-gold/80 hover:underline">
                Términos
              </a>{' '}
              y{' '}
              <a href="/privacy" className="text-luxury-gold/80 hover:underline">
                Privacidad
              </a>
              .
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
