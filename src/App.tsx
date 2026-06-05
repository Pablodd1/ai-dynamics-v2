import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { FeaturedAppsSection } from './sections/FeaturedAppsSection';
import { AgentOrchestrationSection } from './sections/AgentOrchestrationSection';
import { IndustriesSection } from './sections/IndustriesSection';
import { InteractiveSolutionsSection } from './sections/InteractiveSolutionsSection';
import { VoiceReceptionistSimulator } from './sections/VoiceReceptionistSimulator';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { PricingSection } from './sections/PricingSection';
import { WhyUsSection } from './sections/WhyUsSection';
import { MarketOpportunitySection } from './sections/MarketOpportunitySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { InsightsSection } from './sections/InsightsSection';
import { OmnichannelContactSection } from './sections/OmnichannelContactSection';
import { FooterSection } from './sections/FooterSection';
import { AiRoiCalculatorSection } from './sections/AiRoiCalculatorSection';
import { CalendarBookingSection } from './sections/CalendarBookingSection';

import { LiveAgentChatbot } from './components/LiveAgentChatbot';
import { NeuralNetworkBackground } from './components/NeuralNetworkBackground';
import { AICursorCopilot } from './components/AICursorCopilot';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Listen for cross-component tab switching (e.g. from ROI calculator to Contact)
  useEffect(() => {
    const handleSwitchTab = (e: CustomEvent) => {
      setActiveTab(e.detail);
    };
    document.addEventListener('switchTab', handleSwitchTab as EventListener);
    return () => {
      document.removeEventListener('switchTab', handleSwitchTab as EventListener);
    };
  }, []);

  return (
    <div className="main-wrapper relative min-h-screen pb-0">
      <NeuralNetworkBackground />
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Padding to account for fixed NavigationBar */}
      <div className="pt-24">
        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div
              key="Overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <HeroSection />
              <ServicesSection />
              <HowItWorksSection />
              <WhyUsSection />
            </motion.div>
          )}

          {activeTab === 'Solutions' && (
            <motion.div
              key="Solutions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedAppsSection />
              <IndustriesSection />
              <InteractiveSolutionsSection />
              <VoiceReceptionistSimulator />
              <AgentOrchestrationSection />
            </motion.div>
          )}

          {activeTab === 'Pricing' && (
            <motion.div
              key="Pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AiRoiCalculatorSection />
              <PricingSection />
              <MarketOpportunitySection />
              <TestimonialsSection />
            </motion.div>
          )}

          {activeTab === 'Insights' && (
            <motion.div
              key="Insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <InsightsSection />
            </motion.div>
          )}

          {activeTab === 'Contact' && (
            <motion.div
              key="Contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CalendarBookingSection />
              <OmnichannelContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FooterSection />
      
      {/* Global Interactive Elements persist across tabs */}
      <LiveAgentChatbot />
      <AICursorCopilot />
      <Analytics />
    </div>
  );
}

export default App;
