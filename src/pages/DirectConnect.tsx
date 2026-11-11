import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, Copy, PhoneCall, MessageSquare, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react'

type ConnectTab = 'call' | 'text' | 'virtual'

const PROJECT_PHONE_DISPLAY = '(786) 643-2099'
const PROJECT_PHONE_E164 = '+17866432099'

const CALL_TIMING_PILLS = ['Right Now', 'Later Today', 'Tomorrow Morning'] as const

const TEXT_TOPIC_PILLS = [
  '$99 Audit + 48-Hr Prototype',
  '24/7 Voice & WhatsApp AI',
  '$497 Staff AI Bootcamp',
] as const

const VIRTUAL_WINDOW_PILLS = [
  { id: 'Morning', label: 'Morning', sub: '9am–12pm EST', value: 'Morning (9am–12pm EST)' },
  { id: 'Midday', label: 'Midday', sub: '12pm–3pm EST', value: 'Midday (12pm–3pm EST)' },
  { id: 'Afternoon', label: 'Afternoon', sub: '3pm–6pm EST', value: 'Afternoon (3pm–6pm EST)' },
] as const

function buildSmsUri(e164Phone: string, bodyText: string): string {
  if (typeof navigator === 'undefined') {
    return `sms:${e164Phone}?body=${encodeURIComponent(bodyText)}`
  }
  const ua = navigator.userAgent || ''
  const isIOS =
    /iPad|iPhone|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const sep = isIOS ? '&' : '?'
  return `sms:${e164Phone}${sep}body=${encodeURIComponent(bodyText)}`
}

function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function getNextFourBusinessDays(): Array<{ iso: string; shortDay: string; dateStr: string; fullLabel: string }> {
  const days: Array<{ iso: string; shortDay: string; dateStr: string; fullLabel: string }> = []
  const cursor = new Date()
  // Start from tomorrow if after 3pm local, otherwise start from tomorrow for clean scheduling
  cursor.setDate(cursor.getDate() + 1)

  const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
  const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

  while (days.length < 4) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) {
      const yyyy = cursor.getFullYear()
      const mm = String(cursor.getMonth() + 1).padStart(2, '0')
      const dd = String(cursor.getDate()).padStart(2, '0')
      const shortDay = dayFmt.format(cursor)
      const dateStr = dateFmt.format(cursor)
      days.push({
        iso: `${yyyy}-${mm}-${dd}`,
        shortDay,
        dateStr,
        fullLabel: `${shortDay}, ${dateStr}`,
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

export default function DirectConnect() {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawMode = (searchParams.get('mode') || 'call').toLowerCase()
  const adminSmsTarget = (searchParams.get('admin-sms') || '').trim()
  const adminLeadName = (searchParams.get('name') || 'there').trim()
  const adminReqType = (searchParams.get('req') || 'request').trim()
  const adminReqDetail = (searchParams.get('detail') || '').trim()

  const rawEmailParam = (searchParams.get('email') || '').trim()
  const initialCleanEmail =
    rawEmailParam && rawEmailParam.includes('@') && !rawEmailParam.includes('{{')
      ? rawEmailParam
      : ''

  const segmentParam = searchParams.get('segment') || ''
  const utmCampaignParam = searchParams.get('utm_campaign') || ''

  const businessDays = useMemo(() => getNextFourBusinessDays(), [])

  const [activeTab, setActiveTab] = useState<ConnectTab>(() => {
    if (rawMode === 'text') return 'text'
    if (rawMode === 'virtual') return 'virtual'
    return 'call'
  })

  const [isOpenSmsBanner, setIsOpenSmsBanner] = useState<boolean>(rawMode === 'open-sms')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState(initialCleanEmail)
  const [timing, setTiming] = useState<string>(CALL_TIMING_PILLS[0])
  const [topic, setTopic] = useState<string>(TEXT_TOPIC_PILLS[0])
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0)
  const [selectedWindow, setSelectedWindow] = useState<string>(VIRTUAL_WINDOW_PILLS[0].value)

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submittedMsg, setSubmittedMsg] = useState('')
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Starter SMS text for prospects clicking "I'll Text You"
  const prospectStarterSms =
    'Hi Jasmel — saw your note from AI Dynamic Pro. Quick question about the $99 workflow audit / 48-hr AI prototype.'
  const prospectSmsHref = useMemo(
    () => buildSmsUri(PROJECT_PHONE_E164, prospectStarterSms),
    []
  )

  // Founder personal intro SMS draft when Jasmel clicks "?admin-sms=" in his alert email
  const founderIntroDraft = useMemo(() => {
    const contextPhrase =
      adminReqType === 'call'
        ? `call request${adminReqDetail ? ` (${adminReqDetail})` : ''}`
        : adminReqType === 'text'
        ? `text request regarding ${adminReqDetail || 'AI Dynamic Pro'}`
        : `15-min consultation request${adminReqDetail ? ` for ${adminReqDetail}` : ''}`
    return `Hi ${adminLeadName}, this is Jasmel at AI Dynamic Pro in Miami — just saw your ${contextPhrase} come through. Got 2 minutes now, or is texting easier?`
  }, [adminLeadName, adminReqType, adminReqDetail])

  const founderSmsHref = useMemo(
    () => (adminSmsTarget ? buildSmsUri(adminSmsTarget, founderIntroDraft) : ''),
    [adminSmsTarget, founderIntroDraft]
  )

  // Sync URL mode changes
  useEffect(() => {
    if (rawMode === 'open-sms') {
      setIsOpenSmsBanner(true)
      if (isMobileDevice()) {
        const t = setTimeout(() => {
          window.location.href = prospectSmsHref
        }, 120)
        return () => clearTimeout(t)
      }
    } else if (rawMode === 'text' || rawMode === 'virtual' || rawMode === 'call') {
      setIsOpenSmsBanner(false)
      setActiveTab(rawMode)
    }
  }, [rawMode, prospectSmsHref])

  // Auto-trigger Founder SMS launcher on mobile when ?admin-sms= is present
  useEffect(() => {
    if (adminSmsTarget && founderSmsHref && isMobileDevice()) {
      const t = setTimeout(() => {
        window.location.href = founderSmsHref
      }, 120)
      return () => clearTimeout(t)
    }
  }, [adminSmsTarget, founderSmsHref])

  const handleTabSelect = (tab: ConnectTab) => {
    setActiveTab(tab)
    setIsOpenSmsBanner(false)
    setErrorMsg('')
    setSubmittedMsg('')
    const next = new URLSearchParams(searchParams)
    next.set('mode', tab)
    setSearchParams(next, { replace: true })
  }

  const handleCopyText = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2200)
    } catch {
      // Ignore clipboard failure
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setErrorMsg('Please enter your name.')
      return
    }
    if ((activeTab === 'call' || activeTab === 'text') && phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a 10-digit direct phone number.')
      return
    }
    if (activeTab === 'virtual' && (!email.trim() || !email.includes('@'))) {
      setErrorMsg('Please enter your work email for the calendar invite.')
      return
    }

    setSubmitting(true)
    try {
      const chosenDay = businessDays[selectedDayIdx] || businessDays[0]
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeTab,
          name: trimmedName,
          phone: phone.trim(),
          email: email.trim(),
          timing,
          topic,
          dayLabel: chosenDay.fullLabel,
          dayIso: chosenDay.iso,
          timeWindow: selectedWindow,
          segment: segmentParam,
          utmCampaign: utmCampaignParam,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Could not submit right now. Please tap to call (786) 643-2099.')
      } else {
        setSubmittedMsg(
          data.message ||
            'Got it — Jasmel just received your alert directly on his phone.'
        )
      }
    } catch {
      setErrorMsg('Network hiccup — please call or text (786) 643-2099 directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // ─── FOUNDER 1-TAP ADMIN SMS MODE (?admin-sms=...) ───
  if (adminSmsTarget) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-[#12121c] border border-[#c9a96e]/40 p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/15 border border-[#c9a96e] flex items-center justify-center text-xs font-serif font-bold text-[#f7e7ce]">
                AI
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Founder Fast-Reply Bridge</div>
                <div className="text-[11px] text-[#c9a96e] uppercase tracking-wider">
                  Lead: {adminLeadName}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Pre-Addressed Lead Number
          </p>
          <div className="text-lg font-mono font-semibold text-[#f7e7ce] mb-4">
            {adminSmsTarget}
          </div>

          <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Personal Intro Draft
          </p>
          <div className="rounded-xl bg-black/50 border border-white/10 p-3.5 text-sm text-zinc-200 leading-relaxed mb-5">
            {founderIntroDraft}
          </div>

          <div className="space-y-2.5">
            <a
              href={founderSmsHref}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0a0a0f] font-semibold py-3.5 px-4 text-sm transition"
            >
              <span>💬 Open Messages App to {adminLeadName}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${adminSmsTarget}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium py-3 px-4 text-sm transition"
            >
              <PhoneCall className="w-4 h-4 text-[#c9a96e]" />
              <span>Call {adminLeadName} Directly</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopyText(`${adminSmsTarget}\n\n${founderIntroDraft}`)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-zinc-300 py-2.5 px-4 text-xs transition"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied number & intro draft</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy number & draft (Desktop fallback)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── PROSPECT DIRECT CONNECT CARD (/connect & /call-me) ───
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col justify-between px-4 py-8 relative overflow-hidden">
      {/* Subtle ambient champagne glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[520px] h-[280px] rounded-full bg-[#c9a96e]/10 blur-[110px]"
      />

      {/* Minimal Top Brand Bar */}
      <header className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-[#141420] border border-[#c9a96e]/70 flex items-center justify-center font-serif font-bold text-xs text-[#f7e7ce] group-hover:border-[#f7e7ce] transition">
            AI
          </span>
          <span className="font-serif text-base font-semibold tracking-tight text-white">
            AI Dynamic<span className="text-[#c9a96e]">.PRO</span>
          </span>
        </Link>

        <a
          href={`tel:${PROJECT_PHONE_E164}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#f7e7ce] hover:text-white bg-white/[0.04] border border-[#c9a96e]/30 rounded-full px-3 py-1.5 transition"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span>{PROJECT_PHONE_DISPLAY}</span>
        </a>
      </header>

      {/* Center Fast-Action Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto">
        <div className="rounded-2xl bg-[#11111a]/95 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.75)] p-5 sm:p-6 backdrop-blur-xl">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a96e] mb-1">
              Direct Founder Line · Miami (EN / ES)
            </p>
            <h1 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-snug">
              Connect with Jasmel Acosta
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              No 10-field intake forms. Pick whichever takes you 10 seconds.
            </p>
          </div>

          {/* Clean 3-Tab Switcher */}
          <div
            role="tablist"
            aria-label="Direct connect options"
            className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#09090f] border border-white/10 mb-5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isOpenSmsBanner && activeTab === 'call'}
              onClick={() => handleTabSelect('call')}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 ${
                !isOpenSmsBanner && activeTab === 'call'
                  ? 'bg-[#c9a96e] text-[#0a0a0f] shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>📞 Call Me</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!isOpenSmsBanner && activeTab === 'text'}
              onClick={() => handleTabSelect('text')}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 ${
                !isOpenSmsBanner && activeTab === 'text'
                  ? 'bg-[#c9a96e] text-[#0a0a0f] shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>💬 Text Me</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!isOpenSmsBanner && activeTab === 'virtual'}
              onClick={() => handleTabSelect('virtual')}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 ${
                !isOpenSmsBanner && activeTab === 'virtual'
                  ? 'bg-[#c9a96e] text-[#0a0a0f] shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>🗓️ Virtual</span>
            </button>
          </div>

          {/* OPEN-SMS MODE CARD (Gmail-safe SMS launcher + desktop fallback) */}
          {isOpenSmsBanner ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-[#181826] border border-[#c9a96e]/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#f7e7ce] mb-1">
                  <MessageSquare className="w-4 h-4 text-[#c9a96e]" />
                  <span>Ready to text Jasmel directly</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Tap below to open your phone&apos;s Messages app pre-addressed to{' '}
                  <strong className="text-white">{PROJECT_PHONE_DISPLAY}</strong> with a 1-line starter note.
                </p>

                <a
                  href={prospectSmsHref}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0a0a0f] font-semibold py-3.5 px-4 text-sm transition shadow-md"
                >
                  <span>✉️ Open Messages to {PROJECT_PHONE_DISPLAY}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Desktop copyable number & "leave your cell instead" fallback */}
              <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                      On Desktop? Text or Call:
                    </div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {PROJECT_PHONE_DISPLAY}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(PROJECT_PHONE_DISPLAY)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-zinc-200 transition"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabSelect('text')}
                  className="text-left text-xs font-medium text-[#c9a96e] hover:text-[#f7e7ce] underline underline-offset-4 pt-1 transition"
                >
                  Prefer we text you first? Leave your cell instead →
                </button>
              </div>
            </div>
          ) : submittedMsg ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold text-white">You&apos;re All Set</h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{submittedMsg}</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={`tel:${PROJECT_PHONE_E164}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 px-3.5 py-2 text-xs font-medium text-white transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span>Dial {PROJECT_PHONE_DISPLAY}</span>
                </a>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#c9a96e]/40 hover:border-[#c9a96e] px-3.5 py-2 text-xs font-medium text-[#f7e7ce] transition"
                >
                  <span>Browse 22 Live AI Systems →</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Field: Name */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Carlos Perez"
                  className="w-full rounded-xl bg-[#09090f] border border-white/15 focus:border-[#c9a96e] focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 transition"
                />
              </div>

              {/* CALL MODE */}
              {activeTab === 'call' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Direct Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(305) 555-0199"
                      className="w-full rounded-xl bg-[#09090f] border border-white/15 focus:border-[#c9a96e] focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      When should Jasmel call?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CALL_TIMING_PILLS.map((pill) => {
                        const active = timing === pill
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => setTiming(pill)}
                            className={`rounded-xl py-2.5 px-2 text-xs font-medium border transition ${
                              active
                                ? 'bg-[#c9a96e]/20 border-[#c9a96e] text-[#f7e7ce]'
                                : 'bg-[#09090f] border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                            }`}
                          >
                            {pill}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* TEXT MODE */}
              {activeTab === 'text' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(305) 555-0199"
                      className="w-full rounded-xl bg-[#09090f] border border-white/15 focus:border-[#c9a96e] focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Quick topic (1 tap)
                    </label>
                    <div className="flex flex-col gap-2">
                      {TEXT_TOPIC_PILLS.map((pill) => {
                        const active = topic === pill
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => setTopic(pill)}
                            className={`rounded-xl py-2.5 px-3 text-left text-xs font-medium border transition flex items-center justify-between ${
                              active
                                ? 'bg-[#c9a96e]/20 border-[#c9a96e] text-[#f7e7ce]'
                                : 'bg-[#09090f] border-white/10 text-zinc-300 hover:border-white/25'
                            }`}
                          >
                            <span>{pill}</span>
                            {active && <Check className="w-3.5 h-3.5 text-[#c9a96e]" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* VIRTUAL 15-MIN MODE */}
              {activeTab === 'virtual' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl bg-[#09090f] border border-white/15 focus:border-[#c9a96e] focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Cell / Direct <span className="text-zinc-500">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(305) 555-0199"
                        className="w-full rounded-xl bg-[#09090f] border border-white/15 focus:border-[#c9a96e] focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Pick a Day (Next 4 Business Days)
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {businessDays.map((d, idx) => {
                        const active = selectedDayIdx === idx
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            onClick={() => setSelectedDayIdx(idx)}
                            className={`rounded-xl py-2 px-1.5 text-center border transition ${
                              active
                                ? 'bg-[#c9a96e]/20 border-[#c9a96e] text-[#f7e7ce]'
                                : 'bg-[#09090f] border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                            }`}
                          >
                            <div className="text-[11px] font-semibold">{d.shortDay}</div>
                            <div className="text-[11px] opacity-85">{d.dateStr}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Preferred Window (EST)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {VIRTUAL_WINDOW_PILLS.map((w) => {
                        const active = selectedWindow === w.value
                        return (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setSelectedWindow(w.value)}
                            className={`rounded-xl py-2 px-2 text-center border transition ${
                              active
                                ? 'bg-[#c9a96e]/20 border-[#c9a96e] text-[#f7e7ce]'
                                : 'bg-[#09090f] border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                            }`}
                          >
                            <div className="text-xs font-semibold">{w.label}</div>
                            <div className="text-[10px] opacity-80">{w.sub}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {errorMsg && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c9a96e] hover:bg-[#d4b87a] disabled:opacity-60 text-[#0a0a0f] font-semibold py-3.5 px-4 text-sm transition shadow-lg shadow-[#c9a96e]/10"
              >
                {submitting ? (
                  <span>Sending straight to Jasmel&apos;s phone...</span>
                ) : activeTab === 'call' ? (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>Have Jasmel Call Me ({timing}) →</span>
                  </>
                ) : activeTab === 'text' ? (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Me a Quick Text →</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Lock Free 15-Min Virtual Chat →</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-zinc-500 leading-relaxed">
                Goes directly to Jasmel Acosta in Brickell, Miami · Zero spam · Hablamos Español
              </p>
            </form>
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-md mx-auto mt-6 text-center text-[11px] text-zinc-500">
        AI Dynamic Pro · Brickell Financial District, Miami, FL ·{' '}
        <Link to="/" className="text-zinc-400 hover:text-[#f7e7ce] transition">
          aidynamic.pro
        </Link>
      </footer>
    </div>
  )
}
