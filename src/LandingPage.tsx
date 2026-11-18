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
import SocialSidebar from './components/SocialSidebar'
import AIAssistantWidget from './components/AIAssistantWidget'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#040407] text-white overflow-x-clip">
      <SEO
        title="Embedded AI Developers & Consultants · Built & Staff-Trained Until Gold | AI Dynamic Pro"
        description="Aggressive on-site & embedded AI developers and consultants. We go to you, analyze your workflows, serve your target population better, build custom apps, cut waste, and train your staff until everyone masters it and you are Gold."
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
      <SocialSidebar />
      <AIAssistantWidget />
    </div>
  )
}

export default LandingPage
