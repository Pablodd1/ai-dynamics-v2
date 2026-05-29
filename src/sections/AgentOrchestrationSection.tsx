import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Cpu, Terminal, Sparkles, Languages, Activity, FileText } from 'lucide-react';

interface LogStep {
  agent: 'META' | 'CLAUDE' | 'HERMES' | 'OPENAI';
  message: string;
  timestamp: string;
}

interface Workflow {
  title: string;
  desc: string;
  icon: any;
  metric: string;
  metricLabel: string;
  steps: LogStep[];
}

const workflows: Workflow[] = [
  {
    title: "Healthcare Front Desk",
    desc: "Autonomous reception, bilingual patient triage, schedule matching, and record updates.",
    icon: Languages,
    metric: "-25 hrs/wk",
    metricLabel: "Staff Reception Time",
    steps: [
      { agent: 'META', message: "🚨 Incoming telephone call detected. Caller ID: Miami (305) 555-8910. Spanish language requested. Launching intake workflow.", timestamp: "18:04:00" },
      { agent: 'CLAUDE', message: "💬 [Claude / Open Claw] Voice stream analyzed. Spanish dialogue translated: 'Hola, necesito programar una cita para cardiología y actualizar mi seguro.' Sentiment check: Anxious. Recommending priority dispatch.", timestamp: "18:04:01" },
      { agent: 'META', message: "⚡ Meta-Agent routes data. Delegating medical database query & policy check to Nous Hermes 3 (Fast Local SQL Engine).", timestamp: "18:04:02" },
      { agent: 'HERMES', message: "💾 [Nous Hermes 3] Querying hospital database: `SELECT slots FROM schedule WHERE dept='cardio' AND date >= '2026-06-02';` Cross-referencing insurance policy: 'Aetna Platinum'. Slot available: June 2nd, 10:00 AM. Verified insurance covers 100% of consult.", timestamp: "18:04:03" },
      { agent: 'META', message: "📢 Database confirmation verified. Tasking OpenAI with bilingual voice synthesis, outbound calling stream, and WhatsApp confirmation.", timestamp: "18:04:04" },
      { agent: 'OPENAI', message: "📞 [OpenAI] Outbound speech synthesized in warm Spanish (accent: Miami). Initiating confirmation sequence. Telephony feedback: Patient confirmed slot. Sending immediate WhatsApp confirmation and drafting SOAP intake notes.", timestamp: "18:04:05" },
      { agent: 'META', message: "✅ Workflow successfully completed. Hospital EHR updated under ID #MED-9402. Triage logs stored. Ready for next agent request.", timestamp: "18:04:06" }
    ]
  },
  {
    title: "Legal Contract & Briefing",
    desc: "Scans hundreds of pages of leases, audits liabilities, drafts legal briefs, and flags anomalies.",
    icon: FileText,
    metric: "-92%",
    metricLabel: "Contract Audit Delay",
    steps: [
      { agent: 'META', message: "🚨 Contract upload detected: 412-page commercial lease and legal brief. Document ID: #LAW-8820. Triggering legal audit audit sequence.", timestamp: "18:04:10" },
      { agent: 'CLAUDE', message: "🔎 [Claude / Open Claw] Performing deep semantic scan of lease contract. Flagged: 3 major liability anomalies. Note: Section 14.2 contains non-standard mutual indemnity. Section 27 contains a restrictive non-compete clause for Dade County.", timestamp: "18:04:12" },
      { agent: 'META', message: "⚡ Semantic anomalies logged. Delegating Florida case law precedent scraping and contract correction compilation to Nous Hermes 3.", timestamp: "18:04:13" },
      { agent: 'HERMES', message: "⚖️ [Nous Hermes 3] Querying local precedent database. Matching case: *Silva v. Flagler Dev (2024)*. Compiling legal boilerplate amendment to neutralize mutual indemnity discrepancy. Drafting Florida-compliant legal brief additions.", timestamp: "18:04:15" },
      { agent: 'META', message: "📜 Legal correction drafted. Prompting OpenAI to dispatch executive summary notification, billable hours log, and PDF comparison output.", timestamp: "18:04:16" },
      { agent: 'OPENAI', message: "📧 [OpenAI] Compiling PDF comparison and drafting executive email brief for Lead Attorney. Initiating billing registry: logged 1.2 billable minutes (saved 8.5 hours manual labor). Pushing draft contract directly to internal team Slack.", timestamp: "18:04:17" },
      { agent: 'META', message: "✅ Legal workflow completed. Anomalies resolved, brief compiled, and lawyer notified. Document locked under SHA-256.", timestamp: "18:04:18" }
    ]
  },
  {
    title: "Robotics & Drone Logistics",
    desc: "Autonomous hardware inspection, LiDAR scan cross-referencing, and drone flight dispatch.",
    icon: Cpu,
    metric: "90 sec",
    metricLabel: "Aisle Inventory Audits",
    steps: [
      { agent: 'META', message: "🚨 Warehouse discrepancy detected in Row 14, Bin C. Database records: 80 camera sensors; optical scanner detects only 74. Triggering drone audit.", timestamp: "18:04:30" },
      { agent: 'CLAUDE', message: "🤖 [Claude / Open Claw] Reviewing inventory discrepancy and logs. Initiating target confirmation: 'Discrepancy of 6 units detected.' Drafting hardware safety protocol checklist and path authorization guidelines.", timestamp: "18:04:31" },
      { agent: 'META', message: "⚡ Flight protocol generated. Dispatching flight path planning and IoT hardware coordinate commands to Nous Hermes 3.", timestamp: "18:04:32" },
      { agent: 'HERMES', message: "🚁 [Nous Hermes 3] Accessing IoT drone API. Generating collision-avoidance flight plan: (X:34.2, Y:11.8, Z:4.5). Activating LiDAR camera, flashing orange guide lights, and initiating drone launch.", timestamp: "18:04:34" },
      { agent: 'META', message: "📸 Drone is hover-stable in Row 14. Transferring real-time video stream analysis and object label counting to OpenAI vision engine.", timestamp: "18:04:35" },
      { agent: 'OPENAI', message: "👁️ [OpenAI] Running real-time computer vision frame analysis. Detected: 6 microchip packages fell behind Bin B partition. Executing OCR validation on box serials. Drone returning to dock. Central ERP inventory updated.", timestamp: "18:04:37" },
      { agent: 'META', message: "✅ Drone inspection complete. Inventory corrected to 80 units. Discrepancy successfully resolved in 90 seconds.", timestamp: "18:04:38" }
    ]
  }
];

export const AgentOrchestrationSection = () => {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState<LogStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const currentWorkflow = workflows[activeWorkflowIdx];

  // Auto scroll terminal logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle running simulation
  useEffect(() => {
    let timer: any;
    if (isRunning && activeStep < currentWorkflow.steps.length) {
      timer = setTimeout(() => {
        if (activeStep === -1) {
          setLogs([]);
          setActiveStep(0);
        } else {
          setLogs(prev => [...prev, currentWorkflow.steps[activeStep]]);
          setActiveStep(prev => prev + 1);
        }
      }, activeStep === -1 ? 200 : 1200); // Initial delay then type each step
    } else if (activeStep >= currentWorkflow.steps.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, activeStep, activeWorkflowIdx]);

  const startSimulation = (idx: number) => {
    setActiveWorkflowIdx(idx);
    setLogs([]);
    setActiveStep(-1);
    setIsRunning(true);
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'CLAUDE': return 'text-[#A855F7] border-[#A855F7]/30 bg-[#A855F7]/10'; // Purple for Claude
      case 'HERMES': return 'text-[#FF8A00] border-[#FF8A00]/30 bg-[#FF8A00]/10'; // Orange for Hermes
      case 'OPENAI': return 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10'; // Emerald for OpenAI
      default: return 'text-[#D7E2EA] border-[#D7E2EA]/20 bg-[#D7E2EA]/5';
    }
  };

  const getActiveAgent = () => {
    if (!isRunning || activeStep <= 0) return 'NONE';
    const step = currentWorkflow.steps[activeStep - 1];
    return step ? step.agent : 'NONE';
  };

  const currentAgent = getActiveAgent();

  return (
    <section id="agents" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-10 border-t border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <h3 className="font-[cursive] text-2xl md:text-4xl text-[#FF8A00] mb-4">Enterprise Architecture</h3>
            <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,5vw,70px)] leading-none mb-6">
              Agents of Agents (AoA)
            </h2>
            <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl leading-relaxed">
              We design multi-agent networks that think, collaborate, and execute. A central Meta-Agent orchestrates custom specialized sub-agents powered by best-in-class models.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:self-end bg-[#151515] p-1.5 rounded-2xl border border-[#D7E2EA]/10">
            {workflows.map((wf, idx) => {
              const Icon = wf.icon;
              return (
                <button
                  key={wf.title}
                  onClick={() => startSimulation(idx)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all ${
                    activeWorkflowIdx === idx && isRunning
                      ? 'bg-[#FF8A00] text-black shadow-lg shadow-[#FF8A00]/25'
                      : activeWorkflowIdx === idx
                      ? 'bg-[#D7E2EA]/15 text-[#D7E2EA]'
                      : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5'
                  }`}
                >
                  <Icon size={16} />
                  {wf.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Console and Diagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Flowchart & Agent Network */}
          <div className="lg:col-span-5 bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
            
            {/* Visual network lines using pure CSS */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D7E2EA_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00] bg-[#FF8A00]/10 px-3 py-1 rounded-full border border-[#FF8A00]/20 mb-6 inline-block">
                Network Status: {isRunning ? 'Active Orchestration' : 'Idle / Ready'}
              </span>
              <h3 className="font-bold text-2xl uppercase mb-8">Collaborative Model Loop</h3>
            </div>

            {/* Interactive Network Diagram */}
            <div className="relative h-[280px] flex items-center justify-center my-6 z-10">
              
              {/* Meta-Agent Circle (Center) */}
              <motion.div 
                animate={isRunning ? { scale: [1, 1.05, 1], boxShadow: ["0 0 10px rgba(215,226,234,0.1)", "0 0 25px rgba(215,226,234,0.3)", "0 0 10px rgba(215,226,234,0.1)"] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-28 h-28 rounded-full border-2 border-[#D7E2EA] bg-[#0C0C0C] flex flex-col items-center justify-center text-center p-3 relative z-30 transition-all ${
                  currentAgent === 'META' ? 'scale-110 shadow-xl shadow-[#D7E2EA]/20 border-white' : ''
                }`}
              >
                <Activity size={24} className="text-[#D7E2EA] mb-1 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase">Meta-Agent</span>
                <span className="text-[8px] opacity-60 uppercase">AoA Router</span>
              </motion.div>

              {/* Sub-Agent Nodes (Surrounding) */}
              
              {/* Claude / Open Claw (Top-Left) */}
              <div className="absolute -top-4 left-4 z-20">
                <motion.div 
                  animate={currentAgent === 'CLAUDE' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-24 h-24 rounded-full border bg-[#0C0C0C] flex flex-col items-center justify-center p-2 text-center transition-all ${
                    currentAgent === 'CLAUDE' 
                      ? 'border-[#A855F7] shadow-lg shadow-[#A855F7]/30 scale-105' 
                      : 'border-[#D7E2EA]/20 opacity-60'
                  }`}
                >
                  <span className="text-xs font-black text-[#A855F7] mb-1 tracking-wider uppercase">Open Claw</span>
                  <span className="text-[9px] font-light opacity-80 uppercase leading-none">Claude 3.5</span>
                  <span className="text-[8px] opacity-40 uppercase mt-1">Deep Logic</span>
                </motion.div>
              </div>

              {/* Nous Hermes (Right) */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 z-20">
                <motion.div 
                  animate={currentAgent === 'HERMES' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-24 h-24 rounded-full border bg-[#0C0C0C] flex flex-col items-center justify-center p-2 text-center transition-all ${
                    currentAgent === 'HERMES' 
                      ? 'border-[#FF8A00] shadow-lg shadow-[#FF8A00]/30 scale-105' 
                      : 'border-[#D7E2EA]/20 opacity-60'
                  }`}
                >
                  <span className="text-xs font-black text-[#FF8A00] mb-1 tracking-wider uppercase">Nous Hermes</span>
                  <span className="text-[9px] font-light opacity-80 uppercase leading-none">Llama Engine</span>
                  <span className="text-[8px] opacity-40 uppercase mt-1">SQL / Actions</span>
                </motion.div>
              </div>

              {/* OpenAI (Bottom-Left) */}
              <div className="absolute -bottom-4 left-4 z-20">
                <motion.div 
                  animate={currentAgent === 'OPENAI' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-24 h-24 rounded-full border bg-[#0C0C0C] flex flex-col items-center justify-center p-2 text-center transition-all ${
                    currentAgent === 'OPENAI' 
                      ? 'border-[#10B981] shadow-lg shadow-[#10B981]/30 scale-105' 
                      : 'border-[#D7E2EA]/20 opacity-60'
                  }`}
                >
                  <span className="text-xs font-black text-[#10B981] mb-1 tracking-wider uppercase">OpenAI API</span>
                  <span className="text-[9px] font-light opacity-80 uppercase leading-none">GPT-4o / Voice</span>
                  <span className="text-[8px] opacity-40 uppercase mt-1">Voice & Sync</span>
                </motion.div>
              </div>

              {/* Glowing SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                {/* Meta to Claude */}
                <line 
                  x1="50%" y1="50%" x2="25%" y2="20%" 
                  stroke={currentAgent === 'CLAUDE' ? '#A855F7' : 'rgba(215, 226, 234, 0.15)'} 
                  strokeWidth={currentAgent === 'CLAUDE' ? 3 : 1}
                  className="transition-all duration-300"
                />
                {/* Meta to Hermes */}
                <line 
                  x1="50%" y1="50%" x2="80%" y2="50%" 
                  stroke={currentAgent === 'HERMES' ? '#FF8A00' : 'rgba(215, 226, 234, 0.15)'} 
                  strokeWidth={currentAgent === 'HERMES' ? 3 : 1}
                  className="transition-all duration-300"
                />
                {/* Meta to OpenAI */}
                <line 
                  x1="50%" y1="50%" x2="25%" y2="80%" 
                  stroke={currentAgent === 'OPENAI' ? '#10B981' : 'rgba(215, 226, 234, 0.15)'} 
                  strokeWidth={currentAgent === 'OPENAI' ? 3 : 1}
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* ROI Metrics card for active flow */}
            <div className="relative z-10 mt-auto pt-6 border-t border-[#D7E2EA]/10 flex justify-between items-center bg-[#0C0C0C]/50 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 block">Target Improvement</span>
                <span className="font-bold text-lg text-white uppercase">{currentWorkflow.title}</span>
              </div>
              <div className="text-right">
                <span className="font-black text-2xl text-[#FF8A00] block leading-none">{currentWorkflow.metric}</span>
                <span className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wide">{currentWorkflow.metricLabel}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Console / Terminal Output */}
          <div className="lg:col-span-7 bg-[#0C0C0C] border border-[#D7E2EA]/15 rounded-3xl p-6 flex flex-col justify-between h-[520px] shadow-2xl relative">
            
            {/* Terminal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#D7E2EA]/10">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-[#FF8A00]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-semibold">
                  AoA_Console_V4.8.sys
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto font-mono text-[11px] sm:text-xs md:text-[13px] py-4 pr-2 scrollbar-thin text-[#D7E2EA]/95 space-y-4 max-h-[360px]">
              
              {logs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                  <Terminal size={40} className="mb-4 text-[#D7E2EA]" />
                  <p className="uppercase tracking-widest text-[11px] mb-2 font-bold">Terminal Inactive</p>
                  <p className="text-[10px] max-w-xs font-light">Select a workflow template above and click the trigger action to run the multi-agent orchestration simulation.</p>
                </div>
              )}

              <AnimatePresence initial={false}>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-40">
                      <span className="uppercase font-semibold tracking-wider">{log.agent} NODE PROCESS</span>
                      <span>{log.timestamp}</span>
                    </div>
                    
                    <div className={`p-3 rounded-xl border flex items-start gap-2.5 leading-relaxed font-light ${getAgentColor(log.agent)}`}>
                      <span className="font-bold shrink-0 mt-0.5">&gt;</span>
                      <span>{log.message}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isRunning && (
                <div className="flex items-center gap-2 p-3 text-xs italic text-[#D7E2EA]/40 animate-pulse font-light">
                  <Cpu size={14} className="animate-spin" />
                  Orchestrator routing node data...
                </div>
              )}

              <div ref={consoleEndRef} />
            </div>

            {/* Interactive Control Trigger */}
            <div className="pt-4 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] text-[#D7E2EA]/50 uppercase tracking-widest">
                <Sparkles size={12} className="text-[#FF8A00]" />
                Interactive Simulation Engine
              </div>
              
              <button
                disabled={isRunning}
                onClick={() => startSimulation(activeWorkflowIdx)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  isRunning 
                    ? 'bg-[#151515] border border-[#D7E2EA]/10 text-[#D7E2EA]/30 cursor-not-allowed'
                    : 'bg-[#FF8A00] text-black shadow-lg shadow-[#FF8A00]/20 hover:scale-105'
                }`}
              >
                {isRunning ? (
                  <>Running Audit...</>
                ) : (
                  <>
                    <Play size={14} fill="black" />
                    Run AoA Orchestration
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
