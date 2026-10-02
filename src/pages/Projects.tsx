import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  ExternalLink,
  Bot,
  Stethoscope,
  Activity,
  Scan,
  PhoneCall,
  Database,
  Zap,
  ShoppingBag,
  Layers,
  Sparkles,
  X,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Workflow,
  Globe
} from 'lucide-react'
import SEO from '../components/SEO'
import AILogo from '../components/AILogo'
import {
  CAPABILITY_PILLARS,
  COMPANY_DESCRIPTOR,
  FOUNDER_ROLE
} from '../data/taxonomy'
import type { CapabilityPillarId } from '../data/taxonomy'
import {
  PROJECTS,
  getAllDerivedSkills,
  getAllDerivedTitles
} from '../data/projects'
import type { ProjectItem } from '../data/projects'

// Icon mapping helper
const getPillarIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bot': return Bot
    case 'Stethoscope': return Stethoscope
    case 'Activity': return Activity
    case 'Scan': return Scan
    case 'PhoneCall': return PhoneCall
    case 'Database': return Database
    case 'Zap': return Zap
    case 'Search': return Search
    case 'ShoppingBag': return ShoppingBag
    case 'Cpu': return Cpu
    default: return Layers
  }
}

export default function Projects() {
  const [selectedPillar, setSelectedPillar] = useState<CapabilityPillarId | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)
  const [showSkillDrawer, setShowSkillDrawer] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Derived taxonomy data
  const derivedSkills = useMemo(() => getAllDerivedSkills(), [])
  const derivedTitles = useMemo(() => getAllDerivedTitles(), [])

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Filter by Pillar
      if (selectedPillar !== 'all' && project.pillarId !== selectedPillar) {
        return false
      }

      // Filter by Selected Skill
      if (selectedSkill && !project.skills.some(s => s.toLowerCase() === selectedSkill.toLowerCase())) {
        return false
      }

      // Filter by Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const matchesTitle = project.title.toLowerCase().includes(query)
        const matchesSubtitle = project.subtitle.toLowerCase().includes(query)
        const matchesIndustry = project.industry.toLowerCase().includes(query)
        const matchesRole = project.professionalTitle.toLowerCase().includes(query)
        const matchesTech = project.techStack.some(t => t.toLowerCase().includes(query))
        const matchesSkill = project.skills.some(s => s.toLowerCase().includes(query))
        const matchesDesc = project.detailedDescription.toLowerCase().includes(query)

        return matchesTitle || matchesSubtitle || matchesIndustry || matchesRole || matchesTech || matchesSkill || matchesDesc
      }

      return true
    })
  }, [selectedPillar, selectedSkill, searchQuery])

  // Count projects per pillar
  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length }
    PROJECTS.forEach(p => {
      counts[p.pillarId] = (counts[p.pillarId] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-luxury-gold selection:text-dark">
      <SEO
        title="Projects & Systems Architecture — AI Dynamic Pro"
        description="Explore production-grade AI systems: Computer Vision defect inspection, 3D room mapping, custom RevOps CRM, digital health platforms, and bilingual voice agents."
        canonical="https://www.aidynamic.pro/projects"
      />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AI Dynamic Pro Projects & Systems Portfolio",
            "description": COMPANY_DESCRIPTOR,
            "creator": {
              "@type": "Person",
              "name": "Jasmel Acosta",
              "jobTitle": FOUNDER_ROLE
            },
            "hasPart": PROJECTS.map(p => ({
              "@type": "SoftwareApplication",
              "name": p.title,
              "applicationCategory": p.category,
              "operatingSystem": "Cloud / Web / API",
              "description": p.summary
            }))
          })
        }}
      />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <AILogo className="w-10 h-10 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight">
                  <span className="text-white">AI</span>
                  <span className="text-luxury-gold"> Dynamics</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-luxury-silver/70">
                  Applied Systems Architecture
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-luxury-silver hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/#services" className="text-sm text-luxury-silver hover:text-white transition-colors">
                Capabilities
              </Link>
              <Link to="/blog" className="text-sm text-luxury-silver hover:text-white transition-colors">
                Blog & Intel
              </Link>
              <Link to="/founders" className="text-sm text-luxury-silver hover:text-white transition-colors">
                Founder
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm px-4 py-2.5 rounded-full inline-flex items-center gap-2"
              >
                <span>Book Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Breadcrumb / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{COMPANY_DESCRIPTOR}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight"
          >
            Deployed Systems & <span className="text-luxury-gold">Capabilities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-luxury-silver max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Every system in our registry is engineered for measurable enterprise impact. 
            Explore our production architectures across computer vision inspection, 3D LiDAR spatial mapping, 
            custom RevOps CRMs, digital health automation, and autonomous multi-agent networks.
          </motion.p>

          {/* Key Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md"
          >
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-bold text-luxury-gold">{PROJECTS.length}+</div>
              <div className="text-xs text-luxury-silver/80 uppercase tracking-wider mt-1">Production Systems</div>
            </div>
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">9</div>
              <div className="text-xs text-luxury-silver/80 uppercase tracking-wider mt-1">Capability Pillars</div>
            </div>
            <div className="p-3 text-center border-r border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{derivedSkills.length}+</div>
              <div className="text-xs text-luxury-silver/80 uppercase tracking-wider mt-1">Derived Skills</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{derivedTitles.length}</div>
              <div className="text-xs text-luxury-silver/80 uppercase tracking-wider mt-1">Architect Roles</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Interactive Controls & Filters */}
      <section className="sticky top-20 z-40 bg-[#0a0a0f]/95 backdrop-blur-lg border-y border-white/10 py-4 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Pillar Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setSelectedPillar('all')
                setSelectedSkill(null)
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedPillar === 'all'
                  ? 'bg-luxury-gold text-dark shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                  : 'bg-white/5 text-luxury-silver hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>All Systems</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedPillar === 'all' ? 'bg-dark/20 text-dark font-bold' : 'bg-white/10 text-white/70'
              }`}>
                {pillarCounts['all']}
              </span>
            </button>

            {CAPABILITY_PILLARS.map((pillar) => {
              const Icon = getPillarIcon(pillar.iconName)
              const count = pillarCounts[pillar.id] || 0
              const isActive = selectedPillar === pillar.id
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setSelectedPillar(pillar.id)
                    setSelectedSkill(null)
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-luxury-gold text-dark font-semibold shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                      : 'bg-white/5 text-luxury-silver hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar.shortTitle}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-dark/20 text-dark font-bold' : 'bg-white/10 text-white/70'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search & Skills Drawer Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-silver/50" />
              <input
                type="text"
                placeholder="Search tech, skill, industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-luxury-silver/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowSkillDrawer(!showSkillDrawer)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all whitespace-nowrap ${
                showSkillDrawer || selectedSkill
                  ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold'
                  : 'bg-white/5 border-white/10 text-luxury-silver hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{selectedSkill ? `Skill: ${selectedSkill}` : 'Taxonomy Cloud'}</span>
              {selectedSkill && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSkill(null)
                  }}
                  className="hover:bg-luxury-gold/20 p-0.5 rounded"
                >
                  <X className="w-3 h-3" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Skills Taxonomy Cloud Dropdown */}
        <AnimatePresence>
          {showSkillDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 mt-3 pt-3"
            >
              <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
                <span className="text-[11px] uppercase tracking-wider text-luxury-silver/60 mr-2 flex items-center gap-1">
                  <Workflow className="w-3 h-3" /> Derived Skills ({derivedSkills.length}):
                </span>
                {derivedSkills.map((item) => {
                  const isSelected = selectedSkill === item.skill
                  return (
                    <button
                      key={item.skill}
                      onClick={() => setSelectedSkill(isSelected ? null : item.skill)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-luxury-gold text-dark font-bold'
                          : 'bg-white/5 border border-white/10 text-luxury-silver hover:text-white hover:border-luxury-gold/30'
                      }`}
                    >
                      <span>{item.skill}</span>
                      <span className="text-[9px] opacity-70 bg-white/10 px-1 rounded-full">
                        {item.projectCount}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 border border-white/10 rounded-2xl bg-white/[0.02]">
            <Layers className="w-12 h-12 text-luxury-silver/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Matching Systems Found</h3>
            <p className="text-luxury-silver text-sm max-w-md mx-auto mb-6">
              Try adjusting your search query, clearing your skill filter, or selecting "All Systems".
            </p>
            <button
              onClick={() => {
                setSelectedPillar('all')
                setSelectedSkill(null)
                setSearchQuery('')
              }}
              className="btn-secondary text-xs px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const pillar = CAPABILITY_PILLARS.find(p => p.id === project.pillarId)
              const PillarIcon = getPillarIcon(pillar?.iconName || 'Layers')

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(201,169,110,0.1)]"
                >
                  {/* Card Header & Badges */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border border-luxury-gold/20 bg-luxury-gold/5 text-luxury-champagne">
                        <PillarIcon className="w-3 h-3 text-luxury-gold" />
                        {pillar?.shortTitle || project.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.status === 'production' ? 'Production Ready' : 'Active Deployment'}
                      </span>
                    </div>

                    {/* Professional Role Badge */}
                    <div className="text-[11px] uppercase font-mono tracking-wider text-purple-400 mb-2 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      <span>{project.professionalTitle}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className="text-xl font-bold font-serif text-white group-hover:text-luxury-champagne transition-colors mb-3">
                      {project.title}
                    </h2>
                    <p className="text-luxury-silver text-xs leading-relaxed line-clamp-3 mb-4">
                      {project.subtitle}
                    </p>

                    {/* Architecture schematic snippet */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-4 text-[11px] font-mono space-y-1.5">
                      <div className="flex items-start gap-1.5">
                        <span className="text-luxury-gold font-bold uppercase text-[9px] w-12 flex-shrink-0">Input:</span>
                        <span className="text-luxury-silver/90 truncate">{project.architecture.input}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold uppercase text-[9px] w-12 flex-shrink-0">Engine:</span>
                        <span className="text-purple-200 truncate">{project.architecture.engine}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold uppercase text-[9px] w-12 flex-shrink-0">Output:</span>
                        <span className="text-emerald-200 truncate">{project.architecture.output}</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                          <div className="text-sm font-bold text-luxury-gold">{m.value}</div>
                          <div className="text-[10px] text-luxury-silver/70 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-luxury-silver border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-luxury-silver/50">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-white/[0.01] border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-semibold text-luxury-champagne hover:text-white flex items-center gap-1.5 group/btn transition-colors"
                    >
                      <span>System Architecture</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform text-luxury-gold" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-silver hover:text-white border border-white/10 transition-colors"
                          title="Open Live Interface"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href="https://calendly.com/aidynamicpro/discovery"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-dark text-xs font-bold transition-all border border-luxury-gold/30"
                      >
                        Deploy
                      </a>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </main>

      {/* Professional Title & Capability Matrix Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-dark-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
              Autonomous Systems & Engineering Roles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-2">
              Generated Professional Architect Roles
            </h2>
            <p className="text-luxury-silver text-sm max-w-2xl mx-auto mt-3">
              Our projects dynamically generate verified architecture titles and cross-disciplinary capabilities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {derivedTitles.map((t) => (
              <div
                key={t.title}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                  <span className="text-xs font-medium text-white/90">{t.title}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-luxury-silver/80">
                  {t.projectCount} {t.projectCount === 1 ? 'system' : 'systems'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Callout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-dark-50 to-dark">
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white/[0.02] border border-luxury-gold/30 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-luxury-gold/50 flex-shrink-0 shadow-[0_0_20px_rgba(201,169,110,0.3)]">
            <img
              src="/founder-3d.jpg"
              alt="Jasmel Acosta — Founder & Applied AI Systems Architect"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-block px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold text-xs font-bold uppercase tracking-wider">
              {FOUNDER_ROLE}
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">
              Jasmel Acosta
            </h3>
            <p className="text-xs sm:text-sm text-luxury-silver leading-relaxed">
              "We don't sell theoretical AI or superficial wrappers. Every system we build has direct revenue impact, deterministic guardrails, and real-time operational integration."
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://calendly.com/aidynamicpro/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs sm:text-sm px-5 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Deep Dive Architecture Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-luxury-gold/40 rounded-3xl p-6 sm:p-8 z-10 shadow-[0_0_50px_rgba(201,169,110,0.2)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-luxury-silver hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold">
                    {activeModalProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20">
                    {activeModalProject.professionalTitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  {activeModalProject.title}
                </h2>
                <p className="text-luxury-silver text-sm mt-1">
                  {activeModalProject.industry}
                </p>
              </div>

              {/* Detailed Problem & Solution */}
              <div className="space-y-6 text-sm text-luxury-silver">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-2">System Overview</h3>
                  <p className="leading-relaxed text-luxury-silver/90">{activeModalProject.detailedDescription}</p>
                </div>

                {/* Architecture Pipeline Visualizer */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono">
                  <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold">End-to-End Architecture Flow</h4>
                  
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-luxury-gold uppercase font-bold mb-1">01. Data Ingestion</div>
                      <div className="text-xs text-white leading-tight">{activeModalProject.architecture.input}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">02. AI / ML Engine</div>
                      <div className="text-xs text-purple-100 leading-tight">{activeModalProject.architecture.engine}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-[10px] text-emerald-400 uppercase font-bold mb-1">03. Automated Output</div>
                      <div className="text-xs text-emerald-100 leading-tight">{activeModalProject.architecture.output}</div>
                    </div>
                  </div>
                </div>

                {/* Capabilities List */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-3">Key Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {activeModalProject.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-3">Validated Operational Metrics</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {activeModalProject.metrics.map((m) => (
                      <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <div className="text-xl font-bold text-luxury-gold">{m.value}</div>
                        <div className="text-[11px] text-luxury-silver mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry Use Cases */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-2">Primary Use Cases</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.useCases.map((uc) => (
                      <span key={uc} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Tech Stack */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-2">Technology Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-mono text-luxury-champagne border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-luxury-silver text-center sm:text-left">
                  Ready to adapt this architecture for your workflow?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 justify-center flex-1 sm:flex-initial"
                    >
                      <span>Live Interface</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href="https://calendly.com/aidynamicpro/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-2 justify-center flex-1 sm:flex-initial"
                  >
                    <span>Deploy This System</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
