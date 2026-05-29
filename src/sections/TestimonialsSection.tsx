import React from 'react';
import { FadeIn } from '../components/FadeIn';

const testimonials = [
  {
    quote: "LeadFollower AI responds to our inquiries in under 60 seconds -- even at 2 AM. Our lead-to-close conversion improved 261% and revenue per agent is up 145%.",
    name: "Broker",
    company: "Miami Realty Firm",
    industry: "Real Estate"
  },
  {
    quote: "NoShowAI reduced our missed appointments by 87%. We recovered $219,600 in annual revenue. The system paid for itself in 8 days.",
    name: "Practice Manager",
    company: "Miami Medical Clinic",
    industry: "Healthcare"
  },
  {
    quote: "GuestComm AI handles 70% of our guest queries automatically. Our reservation team saves 3-5 hours daily, and guest satisfaction scores are up.",
    name: "GM",
    company: "Miami Beach Boutique Hotel",
    industry: "Hospitality"
  },
  {
    quote: "La automatización en dos idiomas nos ha devuelto incontables horas. Ahora podemos enfocarnos en crecer el negocio y pasar más tiempo con la familia en lugar de responder mensajes.",
    name: "Owner",
    company: "Hispanic-Owned Miami Business",
    industry: "Bilingual Operations"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="bg-white text-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 md:py-32 relative z-20 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10">
      <div className="max-w-7xl mx-auto flex flex-col">
        <h2 className="font-black uppercase text-center text-[clamp(2.5rem,6vw,80px)] leading-none mb-16 md:mb-24">
          Real Results for Miami Businesses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, i) => (
            <FadeIn key={i} delay={i * 0.15} y={30} className="bg-[#F8F9FA] rounded-[32px] p-8 md:p-12 border border-[#0C0C0C]/5 flex flex-col justify-between">
              <div>
                <span className="text-[#B600A8] font-bold text-xs uppercase tracking-widest mb-6 block">{test.industry}</span>
                <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80 mb-10">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0C0C0C] flex items-center justify-center text-white font-black text-xl">
                  {test.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold uppercase">{test.name}</span>
                  <span className="opacity-60 text-sm font-medium">{test.company}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
