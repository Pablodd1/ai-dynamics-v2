import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { AnalyticsEvents } from '../lib/analytics'

const Pricing = () => {
  const plans = [
    {
      id: 'audit_99',
      name: '1. AI Consultation & Efficiency Audit',
      price: '$99',
      oldPrice: '$500',
      priceNote: 'or Free 15-Min Triage Call',
      badge: 'Zero-Risk Entry',
      duration: '60-Min Audit + ROI Blueprint',
      description:
        'Get in the door first: start with a Free 15-Min Triage Call or lock in our full 60-minute Department AI Audit to pinpoint manual payroll waste.',
      accentColor: 'green',
      isPopular: false,
      cta: 'Book $99 Audit (or Free 15m Call)',
      ctaAction: '/booking',
      subGuarantee: '$0 Risk Guarantee: Pay $0 unless we uncover $2,500+/mo ($30k/yr) in payroll savings',
      features: [
        'Department-by-department workflow & payroll review',
        'Identify 3+ manual tasks/roles to automate this week',
        'Includes Free 48-Hour Live AI Voice/Workflow Prototype',
        '100% of $99 credited toward any build or training',
        'Guaranteed $2,500+/mo in found savings or you pay $0',
      ],
    },
    {
      id: 'training_497',
      name: '2. Corporate AI Staff Bootcamp',
      price: '$497',
      oldPrice: '$1,500',
      priceNote: 'half-day team workshop',
      badge: 'Fastest Team ROI',
      duration: '1 Employee = 5x Output',
      description:
        'Don’t hire more headcount. We train your existing staff in 1 afternoon on role-specific AI workflows so 1 employee produces the output of 5.',
      accentColor: 'amber',
      isPopular: false,
      cta: 'Book $497 Team AI Bootcamp',
      ctaAction: '/booking',
      subGuarantee: 'On-site in South Florida or Live Virtual • Up to 15 staff members included',
      features: [
        'Hands-on Corporate AI Workshop (English & Spanish)',
        'Role-specific AI SOPs for Admin, Sales, Ops & Billing',
        'Cut daily administrative busywork by 60% immediately',
        'Enterprise data privacy & security guardrails',
        'Custom prompt library & AI workflow templates for your team',
      ],
    },
    {
      id: 'turnkey_997',
      name: '3. Custom AI Solution & 24/7 Agent',
      price: '$997',
      oldPrice: '$2,500',
      priceNote: 'turnkey (or $297/mo managed)',
      badge: '★ Most Popular',
      duration: '14-Day Turnkey Launch',
      description:
        'We engineer and deploy your custom 24/7 bilingual AI voice/chat receptionist (JAss) or automated back-office workflow so you cut overhead immediately.',
      accentColor: 'blue',
      isPopular: true,
      cta: 'Deploy Custom AI Solution',
      ctaAction: '/booking',
      subGuarantee: 'Flexible Payment: $997 one-time turnkey build OR $297/mo all-inclusive managed AI',
      features: [
        '24/7 Bilingual AI Voice & Web Receptionist (JAss)',
        'Or 1 high-impact automated intake / CRM / billing workflow',
        'Direct integration with your Calendar, CRM, EHR, or ERP',
        'Eliminate missed calls, voicemail & manual data entry',
        '14-day production launch + 30 days engineering support',
        'Includes live staff handoff & onboarding session',
      ],
    },
    {
      id: 'enterprise_4900',
      name: '4. Full Enterprise AI Transformation',
      price: '$4,900',
      oldPrice: '',
      priceNote: '– $15,000 custom architecture',
      badge: 'Full Automation',
      duration: 'Multi-Department Scale',
      description:
        'Complete company-wide automation: custom AI software, computer vision, autonomous multi-agent pipelines, and full workforce transformation.',
      accentColor: 'purple',
      isPopular: false,
      cta: 'Book Executive Strategy Call',
      ctaAction: '/booking',
      subGuarantee: '70% more affordable & 4x faster than traditional $25k+ consulting agencies',
      features: [
        'Multi-department custom AI apps & full automation',
        'Computer Vision, 3D Spatial AI, or Custom LLM/RAG systems',
        'Full Corporate AI Staff Training Bootcamp included FREE',
        'Enterprise HIPAA / SOC2-aligned security architecture',
        'Scale company revenue without adding payroll bloat',
        'Dedicated AI Systems Architect & monthly ROI reviews',
      ],
    },
  ]

  const accentStyles: Record<string, { border: string; bg: string; badgeBg: string; badgeText: string; dot: string }> = {
    green: {
      border: 'border-emerald-400/30',
      bg: 'bg-emerald-400/5',
      badgeBg: 'bg-emerald-400',
      badgeText: 'text-dark',
      dot: 'text-emerald-400',
    },
    amber: {
      border: 'border-amber-400/30',
      bg: 'bg-amber-400/5',
      badgeBg: 'bg-amber-400',
      badgeText: 'text-dark',
      dot: 'text-amber-400',
    },
    blue: {
      border: 'border-sky-400/30',
      bg: 'bg-sky-400/5',
      badgeBg: 'bg-sky-400',
      badgeText: 'text-dark',
      dot: 'text-sky-400',
    },
    purple: {
      border: 'border-purple-400/30',
      bg: 'bg-purple-400/5',
      badgeBg: 'bg-purple-400',
      badgeText: 'text-dark',
      dot: 'text-purple-400',
    },
  }

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-5">
            Transparent ROI-First Pricing • 60% Below Traditional Agencies
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 font-serif">
            <span className="text-white">Cut Costs First. </span>
            <span className="text-luxury-gold">Scale With Zero Risk.</span>
          </h2>
          <p className="text-base sm:text-xl text-luxury-silver max-w-3xl mx-auto">
            Start with a <strong className="text-white">Free 15-Minute Triage Call</strong> or our <strong className="text-luxury-gold">$99 Efficiency Audit</strong> (guaranteed to uncover <strong className="text-emerald-400">$2,500+/mo in payroll savings</strong> or you pay $0).
          </p>
        </motion.div>

        {/* Pricing Cards (4 Tiers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular
            const accent = accentStyles[plan.accentColor]
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-luxury-gold/70 bg-gradient-to-b from-luxury-gold/[0.10] via-dark-50 to-dark shadow-[0_0_40px_rgba(201,169,110,0.18)] xl:-translate-y-2'
                    : `border ${accent.border} ${accent.bg} hover:border-luxury-gold/30`
                }`}
              >
                {/* Top Badge */}
                <div className="absolute -top-3.5 left-6 right-6 flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-luxury-gold to-amber-500 text-dark'
                        : `${accent.badgeBg} ${accent.badgeText}`
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono text-luxury-silver">
                    {plan.duration}
                  </span>
                </div>

                <div>
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white mb-2 mt-2 font-serif leading-snug">{plan.name}</h3>
                  <p className="text-luxury-silver text-xs sm:text-sm mb-5 leading-relaxed">{plan.description}</p>

                  {/* Price Block */}
                  <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {plan.oldPrice && (
                        <span className="text-lg text-luxury-silver/50 line-through font-semibold">
                          {plan.oldPrice}
                        </span>
                      )}
                      <span className={`text-4xl font-extrabold ${isPopular ? 'text-luxury-gold' : 'text-white'}`}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-luxury-champagne font-medium">{plan.priceNote}</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 mt-2 font-medium leading-snug">
                      {plan.subGuarantee}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={plan.ctaAction}
                    onClick={() => AnalyticsEvents.clickBooking(plan.name, 'pricing_card')}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all mb-6 shadow-md ${
                      isPopular
                        ? 'btn-primary'
                        : `border ${accent.border} ${accent.bg} hover:bg-luxury-gold/15 text-white hover:border-luxury-gold/50`
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            isPopular ? 'text-luxury-gold' : accent.dot
                          }`}
                        />
                        <span className="text-luxury-champagne text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Fast-Entry Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black/80 via-dark-50 to-black/80 border border-luxury-gold/30 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="text-left max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              ⚡ FASTEST WAY TO TEST US BEFORE PAYING A DIME
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Want to see a live AI prototype for your company first?
            </h3>
            <p className="text-sm text-luxury-silver mt-1">
              Book a <strong className="text-white">Free 15-Minute Executive Triage Call</strong>—we’ll show you 3 workflows you can automate immediately and configure a live 48-hour AI Voice/Chat demo for your team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/booking"
              onClick={() => AnalyticsEvents.clickBooking('discovery_consultation', 'pricing_bottom_cta')}
              className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-4"
            >
              <span>Book Free 15-Min Triage or $99 Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
