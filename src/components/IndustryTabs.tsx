import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Stethoscope,
  Scale,
  Scan,
  Zap,
  Globe,
  Activity,
  ClipboardList,
  FileText,
  ShieldCheck,
  CalendarDays,
  PenTool,
  Clock,
  Gavel,
  Users,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
  Box,
  Eye,
  MessageSquare,
  Bot
} from 'lucide-react'

type TabKey = 'healthcare' | 'spatial' | 'crm' | 'agenticweb' | 'legal' | 'sports'

export default function IndustryTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('healthcare')

  const industries: Record<TabKey, {
    label: string
    shortLabel: string
    icon: any
    badge: string
    description: string
    pillarLink: string
    workflows: { icon: any; title: string; desc: string }[]
  }> = {
    healthcare: {
      label: 'Healthcare & Clinical Systems',
      shortLabel: 'Healthcare',
      icon: Stethoscope,
      badge: 'HIPAA Compliant',
      description: 'Streamline intake, AI medical scribing, billing claim validation, and prior auth tracking.',
      pillarLink: '/projects?pillar=digital-health',
      workflows: [
        { icon: ClipboardList, title: 'Intake & Insurance OCR', desc: 'Scan insurance cards, verify coverage, and intake patients without manual data entry.' },
        { icon: PenTool, title: 'AI Clinical Scribing', desc: 'Generate ambient SOAP notes from physician-patient conversations automatically.' },
        { icon: ShieldCheck, title: 'Prior Auth Tracking', desc: 'Submit and monitor prior authorization requests with automated status updates.' },
        { icon: FileText, title: 'RCM & Billing Automation', desc: 'Detect claim coding errors before submission to maximize clean-claim reimbursement.' },
        { icon: CalendarDays, title: '24/7 Phone Triage & Booking', desc: 'Bilingual AI voice receptionist answering after-hours calls and scheduling appointments.' },
      ],
    },
    spatial: {
      label: 'Computer Vision & Spatial AI',
      shortLabel: 'Vision & Spatial AI',
      icon: Scan,
      badge: 'Defect AI & LiDAR 3D',
      description: 'Automated room defect localization, property damage classification, and LiDAR 3D spatial mapping.',
      pillarLink: '/projects?pillar=spatial-vision',
      workflows: [
        { icon: Eye, title: 'Room Defect Localization', desc: 'Detect cracks, moisture stains, fixture damage, and paint defects with bounding boxes.' },
        { icon: Layers, title: 'Before / After Comparison', desc: 'Track condition deltas across tenant turnovers and renovation milestones automatically.' },
        { icon: Box, title: '3D Room & LiDAR Scanning', desc: 'Generate millimeter-accurate 2D/3D vector floor plans from phone camera or LiDAR scans.' },
        { icon: FileText, title: 'Automated Repair Work Orders', desc: 'Format defect photos into itemized contractor repair tickets with cost estimates.' },
        { icon: Sparkles, title: 'Digital Twin Facility Layer', desc: 'Embed IoT sensors and spatial dimension markers directly onto 3D digital twins.' },
      ],
    },
    crm: {
      label: 'CRM & Revenue Operations',
      shortLabel: 'CRM & RevOps',
      icon: Zap,
      badge: 'Sub-Minute Speed-to-Lead',
      description: 'Custom CRM data architecture, instant lead qualification, and automated multi-channel sequences.',
      pillarLink: '/projects?pillar=crm-revops',
      workflows: [
        { icon: Users, title: 'Speed-to-Lead AI Routing', desc: 'Engage web form and ad leads in under 45 seconds via automated 2-way SMS and voice.' },
        { icon: MessageSquare, title: 'Multi-Channel Sequences', desc: 'Coordinate follow-up across WhatsApp, SMS, email, and live calendar booking.' },
        { icon: BarChart3, title: 'Visual Pipeline Analytics', desc: 'Track deal stages, rep win rates, and lead velocity with custom executive dashboards.' },
        { icon: Bot, title: 'Lead Intent Scoring', desc: 'Enrich incoming contacts and qualify budget and timeline before reps jump on calls.' },
        { icon: ShieldCheck, title: 'Support Ticket Routing', desc: 'Auto-summarize customer inquiries and suggest next actions for your support team.' },
      ],
    },
    agenticweb: {
      label: 'AI-Native Websites & SEO',
      shortLabel: 'Web & AI SEO',
      icon: Globe,
      badge: 'AEO & Perplexity Dominance',
      description: 'Websites that learn from visitor behavior and dominate AI Search Overviews.',
      pillarLink: '/projects?pillar=agentic-web-seo',
      workflows: [
        { icon: Sparkles, title: 'Self-Optimizing CTAs', desc: 'Auto-test copy variations and adapt calls-to-action based on visitor intent signals.' },
        { icon: Globe, title: 'Answer Engine Optimization (AEO)', desc: 'Dominate Google AI Overviews, Perplexity, and LLM search citations.' },
        { icon: Layers, title: 'Knowledge Graph Schema', desc: 'Deploy structured JSON-LD entity graphs for instant local authority in Miami & beyond.' },
        { icon: Bot, title: 'Conversational Front Desk', desc: 'Turn static landing pages into interactive dialogue funnels with sub-second AI widgets.' },
        { icon: BarChart3, title: 'Live Telemetry & Experimentation', desc: 'Track real-time conversion rates and visitor drop-off points with zero guesswork.' },
      ],
    },
    legal: {
      label: 'Legal & Professional Services',
      shortLabel: 'Legal & Intake',
      icon: Scale,
      badge: 'Confidential & Secure',
      description: 'Cut contract review time, accelerate client intake, and automate retainer agreements.',
      pillarLink: '/projects?pillar=applied-ai',
      workflows: [
        { icon: Gavel, title: 'Contract Risk Screening', desc: 'Scan NDAs and commercial contracts for non-standard clauses in seconds.' },
        { icon: Users, title: 'Automated Case Intake', desc: 'Onboard clients with smart questionnaire workflows and conflict checks.' },
        { icon: FileText, title: 'Retainer & Document Drafting', desc: 'Auto-generate engagement letters and custom briefs from client interview data.' },
        { icon: Clock, title: 'Court Deadline Monitoring', desc: 'Sync calendar filings and receive automated compliance alerts before cutoff dates.' },
        { icon: BarChart3, title: 'Time Entry Categorization', desc: 'Capture billable events automatically from emails, calls, and documents.' },
      ],
    },
    sports: {
      label: 'Sports Science & Biomechanics',
      shortLabel: 'Sports & Kinematics',
      icon: Activity,
      badge: 'Pose & Gait Analytics',
      description: 'Computer-vision joint tracking, running gait analysis, and wearable load modeling.',
      pillarLink: '/projects?pillar=sports-science',
      workflows: [
        { icon: Activity, title: 'Real-Time Pose Estimation', desc: 'Track 33 kinematic joint landmarks from high-speed video feeds without sensors.' },
        { icon: Layers, title: 'Running Gait & Cadence Analysis', desc: 'Quantify ground contact time, pronation angles, and stride asymmetries.' },
        { icon: Box, title: 'Cycling Ergonomic Fit', desc: 'Calculate knee flexion and hip angles for aerodynamic and injury-free bike fits.' },
        { icon: BarChart3, title: 'Wearable Telemetry Fusion', desc: 'Aggregate HRV, sleep, and power meters into unified recovery prediction curves.' },
        { icon: Bot, title: 'Personalized Adaptive Coaching', desc: 'Auto-adjust training prescriptions based on real-time fatigue metrics.' },
      ],
    },
  }

  const active = industries[activeTab]

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark-50 to-dark">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-luxury-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Core Capability Pillars
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Engineered for </span>
            <span className="text-luxury-gold">High-Value Operations</span>
          </h2>
          <p className="text-lg sm:text-xl text-luxury-silver max-w-3xl mx-auto leading-relaxed">
            We don't build generic chatbots. We engineer end-to-end operational systems across Computer Vision, Digital Health, Custom CRM RevOps, and Autonomous Agents.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {(Object.keys(industries) as TabKey[]).map((key) => {
            const industry = industries[key]
            const isActive = activeTab === key
            const Icon = industry.icon
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-luxury-gold text-dark font-bold shadow-[0_0_20px_rgba(201,169,110,0.35)] scale-105'
                    : 'border border-white/10 bg-white/[0.02] text-luxury-champagne hover:border-luxury-gold/30 hover:bg-luxury-gold/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{industry.shortLabel}</span>
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
            {/* Tab Summary Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-8 max-w-5xl mx-auto">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20">
                    {active.badge}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-white">{active.label}</h3>
                </div>
                <p className="text-sm text-luxury-silver">{active.description}</p>
              </div>

              <Link
                to={active.pillarLink}
                className="btn-secondary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>View System Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
              </Link>
            </div>

            {/* Workflow Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {active.workflows.map((workflow, index) => {
                const WorkflowIcon = workflow.icon
                return (
                  <motion.div
                    key={workflow.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/30 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <WorkflowIcon className="w-6 h-6 text-luxury-gold" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-luxury-champagne transition-colors">
                      {workflow.title}
                    </h4>
                    <p className="text-xs text-luxury-silver leading-relaxed font-light">
                      {workflow.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/projects"
                className="btn-secondary text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-luxury-gold" />
                <span>Explore All 10+ Production Systems</span>
              </Link>
              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2"
              >
                <span>Book Free Architecture Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
