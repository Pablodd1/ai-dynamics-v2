import { useEffect } from 'react'
import { ArrowLeft, BarChart3, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const simulations = [
  {
    title: 'Pricing Strategy',
    description: 'Test different pricing models and their impact on revenue and customer acquisition.',
    scenarios: 5000,
  },
  {
    title: 'Market Entry',
    description: 'Simulate entering new markets with different budget levels and timing.',
    scenarios: 3000,
  },
  {
    title: 'Product Launch',
    description: 'Model product launch scenarios with varying marketing spend and feature sets.',
    scenarios: 4000,
  },
]

export default function Simulation() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="AI Simulation — Test Strategies Before You Spend"
        description="Run thousands of business simulations to find the optimal strategy before committing real resources."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium mb-8">
            <BarChart3 className="w-4 h-4" />
            Business Simulation
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            AI <span className="text-green-400">Simulation</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Run 10,000 simulations of your business decisions. Find the optimal path before spending real money.
          </p>
        </div>
      </section>

      {/* Simulations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {simulations.map((sim) => (
              <div key={sim.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-8 h-8 text-green-400" />
                  <Pause className="w-8 h-8 text-white/30" />
                  <RotateCcw className="w-8 h-8 text-white/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{sim.title}</h3>
                <p className="text-white/60 mb-4">{sim.description}</p>
                <div className="text-green-400 text-sm font-medium">
                  {sim.scenarios.toLocaleString()} scenarios
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Test Before You Invest</h2>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
          >
            Book Free Simulation Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
