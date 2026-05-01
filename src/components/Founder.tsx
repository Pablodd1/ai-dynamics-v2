import { motion } from 'framer-motion'
import { Stethoscope, Briefcase, Building2, User } from 'lucide-react'

const Founder = () => {
  return (
    <section id="founder" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
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
                <div className="text-center">
                  <User className="w-20 h-20 text-luxury-gold/40 mx-auto mb-4" />
                  <p className="text-sm text-luxury-silver">CEO Photo</p>
                  <p className="text-xs text-luxury-silver/60 mt-1">Replace with your image</p>
                </div>
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
              I started AI Dynamics after seeing how much time healthcare practices waste on paperwork. 
              Now I help businesses across every industry reclaim those hours with smart automation.
            </p>
            <p className="text-luxury-silver leading-relaxed">
              With a background in healthcare operations and deep technical expertise, I bridge the gap 
              between what AI can do and what your business actually needs. No jargon. No overpromising. 
              Just systems that work.
            </p>

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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder
