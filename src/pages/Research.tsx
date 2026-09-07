import { useEffect } from 'react'
import { ArrowLeft, Microscope, ArrowRight, Brain, Eye, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const researchAreas = [
  {
    icon: Brain,
    title: 'Psychographic Profiling',
    description: 'Deep analysis of customer motivations, fears, and desires beyond demographics.',
  },
  {
    icon: Eye,
    title: 'Behavioral Tracking',
    description: 'Monitor how customers interact with your brand across all touchpoints.',
  },
  {
    icon: Target,
    title: 'Predictive Intent',
    description: 'Identify customers who are ready to buy before they even search.',
  },
]

export default function Research() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="AI Research — Know Your Customer Better"
        description="Deep learning models analyze customer behavior, sentiment, and purchasing patterns."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm font-medium mb-8">
            <Microscope className="w-4 h-4" />
            AI Research
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            AI <span className="text-pink-400">Research</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Know your customer better than they know themselves. 
            Deep learning models analyze behavior, sentiment, and purchasing patterns.
          </p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {researchAreas.map((area) => (
              <div key={area.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-pink-500/50 transition-all">
                <area.icon className="w-12 h-12 text-pink-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-white/60">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Understand Your Market</h2>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-all"
          >
            Book Free Research Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
