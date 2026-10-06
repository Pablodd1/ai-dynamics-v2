import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getFeaturedProjects } from '../data/projects'
import type { ProjectItem } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { PartnerInquiryModal } from './PartnerInquiryModal'

export const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate()
  const featured = getFeaturedProjects()
  const [partnerProject, setPartnerProject] = useState<ProjectItem | null>(null)

  const handleViewDetails = (project: ProjectItem) => {
    navigate(`/projects?project=${project.slug}`)
  }

  return (
    <section id="selected-systems" className="relative py-20 bg-dark border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold font-mono text-xs tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Venture Studio & Engineering Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Selected AI Systems
          </h2>

          <p className="text-base text-luxury-silver/80 leading-relaxed">
            Real technical architectures engineered across computer vision, sports biomechanics, digital health, and high-throughput data intelligence.
          </p>
        </div>

        {/* 6 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewDetails}
              onOpenPartnerModal={(p) => setPartnerProject(p)}
              showGraphic={true}
            />
          ))}
        </div>

        {/* Bottom Callout: View All 22 Projects */}
        <div className="text-center pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-luxury-gold/40 bg-luxury-gold/10 hover:bg-luxury-gold/20 text-luxury-champagne hover:text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl shadow-luxury-gold/5"
          >
            <span>Explore All 22 Technical Systems</span>
            <ArrowRight className="w-4 h-4 text-luxury-gold" />
          </Link>
          <p className="text-xs font-mono text-luxury-silver/50 mt-3">
            Filtering by 10 industry disciplines · Complete architectural flow diagrams · Pilot opportunities
          </p>
        </div>
      </div>

      {/* Partner Inquiry Modal */}
      <PartnerInquiryModal
        project={partnerProject}
        isOpen={Boolean(partnerProject)}
        onClose={() => setPartnerProject(null)}
      />
    </section>
  )
}

export default FeaturedProjects
