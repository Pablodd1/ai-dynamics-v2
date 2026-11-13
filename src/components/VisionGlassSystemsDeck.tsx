import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export interface VisionArchitectureCard {
  index: string
  stepNumber: number
  sectorTag: string
  title: string
  executiveThesis: string
  financialImpact: string
  architectureStack: string[]
  ctaKeyword: string
}

export const EXECUTIVE_ARCHITECTURE_DECK: VisionArchitectureCard[] = [
  {
    index: '01',
    stepNumber: 1,
    sectorTag: 'ARCHITECTURE 01 / 06 — CLINICAL & HEALTHCARE AI',
    title: 'Clinical Operations & Revenue Intelligence',
    executiveThesis:
      'We walk into medical practices and engineer ambient clinical charting, automated 837 claim scrubbing, and bilingual patient intake—cutting 45% of front-desk and billing payroll while training your clinical staff to process 4x patient volume.',
    financialImpact: '-45% Clinical Admin Overhead • $30,000+/yr Saved',
    architectureStack: ['Ambient Clinical Scribe', '837 Claim Scrubbing Engine', 'On-Site Staff Training'],
    ctaKeyword: 'AUDIT',
  },
  {
    index: '02',
    stepNumber: 2,
    sectorTag: 'ARCHITECTURE 02 / 06 — COMPUTER VISION & SPATIAL AI',
    title: 'Computer Vision, Macro ID & 3D LiDAR Systems',
    executiveThesis:
      'Replace slow human inspections with 3-second neural vision. We build custom YOLOv8 and DINOv2 vision models for macro luxury authentication, 12-class property defect detection, and millimeter-accurate 3D LiDAR floorplan generation.',
    financialImpact: '3-Second Neural Inspection • 99.4% Precision',
    architectureStack: ['YOLOv8 + DINOv2 Vision', 'LiDAR 3D Digital Twin', 'Automated PDF Certification'],
    ctaKeyword: 'VISION',
  },
  {
    index: '03',
    stepNumber: 3,
    sectorTag: 'ARCHITECTURE 03 / 06 — AUTONOMOUS REVOPS & VOICE',
    title: '24/7 Bilingual Voice & Sub-Minute RevOps',
    executiveThesis:
      '38% of inbound calls hang up on voicemail and 47-minute human follow-ups kill 78% of deals. Our JAss bilingual voice and multi-channel CRM architecture answers on Ring 1 and locks retainers onto your calendar in 3 seconds.',
    financialImpact: '3-Second Ring-1 Answer • 3.4x More Retainers Booked',
    architectureStack: ['JAss Bilingual Voice AI', 'Sub-Minute CRM Routing', 'Zero Missed Revenue'],
    ctaKeyword: 'JASS',
  },
  {
    index: '04',
    stepNumber: 4,
    sectorTag: 'ARCHITECTURE 04 / 06 — LEGAL, REAL ESTATE & ADVISORY',
    title: 'Private RAG Contract Intelligence & Deal Matching',
    executiveThesis:
      'Eliminate 15+ hours a week of paralegal and brokerage bottlenecks. We deploy sovereign document RAG that screens agreements for risk clauses in seconds, orchestrates escrow deadlines, and matches off-market investor mandates.',
    financialImpact: '-15 Hrs/Wk Legal & Broker Admin • Zero Missed Cutoffs',
    architectureStack: ['Private Document RAG', 'Vector Deal Matchmaker', 'Escrow & Court Telemetry'],
    ctaKeyword: 'LEGAL',
  },
  {
    index: '05',
    stepNumber: 5,
    sectorTag: 'ARCHITECTURE 05 / 06 — BIOMECHANICS & AGENTIC WEB',
    title: '33-Joint Kinematics & Self-Learning Web Platforms',
    executiveThesis:
      'From smartphone-based 33-joint gait biomechanics and daily HRV coaching to self-learning Agentic Websites engineered for Google and LLM Answer Engines, we build proprietary software that turns your company into an industry category leader.',
    financialImpact: '5–10 Day Production Launch • Full AEO Authority',
    architectureStack: ['33-Joint Pose Vision', 'Agentic Web Architecture', 'Schema.org LLM Graph'],
    ctaKeyword: 'BUILD',
  },
  {
    index: '06',
    stepNumber: 6,
    sectorTag: 'ARCHITECTURE 06 / 06 — WORKFORCE MULTIPLICATION',
    title: 'On-Site Corporate AI Bootcamp & 48-Hr Prototype',
    executiveThesis:
      '83% of corporate AI fails because teams are handed software without training. We build a working prototype in 48 hours—guaranteed to uncover $2,500+/month in savings or you pay $0—and stay on-site training your staff so 1 employee produces the output of 5.',
    financialImpact: '$99 Dept Audit • $497 Staff Bootcamp (1 Staff = 5x)',
    architectureStack: ['48-Hour Live Prototype', '$2,500+/mo Guarantee', 'On-Site Staff Bootcamp'],
    ctaKeyword: 'SCALE',
  },
]

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
      } else if (activeIndex === EXECUTIVE_ARCHITECTURE_DECK.length - 1) {
        setShowFinalCta(true)
      } else {
        setActiveIndex((prev) => prev + 1)
      }
    }, 3600)
    return () => clearInterval(timer)
  }, [isPlaying, activeIndex, showFinalCta])

  const activeSystem = EXECUTIVE_ARCHITECTURE_DECK[activeIndex]

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#040407] border-y border-white/[0.08]"
    >
      <div id="ai-systems-deck" className="sr-only" />
      {/* Signature Luxury Gold & Electric Cyan Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-luxury-gold/[0.07] blur-[150px]" />
        <div className="absolute bottom-0 right-12 w-[480px] h-[480px] rounded-full bg-accent/[0.06] blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Executive Header (Zero Icons, Pure Editorial Typography) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/35 bg-luxury-gold/[0.06] text-[11px] font-mono uppercase tracking-[0.24em] text-luxury-gold mb-5">
            AI DYNAMIC PRO • PROPRIETARY ENGINEERING &amp; WORKFORCE MULTIPLICATION
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            Six Production AI Architectures{' '}
            <span className="text-luxury-gold font-normal italic">
              Engineered Inside Your Company
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-luxury-silver leading-relaxed">
            We do not sell generic templates. As hands-on <strong className="text-white">AI Developers &amp; Creators</strong>, we walk into your industry, engineer custom production systems in 48 hours, and stay side-by-side training your staff until one employee produces the output of five.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Minimalist Obsidian & Champagne-Gold Frosted Glass Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[560px] rounded-[32px] overflow-hidden border border-luxury-gold/30 shadow-[0_35px_100px_rgba(0,0,0,0.9)] bg-[#06060b]">
              {/* Pure Obsidian & 24K Radial Light Field + Subtle Architectural Hairline Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.16),transparent_65%)] pointer-events-none" />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.12) 1px, transparent 1px)',
                  backgroundSize: '44px 44px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#040407]/40 via-transparent to-[#040407]/90 pointer-events-none" />

              <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-between min-h-[560px] sm:min-h-[610px]">
                {/* Top Minimalist Editorial Header */}
                <div className="text-center pb-5 border-b border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-luxury-gold mb-2">
                    AI DYNAMIC PRO — EXECUTIVE ARCHITECTURE DECK
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    Six Custom AI Architectures Built for Immediate ROI
                  </div>

                  {/* Segmented 6-Bar Champagne-Gold Progress Bar */}
                  <div className="flex items-center justify-center gap-2.5 mt-5 max-w-[280px] mx-auto">
                    {EXECUTIVE_ARCHITECTURE_DECK.map((sys, idx) => {
                      const isActive = !showFinalCta && idx === activeIndex
                      const isCompleted = showFinalCta || idx < activeIndex
                      return (
                        <button
                          key={sys.index}
                          onClick={() => {
                            setShowFinalCta(false)
                            setActiveIndex(idx)
                          }}
                          aria-label={`Select Architecture ${sys.index}`}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'w-12 bg-luxury-gold shadow-[0_0_12px_rgba(201,169,110,0.85)]'
                              : isCompleted
                              ? 'w-6 bg-luxury-champagne/60'
                              : 'w-6 bg-white/20 hover:bg-white/35'
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Center Frosted Glass Architectural Card (Zero Icons, Pure Typography) */}
                <div className="my-auto py-4">
                  <AnimatePresence mode="wait">
                    {!showFinalCta ? (
                      <motion.div
                        key={activeSystem.index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.26 }}
                        className="rounded-[24px] p-7 sm:p-8 backdrop-blur-2xl bg-[#0d0d14]/75 border border-luxury-gold/35 shadow-[0_25px_60px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(247,231,206,0.22)]"
                      >
                        {/* Top Row: Sector Tag + Architectural Index */}
                        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-luxury-gold mb-1">
                              {activeSystem.sectorTag}
                            </div>
                            <div className="text-xs font-mono text-accent font-semibold">
                              {activeSystem.financialImpact}
                            </div>
                          </div>
                          <span className="text-4xl sm:text-5xl font-serif font-light text-luxury-champagne/85 leading-none tracking-tight">
                            {activeSystem.index}
                          </span>
                        </div>

                        {/* Title & Concise Executive Thesis */}
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug mb-3.5">
                          {activeSystem.title}
                        </h3>

                        <p className="text-sm sm:text-base text-luxury-platinum/90 font-normal leading-relaxed mb-7">
                          {activeSystem.executiveThesis}
                        </p>

                        {/* Minimalist Architecture Stack Spec */}
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-luxury-silver mb-2.5">
                            PRODUCTION ARCHITECTURE &amp; DEPLOYMENT
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {activeSystem.architectureStack.map((item, idx) => (
                              <div key={item} className="flex items-center gap-2">
                                {idx > 0 && (
                                  <span className="text-luxury-gold font-mono text-xs select-none">/</span>
                                )}
                                <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-luxury-champagne">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="executive-cta"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.26 }}
                        className="rounded-[24px] p-8 sm:p-10 text-center backdrop-blur-2xl bg-[#0d0d14]/85 border border-luxury-gold/60 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
                      >
                        <div className="text-[11px] font-mono uppercase tracking-[0.26em] text-luxury-gold mb-3">
                          EXECUTIVE DECISION PROTOCOL
                        </div>
                        <div className="inline-block px-8 py-3.5 rounded-xl bg-luxury-gold text-dark font-serif font-bold text-2xl sm:text-3xl tracking-wider mb-5 shadow-[0_10px_30px_rgba(201,169,110,0.35)]">
                          &ldquo;SCALE&rdquo;
                        </div>
                        <p className="text-base sm:text-lg font-serif text-white max-w-md mx-auto leading-relaxed mb-6">
                          We engineer a live 48-hour AI prototype for your company—guaranteed to uncover $2,500+/month in savings or you pay $0—and stay to train your staff.
                        </p>
                        <Link
                          to="/booking?utm_source=website&utm_medium=vision_architecture_deck&utm_campaign=ceo_decision"
                          className="inline-block px-7 py-3.5 rounded-xl bg-white text-dark font-mono uppercase tracking-wider font-bold text-xs hover:bg-luxury-champagne transition-colors"
                        >
                          Schedule $99 Department Audit or 48-Hr Prototype →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Minimalist Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-luxury-silver">
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white transition-colors"
                  >
                    {isPlaying ? 'Pause Sequence' : 'Resume Sequence'}
                  </button>

                  <button
                    onClick={() => setShowFinalCta((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-lg bg-luxury-gold/15 hover:bg-luxury-gold/25 border border-luxury-gold/40 text-luxury-gold transition-colors"
                  >
                    {showFinalCta ? 'Return to Architectures' : 'Executive Mandate →'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Architectural Index Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0d0d14] border border-luxury-gold/30 mb-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-luxury-gold mb-2">
                THE CEO MANDATE — THREE NON-NEGOTIABLE PILLARS
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-luxury-silver leading-relaxed">
                <p>
                  <strong className="text-white font-mono">01 / AUDIT &amp; PROTOTYPE:</strong> We walk into your operation, audit your slowest department ($99), and build a working prototype in 48 hours—guaranteed to uncover <strong className="text-luxury-champagne">$2,500+/mo ($30K/yr)</strong> in savings or you pay $0.
                </p>
                <p>
                  <strong className="text-white font-mono">02 / PROPRIETARY AI APPS:</strong> From Computer Vision and Clinical AI to 24/7 Bilingual Voice (JAss), we engineer custom software around your exact workflow.
                </p>
                <p>
                  <strong className="text-white font-mono">03 / ON-SITE STAFF TRAINING:</strong> We stay with your team ($497 Bootcamp for up to 15 staff) until <strong className="text-luxury-champagne">1 AI-trained employee produces the output of 5</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {EXECUTIVE_ARCHITECTURE_DECK.map((sys, idx) => {
                const selected = !showFinalCta && idx === activeIndex
                return (
                  <button
                    key={sys.index}
                    onClick={() => {
                      setShowFinalCta(false)
                      setActiveIndex(idx)
                      setIsPlaying(false)
                    }}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      selected
                        ? 'bg-luxury-gold/[0.12] border-luxury-gold shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-luxury-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`font-serif text-lg font-bold shrink-0 ${
                          selected ? 'text-luxury-gold' : 'text-luxury-silver/60'
                        }`}
                      >
                        {sys.index}
                      </span>
                      <div className="truncate">
                        <div className="text-sm font-serif font-bold text-white truncate">
                          {sys.title}
                        </div>
                        <div className="text-[11px] font-mono text-luxury-silver truncate">
                          {sys.financialImpact}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border ${
                        selected
                          ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/10'
                          : 'border-white/10 text-white/30'
                      }`}
                    >
                      {sys.ctaKeyword}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/booking?utm_source=website&utm_medium=vision_architecture_deck&utm_campaign=ceo_fast_action"
                className="flex-1 py-4 px-6 rounded-xl bg-luxury-gold text-dark font-mono uppercase tracking-wider font-extrabold text-xs text-center hover:bg-luxury-champagne transition-all shadow-lg"
              >
                Book $99 Audit or 48-Hr Prototype →
              </Link>
              <a
                href="tel:+17866432099"
                className="py-4 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-bold text-center transition-all"
              >
                +1 (786) 643-2099
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
