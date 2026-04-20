import { motion } from 'framer-motion'
import { Globe, Server, Database, GitBranch, Bot, Cpu } from 'lucide-react'

const Partners = () => {
  const partners = [
    { 
      name: 'OpenClaw', 
      role: 'AI Agent Platform',
      icon: Bot,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
    },
    { 
      name: 'Railway', 
      role: 'Cloud Infrastructure',
      icon: Server,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
    },
    { 
      name: 'Vercel', 
      role: 'Edge Deployment',
      icon: Globe,
      color: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-500/30',
    },
    { 
      name: 'Supabase', 
      role: 'Database & Auth',
      icon: Database,
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/30',
    },
    { 
      name: 'GitHub', 
      role: 'Source Control',
      icon: GitBranch,
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
    },
    { 
      name: 'Kimi AI', 
      role: 'LLM Intelligence',
      icon: Cpu,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
    },
  ]

  const integrations = [
    'Google Cloud Partner',
    'HIPAA Compliant Infrastructure',
    'SOC 2 Type II Certified',
    'AES-256 Encryption',
    'GDPR Ready',
    'Real-time Monitoring',
  ]

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Technology Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Trusted</span>{' '}
            <span className="text-luxury-gold">Infrastructure</span>
          </h2>
          <p className="text-lg text-luxury-silver max-w-2xl mx-auto leading-relaxed">
            We build on enterprise-grade platforms. No fake reviews — just real technology partnerships that power your business.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 rounded-2xl border ${partner.borderColor} bg-gradient-to-br ${partner.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-500`}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-luxury-gold/30 transition-colors">
                  <partner.icon className="w-7 h-7 text-white/70 group-hover:text-luxury-gold transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{partner.name}</h3>
                  <p className="text-sm text-luxury-silver">{partner.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs text-luxury-silver uppercase tracking-[0.3em] mb-8">
            Enterprise Standards
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((item) => (
              <div
                key={item}
                className="px-5 py-2.5 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-sm text-luxury-champagne hover:border-luxury-gold/40 hover:bg-luxury-gold/10 transition-all"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Partners
