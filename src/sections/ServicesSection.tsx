import React from 'react';
import { FadeIn } from '../components/FadeIn';

const services = [
  { id: "01", name: "Free AI Audit", desc: "We analyze your workflows, identify automation opportunities, and deliver a roadmap with projected ROI. No cost, no commitment. Results within 48 hours." },
  { id: "02", name: "Custom AI Build", desc: "We implement AI automations using GPT-4, Claude, Gemini and your existing tools. You own everything. Deploy in days, not months." },
  { id: "03", name: "Monthly Retainer", desc: "Ongoing optimization, support, and new automation builds. 84% client retention rate. Scale as you grow. Starting at $1,500/month." },
  { id: "04", name: "Pre-Built AI Apps", desc: "27 ready-to-deploy AI apps for real estate, healthcare, hospitality, logistics and more. Deploy in 5-15 days with measurable ROI." }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="bg-[#D7E2EA] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-28 text-center flex flex-col items-center">
        <h3 className="font-[cursive] text-2xl md:text-4xl text-[#B600A8] mb-4">AI Dynamic Pro</h3>
        <h2 className="font-black uppercase text-[clamp(2.5rem,8vw,90px)] leading-none mb-8">
          We Automate Your Business
        </h2>
        <p className="text-xl md:text-2xl font-light max-w-3xl opacity-80 leading-relaxed">
          AI consulting for Miami businesses that want to cut costs, save time, and automate operations. Free audits. Done-for-you implementation. Monthly retainers.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto flex flex-col border-t border-[#0C0C0C]/10">
        {services.map((svc, i) => (
          <FadeIn key={svc.id} delay={i * 0.1} y={30} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)]">
              <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none md:w-[35%] mb-4 md:mb-0 opacity-20">
                {svc.id}
              </div>
              <div className="flex flex-col md:w-[65%]">
                <h3 className="font-bold uppercase text-[clamp(1.5rem,2.2vw,2.1rem)] mb-3">{svc.name}</h3>
                <p className="font-medium leading-relaxed max-w-2xl text-[clamp(1rem,1.6vw,1.25rem)] opacity-70">
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Trust Strip */}
      <div className="max-w-7xl mx-auto mt-20 sm:mt-32 border-t-2 border-b-2 border-[#0C0C0C]/10 py-10 flex flex-wrap justify-between gap-8">
        {[
          { stat: "82,000+", label: "Miami SMBs" },
          { stat: "123,677", label: "Businesses in Dade" },
          { stat: "44,300", label: "Hispanic-owned firms" },
          { stat: "79%", label: "AI Adoption Gap" }
        ].map((item, i) => (
          <FadeIn key={i} delay={0.2 + (i * 0.1)} y={20} className="flex flex-col items-center text-center">
            <span className="font-black text-4xl md:text-5xl text-[#0C0C0C] mb-2">{item.stat}</span>
            <span className="text-[#0C0C0C]/70 font-bold uppercase tracking-widest text-xs md:text-sm">{item.label}</span>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
