import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Database, Lock, Share2, Trash2, Cookie } from 'lucide-react'

const PrivacyPolicy = () => {
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
          <p className="text-luxury-silver">Last updated: June 18, 2026</p>
          <p className="mt-4 text-luxury-silver leading-relaxed">
            This Privacy Policy has been created to help you understand how AI Dynamic Pro ("AI Dynamic Pro," "we," "us," or "our") collects, uses, and protects your personal information when you visit our website or use our services.
          </p>
          <p className="mt-2 text-luxury-silver leading-relaxed">
            Personally Identifiable Information ("PII"), as defined under U.S. privacy law, refers to information that can identify, contact, or locate an individual. Please read this policy carefully to understand how we handle your information in accordance with our website and services.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">What Personal Information Do We Collect?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>When you register on our site, subscribe to a service, or interact with our Platform, you may be asked to provide personal details such as your name, email address, phone number, or company information.</p>
                  <p className="mt-3">We collect this information to verify your account, enable communication, and improve your experience on aidynamic.pro.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">When Do We Collect Information?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We collect information from you when you register on our site, sign up for a service, fill out a form, or interact with features on our website.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">How Do We Use Your Information?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We may use the information we collect to:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Personalize your experience and improve our platform.</li>
                    <li>Facilitate communication between users and our team.</li>
                    <li>Send service updates, account notices, or marketing communications.</li>
                    <li>Process payments and manage subscriptions.</li>
                    <li>Improve site performance and security.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Data Deletion Requests</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>You may request deletion of your data at any time by emailing jasmelacosta@gmail.com with the subject line "Data Deletion Request." Please include your registered name, email address, or account details so that we can locate and delete your data securely.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Cookie className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Do We Use Cookies?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>Yes. AI Dynamic Pro uses cookies to improve your browsing experience and to help us understand user activity on our website. Cookies allow us to remember your preferences, measure site performance, and enhance functionality.</p>
                  <p className="mt-3">You can choose to have your browser warn you each time a cookie is being sent or disable cookies entirely through your browser settings. If you turn off cookies, some site features may not function as intended.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Share2 className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Third-Party Disclosure</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties without notice. This does not include trusted website hosting partners and service providers who assist in operating our platform, conducting business, or serving our users—so long as those parties agree to keep this information confidential.</p>
                  <p className="mt-3">We may also release information when required by law or when necessary to protect our rights, property, or safety, or that of others.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Third-Party Links</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>Occasionally, we may include links to third-party websites or services. These external sites have independent privacy policies, and AI Dynamic Pro is not responsible for their content or activities. However, we welcome any feedback regarding these linked sites to help maintain the integrity of our platform.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Analytics and Advertising</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We use analytics tools such as Google Analytics to collect non-personal data about website usage. These tools may use cookies and similar technologies to understand how users interact with our site and improve our advertising and content delivery.</p>
                  <p className="mt-3">You can opt out of Google Analytics tracking by using the Google Analytics Opt-Out Browser Add-on or adjusting your settings on the Google Ad Settings page.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Opting Out</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>You can unsubscribe from AI Dynamic Pro marketing emails or messages at any time by following the "unsubscribe" link provided in each communication or contacting jasmelacosta@gmail.com directly. Even after opting out, you may still receive important account or operational messages.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4 font-serif">Contact Information</h2>
          <div className="space-y-2 text-luxury-champagne">
            <p className="font-medium">AI Dynamic Pro</p>
            <p>Miami, Florida, USA</p>
            <p>Email: jasmelacosta@gmail.com</p>
            <p>Phone: +1 (786) 643-2099</p>
            <p>Website: www.aidynamic.pro</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
