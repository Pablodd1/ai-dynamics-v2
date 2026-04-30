import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Building2, Calendar, FileText, MessageSquare, Gauge, Headphones, Users } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'AI Opportunity Audit',
      price: '$99',
      priceNote: 'one-time',
      description: 'Know exactly where AI can save you money — before you spend a dollar building.',
      icon: FileText,
      popular: false,
      cta: 'Book Your Audit',
      ctaAction: '#contact',
      features: [
        '30-min strategy call with our AI team',
        'Workflow analysis & automation map',
        '3 prioritized AI opportunity reports',
        'ROI estimate for each recommendation',
        '48-hour PDF delivery',
        'No obligation — keep the report even if you don\'t buy',
      ],
      deliverables: [
        { icon: FileText, label: 'Audit Report PDF' },
        { icon: Gauge, label: 'ROI Calculator' },
        { icon: Calendar, label: 'Implementation Roadmap' },
      ],
    },
    {
      name: 'Single Workflow Build',
      price: '$2,497',
      priceNote: 'per workflow',
      description: 'We build and deploy one complete AI automation — working in 14 days or less.',
      icon: Zap,
      popular: true,
      cta: 'Start Your Build',
      ctaAction: '#contact',
      features: [
        'Everything in Audit, plus:',
        'End-to-end AI workflow design',
        'Integration with your existing tools',
        'Custom AI agent development',
        'Testing & quality assurance',
        '14-day delivery guarantee',
        '30 days post-launch support',
        'Team training session (1 hour)',
      ],
      deliverables: [
        { icon: Zap, label: 'Working AI Workflow' },
        { icon: MessageSquare, label: 'Chatbot or Agent' },
        { icon: Headphones, label: '30-Day Support' },
      ],
    },
    {
      name: 'Full AI Transformation',
      price: '$4,997',
      priceNote: 'on-site or virtual',
      description: 'Comprehensive AI overhaul for your entire operation. We come to you (or do it virtually).',
      icon: Building2,
      popular: false,
      cta: 'Book Consultation',
      ctaAction: '#contact',
      features: [
        'Everything in Single Workflow, plus:',
        'Full business process audit',
        'Multi-workflow AI architecture',
        'On-site or virtual consultation',
        'Custom AI strategy & roadmap',
        'Team training (up to 10 people)',
        '90 days premium support',
        'Monthly performance reviews',
        'Priority access to new AI features',
      ],
      deliverables: [
        { icon: Building2, label: 'Full AI System' },
        { icon: Users, label: 'Team Training' },
        { icon: Headphones, label: '90-Day Support' },
      ],
    },
  ]

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
            Start with a $99 audit to see what's possible. Then upgrade when you're ready to build.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-2xl border ${
                plan.popular 
                  ? 'border-luxury-gold/50 bg-gradient-to-b from-luxury-gold/10 to-dark-50' 
                  : 'border-white/10 bg-white/[0.02]'
              } p-8 hover:border-luxury-gold/30 transition-all`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-luxury-gold text-dark text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular ? 'bg-luxury-gold/20' : 'bg-white/5'
              }`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-luxury-gold' : 'text-luxury-silver'}`} />
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
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all mb-8 ${
                  plan.popular
                    ? 'bg-luxury-gold text-dark hover:bg-luxury-gold-light'
                    : 'border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-luxury-gold' : 'text-luxury-gold/60'
                    }`} />
                    <span className="text-luxury-champagne text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Deliverables */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-luxury-silver uppercase tracking-wider mb-4">You Get</p>
                <div className="space-y-3">
                  {plan.deliverables.map((d) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <d.icon className="w-4 h-4 text-luxury-gold/60" />
                      <span className="text-sm text-luxury-champagne">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5">
            <Check className="w-6 h-6 text-luxury-gold" />
            <span className="text-luxury-champagne">
              <span className="font-semibold text-white">14-Day Money Back Guarantee</span> on all builds — 
              if we don't deliver what we promised, you get a full refund. No questions.
            </span>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-luxury-silver">
            Questions?{' '}
            <a href="#contact" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
              Book a free 15-min call →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing