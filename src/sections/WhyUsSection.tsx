import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { MessageSquare, Key, Target, MapPin } from 'lucide-react';

const differentiators = [
  {
    icon: MessageSquare,
    title: "Bilingual by Design",
    desc: "44,300 Hispanic-owned businesses in Miami face a 79% AI adoption gap. We're the only AI consultancy built for this market. Spanish-first content, WhatsApp integration, and cultural fluency -- not translation."
  },
  {
    icon: Key,
    title: "BYOK - Bring Your Own Keys",
    desc: "Your AI runs on your accounts. Your data stays yours. No vendor lock-in, no platform dependency. If you ever leave, everything transfers with full documentation."
  },
  {
    icon: Target,
    title: "Outcome-Based Pricing",
    desc: "We define success metrics upfront -- hours saved, errors reduced, leads converted. Our fees tie to measurable outcomes. 85% of AI projects fail; we guarantee results in 90 days or your money back."
  },
  {
    icon: MapPin,
    title: "Built for Miami's Industries",
    desc: "We don't do generic AI. 27 pre-built apps for real estate, hospitality, healthcare, logistics, legal, and finance -- all tuned for Miami's multilingual, international business environment."
  }
];

export const WhyUsSection = () => {
  return (
    <section className="bg-white text-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-20 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="w-full md:w-1/3">
          <h2 className="font-black uppercase text-[clamp(2.5rem,6vw,80px)] leading-none mb-6">
            Why Miami Businesses Choose Us
          </h2>
          <p className="text-xl opacity-60">
            We are not a Big 4 firm that charges $400/hr, nor an offshore dev shop. We are local, bilingual, and obsessed with your ROI.
          </p>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {differentiators.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <FadeIn key={i} delay={i * 0.15} y={20} className="flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-[#0C0C0C]/5 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-[#B600A8]" />
                </div>
                <h3 className="font-bold uppercase text-2xl mb-4">{diff.title}</h3>
                <p className="opacity-70 leading-relaxed">
                  {diff.desc}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
