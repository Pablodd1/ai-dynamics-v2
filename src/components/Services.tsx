import { motion } from 'framer-motion'
import { 
  Bot, 
  Brain, 
  Workflow, 
  Shield, 
  LineChart, 
  MessageSquare,
  ArrowRight
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: 'Custom AI Integration',
      description: 'Seamlessly integrate AI into your existing workflows. We build custom solutions that connect with your current systems without disruption.',
      features: ['API Development', 'Legacy System Integration', 'Real-time Processing', 'Scalable Architecture'],
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      icon: Brain,
      title: 'AGI & LLM Solutions',
      description: 'Leverage the power of Large Language Models and emerging AGI technologies. From GPT integration to custom model training.',
      features: ['GPT-4 Integration', 'Custom Model Training', 'Prompt Engineering', 'Fine-tuning'],
      gradient: 'from-accent to-accent-700',
    },
    {
      icon: Workflow,
      title: 'AI-Driven Automation',
      description: 'Automate repetitive tasks and complex workflows with intelligent systems that learn and improve over time.',
      features: ['Process Automation', 'Document Processing', 'Data Extraction', 'Smart Workflows'],
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      icon: LineChart,
      title: 'Predictive Analytics',
      description: 'Transform your data into actionable insights. Our AI models predict trends, identify opportunities, and optimize decisions.',
      features: ['Demand Forecasting', 'Risk Assessment', 'Customer Insights', 'Market Analysis'],
      gradient: 'from-pink-500 to-pink-700',
    },
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Deploy intelligent chatbots and virtual assistants that understand context, learn from interactions, and deliver human-like experiences.',
      features: ['Chatbots', 'Voice Assistants', 'Multi-language Support', 'Sentiment Analysis'],
      gradient: 'from-cyan-500 to-cyan-700',
    },
    {
      icon: Shield,
      title: 'AI Security & Compliance',
      description: 'Ensure your AI implementations are secure, ethical, and compliant with industry regulations and standards.',
      features: ['Data Privacy', 'Model Security', 'Compliance Audits', 'Ethical AI Framework'],
      gradient: 'from-emerald-500 to-emerald-700',
    },
  ]

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Comprehensive</span>{' '}
            <span className="gradient-text">AI Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From strategy to implementation, we provide end-to-end AI services 
            tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl glass gradient-border overflow-hidden transition-all duration-500 hover:bg-white/10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>

                {/* Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient} opacity-5`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
