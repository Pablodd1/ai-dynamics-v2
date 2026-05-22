import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';

const projects = [
  {
    id: "01",
    label: "Client",
    name: "Nextlevel Studio",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    id: "02",
    label: "Personal",
    name: "Aura Brand Identity",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    id: "03",
    label: "Client",
    name: "Solaris Digital",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-24 md:pt-32 pb-40 px-5 sm:px-8 md:px-10">
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Project
      </h2>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {projects.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} index={i} totalCards={projects.length} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, totalCards }: { project: any, index: number, totalCards: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(cardProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] sticky top-24 md:top-32" style={{ top: `calc(6rem + ${index * 28}px)` }}>
      <motion.div 
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[clamp(3rem,8vw,100px)] leading-none text-[#D7E2EA]">{project.id}</span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 uppercase text-sm font-medium tracking-widest">{project.label}</span>
              <h3 className="text-[#D7E2EA] text-[clamp(1.5rem,3vw,3rem)] font-medium uppercase leading-tight">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex-1 flex gap-4 h-full min-h-0">
          <div className="w-[40%] flex flex-col gap-4">
            <img src={project.img1} alt="" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,16vw,230px)]" />
            <img src={project.img2} alt="" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(160px,22vw,340px)]" />
          </div>
          <div className="w-[60%] h-full">
            <img src={project.img3} alt="" className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
