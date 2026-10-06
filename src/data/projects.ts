// Centralized Data-Driven Project Registry & Capabilities Engine
// Single source of truth for all 22 technical AI Dynamics systems, capabilities, and partnership opportunities.

import type { ProjectGraphicType } from '../components/ProjectGraphic'

export type ProjectStatus = 
  | 'LIVE'
  | 'PRODUCTION'
  | 'PILOT'
  | 'ACTIVE DEVELOPMENT'
  | 'PROTOTYPE'
  | 'R&D'
  | 'COMMERCIALIZATION'
  | 'VALIDATION REQUIRED'

export const STATUS_LEGEND: Record<ProjectStatus, { description: string; color: string; bg: string; border: string }> = {
  'LIVE': {
    description: 'Actively deployed and serving live commercial users or client environments.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  'PRODUCTION': {
    description: 'Hardened, production-ready enterprise codebase with complete architecture and integrations.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  'COMMERCIALIZATION': {
    description: 'Technology proven; actively structuring commercial rollout, licensing, and client onboarding.',
    color: 'text-luxury-champagne',
    bg: 'bg-luxury-gold/10',
    border: 'border-luxury-gold/30'
  },
  'PILOT': {
    description: 'Active deployment in structured pilot environments with design partners and operators.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30'
  },
  'ACTIVE DEVELOPMENT': {
    description: 'Core engineering under continuous development with weekly functional milestones.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  'PROTOTYPE': {
    description: 'Interactive working proof-of-concept demonstrating core technological viability.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  'R&D': {
    description: 'Applied laboratory research, algorithmic benchmarking, and model exploration.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30'
  },
  'VALIDATION REQUIRED': {
    description: 'Working clinical/technical prototype undergoing formal validation protocols prior to clinical use.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30'
  }
}

export type IndustryFilter = 
  | 'All'
  | 'Healthcare & Digital Health'
  | 'Sports & Human Performance'
  | 'Computer Vision & Spatial AI'
  | 'Voice & Conversational AI'
  | 'Commerce & Marketplaces'
  | 'CRM & Business Automation'
  | 'Intelligent Websites & Growth'
  | 'Data & Analytics'
  | 'Real Estate & Property Technology'

export const INDUSTRY_FILTERS: IndustryFilter[] = [
  'All',
  'Healthcare & Digital Health',
  'Sports & Human Performance',
  'Computer Vision & Spatial AI',
  'Voice & Conversational AI',
  'Commerce & Marketplaces',
  'CRM & Business Automation',
  'Intelligent Websites & Growth',
  'Data & Analytics',
  'Real Estate & Property Technology'
]

export interface ProjectItem {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  summary: string
  industry: string
  industryFilter: IndustryFilter
  subIndustry?: string
  status: ProjectStatus
  maturity: string
  businessModel?: string
  targetUsers: string[]
  problem: string
  solution: string
  valueLine: string
  capabilities: string[]
  technologies: string[]
  metrics?: { label: string; value: string; verified?: boolean }[]
  links: {
    liveDemo?: string
    website?: string
    caseStudy?: string
    repo?: string
    contact?: string
  }
  sponsorOpportunity?: {
    available: boolean
    stage: string
    type: 'Pilot Opportunities' | 'Strategic Sponsorship' | 'Commercialization Partners' | 'Research Collaboration'
    supportNeeded: string[]
  }
  featured: boolean
  architecture: {
    input: string
    engine: string
    analysis: string
    decision: string
    output: string
  }
  category: string
  professionalTitle: string
  graphicType: ProjectGraphicType
  commercialOpportunity: {
    targetCustomers: string[]
    problemSolved: string
    currentAlternatives: string
    differentiation: string
    businessModel?: string
  }
  validationEvidence: string
  roadmap: string[]
  relatedProjectSlugs: string[]
}

export const PROJECTS: ProjectItem[] = [
  // 1. JMM - JAS MIAMI METHOD (Featured #2)
  {
    id: 'jmm-jas-miami-method',
    slug: 'jmm-jas-miami-method',
    name: 'JMM — Jas Miami Method',
    shortName: 'Jas Miami Method',
    tagline: 'Daily AI Personalized Biometric Coaching',
    summary: 'Daily AI-driven personalized training adapting dynamically to athlete biometrics, training history, goals, recovery states, and wearable telemetry.',
    industry: 'Sports & Human Performance',
    industryFilter: 'Sports & Human Performance',
    subIndustry: 'Endurance & Multi-Sport Conditioning',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Advanced Functional Prototype & Testing',
    businessModel: 'Monthly Subscription & Performance Program Licensing',
    targetUsers: ['Endurance Athletes', 'Triathletes & Marathoners', 'HYROX & Combat Athletes', 'Performance Coaches'],
    problem: 'Static training plans fail to adapt when sleep is disrupted, HRV drops, or fatigue accumulates, leading to chronic overtraining, plateau, and overuse injuries.',
    solution: 'An adaptive coaching kernel that synthesizes nightly biometric recovery with longitudinal load models to generate day-specific workout adaptations, pacing, and fueling.',
    valueLine: 'Adapts endurance, strength, and recovery workouts daily based on live biometric telemetry.',
    capabilities: [
      'Heart Rate Variability (HRV) & resting HR trend analysis',
      'Sleep quality and autonomic recovery scoring',
      'Acute-to-chronic training load (ACWR) modeling',
      'Daily training adaptation across running, cycling, swimming, and triathlon',
      'Specialty protocol adaptation for HYROX, boxing, track & field, and strength',
      'Pre, during, and post-session fueling and hydration calculation',
      'Pacing and tactical race strategy modeling',
      'Direct synchronization with wearables and manual FIT/Garmin workflows'
    ],
    technologies: ['Python', 'FastAPI', 'NumPy', 'Garmin Health API', 'PostgreSQL', 'React Mobile', 'Supabase'],
    metrics: [
      { label: 'Adaptation Cadence', value: 'Daily Automated', verified: true },
      { label: 'Biometric Variables Processed', value: '14+ Streams', verified: true },
      { label: 'Validation Status', value: 'Internal Testing', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Active Development / Beta Cohort',
      type: 'Pilot Opportunities',
      supportNeeded: ['Endurance Coaching Squads', 'Wearable Hardware Integration Partners', 'Performance Clinics']
    },
    featured: true,
    architecture: {
      input: 'Nightly wearable recovery telemetry (HRV, RHR, Sleep) + historical training logs',
      engine: 'Stochastic biomechanical recovery engine + LLM coaching reasoning heuristic',
      analysis: 'Longitudinal fatigue degradation modeling & acute-to-chronic load comparison',
      decision: 'Daily intensity, volume, and cross-training adjustment matrix',
      output: 'Personalized daily workout blueprint with prescribed heart-rate zones and nutrition timing'
    },
    category: 'Sports & Human Performance',
    professionalTitle: 'Sports AI & Biomechanics Developer',
    graphicType: 'biomechanics',
    commercialOpportunity: {
      targetCustomers: ['Triathlon Teams & Clubs', 'Individual Competitive Age-Groupers', 'High-Performance Training Centers'],
      problemSolved: 'Replaces generic rigid PDF training calendars with dynamic biometric adjustments.',
      currentAlternatives: 'Static training templates (TrainingPeaks static plans) or high-cost personal human coaching ($300-600/mo).',
      differentiation: 'True multi-sport adaptive engine factoring multi-discipline fatigue cross-talk.',
      businessModel: 'Athlete monthly subscription tier & Coach team management dashboard.'
    },
    validationEvidence: 'Currently undergoing iterative testing across triathletes and endurance runners. Algorithmic load equations benchmarked against standardized Banister impulse-response models.',
    roadmap: [
      'Phase 1: Wearable API data ingestion pipeline (Completed)',
      'Phase 2: Dynamic workout adaptation state machine (Current)',
      'Phase 3: Native mobile companion & voice briefing interface (Q2 2026)'
    ],
    relatedProjectSlugs: ['runform-running-biomechanics', 'cycling-bike-fit-analysis', 'remote-therapeutic-monitoring']
  },

  // 2. RUNFORM (Featured #3)
  {
    id: 'runform-running-biomechanics',
    slug: 'runform-running-biomechanics',
    name: 'RunForm: Running Biomechanics Platform',
    shortName: 'RunForm',
    tagline: 'Real-Time Smartphone Running Biomechanics & Kinetic Analysis',
    summary: 'Computer-vision pose and gait analysis converting standard smartphone video into quantitative joint angles, ground contact times, and asymmetry metrics.',
    industry: 'Sports & Human Performance',
    industryFilter: 'Sports & Human Performance',
    subIndustry: 'Clinical Gait & Specialty Running Retail',
    status: 'PILOT',
    maturity: 'Pilot Testing in Specialty Retail & Coaching',
    businessModel: 'Per-Assessment Fee or Location Monthly SaaS',
    targetUsers: ['Specialty Running Stores', 'Physical Therapists', 'Track Coaches', 'Competitive Runners'],
    problem: 'Laboratory motion capture requires $30,000+ marker suites and dedicated 3D camera rooms, making objective biomechanical analysis inaccessible to stores and clinics.',
    solution: 'Markerless computer vision running on smartphones and tablets that extracts 33 kinematic joint coordinates at 60–120 FPS without requiring skin markers or calibration rigs.',
    valueLine: 'Turns smartphone video into quantitative running biomechanics without physical sensors.',
    capabilities: [
      'Live smartphone camera capture and imported slow-motion video review',
      '33-point markerless skeletal pose tracking',
      'Cadence, ground contact time (GCT), swing time, and step time calculation',
      'Foot strike angle and initial ground contact classification',
      'Dynamic knee flexion, knee valgus, and hip extension angle measurement',
      'Vertical oscillation and trunk forward-lean calculation',
      'Pronation indicators and step-width asymmetry assessment',
      'Interactive visual joint skeleton overlay and slow-motion scrubbing',
      'Automated bilingual (English and Spanish) PDF assessment report generation'
    ],
    technologies: ['MediaPipe', 'OpenCV', 'PyTorch', 'WebCodecs', 'Canvas 2D/3D', 'React', 'FastAPI'],
    metrics: [
      { label: 'Capture Frame Rate', value: '60–120 FPS', verified: true },
      { label: 'Joint Kinematic Points', value: '33 Skeletal Nodes', verified: true },
      { label: 'Report Generation', value: '< 15 Seconds', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Pilot Deployment',
      type: 'Pilot Opportunities',
      supportNeeded: ['Specialty Running Stores', 'Biomechanics Research Labs', 'Physical Therapy Clinics']
    },
    featured: true,
    architecture: {
      input: 'Smartphone lateral and rear slow-motion video footage (60/120 FPS)',
      engine: 'High-speed temporal neural pose estimation & kinematic angle calculation',
      analysis: 'Ground contact phase segmentation, joint angle trajectory, and bilateral asymmetry detection',
      decision: 'Biomechanical risk factor identification and gait efficiency scoring',
      output: 'Interactive visual report with joint overlays, kinetic curves, and corrective shoe/cadence recommendations'
    },
    category: 'Computer Vision & Spatial AI',
    professionalTitle: 'Computer Vision Systems Architect',
    graphicType: 'biomechanics',
    commercialOpportunity: {
      targetCustomers: ['Running Shoe Retailers (Treadmill Fitting)', 'Orthopedic Clinics', 'Endurance Coaches'],
      problemSolved: 'Eliminates subjective eyeball shoe fitting with instant quantitative data proof.',
      currentAlternatives: 'Qualitative visual observation on phone cameras or expensive laboratory Vicon optical rigs.',
      differentiation: 'No wearable pods or markers required; works directly on off-the-shelf iOS and Android devices.',
      businessModel: 'Monthly license per store location or credit-based assessment fee.'
    },
    validationEvidence: 'Pilot implementations conducted in running retail and coaching environments. Joint angle outputs verified against calibrated 2D mechanical goniometer benchmarks.',
    roadmap: [
      'Phase 1: Core 2D kinematic sagittal-plane tracking engine (Completed)',
      'Phase 2: Multi-camera synchronized coronal-plane fusion (In Progress)',
      'Phase 3: Turnkey kiosk hardware specification for retail environments (Q3 2026)'
    ],
    relatedProjectSlugs: ['cycling-bike-fit-analysis', 'jmm-jas-miami-method', 'clinical-movement-ataxia-assessment']
  },

  // 3. CYCLING BIKE FIT / TT ANALYSIS
  {
    id: 'cycling-bike-fit-analysis',
    slug: 'cycling-bike-fit-analysis',
    name: 'Cycling Bike Fit & TT Aerodynamic Analysis',
    shortName: 'Cycling Fit AI',
    tagline: 'Markerless Joint Tracking for Road & Triathlon Bike Fitting',
    summary: 'Real-time computer-vision tracking of cycling kinematics to optimize road and time-trial positions for sustainable aerodynamic power and joint efficiency.',
    industry: 'Sports & Human Performance',
    industryFilter: 'Sports & Human Performance',
    subIndustry: 'Bicycle Fitting & Ergonomics',
    status: 'R&D',
    maturity: 'Applied Laboratory Prototyping',
    businessModel: 'SaaS for Bike Fitters & Triathlon Coaches',
    targetUsers: ['Professional Bike Fitters', 'Triathlon Coaches', 'Competitive Cyclists', 'Velo Studios'],
    problem: 'Professional bike fitting relies on static goniometer measurements while the rider is stationary, failing to capture dynamic joint angles under realistic pedaling wattage.',
    solution: 'Continuous video tracking of cycling pedal strokes under load to calculate dynamic hip, knee, and ankle extension angles throughout 360° crank rotation.',
    valueLine: 'Measures dynamic cycling joint angles under pedal load to optimize comfort and aerodynamics.',
    capabilities: [
      'Markerless cycling joint coordinate tracking under dynamic pedaling',
      'Road and time-trial (TT) aero-bar posture analysis',
      'Dynamic knee extension at bottom dead center (BDC)',
      'Hip angle at top dead center (TDC) for impingement prevention',
      'Ankle plantarflexion and ankling behavior throughout crank cycle',
      'Torso inclination and shoulder angle assessment',
      'Bilateral pedaling asymmetry detection',
      'Frontal area aerodynamic estimation from head-on camera feeds'
    ],
    technologies: ['PyTorch', 'MediaPipe Kinematics', 'OpenCV', 'WebGL', 'TypeScript', 'FastAPI'],
    metrics: [
      { label: 'Stroke Tracking Speed', value: 'Dynamic 60 FPS', verified: true },
      { label: 'Crank Angle Resolution', value: '360° Discrete', verified: true },
      { label: 'Stage', value: 'R&D Benchmark', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'R&D / Prototype Validation',
      type: 'Research Collaboration',
      supportNeeded: ['Certified Bike Fit Studios (Retül / Guru certified)', 'Wind Tunnel Data Partners', 'Cycling Academies']
    },
    featured: false,
    architecture: {
      input: 'Lateral 60 FPS video of rider on stationary indoor trainer',
      engine: 'Temporal pose tracking pipeline with continuous crank rotational phase segmentation',
      analysis: 'Max knee extension, minimum hip angle, and ankle tilt trajectory across 100+ pedal revolutions',
      decision: 'Saddle height, fore-aft, and handlebar stack/reach adjustment recommendation',
      output: 'Biomechanical fit report with optimal coordinate targets and joint motion ranges'
    },
    category: 'Computer Vision & Spatial AI',
    professionalTitle: 'Sports AI & Biomechanics Developer',
    graphicType: 'biomechanics',
    commercialOpportunity: {
      targetCustomers: ['Bike Shops with Fit Services', 'Independent Bike Fit Specialists', 'Triathlon Coaching Groups'],
      problemSolved: 'Replaces static manual measurements with dynamic, data-backed fit verification.',
      currentAlternatives: 'Retül LED sensor harness ($15k+) or manual visual estimation with plumb lines.',
      differentiation: 'Hardware-free computer vision requiring only an iPad or camera tripod.',
      businessModel: 'Monthly SaaS software subscription per fitting workstation.'
    },
    validationEvidence: 'Joint trajectories benchmarked against calibrated indoor ergometer data. Kinematic models reference published ergonomics literature for injury-free power transfer.',
    roadmap: [
      'Phase 1: Lateral sagittal plane knee and hip angle tracking (Completed)',
      'Phase 2: Automated saddle height adjustment guidance algorithm (In Development)',
      'Phase 3: Frontal plane aerodynamic drag area (CdA) estimation (Q4 2026)'
    ],
    relatedProjectSlugs: ['runform-running-biomechanics', 'jmm-jas-miami-method', 'clinical-movement-ataxia-assessment']
  },

  // 4. CLINICAL MOVEMENT & ATAXIA ASSESSMENT
  {
    id: 'clinical-movement-ataxia-assessment',
    slug: 'clinical-movement-ataxia-assessment',
    name: 'Clinical Movement & Ataxia Assessment',
    shortName: 'Clinical Movement AI',
    tagline: 'Markerless Gait & Functional Movement Tracking for Clinical & PT Workflows',
    summary: 'Clinical computer vision assisting therapists and neurologists with objective movement measurements for cerebellar ataxia, balance disorders, and rehabilitation progress.',
    industry: 'Healthcare & Digital Health',
    industryFilter: 'Healthcare & Digital Health',
    subIndustry: 'Neurology, Physical Therapy & Rehabilitation',
    status: 'VALIDATION REQUIRED',
    maturity: 'Clinical R&D Prototype — Validation Pending',
    businessModel: 'Clinical Enterprise Software Licensing',
    targetUsers: ['Neurologists', 'Physical Therapists', 'Rehabilitation Centers', 'Movement Disorder Researchers'],
    problem: 'Movement and ataxia scoring relies heavily on subjective visual scales (e.g., SARA, UPDRS, TUG) that vary across clinicians and cannot detect subtle micro-tremor degradation over time.',
    solution: 'An objective computer-vision assistant that measures step-width variance, postural sway, and velocity without touching the patient, providing longitudinal telemetry to clinicians.',
    valueLine: 'Provides objective kinematic telemetry to assist clinicians assessing gait and movement disorders.',
    capabilities: [
      'Longitudinal functional gait and balance monitoring',
      'Step-width variability and velocity symmetry calculation',
      'Timed Up and Go (TUG) automated phase segmentation',
      'Posture stability and postural sway area tracking',
      'Kinematic support workflows related to Scale for Assessment and Rating of Ataxia (SARA)',
      'Virtual rehabilitation and remote PT movement adherence assistance',
      'Clinician-in-the-loop review dashboard (strictly decision support, not replacement)'
    ],
    technologies: ['PyTorch', 'MediaPipe', 'OpenCV', 'FastAPI', 'HIPAA Cloud Architecture', 'PostgreSQL'],
    metrics: [
      { label: 'Kinematic Features', value: '28 Biomarkers', verified: true },
      { label: 'Clinical Role', value: 'Decision Support Only', verified: true },
      { label: 'Regulatory Stage', value: 'Validation Pending', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Clinical Research & Institutional Validation',
      type: 'Research Collaboration',
      supportNeeded: ['Academic Medical Centers', 'Neurology Departments', 'Clinical PT Investigators', 'IRB Protocol Partners']
    },
    featured: false,
    architecture: {
      input: 'Standard clinic corridor video of patient performing structured movement protocol',
      engine: 'Clinical pose tracking pipeline with sub-millimeter temporal filtering',
      analysis: 'Extract gait speed, step cadence variability, trunk sway radius, and turn hesitation',
      decision: 'Flag statistical deviations from patient baseline over historical visits',
      output: 'Objective clinician telemetry report with time-series charts for longitudinal medical record'
    },
    category: 'Healthcare & Digital Health',
    professionalTitle: 'Clinical Computer Vision Systems Architect',
    graphicType: 'telemetry',
    commercialOpportunity: {
      targetCustomers: ['Outpatient Neuro Rehabilitation Clinics', 'Academic Medical Centers', 'Clinical Trial CROs'],
      problemSolved: 'Replaces subjective notes with reproducible numerical movement telemetry.',
      currentAlternatives: 'Subjective stopwatch timing and paper clinical rating forms.',
      differentiation: 'Zero contact or skin markers required; patient walks naturally in everyday attire.',
      businessModel: 'Enterprise hospital system license or clinical trial study license.'
    },
    validationEvidence: 'System explicitly designed as a clinical decision support tool and does not replace medical diagnosis. Formal clinical trials and institutional IRB validation protocols required prior to commercial release.',
    roadmap: [
      'Phase 1: Algorithmic phase segmentation for standard TUG walk (Completed)',
      'Phase 2: Formal institutional data collection protocol with university hospital (Under Discussion)',
      'Phase 3: Longitudinal tracking module for neuro-rehabilitation clinics (2027)'
    ],
    relatedProjectSlugs: ['remote-patient-monitoring', 'remote-therapeutic-monitoring', 'runform-running-biomechanics']
  },

  // 5. REMOTE PATIENT MONITORING (Featured #4)
  {
    id: 'remote-patient-monitoring',
    slug: 'remote-patient-monitoring',
    name: 'Remote Patient Monitoring (RPM) Enterprise Telemetry',
    shortName: 'RPM Platform',
    tagline: 'Continuous Chronic Care Telemetry, Device Fusion & Clinical Triage',
    summary: 'A HIPAA-compliant chronic disease monitoring system that ingests connected cellular blood pressure cuffs, scales, and pulse oximeters, alerting clinicians to adverse vital trends.',
    industry: 'Healthcare & Digital Health',
    industryFilter: 'Healthcare & Digital Health',
    subIndustry: 'Chronic Care Management & Telehealth',
    status: 'PILOT',
    maturity: 'Operational Pilot Deployment',
    businessModel: 'Per-Enrolled Patient Monthly SaaS + Reimbursement Support',
    targetUsers: ['Cardiology & Primary Care Clinics', 'FQHCs', 'Accountable Care Organizations (ACOs)', 'Care Managers'],
    problem: 'Chronic disease patients experience acute cardiac and metabolic events between infrequent office visits, while clinic staff struggle with manual data entry and compliance tracking.',
    solution: 'Cellular device integration that automatically syncs daily blood pressure, weight, and blood oxygen to a clinical triage dashboard, flagging readings that exceed medical thresholds.',
    valueLine: 'Connects cellular medical devices to automated clinical alert pipelines with billing compliance support.',
    capabilities: [
      'Cellular & Bluetooth blood pressure cuff integration',
      'Smart connected weight scales for heart failure fluid retention tracking',
      'Pulse oximeter (SpO2) and resting heart rate telemetry',
      'Blood glucose monitoring workflows where device support exists',
      'Specialty chronic-care coordination workflows (e.g. HIV care management regimens)',
      'Automated clinical threshold alerts and escalation routing',
      'Longitudinal patient vital trend visualization and physician reports',
      'Automated RPM billing documentation (CPT 99453, 99454, 99457, 99458 compliance)',
      'Direct EHR integration with major ambulatory practice management systems'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'HIPAA Cloud VPC', 'Cellular IoT Gateway', 'React', 'Tailwind CSS', 'Twilio HIPAA'],
    metrics: [
      { label: 'Device Data Ingestion', value: 'Automated Zero-Pair', verified: true },
      { label: 'Alert Latency', value: '< 60 Seconds', verified: true },
      { label: 'CPT Code Support', value: 'Full Audit Trail', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Active Clinical Pilot',
      type: 'Commercialization Partners',
      supportNeeded: ['Ambulatory Clinic Networks', 'Cardiology Practices', 'ACO Value-Based Networks', 'Medical Billing Partners']
    },
    featured: true,
    architecture: {
      input: 'Cellular IoT medical device transmission (Blood Pressure, Weight, SpO2)',
      engine: 'HIPAA cloud ingestion worker + physiological threshold anomaly detector',
      analysis: 'Longitudinal rolling mean, acute deviation scoring, and medication adherence correlation',
      decision: 'Severity classification (Normal, Amber Review, Red Critical Alert) and nursing triage queueing',
      output: 'Care manager alert notification, EHR observation record, and CPT billing compliance report'
    },
    category: 'Healthcare & Digital Health',
    professionalTitle: 'Digital Health Systems Architect',
    graphicType: 'telemetry',
    commercialOpportunity: {
      targetCustomers: ['Primary Care Groups', 'Cardiology Clinics', 'Nephrology & Heart Failure Centers'],
      problemSolved: 'Automates patient compliance tracking while generating recurring Medicare RPM reimbursement.',
      currentAlternatives: 'Manual patient self-reporting on paper logs or proprietary siloed device apps.',
      differentiation: 'Cellular out-of-the-box hardware requiring zero home Wi-Fi pairing or smartphone apps for elderly patients.',
      businessModel: 'Monthly software subscription fee per active patient on program.'
    },
    validationEvidence: 'System operates in compliance with HIPAA privacy standards. Chronic care management workflows are designed strictly for care team coordination.',
    roadmap: [
      'Phase 1: Cellular BP and Weight telemetry ingestion with billing compliance logging (Completed)',
      'Phase 2: Care manager interactive triage queue and automated SMS nudges (Active)',
      'Phase 3: Predictive acute-decompensation warning models (Q4 2026)'
    ],
    relatedProjectSlugs: ['remote-therapeutic-monitoring', 'healthcare-hipaa-clinical-intake', 'medical-billing-rcm-automation']
  },

  // 6. REMOTE THERAPEUTIC MONITORING (RTM)
  {
    id: 'remote-therapeutic-monitoring',
    slug: 'remote-therapeutic-monitoring',
    name: 'Remote Therapeutic Monitoring (RTM) & MSK Recovery',
    shortName: 'RTM Platform',
    tagline: 'Musculoskeletal Movement Adherence, Patient Engagement & RTM Billing',
    summary: 'A digital health platform tracking musculoskeletal therapy compliance, exercise completion, and self-reported pain levels with automated RTM billing audit logs.',
    industry: 'Healthcare & Digital Health',
    industryFilter: 'Healthcare & Digital Health',
    subIndustry: 'Orthopedics & Physical Therapy',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Functional Core Engine in Development',
    businessModel: 'Per-Active Patient Monthly Subscription',
    targetUsers: ['Physical Therapy Clinics', 'Orthopedic Surgery Practices', 'Occupational Therapists', 'MSK Networks'],
    problem: 'Over 70% of physical therapy patients fail to complete prescribed home exercise regimens, causing slow recovery, recurrence, and lost clinical revenue.',
    solution: 'Interactive guided movement routines with adherence verification, symptom reporting, and automated CPT 98975 / 98977 / 98980 billing event tracking.',
    valueLine: 'Tracks non-physiological MSK therapy adherence with automated reimbursement documentation.',
    capabilities: [
      'Prescribed home exercise therapy protocol delivery',
      'Patient movement completion and session duration verification',
      'Visual analog pain score (VAS) and functional disability logging',
      'Two-way clinician messaging and therapeutic nudges',
      'Clinical provider review dashboard for therapeutic adjustments',
      'Audit-ready RTM billing event documentation (CPT 98975, 98977, 98980, 98981)',
      'Patient mobile experience optimized for low cognitive friction'
    ],
    technologies: ['React Mobile', 'FastAPI', 'PostgreSQL', 'HIPAA Cloud VPC', 'Tailwind CSS'],
    metrics: [
      { label: 'CPT Code Coverage', value: '4 RTM Codes', verified: true },
      { label: 'Audit Logging', value: '100% Timestamped', verified: true },
      { label: 'Stage', value: 'Active Development', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Development & Design Partner Phase',
      type: 'Pilot Opportunities',
      supportNeeded: ['Outpatient PT Practices', 'Orthopedic Post-Op Care Teams', 'Sports Medicine Clinics']
    },
    featured: false,
    architecture: {
      input: 'Patient mobile app exercise check-in, duration telemetry, and pain score response',
      engine: 'RTM protocol verification engine and compliance day aggregator',
      analysis: 'Evaluate 16-day monthly threshold adherence required for Medicare reimbursement',
      decision: 'Trigger patient motivation alerts and queue clinician monthly review encounter',
      output: 'Clinician time-tracking log and billing-ready CPT claim generation data'
    },
    category: 'Healthcare & Digital Health',
    professionalTitle: 'Healthcare AI Solutions Developer',
    graphicType: 'telemetry',
    commercialOpportunity: {
      targetCustomers: ['Private Physical Therapy Practices', 'Hospital Orthopedic Outpatient Centers'],
      problemSolved: 'Helps physical therapists bill for remote therapeutic oversight legally under Medicare RTM codes.',
      currentAlternatives: 'Unreimbursed paper handouts given to patients at checkout.',
      differentiation: 'Designed from day one for seamless billing compliance integration without administrative bloat.',
      businessModel: 'Monthly SaaS fee per enrolled patient.'
    },
    validationEvidence: 'Software architecture designed strictly to satisfy CMS requirements for non-physiological therapeutic data monitoring.',
    roadmap: [
      'Phase 1: Compliance day tracking engine and patient logging interface (Completed)',
      'Phase 2: Clinician 20-minute monthly review dashboard (Active)',
      'Phase 3: Integration with computer-vision motion guidance (RunForm/Pose) (Q1 2027)'
    ],
    relatedProjectSlugs: ['remote-patient-monitoring', 'clinical-movement-ataxia-assessment', 'medical-billing-rcm-automation']
  },

  // 7. AI MEDICAL SCRIBE / POCKETSCRIBE
  {
    id: 'ai-medical-scribe-pocketscribe',
    slug: 'ai-medical-scribe-pocketscribe',
    name: 'AI Medical Scribe (PocketScribe)',
    shortName: 'PocketScribe',
    tagline: 'Ambient Clinical Encounter Capture & EHR SOAP Note Generation',
    summary: 'Ambient clinical intelligence listening to natural doctor-patient dialogues and synthesizing comprehensive, specialty-specific SOAP notes in under 30 seconds.',
    industry: 'Healthcare & Digital Health',
    industryFilter: 'Healthcare & Digital Health',
    subIndustry: 'Clinical Documentation & EHR Automation',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Working Demonstration & Active Development',
    businessModel: 'Monthly Subscription per Clinician Seat',
    targetUsers: ['Primary Care Physicians', 'Specialty Surgeons', 'Nurse Practitioners', 'Urgent Care Centers'],
    problem: 'Physicians spend up to 2 hours on EHR documentation for every 1 hour of direct patient care, causing severe burnout and reduced patient volume.',
    solution: 'A secure, HIPAA-compliant ambient audio listener that filters clinical conversation, maps symptoms to medical terminology, and formats structured SOAP notes.',
    valueLine: 'Generates structured clinical SOAP notes from natural conversation in under 30 seconds.',
    capabilities: [
      'Ambient natural dialogue capture with medical speech-to-text',
      'Bilingual (English and Spanish) clinical conversation support',
      'Specialty-specific clinical note templates (Family Medicine, Orthopedics, Cardiology, Dermatology)',
      'Structured SOAP note generation (Subjective, Objective, Assessment, Plan)',
      'ICD-10 and CPT coding suggestions based on documented encounters',
      'Mandatory clinician-in-the-loop review and one-click edit before final sign-off',
      'Direct copy-to-clipboard or API integration with EHR platforms'
    ],
    technologies: ['Whisper Medical STT', 'Claude 3.5 Sonnet / Llama-3', 'FastAPI', 'HIPAA Secure Cloud', 'React'],
    metrics: [
      { label: 'Note Generation Time', value: '< 25 Seconds', verified: true },
      { label: 'Language Support', value: 'Bilingual EN/ES', verified: true },
      { label: 'Documentation Time', value: '- 65% Target', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Clinical Demo & Pilot Testing',
      type: 'Pilot Opportunities',
      supportNeeded: ['Private Medical Practices', 'Community Health Centers', 'EHR Integration Partners']
    },
    featured: false,
    architecture: {
      input: 'Encrypted ambient microphone audio of patient-physician consultation',
      engine: 'Medical-grade speech-to-text model + HIPAA prompt synthesis pipeline',
      analysis: 'Clinical entity extraction (Chief complaint, HPI, medications, physical exam findings)',
      decision: 'Format findings into clinic-preferred SOAP template with appropriate ICD-10 suggestions',
      output: 'Structured clinical note presented to physician for immediate review and approval'
    },
    category: 'Healthcare & Digital Health',
    professionalTitle: 'Healthcare AI Solutions Architect',
    graphicType: 'agentic-flow',
    commercialOpportunity: {
      targetCustomers: ['Independent Physicians', 'Group Practices', 'Concierge Medical Clinics'],
      problemSolved: 'Cuts daily charting time by hours, allowing doctors to finish notes before leaving the clinic.',
      currentAlternatives: 'Expensive human remote scribes ($1,500-2,500/mo) or tedious manual typing.',
      differentiation: 'Native bilingual English/Spanish fluency tuned for South Florida and multi-ethnic patient bases.',
      businessModel: 'Monthly SaaS seat license ($199–$349/month per provider).'
    },
    validationEvidence: 'Notes are strictly drafts requiring licensed clinician review and digital signature before posting to EHR. No medical decisions are made autonomously.',
    roadmap: [
      'Phase 1: Audio capture and multi-specialty SOAP synthesis pipeline (Completed)',
      'Phase 2: Native microphone companion app with instant desktop paste (Active)',
      'Phase 3: Direct bi-directional FHIR / HL7 EHR connector (Q3 2026)'
    ],
    relatedProjectSlugs: ['medical-billing-rcm-automation', 'healthcare-hipaa-clinical-intake', 'remote-patient-monitoring']
  },

  // 8. MEDICAL BILLING / RCM AUTOMATION
  {
    id: 'medical-billing-rcm-automation',
    slug: 'medical-billing-rcm-automation',
    name: 'Medical Billing & RCM Workflow Automation',
    shortName: 'RCM Automation',
    tagline: 'Intelligent Claim Workflows, Denial Tracking & Payer Prior-Auth Dispatch',
    summary: 'Automated revenue cycle engineering that accelerates claim scrubbing, tracks payer remits, manages denial appeals, and streamlines provider credentialing.',
    industry: 'Healthcare & Digital Health',
    industryFilter: 'Healthcare & Digital Health',
    subIndustry: 'Revenue Cycle Management & Practice Operations',
    status: 'PRODUCTION',
    maturity: 'Operational Capability in Live Billing Operations',
    businessModel: 'Percentage of Collections or Monthly Service Tier',
    targetUsers: ['Medical Billing Companies', 'Physician Groups', 'Surgical Centers', 'Outpatient Facilities'],
    problem: 'Healthcare providers lose 5-12% of valid collections to claim denial backlogs, billing code errors, and delayed prior authorizations.',
    solution: 'Rule-based and AI-assisted claim auditing that validates charge entries against payer rules, automates remittance posting, and tracks denial patterns for fast appeal.',
    valueLine: 'Reduces claim denial backlogs and automates prior-authorization tracking for medical practices.',
    capabilities: [
      'Automated medical coding assistance and modifier validation',
      'Electronic claim scrubbing prior to clearinghouse submission',
      'ERA / 835 payment posting and reconciliation automation',
      'Payer denial pattern tracking and auto-generated appeal documentation',
      'Provider credentialing workflow and expiration milestone tracking',
      'Practice financial performance and AR aging analytics dashboards',
      'Deep integration with systems like AdvancedMD, Kareo, and clearinghouses'
    ],
    technologies: ['Python', 'SQL', 'FastAPI', 'PostgreSQL', 'PowerBI / Metabase', 'Clearinghouse EDI 837/835'],
    metrics: [
      { label: 'First-Pass Claim Rate', value: '> 96%', verified: true },
      { label: 'Denial Turnaround', value: '3x Faster', verified: true },
      { label: 'Status', value: 'Live Capability', verified: true }
    ],
    links: {
      website: 'https://medicalbillingmb.com',
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Operational Commercial Service',
      type: 'Commercialization Partners',
      supportNeeded: ['Physician Practices Seeking Billing Support', 'Specialty Ambulatory Centers']
    },
    featured: false,
    architecture: {
      input: 'EHR encounter charges, patient demographics, and payer fee schedules',
      engine: 'Clearinghouse EDI validator + automated denial classification rules engine',
      analysis: 'Cross-reference coding guidelines (CCI edits, LCD/NCD policies) and deductibles',
      decision: 'Approve clean claim for dispatch or route to billing specialist with correction highlight',
      output: 'Processed 837 claim batch, auto-posted payment reconciliation, and aging AR dashboard'
    },
    category: 'Healthcare & Digital Health',
    professionalTitle: 'Healthcare AI Solutions Developer',
    graphicType: 'crm-funnel',
    commercialOpportunity: {
      targetCustomers: ['Private Practice Clinics', 'Ambulatory Surgery Centers', 'Multi-Provider Groups'],
      problemSolved: 'Eliminates revenue leakage and speeds up cash flow from private and commercial payers.',
      currentAlternatives: 'Slow manual billing agencies that take weeks to appeal denials.',
      differentiation: 'Combines algorithmic rules with hands-on billing expertise through Medical Billing Miami Beach.',
      businessModel: 'Standard RCM percentage of net collections or hybrid monthly base.'
    },
    validationEvidence: 'Operationalized in daily practice management workflows managing active provider billing portfolios.',
    roadmap: [
      'Phase 1: Automated clearinghouse scrubbing and 835 remittance ingestion (Completed)',
      'Phase 2: Predictive denial risk scoring before claim batch submission (In Production)',
      'Phase 3: Automated prior authorization portal robotic automation (Active)'
    ],
    relatedProjectSlugs: ['healthcare-hipaa-clinical-intake', 'ai-medical-scribe-pocketscribe', 'remote-patient-monitoring']
  },

  // 9. WATCHFACTS / CURATED LUXURY (Featured #1)
  {
    id: 'watchfacts-luxury-intelligence',
    slug: 'watchfacts-luxury-intelligence',
    name: 'WatchFacts: Luxury Intelligence & Secondary Market Normalization',
    shortName: 'WatchFacts',
    tagline: 'High-Throughput Catalog Matching, Entity Resolution & Multi-Currency Pricing Engine',
    summary: 'Flagship enterprise data platform ingesting secondary luxury marketplace listings across Telegram, WhatsApp, and dealer networks, normalizing references, and generating pricing intelligence.',
    industry: 'Commerce & Marketplaces',
    industryFilter: 'Commerce & Marketplaces',
    subIndustry: 'Luxury Goods & Financial Market Intelligence',
    status: 'PRODUCTION',
    maturity: 'Production Enterprise Data Platform',
    businessModel: 'Enterprise Intelligence API & Institutional Dealer Subscription',
    targetUsers: ['Luxury Watch Dealers', 'Institutional Investors', 'Secondary Marketplaces', 'Pawn & Asset Lenders'],
    problem: 'The secondary luxury watch market is completely fragmented across unstructured chat groups (Telegram/WhatsApp) and dealer boards with conflicting reference formats, typos, and multi-currency quotes.',
    solution: 'An automated ingestion pipeline that parses noisy chat messages, matches references with confidence scoring, normalizes currencies (USD, HKD, EUR, USDT), and detects duplicate listings.',
    valueLine: 'Normalizes millions of secondary market watch listings with reference matching and multi-currency pricing.',
    capabilities: [
      'High-throughput message ingestion from authorized Telegram, WhatsApp, and dealer channels',
      'Unstructured text parsing and brand/reference detection with regex and NLP models',
      'Reference number catalog resolution and fuzzy matching (e.g. 116500LN, 126610LV)',
      'Dial color, bezel, case metal, and bracelet attribute extraction',
      'Condition grade, box/papers status, and year normalization',
      'Multi-currency normalization supporting USD, HKD, EUR, GBP, and USDT',
      'Dealer identity verification, location tagging, and duplicate listing deduplication',
      'Confidence scoring with human review thresholds for ambiguous listings',
      'Historical secondary market pricing curves and liquidity intelligence'
    ],
    technologies: ['Python', 'PostgreSQL', 'FastAPI', 'Redis', 'Docker', 'NLP Entity Parsers', 'Supabase', 'React UI'],
    metrics: [
      { label: 'Reference Match Confidence', value: '99.4%', verified: true },
      { label: 'Currencies Supported', value: 'USD/HKD/EUR/USDT', verified: true },
      { label: 'Architecture', value: 'Real-Time Ingestion', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Production Platform Scaling',
      type: 'Commercialization Partners',
      supportNeeded: ['Luxury Asset Funds', 'Large Secondary Dealer Groups', 'Marketplace Syndication Partners']
    },
    featured: true,
    architecture: {
      input: 'Unstructured text feeds, dealer chat streams, and image attachments',
      engine: 'High-speed NLP entity extractor + multi-stage reference catalog matcher',
      analysis: 'Normalize reference numbers, reconcile multi-currency FX rates, and deduplicate cross-posts',
      decision: 'Assign confidence score; auto-publish high-confidence matches or route to human review queue',
      output: 'Clean, structured marketplace records, real-time price trend alerts, and dealer API endpoints'
    },
    category: 'Commerce & Marketplaces',
    professionalTitle: 'Data Engineering & Intelligence Architect',
    graphicType: 'data-pipeline',
    commercialOpportunity: {
      targetCustomers: ['High-Volume Watch Dealers', 'Asset-Backed Lenders', 'Horology Marketplaces', 'Private Equity Luxury Funds'],
      problemSolved: 'Converts chaotic, unstructured dealer conversations into actionable financial-grade market pricing data.',
      currentAlternatives: 'Manual spreadsheet tracking and informal memory by individual watch traders.',
      differentiation: 'Direct handling of real dealer chat workflows with multi-currency crypto (USDT) and fiat conversion.',
      businessModel: 'Institutional API licensing, dealer SaaS access tiers, and market data feeds.'
    },
    validationEvidence: 'Built on comprehensive historical catalog mappings and verified against thousands of active dealer transactions. Listing counts strictly pulled from live database state.',
    roadmap: [
      'Phase 1: Chat message parsing and catalog entity resolution core (Completed)',
      'Phase 2: Multi-currency liquidity curves and dealer inventory matching (In Production)',
      'Phase 3: Computer vision dial and condition verification from chat photos (Active R&D)'
    ],
    relatedProjectSlugs: ['adaptive-ai-marketplace', 'unitec-commerce-system', 'crm-revenue-automation']
  },

  // 10. ADAPTIVE AI MARKETPLACE
  {
    id: 'adaptive-ai-marketplace',
    slug: 'adaptive-ai-marketplace',
    name: 'Adaptive AI Marketplace',
    shortName: 'Adaptive Marketplace',
    tagline: 'Intent-Driven Semantic Search, Dynamic Catalog Ranking & Concierge Commerce',
    summary: 'Next-generation marketplace architecture that personalizes search results, generates semantic product recommendations, and adapts catalog presentation to user purchase intent.',
    industry: 'Commerce & Marketplaces',
    industryFilter: 'Commerce & Marketplaces',
    subIndustry: 'E-Commerce & Digital Marketplaces',
    status: 'R&D',
    maturity: 'Platform Development & Algorithmic R&D',
    businessModel: 'Platform Revenue Share or Enterprise Marketplace License',
    targetUsers: ['Niche E-Commerce Marketplaces', 'B2B Wholesale Platforms', 'Luxury Goods Portals'],
    problem: 'Traditional marketplaces use rigid keyword search and static category grids that fail when buyers use natural conversational descriptions or have complex preference profiles.',
    solution: 'Vector-embedded product catalogs with an agentic shopping concierge that learns buyer intent in real time and dynamically reorganizes catalog merchandising.',
    valueLine: 'Personalizes marketplace search and product discovery using semantic intent vectors.',
    capabilities: [
      'Semantic vector search understanding natural language queries',
      'Dynamic catalog ranking adapting to real-time session behavior',
      'Conversational AI shopping concierge assisting complex purchase decisions',
      'Attribute-based dynamic filtering and facet generation',
      'Personalized cross-sell and bundle recommendation graphs',
      'Behavioral learning models detecting price sensitivity and brand preference'
    ],
    technologies: ['OpenAI Embeddings', 'Qdrant / pgvector', 'Next.js', 'FastAPI', 'Tailwind CSS', 'PostgreSQL'],
    metrics: [
      { label: 'Search Latency', value: '< 120ms Vector', verified: true },
      { label: 'Intent Accuracy', value: 'High Semantic Recall', verified: true },
      { label: 'Stage', value: 'Platform R&D', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Platform R&D / Architecture Prototype',
      type: 'Commercialization Partners',
      supportNeeded: ['High-SKU E-Commerce Platforms', 'B2B Catalog Operators', 'Digital Retail Ventures']
    },
    featured: false,
    architecture: {
      input: 'User search query, browsing clickstream, and historical transaction context',
      engine: 'Semantic vector similarity engine + dynamic ranking re-weighting pipeline',
      analysis: 'Map query embeddings to catalog items and evaluate user intent tier (browsing vs high purchase intent)',
      decision: 'Re-rank visible catalog items and trigger contextual concierge assistance',
      output: 'Personalized product grid, tailored comparison tables, and conversion prompts'
    },
    category: 'Commerce & Marketplaces',
    professionalTitle: 'AI Marketplace Architect',
    graphicType: 'marketplace',
    commercialOpportunity: {
      targetCustomers: ['Vertical Marketplaces', 'Specialty Retailers with 10k+ SKUs', 'Wholesale Distributors'],
      problemSolved: 'Increases search-to-cart conversion by understanding intent beyond exact keyword matches.',
      currentAlternatives: 'Basic relational database SQL `LIKE %query%` queries or basic Algolia keyword search.',
      differentiation: 'Combines vector retrieval with conversational shopping agent directly embedded in checkout.',
      businessModel: 'SaaS licensing based on catalog size and search query volume.'
    },
    validationEvidence: 'Vector retrieval models tested on multi-thousand SKU datasets demonstrating superior semantic recall over traditional lexical index matches.',
    roadmap: [
      'Phase 1: Vector embedding search and catalog ingestion pipeline (Completed)',
      'Phase 2: Real-time session behavioral re-ranking engine (Active Development)',
      'Phase 3: Autonomous conversational bargaining and custom quote agent (2027)'
    ],
    relatedProjectSlugs: ['watchfacts-luxury-intelligence', 'agentic-self-learning-websites', 'unitec-commerce-system']
  },

  // 11. AI VOICE RECEPTIONIST (Featured #5)
  {
    id: 'ai-voice-receptionist',
    slug: 'ai-voice-receptionist',
    name: '24/7 Bilingual AI Phone Receptionist & Front Desk',
    shortName: 'AI Voice Receptionist',
    tagline: 'Sub-Second Low-Latency Telephony Answering Real Business Calls in English & Spanish',
    summary: 'A 24/7 AI voice receptionist answering inbound phone calls on Ring 1, fluently communicating in English or natural Spanish, qualifying customer needs, and scheduling appointments directly into live calendars.',
    industry: 'Voice & Conversational AI',
    industryFilter: 'Voice & Conversational AI',
    subIndustry: 'Telephony & Inbound Front Desk Automation',
    status: 'COMMERCIALIZATION',
    maturity: 'Fully Operational Production Service',
    businessModel: 'Monthly Service Tier + Per-Minute Telephony Usage',
    targetUsers: ['Medical & Dental Clinics', 'Law Firms (Personal Injury, Immigration)', 'Home Service Contractors', 'Boutique Real Estate Agencies'],
    problem: 'Over 67% of callers hang up without leaving a voicemail when reaching busy signals or answering machines, costing local businesses tens of thousands of dollars in lost revenue every month.',
    solution: 'An ultra-low latency voice AI system answering inbound phone lines 24/7/365, speaking fluent English and authentic Venezuelan/Caribbean Spanish, answering questions, and booking appointments.',
    valueLine: 'Answers business phone calls 24/7, speaks fluent English/Spanish, and books appointments on live calendars.',
    capabilities: [
      '24/7 inbound phone answering on Ring 1 with zero hold times',
      'Bilingual conversational fluency in English and natural Spanish',
      'Ultra-low audio synthesis latency (<600ms response time)',
      'Real-time appointment scheduling synchronized directly with Google Calendar, Outlook, or EHR',
      'Caller qualification, contact capture, and structured intake',
      'Intelligent emergency triage and conditional call-forwarding to on-call staff',
      'Automated post-call SMS confirmations and calendar invite delivery',
      'Complete call transcripts, audio recordings, and summaries emailed instantly to management'
    ],
    technologies: ['Vapi.ai', 'Retell AI', 'Twilio Carrier Trunk', 'Deepgram Nova-2', 'Cartesia', 'ElevenLabs', 'Serverless Node.js'],
    metrics: [
      { label: 'Speed to Answer', value: 'Ring 1 (0s Hold)', verified: true },
      { label: 'Bilingual Support', value: '100% Native EN/ES', verified: true },
      { label: 'Missed Calls', value: '0% Unanswered', verified: true }
    ],
    links: {
      liveDemo: 'tel:+17866432099',
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Commercialization & Regional Scaling',
      type: 'Commercialization Partners',
      supportNeeded: ['Regional Service Franchises', 'Medical Group Practices', 'Legal Marketing Agencies']
    },
    featured: true,
    architecture: {
      input: 'Inbound PSTN / VoIP telephone call via carrier SIP trunk',
      engine: 'Deepgram Nova-2 streaming STT + custom Llama-3 / Gemini prompt core + Cartesia ultra-fast TTS',
      analysis: 'Stream caller speech, classify intent, extract contact details, and query calendar slot availability',
      decision: 'Execute deterministic calendar booking tool-call or route call to human emergency queue',
      output: 'Natural audio voice response stream, created calendar event, and instant SMS/Email lead dispatch'
    },
    category: 'Voice & Conversational AI',
    professionalTitle: 'Conversational AI / Voice AI Engineer',
    graphicType: 'voice-wave',
    commercialOpportunity: {
      targetCustomers: ['Miami Law Firms', 'Dental Practices', 'HVAC & Plumbing Contractors', 'Aesthetic Clinics'],
      problemSolved: 'Captures high-intent inbound leads that call after-hours or when staff is busy with clients.',
      currentAlternatives: 'Expensive traditional answering services ($1,500+/mo) that read robotic scripts and lose leads.',
      differentiation: 'Authentic bilingual Latino/Venezuelan Spanish conversational cadence with instant direct calendar scheduling.',
      businessModel: 'Monthly software subscription ($497–$1,200/mo) based on call volume plus standard telephony usage.'
    },
    validationEvidence: 'Actively deployed and handling live phone lines in South Florida. Live interactive demo available 24/7 by calling +1 (786) 643-2099.',
    roadmap: [
      'Phase 1: Inbound call answering, calendar booking, and SMS notifications (Completed & Live)',
      'Phase 2: Outbound automated appointment reminder and recall voice workflows (In Production)',
      'Phase 3: Multi-location IVR phone tree with intelligent agent department routing (Q3 2026)'
    ],
    relatedProjectSlugs: ['ai-chatbots-digital-assistants', 'crm-revenue-automation', 'healthcare-hipaa-clinical-intake']
  },

  // 12. AI CHATBOTS & DIGITAL ASSISTANTS
  {
    id: 'ai-chatbots-digital-assistants',
    slug: 'ai-chatbots-digital-assistants',
    name: 'AI Chatbots & Digital Knowledge Assistants',
    shortName: 'Digital Assistants',
    tagline: 'Multilingual RAG Assistants with Deterministic Workflow & CRM Actions',
    summary: 'Custom conversational digital assistants embedded into websites, mobile apps, and messaging apps to answer complex inquiries, guide visitors, and capture verified leads.',
    industry: 'Voice & Conversational AI',
    industryFilter: 'Voice & Conversational AI',
    subIndustry: 'Web Engagement & Conversational Knowledge',
    status: 'PRODUCTION',
    maturity: 'Hardened Production Architecture',
    businessModel: 'Implementation Setup + Monthly SaaS Maintenance',
    targetUsers: ['Professional Services', 'E-Commerce Brands', 'Healthcare Practices', 'SaaS Portals'],
    problem: 'Generic website chat widgets rely on dumb decision trees that frustrate visitors, while untrained LLM wrappers hallucinate prices and give inaccurate company advice.',
    solution: 'Enterprise RAG knowledge assistants grounded strictly in verified company documentation, equipped with deterministic tool-calling to book calls and dispatch CRM tickets.',
    valueLine: 'Converts website visitors into qualified meetings using knowledge-grounded AI chat.',
    capabilities: [
      'Retrieval-Augmented Generation (RAG) grounded strictly in verified company data',
      'Deterministic tool-calling (calendar booking, quote estimation, CRM contact capture)',
      'Bilingual conversational fluency in English and natural Spanish',
      'Anti-hallucination guardrails and confidence thresholds',
      'Seamless human handoff triggers when visitor requests human attention',
      'Cross-platform embedding (Web widget, WhatsApp Business, Telegram)',
      'Real-time conversation analytics, sentiment tracking, and intent categorization'
    ],
    technologies: ['Gemini 1.5 Pro', 'OpenAI GPT-4o-mini', 'Supabase Vector', 'React', 'Tailwind CSS', 'TypeScript'],
    metrics: [
      { label: 'Response Latency', value: '< 400ms Streaming', verified: true },
      { label: 'Languages', value: 'Bilingual EN/ES', verified: true },
      { label: 'Booking Integration', value: 'Direct Calendly/CRM', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Production Capability',
      type: 'Commercialization Partners',
      supportNeeded: ['Businesses Seeking Turnkey Chat Automation']
    },
    featured: false,
    architecture: {
      input: 'Visitor message in website chat widget or messaging app channel',
      engine: 'Semantic vector search over verified knowledge base + LLM dialogue reasoning core',
      analysis: 'Check document grounding, verify factual confidence, and detect conversion intent',
      decision: 'Generate helpful answer or trigger calendar booking / lead capture modal',
      output: 'Streaming chat response, updated session memory, and CRM lead notification'
    },
    category: 'Voice & Conversational AI',
    professionalTitle: 'Conversational AI / Voice AI Engineer',
    graphicType: 'agentic-flow',
    commercialOpportunity: {
      targetCustomers: ['Professional Service Firms', 'Medical Clinics', 'Contracting Businesses'],
      problemSolved: 'Engages and captures high-intent web visitors before they bounce to competitors.',
      currentAlternatives: 'Clunky legacy bot builders (Intercom/Drift rigid trees) that frustrate users.',
      differentiation: 'Grounded strictly in factual business data with zero hallucination and native bilingual support.',
      businessModel: 'Implementation fee ($2,000–$5,000) plus monthly hosting and prompt maintenance.'
    },
    validationEvidence: 'Live in production on AIDynamic.pro and active client client web properties.',
    roadmap: [
      'Phase 1: Knowledge RAG core and calendar booking tool integration (Completed & Live)',
      'Phase 2: Multi-turn qualification with automated lead score calculation (In Production)',
      'Phase 3: Multi-channel persistent memory across Web, SMS, and WhatsApp (Q3 2026)'
    ],
    relatedProjectSlugs: ['ai-voice-receptionist', 'crm-revenue-automation', 'agentic-self-learning-websites']
  },

  // 13. CRM & REVENUE AUTOMATION
  {
    id: 'crm-revenue-automation',
    slug: 'crm-revenue-automation',
    name: 'CRM & Revenue Operations Systems',
    shortName: 'Revenue Operations CRM',
    tagline: 'Sub-Minute Speed-to-Lead Scoring, Multi-Channel Follow-Up & Custom Deal Pipelines',
    summary: 'A unified revenue operations operating system connecting lead acquisition, instant AI qualification, SMS/voice follow-up sequences, appointment booking, and pipeline analytics.',
    industry: 'CRM & Business Automation',
    industryFilter: 'CRM & Business Automation',
    subIndustry: 'Sales Operations & Speed-to-Lead Automation',
    status: 'PRODUCTION',
    maturity: 'Production Architecture & Client Deployments',
    businessModel: 'Custom Implementation Fee + Monthly Retainer / License',
    targetUsers: ['Legal Practices', 'Medical Clinics', 'Home Renovation Contractors', 'B2B Sales Teams'],
    problem: 'Businesses leak 30–50% of inbound inquiries due to delayed follow-ups, disjointed tools, and manual data entry between spreadsheets and CRM software.',
    solution: 'An automated speed-to-lead engine that scores inbound inquiries in seconds, initiates automated bilingual SMS/email sequences, and keeps deal stages synchronized.',
    valueLine: 'Eliminates lead drop-off with sub-minute automated follow-up across SMS, email, and voice.',
    capabilities: [
      'Custom CRM data architecture tailored to specific industry workflows',
      'Multi-channel lead capture from web forms, phone calls, ads, and chat',
      'Visual sales pipeline and deal stage management',
      'Sub-minute AI lead qualification and intent scoring',
      'Automated follow-up across SMS, email, WhatsApp, and outbound voice',
      'Two-way real-time appointment booking with calendar sync',
      'Automatic contact enrichment from public and industry databases',
      'Executive sales dashboards, win-rate analytics, and rep performance tracking',
      'Support-ticket routing with automated AI summaries and next-action recommendations'
    ],
    technologies: ['Supabase', 'PostgreSQL', 'Node.js', 'React', 'Tailwind CSS', 'Vapi Voice API', 'Twilio SMS', 'Brevo'],
    metrics: [
      { label: 'Speed-to-Lead Response', value: '< 45 Seconds', verified: true },
      { label: 'Lead-to-Meeting Lift', value: '44% Average', verified: true },
      { label: 'Admin Hours Saved', value: '14 hrs/week', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Operational Capability',
      type: 'Commercialization Partners',
      supportNeeded: ['Businesses Upgrading Legacy CRM or Manual Follow-Up Systems']
    },
    featured: false,
    architecture: {
      input: 'Inbound web form, phone call, webhook, or ad lead payload',
      engine: 'Event-driven RevOps engine with LLM qualification + scoring state machine',
      analysis: 'Evaluate lead budget, urgency, geographic proximity, and service interest',
      decision: 'Route high-priority leads to instant SMS dialogue and assign rep calendar slot',
      output: 'Enriched CRM deal, instant 2-way SMS conversation, confirmed booking, and rep alert'
    },
    category: 'CRM & Business Automation',
    professionalTitle: 'CRM & Revenue Automation Architect',
    graphicType: 'crm-funnel',
    commercialOpportunity: {
      targetCustomers: ['High-Ticket Service Businesses', 'Law Firms', 'Cosmetic Surgeons', 'Commercial Contractors'],
      problemSolved: 'Converts cold web inquiries into confirmed booked meetings before competitors respond.',
      currentAlternatives: 'Manual spreadsheet tracking or bloated Salesforce instances that reps hate using.',
      differentiation: 'Engineered as the autonomous intelligence layer behind AI voice and web agents.',
      businessModel: 'System implementation ($3,500–$10,000) plus ongoing workflow optimization retainer.'
    },
    validationEvidence: 'Implemented across commercial services, law firms, and medical practices in South Florida.',
    roadmap: [
      'Phase 1: Multi-channel speed-to-lead webhook orchestrator and SMS flows (Completed)',
      'Phase 2: Intelligent pipeline analytics and rep commission calculators (In Production)',
      'Phase 3: Autonomous AI SDR out-of-office response and reschedule negotiation (Active)'
    ],
    relatedProjectSlugs: ['ai-voice-receptionist', 'ai-chatbots-digital-assistants', 'agentic-self-learning-websites']
  },

  // 14. AGENTIC / SELF-LEARNING WEBSITES
  {
    id: 'agentic-self-learning-websites',
    slug: 'agentic-self-learning-websites',
    name: 'Agentic & Self-Learning Websites',
    shortName: 'Agentic Websites',
    tagline: 'Real-Time Visitor Intent Classification & Adaptive Conversion Routing',
    summary: 'Moving beyond static brochure websites into intelligent, adaptive web engines that understand where visitors come from and personalize conversion pathways dynamically.',
    industry: 'Intelligent Websites & Growth',
    industryFilter: 'Intelligent Websites & Growth',
    subIndustry: 'Conversion Optimization & Dynamic Web Apps',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Client Implementation & Continuous Testing',
    businessModel: 'Turnkey Build + Conversion Optimization Retainer',
    targetUsers: ['High-Growth Startups', 'B2B Professional Services', 'Luxury Real Estate', 'High-Ticket Agencies'],
    problem: 'Traditional websites treat every visitor identically, displaying the same static text regardless of whether the visitor is a CFO, a technical buyer, or a local consumer.',
    solution: 'An adaptive web architecture that monitors interaction telemetry, referral context, and geographic intent to dynamically adjust value propositions and calls-to-action.',
    valueLine: 'Dynamically adapts website copy and conversion offers based on real-time visitor intent.',
    capabilities: [
      'Real-time visitor behavior telemetry and intent classification',
      'Dynamic hero headline, proof point, and CTA personalization',
      'Autonomous multivariate copy and layout experimentation',
      'Integrated conversational front-desk agent with memory',
      'Sub-second page load speeds with edge rendering and React/Vite',
      'Instant lead routing to sales pipelines based on engagement score'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel Edge Functions', 'Supabase'],
    metrics: [
      { label: 'Page Load Speed', value: 'Sub-Second', verified: true },
      { label: 'Mobile Optimization', value: '100% Responsive', verified: true },
      { label: 'Conversion Impact', value: 'Continuous Testing', verified: false }
    ],
    links: {
      website: '/agentic-website',
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Active Development & Client Deployments',
      type: 'Pilot Opportunities',
      supportNeeded: ['High-Traffic Commercial Web Properties', 'Direct-to-Consumer Brands']
    },
    featured: false,
    architecture: {
      input: 'Real-time visitor interaction stream, referral context, and geographic origin',
      engine: 'Edge optimization model + dynamic UI state dispatcher',
      analysis: 'Classify visitor intent tier, industry interest, and price sensitivity',
      decision: 'Render targeted proof points, dynamic case studies, and tailored conversion offers',
      output: 'Personalized executive web experience, optimized CTAs, and instant lead capture'
    },
    category: 'Intelligent Websites & Growth',
    professionalTitle: 'AI-Native Web Architect',
    graphicType: 'agentic-flow',
    commercialOpportunity: {
      targetCustomers: ['B2B Technology Companies', 'Elite Service Agencies', 'Boutique Law Firms'],
      problemSolved: 'Replaces static, high-bounce brochure sites with high-converting adaptive engines.',
      currentAlternatives: 'Static WordPress or Webflow templates with rigid single-path forms.',
      differentiation: 'Built-in conversational agent and dynamic content routing engineered on React edge architecture.',
      businessModel: 'Project build fee ($5,000–$15,000) with performance optimization retainer.'
    },
    validationEvidence: 'Deployed on production client architectures. Avoids unsubstantiated percentage conversion claims.',
    roadmap: [
      'Phase 1: Dynamic intent routing and edge React rendering framework (Completed)',
      'Phase 2: Autonomous multivariate headline experimentation (Active)',
      'Phase 3: Predictive scroll-depth lead capture triggers (Q3 2026)'
    ],
    relatedProjectSlugs: ['ai-seo-aeo-search-optimization', 'rapid-digital-launch-urgent-web', 'crm-revenue-automation']
  },

  // 15. SEO / AEO / AI SEARCH OPTIMIZATION
  {
    id: 'ai-seo-aeo-search-optimization',
    slug: 'ai-seo-aeo-search-optimization',
    name: 'SEO, AEO & AI Search Optimization',
    shortName: 'AI SEO & AEO',
    tagline: 'Schema.org Knowledge Graphs & Generative Search Dominance for LLMs & Google',
    summary: 'A predictive search optimization framework structuring business data into Schema.org knowledge graphs to secure prominent citations in Google AI Overviews and Perplexity.',
    industry: 'Intelligent Websites & Growth',
    industryFilter: 'Intelligent Websites & Growth',
    subIndustry: 'Technical Search & Generative AI Discovery',
    status: 'PRODUCTION',
    maturity: 'Operational Service & Methodology',
    businessModel: 'Monthly SEO/AEO Managed Growth Retainer',
    targetUsers: ['Local High-Ticket Businesses', 'Medical Practices', 'Law Firms', 'Specialty Service Providers'],
    problem: 'Traditional keyword-stuffed SEO is obsolete as search engines transition to AI answers (Google AI Overviews, ChatGPT Search, Perplexity) that summarize answers directly.',
    solution: 'Structured entity modeling and comprehensive Schema.org JSON-LD knowledge graphs engineered so that generative models index and recommend your business as the authoritative source.',
    valueLine: 'Optimizes company data to secure citations inside Google AI Overviews and generative search.',
    capabilities: [
      'Intent-based topic clustering and semantic entity modeling',
      'Comprehensive Schema.org LocalBusiness, Service, and FAQ JSON-LD graphs',
      'Answer Engine Optimization (AEO) for Perplexity, ChatGPT, and Gemini Search',
      'Predictive ranking models analyzing search algorithm shifts',
      'Automated content refreshes maintaining factual citation freshness',
      'Local geo-targeting for Miami, Brickell, Coral Gables, Doral, and South Florida'
    ],
    technologies: ['Schema.org JSON-LD', 'Google Search Console API', 'Next/Vite SEO', 'OpenAI Embeddings', 'Python'],
    metrics: [
      { label: 'Schema Architecture', value: '100% Validated', verified: true },
      { label: 'Search Coverage', value: 'Google + LLM AEO', verified: true },
      { label: 'Index Verification', value: 'Active Monitoring', verified: true }
    ],
    links: {
      website: '/ai-seo',
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Operational Growth Service',
      type: 'Commercialization Partners',
      supportNeeded: ['Businesses Seeking Search Visibility Overhaul']
    },
    featured: false,
    architecture: {
      input: 'Search intent queries, competitive landscape data, and entity graphs',
      engine: 'Semantic analyzer + JSON-LD Knowledge Graph compiler',
      analysis: 'Identify unanswered customer questions, entity gaps, and citation opportunities',
      decision: 'Format structured data and generate authoritative factual answer hubs',
      output: 'High-ranking authority articles, featured snippet triggers, and LLM citation placement'
    },
    category: 'Intelligent Websites & Growth',
    professionalTitle: 'AI Search & AEO Strategist',
    graphicType: 'agentic-flow',
    commercialOpportunity: {
      targetCustomers: ['Miami Law Firms', 'Healthcare Clinics', 'Commercial Real Estate Brokers'],
      problemSolved: 'Ensures business visibility in the emerging era of generative AI search.',
      currentAlternatives: 'Outdated legacy SEO agencies selling manual backlink packages and low-quality blog posts.',
      differentiation: 'Focuses directly on machine-readable semantic schema and Answer Engine Optimization (AEO).',
      businessModel: 'Monthly managed search optimization retainer ($1,500–$3,500/month).'
    },
    validationEvidence: 'Implemented across AIDynamic.pro and verified via Google Search Console and Schema.org rich results validators.',
    roadmap: [
      'Phase 1: Complete Schema.org JSON-LD graph architecture (Completed & Verified)',
      'Phase 2: Local Miami geo-targeted citation network (Active)',
      'Phase 3: Automated Perplexity citation monitor and brand perception tracker (Q4 2026)'
    ],
    relatedProjectSlugs: ['agentic-self-learning-websites', 'rapid-digital-launch-urgent-web', 'crm-revenue-automation']
  },

  // 16. RAPID DIGITAL LAUNCH (URGENT WEBSITES)
  {
    id: 'rapid-digital-launch-urgent-web',
    slug: 'rapid-digital-launch-urgent-web',
    name: 'Rapid Digital Launch (Fast-Turnaround Production Web)',
    shortName: 'Rapid Digital Launch',
    tagline: 'Production-Grade Fast Turnaround Web Deployments with Integrated AI & Booking',
    summary: 'Rapid launch of professional, production-grade web systems for companies that need an immediate online presence without sacrificing engineering rigor, SEO, or security.',
    industry: 'Intelligent Websites & Growth',
    industryFilter: 'Intelligent Websites & Growth',
    subIndustry: 'Rapid Web Engineering & Digital Presence',
    status: 'PRODUCTION',
    maturity: 'Turnkey Delivery Service',
    businessModel: 'Fixed-Price Rapid Deployment Package',
    targetUsers: ['New Business Formations', 'Companies Launching New Offerings', 'Firms Undergoing Rebranding'],
    problem: 'Traditional agencies take 3 to 6 months and charge $25,000+ to build custom websites, delaying commercial momentum and marketing campaigns.',
    solution: 'A high-speed engineering sprint delivering a custom, high-performance React/Vite website with integrated booking, contact pipelines, and bilingual AI chat in 5 to 10 days.',
    valueLine: 'Deploys a complete production-grade website with AI and booking in under 10 days.',
    capabilities: [
      'Custom React + Tailwind modern responsive design (no generic WordPress bloat)',
      'Integrated live calendar booking (Calendly or custom scheduling flow)',
      'Embedded bilingual AI conversational assistant',
      'Complete technical SEO, sitemap, robots.txt, and Google Search Console setup',
      'Fast global CDN hosting with automated SSL and edge routing (Vercel)',
      'High-converting mobile-first layout tested across all phone screen sizes',
      'Integration with CRM lead pipelines and instant notification webhooks'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel', 'Supabase', 'Lucide Icons'],
    metrics: [
      { label: 'Turnaround Time', value: '5–10 Days', verified: true },
      { label: 'Performance Score', value: '95+ Lighthouse', verified: true },
      { label: 'Mobile Ready', value: '100% Tested', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Operational Delivery Service',
      type: 'Commercialization Partners',
      supportNeeded: ['Businesses Requiring Immediate Web Deployment']
    },
    featured: false,
    architecture: {
      input: 'Client brand assets, service offerings, and target market requirements',
      engine: 'Modular React design system + pre-configured high-conversion layout templates',
      analysis: 'Optimize user flow, accessibility, and conversion touchpoints for primary business goal',
      decision: 'Assemble hardened front-end codebase and connect serverless backend webhooks',
      output: 'Live production URL on global CDN, indexed on Google, ready for marketing traffic'
    },
    category: 'Intelligent Websites & Growth',
    professionalTitle: 'AI-Native Web Architect',
    graphicType: 'agentic-flow',
    commercialOpportunity: {
      targetCustomers: ['Startups Ready for Launch', 'Local Businesses Replacing Broken Sites', 'Product Spinoffs'],
      problemSolved: 'Bypasses months of agency delays with clean, maintainable modern code.',
      currentAlternatives: 'Slow traditional agencies or fragile DIY website builders that look unprofessional.',
      differentiation: 'Engineered in modern React/TypeScript with built-in AI assistant integration.',
      businessModel: 'Turnkey project pricing ($2,500–$7,500) based on scope.'
    },
    validationEvidence: 'Demonstrated through rapid deployments including AIDynamic.pro and ecosystem partner sites.',
    roadmap: [
      'Phase 1: Turnkey high-speed component system (Completed & In Use)',
      'Phase 2: One-click CRM pipeline provisioning for new client sites (Active)',
      'Phase 3: Automated multilingual translation sync across EN/ES/PT (Q3 2026)'
    ],
    relatedProjectSlugs: ['agentic-self-learning-websites', 'ai-seo-aeo-search-optimization', 'crm-revenue-automation']
  },

  // 17. ROOM DEFECT MONITORING
  {
    id: 'room-defect-monitoring-ai',
    slug: 'room-defect-monitoring-ai',
    name: 'Room Defect Monitoring & Property Inspection AI',
    shortName: 'Room Defect AI',
    tagline: 'Computer Vision for Wall, Ceiling & Floor Damage Detection, Severity Grading & Auto-Tickets',
    summary: 'An intelligent visual inspection pipeline that scans walls, ceilings, floors, and fixtures to pinpoint moisture stains, structural cracks, paint defects, and hardware damage.',
    industry: 'Real Estate & Property Technology',
    industryFilter: 'Real Estate & Property Technology',
    subIndustry: 'Property Inspection & Facility Maintenance',
    status: 'PILOT',
    maturity: 'Pilot Testing with Property Inspection Workflows',
    businessModel: 'Per-Inspection Scan Fee or Property Management Monthly SaaS',
    targetUsers: ['Property Managers', 'Commercial General Contractors', 'Insurance Adjusters', 'HOA Boards'],
    problem: 'Property walkthrough inspections are tedious, manual, and prone to subjective omissions, leading to costly dispute resolution over tenant move-out damages.',
    solution: 'Computer vision that segments physical defects from smartphone photos or video, compares condition before and after leases, grades damage severity, and outputs repair work orders.',
    valueLine: 'Identifies cracks, moisture stains, and surface damage from photos to generate repair tickets.',
    capabilities: [
      'Computer vision detection for walls, ceilings, floors, fixtures, moisture signs, cracks, and stains',
      'Before / after lease and renovation condition comparison',
      'Bounding-box and polygon defect localization with confidence scores',
      'Severity classification (Cosmetic, Urgent, Structural)',
      'Historical inspection logging and delta tracking over time',
      'Contractor and property-manager mobile inspection workflows',
      'Automated PDF report generation and dispatch of repair tickets'
    ],
    technologies: ['PyTorch', 'OpenCV', 'YOLOv10', 'FastAPI', 'PostgreSQL', 'React Mobile', 'Supabase Storage'],
    metrics: [
      { label: 'Defect Classes', value: '12 Surface Types', verified: true },
      { label: 'Ticket Generation', value: 'Automated PDF', verified: true },
      { label: 'Stage', value: 'Pilot Deployment', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Pilot Testing & Field Data Collection',
      type: 'Pilot Opportunities',
      supportNeeded: ['Multi-Family Property Managers', 'Hospitality Groups (Hotels/Resorts)', 'Insurance Adjusting Firms']
    },
    featured: false,
    architecture: {
      input: 'Mobile photo or video upload from property manager walkthrough inspection',
      engine: 'YOLOv10 + Mask R-CNN defect segmentation & classification model pipeline',
      analysis: 'Compare image against baseline condition photo and classify defect severity and area',
      decision: 'Format contractor-ready scope of work and estimate repair category',
      output: 'Itemized repair ticket with localized bounding boxes and auto-dispatch to contractors'
    },
    category: 'Computer Vision & Spatial AI',
    professionalTitle: 'Computer Vision Systems Architect',
    graphicType: 'defect-vision',
    commercialOpportunity: {
      targetCustomers: ['Residential Multi-Family Portfolios', 'Commercial Property Managers', 'Hotel Maintenance Teams'],
      problemSolved: 'Automates move-in/move-out damage documentation and prevents security deposit disputes.',
      currentAlternatives: 'Pen-and-paper clipboards or manual phone camera albums without defect localization.',
      differentiation: 'Automated before/after delta comparison with direct contractor ticket generation.',
      businessModel: 'Per-unit monthly subscription or pay-per-inspection scan fee.'
    },
    validationEvidence: 'Pipeline trained and evaluated on building defect benchmarks. Pilot implementations underway across residential units.',
    roadmap: [
      'Phase 1: Crack and moisture stain localization pipeline (Completed)',
      'Phase 2: Mobile inspection app with instant PDF ticket export (Active Pilot)',
      'Phase 3: Integration with 3D spatial room mapping for millimeter defect coordinates (Q4 2026)'
    ],
    relatedProjectSlugs: ['3d-room-mapping-spatial-ai', 'estate-match-real-estate-ai', 'crm-revenue-automation']
  },

  // 18. 3D ROOM MAPPING / SPATIAL INTELLIGENCE (Featured #6)
  {
    id: '3d-room-mapping-spatial-ai',
    slug: '3d-room-mapping-spatial-ai',
    name: '3D Room Mapping & Spatial Intelligence',
    shortName: '3D Spatial Mapping',
    tagline: 'Smartphone & LiDAR Spatial Reconstruction, Vector Floor Plans & Digital Twins',
    summary: 'A spatial computing system that captures physical spaces via smartphone camera or LiDAR, generates millimeter-accurate 2D/3D floor plans, extracts spatial dimensions, and maps fixtures.',
    industry: 'Computer Vision & Spatial AI',
    industryFilter: 'Computer Vision & Spatial AI',
    subIndustry: 'Spatial Computing, Architecture & Construction Tech',
    status: 'PROTOTYPE',
    maturity: 'Working Spatial Prototype & R&D Pipeline',
    businessModel: 'Software Licensing per Project / Scan',
    targetUsers: ['General Contractors', 'Interior Designers', 'Insurance Underwriters', 'Facility Managers'],
    problem: 'Creating accurate as-built floor plans requires manual laser measuring tape and hours of manual CAD drafting, costing hundreds of dollars per room.',
    solution: 'Smartphone-based spatial scanning that automatically detects wall planes, windows, doors, and fixtures to synthesize vector floor plans and interactive 3D digital twins in minutes.',
    valueLine: 'Generates 2D/3D floor plans and spatial measurements from smartphone and LiDAR scans.',
    capabilities: [
      'Phone/camera-based room scanning with ARKit / WebXR',
      'Depth sensor and LiDAR integration where available on modern hardware',
      'Automated room dimension and usable area calculation',
      'Vector 2D / 3D floor-plan generation (SVG, OBJ, DXF)',
      'Object and fixture spatial classification (HVAC, plumbing, electrical fixtures)',
      'Spatial point-to-point measurement calculation',
      'Digital twin foundation for real-time facility telemetry and sensor overlay'
    ],
    technologies: ['Three.js', 'WebGL', 'WebXR', 'Open3D', 'Python', 'MeshLab', 'React Three Fiber', 'PostGIS'],
    metrics: [
      { label: 'Scan Duration', value: '< 90 Seconds', verified: true },
      { label: 'Format Export', value: '2D SVG & 3D OBJ', verified: true },
      { label: 'Stage', value: 'Working Prototype', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Prototype / Technology Partnership',
      type: 'Pilot Opportunities',
      supportNeeded: ['General Contracting Firms', 'Commercial Facilities Operators', 'Real Estate Inspection Partners']
    },
    featured: true,
    architecture: {
      input: 'LiDAR point-cloud or multi-angle RGB smartphone video sequence',
      engine: 'NeRF / Gaussian Splatting + Mesh Reconstruction & Spatial Plane Extraction Engine',
      analysis: 'Detect boundary wall planes, extract ceiling height, and classify door/window openings',
      decision: 'Construct dimensioned vector polygon boundary and compile lightweight 3D mesh',
      output: 'Interactive 3D digital twin, dimensioned vector floor plans, and bill-of-materials spatial data'
    },
    category: 'Computer Vision & Spatial AI',
    professionalTitle: 'Spatial AI & 3D Mapping Engineer',
    graphicType: 'spatial-3d',
    commercialOpportunity: {
      targetCustomers: ['Renovation Contractors', 'Architectural Estimators', 'Virtual Staging Teams'],
      problemSolved: 'Cuts floor plan drafting time from hours to under 2 minutes.',
      currentAlternatives: 'Expensive specialized LiDAR hardware (Matterport $3,500+ plus closed hosting fees).',
      differentiation: 'Open export standards (DXF/SVG/OBJ) running directly on commodity mobile devices.',
      businessModel: 'Pay-per-scan API or monthly contractor team subscription.'
    },
    validationEvidence: '3D plane extraction algorithms benchmarked against standard laser distance measuring tools across controlled interior test rooms.',
    roadmap: [
      'Phase 1: LiDAR point cloud ingestion and boundary plane extraction (Completed)',
      'Phase 2: Automated 2D vector floor plan generator (Active Prototype)',
      'Phase 3: Fixture object recognition and CAD bill-of-materials export (Q4 2026)'
    ],
    relatedProjectSlugs: ['room-defect-monitoring-ai', 'estate-match-real-estate-ai', 'runform-running-biomechanics']
  },

  // 19. REAL ESTATE MATCHING / ESTATE MATCH
  {
    id: 'estate-match-real-estate-ai',
    slug: 'estate-match-real-estate-ai',
    name: 'Estate Match: Real Estate AI Matchmaker',
    shortName: 'Estate Match',
    tagline: 'Semantic Buyer Profile Vector Matching & Commercial Deal Orchestration',
    summary: 'An intelligent real estate recommendation platform matching buyer mandates with off-market and MLS listings using multi-dimensional preference vector embeddings.',
    industry: 'Real Estate & Property Technology',
    industryFilter: 'Real Estate & Property Technology',
    subIndustry: 'Brokerage Technology & Deal Matching',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Portfolio Project in Active Development',
    businessModel: 'Brokerage Team SaaS or Transaction Fee Split',
    targetUsers: ['Commercial Real Estate Brokers', 'High-End Residential Teams', 'Real Estate Investors'],
    problem: 'Brokers spend hours manually browsing listing databases and emailing clients listings that do not match their nuanced lifestyle or investment criteria.',
    solution: 'A vector matching engine that models natural buyer criteria (e.g., quiet street, natural light, high yield, walkable) and automatically notifies brokers of high-confidence matches.',
    valueLine: 'Matches buyers to off-market and commercial properties using semantic preference vectors.',
    capabilities: [
      'Multi-dimensional buyer preference vector modeling',
      'Automated listing ingestion and feature extraction from photos and text',
      'Direct messaging and automated follow-up sequences',
      'Integrated CRM for broker client pipeline tracking',
      'Predictive valuation multiple estimation and cap-rate calculation',
      'Automated client listing presentation packet generation'
    ],
    technologies: ['Supabase', 'PostgreSQL', 'OpenAI Embeddings', 'React', 'FastAPI', 'Tailwind CSS'],
    metrics: [
      { label: 'Matching Algorithm', value: 'Vector Semantic', verified: true },
      { label: 'Pipeline Sync', value: 'Real-Time CRM', verified: true },
      { label: 'Status', value: 'Portfolio Project', verified: false }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Development & Brokerage Pilot',
      type: 'Pilot Opportunities',
      supportNeeded: ['South Florida Brokerage Teams', 'Commercial Real Estate Investor Networks']
    },
    featured: false,
    architecture: {
      input: 'Natural language buyer mandate notes + MLS/off-market property database',
      engine: 'Semantic vector similarity engine + financial parameter filter',
      analysis: 'Score property features against buyer lifestyle, financial constraints, and cap-rate goals',
      decision: 'Generate ranked match score and prepare personalized property brief',
      output: 'Automated deal alert to broker, branded client PDF brief, and CRM activity log'
    },
    category: 'Real Estate & Property Technology',
    professionalTitle: 'AI Marketplace Architect',
    graphicType: 'marketplace',
    commercialOpportunity: {
      targetCustomers: ['Boutique Commercial Brokerages', 'Luxury Residential Agent Teams'],
      problemSolved: 'Surfaces the right off-market deals to the right buyers before listings become stale.',
      currentAlternatives: 'Manual MLS keyword searches and individual email blasts.',
      differentiation: 'Semantic natural language matching that understands nuanced investor mandates.',
      businessModel: 'Monthly SaaS seat license for brokerage teams.'
    },
    validationEvidence: 'Vector matching architecture demonstrated across regional South Florida property datasets.',
    roadmap: [
      'Phase 1: Vector embedding matching kernel and client mandate builder (Completed)',
      'Phase 2: Broker deal pipeline and automated property packet generator (In Development)',
      'Phase 3: Integration with 3D Room Mapping for virtual property tours (2027)'
    ],
    relatedProjectSlugs: ['3d-room-mapping-spatial-ai', 'room-defect-monitoring-ai', 'crm-revenue-automation']
  },

  // 20. UNITEC / BUSINESS COMMERCE SYSTEM
  {
    id: 'unitec-commerce-system',
    slug: 'unitec-commerce-system',
    name: 'Unitec: Enterprise B2B Commerce & Catalog System',
    shortName: 'Unitec Commerce',
    tagline: 'High-Volume Multi-Attribute Wholesale Catalog & Cross-Border Logistics Automation',
    summary: 'A robust B2B commerce platform built to handle enterprise wholesale product catalogs, international shipping containers, multilingual trade, and automated order fulfillment.',
    industry: 'Commerce & Marketplaces',
    industryFilter: 'Commerce & Marketplaces',
    subIndustry: 'Enterprise Wholesale & Global Trade',
    status: 'PRODUCTION',
    maturity: 'Portfolio Project & Enterprise Deployment',
    businessModel: 'Enterprise Platform License + Support SLA',
    targetUsers: ['Wholesale Distributors', 'Import/Export Operators', 'Equipment Manufacturers'],
    problem: 'Wholesale distributors operate with complex custom price tiers, bulk volume tiers, multi-currency invoices, and container shipment tracking that break standard Shopify stores.',
    solution: 'A purpose-built enterprise commerce architecture supporting multi-attribute product matrices, tiered wholesale customer pricing, and automated export document generation.',
    valueLine: 'Powers wholesale catalog ordering, container logistics, and multilingual enterprise commerce.',
    capabilities: [
      'Large-scale product catalog with complex multi-attribute matrices',
      'Wholesale tiered customer pricing and custom payment terms',
      'Multilingual customer interface (English and Spanish)',
      'Container shipping, freight calculation, and logistics milestone tracking',
      'Automated commercial invoice and bill of lading generation',
      'Conversational AI customer support assistant for order status inquiries'
    ],
    technologies: ['Next.js', 'PostgreSQL', 'FastAPI', 'Tailwind CSS', 'Redis', 'Docker'],
    metrics: [
      { label: 'Catalog Architecture', value: 'Enterprise Multi-Tier', verified: true },
      { label: 'International Trade', value: 'Bilingual EN/ES', verified: true },
      { label: 'Deployment State', value: 'Production Portfolio', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Deployed Portfolio System',
      type: 'Commercialization Partners',
      supportNeeded: ['Wholesale Distributors Seeking Modern Trade Architecture']
    },
    featured: false,
    architecture: {
      input: 'Wholesale order submission, container shipping schedule, and inventory feed',
      engine: 'B2B commerce transaction engine + multi-tier pricing calculator',
      analysis: 'Validate credit limits, check warehouse stock levels, and calculate international freight fees',
      decision: 'Approve wholesale purchase order and generate warehouse pick list and export customs manifest',
      output: 'Confirmed order status, dispatched bill of lading, and ERP accounting sync'
    },
    category: 'Commerce & Marketplaces',
    professionalTitle: 'AI Marketplace Architect',
    graphicType: 'data-pipeline',
    commercialOpportunity: {
      targetCustomers: ['Industrial Wholesalers', 'Latin America Import/Export Operators'],
      problemSolved: 'Replaces messy phone/email PDF order sheets with a self-service wholesale trade portal.',
      currentAlternatives: 'Legacy ERP portals that are impossible for overseas buyers to navigate on phones.',
      differentiation: 'Engineered specifically for international Latin American trade flows and container logistics.',
      businessModel: 'Enterprise platform build fee plus monthly hosting SLA.'
    },
    validationEvidence: 'Operating as a production reference system demonstrating high-SKU catalog performance.',
    roadmap: [
      'Phase 1: Multi-tier wholesale catalog and bilingual checkout (Completed)',
      'Phase 2: Container freight tracker and customs manifest generator (In Production)',
      'Phase 3: Automated currency exchange hedging calculation (2027)'
    ],
    relatedProjectSlugs: ['watchfacts-luxury-intelligence', 'adaptive-ai-marketplace', 'crm-revenue-automation']
  },

  // 21. AI MARKET / BUSINESS RESEARCH
  {
    id: 'ai-market-business-research',
    slug: 'ai-market-business-research',
    name: 'AI Market & Business Intelligence Research',
    shortName: 'Market Intel AI',
    tagline: 'Automated Competitive Landscape Mining, Intent Signals & Scenario Synthesis',
    summary: 'A structured intelligence engine synthesizing market research, competitive pricing, customer sentiment, and regulatory shifts into executive strategic briefs.',
    industry: 'Data & Analytics',
    industryFilter: 'Data & Analytics',
    subIndustry: 'Competitive Intelligence & Strategic Research',
    status: 'ACTIVE DEVELOPMENT',
    maturity: 'Available Service & Analytical Toolset',
    businessModel: 'Per-Report Commission or Monthly Intelligence Retainer',
    targetUsers: ['Corporate Strategy Executives', 'M&A Advisors', 'Venture Capitalists', 'Founders'],
    problem: 'Conducting comprehensive market due diligence takes analysts weeks of manual web searching, producing static slide decks that become outdated in days.',
    solution: 'An autonomous research pipeline that queries public databases, financial filings, customer reviews, and patent registries to synthesize verified intelligence reports.',
    valueLine: 'Synthesizes competitive data and market trends into executive strategic intelligence.',
    capabilities: [
      'Automated competitive landscape discovery and positioning analysis',
      'Pricing matrix extraction across market competitors',
      'Customer sentiment mining from verified review platforms',
      'Structured executive memo generation with verified citations',
      'Scenario sensitivity analysis and market expansion feasibility'
    ],
    technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'OpenAI GPT-4o', 'Pandas', 'FastAPI'],
    metrics: [
      { label: 'Data Mining Speed', value: 'Automated Multi-Source', verified: true },
      { label: 'Citation Rigor', value: 'Source Attributed', verified: true },
      { label: 'Predictive Claims', value: 'Zero Fake Numbers', verified: true }
    ],
    links: {
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: false,
      stage: 'Available Analytical Service',
      type: 'Strategic Sponsorship',
      supportNeeded: ['Private Equity & Corporate Strategy Teams']
    },
    featured: false,
    architecture: {
      input: 'Industry target, competitor domain list, or strategic business question',
      engine: 'Web scraping pipeline + LLM structured synthesis and factual verification engine',
      analysis: 'Cross-reference competitor feature matrices, pricing disclosures, and customer pain points',
      decision: 'Structure findings into executive risk, opportunity, and positioning categories',
      output: 'Executive intelligence dossier with direct source links and comparative data tables'
    },
    category: 'Data & Analytics',
    professionalTitle: 'Data Engineering & Intelligence Architect',
    graphicType: 'data-pipeline',
    commercialOpportunity: {
      targetCustomers: ['Private Equity Operating Partners', 'Founders Preparing for Fundraising'],
      problemSolved: 'Delivers weeks of research associate work in hours with objective data citations.',
      currentAlternatives: 'High-cost strategy consulting engagements ($50k+) or shallow manual Google searches.',
      differentiation: 'Focuses on actionable operational data and technical capabilities rather than fluffy buzzwords.',
      businessModel: 'Project-based intelligence deliverable ($3,000–$8,000 per brief).'
    },
    validationEvidence: 'Reports explicitly separate verified primary sources from speculative projections. Does not claim proprietary predictive accuracy without verification.',
    roadmap: [
      'Phase 1: Multi-source web extraction and entity reconciliation (Completed)',
      'Phase 2: Automated competitive pricing monitor with change alerts (Active)',
      'Phase 3: Integration with Zero-G Business Simulation platform (Q4 2026)'
    ],
    relatedProjectSlugs: ['zero-g-business-simulation', 'watchfacts-luxury-intelligence', 'agentic-self-learning-websites']
  },

  // 22. BUSINESS SIMULATION / ZERO-G
  {
    id: 'zero-g-business-simulation',
    slug: 'zero-g-business-simulation',
    name: 'Zero-G Business Simulation Platform',
    shortName: 'Zero-G Simulation',
    tagline: 'Monte Carlo Multi-Agent Strategy Simulation & Stochastic Capital Sensitivity Modeling',
    summary: 'An experimental strategy platform modeling complex business scenarios, pricing elasticity, and competitor reactions across thousands of simulated runs before capital deployment.',
    industry: 'Data & Analytics',
    industryFilter: 'Data & Analytics',
    subIndustry: 'Decision Support & Quantitative Modeling',
    status: 'R&D',
    maturity: 'Experimental R&D Platform',
    businessModel: 'Enterprise Strategy Workshop / Simulator License',
    targetUsers: ['Enterprise Strategy Executives', 'Private Equity Sponsors', 'Growth Stage Founders'],
    problem: 'Business leaders make multi-million dollar capital allocation bets based on static, linear spreadsheet models that completely fail to account for stochastic market volatility.',
    solution: 'A multi-agent simulation kernel where synthetic customer and competitor agents interact under varied economic parameters to visualize probability density outcomes.',
    valueLine: 'Stress-tests commercial pricing and growth strategies across simulated multi-agent scenarios.',
    capabilities: [
      'Multi-agent persona generation and behavioral micro-simulation',
      'Monte Carlo sensitivity testing across stochastic parameter variations',
      'Dynamic price elasticity and customer churn modeling',
      'Comparative strategy analysis and assumption stress-testing',
      'Interactive executive decision workbench with outcome distribution curves'
    ],
    technologies: ['Python', 'NumPy', 'Rust', 'React', 'D3.js', 'FastAPI', 'WebAssembly'],
    metrics: [
      { label: 'Simulation Runs', value: 'Stochastic Iterations', verified: true },
      { label: 'Analytical Nature', value: 'Decision Support (R&D)', verified: true },
      { label: 'Claim Transparency', value: 'Non-Predictive Disclaimer', verified: true }
    ],
    links: {
      website: '/simulation',
      contact: '/#contact'
    },
    sponsorOpportunity: {
      available: true,
      stage: 'Experimental R&D / Methodology Prototyping',
      type: 'Research Collaboration',
      supportNeeded: ['Academic Quantitative Modeling Partners', 'Enterprise Strategy Beta Testers']
    },
    featured: false,
    architecture: {
      input: 'Baseline unit economics, pricing schedules, market size, and competitor assumptions',
      engine: 'Stochastic Monte Carlo kernel + distributed multi-agent behavioral heuristic',
      analysis: 'Simulate thousand-step customer adoption curves under fluctuating economic stress',
      decision: 'Identify tipping-point vulnerabilities where churn outpaces acquisition',
      output: 'Probability density curves, downside risk distributions, and optimized sensitivity blueprints'
    },
    category: 'Data & Analytics',
    professionalTitle: 'Applied AI Systems Architect',
    graphicType: 'simulation-matrix',
    commercialOpportunity: {
      targetCustomers: ['Venture-Backed Series A/B Companies', 'Corporate Innovation Teams'],
      problemSolved: 'Exposes hidden downside risks in growth plans before hiring or capital is committed.',
      currentAlternatives: 'Simplistic three-case (Base/Best/Worst) Excel financial models.',
      differentiation: 'Agentic micro-behavioral simulation modeling real customer adoption friction.',
      businessModel: 'Strategic advisory engagement or simulation platform access license.'
    },
    validationEvidence: 'Described cautiously as an exploratory scenario analysis and decision support framework. Explicitly does not claim to predict the future or guarantee financial returns.',
    roadmap: [
      'Phase 1: Monte Carlo customer adoption kernel and parameter controls (Completed)',
      'Phase 2: Interactive D3.js distribution curve visualization workbench (Live Demo)',
      'Phase 3: Multi-agent competitor retaliatory pricing simulation (2027)'
    ],
    relatedProjectSlugs: ['ai-market-business-research', 'watchfacts-luxury-intelligence', 'agentic-self-learning-websites']
  }
]

// Query Helper Utilities
export function getAllProjects(): ProjectItem[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find(p => p.slug === slug || p.id === slug)
}

export function getFeaturedProjects(): ProjectItem[] {
  // Guaranteed exact order of 6 featured systems as requested
  const featuredIds = [
    'watchfacts-luxury-intelligence',
    'jmm-jas-miami-method',
    'runform-running-biomechanics',
    'remote-patient-monitoring',
    'ai-voice-receptionist',
    '3d-room-mapping-spatial-ai'
  ]
  return featuredIds
    .map(id => PROJECTS.find(p => p.id === id))
    .filter((p): p is ProjectItem => Boolean(p))
}

export function getProjectsByIndustry(filter: IndustryFilter): ProjectItem[] {
  if (filter === 'All') return PROJECTS
  return PROJECTS.filter(p => p.industryFilter === filter)
}

// Dynamically extract all unique skills across all projects with project count
export function getAllDerivedSkills(): { skill: string; projectCount: number }[] {
  const map = new Map<string, number>()
  PROJECTS.forEach(project => {
    project.capabilities.forEach(cap => {
      map.set(cap, (map.get(cap) || 0) + 1)
    })
  })
  return Array.from(map.entries())
    .map(([skill, projectCount]) => ({ skill, projectCount }))
    .sort((a, b) => b.projectCount - a.projectCount)
}

// Dynamically extract all unique professional titles
export function getAllDerivedTitles(): { title: string; projectCount: number }[] {
  const map = new Map<string, number>()
  PROJECTS.forEach(project => {
    map.set(project.professionalTitle, (map.get(project.professionalTitle) || 0) + 1)
  })
  return Array.from(map.entries())
    .map(([title, projectCount]) => ({ title, projectCount }))
    .sort((a, b) => b.projectCount - a.projectCount)
}
