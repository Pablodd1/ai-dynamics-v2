import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ExternalLink, Play, ShieldCheck, Volume2 } from 'lucide-react'
import { AnalyticsEvents } from '../lib/analytics'

const LIVE_PROOF_ITEMS = [
  {
    name: 'Medical Billing Miami Beach',
    url: 'https://medicalbillingmb.com',
    status: 'LIVE PRODUCTION',
    outcome: '18% → 2.4% denial rate (illustrative RCM benchmark) · AAPC + AI scrubbing',
  },
  {
    name: 'PocketScribe Clinical AI',
    url: 'https://aiscribers.com',
    status: 'LIVE PRODUCT',
    outcome: 'EN/ES ambient clinical SOAP charting & structured intake',
  },
  {
    name: 'Hotel Rate Intelligence',
    url: 'https://hotelrateintel.com',
    status: 'LIVE PRODUCTION',
    outcome: 'Daily automated competitive rate tracking across 30+ Miami hotels',
  },
]

export default function Hero() {
  const [voiceLang, setVoiceLang] = useState<'en' | 'es'>('en')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setIsPlayingAudio(false)
  }

  const playDemoForLang = (lang: 'en' | 'es') => {
    stopAudio()
    const audio = new Audio(lang === 'es' ? '/audio/sofia_call_answer_es.mp3' : '/audio/sofia_call_answer_en.mp3')
    audioRef.current = audio
    audio.onplay = () => setIsPlayingAudio(true)
    audio.onended = () => setIsPlayingAudio(false)
    audio.onerror = () => setIsPlayingAudio(false)
    audio.play().catch(() => setIsPlayingAudio(false))
    AnalyticsEvents.playVoiceDemo(`hero_sofia_${lang}`)
  }

  const toggleVoiceDemo = () => {
    if (isPlayingAudio) {
      stopAudio()
      return
    }
    playDemoForLang(voiceLang)
  }

  const switchVoiceLang = (lang: 'en' | 'es') => {
    setVoiceLang(lang)
    if (isPlayingAudio) {
      playDemoForLang(lang)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full bg-[#040407] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Subtle ambient glow — zero scroll-jacking, single viewport fold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[640px] h-[520px] rounded-full bg-[#d4af37]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 w-[480px] h-[380px] rounded-full bg-emerald-500/[0.06] blur-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Single clear audience, plain headline, free first CTA */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#f7e7ce]">
                South Florida AI Engineering · Until You Are Gold
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-bold tracking-[-0.02em] leading-[1.08] text-white mb-5">
              Custom AI Apps &amp; 24/7 Bilingual Voice Receptionists{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#fff6e5]">
                Built for Healthcare &amp; Service Teams.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-6 max-w-2xl">
              We embed with Miami clinics, law firms, and service businesses to automate missed-call intake,
              appointment booking, and manual back-office workflows—shipping a working prototype in 48 hours.
              Start with a <strong className="text-white">free 15-minute workflow triage</strong>, then a{' '}
              <strong className="text-[#f7e7ce]">$99 deep audit</strong> only if you proceed.
            </p>

            {/* Concrete time-boxed bullets */}
            <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-white/85 mb-7 max-w-2xl">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ring-1 EN/ES voice &amp; WhatsApp triage integrated with your calendar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>48-hour live workflow prototype before committing to a build</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hands-on team training in Brickell / South Florida or live remote</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>$99 audit entry (or free triage first); transparent tier pricing below</span>
              </li>
            </ul>

            {/* Primary FREE CTA first, Secondary $99 Audit second, Compact Voice Demo */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-6">
              <Link
                to="/booking?service=free_ai_consultation"
                onClick={() => AnalyticsEvents.clickBooking('Free 15-Min Triage Call', 'hero_primary')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6c675] text-[#050507] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_32px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all whitespace-nowrap"
              >
                <span>Book a Free 15-Minute Triage Call</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                to="/offer?offer=audit_99"
                onClick={() => AnalyticsEvents.clickBooking('$99 Audit + 48h Prototype', 'hero_secondary')}
                className="px-5 py-3.5 rounded-xl border border-white/20 bg-white/[0.04] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all whitespace-nowrap"
              >
                <span>Lock $99 Audit + 48h Prototype</span>
              </Link>

              <div className="inline-flex items-center justify-between sm:justify-start rounded-xl border border-white/15 bg-black/60 p-1">
                <button
                  type="button"
                  onClick={toggleVoiceDemo}
                  className="px-3.5 py-2 rounded-lg hover:bg-white/[0.08] text-white text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  {isPlayingAudio ? (
                    <Volume2 className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#d4af37] fill-current" />
                  )}
                  <span>{isPlayingAudio ? 'Playing Sofía' : 'Hear Voice Demo'}</span>
                </button>
                <div className="flex items-center gap-0.5 pl-1.5 pr-1 border-l border-white/15">
                  {(['en', 'es'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => switchVoiceLang(lang)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono uppercase transition-all ${
                        voiceLang === lang
                          ? 'bg-[#d4af37] text-[#050507] font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                AES-256 Encrypted · HIPAA-Ready Workflows
              </span>
              <span>•</span>
              <a href="#pricing" className="text-[#f7e7ce] hover:text-[#d4af37] underline underline-offset-4">
                See all transparent packages ($99 – $4,900+)
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Image + Verifiable Live Production Proof */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#0a0a10] shadow-2xl">
              <img
                src="/images/hero-embedded-engineering.webp"
                alt="AI Dynamic Pro embedded AI software engineers reviewing custom automation dashboard with a Miami executive"
                width={1280}
                height={720}
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="p-4 border-t border-white/10 bg-[#08080d]/95">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                    Live Deployed Products You Can Inspect Today
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    PRODUCTION
                  </span>
                </div>

                <div className="space-y-2">
                  {LIVE_PROOF_ITEMS.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#d4af37]/40 transition-all group"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white group-hover:text-[#f7e7ce] flex items-center gap-1.5">
                          <span className="truncate">{item.name}</span>
                          <ExternalLink className="w-3 h-3 text-[#d4af37] shrink-0" />
                        </div>
                        <p className="text-[11px] text-white/65 leading-snug mt-0.5">
                          {item.outcome}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-300 shrink-0 mt-0.5">
                        {item.status}
                      </span>
                    </a>
                  ))}
                </div>

                <p className="mt-2.5 text-[10px] text-white/50">
                  Live commercial products shown above; Pilot &amp; R&amp;D lab systems are labeled separately in our{' '}
                  <a href="#selected-systems" className="text-[#f7e7ce] underline">
                    systems portfolio
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
