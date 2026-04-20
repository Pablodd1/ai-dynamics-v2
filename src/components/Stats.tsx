import { motion } from 'framer-motion'
import { TrendingUp, Clock, Users, Building2, Shield, Award } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: Building2,
      value: '50+',
      label: 'Businesses Automated',
      description: 'Across healthcare, legal, and retail',
    },
    {
      icon: Clock,
      value: '10,000+',
      label: 'Hours Saved Monthly',
      description: 'Through intelligent automation',
    },
    {
      icon: Users,
      value: '40%',
      label: 'Cost Reduction',
      description: 'Average client savings',
    },
    {
      icon: TrendingUp,
      value: '30',
      label: 'Day Implementation',
      description: 'Average deployment time',
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5 mb-5 group-hover:border-luxury-gold/40 transition-colors">
                <stat.icon className="w-7 h-7 text-luxury-gold" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">{stat.value}</div>
              <div className="text-sm text-luxury-champagne font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-luxury-silver">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { icon: Shield, label: 'HIPAA Compliant' },
            { icon: Award, label: 'SOC 2 Type II' },
            { icon: Shield, label: 'GDPR Ready' },
            { icon: Award, label: 'AES-256 Encrypted' },
          ].map((cert) => (
            <div key={cert.label} className="flex items-center gap-2 text-luxury-silver/60">
              <cert.icon className="w-4 h-4 text-luxury-gold/60" />
              <span className="text-xs uppercase tracking-wider">{cert.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats