import React from 'react';
import { FadeIn } from '../components/FadeIn';

export const CtaSection = () => {
  return (
    <section id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-30 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.1} y={30} className="w-full text-center mb-16">
          <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none mb-6">
            Get Your Free AI Audit
          </h2>
          <p className="font-medium text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
            Join 200+ Miami businesses already saving 10+ hours per week. No cost. No commitment. Results within 48 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={40} className="w-full max-w-3xl bg-[#151515] p-8 md:p-12 rounded-3xl border border-[#D7E2EA]/10 shadow-[0_0_50px_rgba(182,0,168,0.05)]">
          <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Your Name *</label>
                <input type="text" className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-6 py-4 outline-none focus:border-[#B600A8] transition-colors" required />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Business Email *</label>
                <input type="email" className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-6 py-4 outline-none focus:border-[#B600A8] transition-colors" required />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Company Name *</label>
                <input type="text" className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-6 py-4 outline-none focus:border-[#B600A8] transition-colors" required />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Industry</label>
                <select className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-6 py-4 outline-none focus:border-[#B600A8] transition-colors text-[#D7E2EA] appearance-none">
                  <option>Real Estate</option>
                  <option>Hospitality & Tourism</option>
                  <option>Healthcare</option>
                  <option>Trade / Logistics</option>
                  <option>Legal Services</option>
                  <option>Finance</option>
                  <option>Retail</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Website URL (Optional)</label>
              <input type="url" className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-6 py-4 outline-none focus:border-[#B600A8] transition-colors" />
            </div>

            <button type="submit" className="mt-4 rounded-xl text-white font-black uppercase tracking-widest px-8 py-5 text-lg"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1'
              }}>
              Start My Free Audit
            </button>
            
            <div className="text-center mt-4">
              <p className="text-sm opacity-50">
                No cost. No commitment. Your audit includes: workflow analysis, 2-3 AI opportunities, projected ROI, and implementation roadmap -- delivered within 48 hours.
              </p>
              <a href="#" className="inline-block mt-4 text-[#B600A8] font-bold uppercase text-sm tracking-widest hover:underline">
                Prefer to talk? Schedule a 15-minute call
              </a>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};
