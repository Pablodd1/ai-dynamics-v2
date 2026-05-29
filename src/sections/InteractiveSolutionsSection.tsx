import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, HeartPulse, Scale, Smartphone, Globe, Play, CheckCircle, RefreshCw, Sparkles, Database, FileText, PhoneCall
} from 'lucide-react';

interface MockBilingualOutput {
  lang: string;
  translation: string;
  destination: string;
  action: string;
}

interface SolutionTab {
  id: string;
  name: string;
  icon: any;
  title: string;
  desc: string;
  roi: string;
  roiLabel: string;
  features: string[];
  pipeline: { step: string; desc: string; icon: any }[];
  bilingualDemo: {
    english: { input: string; output: MockBilingualOutput };
    spanish: { input: string; output: MockBilingualOutput };
  };
}

const solutions: SolutionTab[] = [
  {
    id: "robotics",
    name: "Robotics & IoT",
    icon: Bot,
    title: "Autonomous Fleet & Robotics Integration",
    desc: "We bridge the physical-digital divide. Our multi-agent setups coordinate physical robot agents, IoT optical sensors, and drone scanners using real-time hardware APIs and machine vision.",
    roi: "-78% Audit Cost",
    roiLabel: "Warehouse Inventory Overhead",
    features: [
      "Real-time LiDAR point-cloud coordinate extraction & path planning",
      "Optical label discrepancy analysis using GPT-4o vision feed",
      "Autonomous hardware obstacle feedback loops and API overrides",
      "High-frequency sensor state syncing to corporate ERP databases"
    ],
    pipeline: [
      { step: "Discrepancy", desc: "Sensors detect layout anomaly in warehouse row", icon: Bot },
      { step: "Path Planning", desc: "Nous Hermes calculates spatial flight coordinates", icon: RefreshCw },
      { step: "Visual Audit", desc: "OpenAI Vision identifies misplaced inventory boxes", icon: Globe },
      { step: "ERP Update", desc: "Autonomous database update via secure API", icon: Database }
    ],
    bilingualDemo: {
      english: {
        input: "LiDAR scan shows sensor misalignment in warehouse sector B4.",
        output: {
          lang: "English (No Translation Needed)",
          translation: "LiDAR scan shows sensor misalignment in warehouse sector B4.",
          destination: "Local ROS Robot Controller Node",
          action: "Triggering automatic camera self-calibration routine; coordinates saved."
        }
      },
      spanish: {
        input: "El sensor óptico del contenedor 12 está dañado y no lee el código de barras.",
        output: {
          lang: "Spanish (Auto-Translated)",
          translation: "The optical sensor of container 12 is damaged and does not read the barcode.",
          destination: "IoT Maintenance & Fleet Dispatch Node",
          action: "Flagging container 12 for manual repair; routing spare drone camera to scan bin labels."
        }
      }
    }
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    icon: HeartPulse,
    title: "Clinical Workflow & SOAP Note Automation",
    desc: "Cut patient processing times in half. Our medical-grade agent frameworks automate HIPAA-compliant clinical intake, SOAP note charting, insurance coverage verification, and triage booking.",
    roi: "15 min/patient",
    roiLabel: "Reclaimed Clinical Documentation",
    features: [
      "Bilingual patient intake via conversational telephony voice agents",
      "Autonomous SOAP chart generation from doctor-patient audio logs",
      "Insurance validation against Aetna, Cigna, Blue Cross, and Medicaid",
      "Automatic EHR syncing conforming to HL7 and FHIR clinical standards"
    ],
    pipeline: [
      { step: "Voice Triage", desc: "Bilingual phone agent records patient symptoms", icon: PhoneCall },
      { step: "Policy Check", desc: "Hermes checks policy eligibility in database", icon: Database },
      { step: "SOAP Charting", desc: "Claude compiles HL7-compliant medical documentation", icon: FileText },
      { step: "Appointment Lock", desc: "Booking finalized and SMS confirmation sent", icon: CheckCircle }
    ],
    bilingualDemo: {
      english: {
        input: "I need to schedule a cardiology consult under my Medicare insurance.",
        output: {
          lang: "English (No Translation Needed)",
          translation: "I need to schedule a cardiology consult under my Medicare insurance.",
          destination: "Cardiology Clinical Intake CRM",
          action: "Verifying Medicare policy #MED-940; mapping cardiology slot next Tuesday at 10 AM."
        }
      },
      spanish: {
        input: "Hola, tengo dolor de pecho y mi seguro es Aetna Oro, ¿cubre mi consulta?",
        output: {
          lang: "Spanish (Auto-Translated)",
          translation: "Hello, I have chest pain and my insurance is Aetna Gold, does it cover my consultation?",
          destination: "Critical Triage Queue & Billing Node",
          action: "Triggering priority intake ticket; cross-referencing Aetna policy; Aetna Gold covers 100% of cardiology."
        }
      }
    }
  },
  {
    id: "legal",
    name: "Attorney & Law",
    icon: Scale,
    title: "AI Attorney Deposition & Contract Auditor",
    desc: "Supercharge commercial law operations. Our legal agents ingest thousand-page deeds, locate liability anomalies, cross-reference state case precedents, and draft ironclad briefs in minutes.",
    roi: "92% Reduction",
    roiLabel: "Due Diligence Bottlenecks",
    features: [
      "Deep semantic scanning of leases, deeds, and partnership agreements",
      "Automatic identification of indemnification and mutual liability conflicts",
      "Precedent lookup against Florida Law Reports & Federal Case Law databases",
      "Drafting legal briefs and boilerplate addendums under lawyer supervision"
    ],
    pipeline: [
      { step: "Deed Ingest", desc: "Lease document uploaded to secure environment", icon: FileText },
      { step: "Semantic Audit", desc: "Claude locates indemnity anomalies and conflicts", icon: Sparkles },
      { step: "Precedent Scrape", desc: "Nous Hermes cross-references Florida Law precedent", icon: Database },
      { step: "Draft Addendum", desc: "Automated Florida-compliant brief draft generated", icon: Scale }
    ],
    bilingualDemo: {
      english: {
        input: "Audit Section 14.2 of the lease for restrictive mutual indemnity loopholes.",
        output: {
          lang: "English (No Translation Needed)",
          translation: "Audit Section 14.2 of the lease for restrictive mutual indemnity loopholes.",
          destination: "Legal Contract Analysis Engine",
          action: "Discovered conflict on mutual indemnification limits; drafting liability amendment page."
        }
      },
      spanish: {
        input: "Necesito un informe del caso Silva contra Flagler Development del 2024.",
        output: {
          lang: "Spanish (Auto-Translated)",
          translation: "I need a report on the 2024 case Silva v. Flagler Development.",
          destination: "Florida Case Law Database Node",
          action: "Scraping case files; generated a 3-page executive report on Silva v. Flagler Dev (2024)."
        }
      }
    }
  },
  {
    id: "frontdesk",
    name: "Front Desk Optimizers",
    icon: Smartphone,
    title: "AI Auto-Receptionist & Booking Agent",
    desc: "Never miss another call or lead. Build front-desk optimization agents that manage multi-line phone calls, schedule calendars, qualify inbound leads, and communicate natively in English and Spanish.",
    roi: "24/7/365",
    roiLabel: "Omni-Channel Lead Coverage",
    features: [
      "Real-time voice telephony call handling via Twilio & OpenAI APIs",
      "Bilingual Spanish-English conversation switching without delays",
      "Direct Google Calendar and Microsoft Outlook appointment booking",
      "WhatsApp & SMS lead follow-ups and CRM registration automation"
    ],
    pipeline: [
      { step: "Call Inbound", desc: "Customer dials business line; AI receptionist greets", icon: PhoneCall },
      { step: "Lead Qualify", desc: "AI questions user for specific budget and timeline", icon: Sparkles },
      { step: "Calendar Synced", desc: "Available booking times loaded and reserved", icon: Database },
      { step: "CRM Sync", desc: "Complete call details logged under lead ID", icon: CheckCircle }
    ],
    bilingualDemo: {
      english: {
        input: "Hey, can I reschedule my appointment tomorrow to 3:30 PM?",
        output: {
          lang: "English (No Translation Needed)",
          translation: "Hey, can I reschedule my appointment tomorrow to 3:30 PM?",
          destination: "Corporate Scheduling Engine",
          action: "Checked calendar; 3:30 PM is available. Appointment rescheduled; dispatching SMS confirmation."
        }
      },
      spanish: {
        input: "Quiero agendar una llamada de consulta con el equipo técnico para el viernes.",
        output: {
          lang: "Spanish (Auto-Translated)",
          translation: "I want to schedule a consultation call with the technical team for Friday.",
          destination: "Sales Pipeline Booking CRM",
          action: "Creating new lead account; booking Friday consultation; sending bilingual invitation calendar link."
        }
      }
    }
  }
];

export const InteractiveSolutionsSection = () => {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'spanish'>('spanish');
  const [demoState, setDemoState] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [demoResult, setDemoResult] = useState<MockBilingualOutput | null>(null);

  const currentSol = solutions.find(s => s.id === activeTab) || solutions[1];

  const handleTestBilingualRouter = () => {
    setDemoState('analyzing');
    setDemoResult(null);

    setTimeout(() => {
      const demoData = currentSol.bilingualDemo[selectedLanguage];
      setDemoResult(demoData.output);
      setDemoState('done');
    }, 1500); // 1.5s simulated routing delay
  };

  // Reset demo when tab changes
  useEffect(() => {
    setDemoState('idle');
    setDemoResult(null);
  }, [activeTab]);

  return (
    <section id="solutions" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-10 border-t border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h3 className="font-[cursive] text-2xl md:text-4xl text-[#B600A8] mb-4">Enterprise Verticals</h3>
          <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,5.5vw,75px)] leading-none mb-6">
            Industry Solutions
          </h2>
          <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed">
            We architect end-to-end automations tuned for high-growth sectors. Select an industry below to test our bilingual processing engine and inspect automated agent pipelines.
          </p>
        </div>

        {/* Custom Tabs Navigation (Responsive Row/Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-[#151515] p-2 rounded-3xl border border-[#D7E2EA]/10 max-w-4xl mx-auto w-full">
          {solutions.map(sol => {
            const Icon = sol.icon;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === sol.id
                    ? 'bg-[#B600A8] text-white shadow-lg shadow-[#B600A8]/25'
                    : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{sol.name}</span>
                <span className="sm:hidden">{sol.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left Column: Visual Pipeline flowchart */}
            <div className="lg:col-span-5 bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 mb-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-3 py-1 rounded-full border border-[#B600A8]/20 mb-4 inline-block">
                  Automated Pipeline Architecture
                </span>
                <h3 className="font-bold text-2xl uppercase">Agent Data Flow</h3>
              </div>

              {/* Vertical flow map */}
              <div className="relative z-10 flex flex-col gap-6 pl-4 my-4">
                {currentSol.pipeline.map((p, i) => {
                  const StepIcon = p.icon;
                  return (
                    <div key={p.step} className="flex gap-4 relative items-start group">
                      {/* Connector Line */}
                      {i < currentSol.pipeline.length - 1 && (
                        <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#B600A8] to-[#D7E2EA]/10 -mb-6 z-0"></div>
                      )}
                      
                      {/* Step Circle */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#151515] to-[#0C0C0C] border border-[#B600A8]/40 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                        <StepIcon size={18} className="text-[#B600A8]" />
                      </div>

                      <div className="flex flex-col pt-1">
                        <span className="text-xs font-bold uppercase text-[#D7E2EA]/40 tracking-wider">Step 0{i+1}: {p.step}</span>
                        <span className="text-[13px] text-[#D7E2EA] font-medium leading-tight max-w-[280px]">{p.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom ROI Stats Card */}
              <div className="relative z-10 mt-6 pt-6 border-t border-[#D7E2EA]/10 flex justify-between items-center bg-[#0C0C0C]/40 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 block">Guaranteed Performance</span>
                  <span className="font-bold text-sm uppercase text-white">Target ROI Metric</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-2xl text-[#FF8A00] block leading-none">{currentSol.roi}</span>
                  <span className="text-[10px] text-[#D7E2EA]/50 uppercase tracking-wider">{currentSol.roiLabel}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Descriptions & Live Bilingual Router widget */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Vertical Description & Features Card */}
              <div className="bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black uppercase text-[clamp(1.5rem,3vw,32px)] mb-4 text-[#D7E2EA] tracking-wide">
                    {currentSol.title}
                  </h3>
                  <p className="font-light leading-relaxed text-sm sm:text-base opacity-80 mb-6">
                    {currentSol.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentSol.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle size={16} className="text-[#FF8A00] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-[13px] opacity-70 leading-normal">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bilingual Query Router Sandbox Widget */}
              <div className="bg-[#0C0C0C] border border-[#D7E2EA]/15 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#18011F]/10 to-transparent pointer-events-none"></div>

                <div className="flex justify-between items-center pb-4 border-b border-[#D7E2EA]/10 mb-4 z-10 relative">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-[#B600A8]" />
                    <span className="font-bold text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                      Bilingual Input Router Sandbox
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-0.5 rounded border border-[#FF8A00]/20">
                    Live Demo
                  </span>
                </div>

                <div className="z-10 relative flex flex-col gap-4">
                  <p className="text-xs opacity-60 font-light leading-snug">
                    Simulate how our translation routing systems index voice/text commands, perform real-time translations, and execute matching database actions.
                  </p>

                  {/* Language selection switches */}
                  <div className="flex items-center justify-between gap-4 bg-[#151515] p-2 rounded-2xl border border-[#D7E2EA]/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D7E2EA]/50 pl-2">Select Sandbox Phrase Language:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedLanguage('english')}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all ${
                          selectedLanguage === 'english'
                            ? 'bg-[#D7E2EA]/15 text-white'
                            : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setSelectedLanguage('spanish')}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all ${
                          selectedLanguage === 'spanish'
                            ? 'bg-[#D7E2EA]/15 text-white'
                            : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]'
                        }`}
                      >
                        Español
                      </button>
                    </div>
                  </div>

                  {/* Phrase input box */}
                  <div className="bg-[#151515] p-4 rounded-2xl border border-[#D7E2EA]/10 font-mono text-xs md:text-sm text-[#D7E2EA] italic flex items-center justify-between">
                    <span className="truncate max-w-[85%]">
                      &quot;{currentSol.bilingualDemo[selectedLanguage].input}&quot;
                    </span>
                    <button
                      disabled={demoState === 'analyzing'}
                      onClick={handleTestBilingualRouter}
                      className="bg-[#B600A8] text-white p-2.5 rounded-xl hover:scale-105 transition-transform shrink-0 disabled:bg-[#151515] disabled:text-[#D7E2EA]/30 border border-[#B600A8]/20"
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>

                  {/* Sandbox Simulated Output */}
                  <div className="bg-[#151515]/40 border border-[#D7E2EA]/10 rounded-2xl p-4 min-h-[120px] flex flex-col justify-center">
                    {demoState === 'idle' && (
                      <div className="text-center opacity-40 font-mono text-xs uppercase tracking-widest py-6">
                        Click the trigger button above to initiate sandbox audit
                      </div>
                    )}

                    {demoState === 'analyzing' && (
                      <div className="flex flex-col items-center justify-center gap-2 py-6">
                        <RefreshCw size={24} className="animate-spin text-[#B600A8]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/40 animate-pulse font-light">
                          Bilingual router resolving routing protocols...
                        </span>
                      </div>
                    )}

                    {demoState === 'done' && demoResult && (
                      <div className="font-mono text-[11px] sm:text-xs text-[#D7E2EA] space-y-2">
                        <div className="flex justify-between items-center text-[10px] opacity-40 pb-1 border-b border-[#D7E2EA]/5">
                          <span>ROUTING SCHEDULER RESPONSE</span>
                          <span>STATUS: OK</span>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <span className="text-[#B600A8] font-bold">Input Language:</span>
                          <span className="opacity-80">{demoResult.lang}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <span className="text-[#B600A8] font-bold">Semantic Translation:</span>
                          <span className="opacity-80 font-light">&quot;{demoResult.translation}&quot;</span>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <span className="text-[#FF8A00] font-bold">Assigned Node:</span>
                          <span className="opacity-80">{demoResult.destination}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <span className="text-[#10B981] font-bold">Action Dispatched:</span>
                          <span className="opacity-80 font-light leading-relaxed">{demoResult.action}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
