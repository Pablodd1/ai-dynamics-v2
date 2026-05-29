import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Building, Hotel, Ship, HeartPulse, Scale, Landmark, ShoppingBag } from 'lucide-react';
import { ContactButton } from '../components/ContactButton';

const industries = [
  { icon: Building, name: "Real Estate", opp: "9.5/10", market: "93,000 Realtors", apps: "ListingPro, LeadFollower AI" },
  { icon: Hotel, name: "Hospitality & Tourism", opp: "9.0/10", market: "67,481 hotel rooms", apps: "GuestComm AI, VoiceAI Receptionist" },
  { icon: Ship, name: "International Trade", opp: "9.0/10", market: "1.12M TEUs at PortMiami", apps: "TradeDoc AI, CustomsBot" },
  { icon: HeartPulse, name: "Healthcare", opp: "8.5/10", market: "191,387 healthcare workers", apps: "HealthVerify, NoShowAI" },
  { icon: Scale, name: "Legal Services", opp: "8.0/10", market: "4,200+ legal establishments", apps: "LegalIntake AI, CaseChrono" },
  { icon: Landmark, name: "Finance & Banking", opp: "8.5/10", market: "60+ international banks", apps: "InvoiceFlow, LeadQualify AI" },
  { icon: ShoppingBag, name: "Retail & E-Commerce", opp: "7.0/10", market: "6,342 establishments", apps: "OmniBot, InventoryAI" }
];

export const IndustriesSection = () => {
  return (
    <section id="industries" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <div>
            <h3 className="font-[cursive] text-2xl md:text-4xl text-[#B600A8] mb-4">Miami</h3>
            <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none max-w-3xl">
              Industries We Serve in Miami
            </h2>
          </div>
          <ContactButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <FadeIn key={ind.name} delay={i * 0.1} y={30} className="w-full h-full">
                <div className="bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-8 flex flex-col h-full hover:border-[#B600A8]/50 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#18011F] to-[#7621B0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={32} className="text-[#D7E2EA]" />
                  </div>
                  <h3 className="font-bold text-2xl uppercase mb-2">{ind.name}</h3>
                  <div className="text-[#B600A8] font-bold text-sm tracking-widest uppercase mb-6">
                    Opp Score: {ind.opp}
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider opacity-50">Market Size</span>
                      <span className="font-medium">{ind.market}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider opacity-50">Featured Apps</span>
                      <span className="font-medium">{ind.apps}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
