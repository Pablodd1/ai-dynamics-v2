import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Stats from './components/Stats'
import TrustSignals from './components/TrustSignals'
import DetailedServices from './components/DetailedServices'
import Process from './components/Process'
import CaseStudies from './components/CaseStudies'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <TrustSignals />
        <DetailedServices />
        <Process />
        <CaseStudies />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage