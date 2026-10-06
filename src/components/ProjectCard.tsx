import React from 'react'
import { ExternalLink, Handshake, Eye } from 'lucide-react'
import type { ProjectItem } from '../data/projects'
import { STATUS_LEGEND } from '../data/projects'
import { ProjectGraphic } from './ProjectGraphic'
import { AnalyticsEvents } from '../lib/analytics'

interface ProjectCardProps {
  project: ProjectItem
  onViewDetails?: (project: ProjectItem) => void
  onOpenPartnerModal?: (project: ProjectItem) => void
  showGraphic?: boolean
  priority?: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
  onOpenPartnerModal,
  showGraphic = true,
}) => {
  const statusMeta = STATUS_LEGEND[project.status] || {
    description: project.status,
    color: 'text-luxury-silver',
    bg: 'bg-white/5',
    border: 'border-white/10'
  }

  const handleView = () => {
    AnalyticsEvents.projectViewed(project.id, project.name)
    if (onViewDetails) {
      onViewDetails(project)
    }
  }

  const handlePartner = (e: React.MouseEvent) => {
    e.stopPropagation()
    AnalyticsEvents.partnerInquiryClicked(project.id, project.status)
    if (onOpenPartnerModal) {
      onOpenPartnerModal(project)
    }
  }

  const handleLiveDemo = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (project.links.liveDemo) {
      AnalyticsEvents.projectDemoClicked(project.id, project.links.liveDemo)
    }
  }

  return (
    <article
      onClick={handleView}
      className="group relative flex flex-col h-full rounded-xl border border-white/10 bg-dark-50/70 hover:bg-dark-50/95 transition-all duration-300 hover:border-luxury-gold/40 hover:shadow-2xl hover:shadow-luxury-gold/5 cursor-pointer overflow-hidden"
      aria-label={`View details for ${project.name}`}
    >
      {/* Subtle gold accent edge on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/0 to-transparent group-hover:via-luxury-gold/60 transition-all duration-500" />

      {/* Card Header: Industry Badge & Status Badge */}
      <div className="p-5 pb-3 flex items-center justify-between gap-2 border-b border-white/5">
        {/* Top Left: Industry Badge */}
        <span className="inline-flex items-center text-[11px] font-mono tracking-wider uppercase text-luxury-silver/80 bg-white/5 px-2.5 py-1 rounded border border-white/10">
          {project.industryFilter}
        </span>

        {/* Top Right: Status Badge with Tooltip Support */}
        <div className="relative group/status">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded border ${statusMeta.border} ${statusMeta.bg} ${statusMeta.color}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
          {/* Status Tooltip */}
          <div className="absolute right-0 top-full mt-1.5 hidden group-hover/status:block z-30 w-52 p-2 text-[10px] leading-tight text-white bg-dark-100 border border-white/15 rounded shadow-xl pointer-events-none">
            {statusMeta.description}
          </div>
        </div>
      </div>

      {/* Procedural Visual Graphic / Architecture Blueprint */}
      {showGraphic && (
        <div className="px-5 pt-3">
          <ProjectGraphic type={project.graphicType} />
        </div>
      )}

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Project Name */}
        <h3 className="text-lg font-serif font-bold text-white group-hover:text-luxury-champagne transition-colors leading-snug mb-1">
          {project.name}
        </h3>

        {/* One-Line Tagline */}
        <p className="text-xs font-mono text-luxury-gold/90 mb-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* 2-3 Line Summary */}
        <p className="text-xs text-luxury-silver/70 line-clamp-3 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Value Line */}
        <div className="mt-auto mb-4 p-2.5 rounded bg-black/30 border border-white/5">
          <p className="text-[11px] text-luxury-silver/90 italic flex items-start gap-1.5">
            <span className="text-luxury-gold font-bold">›</span>
            <span>"{project.valueLine}"</span>
          </p>
        </div>

        {/* Capability Chips (3-5 items) */}
        <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Core Capabilities">
          {project.capabilities.slice(0, 4).map((cap, idx) => (
            <span
              key={idx}
              className="text-[10px] font-sans text-luxury-silver/80 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded border border-white/5 transition-colors"
            >
              {cap}
            </span>
          ))}
          {project.capabilities.length > 4 && (
            <span className="text-[10px] font-mono text-luxury-silver/50 self-center">
              +{project.capabilities.length - 4} more
            </span>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 mt-auto">
          {/* View Details CTA */}
          <button
            type="button"
            onClick={handleView}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-luxury-champagne transition-colors py-1 group/btn"
          >
            <Eye className="w-3.5 h-3.5 text-luxury-gold group-hover/btn:translate-x-0.5 transition-transform" />
            <span>View Architecture</span>
          </button>

          {/* Contextual Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Live Demo - ONLY if real */}
            {project.links.liveDemo && (
              <a
                href={project.links.liveDemo}
                onClick={handleLiveDemo}
                target={project.links.liveDemo.startsWith('http') ? '_blank' : undefined}
                rel={project.links.liveDemo.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 transition-all"
                title={`Access live demo for ${project.shortName}`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Partner / Sponsor CTA */}
            {project.sponsorOpportunity?.available && (
              <button
                type="button"
                onClick={handlePartner}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-luxury-champagne hover:text-white bg-luxury-gold/15 hover:bg-luxury-gold/30 px-2.5 py-1 rounded border border-luxury-gold/40 transition-all"
                title={`Inquire about partnership or pilot for ${project.shortName}`}
              >
                <Handshake className="w-3 h-3 text-luxury-gold" />
                <span>{project.status === 'PILOT' ? 'Pilot With Us' : 'Discuss Partnership'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
