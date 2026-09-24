import { useState, useEffect } from 'react'
import { ArrowLeft, Bot, Search, BarChart3, FlaskConical, Microscope, PhoneCall, Stethoscope, Scale, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const blogPosts = [
  {
    id: 'blog/ai-phone-receptionist-miami',
    title: 'Why Miami Businesses Are Switching to 24/7 Bilingual AI Phone Receptionists',
    excerpt: 'Over 68% of South Florida callers speak Spanish or switch languages. Discover how voice AI answers on ring zero, schedules appointments, and eliminates $35k/year offshore call centers.',
    icon: PhoneCall,
    color: 'from-emerald-500/20 to-teal-600/30 text-emerald-400 border-emerald-500/40',
    readTime: '8 min',
    category: 'Voice & Receptionists',
    featured: true,
    tag: 'Miami & South Florida',
  },
  {
    id: 'blog/medical-clinic-automation',
    title: 'HIPAA-Compliant AI Automation for South Florida Medical Clinics',
    excerpt: 'How outpatient practices in Miami and Brickell reduce no-shows by 42%, automate insurance card OCR extraction, and eliminate prior authorization bottlenecks.',
    icon: Stethoscope,
    color: 'from-blue-500/20 to-indigo-600/30 text-blue-400 border-blue-500/40',
    readTime: '7 min',
    category: 'Healthcare & Legal',
    featured: true,
    tag: 'HIPAA & Healthcare',
  },
  {
    id: 'blog/legal-intake-automation',
    title: 'From Intake to Retainer: How South Florida Law Firms Close Clients Faster with AI',
    excerpt: 'Reaching a legal lead in under 5 minutes increases signed retainers by 391%. How PI and immigration firms qualify leads and send retainers 24/7.',
    icon: Scale,
    color: 'from-amber-500/20 to-yellow-600/30 text-amber-400 border-amber-500/40',
    readTime: '6 min',
    category: 'Healthcare & Legal',
    featured: false,
    tag: 'Legal Tech',
  },
  {
    id: 'agentic-website',
    title: 'Agentic Websites: The Future of Self-Optimizing Web Presence',
    excerpt: 'Websites that learn from visitors, auto-optimize content, and improve conversion rates dynamically without human intervention.',
    icon: Bot,
    color: 'from-purple-500/20 to-indigo-600/30 text-purple-400 border-purple-500/40',
    readTime: '5 min',
    category: 'AI SEO & Web',
    featured: false,
    tag: 'Web Tech',
  },
  {
    id: 'ai-seo',
    title: 'AI SEO: How Machine Learning Dominates Search Rankings in 2026',
    excerpt: 'Search engines now use LLMs to rank content. Learn how to optimize for Answer Engine Optimization (AEO) and organic visibility.',
    icon: Search,
    color: 'from-cyan-500/20 to-blue-600/30 text-cyan-400 border-cyan-500/40',
    readTime: '7 min',
    category: 'AI SEO & Web',
    featured: false,
    tag: 'SEO & AEO',
  },
  {
    id: 'zero-g',
    title: 'Zero-G Platform: Simulating Business Growth in Zero Gravity',
    excerpt: 'Our proprietary simulation engine models market dynamics, customer behavior, and competitive forces before you allocate capital.',
    icon: FlaskConical,
    color: 'from-orange-500/20 to-red-600/30 text-orange-400 border-orange-500/40',
    readTime: '6 min',
    category: 'Strategy & Labs',
    featured: false,
    tag: 'Proprietary Labs',
  },
  {
    id: 'simulation',
    title: 'Business Simulation: Test Strategies Before You Spend',
    excerpt: 'Run 10,000 simulations of your business decisions before committing real human and financial resources.',
    icon: BarChart3,
    color: 'from-green-500/20 to-emerald-600/30 text-green-400 border-green-500/40',
    readTime: '4 min',
    category: 'Strategy & Labs',
    featured: false,
    tag: 'Strategy',
  },
  {
    id: 'research',
    title: 'AI-Powered Market Research: Deep Customer Intent Discovery',
    excerpt: 'Deep learning models analyze local social sentiment, purchasing patterns, and emerging demographic shifts in Florida.',
    icon: Microscope,
    color: 'from-pink-500/20 to-rose-600/30 text-pink-400 border-pink-500/40',
    readTime: '8 min',
    category: 'Strategy & Labs',
    featured: false,
    tag: 'Analytics',
  },
]

const categories = ['All', 'Voice & Receptionists', 'Healthcare & Legal', 'AI SEO & Web', 'Strategy & Labs']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="Knowledge Hub & Articles | AI Dynamic Pro"
        description="Actionable guides and strategies on 24/7 AI phone receptionists, medical billing automation, legal intake, and custom enterprise AI."
        canonical="https://www.aidynamic.pro/blog"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-sm">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="tel:+17866432099" className="hidden sm:inline text-xs text-luxury-silver hover:text-white">
                Phone: +1 (786) 643-2099
              </a>
              <Link to="/booking" className="btn-primary py-2 px-4 text-xs font-semibold">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-50 via-dark to-dark border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            AI Dynamic Knowledge Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif mb-6 leading-tight">
            Latest Insights from the <span className="text-luxury-gold">Automation Lab</span>
          </h1>
          <p className="text-lg sm:text-xl text-luxury-silver max-w-2xl mx-auto leading-relaxed">
            Real workflows, real numbers, and tested playbooks for businesses in Miami and across North America. No fluff.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-luxury-gold text-dark shadow-md'
                    : 'bg-white/5 border border-white/10 text-luxury-silver hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/${post.id}`}
                className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  post.featured
                    ? 'bg-gradient-to-b from-white/[0.04] to-white/[0.01] border-2 border-luxury-gold/40 shadow-[0_0_30px_rgba(201,169,110,0.1)] hover:border-luxury-gold'
                    : 'bg-white/[0.02] border border-white/10 hover:border-luxury-gold/30 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  {/* Card Header Banner */}
                  <div className={`h-40 bg-gradient-to-br ${post.color} flex items-center justify-between px-6 border-b border-white/5`}>
                    <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <post.icon className="w-6 h-6" />
                    </div>
                    {post.tag && (
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
                        {post.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/20">
                        {post.category}
                      </span>
                      <span className="text-luxury-silver/60 text-xs">{post.readTime} read</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-luxury-champagne transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-luxury-silver text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2 text-xs font-bold text-luxury-gold group-hover:text-white transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-dark-50/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-luxury-gold">Custom Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Want us to build one of these systems for you?
          </h2>
          <p className="text-luxury-silver max-w-xl mx-auto text-sm sm:text-base">
            Every engagement starts with a free 30-minute discovery call where we review your workflows and pinpoint the highest-ROI opportunity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/booking"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book Free Discovery Call
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://calendly.com/aidynamicpro/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl border border-white/10 hover:border-luxury-gold/40 text-luxury-champagne text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              Schedule via Calendly
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
