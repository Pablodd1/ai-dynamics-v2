import { motion } from 'framer-motion'
import { ArrowRight, Play, Cpu, Network, Zap, MessageSquare, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'
import MatrixRain from './MatrixRain'

// AI Chatbot Demo Widget
const AIChatDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()
  const [messages, setMessages] = useState([
    { type: 'ai', text: t('chat.greeting') as string }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { type: 'user', text: input }])

    setTimeout(() => {
      const responses = [
        t('chat.response1') as string,
        t('chat.response2') as string,
        t('chat.response3') as string,
        t('chat.response4') as string,
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { type: 'ai', text: randomResponse }])
    }, 1000)

    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-2xl border border-luxury-gold/30 bg-luxury-gold/10 backdrop-blur-md flex items-center justify-center text-luxury-gold hover:bg-luxury-gold/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-28 right-8 z-50 w-80 rounded-2xl border border-white/10 bg-dark-50/95 backdrop-blur-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-luxury-gold/10 to-transparent">
            <div>
              <h4 className="font-semibold text-white font-serif">{t('chat.title') as string}</h4>
              <span className="text-xs text-luxury-gold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                {t('chat.online') as string}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-luxury-silver hover:text-white">
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.type === 'user'
                      ? 'bg-luxury-gold text-dark font-medium'
                      : 'bg-white/10 text-luxury-champagne'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chat.placeholder') as string}
              className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver focus:outline-none focus:border-luxury-gold/50 transition-all"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-luxury-gold text-dark font-semibold hover:bg-luxury-gold-light transition-colors"
            >
              →
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}

const Hero = () => {
  const { t } = useI18n()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <span className="text-sm text-luxury-champagne tracking-wide">{t('hero.badge') as string}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-serif"
        >
          <span className="block text-white mb-3">{t('hero.title1') as string}</span>
          <span className="block text-luxury-gold">
            {t('hero.title2') as string}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-luxury-silver max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href="#pricing" className="btn-primary flex items-center justify-center gap-2 group text-base">
            See Pricing & Packages
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="btn-secondary flex items-center justify-center gap-2 text-base">
            <Play className="w-5 h-5" />
            Book Free 15-Min Call
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
            { icon: Cpu, label: t('hero.feature1') as string },
            { icon: Network, label: t('hero.feature2') as string },
            { icon: Zap, label: t('hero.feature3') as string },
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

      {/* AI Chatbot Demo */}
      <AIChatDemo />
    </section>
  )
}

export default Hero