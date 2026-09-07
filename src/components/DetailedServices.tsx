import { motion } from 'framer-motion'
import { MessageSquare, FileText, BarChart3, Workflow, Bot, Shield, TrendingUp } from 'lucide-react'

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
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
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
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
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
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
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
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
    },
    {
      icon: Workflow,
      title: 'Workflow Integration',
      description: 'Seamlessly connect your existing tools and systems. We integrate with 5000+ apps including Salesforce, HubSpot, Slack, and your custom software.',
      features: [
        'CRM & ERP integration',
        'Slack/Teams notifications',
        'API development & management',
        'Legacy system modernization',
      ],
      benefit: 'Connect your entire tech stack',
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
    },
    {
      icon: TrendingUp,
      title: 'Viral Content Automation',
      description: 'AI-powered content engine that generates, schedules, and posts viral content across LinkedIn and Instagram. Never run out of content ideas again.',
      features: [
        'AI-generated content calendar (30 days)',
        'Auto-post to LinkedIn & Instagram',
        'Hook/trend analysis for virality',
        'Performance tracking dashboard',
      ],
      benefit: '3x engagement without hiring a social team',
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'Enterprise-grade security with HIPAA, SOC 2, and GDPR compliance built in. Your data is encrypted, audited, and protected at every layer.',
      features: [
        'HIPAA-compliant AI solutions',
        'End-to-end AES-256 encryption',
        'Audit logging & access controls',
        'SOC 2 Type II certified',
      ],
      benefit: 'Enterprise security from day one',
      color: 'border-luxury-gold/30',
      bgColor: 'bg-luxury-gold/5',
    },
  ]

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            <span className="text-white">AI Solutions, </span>
            <span className="text-luxury-gold">Real Results</span>
          </h2>
          <p className="text-xl text-luxury-silver max-w-3xl mx-auto">
            End-to-end AI automation for businesses that want to move faster, reduce costs, and scale without hiring.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-luxury-gold/40 hover:bg-luxury-gold/[0.03] transition-all duration-500"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl border ${service.color} ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-luxury-gold" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-luxury-silver text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-luxury-silver">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Benefit Badge */}
              <div className="inline-block px-4 py-2 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-xs text-luxury-champagne font-medium">
                {service.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailedServices
