import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useI18n } from './I18nContext'

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, languages, t } = useI18n()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = languages.find(l => l.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl neo-morphism text-white hover:scale-105 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-primary-400" />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLang?.label}</span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 rounded-xl neo-morphism overflow-hidden z-50"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider">
                {t('language.title') as string}
              </div>
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    language === lang.code
                      ? 'bg-primary-500/20 text-white'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="w-4 h-4 text-primary-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageToggle
