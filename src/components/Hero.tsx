import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Cpu,
  Network,
  Zap,
  ChevronDown,
  Stethoscope,
  Scale,
  Building2,
  Truck,
  Plus,
  Layers,
  Play,
  X,
  Volume2,
  CheckCircle2
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const EXECUTIVE_HERO_SCENE = {
  id: 'quantum_gold',
  videoSources: [
    'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-42694-large.mp4',
  ],
  posterUrl: '/images/projects/consulting-boardroom.jpg',
  overlayGradient: 'from-[#0a0906]/85 via-[#12100b]/75 to-[#0a0a0f]',
}

const Hero = () => {
  const [showBriefingModal, setShowBriefingModal] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const activeScene = EXECUTIVE_HERO_SCENE

  // High-FPS Interactive 3D Neural Constellation & Telemetry Overlay Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      r: 1.2 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.03

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        // Draw neural synapsis lines
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.22
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(197, 160, 89, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Draw glowing node
        const glowAlpha = 0.35 + Math.sin(n.pulse) * 0.25
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${glowAlpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const industryButtons = [
    { label: 'Healthcare', icon: Stethoscope, href: '#services' },
    { label: 'Legal & Real Estate', icon: Scale, href: '#services' },
    { label: 'Vision & Luxury ID', icon: Building2, href: '#selected-systems' },
    { label: 'CRM & Logistics', icon: Truck, href: '#services' },
    { label: 'All 21 Systems', icon: Plus, href: '#selected-systems' },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleOpenBriefing = () => {
    setShowBriefingModal(true)
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/sofia_services_en.mp3')
      }
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    } catch {
      // Ignore autoplay restriction
    }
  }

  const handleCloseBriefing = () => {
    setShowBriefingModal(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* 1. Spectacular Full-Bleed HTML5 AI Cinema Video Background */}
      <div className="absolute inset-0 z-0 bg-[#060609]">
        <video
          key={activeScene.id}
          autoPlay
          loop
          muted
          playsInline
          poster={activeScene.posterUrl}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55 scale-105 transition-opacity duration-1000"
        >
          {activeScene.videoSources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>

        {/* High-Res Photorealistic Backdrop Underlay for Instant Zero-Latency Paint */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${activeScene.posterUrl})` }}
        />

        {/* Interactive 3D Neural Constellation & Telemetry Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        {/* Cinema Vignette & Luxury Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${activeScene.overlayGradient} z-[2]`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060609_100%)] opacity-80 z-[2]" />
      </div>

      {/* Ambient Gold/Cyan Cinema Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-luxury-gold/10 rounded-full blur-[150px] pointer-events-none z-[2]" />

      {/* Main Hero Content: High-Impact Cyber-Luxury Split Layout (Inspired by Modern Deep-Tech Reference) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-12">
          {/* Left Column: Bold Modernist Tech Typography & Executive CTAs */}
          <div className="lg:col-span-7 text-left">
            {/* Vertical Micro-Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3.5 mb-6"
            >
              <span className="w-1 h-12 bg-gradient-to-b from-red-500 via-rose-500 to-red-600 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
              <div className="text-[11px] font-mono tracking-widest uppercase leading-tight text-luxury-silver">
                <div>EXECUTIVE AI CONSULTING</div>
                <div>FULL WORKFLOW AUTOMATION</div>
                <div className="text-red-400 font-bold">5X STAFF EFFICIENCY</div>
              </div>
            </motion.div>

            {/* Giant Blockbuster Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5 uppercase text-white font-sans drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            >
              <div>THE NEXT</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                AUTONOMOUS
              </div>
              <div>WORKFORCE.</div>
            </motion.h1>

            {/* Executive Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-luxury-silver/90 max-w-xl mb-8 leading-relaxed drop-shadow"
            >
              We consult with companies to audit payroll bottlenecks, build custom AI solutions that automate everything possible, cut operating costs by 40–65%, and train your core staff to operate at <strong className="text-white">5x output</strong>.
            </motion.p>

            {/* CTA Group: $99 Audit + 60s Briefing + 21 Systems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8"
            >
              <Link
                to="/booking"
                className="btn-primary py-4 px-7 rounded-xl flex items-center justify-center gap-2 group text-sm sm:text-base font-bold shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
              >
                <span>Book AI Consultation & $99 Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={handleOpenBriefing}
                className="px-5 py-4 rounded-xl border border-red-500/40 bg-black/80 hover:bg-red-500/10 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 backdrop-blur-md transition-all shadow-lg hover:border-red-500/70"
              >
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Watch 60s Briefing</span>
              </button>
            </motion.div>

            {/* Proof Badges & Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 text-xs text-luxury-silver/80 font-mono"
            >
              <button
                type="button"
                onClick={() => scrollToSection('#selected-systems')}
                className="hover:text-luxury-champagne underline flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-luxury-gold" />
                <span>21 Deployed Systems</span>
              </button>
              <span>•</span>
              <span className="text-emerald-400">Zero-Risk $99 Audit</span>
              <span>•</span>
              <a href="#call-simulator" className="hover:text-luxury-champagne underline flex items-center gap-1 transition-colors">
                <span>24/7 AI Voice Demo (JAss)</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Translucent Glass Cybernetic Intelligence Entity */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Glowing Crimson/Red Circular Halo Backlight */}
            <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-red-600/35 via-rose-600/25 to-transparent blur-[90px] pointer-events-none -z-10" />

            {/* Geometric Halo Ring */}
            <div className="absolute w-[380px] h-[380px] sm:w-[470px] sm:h-[470px] rounded-full border border-red-500/25 pointer-events-none -z-10 animate-pulse" />

            {/* Floating Glass Cybernetic Humanoid Entity */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-red-500/20 group"
            >
              <img
                src="/images/hero-cyber-humanoid.jpg"
                alt="AI Dynamic Pro — Autonomous Neural Cybernetic Entity"
                className="w-full h-auto object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
              />

              {/* Glass Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Live Telemetry Chip */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-red-500/30 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white font-mono tracking-wide">
                      NEURAL WORKFORCE CORE
                    </div>
                    <div className="text-[10px] text-luxury-silver">
                      Sub-Second Decision Latency • 24/7 Operations
                    </div>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-red-400 font-bold shrink-0">
                  ONLINE
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Core Executive Pillars (Glassmorphic Cinema Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-6 mb-8 text-left"
        >
          {[
            {
              icon: Cpu,
              badge: 'PILLAR 01 // CONSULTING',
              title: '1. AI Business Consultation',
              desc: 'We audit your departments and P&L to pinpoint manual bottlenecks, cut operating costs, and map your exact automation ROI ($99 Zero-Risk Audit).',
            },
            {
              icon: Zap,
              badge: 'PILLAR 02 // AUTOMATION',
              title: '2. Custom AI Solutions',
              desc: 'We automate everything possible—24/7 bilingual voice/chat receptionists (JAss), CRM, billing, and computer vision—reducing staff overhead.',
            },
            {
              icon: Network,
              badge: 'PILLAR 03 // WORKFORCE',
              title: '3. Corporate AI Staff Training',
              desc: 'We train and certify your existing team with role-specific AI workflows and SOPs so 1 trained employee delivers the output of 5.',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-5 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-xl hover:border-luxury-gold/50 transition-all shadow-xl"
            >
              <div className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider mb-1">
                {pillar.badge}
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <pillar.icon className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-base font-bold text-white">{pillar.title}</span>
              </div>
              <p className="text-xs text-luxury-silver leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Sector Jump Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2.5 mb-6"
        >
          {industryButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => scrollToSection(btn.href)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/50 backdrop-blur-md hover:border-luxury-gold/40 hover:bg-luxury-gold/10 transition-all text-xs sm:text-sm text-luxury-champagne"
            >
              <btn.icon className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{btn.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-2"
        >
          <button
            type="button"
            onClick={() => scrollToSection('#services')}
            className="flex flex-col items-center gap-1 text-luxury-silver/60 hover:text-luxury-gold transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Explore Solutions & Side-Scroller</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Interactive 60s Executive AI Video & Audio Briefing Modal */}
      <AnimatePresence>
        {showBriefingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={handleCloseBriefing}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl border border-luxury-gold/40 bg-[#0c0c14] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-5 h-5 text-luxury-gold animate-pulse" />
                  <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    AI Dynamic Pro — Executive Consultation, Automation & Training Briefing
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseBriefing}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video + Live Briefing Overlay */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/projects/executive-boardroom.jpg"
                  className="w-full h-full object-cover opacity-65"
                >
                  <source src="https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-3">
                    ● LIVE AUDIO BRIEFING PLAYING (JAss Executive Voice)
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
                    How We Cut Operating Costs by 30%–50% & Automate Your Company
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-luxury-silver mb-6">
                    <div className="p-3 rounded-xl bg-black/75 border border-white/10 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span><strong className="text-white">1. $99 AI Audit:</strong> Pinpoint manual payroll waste ($0 if we don't save 15+ hrs/mo).</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/75 border border-white/10 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span><strong className="text-white">2. Full Automation:</strong> 24/7 Voice/Chat (JAss), CRM, Billing & Computer Vision.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/75 border border-white/10 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span><strong className="text-white">3. Staff Training:</strong> Train 1 employee to produce the output of 5.</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/booking"
                      onClick={handleCloseBriefing}
                      className="btn-primary text-xs sm:text-sm py-3 px-6 flex items-center gap-2"
                    >
                      <span>Book Your $99 Executive AI Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.src = '/audio/sofia_services_es.mp3'
                          audioRef.current.play().catch(() => {})
                        }
                      }}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all"
                    >
                      🔊 Escuchar en Español
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
