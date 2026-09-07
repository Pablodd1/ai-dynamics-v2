import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, Users, Loader2, ArrowLeft, Filter, Download,
  Mail, Phone, Calendar, CheckCircle, Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

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
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all')

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
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-luxury-silver mb-6">
              Enter admin PIN to access the lead review queue
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

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-luxury-silver hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-white">Lead Review Queue</h1>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-luxury-silver hover:text-white hover:bg-white/10 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-accent' },
            { label: 'New Today', value: stats.new, icon: Clock, color: 'text-blue-400' },
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

        {/* Filter */}
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
                    <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Services</th>
                    <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-luxury-silver uppercase tracking-wider px-6 py-4">Date</th>
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
                        <div className="flex items-center gap-2 text-sm text-luxury-silver">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
