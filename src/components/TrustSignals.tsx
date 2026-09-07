import { motion } from 'framer-motion'
import { Check, Building2, Stethoscope, Scale, Home, Calculator, Smile } from 'lucide-react'

const TrustSignals = () => {
  const industries = [
    { icon: Stethoscope, name: 'Healthcare', description: 'HIPAA-compliant AI scribes & automation' },
    { icon: Scale, name: 'Legal', description: 'Case management & document automation' },
    { icon: Home, name: 'Real Estate', description: 'Lead qualification & CRM integration' },
    { icon: Calculator, name: 'Accounting', description: 'Invoice processing & reconciliation' },
    { icon: Smile, name: 'Dental', description: 'Patient scheduling & recall systems' },
    { icon: Building2, name: 'Retail', description: 'Inventory & customer service AI' },
  ]

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-dark-50 to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Industries
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            <span className="text-white">Built for</span>{' '}
            <span className="text-luxury-gold">Miami Business</span>
          </h2>
          <p className="text-lg text-luxury-silver max-w-2xl mx-auto">
            Specialized AI solutions for the industries that power our city.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/30 hover:bg-luxury-gold/5 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 flex items-center justify-center group-hover:border-luxury-gold/40 transition-colors">
                  <industry.icon className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{industry.name}</h3>
                  <p className="text-sm text-luxury-silver">{industry.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            {['Local Miami Business', 'On-site Support Available', 'Spanish & English', 'Same-day Response'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-luxury-silver">
                <Check className="w-4 h-4 text-luxury-gold" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSignals