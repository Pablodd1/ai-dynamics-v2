import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { supabase } from '../lib/supabase'

const Contact = () => {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)
    
    try {
      // 1. Send via serverless API
      const apiPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(err => console.warn('API contact error:', err))

      // 2. Also try Supabase leads table
      const supabasePromise = (async () => {
        try {
          const { error } = await supabase
            .from('aidynamic_leads')
            .insert({
              name: formData.name,
              email: formData.email,
              phone: formData.phone || null,
              company: formData.company || null,
              service_interest: ['General Inquiry'],
              status: 'new',
              source: 'website_contact_form',
              notes: formData.message,
            })
          if (error) console.warn('Supabase lead insert notice:', error)
        } catch (err) {
          console.warn('Supabase lead catch notice:', err)
        }
      })()

      await Promise.allSettled([apiPromise, supabasePromise])

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      
      setTimeout(() => setIsSubmitted(false), 8000)
    } catch (err) {
      console.error('Contact form error:', err)
      // Even on client glitch, reassure client
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email') as string,
      value: 'jasmelacosta@gmail.com',
      href: 'mailto:jasmelacosta@gmail.com',
    },
    {
      icon: Phone,
      label: t('contact.phone') as string,
      value: '+1 (786) 643-2099',
      href: 'tel:+17866432099',
    },
    {
      icon: MapPin,
      label: t('contact.location') as string,
      value: 'Miami, FL',
      href: '#',
    },
    {
      icon: Clock,
      label: t('contact.availability') as string,
      value: t('contact.availabilityValue') as string,
      href: '#',
    },
  ]

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.5) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            {t('contact.badge') as string}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">{t('contact.title1') as string}</span>{' '}
            <span className="text-luxury-gold">{t('contact.title2') as string}</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-3xl mx-auto">
            {t('contact.subtitle') as string}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 font-serif">{t('contact.infoTitle') as string}</h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label as string}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/30 hover:bg-luxury-gold/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 flex items-center justify-center group-hover:border-luxury-gold/40 transition-colors">
                    <item.icon className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-luxury-silver">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-luxury-silver ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-luxury-gold/30 bg-gradient-to-br from-luxury-gold/15 to-dark-50 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-luxury-gold" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-luxury-gold animate-ping" />
                </div>
                <span className="text-luxury-gold font-bold text-sm">Direct Online Calendar Booking</span>
              </div>
              <p className="text-sm text-luxury-silver mb-4 leading-relaxed">
                Prefer to lock in an exact 30-minute strategy session immediately? Choose a convenient time directly on Jasmel's calendar:
              </p>
              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-luxury-gold via-amber-300 to-luxury-gold text-dark flex items-center justify-center gap-2 hover:brightness-110 shadow-md transition-all"
              >
                Open Real-Time Booking Calendar <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">📞 Instant Phone Test</span>
                <span className="text-xs text-white">Call our AI receptionist live:</span>
              </div>
              <a
                href="tel:+17866432099"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
              >
                +1 (786) 643-2099
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">{t('contact.successTitle') as string}</h3>
                  <p className="text-luxury-silver">
                    {t('contact.successMessage') as string}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-luxury-champagne mb-2">
                        {t('contact.name') as string} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder={t('contact.namePlaceholder') as string}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-luxury-champagne mb-2">
                        {t('contact.emailLabel') as string} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder={t('contact.emailPlaceholder') as string}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-luxury-champagne mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder="+1 (305) 555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-luxury-champagne mb-2">
                        {t('contact.company') as string}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder={t('contact.companyPlaceholder') as string}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-luxury-champagne mb-2">
                      {t('contact.message') as string} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
                      placeholder={t('contact.messagePlaceholder') as string}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        {t('contact.send') as string}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
