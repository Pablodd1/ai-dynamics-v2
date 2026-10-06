import React, { useState } from 'react'
import { X, Handshake, CheckCircle2, Loader2, Calendar, Building2, Mail, User } from 'lucide-react'
import type { ProjectItem } from '../data/projects'
import { supabase } from '../lib/supabase'
import { AnalyticsEvents } from '../lib/analytics'

interface PartnerInquiryModalProps {
  project: ProjectItem | null
  isOpen: boolean
  onClose: () => void
}

export const PartnerInquiryModal: React.FC<PartnerInquiryModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    role: '',
    inquiryType: 'Pilot Opportunity',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen || !project) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      // Record lead in Supabase
      const { error } = await supabase
        .from('aidynamic_leads')
        .insert({
          name: formData.name,
          company: formData.organization,
          email: formData.email,
          service_interest: [`Partnership / Pilot: ${project.name}`],
          status: 'new',
          source: 'project_partner_modal',
          notes: `[Inquiry Type: ${formData.inquiryType}] [Role: ${formData.role}] [Project Status: ${project.status}] Message: ${formData.message}`
        })

      if (error) {
        console.warn('Supabase lead insert notice:', error)
      }

      AnalyticsEvents.contactConversion('partnership_inquiry', project.id)
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting partner inquiry:', err)
      setErrorMsg('Network error. You can also email jasmelacosta@gmail.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl my-8 rounded-2xl border border-luxury-gold/30 bg-dark-50 shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-luxury-silver hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Inquiry Received</h3>
            <p className="text-sm text-luxury-silver/80 max-w-md mx-auto mb-6">
              Thank you for your interest in partnering on <span className="text-luxury-champagne font-semibold">{project.name}</span>. Our technical architecture team will review your scope and follow up within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Instant Strategy Call</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs tracking-wider uppercase mb-2">
              <Handshake className="w-4 h-4" />
              <span>Partnership & Commercialization Inquiry</span>
            </div>

            <h2 id="partner-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
              {project.name}
            </h2>

            <p className="text-xs font-mono text-luxury-silver/60 mb-4">
              Current Maturity: <span className="text-luxury-champagne">{project.status}</span> · {project.industryFilter}
            </p>

            {/* Useful Support Needed Callout */}
            {project.sponsorOpportunity?.supportNeeded && (
              <div className="p-3 mb-6 rounded-lg bg-black/40 border border-white/10 text-xs text-luxury-silver">
                <span className="font-semibold text-white block mb-1">Target Collaboration Areas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.sponsorOpportunity.supportNeeded.map((support, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-luxury-silver/90">
                      • {support}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-luxury-silver/80 mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-luxury-silver/40" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Alex Vance"
                      className="w-full pl-9 pr-3 py-2 bg-dark/80 border border-white/15 rounded-lg text-sm text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-luxury-silver/80 mb-1">Organization / Practice *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-luxury-silver/40" />
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Metropolitan Health Partners"
                      className="w-full pl-9 pr-3 py-2 bg-dark/80 border border-white/15 rounded-lg text-sm text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-luxury-silver/80 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-luxury-silver/40" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@organization.com"
                      className="w-full pl-9 pr-3 py-2 bg-dark/80 border border-white/15 rounded-lg text-sm text-white focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-luxury-silver/80 mb-1">Collaboration Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 bg-dark/80 border border-white/15 rounded-lg text-sm text-white focus:border-luxury-gold focus:outline-none"
                  >
                    <option value="Pilot Opportunity">Pilot Deployment / Beta Site</option>
                    <option value="Commercialization Partner">Commercialization / Distribution</option>
                    <option value="Technology Integration">Technology / API Integration</option>
                    <option value="Research Collaboration">Academic / Clinical Research</option>
                    <option value="Strategic Sponsorship">Strategic Sponsorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-luxury-silver/80 mb-1">Scope or Specific Requirements</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={`Describe your operational environment, number of locations/users, or how you would like to collaborate on ${project.shortName}...`}
                  className="w-full p-3 bg-dark/80 border border-white/15 rounded-lg text-sm text-white focus:border-luxury-gold focus:outline-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400">{errorMsg}</p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-luxury-silver/50">
                  Strictly confidential. Direct NDA available upon request.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <span>Submit Partnership Inquiry</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
