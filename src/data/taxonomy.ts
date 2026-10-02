// Core Capabilities & Skills Taxonomy for AI Dynamic Pro
// Single Source of Truth for 9 Capability Pillars, Skills, and Professional Titles

export type CapabilityPillarId = 
  | 'applied-ai'
  | 'digital-health'
  | 'sports-science'
  | 'spatial-vision'
  | 'voice-conversational'
  | 'data-engineering'
  | 'crm-revops'
  | 'agentic-web-seo'
  | 'commerce-marketplaces'

export interface CapabilityPillar {
  id: CapabilityPillarId
  title: string
  shortTitle: string
  tagline: string
  description: string
  iconName: string
  accentColor: string
  borderColor: string
  bgGlow: string
  badgeText: string
  coreDisciplines: string[]
}

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'applied-ai',
    title: 'Applied AI & Autonomous Agents',
    shortTitle: 'Applied AI & Agents',
    tagline: 'Multi-agent orchestration and human-in-the-loop task execution.',
    description: 'We architect autonomous multi-agent networks, RAG pipelines, and deterministic workflow engines that execute complex multi-step enterprise operations with human-in-the-loop oversight.',
    iconName: 'Bot',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgGlow: 'from-purple-500/10 to-indigo-500/5',
    badgeText: 'Core Engine',
    coreDisciplines: [
      'Multi-Agent Orchestration',
      'Retrieval-Augmented Generation (RAG)',
      'Human-in-the-Loop AI',
      'Confidence Scoring & Guardrails',
      'Structured Data Extraction'
    ]
  },
  {
    id: 'digital-health',
    title: 'Healthcare & Digital Health Systems',
    shortTitle: 'Healthcare & Digital Health',
    tagline: 'HIPAA-compliant clinical automation, intake, and revenue cycle intelligence.',
    description: 'Transforming clinical workflows with AI medical documentation, vision-based insurance OCR, prior authorization tracking, and automated patient engagement integrated with EHR/EMR platforms.',
    iconName: 'Stethoscope',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGlow: 'from-emerald-500/10 to-teal-500/5',
    badgeText: 'HIPAA Compliant',
    coreDisciplines: [
      'Clinical Documentation & Scribing',
      'Insurance Card OCR & Verification',
      'Prior Authorization Automation',
      'Patient Intake & Triage',
      'RPM / RTM Device Telemetry'
    ]
  },
  {
    id: 'sports-science',
    title: 'Sports Science & Human Performance',
    shortTitle: 'Sports Science & Biomechanics',
    tagline: 'Computer-vision pose estimation, gait analysis, and kinematic modeling.',
    description: 'Applying deep vision models to joint tracking, running gait analysis, cycling fit optimization, and wearable data fusion to model training load, recovery, and injury risk.',
    iconName: 'Activity',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgGlow: 'from-amber-500/10 to-yellow-500/5',
    badgeText: 'Kinematics & Vision',
    coreDisciplines: [
      'Real-Time Pose Estimation',
      'Running Gait & Cadence Analysis',
      'Cycling Biomechanical Fit',
      'Wearable Telemetry Fusion',
      'Training Load & Recovery Prediction'
    ]
  },
  {
    id: 'spatial-vision',
    title: 'Computer Vision & Spatial Intelligence',
    shortTitle: 'Computer Vision & Spatial AI',
    tagline: 'Defect inspection, camera/LiDAR 3D room mapping, and digital twins.',
    description: 'Building vision intelligence for property inspection, defect localization, severity classification, mobile 3D scanning, floor-plan generation, spatial measurements, and digital twin reconstruction.',
    iconName: 'Scan',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgGlow: 'from-cyan-500/10 to-blue-500/5',
    badgeText: 'Vision & 3D Spatial',
    coreDisciplines: [
      'Room Defect & Damage Localization',
      'Severity Classification & Ticket Generation',
      'Phone Camera / LiDAR 3D Scanning',
      'Floor-Plan & Dimension Extraction',
      'Digital Twin & Fixture Mapping'
    ]
  },
  {
    id: 'voice-conversational',
    title: 'Voice & Conversational AI',
    shortTitle: 'Voice & Conversational AI',
    tagline: '24/7 bilingual phone receptionists, call routing, and CRM scheduling.',
    description: 'Sub-second latency voice receptionists that answer phone calls, speak fluent English and natural Latin American/Venezuelan Spanish, triage callers, and book appointments directly on live calendars.',
    iconName: 'PhoneCall',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGlow: 'from-emerald-500/10 to-teal-500/5',
    badgeText: '24/7 Phone & Web',
    coreDisciplines: [
      'Bilingual Phone Receptionists (EN/ES)',
      'Sub-Second Telephony Synthesis',
      'Live Calendar & CRM Booking',
      'Emergency Triage & Call Routing',
      'WhatsApp & SMS Dual-Channel Workflows'
    ]
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Market Intelligence',
    shortTitle: 'Data Engineering & Intelligence',
    tagline: 'High-throughput pipelines, entity resolution, and vector search.',
    description: 'Enterprise data pipelines, automated catalog normalization, entity matching, deduplication, vector embeddings, and real-time intelligence dashboards powered by PostgreSQL, Supabase, and BigQuery.',
    iconName: 'Database',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgGlow: 'from-blue-500/10 to-indigo-500/5',
    badgeText: 'Data Infrastructure',
    coreDisciplines: [
      'High-Scale Data Normalization & ETL',
      'Entity Resolution & Deduplication',
      'Vector Search & Embeddings',
      'Real-Time Analytics Dashboards',
      'Automated Market Scraping & Intelligence'
    ]
  },
  {
    id: 'crm-revops',
    title: 'CRM & Business Revenue Operations',
    shortTitle: 'CRM & Business Automation',
    tagline: 'Custom CRM builds, pipeline automation, and multi-channel follow-up.',
    description: 'End-to-end revenue operations systems: custom CRM development, instant AI lead qualification, automated SMS/email sequences, sales pipeline visualizers, and intelligent ticket routing.',
    iconName: 'Zap',
    accentColor: 'text-luxury-gold',
    borderColor: 'border-luxury-gold/30',
    bgGlow: 'from-luxury-gold/10 to-amber-500/5',
    badgeText: 'Revenue Operations',
    coreDisciplines: [
      'Custom CRM Architecture',
      'Instant Speed-to-Lead Qualification',
      'Automated SMS/Email/Voice Nurturing',
      'Sales Pipeline Analytics & Dashboards',
      'Support Ticket Routing & Auto-Summaries'
    ]
  },
  {
    id: 'agentic-web-seo',
    title: 'AI-Native Websites, SEO & AEO',
    shortTitle: 'AI-Native Websites & Search',
    tagline: 'Self-optimizing adaptive web presence, structured data, and LLM search dominance.',
    description: 'Moving beyond static brochures into agentic websites that learn visitor behavior in real time, auto-tune CTAs, generate JSON-LD knowledge graphs, and dominate search on Google AI Overviews and Perplexity.',
    iconName: 'Search',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    bgGlow: 'from-indigo-500/10 to-purple-500/5',
    badgeText: 'Search & Adaptive Web',
    coreDisciplines: [
      'Self-Learning Web Optimization',
      'Answer Engine Optimization (AEO)',
      'Schema.org Knowledge Graph Architecture',
      'Dynamic Intent-Based CTA Routing',
      'Continuous Conversion Rate Experimentation'
    ]
  },
  {
    id: 'commerce-marketplaces',
    title: 'Commerce & Marketplace Systems',
    shortTitle: 'Commerce & Marketplaces',
    tagline: 'Intelligent buyer-seller matchmaking, catalog intelligence, and transaction automation.',
    description: 'Specialized commerce engines powering business acquisitions, commercial equipment matchmaking, product recommendation graphs, and automated transaction coordination.',
    iconName: 'ShoppingBag',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgGlow: 'from-orange-500/10 to-red-500/5',
    badgeText: 'Marketplace Tech',
    coreDisciplines: [
      'Buyer-Seller Matchmaking Algorithms',
      'Catalog Ingestion & Attribute Normalization',
      'Recommendation Engines',
      'Transaction Document Automation',
      'Deal Pipeline & Escrow Coordination'
    ]
  }
]

export interface SkillCategory {
  id: string
  name: string
  iconName: string
  skills: string[]
}

export const SKILL_TAXONOMY: SkillCategory[] = [
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    iconName: 'Cpu',
    skills: [
      'LLM Applications',
      'AI Agents',
      'RAG (Retrieval-Augmented Generation)',
      'Prompt Systems & Metaprompts',
      'Recommendation Engines',
      'Classification & Tagging',
      'Structured Data Extraction',
      'Confidence Scoring',
      'Human-in-the-Loop AI',
      'Multi-Model Orchestration'
    ]
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision & Spatial AI',
    iconName: 'Scan',
    skills: [
      'Pose Estimation',
      'Object Detection & Tracking',
      'Image Classification',
      'Video Analytics',
      'Joint Tracking',
      'Gait Analysis',
      'Defect Detection',
      'Semantic Segmentation',
      '3D Reconstruction',
      'Spatial Mapping',
      'LiDAR & Depth Integration',
      'Digital Twins'
    ]
  },
  {
    id: 'healthcare-tech',
    name: 'Healthcare Technology',
    iconName: 'Stethoscope',
    skills: [
      'RPM (Remote Patient Monitoring)',
      'RTM (Remote Therapeutic Monitoring)',
      'Medical Documentation',
      'AI Scribing',
      'Clinical Workflow Automation',
      'Patient Intake & Triage',
      'Medical Billing & Claims',
      'RCM (Revenue Cycle Management)',
      'Device Integrations',
      'Longitudinal Health Monitoring'
    ]
  },
  {
    id: 'sports-tech',
    name: 'Sports Technology & Kinematics',
    iconName: 'Activity',
    skills: [
      'Biomechanics Analysis',
      'Running Gait Analysis',
      'Cycling Fit Optimization',
      'Training-Load Modeling',
      'Wearable Telemetry Fusion',
      'Recovery Analytics',
      'Personalized Coaching Systems',
      'Performance Prediction'
    ]
  },
  {
    id: 'data-platforms',
    name: 'Data & Platform Engineering',
    iconName: 'Database',
    skills: [
      'ETL Pipelines',
      'Data Normalization',
      'Large-Scale Ingestion',
      'Entity Resolution',
      'Deduplication',
      'Catalog Matching',
      'Semantic Vector Search',
      'Analytics & Dashboards',
      'PostgreSQL',
      'Supabase',
      'BigQuery'
    ]
  },
  {
    id: 'voice-communications',
    name: 'Voice & Communications AI',
    iconName: 'PhoneCall',
    skills: [
      'Voice AI Architecture',
      'AI Phone Receptionists',
      'Intelligent Call Routing',
      'Speech-to-Text (STT)',
      'Text-to-Speech (TTS)',
      'Bilingual Agents (English/Spanish)',
      'Real-Time Appointment Scheduling',
      'SMS Automated Flows',
      'WhatsApp Business Workflows',
      'Telegram Integration'
    ]
  },
  {
    id: 'crm-automation',
    name: 'CRM & Revenue Automation',
    iconName: 'Zap',
    skills: [
      'Custom CRM Architecture',
      'Sales Pipeline Automation',
      'Speed-to-Lead Scoring',
      'Workflow Automation',
      'Marketing Automation',
      'Customer Segmentation',
      'Automated Follow-Up Sequences',
      'Revenue Operations (RevOps)',
      'Executive Dashboards',
      'Multi-Tool API Integrations'
    ]
  },
  {
    id: 'web-growth',
    name: 'Web & Growth Engineering',
    iconName: 'Globe',
    skills: [
      'AI-Native Websites',
      'Adaptive Websites',
      'Personalized Content Routing',
      'Technical SEO',
      'Answer Engine Optimization (AEO)',
      'Structured Data & Schema.org',
      'AI Search Visibility (Perplexity/LLMs)',
      'Conversion Rate Optimization',
      'Web Analytics & Telemetry',
      'Automated A/B Experimentation'
    ]
  }
]

export const PROFESSIONAL_TITLES = [
  'Applied AI Systems Architect',
  'AI Solutions Architect',
  'AI Product Engineer',
  'Computer Vision Systems Architect',
  'Healthcare AI Solutions Developer',
  'Digital Health Systems Architect',
  'Sports AI & Biomechanics Developer',
  'Spatial AI & 3D Mapping Engineer',
  'AI Automation Architect',
  'Conversational AI / Voice AI Engineer',
  'CRM & Revenue Automation Architect',
  'Data Engineering & Intelligence Architect',
  'AI Marketplace Architect',
  'Recommendation Systems Developer',
  'AI Search & AEO Strategist',
  'AI-Native Web Architect',
  'Agentic Systems Developer',
  'Human-in-the-Loop AI Designer',
  'AI Integration Specialist',
  'AI Product Strategy Lead'
]

export const COMPANY_DESCRIPTOR = "Applied AI, Computer Vision, Digital Health, Spatial Intelligence and Automation Systems"
export const FOUNDER_ROLE = "Founder & Applied AI Systems Architect"
