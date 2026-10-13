import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SEO from './components/SEO'
import TrustBadges from './components/TrustBadges'
import LiveCallSimulator from './components/LiveCallSimulator'
import IndustryTabs from './components/IndustryTabs'
import FeaturedProjects from './components/FeaturedProjects'
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
        title="AI Consulting, Workflow Automation & Staff Training | AI Dynamic Pro | Miami"
        description="Miami-based AI Consulting, $99 Workflow Audits, Custom Enterprise Automation & Staff Training across Healthcare, Legal, Real Estate, Construction & Logistics. Backed by 22 production AI systems."
        canonical="https://www.aidynamic.pro/"
      />
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <LiveCallSimulator />
        <IndustryTabs />
        <FeaturedProjects />
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
