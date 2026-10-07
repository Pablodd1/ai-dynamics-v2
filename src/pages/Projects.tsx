import { useState, useMemo } from 'react'
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  Layers,
  Sparkles,
  X,
  Info
} from 'lucide-react'
import SEO from '../components/SEO'
import AILogo from '../components/AILogo'
import {
  PROJECTS,
  INDUSTRY_FILTERS,
  STATUS_LEGEND,
  getAllDerivedSkills,
  getAllDerivedTitles
} from '../data/projects'
import type { ProjectItem, IndustryFilter, ProjectStatus } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectDetailView } from '../components/ProjectDetailView'
import { PartnerInquiryModal } from '../components/PartnerInquiryModal'

export default function Projects() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [partnerProject, setPartnerProject] = useState<ProjectItem | null>(null)
  const [showLegend, setShowLegend] = useState(false)

  // Derived taxonomy data
  const derivedSkills = useMemo(() => getAllDerivedSkills(), [])
  const derivedTitles = useMemo(() => getAllDerivedTitles(), [])

  // Derive active project directly from route slug or search query
  const projectSlug = slug || searchParams.get('project')
  const activeProject = useMemo(() => {
    if (!projectSlug) return null
    return PROJECTS.find(p => p.slug === projectSlug || p.id === projectSlug) || null
  }, [projectSlug])

  // Derive selected industry from search params
  const industryParam = searchParams.get('industry')
  const selectedIndustry = useMemo<IndustryFilter>(() => {
    if (industryParam && INDUSTRY_FILTERS.includes(industryParam as IndustryFilter)) {
      return industryParam as IndustryFilter
    }
    return 'All'
  }, [industryParam])

  const handleOpenDetail = (project: ProjectItem) => {
    navigate(`/projects/${project.slug}`)
  }

  const handleCloseDetail = () => {
    navigate('/projects')
  }

  const handleSelectIndustry = (filter: IndustryFilter) => {
    if (filter === 'All') {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        next.delete('industry')
        return next
      })
    } else {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        next.set('industry', filter)
        return next
      })
    }
  }

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Filter by Industry
      if (selectedIndustry !== 'All' && project.industryFilter !== selectedIndustry) {
        return false
      }

      // Filter by Status
      if (selectedStatus !== 'ALL' && project.status !== selectedStatus) {
        return false
      }

      // Filter by Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = project.name.toLowerCase().includes(query)
        const matchesTagline = project.tagline.toLowerCase().includes(query)
        const matchesSummary = project.summary.toLowerCase().includes(query)
        const matchesIndustry = project.industry.toLowerCase().includes(query)
        const matchesRole = project.professionalTitle.toLowerCase().includes(query)
        const matchesTech = project.technologies.some(t => t.toLowerCase().includes(query))
        const matchesCap = project.capabilities.some(c => c.toLowerCase().includes(query))
        const matchesTarget = project.targetUsers.some(u => u.toLowerCase().includes(query))

        return matchesName || matchesTagline || matchesSummary || matchesIndustry || matchesRole || matchesTech || matchesCap || matchesTarget
      }

      return true
    })
  }, [selectedIndustry, selectedStatus, searchQuery])

  // Industry count map
  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length }
    PROJECTS.forEach(p => {
      counts[p.industryFilter] = (counts[p.industryFilter] || 0) + 1
    })
    return counts
  }, [])

  // Structured Data Schema (JSON-LD)
  const jsonLdSchema = useMemo(() => {
    if (activeProject) {
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: activeProject.name,
        applicationCategory: activeProject.category,
        operatingSystem: 'Cloud / Mobile / Edge',
        description: activeProject.summary,
        offers: {
          '@type': 'Offer',
          category: activeProject.commercialOpportunity.businessModel || 'Enterprise Technology'
        },
        author: {
          '@type': 'Organization',
          name: 'AI Dynamic Pro',
          url: 'https://www.aidynamic.pro'
        }
      }
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI Dynamics Technical Systems & Projects Portfolio',
      description: 'Comprehensive engineering portfolio of 22 applied AI systems across computer vision, digital health, sports science, and high-throughput data intelligence.',
      url: 'https://www.aidynamic.pro/projects',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((proj, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: proj.name,
          url: `https://www.aidynamic.pro/projects/${proj.slug}`,
          description: proj.summary
        }))
      }
    }
  }, [activeProject])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-luxury-gold selection:text-dark">
      <SEO
        title={activeProject ? `${activeProject.name} — AI Dynamic Pro` : "Projects & Systems Architecture — AI Dynamic Pro"}
        description={activeProject ? activeProject.summary : "Explore 22 production-grade AI systems: Computer Vision defect inspection, 3D room mapping, custom RevOps CRM, digital health platforms, sports biomechanics, and bilingual voice agents."}
        canonical={activeProject ? `https://www.aidynamic.pro/projects/${activeProject.slug}` : "https://www.aidynamic.pro/projects"}
      />

      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <AILogo className="w-8 h-8" />
            <span className="font-serif font-bold text-lg text-white tracking-wide">
              AI Dynamic <span className="text-luxury-gold">Pro</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-mono">
            <Link to="/" className="text-luxury-silver hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-luxury-champagne font-semibold">Systems ({PROJECTS.length})</span>
            <span className="text-white/20 hidden sm:inline">/</span>
            <Link to="/#contact" className="text-luxury-silver hover:text-white transition-colors hidden sm:inline">
              Contact
            </Link>
            <a
              href="https://calendly.com/aidynamicpro/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-1.5 px-3 ml-2"
            >
              Book Discovery
            </a>
          </nav>
        </div>
      </header>

      <main className="relative">
        {/* If active project is selected, render full detail view */}
        {activeProject ? (
          <ProjectDetailView
            project={activeProject}
            onBack={handleCloseDetail}
            onOpenPartnerModal={(p) => setPartnerProject(p)}
            onSelectRelatedProject={handleOpenDetail}
          />
        ) : (
          /* Portfolio Grid View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Header */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold font-mono text-xs tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Technology Portfolio · 22 Verified Architectures</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                Applied AI Systems & Venture Showcase
              </h1>

              <p className="text-base sm:text-lg text-luxury-silver/80 leading-relaxed mb-6">
                Technical architectures engineered by AI Dynamic Pro. Explore real system pipelines across computer vision, digital health, sports science, voice telephony, and high-scale data intelligence.
              </p>

              {/* Status Transparency & Legend Toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowLegend(!showLegend)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-luxury-silver hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>{showLegend ? 'Hide Status Legend' : 'View Maturity Status Legend'}</span>
                </button>

                <span className="text-xs font-mono text-luxury-silver/50">
                  Strictly verified data · Zero synthetic metrics
                </span>
              </div>

              {/* Expandable Status Legend */}
              {showLegend && (
                <div className="mt-4 p-4 rounded-xl border border-white/10 bg-dark-50/90 text-xs">
                  <h2 className="font-mono text-luxury-gold uppercase tracking-wider text-[11px] mb-3">
                    Project Maturity Status Definitions:
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(Object.keys(STATUS_LEGEND) as ProjectStatus[]).map((st) => {
                      const meta = STATUS_LEGEND[st]
                      return (
                        <div key={st} className="p-2.5 rounded bg-black/40 border border-white/5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold mb-1 ${meta.color} ${meta.bg} border ${meta.border}`}>
                            {st}
                          </span>
                          <p className="text-[11px] text-luxury-silver/70 leading-snug">
                            {meta.description}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Controls: Search & Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-luxury-silver/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 22 systems by keyword, technology, capability, or user..."
                  className="w-full pl-10 pr-10 py-2.5 bg-dark-50 border border-white/15 rounded-xl text-sm text-white placeholder-luxury-silver/40 focus:border-luxury-gold focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3.5 text-luxury-silver/40 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 10 Industry Filter Tabs */}
              <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-1.5 min-w-max">
                  {INDUSTRY_FILTERS.map((filter) => {
                    const isSelected = selectedIndustry === filter
                    const count = industryCounts[filter] || 0
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => handleSelectIndustry(filter)}
                        className={`text-xs font-mono px-3.5 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-luxury-gold text-dark border-luxury-gold font-bold shadow-lg shadow-luxury-gold/10'
                            : 'bg-dark-50 text-luxury-silver hover:text-white border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span>{filter}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-dark/20 text-dark' : 'bg-white/10 text-luxury-silver/60'}`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Status Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono pt-1">
                <span className="text-luxury-silver/50 mr-1 text-[11px]">Filter by Status:</span>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('ALL')}
                  className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                    selectedStatus === 'ALL'
                      ? 'border-white/30 text-white bg-white/10'
                      : 'border-white/5 text-luxury-silver/50 hover:text-white'
                  }`}
                >
                  All Statuses ({PROJECTS.length})
                </button>
                {(['LIVE', 'PRODUCTION', 'PILOT', 'ACTIVE DEVELOPMENT', 'PROTOTYPE', 'R&D', 'COMMERCIALIZATION', 'VALIDATION REQUIRED'] as ProjectStatus[]).map((st) => {
                  const isSel = selectedStatus === st
                  const meta = STATUS_LEGEND[st]
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(isSel ? 'ALL' : st)}
                      className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                        isSel
                          ? `${meta.bg} ${meta.color} ${meta.border} font-bold`
                          : 'border-white/5 text-luxury-silver/60 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Results Count Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-luxury-silver/60 mb-6 pb-3 border-b border-white/5">
              <span>
                Showing <strong className="text-white">{filteredProjects.length}</strong> of {PROJECTS.length} systems
              </span>
              {(selectedIndustry !== 'All' || selectedStatus !== 'ALL' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    handleSelectIndustry('All')
                    setSelectedStatus('ALL')
                    setSearchQuery('')
                  }}
                  className="text-luxury-gold hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            {/* Project Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-white/10 bg-dark-50/50">
                <Layers className="w-12 h-12 text-luxury-silver/30 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-white mb-2">No Matching Systems Found</h3>
                <p className="text-xs text-luxury-silver/70 max-w-sm mx-auto mb-4">
                  No projects match your current query "{searchQuery}". Try broadening your industry filter or search keywords.
                </p>
                <button
                  onClick={() => {
                    handleSelectIndustry('All')
                    setSelectedStatus('ALL')
                    setSearchQuery('')
                  }}
                  className="btn-secondary text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewDetails={handleOpenDetail}
                    onOpenPartnerModal={(p) => setPartnerProject(p)}
                    showGraphic={true}
                  />
                ))}
              </div>
            )}

            {/* Dynamic Skills & Professional Capabilities Section */}
            <section className="rounded-2xl border border-white/10 bg-dark-50/60 p-8 sm:p-10 mb-16">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-luxury-gold uppercase tracking-wider block mb-2">
                  Taxonomy Engine
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                  Derived Skills & Capabilities Cloud
                </h2>
                <p className="text-xs text-luxury-silver/80">
                  Every capability below is derived directly from live project architectures in this repository.
                </p>
              </div>

              {/* Skills Cloud */}
              <div className="flex flex-wrap gap-2 mb-10">
                {derivedSkills.slice(0, 32).map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs text-luxury-silver/90 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors cursor-default"
                  >
                    <span>{item.skill}</span>
                    <span className="text-[10px] font-mono text-luxury-gold">
                      ({item.projectCount})
                    </span>
                  </span>
                ))}
              </div>

              {/* Professional Architectural Roles */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-mono uppercase tracking-wider text-luxury-champagne mb-4">
                  Professional Architecture Titles Generated by Portfolio:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {derivedTitles.map((role, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs flex items-center justify-between">
                      <span className="font-semibold text-white">{role.title}</span>
                      <span className="text-[10px] font-mono text-luxury-silver/50">
                        {role.projectCount} {role.projectCount === 1 ? 'system' : 'systems'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Partnership Callout */}
            <section className="rounded-2xl border border-luxury-gold/30 bg-gradient-to-br from-luxury-gold/10 via-dark-50 to-dark p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                Seeking a Strategic Technology Partner?
              </h2>
              <p className="text-sm text-luxury-silver/80 max-w-xl mx-auto mb-6">
                AI Dynamic Pro collaborates with enterprise operators, clinical practices, and founders to architect, deploy, and scale custom AI solutions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://calendly.com/aidynamicpro/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs flex items-center gap-2"
                >
                  <span>Book 30-Minute Technical Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://t.me/aidynamicpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  Direct Telegram: @aidynamicpro
                </a>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Partner Inquiry Modal */}
      <PartnerInquiryModal
        project={partnerProject}
        isOpen={Boolean(partnerProject)}
        onClose={() => setPartnerProject(null)}
      />
    </div>
  )
}
