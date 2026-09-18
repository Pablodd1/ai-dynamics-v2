import { useState } from 'react'
import { Phone, PhoneCall, Volume2, CheckCircle2, XCircle, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react'

interface Scenario {
  id: string
  title: string
  titleEs: string
  caller: string
  situation: string
  situationEs: string
  humanProblems: string[]
  humanProblemsEs: string[]
  aiResponse: string
  aiResponseEs: string
  audioVoiceText: string
  audioVoiceTextEs: string
  badge: string
}

const scenarios: Scenario[] = [
  {
    id: 'healthcare',
    title: 'Medical Clinic (Intake & Insurance)',
    titleEs: 'Clínica Médica (Cita y Seguro)',
    caller: 'Dra. Gomez Clinic (Brickell)',
    situation: 'Patient calls at 8:45 PM wanting next-day urgent consult and asks if Aetna/Medicare is accepted in Spanish.',
    situationEs: 'Paciente llama 8:45 PM pidiendo consulta urgente al día siguiente y consulta por seguro Aetna en español.',
    humanProblems: [
      'Voicemail plays: "Please call back during business hours"',
      'Patient calls competitor clinic down the street',
      'Lost patient revenue: ~$350'
    ],
    humanProblemsEs: [
      'Buzón de voz: "Llame en horario laboral de 9 a 5"',
      'El paciente llama a la siguiente clínica en Google',
      'Ingreso perdido: ~$350'
    ],
    aiResponse: 'Answers in 0.4s in Venezuelan/Latin Spanish: "¡Hola buenas noches! Con gusto le atiendo. Aceptamos Aetna y Medicare. Le puedo agendar mañana mismo a las 10:30 AM con el Dr. Martínez. ¿Le confirmo su cita con su número telefónico?"',
    aiResponseEs: 'Responde en 0.4s en español fluido: "¡Hola, buenas noches! Con gusto le atiendo en la clínica. Sí aceptamos Aetna y Medicare. Tengo disponibilidad mañana a las 10:30 AM. ¿Le aparto el cupo de una vez a este número?"',
    audioVoiceText: '¡Hola, buenas noches! Con gusto le atiendo en la clínica. Sí aceptamos Aetna y Medicare. Tengo disponibilidad mañana a las diez y media de la mañana. ¿Le aparto el cupo de una vez?',
    audioVoiceTextEs: '¡Hola, buenas noches! Con gusto le atiendo en la clínica. Sí aceptamos Aetna y Medicare. Tengo disponibilidad mañana a las diez y media de la mañana. ¿Le aparto el cupo de una vez?',
    badge: 'Healthcare & MedSpa'
  },
  {
    id: 'legal',
    title: 'Legal / Injury Firm (Urgent Case)',
    titleEs: 'Bufete Legal / Accidentes (Caso Urgente)',
    caller: 'Miami Legal Partners (Downtown)',
    situation: 'Driver in I-95 collision calls on Sunday afternoon needing an attorney before speaking to insurance adjusters.',
    situationEs: 'Conductor involucrado en choque en la I-95 llama domingo en la tarde antes de hablar con la aseguradora.',
    humanProblems: [
      'Answering service takes 20 mins to page on-call paralegal',
      'Client panics and signs with TV billboard attorney',
      'Lost settlement commission: ~$8,000+'
    ],
    humanProblemsEs: [
      'Operadora genérica toma recado en inglés y tarda 30 min',
      'Cliente busca otro abogado en Google y firma con él',
      'Caso perdido: ~$8,000+'
    ],
    aiResponse: 'Immediate intake in 0.3s: "Hello, I am the priority legal assistant for Miami Legal Partners. Are you safe and uninjured? Let me document the accident details and patch you immediately to our on-duty attorney right now."',
    aiResponseEs: 'Respuesta inmediata en 0.3s: "Hola, le atiende el asistente prioritario de casos. ¿Se encuentra a salvo? Déjeme tomar los datos del choque y transferirlo de inmediato con el abogado de guardia."',
    audioVoiceText: 'Hello, I am the priority assistant for Miami Legal Partners. Are you safe and uninjured? Let me document the accident details and patch you directly to our on-duty attorney.',
    audioVoiceTextEs: 'Hola, le atiende el asistente de casos prioritarios. ¿Se encuentra a salvo? Déjeme tomar los datos del choque y transferirle de inmediato con el abogado de guardia.',
    badge: 'Legal & Attorneys'
  },
  {
    id: 'home_services',
    title: 'HVAC & Auto Glass (Emergency Service)',
    titleEs: 'A/C y Servicios Técnicos (Emergencia)',
    caller: 'CoolAir Miami & AutoGlass (Doral)',
    situation: 'Homeowner A/C unit dies in 92°F July heat at 7:15 AM before office dispatch opens.',
    situationEs: 'El aire acondicionado de una casa se apaga en julio con 92°F a las 7:15 AM antes de abrir oficina.',
    humanProblems: [
      'No answer until office opens at 9:00 AM',
      'Homeowner already called 3 competitors on Yelp',
      'Job lost: ~$1,400 replacement'
    ],
    humanProblemsEs: [
      'Nadie atiende hasta las 9:00 AM',
      'El cliente ya contrató al primer técnico que le contestó en Yelp',
      'Servicio perdido: ~$1,400'
    ],
    aiResponse: 'Answers immediately: "Good morning! We can dispatch a technician to your address between 9:30 AM and 11:00 AM. What is your street address and unit number so I can lock in your dispatch slot?"',
    aiResponseEs: 'Atiende de inmediato: "¡Buenos días! Podemos enviar a un técnico certificado a su domicilio entre 9:30 y 11:00 AM. ¿Cuál es su dirección exacta para apartar su turno en ruta ya mismo?"',
    audioVoiceText: 'Good morning! We can dispatch a certified technician to your address between 9:30 AM and 11:00 AM. What is your street address so I can lock in your slot?',
    audioVoiceTextEs: '¡Buenos días! Podemos enviar a un técnico certificado a su domicilio entre 9:30 y 11:00 AM. ¿Cuál es su dirección exacta para apartar su turno en ruta ya mismo?',
    badge: 'Contractors & Auto'
  }
]

export default function LiveCallSimulator() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  const playVoiceSample = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.05
    utterance.pitch = 1.0

    const voices = window.speechSynthesis.getVoices()
    const chosenVoice = voices.find(v => v.lang.toLowerCase().includes('es-ve')) ||
                        voices.find(v => v.lang.toLowerCase().includes('es-419')) ||
                        voices.find(v => v.lang.toLowerCase().includes('es-us')) ||
                        voices.find(v => v.lang.toLowerCase().includes('es-mx')) ||
                        voices.find(v => v.lang.toLowerCase().startsWith('es')) ||
                        voices[0]

    if (chosenVoice) utterance.voice = chosenVoice

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  return (
    <section id="call-simulator" className="py-24 relative overflow-hidden bg-dark-50/70 border-y border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            Interactive Voice Receptionist Demo
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight mb-4">
            Hear How Your Business Sounds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-300 to-luxury-gold">
              Answering 24/7 Over Real Phone Calls
            </span>
          </h2>
          <p className="text-luxury-silver text-base sm:text-lg">
            Compare the difference between lost callers on voicemail vs. an immediate, human-grade AI receptionist that speaks fluent English & Venezuelan/Latin Spanish.
          </p>

          {/* Language toggle for simulator */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setLang('es')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lang === 'es' ? 'bg-luxury-gold text-dark shadow' : 'text-luxury-silver hover:text-white'
              }`}
            >
              Español (Miami/Latino)
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-luxury-gold text-dark shadow' : 'text-luxury-silver hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Industry selector tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {scenarios.map((scenario) => {
            const isSelected = activeScenario.id === scenario.id
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  stopVoice()
                  setActiveScenario(scenario)
                }}
                className={`px-5 py-3 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-primary-600/30 border-luxury-gold/70 text-white shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                    : 'bg-white/5 border-white/10 text-luxury-silver hover:bg-white/10 hover:text-white'
                }`}
              >
                <Phone className={`w-4 h-4 ${isSelected ? 'text-luxury-gold' : 'text-luxury-silver'}`} />
                {lang === 'es' ? scenario.titleEs : scenario.title}
              </button>
            )
          })}
        </div>

        {/* Comparison Showcase Card */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Old Way: Lost Leads */}
          <div className="rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-950/15 via-dark to-dark p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Traditional Voicemail / Missed Call
                </span>
                <span className="text-xs text-luxury-silver/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Normal Delay
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                What Happens to 62% of Callers
              </h3>
              <p className="text-xs text-luxury-silver mb-6 italic bg-black/40 p-3 rounded-lg border border-white/5">
                "{lang === 'es' ? activeScenario.situationEs : activeScenario.situation}"
              </p>

              <div className="space-y-3">
                {(lang === 'es' ? activeScenario.humanProblemsEs : activeScenario.humanProblems).map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-white/70">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-red-400 font-semibold flex items-center gap-2">
              Result: Lost revenue & high payroll costs for unclosed leads.
            </div>
          </div>

          {/* New Way: AI Dynamic Receptionist */}
          <div className="rounded-2xl border border-luxury-gold/40 bg-gradient-to-b from-luxury-gold/10 via-dark-50 to-dark p-7 flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.15)] relative">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-luxury-gold to-amber-400 text-dark font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live in 0.4s
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AI Dynamic Bilingual Receptionist
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Immediate Conversion & Booking
              </h3>
              <p className="text-xs text-emerald-300/80 mb-6 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20 leading-relaxed font-mono">
                {lang === 'es' ? activeScenario.aiResponseEs : activeScenario.aiResponse}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Zero Wait Time:</strong> Picks up on the 1st ring 24/7/365.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Fluent Bilingual:</strong> Seamless Venezuelan, Cuban, or neutral Spanish & English.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Automated Scheduling:</strong> Drops confirmed client directly into your calendar.</span>
                </div>
              </div>
            </div>

            {/* Audio Action Button */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={() => {
                  if (isPlaying) {
                    stopVoice()
                  } else {
                    const text = lang === 'es' ? activeScenario.audioVoiceTextEs : activeScenario.audioVoiceText
                    playVoiceSample(text)
                  }
                }}
                className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isPlaying
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gradient-to-r from-luxury-gold via-amber-300 to-luxury-gold text-dark hover:brightness-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                {isPlaying ? 'Stop Voice Sample' : (lang === 'es' ? '🔊 Escuchar Llamada en Vivo' : '🔊 Play Live Call Audio')}
              </button>

              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-luxury-gold hover:text-white font-semibold flex items-center justify-center gap-1 group transition-colors"
              >
                Deploy On Your Phone Number <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Call Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-gradient-to-r from-primary-900/30 via-accent-900/20 to-primary-900/30 border border-white/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-xs font-bold text-luxury-gold flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Test With Your Own Voice Right Now
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              Call our live line at <a href="tel:+17866432099" className="text-luxury-gold underline hover:text-white">+1 (786) 643-2099</a>
            </div>
          </div>
          <a
            href="tel:+17866432099"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-green-400" /> Call (786) 643-2099
          </a>
        </div>
      </div>
    </section>
  )
}
