export interface EcosystemMember {
  id: string
  name: string
  url: string
  domains: string[]
  tagline: string
  category: string
  badge: string
  description: string
  color: string
  featured?: boolean
}

export const ECOSYSTEM_MEMBERS: EcosystemMember[] = [
  {
    id: "ai-dynamics",
    name: "AI Dynamic Pro",
    url: "https://www.aidynamic.pro/",
    domains: ["aidynamic.pro", "www.aidynamic.pro"],
    tagline: "Bespoke Enterprise AI Engineering, Automation & Voice Systems",
    category: "Applied AI & Automation",
    badge: "AI Flagship",
    description: "Custom autonomous AI agents, 24/7 bilingual voice receptionists, computer vision quality inspection, and enterprise workflows.",
    color: "#c5a059",
    featured: true
  },
  {
    id: "chat-building-innovation",
    name: "Chat Building Innovation",
    url: "https://www.chatbuildinginnovation.us/",
    domains: ["chatbuildinginnovation.us", "www.chatbuildinginnovation.us"],
    tagline: "AI-Powered Construction, Architecture & Permit Intelligence",
    category: "Construction & AEC Tech",
    badge: "AEC Intelligence",
    description: "Intelligent blueprints processing, contractor workflows, real-time code compliance, and construction document automation.",
    color: "#0ea5e9",
    featured: true
  },
  {
    id: "pocketscribe",
    name: "PocketScribe",
    url: "https://pocketscribe.online/",
    domains: ["pocketscribe.online", "www.pocketscribe.online"],
    tagline: "Ambient AI Clinical Scribe & Medical Documentation Assistant",
    category: "Clinical AI & HealthTech",
    badge: "Clinical AI",
    description: "Converts natural clinical encounters into structured SOAP notes, reducing charting burden and automating EHR data entry.",
    color: "#10b981",
    featured: true
  },
  {
    id: "real-estate-dates",
    name: "Real Estate Dates",
    url: "https://realestatedates.com/",
    domains: ["realestatedates.com", "www.realestatedates.com"],
    tagline: "AI Transaction Timeline & Deadline Orchestration for Real Estate",
    category: "Real Estate & PropTech",
    badge: "PropTech",
    description: "Automated contract milestone tracking, escrow deadline alerts, and closing coordination for top real estate professionals.",
    color: "#f59e0b",
    featured: true
  },
  {
    id: "jas-miami-method",
    name: "JAS Miami Method",
    url: "https://jasmiamimethod.fit/",
    domains: ["jasmiamimethod.fit", "www.jasmiamimethod.fit"],
    tagline: "AI-Driven Endurance Coaching & Biometric Performance Adaptation",
    category: "Sports & Human Performance",
    badge: "Athletic Biometrics",
    description: "Daily adaptive training algorithms using HRV, wearable biometric streams, and computer vision biomechanics for athletes.",
    color: "#8b5cf6",
    featured: true
  },
  {
    id: "unitec-usa-design",
    name: "Unitec USA Design",
    url: "https://www.unitecusadesign.com/",
    domains: ["unitecusadesign.com", "www.unitecusadesign.com"],
    tagline: "Architectural Millwork, Luxury Commercial Interiors & 3D Engineering",
    category: "Design & Architectural Engineering",
    badge: "Design & 3D",
    description: "High-end commercial architectural millwork, parametric drafting, and custom luxury fabrication across South Florida.",
    color: "#d97706",
    featured: true
  },
  {
    id: "305business",
    name: "305business",
    url: "https://305business-llc.vercel.app/",
    domains: ["305business-llc.vercel.app"],
    tagline: "Miami Business Formation, Growth & Operational Scaling",
    category: "Business Advisory",
    badge: "Enterprise Services",
    description: "Strategic advisory, corporate infrastructure, and digital transformation consulting for South Florida businesses.",
    color: "#6366f1",
    featured: false
  },
  {
    id: "medical-billing-mb",
    name: "Medical Billing Miami Beach",
    url: "https://medicalbillingmb.com/",
    domains: ["medicalbillingmb.com", "www.medicalbillingmb.com"],
    tagline: "HIPAA-Compliant Revenue Cycle Management & Medical Billing",
    category: "Healthcare Operations",
    badge: "Healthcare RevOps",
    description: "Comprehensive billing, claims submission, denial management, and patient payment automation for medical clinics.",
    color: "#06b6d4",
    featured: false
  }
]
