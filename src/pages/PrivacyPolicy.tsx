import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Share2, Trash2, Cookie, Mic, MessageSquare } from 'lucide-react'
import SEO from '../components/SEO'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <SEO
        title="Privacy Policy | AI Dynamic Pro"
        description="Learn how AI Dynamic Pro collects, uses, and safeguards your personal data, AI voice/chat transcripts, and business information."
        canonical="https://www.aidynamic.pro/privacy"
      />
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
            <h1 className="text-4xl font-bold font-serif">Privacy Policy &amp; AI Data Disclosure</h1>
          </div>
          <p className="text-luxury-silver">Last updated: October 26, 2026</p>
          <p className="mt-4 text-luxury-silver leading-relaxed">
            This Privacy Policy explains how AI Dynamic Pro ("AI Dynamic Pro," "we," "us," or "our") collects, processes, records, and protects your information when you visit <strong className="text-white">www.aidynamic.pro</strong>, interact with our AI Executive Assistant (<strong className="text-white">JAss</strong>), book consultations, or engage our consulting, custom app development, and staff training services.
          </p>
          <p className="mt-2 text-luxury-silver leading-relaxed">
            Personally Identifiable Information ("PII"), as defined under U.S. federal and Florida state privacy laws (including the Florida Information Protection Act, <strong className="text-white">FIPA</strong>), refers to information that can identify, contact, or locate an individual.
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
                <h2 className="text-xl font-semibold text-white mb-3">1. What Personal Information Do We Collect?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>When you book a consultation, download an executive guide, fill out a contact form, or interact with our AI assistant, we may collect:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-1.5">
                    <li><strong className="text-white">Contact &amp; Business Identifiers:</strong> Name, email address, phone number, company name, industry, estimated budget, and workflow challenges.</li>
                    <li><strong className="text-white">AI Voice &amp; Chat Interactions:</strong> Text prompts, voice audio streams, transcripts, and appointment requests submitted through our live AI Executive Assistant (<strong className="text-white">JAss</strong>).</li>
                    <li><strong className="text-white">Technical &amp; Attribution Metadata:</strong> IP address, browser type, device data, referral URLs, and campaign attribution parameters (such as UTM tags via Google Analytics 4).</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="p-8 rounded-2xl border border-emerald-500/25 bg-emerald-950/10 hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">2. AI Voice &amp; Chat Recording Consent (Florida All-Party Consent — Fla. Stat. § 934.03)</h2>
                <div className="text-luxury-silver leading-relaxed space-y-3">
                  <p>
                    <strong className="text-white">Express Notice of AI Processing &amp; Transcription:</strong> Our website features an interactive voice and text AI assistant named <strong className="text-white">JAss</strong>. By typing a message, clicking the microphone icon, initiating a live voice call on our website, or calling our business telephone lines, <strong className="text-white">you expressly consent to the real-time recording, transcription, storage, and automated processing of your communications</strong> by AI Dynamic Pro and our third-party artificial intelligence and infrastructure providers (including xAI / Grok, OpenAI, Google Cloud, Supabase, and Brevo).
                  </p>
                  <p>
                    This disclosure satisfies all-party (two-party) recording and interception consent requirements under the <strong className="text-white">Florida Security of Communications Act (Fla. Stat. § 934.03)</strong> and applicable federal wiretap and electronic communications statutes.
                  </p>
                  <p>
                    <strong className="text-white">Do Not Submit Sensitive or Regulated Data in Public Chat:</strong> Please do not submit Protected Health Information (PHI), Social Security numbers, payment card numbers, or confidential trade secrets into the public website chat or voice widget. Regulated data should only be exchanged after executing a formal Statement of Work (SOW) and, where applicable, a Business Associate Agreement (BAA).
                  </p>
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
                <MessageSquare className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">3. Telecommunications, SMS, Voice &amp; Email Consent (TCPA, FTSA &amp; CAN-SPAM)</h2>
                <div className="text-luxury-silver leading-relaxed space-y-3">
                  <p>
                    By providing your phone number or email address on any AI Dynamic Pro form, booking calendar, lead magnet, or chat session, you provide your <strong className="text-white">prior express written consent</strong> under the federal <strong className="text-white">Telephone Consumer Protection Act (TCPA)</strong> and the <strong className="text-white">Florida Telemarketing Act (FTSA, Fla. Stat. § 501.059)</strong> to receive appointment confirmations, consultation follow-ups, and B2B educational or promotional communications from AI Dynamic Pro via phone call, SMS/text message, WhatsApp, and email, including communications assisted by automated dialing technology or AI voice synthesis.
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5">
                    <li><strong className="text-white">No Condition of Purchase:</strong> Consent to receive marketing calls or texts is not required as a condition of purchasing any goods or services.</li>
                    <li><strong className="text-white">Instant Opt-Out:</strong> You may opt out of SMS/text messages at any time by replying <strong className="text-white">STOP</strong>, and you may opt out of email communications at any time by clicking the <strong className="text-white">Unsubscribe</strong> link in the footer of any email or replying <strong className="text-white">"Unsubscribe"</strong> to <code className="text-luxury-gold">jasmelacosta@gmail.com</code>. Standard message and data rates may apply.</li>
                    <li><strong className="text-white">No Sharing of Mobile Opt-In Data:</strong> Mobile phone numbers and SMS opt-in consent data will never be sold, rented, or shared with unaffiliated third parties for their own marketing purposes.</li>
                  </ul>
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
                <h2 className="text-xl font-semibold text-white mb-3">4. How Do We Use Your Information?</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We use the information we collect strictly for legitimate B2B operational purposes, including to:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Schedule and conduct your $99 AI Workflow Audit, custom architecture consultations, and corporate staff training workshops.</li>
                    <li>Deliver automated customer support and instant voice/chat responses via <strong className="text-white">JAss</strong>.</li>
                    <li>Send appointment reminders, downloadable playbooks, and relevant workflow automation case studies.</li>
                    <li>Improve site performance, security, and campaign attribution accuracy.</li>
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
                <Share2 className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Subprocessors &amp; Data Protection</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>We do not sell, rent, or trade your Personally Identifiable Information to data brokers. We share data only with trusted enterprise infrastructure and AI subprocessors strictly necessary to operate our platform—such as Vercel (hosting), Supabase (encrypted database), Brevo (transactional &amp; CRM email delivery), Google Workspace / Analytics, and xAI / OpenAI (AI inference)—under strict confidentiality and security obligations.</p>
                  <p className="mt-3">We may also disclose information when required by law, subpoena, or court order, or when necessary to protect our legal rights, property, or safety.</p>
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
                <h2 className="text-xl font-semibold text-white mb-3">6. Cookies, Google Analytics (GA4) &amp; Attribution</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>AI Dynamic Pro uses first-party cookies, <code className="text-luxury-gold">sessionStorage</code>, and Google Analytics 4 (<code className="text-luxury-gold">G-M1RHKRVS9M</code>) to understand website traffic, remember your language preferences, and measure the performance of our marketing campaigns.</p>
                  <p className="mt-3">You can disable cookies through your browser settings or opt out of Google Analytics tracking using the Google Analytics Opt-Out Browser Add-on.</p>
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
                <Trash2 className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">7. Your Privacy Rights &amp; Data Deletion Requests</h2>
                <div className="text-luxury-silver leading-relaxed">
                  <p>Regardless of your state or country of residence (including Florida, California CCPA/CPRA, or EEA/UK GDPR), you have the right to request access to, correction of, or permanent deletion of your personal data and chat transcripts at any time.</p>
                  <p className="mt-3">To exercise your rights or request data deletion, email <strong className="text-white">jasmelacosta@gmail.com</strong> with the subject line <strong className="text-white">"Data Deletion Request"</strong> and include the email address or phone number associated with your inquiry. We respond to all verified requests within 15 business days.</p>
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
          <h2 className="text-2xl font-semibold text-white mb-4 font-serif">Privacy &amp; Compliance Officer</h2>
          <div className="space-y-2 text-luxury-champagne">
            <p className="font-medium">AI Dynamic Pro</p>
            <p>Brickell Financial District • Miami, Florida 33131, USA</p>
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
