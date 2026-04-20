import { motion } from 'framer-motion'
import { ArrowRight, Play, Cpu, Network, Zap, MessageSquare, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'

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
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-2xl neo-morphism flex items-center justify-center text-white hover:scale-110 transition-transform"
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
          className="fixed bottom-28 right-8 z-50 w-80 rounded-2xl glass overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white">{t('chat.title') as string}</h4>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t('chat.online') as string}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
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
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/10 text-gray-300'
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
              className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
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
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-68-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark" />
      </div>

      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotateX: [0, 10, 0],
            rotateY: [0, 15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-64 h-64 border border-primary-500/20 rounded-3xl"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        />
        <motion.div
          animate={{ 
            rotateX: [0, -15, 0],
            rotateY: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 w-48 h-48 border border-accent/20 rounded-2xl"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge with pulse effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          <span className="text-sm text-gray-300">{t('hero.badge') as string}</span>
        </motion.div>

        {/* Main Heading with 3D effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{ perspective: '1000px' }}
        >
          <span className="block text-white mb-2">{t('hero.title1') as string}</span>
          <span className="block gradient-text" style={{ transform: 'translateZ(50px)' }}>
            {t('hero.title2') as string}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        {/* CTA Buttons with neomorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a href="#contact" className="btn-primary flex items-center justify-center gap-2 group">
            {t('hero.ctaPrimary') as string}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#case-studies" className="btn-secondary flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            {t('hero.ctaSecondary') as string}
          </a>
        </motion.div>

        {/* Feature Pills with micro-interactions */}
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
              className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors cursor-default"
            >
              <feature.icon className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator with bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
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
