import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Cpu,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Brain,
  Workflow,
  Zap,
  GraduationCap,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const steps = [
  {
    id: 'consultation',
    number: '00',
    title: 'Free Consultation',
    subtitle: 'Let\'s Talk First',
    icon: MessageCircle,
    color: 'from-luxury-gold/30 to-amber-600/30',
    borderColor: 'border-luxury-gold/40',
    glowColor: 'shadow-luxury-gold/20',
    accentColor: '#c9a96e',
    description:
      'Every engagement starts with a free consultation. We discuss your challenges, goals, and how AI automation can transform your operations.',
    details: [
      '30-minute strategy call',
      'Business challenge assessment',
      'AI automation opportunity mapping',
      'Custom roadmap preview',
      'No commitment required',
    ],
    stats: { label: 'Consultation', value: 'Free' },
    iconBg: 'bg-luxury-gold/20',
  },
  {
    id: 'audit',
    number: '01',
    title: 'AI Readiness Audit',
    subtitle: 'First Audit',
    icon: Search,
    color: 'from-violet-500/30 to-purple-600/30',
    borderColor: 'border-violet-500/40',
    glowColor: 'shadow-violet-500/20',
    accentColor: '#8b5cf6',
    description:
      'We begin with a comprehensive assessment of your current operations, identifying where AI automation can deliver immediate impact.',
    details: [
      'Process mapping & workflow analysis',
      'Data infrastructure evaluation',
      'AI automation opportunity scoring',
      'Feasibility & risk assessment',
      'Integration readiness check',
    ],
    stats: { label: 'Audit Duration', value: '3-5 Days' },
    iconBg: 'bg-violet-500/20',
  },
  {
    id: 'implementation',
    number: '02',
    title: 'AI Implementation',
    subtitle: 'Solutions Deployed',
    icon: Cpu,
    color: 'from-cyan-500/30 to-blue-600/30',
    borderColor: 'border-cyan-500/40',
    glowColor: 'shadow-cyan-500/20',
    accentColor: '#06b6d4',
    description:
      'We build and deploy custom AI solutions tailored to your specific workflows. Minimal disruption, maximum impact.',
    details: [
      'Custom AI automation development',
      'Integration with existing tools',
      'API connections & automation',
      'Real-time data pipelines',
      'Security & compliance setup',
    ],
    stats: { label: 'Typical Timeline', value: '2-4 Weeks' },
    iconBg: 'bg-cyan-500/20',
  },
  {
    id: 'roi',
    number: '03',
    title: 'Savings & ROI Analysis',
    subtitle: 'Cost Analysis',
    icon: TrendingUp,
    color: 'from-emerald-500/30 to-green-600/30',
    borderColor: 'border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20',
    accentColor: '#10b981',
    description:
      'We quantify the financial impact with detailed cost savings analysis, ROI projections, and performance dashboards for AI automation investments.',
    details: [
      'Cost-benefit analysis',
      'ROI projection modeling',
      'Efficiency gain metrics',
      'Performance dashboards',
      'Monthly savings reports',
    ],
    stats: { label: 'Avg. Client Savings', value: '40-60%' },
    iconBg: 'bg-emerald-500/20',
  },
  {
    id: 'staff-training',
    number: '04',
    title: 'Staff Training',
    subtitle: 'The Foundation',
    icon: Users,
    color: 'from-amber-500/30 to-orange-600/30',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/20',
    accentColor: '#f59e0b',
    description:
      'Your team is the key to success. We provide hands-on training to ensure everyone is confident and empowered with the new AI tools.',
    details: [
      'Role-based training sessions',
      'Hands-on workshops',
      'Documentation & guides',
      'Q&A and support sessions',
      'Certification program',
    ],
    stats: { label: 'Training Hours', value: '10-20 hrs' },
    iconBg: 'bg-amber-500/20',
    featured: true,
  },
  {
    id: 'use-case-training',
    number: '05',
    title: 'Use Case Training',
    subtitle: 'Advanced Application',
    icon: Target,
    color: 'from-rose-500/30 to-pink-600/30',
    borderColor: 'border-rose-500/40',
    glowColor: 'shadow-rose-500/20',
    accentColor: '#f43f5e',
    description:
      'We train your team on specific AI automation use cases for your industry — ensuring they know exactly how to leverage advanced systems for daily operations.',
    details: [
      'Industry-specific use cases',
      'Advanced prompt engineering',
      'Workflow optimization',
      'Troubleshooting & debugging',
      'Continuous learning plans',
    ],
    stats: { label: 'Use Cases Covered', value: '15+' },
    iconBg: 'bg-rose-500/20',
  },
]

export default function OurProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const diagramRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveStep(index)
            }
          })
        },
        { threshold: [0.3, 0.5, 0.7] }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Track overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress((scrolled / totalHeight) * 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-8">
              <Workflow className="w-4 h-4" />
              How We Work
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif">
              <span className="text-white">Our </span>
              <span className="gradient-text">Process</span>
            </h1>

            <p className="text-xl md:text-2xl text-luxury-silver max-w-3xl mx-auto leading-relaxed">
              From first audit to fully trained team — experience how we transform
              your business with AI, step by step.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-luxury-gold rounded-full"
                style={{ width: `${Math.max(progress, 5)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs text-luxury-silver">
              <span>Start</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="relative pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* LEFT COLUMN - Sticky Diagram */}
            <div className="lg:w-[380px] xl:w-[420px] lg:flex-shrink-0">
              <div
                ref={diagramRef}
                className="lg:sticky lg:top-32 space-y-4"
              >
                {/* Step Diagram */}
                <div className="relative">
                  {/* Vertical Connection Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-amber-500/50 hidden lg:block" />

                  {/* Animated Progress Line */}
                  <motion.div
                    className="absolute left-6 top-8 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-amber-500 hidden lg:block"
                    style={{
                      height: `${(activeStep / (steps.length - 1)) * 100}%`,
                      maxHeight: 'calc(100% - 4rem)',
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  {steps.map((step, index) => {
                    const isActive = index === activeStep
                    const isPast = index < activeStep
                    const Icon = step.icon

                    return (
                      <motion.div
                        key={step.id}
                        className={`relative flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 group ${
                          isActive
                            ? 'bg-white/5 backdrop-blur-sm'
                            : 'hover:bg-white/[0.02]'
                        }`}
                        onClick={() => scrollToSection(index)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Step Node */}
                        <div className="relative flex-shrink-0">
                          <motion.div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                              isActive
                                ? `${step.borderColor} ${step.iconBg} shadow-lg ${step.glowColor}`
                                : isPast
                                ? 'border-white/20 bg-white/10'
                                : 'border-white/10 bg-white/5'
                            }`}
                            animate={
                              isActive
                                ? {
                                    scale: [1, 1.1, 1],
                                    boxShadow: [
                                      `0 0 0px ${step.accentColor}00`,
                                      `0 0 20px ${step.accentColor}40`,
                                      `0 0 0px ${step.accentColor}00`,
                                    ],
                                  }
                                : {}
                            }
                            transition={
                              isActive
                                ? {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }
                                : {}
                            }
                          >
                            {isPast ? (
                              <CheckCircle2
                                className="w-5 h-5"
                                style={{ color: step.accentColor }}
                              />
                            ) : (
                              <Icon
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  isActive ? '' : 'text-luxury-silver'
                                }`}
                                style={isActive ? { color: step.accentColor } : {}}
                              />
                            )}
                          </motion.div>

                          {/* Pulse Ring for Active */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl border-2"
                              style={{ borderColor: step.accentColor }}
                              animate={{
                                scale: [1, 1.3, 1.3],
                                opacity: [0.5, 0, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                              }}
                            />
                          )}
                        </div>

                        {/* Step Info */}
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-bold ${
                                isActive ? 'text-white' : 'text-luxury-silver'
                              }`}
                            >
                              {step.number}
                            </span>
                            {step.featured && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase tracking-wider">
                                Key Step
                              </span>
                            )}
                          </div>
                          <h3
                            className={`text-sm font-semibold transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-luxury-silver'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-xs mt-0.5 transition-colors duration-300 ${
                              isActive ? 'text-luxury-silver/80' : 'text-luxury-silver/40'
                            }`}
                          >
                            {step.subtitle}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          className={`flex-shrink-0 pt-3 transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 text-luxury-gold" />
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Stats Card */}
                <motion.div
                  className="mt-8 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-luxury-gold" />
                    <span className="text-sm font-semibold text-white">Current Step</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-luxury-silver">{steps[activeStep].title}</span>
                      <span
                        className="font-semibold"
                        style={{ color: steps[activeStep].accentColor }}
                      >
                        {steps[activeStep].number}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: steps[activeStep].accentColor,
                          width: `${((activeStep + 1) / steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-luxury-silver">
                      <span>Overall Progress</span>
                      <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="mt-6 p-6 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-luxury-silver mb-4">
                    Ready to start your AI journey?
                  </p>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-luxury-gold text-dark font-semibold text-sm hover:bg-luxury-gold-light transition-all hover:shadow-lg hover:shadow-luxury-gold/20"
                  >
                    Book Free Audit
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* RIGHT COLUMN - Scrollable Content */}
            <div className="flex-1 space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === activeStep

                return (
                  <motion.div
                    key={step.id}
                    ref={(el) => { sectionRefs.current[index] = el }}
                    className={`relative rounded-3xl border transition-all duration-700 overflow-hidden ${
                      isActive
                        ? `${step.borderColor} bg-gradient-to-br ${step.color}`
                        : 'border-white/5 bg-white/[0.02]'
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Number Background */}
                    <div className="absolute top-4 right-4 text-8xl font-bold opacity-5 font-serif select-none">
                      {step.number}
                    </div>

                    <div className="relative p-8 md:p-10 lg:p-12">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-8">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.iconBg} border ${step.borderColor}`}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: step.accentColor }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: `${step.accentColor}20`,
                                color: step.accentColor,
                              }}
                            >
                              Step {step.number}
                            </span>
                            {step.featured && (
                              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Most Important
                              </span>
                            )}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
                            {step.title}
                          </h2>
                          <p className="text-luxury-silver mt-2 text-lg">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-lg text-luxury-silver/90 leading-relaxed mb-8 max-w-2xl">
                        {step.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${step.accentColor}20` }}
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5"
                                style={{ color: step.accentColor }}
                              />
                            </div>
                            <span className="text-sm text-luxury-champagne/90">
                              {detail}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stats & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <div
                            className="px-5 py-3 rounded-xl border"
                            style={{
                              borderColor: `${step.accentColor}30`,
                              backgroundColor: `${step.accentColor}10`,
                            }}
                          >
                            <div className="text-xs text-luxury-silver mb-1">
                              {step.stats.label}
                            </div>
                            <div
                              className="text-xl font-bold"
                              style={{ color: step.accentColor }}
                            >
                              {step.stats.value}
                            </div>
                          </div>
                        </div>

                        {index < steps.length - 1 ? (
                          <button
                            onClick={() => scrollToSection(index + 1)}
                            className="group flex items-center gap-2 text-sm text-luxury-silver hover:text-white transition-colors"
                          >
                            Next: {steps[index + 1].title}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <a
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-luxury-gold text-dark font-semibold text-sm hover:bg-luxury-gold-light transition-all"
                          >
                            Start Your Journey
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50"
                      style={{
                        background: `linear-gradient(to right, ${step.accentColor}00, ${step.accentColor}, ${step.accentColor}00)`,
                      }}
                    />
                  </motion.div>
                )
              })}

              {/* Final CTA Section */}
              <motion.div
                className="relative rounded-3xl border border-luxury-gold/20 bg-gradient-to-br from-luxury-gold/10 to-transparent p-10 md:p-12 text-center overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,169,110,0.1)_0%,_transparent_70%)]" />

                <div className="relative">
                  <Brain className="w-12 h-12 text-luxury-gold mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-lg text-luxury-silver max-w-2xl mx-auto mb-8">
                    Let's start with a free AI readiness audit. No commitment, just insights
                    into how AI can work for your specific industry and workflows.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-luxury-gold text-dark font-semibold hover:bg-luxury-gold-light transition-all hover:shadow-xl hover:shadow-luxury-gold/20"
                    >
                      <Search className="w-5 h-5" />
                      Book Free Audit
                    </a>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
                    >
                      <GraduationCap className="w-5 h-5" />
                      Back to Home
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
