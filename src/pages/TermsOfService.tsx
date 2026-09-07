import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'

const TermsOfService = () => {
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
            <FileText className="w-8 h-8 text-luxury-gold" />
            <h1 className="text-4xl font-bold font-serif">Terms of Service</h1>
          </div>
          <p className="text-luxury-silver">Last updated: April 21, 2026</p>
        </motion.div>

        <div className="space-y-12 text-luxury-silver leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using AI Dynamics services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services. These terms 
              apply to all visitors, users, and others who access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Services Description</h2>
            <p className="mb-4">
              AI Dynamics provides AI-powered automation and software development services for businesses, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom AI chatbot development and integration</li>
              <li>Business process automation and workflow optimization</li>
              <li>Healthcare compliance automation (HIPAA-aware systems)</li>
              <li>AI-powered data analysis and reporting</li>
              <li>Software development and deployment services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Service Level Agreement</h2>
            <p>
              We commit to industry-standard uptime for hosted services. Specific SLA terms, including 
              uptime guarantees, response times, and maintenance windows, will be defined in your 
              individual service agreement. For critical healthcare or legal applications, enhanced 
              SLAs with 99.9% uptime commitments are available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Data Processing & Privacy</h2>
            <p>
              We process data in accordance with our Privacy Policy and applicable data protection laws. 
              For healthcare clients, we maintain HIPAA compliance. For all clients, we implement 
              AES-256 encryption, access controls, and regular security audits. You retain ownership 
              of your data; we claim no rights over your business information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Intellectual Property</h2>
            <p>
              Custom software developed specifically for your business becomes your property upon 
              full payment, unless otherwise specified in your service agreement. We retain rights 
              to our proprietary frameworks, AI models, and reusable components. Open-source 
              integrations remain subject to their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              AI Dynamics' liability is limited to the amount paid for services in the 12 months 
              preceding the claim. We are not liable for indirect, incidental, or consequential 
              damages. For healthcare applications, this limitation does not apply to HIPAA 
              violations or data breaches caused by our negligence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Termination</h2>
            <p>
              Either party may terminate services with 30 days written notice. Upon termination, 
              we will provide your data in a standard format within 14 days. For immediate 
              termination due to breach of terms, notice may be shortened to 7 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Florida, USA. Any disputes 
              will be resolved in Miami-Dade County courts. For international clients, we agree 
              to alternative dispute resolution through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. We will notify you of any changes by 
              posting the new Terms on this page and updating the "Last updated" date. Continued 
              use of our services after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-6 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5">
              <p className="text-white font-medium">AI Dynamics</p>
              <p>Email: jasmelacosta@gmail.com</p>
              <p>Phone: +1 (786) 643-2099</p>
              <p>Location: Miami, FL</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
