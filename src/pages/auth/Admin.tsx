import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, Users, Loader2, ArrowLeft, Filter, Download,
  Mail, Phone, Calendar, CheckCircle, Clock, Send,
  BarChart3, MapPin, Copy, Check, Sparkles, ExternalLink
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { AnalyticsEvents, GA4_MEASUREMENT_ID } from '../../lib/analytics'

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
type AdminTab = 'leads' | 'campaigns' | 'google_hub'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service_interest: string[] | null
  status: LeadStatus
  source: string
  created_at: string
}

interface CampaignMeta {
  id: string
  name: string
  subject: string
  utmCampaign: string
  description: string
  trackedBookingUrl: string
}

interface GbpPost {
  id: string
  type: string
  title: string
  ctaButton: string
  ctaUrl: string
  content: string
}

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  qualified: 'bg-purple-500/20 text-purple-400',
  converted: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
}

const CORRECT_PIN = '3721'

export default function Admin() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('leads')

  const [leads, setLeads] = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all')

  // Email Campaign & Google Business State
  const [campaigns, setCampaigns] = useState<CampaignMeta[]>([])
  const [gbpPosts, setGbpPosts] = useState<GbpPost[]>([])
  const [brevoConnected, setBrevoConnected] = useState(true)
  const [selectedCampaignId, setSelectedCampaignId] = useState('email_1_voice_jass')
  const [dispatchMode, setDispatchMode] = useState<'test' | 'supabase_leads' | 'custom'>('test')
  const [dispatchStatusFilter, setDispatchStatusFilter] = useState<LeadStatus | 'all'>('all')
  const [customEmailsInput, setCustomEmailsInput] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [sendingCampaign, setSendingCampaign] = useState(false)
  const [campaignResult, setCampaignResult] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  const checkPin = () => {
    if (pin === CORRECT_PIN) {
      setAuthenticated(true)
      setPinError(false)
      fetchLeads()
      fetchCampaignMetadata()
    } else {
      setPinError(true)
      setPin('')
    }
  }

  const fetchLeads = async () => {
    setLeadsLoading(true)
    const { data, error } = await supabase
      .from('aidynamic_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setLeads(data as Lead[])
    }
    setLeadsLoading(false)
  }

  const fetchCampaignMetadata = async () => {
    try {
      const res = await fetch('/api/email-campaign')
      if (res.ok) {
        const data = await res.json()
        setCampaigns(data.campaigns || [])
        setGbpPosts(data.googleBusinessPosts || [])
        setBrevoConnected(Boolean(data.brevoConfigured))
      }
    } catch (err) {
      console.warn('Could not load campaign metadata:', err)
    }
  }

  const updateStatus = async (id: string, status: LeadStatus) => {
    const { error } = await supabase
      .from('aidynamic_leads')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)))
    }
  }

  const exportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Services', 'Status', 'Source', 'Date'].join(','),
      ...leads.map((l) => [
        l.name,
        l.email,
        l.phone || '',
        l.company || '',
        (l.service_interest || []).join(';'),
        l.status,
        l.source,
        new Date(l.created_at).toLocaleDateString(),
      ].join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const handleLaunchCampaign = async () => {
    setSendingCampaign(true)
    setCampaignResult(null)
    try {
      const customRecipients =
        dispatchMode === 'custom'
          ? customEmailsInput
              .split(/[\n,;]+/)
              .map((line) => line.trim())
              .filter((e) => e.includes('@'))
              .map((email) => ({ email, name: email.split('@')[0], company: 'your business' }))
          : []

      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: selectedCampaignId,
          mode: dispatchMode,
          statusFilter: dispatchStatusFilter,
          customRecipients,
          customSubject: customSubject.trim(),
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        AnalyticsEvents.emailCampaignSent(selectedCampaignId, data.sentCount || 1)
        setCampaignResult({
          success: true,
          message: `Dispatched "${data.campaignName}" to ${data.sentCount} recipient(s) via Brevo with GA4 UTM tag (${data.utmCampaign}).`,
        })
      } else {
        setCampaignResult({
          success: false,
          message: data.error || 'Failed to send email campaign.',
        })
      }
    } catch (err: any) {
      setCampaignResult({
        success: false,
        message: err.message || 'Network error while dispatching campaign.',
      })
    } finally {
      setSendingCampaign(false)
    }
  }

  const handleQuickSendToLead = async (lead: Lead, campaignId = 'email_1_voice_jass') => {
    try {
      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          mode: 'custom',
          customRecipients: [
            {
              name: lead.name,
              email: lead.email,
              company: lead.company || 'your company',
            },
          ],
        }),
      })
      if (res.ok) {
        AnalyticsEvents.emailCampaignSent(campaignId, 1)
        updateStatus(lead.id, 'contacted')
        alert(`Sent $99 Audit Email Campaign to ${lead.name} (${lead.email})!`)
      }
    } catch (err) {
      console.error('Quick send error:', err)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    AnalyticsEvents.copyGoogleBusinessPost(id)
    setTimeout(() => setCopiedId(null), 2200)
  }

  const filteredLeads = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    rate: leads.length > 0 ? Math.round((leads.filter((l) => l.status === 'converted').length / leads.length) * 100) : 0,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    )
  }

  if (!user) return null

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-luxury-silver hover:text-luxury-champagne transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>

          <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Command Center</h1>
            <p className="text-luxury-silver mb-6">
              Enter admin PIN to access Leads, Brevo Email Campaigns, Google Analytics & Google Business Hub
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="password"
                  maxLength={1}
                  value={pin[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val.match(/\d/)) {
                      const newPin = pin.slice(0, i) + val + pin.slice(i + 1)
                      setPin(newPin)
                      setPinError(false)
                      if (i < 3) {
                        setTimeout(() => {
                          const next = document.getElementById(`pin-${i + 1}`)
                          next?.focus()
                        }, 10)
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !pin[i] && i > 0) {
                      const prev = document.getElementById(`pin-${i - 1}`)
                      prev?.focus()
                    }
                    if (e.key === 'Enter' && pin.length === 4) {
                      checkPin()
                    }
                  }}
                  id={`pin-${i}`}
                  className={`w-12 h-14 text-center text-2xl font-bold bg-white/5 border rounded-xl text-white focus:outline-none transition-colors ${
                    pinError ? 'border-red-500' : 'border-white/10 focus:border-accent/50'
                  }`}
                />
              ))}
            </div>

            {pinError && (
              <p className="text-red-400 text-sm mb-4">Incorrect PIN</p>
            )}

            <button
              onClick={checkPin}
              disabled={pin.length !== 4}
              className="w-full py-3 rounded-xl bg-accent text-dark font-semibold hover:bg-accent-400 transition-all disabled:opacity-50"
            >
              Access Admin
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0]

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-luxury-silver hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">AI Dynamic Pro — Growth & Marketing Hub</h1>
              <p className="text-xs text-luxury-silver">
                Brevo Email Campaigns • Google Analytics ({GA4_MEASUREMENT_ID}) • Google Business Profile
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'leads' ? 'bg-accent text-dark' : 'text-luxury-silver hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'campaigns' ? 'bg-accent text-dark' : 'text-luxury-silver hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email Campaigns
            </button>
            <button
              onClick={() => setActiveTab('google_hub')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'google_hub' ? 'bg-accent text-dark' : 'text-luxury-silver hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Google Analytics & Business
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {activeTab === 'leads' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-accent' },
                { label: 'New Leads', value: stats.new, icon: Clock, color: 'text-blue-400' },
                { label: 'Converted', value: stats.converted, icon: CheckCircle, color: 'text-green-400' },
                { label: 'Conversion Rate', value: `${stats.rate}%`, icon: Shield, color: 'text-luxury-gold' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-luxury-silver">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Filter & CSV Export */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-luxury-silver" />
                {(['all', 'new', 'contacted', 'qualified', 'converted', 'lost'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                      filter === s
                        ? 'bg-accent text-dark font-semibold'
                        : 'bg-white/5 text-luxury-silver hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-luxury-silver hover:text-white hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Leads Table */}
            <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {leadsLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
                  <p className="text-luxury-silver">Loading leads...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-luxury-silver">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No leads found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Name</th>
                        <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Contact</th>
                        <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Source / Interest</th>
                        <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Status</th>
                        <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-white font-medium">{lead.name}</div>
                            <div className="text-sm text-luxury-silver">{lead.company || '—'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-luxury-silver">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-sm text-luxury-silver mt-1">
                                <Phone className="w-3 h-3" />
                                {lead.phone}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs text-accent mb-1">{lead.source}</div>
                            <div className="flex flex-wrap gap-1">
                              {(lead.service_interest || []).map((service) => (
                                <span
                                  key={service}
                                  className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-luxury-silver"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status]}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuickSendToLead(lead, 'email_1_voice_jass')}
                                className="px-2.5 py-1.5 rounded-lg bg-accent/15 hover:bg-accent/25 text-accent text-xs font-semibold flex items-center gap-1 transition-all"
                                title="Send Email #1 via Brevo"
                              >
                                <Send className="w-3 h-3" />
                                Send Email #1
                              </button>
                              <span className="text-xs text-luxury-silver flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(lead.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'campaigns' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column: Campaign Selector */}
            <div className="space-y-4">
              <div className="bg-dark-50/50 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-luxury-gold" />
                    Select Email Campaign
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      brevoConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {brevoConnected ? 'Brevo Active' : 'Check Key'}
                  </span>
                </div>
                <p className="text-xs text-luxury-silver mb-4">
                  Note: Instagram posts are handled by <strong>Muse</strong>. All B2B email campaigns below automatically embed Google Analytics (`{GA4_MEASUREMENT_ID}`) UTM tracking.
                </p>

                <div className="space-y-2.5">
                  {campaigns.map((camp) => (
                    <button
                      key={camp.id}
                      onClick={() => {
                        setSelectedCampaignId(camp.id)
                        setCustomSubject('')
                        setCampaignResult(null)
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedCampaignId === camp.id
                          ? 'bg-accent/15 border-accent text-white'
                          : 'bg-white/5 border-white/10 text-luxury-silver hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-bold text-white">{camp.name}</div>
                      <div className="text-xs text-luxury-silver mt-1 line-clamp-2">{camp.description}</div>
                      <div className="text-[11px] text-emerald-400 mt-2 font-mono">
                        utm_campaign={camp.utmCampaign}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 2 Columns: Campaign Dispatch & Configuration */}
            <div className="lg:col-span-2 bg-dark-50/50 border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedCampaign?.name || 'Email Campaign'}</h2>
                <p className="text-sm text-luxury-silver mt-1">{selectedCampaign?.description}</p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-luxury-silver font-semibold">
                  Subject Line (Supports &#123;&#123;company&#125;&#125; personalization)
                </label>
                <input
                  type="text"
                  value={customSubject || selectedCampaign?.subject || ''}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-luxury-silver font-semibold">
                  Recipient Target Mode
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'test', label: 'Send Test Preview', desc: 'Sends to jasmelacosta@gmail.com' },
                    { id: 'supabase_leads', label: 'Supabase CRM Leads', desc: `Send to ${leads.length} stored leads` },
                    { id: 'custom', label: 'Custom Email List', desc: 'Paste B2B prospect emails' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setDispatchMode(m.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        dispatchMode === m.id
                          ? 'bg-accent/15 border-accent text-white'
                          : 'bg-white/5 border-white/10 text-luxury-silver hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{m.label}</div>
                      <div className="text-[11px] text-luxury-silver mt-0.5">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {dispatchMode === 'supabase_leads' && (
                <div className="space-y-2">
                  <label className="block text-xs text-luxury-silver">Filter CRM Leads by Status:</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'new', 'contacted', 'qualified'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setDispatchStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs capitalize ${
                          dispatchStatusFilter === st
                            ? 'bg-accent text-dark font-bold'
                            : 'bg-white/5 text-luxury-silver'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {dispatchMode === 'custom' && (
                <div className="space-y-2">
                  <label className="block text-xs text-luxury-silver">
                    Paste Recipient Emails (separated by comma or new line):
                  </label>
                  <textarea
                    rows={4}
                    value={customEmailsInput}
                    onChange={(e) => setCustomEmailsInput(e.target.value)}
                    placeholder="ceo@miamiclinic.com, partner@brickelllaw.com"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              {selectedCampaign && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                  <div className="text-xs text-luxury-silver truncate">
                    <span className="text-white font-semibold">GA4 Tracked CTA Link: </span>
                    <span className="text-emerald-400 font-mono">{selectedCampaign.trackedBookingUrl}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedCampaign.trackedBookingUrl, 'utm_link')}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1 shrink-0"
                  >
                    {copiedId === 'utm_link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'utm_link' ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              )}

              {campaignResult && (
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    campaignResult.success
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-500/15 border-red-500/40 text-red-300'
                  }`}
                >
                  {campaignResult.message}
                </div>
              )}

              <button
                onClick={handleLaunchCampaign}
                disabled={sendingCampaign}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-emerald-500 text-dark font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {sendingCampaign ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Dispatching Campaign via Brevo...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {dispatchMode === 'test'
                      ? 'Send Test Campaign to jasmelacosta@gmail.com'
                      : 'Launch Email Campaign Now'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'google_hub' && (
          <div className="space-y-6">
            {/* Official Google Business Video Verification Ownership Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border-2 border-luxury-gold/60 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                    ✓ Verified Backend Management Console — Google Business Profile Proof
                  </span>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    AI DYNAMIC PRO — OFFICIAL BUSINESS OWNERSHIP CONSOLE
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-xs text-luxury-silver uppercase">Direct Business Phone</div>
                  <div className="text-xl font-black text-luxury-gold">+1 (786) 643-2099</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs text-luxury-silver">Legal / Brand Name</div>
                  <div className="text-base font-bold text-white mt-0.5">AI Dynamic Pro</div>
                  <div className="text-xs text-emerald-400 mt-0.5">https://www.aidynamic.pro</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs text-luxury-silver">Owner & Principal</div>
                  <div className="text-base font-bold text-white mt-0.5">Jasmel Acosta</div>
                  <div className="text-xs text-luxury-silver mt-0.5">jasmelacosta@gmail.com</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs text-luxury-silver">Service Area & HQ</div>
                  <div className="text-base font-bold text-white mt-0.5">Miami / South Florida</div>
                  <div className="text-xs text-luxury-silver mt-0.5">Brickell • Coral Gables • Doral</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-xs text-luxury-silver">Google Verification & GA4</div>
                  <div className="text-sm font-mono font-bold text-sky-400 mt-0.5">{GA4_MEASUREMENT_ID}</div>
                  <div className="text-[11px] font-mono text-luxury-silver truncate mt-0.5">
                    GSC: 9oINl9zaT59Y9XeRtbjXTn8B6GeSEWVR4ltKCkF-xvQ
                  </div>
                </div>
              </div>
            </div>

            {/* Top Status Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-50/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-base font-bold text-white">Google Analytics 4 (Connected)</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                    {GA4_MEASUREMENT_ID}
                  </span>
                </div>
                <p className="text-xs text-luxury-silver leading-relaxed mb-4">
                  Live conversion & attribution tracking is active across all pages. Incoming clicks from Brevo Email Campaigns and Google Business Profile are automatically tagged and recorded in GA4 and Supabase.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'email_campaign_visit',
                    'google_business_visit',
                    'click_phone_call',
                    'begin_booking',
                    'generate_lead',
                    'chatbot_open',
                  ].map((ev) => (
                    <div key={ev} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 font-mono text-emerald-300">
                      ✓ {ev}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-50/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <h2 className="text-base font-bold text-white">Google Business Profile ("Google Buz") Links</h2>
                  </div>
                  <a
                    href="https://business.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:underline"
                  >
                    Open GBP Manager <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-luxury-silver leading-relaxed mb-4">
                  Paste these UTM-tracked links into your Google Business Profile "Website" and "Booking / Appointment" fields so Google Analytics tracks every local Miami search conversion:
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                    <div className="text-xs truncate">
                      <div className="text-white font-semibold">GBP Website URL:</div>
                      <div className="text-sky-400 font-mono truncate">
                        https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_profile&utm_campaign=miami_local
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_profile&utm_campaign=miami_local',
                          'gbp_web'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white shrink-0"
                    >
                      {copiedId === 'gbp_web' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                    <div className="text-xs truncate">
                      <div className="text-white font-semibold">GBP Appointment / Booking URL:</div>
                      <div className="text-luxury-gold font-mono truncate">
                        https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_appointment&utm_campaign=miami_local
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_appointment&utm_campaign=miami_local',
                          'gbp_book'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white shrink-0"
                    >
                      {copiedId === 'gbp_book' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready-to-Post Google Business Profile Updates */}
            <div className="bg-dark-50/50 border border-white/10 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-1">
                Ready-to-Publish Google Business Profile ("Google Buz") Posts
              </h3>
              <p className="text-xs text-luxury-silver mb-4">
                Copy any update below into your Google Business Profile ("Add Update" / "Add Offer") to boost local Miami Map Pack rankings and drive tracked clicks into Google Analytics:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {gbpPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                        {post.type}
                      </span>
                      <h4 className="text-sm font-bold text-white mb-2">{post.title}</h4>
                      <pre className="text-xs text-luxury-silver whitespace-pre-wrap font-sans leading-relaxed">
                        {post.content}
                      </pre>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <div className="text-[11px] text-emerald-400 font-mono truncate">
                        Button ({post.ctaButton}): {post.ctaUrl}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(post.content, post.id)}
                          className="flex-1 py-2 rounded-lg bg-accent text-dark font-bold text-xs flex items-center justify-center gap-1"
                        >
                          {copiedId === post.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedId === post.id ? 'Copied Post' : 'Copy Post Text'}
                        </button>
                        <button
                          onClick={() => copyToClipboard(post.ctaUrl, `${post.id}_url`)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                        >
                          {copiedId === `${post.id}_url` ? 'Copied URL' : 'Copy URL'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
