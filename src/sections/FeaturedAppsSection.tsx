import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const apps = [
  {
    id: "01", label: "Customer Service", name: "OmniBot", roi: "340% first-year",
    desc: "AI chatbot for web, WhatsApp, SMS & Facebook. Answers in 85+ languages. Cuts response time from 47 hours to seconds.",
    img1: "/project_llm.png", img2: "/project_llm.png", img3: "/project_llm.png"
  },
  {
    id: "02", label: "Operations", name: "VoiceAI Receptionist", roi: "240% first-year",
    desc: "Answers calls 24/7, books appointments, qualifies leads. Replaces $30K-$45K/year human receptionist.",
    img1: "/project_workflow.png", img2: "/project_workflow.png", img3: "/project_workflow.png"
  },
  {
    id: "03", label: "Email", name: "InboxPilot", roi: "300% first-year",
    desc: "Classifies and responds to emails in 30 seconds. 75% time savings on email management.",
    img1: "/project_analytics.png", img2: "/project_analytics.png", img3: "/project_analytics.png"
  },
  {
    id: "04", label: "Sales", name: "LeadQualify AI", roi: "200-400% year-1",
    desc: "Scores leads, enriches data, routes hot prospects in seconds. Generates 67% more leads.",
    img1: "/project_llm.png", img2: "/project_llm.png", img3: "/project_llm.png"
  },
  {
    id: "05", label: "Finance", name: "InvoiceFlow", roi: "400-800% year-1",
    desc: "End-to-end invoice automation. Processing drops from 15-20 min to 30-60 sec.",
    img1: "/project_workflow.png", img2: "/project_workflow.png", img3: "/project_workflow.png"
  },
  {
    id: "06", label: "Healthcare", name: "NoShowAI", roi: "3,567% ROI",
    desc: "Predicts and prevents missed appointments. Reduces no-shows by 38-87%.",
    img1: "/project_analytics.png", img2: "/project_analytics.png", img3: "/project_analytics.png"
  },
  {
    id: "07", label: "Real Estate", name: "ListingPro", roi: "767-1,633% ROI",
    desc: "Generates MLS-ready listings in 5 minutes. Multilingual: English, Spanish, Portuguese.",
    img1: "/project_workflow.png", img2: "/project_workflow.png", img3: "/project_workflow.png"
  }
];

export const FeaturedAppsSection = () => {
  return (
    <section id="apps" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative pt-20 sm:pt-24 md:pt-32 pb-40 px-5 sm:px-8 md:px-10">
      <div className="text-center mb-16 sm:mb-20 md:mb-28">
        <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,8vw,100px)] leading-none mb-6">
          AI Apps That Deliver Real ROI
        </h2>
        <p className="text-[#D7E2EA] font-light text-xl md:text-3xl opacity-80 uppercase tracking-widest">
          Deploy in 5-15 days. Own everything. Pay for results.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {apps.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} totalCards={apps.length} />
        ))}
      </div>
    </section>
  );
};

const AppCard = ({ app, index, totalCards }: { app: any, index: number, totalCards: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.02; // Reduced scaling increment since there are 7 cards
  const scale = useTransform(cardProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] sticky top-24 md:top-32" style={{ top: `calc(6rem + ${index * 20}px)` }}>
      <motion.div 
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[clamp(3rem,8vw,100px)] leading-none text-[#D7E2EA] opacity-30">{app.id}</span>
            <div className="flex flex-col">
              <span className="text-[#B600A8] uppercase text-sm font-bold tracking-widest mb-1">{app.label} | ROI: {app.roi}</span>
              <h3 className="text-[#D7E2EA] text-[clamp(1.5rem,3vw,3rem)] font-medium uppercase leading-tight">{app.name}</h3>
              <p className="text-[#D7E2EA]/70 mt-2 max-w-xl">{app.desc}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-4 h-full min-h-0">
          <div className="w-[40%] flex flex-col gap-4">
            <img src={app.img1} alt="" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,16vw,230px)]" />
            <img src={app.img2} alt="" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(160px,22vw,340px)]" />
          </div>
          <div className="w-[60%] h-full">
            <img src={app.img3} alt="" className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
