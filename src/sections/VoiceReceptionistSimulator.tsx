import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, PhoneCall, Volume2, Globe, BrainCircuit } from 'lucide-react';

const CALL_SCRIPT = [
  { time: 1000, speaker: 'Caller', text: 'Hi, I need to schedule an appointment for my mother.' },
  { time: 2500, speaker: 'AI Logic', text: '[Intent Detected: Scheduling] [Language: English] [Checking EHR Calendar]' },
  { time: 4000, speaker: 'AI Agent', text: 'Of course. I can help with that. Does Dr. Martinez at 2 PM this Thursday work?' },
  { time: 6000, speaker: 'Caller', text: 'Actually, she only speaks Spanish. Can we switch?' },
  { time: 7500, speaker: 'AI Logic', text: '[Intent Detected: Language Shift -> Spanish] [Updating Voice Synthesis]' },
  { time: 9000, speaker: 'AI Agent', text: 'Por supuesto. ¿Le parece bien este jueves a las 2 de la tarde con el Dr. Martinez?' },
];

export const VoiceReceptionistSimulator = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [transcripts, setTranscripts] = useState<{speaker: string, text: string}[]>([]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(-1);
      setTranscripts([]);
      return;
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    CALL_SCRIPT.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
        setTranscripts(prev => [...prev, { speaker: step.speaker, text: step.text }]);
      }, step.time);
      timeouts.push(timeout);
    });

    const endTimeout = setTimeout(() => {
      setIsActive(false);
    }, 12000);
    timeouts.push(endTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const activeSpeaker = currentStep >= 0 ? CALL_SCRIPT[currentStep].speaker : null;

  return (
    <section className="py-24 bg-[#0C0C0C] border-y border-[#D7E2EA]/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,0,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text & Trigger */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-sm uppercase tracking-widest text-[#FF8A00] mb-6"
            >
              <PhoneCall size={16} />
              <span>Bilingual Voice AI</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Never miss a lead. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#E55D00]">Human-Level Voice Agents.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#D7E2EA]/70 mb-8"
            >
              Deploy hyper-realistic Voice AI that handles front-desk triage, appointment scheduling, and multilingual customer support in under 300ms latency.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                isActive 
                  ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30' 
                  : 'bg-[#FF8A00] text-black hover:bg-[#E55D00] shadow-lg shadow-[#FF8A00]/30 hover:scale-105'
              }`}
            >
              {isActive ? (
                <>
                  <Volume2 size={20} className="animate-pulse" />
                  End Simulation
                </>
              ) : (
                <>
                  <PhoneCall size={20} />
                  Simulate Live Call
                </>
              )}
            </motion.button>
          </div>

          {/* Right: Interactive Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden h-[450px] flex flex-col"
          >
            {/* Visualizer Top */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#D7E2EA]/10">
              <div className="flex items-center gap-4">
                {/* Audio Orb */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {isActive && activeSpeaker === 'AI Agent' && (
                    <>
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-[#FF8A00] rounded-full blur-md"></motion.div>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute inset-2 bg-[#FF8A00]/50 rounded-full"></motion.div>
                    </>
                  )}
                  {isActive && activeSpeaker === 'Caller' && (
                    <>
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-[#D7E2EA] rounded-full blur-md"></motion.div>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute inset-2 bg-[#D7E2EA]/50 rounded-full"></motion.div>
                    </>
                  )}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isActive ? (activeSpeaker === 'Caller' ? 'bg-[#D7E2EA] text-black' : 'bg-[#FF8A00] text-black') : 'bg-[#0C0C0C] text-[#D7E2EA]/50 border border-[#D7E2EA]/20'}`}>
                    {isActive ? <Volume2 size={20} /> : <Mic size={20} />}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">AI Receptionist Node</h3>
                  <p className="text-[#D7E2EA]/50 text-sm flex items-center gap-2">
                    <Globe size={14} /> Latency: 240ms | Status: {isActive ? <span className="text-green-500 animate-pulse">Live Call</span> : 'Idle'}
                  </p>
                </div>
              </div>
            </div>

            {/* Transcription Terminal */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {!isActive && transcripts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#D7E2EA]/30">
                  <BrainCircuit size={48} className="mb-4 opacity-20" />
                  <p>Click "Simulate Live Call" to intercept voice traffic.</p>
                </div>
              ) : (
                transcripts.map((t, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className={`flex flex-col ${t.speaker === 'Caller' ? 'items-start' : t.speaker === 'AI Agent' ? 'items-end' : 'items-center'}`}
                  >
                    <span className={`text-[10px] uppercase tracking-widest mb-1 ${t.speaker === 'AI Logic' ? 'text-[#B600A8]' : 'text-[#D7E2EA]/40'}`}>
                      {t.speaker}
                    </span>
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                      t.speaker === 'Caller' ? 'bg-[#0C0C0C] text-[#D7E2EA] border border-[#D7E2EA]/10 rounded-tl-sm' :
                      t.speaker === 'AI Agent' ? 'bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/20 rounded-tr-sm' :
                      'bg-transparent text-[#B600A8] border border-[#B600A8]/30 font-mono text-xs text-center'
                    }`}>
                      {t.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};
