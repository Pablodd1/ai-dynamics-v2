import { motion } from 'framer-motion'
import { Check, ArrowRight, Search, Zap, Building2 } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Workflow Audit',
      price: '$997',
      priceNote: 'one-time',
      duration: '1 week',
      description: 'Map your automation opportunities before you build anything.',
      icon: Search,
      accentColor: 'green',
      cta: 'Book Audit',
      ctaAction: 'https://aidynamic.pro/booking',
      features: [
        'Full business process review',
        'Automation opportunity map',
        'ROI estimate for each workflow',
        'Prioritized implementation plan',
        'PDF deliverable within 1 week',
      ],
    },
    {
      name: 'Single Workflow Build',
      price: '$2,497',
      priceNote: 'one-time',
      duration: '2-3 weeks',
      description: 'Build + deploy one complete AI automation system.',
      icon: Zap,
      accentColor: 'blue',
      cta: 'Start Your Build',
      ctaAction: 'https://aidynamic.pro/booking',
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
      name: 'AI Transformation',
      price: '$4,997',
      priceNote: '/mo',
      duration: '3-month minimum',
      description: 'Multiple workflows + ongoing optimization.',
      icon: Building2,
      accentColor: 'purple',
      cta: 'Book Consultation',
      ctaAction: 'https://aidynamic.pro/booking',
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
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const accent = accentStyles[plan.accentColor]
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative rounded-2xl border ${accent.border} ${accent.bg} p-8 hover:border-luxury-gold/30 transition-all`}
              >
                {/* Duration Badge */}
                <div className="absolute -top-3 right-6">
                  <span className={`px-3 py-1 rounded-full ${accent.badgeBg} ${accent.badgeText} text-xs font-bold uppercase tracking-wider`}>
                    {plan.duration}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${accent.border} ${accent.bg}`}>
                  <plan.icon className={`w-7 h-7 ${accent.dot}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">{plan.name}</h3>
                <p className="text-luxury-silver text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-luxury-silver ml-2">{plan.priceNote}</span>
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaAction}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all mb-8 border ${accent.border} ${accent.bg} hover:bg-luxury-gold/10 text-luxury-gold`}
                >
                  {plan.cta}
                  <ArrowRight className="w-5 h-5" />
                </a>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${accent.dot}`} />
                      <span className="text-luxury-champagne text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
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
            href="https://aidynamic.pro/booking"
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
