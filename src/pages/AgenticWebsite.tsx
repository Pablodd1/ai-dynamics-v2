import { useEffect } from 'react'
import { ArrowLeft, Bot, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const features = [
  'Self-learning content optimization',
  'Real-time A/B testing',
  'Visitor behavior analysis',
  'Auto-generated meta tags',
  'Dynamic CTA placement',
  'Conversion rate tracking',
]

export default function AgenticWebsite() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SEO
        title="Agentic Websites — Self-Optimizing Web Presence"
        description="Websites that learn from visitors and auto-optimize for conversions without human intervention."
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
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
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8">
            <Bot className="w-4 h-4" />
            Agentic Technology
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Agentic <span className="text-purple-400">Websites</span>
          </h1>
          <p className="text-xl text-white/60 mb-8">
            Your website should work as hard as you do. Our agentic sites learn from every visitor, 
            test variations automatically, and optimize for conversions 24/7.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>5 min read</span>
            <span>•</span>
            <span>Technology</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">What Makes a Website "Agentic"?</h2>
            <p className="text-white/60 leading-relaxed">
              Traditional websites are static. They show the same content to every visitor, regardless of 
              their behavior, preferences, or stage in the buying journey. Agentic websites are different — 
              they adapt in real-time based on who's visiting.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Key Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Observe</h4>
                  <p className="text-white/60">Track visitor behavior — clicks, scroll depth, time on page, mouse movements.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Learn</h4>
                  <p className="text-white/60">AI models identify patterns that lead to conversions vs. bounces.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Optimize</h4>
                  <p className="text-white/60">Automatically adjust headlines, CTAs, images, and layout for each visitor segment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Real Results</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">+47%</div>
                <div className="text-white/60">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">-32%</div>
                <div className="text-white/60">Bounce Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">3.2x</div>
                <div className="text-white/60">ROI Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Self-Optimizing Website?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Book a free consultation and see how agentic technology can transform your web presence.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
