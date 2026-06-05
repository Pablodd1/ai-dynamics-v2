import { useRef } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { useScroll, useTransform, motion } from 'framer-motion';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Move from center (0vw) to far right (80vw) and rotate slightly as user scrolls
  const robotX = useTransform(scrollYProgress, [0, 1], ['0vw', '80vw']);
  const robotRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const robotOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.4, 0]);

  return (
    <section ref={containerRef} className="min-h-[75vh] lg:min-h-[80vh] flex flex-col overflow-x-clip relative pb-20">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 mt-16 sm:mt-10 px-6">
        
        {/* Robot Image with Scroll Animation */}
        <motion.div 
          style={{ x: robotX, rotate: robotRotate, opacity: robotOpacity }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute -left-[5%] sm:-left-[10%] md:-left-[15%] z-10 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] pointer-events-none mix-blend-screen"
        >
          <img src="/hero.png" alt="AI Humanoid Robot" className="w-full h-auto" />
        </motion.div>

        {/* Text Content */}
        <div className="z-20 text-center max-w-5xl mx-auto flex flex-col items-center">
          <FadeIn delay={0.15} y={40}>
            <h1 className="text-[#FF8A00] font-black uppercase tracking-tight leading-none text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] mb-6">
              Automate Your Miami Business With AI
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3} y={30}>
            <p className="text-[#D7E2EA] font-light tracking-wide leading-relaxed max-w-3xl mx-auto text-lg md:text-2xl opacity-80 mb-10">
              Free AI audits for Miami & Miami Beach businesses. Cut costs by 30%, automate repetitive work, and reclaim your time with practical AI solutions tailored to your industry.
            </p>
          </FadeIn>

          <FadeIn delay={0.45} y={30} className="flex flex-col sm:flex-row gap-4 items-center">
            <ContactButton />
            <a href="#services" className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base hover:bg-[#D7E2EA]/10 transition-colors">
              See Our Services
            </a>
          </FadeIn>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full border-y border-[#D7E2EA]/20 bg-[#0C0C0C]/80 backdrop-blur-md mt-20 relative z-30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between gap-8">
          {[
            { stat: "30%", label: "Avg. cost reduction" },
            { stat: "20+", label: "Hours saved per week" },
            { stat: "27", label: "Pre-built AI apps ready" },
            { stat: "48hrs", label: "Audit turnaround" }
          ].map((item, i) => (
            <FadeIn key={i} delay={0.6 + (i * 0.1)} y={20} className="flex flex-col">
              <span className="font-black text-4xl md:text-5xl text-[#D7E2EA] mb-1">{item.stat}</span>
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs md:text-sm">{item.label}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
