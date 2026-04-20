import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Services />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
