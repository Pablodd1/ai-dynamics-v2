import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How much does AI automation cost?',
      answer: 'We start with our $99 AI Workflow & Feasibility Audit ($0 risk guarantee: if we don’t uncover at least 15+ hours/month in savings, you pay $0, and 100% is credited toward your build). Turnkey single-workflow automations start at $1,000, and full enterprise AI transformations & corporate staff training range from $5,000 to $15,000+.',
    },
    {
      question: 'How long does it take to implement?',
      answer: 'Most single-workflow automations are live within 2-3 weeks. Full AI transformations typically take 30 days from discovery to deployment. We work fast because we use proven frameworks — not templates, but battle-tested approaches we have refined across 50+ deployments.',
    },
    {
      question: 'Do I need technical knowledge to use the automation?',
      answer: 'Not at all. We design every solution so your team can use it without writing a single line of code. If you can use email and basic software, you can use our automations. We also include team training with every deployment.',
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
      answer: 'That is exactly how most clients start. Our Single High-Impact Workflow package ($1,000 turnkey) is designed for businesses that want to deploy one critical automation or 24/7 bilingual AI receptionist before scaling across departments.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We specialize in healthcare, legal, real estate, retail, construction, and professional services. Our team has deep experience in medical billing, patient intake, contract review, lead management, and appointment scheduling. If your industry has repetitive tasks, we can automate them.',
    },
    {
      question: 'What happens after the automation is built?',
      answer: 'Every project includes 30 days of post-launch support. For ongoing optimization, our Full AI Transformation package includes monthly performance reviews, continuous tuning, and quarterly strategy sessions. We do not build and disappear — we are your long-term automation partner.',
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
