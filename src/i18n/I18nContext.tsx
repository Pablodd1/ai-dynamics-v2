import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'en' | 'es' | 'ru'

interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Common
    nav: {
      services: 'Services',
      caseStudies: 'Case Studies',
      about: 'About',
      contact: 'Contact',
      getStarted: 'Get Started',
    },
    // Hero Section
    hero: {
      badge: 'Transforming Businesses with AI Since 2020',
      title1: 'Transform Your',
      title2: 'Business with AI',
      subtitle: 'Harness the power of artificial intelligence to drive growth, efficiency, and innovation. We build custom AI solutions that deliver measurable results.',
      ctaPrimary: 'Start Your AI Journey',
      ctaSecondary: 'View Case Studies',
      feature1: 'Custom AI Models',
      feature2: 'Enterprise Integration',
      feature3: 'Real-time Processing',
    },
    // Chat Widget
    chat: {
      title: 'AI Assistant',
      online: 'Online now',
      placeholder: 'Ask about AI solutions...',
      greeting: "Hello! I'm an AI assistant. Ask me how AI can transform your business!",
      response1: 'I can help automate your workflows, saving up to 40% in operational costs!',
      response2: 'Our custom AI solutions can analyze your data and predict market trends.',
      response3: 'We can build a chatbot like me to handle 70% of your customer inquiries 24/7.',
      response4: 'AI-powered document processing can reduce review time by 90%.',
    },
    // Services Section
    services: {
      badge: 'Our Services',
      title1: 'Comprehensive',
      title2: 'AI Solutions',
      subtitle: 'From strategy to implementation, we provide end-to-end AI services tailored to your business needs.',
      learnMore: 'Learn More',
      // Service 1
      service1: {
        title: 'Custom AI Integration',
        description: 'Seamlessly integrate AI into your existing workflows. We build custom solutions that connect with your current systems without disruption.',
        feature1: 'API Development',
        feature2: 'Legacy System Integration',
        feature3: 'Real-time Processing',
        feature4: 'Scalable Architecture',
      },
      // Service 2
      service2: {
        title: 'AGI & LLM Solutions',
        description: 'Leverage the power of Large Language Models and emerging AGI technologies. From GPT integration to custom model training.',
        feature1: 'GPT-4 Integration',
        feature2: 'Custom Model Training',
        feature3: 'Prompt Engineering',
        feature4: 'Fine-tuning',
      },
      // Service 3
      service3: {
        title: 'AI-Driven Automation',
        description: 'Automate repetitive tasks and complex workflows with intelligent systems that learn and improve over time.',
        feature1: 'Process Automation',
        feature2: 'Document Processing',
        feature3: 'Data Extraction',
        feature4: 'Smart Workflows',
      },
      // Service 4
      service4: {
        title: 'Predictive Analytics',
        description: 'Transform your data into actionable insights. Our AI models predict trends, identify opportunities, and optimize decisions.',
        feature1: 'Demand Forecasting',
        feature2: 'Risk Assessment',
        feature3: 'Customer Insights',
        feature4: 'Market Analysis',
      },
      // Service 5
      service5: {
        title: 'Conversational AI',
        description: 'Deploy intelligent chatbots and virtual assistants that understand context, learn from interactions, and deliver human-like experiences.',
        feature1: 'Chatbots',
        feature2: 'Voice Assistants',
        feature3: 'Multi-language Support',
        feature4: 'Sentiment Analysis',
      },
      // Service 6 - NEW: Claw Agent Installation
      service6: {
        title: 'Claw AI Agent Deployment',
        description: 'Install and configure OpenClaw, Hermes, and enterprise AI agents for your organization. We deploy intelligent agent systems that automate complex business operations.',
        feature1: 'OpenClaw Installation',
        feature2: 'Hermes Agent Setup',
        feature3: 'Enterprise Claw Agents',
        feature4: 'Multi-Agent Orchestration',
      },
    },
    // Stats Section
    stats: {
      stat1: '150+',
      stat1Label: 'AI Projects Delivered',
      stat2: '98%',
      stat2Label: 'Client Satisfaction',
      stat3: '40%',
      stat3Label: 'Average Cost Reduction',
      stat4: '24/7',
      stat4Label: 'AI Support',
    },
    // Case Studies Section
    caseStudies: {
      badge: 'Success Stories',
      title1: 'Proven',
      title2: 'Results',
      subtitle: 'See how we have helped businesses across industries achieve transformative outcomes with AI.',
      cta: 'Read Full Case Study',
      // Case 1
      case1: {
        industry: 'Financial Services',
        title: 'Automated Risk Assessment',
        description: 'Implemented ML models that reduced loan approval time from 5 days to 2 hours.',
        result: '85% Faster Processing',
      },
      // Case 2
      case2: {
        industry: 'Healthcare',
        title: 'AI-Powered Diagnostics',
        description: 'Built computer vision system for medical imaging analysis with 99.2% accuracy.',
        result: '99.2% Accuracy Rate',
      },
      // Case 3
      case3: {
        industry: 'E-commerce',
        title: 'Dynamic Pricing Engine',
        description: 'Developed real-time pricing optimization system increasing profit margins by 23%.',
        result: '+23% Profit Margin',
      },
      // Case 4
      case4: {
        industry: 'Legal',
        title: 'Document Automation',
        description: 'Created NLP pipeline for contract review reducing analysis time by 90%.',
        result: '90% Time Saved',
      },
    },
    // Testimonials Section
    testimonials: {
      badge: 'Client Testimonials',
      title1: 'What Our',
      title2: 'Clients Say',
    },
    // Contact Section
    contact: {
      badge: 'Get In Touch',
      title1: 'Ready to Transform',
      title2: 'Your Business?',
      subtitle: "Let's discuss how AI Dynamics can help you achieve your goals. Book a free consultation with our AI experts.",
      infoTitle: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      availability: 'Availability',
      availabilityValue: '24/7 Support',
      responseTime: 'Typically replies in 2 hours',
      responseText: 'Our team is ready to discuss your AI project and provide a free consultation.',
      formTitle: 'Send us a Message',
      name: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@company.com',
      company: 'Company',
      companyPlaceholder: 'Your Company',
      message: 'Message',
      messagePlaceholder: 'Tell us about your AI project...',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successMessage: "Thank you for reaching out. We'll get back to you within 2 hours.",
    },
    // Footer
    footer: {
      description: 'Transforming businesses with cutting-edge AI solutions. We build intelligent systems that drive growth and innovation.',
      services: 'Services',
      company: 'Company',
      resources: 'Resources',
      rights: 'All rights reserved.',
      // About page content
      about: {
        title: 'About AI Dynamics',
        subtitle: 'Led by CEO Jasmel Acosta, we specialize in AI consulting and enterprise agent deployment.',
        ceo: 'Jasmel Acosta',
        ceoTitle: 'CEO & Founder',
        mission: 'Our Mission',
        missionText: 'To democratize artificial intelligence by making advanced AI solutions accessible to businesses of all sizes. We believe every company deserves the transformative power of AI.',
      },
    },
    // Language Selector
    language: {
      title: 'Language',
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
  },
  es: {
    // Navigation & Common
    nav: {
      services: 'Servicios',
      caseStudies: 'Casos de Éxito',
      about: 'Nosotros',
      contact: 'Contacto',
      getStarted: 'Comenzar',
    },
    // Hero Section
    hero: {
      badge: 'Transformando Negocios con IA desde 2020',
      title1: 'Transforma tu',
      title2: 'Negocio con IA',
      subtitle: 'Aprovecha el poder de la inteligencia artificial para impulsar el crecimiento, la eficiencia y la innovación. Creamos soluciones de IA personalizadas que generan resultados medibles.',
      ctaPrimary: 'Inicia tu Viaje con IA',
      ctaSecondary: 'Ver Casos de Éxito',
      feature1: 'Modelos de IA Personalizados',
      feature2: 'Integración Empresarial',
      feature3: 'Procesamiento en Tiempo Real',
    },
    // Chat Widget
    chat: {
      title: 'Asistente de IA',
      online: 'En línea',
      placeholder: 'Pregunta sobre soluciones de IA...',
      greeting: '¡Hola! Soy un asistente de IA. ¡Pregúntame cómo la IA puede transformar tu negocio!',
      response1: '¡Puedo ayudarte a automatizar tus flujos de trabajo, ahorrando hasta un 40% en costos operativos!',
      response2: 'Nuestras soluciones de IA personalizadas pueden analizar tus datos y predecir tendencias del mercado.',
      response3: 'Podemos construir un chatbot como yo para manejar el 70% de las consultas de tus clientes 24/7.',
      response4: 'El procesamiento de documentos con IA puede reducir el tiempo de revisión en un 90%.',
    },
    // Services Section
    services: {
      badge: 'Nuestros Servicios',
      title1: 'Soluciones de IA',
      title2: 'Completas',
      subtitle: 'Desde la estrategia hasta la implementación, proporcionamos servicios de IA integrales adaptados a las necesidades de tu negocio.',
      learnMore: 'Saber Más',
      service1: {
        title: 'Integración de IA Personalizada',
        description: 'Integra IA perfectamente en tus flujos de trabajo existentes. Creamos soluciones personalizadas que se conectan con tus sistemas actuales sin interrupciones.',
        feature1: 'Desarrollo de APIs',
        feature2: 'Integración de Sistemas Legacy',
        feature3: 'Procesamiento en Tiempo Real',
        feature4: 'Arquitectura Escalable',
      },
      service2: {
        title: 'Soluciones AGI y LLM',
        description: 'Aprovecha el poder de los Modelos de Lenguaje Grande y las tecnologías AGI emergentes. Desde la integración de GPT hasta el entrenamiento de modelos personalizados.',
        feature1: 'Integración GPT-4',
        feature2: 'Entrenamiento de Modelos Personalizados',
        feature3: 'Ingeniería de Prompts',
        feature4: 'Fine-tuning',
      },
      service3: {
        title: 'Automatización con IA',
        description: 'Automatiza tareas repetitivas y flujos de trabajo complejos con sistemas inteligentes que aprenden y mejoran con el tiempo.',
        feature1: 'Automatización de Procesos',
        feature2: 'Procesamiento de Documentos',
        feature3: 'Extracción de Datos',
        feature4: 'Flujos de Trabajo Inteligentes',
      },
      service4: {
        title: 'Analítica Predictiva',
        description: 'Transforma tus datos en información accionable. Nuestros modelos de IA predicen tendencias, identifican oportunidades y optimizan decisiones.',
        feature1: 'Pronóstico de Demanda',
        feature2: 'Evaluación de Riesgos',
        feature3: 'Insights de Clientes',
        feature4: 'Análisis de Mercado',
      },
      service5: {
        title: 'IA Conversacional',
        description: 'Despliega chatbots inteligentes y asistentes virtuales que entienden el contexto, aprenden de las interacciones y brindan experiencias similares a las humanas.',
        feature1: 'Chatbots',
        feature2: 'Asistentes de Voz',
        feature3: 'Soporte Multiidioma',
        feature4: 'Análisis de Sentimiento',
      },
      service6: {
        title: 'Despliegue de Agentes Claw IA',
        description: 'Instala y configura OpenClaw, Hermes y agentes de IA empresariales para tu organización. Desplegamos sistemas de agentes inteligentes que automatizan operaciones complejas de negocio.',
        feature1: 'Instalación de OpenClaw',
        feature2: 'Configuración de Hermes',
        feature3: 'Agentes Claw Empresariales',
        feature4: 'Orquestación Multi-Agente',
      },
    },
    // Stats Section
    stats: {
      stat1: '150+',
      stat1Label: 'Proyectos de IA Entregados',
      stat2: '98%',
      stat2Label: 'Satisfacción del Cliente',
      stat3: '40%',
      stat3Label: 'Reducción de Costos Promedio',
      stat4: '24/7',
      stat4Label: 'Soporte de IA',
    },
    // Case Studies Section
    caseStudies: {
      badge: 'Historias de Éxito',
      title1: 'Resultados',
      title2: 'Comprobados',
      subtitle: 'Mira cómo hemos ayudado a empresas de diversas industrias a lograr resultados transformadores con IA.',
      cta: 'Leer Caso Completo',
      case1: {
        industry: 'Servicios Financieros',
        title: 'Evaluación Automatizada de Riesgos',
        description: 'Implementamos modelos de ML que redujeron el tiempo de aprobación de préstamos de 5 días a 2 horas.',
        result: '85% Más Rápido',
      },
      case2: {
        industry: 'Salud',
        title: 'Diagnósticos con IA',
        description: 'Construimos un sistema de visión por computadora para análisis de imágenes médicas con 99.2% de precisión.',
        result: '99.2% de Precisión',
      },
      case3: {
        industry: 'E-commerce',
        title: 'Motor de Precios Dinámicos',
        description: 'Desarrollamos un sistema de optimización de precios en tiempo real que aumentó los márgenes de beneficio en un 23%.',
        result: '+23% Margen de Beneficio',
      },
      case4: {
        industry: 'Legal',
        title: 'Automatización de Documentos',
        description: 'Creamos un pipeline de NLP para revisión de contratos reduciendo el tiempo de análisis en un 90%.',
        result: '90% de Tiempo Ahorrado',
      },
    },
    // Testimonials Section
    testimonials: {
      badge: 'Testimonios de Clientes',
      title1: 'Lo que Dicen',
      title2: 'Nuestros Clientes',
    },
    // Contact Section
    contact: {
      badge: 'Contáctanos',
      title1: '¿Listo para Transformar',
      title2: 'tu Negocio?',
      subtitle: 'Hablemos de cómo AI Dynamics puede ayudarte a alcanzar tus objetivos. Reserva una consulta gratuita con nuestros expertos en IA.',
      infoTitle: 'Información de Contacto',
      email: 'Correo',
      phone: 'Teléfono',
      location: 'Ubicación',
      availability: 'Disponibilidad',
      availabilityValue: 'Soporte 24/7',
      responseTime: 'Típicamente responde en 2 horas',
      responseText: 'Nuestro equipo está listo para discutir tu proyecto de IA y proporcionar una consulta gratuita.',
      formTitle: 'Envíanos un Mensaje',
      name: 'Nombre',
      namePlaceholder: 'Juan Pérez',
      emailLabel: 'Correo',
      emailPlaceholder: 'juan@empresa.com',
      company: 'Empresa',
      companyPlaceholder: 'Tu Empresa',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto de IA...',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      successTitle: '¡Mensaje Enviado!',
      successMessage: 'Gracias por contactarnos. Te responderemos dentro de 2 horas.',
    },
    // Footer
    footer: {
      description: 'Transformando negocios con soluciones de IA de vanguardia. Construimos sistemas inteligentes que impulsan el crecimiento y la innovación.',
      services: 'Servicios',
      company: 'Empresa',
      resources: 'Recursos',
      rights: 'Todos los derechos reservados.',
      about: {
        title: 'Sobre AI Dynamics',
        subtitle: 'Dirigida por el CEO Jasmel Acosta, nos especializamos en consultoría de IA y despliegue de agentes empresariales.',
        ceo: 'Jasmel Acosta',
        ceoTitle: 'CEO y Fundador',
        mission: 'Nuestra Misión',
        missionText: 'Democratizar la inteligencia artificial haciendo que las soluciones avanzadas de IA sean accesibles para empresas de todos los tamaños. Creemos que cada empresa merece el poder transformador de la IA.',
      },
    },
    // Language Selector
    language: {
      title: 'Idioma',
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
  },
  ru: {
    // Navigation & Common
    nav: {
      services: 'Услуги',
      caseStudies: 'Кейсы',
      about: 'О нас',
      contact: 'Контакты',
      getStarted: 'Начать',
    },
    // Hero Section
    hero: {
      badge: 'Трансформируем бизнес с помощью ИИ с 2020 года',
      title1: 'Трансформируйте',
      title2: 'Ваш бизнес с ИИ',
      subtitle: 'Используйте мощь искусственного интеллекта для роста, эффективности и инноваций. Мы создаем индивидуальные ИИ-решения, которые дают измеримые результаты.',
      ctaPrimary: 'Начните путь с ИИ',
      ctaSecondary: 'Смотреть кейсы',
      feature1: 'Индивидуальные ИИ-модели',
      feature2: 'Интеграция для бизнеса',
      feature3: 'Обработка в реальном времени',
    },
    // Chat Widget
    chat: {
      title: 'ИИ-ассистент',
      online: 'Онлайн',
      placeholder: 'Спросите об ИИ-решениях...',
      greeting: 'Здравствуйте! Я ИИ-ассистент. Спросите, как ИИ может трансформировать ваш бизнес!',
      response1: 'Я могу помочь автоматизировать ваши рабочие процессы, сэкономив до 40% операционных расходов!',
      response2: 'Наши индивидуальные ИИ-решения могут анализировать ваши данные и прогнозировать рыночные тенденции.',
      response3: 'Мы можем создать чат-бота, как я, для обработки 70% запросов клиентов 24/7.',
      response4: 'Обработка документов с помощью ИИ может сократить время проверки на 90%.',
    },
    // Services Section
    services: {
      badge: 'Наши услуги',
      title1: 'Комплексные',
      title2: 'ИИ-решения',
      subtitle: 'От стратегии до внедрения — мы предоставляем полный спектр ИИ-услуг, адаптированных под потребности вашего бизнеса.',
      learnMore: 'Подробнее',
      service1: {
        title: 'Индивидуальная интеграция ИИ',
        description: 'Бесшовная интеграция ИИ в существующие рабочие процессы. Мы создаем индивидуальные решения, которые подключаются к вашим текущим системам без сбоев.',
        feature1: 'Разработка API',
        feature2: 'Интеграция legacy-систем',
        feature3: 'Обработка в реальном времени',
        feature4: 'Масштабируемая архитектура',
      },
      service2: {
        title: 'Решения AGI и LLM',
        description: 'Используйте мощь больших языковых моделей и новейших технологий AGI. От интеграции GPT до обучения индивидуальных моделей.',
        feature1: 'Интеграция GPT-4',
        feature2: 'Обучение индивидуальных моделей',
        feature3: 'Prompt Engineering',
        feature4: 'Fine-tuning',
      },
      service3: {
        title: 'Автоматизация на базе ИИ',
        description: 'Автоматизируйте рутинные задачи и сложные рабочие процессы с помощью интеллектуальных систем, которые учатся и совершенствуются.',
        feature1: 'Автоматизация процессов',
        feature2: 'Обработка документов',
        feature3: 'Извлечение данных',
        feature4: 'Умные рабочие процессы',
      },
      service4: {
        title: 'Предиктивная аналитика',
        description: 'Превратите данные в действенные инсайты. Наши ИИ-модели прогнозируют тренды, выявляют возможности и оптимизируют решения.',
        feature1: 'Прогнозирование спроса',
        feature2: 'Оценка рисков',
        feature3: 'Анализ клиентов',
        feature4: 'Анализ рынка',
      },
      service5: {
        title: 'Конверсационный ИИ',
        description: 'Развертывайте интеллектуальные чат-боты и виртуальные ассистенты, которые понимают контекст, учатся на взаимодейхиях и обеспечивают человеческий опыт.',
        feature1: 'Чат-боты',
        feature2: 'Голосовые ассистенты',
        feature3: 'Мультиязычная поддержка',
        feature4: 'Анализ настроений',
      },
      service6: {
        title: 'Развертывание агентов Claw ИИ',
        description: 'Установка и настройка OpenClaw, Hermes и корпоративных ИИ-агентов для вашей организации. Мы разворачиваем системы интеллектуальных агентов, автоматизирующие сложные бизнес-операции.',
        feature1: 'Установка OpenClaw',
        feature2: 'Настройка Hermes',
        feature3: 'Корпоративные агенты Claw',
        feature4: 'Мульти-агентная оркестрация',
      },
    },
    // Stats Section
    stats: {
      stat1: '150+',
      stat1Label: 'ИИ-проектов выполнено',
      stat2: '98%',
      stat2Label: 'Удовлетворенность клиентов',
      stat3: '40%',
      stat3Label: 'Среднее снижение затрат',
      stat4: '24/7',
      stat4Label: 'ИИ-поддержка',
    },
    // Case Studies Section
    caseStudies: {
      badge: 'Истории успеха',
      title1: 'Доказанные',
      title2: 'результаты',
      subtitle: 'Узнайте, как мы помогли компаниям из разных отраслей добиться трансформационных результатов с помощью ИИ.',
      cta: 'Читать полный кейс',
      case1: {
        industry: 'Финансовые услуги',
        title: 'Автоматизированная оценка рисков',
        description: 'Внедрили ML-модели, сократившие время одобрения кредитов с 5 дней до 2 часов.',
        result: 'На 85% быстрее',
      },
      case2: {
        industry: 'Здравоохранение',
        title: 'Диагностика на базе ИИ',
        description: 'Создали систему компьютерного зрения для анализа медицинских изображений с точностью 99.2%.',
        result: '99.2% точности',
      },
      case3: {
        industry: 'E-commerce',
        title: 'Динамическое ценообразование',
        description: 'Разработали систему оптимизации цен в реальном времени, увеличившую прибыль на 23%.',
        result: '+23% к прибыли',
      },
      case4: {
        industry: 'Юридические услуги',
        title: 'Автоматизация документов',
        description: 'Создали NLP-конвейер для проверки контрактов, сократив время анализа на 90%.',
        result: '90% экономии времени',
      },
    },
    // Testimonials Section
    testimonials: {
      badge: 'Отзывы клиентов',
      title1: 'Что говорят',
      title2: 'наши клиенты',
    },
    // Contact Section
    contact: {
      badge: 'Свяжитесь с нами',
      title1: 'Готовы трансформировать',
      title2: 'ваш бизнес?',
      subtitle: 'Давайте обсудим, как AI Dynamics может помочь вам достичь целей. Забронируйте бесплатную консультацию с нашими ИИ-экспертами.',
      infoTitle: 'Контактная информация',
      email: 'Email',
      phone: 'Телефон',
      location: 'Локация',
      availability: 'Доступность',
      availabilityValue: 'Поддержка 24/7',
      responseTime: 'Обычно отвечаем за 2 часа',
      responseText: 'Наша команда готова обсудить ваш ИИ-проект и предоставить бесплатную консультацию.',
      formTitle: 'Отправьте нам сообщение',
      name: 'Имя',
      namePlaceholder: 'Иван Иванов',
      emailLabel: 'Email',
      emailPlaceholder: 'ivan@company.com',
      company: 'Компания',
      companyPlaceholder: 'Ваша компания',
      message: 'Сообщение',
      messagePlaceholder: 'Расскажите о вашем ИИ-проекте...',
      send: 'Отправить',
      sending: 'Отправка...',
      successTitle: 'Сообщение отправлено!',
      successMessage: 'Спасибо за обращение. Мы ответим вам в течение 2 часов.',
    },
    // Footer
    footer: {
      description: 'Трансформация бизнеса с помощью передовых ИИ-решений. Мы создаем интеллектуальные системы, стимулирующие рост и инновации.',
      services: 'Услуги',
      company: 'Компания',
      resources: 'Ресурсы',
      rights: 'Все права защищены.',
      about: {
        title: 'О AI Dynamics',
        subtitle: 'Под руководством CEO Джасмела Акоста мы специализируемся на ИИ-консалтинге и развертывании корпоративных агентов.',
        ceo: 'Джасмел Акоста',
        ceoTitle: 'CEO и основатель',
        mission: 'Наша миссия',
        missionText: 'Демократизировать искусственный интеллект, делая передовые ИИ-решения доступными для бизнеса любого размера. Мы верим, что каждая компания заслуживает трансформирующей силы ИИ.',
      },
    },
    // Language Selector
    language: {
      title: 'Язык',
      en: 'English',
      es: 'Español',
      ru: 'Русский',
    },
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | Translations
  languages: { code: Language; label: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = useCallback(
    (key: string): string | Translations => {
      const keys = key.split('.')
      let value: string | Translations = translations[language]

      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = value[k]
        } else {
          return key // Return key if translation not found
        }
      }

      return value
    },
    [language]
  )

  const languages = [
    { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, label: 'Español', flag: '🇪🇸' },
    { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
  ]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export type { Language }
