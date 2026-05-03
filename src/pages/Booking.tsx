import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Building2, Check, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { id: 'audit', name: 'Strategy & Audit ($99)', duration: '30 min' },
  { id: 'workflow', name: 'Single Workflow Build ($1,000)', duration: '45 min' },
  { id: 'transformation', name: 'Full AI Transformation ($5,000/mo)', duration: '60 min' },
  { id: 'general', name: 'General Consultation (Free)', duration: '20 min' },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
]

const Booking = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to submit booking')
      }
      
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or call +1 (786) 643-2099.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-dark-50 to-dark flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 font-serif">Booking Request Sent</h1>
          <p className="text-luxury-silver mb-6">
            Thanks, {formData.name}! We've received your request for a <strong className="text-luxury-gold">{formData.service}</strong> on <strong className="text-luxury-gold">{formData.date}</strong> at <strong className="text-luxury-gold">{formData.time}</strong>.
          </p>
          <p className="text-luxury-silver/60 text-sm mb-8">
            We'll confirm via email within 2 hours. If you don't hear from us, call +1 (786) 643-2099.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-50 to-dark">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">AI Dynamics</span>
          </Link>
          <span className="text-luxury-gold text-sm">Book a Free Call</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 font-serif text-center">Book Your Call</h1>
          <p className="text-luxury-silver text-center mb-10">Pick a time that works for you. We'll confirm within 2 hours.</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-luxury-gold text-dark' : 'bg-white/10 text-white/40'}`}>1</div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-luxury-gold' : 'bg-white/10'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-luxury-gold text-dark' : 'bg-white/10 text-white/40'}`}>2</div>
            <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-luxury-gold' : 'bg-white/10'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-luxury-gold text-dark' : 'bg-white/10 text-white/40'}`}>3</div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Service */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-luxury-gold" />
                  Select a Service
                </h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, service: service.name })
                        setStep(2)
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        formData.service === service.name
                          ? 'border-luxury-gold bg-luxury-gold/10'
                          : 'border-white/10 hover:border-luxury-gold/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{service.name}</p>
                          <p className="text-luxury-silver text-sm">{service.duration} consultation</p>
                        </div>
                        {formData.service === service.name && (
                          <Check className="w-5 h-5 text-luxury-gold" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-luxury-gold" />
                  Pick a Date & Time
                </h2>
                
                <div className="mb-6">
                  <label className="text-luxury-silver text-sm mb-2 block">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-luxury-silver text-sm mb-2 block">Time (EST)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                          formData.time === slot
                            ? 'border-luxury-gold bg-luxury-gold/20 text-luxury-gold'
                            : 'border-white/10 text-luxury-silver hover:border-luxury-gold/30'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.date || !formData.time}
                    onClick={() => setStep(3)}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-luxury-gold" />
                  Your Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">What do you want to automate?</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current process and what you'd like to automate..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email || submitting}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                    {error}
                  </p>
                )}
              </motion.div>
            )}
          </form>

          {/* Summary */}
          {formData.service && (
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-luxury-silver text-sm">Booking Summary</p>
              <p className="text-white font-semibold">{formData.service}</p>
              {formData.date && <p className="text-luxury-gold text-sm">{formData.date} at {formData.time}</p>}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Booking
