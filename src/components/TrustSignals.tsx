import { motion } from 'framer-motion'
import { Check, Building2, Users, Clock, TrendingUp } from 'lucide-react'

const TrustSignals = () => {
  const stats = [
    { icon: Building2, value: '50+', label: 'Businesses Automated' },
    { icon: Users, value: '10,000+', label: 'Hours Saved Monthly' },
    { icon: Clock, value: '30', label: 'Days Average Implementation' },
    { icon: TrendingUp, value: '40%', label: 'Average Cost Reduction' },
  ]

  const clients = [
    'Healthcare Clinic Miami',
    'Law Firm Associates',
    'Marketing Agency Pro',
    'Real Estate Group',
    'Accounting Solutions',
    'Dental Care Center',
  ]

  const certifications = [
    'Google Cloud Partner',
    'AWS Certified',
    'Azure AI Engineer',
    'HIPAA Compliant',
    'SOC 2 Type II',
  ]

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-dark to-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">
            Trusted by Miami Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {clients.map((client) => (
              <div
                key={client}
                className="px-6 py-3 rounded-xl glass text-gray-400 text-sm font-medium"
              >
                {client}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-6">
            Certified & Compliant
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20"
              >
                <Check className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-300">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSignals
