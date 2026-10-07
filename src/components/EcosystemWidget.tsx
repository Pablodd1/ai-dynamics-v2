import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, ExternalLink, Globe } from 'lucide-react'
import { ECOSYSTEM_MEMBERS } from '../data/ecosystem'

interface EcosystemWidgetProps {
  currentSiteId?: string
  buttonPosition?: 'bottom-left' | 'bottom-right'
}

export function EcosystemWidget({
  currentSiteId = 'ai-dynamics',
  buttonPosition = 'bottom-left'
}: EcosystemWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Listen to escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const positionClasses = buttonPosition === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6'

  return (
    <>
      {/* Floating Network Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses} z-50 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a0a0f]/90 border border-luxury-gold/40 text-white shadow-xl hover:border-luxury-gold hover:shadow-luxury-gold/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md group`}
        aria-label="Open Ecosystem Network"
      >
        <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-[0_0_8px_#c5a059] animate-pulse" />
        <span className="flex flex-col text-left">
          <span className="text-xs font-semibold tracking-wide text-white group-hover:text-luxury-gold transition-colors">
            Innovation Ecosystem
          </span>
          <span className="text-[10px] uppercase font-mono text-luxury-gold/80 tracking-wider">
            8 Platforms
          </span>
        </span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl shadow-luxury-gold/5 flex flex-col overflow-hidden text-white"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex items-start justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Connected Technology Network
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    The Innovation & AI Ecosystem
                  </h3>
                  <p className="text-luxury-silver text-sm mt-1 max-w-xl">
                    A unified portfolio of specialized enterprise AI, clinical health, construction tech, and athletic biomechanics platforms.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-luxury-silver hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid */}
              <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {ECOSYSTEM_MEMBERS.map((item) => {
                  const isCurrent = item.id === currentSiteId
                  const targetUrl = `${item.url}?utm_source=ecosystem_network&utm_medium=cross_promo&utm_campaign=shared_network`

                  return (
                    <a
                      key={item.id}
                      href={targetUrl}
                      target={isCurrent ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`group relative p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                        isCurrent
                          ? 'border-luxury-gold bg-luxury-gold/5 ring-1 ring-luxury-gold/30'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-luxury-gold/40 hover:-translate-y-0.5'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300"
                            style={{ borderColor: `${item.color}40`, color: item.color }}
                          >
                            {item.badge}
                          </span>
                          {isCurrent ? (
                            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                              ● Current Site
                            </span>
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-luxury-gold transition-colors" />
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-luxury-gold transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-luxury-silver mt-1 leading-relaxed">
                          {item.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                        <span>{item.category}</span>
                        <span className="text-luxury-gold font-medium group-hover:translate-x-1 transition-transform">
                          {isCurrent ? 'Active Platform' : 'Launch Platform →'}
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-luxury-gold" />
                  Shared venture innovation ecosystem • South Florida & Global
                </span>
                <span className="text-luxury-gold font-mono">
                  All Systems Online
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EcosystemWidget
