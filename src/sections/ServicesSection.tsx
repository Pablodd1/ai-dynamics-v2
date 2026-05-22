import React from 'react';
import { FadeIn } from '../components/FadeIn';

const services = [
  { id: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
  { id: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
  { id: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
  { id: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
  { id: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." }
];

export const ServicesSection = () => {
  return (
    <section className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <h2 className="font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Services
      </h2>
      
      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((svc, i) => (
          <FadeIn key={svc.id} delay={i * 0.1} y={30} className="w-full">
            <div className={`flex flex-col md:flex-row md:items-center py-8 sm:py-10 md:py-12 ${i !== services.length - 1 ? 'border-b border-[rgba(12,12,12,0.15)]' : ''}`}>
              <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none md:w-[35%] mb-4 md:mb-0">
                {svc.id}
              </div>
              <div className="flex flex-col md:w-[65%]">
                <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] mb-3">{svc.name}</h3>
                <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
