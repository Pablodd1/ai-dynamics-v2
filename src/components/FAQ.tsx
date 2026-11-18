import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does your "We Don\'t Leave Until You Are Gold" model work?',
      answer: 'We come straight to your operation (on-site in South Florida or embedded live), dissect every workflow bottleneck, understand how you serve your target population, build your custom apps & AI agents, and train you and your staff hands-on. We do not sign off until your entire team confidently runs the system and turns it into Gold.',
    },
    {
      question: 'How much does it cost to start, and what are the options?',
      answer: 'Option 1 ($99 Workflow Audit + Free 48h Prototype): zero-risk guarantee to uncover $2,500+/mo in savings or pay $0, credited 100% toward your build. Option 2 ($497 Staff AI Bootcamp): we train up to 15 staff shoulder-to-shoulder until everyone knows it. Option 3 ($997 Turnkey Custom App & 24/7 AI Agent or $297/mo). Option 4 ($4,900–$15,000 Full Enterprise AI Takeover).',
    },
    {
      question: 'How fast do you analyze, build, and launch custom apps?',
      answer: 'You get a working live custom prototype within 48 hours of your audit. Single turnkey apps and 24/7 bilingual AI voice/WhatsApp deployments launch in production in 7–14 days, and multi-department enterprise builds roll out within 30 days.',
    },
    {
      question: 'Do I need technical knowledge, or will my staff struggle?',
      answer: 'Zero technical background is required. We design intuitive apps around your exact team habits, run bilingual English/Spanish training workshops with your staff, and stay right beside you until every employee uses it effortlessly.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We are HIPAA compliant, SOC 2 Type II aligned, and use AES-256 encryption for all data. We never store patient or client data on our servers — everything integrates directly with your existing secure systems. We can sign BAAs for healthcare clients.',
    },
    {
      question: 'Do you offer Spanish-language solutions?',
      answer: 'Yes! All our AI systems are bilingual (English/Spanish) by default at no extra cost. This is built specifically for Miami businesses serving diverse communities. Your chatbot, documents, and automations can switch languages seamlessly.',
    },
    {
      question: 'What if I only want one workflow automated?',
      answer: 'That is how many clients start. Option 3 ($997 Turnkey Custom App & 24/7 AI Agent, or $297/mo managed) deploys one mission-critical automation or bilingual voice/WhatsApp receptionist inside your company—and includes full hands-on staff training.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We embed inside healthcare, legal, real estate, construction, contractors, retail, and B2B service firms—analyzing your workflow, serving your target population better, and cutting manual payroll waste.',
    },
    {
      question: 'What happens after the automation or app is built?',
      answer: 'We do not drop software and disappear. We stay side-by-side training you and your staff until everyone knows how to use and operate every system cold, plus 30 days of included engineering support and ongoing optimization until you are Gold.',
    },
    {
      question: 'Can you integrate with my existing tools?',
      answer: 'Yes. We integrate with 200+ tools including Salesforce, HubSpot, Zapier, Make, Google Workspace, Microsoft 365, Slack, QuickBooks, Stripe, Calendly, and most EMR/EHR systems. If it has an API, we can connect it. If it does not, we will find a workaround.',
    },
    {
      question: 'How do I get started?',
      answer: 'Book a free 30-minute discovery call or claim your $99 Workflow Audit directly at https://www.aidynamic.pro/booking (or call/text us at +1 786-643-2099). Jasmel will analyze your operations, identify your highest-ROI automation opportunities, and give you a clear roadmap with pricing.',
    },
  ]

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.8) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Common Questions
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Frequently </span>
            <span className="text-luxury-gold">Asked</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-2xl mx-auto">
            Everything you need to know before booking your free discovery call.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-luxury-gold/60 flex-shrink-0" />
                  <span className="text-white font-medium">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-luxury-gold transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 pl-[52px]">
                      <p className="text-luxury-silver leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5"
        >
          <p className="text-luxury-champagne mb-4 text-lg">
            Still have questions? Ask <strong>JAss</strong>, our 24/7 AI Executive Assistant, right in the bottom-right corner.
          </p>
          <p className="text-luxury-silver text-sm mb-4">
            Or book a 30-minute call or $99 Workflow Audit with Jasmel to discuss your specific needs.
          </p>
          <a
            href="/booking"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book Free Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
