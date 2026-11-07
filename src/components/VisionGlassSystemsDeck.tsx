import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  PhoneCall,
  MessageSquare,
  FileSpreadsheet,
  Mail,
  GraduationCap,
  Cpu,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export interface VisionSystemCard {
  index: string
  stepNumber: number
  title: string
  subtitle: string
  description: string
  metricBadge: string
  iconBg: string
  iconType: 'phone' | 'whatsapp' | 'billing' | 'email' | 'bootcamp' | 'prototype'
  setupPills: {
    label: string
    accent?: string
    dotColor?: string
  }[]
  ctaKeyword: string
}

export const EXECUTIVE_VISION_SYSTEMS: VisionSystemCard[] = [
  {
    index: '01',
    stepNumber: 1,
    title: 'JAss 24/7 Voice Agent',
    subtitle: 'System 01 of 6',
    description:
      'Picks up the phone in 3 seconds in English & Spanish, answers every client question, and books appointments directly into your calendar so zero calls go to voicemail.',
    metricBadge: 'Recovers 38% Missed Calls • $997 Turnkey or $297/mo',
    iconBg: 'from-emerald-400 to-green-600',
    iconType: 'phone',
    setupPills: [
      { label: 'JAss Voice AI', accent: 'text-amber-300', dotColor: 'bg-amber-400' },
      { label: 'Bilingual EN / ES' },
      { label: 'Live Calendar & CRM Sync', dotColor: 'bg-emerald-400' },
    ],
    ctaKeyword: 'JASS',
  },
  {
    index: '02',
    stepNumber: 2,
    title: 'WhatsApp & SMS Closer',
    subtitle: 'System 02 of 6',
    description:
      'Answers every incoming WhatsApp, Instagram DM, and web chat message on your real business number in under 30 seconds, qualifies the lead, and books the consultation.',
    metricBadge: '47-Min Human Delay → 3-Sec AI Response',
    iconBg: 'from-green-500 to-emerald-700',
    iconType: 'whatsapp',
    setupPills: [
      { label: 'JAss Omnichannel', accent: 'text-emerald-300', dotColor: 'bg-emerald-400' },
      { label: '30-Sec Qualification Skill' },
      { label: 'WhatsApp + Web + IG Direct' },
    ],
    ctaKeyword: 'WHATSAPP',
  },
  {
    index: '03',
    stepNumber: 3,
    title: 'Back-Office Payroll Saver',
    subtitle: 'System 03 of 6',
    description:
      'We walk into your company, map your slowest department, and automate repetitive intake forms, billing codes, and CRM data entry that currently waste $3,420/month in payroll.',
    metricBadge: '$99 60-Min Department Efficiency Audit',
    iconBg: 'from-sky-400 to-blue-600',
    iconType: 'billing',
    setupPills: [
      { label: 'On-Site Workflow Audit', accent: 'text-sky-300', dotColor: 'bg-sky-400' },
      { label: 'Zero Manual Copy-Paste' },
      { label: '$2,500+/mo Savings Guarantee' },
    ],
    ctaKeyword: 'AUDIT',
  },
  {
    index: '04',
    stepNumber: 4,
    title: 'B2B Outbound & Inbox Engine',
    subtitle: 'System 04 of 6',
    description:
      'Finds high-intent B2B decision-makers in your industry, sends executive outreach sequences, triages your morning inbox, and hands you hot replies ready to close.',
    metricBadge: 'Automated Pipeline + Executive Morning Brief',
    iconBg: 'from-indigo-400 to-blue-700',
    iconType: 'email',
    setupPills: [
      { label: 'AI Dynamic Lead Engine', accent: 'text-indigo-300', dotColor: 'bg-indigo-400' },
      { label: 'Brevo + CRM Sync' },
      { label: 'Daily CEO Morning Brief' },
    ],
    ctaKeyword: 'PIPELINE',
  },
  {
    index: '05',
    stepNumber: 5,
    title: '48-Hour Custom AI App Build',
    subtitle: 'System 05 of 6',
    description:
      'Tell us your biggest operational bottleneck and our AI Developers & Creators will engineer a working custom AI application using your real company workflow in 48 hours.',
    metricBadge: 'Free 48-Hr Prototype • $30,000/yr Savings Guarantee',
    iconBg: 'from-amber-400 to-orange-600',
    iconType: 'prototype',
    setupPills: [
      { label: 'AI Dynamic Engineers', accent: 'text-amber-300', dotColor: 'bg-amber-400' },
      { label: 'Custom Full-Stack App' },
      { label: 'Pay $0 If Under $2.5K/mo ROI' },
    ],
    ctaKeyword: 'BUILD',
  },
  {
    index: '06',
    stepNumber: 6,
    title: 'On-Site Staff AI Bootcamp',
    subtitle: 'System 06 of 6',
    description:
      'We do not just hand you software and disappear. We stay side-by-side with your team and train up to 15 employees hands-on so 1 AI-trained staff member produces the output of 5.',
    metricBadge: '$497 Half-Day Corporate Staff Bootcamp (Up to 15 Staff)',
    iconBg: 'from-purple-500 to-fuchsia-600',
    iconType: 'bootcamp',
    setupPills: [
      { label: 'Hands-On Staff Training', accent: 'text-purple-300', dotColor: 'bg-purple-400' },
      { label: 'Role-Specific Prompt Playbooks' },
      { label: '1 Employee = 5x Output' },
    ],
    ctaKeyword: 'TRAIN',
  },
]

function SystemAppIcon({ type, bg }: { type: VisionSystemCard['iconType']; bg: string }) {
  const IconComponent =
    type === 'phone'
      ? PhoneCall
      : type === 'whatsapp'
      ? MessageSquare
      : type === 'billing'
      ? FileSpreadsheet
      : type === 'email'
      ? Mail
      : type === 'prototype'
      ? Cpu
      : GraduationCap

  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.45),inset_0_1px_2px_rgba(255,255,255,0.45)] border border-white/25 shrink-0`}
    >
      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
    </div>
  )
}

export default function VisionGlassSystemsDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showFinalCta, setShowFinalCta] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      if (showFinalCta) {
        setShowFinalCta(false)
        setActiveIndex(0)
      } else if (activeIndex === EXECUTIVE_VISION_SYSTEMS.length - 1) {
        setShowFinalCta(true)
      } else {
        setActiveIndex((prev) => prev + 1)
      }
    }, 3200)
    return () => clearInterval(timer)
  }, [isPlaying, activeIndex, showFinalCta])

  const activeSystem = EXECUTIVE_VISION_SYSTEMS[activeIndex]

  return (
    <section
      id="ai-systems-deck"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-dark via-[#070b14] to-dark border-y border-white/10"
    >
      {/* Ambient Background Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[420px] rounded-full bg-amber-500/10 blur-[135px]" />
        <div className="absolute bottom-0 right-10 w-[460px] h-[460px] rounded-full bg-sky-500/10 blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold text-amber-300 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Executive Blueprint • 6 Turnkey AI Systems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            6 AI Systems We Build Inside Your Company{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              &amp; Train Your Staff To Run
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-luxury-silver leading-relaxed">
            As hands-on <strong className="text-white">AI Developers &amp; Creators</strong>, we walk into your industry, engineer custom applications, and stay side-by-side training your team so you cut costs, save payroll, and move 5x faster right away.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: VisionOS Frosted-Glass Reel Card Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[540px] rounded-[36px] overflow-hidden border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-[#0b101b]">
              {/* Ambient Executive Office Background Image + Motion Overlay */}
              <img
                src="/social/week1-consulting.jpg"
                alt="AI Dynamic Pro Executive Consulting Environment"
                className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.42] contrast-110 saturate-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />

              {/* Stage Content Container */}
              <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-between min-h-[540px] sm:min-h-[590px]">
                {/* Top Hook Headline (Exact Olli Rasmussen Reel Hook Style) */}
                <div className="text-center pt-1 pb-4">
                  <div className="inline-flex items-center justify-center gap-2.5 mb-1">
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-xs uppercase tracking-wider shadow-lg">
                      AI DYNAMIC
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] italic">
                      6
                    </span>
                  </div>
                  <div
                    className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
                  >
                    AI systems we deploy &amp; train
                    <br />
                    inside your company this week
                  </div>

                  {/* Segmented 6-Bar Progress Indicator */}
                  <div className="flex items-center justify-center gap-2 mt-4 max-w-[260px] mx-auto">
                    {EXECUTIVE_VISION_SYSTEMS.map((sys, idx) => {
                      const isActive = !showFinalCta && idx === activeIndex
                      const isCompleted = showFinalCta || idx < activeIndex
                      return (
                        <button
                          key={sys.index}
                          onClick={() => {
                            setShowFinalCta(false)
                            setActiveIndex(idx)
                          }}
                          aria-label={`View System ${sys.index}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'w-11 bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                              : isCompleted
                              ? 'w-6 bg-white/60'
                              : 'w-6 bg-white/25 hover:bg-white/40'
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Center VisionOS Frosted Glass HUD Card */}
                <div className="my-auto">
                  <AnimatePresence mode="wait">
                    {!showFinalCta ? (
                      <motion.div
                        key={activeSystem.index}
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -14, scale: 0.97 }}
                        transition={{ duration: 0.28 }}
                        className="rounded-[28px] p-6 sm:p-7 backdrop-blur-2xl bg-white/[0.11] border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                      >
                        {/* Card Top Row: Pill + Thin Architectural Number */}
                        <div className="flex items-center justify-between mb-5">
                          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.12] border border-white/20 text-xs font-semibold text-white/90 tracking-wide">
                            {activeSystem.subtitle}
                          </span>
                          <span className="text-4xl sm:text-5xl font-extralight text-white/80 tracking-tighter leading-none">
                            {activeSystem.index}
                          </span>
                        </div>

                        {/* Card Middle Row: 3D App Icon + Bold System Title */}
                        <div className="flex items-center gap-4 mb-4">
                          <SystemAppIcon type={activeSystem.iconType} bg={activeSystem.iconBg} />
                          <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                              {activeSystem.title}
                            </h3>
                            <span className="inline-block mt-1 text-xs font-bold text-amber-300">
                              {activeSystem.metricBadge}
                            </span>
                          </div>
                        </div>

                        {/* Plain-English Outcome Copy */}
                        <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-6">
                          {activeSystem.description}
                        </p>

                        {/* SETUP Stack Pills Row */}
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 mb-2.5">
                            SETUP &amp; EXECUTION
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {activeSystem.setupPills.map((pill, pIdx) => (
                              <div key={pill.label} className="flex items-center gap-2">
                                {pIdx > 0 && (
                                  <span className="text-white/60 font-bold text-sm select-none">+</span>
                                )}
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/45 border border-white/15 text-xs font-semibold text-white shadow-inner">
                                  {pill.dotColor && (
                                    <span className={`w-2 h-2 rounded-full ${pill.dotColor}`} />
                                  )}
                                  <span className={pill.accent || 'text-white'}>{pill.label}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cta-slide"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.28 }}
                        className="rounded-[28px] p-8 sm:p-9 text-center backdrop-blur-2xl bg-white/[0.13] border border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                      >
                        <div className="text-sm font-semibold text-white/85 mb-3 flex items-center justify-center gap-1.5">
                          <span>💬 Ready to cut costs &amp; move 5x faster?</span>
                        </div>
                        <div className="inline-block px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500/80 to-orange-600/80 border border-amber-300/60 shadow-[0_10px_30px_rgba(245,158,11,0.45)] mb-4">
                          <span className="text-2xl sm:text-3xl font-black text-white tracking-wider">
                            &ldquo;BUILD&rdquo;
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-white max-w-sm mx-auto leading-snug mb-5">
                          Pick one system above and we&apos;ll engineer a live 48-hour prototype for your company + train your staff.
                        </p>
                        <Link
                          to="/booking?utm_source=website&utm_medium=vision_glass_deck&utm_campaign=6_systems_card"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-extrabold text-sm hover:bg-amber-300 transition-colors shadow-lg"
                        >
                          Claim Your 48-Hr Prototype or $99 Audit
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Playback Controls Bar */}
                <div className="pt-4 flex items-center justify-between text-xs text-white/75">
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 font-semibold text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isPlaying ? 'Auto-Cycling (Pause)' : 'Resume Deck'}
                  </button>

                  <button
                    onClick={() => setShowFinalCta((prev) => !prev)}
                    className="px-3 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 font-bold transition-colors"
                  >
                    {showFinalCta ? '← Back to 6 Systems' : 'View "BUILD" Offer →'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Executive Selector + 3-Pillar CEO Guarantee */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Our 3-Pillar Executive Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-luxury-silver leading-relaxed">
                1️⃣ <strong className="text-white">We walk into your company</strong> &amp; find <strong className="text-emerald-400">$2,500+/mo ($30K/yr)</strong> in savings or you pay $0.
                <br />
                2️⃣ <strong className="text-white">We build custom AI apps &amp; JAss 24/7 agents</strong> in 48 hours.
                <br />
                3️⃣ <strong className="text-white">We stay with you &amp; train your staff</strong> ($497 Bootcamp) so 1 employee = 5.
              </p>
            </div>

            <div className="space-y-2.5">
              {EXECUTIVE_VISION_SYSTEMS.map((sys, idx) => {
                const selected = !showFinalCta && idx === activeIndex
                return (
                  <button
                    key={sys.index}
                    onClick={() => {
                      setShowFinalCta(false)
                      setActiveIndex(idx)
                      setIsPlaying(false)
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      selected
                        ? 'bg-white/[0.10] border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-extrabold shrink-0 ${
                          selected
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {sys.index}
                      </span>
                      <div className="truncate">
                        <div className="text-sm sm:text-base font-bold text-white truncate">
                          {sys.title}
                        </div>
                        <div className="text-xs text-luxury-silver truncate">{sys.metricBadge}</div>
                      </div>
                    </div>
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        selected ? 'text-amber-400' : 'text-white/20'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/booking?utm_source=website&utm_medium=vision_glass_deck&utm_campaign=ceo_fast_action"
                className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
              >
                <Zap className="w-4 h-4" />
                Book $99 Audit or Free 48-Hr Prototype
              </Link>
              <a
                href="tel:+17866432099"
                className="py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                (786) 643-2099
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
