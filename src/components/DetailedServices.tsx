import { motion } from 'framer-motion'
import { MessageSquare, FileText, BarChart3, Workflow, Bot, Shield } from 'lucide-react'

const DetailedServices = () => {

  const services = [
    {
      icon: Bot,
      title: 'AI Process Automation',
      description: 'Transform repetitive manual tasks into automated workflows. We identify bottlenecks in your operations and deploy AI agents that work 24/7 without errors.',
      features: [
        'Data entry automation (99%+ accuracy)',
        'Document processing & extraction',
        'Email triage & auto-response',
        'Report generation in seconds',
      ],
      benefit: 'Save 20+ hours/week per employee',
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Customer Service',
      description: 'Deploy AI chatbots and virtual assistants that handle customer inquiries, schedule appointments, and provide instant support in multiple languages.',
      features: [
        '24/7 multilingual chatbot deployment',
        'Smart lead qualification',
        'Appointment scheduling automation',
        'Sentiment analysis & escalation',
      ],
      benefit: 'Reduce response time by 90%',
      color: 'from-accent to-accent-700',
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'AI-powered document analysis that reads, understands, and extracts information from contracts, invoices, forms, and medical records automatically.',
      features: [
        'OCR + NLP data extraction',
        'Contract review & risk analysis',
        'Invoice processing automation',
        'Compliance document management',
      ],
      benefit: 'Process 1000+ documents/day',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'Turn your business data into actionable insights. Our AI models analyze historical patterns to predict trends, optimize inventory, and forecast revenue.',
      features: [
        'Sales forecasting & pipeline analysis',
        'Customer churn prediction',
        'Inventory optimization',
        'Revenue trend analysis',
      ],
      benefit: 'Improve forecasting accuracy by 85%',
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: Workflow,
      title: 'Workflow Optimization',
      description: 'Map, analyze, and optimize your business processes. We identify inefficiencies and implement streamlined workflows that reduce costs and improve quality.',
      features: [
        'Process mapping & analysis',
        'Bottleneck identification',
        'Workflow automation design',
        'Performance monitoring dashboards',
      ],
      benefit: 'Increase operational efficiency by 60%',
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      icon: Shield,
      title: 'AI Governance & Compliance',
      description: 'Ensure your AI implementations meet regulatory requirements. We provide frameworks for ethical AI, data privacy, and industry-specific compliance.',
      features: [
        'HIPAA compliance for healthcare',
        'Data privacy impact assessments',
        'AI ethics framework implementation',
        'Audit trails & documentation',
      ],
      benefit: '100% compliance guaranteed',
      color: 'from-emerald-500 to-emerald-700',
    },
  ]

  return (
    <section id="detailed-services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-white">AI Solutions That </span>
            <span className="gradient-text">Drive Results</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From automation to analytics, we deliver end-to-end AI solutions 
            tailored to your business needs.
          </p>
        </motion.div>

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
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10 text-sm font-medium text-white`}>
                  {service.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailedServices
