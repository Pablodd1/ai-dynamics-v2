import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu,
  ExternalLink,
  Globe,
  Lock,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Terminal,
  ArrowRight,
} from 'lucide-react'

interface ArchitectureBlueprint {
  id: string
  label: string
  badge: string
  latency: string
  security: string
  summary: string
  nodes: {
    step: string
    title: string
    tech: string
    detail: string
  }[]
  webhookSample: string
}

const ARCHITECTURE_BLUEPRINTS: ArchitectureBlueprint[] = [
  {
    id: 'voice_crm_pipeline',
    label: '01. JAss Voice & CRM Webhooks',
    badge: 'BILINGUAL VOICE + REVOPS',
    latency: '< 380ms Turn Latency',
    security: 'TLS 1.3 · Signed Webhooks',
    summary:
      'Answers inbound English & Spanish calls, SMS, WhatsApp, and Instagram DMs on Ring 1, qualifies intent, checks live Google/Cal availability, and fires a signed JSON webhook into your CRM.',
    nodes: [
      {
        step: 'INGESTION (RING 1)',
        title: 'Twilio SIP / WhatsApp / IG Graph',
        tech: 'WebRTC · PCM 16kHz Stream',
        detail: 'Zero voicemail drop-off; automatic English/Spanish language detection in 0.4s.',
      },
      {
        step: 'ORCHESTRATION',
        title: 'JAss Low-Latency Voice & Tool Router',
        tech: 'Vapi / Retell + Custom Edge Functions',
        detail: 'Executes live function calls: check_availability, quote_range, verify_insurance.',
      },
      {
        step: 'PERSISTENCE & ACTION',
        title: 'CRM, Calendar & Instant Founder Alert',
        tech: 'Supabase · HubSpot / GHL · Google Calendar API',
        detail: 'Writes structured lead record, creates Google Meet invite, and sends 1-tap SMS bridge alert.',
      },
    ],
    webhookSample: `POST /api/voice-webhook HTTP/1.1
X-Signature-Ed25519: 8f9c2a...e41b
{
  "event": "appointment.confirmed",
  "language": "es-US",
  "latency_ms": 342,
  "caller": { "name": "Dr. Carlos Rivera", "phone": "+17865550192" },
  "booking": { "slot": "2026-11-17T10:30:00-05:00", "meetUrl": "https://meet.google.com/..." },
  "crm_sync": { "supabase": "ok", "brevo_list_id": 36 }
}`,
  },
  {
    id: 'clinical_rcm_engine',
    label: '02. Clinical SOAP & 837 EDI Scrubber',
    badge: 'HEALTHCARE & MEDSPA AI',
    latency: '1.8s Claim Audit',
    security: 'HIPAA-Ready · BAA · AES-256',
    summary:
      'Captures ambient multi-speaker clinical encounters, generates structured ICD-10/CPT SOAP notes, and scrubs 837P/835 EDI claims for modifier or medical-necessity errors prior to clearinghouse submission.',
    nodes: [
      {
        step: 'CLINICAL CAPTURE',
        title: 'Ambient Encounter & Mobile Insurance OCR',
        tech: 'Whisper-Large-v3 · Vision OCR',
        detail: 'Diarizes doctor-patient dialogue in EN/ES and extracts member ID & payer group from card photos.',
      },
      {
        step: 'VALIDATION ENGINE',
        title: 'Deterministic NCCI + LLM Claim Scrubber',
        tech: '837P EDI Parser · ICD-10-CM / CPT Crosswalk',
        detail: 'Flags unbundled codes, missing modifiers (-25, -59), and prior-auth gaps before submission.',
      },
      {
        step: 'EHR / BILLING SYNC',
        title: 'EHR Webhook & Clearinghouse Export',
        tech: 'HL7 FHIR R4 · REST JSON · CSV/PDF Audit',
        detail: 'Pushes verified clinical note and clean claim payload directly to your billing queue.',
      },
    ],
    webhookSample: `POST /v1/rcm/scrub-837p HTTP/1.1
Authorization: Bearer sk_live_aidynamic_hipaa
{
  "encounter_id": "enc_90421_miami",
  "cpt_codes": ["99214", "20610"],
  "modifiers_applied": ["-25"],
  "denial_risk_score": 0.018,
  "status": "CLEARED_FOR_SUBMISSION",
  "estimated_reimbursement_usd": 485.00
}`,
  },
  {
    id: 'vision_rag_pipeline',
    label: '03. Computer Vision & Private RAG',
    badge: 'YOLOV8 + SOVEREIGN RAG',
    latency: '< 120ms Vector Retrieval',
    security: 'Zero Public Model Training',
    summary:
      'Combines custom fine-tuned YOLOv8 + DINOv2 visual inspection models with isolated tenant pgvector RAG for instant contractor photo-to-quote estimating and 100-page legal/escrow contract screening.',
    nodes: [
      {
        step: 'MULTIMODAL INPUT',
        title: 'Smartphone Jobsite Photos or 120-Page PDFs',
        tech: 'YOLOv8x · DINOv2 · LayoutLMv3',
        detail: 'Detects 12+ property/material classes or parses multi-column legal tables & signatures.',
      },
      {
        step: 'ISOLATED VECTOR GRAPH',
        title: 'Tenant-Siloed Hybrid Search (BM25 + Dense)',
        tech: 'PostgreSQL pgvector · HNSW Index (<120ms)',
        detail: 'Retrieves exact local pricing bands, building codes, or statutory clauses with source citations.',
      },
      {
        step: 'DELIVERABLE GENERATION',
        title: 'Branded PDF Quote or Risk Redline Report',
        tech: 'Edge PDF Renderer · Instant SMS / Email Link',
        detail: 'Delivers a client-ready estimate or redlined contract summary in under 60 seconds.',
      },
    ],
    webhookSample: `POST /v1/vision/photo-to-quote HTTP/1.1
Content-Type: application/json
{
  "project_type": "commercial_glazing_doral",
  "detected_defects": ["seal_failure", "frame_corrosion"],
  "estimated_sq_ft": 420,
  "quote_range_usd": { "low": 6800, "high": 7950 },
  "pdf_quote_url": "https://www.aidynamic.pro/quotes/q_88412.pdf"
}`,
  },
  {
    id: 'fullstack_agentic_web',
    label: '04. Full-Stack Web & Mobile Apps',
    badge: 'REACT / NEXT.JS + SUPABASE',
    latency: '5–10 Day Production Launch',
    security: 'Row-Level Security · Edge CDN',
    summary:
      'We architect, code, and deploy complete custom web and mobile SaaS applications from scratch—engineered with AEO/GEO structured schema so ChatGPT, Perplexity, Gemini, and Google cite your business first.',
    nodes: [
      {
        step: 'FRONTEND & MOBILE UX',
        title: 'High-FPS React 19 / Next.js / TypeScript Apps',
        tech: 'Tailwind CSS · Framer Motion · PWA / iOS / Android',
        detail: 'Sub-second LCP, bilingual EN/ES interfaces, and 10-second Direct Connect conversion hubs.',
      },
      {
        step: 'BACKEND & REALTIME DB',
        title: 'Serverless API + Relational & Vector Database',
        tech: 'Node.js Edge API · Supabase Postgres · RLS Auth',
        detail: 'Multi-tenant authentication, Stripe billing, Google Calendar OAuth, and automated CRM pipelines.',
      },
      {
        step: 'AI SEARCH AUTHORITY',
        title: 'LLM Answer-Engine Optimization (AEO / GEO)',
        tech: 'JSON-LD Graph · llms.txt · Dynamic Sitemaps',
        detail: 'Built from day one to rank inside ChatGPT Search, Gemini, Perplexity, and Google Local Pack.',
      },
    ],
    webhookSample: `// Full-Stack Production Architecture Deployed in 5-10 Days
{
  "stack": ["React 19 / Next.js", "TypeScript", "Supabase RLS", "Vercel Edge"],
  "integrations": ["Stripe", "Google Calendar Meet API", "Brevo CRM", "JAss Voice"],
  "aeo_readiness": { "llms_txt": true, "json_ld_entities": 14, "cwv_lcp_ms": 640 }
}`,
  },
]

const LIVE_PROPRIETARY_PLATFORMS = [
  {
    name: 'PocketScribe Clinical AI',
    domain: 'pocketscribe.online',
    url: 'https://pocketscribe.online/?utm_source=aidynamic_pro&utm_medium=homepage_showcase',
    category: 'Healthcare & Clinical SaaS',
    stack: 'React · Whisper Medical ASR · SOAP Structuring · HIPAA Flow',
    metric: '-45% Charting Time',
    description:
      'Production ambient clinical scribe web application that converts natural doctor-patient conversations in English and Spanish into structured EHR-ready SOAP notes in seconds.',
  },
  {
    name: 'Real Estate Dates PropTech',
    domain: 'realestatedates.com',
    url: 'https://realestatedates.com/?utm_source=aidynamic_pro&utm_medium=homepage_showcase',
    category: 'Real Estate & Legal Tech',
    stack: 'Full-Stack Web App · Contract OCR · Automated Escrow Telemetry',
    metric: 'Zero Missed Deadlines',
    description:
      'Custom transaction timeline and escrow deadline orchestration platform built for brokers, title companies, and real estate attorneys to parse contracts and automate critical date alerts.',
  },
  {
    name: 'Chat Building Innovation',
    domain: 'chatbuildinginnovation.us',
    url: 'https://www.chatbuildinginnovation.us/?utm_source=aidynamic_pro&utm_medium=homepage_showcase',
    category: 'Construction & AEC Intelligence',
    stack: 'Blueprint Vision AI · Florida Building Code RAG · Contractor CRM',
    metric: '60-Sec Scope & Code Check',
    description:
      'Full-stack construction and permit intelligence application engineered for general contractors, architects, and developers to query building codes and automate project estimating.',
  },
  {
    name: 'Medical Billing Miami Beach',
    domain: 'medicalbillingmb.com',
    url: 'https://medicalbillingmb.com/?utm_source=aidynamic_pro&utm_medium=homepage_showcase',
    category: 'Healthcare Revenue Cycle (RCM)',
    stack: '837/835 EDI Scrubber · Denial Recovery AI · Direct Connect Hub',
    metric: '18% → 2.4% Denial Rate',
    description:
      'HIPAA-aligned revenue cycle management and automated medical billing platform that detects duplicate CPT charges and recovers denied claims for South Florida clinics.',
  },
  {
    name: 'JAS Miami Method Biometrics',
    domain: 'jasmiamimethod.fit',
    url: 'https://jasmiamimethod.fit/?utm_source=aidynamic_pro&utm_medium=homepage_showcase',
    category: 'Computer Vision & Biometrics App',
    stack: '33-Joint Pose Kinematics · Wearable HRV Stream · Adaptive AI',
    metric: 'Real-Time Telemetry',
    description:
      'Proprietary athletic performance and biomechanics web application combining smartphone pose estimation with daily biometric adaptation algorithms.',
  },
]

export default function SystemArchitectureShowcase() {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(ARCHITECTURE_BLUEPRINTS[0].id)
  const [showWebhookCode, setShowWebhookCode] = useState<boolean>(false)

  const activeBlueprint =
    ARCHITECTURE_BLUEPRINTS.find((b) => b.id === activeBlueprintId) || ARCHITECTURE_BLUEPRINTS[0]

  return (
    <section
      id="architecture-and-apps"
      className="relative py-20 sm:py-24 bg-[#07070c] border-y border-white/10 overflow-hidden"
    >
      {/* Subtle Ambient Gold/Cyan Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[320px] bg-luxury-gold/[0.06] rounded-full blur-[140px]" />
        <div className="absolute bottom-8 right-1/4 w-[450px] h-[300px] bg-emerald-500/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* PART 1: Interactive Systems Architecture & Webhook Integration Blueprint */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luxury-gold/35 bg-luxury-gold/10 text-luxury-gold font-mono text-xs uppercase tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>Full-Stack Systems Architecture · Built From Scratch, Never Generic Templates</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                How Our Custom Apps &amp; AI Engines{' '}
                <span className="text-luxury-gold font-normal italic">
                  Connect to Your Existing Stack
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-luxury-silver leading-relaxed">
                Whether you need a <strong className="text-white">custom full-stack web/mobile application</strong> built in 5–10 days or an autonomous AI pipeline wired into your current phone line, EHR, or CRM, click any architecture below to inspect the exact data flow.
              </p>
            </div>

            {/* Security & Compliance Assurance Strip */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 px-4 py-2.5 rounded-xl shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>HIPAA-Ready · SOC 2 Aligned · Zero Public Model Training</span>
            </div>
          </div>

          {/* 4 Architecture Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {ARCHITECTURE_BLUEPRINTS.map((bp) => {
              const isActive = bp.id === activeBlueprint.id
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-luxury-gold/15 border-luxury-gold text-white shadow-lg shadow-luxury-gold/10'
                      : 'bg-white/[0.03] border-white/10 text-luxury-silver hover:border-white/25 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold mb-1">
                    {bp.badge}
                  </div>
                  <div className="text-sm font-bold text-white">{bp.label}</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-1.5">{bp.latency}</div>
                </button>
              )
            })}
          </div>

          {/* Active Architecture Pipeline Card */}
          <div className="rounded-2xl border border-luxury-gold/30 bg-[#0d0d15]/90 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-luxury-gold/20 border border-luxury-gold/40 text-[11px] font-mono font-bold text-luxury-champagne">
                    {activeBlueprint.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                    {activeBlueprint.latency}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-luxury-silver flex items-center gap-1">
                    <Lock className="w-3 h-3 text-luxury-gold" />
                    {activeBlueprint.security}
                  </span>
                </div>
                <p className="text-sm text-luxury-silver leading-relaxed">{activeBlueprint.summary}</p>
              </div>

              {/* Progressive Disclosure Toggle for CTOs / Developers */}
              <button
                type="button"
                onClick={() => setShowWebhookCode(!showWebhookCode)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:border-luxury-gold/50 hover:bg-luxury-gold/10 text-xs font-mono text-luxury-champagne transition-all shrink-0"
              >
                <Terminal className="w-4 h-4 text-luxury-gold" />
                <span>{showWebhookCode ? 'Hide API / Webhook Payload' : 'Inspect Live Webhook / JSON Schema'}</span>
              </button>
            </div>

            {/* 3-Stage Visual Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeBlueprint.nodes.map((node, index) => (
                <div
                  key={node.step}
                  className="relative p-5 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-luxury-gold">
                        {node.step}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-xs font-mono font-bold flex items-center justify-center">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{node.title}</h3>
                    <div className="text-[11px] font-mono text-emerald-400 mb-2.5">{node.tech}</div>
                    <p className="text-xs text-luxury-silver leading-relaxed">{node.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Technical Webhook / Schema Drawer */}
            {showWebhookCode && (
              <div className="mt-5 p-4 rounded-xl bg-black/90 border border-luxury-gold/30 font-mono text-xs text-emerald-300 overflow-x-auto">
                <div className="text-[10px] uppercase tracking-widest text-luxury-silver mb-2 flex items-center justify-between">
                  <span>SAMPLE PRODUCTION WEBHOOK / SCHEMA PAYLOAD</span>
                  <span className="text-luxury-gold">200 OK · Sub-Second Execution</span>
                </div>
                <pre className="leading-relaxed whitespace-pre-wrap">{activeBlueprint.webhookSample}</pre>
              </div>
            )}
          </div>
        </div>

        {/* PART 2: Live Production Full-Stack Web & Mobile Applications Showcase */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 font-mono text-xs uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>Live Production Software Ecosystem · Undeniable Engineering Proof</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Live Web &amp; AI Platforms Engineered From Scratch by Our Team
              </h3>
              <p className="mt-2 text-sm sm:text-base text-luxury-silver">
                Unlike wrapper agencies that only configure chatbots, we build and operate full-scale production SaaS platforms across healthcare, real estate, construction, and computer vision. Click any platform below to test it live:
              </p>
            </div>

            <Link
              to="/connect?mode=call&utm_source=homepage_architecture_showcase"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-luxury-gold text-dark font-bold text-xs sm:text-sm hover:brightness-110 transition-all shrink-0 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>10-Sec Direct Connect (Call / Text / Virtual)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIVE_PROPRIETARY_PLATFORMS.map((app) => (
              <a
                key={app.domain}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-luxury-gold/45 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-gold">
                      {app.category}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                      ● {app.metric}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white group-hover:text-luxury-champagne transition-colors flex items-center justify-between">
                    <span>{app.name}</span>
                    <ExternalLink className="w-4 h-4 text-luxury-silver group-hover:text-luxury-gold transition-colors shrink-0" />
                  </h4>

                  <div className="text-xs font-mono text-luxury-gold/80 mt-0.5 mb-2.5">{app.domain}</div>

                  <p className="text-xs text-luxury-silver leading-relaxed mb-4">{app.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-luxury-silver/70 truncate">{app.stack}</span>
                  <span className="text-luxury-gold font-bold shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Launch Live ↗
                  </span>
                </div>
              </a>
            ))}

            {/* 6th Card: Custom App & 48-Hr Prototype CTA Card */}
            <div className="p-5 rounded-2xl border-2 border-luxury-gold/45 bg-gradient-to-br from-luxury-gold/15 via-[#0d0d15] to-[#0a0a0f] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>Your Custom App or Workflow Next</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">
                  Build Your Custom Web/Mobile App or 48-Hr AI Prototype
                </h4>
                <p className="text-xs text-luxury-silver leading-relaxed mb-4">
                  Start with a flat <strong className="text-white">$99 60-Min Workflow Audit + Free 48-Hour Custom AI Prototype</strong> (guaranteed to uncover $2,500+/mo in savings or you pay $0), or launch a full custom application in 5 to 10 days.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/booking"
                  className="py-2.5 px-3 rounded-xl bg-luxury-gold text-dark font-bold text-xs text-center hover:brightness-110 transition-all"
                >
                  Book $99 Audit →
                </Link>
                <Link
                  to="/connect?mode=call"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs text-center transition-all"
                >
                  📞 Direct Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
