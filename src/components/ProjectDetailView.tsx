import React, { useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Handshake,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Compass,
  Users,
  AlertTriangle,
  Lightbulb,
  Workflow
} from 'lucide-react'
import type { ProjectItem } from '../data/projects'
import { STATUS_LEGEND, PROJECTS } from '../data/projects'
import { ProjectGraphic } from './ProjectGraphic'
import { AnalyticsEvents } from '../lib/analytics'

interface ProjectDetailViewProps {
  project: ProjectItem
  onBack: () => void
  onOpenPartnerModal: (project: ProjectItem) => void
  onSelectRelatedProject: (project: ProjectItem) => void
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onOpenPartnerModal,
  onSelectRelatedProject,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    AnalyticsEvents.projectViewed(project.id, project.name)
  }, [project.id, project.name])

  const statusMeta = STATUS_LEGEND[project.status] || {
    description: project.status,
    color: 'text-luxury-silver',
    bg: 'bg-white/5',
    border: 'border-white/10',
  }

  // Find 2-3 related projects from relatedProjectSlugs
  const relatedProjects = PROJECTS.filter((p) =>
    project.relatedProjectSlugs.includes(p.slug)
  ).slice(0, 3)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-luxury-silver hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-luxury-gold" />
          <span>Return to All Systems</span>
        </button>

        <span className="text-xs font-mono text-luxury-silver/50">
          Ref: {project.slug}
        </span>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="rounded-2xl border border-white/10 bg-dark-50/80 p-6 sm:p-10 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-luxury-silver/80 bg-white/5 px-3 py-1 rounded border border-white/10">
              {project.industry}
            </span>
            <span className="text-xs font-mono text-luxury-silver/50 hidden sm:inline">
              · {project.category}
            </span>
          </div>

          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded border ${statusMeta.border} ${statusMeta.bg} ${statusMeta.color}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3 leading-tight">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg font-mono text-luxury-champagne mb-4 leading-relaxed">
          {project.tagline}
        </p>

        <p className="text-sm sm:text-base text-luxury-silver/80 leading-relaxed max-w-3xl mb-6">
          {project.summary}
        </p>

        {/* Hero Visual Blueprint */}
        <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
          <ProjectGraphic type={project.graphicType} className="w-full h-44 sm:h-52" />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.links.website && (
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.links.liveDemo && (
            <a
              href={project.links.liveDemo}
              target={project.links.liveDemo.startsWith('http') ? '_blank' : undefined}
              rel={project.links.liveDemo.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="btn-primary text-xs flex items-center gap-2"
            >
              <span>Launch Live System Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.sponsorOpportunity?.available && (
            <button
              type="button"
              onClick={() => onOpenPartnerModal(project)}
              className="btn-secondary text-xs flex items-center gap-2 border-luxury-gold/50 text-luxury-champagne hover:border-luxury-gold"
            >
              <Handshake className="w-4 h-4 text-luxury-gold" />
              <span>{project.status === 'PILOT' ? 'Request Pilot Deployment' : 'Discuss Partnership'}</span>
            </button>
          )}

          <a
            href="https://calendly.com/aidynamicpro/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-luxury-silver hover:text-white px-3 py-2 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Schedule Architecture Review</span>
          </a>
        </div>
      </header>

      {/* 2 & 3. PROBLEM & SOLUTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* The Problem */}
        <div className="rounded-xl border border-red-500/20 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>The Operational Friction</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-2">The Problem Being Solved</h2>
          <p className="text-sm text-luxury-silver/80 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* The Solution */}
        <div className="rounded-xl border border-emerald-500/20 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Lightbulb className="w-4 h-4" />
            <span>The Technical Solution</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-2">The Engineered Approach</h2>
          <p className="text-sm text-luxury-silver/80 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* 4. WHO IT IS FOR */}
      <section className="rounded-xl border border-white/10 bg-dark-50/50 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-3">
          <Users className="w-4 h-4" />
          <span>Intended Users & Operators</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-white mb-4">Who This System Is Engineered For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {project.targetUsers.map((user, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-luxury-silver flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span>{user}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (ARCHITECTURE FLOW DIAGRAM) */}
      <section className="rounded-xl border border-luxury-gold/30 bg-dark-50/90 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-2">
          <Workflow className="w-4 h-4" />
          <span>System Architecture Flow</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-white mb-2">How The Data Engine Operates</h2>
        <p className="text-xs text-luxury-silver/70 mb-6">
          Deterministic end-to-end execution pipeline from raw input to verified outcome.
        </p>

        {/* 5-Stage Visual Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Stage 1: Input */}
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-luxury-gold block mb-1">01 / Input</span>
              <p className="text-xs font-semibold text-white mb-1">Raw Telemetry</p>
              <p className="text-[11px] text-luxury-silver/80 leading-relaxed">{project.architecture.input}</p>
            </div>
            <div className="mt-3 text-center text-luxury-gold hidden md:block">➔</div>
          </div>

          {/* Stage 2: AI / Data Engine */}
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-purple-400 block mb-1">02 / Engine</span>
              <p className="text-xs font-semibold text-white mb-1">Core Models</p>
              <p className="text-[11px] text-luxury-silver/80 leading-relaxed">{project.architecture.engine}</p>
            </div>
            <div className="mt-3 text-center text-purple-400 hidden md:block">➔</div>
          </div>

          {/* Stage 3: Analysis */}
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 block mb-1">03 / Analysis</span>
              <p className="text-xs font-semibold text-white mb-1">Feature Extraction</p>
              <p className="text-[11px] text-luxury-silver/80 leading-relaxed">{project.architecture.analysis}</p>
            </div>
            <div className="mt-3 text-center text-blue-400 hidden md:block">➔</div>
          </div>

          {/* Stage 4: Decision */}
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1">04 / Decision</span>
              <p className="text-xs font-semibold text-white mb-1">Threshold Evaluation</p>
              <p className="text-[11px] text-luxury-silver/80 leading-relaxed">{project.architecture.decision}</p>
            </div>
            <div className="mt-3 text-center text-amber-400 hidden md:block">➔</div>
          </div>

          {/* Stage 5: Output */}
          <div className="p-4 rounded-lg bg-black/50 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">05 / Output</span>
              <p className="text-xs font-semibold text-white mb-1">Action & Delivery</p>
              <p className="text-[11px] text-luxury-silver/80 leading-relaxed">{project.architecture.output}</p>
            </div>
            <div className="mt-3 text-center text-emerald-400 font-bold hidden md:block">✓</div>
          </div>
        </div>
      </section>

      {/* 6 & 7. CAPABILITIES & TECH STACK */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Capabilities */}
        <div className="rounded-xl border border-white/10 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4" />
            <span>Functional Capabilities</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-3">System Features</h2>
          <ul className="space-y-2">
            {project.capabilities.map((cap, idx) => (
              <li key={idx} className="text-xs text-luxury-silver/90 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="rounded-xl border border-white/10 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-3">
            <Cpu className="w-4 h-4" />
            <span>Engineered Technology Stack</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-3">Core Infrastructure & Tooling</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-luxury-silver bg-white/5 border border-white/10 px-3 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[11px] font-mono text-luxury-silver/50 block mb-1">Architectural Role:</span>
            <span className="text-xs font-serif font-semibold text-luxury-champagne">{project.professionalTitle}</span>
          </div>
        </div>
      </section>

      {/* 8 & 9. CURRENT STAGE & VALIDATION EVIDENCE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Current Stage */}
        <div className="rounded-xl border border-white/10 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Maturity & Deployment State</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-2">Stage Definition</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${statusMeta.color} ${statusMeta.bg} border ${statusMeta.border}`}>
              {project.status}
            </span>
            <span className="text-xs font-mono text-luxury-silver/70">{project.maturity}</span>
          </div>
          <p className="text-xs text-luxury-silver/80 leading-relaxed mb-4">
            {statusMeta.description}
          </p>

          {/* Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="pt-3 border-t border-white/10">
              <span className="text-[11px] font-mono text-luxury-silver/60 block mb-2">Verified Benchmarks:</span>
              <div className="grid grid-cols-3 gap-2">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-2 rounded bg-black/40 border border-white/5 text-center">
                    <span className="text-xs font-bold text-white block">{metric.value}</span>
                    <span className="text-[10px] text-luxury-silver/60">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Validation / Evidence Statement */}
        <div className="rounded-xl border border-white/10 bg-dark-50/50 p-6">
          <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Evidence & Transparency Note</span>
          </div>
          <h2 className="text-lg font-serif font-bold text-white mb-2">Verification Policy</h2>
          <p className="text-xs text-luxury-silver/80 leading-relaxed mb-4">
            {project.validationEvidence}
          </p>
          <div className="p-3 rounded bg-luxury-gold/5 border border-luxury-gold/20 text-[11px] text-luxury-silver/70">
            <strong className="text-luxury-champagne block mb-0.5">Integrity Commitment:</strong>
            AI Dynamics strictly avoids fabricated revenue numbers, fake logos, or unverified claims. Metrics are published only after operational validation.
          </div>
        </div>
      </section>

      {/* 10. COMMERCIAL OPPORTUNITY */}
      <section className="rounded-xl border border-white/10 bg-dark-50/50 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Commercial Opportunity</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-white mb-4">Market Alignment & Commercial Architecture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="text-luxury-gold font-mono block mb-1 font-semibold">Target Customers</span>
            <p className="text-luxury-silver/90">{project.commercialOpportunity.targetCustomers.join(', ')}</p>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="text-luxury-gold font-mono block mb-1 font-semibold">Current Market Alternatives</span>
            <p className="text-luxury-silver/90">{project.commercialOpportunity.currentAlternatives}</p>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="text-luxury-gold font-mono block mb-1 font-semibold">Differentiation Advantage</span>
            <p className="text-luxury-silver/90">{project.commercialOpportunity.differentiation}</p>
          </div>

          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="text-luxury-gold font-mono block mb-1 font-semibold">Potential Business Model</span>
            <p className="text-luxury-silver/90">{project.commercialOpportunity.businessModel || 'Direct Implementation & SaaS Licensing'}</p>
          </div>
        </div>
      </section>

      {/* 11. ROADMAP */}
      <section className="rounded-xl border border-white/10 bg-dark-50/50 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-2">
          <Workflow className="w-4 h-4" />
          <span>Execution Milestones</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-white mb-4">Product Roadmap</h2>
        <div className="space-y-3">
          {project.roadmap.map((phase, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-luxury-silver flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold font-mono text-[11px] flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span>{phase}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 12. SPONSOR / PARTNERSHIP OPPORTUNITY */}
      {project.sponsorOpportunity?.available && (
        <section className="rounded-2xl border border-luxury-gold/40 bg-gradient-to-br from-luxury-gold/10 via-dark-50 to-dark p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-2">
            <Handshake className="w-4 h-4" />
            <span>Collaboration Framework</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Interested in Partnering or Piloting {project.shortName}?
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver/80 max-w-2xl mb-6">
            We actively collaborate with forward-thinking operators, healthcare providers, and technology partners to validate and scale this system.
          </p>

          <div className="mb-6">
            <span className="text-xs font-mono text-white block mb-2">We Are Welcoming Inquiries For:</span>
            <div className="flex flex-wrap gap-2">
              {project.sponsorOpportunity.supportNeeded.map((support, idx) => (
                <span key={idx} className="text-xs text-luxury-champagne bg-black/50 border border-luxury-gold/30 px-3 py-1 rounded">
                  ✓ {support}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenPartnerModal(project)}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <Handshake className="w-4 h-4" />
            <span>Discuss Partnership / Pilot for {project.shortName}</span>
          </button>
        </section>
      )}

      {/* 13. RELATED AI DYNAMICS PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-bold text-white">Related Technical Systems</h2>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-mono text-luxury-gold hover:underline flex items-center gap-1"
            >
              <span>View All 22 Systems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelatedProject(rel)}
                className="p-4 rounded-xl border border-white/10 bg-dark-50 hover:border-luxury-gold/40 hover:bg-dark-50/90 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-luxury-silver/60 uppercase block mb-1">
                    {rel.industryFilter}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-white group-hover:text-luxury-champagne transition-colors mb-1">
                    {rel.name}
                  </h3>
                  <p className="text-[11px] text-luxury-silver/70 line-clamp-2">
                    {rel.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-luxury-gold">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 14. CONTACT CTA */}
      <footer className="rounded-xl border border-white/10 bg-black/40 p-6 text-center">
        <h3 className="text-base font-serif font-bold text-white mb-2">Have a Custom Technical Requirement?</h3>
        <p className="text-xs text-luxury-silver/80 max-w-lg mx-auto mb-4">
          Direct engineering consultation with our Founder & AI Solutions Architect.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <a href="https://calendly.com/aidynamicpro/discovery" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:underline">
            Calendly: Book Discovery Call
          </a>
          <span className="text-white/20">·</span>
          <a href="https://t.me/aidynamicpro" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:underline">
            Telegram: @aidynamicpro
          </a>
          <span className="text-white/20">·</span>
          <a href="mailto:jasmelacosta@gmail.com" className="text-luxury-gold hover:underline">
            Email: jasmelacosta@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
