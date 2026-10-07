import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Compass, Cpu, Layers } from 'lucide-react'
import SEO from '../components/SEO'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col justify-between selection:bg-luxury-gold selection:text-dark">
      <SEO
        title="404 — Page Not Found | AI Dynamic Pro"
        description="The requested page could not be located on AI Dynamic Pro."
        noindex={true}
      />
      
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32 relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 shadow-2xl backdrop-blur-md"
          >
            <Compass className="w-10 h-10 text-luxury-gold animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-luxury-gold font-mono text-sm tracking-[0.25em] uppercase font-semibold block mb-3">
              HTTP 404 — Endpoint Not Found
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
              Architecture Lost in <span className="gradient-text">Translation</span>
            </h1>
            <p className="text-luxury-silver text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              The neural pathway or project page you are attempting to reach has either migrated, updated its endpoint, or does not exist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-luxury-gold text-dark font-medium hover:bg-luxury-champagne transition-all duration-300 shadow-lg shadow-luxury-gold/10 font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>

            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-luxury-gold/30 transition-all duration-300"
            >
              <Layers className="w-4 h-4 text-luxury-gold" />
              Browse 22 Production Systems
            </Link>

            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-luxury-gold/30 transition-all duration-300"
            >
              <Cpu className="w-4 h-4 text-luxury-gold" />
              Consult an Architect
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
