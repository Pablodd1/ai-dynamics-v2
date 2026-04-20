import { motion } from 'framer-motion'
import { ArrowRight, Play, Cpu, Network, Zap, MessageSquare, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'

// AI Chatbot Demo Widget
const AIChatDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()
  const [messages, setMessages] = useState([
    { type: 'ai', text: t('chat.greeting') }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages([...messages, { type: 'user', text: input }])
    
    setTimeout(() => {
      const responses = [
        t('chat.response1'),
        t('chat.response2'),
        t('chat.response3'),
        t('chat.response4'),
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
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-28 right-8 z-50 w-80 sm:w-96 h-[500px] rounded-3xl neo-morphism overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">{t('chat.title')}</div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {t('chat.online')}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white' 
                    : 'glass text-gray-200'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex gap-2">
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white hover:opacity-90 transition-opacity"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
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
      {/* Full Background Video - Short Loop */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
        >
          {/* Short AI/tech video loops */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Multiple overlay layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/50 via-transparent to-accent/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-dark/50 to-dark/90" />
      </div>

      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{ 
              y: [null, -20, 20, -10, 0],
              opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            }}
            transition={{ 
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-1000">
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotateY: [0, 15, 0],
            rotateX: [0, 8, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-56 h-56 neo-morphism rounded-3xl flex items-center justify-center">
            <Cpu className="w-20 h-20 text-primary-400" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotateY: [0, -20, 0],
            rotateX: [0, -12, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-1/4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-48 h-48 neo-morphism rounded-3xl flex items-center justify-center">
            <Network className="w-16 h-16 text-accent" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 35, 0],
            rotateZ: [0, 8, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-1/3"
        >
          <div className="w-36 h-36 neo-morphism rounded-2xl flex items-center justify-center">
            <Zap className="w-14 h-14 text-yellow-400" />
          </div>
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotateZ: [0, -5, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 right-1/3"
        >
          <div className="w-24 h-24 neo-morphism rounded-xl flex items-center justify-center opacity-70">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge with pulse effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full neo-morphism mb-8 hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-sm text-gray-300">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Heading with 3D effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight perspective-1000"
          >
            <motion.span 
              className="text-white inline-block"
              whileHover={{ scale: 1.02, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t('hero.title1')}
            </motion.span>
            <br />
            <motion.span 
              className="gradient-text inline-block"
              whileHover={{ scale: 1.02, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t('hero.title2')}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 text-balance"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons with neomorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a 
              href="#contact" 
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl neo-morphism text-white font-semibold hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#case-studies" 
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl neo-morphism text-white font-semibold hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t('hero.ctaSecondary')}
            </motion.a>
          </motion.div>

          {/* Feature Pills with micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Cpu, label: t('hero.feature1') },
              { icon: Network, label: t('hero.feature2') },
              { icon: Zap, label: t('hero.feature3') },
            ].map((feature, index) => (
              <motion.div
                key={feature.label as string}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full neo-morphism cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-4 h-4 text-accent" />
                </motion.div>
                <span className="text-sm text-gray-300">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator with bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full neo-morphism flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
        </motion.div>
      </motion.div>

      {/* AI Chatbot Demo */}
      <AIChatDemo />
    </section>
  )
}

export default Hero
