import { useEffect } from 'react'
import { ArrowLeft, Search, ArrowRight, TrendingUp, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const strategies = [
  {
    icon: Target,
    title: 'Intent-Based Optimization',
    description: 'We optimize for what users actually want, not just keywords they type.',
  },
  {
    icon: Zap,
    title: 'Real-Time Adaptation',
    description: 'Content automatically adjusts based on trending topics and search algorithm changes.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Rankings',
    description: 'ML models predict which content will rank before we even publish it.',
  },
]

export default function AISeo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="AI SEO — Machine Learning Search Optimization"
        description="We use AI to predict, create, and optimize content that dominates search rankings."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Blog</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
            <Search className="w-4 h-4" />
            AI-Powered SEO
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            AI <span className="text-blue-400">SEO</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Search engines use AI to rank content. We use AI to beat them at their own game.
          </p>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
                <strategy.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{strategy.title}</h3>
                <p className="text-white/60">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Dominate Search Rankings</h2>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Book Free SEO Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
