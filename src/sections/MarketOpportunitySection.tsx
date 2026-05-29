import React from 'react';
import { FadeIn } from '../components/FadeIn';

const dataBlocks = [
  {
    title: "The Gap",
    desc: "61% of Florida SMBs use AI -- but only 8% have advanced implementations. 85% of AI projects fail. That means thousands of Miami businesses tried AI and got burned. We fix that."
  },
  {
    title: "Hispanic Market",
    desc: "44,300 Hispanic-owned businesses in Miami-Dade. Only 5.3% use AI. That's a 79% adoption gap -- and zero competitors targeting this market. Bilingual AI isn't a feature here. It's the whole game."
  },
  {
    title: "Your Window",
    desc: "First-mover advantage: 12-18 months. Two regulatory deadlines in 2026 (ACE 2.0 for trade, HIPAA Security Rule for healthcare) will force AI adoption. The businesses that prepare now will dominate."
  }
];

const keyStats = [
  { label: "Hispanic AI adoption gap", value: "79%" },
  { label: "AI project failure rate", value: "85%" },
  { label: "First-mover window", value: "12-18 mos" },
  { label: "Top ROI use case", value: "340%" },
  { label: "Client retention rate", value: "84%" },
  { label: "Miami-Dade GDP", value: "$260.8B" }
];

export const MarketOpportunitySection = () => {
  return (
    <section className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none mb-6">
            The Miami AI Opportunity
          </h2>
          <p className="font-medium text-xl md:text-2xl opacity-60 uppercase tracking-widest mb-16">
            Data-driven insights for your business
          </p>

          <div className="flex flex-col gap-12">
            {dataBlocks.map((block, i) => (
              <FadeIn key={i} delay={i * 0.15} x={-30}>
                <h3 className="font-bold text-[#B600A8] uppercase tracking-widest mb-3">{block.title}</h3>
                <p className="text-lg opacity-80 leading-relaxed border-l-2 border-[#B600A8]/30 pl-4">
                  {block.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 md:gap-6 content-center">
          {keyStats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1} y={20} className="bg-[#151515] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center justify-center border border-[#D7E2EA]/5">
              <span className="font-black text-3xl sm:text-4xl md:text-5xl text-[#D7E2EA] mb-2">{stat.value}</span>
              <span className="text-[#D7E2EA]/50 font-bold uppercase tracking-widest text-xs">{stat.label}</span>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
