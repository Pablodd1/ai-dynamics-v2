import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, Stethoscope, ShoppingCart, Scale } from 'lucide-react'

const CaseStudies = () => {
  const cases = [
    {
      icon: Building2,
      industry: 'Financial Services',
      title: 'AI-Powered Risk Assessment',
      description: 'Implemented a machine learning model that reduced loan default prediction time from 3 days to 5 minutes with 94% accuracy.',
      results: [
        { label: 'Processing Time', value: '-95%' },
        { label: 'Accuracy', value: '94%' },
        { label: 'Cost Savings', value: '$2M/year' },
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Stethoscope,
      industry: 'Healthcare',
      title: 'Medical Diagnosis Assistant',
      description: 'Developed an AI system that analyzes medical imaging to assist radiologists in detecting anomalies faster and more accurately.',
      results: [
        { label: 'Detection Rate', value: '+32%' },
        { label: 'Time Saved', value: '4hrs/day' },
        { label: 'Patients Helped', value: '10K+' },
      ],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: ShoppingCart,
      industry: 'E-commerce',
      title: 'Personalization Engine',
      description: 'Built a recommendation system that increased average order value by 35% through personalized product suggestions.',
      results: [
        { label: 'Revenue Increase', value: '+35%' },
        { label: 'Conversion Rate', value: '+28%' },
        { label: 'Customer LTV', value: '+42%' },
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Scale,
      industry: 'Legal Services',
      title: 'Contract Analysis Automation',
      description: 'Created an AI tool that reviews and analyzes legal contracts, identifying risks and key terms in seconds.',
      results: [
        { label: 'Review Time', value: '-90%' },
        { label: 'Accuracy', value: '98%' },
        { label: 'Documents/Month', value: '5K+' },
      ],
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="case-studies" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-primary-950/10 to-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Real Results,</span>{' '}
            <span className="gradient-text">Real Impact</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we have helped businesses across industries achieve 
            transformative results with custom AI solutions.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${caseStudy.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <caseStudy.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-white/80 font-medium">{caseStudy.industry}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{caseStudy.title}</h3>
                  <p className="text-white/80 text-sm mb-6 line-clamp-2">{caseStudy.description}</p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {caseStudy.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <div className="text-xl font-bold text-white">{result.value}</div>
                        <div className="text-xs text-white/60">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-white font-medium group/link"
                  >
                    Read Full Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Start Your Project
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies
