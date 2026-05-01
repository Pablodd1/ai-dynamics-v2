import { motion } from 'framer-motion'
import { Clock, ArrowRight, CheckCircle, TrendingDown } from 'lucide-react'

const CaseStudy = () => {
  return (
    <section id="case-study" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark-50 to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Real Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Real Results,</span>{' '}
            <span className="text-luxury-gold">Real Impact</span>
          </h2>
        </motion.div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {/* Top bar */}
            <div className="px-8 py-4 border-b border-white/10 bg-luxury-gold/5">
              <div className="flex items-center gap-2 text-sm text-luxury-champagne">
                <span className="px-3 py-1 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase">
                  Healthcare
                </span>
                <span className="text-luxury-silver">Medical Practice Automation</span>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Problem → Solution → Result */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Problem */}
                <div className="text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl border border-red-400/30 bg-red-400/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Problem</h3>
                  <p className="text-luxury-silver text-sm leading-relaxed">
                    A medical practice was spending <span className="text-white font-semibold">20 hours/week</span> on manual patient intake, data entry, and scheduling.
                  </p>
                </div>

                {/* Arrow (desktop) */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-luxury-gold/40" />
                </div>

                {/* Solution */}
                <div className="text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl border border-luxury-gold/30 bg-luxury-gold/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <CheckCircle className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Solution</h3>
                  <p className="text-luxury-silver text-sm leading-relaxed">
                    We built an end-to-end automation system handling intake forms, data extraction, scheduling, and follow-ups.
                  </p>
                </div>

                {/* Arrow (desktop) */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-luxury-gold/40" />
                </div>

                {/* Result */}
                <div className="text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl border border-green-400/30 bg-green-400/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <TrendingDown className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Result</h3>
                  <p className="text-luxury-silver text-sm leading-relaxed">
                    Now they spend <span className="text-white font-semibold">2 hours/week</span>. That's <span className="text-luxury-gold font-semibold">18 hours back</span> every single week.
                  </p>
                </div>
              </div>

              {/* Big number highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5">
                  <span className="text-6xl md:text-7xl font-bold text-luxury-gold font-serif">18</span>
                  <span className="text-lg text-luxury-champagne mt-2">hours saved per week</span>
                  <span className="text-sm text-luxury-silver mt-1">900+ hours reclaimed per year</span>
                </div>
              </motion.div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <p className="text-luxury-silver mb-4">
                  Want us to build one for you?
                </p>
                <a
                  href="https://aidynamic.pro/booking"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book a free consultation
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudy
