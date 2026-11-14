import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react'
import { SEO } from '../components/SEO'
import { ViralReferralBox } from '../components/ViralReferralBox'
import { trackConversionEvent } from '../lib/analytics'

const API_BASE = ((import.meta as any).env?.VITE_API_BASE || '') as string

interface VerifiedSession {
  id: string
  amount_usd: number
  currency: string
  customer_email: string
  customer_name: string
  offer_id: string
  offer_title: string
  ref_code?: string
}

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id') || ''
  const offerParam = searchParams.get('offer') || 'audit_99'
  const batchParam = searchParams.get('batch_id') || ''
  const isEs = searchParams.get('lang') === 'es' || offerParam.startsWith('latam_')

  const [loading, setLoading] = useState<boolean>(Boolean(sessionId))
  const [verified, setVerified] = useState<boolean>(false)
  const [session, setSession] = useState<VerifiedSession | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    let storedBatch = batchParam
    if (!storedBatch) {
      try {
        storedBatch = sessionStorage.getItem('aidynamic_abandon_batch_id') || ''
      } catch {}
    }

    if (!sessionId) {
      if (storedBatch) {
        fetch(`${API_BASE}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cancel_abandon', batch_id: storedBatch }),
        }).catch(() => {})
      }
      return
    }

    let cancelled = false
    fetch(
      `${API_BASE}/api/checkout?action=verify&session_id=${encodeURIComponent(sessionId)}&batch_id=${encodeURIComponent(storedBatch)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data?.verified && data?.session) {
          setVerified(true)
          setSession(data.session)

          const dedupeKey = `aidynamic_purchased_${sessionId}`
          let alreadyTracked = false
          try {
            alreadyTracked = Boolean(sessionStorage.getItem(dedupeKey))
            if (!alreadyTracked) sessionStorage.setItem(dedupeKey, '1')
          } catch {}

          if (!alreadyTracked) {
            const parts = String(data.session.customer_name || '').trim().split(/\s+/)
            trackConversionEvent({
              eventName: 'Purchase',
              value: data.session.amount_usd,
              currency: data.session.currency || 'USD',
              contentName: data.session.offer_title,
              contentIds: [data.session.offer_id],
              email: data.session.customer_email,
              firstName: parts[0],
              lastName: parts.slice(1).join(' '),
              transactionId: sessionId,
            })
          }
        } else if (data?.error) {
          setErrorMsg(data.error)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setErrorMsg(isEs ? 'No pudimos verificar la sesión automáticamente.' : 'Automatic verification delayed.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [sessionId, batchParam, isEs])

  const kickoffUrl = `/booking?intent=paid_verified&service=${encodeURIComponent(
    'Automation Blueprint'
  )}&name=${encodeURIComponent(session?.customer_name || '')}&email=${encodeURIComponent(
    session?.customer_email || ''
  )}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-50 to-dark text-white px-4 py-12">
      <SEO
        title={isEs ? 'Activación Confirmada | AI Dynamic Pro' : 'Activation Confirmed | AI Dynamic Pro'}
        description="Verified AI Dynamic Pro onboarding, kickoff scheduler, and referral rewards."
        noindex
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="p-7 sm:p-9 rounded-2xl border border-luxury-gold/40 bg-black/50 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto">
            {loading ? (
              <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
            ) : (
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            )}
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              {loading
                ? isEs
                  ? 'Verificando pago con Stripe...'
                  : 'Verifying Stripe Receipt...'
                : verified
                  ? isEs
                    ? 'Pago Verificado · Prioridad Activada'
                    : 'Payment Verified · Priority Queue Unlocked'
                  : isEs
                    ? 'Solicitud Registrada · Siguiente Paso'
                    : 'Slot Reserved · Complete Your Kickoff'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              {isEs ? 'Bienvenido a AI Dynamic Pro' : 'Welcome to AI Dynamic Pro'}
            </h1>
            <p className="text-luxury-silver text-sm sm:text-base mt-2">
              {session
                ? isEs
                  ? `Confirmado: ${session.offer_title} ($${session.amount_usd} USD) para ${session.customer_email}.`
                  : `Confirmed: ${session.offer_title} ($${session.amount_usd} USD) for ${session.customer_email}.`
                : isEs
                  ? 'Agenda ahora tu sesión de arquitectura 1-a-1 para lanzar tu prototipo en 48 horas.'
                  : 'Pick your exact kickoff window below so our engineers ship your working prototype within 48 hours.'}
            </p>
            {errorMsg && <p className="text-xs text-amber-300 mt-2">{errorMsg}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={kickoffUrl}
              className="w-full sm:w-auto btn-primary px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>{isEs ? 'Elegir Hora de Kickoff Ahora' : 'Schedule Priority Kickoff Call'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/17866432099"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-emerald-500/25 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp (786) 643-2099</span>
            </a>
          </div>
        </div>

        <ViralReferralBox
          referrerName={session?.customer_name || ''}
          referrerEmail={session?.customer_email || ''}
          isEs={isEs}
        />

        <div className="text-center">
          <Link to="/" className="text-xs font-mono text-luxury-silver hover:text-luxury-gold underline">
            {isEs ? '<- Volver al sitio principal' : '<- Return to aidynamic.pro'}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
