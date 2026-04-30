import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../i18n/LanguageToggle'
import { useI18n } from '../i18n/I18nContext'
import AILogo from './AILogo'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('nav.services') as string, href: '#services' },
    { label: t('nav.caseStudies') as string, href: '#case-studies' },
    { label: t('nav.about') as string, href: '#about' },
    { label: 'Our Process', href: '/process' },
    { label: t('nav.contact') as string, href: '#contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/10' : ''
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <AILogo className="w-10 h-10" showText showTagline />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-luxury-silver hover:text-luxury-champagne transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
              
              <a
                href="#contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-luxury-gold/40 text-luxury-gold text-sm font-semibold hover:bg-luxury-gold/10 transition-all"
              >
                {t('nav.getStarted') as string}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white hover:border-luxury-gold/30 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-20 right-4 left-4 p-6 rounded-2xl border border-white/10 bg-dark-50/95 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-luxury-silver hover:text-luxury-champagne transition-colors py-2"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-luxury-gold/40 text-luxury-gold font-semibold hover:bg-luxury-gold/10 transition-all"
                >
                  {t('nav.getStarted') as string}
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
