import { useEffect } from 'react'
import { ArrowLeft, BookOpen, Bot, Search, BarChart3, FlaskConical, Microscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const blogPosts = [
  {
    id: 'agentic-website',
    title: 'Agentic Websites: The Future of Self-Optimizing Web Presence',
    excerpt: 'Websites that learn from visitors, auto-optimize content, and improve conversion rates without human intervention.',
    icon: Bot,
    color: 'from-purple-500 to-indigo-600',
    readTime: '5 min',
    category: 'Technology',
  },
  {
    id: 'ai-seo',
    title: 'AI SEO: How Machine Learning Dominates Search Rankings',
    excerpt: 'Search engines now use AI to rank content. We use AI to beat them at their own game.',
    icon: Search,
    color: 'from-blue-500 to-cyan-600',
    readTime: '7 min',
    category: 'Marketing',
  },
  {
    id: 'zero-g',
    title: 'Zero-G Platform: Simulating Business Growth in Zero Gravity',
    excerpt: 'Our proprietary simulation engine models market dynamics, customer behavior, and competitive forces.',
    icon: FlaskConical,
    color: 'from-orange-500 to-red-600',
    readTime: '6 min',
    category: 'Product',
  },
  {
    id: 'simulation',
    title: 'Business Simulation: Test Strategies Before You Spend',
    excerpt: 'Run 10,000 simulations of your business decisions before committing real resources.',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-600',
    readTime: '4 min',
    category: 'Strategy',
  },
  {
    id: 'research',
    title: 'AI-Powered Market Research: Know Your Customer Better Than They Know Themselves',
    excerpt: 'Deep learning models analyze social sentiment, purchasing patterns, and emerging trends.',
    icon: Microscope,
    color: 'from-pink-500 to-rose-600',
    readTime: '8 min',
    category: 'Research',
  },
]

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="Blog — AI Insights & Automation Strategies"
        description="Latest insights on AI automation, agentic websites, SEO, and business growth strategies."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <Link to="/booking" className="text-white/70 hover:text-white transition-colors text-sm">
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
            <BookOpen className="w-4 h-4" />
            AI Insights
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Latest from the <span className="text-purple-400">Lab</span>
          </h1>
          <p className="text-xl text-white/60">
            We write about what we build. No fluff, just real automation strategies.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/${post.id}`}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                  <post.icon className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs">
                      {post.category}
                    </span>
                    <span className="text-white/40 text-xs">{post.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want to implement these strategies?
          </h2>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
