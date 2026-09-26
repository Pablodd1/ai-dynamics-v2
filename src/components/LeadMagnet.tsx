import { motion } from 'framer-motion'
import { Download, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { AnalyticsEvents } from '../lib/analytics'

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
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'AI Dynamics - Lead Magnet',
          interest: 'Workflow Automation Guide',
        }),
      }).catch(() => null)

      // Fallback direct Brevo call if in local dev with env
      const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || ''
      if (!response && BREVO_API_KEY) {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: email,
            listIds: [1],
            attributes: { SOURCE: 'AI Dynamics - Lead Magnet' },
            updateEnabled: true,
          }),
        }).catch(() => null)
      }

      AnalyticsEvents.downloadPlaybook(email)
      setIsSubmitted(true)
      setEmail('')
    } catch {
      // Still show success to ensure visitor gets their guide
      AnalyticsEvents.downloadPlaybook(email)
      setIsSubmitted(true)
      setEmail('')
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
              <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto mb-4 border border-luxury-gold/40">
                <CheckCircle className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-serif">You're All Set!</h3>
              <p className="text-luxury-silver max-w-md mx-auto mb-6">
                Your 2026 Executive AI Playbook is ready. You can download the full blueprint directly or book a free walkthrough.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/AI-Automation-Playbook-2026.pdf"
                  download="AI-Dynamic-Automation-Playbook-2026.pdf"
                  onClick={() => AnalyticsEvents.downloadPlaybook('button_click')}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Blueprint PDF
                </a>
                <a
                  href="https://calendly.com/aidynamicpro/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => AnalyticsEvents.clickBooking('lead_magnet_review', 'lead_magnet')}
                  className="px-6 py-3.5 rounded-xl border border-luxury-gold/30 hover:bg-luxury-gold/10 text-luxury-champagne text-sm font-semibold transition-all inline-flex items-center gap-2"
                >
                  Book 1-on-1 Review
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
