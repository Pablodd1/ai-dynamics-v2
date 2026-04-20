import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, Trash2, Share2 } from 'lucide-react'

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, including:
      • Business contact information (name, email, phone, company)
      • Project requirements and business data for AI training
      • Usage data and analytics from our platforms
      • Communication records and support tickets`
    },
    {
      icon: Database,
      title: 'How We Use Your Data',
      content: `Your data is used exclusively for:
      • Delivering and improving our AI services
      • Training custom models for your specific use case
      • Technical support and troubleshooting
      • Compliance with legal obligations
      
      We never sell your data to third parties or use it for advertising.`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement enterprise-grade security measures:
      • AES-256 encryption at rest and in transit
      • SOC 2 Type II certified infrastructure
      • Regular penetration testing and security audits
      • Role-based access controls and audit logging
      • HIPAA-compliant data handling for healthcare clients`
    },
    {
      icon: Share2,
      title: 'Data Sharing',
      content: `We only share data with:
      • Subprocessors under strict confidentiality agreements (cloud providers, AI APIs)
      • Legal authorities when required by law
      • No data is shared with advertisers or data brokers
      
      All subprocessors are listed in our subprocessor registry available upon request.`
    },
    {
      icon: Trash2,
      title: 'Data Retention & Deletion',
      content: `• Active project data: retained for the duration of service
      • Backup data: retained for 30 days after deletion
      • Analytics data: anonymized after 12 months
      • You may request complete data deletion at any time
      • Deletion requests processed within 14 business days`
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: `Under GDPR, CCPA, and applicable privacy laws, you have the right to:
      • Access your personal data
      • Correct inaccurate data
      • Request deletion of your data
      • Object to processing
      • Data portability
      • Withdraw consent at any time
      
      Contact us to exercise any of these rights.`
    }
  ]

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-luxury-gold hover:text-luxury-champagne transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Home</span>
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-luxury-gold" />
            <h1 className="text-4xl font-bold font-serif">Privacy Policy</h1>
          </div>
          <p className="text-luxury-silver">Last updated: April 21, 2026</p>
          <p className="mt-4 text-luxury-silver leading-relaxed">
            AI Dynamics is committed to protecting your privacy. This policy explains how we collect, 
            use, and safeguard your information when you use our services.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                  <section.icon className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                  <div className="text-luxury-silver leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4 font-serif">Questions About Privacy?</h2>
          <p className="text-luxury-silver mb-6">
            Our Data Protection Officer is available to address any concerns.
          </p>
          <div className="space-y-2 text-luxury-champagne">
            <p>Email: jasmelacosta@gmail.com</p>
            <p>Phone: +1 (786) 643-2099</p>
            <p>Response time: Within 48 hours</p>
          </div>
        </motion.div>

        {/* Cookie Notice */}
        <div className="mt-12 p-6 rounded-xl border border-white/5 bg-white/[0.01]">
          <h3 className="text-lg font-semibold text-white mb-3">Cookie Policy</h3>
          <p className="text-luxury-silver text-sm leading-relaxed">
            We use essential cookies for site functionality and analytics cookies to improve our services. 
            We do not use tracking cookies for advertising purposes. You can manage cookie preferences 
            through your browser settings. Analytics data is processed in aggregate and does not identify 
            individual users.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
