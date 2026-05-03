import { motion } from 'framer-motion'
import { Stethoscope, Briefcase, Building2 } from 'lucide-react'

const Founder = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Meet the Founder
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl border border-luxury-gold/30 bg-dark-50 overflow-hidden flex items-center justify-center">
                <img 
                  src="/founder.jpg" 
                  alt="Jasmel Acosta - Founder of AI Dynamic Pro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-luxury-gold text-dark text-xs font-bold uppercase tracking-wider">
                CEO, AI Dynamics
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
              I'm <span className="text-luxury-gold">Jasmel</span>
            </h2>
            <p className="text-lg text-luxury-silver leading-relaxed">
              After 15+ years building tech solutions for healthcare and small businesses, I founded AI Dynamics to bridge the gap between cutting-edge AI and real-world business results.
            </p>
            <p className="text-luxury-silver leading-relaxed">
              We don't sell buzzwords — we deploy working systems that cut costs, save time, and scale your operations without adding headcount. Every automation we build is designed around one question: <strong className="text-white">"Does this make you money or save you time?"</strong> If the answer isn't yes, we don't build it.
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-4 flex-wrap">
              {[
                { value: '50+', label: 'AI Deployments' },
                { value: '$2M+', label: 'Revenue Impact' },
                { value: '14 Days', label: 'Avg. Deployment' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-luxury-gold">{stat.value}</div>
                  <div className="text-xs text-luxury-silver/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Credibility badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { icon: Stethoscope, label: 'Healthcare Background' },
                { icon: Briefcase, label: 'Business Operations' },
                { icon: Building2, label: 'Tech + Industry Expert' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-sm text-luxury-champagne"
                >
                  <badge.icon className="w-4 h-4 text-luxury-gold" />
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a href="https://www.linkedin.com/in/ai-dynamic-75983a407/" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-gold transition-colors text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="https://twitter.com/jasmelacosta" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-gold transition-colors text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                X / Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder
