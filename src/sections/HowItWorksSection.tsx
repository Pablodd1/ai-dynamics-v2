import React from 'react';
import { FadeIn } from '../components/FadeIn';

const steps = [
  {
    week: "Week 1",
    title: "Free AI Audit",
    desc: "We interview stakeholders, map your workflows, quantify pain points in dollars and hours, then deliver a 5-page report with 2-3 prioritized AI opportunities and projected ROI.",
    deliverable: "Written audit report within 48 hours"
  },
  {
    week: "Weeks 2-4",
    title: "Custom Build",
    desc: "We design the automation architecture, configure AI models, build integrations with your existing tools, and test everything before it goes live.",
    deliverable: "Working automation in sandbox environment"
  },
  {
    week: "Weeks 4-5",
    title: "Team Training",
    desc: "We train your team on the new system, calibrate the AI with your data, document everything, and ensure your staff is confident before launch.",
    deliverable: "Training sessions + documentation + admin guides"
  },
  {
    week: "Week 5-6",
    title: "Go Live + Support",
    desc: "We deploy to production, monitor performance daily for 30 days, fine-tune based on real usage, and transition you to monthly optimization.",
    deliverable: "Live system + 30-day hypercare + monthly reviews"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-20 mt-10">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none mb-4">
          Your Path to Automation
        </h2>
        <p className="font-medium text-xl md:text-2xl opacity-60 uppercase tracking-widest">
          From audit to deployment in 30-90 days
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative">
        {/* Timeline line */}
        <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-1 bg-[#0C0C0C]/10" />

        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.15} y={20} className="relative pl-16 md:pl-24">
            <div className="absolute left-0 top-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#151515] text-[#D7E2EA] flex items-center justify-center font-black text-xl md:text-3xl z-10 shadow-lg">
              {i + 1}
            </div>
            
            <div className="pt-2">
              <span className="text-[#B600A8] font-bold tracking-widest uppercase text-sm mb-2 block">{step.week}</span>
              <h3 className="font-black uppercase text-2xl md:text-4xl mb-4">{step.title}</h3>
              <p className="text-lg opacity-70 mb-6 max-w-2xl leading-relaxed">
                {step.desc}
              </p>
              <div className="bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 rounded-xl p-4 md:p-6 inline-block">
                <span className="font-bold uppercase text-xs opacity-50 block mb-1">Deliverable</span>
                <span className="font-medium">{step.deliverable}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
