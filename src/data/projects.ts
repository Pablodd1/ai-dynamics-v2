// Data-Driven Project Registry & Capabilities Engine
// Every project dynamically exports industries, technologies, skills, capabilities, and professional titles

import type { CapabilityPillarId } from './taxonomy'
import { SKILL_TAXONOMY } from './taxonomy'

export interface ProjectItem {
  id: string
  slug: string
  title: string
  subtitle: string
  pillarId: CapabilityPillarId
  category: string
  industry: string
  professionalTitle: string
  summary: string
  detailedDescription: string
  capabilities: string[]
  architecture: {
    input: string
    engine: string
    output: string
  }
  techStack: string[]
  skills: string[]
  metrics: {
    label: string
    value: string
  }[]
  featured: boolean
  useCases: string[]
  status: 'production' | 'active-deployment' | 'enterprise-pilot'
  liveUrl?: string
  externalUrl?: string
  caseStudyId?: string
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'room-defect-inspection-ai',
    slug: 'room-defect-inspection-ai',
    title: 'Room Defect Monitoring & Property Inspection AI',
    subtitle: 'Computer vision intelligence for automated damage detection, severity classification, and contractor repair tickets.',
    pillarId: 'spatial-vision',
    category: 'Computer Vision & Spatial AI',
    industry: 'Real Estate, Construction & Property Management',
    professionalTitle: 'Computer Vision Systems Architect',
    summary: 'An intelligent visual inspection pipeline that scans walls, ceilings, floors, and fixtures from photos or video feeds to pinpoint moisture stains, structural cracks, paint defects, and hardware damage, automatically generating contractor-ready repair tickets.',
    detailedDescription: 'Property managers, insurance adjusters, and general contractors spend thousands of hours on manual walkthrough inspections. This system applies fine-tuned segmentation and edge-detection models to localize defects across rooms, compare before/after condition states across tenant leases, grade damage severity (Minor, Moderate, Critical), and immediately format itemized work orders.',
    capabilities: [
      'Computer vision for walls, ceilings, floors, fixtures, moisture signs, cracks, and stains',
      'Before / after lease & renovation condition comparison',
      'Bounding-box and polygon defect localization with confidence scores',
      'Severity classification (Cosmetic, Urgent, Structural)',
      'Historical inspection logging & delta tracking over time',
      'Contractor & property-manager mobile inspection workflows',
      'Automated PDF report generation and dispatch of repair tickets'
    ],
    architecture: {
      input: 'Mobile photo / video upload or drone inspection feed',
      engine: 'YOLOv10 + Mask R-CNN defect segmentation & classification model pipeline',
      output: 'Itemized repair ticket with localized bounding boxes, estimated remediation cost, and auto-dispatch to contractors'
    },
    techStack: ['PyTorch', 'OpenCV', 'YOLOv10', 'FastAPI', 'PostgreSQL', 'React Mobile', 'Supabase Storage', 'Webhooks'],
    skills: [
      'Defect Detection',
      'Semantic Segmentation',
      'Object Detection & Tracking',
      'Video Analytics',
      'Image Classification',
      'Structured Data Extraction',
      'Confidence Scoring',
      'Human-in-the-Loop AI',
      'Workflow Automation'
    ],
    metrics: [
      { label: 'Inspection Time Reduced', value: '78%' },
      { label: 'Defect Localization Accuracy', value: '96.4%' },
      { label: 'Dispute Resolution Speed', value: '3.5x Faster' }
    ],
    featured: true,
    useCases: [
      'Commercial Property Management & Tenant Turnovers',
      'Construction Quality Assurance & Milestone Verification',
      'Insurance Property Damage Assessment & Claim Validation',
      'Hospitality & Vacation Rental Room Inspections'
    ],
    status: 'production'
  },
  {
    id: '3d-spatial-room-mapping',
    slug: '3d-spatial-room-mapping',
    title: '3D Room Mapping & Spatial Intelligence',
    subtitle: 'Phone & LiDAR camera-based 3D reconstruction, floor-plan generation, spatial measurement, and digital twins.',
    pillarId: 'spatial-vision',
    category: 'Computer Vision & Spatial AI',
    industry: 'Architecture, Facilities, Insurance & Construction',
    professionalTitle: 'Spatial AI & 3D Mapping Engineer',
    summary: 'A spatial computing system that captures physical spaces via smartphone camera or LiDAR, generates millimeter-accurate 2D/3D floor plans, extracts spatial dimensions, maps fixtures, and constructs lightweight digital twin layers for BIM and virtual walk-throughs.',
    detailedDescription: 'Bridging physical job sites with digital operations. Using spatial point-cloud processing and depth estimation, field operators scan any room in under 60 seconds. The pipeline calculates usable square footage, wall dimensions, door/window clearances, and fixture placements, exporting directly to CAD/BIM standards.',
    capabilities: [
      'Phone/camera-based room scanning with ARKit / WebXR',
      'Depth sensor and LiDAR integration where available',
      'Automated room dimension and usable area calculation',
      'Vector 2D / 3D floor-plan generation (DWG, DXF, SVG, OBJ)',
      'Object and fixture spatial classification (HVAC, plumbing, electrical)',
      'Spatial point-to-point laser measurement simulation',
      'Digital twin layer for real-time facility telemetry and sensor overlay'
    ],
    architecture: {
      input: 'LiDAR point-cloud or multi-angle RGB smartphone video sequence',
      engine: 'NeRF / Gaussian Splatting + Mesh Reconstruction & Spatial Plane Extraction Engine',
      output: 'Interactive 3D digital twin, dimensioned vector floor plans, and bill-of-materials spatial data'
    },
    techStack: ['Three.js', 'WebGL', 'WebXR', 'Open3D', 'Python', 'MeshLab', 'React Three Fiber', 'PostGIS'],
    skills: [
      '3D Reconstruction',
      'Spatial Mapping',
      'LiDAR & Depth Integration',
      'Digital Twins',
      'Computer Vision',
      'Pose Estimation',
      'Data Normalization',
      'API Integrations'
    ],
    metrics: [
      { label: 'Scan to 3D Floor Plan', value: '< 90 sec' },
      { label: 'Measurement Accuracy', value: '± 0.25 in' },
      { label: 'CAD Drafting Hours Saved', value: '85%' }
    ],
    featured: true,
    useCases: [
      'General Contractors & Remodeling Estimations',
      'Insurance Underwriting & Loss Mitigation',
      'Commercial Real Estate Virtual Leasing',
      'Smart Facilities Management & IoT Asset Tracking'
    ],
    status: 'production'
  },
  {
    id: 'crm-revenue-operations-system',
    slug: 'crm-revenue-operations-system',
    title: 'CRM & Revenue Operations Systems',
    subtitle: 'Custom CRM architecture, speed-to-lead qualification, automated multi-channel follow-up, and predictive sales pipelines.',
    pillarId: 'crm-revops',
    category: 'CRM & Business Automation',
    industry: 'Professional Services, Legal, Healthcare & Home Services',
    professionalTitle: 'CRM & Revenue Automation Architect',
    summary: 'A unified revenue operations operating system that connects lead acquisition, instant AI qualification, SMS/voice follow-up sequences, appointment booking, contact enrichment, and pipeline analytics into one synchronized dashboard.',
    detailedDescription: 'Most businesses leak 30-50% of inbound leads due to delayed follow-ups and fragmented tools. This solution deploys either a tailored custom CRM or deep automation layers over existing platforms (HubSpot, Salesforce, Clio, GoHighLevel). Leads are instantly scored, enriched with demographic data, engaged via conversational AI, and booked onto rep calendars automatically.',
    capabilities: [
      'Custom CRM data architecture tailored to specific industry workflows',
      'Multi-channel lead capture from web forms, phone calls, ads, and chat',
      'Visual sales pipeline and deal stage management',
      'Sub-minute AI lead qualification and intent scoring',
      'Automated follow-up across SMS, email, WhatsApp, and outbound voice',
      'Two-way real-time appointment booking with calendar sync',
      'Automatic contact enrichment from public and industry databases',
      'Executive sales dashboards, win-rate analytics, and rep performance tracking',
      'Support-ticket routing with automated AI summaries and next-action recommendations',
      'Seamless API integration with existing enterprise stacks'
    ],
    architecture: {
      input: 'Inbound web form, phone call, webhook, or ad lead payload',
      engine: 'Event-driven RevOps engine with LLM qualification + scoring state machine',
      output: 'Enriched CRM deal, instant 2-way SMS dialogue, confirmed calendar booking, and rep notification'
    },
    techStack: ['Supabase', 'PostgreSQL', 'Node.js', 'React', 'Tailwind CSS', 'Vapi Voice API', 'Twilio SMS', 'Brevo', 'Zapier/n8n'],
    skills: [
      'Custom CRM Architecture',
      'Sales Pipeline Automation',
      'Speed-to-Lead Scoring',
      'Workflow Automation',
      'Marketing Automation',
      'Customer Segmentation',
      'Follow-Up Systems',
      'Revenue Operations',
      'Executive Dashboards',
      'Multi-Tool API Integrations',
      'AI Agents'
    ],
    metrics: [
      { label: 'Speed-to-Lead Response', value: '< 45 sec' },
      { label: 'Lead-to-Meeting Conversion', value: '+ 44%' },
      { label: 'Rep Admin Hours Saved', value: '14 hrs/wk' }
    ],
    featured: true,
    useCases: [
      'Law Firm Client Intake & Retainer Execution',
      'Medical & Dental Clinic Appointment Pipelines',
      'High-Ticket Contracting & Renovation Estimates',
      'B2B SaaS & Tech Agency Sales Operations'
    ],
    status: 'production'
  },
  {
    id: 'voice-phone-receptionist-bilingual',
    slug: 'voice-phone-receptionist-bilingual',
    title: '24/7 Bilingual AI Phone Receptionist & Front Desk',
    subtitle: 'Sub-second voice AI answering inbound calls, speaking English and Venezuelan/Latin American Spanish, booking directly on live calendars.',
    pillarId: 'voice-conversational',
    category: 'Voice & Conversational AI',
    industry: 'Healthcare, Legal, Real Estate & Home Services',
    professionalTitle: 'Conversational AI / Voice AI Engineer',
    summary: 'A human-grade voice receptionist answering phone calls on Ring 1, fluently communicating in English or native Spanish, answering company FAQs, qualifying customer needs, and scheduling appointments directly into Google Calendar, Outlook, or EHR systems.',
    detailedDescription: 'Offshore call centers are expensive and rigid, while voicemails have a 67% hangup rate. Our voice receptionists leverage ultra-low latency speech-to-speech pipelines, authentic Venezuelan and Caribbean Spanish cadence, and deterministic tool-calling to provide executive-level phone support 24/7/365.',
    capabilities: [
      'Bilingual conversational fluency in English and natural Spanish',
      'Sub-second audio synthesis latency (<600ms response time)',
      'Direct calendar appointment scheduling with SMS confirmations',
      'Emergency triage and conditional call-forwarding to staff',
      'Instant post-call transcript and recording emailed to management',
      'Integration with Twilio, Telnyx, Vapi, and Retell infrastructure',
      'Unlimited simultaneous inbound call handling without busy signals'
    ],
    architecture: {
      input: 'Inbound PSTN / VoIP phone call via Twilio carrier trunk',
      engine: 'Deepgram Nova-2 STT + Cartesia/ElevenLabs TTS + Custom Llama-3/Gemini reasoning core',
      output: 'Natural voice audio stream, calendar event creation, and CRM lead logging'
    },
    techStack: ['Vapi.ai', 'Retell AI', 'Twilio', 'Deepgram', 'Cartesia', 'ElevenLabs', 'Serverless Node.js', 'Google Calendar API'],
    skills: [
      'Voice AI Architecture',
      'AI Phone Receptionists',
      'Intelligent Call Routing',
      'Speech-to-Text (STT)',
      'Text-to-Speech (TTS)',
      'Bilingual Agents (English/Spanish)',
      'Real-Time Appointment Scheduling',
      'SMS Automated Flows',
      'WhatsApp Business Workflows'
    ],
    metrics: [
      { label: 'Speed to Answer', value: 'Ring 1 (0s Hold)' },
      { label: 'Missed Calls Eliminated', value: '100%' },
      { label: 'Annual Payroll Saved', value: '$35,000+' }
    ],
    featured: true,
    useCases: [
      'Medical & Dental Clinic After-Hours Patient Scheduling',
      'Personal Injury & Immigration Law Speed-to-Lead Triage',
      'HVAC, Plumbing & Roofing Emergency Service Dispatch',
      'Luxury Concierge & High-End Real Estate Inquiries'
    ],
    status: 'production',
    liveUrl: 'tel:+17866432099'
  },
  {
    id: 'healthcare-hipaa-clinical-intake',
    slug: 'healthcare-hipaa-clinical-intake',
    title: 'HIPAA Medical Clinic Intake & Revenue Cycle Automation',
    subtitle: 'OCR insurance card extraction, clinical scribing, two-way SMS reminder flows, and prior-authorization tracking.',
    pillarId: 'digital-health',
    category: 'Healthcare & Digital Health',
    industry: 'Outpatient Clinics, Dental Practices & Medical Billing',
    professionalTitle: 'Healthcare AI Solutions Developer',
    summary: 'An end-to-end clinical workflow system built around Medical Billing Miami Beach and AI Medical Scriber that cuts no-shows by 42%, automates patient check-in forms, extracts insurance card data via vision AI, and resolves claim denial backlogs.',
    detailedDescription: 'Administrative friction is the primary driver of clinic burnout and revenue leakage. This HIPAA-compliant suite replaces paper clipboards with digital intake, verifies payer coverage before patient arrival, assists physicians with ambient clinical notes, and automates patient follow-up via bilingual WhatsApp/SMS.',
    capabilities: [
      'Digital patient intake with insurance card OCR data extraction',
      'Two-way interactive appointment confirmations reducing no-shows',
      'Prior-authorization submission tracking with payer status webhooks',
      'AI-assisted ambient medical documentation and clinical encounter summaries',
      'Integration with practice management systems (Athena, Kareo, eClinicalWorks)',
      'Strict HIPAA compliance with signed BAAs and zero-retention data policies'
    ],
    architecture: {
      input: 'Patient smartphone photos of insurance card + clinical audio encounter',
      engine: 'Vision OCR extractor + HIPAA-compliant Claude/Gemini medical summarizer',
      output: 'Structured EHR demographic records, verified billing codes, and encounter notes'
    },
    techStack: ['Python', 'FastAPI', 'Google Vision OCR', 'PostgreSQL', 'HIPAA AWS/GCP VPC', 'Twilio HIPAA', 'React'],
    skills: [
      'Medical Documentation',
      'AI Scribing',
      'Clinical Workflow Automation',
      'Patient Intake & Triage',
      'Medical Billing & Claims',
      'RCM (Revenue Cycle Management)',
      'Structured Data Extraction',
      'Human-in-the-Loop AI',
      'Structured Data'
    ],
    metrics: [
      { label: 'Patient No-Show Rate', value: '- 42%' },
      { label: 'Weekly Admin Time Saved', value: '18 hrs/physician' },
      { label: 'Insurance Data Error Rate', value: '< 0.2%' }
    ],
    featured: true,
    useCases: [
      'Multi-Specialty Outpatient Clinics',
      'Cosmetic & Plastic Surgery Centers',
      'Dental Groups & Orthodontic Practices',
      'Physical Therapy & Chiropractic Networks'
    ],
    status: 'production',
    caseStudyId: 'case-study'
  },
  {
    id: 'agentic-website-conversion-engine',
    slug: 'agentic-website-conversion-engine',
    title: 'Agentic Websites & Adaptive Web Presence',
    subtitle: 'Self-learning web applications that analyze visitor intent in real time, auto-optimize content, and maximize conversion rates.',
    pillarId: 'agentic-web-seo',
    category: 'AI-Native Websites & Search',
    industry: 'High-Growth Tech, Professional Services & E-Commerce',
    professionalTitle: 'AI-Native Web Architect',
    summary: 'Moving past static brochure websites into intelligent, adaptive web engines that understand where visitors come from, dynamically personalize hero copy and call-to-actions, and run continuous multivariate experimentation autonomously.',
    detailedDescription: 'Traditional websites treat every visitor identically. Agentic websites monitor scroll depth, referral context, interaction telemetry, and geographic intent to dynamically render the most compelling value proposition and conversion offer for each specific user.',
    capabilities: [
      'Real-time visitor behavior telemetry and intent classification',
      'Dynamic hero headline, proof point, and CTA personalization',
      'Autonomous multivariate copy and layout experimentation',
      'Integrated conversational front-desk agent with memory',
      'Sub-second page load speeds with edge rendering and React/Vite',
      'Instant lead routing to sales pipelines based on engagement score'
    ],
    architecture: {
      input: 'Real-time visitor interaction stream and referral telemetry',
      engine: 'Edge optimization model + dynamic UI state dispatcher',
      output: 'Tailored value proposition, personalized case studies, and dynamic CTA triggers'
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel Edge Functions', 'Supabase'],
    skills: [
      'AI-Native Websites',
      'Adaptive Websites',
      'Personalized Content Routing',
      'Conversion Rate Optimization',
      'Web Analytics & Telemetry',
      'Automated A/B Experimentation',
      'LLM Applications',
      'AI Agents'
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+ 34%' },
      { label: 'Average Time on Page', value: '2.8x' },
      { label: 'Lighthouse Performance', value: '99/100' }
    ],
    featured: false,
    useCases: [
      'B2B SaaS Companies & High-Ticket Service Agencies',
      'Boutique Law Firms & Luxury Real Estate Teams',
      'Medical Practices & Aesthetic Clinics',
      'Direct-to-Consumer Premium Brands'
    ],
    status: 'production'
  },
  {
    id: 'ai-seo-answer-engine-optimization',
    slug: 'ai-seo-answer-engine-optimization',
    title: 'AI SEO & Answer Engine Optimization (AEO)',
    subtitle: 'Engineered search dominance across Google AI Overviews, Perplexity, ChatGPT Search, and traditional organic rankings.',
    pillarId: 'agentic-web-seo',
    category: 'AI-Native Websites & Search',
    industry: 'All High-Intent Commercial Industries',
    professionalTitle: 'AI Search & AEO Strategist',
    summary: 'A predictive search optimization framework that structures company data into rich Schema.org knowledge graphs, answers natural-language queries, and secures prominent citations inside Google AI Overviews and LLM answer engines.',
    detailedDescription: 'As search shifts from ten blue links to direct AI answers, traditional keyword stuffing is obsolete. We build comprehensive semantic content architecture, local entity schemas, and FAQ citation graphs designed specifically for generative search models to recommend your business first.',
    capabilities: [
      'Intent-based topic clustering and entity modeling',
      'Comprehensive Schema.org LocalBusiness, Service, and FAQ JSON-LD graphs',
      'Answer Engine Optimization (AEO) for Perplexity, ChatGPT, and Gemini Search',
      'Predictive ranking models analyzing search algorithm shifts',
      'Automated content refreshes maintaining factual citation freshness',
      'Local geo-targeting for Miami, Brickell, Coral Gables, Doral, and South Florida'
    ],
    architecture: {
      input: 'Search intent queries, competitive landscape data, and entity graphs',
      engine: 'Semantic analyzer + JSON-LD Knowledge Graph compiler',
      output: 'High-ranking authority articles, featured snippet triggers, and LLM citation placement'
    },
    techStack: ['Schema.org JSON-LD', 'Next/Vite SEO', 'Python Scrapy', 'OpenAI Embeddings', 'Google Search Console API'],
    skills: [
      'Answer Engine Optimization (AEO)',
      'Technical SEO',
      'Structured Data & Schema.org',
      'AI Search Visibility (Perplexity/LLMs)',
      'Data Normalization',
      'Content Strategy',
      'Analytics & Dashboards'
    ],
    metrics: [
      { label: 'Organic Visibility Growth', value: '+ 210%' },
      { label: 'AI Overview Citations', value: 'Top 3 Placement' },
      { label: 'Cost Per Inbound Lead', value: '- 62%' }
    ],
    featured: false,
    useCases: [
      'Local Florida Professional Services',
      'Specialized Healthcare & Medical Practices',
      'Commercial Real Estate & B2B Firms',
      'National E-Commerce Brands'
    ],
    status: 'production'
  },
  {
    id: 'sports-biomechanics-gait-intelligence',
    slug: 'sports-biomechanics-gait-intelligence',
    title: 'Sports Biomechanics & Kinetic Movement Intelligence',
    subtitle: 'Computer-vision joint tracking, running gait analysis, cycling fit optimization, and wearable load modeling.',
    pillarId: 'sports-science',
    category: 'Sports Science & Human Performance',
    industry: 'Athletic Performance, Physical Therapy & Sports Tech',
    professionalTitle: 'Sports AI & Biomechanics Developer',
    summary: 'Computer-vision movement analysis that tracks 33 skeletal joints in 60 FPS video, detects asymmetrical running gait patterns, optimizes aerodynamic cycling posture, and fuses wearable metrics to calculate recovery and injury probability.',
    detailedDescription: 'Using markerless camera tracking, athletes and physical therapists record video from any smartphone. The system measures joint angles, cadence, ground contact time, and vertical oscillation, delivering real-time corrective feedback and training load recommendations.',
    capabilities: [
      'Markerless 33-point skeletal pose estimation from standard 60 FPS video',
      'Running gait symmetry, pronation, and ground reaction time analysis',
      'Dynamic cycling bike-fit joint angle optimization (knee flexion, torso angle)',
      'Wearable telemetry fusion (Heart rate variability, power meters, sleep metrics)',
      'Training load modeling and fatigue-induced injury risk forecasting',
      'Automated personalized biomechanical reports with visual overlay charts'
    ],
    architecture: {
      input: 'Smartphone video of athlete running / cycling + wearable health telemetry',
      engine: 'MediaPipe / OpenPose kinematic pipeline + PyTorch biomechanical angle calculator',
      output: 'Interactive joint-angle overlay video, symmetry metrics, and coaching adjustment plan'
    },
    techStack: ['MediaPipe', 'OpenCV', 'PyTorch', 'Python', 'WebCodecs', 'Canvas 2D/3D', 'FastAPI'],
    skills: [
      'Pose Estimation',
      'Joint Tracking',
      'Gait Analysis',
      'Biomechanics Analysis',
      'Running Gait Analysis',
      'Cycling Fit Optimization',
      'Training-Load Modeling',
      'Wearable Telemetry Fusion',
      'Recovery Analytics',
      'Video Analytics'
    ],
    metrics: [
      { label: 'Tracking Speed', value: '60 FPS Real-Time' },
      { label: 'Joint Angle Accuracy', value: '± 1.2°' },
      { label: 'Overuse Injury Risk Reduction', value: '38%' }
    ],
    featured: false,
    useCases: [
      'Endurance Athletes, Runners & Triathletes',
      'Physical Therapy Clinics & Orthopedic Rehabilitation',
      'Professional Sports Teams & Coaching Academies',
      'Smart Gyms & Connected Fitness Platforms'
    ],
    status: 'enterprise-pilot'
  },
  {
    id: 'zero-g-multi-agent-simulator',
    slug: 'zero-g-multi-agent-simulator',
    title: 'Zero-G Platform: Business Growth & Market Simulator',
    subtitle: 'Monte Carlo multi-agent simulation modeling 10,000 synthetic market scenarios before capital deployment.',
    pillarId: 'applied-ai',
    category: 'Applied AI & Autonomous Agents',
    industry: 'Venture Capital, Enterprise Strategy & M&A',
    professionalTitle: 'Applied AI Systems Architect',
    summary: 'A proprietary agentic simulation engine that models customer behavior, market volatility, pricing sensitivity, and competitor reactions across 10,000 simulated runs to stress-test business decisions before spending real money.',
    detailedDescription: 'Traditional spreadsheets model static linear projections. The Zero-G simulation engine spawns autonomous synthetic persona agents with distinct budgets, preferences, and behavioral triggers, allowing executives to test marketing campaigns, pricing shifts, and expansion strategies safely in simulation.',
    capabilities: [
      'Multi-agent persona generation and behavioral micro-simulation',
      'Monte Carlo sensitivity testing across 10,000 stochastic variations',
      'Dynamic price elasticity and churn prediction modeling',
      'Competitive game-theory response simulation',
      'Interactive executive decision workbench with probability heatmaps'
    ],
    architecture: {
      input: 'Historical financial metrics, pricing assumptions, and market parameters',
      engine: 'Distributed multi-agent simulation kernel with LLM persona heuristics',
      output: 'Probability density curves, downside risk limits, and optimized strategy blueprints'
    },
    techStack: ['Rust', 'Python', 'NumPy', 'React', 'D3.js', 'WebAssembly', 'FastAPI'],
    skills: [
      'Multi-Agent Orchestration',
      'Simulation & Modeling',
      'Recommendation Engines',
      'Prompt Systems & Metaprompts',
      'ETL Pipelines',
      'Analytics & Dashboards',
      'Data Normalization'
    ],
    metrics: [
      { label: 'Simulation Runs', value: '10,000 / sec' },
      { label: 'Capital Allocation Efficiency', value: '+ 45%' },
      { label: 'Downside Risk Avoidance', value: 'High Confidence' }
    ],
    featured: false,
    useCases: [
      'Private Equity & Acquisition Due Diligence',
      'SaaS Pricing & Packaging Redesigns',
      'New Market Geographic Expansions',
      'Corporate Risk & Scenario Planning'
    ],
    status: 'production',
    liveUrl: '/simulation'
  },
  {
    id: '305business-commercial-marketplace',
    slug: '305business-commercial-marketplace',
    title: '305business: AI-Powered Commercial Deal Marketplace',
    subtitle: 'Entity resolution, catalog normalization, buyer-seller matching, and automated deal pipeline coordination.',
    pillarId: 'commerce-marketplaces',
    category: 'Commerce & Marketplace Systems',
    industry: 'Business Brokerage, M&A & Miami Commercial Real Estate',
    professionalTitle: 'AI Marketplace Architect',
    summary: 'A specialized platform connecting Miami business buyers, sellers, and commercial real estate brokers with intelligent recommendation matching, automated asset valuation, and secure deal pipeline management.',
    detailedDescription: 'Commercial listings are often messy, unformatted, and hard to match. This system extracts financial data, normalizes asset catalogs, calculates valuation multiples, matches verified buyers via semantic interest vector graphs, and coordinates transaction documents.',
    capabilities: [
      'Automated financial statement and listing data extraction',
      'Semantic vector matching connecting buyer mandates with off-market deals',
      'Entity resolution, deduplication, and catalog normalization',
      'Automated NDA execution and buyer qualification workflows',
      'Visual deal room pipeline with transaction coordination milestones'
    ],
    architecture: {
      input: 'Unstructured business listings, P&L statements, and buyer mandate profiles',
      engine: 'Catalog parser + vector embedding matchmaker + automated deal workflow engine',
      output: 'Matched buyer-seller introductions, verified deal briefs, and executed agreements'
    },
    techStack: ['Next.js', 'Supabase', 'PostgreSQL', 'OpenAI Embeddings', 'PandaDoc API', 'Tailwind CSS'],
    skills: [
      'Catalog Matching',
      'Entity Resolution',
      'Deduplication',
      'Recommendation Engines',
      'Semantic Vector Search',
      'Workflow Automation',
      'Custom CRM Architecture',
      'Structured Data Extraction'
    ],
    metrics: [
      { label: 'Deal Matching Speed', value: '5x Faster' },
      { label: 'Buyer Qualification Rate', value: '92%' },
      { label: 'Transaction Coordination Time', value: '- 60%' }
    ],
    featured: false,
    useCases: [
      'Miami Business Acquisitions & Mergers',
      'Commercial Real Estate Off-Market Deals',
      'Franchise Resale Matchmaking',
      'Equipment & Asset Liquidation'
    ],
    status: 'production',
    externalUrl: 'https://305business-llc.vercel.app'
  }
]

// Helper query functions
export function getAllProjects(): ProjectItem[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find(p => p.slug === slug || p.id === slug)
}

export function getProjectsByPillar(pillarId: CapabilityPillarId): ProjectItem[] {
  return PROJECTS.filter(p => p.pillarId === pillarId)
}

export function getFeaturedProjects(): ProjectItem[] {
  return PROJECTS.filter(p => p.featured)
}

// Dynamically extract all unique skills across all projects with their categories
export function getAllDerivedSkills(): { skill: string; categoryName: string; categoryId: string; projectCount: number }[] {
  const skillCountMap = new Map<string, number>()
  
  PROJECTS.forEach(project => {
    project.skills.forEach(skill => {
      skillCountMap.set(skill, (skillCountMap.get(skill) || 0) + 1)
    })
  })

  const results: { skill: string; categoryName: string; categoryId: string; projectCount: number }[] = []

  skillCountMap.forEach((count, skillName) => {
    // Find matching category from SKILL_TAXONOMY
    let foundCat = SKILL_TAXONOMY.find(cat => 
      cat.skills.some(s => s.toLowerCase() === skillName.toLowerCase())
    )
    if (!foundCat) {
      foundCat = SKILL_TAXONOMY[0]
    }
    results.push({
      skill: skillName,
      categoryName: foundCat.name,
      categoryId: foundCat.id,
      projectCount: count
    })
  })

  return results.sort((a, b) => b.projectCount - a.projectCount)
}

// Dynamically extract all unique professional titles generated by projects
export function getAllDerivedTitles(): { title: string; projectCount: number; pillarIds: CapabilityPillarId[] }[] {
  const titleMap = new Map<string, { count: number; pillars: Set<CapabilityPillarId> }>()

  PROJECTS.forEach(p => {
    const existing = titleMap.get(p.professionalTitle) || { count: 0, pillars: new Set<CapabilityPillarId>() }
    existing.count += 1
    existing.pillars.add(p.pillarId)
    titleMap.set(p.professionalTitle, existing)
  })

  return Array.from(titleMap.entries()).map(([title, data]) => ({
    title,
    projectCount: data.count,
    pillarIds: Array.from(data.pillars)
  })).sort((a, b) => b.projectCount - a.projectCount)
}

// Dynamically extract all unique industries
export function getAllDerivedIndustries(): string[] {
  const set = new Set<string>()
  PROJECTS.forEach(p => set.add(p.industry))
  return Array.from(set)
}

// Dynamically extract all unique technologies
export function getAllDerivedTech(): string[] {
  const set = new Set<string>()
  PROJECTS.forEach(p => p.techStack.forEach(t => set.add(t)))
  return Array.from(set)
}
