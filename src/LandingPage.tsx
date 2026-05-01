import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import IndustryTabs from './components/IndustryTabs'
import CaseStudy from './components/CaseStudy'
import Founder from './components/Founder'
import Pricing from './components/Pricing'
import LeadMagnet from './components/LeadMagnet'
import Process from './components/Process'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SocialSidebar from './components/SocialSidebar'
import AIAssistantWidget from './components/AIAssistantWidget'

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <IndustryTabs />
        <CaseStudy />
        <Founder />
        <Pricing />
        <LeadMagnet />
        <Process />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <SocialSidebar />
      <AIAssistantWidget />
    </div>
  )
}

export default LandingPage
