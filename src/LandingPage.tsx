import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SEO from './components/SEO'
import VisionGlassSystemsDeck from './components/VisionGlassSystemsDeck'
import SystemArchitectureShowcase from './components/SystemArchitectureShowcase'
import FeaturedProjects from './components/FeaturedProjects'
import LiveCallSimulator from './components/LiveCallSimulator'
import ROICalculator from './components/ROICalculator'
import Pricing from './components/Pricing'
import Founder from './components/Founder'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIAssistantWidget from './components/AIAssistantWidget'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#040407] text-white overflow-x-clip">
      <SEO
        title="Custom AI Apps & 24/7 Bilingual Voice Receptionists | AI Dynamic Pro | Miami"
        description="Embedded AI engineers building custom apps and 24/7 bilingual voice receptionists for Miami healthcare, legal, and service teams. Start with a free 15-minute workflow triage call."
        canonical="https://www.aidynamic.pro/"
      />
      <Navigation />
      <main>
        <Hero />
        <VisionGlassSystemsDeck />
        <SystemArchitectureShowcase />
        <FeaturedProjects />
        <LiveCallSimulator />
        <ROICalculator />
        <Pricing />
        <Founder />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <AIAssistantWidget />
    </div>
  )
}

export default LandingPage
