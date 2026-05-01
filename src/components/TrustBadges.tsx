import { motion } from 'framer-motion'
import { ShieldCheck, Wrench, Globe, HeartPulse } from 'lucide-react'

const TrustBadges = () => {
  const badges = [
    {
      icon: ShieldCheck,
      label: 'HIPAA Compliant',
      description: 'Enterprise-grade security for healthcare data',
    },
    {
      icon: Wrench,
      label: 'Done-for-You',
      description: 'We build, deploy, and train — you just use it',
    },
    {
      icon: Globe,
      label: 'Any Industry',
      description: 'Healthcare, legal, real estate, retail, and more',
    },
    {
      icon: HeartPulse,
      label: 'Healthcare-Grade Rigor',
      description: 'The same standards we apply to medical workflows',
    },
  ]

  return (
    <section className="py-12 relative overflow-hidden bg-dark-50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-luxury-gold/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg border border-luxury-gold/20 bg-luxury-gold/5 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{badge.label}</div>
                <div className="text-xs text-luxury-silver hidden sm:block">{badge.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadges
