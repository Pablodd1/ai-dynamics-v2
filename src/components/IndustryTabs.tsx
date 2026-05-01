import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Stethoscope,
  Scale,
  Building2,
  ClipboardList,
  FileText,
  ShieldCheck,
  CalendarDays,
  Clock,
  Gavel,
  Users,
  PenTool,
  MessageCircle,
  Home,
  BarChart3,
  FileCheck,
  ArrowRight,
} from 'lucide-react'

const IndustryTabs = () => {
  const [activeTab, setActiveTab] = useState<'healthcare' | 'legal' | 'realestate'>('healthcare')

  const industries = {
    healthcare: {
      label: 'Healthcare',
      icon: Stethoscope,
      description: 'Automate the paperwork so your staff can focus on patients.',
      workflows: [
        { icon: ClipboardList, title: 'Patient Intake', desc: 'Auto-process forms, verify insurance, and schedule appointments without manual data entry.' },
        { icon: FileText, title: 'Billing Automation', desc: 'Generate claims, track payments, and follow up on denials automatically.' },
        { icon: ShieldCheck, title: 'Prior Authorization', desc: 'Submit and track prior auth requests with automated status updates.' },
        { icon: PenTool, title: 'Documentation', desc: 'AI-assisted clinical notes that auto-populate from patient encounters.' },
        { icon: CalendarDays, title: 'Scheduling', desc: 'Smart scheduling that reduces no-shows and fills gaps automatically.' },
      ],
    },
    legal: {
      label: 'Legal',
      icon: Scale,
      description: 'Cut document review time from hours to minutes.',
      workflows: [
        { icon: Gavel, title: 'Contract Review', desc: 'AI scans contracts for risks, key terms, and missing clauses in seconds.' },
        { icon: Users, title: 'Case Intake', desc: 'Automated client onboarding with smart forms and conflict checking.' },
        { icon: FileText, title: 'Document Drafting', desc: 'Generate first drafts of standard documents from templates and client data.' },
        { icon: Clock, title: 'Deadline Tracking', desc: 'Auto-monitor filing deadlines and send alerts before cutoffs.' },
        { icon: BarChart3, title: 'Billable Hours', desc: 'Capture and categorize time entries automatically from calendar and communications.' },
      ],
    },
    realestate: {
      label: 'Real Estate',
      icon: Building2,
      description: 'Close more deals by automating the busywork.',
      workflows: [
        { icon: MessageCircle, title: 'Lead Follow-Up', desc: 'Instant response to inquiries with automated nurturing sequences.' },
        { icon: Home, title: 'Listing Descriptions', desc: 'AI-generated property descriptions optimized for each platform.' },
        { icon: Users, title: 'CRM Automation', desc: 'Auto-tag, score, and route leads based on behavior and demographics.' },
        { icon: FileCheck, title: 'Transaction Coordination', desc: 'Track document collection, deadlines, and signatures automatically.' },
        { icon: CalendarDays, title: 'Showing Scheduling', desc: 'Self-service booking with automated reminders and feedback collection.' },
      ],
    },
  }

  const active = industries[activeTab]

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark-50 to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            By Industry
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Built for </span>
            <span className="text-luxury-gold">Your Industry</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-3xl mx-auto">
            Every industry has repetitive work. Here are the workflows we automate most often.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(industries) as Array<keyof typeof industries>).map((key) => {
            const industry = industries[key]
            const isActive = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-luxury-gold text-dark'
                    : 'border border-white/10 bg-white/[0.02] text-luxury-champagne hover:border-luxury-gold/30 hover:bg-luxury-gold/5'
                }`}
              >
                <industry.icon className="w-5 h-5" />
                {industry.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <p className="text-lg text-luxury-silver">{active.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 flex items-center justify-center mb-4">
                    <workflow.icon className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{workflow.title}</h3>
                  <p className="text-sm text-luxury-silver leading-relaxed">{workflow.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-luxury-silver mb-4">
                Don't see your workflow? We build custom automations for any process.
              </p>
              <a
                href="https://aidynamic.pro/booking"
                className="btn-primary inline-flex items-center gap-2"
              >
                Book a free consultation
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default IndustryTabs
