import { useMemo, useState } from 'react'
import { Check, Copy, Gift, Mail, MessageCircle, Share2 } from 'lucide-react'

interface ViralReferralBoxProps {
  referrerName?: string
  referrerEmail?: string
  isEs?: boolean
}

export function ViralReferralBox({ referrerName = '', referrerEmail = '', isEs = false }: ViralReferralBoxProps) {
  const [copied, setCopied] = useState(false)

  const refCode = useMemo(() => {
    const raw = (referrerName || referrerEmail.split('@')[0] || 'VIP').toUpperCase().replace(/[^A-Z0-9]/g, '')
    return `${raw.slice(0, 8) || 'FOUNDER'}297`
  }, [referrerName, referrerEmail])

  const referralUrl = useMemo(
    () =>
      `https://www.aidynamic.pro/offer?offer=audit_99&ref=${encodeURIComponent(refCode)}&utm_source=referral&utm_medium=viral_share&utm_campaign=give_99_get_297`,
    [refCode]
  )

  const shareText = isEs
    ? `Te comparto mi pase VIP con AI Dynamic Pro: hacen tu Auditoría IA de 48h + prototipo funcional por $99 (garantizan $2,500+/mes en ahorro o devuelven el 100%). Usa mi enlace prioritario: ${referralUrl}`
    : `Sharing my VIP partner link for AI Dynamic Pro: they run a 48-hour AI Workflow Audit + live prototype for $99 backed by a $2,500+/mo savings guarantee. Lock a priority slot here: ${referralUrl}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback ignored if clipboard is locked
    }
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-luxury-gold/40 bg-gradient-to-br from-luxury-gold/15 via-dark-50 to-black text-left space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-luxury-gold" />
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold font-bold block">
            {isEs ? 'Programa Viral de Fundadores' : 'Executive Viral Referral Loop'}
          </span>
          <h3 className="text-lg font-bold text-white font-serif leading-snug">
            {isEs
              ? 'Regala Auditoría IA ($99) -> Recibe $297/mes de Crédito Gratis'
              : 'Give Priority $99 AI Audit -> Get $297/mo Credit Free'}
          </h3>
          <p className="text-xs sm:text-sm text-luxury-silver mt-1">
            {isEs
              ? 'Cuando otro médico, abogado, arquitecto o CEO activa su auditoría o plan con tu enlace, acreditamos $297 USD a tu cuenta o desarrollo.'
              : 'Every peer CEO, clinic owner, or partner who activates an Audit or Turnkey build through your link unlocks $297 USD in engineering credit for you.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/60 border border-white/10">
        <input
          type="text"
          readOnly
          value={referralUrl}
          aria-label="Referral link"
          className="flex-1 bg-transparent text-xs font-mono text-luxury-champagne outline-none truncate"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-luxury-gold text-dark font-bold text-xs flex items-center gap-1.5 shrink-0 hover:brightness-110 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isEs ? 'Copiado' : 'Copied') : isEs ? 'Copiar' : 'Copy Link'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-500/25 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sky-500/25 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            isEs ? 'Invitación VIP Auditoría IA ($99) — AI Dynamic Pro' : 'VIP $99 AI Workflow Audit Invite — AI Dynamic Pro'
          )}&body=${encodeURIComponent(shareText)}`}
          className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:border-luxury-gold/40 transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </a>
      </div>
    </div>
  )
}
