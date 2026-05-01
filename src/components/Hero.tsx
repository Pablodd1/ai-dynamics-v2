import { motion } from 'framer-motion'
import { ArrowRight, Play, Cpu, Network, Zap, ChevronDown, Stethoscope, Scale, Building2, Truck, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import MatrixRain from './MatrixRain'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const industryButtons = [
    { label: 'Healthcare', icon: Stethoscope, href: '#industries' },
    { label: 'Legal', icon: Scale, href: '#industries' },
    { label: 'Real Estate', icon: Building2, href: '#industries' },
    { label: 'Logistics', icon: Truck, href: '#industries' },
    { label: 'More', icon: Plus, href: '#industries' },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark-50/60 to-dark" />
      </div>

      {/* Gold accent glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-3xl"
      />

      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(201, 169, 110, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 110, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold" />
          </span>
          <span className="text-sm text-luxury-champagne tracking-wide">AI Automation for Small Business</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
        >
          <span className="block text-white mb-3">We automate the work</span>
          <span className="block text-luxury-gold">
            that's slowing your business down.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-luxury-silver max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Small and mid-sized businesses lose 15-25% of productive hours to manual, repetitive work. 
          We build AI systems that give those hours back.
        </motion.p>

        {/* Industry Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {industryButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => scrollToSection(btn.href)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:border-luxury-gold/30 hover:bg-luxury-gold/5 transition-all text-sm text-luxury-champagne"
            >
              <btn.icon className="w-4 h-4 text-luxury-gold" />
              {btn.label}
            </button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href="https://aidynamic.pro/booking" className="btn-primary flex items-center justify-center gap-2 group text-base">
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#pricing" className="btn-secondary flex items-center justify-center gap-2 text-base">
            <Play className="w-5 h-5" />
            See Packages
          </a>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Cpu, label: 'Custom AI Workflows' },
            { icon: Network, label: 'Any Industry' },
            { icon: Zap, label: '2-Week Delivery' },
          ].map((feature) => (
            <motion.div
              key={feature.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:border-luxury-gold/30 hover:bg-luxury-gold/5 transition-all cursor-default"
            >
              <feature.icon className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm text-luxury-champagne">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-luxury-silver/50"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero