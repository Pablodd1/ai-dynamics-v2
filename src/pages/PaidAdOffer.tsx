import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Globe,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
  Volume2,
  Square,
  Zap,
  Gift,
  TrendingUp,
} from 'lucide-react'
import { SEO } from '../components/SEO'
import {
  getAttributionData,
  getAttributionSource,
  trackConversionEvent,
} from '../lib/analytics'

const API_BASE = ((import.meta as any).env?.VITE_API_BASE || '') as string

interface OfferTier {
  id: string
  region: 'us' | 'latam'
  priceUsd: number
  periodEn: string
  periodEs: string
  badgeEn: string
  badgeEs: string
  titleEn: string
  titleEs: string
  guaranteeEn: string
  guaranteeEs: string
  bulletsEn: string[]
  bulletsEs: string[]
}

const OFFERS: OfferTier[] = [
  {
    id: 'audit_99',
    region: 'us',
    priceUsd: 99,
    periodEn: 'one-time · $0 risk guarantee',
    periodEs: 'pago único · garantía riesgo $0',
    badgeEn: 'Fastest ROI Entry',
    badgeEs: 'Inicio Más Rápido',
    titleEn: '48-Hour AI Workflow Audit + Live Prototype',
    titleEs: 'Auditoría IA 48h + Prototipo en Vivo',
    guaranteeEn: 'Guaranteed $2,500+/mo in documented savings or 100% refunded.',
    guaranteeEs: 'Garantizamos $2,500+/mes en ahorro documentado o devolvemos el 100%.',
    bulletsEn: [
      '60-min executive process & margin teardown with lead architects',
      'Live working AI prototype shipped within 48 hours of kickoff',
      '100% of $99 credited toward your bootcamp or turnkey deployment',
    ],
    bulletsEs: [
      'Auditoría ejecutiva de 60 min con arquitectos senior',
      'Prototipo IA funcional entregado en 48 horas',
      '100% acreditable a desarrollo o capacitación',
    ],
  },
  {
    id: 'training_497',
    region: 'us',
    priceUsd: 497,
    periodEn: 'flat team rate · up to 15 staff',
    periodEs: 'tarifa única · hasta 15 personas',
    badgeEn: '1 Employee = 5 Employees',
    badgeEs: '1 Empleado = 5x',
    titleEn: 'Department AI Force-Multiplier Bootcamp',
    titleEs: 'Bootcamp IA Multiplicador de Equipo',
    guaranteeEn: 'Half-day live deployment workshop + SOP prompt library.',
    guaranteeEs: 'Taller práctico en vivo + biblioteca de flujos por departamento.',
    bulletsEn: [
      'Live hands-on workflows tailored to your real CRM, inbox & docs',
      '30-day Q&A engineering support channel included',
      '100% credited toward Turnkey AI systems within 60 days',
    ],
    bulletsEs: [
      'Flujos reales aplicados a tu CRM, correos y documentos',
      '30 días de soporte técnico incluido',
      '100% acreditable a sistemas llave en mano',
    ],
  },
  {
    id: 'turnkey_997',
    region: 'us',
    priceUsd: 997,
    periodEn: 'production launch · 7–14 days',
    periodEs: 'producción en 7–14 días',
    badgeEn: 'Most Popular · Turnkey',
    badgeEs: 'Más Elegido · Llave en Mano',
    titleEn: 'Custom Private AI Agent & App System',
    titleEs: 'Agente IA Privado y Flujo en Producción',
    guaranteeEn: 'Zero-data-retention architecture connected to your CRM/Voice/EDI.',
    guaranteeEs: 'Arquitectura Zero-Training conectada a tu CRM, Voz IA y WhatsApp.',
    bulletsEn: [
      '24/7 Bilingual Voice + WhatsApp receptionist or internal workflow agent',
      'Private RAG over your SOPs, pricing rules & contracts',
      'Real-time attribution dashboard & calendar automation',
    ],
    bulletsEs: [
      'Agente de Voz IA + WhatsApp 24/7 o automatización interna',
      'RAG privado sobre contratos, precios y protocolos',
      'Tablero de métricas y agenda automática en vivo',
    ],
  },
  {
    id: 'latam_medicos_29',
    region: 'latam',
    priceUsd: 29,
    periodEn: 'USD / month · cancel anytime',
    periodEs: 'USD / mes · cancela cuando quieras',
    badgeEn: 'Médicos & Clínicas',
    badgeEs: 'Salud & Clínicas LATAM',
    titleEn: 'Medical & Dental AI Receptionist SaaS',
    titleEs: 'Recepcionista IA Médicos y Clínicas',
    guaranteeEn: '24/7 Spanish/English patient triage & calendar booking.',
    guaranteeEs: 'Sofía Voz IA + WhatsApp 24/7 con agenda en Google Calendar.',
    bulletsEn: [
      'Answers patient inquiries in < 0.4s via voice or WhatsApp',
      'Automated appointment confirmations & no-show reduction',
      'Setup guided 1-on-1 by Miami ↔ LATAM engineering team',
    ],
    bulletsEs: [
      'Responde pacientes en < 0.4s por WhatsApp y Voz IA Sofía',
      'Recordatorios automáticos para reducir ausencias en consulta',
      'Configuración asistida con ingeniería Miami ↔ Sudamérica',
    ],
  },
  {
    id: 'latam_abogados_49',
    region: 'latam',
    priceUsd: 49,
    periodEn: 'USD / month · cancel anytime',
    periodEs: 'USD / mes · cancela cuando quieras',
    badgeEn: 'Legal & Inmobiliario',
    badgeEs: 'Abogados & Inmobiliarias',
    titleEn: 'Legal & Real Estate AI Intake & Contract Audit',
    titleEs: 'IA para Abogados e Inmobiliarias',
    guaranteeEn: 'Private Zero-Training contract audit + 3s lead qualification.',
    guaranteeEs: 'Auditoría de contratos Zero-Training + calificación en 3s.',
    bulletsEn: [
      'Extracts clauses, deadlines, and contingencies from PDFs',
      'Qualifies buyers, tenants & legal matters 24/7 via WhatsApp',
      'Calendar syncing + automated closing milestone reminders',
    ],
    bulletsEs: [
      'Analiza escrituras, contratos y plazos críticos sin entrenar modelos',
      'Califica prospectos en 3 segundos por WhatsApp y Voz',
      'Alertas automáticas de vencimientos, arras y cierres',
    ],
  },
  {
    id: 'latam_arquitectos_69',
    region: 'latam',
    priceUsd: 69,
    periodEn: 'USD / month · cancel anytime',
    periodEs: 'USD / mes · cancela cuando quieras',
    badgeEn: 'Arquitectura & AEC',
    badgeEs: 'Arquitectos & Constructoras',
    titleEn: 'Architecture & Construction AI Vision & BOQ',
    titleEs: 'IA Arquitectos — Planos y Visión 3D',
    guaranteeEn: 'Bill-of-quantities extraction + job-site photo defect AI.',
    guaranteeEs: 'Cómputos métricos desde planos PDF/CAD + inspección visual 3D.',
    bulletsEn: [
      'Rapid remodeling & construction cost estimation from drawings',
      'Photo-based defect, crack & moisture inspection reporting',
      'Instant Excel/CSV export with your firm branding',
    ],
    bulletsEs: [
      'Presupuestos de obra asistidos por IA desde planos PDF/CAD',
      'Detección visual de defectos en obra desde fotos/video',
      'Exportación instantánea a Excel/CSV con marca de tu estudio',
    ],
  },
  {
    id: 'latam_bootcamp_199',
    region: 'latam',
    priceUsd: 199,
    periodEn: 'one-time · full Spanish team',
    periodEs: 'pago único · equipo completo',
    badgeEn: '1 Empleado = 5x · LATAM',
    badgeEs: 'Auditoría + Bootcamp PyME',
    titleEn: 'LATAM SME AI Audit + Spanish Team Bootcamp',
    titleEs: 'Auditoría + Bootcamp IA PyME LATAM',
    guaranteeEn: 'Uncover $1,500+/mo in LATAM operating savings or 100% refunded.',
    guaranteeEs: 'Encontramos $1,500+ USD/mes en ahorro o devolvemos el 100%.',
    bulletsEn: [
      '60-min executive operational audit + 48-hour working prototype',
      'Live Spanish workshop for up to 15 staff members',
      '100% credited toward turnkey custom deployments',
    ],
    bulletsEs: [
      'Auditoría ejecutiva 60 min + prototipo funcional en 48h',
      'Bootcamp en vivo en español hasta 15 colaboradores',
      '100% acreditable a sistemas personalizados',
    ],
  },
  {
    id: 'enterprise_4900',
    region: 'us',
    priceUsd: 4900,
    periodEn: 'architecture sprint deposit',
    periodEs: 'sprint arquitectura enterprise',
    badgeEn: 'Enterprise Architecture',
    badgeEs: 'Enterprise Full-Stack',
    titleEn: 'Full-Stack Enterprise AI Architecture Sprint',
    titleEs: 'Sprint Arquitectura IA Enterprise',
    guaranteeEn: 'Dedicated engineering squad for Healthcare, Legal & Logistics scale.',
    guaranteeEs: 'Escuadrón dedicado para Salud, Legal, Real Estate y Logística.',
    bulletsEn: [
      'HIPAA / Zero-Retention RAG, Computer Vision & Voice orchestration',
      'Bidirectional EHR, ERP, CRM & EDI webhook integrations',
      'SLA monitoring, automated QA & founder-level handover',
    ],
    bulletsEs: [
      'RAG privado, Visión Computacional y Voz IA sub-segundo',
      'Integración bidireccional con ERP, EHR, CRM y webhooks',
      'Monitoreo SLA y transferencia completa de propiedad',
    ],
  },
]

const SEGMENT_TO_OFFER: Record<string, string> = {
  medical: 'latam_medicos_29',
  latam_medicos_29: 'latam_medicos_29',
  legal: 'latam_abogados_49',
  latam_abogados_49: 'latam_abogados_49',
  aec: 'latam_arquitectos_69',
  architects: 'latam_arquitectos_69',
  latam_arquitectos_69: 'latam_arquitectos_69',
  latam_bootcamp: 'latam_bootcamp_199',
  latam_bootcamp_199: 'latam_bootcamp_199',
  us_audit: 'audit_99',
  us_bootcamp: 'training_497',
  us_turnkey: 'turnkey_997',
  us_enterprise: 'enterprise_4900',
}

export default function PaidAdOffer() {
  const [searchParams] = useSearchParams()

  const initialOfferId = useMemo(() => {
    const rawOffer = searchParams.get('offer') || ''
    if (OFFERS.some((o) => o.id === rawOffer)) return rawOffer
    const rawSeg = searchParams.get('segment') || ''
    return SEGMENT_TO_OFFER[rawSeg] || 'audit_99'
  }, [searchParams])

  const [selectedOfferId, setSelectedOfferId] = useState<string>(initialOfferId)
  const activeOffer = useMemo(
    () => OFFERS.find((o) => o.id === selectedOfferId) || OFFERS[0],
    [selectedOfferId]
  )

  const [lang, setLang] = useState<'en' | 'es'>(() => {
    const qLang = searchParams.get('lang')
    if (qLang === 'es' || qLang === 'en') return qLang
    return activeOffer.region === 'latam' ? 'es' : 'en'
  })
  const isEs = lang === 'es'

  const refCode = searchParams.get('ref') || getAttributionData().lastTouch?.ref || ''
  const canceled = searchParams.get('canceled') === '1'

  const [step, setStep] = useState<1 | 2>(1)
  const [stripeReady, setStripeReady] = useState<boolean>(false)
  const [teamSize, setTeamSize] = useState<number>(8)
  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    company: searchParams.get('company') || '',
  })
  const [abandonBatchId, setAbandonBatchId] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const viewedOnceRef = useRef(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/checkout?action=catalog`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.stripe_ready === 'boolean') setStripeReady(d.stripe_ready)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (viewedOnceRef.current) return
    viewedOnceRef.current = true
    trackConversionEvent({
      eventName: 'ViewContent',
      value: activeOffer.priceUsd,
      currency: 'USD',
      contentName: isEs ? activeOffer.titleEs : activeOffer.titleEn,
      contentIds: [activeOffer.id],
    })
  }, [activeOffer, isEs])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const estimatedMonthlySavings = useMemo(() => {
    const hourlyRate = isEs ? 18 : 34
    const monthlyHoursSavedPerStaff = 22
    return teamSize * hourlyRate * monthlyHoursSavedPerStaff
  }, [teamSize, isEs])

  const roiMultiple = Math.max(
    4,
    Math.round(estimatedMonthlySavings / Math.max(activeOffer.priceUsd, 29))
  )

  const toggleSofiaVoice = () => {
    if (isPlayingVoice && audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setIsPlayingVoice(false)
      return
    }

    const script = isEs
      ? `Hola, soy Sofía de AI Dynamic Pro. En cuarenta y ocho horas auditamos tus procesos de ventas, citas y administración, y te entregamos un prototipo real funcionando. Completa el paso uno para activar tu espacio prioritario.`
      : `Hi, I am Sofia with AI Dynamic Pro in Miami. In forty-eight hours we audit your workflow bottlenecks and ship a working AI prototype backed by our two thousand five hundred dollar monthly savings guarantee. Enter step one to lock in your slot.`

    const audio = new Audio(`${API_BASE}/api/tts?lang=${lang}&text=${encodeURIComponent(script)}`)
    audioRef.current = audio
    setIsPlayingVoice(true)
    audio.onended = () => setIsPlayingVoice(false)
    audio.onerror = () => setIsPlayingVoice(false)
    audio.play().catch(() => setIsPlayingVoice(false))
  }

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!formData.email.trim()) {
      setErrorMsg(isEs ? 'Ingresa tu correo de trabajo.' : 'Please enter your work email.')
      return
    }

    setSubmitting(true)
    try {
      const attrSummary = getAttributionSource('paid_offer_funnel')
      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'abandon_step1',
          offer_id: activeOffer.id,
          lang,
          segment: activeOffer.region,
          attribution_summary: attrSummary,
          ref_code: refCode,
          ...formData,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (data?.batch_id) {
        setAbandonBatchId(data.batch_id)
        try {
          sessionStorage.setItem('aidynamic_abandon_batch_id', data.batch_id)
        } catch {}
      }

      try {
        localStorage.setItem(
          'aidynamic_checkout_prefill',
          JSON.stringify({ ...formData, offer_id: activeOffer.id, ref_code: refCode })
        )
      } catch {}

      const nameParts = formData.name.trim().split(/\s+/)
      trackConversionEvent({
        eventName: 'Lead',
        value: activeOffer.priceUsd,
        currency: 'USD',
        contentName: isEs ? activeOffer.titleEs : activeOffer.titleEn,
        contentIds: [activeOffer.id],
        email: formData.email,
        phone: formData.phone,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
      })

      setStep(2)
    } catch {
      setErrorMsg(
        isEs
          ? 'Error de conexión. Puedes llamarnos al (786) 643-2099.'
          : 'Network issue. Call or WhatsApp (786) 643-2099 directly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleCheckoutLaunch = async () => {
    setErrorMsg('')
    setSubmitting(true)
    try {
      const nameParts = formData.name.trim().split(/\s+/)
      trackConversionEvent({
        eventName: 'InitiateCheckout',
        value: activeOffer.priceUsd,
        currency: 'USD',
        contentName: isEs ? activeOffer.titleEs : activeOffer.titleEn,
        contentIds: [activeOffer.id],
        email: formData.email,
        phone: formData.phone,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
      })

      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_checkout',
          offer_id: activeOffer.id,
          lang,
          abandon_batch_id: abandonBatchId,
          attribution_summary: getAttributionSource('paid_offer_checkout'),
          ref_code: refCode,
          ...formData,
        }),
      })

      const data = await res.json()
      if (!data?.success) {
        throw new Error(data?.error || 'Checkout unavailable')
      }

      if (data.mode === 'stripe' && data.checkout_url) {
        window.location.href = data.checkout_url
        return
      }

      if (data.fallback_url) {
        window.location.href = data.fallback_url
        return
      }
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          (isEs ? 'No pudimos abrir el pago. Intenta agendar directamente.' : 'Unable to launch checkout.')
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-50 to-dark text-white">
      <SEO
        title={isEs ? 'Activación Prioritaria IA | AI Dynamic Pro' : 'Priority AI Audit & Turnkey Checkout | AI Dynamic Pro'}
        description={
          isEs
            ? 'Calcula tu ahorro mensual y activa tu Auditoría IA de 48h o plan SaaS LATAM con garantía de retorno.'
            : 'Calculate your monthly AI savings and lock in your 48-hour AI Workflow Audit, Bootcamp, or Turnkey Agent.'
        }
        canonical="https://www.aidynamic.pro/offer"
      />

      {/* Minimal High-Converting Top Bar */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors">
            <Sparkles className="w-5 h-5 text-luxury-gold" />
            <span className="font-serif font-bold text-lg tracking-tight">AI Dynamic Pro</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setLang(isEs ? 'en' : 'es')}
              className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:border-luxury-gold/40 text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isEs ? '🇺🇸 Switch to English' : '🌎 Español / LATAM'}</span>
            </button>
            <a
              href="tel:+17866432099"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-xs font-bold hover:bg-luxury-gold/25 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(786) 643-2099</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {canceled && (
          <div className="mb-6 p-4 rounded-xl border border-amber-400/40 bg-amber-500/10 text-amber-200 text-sm flex items-center justify-between gap-4 flex-wrap">
            <span>
              {isEs
                ? 'Tu espacio sigue reservado temporalmente. Completa tu pago abajo o habla directo con Jasmel.'
                : 'Your checkout was paused — your priority slot is still held. Finish below or schedule directly with Jasmel.'}
            </span>
            <Link to="/booking" className="underline font-bold text-luxury-gold">
              {isEs ? 'Agendar Llamada Sin Pago ->' : 'Book Free Strategy Call ->'}
            </Link>
          </div>
        )}

        {refCode && (
          <div className="mb-6 p-3.5 rounded-xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isEs
                ? `Invitación VIP activada (${refCode}) — prioridad de ingeniería de 48 horas incluida.`
                : `VIP Executive Referral Activated (${refCode}) — includes priority 48-hour build queue access.`}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Value Proposition, Sofía Live Voice & ROI Calculator */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-xs font-mono font-bold mb-4">
                <Zap className="w-3.5 h-3.5" />
                {isEs ? activeOffer.badgeEs : activeOffer.badgeEn}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight text-white mb-4">
                {isEs ? activeOffer.titleEs : activeOffer.titleEn}
              </h1>
              <p className="text-luxury-silver text-base sm:text-lg leading-relaxed">
                {isEs ? activeOffer.guaranteeEs : activeOffer.guaranteeEn}
              </p>
            </div>

            {/* Live Sofía Bilingual Voice Proof */}
            <div className="p-4 sm:p-5 rounded-2xl border border-luxury-gold/30 bg-gradient-to-r from-luxury-gold/15 via-black/40 to-dark-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold mb-1">
                  {isEs ? 'Demo Real en Vivo · < 0.4s Latencia' : 'Live Sub-Second Voice AI Demo · Sofía'}
                </p>
                <p className="text-sm text-luxury-champagne">
                  {isEs
                    ? 'Escucha cómo atiende nuestro agente de voz IA real en español.'
                    : 'Hear our production bilingual voice agent before locking your audit.'}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleSofiaVoice}
                className="px-4 py-2.5 rounded-xl bg-luxury-gold text-dark font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 hover:brightness-110 transition-all shadow-lg cursor-pointer"
              >
                {isPlayingVoice ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isPlayingVoice
                    ? isEs
                      ? 'Detener Demo'
                      : 'Stop Voice Demo'
                    : isEs
                      ? 'Escuchar a Sofía IA'
                      : 'Play Sofía Voice Demo'}
                </span>
              </button>
            </div>

            {/* Interactive ROI / Payroll Recovery Slider */}
            <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/50 space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-bold text-white text-base sm:text-lg">
                    {isEs ? 'Calculadora de Ahorro Operativo Mensual' : 'Interactive Monthly Payroll Waste Estimator'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {roiMultiple}x ROI Estimate
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm text-luxury-silver mb-2">
                  <span>{isEs ? 'Tamaño de tu equipo operativo' : 'Operational team headcount'}</span>
                  <span className="font-bold text-white tabular-nums">{teamSize} {isEs ? 'personas' : 'staff'}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={40}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  aria-label="Operational team size"
                  className="w-full accent-luxury-gold cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-luxury-silver block mb-1">
                    {isEs ? 'Ahorro Mensual Estimado' : 'Est. Monthly Recovery'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 tabular-nums">
                    ${estimatedMonthlySavings.toLocaleString()}/mo
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-luxury-silver block mb-1">
                    {isEs ? 'Impacto Anualizado' : 'Projected 12-Mo Gain'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-luxury-gold tabular-nums">
                    ${(estimatedMonthlySavings * 12).toLocaleString()}/yr
                  </span>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-dark-50/80 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold">
                {isEs ? 'Qué incluye tu activación inmediata' : 'What Ships Immediately After Activation'}
              </p>
              <ul className="space-y-3">
                {(isEs ? activeOffer.bulletsEs : activeOffer.bulletsEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-luxury-champagne">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Plan Switcher */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-luxury-silver mb-2.5">
                {isEs ? 'Cambiar Nivel / Moneda USD:' : 'Switch Activation Tier:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {OFFERS.filter((o) => o.region === (isEs ? 'latam' : 'us') || o.id === 'audit_99').map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedOfferId(tier.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      tier.id === activeOffer.id
                        ? 'bg-luxury-gold text-dark border-luxury-gold shadow-md'
                        : 'bg-white/5 text-luxury-silver border-white/10 hover:border-luxury-gold/40 hover:text-white'
                    }`}
                  >
                    ${tier.priceUsd} · {isEs ? tier.badgeEs : tier.badgeEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky 2-Step Mobile-First Checkout Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 lg:sticky lg:top-20 rounded-2xl border-2 border-luxury-gold/50 bg-gradient-to-b from-dark-50 via-dark to-black p-6 sm:p-7 shadow-[0_0_50px_rgba(201,169,110,0.16)]"
          >
            {/* Price & Progress */}
            <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-white/10">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold">
                  {isEs ? `Paso ${step} de 2 · Reserva Segura` : `Step ${step} of 2 · Fast Activation`}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-white tabular-nums">${activeOffer.priceUsd}</span>
                  <span className="text-xs text-luxury-silver">
                    {isEs ? activeOffer.periodEs : activeOffer.periodEn}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{stripeReady ? 'Stripe Live' : isEs ? 'Prioridad' : 'Verified'}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-luxury-silver mb-1.5">
                    {isEs ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isEs ? 'Ej. Dra. Camila Rojas' : 'e.g. Dr. Carlos Mendez'}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-luxury-gold text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-luxury-silver mb-1.5">
                    {isEs ? 'Correo Corporativo o Clínica *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ceo@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-luxury-gold text-white text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-luxury-silver mb-1.5">
                      {isEs ? 'WhatsApp / Celular' : 'Mobile / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (786) 555-0199"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-luxury-gold text-white text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-luxury-silver mb-1.5">
                      {isEs ? 'Empresa / Estudio' : 'Company / Firm'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isEs ? 'Clínica / Estudio' : 'Acme Health / Legal'}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-luxury-gold text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-60"
                >
                  <span>
                    {submitting
                      ? isEs
                        ? 'Preparando...'
                        : 'Preparing Step 2...'
                      : isEs
                        ? `Continuar al Paso 2 ($${activeOffer.priceUsd}) ->`
                        : `Continue to Step 2 ($${activeOffer.priceUsd}) ->`}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-luxury-silver/70 text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>
                    {isEs
                      ? 'Protegido · Recibe también copia de enlace seguro por correo'
                      : '256-bit TLS · Automatic priority slot hold if you need to finish later'}
                  </span>
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-luxury-silver">{isEs ? 'Cliente' : 'Account'}</span>
                    <span className="font-bold text-white">{formData.name || formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-silver">{isEs ? 'Plan Elegido' : 'Selected Plan'}</span>
                    <span className="font-bold text-luxury-gold">{isEs ? activeOffer.badgeEs : activeOffer.badgeEn}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                    <span className="font-bold text-white">{isEs ? 'Total Hoy' : 'Due Today'}</span>
                    <span className="font-extrabold text-emerald-400 tabular-nums">${activeOffer.priceUsd} USD</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutLaunch}
                  disabled={submitting}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-60"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {submitting
                      ? isEs
                        ? 'Conectando...'
                        : 'Connecting Secure Session...'
                      : stripeReady
                        ? isEs
                          ? `Pagar $${activeOffer.priceUsd} con Stripe`
                          : `Complete $${activeOffer.priceUsd} Checkout`
                        : isEs
                          ? `Confirmar Cupo Prioritario ($${activeOffer.priceUsd})`
                          : `Lock Priority Slot & Kickoff ($${activeOffer.priceUsd})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2.5 text-xs text-luxury-silver hover:text-white underline cursor-pointer"
                >
                  {isEs ? '<- Editar correo o teléfono' : '<- Edit contact details'}
                </button>

                <div className="pt-3 border-t border-white/10 flex flex-col gap-2 text-xs text-luxury-silver">
                  <a
                    href={`https://wa.me/17866432099?text=${encodeURIComponent(
                      `Hi Jasmel, I just selected ${activeOffer.titleEn} ($${activeOffer.priceUsd}) from aidynamic.pro/offer.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-bold hover:bg-emerald-500/20 transition-all"
                  >
                    {isEs ? '💬 ¿Dudas rápidas? WhatsApp Directo Miami' : '💬 Need invoice or quick answer? WhatsApp Jasmel'}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
