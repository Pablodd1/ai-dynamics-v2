import { motion } from 'framer-motion'
import { Download, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const LeadMagnet = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // Brevo API integration — key is injected via Vercel env var
      const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || ''

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          emailBlacklisted: false,
          smsBlacklisted: false,
          listIds: [1], // MBMB MIAMI list
          attributes: {
            SOURCE: 'AI Dynamics - Lead Magnet',
            INTEREST: 'Workflow Automation Guide',
          },
          updateEnabled: true,
        }),
      })

      if (response.ok || response.status === 204) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        const data = await response.json().catch(() => ({}))
        if (data.message?.includes('already exists')) {
          setIsSubmitted(true)
          setEmail('')
        } else {
          setError('Something went wrong. Please try again.')
        }
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="lead-magnet" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.8) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5 p-8 md:p-12 text-center"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-serif">You're on the list!</h3>
              <p className="text-luxury-silver">
                Check your inbox — the guide is on its way.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-xl border border-luxury-gold/30 bg-luxury-gold/10 flex items-center justify-center mx-auto mb-6">
                <Download className="w-7 h-7 text-luxury-gold" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                Get the free guide
              </h2>
              <p className="text-xl text-luxury-champagne mb-2">
                10 Workflows Every Small Business Should Automate First
              </p>
              <p className="text-luxury-silver mb-8 max-w-xl mx-auto">
                A practical checklist with real examples from healthcare, legal, real estate, and more. 
                No fluff — just workflows you can start automating this week.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-silver/50" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark border border-white/10 text-white placeholder-luxury-silver/50 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Download Free Guide
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              )}

              <p className="mt-4 text-xs text-luxury-silver/60">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LeadMagnet
