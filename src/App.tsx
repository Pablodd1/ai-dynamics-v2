import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { initAttributionTracking } from './lib/analytics'
import LandingPage from './LandingPage'
import EcosystemWidget from './components/EcosystemWidget'

const DirectConnect = lazy(() => import('./pages/DirectConnect'))
const LatamSaaS = lazy(() => import('./pages/LatamSaaS'))
const HeroLab = lazy(() => import('./pages/HeroLab'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const OurProcess = lazy(() => import('./pages/OurProcess'))
const Booking = lazy(() => import('./pages/Booking'))
const Founders = lazy(() => import('./pages/Founders'))
const Blog = lazy(() => import('./pages/Blog'))
const AgenticWebsite = lazy(() => import('./pages/AgenticWebsite'))
const AISeo = lazy(() => import('./pages/AISeo'))
const ZeroG = lazy(() => import('./pages/ZeroG'))
const Simulation = lazy(() => import('./pages/Simulation'))
const Research = lazy(() => import('./pages/Research'))
const Projects = lazy(() => import('./pages/Projects'))
const AIPhoneReceptionistMiami = lazy(() => import('./pages/blog/AIPhoneReceptionistMiami'))
const MedicalClinicAutomation = lazy(() => import('./pages/blog/MedicalClinicAutomation'))
const LegalIntakeAutomation = lazy(() => import('./pages/blog/LegalIntakeAutomation'))
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const Dashboard = lazy(() => import('./pages/auth/Dashboard'))
const Profile = lazy(() => import('./pages/auth/Profile'))
const Admin = lazy(() => import('./pages/auth/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PaidAdOffer = lazy(() => import('./pages/PaidAdOffer'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))

function ConditionalEcosystemWidget() {
  const { pathname } = useLocation()
  if (
    pathname === '/connect' ||
    pathname === '/call-me' ||
    pathname === '/hero-lab' ||
    pathname === '/offer' ||
    pathname === '/success'
  ) {
    return null
  }
  return <EcosystemWidget currentSiteId="ai-dynamics" />
}

function App() {
  useEffect(() => {
    initAttributionTracking()
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" aria-hidden="true" />}>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hero-lab" element={<HeroLab />} />
          <Route path="/latam" element={<LatamSaaS />} />
          <Route path="/es" element={<LatamSaaS />} />
          <Route path="/connect" element={<DirectConnect />} />
          <Route path="/call-me" element={<DirectConnect />} />
          <Route path="/offer" element={<PaidAdOffer />} />
          <Route path="/success" element={<CheckoutSuccess />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Projects />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/process" element={<OurProcess />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/ai-phone-receptionist-miami" element={<AIPhoneReceptionistMiami />} />
          <Route path="/blog/medical-clinic-automation" element={<MedicalClinicAutomation />} />
          <Route path="/blog/legal-intake-automation" element={<LegalIntakeAutomation />} />
          <Route path="/agentic-website" element={<AgenticWebsite />} />
          <Route path="/ai-seo" element={<AISeo />} />
          <Route path="/zero-g" element={<ZeroG />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/research" element={<Research />} />
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <ConditionalEcosystemWidget />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
