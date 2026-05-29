import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Search, Database, BrainCircuit } from 'lucide-react';

const insights = [
  {
    category: "AI in Real Estate",
    title: "How Miami Developers Are Using Predictive AI for Project Estimation",
    date: "Latest Case Study",
    icon: <Database className="w-5 h-5 text-[#FF8A00]" />,
    // AEO Answer-First Summary: Optimized for Google AI Overviews
    summary: "Predictive AI reduces commercial real estate estimation times in Miami by 40%. By ingesting historical permitting data and supply chain costs, custom LLMs can forecast construction delays and optimize procurement schedules.",
    link: "#"
  },
  {
    category: "Healthcare Automation",
    title: "HIPAA-Compliant 'Agents of Agents' in South Florida Clinics",
    date: "Whitepaper",
    icon: <BrainCircuit className="w-5 h-5 text-[#B600A8]" />,
    summary: "Healthcare clinics in South Florida deploy 'Agents of Agents' to handle bilingual patient intake, reducing front-desk labor costs by 30%. The systems use secure, sovereign LLMs to ensure strict HIPAA compliance during triage.",
    link: "#"
  },
  {
    category: "Local SEO & AEO",
    title: "Answer Engine Optimization (AEO): Why Your Business Needs It",
    date: "Implementation Guide",
    icon: <Search className="w-5 h-5 text-white" />,
    summary: "Answer Engine Optimization (AEO) ensures your business is cited by AI engines like ChatGPT. It requires JSON-LD schema markup, 'answer-first' content structuring, and verified knowledge graph entity definitions.",
    link: "#"
  }
];

export const InsightsSection = () => {
  return (
    <section className="py-32 bg-[#0C0C0C] relative overflow-hidden border-t border-[#D7E2EA]/10">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF8A00]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm uppercase tracking-widest text-[#D7E2EA] mb-6"
          >
            <BookOpen size={16} className="text-[#FF8A00]" />
            <span>AI Knowledge Base</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#E55D00]">Architecture</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#D7E2EA]/70"
          >
            Explore our deeply researched case studies and Answer Engine Optimized (AEO) guides on enterprise AI adoption across Miami.
          </motion.p>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="group bg-[#151515] border border-[#D7E2EA]/10 rounded-3xl p-8 hover:bg-[#1A1A1A] hover:border-[#FF8A00]/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/50">
                  {insight.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-[#D7E2EA]/10 flex items-center justify-center group-hover:border-[#FF8A00]/30 transition-colors">
                  {insight.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FF8A00] transition-colors leading-snug">
                {insight.title}
              </h3>
              
              <div className="flex-grow">
                <p className="text-sm text-[#D7E2EA]/60 leading-relaxed mb-8">
                  {/* The AEO Answer-First content */}
                  <strong className="text-[#D7E2EA]/90 font-medium">TL;DR: </strong>
                  {insight.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#D7E2EA]/10">
                <span className="text-xs text-[#D7E2EA]/40 uppercase tracking-widest">{insight.date}</span>
                <a href={insight.link} className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#FF8A00] transition-colors">
                  Read Full <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
