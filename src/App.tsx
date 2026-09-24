import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './LandingPage'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import OurProcess from './pages/OurProcess'
import Booking from './pages/Booking'
import Founders from './pages/Founders'
import Blog from './pages/Blog'
import AgenticWebsite from './pages/AgenticWebsite'
import AISeo from './pages/AISeo'
import ZeroG from './pages/ZeroG'
import Simulation from './pages/Simulation'
import Research from './pages/Research'
import AIPhoneReceptionistMiami from './pages/blog/AIPhoneReceptionistMiami'
import MedicalClinicAutomation from './pages/blog/MedicalClinicAutomation'
import LegalIntakeAutomation from './pages/blog/LegalIntakeAutomation'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/auth/Dashboard'
import Profile from './pages/auth/Profile'
import Admin from './pages/auth/Admin'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
