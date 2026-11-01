import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { getFeaturedProjects, PROJECTS } from '../data/projects'
import type { ProjectItem } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { PartnerInquiryModal } from './PartnerInquiryModal'

type CarouselFilter =
  | 'featured'
  | 'all'
  | 'vision'
  | 'healthcare'
  | 'voice_crm'
  | 'sports'
  | 'web_data'

export const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<CarouselFilter>('all')
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [partnerProject, setPartnerProject] = useState<ProjectItem | null>(null)

  const featured = useMemo(() => getFeaturedProjects(), [])

  const displayedProjects = useMemo(() => {
    switch (activeFilter) {
      case 'featured':
        return featured
      case 'vision':
        return PROJECTS.filter(
          (p) =>
            p.industryFilter === 'Computer Vision & Spatial AI' ||
            p.industryFilter === 'Real Estate & Property Technology' ||
            p.industryFilter === 'Commerce & Marketplaces'
        )
      case 'healthcare':
        return PROJECTS.filter((p) => p.industryFilter === 'Healthcare & Digital Health')
      case 'voice_crm':
        return PROJECTS.filter(
          (p) =>
            p.industryFilter === 'Voice & Conversational AI' ||
            p.industryFilter === 'CRM & Business Automation'
        )
      case 'sports':
        return PROJECTS.filter((p) => p.industryFilter === 'Sports & Human Performance')
      case 'web_data':
        return PROJECTS.filter(
          (p) =>
            p.industryFilter === 'Intelligent Websites & Growth' ||
            p.industryFilter === 'Data & Analytics'
        )
      case 'all':
      default:
        // Put featured first, then the remaining systems so the carousel starts with the strongest visual impact
        const featuredSet = new Set(featured.map((f) => f.id))
        return [...featured, ...PROJECTS.filter((p) => !featuredSet.has(p.id))]
    }
  }, [activeFilter, featured])

  const handleViewDetails = (project: ProjectItem) => {
    navigate(`/projects/${project.slug}`)
  }

  const scrollByDirection = (dir: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardWidth = 410
    const nextScroll = dir === 'left' ? el.scrollLeft - cardWidth : el.scrollLeft + cardWidth
    el.scrollTo({ left: nextScroll, behavior: 'smooth' })
  }

  // Smooth horizontal auto-scroll glide (pauses on hover/touch)
  useEffect(() => {
    if (!isAutoScrolling || isHovered) return
    const interval = setInterval(() => {
      const el = scrollContainerRef.current
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 390, behavior: 'smooth' })
      }
    }, 4200)
    return () => clearInterval(interval)
  }, [isAutoScrolling, isHovered, activeFilter])

  const filterTabs: { id: CarouselFilter; label: string; count: number }[] = [
    { id: 'all', label: `All ${PROJECTS.length} Deployed Systems`, count: PROJECTS.length },
    { id: 'featured', label: 'Flagship Systems', count: featured.length },
    { id: 'vision', label: 'Computer Vision & Luxury ID', count: 5 },
    { id: 'healthcare', label: 'Healthcare & Clinical AI', count: 5 },
    { id: 'voice_crm', label: '24/7 Voice & CRM Automation', count: 3 },
    { id: 'sports', label: 'Sports Biomechanics', count: 3 },
    { id: 'web_data', label: 'Agentic Web & Intelligence', count: 5 },
  ]

  return (
    <section id="selected-systems" className="relative py-24 bg-dark border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header + Horizontal Scroll Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold font-mono text-xs tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Engineering Portfolio · {PROJECTS.length} Production Architectures</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">
              Projects Done & Deployed AI Systems
            </h2>

            <p className="text-base text-luxury-silver/80 leading-relaxed">
              Swipe or scroll horizontally through real AI platforms engineered by AI Dynamic Pro to cut operating costs, automate complex workflows, and multiply team output.
            </p>
          </div>

          {/* Left / Right Carousel Controls & Auto-Glide Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/15 bg-dark-50 hover:border-luxury-gold/40 text-xs font-mono text-luxury-silver hover:text-white transition-all"
              title={isAutoScrolling ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Auto-Glide On</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Auto-Glide Paused</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              aria-label="Scroll projects left"
              className="p-3 rounded-xl border border-white/15 bg-dark-50 hover:bg-luxury-gold hover:text-dark hover:border-luxury-gold text-white transition-all shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              aria-label="Scroll projects right"
              className="p-3 rounded-xl border border-white/15 bg-dark-50 hover:bg-luxury-gold hover:text-dark hover:border-luxury-gold text-white transition-all shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {filterTabs.map((tab) => {
            const active = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id)
                  scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap border transition-all flex items-center gap-2 ${
                  active
                    ? 'bg-luxury-gold text-dark border-luxury-gold font-bold shadow-lg shadow-luxury-gold/15'
                    : 'bg-dark-50/80 text-luxury-silver border-white/10 hover:border-luxury-gold/30 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    active ? 'bg-dark/20 text-dark' : 'bg-white/10 text-luxury-silver'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Full-Bleed Horizontal Side-Scrolling Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-8 lg:px-16 pb-8 pt-2 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#c5a059 #121218' }}
      >
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="w-[330px] sm:w-[380px] lg:w-[400px] shrink-0 snap-start flex flex-col"
          >
            <ProjectCard
              project={project}
              onViewDetails={handleViewDetails}
              onOpenPartnerModal={(p) => setPartnerProject(p)}
              showGraphic={true}
            />
          </div>
        ))}
      </div>

      {/* Bottom Callout: Full Interactive Directory */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-luxury-gold/40 bg-luxury-gold/10 hover:bg-luxury-gold/20 text-luxury-champagne hover:text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl shadow-luxury-gold/5"
          >
            <span>Open Full {PROJECTS.length}-System Technical Directory</span>
            <ArrowRight className="w-4 h-4 text-luxury-gold" />
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-luxury-gold text-dark font-bold text-sm hover:bg-luxury-champagne transition-all shadow-lg"
          >
            <span>Book $99 AI Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
