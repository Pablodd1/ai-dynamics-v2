import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SEO from './components/SEO'
import TrustBadges from './components/TrustBadges'
import VisionGlassSystemsDeck from './components/VisionGlassSystemsDeck'
import LiveCallSimulator from './components/LiveCallSimulator'
import IndustryTabs from './components/IndustryTabs'
import FeaturedProjects from './components/FeaturedProjects'
import SystemArchitectureShowcase from './components/SystemArchitectureShowcase'
import ROICalculator from './components/ROICalculator'
import CaseStudy from './components/CaseStudy'
import Founder from './components/Founder'
import Pricing from './components/Pricing'
import LeadMagnet from './components/LeadMagnet'
import Process from './components/Process'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SocialSidebar from './components/SocialSidebar'
import AIAssistantWidget from './components/AIAssistantWidget'

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <SEO
        title="Executive AI Consulting, Full-Scale Automation & Corporate AI Training | AI Dynamic Pro"
        description="We consult with companies to cut operating costs, build custom AI solutions that automate everything possible, reduce staff overhead, and train teams to operate at 5x efficiency."
        canonical="https://www.aidynamic.pro/"
      />
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <VisionGlassSystemsDeck />
        <LiveCallSimulator />
        <IndustryTabs />
        <FeaturedProjects />
        <SystemArchitectureShowcase />
        <ROICalculator />
        <CaseStudy />
        <Founder />
        <Pricing />
        <Process />
        <Stats />
        <LeadMagnet />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <SocialSidebar />
      <AIAssistantWidget />
    </div>
  )
}

export default LandingPage
