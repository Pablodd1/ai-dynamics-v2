import { motion } from 'framer-motion'
import { Search, Lightbulb, Code, Rocket, Headphones } from 'lucide-react'

const Process = () => {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Discovery Audit',
      description: 'We analyze your current workflows, identify automation opportunities, and map out your processes. Free 30-minute consultation included.',
      duration: 'Week 1',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      number: '02',
      title: 'Strategy & Design',
      description: 'We design a custom AI solution tailored to your specific needs, with detailed roadmap, timeline, and ROI projections.',
      duration: 'Week 1-2',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      number: '03',
      title: 'Implementation',
      description: 'Our team builds and integrates your AI solution, connecting with your existing tools and systems. Minimal disruption to operations.',
      duration: 'Week 2-4',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Rocket,
      number: '04',
      title: 'Launch & Training',
      description: 'We deploy your solution, train your team, and ensure everyone is confident using the new automated workflows.',
      duration: 'Week 4',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Headphones,
      number: '05',
      title: 'Ongoing Support',
      description: 'Continuous monitoring, optimization, and support. We iterate based on your feedback and evolving business needs.',
      duration: 'Ongoing',
      color: 'from-primary-500 to-primary-700',
    },
  ]

  return (
    <section id="process" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark/95 to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Simple Process, </span>
            <span className="gradient-text">Powerful Results</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From first call to full automation in 30 days. No technical team required.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent/50 to-transparent hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-medium mb-4`}>
                    {step.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    <span className="text-primary-400">{step.number}</span> {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
