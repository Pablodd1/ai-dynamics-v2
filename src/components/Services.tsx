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
import { useI18n } from '../i18n/I18nContext'

const Services = () => {
  const { t } = useI18n()

  const services = [
    {
      icon: Bot,
      title: t('services.service1.title') as string,
      description: t('services.service1.description') as string,
      features: [
        t('services.service1.feature1') as string,
        t('services.service1.feature2') as string,
        t('services.service1.feature3') as string,
        t('services.service1.feature4') as string,
      ],
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      icon: Brain,
      title: t('services.service2.title') as string,
      description: t('services.service2.description') as string,
      features: [
        t('services.service2.feature1') as string,
        t('services.service2.feature2') as string,
        t('services.service2.feature3') as string,
        t('services.service2.feature4') as string,
      ],
      gradient: 'from-accent to-accent-700',
    },
    {
      icon: Workflow,
      title: t('services.service3.title') as string,
      description: t('services.service3.description') as string,
      features: [
        t('services.service3.feature1') as string,
        t('services.service3.feature2') as string,
        t('services.service3.feature3') as string,
        t('services.service3.feature4') as string,
      ],
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      icon: LineChart,
      title: t('services.service4.title') as string,
      description: t('services.service4.description') as string,
      features: [
        t('services.service4.feature1') as string,
        t('services.service4.feature2') as string,
        t('services.service4.feature3') as string,
        t('services.service4.feature4') as string,
      ],
      gradient: 'from-pink-500 to-pink-700',
    },
    {
      icon: MessageSquare,
      title: t('services.service5.title') as string,
      description: t('services.service5.description') as string,
      features: [
        t('services.service5.feature1') as string,
        t('services.service5.feature2') as string,
        t('services.service5.feature3') as string,
        t('services.service5.feature4') as string,
      ],
      gradient: 'from-cyan-500 to-cyan-700',
    },
    {
      icon: Shield,
      title: t('services.service6.title') as string,
      description: t('services.service6.description') as string,
      features: [
        t('services.service6.feature1') as string,
        t('services.service6.feature2') as string,
        t('services.service6.feature3') as string,
        t('services.service6.feature4') as string,
      ],
      gradient: 'from-emerald-500 to-emerald-700',
      isNew: true,
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
            {t('services.badge') as string}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{t('services.title1') as string}</span>{' '}
            <span className="gradient-text">{t('services.title2') as string}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('services.subtitle') as string}
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
                {/* New Badge */}
                {'isNew' in service && service.isNew && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-xs font-semibold text-white">
                    NEW
                  </div>
                )}

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
                  {t('services.learnMore') as string}
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