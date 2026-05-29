import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavigationBar = ({ activeTab, setActiveTab }: NavigationBarProps) => {
  const tabs = ['Overview', 'Solutions', 'Pricing', 'Insights', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[90] flex justify-center p-6 pointer-events-none">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto bg-[#0C0C0C]/70 backdrop-blur-xl border border-[#D7E2EA]/10 p-2 rounded-full shadow-[0_10_40px_rgba(255,138,0,0.1)] flex items-center gap-2"
      >
        <div className="flex items-center gap-2 pl-4 pr-6 border-r border-[#D7E2EA]/10">
          <Sparkles size={18} className="text-[#FF8A00]" />
          <span className="font-black text-white tracking-widest text-sm hidden sm:block">AI DYNAMIC</span>
        </div>

        <div className="flex items-center gap-1 px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab 
                  ? 'text-black' 
                  : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-[#FF8A00] rounded-full shadow-[0_0_15px_rgba(255,138,0,0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};
