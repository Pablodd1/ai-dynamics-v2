import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Building2, Check, ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_BOOKING_API || ''

const services = [
  { id: 'free_ai_consultation', name: 'Free AI Consultation', duration: '30 min', price: 'FREE', desc: 'Strategy call to map your automation opportunities' },
  { id: 'automation_blueprint', name: 'Automation Blueprint', duration: '60 min', price: '$99', desc: 'Deep-dive audit + roadmap deliverable' },
  { id: 'ai_strategy_session', name: 'AI Strategy Session', duration: '45 min', price: 'FREE', desc: 'For teams ready to build — architecture + ROI' },
  { id: 'existing_client_checkin', name: 'Existing Client Check-in', duration: '30 min', price: 'FREE', desc: 'Progress review and next-phase planning' },
]

interface Slot {
  start: string
  end: string
  display: string
  day: string
  value: string
}

interface SlotsData {
  [date: string]: Slot[]
}

const Booking = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    budget: '',
    challenge: '',
    selected_slot: null as Slot | null
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [slots, setSlots] = useState<SlotsData>({})
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState('')

  useEffect(() => {
    loadAvailability()
  }, [])

  const loadAvailability = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/availability`)
      const data = await res.json()
      if (data.slots) {
        setSlots(data.slots)
        const firstDay = Object.keys(data.slots)[0]
        if (firstDay) setSelectedDay(firstDay)
      }
    } catch (err) {
      console.error('Failed to load slots:', err)
    } finally {
      setSlotsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    if (!formData.selected_slot) {
      setError('Please select a time slot.')
      setSubmitting(false)
      return
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        meeting_type: formData.service,
        interest: formData.interest,
        selected_slot: formData.selected_slot,
        budget: formData.budget,
        challenge: formData.challenge,
        source: 'AI Dynamics Pro Website'
      }

      const res = await fetch(`${API_BASE}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit booking')
      }

      if (data.meet_link) {
        setMeetLink(data.meet_link)
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
          <h1 className="text-3xl font-bold text-white mb-4 font-serif">Booking Confirmed</h1>
          <p className="text-luxury-silver mb-6">
            Thanks, {formData.name}! Your <strong className="text-luxury-gold">{formData.service}</strong> is scheduled.
          </p>
          {meetLink && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-luxury-gold/30">
              <p className="text-luxury-gold text-sm mb-2">Your Google Meet link</p>
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-white underline break-all hover:text-luxury-gold transition-colors">
                {meetLink}
              </a>
              <p className="text-luxury-silver/60 text-xs mt-2">Also sent to {formData.email}</p>
            </div>
          )}
          <p className="text-luxury-silver/60 text-sm mb-8">
            A calendar invite has been sent to your email. If you need to reschedule, reply to the confirmation email or call +1 (786) 643-2099.
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
          <h1 className="text-4xl font-bold text-white mb-2 font-serif text-center">Book Your AI Consultation</h1>
          <p className="text-luxury-silver text-center mb-10">Available Monday–Saturday, 10:00 AM – 5:00 PM EST</p>

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
                        setFormData({ ...formData, service: service.id })
                        setStep(2)
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        formData.service === service.id
                          ? 'border-luxury-gold bg-luxury-gold/10'
                          : 'border-white/10 hover:border-luxury-gold/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{service.name}</p>
                          <p className="text-luxury-silver text-sm">{service.desc}</p>
                          <p className="text-luxury-silver/60 text-xs mt-1">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-luxury-gold font-bold">{service.price}</span>
                          {formData.service === service.id && (
                            <Check className="w-5 h-5 text-luxury-gold ml-auto mt-1" />
                          )}
                        </div>
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
                  Pick a Time Slot
                </h2>

                {slotsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
                    <span className="ml-3 text-luxury-silver">Loading availability...</span>
                  </div>
                ) : Object.keys(slots).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-luxury-silver">No available slots. Please contact us directly.</p>
                    <p className="text-luxury-gold mt-2">+1 (786) 643-2099</p>
                  </div>
                ) : (
                  <>
                    {/* Day selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                      {Object.entries(slots).map(([date, daySlots]) => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => {
                            setSelectedDay(date)
                            setFormData({ ...formData, selected_slot: null })
                          }}
                          className={`px-4 py-2 rounded-lg text-sm border whitespace-nowrap transition-all ${
                            selectedDay === date
                              ? 'border-luxury-gold bg-luxury-gold/20 text-luxury-gold'
                              : 'border-white/10 text-luxury-silver hover:border-luxury-gold/30'
                          }`}
                        >
                          {daySlots[0]?.day || date}
                        </button>
                      ))}
                    </div>

                    {/* Time slots */}
                    {selectedDay && slots[selectedDay] && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                        {slots[selectedDay].map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, selected_slot: slot })}
                            className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                              formData.selected_slot?.value === slot.value
                                ? 'border-luxury-gold bg-luxury-gold/20 text-luxury-gold'
                                : 'border-white/10 text-luxury-silver hover:border-luxury-gold/30'
                            }`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

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
                    disabled={!formData.selected_slot}
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
                    <label className="text-luxury-silver text-sm mb-2 block">What AI solution interests you?</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    >
                      <option value="" className="bg-dark">Select one...</option>
                      <option value="process-automation" className="bg-dark">AI Process Automation</option>
                      <option value="customer-service" className="bg-dark">Intelligent Customer Service</option>
                      <option value="document-intelligence" className="bg-dark">Document Intelligence</option>
                      <option value="predictive-analytics" className="bg-dark">Predictive Analytics</option>
                      <option value="workflow-integration" className="bg-dark">Workflow Integration</option>
                      <option value="viral-content" className="bg-dark">Viral Content Automation</option>
                      <option value="not-sure" className="bg-dark">Not sure yet — let's discuss</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none"
                    >
                      <option value="" className="bg-dark">Select range...</option>
                      <option value="under-2k" className="bg-dark">Under $2,000</option>
                      <option value="2k-5k" className="bg-dark">$2,000 – $5,000</option>
                      <option value="5k-10k" className="bg-dark">$5,000 – $10,000</option>
                      <option value="10k+" className="bg-dark">$10,000+</option>
                      <option value="not-sure" className="bg-dark">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-luxury-silver text-sm mb-2 block">Biggest workflow challenge?</label>
                    <textarea
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      placeholder="Tell us about your most time-consuming manual task..."
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
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Booking...
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
              <p className="text-white font-semibold">{services.find(s => s.id === formData.service)?.name}</p>
              {formData.selected_slot && (
                <p className="text-luxury-gold text-sm">{formData.selected_slot.day} at {formData.selected_slot.display}</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Booking
