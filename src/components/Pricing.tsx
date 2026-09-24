import { motion } from 'framer-motion'
import { Check, ArrowRight, Search, Zap, Building2 } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Strategy & Audit',
      price: '$99',
      priceNote: 'one-time',
      duration: '1 week',
      description: 'A Workflow Audit and Automation Opportunity Map. Know exactly what to automate first for the highest ROI.',
      icon: Search,
      accentColor: 'green',
      cta: 'Book Audit',
      ctaAction: 'https://calendly.com/aidynamicpro/discovery',
      features: [
        'Full business process review',
        'Automation opportunity map',
        'ROI estimate for each workflow',
        'Prioritized implementation plan',
        'PDF report delivered in 1 week',
      ],
    },
    {
      name: 'Single High-Impact Workflow',
      price: '$1,000',
      priceNote: 'one-time',
      duration: '2-3 weeks',
      description: 'One complete, end-to-end AI automation. Fully integrated into your current tools with 30 days of support.',
      icon: Zap,
      accentColor: 'blue',
      cta: 'Start Your Build',
      ctaAction: 'https://calendly.com/aidynamicpro/discovery',
      features: [
        'End-to-end workflow design',
        'AI agent development',
        'Integration with your tools',
        'Testing & quality assurance',
        '2-3 week delivery',
        '30 days post-launch support',
        'Team training session',
      ],
    },
    {
      name: 'Full AI Transformation',
      price: '$5,000',
      priceNote: '- $15,000',
      duration: '1-3 months',
      description: 'Comprehensive automation across multiple workflows. Your dedicated AI partner for ongoing optimization and scaling.',
      icon: Building2,
      accentColor: 'purple',
      cta: 'Book Consultation',
      ctaAction: 'https://calendly.com/aidynamicpro/discovery',
      features: [
        'Everything in Single Build, plus:',
        'Multiple workflow automation',
        'Monthly performance reviews',
        'Ongoing optimization & tuning',
        'Priority support & updates',
        'Quarterly strategy sessions',
        'Dedicated automation partner',
      ],
    },
  ]

  const accentStyles: Record<string, { border: string; bg: string; badgeBg: string; badgeText: string; dot: string }> = {
    green: {
      border: 'border-green-400/30',
      bg: 'bg-green-400/5',
      badgeBg: 'bg-green-400',
      badgeText: 'text-dark',
      dot: 'text-green-400',
    },
    blue: {
      border: 'border-blue-400/30',
      bg: 'bg-blue-400/5',
      badgeBg: 'bg-blue-400',
      badgeText: 'text-dark',
      dot: 'text-blue-400',
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
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.8) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Pick Your </span>
            <span className="text-luxury-gold">Package</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-3xl mx-auto">
            Start with an audit to see what is possible. Then build when you are ready.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const isPopular = plan.name === 'Single High-Impact Workflow'
            const accent = accentStyles[plan.accentColor]
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative rounded-2xl flex flex-col justify-between p-8 transition-all duration-300 ${
                  isPopular 
                    ? 'border-2 border-luxury-gold/60 bg-gradient-to-b from-luxury-gold/[0.08] via-dark-50 to-dark shadow-[0_0_40px_rgba(201,169,110,0.15)] md:-translate-y-2' 
                    : `border ${accent.border} ${accent.bg} hover:border-luxury-gold/30`
                }`}
              >
                {/* Popular or Duration Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 flex items-center gap-2">
                  {isPopular && (
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-luxury-gold to-amber-500 text-dark text-xs font-extrabold uppercase tracking-wider shadow-lg">
                      ★ Most Popular
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full ${accent.badgeBg} ${accent.badgeText} text-xs font-bold uppercase tracking-wider`}>
                    {plan.duration}
                  </span>
                </div>

                <div>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${isPopular ? 'border-luxury-gold/40 bg-luxury-gold/15' : `${accent.border} ${accent.bg}`}`}>
                    <plan.icon className={`w-7 h-7 ${isPopular ? 'text-luxury-gold' : accent.dot}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">{plan.name}</h3>
                  <p className="text-luxury-silver text-sm mb-6 leading-relaxed">{plan.description}</p>

                  {/* Price Block */}
                  <div className="mb-8 p-4 rounded-xl bg-black/30 border border-white/5">
                    {plan.name === 'Strategy & Audit' ? (
                      <div>
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-2xl text-luxury-silver/50 line-through font-semibold">$99</span>
                          <span className="text-5xl font-bold text-luxury-gold">$0</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase">
                            Free
                          </span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-2 font-medium">Limited time: Comprehensive 1-on-1 audit at $0</p>
                      </div>
                    ) : plan.name === 'Single High-Impact Workflow' ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold text-white">$1,000</span>
                          <span className="text-luxury-silver text-sm">flat rate</span>
                        </div>
                        <p className="text-xs text-luxury-champagne mt-2 font-medium">Turnkey deployment • 30 days guarantee & training</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-4xl font-bold text-white">$5,000</span>
                          <span className="text-luxury-silver text-lg font-light">– $15k</span>
                        </div>
                        <p className="text-xs text-luxury-silver/80 mt-2 font-medium">Custom multi-system architecture & scaling</p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={plan.ctaAction}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all mb-8 shadow-md ${
                      isPopular
                        ? 'btn-primary'
                        : `border ${accent.border} ${accent.bg} hover:bg-luxury-gold/10 text-luxury-gold hover:border-luxury-gold/40`
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isPopular ? 'text-luxury-gold' : accent.dot}`} />
                        <span className="text-luxury-champagne text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-luxury-silver mb-4">
            Not sure which package fits? Every engagement starts with a free call.
          </p>
          <a
            href="https://calendly.com/aidynamicpro/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
