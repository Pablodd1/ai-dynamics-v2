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
              <a href="https://www.instagram.com/aidynamicspro/" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-gold transition-colors text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder
