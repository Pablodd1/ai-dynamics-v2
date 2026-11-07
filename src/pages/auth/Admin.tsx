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
import VisionGlassReelStudio from '../../components/VisionGlassReelStudio'

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

interface BrevoListMeta {
  id: number
  name: string
  totalSubscribers: number
  totalBlacklisted: number
}

interface BrevoExternalCampaign {
  id: number
  name: string
  subject: string
  status: string
  scheduledAt: string | null
}

interface BrevoSenderMeta {
  id: number
  name: string
  email: string
  active: boolean
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
  const [dispatchMode, setDispatchMode] = useState<'test' | 'all_brevo_contacts' | 'supabase_leads' | 'brevo_list' | 'miami_gmaps_leads' | 'custom'>('all_brevo_contacts')
  const [syncingMiamiLeads, setSyncingMiamiLeads] = useState(false)
  const [purgingBlocked, setPurgingBlocked] = useState(false)
  const [dispatchStatusFilter, setDispatchStatusFilter] = useState<LeadStatus | 'all'>('all')
  const [brevoLists, setBrevoLists] = useState<BrevoListMeta[]>([])
  const [selectedBrevoListId, setSelectedBrevoListId] = useState<number>(2)
  const [externalCampaigns, setExternalCampaigns] = useState<BrevoExternalCampaign[]>([])
  const [brevoSenders, setBrevoSenders] = useState<BrevoSenderMeta[]>([])
  const [selectedSenderEmail, setSelectedSenderEmail] = useState<string>('jasmel@aidynamic.pro')
  const [customSenderName, setCustomSenderName] = useState<string>('Jasmel Acosta — AI Dynamic Pro')
  const [replyToEmail, setReplyToEmail] = useState<string>('jasmel@aidynamic.pro')
  const [newSenderEmailInput, setNewSenderEmailInput] = useState<string>('jasmel@aidynamic.pro')
  const [creatingSender, setCreatingSender] = useState<boolean>(false)
  const [brevoAccountEmail, setBrevoAccountEmail] = useState<string>('')
  const [blockedContactsCount, setBlockedContactsCount] = useState<number>(0)
  const [auditingBrevo, setAuditingBrevo] = useState(false)
  const [suspendingExternal, setSuspendingExternal] = useState(false)
  const [customEmailsInput, setCustomEmailsInput] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [scheduledAtInput, setScheduledAtInput] = useState('')
  const [sendingCampaign, setSendingCampaign] = useState(false)
  const [campaignResult, setCampaignResult] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const pickBestActiveSender = (sendersList: BrevoSenderMeta[]) => {
    const active = sendersList.filter((s) => s && s.active && s.email)
    const aiDyn = active.find((s) => s.email.toLowerCase().endsWith('@aidynamic.pro'))
    const gmail = active.find((s) => s.email.toLowerCase() === 'jasmelacosta@gmail.com')
    if (aiDyn) return aiDyn.email
    if (gmail) return gmail.email
    if (active.length > 0) return active[0].email
    return sendersList[0]?.email || 'jasmel@aidynamic.pro'
  }

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
      runBrevoAudit()
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

    const dbLeads = !error && data ? (data as Lead[]) : []
    try {
      const gmapsRes = await fetch('/leads/miami-b2b-leads.json').catch(() => null)
      if (gmapsRes && gmapsRes.ok) {
        const gmapsData = await gmapsRes.json()
        const existingEmails = new Set(dbLeads.map((l) => (l.email || '').trim().toLowerCase()))
        const mergedLeads = [...dbLeads]
        for (const item of gmapsData || []) {
          const clean = (item.email || '').trim().toLowerCase()
          if (!clean || existingEmails.has(clean)) continue
          existingEmails.add(clean)
          mergedLeads.push({
            id: `gmaps-${clean}`,
            name: item.business_name,
            email: clean,
            phone: item.phone || null,
            company: `${item.business_name} (${item.neighborhood})`,
            service_interest: [item.category, item.recommended_offer],
            status: 'contacted',
            source: 'google_maps_scraper_miami',
            created_at: new Date().toISOString(),
          })
        }
        setLeads(mergedLeads)
        setLeadsLoading(false)
        return
      }
    } catch {}

    setLeads(dbLeads)
    setLeadsLoading(false)
  }

  const handleSyncMiamiLeadsToBrevoAndCrm = async () => {
    setSyncingMiamiLeads(true)
    try {
      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_leads_to_list' }),
      })
      const data = await res.json()
      if (data && data.success) {
        setCampaignResult({
          success: true,
          message: data.message,
        })
        await fetchLeads()
        await runBrevoAudit()
      }
    } catch (err) {
      console.warn('Could not sync Miami leads:', err)
    } finally {
      setSyncingMiamiLeads(false)
    }
  }

  const handlePurgeBlockedContacts = async () => {
    setPurgingBlocked(true)
    setCampaignResult(null)
    try {
      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'purge_blocked_contacts' }),
      })
      const data = await res.json()
      if (data && data.success) {
        setCampaignResult({
          success: true,
          message: data.message || `Erased ${data.erasedCount || 0} blocked/blacklisted contact(s).`,
        })
        await runBrevoAudit()
        await fetchLeads()
      }
    } catch (err: any) {
      setCampaignResult({
        success: false,
        message: err.message || 'Could not purge blocked contacts.',
      })
    } finally {
      setPurgingBlocked(false)
    }
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

  const runBrevoAudit = async () => {
    setAuditingBrevo(true)
    try {
      const res = await fetch('/api/email-campaign?action=audit')
      const data = res.ok ? await res.json() : null

      if (data && data.success && !data.ipBlocked) {
        setBrevoAccountEmail(data.account?.email || 'jasmelacosta@gmail.com')
        setBrevoLists(data.lists || [])
        if (data.lists?.length > 0) setSelectedBrevoListId(data.lists[0].id)
        setExternalCampaigns(data.externalCampaigns || [])
        if (Array.isArray(data.senders)) {
          setBrevoSenders(data.senders)
          if (!selectedSenderEmail) {
            setSelectedSenderEmail(pickBestActiveSender(data.senders))
          }
        }
        setBlockedContactsCount(data.blockedContactsCount || 0)
        setAuditingBrevo(false)
        return
      }

      // Client-IP Fallback if Vercel serverless AWS IP is blocked by Brevo Authorised IPs
      const clientKey = import.meta.env.VITE_BREVO_API_KEY || ''
      if (clientKey) {
        const headers = { Accept: 'application/json', 'api-key': clientKey }
        const [accR, listR, campR, blkR, sdrR] = await Promise.all([
          fetch('https://api.brevo.com/v3/account', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/emailCampaigns?limit=25', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/smtp/blockedContacts?limit=50', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null),
        ])
        if (accR && accR.ok) {
          const acc = await accR.json()
          setBrevoAccountEmail(acc.email || 'jasmelacosta@gmail.com')
        }
        if (listR && listR.ok) {
          const ld = await listR.json()
          const mappedLists = (ld.lists || []).map((l: any) => ({
            id: l.id,
            name: l.name,
            totalSubscribers: l.totalSubscribers || l.uniqueSubscribers || 0,
            totalBlacklisted: l.totalBlacklisted || 0,
          }))
          setBrevoLists(mappedLists)
          if (mappedLists.length > 0) setSelectedBrevoListId(mappedLists[0].id)
        }
        if (campR && campR.ok) {
          const cd = await campR.json()
          setExternalCampaigns(
            (cd.campaigns || []).map((c: any) => ({
              id: c.id,
              name: c.name,
              subject: c.subject,
              status: c.status,
              scheduledAt: c.scheduledAt || null,
            }))
          )
        }
        if (blkR && blkR.ok) {
          const bd = await blkR.json()
          setBlockedContactsCount(bd.count || (bd.contacts || []).length || 0)
        }
        if (sdrR && sdrR.ok) {
          const sd = await sdrR.json()
          const mappedSenders: BrevoSenderMeta[] = (sd.senders || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            active: Boolean(s.active),
          }))
          setBrevoSenders(mappedSenders)
          if (!selectedSenderEmail && mappedSenders.length > 0) {
            setSelectedSenderEmail(pickBestActiveSender(mappedSenders))
          }
        }
      }
    } catch (err) {
      console.warn('Brevo audit error:', err)
    } finally {
      setAuditingBrevo(false)
    }
  }

  const handleCreateBrevoSender = async (emailToVerify?: string) => {
    const targetEmail = (emailToVerify || newSenderEmailInput || 'jasmelacosta@gmail.com').trim().toLowerCase()
    if (!targetEmail.includes('@')) return
    setCreatingSender(true)
    setCampaignResult(null)
    try {
      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_sender',
          senderEmail: targetEmail,
          senderName: customSenderName || 'Jasmel Acosta — AI Dynamic Pro',
        }),
      })
      const data = await res.json()
      if (data && data.success) {
        setCampaignResult({
          success: true,
          message:
            data.message ||
            `Verification link sent to ${targetEmail}! Click the confirmation link in your inbox, then click "Audit Brevo" above.`,
        })
        await runBrevoAudit()
        setCreatingSender(false)
        return
      }

      // Client-side fallback if Vercel serverless IP is restricted in Brevo
      const clientKey = import.meta.env.VITE_BREVO_API_KEY || ''
      if (clientKey) {
        const directRes = await fetch('https://api.brevo.com/v3/senders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': clientKey,
          },
          body: JSON.stringify({
            name: customSenderName || 'Jasmel Acosta — AI Dynamic Pro',
            email: targetEmail,
          }),
        })
        if (directRes.ok) {
          setCampaignResult({
            success: true,
            message: `✅ Brevo verification email sent to ${targetEmail}! Open your inbox and click "Confirm my email address", then click "Audit Brevo".`,
          })
          await runBrevoAudit()
        } else {
          const errTxt = await directRes.text().catch(() => 'Could not add sender')
          setCampaignResult({
            success: false,
            message: `Brevo response for ${targetEmail}: ${errTxt}`,
          })
        }
      } else {
        setCampaignResult({
          success: false,
          message: data?.message || 'Could not create sender in Brevo.',
        })
      }
    } catch (err: any) {
      setCampaignResult({
        success: false,
        message: err.message || 'Error creating sender in Brevo.',
      })
    } finally {
      setCreatingSender(false)
    }
  }

  const handleToggleExternalCampaigns = async (mode: 'pause' | 'resume') => {
    setSuspendingExternal(true)
    setCampaignResult(null)
    try {
      const isResume = mode === 'resume'
      const targetIds = externalCampaigns
        .filter((c) =>
          isResume
            ? c.status === 'suspended'
            : ['queued', 'inProcess', 'replicate'].includes(c.status)
        )
        .map((c) => c.id)

      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isResume ? 'resume_external_campaigns' : 'suspend_external_campaigns',
          externalCampaignIds: targetIds,
        }),
      })
      const data = await res.json()

      // Client-IP fallback if needed
      const clientKey = import.meta.env.VITE_BREVO_API_KEY || ''
      if (targetIds.length > 0 && (!data.updatedIds || data.updatedIds.length === 0) && clientKey) {
        let clientUpdated = 0
        for (const cid of targetIds) {
          const putR = await fetch(`https://api.brevo.com/v3/emailCampaigns/${cid}/status`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'api-key': clientKey,
            },
            body: JSON.stringify({ status: isResume ? 'queued' : 'suspended' }),
          }).catch(() => null)
          if (putR && (putR.ok || putR.status === 204)) clientUpdated++
        }
        setCampaignResult({
          success: true,
          message: isResume
            ? `Resumed ${clientUpdated} external (MBMB) campaign(s) in Brevo.`
            : `Paused ${clientUpdated} active external (MBMB) campaign(s) in Brevo.`,
        })
      } else {
        setCampaignResult({
          success: true,
          message:
            data.message ||
            (isResume
              ? 'MBMB Brevo connection is active and ready to resume sending.'
              : 'Verified: 0 active or scheduled external (MBMB) campaigns are queued in Brevo.'),
        })
      }
      await runBrevoAudit()
    } catch (err: any) {
      setCampaignResult({
        success: false,
        message: err.message || 'Could not update external campaigns.',
      })
    } finally {
      setSuspendingExternal(false)
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
      let customRecipients =
        dispatchMode === 'custom'
          ? customEmailsInput
              .split(/[\n,;]+/)
              .map((line) => line.trim())
              .filter((e) => e.includes('@'))
              .map((email) => ({ email, name: email.split('@')[0], company: 'your business' }))
          : []

      // If dispatching to a Brevo Contact List or ALL Brevo Contacts and client key is available, pre-fetch contacts client-side in case Vercel IP is restricted
      const clientBrevoKey = import.meta.env.VITE_BREVO_API_KEY || ''
      if (dispatchMode === 'all_brevo_contacts' && clientBrevoKey) {
        const seen = new Set<string>()
        const merged: { email: string; name: string; company: string }[] = []
        for (const offset of [0, 500, 1000, 1500]) {
          const allR = await fetch(`https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`, {
            headers: { Accept: 'application/json', 'api-key': clientBrevoKey },
          }).catch(() => null)
          if (!allR || !allR.ok) break
          const allD = await allR.json()
          const batch = allD.contacts || []
          for (const c of batch) {
            const clean = (c?.email || '').trim().toLowerCase()
            if (!clean || !clean.includes('@') || seen.has(clean) || c.emailBlacklisted) continue
            seen.add(clean)
            merged.push({
              email: clean,
              name: c.attributes?.FIRSTNAME || c.attributes?.NAME || clean.split('@')[0],
              company: c.attributes?.COMPANY || 'your business',
            })
          }
          if (batch.length < 500) break
        }
        for (const l of leads) {
          const clean = (l.email || '').trim().toLowerCase()
          if (!clean || !clean.includes('@') || seen.has(clean) || l.status === 'lost') continue
          seen.add(clean)
          merged.push({
            email: clean,
            name: l.name || clean.split('@')[0],
            company: l.company || 'your business',
          })
        }
        customRecipients = merged
      } else if (dispatchMode === 'brevo_list' && clientBrevoKey) {
        const listRes = await fetch(
          `https://api.brevo.com/v3/contacts/lists/${selectedBrevoListId}/contacts?limit=500`,
          {
            headers: { Accept: 'application/json', 'api-key': clientBrevoKey },
          }
        ).catch(() => null)
        if (listRes && listRes.ok) {
          const listData = await listRes.json()
          customRecipients = (listData.contacts || [])
            .filter((c: any) => c && c.email && !c.emailBlacklisted)
            .map((c: any) => ({
              email: c.email.trim().toLowerCase(),
              name: c.attributes?.FIRSTNAME || c.attributes?.NAME || c.email.split('@')[0],
              company: c.attributes?.COMPANY || 'your business',
            }))
        }
      }

      const isoSchedule = scheduledAtInput ? new Date(scheduledAtInput).toISOString() : ''
      const effectiveSenderEmail = selectedSenderEmail || pickBestActiveSender(brevoSenders)
      const effectiveSenderName = customSenderName.trim() || 'Jasmel Acosta — AI Dynamic Pro'
      const effectiveReplyTo = replyToEmail.trim() || 'jasmelacosta@gmail.com'

      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: selectedCampaignId,
          mode:
            (dispatchMode === 'brevo_list' || dispatchMode === 'all_brevo_contacts') && customRecipients.length > 0
              ? 'custom'
              : dispatchMode,
          brevoListId: selectedBrevoListId,
          statusFilter: dispatchStatusFilter,
          customRecipients,
          customSubject: customSubject.trim(),
          scheduledAt: isoSchedule,
          senderEmail: effectiveSenderEmail,
          senderName: effectiveSenderName,
          replyToEmail: effectiveReplyTo,
        }),
      })

      const data = await res.json()
      let finalSentCount = data.sentCount || 0

      // Automatic Client-IP Fallback if Brevo blocks Vercel's rotating AWS IP
      if (finalSentCount === 0 && Array.isArray(data.renderedPayloads) && data.renderedPayloads.length > 0 && clientBrevoKey) {
        for (const payload of data.renderedPayloads) {
          const updatedPayload = {
            ...payload,
            sender: { name: effectiveSenderName, email: effectiveSenderEmail },
            replyTo: { name: effectiveSenderName, email: effectiveReplyTo },
          }
          const directRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'api-key': clientBrevoKey,
            },
            body: JSON.stringify(updatedPayload),
          })
          if (directRes.ok) {
            finalSentCount++
          }
        }
      }

      if (finalSentCount > 0) {
        AnalyticsEvents.emailCampaignSent(selectedCampaignId, finalSentCount)
        setCampaignResult({
          success: true,
          message: `Dispatched "${data.campaignName}" to ${finalSentCount} recipient(s) from "${effectiveSenderName} <${effectiveSenderEmail}>" (Reply-To: ${effectiveReplyTo}) with GA4 UTM tag (${data.utmCampaign}).`,
        })
      } else {
        setCampaignResult({
          success: false,
          message: data.errors?.[0]?.error || data.error || 'Failed to send email campaign.',
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
      const effectiveSenderEmail = selectedSenderEmail || pickBestActiveSender(brevoSenders)
      const effectiveSenderName = customSenderName.trim() || 'Jasmel Acosta — AI Dynamic Pro'
      const effectiveReplyTo = replyToEmail.trim() || 'jasmelacosta@gmail.com'

      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          mode: 'custom',
          senderEmail: effectiveSenderEmail,
          senderName: effectiveSenderName,
          replyToEmail: effectiveReplyTo,
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
        const data = await res.json()
        let sent = data.sentCount || 0
        const clientBrevoKey = import.meta.env.VITE_BREVO_API_KEY || ''
        if (sent === 0 && Array.isArray(data.renderedPayloads) && clientBrevoKey) {
          for (const payload of data.renderedPayloads) {
            const updatedPayload = {
              ...payload,
              sender: { name: effectiveSenderName, email: effectiveSenderEmail },
              replyTo: { name: effectiveSenderName, email: effectiveReplyTo },
            }
            const directRes = await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'api-key': clientBrevoKey,
              },
              body: JSON.stringify(updatedPayload),
            })
            if (directRes.ok) sent++
          }
        }
        if (sent > 0) {
          AnalyticsEvents.emailCampaignSent(campaignId, 1)
          updateStatus(lead.id, 'contacted')
          alert(`Sent Email #1 to ${lead.name} (${lead.email})!`)
        }
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
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSyncMiamiLeadsToBrevoAndCrm}
                  disabled={syncingMiamiLeads}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {syncingMiamiLeads ? 'Syncing 16 Miami Leads...' : 'Sync 16 Miami Google Maps Leads to Brevo & CRM'}
                </button>
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-luxury-silver hover:text-white hover:bg-white/10 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
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
          <div className="space-y-6">
            {/* Brevo Takeover & Anti-MBMB Security Control Banner */}
            <div className="bg-gradient-to-r from-emerald-950/50 via-dark-50 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider">
                      ✓ Shared Brevo Connection Active (AI Dynamic Pro ↔ MBMB Co-Existence)
                    </span>
                    {brevoAccountEmail && (
                      <span className="text-xs text-luxury-silver font-mono">
                        Account: {brevoAccountEmail}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Brevo Campaign Switcher (Pause MBMB ↔ Resume MBMB) & CAN-SPAM Protection
                  </h3>
                  <p className="text-xs text-luxury-silver mt-0.5">
                    MBMB stays connected in the background. Pause MBMB while sending AI Dynamic Pro campaigns, and resume MBMB anytime with 1 click ({blockedContactsCount} unsubscribed/blocked contacts automatically excluded).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={runBrevoAudit}
                    disabled={auditingBrevo}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-all"
                  >
                    {auditingBrevo ? 'Auditing Brevo...' : '🔄 Audit Brevo Lists & Campaigns'}
                  </button>
                  <button
                    onClick={() => handleToggleExternalCampaigns('pause')}
                    disabled={suspendingExternal}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all"
                  >
                    {suspendingExternal ? 'Updating...' : '⏸️ Pause MBMB (AI Dynamic Active)'}
                  </button>
                  <button
                    onClick={() => handleToggleExternalCampaigns('resume')}
                    disabled={suspendingExternal}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-all"
                  >
                    {suspendingExternal ? 'Updating...' : '▶️ Resume MBMB Sending'}
                  </button>
                  <button
                    onClick={handlePurgeBlockedContacts}
                    disabled={purgingBlocked}
                    className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-bold text-red-300 transition-all"
                  >
                    {purgingBlocked ? 'Erasing Blocked...' : '🗑️ Erase Blocked Contacts'}
                  </button>
                </div>
              </div>

              {externalCampaigns.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-xs font-semibold text-luxury-silver mb-2">
                    Existing Brevo Dashboard Campaigns Detected ({externalCampaigns.length}):
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {externalCampaigns.slice(0, 6).map((ec) => (
                      <div
                        key={ec.id}
                        className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="truncate">
                          <div className="text-white font-medium truncate">{ec.name}</div>
                          <div className="text-[11px] text-luxury-silver truncate">{ec.subject}</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                            ['queued', 'inProcess'].includes(ec.status)
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : 'bg-white/10 text-luxury-silver'
                          }`}
                        >
                          {ec.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Brevo Verified Sender & Free @aidynamic.pro Setup Manager */}
            <div className="bg-dark-50/70 border border-luxury-gold/30 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40 text-[11px] font-bold uppercase tracking-wider">
                    ✉️ Brevo Sender & Reply-To Routing (No Paid @aidynamic.pro Inbox Needed)
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Active Brevo Sender Identity & 1-Click Sender Verification
                  </h3>
                  <p className="text-xs text-luxury-silver mt-0.5">
                    Every campaign displays From Name <strong>&ldquo;{customSenderName}&rdquo;</strong> and routes all replies straight to <strong>{replyToEmail}</strong>. Select any verified sender on your Brevo account below, or add a new sender with 1 click.
                  </p>
                </div>
              </div>

              {/* Verified Senders Detected in Brevo */}
              <div>
                <div className="text-xs font-semibold text-luxury-silver mb-2">
                  Verified Senders in Your Brevo Account ({brevoSenders.length > 0 ? brevoSenders.length : 'Auto-detects on send'}):
                </div>
                {brevoSenders.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {brevoSenders.map((s) => (
                      <button
                        key={s.id || s.email}
                        type="button"
                        onClick={() => setSelectedSenderEmail(s.email)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          selectedSenderEmail === s.email
                            ? 'bg-accent/15 border-accent text-white'
                            : 'bg-black/40 border-white/10 text-luxury-silver hover:bg-white/10'
                        }`}
                      >
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{s.email}</div>
                          <div className="text-[11px] text-luxury-silver truncate">
                            Overrides Name → {customSenderName}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                            s.active
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {s.active ? '✓ Verified' : 'Pending Click'}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-luxury-silver">
                    Click <strong>&ldquo;🔄 Audit Brevo Lists & Campaigns&rdquo;</strong> above to view your active Brevo senders, or enter a sender below. (Our backend also auto-selects your first active verified Brevo sender automatically when sending.)
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-silver font-semibold mb-1">
                    From Display Name (What Recipients See)
                  </label>
                  <input
                    type="text"
                    value={customSenderName}
                    onChange={(e) => setCustomSenderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-silver font-semibold mb-1">
                    Active Brevo Sender Email
                  </label>
                  <input
                    type="email"
                    value={selectedSenderEmail}
                    onChange={(e) => setSelectedSenderEmail(e.target.value)}
                    placeholder="Auto-picks active verified Brevo sender"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-silver font-semibold mb-1">
                    Reply-To Inbox (Where Replies Land)
                  </label>
                  <input
                    type="email"
                    value={replyToEmail}
                    onChange={(e) => setReplyToEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* 1-Click Add / Verify Sender in Brevo */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-luxury-silver max-w-2xl">
                  <strong className="text-white">Want to verify <code className="text-emerald-400">jasmelacosta@gmail.com</code> or a free <code className="text-emerald-400">jasmel@aidynamic.pro</code> forwarder in Brevo?</strong>{' '}
                  Since <code className="text-white">aidynamic.pro</code> uses Namecheap BasicDNS, turn on free <strong>Redirect Email</strong> (<code className="text-white">jasmel@aidynamic.pro → jasmelacosta@gmail.com</code>) in Namecheap, then click below to send Brevo&apos;s 1-click verification email:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="email"
                    value={newSenderEmailInput}
                    onChange={(e) => setNewSenderEmailInput(e.target.value)}
                    placeholder="jasmel@aidynamic.pro"
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => handleCreateBrevoSender(newSenderEmailInput)}
                    disabled={creatingSender}
                    className="px-3 py-1.5 rounded-lg bg-luxury-gold text-dark font-bold text-xs hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {creatingSender ? 'Sending...' : '➕ Verify This Email in Brevo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCreateBrevoSender('jasmelacosta@gmail.com')}
                    disabled={creatingSender}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all disabled:opacity-50"
                  >
                    Verify jasmelacosta@gmail.com
                  </button>
                </div>
              </div>
            </div>

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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                    {[
                      {
                        id: 'all_brevo_contacts',
                        label: '1. ALL Available Emails',
                        desc: 'Every active Brevo + CRM contact (Blocked erased)',
                      },
                      {
                        id: 'miami_gmaps_leads',
                        label: '2. Miami G-Maps List',
                        desc: '16 verified Miami B2B leads',
                      },
                      { id: 'test', label: '3. Test Preview', desc: 'jasmelacosta@gmail.com' },
                      {
                        id: 'brevo_list',
                        label: '4. By Brevo List',
                        desc: brevoLists.length > 0 ? `${brevoLists.length} Brevo list(s)` : 'Specific Brevo list',
                      },
                      { id: 'supabase_leads', label: '5. CRM Leads Only', desc: `${leads.length} website leads` },
                      { id: 'custom', label: '6. Paste Emails', desc: 'Paste custom B2B list' },
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

                {/* Optional Auto-Schedule Date/Time & Recommended Weekly Presets */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs uppercase tracking-wider text-luxury-gold font-bold">
                      ⏰ Send Immediately OR Auto-Schedule via Brevo (`scheduledAt`)
                    </label>
                    {scheduledAtInput && (
                      <button
                        type="button"
                        onClick={() => setScheduledAtInput('')}
                        className="text-[11px] text-amber-300 hover:underline"
                      >
                        Clear Schedule (Send Immediately)
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 items-center">
                    <input
                      type="datetime-local"
                      value={scheduledAtInput}
                      onChange={(e) => setScheduledAtInput(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-accent"
                    />
                    <div className="text-[11px] text-luxury-silver leading-relaxed">
                      <strong>Best B2B Send Window:</strong> <span className="text-emerald-400">Tuesdays @ 10:15 AM EST</span> (Peak Miami executive open rate). Leave blank to dispatch immediately.
                    </div>
                  </div>
                </div>

                {dispatchMode === 'brevo_list' && (
                  <div className="space-y-2">
                    <label className="block text-xs text-luxury-silver">
                      Select Brevo Contact List (Unsubscribed & Blacklisted contacts are automatically excluded):
                    </label>
                    {brevoLists.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {brevoLists.map((bl) => (
                          <button
                            key={bl.id}
                            onClick={() => setSelectedBrevoListId(bl.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              selectedBrevoListId === bl.id
                                ? 'bg-accent/15 border-accent text-white'
                                : 'bg-white/5 border-white/10 text-luxury-silver hover:bg-white/10'
                            }`}
                          >
                            <div className="text-xs font-bold text-white">
                              #{bl.id} — {bl.name}
                            </div>
                            <div className="text-[11px] text-emerald-400 mt-0.5">
                              {bl.totalSubscribers} active subscribers ({bl.totalBlacklisted} unsubscribed)
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-luxury-silver flex items-center justify-between">
                        <span>Click "Audit Brevo Lists & Campaigns" above to load your Brevo lists, or enter List ID:</span>
                        <input
                          type="number"
                          value={selectedBrevoListId}
                          onChange={(e) => setSelectedBrevoListId(Number(e.target.value) || 2)}
                          className="w-20 px-2.5 py-1 rounded-lg bg-black/40 border border-white/15 text-white text-center"
                        />
                      </div>
                    )}
                  </div>
                )}

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

            {/* Automated VisionOS Frosted-Glass Reel & Carousel Studio */}
            <VisionGlassReelStudio />

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
