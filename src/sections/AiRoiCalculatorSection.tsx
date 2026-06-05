import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

type Industry = 'Healthcare' | 'Real Estate' | 'Law Firm' | 'E-Commerce' | 'Logistics';
type Bottleneck = 'Customer Support' | 'Front Desk Calls' | 'Lead Qualification' | 'Admin Paperwork';

const industries: Industry[] = ['Healthcare', 'Real Estate', 'Law Firm', 'E-Commerce', 'Logistics'];
const bottlenecks: Bottleneck[] = ['Customer Support', 'Front Desk Calls', 'Lead Qualification', 'Admin Paperwork'];

export const AiRoiCalculatorSection = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null);

  const calculateROI = () => {
    // Arbitrary but realistic-looking math for the wow factor
    const baseHours = bottleneck === 'Front Desk Calls' ? 120 : bottleneck === 'Customer Support' ? 160 : 80;
    const industryMultiplier = industry === 'Healthcare' ? 1.5 : industry === 'Law Firm' ? 2 : 1;
    
    const monthlyHoursSaved = Math.round(baseHours * industryMultiplier);
    const hourlyRate = industry === 'Law Firm' ? 150 : industry === 'Healthcare' ? 65 : 40;
    const yearlyDollarsSaved = monthlyHoursSaved * hourlyRate * 12;

    return {
      hours: monthlyHoursSaved * 12,
      dollars: yearlyDollarsSaved,
      roi: Math.round((yearlyDollarsSaved / 30000) * 100) // Assuming a 30k yearly AI investment
    };
  };

  const results = calculateROI();

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF8A00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/10 text-[#FF8A00] text-sm font-bold uppercase tracking-widest mb-6">
            <Calculator size={16} />
            Instant ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#D7E2EA] uppercase tracking-tighter mb-6">
            Discover Your <span className="text-[#FF8A00]">Automation Potential</span>
          </h2>
          <p className="text-[#D7E2EA]/70 text-lg max-w-2xl mx-auto">
            Find out exactly how many hours and dollars our Agents of Agents can save your specific business operations.
          </p>
        </FadeIn>

        <div className="bg-[#111111] border border-[#333333] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-[#333333] w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#FF8A00] to-[#FF4500]"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold text-[#D7E2EA] mb-8">1. What is your primary industry?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {industries.map(ind => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        industry === ind 
                          ? 'border-[#FF8A00] bg-[#FF8A00]/10 text-[#FF8A00]' 
                          : 'border-[#333333] hover:border-[#FF8A00]/50 text-[#D7E2EA]'
                      }`}
                    >
                      <div className="font-medium text-lg">{ind}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-auto flex justify-end">
                  <button
                    disabled={!industry}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-[#FF8A00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    Next Step <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold text-[#D7E2EA] mb-8">2. What is your biggest operational bottleneck?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {bottlenecks.map(bot => (
                    <button
                      key={bot}
                      onClick={() => setBottleneck(bot)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        bottleneck === bot 
                          ? 'border-[#FF8A00] bg-[#FF8A00]/10 text-[#FF8A00]' 
                          : 'border-[#333333] hover:border-[#FF8A00]/50 text-[#D7E2EA]'
                      }`}
                    >
                      <div className="font-medium text-lg">{bot}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-auto flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={!bottleneck}
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 bg-[#FF8A00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    Calculate ROI <Calculator size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-[#D7E2EA] mb-2 uppercase">Your Projected Impact</h3>
                <p className="text-[#D7E2EA]/60 mb-10">Based on a {industry} automating {bottleneck}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]">
                    <Clock size={24} className="text-[#FF8A00] mx-auto mb-4" />
                    <div className="text-3xl font-black text-[#D7E2EA] mb-1">{results.hours.toLocaleString()}</div>
                    <div className="text-sm text-[#D7E2EA]/60 uppercase tracking-widest">Hours Saved / Yr</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#FF8A00]/20 to-transparent rounded-2xl p-6 border border-[#FF8A00]/50">
                    <DollarSign size={24} className="text-[#FF8A00] mx-auto mb-4" />
                    <div className="text-3xl font-black text-[#FF8A00] mb-1">${results.dollars.toLocaleString()}</div>
                    <div className="text-sm text-[#FF8A00]/80 uppercase tracking-widest">Capital Reclaimed</div>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]">
                    <TrendingUp size={24} className="text-[#FF8A00] mx-auto mb-4" />
                    <div className="text-3xl font-black text-[#D7E2EA] mb-1">{results.roi}%</div>
                    <div className="text-sm text-[#D7E2EA]/60 uppercase tracking-widest">First Year ROI</div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => { setStep(1); setIndustry(null); setBottleneck(null); }}
                    className="px-6 py-3 rounded-full border border-[#333333] text-[#D7E2EA] font-medium hover:bg-[#333333] transition-colors"
                  >
                    Recalculate
                  </button>
                  <button 
                    onClick={() => {
                      document.dispatchEvent(new CustomEvent('switchTab', { detail: 'Contact' }));
                    }}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#FF8A00] transition-colors shadow-[0_0_30px_rgba(255,138,0,0.3)]"
                  >
                    Claim This ROI
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
