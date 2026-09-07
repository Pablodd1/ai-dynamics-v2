import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone, Building2, ArrowLeft, Loader2, Sparkles, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: 'client' as 'client' | 'team',
    agreeToTerms: false,
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.agreeToTerms) {
      setError('Please agree to the Terms of Service')
      return
    }

    setLoading(true)

    const { error: signUpError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        data: {
          full_name: form.fullName,
          phone: form.phone,
          company_name: form.company,
          role: form.role,
        },
        emailRedirectTo: `${window.location.origin}/reset-password`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-luxury-silver hover:text-luxury-champagne transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-accent" />
                <h1 className="text-2xl font-bold text-white">Create Account</h1>
              </div>
              <p className="text-luxury-silver mb-6">
                Get started with AI Dynamic Pro in under 2 minutes
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: 'client' })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.role === 'client'
                        ? 'border-accent bg-accent/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-white font-medium text-sm">Hire AI Services</div>
                    <div className="text-luxury-silver text-xs mt-1">
                      Access AI consulting & automation
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: 'team' })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.role === 'team'
                        ? 'border-accent bg-accent/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-white font-medium text-sm">Internal Team</div>
                    <div className="text-luxury-silver text-xs mt-1">
                      Manage projects & clients
                    </div>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-silver mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-silver" />
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-luxury-silver/50 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-silver mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-silver" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-luxury-silver/50 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-luxury-silver mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-silver" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-luxury-silver/50 focus:outline-none focus:border-accent/50 transition-colors"
                        placeholder="+1 (305) 555-0123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-luxury-silver mb-2">
                      Company (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-silver" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-luxury-silver/50 focus:outline-none focus:border-accent/50 transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-luxury-silver">
                    I agree to the{' '}
                    <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
                    I understand that AI Dynamic Pro provides AI consulting and automation services.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-accent text-dark font-semibold hover:bg-accent-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-luxury-silver text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent hover:text-accent-300 transition-colors">
                    Log In
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Almost There!</h2>
              <p className="text-luxury-silver mb-2">
                We sent a magic link to
              </p>
              <p className="text-accent font-medium mb-6">{form.email}</p>
              <div className="space-y-3 text-sm text-luxury-silver">
                <p>1. Check your email inbox</p>
                <p>2. Click the magic link to verify</p>
                <p>3. Start using AI Dynamic Pro</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
