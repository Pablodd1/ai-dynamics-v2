import { useEffect } from 'react'
import { ArrowLeft, FlaskConical, ArrowRight, BarChart3, Users, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const capabilities = [
  {
    icon: BarChart3,
    title: 'Market Simulation',
    description: 'Model competitive dynamics, pricing wars, and market entry scenarios.',
  },
  {
    icon: Users,
    title: 'Customer Behavior',
    description: 'Simulate how different customer segments respond to your product changes.',
  },
  {
    icon: Globe,
    title: 'Geographic Expansion',
    description: 'Test expansion strategies before committing real resources.',
  },
]

export default function ZeroG() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="Zero-G Platform — Business Simulation Engine"
        description="Simulate business scenarios in zero-gravity environments. Test strategies before you spend."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-8">
            <FlaskConical className="w-4 h-4" />
            Simulation Technology
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Zero-<span className="text-orange-400">G</span> Platform
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Test business strategies in a risk-free simulation environment. 
            Run 10,000 scenarios before spending a single dollar.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <cap.icon className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                <p className="text-white/60">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Simulate Before You Spend</h2>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-all"
          >
            Book Free Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
