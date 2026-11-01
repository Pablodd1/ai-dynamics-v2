import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
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
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

type TabKey = 'healthcare' | 'spatial' | 'crm' | 'agenticweb' | 'legal' | 'sports'

export default function IndustryTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('healthcare')
  const scrollRef = useRef<HTMLDivElement>(null)

  const industries: Record<TabKey, {
    label: string
    shortLabel: string
    icon: any
    badge: string
    heroImage: string
    payrollSaved: string
    staffImpact: string
    description: string
    pillarLink: string
    workflows: { icon: any; title: string; desc: string; image: string; tag: string }[]
  }> = {
    healthcare: {
      label: 'Healthcare & Clinical Operations Automation',
      shortLabel: 'Healthcare & Clinics',
      icon: Stethoscope,
      badge: 'HIPAA Compliant · -45% Admin Overhead',
      heroImage: '/images/projects/healthcare-clinical.jpg',
      payrollSaved: 'Save 25–40 hrs/week in front-desk & charting labor',
      staffImpact: '1 AI-trained coordinator handles 4x patient volume',
      description: 'Automate patient intake, ambient SOAP charting, 24/7 bilingual phone triage, and medical billing claim scrubbing.',
      pillarLink: '/projects?industry=Healthcare+%26+Digital+Health',
      workflows: [
        { icon: CalendarDays, title: '24/7 Bilingual AI Phone Triage (JAss)', desc: 'Answers 100% of patient calls on Ring 1 in English & Spanish, verifies intent, and books directly into your EHR calendar.', image: '/images/projects/voice-ai-receptionist.jpg', tag: 'RING-1 VOICE AI' },
        { icon: PenTool, title: 'Ambient AI Medical Scribe', desc: 'Listens to physician-patient encounters and generates structured SOAP notes + ICD-10/CPT codes automatically.', image: '/images/projects/healthcare-clinical.jpg', tag: '-70% CHARTING TIME' },
        { icon: FileText, title: 'RCM & Medical Billing Automation', desc: 'Scrubs 837 claims, validates payer rules before submission, and automates denial categorization.', image: '/images/projects/workflow-automation.jpg', tag: 'CLEAN CLAIM ENGINE' },
        { icon: ClipboardList, title: 'Insurance OCR & Automated Intake', desc: 'Extracts insurance card details, verifies coverage eligibility, and completes intake with zero manual typing.', image: '/images/projects/digital-assistants.jpg', tag: 'ZERO DATA ENTRY' },
        { icon: ShieldCheck, title: 'Remote Patient & Therapeutic Telemetry', desc: 'Ingests cellular vitals and camera-guided rehab adherence with automated CPT billing compliance.', image: '/images/projects/running-kinematics.jpg', tag: 'CPT 99453 / 98975' },
      ],
    },
    spatial: {
      label: 'Computer Vision, Luxury ID & Spatial AI',
      shortLabel: 'Computer Vision & Luxury ID',
      icon: Scan,
      badge: 'Macro Watch Auth · Defect AI · LiDAR 3D',
      heroImage: '/images/projects/spatial-3d-mapping.jpg',
      payrollSaved: 'Replace slow manual inspections with 3-second AI vision',
      staffImpact: 'Automated reference ID, defect grading & 3D floorplans',
      description: 'Fine-grained computer vision for luxury watch & item authentication, property defect localization, and 3D LiDAR spatial mapping.',
      pillarLink: '/projects?industry=Computer+Vision+%26+Spatial+AI',
      workflows: [
        { icon: Sparkles, title: 'Watch & Luxury Item Computer Vision ID', desc: 'Identifies exact watch reference, dial/bezel configuration, macro serial OCR, surface scratches, and authenticity anomalies from photos.', image: '/images/projects/luxury-neural-dark.jpg', tag: 'YOLOv8 + DINOv2' },
        { icon: Eye, title: 'Room Defect & Property Inspection AI', desc: 'Detects wall cracks, moisture intrusion, and fixture damage with bounding boxes and auto-generates contractor tickets.', image: '/images/projects/room-defect-vision.jpg', tag: '12 DEFECT CLASSES' },
        { icon: Box, title: '3D Room & LiDAR Spatial Scanning', desc: 'Generates millimeter-accurate 2D SVG and 3D OBJ floorplans from smartphone camera or LiDAR scans in under 90 seconds.', image: '/images/projects/spatial-3d-mapping.jpg', tag: 'LIDAR DIGITAL TWIN' },
        { icon: Layers, title: 'Before / After Condition Delta Grading', desc: 'Automatically compares pre-lease or pre-shipment condition photos against post-inspection imagery to prevent disputes.', image: '/images/projects/executive-solutions.jpg', tag: 'AUTOMATED GRADING' },
        { icon: FileText, title: 'Instant Appraisal & Inspection Certificates', desc: 'Compiles annotated visual heatmaps and itemized condition scores into executive PDF reports automatically.', image: '/images/projects/consulting-boardroom.jpg', tag: 'INSTANT PDF REPORT' },
      ],
    },
    crm: {
      label: 'CRM, RevOps & Full Department Automation',
      shortLabel: 'CRM & Cost Automation',
      icon: Zap,
      badge: '<45s Speed-to-Lead · Zero Manual Follow-Up',
      heroImage: '/images/projects/crm-revops-pipeline.jpg',
      payrollSaved: 'Cut 60% of repetitive SDR & admin follow-up overhead',
      staffImpact: 'Automated 24/7 qualification across Voice, SMS & Email',
      description: 'Custom CRM data architecture, sub-minute lead qualification, automated multi-channel sequences, and corporate staff AI training.',
      pillarLink: '/projects?industry=CRM+%26+Business+Automation',
      workflows: [
        { icon: Users, title: 'Sub-Minute Speed-to-Lead AI Routing', desc: 'Engages every web form, ad, and missed-call lead in under 45 seconds via bilingual SMS, email, and voice.', image: '/images/projects/crm-revops-pipeline.jpg', tag: '<45s RESPONSE' },
        { icon: MessageSquare, title: 'Autonomous Multi-Channel Sequences', desc: 'Coordinates persistent follow-up across WhatsApp, SMS, Brevo email, and live calendar booking without human intervention.', image: '/images/projects/workflow-automation.jpg', tag: '+44% CONVERSION' },
        { icon: Bot, title: 'Corporate AI Staff Training & SOPs', desc: 'Hands-on training workshops equipping your existing team to operate AI pipelines at 5x daily productivity.', image: '/images/projects/corporate-training.jpg', tag: '5X STAFF OUTPUT' },
        { icon: BarChart3, title: 'Executive P&L & Pipeline Analytics', desc: 'Real-time visibility into lead velocity, cost-per-acquisition, and automated staff hours saved.', image: '/images/projects/executive-boardroom.jpg', tag: 'LIVE ROI TELEMETRY' },
        { icon: ShieldCheck, title: 'Automated Ticket & Document Triage', desc: 'Classifies incoming client requests, extracts key data fields, and updates your ERP/CRM with zero copy-pasting.', image: '/images/projects/digital-assistants.jpg', tag: 'ZERO COPY-PASTE' },
      ],
    },
    agenticweb: {
      label: 'Agentic Websites, AI SEO & Rapid Launch',
      shortLabel: 'Websites & AI SEO',
      icon: Globe,
      badge: 'Self-Learning Web · Google & LLM AEO',
      heroImage: '/images/projects/agentic-web-growth.jpg',
      payrollSaved: 'Turn static websites into 24/7 autonomous sales reps',
      staffImpact: 'Dominate Google AI Overviews, ChatGPT & Perplexity',
      description: 'High-converting agentic websites with embedded bilingual voice/chat receptionists and Schema.org knowledge graphs.',
      pillarLink: '/projects?industry=Intelligent+Websites+%26+Growth',
      workflows: [
        { icon: Bot, title: 'Agentic & Self-Learning Websites', desc: 'Dynamically adapts headlines, proof points, and conversion flows based on real-time visitor intent.', image: '/images/projects/agentic-web-growth.jpg', tag: 'ADAPTIVE UX' },
        { icon: Globe, title: 'Answer Engine Optimization (AEO & SEO)', desc: 'Structures your company data into Schema.org JSON-LD graphs so ChatGPT, Perplexity, and Google cite you first.', image: '/images/projects/ai-market-research.jpg', tag: 'LLM SEARCH RANKING' },
        { icon: Sparkles, title: 'Rapid Digital Launch (5–10 Days)', desc: 'Production-grade custom React/TypeScript web platforms deployed in days with built-in AI voice/chat and booking.', image: '/images/projects/executive-solutions.jpg', tag: '5-10 DAY LAUNCH' },
        { icon: MessageSquare, title: 'Embedded 24/7 Bilingual AI Concierge', desc: 'Every page includes a live voice and chat assistant that answers questions and books appointments on the spot.', image: '/images/projects/voice-ai-receptionist.jpg', tag: 'LIVE VOICE WIDGET' },
        { icon: BarChart3, title: 'Full Attribution & Conversion Telemetry', desc: 'End-to-end Google Analytics 4 + CRM tracking across every call, chat, email, and calendar booking.', image: '/images/projects/crm-revops-pipeline.jpg', tag: 'GA4 + CRM SYNC' },
      ],
    },
    legal: {
      label: 'Legal, Real Estate & Executive Advisory AI',
      shortLabel: 'Legal & Real Estate',
      icon: Scale,
      badge: 'Confidential RAG · Automated Case & Deal Intake',
      heroImage: '/images/projects/consulting-boardroom.jpg',
      payrollSaved: 'Eliminate 15+ hrs/week of manual paralegal & broker admin',
      staffImpact: '24/7 bilingual case qualification & contract screening',
      description: 'Accelerate legal case intake, screen contracts, match off-market real estate mandates, and synthesize market intelligence.',
      pillarLink: '/projects?industry=Real+Estate+%26+Property+Technology',
      workflows: [
        { icon: Users, title: '24/7 Bilingual Legal & Deal Intake', desc: 'Qualifies personal injury, immigration, or commercial clients on Ring 1 and books retainer consultations.', image: '/images/projects/voice-ai-receptionist.jpg', tag: '24/7 INTAKE AI' },
        { icon: Gavel, title: 'Contract Risk & Document Screening', desc: 'Scans agreements, leases, and discovery files for non-standard clauses and missing disclosures in seconds.', image: '/images/projects/consulting-boardroom.jpg', tag: 'PRIVATE RAG AI' },
        { icon: Layers, title: 'Estate Match: Semantic Deal Matchmaker', desc: 'Matches natural-language investor mandates against MLS and off-market properties automatically.', image: '/images/projects/executive-boardroom.jpg', tag: 'VECTOR DEAL MATCH' },
        { icon: Clock, title: 'Escrow & Court Deadline Orchestration', desc: 'Tracks critical transaction milestones and dispatches automated compliance alerts before cutoff dates.', image: '/images/projects/workflow-automation.jpg', tag: 'ZERO MISSED DATES' },
        { icon: BarChart3, title: 'Monte Carlo Strategy & Market Research', desc: 'Synthesizes verified competitive intelligence and stress-tests capital allocation across thousands of runs.', image: '/miami-ai-neural-cube.jpg', tag: 'ZERO-G SIMULATION' },
      ],
    },
    sports: {
      label: 'Sports Science & Human Performance AI',
      shortLabel: 'Sports & Biomechanics',
      icon: Activity,
      badge: '33-Joint Pose Vision · Biometric Telemetry',
      heroImage: '/images/projects/sports-biomechanics.jpg',
      payrollSaved: 'Automated kinematic lab analysis from smartphone video',
      staffImpact: 'Scale personalized coaching across thousands of athletes',
      description: 'Markerless computer-vision joint tracking, running gait kinematics, aerodynamic bike fit, and daily biometric adaptation.',
      pillarLink: '/projects?industry=Sports+%26+Human+Performance',
      workflows: [
        { icon: Activity, title: 'RunForm: Markerless Gait Kinematics', desc: 'Extracts 33 joint landmarks, ground-contact time, cadence, and stride symmetry directly from smartphone video.', image: '/images/projects/running-kinematics.jpg', tag: '33-JOINT POSE CV' },
        { icon: Box, title: 'Cycling Bike Fit & TT Aerodynamics', desc: 'Calculates knee flexion, hip angles, and frontal aero drag profile for optimal power and injury prevention.', image: '/images/projects/sports-biomechanics.jpg', tag: 'AERO BIOMECHANICS' },
        { icon: Bot, title: 'JMM — Daily Biometric Coaching Engine', desc: 'Adapts daily training prescriptions dynamically using HRV, sleep recovery, and wearable telemetry streams.', image: '/images/projects/executive-solutions.jpg', tag: 'DAILY HRV AI' },
      ],
    },
  }

  const active = industries[activeTab]

  const scrollWorkflows = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
  }

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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-5">
            AI Consultation · Custom Solutions · Staff Training by Sector
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-serif">
            <span className="text-white">Cut Costs & Automate </span>
            <span className="text-luxury-gold">Every Department</span>
          </h2>
          <p className="text-lg sm:text-xl text-luxury-silver max-w-3xl mx-auto leading-relaxed">
            Select your business sector below and scroll horizontally to see how we audit workflows, replace manual overhead with custom AI solutions, and train your staff to produce 5x output.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {(Object.keys(industries) as TabKey[]).map((key) => {
            const industry = industries[key]
            const isActive = activeTab === key
            const Icon = industry.icon
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key)
                  scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
                }}
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
            {/* Photorealistic Executive Sector Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-dark-50 mb-8 shadow-2xl">
              <div className="grid lg:grid-cols-12 items-stretch">
                {/* Left 5 Cols: High-Res Actual Image */}
                <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] overflow-hidden">
                  <img
                    src={active.heroImage}
                    alt={active.label}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-50 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-luxury-gold/40 text-[11px] font-mono text-luxury-gold font-bold uppercase">
                    {active.badge}
                  </div>
                </div>

                {/* Right 7 Cols: Executive Cost-Reduction & Scroll Controls */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-2">
                      {active.label}
                    </h3>
                    <p className="text-sm sm:text-base text-luxury-silver leading-relaxed mb-5">
                      {active.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-0.5">
                          Cost & Payroll Impact
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {active.payrollSaved}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30">
                        <div className="text-[10px] font-mono uppercase text-luxury-gold font-bold mb-0.5">
                          Workforce Efficiency
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {active.staffImpact}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <Link
                        to="/booking"
                        className="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5"
                      >
                        <span>Book $99 Sector Audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={active.pillarLink}
                        className="btn-secondary text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5"
                      >
                        <span>View Sector Systems</span>
                        <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
                      </Link>
                    </div>

                    {/* Side-Scroll Arrows for Workflow Cards */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-luxury-silver/70 hidden sm:inline">
                        Scroll Solutions →
                      </span>
                      <button
                        type="button"
                        onClick={() => scrollWorkflows('left')}
                        aria-label="Scroll workflows left"
                        className="p-2.5 rounded-xl border border-white/15 bg-black/50 hover:bg-luxury-gold hover:text-dark text-white transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollWorkflows('right')}
                        aria-label="Scroll workflows right"
                        className="p-2.5 rounded-xl border border-white/15 bg-black/50 hover:bg-luxury-gold hover:text-dark text-white transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Side-Scrolling Workflow Cards with Actual High-Res Images */}
            <div
              ref={scrollRef}
              className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-1 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#c5a059 #121218' }}
            >
              {active.workflows.map((workflow, index) => {
                const WorkflowIcon = workflow.icon
                return (
                  <motion.div
                    key={workflow.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="w-[300px] sm:w-[340px] shrink-0 snap-start rounded-2xl border border-white/10 bg-dark-50/80 hover:border-luxury-gold/40 overflow-hidden transition-all group flex flex-col"
                  >
                    {/* High-Res Actual Visual Header */}
                    <div className="relative h-40 w-full overflow-hidden bg-black">
                      <img
                        src={workflow.image}
                        alt={workflow.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-transparent to-black/30" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-luxury-gold">
                        {workflow.tag}
                      </div>
                      <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg border border-luxury-gold/30 bg-black/80 backdrop-blur-md flex items-center justify-center">
                        <WorkflowIcon className="w-4 h-4 text-luxury-gold" />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white mb-2 group-hover:text-luxury-champagne transition-colors">
                          {workflow.title}
                        </h4>
                        <p className="text-xs text-luxury-silver leading-relaxed">
                          {workflow.desc}
                        </p>
                      </div>

                      <Link
                        to="/booking"
                        className="mt-4 pt-3 border-t border-white/10 inline-flex items-center justify-between text-xs font-mono text-luxury-gold hover:text-white transition-colors"
                      >
                        <span>Automate This Workflow</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
