import { FadeIn } from '../components/FadeIn';
import { Check, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

const tiers = [
  {
    name: "Free AI Audit",
    price: "$0",
    period: "One-Time Only",
    bestFor: "First-year evaluation, zero obligation",
    desc: "A thorough operational study of your company's bottlenecks. We map your current procedures and deliver a comprehensive AI implementation roadmap.",
    features: [
      "Operational bottleneck audit & reporting",
      "Bilingual Spanish-English workflow maps",
      "ROI projection graphics & charting",
      "Dedicated multi-agent feasibility studies",
      "AI adoption readiness assessments",
      "Complete documentation package"
    ],
    highlight: false,
    cta: "Request Free Audit"
  },
  {
    name: "The Macho Matchman",
    price: "$2,500",
    period: "/month",
    bestFor: "High-velocity app & automation install",
    desc: "Like a digital matchmaker on high-grade fuel. We play matchmaker for your tools, making your apps talk, collaborate, and execute workflows at absolute lightspeed.",
    features: [
      "Installation of pre-built AI apps (27+ ready apps)",
      "Core automations (Gmail, Slack, WhatsApp, CRM)",
      "High-impact custom explainer clip / video of your flow",
      "Outbound voice & scheduling agent pipelines",
      "Ongoing workflow optimization & retainer support",
      "Bilingual chat receptionist routing integration"
    ],
    highlight: true,
    cta: "Deploy Matchman Suite"
  },
  {
    name: "Sovereign AI Overlord",
    price: "$5,000",
    period: "/month",
    bestFor: "Proprietary LLMs, servers, and white-labeling",
    desc: "The absolute peak of sovereign business intelligence. We build, host, and fine-tune your own language models on private secure servers. Zero third-party reliance.",
    features: [
      "Custom white-labeled apps branded to your company",
      "Your own private custom Large Language Model (LLM)",
      "Private server hosting (Docker / VPS secure databases)",
      "Open-source model deployments (Nous Hermes, Llama 3)",
      "Full 'Agents of Agents' (AoA) meta-orchestration",
      "24/7 developer monitoring & deep systems engineering",
      "Sovereign data governance (100% cloud privacy)"
    ],
    highlight: false,
    cta: "Command Sovereign AI"
  }
];

export const PricingSection = () => {
  return (
    <section id="price" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-10 border-t border-[#D7E2EA]/10">
      
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <h3 className="font-[cursive] text-2xl md:text-4xl text-[#FF8A00] mb-4">Investment Plans</h3>
        <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,5.5vw,75px)] leading-none mb-6">
          Sovereign Pricing
        </h2>
        <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed">
          From a comprehensive first-year free audit to private servers, proprietary LLMs, and custom white-labeled apps, we build tools that you own forever.
        </p>
      </div>

      {/* Grid of pricing cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => (
          <FadeIn key={tier.name} delay={i * 0.15} y={30} className="h-full flex">
            <div className={`w-full rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
              tier.highlight 
                ? 'bg-gradient-to-br from-[#18011F] to-[#7621B0] border-2 border-[#B600A8] shadow-2xl shadow-[#B600A8]/20 scale-[1.02]' 
                : 'bg-[#151515] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/20'
            }`}>
              
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute top-4 right-4 bg-[#FF8A00] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles size={10} fill="black" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-black text-3xl uppercase mb-1 tracking-wide">{tier.name}</h3>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#FF8A00] mb-6">{tier.bestFor}</p>
                
                {/* Pricing values */}
                <div className="flex items-baseline gap-1.5 mb-6 border-b border-[#D7E2EA]/10 pb-6">
                  <span className="font-black text-6xl text-white tracking-tight">{tier.price}</span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]/60">{tier.period}</span>
                </div>

                <p className="text-xs sm:text-sm font-light leading-relaxed opacity-75 mb-8">
                  {tier.desc}
                </p>

                {/* Features Checklist */}
                <ul className="flex flex-col gap-4 mb-10">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs sm:text-[13px]">
                      <div className="mt-0.5 w-4 h-4 rounded-md bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[#FF8A00]" />
                      </div>
                      <span className="opacity-80 leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                tier.highlight 
                  ? 'bg-[#FF8A00] text-black hover:bg-[#FF8A00]/90 shadow-lg shadow-[#FF8A00]/20 hover:scale-105' 
                  : 'bg-[#D7E2EA]/10 text-white hover:bg-[#D7E2EA]/15 hover:scale-102 border border-[#D7E2EA]/10'
              }`}>
                {tier.cta}
              </button>

            </div>
          </FadeIn>
        ))}
      </div>

      {/* Sovereign guarantee footer block */}
      <FadeIn delay={0.4} y={20} className="max-w-4xl mx-auto mt-20 text-center border border-[#B600A8]/30 bg-[#B600A8]/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(182,0,168,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#B600A8]/10 flex items-center justify-center mb-4 border border-[#B600A8]/30">
            <AlertCircle size={24} className="text-[#B600A8]" />
          </div>
          <h4 className="font-black uppercase text-xl text-[#B600A8] mb-3 tracking-wider">The Sovereign AI Guarantee</h4>
          <p className="opacity-85 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
            Unlike traditional consulting agencies, we never locked you into proprietary API subscriptions. You own all white-labeled code bases, server containers, and open-source fine-tuned model keys. If we do not reduce your operation bottlenecks within 90 days, we refund 100% of our service fees.
          </p>
        </div>
      </FadeIn>

    </section>
  );
};
