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
    },
  ]

  return (
    <section id="case-studies" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark-50 to-dark">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.5) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">Real Results,</span>{' '}
            <span className="text-luxury-gold">Real Impact</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-3xl mx-auto">
            See how we have helped businesses transform their operations with AI.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-luxury-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                
                {/* Industry Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-luxury-gold/30 bg-dark/80 backdrop-blur-sm text-xs text-luxury-champagne">
                  <caseItem.icon className="w-3.5 h-3.5 text-luxury-gold" />
                  {caseItem.industry}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-luxury-champagne transition-colors">
                    {caseItem.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-luxury-silver group-hover:text-luxury-gold transition-colors" />
                </div>
                <p className="text-luxury-silver text-sm leading-relaxed mb-6">
                  {caseItem.description}
                </p>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {caseItem.results.map((result) => (
                    <div key={result.label} className="text-center">
                      <div className="text-lg font-bold text-luxury-gold">{result.value}</div>
                      <div className="text-xs text-luxury-silver">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
